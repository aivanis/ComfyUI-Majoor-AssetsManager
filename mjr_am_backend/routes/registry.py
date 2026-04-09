"""Route registration system."""

from __future__ import annotations

from collections.abc import Awaitable, Callable
from typing import Any

from aiohttp import web
from mjr_am_backend.config import SERVICES_PREWARM_ON_STARTUP
from mjr_am_backend.observability import ensure_observability
from mjr_am_backend.shared import Result, get_logger
from .core import (
    _get_request_user_id,
    _json_response,
    _push_request_user_context,
    _require_authenticated_user,
    _reset_request_user_context,
)
from .registry_app import (
    _install_app_middlewares_best_effort as _install_app_middlewares_best_effort_impl,
    _install_background_scan_cleanup as _install_background_scan_cleanup_impl,
    _install_observability_on_prompt_server as _install_observability_on_prompt_server_impl,
    _install_security_middlewares as _install_security_middlewares_impl,
    _is_app_routes_registered as _is_app_routes_registered_impl,
    _mark_routes_registered_best_effort as _mark_routes_registered_best_effort_impl,
    _prepare_route_table as _prepare_route_table_impl,
    _register_app_routes_best_effort as _register_app_routes_best_effort_impl,
    _schedule_services_prewarm as _schedule_services_prewarm_impl,
    _set_user_manager_best_effort as _set_user_manager_best_effort_impl,
)
from .registry_logging import (
    _extract_app_paths,
    _extract_table_paths,
    _log_route_collisions,
    _log_route_registration_summary,
    _read_route_verbose_logs_env,
    _read_route_verbose_logs_from_db,
    _route_verbose_logs_enabled,
)
from .registry_prompt import PromptServer, _get_prompt_server
from .route_catalog import CORE_ROUTE_REGISTRATIONS, OPTIONAL_ROUTE_REGISTRATIONS

# --- CONFIGURATION ---
API_PREFIX = "/mjr/am/"
_SENSITIVE_METHODS = {"POST", "PUT", "PATCH", "DELETE"}
_APP_KEY_SECURITY_MIDDLEWARES_INSTALLED: web.AppKey[bool] = web.AppKey(
    "_mjr_security_middlewares_installed", bool
)
_APP_KEY_ROUTES_REGISTERED: web.AppKey[bool] = web.AppKey("_mjr_routes_registered", bool)
_APP_KEY_OBSERVABILITY_INSTALLED: web.AppKey[bool] = web.AppKey("_mjr_observability_installed", bool)
_APP_KEY_USER_MANAGER: web.AppKey[object] = web.AppKey("_mjr_user_manager", object)
_APP_KEY_BG_SCAN_CLEANUP_INSTALLED: web.AppKey[bool] = web.AppKey("_mjr_bg_scan_cleanup_installed", bool)

logger = get_logger(__name__)
_ROUTES_REGISTERED = False


@web.middleware
async def security_headers_middleware(
    request: web.Request,
    handler: Callable[[web.Request], Awaitable[web.StreamResponse]],
) -> web.StreamResponse:
    """Apply strict security headers to Majoor API responses only."""
    response = await handler(request)

    # Only apply to Majoor API endpoints. Applying `nosniff` / CSP globally can break
    # ComfyUI's own static assets (e.g. user.css) and frontend runtime.
    try:
        path = request.path or ""
    except Exception:
        path = ""
    # FIX: Utilisation de la constante au lieu du hardcoding
    if not path.startswith(API_PREFIX):
        return response

    try:
        # API responses should never be treated as a document.
        response.headers.setdefault("Content-Security-Policy", "default-src 'none'")
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        response.headers.setdefault("X-Frame-Options", "DENY")
        response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")

        response.headers.setdefault("Cache-Control", "no-store, no-cache, must-revalidate")
        response.headers.setdefault("Pragma", "no-cache")
    except Exception:
        pass

    return response


@web.middleware
async def api_versioning_middleware(
    request: web.Request,
    handler: Callable[[web.Request], Awaitable[web.StreamResponse]],
) -> web.StreamResponse:
    """
    Support versioned routes without breaking existing clients.

    `/mjr/am/v1/...` redirects to legacy `/mjr/am/...` using 308 (method-preserving).
    """
    try:
        path = request.path or ""
    except Exception:
        path = ""

    prefix = API_PREFIX + "v1"
    if path == prefix or path.startswith(prefix + "/"):
        tail = path[len(prefix):] or "/"
        target = API_PREFIX.rstrip("/") + tail
        qs = ""
        try:
            qs = request.query_string or ""
        except Exception:
            qs = ""
        if qs:
            target = target + "?" + qs
        raise web.HTTPPermanentRedirect(location=target)

    return await handler(request)


@web.middleware
async def auth_required_middleware(
    request: web.Request,
    handler: Callable[[web.Request], Awaitable[web.StreamResponse]],
) -> web.StreamResponse:
    """
    Require authenticated ComfyUI user for sensitive Majoor routes when auth is enabled.
    """
    token = _push_request_user_context(request)
    try:
        path, method = _request_path_and_method(request)
        user_id = _get_request_user_id(request)
        if user_id:
            _store_request_user_id(request, user_id)
        if _requires_auth(path, method):
            failure = _auth_error_response_or_none(request)
            if failure is not None:
                return failure

        return await handler(request)
    finally:
        _reset_request_user_context(token)


def _request_path_and_method(request: web.Request) -> tuple[str, str]:
    try:
        return request.path or "", str(request.method or "GET").upper()
    except Exception:
        return "", "GET"


def _requires_auth(path: str, method: str) -> bool:
    return path.startswith(API_PREFIX) and method in _SENSITIVE_METHODS


def _auth_error_response_or_none(request: web.Request) -> web.StreamResponse | None:
    auth = _require_authenticated_user(request)
    if not auth.ok:
        return _json_response(
            Result.Err(
                auth.code or "AUTH_REQUIRED",
                auth.error or "Authentication required. Please sign in first.",
            ),
            status=401,
        )
    _store_request_user_id(request, auth.data)
    return None


def _store_request_user_id(request: web.Request, user_id: Any) -> None:
    try:
        request["mjr_user_id"] = str(user_id or "").strip()
    except Exception:
        pass


def _install_security_middlewares(app: web.Application) -> None:
    _install_security_middlewares_impl(
        app,
        auth_required_middleware=auth_required_middleware,
        security_headers_middleware=security_headers_middleware,
        api_versioning_middleware=api_versioning_middleware,
        installed_key=_APP_KEY_SECURITY_MIDDLEWARES_INSTALLED,
        logger=logger,
    )


def _install_background_scan_cleanup(app: web.Application) -> None:
    _install_background_scan_cleanup_impl(
        app,
        installed_key=_APP_KEY_BG_SCAN_CLEANUP_INSTALLED,
        logger=logger,
    )


def _try_register(
    register_fn: Any,
    routes: Any,
    error_label: str,
    verbose: bool,
    *log_msgs: str,
) -> None:
    """Register an optional route group; log errors instead of raising."""
    try:
        register_fn(routes)
        if verbose:
            for msg in log_msgs:
                logger.info(msg)
    except Exception as e:
        logger.error("Failed to register %s routes: %s", error_label, e)


def register_all_routes() -> web.RouteTableDef:
    """
    Register all route handlers and return the RouteTableDef.
    This is the central registration point for all routes.
    """
    global _ROUTES_REGISTERED
    routes = _get_prompt_server().instance.routes
    if _ROUTES_REGISTERED:
        logger.debug("register_all_routes() skipped: already registered")
        return routes
    verbose = _route_verbose_logs_enabled()

    for route_group in CORE_ROUTE_REGISTRATIONS:
        route_group.register_fn(routes)

    for route_group in OPTIONAL_ROUTE_REGISTRATIONS:
        _try_register(
            route_group.register_fn,
            routes,
            route_group.label,
            verbose,
            *route_group.verbose_messages,
        )

    _log_route_registration_summary(verbose)
    _ROUTES_REGISTERED = True
    return routes


def register_routes(app: web.Application, user_manager=None) -> None:
    """
    Register routes onto an aiohttp application.

    This is primarily used for unit tests; in ComfyUI, routes are registered
    via PromptServer decorators at import time.
    """
    if not _prepare_route_table(app, user_manager):
        return
    _install_app_middlewares_best_effort(app)
    if _is_app_routes_registered(app):
        logger.debug("register_routes(app) skipped: routes already registered on this app")
        return
    _register_app_routes_best_effort(app)
    _schedule_services_prewarm()


def _schedule_services_prewarm() -> None:
    _schedule_services_prewarm_impl(
        services_prewarm_on_startup=SERVICES_PREWARM_ON_STARTUP,
        logger=logger,
    )


def _prepare_route_table(app: web.Application, user_manager: object | None) -> bool:
    return _prepare_route_table_impl(
        app,
        user_manager,
        set_user_manager_fn=_set_user_manager_best_effort,
        register_all_routes_fn=register_all_routes,
        logger=logger,
    )


def _set_user_manager_best_effort(app: web.Application, user_manager: object) -> None:
    _set_user_manager_best_effort_impl(
        app,
        user_manager,
        user_manager_key=_APP_KEY_USER_MANAGER,
    )


def _install_app_middlewares_best_effort(app: web.Application) -> None:
    _install_app_middlewares_best_effort_impl(
        app,
        ensure_observability_fn=ensure_observability,
        install_security_middlewares_fn=_install_security_middlewares,
        install_background_scan_cleanup_fn=_install_background_scan_cleanup,
        logger=logger,
    )


def _is_app_routes_registered(app: web.Application) -> bool:
    return _is_app_routes_registered_impl(
        app,
        routes_registered_key=_APP_KEY_ROUTES_REGISTERED,
    )


def _register_app_routes_best_effort(app: web.Application) -> None:
    _register_app_routes_best_effort_impl(
        app,
        get_prompt_server_fn=_get_prompt_server,
        log_route_collisions_fn=_log_route_collisions,
        mark_routes_registered_fn=_mark_routes_registered_best_effort,
        logger=logger,
    )


def _mark_routes_registered_best_effort(app: web.Application) -> None:
    _mark_routes_registered_best_effort_impl(
        app,
        routes_registered_key=_APP_KEY_ROUTES_REGISTERED,
    )


def _install_observability_on_prompt_server() -> None:
    _install_observability_on_prompt_server_impl(
        get_prompt_server_fn=_get_prompt_server,
        ensure_observability_fn=ensure_observability,
        observability_installed_key=_APP_KEY_OBSERVABILITY_INSTALLED,
        install_security_middlewares_fn=_install_security_middlewares,
        logger=logger,
    )

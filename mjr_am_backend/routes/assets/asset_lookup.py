"""Asset lookup and root-resolution helpers extracted from ``assets_impl``."""

from __future__ import annotations

import asyncio
from collections.abc import Callable
from pathlib import Path
from typing import Any

from mjr_am_backend.config import TO_THREAD_TIMEOUT_S, get_runtime_output_root
from mjr_am_backend.custom_roots import list_custom_roots, resolve_custom_root
from mjr_am_backend.features.assets import find_asset_row_by_filepath
from mjr_am_backend.shared import Result

try:
    import folder_paths  # type: ignore
except Exception:  # pragma: no cover
    class _FolderPathsStub:
        @staticmethod
        def get_input_directory() -> str:
            return str((Path(__file__).resolve().parents[3] / "input").resolve())

    folder_paths = _FolderPathsStub()  # type: ignore


def _custom_root_candidate(item: object) -> tuple[str, Path] | None:
    if not isinstance(item, dict):
        return None
    rid = str(item.get("id") or "").strip()
    root_path = str(item.get("path") or "").strip()
    if not rid or not root_path:
        return None
    try:
        return rid, Path(root_path).resolve(strict=False)
    except Exception:
        return None


def _match_custom_root_id_for_path(
    path: Path,
    *,
    is_within_root: Callable[[Path, Path], bool],
    list_custom_roots_fn: Callable[[], Result[Any]] = list_custom_roots,
) -> str | None:
    roots_res = list_custom_roots_fn()
    if not roots_res.ok:
        return None
    for item in roots_res.data or []:
        candidate = _custom_root_candidate(item)
        if not candidate:
            continue
        rid, root_path = candidate
        if is_within_root(path, root_path):
            return rid
    return None


async def resolve_or_create_asset_id(
    *,
    services: dict[str, Any],
    filepath: str,
    file_type: str = "",
    root_id: str = "",
    normalize_path: Callable[[str], Path | None],
    is_within_root: Callable[[Path, Path], bool],
    get_runtime_output_root_fn: Callable[[], str] = get_runtime_output_root,
    get_input_directory: Callable[[], str] | None = None,
    list_custom_roots_fn: Callable[[], Result[Any]] = list_custom_roots,
    resolve_custom_root_fn: Callable[[str], Result[Any]] = resolve_custom_root,
    safe_error_message: Callable[[Exception, str], str],
    logger: Any,
) -> Result[int]:
    """
    Resolve an ``asset_id`` for a path, indexing on demand when needed.

    This keeps rating/tag mutations working for files discovered from filesystem
    browsing before they exist in the DB.
    """
    if not filepath or not isinstance(filepath, str):
        return Result.Err("INVALID_INPUT", "Missing filepath")

    candidate = normalize_path(filepath)
    if not candidate:
        return Result.Err("INVALID_INPUT", "Invalid filepath")

    try:
        resolved = candidate.resolve(strict=True)
    except Exception:
        return Result.Err("NOT_FOUND", "File does not exist")

    source = str(file_type or "").strip().lower()
    base_dir: Path | None = None
    resolved_root_id: str | None = None

    if get_input_directory is None:
        get_input_directory = folder_paths.get_input_directory

    out_root = Path(get_runtime_output_root_fn()).resolve(strict=False)
    in_root = Path(get_input_directory()).resolve(strict=False)

    if source in ("output", "outputs", "") and is_within_root(resolved, out_root):
        source = "output"
        base_dir = out_root
    elif source in ("input", "inputs", "") and is_within_root(resolved, in_root):
        source = "input"
        base_dir = in_root
    else:
        roots_res = list_custom_roots_fn()
        if roots_res.ok:
            for item in roots_res.data or []:
                if not isinstance(item, dict):
                    continue
                rid = str(item.get("id") or "")
                if not rid:
                    continue
                root_result = resolve_custom_root_fn(rid)
                if not root_result.ok or not root_result.data:
                    continue
                try:
                    root_path = Path(str(root_result.data)).resolve(strict=False)
                except Exception:
                    continue
                if is_within_root(resolved, root_path):
                    base_dir = root_path
                    resolved_root_id = rid or None
                    source = "custom"
                    break

        if root_id:
            root_result = resolve_custom_root_fn(str(root_id))
            if root_result.ok:
                try:
                    candidate_root = Path(str(root_result.data)).resolve(strict=False)
                except Exception:
                    candidate_root = None
                if candidate_root and is_within_root(resolved, candidate_root):
                    base_dir = candidate_root
                    resolved_root_id = str(root_id)
                    source = "custom"

    if not base_dir:
        return Result.Err("FORBIDDEN", "Path is not within allowed roots")

    try:
        await asyncio.wait_for(
            services["index"].index_paths(
                [Path(resolved)],
                str(base_dir),
                True,
                source,
                (resolved_root_id or None),
            ),
            timeout=TO_THREAD_TIMEOUT_S,
        )
    except asyncio.TimeoutError:
        logger.debug("Index-on-demand timed out for %s", filepath)
    except Exception as exc:
        logger.debug("Index-on-demand skipped for %s: %s", filepath, exc)

    try:
        row = await asyncio.wait_for(
            find_asset_row_by_filepath(
                services["db"],
                str(resolved),
                select_sql="id",
            ),
            timeout=TO_THREAD_TIMEOUT_S,
        )
        if not row:
            return Result.Err("NOT_FOUND", "Asset not indexed")
        asset_id = row.get("id")
        if asset_id is None:
            return Result.Err("NOT_FOUND", "Asset id not available")
        return Result.Ok(int(asset_id))
    except asyncio.TimeoutError:
        return Result.Err("TIMEOUT", "Asset lookup timed out")
    except Exception as exc:
        return Result.Err(
            "DB_ERROR",
            safe_error_message(exc, "Failed to resolve asset id"),
        )


async def infer_source_and_root_id_from_path(
    path: Path,
    output_root: str,
    *,
    is_within_root: Callable[[Path, Path], bool],
    get_runtime_output_root_fn: Callable[[], str] = get_runtime_output_root,
    get_input_directory: Callable[[], str] | None = None,
    list_custom_roots_fn: Callable[[], Result[Any]] = list_custom_roots,
    logger: Any,
) -> tuple[str, str | None]:
    try:
        out_root = Path(output_root).resolve(strict=False)
    except Exception:
        out_root = Path(get_runtime_output_root_fn()).resolve(strict=False)
    if get_input_directory is None:
        get_input_directory = folder_paths.get_input_directory
    try:
        in_root = Path(get_input_directory()).resolve(strict=False)
    except Exception:
        in_root = (Path(__file__).resolve().parents[3] / "input").resolve(strict=False)

    if is_within_root(path, out_root):
        return "output", None
    if is_within_root(path, in_root):
        return "input", None

    custom_root_id = _match_custom_root_id_for_path(
        path,
        is_within_root=is_within_root,
        list_custom_roots_fn=list_custom_roots_fn,
    )
    if custom_root_id:
        return "custom", custom_root_id

    logger.warning(
        "Post-rename: could not classify %s under any known root; defaulting to 'output'",
        path,
    )
    return "output", None

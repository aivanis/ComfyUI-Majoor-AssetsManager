import json

import pytest
from aiohttp import web
from aiohttp.test_utils import make_mocked_request

from mjr_am_backend.routes.handlers import vector_search
from mjr_am_backend.shared import Result


def _build_vector_app() -> web.Application:
    app = web.Application()
    routes = web.RouteTableDef()
    vector_search.register_vector_search_routes(routes)
    app.add_routes(routes)
    return app


@pytest.mark.asyncio
async def test_vector_alignment_route_success(monkeypatch) -> None:
    class _Searcher:
        async def get_alignment_score(self, asset_id: int):
            return Result.Ok({"asset_id": asset_id, "score": 0.87})

    async def _require_services():
        return {"vector_searcher": _Searcher()}, None

    monkeypatch.setattr(vector_search, "_require_services", _require_services)
    monkeypatch.setattr(vector_search, "is_vector_search_enabled", lambda: True)

    app = _build_vector_app()
    req = make_mocked_request("GET", "/mjr/am/vector/alignment/42", app=app)
    match = await app.router.resolve(req)
    req._match_info = match
    resp = await match.handler(req)
    body = json.loads(resp.text)

    assert body.get("ok") is True
    assert (body.get("data") or {}).get("asset_id") == 42
    assert (body.get("data") or {}).get("score") == 0.87


@pytest.mark.asyncio
async def test_vector_alignment_route_invalid_asset_id(monkeypatch) -> None:
    class _Searcher:
        async def get_alignment_score(self, asset_id: int):
            return Result.Ok({"asset_id": asset_id, "score": 0.5})

    async def _require_services():
        return {"vector_searcher": _Searcher()}, None

    monkeypatch.setattr(vector_search, "_require_services", _require_services)
    monkeypatch.setattr(vector_search, "is_vector_search_enabled", lambda: True)

    app = _build_vector_app()
    req = make_mocked_request("GET", "/mjr/am/vector/alignment/not-an-int", app=app)
    match = await app.router.resolve(req)
    req._match_info = match
    resp = await match.handler(req)
    body = json.loads(resp.text)

    assert body.get("ok") is False
    assert body.get("code") == "INVALID_INPUT"


@pytest.mark.asyncio
async def test_vector_alignment_route_disabled_returns_503_payload(monkeypatch) -> None:
    async def _require_services():
        return {}, None

    monkeypatch.setattr(vector_search, "_require_services", _require_services)
    monkeypatch.setattr(vector_search, "is_vector_search_enabled", lambda: False)

    app = _build_vector_app()
    req = make_mocked_request("GET", "/mjr/am/vector/alignment/1", app=app)
    match = await app.router.resolve(req)
    req._match_info = match
    resp = await match.handler(req)
    body = json.loads(resp.text)

    assert body.get("ok") is False
    assert body.get("code") == "SERVICE_UNAVAILABLE"


@pytest.mark.asyncio
async def test_vector_search_route_handles_searcher_exception(monkeypatch) -> None:
    class _Searcher:
        async def search_by_text(self, _query: str, *, top_k: int = 20):
            raise RuntimeError("model load failed")

    async def _require_services():
        return {"vector_searcher": _Searcher()}, None

    monkeypatch.setattr(vector_search, "_require_services", _require_services)
    monkeypatch.setattr(vector_search, "is_vector_search_enabled", lambda: True)

    app = _build_vector_app()
    req = make_mocked_request("GET", "/mjr/am/vector/search?q=cat", app=app)
    match = await app.router.resolve(req)
    req._match_info = match
    resp = await match.handler(req)
    body = json.loads(resp.text)

    assert body.get("ok") is False
    assert body.get("code") == "SERVICE_UNAVAILABLE"

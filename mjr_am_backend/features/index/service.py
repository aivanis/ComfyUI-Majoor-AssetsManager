async def _emit_index_paths_notifications(self, data: Any, *, source: str, root_id: str | None) -> None:
    prompt_server_cls: Any = None
    try:
        from ...routes.registry import PromptServer as prompt_server_cls
    except Exception:
        prompt_server_cls = None
    if prompt_server_cls is None:
        return
    ...

"""Workflow classification helpers."""

from __future__ import annotations

import re
from typing import Any

from .models import WorkflowClassification

_MODEL_ALIASES: tuple[tuple[str, tuple[str, ...]], ...] = (
    ("Qwen", ("qwen", "qwenimage", "qwen_image", "qwen-image")),
    ("Seedance", ("seedance", "seedream", "bytedance", "byte dance")),
    ("Flux", ("flux", "kontext", "blackforest", "black forest", "bfl")),
    ("Wan", ("wan", "wanvideo", "wan2", "wan 2")),
    ("LTX", ("ltx", "ltxv")),
    ("SDXL", ("sdxl", "sd_xl", "sd-xl", "xl_base")),
    ("Hunyuan", ("hunyuan", "hunyuanvideo")),
    ("Kling", ("kling",)),
    ("Veo", ("veo", "googleveo")),
    ("Grok", ("grok", "xai")),
    ("Z-Image", ("zimage", "z-image")),
    ("Stable Diffusion", ("stable diffusion", "sd15", "sd1.5")),
)

_PROVIDER_ALIASES: tuple[tuple[str, tuple[str, ...]], ...] = (
    ("Google", ("google", "gemini", "veo")),
    ("ByteDance", ("bytedance", "byte dance", "seedance", "seedream")),
    ("OpenAI", ("openai", "gpt-image", "gptimage")),
    ("Runway", ("runway",)),
    ("Kling", ("kling",)),
    ("Grok", ("grok", "xai")),
    ("Luma", ("luma",)),
    ("MiniMax", ("minimax", "hailuo")),
    ("Ideogram", ("ideogram",)),
    ("Recraft", ("recraft",)),
)


def _compact(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", str(value or "").lower())


def _node_type(node: dict[str, Any]) -> str:
    return str(node.get("type") or node.get("class_type") or "").strip()


def _node_text(node: dict[str, Any]) -> str:
    parts = [_node_type(node)]
    widgets = node.get("widgets_values")
    if isinstance(widgets, list):
        parts.extend(str(v) for v in widgets[:16] if v is not None)
    inputs = node.get("inputs")
    if isinstance(inputs, dict):
        parts.extend(str(v) for v in inputs.values() if isinstance(v, str))
    elif isinstance(inputs, list):
        for item in inputs:
            if isinstance(item, dict):
                parts.extend(str(v) for v in item.values() if isinstance(v, str))
    return " ".join(parts)


def _detect_alias(text: str, aliases: tuple[tuple[str, tuple[str, ...]], ...]) -> str:
    lower = str(text or "").lower()
    compact = _compact(lower)
    for label, candidates in aliases:
        for candidate in candidates:
            if candidate in lower or _compact(candidate) in compact:
                return label
    return ""


def _has_any(haystack: str, compact: str, *needles: str) -> bool:
    return any(needle in haystack or _compact(needle) in compact for needle in needles)


def _workflow_source_flags(source_types: list[str], haystack: str, compact: str) -> dict[str, bool]:
    return {
        "has_image_input": any(
            "loadimage" in t or "imageinput" in t or "ipadapter" in t or "referenceimage" in t
            for t in source_types
        )
        or _has_any(haystack, compact, "loadimage", "image input", "image_input", "first frame", "last frame"),
        "has_video_input": any("loadvideo" in t or "videoinput" in t for t in source_types)
        or _has_any(haystack, compact, "loadvideo", "video input", "video_input"),
        "has_audio_input": any("loadaudio" in t or "audioinput" in t for t in source_types),
    }


def _workflow_sink_flags(source_types: list[str], haystack: str, compact: str) -> dict[str, bool]:
    return {
        "has_video_sink": any(
            "savevideo" in t or "videocombine" in t or "vhs" in t or "animatediff" in t
            for t in source_types
        )
        or _has_any(haystack, compact, "video", "wan", "ltx", "seedance", "hunyuanvideo", "kling", "veo"),
        "has_image_sink": any("saveimage" in t or "previewimage" in t for t in source_types),
        "has_audio_sink": any("saveaudio" in t or "tts" in t or "music" in t for t in source_types)
        or _has_any(haystack, compact, "audio", "tts", "wav", "music"),
    }


def _workflow_capability_flags(source_types: list[str], haystack: str, compact: str) -> dict[str, bool]:
    return {
        "has_upscale": _has_any(haystack, compact, "upscale", "upscaler", "ultimate"),
        "has_edit": any("inpaint" in t or "outpaint" in t or "mask" in t for t in source_types)
        or _has_any(haystack, compact, "inpaint", "outpaint")
        or "image edit" in haystack,
        "has_api": _has_any(
            haystack,
            compact,
            "api",
            "cloud",
            "provider",
            "gemini",
            "veo",
            "kling",
            "grok",
            "runway",
            "luma",
            "minimax",
        ),
    }


def _extract_workflow_signals(nodes: list[dict[str, Any]] | None, text: str) -> dict[str, Any]:
    node_list = [node for node in (nodes or []) if isinstance(node, dict)]
    node_types = [_node_type(node) for node in node_list]
    node_text = " ".join(_node_text(node) for node in node_list)
    haystack = " ".join([str(text or ""), node_text]).lower()
    compact = _compact(haystack)
    source_types = [_compact(t) for t in node_types]

    return {
        "node_count": len(node_list),
        "node_types": node_types[:80],
        **_workflow_source_flags(source_types, haystack, compact),
        **_workflow_sink_flags(source_types, haystack, compact),
        **_workflow_capability_flags(source_types, haystack, compact),
        "model_family": _detect_alias(haystack, _MODEL_ALIASES),
        "provider": _detect_alias(haystack, _PROVIDER_ALIASES),
    }


def _classify_task(signals: dict[str, Any]) -> tuple[str, float]:
    if signals.get("has_audio_sink") or signals.get("has_audio_input"):
        return "Audio", 0.9
    if signals.get("has_upscale"):
        return "Upscale", 0.88
    if signals.get("has_video_input") and signals.get("has_video_sink"):
        return "Video Edit", 0.92
    if signals.get("has_video_input"):
        return "Video Edit", 0.82
    if signals.get("has_video_sink") and signals.get("has_image_input"):
        return "I2V", 0.9
    if signals.get("has_video_sink"):
        return "T2V", 0.84
    if signals.get("has_edit"):
        return "Image Edit", 0.82
    if signals.get("has_image_input"):
        return "I2I", 0.78
    return "T2I", 0.58


def classify_workflow(text: str, nodes: list[dict[str, Any]] | None = None) -> WorkflowClassification:
    signals = _extract_workflow_signals(nodes, text)
    task, task_confidence = _classify_task(signals)
    model_family = str(signals.get("model_family") or "")
    provider = str(signals.get("provider") or "")
    runs_on = "api" if signals.get("has_api") or provider in {"Google", "ByteDance", "OpenAI", "Runway", "Kling", "Grok", "Luma", "MiniMax", "Ideogram", "Recraft"} else "local"
    confidence = task_confidence
    if model_family:
        confidence = min(0.98, confidence + 0.05)
    if provider:
        confidence = min(0.98, confidence + 0.04)
    source = "graph" if signals.get("node_count") else "text"
    return WorkflowClassification(
        task=task,
        model_family=model_family,
        provider=provider,
        runs_on=runs_on,
        confidence=round(confidence, 3),
        source=source,
        signals=signals,
    )

"""
Upscaler workflow extraction helpers.

Handles image-to-image upscaler workflows that use a dedicated upscaler node
(e.g. SeedVR2TilingUpscaler, UltimateSDUpscale, etc.) instead of a traditional
KSampler. Provides a geninfo fallback when no sampler is found.
"""

from __future__ import annotations

from typing import Any

from .graph_converter import _inputs, _is_link, _lower, _node_type, _walk_passthrough
from .sampler_tracer import _scalar
from .parser_impl import _clean_model_id, _extract_input_files


def _is_standalone_upscaler_node(node: dict[str, Any]) -> bool:
    """Detect upscaler nodes that are the primary processing node (not latent-based samplers)."""
    ct = _lower(_node_type(node))
    if not ct:
        return False
    if "upscal" not in ct:
        return False
    ins = _inputs(node)
    # Must consume a pixel/image input (not a latent/samples input — those are already handled)
    has_image_input = _is_link(ins.get("image")) or _is_link(ins.get("images"))
    has_latent_input = _is_link(ins.get("samples")) or _is_link(ins.get("latent_image"))
    return has_image_input and not has_latent_input


def _find_upscaler_node(nodes_by_id: dict[str, Any]) -> tuple[str | None, dict[str, Any] | None]:
    """Find the first standalone upscaler node in the graph."""
    for nid, node in nodes_by_id.items():
        if isinstance(node, dict) and _is_standalone_upscaler_node(node):
            return str(nid), node
    return None, None


def _extract_upscaler_primary_model(nodes_by_id: dict[str, Any], ins: dict[str, Any]) -> dict[str, Any] | None:
    """
    Extract the primary upscaler model (DIT, diffusion, or generic model) from
    linked model-loader nodes or direct string inputs.
    Checks the 'dit', 'model', 'unet', 'diffusion_model' input keys in order.
    """
    for key in ("dit", "model", "unet", "diffusion_model"):
        link = ins.get(key)
        if not _is_link(link):
            continue
        src_id = _walk_passthrough(nodes_by_id, link)
        if not src_id:
            continue
        src_node = nodes_by_id.get(src_id)
        if not isinstance(src_node, dict):
            continue
        src_ins = _inputs(src_node)
        model_name = _scalar(
            src_ins.get("model") or src_ins.get("model_name") or src_ins.get("ckpt_name")
        )
        if isinstance(model_name, str) and model_name.strip():
            cleaned = _clean_model_id(model_name)
            if cleaned:
                return {"name": cleaned, "confidence": "high", "source": f"{_node_type(src_node)}:{src_id}"}

    # Direct string model in the upscaler's own inputs
    for key in ("model", "model_name", "ckpt_name"):
        val = ins.get(key)
        if isinstance(val, str) and val.strip():
            cleaned = _clean_model_id(val)
            if cleaned:
                return {"name": cleaned, "confidence": "high", "source": "upscaler_node"}
    return None


def _extract_upscaler_vae(nodes_by_id: dict[str, Any], ins: dict[str, Any]) -> dict[str, Any] | None:
    """Extract VAE from the upscaler's linked vae input."""
    vae_link = ins.get("vae")
    if not _is_link(vae_link):
        return None
    src_id = _walk_passthrough(nodes_by_id, vae_link)
    if not src_id:
        return None
    src_node = nodes_by_id.get(src_id)
    if not isinstance(src_node, dict):
        return None
    src_ins = _inputs(src_node)
    model_name = _scalar(src_ins.get("model") or src_ins.get("vae_name"))
    if isinstance(model_name, str) and model_name.strip():
        cleaned = _clean_model_id(model_name)
        if cleaned:
            return {"name": cleaned, "confidence": "high", "source": f"{_node_type(src_node)}:{src_id}"}
    return None


def _extract_upscaler_size(
    ins: dict[str, Any], upscaler_id: str, upscaler_node: dict[str, Any]
) -> dict[str, Any] | None:
    """Extract output resolution from upscaler parameters."""
    source = f"{_node_type(upscaler_node)}:{upscaler_id}"
    # Single square resolution (e.g. SeedVR2: new_resolution)
    for key in ("new_resolution", "resolution", "output_resolution", "target_resolution"):
        res = _scalar(ins.get(key))
        if res is not None:
            try:
                r = int(res)
                return {"width": r, "height": r, "confidence": "high", "source": source}
            except Exception:
                pass
    # Explicit width/height pair
    for wkey, hkey in (("width", "height"), ("target_width", "target_height"), ("out_width", "out_height")):
        w = _scalar(ins.get(wkey))
        h = _scalar(ins.get(hkey))
        if w is not None and h is not None:
            try:
                return {"width": int(w), "height": int(h), "confidence": "high", "source": source}
            except (ValueError, TypeError):
                pass
    return None


def _extract_upscaler_geninfo_fallback(
    nodes_by_id: dict[str, Any], workflow_meta: dict[str, Any] | None
) -> dict[str, Any] | None:
    """
    Build a geninfo payload for upscaler-only workflows (no traditional KSampler).
    Returns None if no standalone upscaler node is found.
    """
    upscaler_id, upscaler_node = _find_upscaler_node(nodes_by_id)
    if not upscaler_node or not upscaler_id:
        return None

    ins = _inputs(upscaler_node)
    source = f"{_node_type(upscaler_node)}:{upscaler_id}"

    out: dict[str, Any] = {
        "engine": {
            "parser_version": "geninfo-upscaler-v1",
            "sampler_mode": "upscaler",
            "type": "I2I",
            "sink": "SaveImage",
        }
    }
    if workflow_meta:
        out["metadata"] = workflow_meta

    # Primary model (DIT / diffusion upscaler model)
    model = _extract_upscaler_primary_model(nodes_by_id, ins)
    if model:
        out["checkpoint"] = model
        out["models"] = {"checkpoint": model}

    # VAE
    vae = _extract_upscaler_vae(nodes_by_id, ins)
    if vae:
        out["vae"] = vae

    # Seed
    seed = _scalar(ins.get("seed") or ins.get("noise_seed"))
    if seed is not None:
        out["seed"] = {"value": seed, "confidence": "high", "source": source}

    # Output resolution / size
    size = _extract_upscaler_size(ins, upscaler_id, upscaler_node)
    if size:
        out["size"] = size

    # Use node type as sampler name (shows "SeedVR2TilingUpscaler" etc.)
    out["sampler"] = {
        "name": str(_node_type(upscaler_node) or "Upscaler"),
        "confidence": "high",
        "source": source,
    }

    # Input files (LoadImage, etc.)
    input_files = _extract_input_files(nodes_by_id)
    if input_files:
        out["inputs"] = input_files

    # Require at least one meaningful field beyond engine + metadata
    meaningful_keys = {k for k in out if k not in ("engine", "metadata")}
    if not meaningful_keys:
        return None
    return out

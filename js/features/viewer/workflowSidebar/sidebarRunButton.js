/**
 * sidebarRunButton - standalone "Queue Prompt" button for the MFV toolbar.
 *
 * Builds the prompt explicitly so MFV can force a preview method for this run.
 * Uses api.queuePrompt when available, and falls back to POST /prompt.
 */

import { getComfyApp, getComfyApi } from "../../../app/comfyApiBridge.js";
import { APP_CONFIG } from "../../../app/config.js";
import { t } from "../../../app/i18n.js";

const STATE = Object.freeze({ IDLE: "idle", RUNNING: "running", ERROR: "error" });
const MFV_PREVIEW_METHODS = new Set(["default", "auto", "latent2rgb", "taesd", "none"]);

/**
 * Create Run/Pause/Stop controls for MFV.
 * @returns {{ el: HTMLDivElement, dispose: () => void }}
 */
export function createRunButton() {
    const wrap = document.createElement("div");
    wrap.className = "mjr-mfv-run-controls";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "mjr-icon-btn mjr-mfv-run-btn";
    const label = t("tooltip.queuePrompt", "Queue Prompt (Run)");
    btn.title = label;
    btn.setAttribute("aria-label", label);

    const icon = document.createElement("i");
    icon.className = "pi pi-play";
    icon.setAttribute("aria-hidden", "true");
    btn.appendChild(icon);

    const stopBtn = document.createElement("button");
    stopBtn.type = "button";
    stopBtn.className = "mjr-icon-btn mjr-mfv-stop-btn";
    const stopIcon = document.createElement("i");
    stopIcon.className = "pi pi-stop";
    stopIcon.setAttribute("aria-hidden", "true");
    stopBtn.appendChild(stopIcon);

    wrap.appendChild(btn);
    wrap.appendChild(stopBtn);

    let state = STATE.IDLE;

    function setState(newState) {
        state = newState;
        btn.classList.toggle("running", state === STATE.RUNNING);
        btn.classList.toggle("error", state === STATE.ERROR);
        btn.disabled = state === STATE.RUNNING;
        if (state === STATE.RUNNING) {
            icon.className = "pi pi-spin pi-spinner";
        } else {
            icon.className = "pi pi-play";
        }
    }

    function setStopLabel() {
        const stopLabel = t("tooltip.queueStop", "Stop Generation");
        stopBtn.title = stopLabel;
        stopBtn.setAttribute("aria-label", stopLabel);
    }

    async function stopCurrentGeneration() {
        const app = getComfyApp();
        const api = getComfyApi(app);

        if (api && typeof api.interrupt === "function") {
            await api.interrupt();
            return;
        }

        const resp = await fetch("/interrupt", { method: "POST" });
        if (!resp.ok) throw new Error(`POST /interrupt failed (${resp.status})`);
    }

    async function handleClick() {
        if (state === STATE.RUNNING) return;
        setState(STATE.RUNNING);
        try {
            await queueCurrentPrompt();
            setState(STATE.IDLE);
        } catch (e) {
            console.error?.("[MFV Run]", e);
            setState(STATE.ERROR);
            setTimeout(() => {
                if (state === STATE.ERROR) setState(STATE.IDLE);
            }, 1500);
        }
    }

    async function handleStopClick() {
        if (state === STATE.RUNNING) return;
        stopBtn.disabled = true;
        try {
            await stopCurrentGeneration();
        } catch (e) {
            console.error?.("[MFV Stop]", e);
        } finally {
            stopBtn.disabled = false;
        }
    }

    setStopLabel();

    btn.addEventListener("click", handleClick);
    stopBtn.addEventListener("click", handleStopClick);

    return {
        el: wrap,
        dispose() {
            btn.removeEventListener("click", handleClick);
            stopBtn.removeEventListener("click", handleStopClick);
        },
    };
}

export function resolveMfvPreviewMethod(value = APP_CONFIG.MFV_PREVIEW_METHOD) {
    const normalized = String(value || "").trim().toLowerCase();
    if (MFV_PREVIEW_METHODS.has(normalized)) return normalized;
    return "taesd";
}

export function enrichPromptDataForMfv(promptData, previewMethod = APP_CONFIG.MFV_PREVIEW_METHOD) {
    const normalizedMethod = resolveMfvPreviewMethod(previewMethod);
    const extraData = {
        ...(promptData?.extra_data || {}),
        extra_pnginfo: {
            ...(promptData?.extra_data?.extra_pnginfo || {}),
        },
    };
    if (promptData?.workflow != null) {
        extraData.extra_pnginfo.workflow = promptData.workflow;
    }
    if (normalizedMethod !== "default") {
        extraData.preview_method = normalizedMethod;
    } else {
        delete extraData.preview_method;
    }
    return {
        ...promptData,
        extra_data: extraData,
    };
}

export function buildPromptRequestBody(
    promptData,
    { previewMethod = APP_CONFIG.MFV_PREVIEW_METHOD, clientId = null } = {},
) {
    const enriched = enrichPromptDataForMfv(promptData, previewMethod);
    const body = {
        prompt: enriched?.output,
        extra_data: enriched?.extra_data || {},
    };
    const safeClientId = String(clientId || "").trim();
    if (safeClientId) body.client_id = safeClientId;
    return body;
}

function resolveClientId(api, app) {
    const candidates = [
        api?.clientId,
        api?.clientID,
        api?.client_id,
        app?.clientId,
        app?.clientID,
        app?.client_id,
    ];
    for (const value of candidates) {
        const safe = String(value || "").trim();
        if (safe) return safe;
    }
    return "";
}

/**
 * Queue the current workflow for execution.
 * Tries, in order: api.queuePrompt -> POST /prompt.
 */
async function queueCurrentPrompt() {
    const app = getComfyApp();
    if (!app) throw new Error("ComfyUI app not available");

    const promptData = typeof app.graphToPrompt === "function"
        ? await app.graphToPrompt()
        : null;
    if (!promptData?.output) throw new Error("graphToPrompt returned empty output");

    const api = getComfyApi(app);
    if (api && typeof api.queuePrompt === "function") {
        await api.queuePrompt(0, enrichPromptDataForMfv(promptData));
        return;
    }

    const resp = await fetch("/prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            buildPromptRequestBody(promptData, {
                clientId: resolveClientId(api, app),
            }),
        ),
    });
    if (!resp.ok) throw new Error(`POST /prompt failed (${resp.status})`);
}

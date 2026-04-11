const WRITE_METHODS = new Set(["POST", "PUT", "DELETE", "PATCH"]);
const DEFAULT_FETCH_TIMEOUT_MS = 20_000;
const MAX_FETCH_TIMEOUT_MS = 300_000;
const MAX_RETRIES = 3;
const RETRY_BASE_DELAY_MS = 400;
const BOOTSTRAP_TOKEN_PATH = "/mjr/am/settings/security/bootstrap-token";
const API_PREFIX = "/mjr/am/";
const _pendingRequests = new Map();

export function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function _methodIsWrite(method) {
    return WRITE_METHODS.has(String(method || "").trim().toUpperCase());
}

function _normalizeUrlPath(url) {
    try {
        const raw = String(url || "").trim();
        if (!raw) return "";
        if (raw.startsWith("http://") || raw.startsWith("https://")) {
            const base =
                typeof globalThis !== "undefined" && globalThis?.location?.origin
                    ? String(globalThis.location.origin)
                    : "http://localhost";
            return new URL(raw, base).pathname || "";
        }
        return raw.split("?")[0] || "";
    } catch {
        return "";
    }
}

function _isMajoorApiUrl(url) {
    return _normalizeUrlPath(url).startsWith(API_PREFIX);
}

function _isBootstrapTokenUrl(url) {
    return _normalizeUrlPath(url) === BOOTSTRAP_TOKEN_PATH;
}

function _isRetryableError(error) {
    try {
        if (!error) return false;
        const name = String(error.name || "");
        if (name === "AbortError") return false;
        const msg = String(error.message || "").toLowerCase();
        if (name === "TypeError") {
            return (
                msg.includes("failed to fetch") ||
                msg.includes("networkerror") ||
                msg.includes("load failed") ||
                msg.includes("fetch") ||
                msg.includes("network")
            );
        }
        return msg.includes("fetch") || msg.includes("network") || msg.includes("failed");
    } catch {
        return false;
    }
}

function _resolveFetchTimeoutMs(options = {}) {
    try {
        const raw = Number(options?.timeoutMs);
        if (!Number.isFinite(raw)) return DEFAULT_FETCH_TIMEOUT_MS;
        return Math.max(1_000, Math.min(MAX_FETCH_TIMEOUT_MS, Math.floor(raw)));
    } catch {
        return DEFAULT_FETCH_TIMEOUT_MS;
    }
}

function _buildTimedSignal(options = {}) {
    const upstreamSignal = options?.signal || null;
    if (typeof AbortController === "undefined") {
        return {
            signal: upstreamSignal || undefined,
            timeoutMs: _resolveFetchTimeoutMs(options),
            cleanup: () => {},
        };
    }
    const timeoutMs = _resolveFetchTimeoutMs(options);
    const ctrl = new AbortController();
    let timer = null;
    const onAbort = () => {
        try {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
        } catch (e) {
            console.debug?.(e);
        }
        try {
            ctrl.abort();
        } catch (e) {
            console.debug?.(e);
        }
    };
    try {
        timer = setTimeout(() => {
            try {
                ctrl.abort();
            } catch (e) {
                console.debug?.(e);
            }
        }, timeoutMs);
    } catch (e) {
        console.debug?.(e);
    }
    try {
        if (upstreamSignal) {
            if (upstreamSignal.aborted) {
                onAbort();
            } else {
                upstreamSignal.addEventListener("abort", onAbort, { once: true });
            }
        }
    } catch (e) {
        console.debug?.(e);
    }
    return {
        signal: ctrl.signal,
        timeoutMs,
        cleanup: () => {
            try {
                if (timer) clearTimeout(timer);
            } catch (e) {
                console.debug?.(e);
            }
            try {
                if (upstreamSignal) upstreamSignal.removeEventListener("abort", onAbort);
            } catch (e) {
                console.debug?.(e);
            }
        },
    };
}

function _buildPendingRequestKey(method, url, options = {}) {
    const normalizedMethod = String(method || "GET").trim().toUpperCase();
    const normalizedUrl = String(url || "").trim();
    if (!normalizedMethod || !normalizedUrl) return "";
    const timeoutMs = _resolveFetchTimeoutMs(options);
    return `${normalizedMethod}:${normalizedUrl}:timeout=${timeoutMs}`;
}

function _deduplicatedFetch(key, fetcher) {
    const normalizedKey = String(key || "").trim();
    if (!normalizedKey) return fetcher();
    if (_pendingRequests.has(normalizedKey)) {
        return _pendingRequests.get(normalizedKey);
    }
    const pending = Promise.resolve()
        .then(() => fetcher())
        .finally(() => {
            try {
                _pendingRequests.delete(normalizedKey);
            } catch (e) {
                console.debug?.(e);
            }
        });
    _pendingRequests.set(normalizedKey, pending);
    return pending;
}

/**
 * Create the shared API fetch helpers used by the Majoor client.
 */
export function createApiFetchClient({
    readObsEnabled = () => false,
    readAuthToken = () => "",
    ensureWriteAuthToken = async () => "",
    normalizeWriteAuthFailure = (result) => result,
    trackApiCall = null,
} = {}) {
    async function fetchAPI(url, options = {}, retryCount = 0) {
        const apiStartTime = typeof performance !== "undefined" ? performance.now() : Date.now();
        const timed = _buildTimedSignal(options);
        let result = null;
        try {
            const headers =
                typeof Headers !== "undefined"
                    ? new Headers(options.headers || {})
                    : { ...options.headers };
            const method = (options.method || "GET").toUpperCase();
            const authRetryDone = !!options?._authRetryDone;

            if (_methodIsWrite(method)) {
                try {
                    if (headers instanceof Headers) {
                        if (!headers.has("X-Requested-With")) {
                            headers.set("X-Requested-With", "XMLHttpRequest");
                        }
                    } else if (!headers["X-Requested-With"]) {
                        headers["X-Requested-With"] = "XMLHttpRequest";
                    }
                } catch (e) {
                    console.debug?.(e);
                }
            }

            const obsEnabled = !!readObsEnabled();
            try {
                if (headers instanceof Headers) {
                    if (!headers.has("X-MJR-OBS")) {
                        headers.set("X-MJR-OBS", obsEnabled ? "on" : "off");
                    }
                } else if (!("X-MJR-OBS" in headers)) {
                    headers["X-MJR-OBS"] = obsEnabled ? "on" : "off";
                }
            } catch (e) {
                console.debug?.(e);
            }

            let authToken = readAuthToken();
            if (!authToken && _methodIsWrite(method) && _isMajoorApiUrl(url) && !_isBootstrapTokenUrl(url)) {
                try {
                    await ensureWriteAuthToken();
                } catch (e) {
                    console.debug?.(e);
                }
                authToken = readAuthToken();
            }
            if (authToken) {
                try {
                    if (headers instanceof Headers) {
                        if (!headers.has("X-MJR-Token")) headers.set("X-MJR-Token", authToken);
                        if (!headers.has("Authorization")) {
                            headers.set("Authorization", `Bearer ${authToken}`);
                        }
                    } else {
                        if (!("X-MJR-Token" in headers)) headers["X-MJR-Token"] = authToken;
                        if (!("Authorization" in headers)) {
                            headers["Authorization"] = `Bearer ${authToken}`;
                        }
                    }
                } catch (e) {
                    console.debug?.(e);
                }
            }

            const fetchOptions = { ...options, headers, signal: timed.signal };
            try {
                delete fetchOptions._authRetryDone;
                delete fetchOptions.timeoutMs;
            } catch (e) {
                console.debug?.(e);
            }
            const response = await fetch(url, fetchOptions);
            const contentType = response.headers.get("content-type") || "";
            if (!contentType.includes("application/json")) {
                if (
                    !authRetryDone &&
                    _methodIsWrite(method) &&
                    _isMajoorApiUrl(url) &&
                    !_isBootstrapTokenUrl(url) &&
                    Number(response.status || 0) === 401
                ) {
                    const refreshed = await ensureWriteAuthToken({
                        force: true,
                        allowCookieRefresh: true,
                    });
                    if (refreshed) {
                        const retryOptions = { ...options, _authRetryDone: true };
                        return await fetchAPI(url, retryOptions, retryCount);
                    }
                }
                return {
                    ok: false,
                    error: `Server returned non-JSON response (${response.status})`,
                    code: "INVALID_RESPONSE",
                    status: response.status,
                    content_type: contentType,
                    data: null,
                };
            }

            result = await response.json().catch((e) => {
                console.debug?.("[MJR API] JSON parse error:", e);
                return null;
            });
            if (typeof result !== "object" || result === null) {
                return {
                    ok: false,
                    error: "Invalid response structure",
                    code: "INVALID_RESPONSE",
                    status: response.status,
                    data: null,
                };
            }

            if (!("status" in result)) {
                try {
                    result.status = response.status;
                } catch (e) {
                    console.debug?.(e);
                }
            }
            const shouldTryAuthRefresh =
                !authRetryDone &&
                _methodIsWrite(method) &&
                !_isBootstrapTokenUrl(url) &&
                !result?.ok &&
                (String(result?.code || "").toUpperCase() === "AUTH_REQUIRED" ||
                    Number(result?.status || 0) === 401);

            if (shouldTryAuthRefresh) {
                const refreshed = await ensureWriteAuthToken({
                    force: true,
                    allowCookieRefresh: true,
                });
                if (refreshed) {
                    const retryOptions = { ...options, _authRetryDone: true };
                    return await fetchAPI(url, retryOptions, retryCount);
                }
            }

            if (_methodIsWrite(method) && _isMajoorApiUrl(url) && !_isBootstrapTokenUrl(url)) {
                result = normalizeWriteAuthFailure(result);
            }

            return result;
        } catch (error) {
            try {
                if (String(error?.name || "") === "AbortError") {
                    if (options?.signal && options.signal.aborted) {
                        return { ok: false, error: "Aborted", code: "ABORTED", data: null };
                    }
                    return {
                        ok: false,
                        error: `Request timed out after ${timed.timeoutMs}ms`,
                        code: "TIMEOUT",
                        data: null,
                        timeout_ms: timed.timeoutMs,
                    };
                }
            } catch (e) {
                console.debug?.(e);
            }
            if (retryCount < MAX_RETRIES && _isRetryableError(error)) {
                try {
                    await delay(RETRY_BASE_DELAY_MS * (retryCount + 1));
                } catch (e) {
                    console.debug?.(e);
                }
                try {
                    return await fetchAPI(url, options, retryCount + 1);
                } catch (e) {
                    console.debug?.(e);
                }
            }
            return {
                ok: false,
                error: error?.message || String(error || "Network error"),
                code: "NETWORK_ERROR",
                data: null,
                retries: retryCount,
            };
        } finally {
            try {
                const apiEndTime = typeof performance !== "undefined" ? performance.now() : Date.now();
                const duration = apiEndTime - apiStartTime;
                if (typeof trackApiCall === "function") {
                    trackApiCall(duration, !result?.ok);
                } else if (typeof window !== "undefined" && window.MajoorMetrics) {
                    window.MajoorMetrics.trackApiCall(duration, !result?.ok);
                }
            } catch (e) {
                console.debug?.(e);
            }

            try {
                timed.cleanup?.();
            } catch (e) {
                console.debug?.(e);
            }
        }
    }

    async function get(url, options = {}) {
        const dedupeKey =
            options?.dedupe === false
                ? ""
                : String(options?.dedupeKey || "").trim() ||
                  _buildPendingRequestKey("GET", url, options);
        return _deduplicatedFetch(dedupeKey, () => fetchAPI(url, { ...options, method: "GET" }));
    }

    async function post(url, body, options = {}) {
        return fetchAPI(url, {
            ...options,
            method: "POST",
            headers: { "Content-Type": "application/json", ...options.headers },
            body: JSON.stringify(body),
        });
    }

    return { fetchAPI, get, post };
}

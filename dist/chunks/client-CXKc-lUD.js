import { C as e, X as t, Y as n, ct as r, dt as i, ft as a, l as o, pt as s } from "./config-CvC3JxWV.js";
//#region ui/app/settingsStore.ts
var c = "mjrSettings", l = "mjrMinimapSettings", u = new Set([
	"POST",
	"PUT",
	"DELETE",
	"PATCH"
]), d = 2e4, f = 3e5, p = 3, m = 400, h = "/mjr/am/settings/security/bootstrap-token", g = "/mjr/am/", _ = /* @__PURE__ */ new Map();
function v(e) {
	return new Promise((t) => setTimeout(t, e));
}
function y(e) {
	return u.has(String(e || "").trim().toUpperCase());
}
function b(e) {
	try {
		let t = String(e || "").trim();
		if (!t) return "";
		if (t.startsWith("http://") || t.startsWith("https://")) {
			let e = typeof globalThis < "u" && globalThis?.location?.origin ? String(globalThis.location.origin) : "http://localhost";
			return new URL(t, e).pathname || "";
		}
		return t.split("?")[0] || "";
	} catch {
		return "";
	}
}
function x(e) {
	return b(e).startsWith(g);
}
function S(e) {
	return b(e) === h;
}
function ee(e) {
	try {
		if (!e) return !1;
		let t = String(e.name || "");
		if (t === "AbortError") return !1;
		let n = String(e.message || "").toLowerCase();
		return t === "TypeError" ? n.includes("failed to fetch") || n.includes("networkerror") || n.includes("load failed") || n.includes("fetch") || n.includes("network") : n.includes("fetch") || n.includes("network") || n.includes("failed");
	} catch {
		return !1;
	}
}
function C(e = {}) {
	try {
		let t = Number(e?.timeoutMs);
		return Number.isFinite(t) ? Math.max(1e3, Math.min(f, Math.floor(t))) : d;
	} catch {
		return d;
	}
}
function te(e = {}) {
	let t = e?.signal || null;
	if (typeof AbortController > "u") return {
		signal: t || void 0,
		timeoutMs: C(e),
		cleanup: () => {}
	};
	let n = C(e), r = new AbortController(), i = null, a = () => {
		try {
			i &&= (clearTimeout(i), null);
		} catch (e) {
			console.debug?.(e);
		}
		try {
			r.abort();
		} catch (e) {
			console.debug?.(e);
		}
	};
	try {
		i = setTimeout(() => {
			try {
				r.abort();
			} catch (e) {
				console.debug?.(e);
			}
		}, n);
	} catch (e) {
		console.debug?.(e);
	}
	try {
		t && (t.aborted ? a() : t.addEventListener("abort", a, { once: !0 }));
	} catch (e) {
		console.debug?.(e);
	}
	return {
		signal: r.signal,
		timeoutMs: n,
		cleanup: () => {
			try {
				i && clearTimeout(i);
			} catch (e) {
				console.debug?.(e);
			}
			try {
				t && t.removeEventListener("abort", a);
			} catch (e) {
				console.debug?.(e);
			}
		}
	};
}
function ne(e, t, n = {}) {
	let r = String(e || "GET").trim().toUpperCase(), i = String(t || "").trim();
	return !r || !i ? "" : `${r}:${i}:timeout=${C(n)}`;
}
function re(e, t) {
	let n = String(e || "").trim();
	if (!n) return t();
	if (_.has(n)) return _.get(n);
	let r = Promise.resolve().then(() => t()).finally(() => {
		try {
			_.delete(n);
		} catch (e) {
			console.debug?.(e);
		}
	});
	return _.set(n, r), r;
}
function ie(e, t, n) {
	if (y(t)) try {
		e instanceof Headers ? e.has("X-Requested-With") || e.set("X-Requested-With", "XMLHttpRequest") : e["X-Requested-With"] ||= "XMLHttpRequest";
	} catch (e) {
		console.debug?.(e);
	}
	try {
		e instanceof Headers ? e.has("X-MJR-OBS") || e.set("X-MJR-OBS", n ? "on" : "off") : "X-MJR-OBS" in e || (e["X-MJR-OBS"] = n ? "on" : "off");
	} catch (e) {
		console.debug?.(e);
	}
}
function ae(e, t) {
	if (t) try {
		e instanceof Headers ? (e.has("X-MJR-Token") || e.set("X-MJR-Token", t), e.has("Authorization") || e.set("Authorization", `Bearer ${t}`)) : ("X-MJR-Token" in e || (e["X-MJR-Token"] = t), "Authorization" in e || (e.Authorization = `Bearer ${t}`));
	} catch (e) {
		console.debug?.(e);
	}
}
async function oe(e, t, n, r, { ensureWriteAuthToken: i, normalizeWriteAuthFailure: a, fetchAPI: o, options: s, retryCount: c }) {
	let l = e.headers.get("content-type") || "";
	if (!l.includes("application/json")) return !r && y(n) && x(t) && !S(t) && Number(e.status || 0) === 401 && await i({
		force: !0,
		allowCookieRefresh: !0
	}) ? await o(t, {
		...s,
		_authRetryDone: !0
	}, c) : {
		ok: !1,
		error: `Server returned non-JSON response (${e.status})`,
		code: "INVALID_RESPONSE",
		status: e.status,
		content_type: l,
		data: null
	};
	let u = await e.json().catch((e) => (console.debug?.("[MJR API] JSON parse error:", e), null));
	if (typeof u != "object" || !u) return {
		ok: !1,
		error: "Invalid response structure",
		code: "INVALID_RESPONSE",
		status: e.status,
		data: null
	};
	if (!("status" in u)) try {
		u.status = e.status;
	} catch (e) {
		console.debug?.(e);
	}
	return !r && y(n) && !S(t) && !u?.ok && (String(u?.code || "").toUpperCase() === "AUTH_REQUIRED" || Number(u?.status || 0) === 401) && await i({
		force: !0,
		allowCookieRefresh: !0
	}) ? await o(t, {
		...s,
		_authRetryDone: !0
	}, c) : (y(n) && x(t) && !S(t) && (u = a(u)), u);
}
function se({ readObsEnabled: e = () => !1, readAuthToken: t = () => "", ensureWriteAuthToken: n = async () => "", normalizeWriteAuthFailure: r = (e) => e, trackApiCall: i = null } = {}) {
	async function a(o, s = {}, c = 0) {
		let l = typeof performance < "u" ? performance.now() : Date.now(), u = te(s), d = null;
		try {
			let i = (s.method || "GET").toUpperCase(), l = !!s?._authRetryDone, f = typeof Headers < "u" ? new Headers(s.headers || {}) : { ...s.headers };
			ie(f, i, !!e());
			let p = t();
			if (!p && y(i) && x(o) && !S(o)) {
				try {
					await n();
				} catch (e) {
					console.debug?.(e);
				}
				p = t();
			}
			ae(f, p);
			let m = {
				...s,
				headers: f,
				signal: u.signal
			};
			try {
				delete m._authRetryDone, delete m.timeoutMs;
			} catch (e) {
				console.debug?.(e);
			}
			return d = await oe(await fetch(o, m), o, i, l, {
				ensureWriteAuthToken: n,
				normalizeWriteAuthFailure: r,
				fetchAPI: a,
				options: s,
				retryCount: c
			}), d;
		} catch (e) {
			try {
				if (String(e?.name || "") === "AbortError") return s?.signal && s.signal.aborted ? {
					ok: !1,
					error: "Aborted",
					code: "ABORTED",
					data: null
				} : {
					ok: !1,
					error: `Request timed out after ${u.timeoutMs}ms`,
					code: "TIMEOUT",
					data: null,
					timeout_ms: u.timeoutMs
				};
			} catch (e) {
				console.debug?.(e);
			}
			if (c < p && ee(e)) {
				try {
					await v(m * (c + 1));
				} catch (e) {
					console.debug?.(e);
				}
				return await a(o, s, c + 1);
			}
			return {
				ok: !1,
				error: e?.message || String(e || "Network error"),
				code: "NETWORK_ERROR",
				data: null,
				retries: c
			};
		} finally {
			try {
				let e = (typeof performance < "u" ? performance.now() : Date.now()) - l;
				typeof i == "function" ? i(e, !d?.ok) : typeof window < "u" && window.MajoorMetrics && window.MajoorMetrics.trackApiCall(e, !d?.ok);
			} catch (e) {
				console.debug?.(e);
			}
			try {
				u.cleanup?.();
			} catch (e) {
				console.debug?.(e);
			}
		}
	}
	async function o(e, t = {}) {
		return re(t?.dedupe === !1 ? "" : String(t?.dedupeKey || "").trim() || ne("GET", e, t), () => a(e, {
			...t,
			method: "GET"
		}));
	}
	async function s(e, t, n = {}) {
		return a(e, {
			...n,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...n.headers
			},
			body: JSON.stringify(t)
		});
	}
	return {
		fetchAPI: a,
		get: o,
		post: s
	};
}
//#endregion
//#region ui/utils/ttlCache.ts
function w({ ttlMs: e = 0, maxSize: t = 100, now: n = () => Date.now() } = {}) {
	let r = /* @__PURE__ */ new Map();
	function i() {
		try {
			let e = Number(n());
			return Number.isFinite(e) ? e : Date.now();
		} catch {
			return Date.now();
		}
	}
	function a() {
		try {
			let t = Number(typeof e == "function" ? e() : e);
			return Number.isFinite(t) ? Math.max(0, Math.floor(t)) : 0;
		} catch {
			return 0;
		}
	}
	function o() {
		try {
			let e = Number(t);
			return Number.isFinite(e) ? Math.max(1, Math.floor(e)) : 1;
		} catch {
			return 1;
		}
	}
	function s(e, t, n) {
		return e ? n > 0 ? t - Number(e.at || 0) > n : !1 : !0;
	}
	function c(e = i(), t = a()) {
		if (t > 0) for (let [n, i] of r.entries()) s(i, e, t) && r.delete(n);
	}
	function l() {
		let e = o();
		for (; r.size > e;) {
			let e = r.keys().next().value;
			if (e === void 0) break;
			r.delete(e);
		}
	}
	function u(e, t) {
		r.delete(e), r.set(e, t);
	}
	return {
		get(e) {
			let t = i(), n = a();
			c(t, n);
			let o = r.get(e);
			if (o) {
				if (s(o, t, n)) {
					r.delete(e);
					return;
				}
				return o.value;
			}
		},
		has(e) {
			return this.get(e) !== void 0;
		},
		set(e, t, n = {}) {
			let o = Number(n?.at), s = {
				value: t,
				at: Number.isFinite(o) ? o : i()
			};
			return r.has(e) ? u(e, s) : r.set(e, s), c(i(), a()), l(), t;
		},
		delete(e) {
			return r.delete(e);
		},
		clear() {
			r.clear();
		},
		prune() {
			return c(i(), a()), l(), r.size;
		},
		keys() {
			return this.prune(), Array.from(r.keys());
		},
		entries() {
			return this.prune(), Array.from(r.entries()).map(([e, t]) => [e, t.value]);
		},
		get size() {
			return this.prune(), r.size;
		}
	};
}
//#endregion
//#region ui/features/panel/messages/toastHistory.ts
var T = "mjr_toast_history_v1", ce = "mjr_toast_history_last_read_v1", le = 60, ue = "mjr:toast-history-changed", E = null;
function D(e) {
	return String(e || "").trim();
}
function de(e) {
	let t = D(e).toLowerCase();
	return t === "warn" ? "warning" : t === "danger" ? "error" : t || "info";
}
function fe(e) {
	let t = Number(e);
	return Number.isFinite(t) ? t : null;
}
function pe(e) {
	if (!e || typeof e != "object") return null;
	let t = Number(e.percent), n = Number.isFinite(t) ? Math.max(0, Math.min(100, Math.round(t))) : null, r = Number(e.current), i = Number(e.total), a = Number.isFinite(r) ? Math.max(0, Math.floor(r)) : null, o = Number.isFinite(i) ? Math.max(0, Math.floor(i)) : null, s = Number(e.indexed), c = Number(e.skipped), l = Number(e.errors), u = Number.isFinite(s) ? Math.max(0, Math.floor(s)) : null, d = Number.isFinite(c) ? Math.max(0, Math.floor(c)) : null, f = Number.isFinite(l) ? Math.max(0, Math.floor(l)) : null, p = D(e.label);
	return n === null && a === null && o === null && u === null && d === null && f === null && !p ? null : {
		percent: n,
		current: a,
		total: o,
		indexed: u,
		skipped: d,
		errors: f,
		label: p
	};
}
function me(e, t, n) {
	return e && t ? `${e}: ${t}` : t || e || n || "";
}
function O(e, t = "info", n = null) {
	if (!e || typeof e != "object") return null;
	let r = D(e.title || e.summary), a = D(e.detail), o = D(e.message || me(r, a, D(e.fallbackMessage)));
	if (!o) return null;
	let s = fe(e.durationMs ?? e.duration ?? n), c = Number(e.createdAt), l = Number.isFinite(c) && c > 0 ? c : Date.now(), u = typeof e.persistent == "boolean" ? e.persistent : !(Number.isFinite(s) && (s ?? 0) > 0);
	return {
		id: D(e.id) || i(`th-${l}-`, 4),
		message: o,
		title: r,
		detail: a,
		type: de(e.type || t),
		createdAt: l,
		durationMs: s,
		persistent: u,
		source: D(e.source),
		trackId: D(e.trackId),
		status: D(e.status),
		operation: D(e.operation),
		progress: pe(e.progress),
		forceStore: !!e.forceStore,
		actionLabel: D(e.actionLabel),
		actionUrl: D(e.actionUrl)
	};
}
function k() {
	if (E === null) try {
		let e = localStorage.getItem(T), t = e ? JSON.parse(e) : [];
		E = Array.isArray(t) ? t.map((e) => {
			if (e && typeof e == "object") return O(e);
			let t = D(e);
			return t ? O({ message: t }) : null;
		}).filter(Boolean) : [];
	} catch {
		E = [];
	}
}
function he() {
	try {
		localStorage.setItem(T, JSON.stringify(E));
	} catch {}
}
function A() {
	try {
		window.dispatchEvent(new CustomEvent(ue));
	} catch {}
}
function ge() {
	try {
		return Number(localStorage.getItem(ce)) || 0;
	} catch {
		return 0;
	}
}
function _e(e) {
	try {
		localStorage.setItem(ce, String(Number(e) || 0));
	} catch {}
}
function j(e, t, n) {
	k();
	let r = O(e && typeof e == "object" ? e : {
		message: D(e),
		type: t,
		durationMs: n
	}, t, n);
	if (!r || !r.forceStore && !r.trackId && r.type === "info" && Number.isFinite(r.durationMs) && r.durationMs != null && r.durationMs > 0 && r.durationMs < 2500) return;
	let i = String(r.trackId || "").trim();
	if (i) {
		let e = E.findIndex((e) => String(e?.trackId || "").trim() === i);
		if (e >= 0) {
			let t = E[e] || {};
			E.splice(e, 1), r.id = String(t.id || r.id || "").trim() || r.id;
		}
	}
	E.unshift(r), E.length > le && (E = E.slice(0, le)), he(), A();
}
function ve() {
	return k(), E.map((e) => ({ ...e }));
}
function ye() {
	k();
	let e = ge();
	return E.filter((t) => t.createdAt > e).length;
}
function be() {
	_e(Date.now()), A();
}
function xe() {
	k(), E = [], he(), _e(Date.now()), A();
}
//#endregion
//#region ui/app/toast.ts
function Se(e) {
	let t = String(e || "info").trim().toLowerCase();
	return t === "warn" ? "warning" : t === "danger" ? "error" : t === "success" || t === "warning" || t === "error" ? t : "info";
}
function M(e) {
	if (typeof e == "string") return e;
	if (e && typeof e == "object") {
		let t = String(e.summary || "").trim(), n = String(e.detail || e.message || "").trim();
		if (t && n) return `${t}: ${n}`;
		if (n) return n;
		if (t) return t;
	}
	try {
		return String(e?.message || e || "").trim() || "Unknown message";
	} catch {
		return "Unknown message";
	}
}
function Ce(e, t, n, r) {
	let i = r?.history && typeof r.history == "object" ? r.history : null, a = {
		persistent: !(Number.isFinite(Number(n)) && Number(n) > 0),
		source: String(i?.source || r?.source || "").trim(),
		trackId: String(i?.trackId || "").trim(),
		status: String(i?.status || "").trim(),
		operation: String(i?.operation || "").trim(),
		progress: i?.progress && typeof i.progress == "object" ? { ...i.progress } : null,
		forceStore: !!i?.forceStore,
		actionLabel: String(i?.actionLabel || "").trim(),
		actionUrl: String(i?.actionUrl || "").trim()
	};
	return e && typeof e == "object" ? (a.title = String(i?.title || e.summary || "").trim(), a.detail = String(i?.detail || e.detail || e.message || "").trim(), a.message = M(e), a) : (a.title = String(i?.title || "").trim(), a.detail = String(i?.detail || "").trim(), a.message = M(e), a);
}
function we(e, t = "info", n, r) {
	try {
		let i = Ce(e, t, n, r);
		i.forceStore = !0, j(i, t, n ?? void 0);
	} catch {}
}
function Te(e) {
	switch (e) {
		case "success": return 2e3;
		case "info": return 3e3;
		case "warning": return 4e3;
		case "error": return 5e3;
		default: return 5e3;
	}
}
function Ee(e) {
	if (typeof e != "string") return e;
	let t = e.trim(), n = {
		"Failed to update rating": o("toast.ratingUpdateFailed", "Failed to update rating"),
		"Error updating rating": o("toast.ratingUpdateError", "Error updating rating"),
		"Rating cleared": o("toast.ratingCleared", "Rating cleared"),
		"Failed to update tags": o("toast.tagsUpdateFailed", "Failed to update tags"),
		"Tags updated": o("toast.tagsUpdated", "Tags updated"),
		"Failed to toggle watcher": o("toast.watcherToggleFailed", "Failed to toggle watcher"),
		"No valid assets selected.": o("toast.noValidAssetsSelected", "No valid assets selected."),
		"Name collision in current view": o("toast.nameCollisionInView", "Name collision in current view"),
		"Failed to create collection.": o("toast.failedCreateCollectionDot", "Failed to create collection."),
		"Failed to add assets to collection.": o("toast.failedAddAssetsToCollection", "Failed to add assets to collection."),
		"Failed to remove from collection.": o("toast.removeFromCollectionFailed", "Failed to remove from collection."),
		"Collection created": o("toast.collectionCreated", "Collection created"),
		"Added to collection": o("toast.addedToCollection", "Added to collection"),
		"Removed from collection": o("toast.removedFromCollection", "Removed from collection"),
		"File renamed successfully!": o("toast.fileRenamedSuccess", "File renamed successfully!"),
		"Failed to rename file": o("toast.fileRenameFailed", "Failed to rename file"),
		"Failed to rename file.": o("toast.fileRenameFailed", "Failed to rename file."),
		"File deleted successfully!": o("toast.fileDeletedSuccess", "File deleted successfully!"),
		"Failed to delete file.": o("toast.fileDeleteFailed", "Failed to delete file."),
		"Failed to delete file. ": o("toast.fileDeleteFailed", "Failed to delete file."),
		"File deleted": o("toast.deleted", "File deleted"),
		"File renamed": o("toast.renamed", "File renamed"),
		"Folder created": o("toast.folderCreated", "Folder created"),
		"Folder renamed": o("toast.folderRenamed", "Folder renamed"),
		"Folder moved": o("toast.folderMoved", "Folder moved"),
		"Folder deleted": o("toast.folderDeleted", "Folder deleted"),
		"Failed to create folder": o("toast.createFolderFailed", "Failed to create folder"),
		"Failed to rename folder": o("toast.renameFolderFailed", "Failed to rename folder"),
		"Failed to move folder": o("toast.moveFolderFailed", "Failed to move folder"),
		"Failed to delete folder": o("toast.deleteFolderFailed", "Failed to delete folder"),
		"Failed to pin folder": o("toast.pinFolderFailed", "Failed to pin folder"),
		"Failed to unpin folder": o("toast.unpinFolderFailed", "Failed to unpin folder"),
		"Folder pinned as browser root": o("toast.folderPinnedAsBrowserRoot", "Folder pinned as browser root"),
		"Folder added": o("toast.folderAdded", "Folder added"),
		"Folder removed": o("toast.folderRemoved", "Folder removed"),
		"Folder linked successfully": o("toast.folderLinked", "Folder linked successfully"),
		"An error occurred while adding the custom folder": o("toast.errorAddingFolder", "An error occurred while adding the custom folder"),
		"An error occurred while removing the custom folder": o("toast.errorRemovingFolder", "An error occurred while removing the custom folder"),
		"Failed to add custom folder": o("toast.failedAddFolder", "Failed to add custom folder"),
		"Failed to remove custom folder": o("toast.failedRemoveFolder", "Failed to remove custom folder"),
		"Native folder browser unavailable. Please enter path manually.": o("toast.nativeBrowserUnavailable", "Native folder browser unavailable. Please enter path manually."),
		"Opened in folder": o("toast.openedInFolder", "Opened in folder"),
		"Failed to open folder": o("toast.openFolderFailed", "Failed to open folder"),
		"Failed to open folder.": o("toast.openFolderFailed", "Failed to open folder."),
		"File path copied to clipboard": o("toast.pathCopied", "File path copied to clipboard"),
		"Failed to copy path": o("toast.pathCopyFailed", "Failed to copy path"),
		"Failed to copy to clipboard": o("toast.copyClipboardFailed", "Failed to copy to clipboard"),
		"No file path available for this asset.": o("toast.noFilePath", "No file path available for this asset."),
		"Failed to refresh metadata.": o("toast.metadataRefreshFailed", "Failed to refresh metadata."),
		"Metadata refreshed": o("toast.metadataRefreshed", "Metadata refreshed"),
		"Duplicate analysis started": o("toast.dupAnalysisStarted", "Duplicate analysis started"),
		"Tags merged": o("toast.tagsMerged", "Tags merged"),
		"Duplicates deleted": o("toast.duplicatesDeleted", "Duplicates deleted"),
		"Rescanning file...": o("toast.rescanningFile", "Rescanning file..."),
		"Metadata enrichment complete": o("toast.enrichmentComplete", "Metadata enrichment complete"),
		"Playback speed is available for video media only": o("toast.playbackVideoOnly", "Playback speed is available for video media only"),
		"DB backup saved": o("toast.dbSaveSuccess", "DB backup saved"),
		"Failed to save DB backup": o("toast.dbSaveFailed", "Failed to save DB backup"),
		"DB restore started": o("toast.dbRestoreStarted", "DB restore started"),
		"Failed to restore DB backup": o("toast.dbRestoreFailed", "Failed to restore DB backup"),
		"Select a DB backup first": o("toast.dbRestoreSelect", "Select a DB backup first"),
		"Stopping running workers": o("toast.dbRestoreStopping", "Stopping running workers"),
		"Unlocking and resetting database": o("toast.dbRestoreResetting", "Unlocking and resetting database"),
		"Recreating database": o("toast.dbRestoreReplacing", "Recreating database"),
		"Replacing database files": o("toast.dbRestoreReplacing", "Replacing database files"),
		"Restarting scan": o("toast.dbRestoreRescan", "Restarting scan"),
		"Deleting database and rebuilding...": o("toast.dbDeleteTriggered", "Deleting database and rebuilding..."),
		"Database deleted and rebuilt. Files are being reindexed.": o("toast.dbDeleteSuccess", "Database deleted and rebuilt. Files are being reindexed."),
		"Failed to delete database": o("toast.dbDeleteFailed", "Failed to delete database"),
		"Database backup restored": o("toast.dbRestoreSuccess", "Database backup restored"),
		"Index reset started. Files will be reindexed in the background.": o("toast.resetStarted", "Index reset started. Files will be reindexed in the background."),
		"Failed to reset index": o("toast.resetFailed", "Failed to reset index"),
		"Reset triggered: Reindexing all files...": o("toast.resetTriggered", "Reset triggered: Reindexing all files..."),
		"Reset failed - database is corrupted. Use the \"Delete DB\" button to force-delete and rebuild.": o("toast.resetFailedCorrupt", "Reset failed - database is corrupted. Use the \"Delete DB\" button to force-delete and rebuild."),
		"Scan started": o("toast.scanStarted", "Scan started"),
		"Scan complete": o("toast.scanComplete", "Scan complete"),
		"Scan failed": o("toast.scanFailed", "Scan failed"),
		"Permission denied": o("toast.permissionDenied", "Permission denied"),
		"Language changed. Reload the page for full effect.": o("toast.languageChanged", "Language changed. Reload the page for full effect."),
		"Tag added": o("toast.tagAdded", "Tag added"),
		"Tag removed": o("toast.tagRemoved", "Tag removed"),
		"Rating saved": o("toast.ratingSaved", "Rating saved"),
		"Failed to create collection": o("toast.failedCreateCollection", "Failed to create collection"),
		"Failed to delete collection": o("toast.failedDeleteCollection", "Failed to delete collection")
	};
	if (n[t]) return n[t];
	let r;
	if (r = t.match(/Rating set to (\d+) star(?:s)?/i), r) return o("toast.ratingSetN", "Rating set to {n} stars", { n: Number(r[1]) });
	if (r = t.match(/Downloading (.+?)\.\.\./i), r) return o("toast.downloadingFile", "Downloading {filename}...", { filename: r[1] });
	if (r = t.match(/Playback ([0-9]+(?:\.[0-9]+)?)x/i), r) return o("toast.playbackRate", "Playback {rate}x", { rate: Number(r[1]).toFixed(2) });
	if (r = t.match(/Metadata refreshed(?:\s*(.*))?/i), r) return o("toast.metadataRefreshed", "Metadata refreshed{suffix}", { suffix: r[1] ? " (" + r[1] + ")" : "" });
	if (r = t.match(/Error renaming(?: file)?:\s*(.+)/i), r) return o("toast.errorRenaming", "Error renaming file: {error}", { error: r[1] });
	if (r = t.match(/Error deleting(?: files?| file)?:\s*(.+)/i), r) return o("toast.errorDeleting", "Error deleting file: {error}", { error: r[1] });
	if (r = t.match(/Tag merge failed:\s*(.+)/i), r) return o("toast.tagMergeFailed", "Tag merge failed: {error}", { error: r[1] });
	if (r = t.match(/Delete failed:\s*(.+)/i), r) return o("toast.deleteFailed", "Delete failed: {error}", { error: r[1] });
	if (r = t.match(/Analysis not started:\s*(.+)/i), r) return o("toast.analysisNotStarted", "Analysis not started: {error}", { error: r[1] });
	if (r = t.match(/(\d+)\s+files deleted successfully!/i), r) return o("toast.filesDeletedSuccessN", "{n} files deleted successfully!", { n: Number(r[1]) });
	if (r = t.match(/(\d+)\s+files deleted,\s+(\d+)\s+failed\./i), r) return o("toast.filesDeletedPartial", "{success} files deleted, {failed} failed.", {
		success: Number(r[1]),
		failed: Number(r[2])
	});
	if (r = t.match(/(\d+)\s+files?\s+deleted/i), r) return o("toast.filesDeletedShort", "{n} files deleted", { n: Number(r[1]) });
	if (r = t.match(/(\d+)\s+deleted,\s+(\d+)\s+failed/i), r) return o("toast.filesDeletedShortPartial", "{success} deleted, {failed} failed", {
		success: Number(r[1]),
		failed: Number(r[2])
	});
	if (r = t.match(/^(.+?)\s+copied to clipboard!$/i), r) return o("toast.copiedToClipboardNamed", "{name} copied to clipboard!", { name: r[1] });
	if (r = t.match(/Folder created:\s*(.+)/i), r) return o("toast.folderCreated", "Folder created: {name}", { name: r[1] });
	if (r = t.match(/Failed to create folder:\s*(.+)/i), r) return o("toast.createFolderFailedDetail", "Failed to create folder: {error}", { error: r[1] });
	if (r = t.match(/Failed to rename folder:\s*(.+)/i), r) return o("toast.renameFolderFailedDetail", "Failed to rename folder: {error}", { error: r[1] });
	if (r = t.match(/Failed to move folder:\s*(.+)/i), r) return o("toast.moveFolderFailedDetail", "Failed to move folder: {error}", { error: r[1] });
	if (r = t.match(/Failed to delete folder:\s*(.+)/i), r) return o("toast.deleteFolderFailedDetail", "Failed to delete folder: {error}", { error: r[1] });
	if (r = t.match(/Error removing from collection:\s*(.+)/i), r) return o("toast.removeFromCollectionError", "Error removing from collection: {error}", { error: r[1] });
	if (r = t.match(/^Failed to (.+)$/i), r) {
		let e = r[1].toLowerCase(), t = {
			"add folder": o("toast.failedAddFolder", "Failed to add custom folder"),
			"remove folder": o("toast.failedRemoveFolder", "Failed to remove custom folder"),
			"create collection": o("toast.failedCreateCollection", "Failed to create collection"),
			"delete collection": o("toast.failedDeleteCollection", "Failed to delete collection")
		};
		for (let [n, r] of Object.entries(t)) if (e.includes(n)) return r;
	}
	return t;
}
function De(t, n = "info", r, i) {
	if (n = Se(n), t = Ee(t), r ??= Te(n), !i?.noHistory) try {
		j(Ce(t, n, r, i), n, r ?? void 0);
	} catch {}
	let a = !(Number.isFinite(Number(r)) && Number(r) > 0);
	try {
		let i = e();
		if (i && typeof i.add == "function") {
			let e = n;
			e === "warning" && (e = "warn");
			let s = o("manager.title"), c = t;
			if (typeof t == "object" && t?.summary) s = t.summary, c = t.detail || "";
			else if (typeof t != "string") try {
				c = t.message || String(t);
			} catch (e) {
				console.debug?.(e);
			}
			let l = {
				severity: e,
				summary: s,
				detail: c
			};
			a || (l.life = r), i.add(l);
			return;
		}
	} catch (e) {
		console.debug("Majoor: extensionManager.toast failed", e);
	}
	let s = globalThis?.app || (typeof window < "u" ? window?.app : null);
	if (s?.ui?.toast) try {
		return s.ui.toast(t, n);
	} catch (e) {
		console.debug("Native app.ui.toast failed", e);
	}
	console.warn("[Majoor Toast] Native toast API unavailable", {
		type: n,
		message: M(t),
		duration: a ? 0 : r
	});
}
//#endregion
//#region ui/api/clientAuth.ts
var Oe = 2e3, ke = 15e3, Ae = 8e3, N = "__mjr_write_token", P = "token", F = null, I = null, je = null, L = w({
	ttlMs: Oe,
	maxSize: 1
});
function Me() {
	try {
		return String(sessionStorage?.getItem?.(N) || "").trim();
	} catch {
		return "";
	}
}
function R(e) {
	let t = String(e || "").trim();
	try {
		return t ? sessionStorage?.setItem?.(N, t) : sessionStorage?.removeItem?.(N), !0;
	} catch {
		return !1;
	}
}
function Ne() {
	try {
		let e = localStorage?.getItem?.(c), t = e ? JSON.parse(e) : {}, n = t && typeof t == "object" ? t : {}, r = n?.data && typeof n.data == "object" ? n.data : n;
		r?.security && typeof r.security == "object" && String(r.security.apiToken || "").trim() && (r.security.apiToken = "", localStorage?.setItem?.(c, JSON.stringify(n)));
	} catch (e) {
		console.debug?.(e);
	}
}
function Pe() {
	try {
		L.delete(P);
	} catch (e) {
		console.debug?.(e);
	}
	R(""), Ne();
}
function z() {
	let e = L.get(P);
	if (e !== void 0) return e;
	let t = Date.now(), n = Me();
	if (n) return L.set(P, n, { at: t }), n;
	try {
		let e = localStorage?.getItem?.(c), n = e ? JSON.parse(e) : null, r = n?.data && typeof n.data == "object" ? n.data : n, i = String(r?.security?.apiToken || "").trim();
		if (i) {
			R(i);
			try {
				let e = n && typeof n == "object" ? n : {}, t = e?.data && typeof e.data == "object" ? e.data : e;
				t?.security && typeof t.security == "object" && (t.security.apiToken = "", localStorage?.setItem?.(c, JSON.stringify(e)), window?.dispatchEvent?.(new CustomEvent("mjr-settings-changed", { detail: { key: "security.apiToken" } })));
			} catch (e) {
				console.debug?.(e);
			}
		}
		return L.set(P, i, { at: t }), i;
	} catch {
		return L.set(P, "", { at: t }), "";
	}
}
function B(e) {
	let t = String(e || "").trim();
	if (!t) return !1;
	try {
		L.set(P, t), I = null, R(t), Ne();
		try {
			window?.dispatchEvent?.(new CustomEvent("mjr-settings-changed", { detail: { key: "security.apiToken" } }));
		} catch (e) {
			console.debug?.(e);
		}
		return !0;
	} catch {
		return !1;
	}
}
var Fe = /^[A-Za-z0-9._\-~+/]+=*$/;
function Ie(e) {
	let t = String(e || "").trim();
	return t ? Fe.test(t) ? B(t) : (console.debug?.("[MJR auth] Rejected malformed security token (invalid characters)"), !1) : !1;
}
function V(e = {}) {
	I = {
		code: String(e?.code || "").trim().toUpperCase(),
		error: String(e?.error || "").trim(),
		status: Number(e?.status || 0) || 0,
		at: Date.now()
	};
}
function H() {
	let e = I;
	if (!e) return null;
	let t = Date.now() - (Number(e.at || 0) || 0);
	return t < 0 || t > ke ? (I = null, null) : e;
}
function Le(e) {
	let t = H(), n = String(e?.code || "").trim().toUpperCase(), r = String(e?.error || "").trim(), i = String(t?.code || "").trim().toUpperCase(), a = String(t?.error || "").trim().toLowerCase(), s = r.toLowerCase();
	return i === "FORBIDDEN" && (a.includes("already configured") || a.includes("rotate-token")) ? o("toast.writeAuthConfiguredTokenRequired", "Write access requires the Majoor API token already configured on the server. Open Settings -> Security -> API Token and enter the matching token.") : i === "AUTH_REQUIRED" && (a.includes("sign in to comfyui") || a.includes("authenticated comfyui user")) ? o("toast.writeAuthSignInRequired", "Write access is blocked. Sign in to ComfyUI first, then retry so Majoor can bootstrap the remote session token automatically.") : i === "BOOTSTRAP_DISABLED" || i === "AUTH_REQUIRED" && a.includes("bootstrap") || n === "AUTH_REQUIRED" && s.includes("api token") ? o("toast.writeAuthBootstrapHelp", "Write access is blocked. Sign in to ComfyUI and retry so Majoor can bootstrap the remote session automatically, or set a Majoor API token in Settings -> Security.") : "";
}
function Re(e) {
	let t = String(e || "").trim();
	if (!t) return;
	let n = Date.now(), r = je;
	if (!(r && r.message === t && n - (Number(r.at || 0) || 0) < Ae)) {
		je = {
			message: t,
			at: n
		};
		try {
			De({
				summary: o("toast.writeAuthTitle", "Majoor remote write access"),
				detail: t
			}, "warning", 6500, { noHistory: !0 });
		} catch (e) {
			console.debug?.(e);
		}
	}
}
function ze(e) {
	let t = String(e?.code || "").trim().toUpperCase(), n = String(e?.error || "").trim().toLowerCase(), r = t === "FORBIDDEN" && n.includes("write operation blocked");
	if (t !== "AUTH_REQUIRED" && !r) return e;
	let i = Le(e);
	return i ? (Re(i), {
		...e,
		error: i
	}) : e;
}
async function Be() {
	try {
		let e = await fetch("/mjr/am/settings/security/bootstrap-token", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Requested-With": "XMLHttpRequest"
			},
			body: "{}"
		});
		if (!(e.headers.get("content-type") || "").includes("application/json")) return V({
			code: "INVALID_RESPONSE",
			error: `Bootstrap token request returned non-JSON response (${e.status})`,
			status: e.status
		}), {
			ok: !1,
			token: !1
		};
		let t = await e.json().catch((e) => (console.debug?.("[MJR auth] JSON parse error:", e), null));
		if (!t || typeof t != "object") return V({
			code: "INVALID_RESPONSE",
			error: "Bootstrap token response was invalid.",
			status: e.status
		}), {
			ok: !1,
			token: !1
		};
		if (!t.ok) return V({
			code: t?.code,
			error: t?.error,
			status: e.status
		}), {
			ok: !1,
			token: !1
		};
		let n = String(t?.data?.token || "").trim();
		return n ? {
			ok: B(n),
			token: !0
		} : (I = null, {
			ok: !0,
			token: !1
		});
	} catch (e) {
		return V({
			code: "NETWORK_ERROR",
			error: e?.message || "Bootstrap token request failed.",
			status: 0
		}), {
			ok: !1,
			token: !1
		};
	}
}
async function Ve({ force: e = !1, allowCookieRefresh: t = !1 } = {}) {
	let n = z();
	if (n && !e) return n;
	let r = {
		ok: !1,
		token: !1
	};
	F ||= (async () => {
		try {
			return await Be();
		} finally {
			F = null;
		}
	})();
	try {
		r = await F || r;
	} catch (e) {
		console.debug?.(e);
	}
	if (e && r?.ok && !r?.token && n) Pe();
	else if (e && !r?.ok) {
		let e = H(), t = String(e?.code || "").trim().toUpperCase();
		(!t || !["NETWORK_ERROR", "INVALID_RESPONSE"].includes(t)) && Pe();
	}
	let i = z();
	return !i && t && r?.ok ? !0 : i;
}
function U() {
	L.clear();
}
//#endregion
//#region ui/api/clientOps.ts
async function He(e) {
	return !e || typeof e != "string" ? {
		ok: !1,
		error: "Missing mode",
		code: "INVALID_INPUT"
	} : Q("/mjr/am/settings/probe-backend", { mode: e });
}
async function Ue() {
	return Z(n.SETTINGS_METADATA_FALLBACK);
}
async function We({ image: e, media: t } = {}) {
	return Q(n.SETTINGS_METADATA_FALLBACK, {
		image: e,
		media: t
	});
}
async function Ge() {
	return Z(n.SETTINGS_VECTOR_SEARCH);
}
async function Ke(e = !0) {
	if (e && typeof e == "object") {
		let t = {};
		return "enabled" in e && (t.enabled = !!e.enabled), "caption_on_index" in e && (t.caption_on_index = !!e.caption_on_index), "captionOnIndex" in e && (t.caption_on_index = !!e.captionOnIndex), Q(n.SETTINGS_VECTOR_SEARCH, t);
	}
	return Q(n.SETTINGS_VECTOR_SEARCH, { enabled: !!e });
}
async function qe() {
	return Z(n.SETTINGS_EXECUTION_GROUPING);
}
async function Je(e = !0) {
	return Q(n.SETTINGS_EXECUTION_GROUPING, { enabled: !!e });
}
async function Ye() {
	return Z(n.SETTINGS_HUGGINGFACE);
}
async function Xe(e = "") {
	return Q(n.SETTINGS_HUGGINGFACE, { token: String(e ?? "").trim() });
}
async function Ze() {
	return Z(n.SETTINGS_AI_LOGGING);
}
async function Qe(e = !1) {
	return Q(n.SETTINGS_AI_LOGGING, { enabled: !!e });
}
async function $e() {
	return Z(n.SETTINGS_ROUTE_LOGGING);
}
async function et(e = !1) {
	return Q(n.SETTINGS_ROUTE_LOGGING, { enabled: !!e });
}
async function tt() {
	return Z(n.SETTINGS_STARTUP_LOGGING);
}
async function nt(e = !1) {
	return Q(n.SETTINGS_STARTUP_LOGGING, { enabled: !!e });
}
async function rt() {
	return Z(n.SETTINGS_LTXAV_RGB_FALLBACK);
}
async function it(e = !1) {
	return Q(n.SETTINGS_LTXAV_RGB_FALLBACK, { enabled: !!e });
}
async function at() {
	return Z(n.SETTINGS_OUTPUT_DIRECTORY);
}
async function ot(e, t = {}) {
	let r = String(e ?? "").trim();
	return Q(n.SETTINGS_OUTPUT_DIRECTORY, { output_directory: r }, t);
}
async function st() {
	return Z(n.SETTINGS_INDEX_DIRECTORY);
}
async function ct(e, t = {}) {
	let r = String(e ?? "").trim();
	return Q(n.SETTINGS_INDEX_DIRECTORY, { index_directory: r }, t);
}
async function lt() {
	return Z("/mjr/am/settings/security");
}
async function ut(e) {
	return Q("/mjr/am/settings/security", e && typeof e == "object" ? e : {});
}
async function dt() {
	let e = await Q("/mjr/am/settings/security/bootstrap-token", {});
	if (e?.ok) try {
		let t = String(e?.data?.token || "").trim();
		t && B(t);
	} catch (e) {
		console.debug?.(e);
	}
	return e;
}
async function ft(e) {
	if (e && typeof e == "object") {
		let t = String(e.filepath || e.path || e?.file_info?.filepath || "").trim();
		return e.id == null ? Q("/mjr/am/open-in-folder", { filepath: t }) : Q("/mjr/am/open-in-folder", { asset_id: a(e.id) });
	}
	return Q("/mjr/am/open-in-folder", { asset_id: a(e) });
}
async function pt({ op: e = "", path: t = "", name: r = "", destination: i = "", recursive: a = !0 } = {}, o = {}) {
	let s = {
		op: String(e || "").trim().toLowerCase(),
		path: String(t || "").trim()
	};
	return r != null && String(r).trim() && (s.name = String(r).trim()), i != null && String(i).trim() && (s.destination = String(i).trim()), s.op === "delete" && (s.recursive = !!a), Q(n.BROWSER_FOLDER_OP, s, o);
}
async function mt(e = {}) {
	let t = (e, t) => e == null ? t : !!e, r = String(e.scope || "output").trim().toLowerCase() || "output", i = e.customRootId ?? e.custom_root_id ?? e.rootId ?? e.root_id ?? e.customRoot ?? null, a = {
		scope: r,
		reindex: t(e.reindex, !0),
		hard_reset_db: t(e.hardResetDb ?? e.hard_reset_db ?? e.deleteDbFiles ?? e.delete_db_files ?? e.deleteDb ?? e.delete_db ?? void 0, r === "all"),
		clear_scan_journal: t(e.clearScanJournal ?? e.clear_scan_journal, !0),
		clear_metadata_cache: t(e.clearMetadataCache ?? e.clear_metadata_cache, !0),
		clear_asset_metadata: t(e.clearAssetMetadata ?? e.clear_asset_metadata, !0),
		clear_assets: t(e.clearAssets ?? e.clear_assets, !0),
		preserve_vectors: t(e.preserveVectors ?? e.preserve_vectors ?? e.keepVectors ?? e.keep_vectors, !1),
		rebuild_fts: t(e.rebuildFts ?? e.rebuild_fts, !0),
		incremental: t(e.incremental, !1),
		fast: t(e.fast, !0),
		background_metadata: t(e.backgroundMetadata ?? e.background_metadata, !0),
		maintenance_force: t(e.maintenanceForce ?? e.maintenance_force, !1)
	};
	return i && (a.custom_root_id = String(i)), Q(n.INDEX_RESET, a);
}
async function ht({ scope: e = "output", customRootId: t = "" } = {}) {
	let r = String(e || "output").trim().toLowerCase() || "output", i = String(t || "").trim(), a = { scope: r };
	return i && (a.custom_root_id = i), Q(n.WATCHER_SCOPE, a);
}
async function gt(e = {}) {
	return Z(n.WATCHER_STATUS, e);
}
async function _t(e = !0) {
	return Q(n.WATCHER_TOGGLE, { enabled: !!e });
}
async function vt() {
	return Z(n.WATCHER_SETTINGS);
}
async function yt(e = {}) {
	return Q(n.WATCHER_SETTINGS, e);
}
async function bt(e = {}) {
	return Z(n.TOOLS_STATUS, e);
}
async function xt(e = {}) {
	return Z(n.STATUS, e);
}
async function St() {
	return Q("/mjr/am/db/force-delete", {});
}
async function Ct(e = {}) {
	return Z(n.DB_BACKUPS, e);
}
async function wt() {
	return Q(n.DB_BACKUP_SAVE, {});
}
async function Tt({ name: e = "", useLatest: t = !1 } = {}) {
	let r = {};
	return e && (r.name = String(e)), t && (r.use_latest = !0), Q(n.DB_BACKUP_RESTORE, r);
}
async function Et(e = 250) {
	return Q("/mjr/am/duplicates/analyze", { limit: Math.max(10, Math.min(5e3, Number(e) || 250)) });
}
async function Dt({ scope: e = "output", customRootId: t = "", maxGroups: n = 6, maxPairs: r = 10 } = {}, i = {}) {
	let a = `/mjr/am/duplicates/alerts?scope=${encodeURIComponent(String(e || "output"))}`;
	return t && (a += `&custom_root_id=${encodeURIComponent(String(t))}`), a += `&max_groups=${encodeURIComponent(String(Math.max(1, Number(n) || 6)))}`, a += `&max_pairs=${encodeURIComponent(String(Math.max(1, Number(r) || 10)))}`, Z(a, i);
}
async function Ot(e, t = []) {
	return Q("/mjr/am/duplicates/merge-tags", {
		keep_asset_id: Number(e) || 0,
		merge_asset_ids: Array.isArray(t) ? t.map((e) => Number(e) || 0).filter((e) => e > 0) : []
	});
}
async function kt(e) {
	let t, n;
	if (e && typeof e == "object") {
		t = a(e.id);
		let r = String(e.filepath || e.path || e?.file_info?.filepath || "").trim();
		n = t ? { asset_id: t } : { filepath: r };
	} else t = a(e), n = { asset_id: t };
	let r = await Q("/mjr/am/asset/delete", n);
	return r?.ok && t && W([t]), r;
}
async function At(e) {
	let t = Array.isArray(e) ? e.map((e) => a(e)).filter(Boolean) : [], n = await Q("/mjr/am/assets/delete", { ids: t });
	return n?.ok && W(t), n;
}
function W(e) {
	try {
		let t = (Array.isArray(e) ? e : [e]).map((e) => String(e || "").trim()).filter(Boolean);
		if (!t.length) return;
		window.dispatchEvent(new CustomEvent("mjr:assets-deleted", { detail: { ids: t } }));
	} catch (e) {
		console.debug?.(e);
	}
}
async function jt(e, t) {
	let n;
	if (e && typeof e == "object") {
		n = a(e.id);
		let r = String(e.filepath || e.path || e?.file_info?.filepath || "").trim(), i = n ? await Q("/mjr/am/asset/rename", {
			asset_id: n,
			new_name: t
		}) : await Q("/mjr/am/asset/rename", {
			filepath: r,
			new_name: t
		});
		if (i?.ok && n) try {
			let e = await $(n);
			e?.ok && e?.data && (i.data = {
				...i.data || {},
				asset: e.data
			});
		} catch (e) {
			console.debug?.(e);
		}
		return i;
	}
	n = a(e);
	let r = await Q("/mjr/am/asset/rename", {
		asset_id: n,
		new_name: t
	});
	if (r?.ok && n) try {
		let e = await $(n);
		e?.ok && e?.data && (r.data = {
			...r.data || {},
			asset: e.data
		});
	} catch (e) {
		console.debug?.(e);
	}
	return r;
}
async function Mt() {
	let e = typeof AbortController < "u" ? new AbortController() : null, t = null;
	try {
		return e && (t = setTimeout(() => e.abort(), 1e4)), await Z("/mjr/am/collections", e ? { signal: e.signal } : {});
	} finally {
		t && clearTimeout(t);
	}
}
async function Nt(e) {
	return Q("/mjr/am/collections", { name: String(e || "").trim() });
}
async function Pt(e) {
	let t = String(e || "").trim();
	return Q(`/mjr/am/collections/${encodeURIComponent(t)}/delete`, {});
}
async function Ft(e, t) {
	let n = String(e || "").trim(), r = Array.isArray(t) ? t : [];
	return Q(`/mjr/am/collections/${encodeURIComponent(n)}/add`, { assets: r });
}
async function It(e, t) {
	let n = String(e || "").trim(), r = Array.isArray(t) ? t : [];
	return Q(`/mjr/am/collections/${encodeURIComponent(n)}/remove`, { filepaths: r });
}
async function Lt(e) {
	let t = String(e || "").trim();
	return Z(`/mjr/am/collections/${encodeURIComponent(t)}/assets`);
}
async function Rt(e, r = 20) {
	let i = String(e || "").trim();
	if (!i) return {
		ok: !1,
		error: "Empty query"
	};
	let a = r && typeof r == "object" ? r : { topK: Number(r) }, o = Math.max(1, Math.min(200, Number(a?.topK ?? 20) || 20)), s = String(a?.scope || "").trim(), c = String(a?.customRootId || "").trim(), l = `${n.VECTOR_SEARCH}?q=${encodeURIComponent(i)}&top_k=${o}`;
	return s && (l += `&scope=${encodeURIComponent(s)}`), c && (l += `&custom_root_id=${encodeURIComponent(c)}`), l = t(l, {
		subfolder: a?.subfolder ?? null,
		kind: a?.kind ?? null,
		hasWorkflow: a?.hasWorkflow ?? null,
		minRating: a?.minRating ?? null,
		minSizeMB: a?.minSizeMB ?? null,
		maxSizeMB: a?.maxSizeMB ?? null,
		minWidth: a?.minWidth ?? null,
		minHeight: a?.minHeight ?? null,
		maxWidth: a?.maxWidth ?? null,
		maxHeight: a?.maxHeight ?? null,
		workflowType: a?.workflowType ?? null,
		workflowId: a?.workflowId ?? null,
		dateRange: a?.dateRange ?? null,
		dateExact: a?.dateExact ?? null
	}), Z(l, { timeoutMs: 12e4 });
}
async function zt(e, t = 20) {
	let r = String(e || "").trim();
	if (!r) return {
		ok: !1,
		error: "Missing asset ID"
	};
	let i = t && typeof t == "object" ? t : { topK: Number(t) }, a = Math.max(1, Math.min(200, Number(i?.topK ?? 20) || 20)), o = String(i?.scope || "").trim(), s = String(i?.customRootId || "").trim(), c = `${n.VECTOR_SIMILAR}/${encodeURIComponent(r)}?top_k=${a}`;
	return o && (c += `&scope=${encodeURIComponent(o)}`), s && (c += `&custom_root_id=${encodeURIComponent(s)}`), Z(c, { dedupeKey: `vec:${r}:${a}:${o}:${s}` });
}
async function Bt(e) {
	let t = String(e || "").trim();
	return t ? Z(`${n.VECTOR_ALIGNMENT}/${encodeURIComponent(t)}`) : {
		ok: !1,
		error: "Missing asset ID"
	};
}
async function Vt(e) {
	let t = String(e || "").trim();
	return t ? Q(`${n.VECTOR_INDEX}/${encodeURIComponent(t)}`, {}) : {
		ok: !1,
		error: "Missing asset ID"
	};
}
async function Ht() {
	return Z(n.VECTOR_STATS);
}
async function Ut(e = 64, t = {}) {
	let r = Math.max(1, Math.min(200, e)), i = typeof t?.onProgress == "function" ? t.onProgress : null, a = String(t?.scope || "").trim().toLowerCase(), o = String(t?.customRootId ?? t?.custom_root_id ?? "").trim(), s = `${n.VECTOR_BACKFILL}?batch_size=${r}&async=1`;
	a && (s += `&scope=${encodeURIComponent(a)}`), o && (s += `&custom_root_id=${encodeURIComponent(o)}`);
	let c = await Q(s, {}, { timeoutMs: 3e4 });
	if (!c?.ok) return c;
	let l = c?.data || {}, u = String(l?.status || "").toLowerCase(), d = String(l?.backfill_id || "").trim();
	try {
		i?.(l);
	} catch (e) {
		console.debug?.(e);
	}
	if (!d || ![
		"queued",
		"running",
		"pending"
	].includes(u)) return c;
	let f = Number(t?.pollIntervalMs), p = Number(t?.pollTimeoutMs), m = Number.isFinite(f) ? Math.max(500, Math.min(1e4, Math.floor(f))) : Zt, h = Number.isFinite(p) ? Math.max(1e4, Math.min($t, Math.floor(p))) : Qt, g = Date.now(), _ = null;
	for (; Date.now() - g < h;) {
		await v(m);
		let e = await Z(`${n.VECTOR_BACKFILL_STATUS}?backfill_id=${encodeURIComponent(d)}`, { timeoutMs: 3e4 });
		if (!e?.ok) {
			_ = e;
			continue;
		}
		let t = e?.data || {}, r = String(t?.status || "").toLowerCase();
		_ = e;
		try {
			i?.(t);
		} catch (e) {
			console.debug?.(e);
		}
		if (r === "succeeded") return {
			ok: !0,
			data: t?.result || {},
			code: null,
			status: 200
		};
		if (r === "failed") return {
			ok: !1,
			error: String(t?.error || "Vector backfill failed"),
			code: String(t?.code || "DB_ERROR"),
			data: t,
			status: 500
		};
	}
	let y = await Z(`${n.VECTOR_BACKFILL_STATUS}?backfill_id=${encodeURIComponent(d)}`, { timeoutMs: 3e4 }), b = y?.data || _?.data || {}, x = String(b?.status || "").toLowerCase();
	if (y?.ok && [
		"queued",
		"running",
		"pending"
	].includes(x)) {
		try {
			i?.(b);
		} catch (e) {
			console.debug?.(e);
		}
		return {
			ok: !0,
			code: "PENDING",
			status: 202,
			data: {
				...b,
				pending: !0,
				timed_out: !0,
				poll_timeout_ms: h,
				backfill_id: String(b?.backfill_id || d),
				status: x || "running"
			},
			meta: { pending: !0 }
		};
	}
	return y?.ok && x === "failed" ? {
		ok: !1,
		error: String(b?.error || "Vector backfill failed"),
		code: String(b?.code || "DB_ERROR"),
		data: b,
		status: 500
	} : {
		ok: !1,
		error: `Vector backfill polling timed out after ${h}ms`,
		code: "TIMEOUT",
		data: b || null,
		status: 408
	};
}
async function Wt(e) {
	let t = String(e || "").trim();
	return t ? Q(`${n.VECTOR_CAPTION}/${encodeURIComponent(t)}`, {}) : {
		ok: !1,
		error: "Missing asset ID"
	};
}
async function Gt(e, { topK: r = 50, scope: i = "output", customRootId: a = "", subfolder: o = null, kind: s = null, hasWorkflow: c = null, minRating: l = null, minSizeMB: u = null, maxSizeMB: d = null, minWidth: f = null, minHeight: p = null, maxWidth: m = null, maxHeight: h = null, workflowType: g = null, workflowId: _ = null, dateRange: v = null, dateExact: y = null } = {}) {
	let b = String(e || "").trim();
	if (!b) return {
		ok: !1,
		error: "Empty query"
	};
	let x = `${n.HYBRID_SEARCH}?q=${encodeURIComponent(b)}&top_k=${Math.max(1, Math.min(200, r))}&scope=${encodeURIComponent(i)}`;
	return a && (x += `&custom_root_id=${encodeURIComponent(a)}`), x = t(x, {
		subfolder: o,
		kind: s,
		hasWorkflow: c,
		minRating: l,
		minSizeMB: u,
		maxSizeMB: d,
		minWidth: f,
		minHeight: p,
		maxWidth: m,
		maxHeight: h,
		workflowType: g,
		workflowId: _,
		dateRange: v,
		dateExact: y
	}), Z(x, { timeoutMs: 12e4 });
}
async function Kt(e = 8) {
	return Q(n.VECTOR_SUGGEST_COLLECTIONS, { k: Math.max(2, Math.min(20, e)) });
}
//#endregion
//#region ui/api/client.ts
var qt = 3e4, Jt = "__MJR_API_CLIENT__", Yt = 2e3, Xt = 200, Zt = 1e3, Qt = 30 * 6e4, $t = 720 * 6e4, G = "settings", en = "available-tags", K = w({
	ttlMs: Yt,
	maxSize: 1
}), q = w({
	ttlMs: Yt,
	maxSize: 1
}), J = w({
	ttlMs: () => an(),
	maxSize: 1
}), tn = new Set([
	"1",
	"true",
	"yes",
	"on"
]), nn = new Set([
	"0",
	"false",
	"no",
	"off"
]);
function rn(e, t = !1) {
	if (typeof e == "boolean") return e;
	if (typeof e == "number") return e !== 0;
	if (typeof e == "string") {
		let t = e.trim().toLowerCase();
		if (tn.has(t)) return !0;
		if (nn.has(t)) return !1;
	}
	return !!t;
}
function an() {
	try {
		let e = localStorage?.getItem?.("mjrSettings") || "{}", t = JSON.parse(e), n = t?.cache?.tagsTTLms ?? t?.cache?.tagsTTL ?? t?.cache?.tags_ttl_ms ?? null, r = Number(n);
		return Number.isFinite(r) ? Math.max(1e3, Math.min(10 * 6e4, Math.floor(r))) : qt;
	} catch {
		return qt;
	}
}
function on() {
	K.clear();
}
function sn() {
	q.clear();
}
function Y() {
	J.clear();
}
function cn(e) {
	return String(e ?? "").trim().toLowerCase() || "";
}
function ln(e) {
	let t = [], n = /* @__PURE__ */ new Set();
	for (let r of Array.isArray(e) ? e : []) {
		let e = String(r ?? "").trim();
		if (!e) continue;
		let i = cn(e);
		!i || n.has(i) || (n.add(i), t.push(e));
	}
	return t;
}
try {
	let e = typeof window < "u" ? window : null;
	e && !e[Jt] && (e[Jt] = { initialized: !0 }, e.addEventListener?.("storage", (e) => {
		try {
			e?.key === "mjrSettings" && (on(), sn(), Y(), U());
		} catch (e) {
			console.debug?.(e);
		}
	}), e.addEventListener?.("mjr-settings-changed", () => {
		on(), sn(), Y(), U();
	}));
} catch (e) {
	console.debug?.(e);
}
var un = () => {
	let e = K.get(G);
	if (e !== void 0) return e;
	let t = Date.now();
	try {
		let e = localStorage?.getItem?.(c);
		if (!e) return K.set(G, !1, { at: t }), !1;
		let n = !!JSON.parse(e)?.observability?.enabled;
		return K.set(G, n, { at: t }), n;
	} catch {
		return K.set(G, !1, { at: t }), !1;
	}
}, dn = () => {
	let e = q.get(G);
	if (e !== void 0) return e;
	let t = Date.now();
	try {
		let e = localStorage?.getItem?.(c);
		if (!e) return q.set(G, !0, { at: t }), !0;
		let n = JSON.parse(e)?.ratingTagsSync?.enabled, r = n == null ? !0 : rn(n, !0);
		return q.set(G, r, { at: t }), r;
	} catch {
		return q.set(G, !0, { at: t }), !0;
	}
}, X = se({
	readObsEnabled: un,
	readAuthToken: z,
	ensureWriteAuthToken: Ve,
	normalizeWriteAuthFailure: ze
}), fn = X.fetchAPI;
async function Z(e, t = {}) {
	return X.get(e, t);
}
async function Q(e, t, n = {}) {
	return X.post(e, t, n);
}
async function pn(e, t, n = {}) {
	let r = dn(), i = e && typeof e == "object" ? e : null, o = a(i ? i.id : e), c = { rating: Math.max(0, Math.min(5, Number(t) || 0)) };
	return o ? c.asset_id = o : i && (c.filepath = i.filepath || i.path || i?.file_info?.filepath || "", c.type = i.type || "output", c.root_id = s(i)), fn("/mjr/am/asset/rating", {
		...n,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			...r ? { "X-MJR-RTSYNC": "on" } : {}
		},
		body: JSON.stringify(c)
	});
}
async function mn(e, t, r = {}) {
	let i = dn(), o = e && typeof e == "object" ? e : null, c = a(o ? o.id : e), l = String(o?.kind || o?.type || "").trim().toLowerCase() === "workflow", u = String(o?.filepath || o?.path || o?.file_info?.filepath || "").trim(), d = { tags: Array.isArray(t) ? t : [] };
	l && u ? d.filepath = u : c ? d.asset_id = c : o && (d.filepath = o.filepath || o.path || o?.file_info?.filepath || "", d.type = o.type || "output", d.root_id = s(o));
	let f = await fn(l && u ? n.WORKFLOWS_TAGS : "/mjr/am/asset/tags", {
		...r,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			...i ? { "X-MJR-RTSYNC": "on" } : {}
		},
		body: JSON.stringify(d)
	});
	return f?.ok && Y(), f;
}
async function hn() {
	let e = J.get(en);
	if (Array.isArray(e)) return {
		ok: !0,
		data: e,
		error: null,
		code: "OK",
		meta: { cached: !0 }
	};
	let t = await Z("/mjr/am/tags");
	if (t?.ok && Array.isArray(t.data)) {
		let e = ln(t.data);
		return J.set(en, e), {
			...t,
			data: e
		};
	}
	return t;
}
async function $(e, t = {}) {
	let n = encodeURIComponent(a(e));
	return Z(`/mjr/am/asset/${n}`, {
		...t,
		dedupeKey: t?.dedupeKey || `meta:${n}`
	});
}
async function gn(e, t = {}) {
	let n = a(e);
	if (!n) return {
		ok: !1,
		data: null,
		error: "Missing assetId",
		code: "INVALID_INPUT"
	};
	let r = `/mjr/am/viewer/info?asset_id=${encodeURIComponent(n)}`;
	t.refresh && (r += "&refresh=1");
	let { refresh: i, ...o } = t;
	return Z(r, o);
}
async function _n(e, t = {}) {
	let n = Array.isArray(e) ? e : [], r = [];
	for (let e of n) {
		let t = Number(e);
		if (Number.isFinite(t) && (r.push(Math.trunc(t)), r.length >= Xt)) break;
	}
	return r.length ? Q("/mjr/am/assets/batch", { asset_ids: r }, t) : {
		ok: !0,
		data: [],
		error: null,
		code: "OK"
	};
}
async function vn(e, t = {}) {
	let n = r(e);
	return n ? Z(n, t) : {
		ok: !1,
		data: null,
		error: "Missing workflow filepath",
		code: "INVALID_INPUT"
	};
}
async function yn({ workflow: e = null, name: t = "", category: r = "", overwrite: i = !1, filepath: a = "" } = {}, o = {}) {
	return Q(n.WORKFLOWS_SAVE, {
		workflow: e,
		name: t,
		category: r,
		overwrite: i,
		filepath: a
	}, o);
}
async function bn({ filepath: e = "", name: t = "" } = {}, r = {}) {
	return Q(n.WORKFLOWS_DUPLICATE, {
		filepath: e,
		name: t
	}, r);
}
async function xn({ filepath: e = "", name: t = "", category: r = "" } = {}, i = {}) {
	return Q(n.WORKFLOWS_MOVE, {
		filepath: e,
		name: t,
		category: r
	}, i);
}
async function Sn({ filepath: e = "" } = {}, t = {}) {
	return Q(n.WORKFLOWS_DELETE, { filepath: e }, t);
}
async function Cn({ filepath: e = "" } = {}, t = {}) {
	return Q(n.WORKFLOWS_MARK_LOADED, { filepath: e }, t);
}
async function wn({ filepath: e = "", favorite: t = !1 } = {}, r = {}) {
	return Q(n.WORKFLOWS_FAVORITE, {
		filepath: e,
		favorite: !!t
	}, r);
}
async function Tn({ filepath: e = "", limit: t = 12 } = {}, r = {}) {
	let i = Math.max(1, Math.min(50, Number(t) || 12));
	return Z(`${n.WORKFLOWS_THUMBNAIL_CANDIDATES}?filepath=${encodeURIComponent(String(e || "").trim())}&limit=${encodeURIComponent(String(i))}`, r);
}
async function En(e = {}) {
	return Z(n.WORKFLOWS_MODEL_FAMILIES, e);
}
async function Dn({ q: e = "*", limit: t = 100, offset: r = 0, sort: i = "mtime" } = {}, a = {}) {
	let o = Math.max(1, Math.min(500, Number(t) || 100)), s = Math.max(0, Number(r) || 0);
	return Z(`${n.LIST}?scope=workflow&q=${encodeURIComponent(String(e || "*"))}&limit=${encodeURIComponent(String(o))}&offset=${encodeURIComponent(String(s))}&sort=${encodeURIComponent(String(i || "mtime"))}`, a);
}
async function On({ filepath: e = "", source_filepath: t = "" } = {}, r = {}) {
	return Q(n.WORKFLOWS_THUMBNAIL_SET, {
		filepath: e,
		source_filepath: t
	}, r);
}
async function kn({ type: e = "output", filename: t = "", subfolder: n = "", root_id: r = "", rootId: i = "", filepath: a = "" } = {}, o = {}) {
	let s = String(e || "output").trim().toLowerCase() || "output", c = String(t || "").trim(), l = String(n || "").trim(), u = String(r || i || "").trim(), d = String(a || "").trim();
	if (!c) return {
		ok: !1,
		data: null,
		error: "Missing filename",
		code: "INVALID_INPUT"
	};
	let f = `/mjr/am/metadata?type=${encodeURIComponent(s)}&filename=${encodeURIComponent(c)}`;
	return d && (f += `&filepath=${encodeURIComponent(d)}`), l && (f += `&subfolder=${encodeURIComponent(l)}`), u && (f += `&root_id=${encodeURIComponent(u)}`), Z(f, o);
}
async function An({ filepath: e = "", root_id: t = "", subfolder: r = "" } = {}, i = {}) {
	try {
		if (globalThis.__mjrFolderInfoSupported === !1) return {
			ok: !1,
			data: null,
			error: "Folder info endpoint unavailable",
			code: "UNAVAILABLE"
		};
		if (globalThis.__mjrFolderInfoSupported == null) {
			let e = await Z("/mjr/am/routes");
			if (e?.ok && Array.isArray(e.data)) {
				let t = e.data.some((e) => String(e?.path || "").trim() === "/mjr/am/folder-info");
				if (globalThis.__mjrFolderInfoSupported = !!t, !t) return {
					ok: !1,
					data: null,
					error: "Folder info endpoint unavailable",
					code: "UNAVAILABLE"
				};
			} else globalThis.__mjrFolderInfoSupported = null;
		}
	} catch (e) {
		console.debug?.(e);
	}
	let a = String(e || "").trim(), o = String(t || "").trim(), s = String(r || "").trim(), c = n.FOLDER_INFO, l = [];
	a ? (l.push(`filepath=${encodeURIComponent(a)}`), l.push("browser_mode=1")) : (o && l.push(`root_id=${encodeURIComponent(o)}`), s && l.push(`subfolder=${encodeURIComponent(s)}`)), l.length && (c += `?${l.join("&")}`);
	let u = await Z(c, i);
	try {
		!u?.ok && Number(u?.status || 0) === 404 && (globalThis.__mjrFolderInfoSupported = !1);
	} catch (e) {
		console.debug?.(e);
	}
	return u;
}
//#endregion
export { jt as $, Ze as A, ue as At, xt as B, dt as C, Vt as Ct, At as D, Ie as Dt, kt as E, Kt as Et, st as F, w as Ft, vt as G, tt as H, rt as I, l as It, Mt as J, gt as K, Ue as L, c as Lt, Dt as M, ye as Mt, qe as N, ve as Nt, Pt as O, De as Ot, Ye as P, be as Pt, It as Q, at as R, Ft as S, Bt as St, Nt as T, Ht as Tt, bt as U, lt as V, Ge as W, Ot as X, Ct as Y, ft as Z, yn as _, _t, _n as a, Xe as at, pn as b, zt as bt, An as c, We as ct, En as d, et as dt, mt as et, Tn as f, ut as ft, Q as g, Et as gt, xn as h, ht, $ as i, Je as it, Lt as j, xe as jt, St as k, we as kt, gn as l, ot as lt, Cn as m, Ke as mt, bn as n, wt as nt, hn as o, ct as ot, Dn as p, nt as pt, Gt as q, Z as r, Qe as rt, kn as s, it as st, Sn as t, Tt as tt, vn as u, He as ut, wn as v, yt as vt, pt as w, Rt as wt, mn as x, Wt as xt, On as y, Ut as yt, $e as z };

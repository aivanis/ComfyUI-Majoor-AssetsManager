import { A as e, J as t, L as n, T as r, a as i, k as a, p as o, q as s, y as c } from "./events-iWiZ-Zty.js";
import { a as l, n as u } from "./graphTraversal-CjIZsRsP.js";
import { E as d, G as f, T as p, b as m, w as h } from "./SidebarWorkflowSection-DslJPuWf.js";
import { n as g, t as _ } from "./state-DPiaUMw1.js";
//#region ui/features/viewer/floatingViewerProgress.ts
var v = "progress-update", y = "__MJR_MFV_PROGRESS_SERVICE__";
function b() {
	return typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : {};
}
function x(e, t) {
	if (typeof CustomEvent == "function") return new CustomEvent(e, { detail: t });
	let n = typeof Event == "function" ? new Event(e) : { type: e };
	return n.detail = t, n;
}
var S = class {
	constructor(t, n = () => e()) {
		this.id = String(t || ""), this.promptApi = null, this.executedNodeIds = [], this.totalNodes = 0, this.currentlyExecuting = null, this.errorDetails = null, this._getApp = typeof n == "function" ? n : () => null;
	}
	setPrompt(e) {
		let t = e && typeof e == "object" ? e.output : null;
		this.promptApi = t && typeof t == "object" ? t : null, this.totalNodes = this.promptApi ? Object.keys(this.promptApi).length : 0;
	}
	getApiNode(e) {
		return this.promptApi?.[String(e)] || null;
	}
	getNodeLabel(e) {
		let t = this.getApiNode(e), n = t?._meta?.title || t?.class_type || "";
		if (!n) {
			let t = this._getApp?.(), r = u(l(t), e);
			n = r?.title || r?.type || "";
		}
		return String(n || "").trim();
	}
	markExecuted(e) {
		let t = String(e || "").trim();
		t && (this.executedNodeIds.includes(t) || this.executedNodeIds.push(t));
	}
	executing(e, t, n) {
		if (e == null) {
			this.currentlyExecuting = null;
			return;
		}
		let r = String(e || "").trim();
		if (r) {
			if (this.currentlyExecuting?.nodeId !== r) {
				this.currentlyExecuting != null && this.markExecuted(this.currentlyExecuting.nodeId), this.currentlyExecuting = {
					nodeId: r,
					nodeLabel: this.getNodeLabel(r),
					pass: 0
				};
				let e = this.getApiNode(r);
				this.currentlyExecuting.nodeLabel || (this.currentlyExecuting.nodeLabel = this.getNodeLabel(r)), e?.class_type === "UltimateSDUpscale" ? (--this.currentlyExecuting.pass, this.currentlyExecuting.maxPasses = -1) : e?.class_type === "IterativeImageUpscale" && (this.currentlyExecuting.maxPasses = Number(e?.inputs?.steps) || -1);
			}
			if (t != null) {
				let e = Number(t), r = Number(n);
				if (!Number.isFinite(e)) return;
				(!this.currentlyExecuting.step || e < Number(this.currentlyExecuting.step)) && (this.currentlyExecuting.pass += 1), this.currentlyExecuting.step = e, this.currentlyExecuting.maxSteps = Number.isFinite(r) ? r : null;
			}
		}
	}
	error(e) {
		this.errorDetails = e || null;
	}
}, ee = class extends EventTarget {
	constructor({ getApi: t = (e) => a(e), getApp: n = () => e(), waitForApi: r = (e) => s(e) } = {}) {
		super(), this._getApi = t, this._getApp = n, this._waitForApi = r, this.promptsMap = /* @__PURE__ */ new Map(), this.currentExecution = null, this.lastQueueRemaining = 0, this._api = null, this._listenerEntries = [], this._initPromise = null, this._queuePromptBinding = null;
	}
	getSnapshot() {
		return {
			queue: this.lastQueueRemaining,
			prompt: this.currentExecution
		};
	}
	getCurrentNodeId() {
		let e = this.currentExecution;
		return String(e?.errorDetails?.node_id || e?.currentlyExecuting?.nodeId || "").trim();
	}
	getOrMakePrompt(e) {
		let t = String(e || "").trim() || "unknown", n = this.promptsMap.get(t);
		return n || (n = new S(t, this._getApp), this.promptsMap.set(t, n)), n;
	}
	async ensureInitialized({ api: e = null, app: t = null, timeoutMs: n = 0 } = {}) {
		return e && this._api === e ? e : !e && this._api ? this._api : (this._initPromise ||= this._ensureInitializedInternal({
			api: e,
			app: t,
			timeoutMs: n
		}).finally(() => {
			this._initPromise = null;
		}), this._initPromise);
	}
	async _ensureInitializedInternal({ api: e = null, app: t = null, timeoutMs: n = 0 } = {}) {
		let r = e || this._getApi?.(t) || null;
		if (!r && n > 0 && typeof this._waitForApi == "function") try {
			r = await this._waitForApi({
				app: t,
				timeoutMs: n
			});
		} catch (e) {
			console.debug?.(e);
		}
		return r ? (this._attachApi(r), r) : null;
	}
	_attachApi(e) {
		!e || typeof e.addEventListener != "function" || this._api !== e && (this.dispose({
			resetPatchedQueuePrompt: !1,
			keepState: !0
		}), this._api = e, this._patchQueuePrompt(e), this._attachApiListeners(e));
	}
	_patchQueuePrompt(e) {
		let n = this;
		this._queuePromptBinding = t({
			api: e,
			owner: this,
			createWrapper(e) {
				return async function(t, r, ...i) {
					let a;
					try {
						a = await e.apply(this, [
							t,
							r,
							...i
						]);
					} catch (e) {
						let t = n.getOrMakePrompt("error");
						throw t.error({ exception_type: "Unknown." }), n.currentExecution = t, n.dispatchProgressUpdate(), e;
					}
					let o = String(a?.prompt_id || a?.promptId || "").trim();
					if (o) {
						let e = n.getOrMakePrompt(o);
						e.setPrompt(r), n.currentExecution ||= e, n.dispatchEvent(x("queue-prompt", { prompt: e })), n.dispatchProgressUpdate();
					}
					return a;
				};
			}
		});
	}
	_attachApiListeners(e) {
		this._attachListener(e, "status", (e) => {
			e?.detail?.exec_info && (this.lastQueueRemaining = Number(e.detail.exec_info.queue_remaining) || 0, this.dispatchProgressUpdate());
		}), this._attachListener(e, "execution_start", (e) => {
			let t = String(e?.detail?.prompt_id || e?.detail?.promptId || "").trim();
			t && (this.currentExecution = this.getOrMakePrompt(t), this.dispatchProgressUpdate());
		}), this._attachListener(e, "executing", (e) => {
			this.currentExecution ||= this.getOrMakePrompt("unknown"), this.currentExecution.executing(e?.detail), e?.detail ?? (this.currentExecution = null), this.dispatchProgressUpdate();
		}), this._attachListener(e, "progress", (e) => {
			let t = e?.detail || {};
			this.currentExecution ||= this.getOrMakePrompt(t.prompt_id || t.promptId), this.currentExecution.executing(t.node, t.value, t.max), this.dispatchProgressUpdate();
		}), this._attachListener(e, "execution_cached", (e) => {
			let t = e?.detail || {};
			this.currentExecution ||= this.getOrMakePrompt(t.prompt_id || t.promptId);
			for (let e of Array.isArray(t.nodes) ? t.nodes : []) this.currentExecution.markExecuted(e);
			this.dispatchProgressUpdate();
		}), this._attachListener(e, "executed", (e) => {
			let t = e?.detail || {};
			if (!this.currentExecution) {
				let e = String(t.prompt_id || t.promptId || "").trim();
				e && (this.currentExecution = this.getOrMakePrompt(e));
			}
		}), this._attachListener(e, "execution_error", (e) => {
			let t = e?.detail || {};
			this.currentExecution ||= this.getOrMakePrompt(t.prompt_id || t.promptId), this.currentExecution?.error(t), this.dispatchProgressUpdate();
		});
		let t = () => {
			this.currentExecution && this.currentExecution.executing(null), this.currentExecution = null, this.dispatchProgressUpdate();
		};
		this._attachListener(e, "execution_success", t), this._attachListener(e, "execution_interrupted", t);
	}
	_attachListener(e, t, n) {
		e.addEventListener(t, n), this._listenerEntries.push({
			api: e,
			type: t,
			handler: n
		});
	}
	dispatchProgressUpdate() {
		this.dispatchEvent(x(v, this.getSnapshot()));
	}
	dispose({ resetPatchedQueuePrompt: e = !1, keepState: t = !1 } = {}) {
		for (let { api: e, type: t, handler: n } of this._listenerEntries.splice(0)) try {
			e?.removeEventListener?.(t, n);
		} catch (e) {
			console.debug?.(e);
		}
		if (e && this._queuePromptBinding?.owner === this) try {
			this._queuePromptBinding.restore?.();
		} catch (e) {
			console.debug?.(e);
		}
		this._queuePromptBinding = null, this._api = null, t || (this.promptsMap.clear(), this.currentExecution = null, this.lastQueueRemaining = 0);
	}
}, C = b(), w = C[y] || new ee();
C[y] || (C[y] = w);
function T(e = {}) {
	return w.ensureInitialized(e);
}
function E(e) {
	let t = Math.max(0, Number(e?.queue) || 0), n = e?.prompt || null;
	if (n?.errorDetails) return [
		String(n.errorDetails?.exception_type || "Execution error").trim(),
		String(n.errorDetails?.node_id || "").trim(),
		String(n.errorDetails?.node_type || "").trim()
	].filter(Boolean).join(" ");
	if (n?.currentlyExecuting) {
		let e = n.currentlyExecuting, r = `(${t}) `;
		if (!n.totalNodes) r += "??%";
		else {
			let e = n.executedNodeIds.length / n.totalNodes * 100;
			r += `${Math.round(e)}%`;
		}
		let i = "";
		if (e.step != null && e.maxSteps) {
			let t = Number(e.step) / Number(e.maxSteps) * 100;
			(e.pass > 1 || e.maxPasses != null) && (i += `#${e.pass}`, e.maxPasses && e.maxPasses > 0 && (i += `/${e.maxPasses}`), i += " - "), i += `${Math.round(t)}%`;
		}
		let a = String(e.nodeLabel || "").trim();
		return (a || i) && (r += ` - ${a || "Unknown node"}${i ? ` (${i})` : ""}`), r;
	}
	return t > 0 ? `(${t}) Running... in another tab` : "Idle";
}
function te(e) {
	let t = e?.prompt || null;
	if (t?.errorDetails) {
		let e = t?.errorDetails || {}, n = String(t?.currentlyExecuting?.nodeLabel || e?.node_type || e?.node_id || "Execution").trim(), r = e?.exception_message ?? e?.error ?? e?.message ?? e?.detail ?? e?.reason ?? "", i = (Array.isArray(r) ? r.map((e) => String(e || "").trim()).filter(Boolean).join(" | ") : String(r || "").trim()).replace(/\s+/g, " ").trim();
		return i ? `${n} - ${i}` : `${n} - Error`;
	}
	let n = t?.currentlyExecuting || null;
	if (!n) return "";
	let r = String(n.nodeLabel || n.nodeId || "Node").trim(), i = Number(n.step), a = Number(n.maxSteps);
	return Number.isFinite(i) && Number.isFinite(a) && a > 0 ? n.pass > 1 ? `${r} #${n.pass} - ${i}/${a}` : `${r} - ${i}/${a}` : r;
}
function ne(e, t) {
	if (!e?._progressEl && !e?._mediaProgressEl) return;
	let n = t?.prompt || null, r = String(n?.errorDetails?.node_id || n?.currentlyExecuting?.nodeId || "").trim(), i = "0%", a = "0%", o = !!n?.errorDetails;
	if (n?.currentlyExecuting) {
		if (n.totalNodes > 0) {
			let e = n.executedNodeIds.length / n.totalNodes * 100;
			i = `${Math.max(2, Math.round(e * 100) / 100)}%`;
		}
		let e = Number(n.currentlyExecuting?.step), t = Number(n.currentlyExecuting?.maxSteps);
		Number.isFinite(e) && Number.isFinite(t) && t > 0 && (a = `${Math.max(0, Math.min(100, e / t * 100))}%`);
	} else o && (i = "100%", a = "100%");
	if (e._progressCurrentNodeId = r || null, e._progressEl && (e._progressNodesEl.style.width = i, e._progressStepsEl.style.width = a, e._progressTextEl.textContent = E(t), e._progressEl.classList.toggle("is-error", o), e._progressEl.classList.toggle("is-clickable", !!r), e._progressEl.title = r ? "Execution progress - click to center active node" : "Execution progress"), e._mediaProgressEl) {
		let n = te(t);
		e._mediaProgressTextEl.textContent = n, e._mediaProgressEl.title = n || "", e._mediaProgressEl.classList.toggle("is-error", o), e._mediaProgressEl.classList.toggle("is-visible", !!n);
	}
}
function re(t, n) {
	let r = String(n || "").trim();
	if (!r) return !1;
	try {
		return c(r, e());
	} catch (e) {
		return console.debug?.(e), !1;
	}
}
function ie(e) {
	let t = document.createElement("div");
	t.className = "mjr-mfv-progress", t.setAttribute("role", "status"), t.setAttribute("aria-live", "polite");
	let n = document.createElement("div");
	n.className = "mjr-mfv-progress-bar mjr-mfv-progress-bar--nodes";
	let r = document.createElement("div");
	r.className = "mjr-mfv-progress-bar mjr-mfv-progress-bar--steps";
	let i = document.createElement("div");
	i.className = "mjr-mfv-progress-overlay", i.setAttribute("aria-hidden", "true");
	let a = document.createElement("span");
	return a.className = "mjr-mfv-progress-text", a.textContent = "Idle", t.appendChild(n), t.appendChild(r), t.appendChild(i), t.appendChild(a), t.addEventListener("pointerdown", (t) => {
		t.button === 0 && re(e, e._progressCurrentNodeId) && (t.preventDefault(), t.stopPropagation());
	}), e._progressEl = t, e._progressNodesEl = n, e._progressStepsEl = r, e._progressTextEl = a, e._progressUpdateHandler && w.removeEventListener(v, e._progressUpdateHandler), e._progressUpdateHandler = (t) => {
		ne(e, t?.detail || w.getSnapshot());
	}, w.addEventListener(v, e._progressUpdateHandler), T({ timeoutMs: 4e3 }).catch((e) => {
		console.debug?.(e);
	}), ne(e, w.getSnapshot()), t;
}
function ae(e) {
	let t = document.createElement("div");
	t.className = "mjr-mfv-media-progress", t.setAttribute("aria-hidden", "true");
	let n = document.createElement("span");
	return n.className = "mjr-mfv-media-progress-text", t.appendChild(n), e._mediaProgressEl = t, e._mediaProgressTextEl = n, ne(e, w.getSnapshot()), t;
}
function oe(e) {
	if (e?._progressUpdateHandler) try {
		w.removeEventListener(v, e._progressUpdateHandler);
	} catch (e) {
		console.debug?.(e);
	}
	e._progressUpdateHandler = null, e._progressCurrentNodeId = null, e._progressEl = null, e._progressNodesEl = null, e._progressStepsEl = null, e._progressTextEl = null, e._mediaProgressEl = null, e._mediaProgressTextEl = null;
}
//#endregion
//#region ui/components/VideoControls.ts
var se = 400, ce = 1e3, le = 220, ue = .001;
function de(e, t) {
	let n = Number(e), r = Math.max(1, Number(t) || 1);
	if (!Number.isFinite(n) || n <= 0) return 1;
	let i = n / r, a = 10 ** Math.floor(Math.log10(Math.max(i, .001))), o = i / a;
	return Math.max(.001, (o <= 1 ? 1 : o <= 2 ? 2 : o <= 5 ? 5 : 10) * a);
}
function fe(e, t, n) {
	try {
		if (e?.aborted) return h;
		let r = setTimeout(() => {
			try {
				if (e?.aborted) return;
				n?.();
			} catch (e) {
				console.debug?.(e);
			}
		}, Math.max(0, Math.floor(Number(t) || 0))), i = () => {
			try {
				clearTimeout(r);
			} catch (e) {
				console.debug?.(e);
			}
		};
		try {
			e?.addEventListener?.("abort", i, { once: !0 });
		} catch (e) {
			console.debug?.(e);
		}
		return () => {
			try {
				clearTimeout(r);
			} catch (e) {
				console.debug?.(e);
			}
			try {
				e?.removeEventListener?.("abort", i);
			} catch (e) {
				console.debug?.(e);
			}
		};
	} catch {
		return h;
	}
}
function D(e) {
	let t = Math.floor(Number(e) || 0);
	return t < 10 ? `0${t}` : String(t);
}
function pe(e) {
	let t = Number(e);
	if (!Number.isFinite(t) || t < 0) return "0:00";
	let n = Math.floor(t), r = Math.floor(n / 3600), i = Math.floor(n % 3600 / 60), a = n % 60;
	return r > 0 ? `${r}:${D(i)}:${D(a)}` : `${i}:${D(a)}`;
}
function me(e, t, n) {
	let r = document.createElement("button");
	r.type = "button", r.className = `mjr-video-btn ${e || ""}`.trim(), n && (r.title = n);
	try {
		r.setAttribute("aria-label", n || t || "Button");
	} catch (e) {
		console.debug?.(e);
	}
	return r.textContent = t, r;
}
function he(e, t, n, r) {
	let i = document.createElement("button");
	i.type = "button", i.className = `mjr-video-btn ${e || ""}`.trim(), n && (i.title = n);
	try {
		i.setAttribute("aria-label", r || n || "Button");
	} catch (e) {
		console.debug?.(e);
	}
	let a = document.createElement("span");
	return a.className = `pi ${t || ""}`.trim(), a.setAttribute("aria-hidden", "true"), i.appendChild(a), {
		btn: i,
		icon: a
	};
}
function ge(e, { min: t, max: n, step: r, value: i, title: a, ariaLabel: o, widthPx: s } = {}) {
	let c = document.createElement("input");
	return c.type = "number", c.className = `mjr-video-num ${e || ""}`.trim(), a && (c.title = a), o && c.setAttribute("aria-label", o), t != null && (c.min = String(t)), n != null && (c.max = String(n)), r != null && (c.step = String(r)), i != null && (c.value = String(i)), s != null && (c.style.width = `${s}px`), c;
}
function _e(e) {
	try {
		return e?.variant === "preview" ? "preview" : e?.variant === "viewerbar" ? "viewerbar" : "viewer";
	} catch {
		return "viewer";
	}
}
function ve(e) {
	try {
		let t = Number(e?.initialFps);
		return Number.isFinite(t) && t > 0 ? t : null;
	} catch {
		return null;
	}
}
function ye(e, t) {
	let n = Number(e), r = Number(t);
	return Number.isFinite(n) && Number.isFinite(r) && Math.abs(n - r) <= ue;
}
function be(e, t) {
	let n = [];
	try {
		e.controls = !1, e.loop = !0, e.muted = !0, e.playsInline = !0, e.autoplay = !0;
	} catch (e) {
		console.debug?.(e);
	}
	let r = document.createElement("div");
	r.className = "mjr-video-controls mjr-video-controls--preview";
	try {
		r.setAttribute("role", "group"), r.setAttribute("aria-label", o("video.previewControls", "Video preview controls"));
	} catch (e) {
		console.debug?.(e);
	}
	let i = document.createElement("button");
	i.type = "button", i.className = "mjr-video-preview-btn", i.title = o("video.playPause", "Play/Pause");
	try {
		i.setAttribute("aria-label", o("video.playPause", "Play/Pause"));
	} catch (e) {
		console.debug?.(e);
	}
	let a = document.createElement("span");
	a.className = "pi pi-play";
	try {
		a.setAttribute("aria-hidden", "true");
	} catch (e) {
		console.debug?.(e);
	}
	i.appendChild(a), r.appendChild(i);
	let s = () => {
		try {
			a.className = `pi ${e?.paused ? "pi-play" : "pi-pause"}`;
		} catch (e) {
			console.debug?.(e);
		}
	}, c = () => {
		try {
			let t = e.play?.();
			t && typeof t.catch == "function" && t.catch(() => {});
		} catch (e) {
			console.debug?.(e);
		}
	}, l = (t) => {
		try {
			t?.stopPropagation?.();
		} catch (e) {
			console.debug?.(e);
		}
		try {
			e.paused ? c() : e.pause?.();
		} catch (e) {
			console.debug?.(e);
		}
		s();
	};
	try {
		t.appendChild(r);
	} catch (e) {
		console.debug?.(e);
	}
	try {
		c();
	} catch (e) {
		console.debug?.(e);
	}
	n.push(p(e, "loadedmetadata", () => c(), { passive: !0 })), n.push(p(e, "canplay", () => c(), { passive: !0 })), n.push(p(i, "click", l)), n.push(p(e, "play", s, { passive: !0 })), n.push(p(e, "pause", s, { passive: !0 })), n.push(p(e, "ended", () => c(), { passive: !0 }));
	try {
		s();
	} catch (e) {
		console.debug?.(e);
	}
	return {
		controlsEl: r,
		destroy: () => {
			try {
				for (let e of n) d(() => e?.());
			} catch (e) {
				console.debug?.(e);
			}
			try {
				r.remove?.();
			} catch (e) {
				console.debug?.(e);
			}
		}
	};
}
function xe(e, t = {}) {
	try {
		let n = _e(t), r = String(t?.mediaKind || "video").toLowerCase() === "audio", i = n === "viewerbar", a = n !== "preview", s = a, c = ve(t), l = t?.hostEl || e?.parentElement;
		if (!e || !l) return {
			controlsEl: null,
			destroy: h
		};
		if (n === "preview") return be(e, l);
		try {
			e.loop = !1;
		} catch (e) {
			console.debug?.(e);
		}
		d(() => l.classList?.add("mjr-video-host")), d(() => e.classList?.add("mjr-video-el")), d(() => {
			window.getComputedStyle?.(l)?.position === "static" && (l.style.position = "relative");
		});
		let u = document.createElement("div");
		u.className = `mjr-video-controls mjr-video-controls--${n}`, i && u.classList.add("mjr-video-controls--modern"), r && u.classList.add("mjr-video-controls--audio"), u.dataset.mjrLayout = "regular", u.setAttribute("role", "group"), u.setAttribute("aria-label", r ? o("video.audioControls", "Audio controls") : o("video.controls", "Video controls"));
		let f = document.createElement("div");
		f.className = "mjr-video-row mjr-video-row--top";
		let v = document.createElement("div");
		v.className = "mjr-video-row mjr-video-row--bottom", u.appendChild(f), u.appendChild(v);
		let y = document.createElement("div");
		y.className = "mjr-video-seek-wrap";
		let b = document.createElement("input");
		b.className = "mjr-video-range mjr-video-range--seek", b.type = "range", b.min = "0", b.max = String(ce), b.step = "1", b.value = "0", b.setAttribute("aria-label", o("video.seek", "Seek")), b.title = r ? o("video.seekThroughAudio", "Seek through audio") : o("video.seekThrough", "Seek through video");
		let x = document.createElement("div");
		x.className = "mjr-video-seek-overlay";
		let S = null, ee = null, C = null, w = null;
		s && (S = document.createElement("div"), S.className = "mjr-video-seek-zones", ee = document.createElement("div"), ee.className = "mjr-video-seek-zone mjr-video-seek-zone--leftTrim", C = document.createElement("div"), C.className = "mjr-video-seek-zone mjr-video-seek-zone--selected", w = document.createElement("div"), w.className = "mjr-video-seek-zone mjr-video-seek-zone--rightTrim", S.appendChild(ee), S.appendChild(C), S.appendChild(w));
		let T = document.createElement("div");
		T.className = "mjr-video-seek-ticks";
		let E = document.createElement("div");
		E.className = "mjr-video-seek-labels";
		let te = document.createElement("div");
		te.className = "mjr-video-seek-mark mjr-video-seek-mark--in";
		let ne = document.createElement("div");
		ne.className = "mjr-video-seek-mark mjr-video-seek-mark--out";
		let re = document.createElement("div");
		re.className = "mjr-video-seek-playhead";
		let ie = document.createElement("div");
		ie.className = "mjr-video-seek-playhead-label", x.appendChild(T), x.appendChild(E), x.appendChild(re), x.appendChild(ie);
		let ae = document.createElement("div");
		ae.className = "mjr-video-seek-handle mjr-video-seek-handle--in", ae.title = o("video.dragSetIn", "Drag to set In"), ae.setAttribute("aria-label", o("video.dragSetIn", "Drag to set In"));
		let oe = document.createElement("div");
		oe.className = "mjr-video-seek-handle mjr-video-seek-handle--out", oe.title = o("video.dragSetOut", "Drag to set Out"), oe.setAttribute("aria-label", o("video.dragSetOut", "Drag to set Out")), y.appendChild(b), S && y.appendChild(S), y.appendChild(x), s && (y.appendChild(te), y.appendChild(ne), y.appendChild(ae), y.appendChild(oe));
		let ue = document.createElement("span");
		ue.className = "mjr-video-time", ue.textContent = "0:00 / 0:00", ue.title = o("video.currentTimeTotal", "Current time / Total duration");
		let D = document.createElement("span");
		D.className = "mjr-video-range-count", D.textContent = "";
		try {
			D.style.display = "none";
		} catch (e) {
			console.debug?.(e);
		}
		let xe = document.createElement("div");
		xe.className = "mjr-video-timegroup", xe.appendChild(ue), s && xe.appendChild(D);
		let O = document.createElement("span");
		O.className = "mjr-video-frame", O.textContent = "F: 0", O.title = o("video.currentFrame", "Current frame number");
		let Se = me("mjr-video-btn--play", o("btn.play", "Play"), o("video.playPauseSpace", "Play/Pause (Space)")), Ce = me("mjr-video-btn--step", "<", o("video.stepBack", "Step back")), we = me("mjr-video-btn--step", ">", o("video.stepForward", "Step forward")), Te = me("mjr-video-btn--jump mjr-video-btn--in", "|<", o("video.goToIn", "Go to In")), Ee = me("mjr-video-btn--jump mjr-video-btn--out", ">|", o("video.goToOut", "Go to Out")), De = me("mjr-video-btn--mark mjr-video-btn--in", "I", o("video.setInFromCurrent", "Set In from current frame")), Oe = me("mjr-video-btn--mark mjr-video-btn--out", "O", o("video.setOutFromCurrent", "Set Out from current frame")), ke = he("mjr-video-btn--toggle", "pi-refresh", o("video.loopPlaybackInRange", "Loop playback in range"), o("video.loop", "Loop")), Ae = ke.btn, je = ge("mjr-video-num--in", {
			min: 0,
			step: 1,
			value: 0,
			title: o("video.inFrame", "In frame"),
			ariaLabel: o("video.inFrame", "In frame"),
			widthPx: 72
		}), Me = ge("mjr-video-num--out", {
			min: 0,
			step: 1,
			value: 0,
			title: o("video.outFrame", "Out frame"),
			ariaLabel: o("video.outFrame", "Out frame"),
			widthPx: 72
		}), k = ge("mjr-video-num--step", {
			min: 1,
			step: 1,
			value: 1,
			title: o("video.frameIncrement", "Frame increment"),
			ariaLabel: o("video.frameIncrement", "Frame increment"),
			widthPx: 56
		}), A = ge("mjr-video-num--fps", {
			min: 1,
			step: .001,
			value: m(c || 30),
			title: o("video.fpsStepping", "FPS (used for frame stepping)"),
			ariaLabel: o("video.fps", "FPS"),
			widthPx: 56
		}), j = document.createElement("select");
		j.className = "mjr-video-num mjr-video-num--speed", j.title = o("video.playbackSpeed", "Playback speed"), j.setAttribute("aria-label", o("video.playbackSpeed", "Playback speed")), j.style.width = "74px";
		for (let e of [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			2
		]) {
			let t = document.createElement("option");
			t.value = String(e), t.textContent = `${e}x`, j.appendChild(t);
		}
		let Ne = he("mjr-video-btn--mute", "pi-volume-up", o("video.mute", "Mute"), o("video.mute", "Mute")), M = Ne.btn, N = document.createElement("div");
		N.className = "mjr-video-volume-wrap", N.style.cssText = "display:none; align-items:center; position:relative;";
		let P = null;
		P = document.createElement("input"), P.className = "mjr-video-range mjr-video-range--volume", P.type = "range", P.min = "0", P.max = "1", P.step = "0.02", P.value = String(g(Number(e.volume) || 0)), P.setAttribute("aria-label", o("video.volume", "Volume")), P.title = o("video.volume", "Volume");
		try {
			P.style.width = "120px";
		} catch (e) {
			console.debug?.(e);
		}
		N.appendChild(P);
		let F = document.createElement("div");
		F.className = "mjr-video-group mjr-video-group--in";
		let Pe = document.createElement("span");
		Pe.textContent = "In", Pe.title = o("video.resetInToStart", "Reset In to start"), Pe.style.cssText = "cursor:pointer; user-select:none;", s && (F.appendChild(Pe), F.appendChild(je));
		let I = document.createElement("div");
		I.className = "mjr-video-group mjr-video-group--out";
		let Fe = document.createElement("span");
		Fe.textContent = "Out", Fe.title = o("video.resetOutToEnd", "Reset Out to end"), Fe.style.cssText = "cursor:pointer; user-select:none;", s && (I.appendChild(Fe), I.appendChild(Me));
		let L = document.createElement("div");
		L.className = "mjr-video-group mjr-video-group--adjust-left", s && (L.appendChild(De), r || (L.appendChild(document.createTextNode(o("video.step", "Step"))), L.appendChild(k), L.appendChild(document.createTextNode(o("video.fps", "FPS"))), L.appendChild(A)), L.appendChild(O));
		let Ie = document.createElement("div");
		Ie.className = "mjr-video-group mjr-video-group--adjust-right", s && (Ie.appendChild(xe), Ie.appendChild(Ae));
		let Le = document.createElement("div");
		Le.className = "mjr-video-group mjr-video-group--speed", Le.appendChild(document.createTextNode(o("video.speed", "Speed"))), Le.appendChild(j);
		let Re = document.createElement("div");
		Re.className = "mjr-video-bottom mjr-video-bottom--left";
		let R = document.createElement("div");
		R.className = "mjr-video-transport";
		let z = document.createElement("div");
		if (z.className = "mjr-video-bottom mjr-video-bottom--right", R.appendChild(Te), r || R.appendChild(Ce), R.appendChild(Se), r || R.appendChild(we), R.appendChild(Ee), s && Re.appendChild(L), s && z.appendChild(Ie), z.appendChild(Le), z.appendChild(M), s && z.appendChild(Oe), P && z.appendChild(N), i) {
			let e = document.createElement("div");
			e.className = "mjr-video-bar-timeline", s && e.appendChild(F), e.appendChild(y), s && e.appendChild(I);
			let t = document.createElement("div");
			t.className = "mjr-video-bar-actions";
			let n = document.createElement("div");
			n.className = "mjr-video-bar-side mjr-video-bar-side--left", s && n.appendChild(L);
			let r = document.createElement("div");
			r.className = "mjr-video-bar-center", r.appendChild(R);
			let i = document.createElement("div");
			i.className = "mjr-video-bar-side mjr-video-bar-side--right", s && i.appendChild(Ie), i.appendChild(Le), i.appendChild(M), s && i.appendChild(Oe), P && i.appendChild(N), t.appendChild(n), t.appendChild(r), t.appendChild(i), u.replaceChildren(e, t);
		} else s && f.appendChild(O), s && f.appendChild(F), f.appendChild(y), s && f.appendChild(I), f.appendChild(xe), v.appendChild(Re), v.appendChild(R), v.appendChild(z);
		let B = (e) => {
			try {
				e.stopPropagation?.();
			} catch (e) {
				console.debug?.(e);
			}
		}, V = (e) => {
			try {
				e.preventDefault?.();
			} catch (e) {
				console.debug?.(e);
			}
			B(e);
		}, H = [], ze = (() => {
			try {
				return new AbortController();
			} catch {
				return {
					signal: {
						aborted: !1,
						addEventListener: h,
						removeEventListener: h
					},
					abort: h
				};
			}
		})();
		H.push(() => {
			try {
				ze.abort();
			} catch (e) {
				console.debug?.(e);
			}
		});
		let Be = () => {
			try {
				let e = Number(l?.clientWidth) || Number(u?.clientWidth) || 0, t = "regular";
				e > 0 && e < 560 ? t = "stacked" : e > 0 && e < 860 && (t = "compact"), u.dataset.mjrLayout = t;
			} catch (e) {
				console.debug?.(e);
			}
		};
		Be();
		try {
			if (typeof ResizeObserver == "function" && l) {
				let e = typeof requestAnimationFrame == "function" ? requestAnimationFrame : null, t = typeof cancelAnimationFrame == "function" ? cancelAnimationFrame : null, n = 0, r = new ResizeObserver(e ? () => {
					n ||= e(() => {
						n = 0, Be();
					});
				} : () => Be());
				r.observe(l), H.push(() => {
					try {
						n && t && t(n), r.disconnect();
					} catch (e) {
						console.debug?.(e);
					}
				});
			}
		} catch (e) {
			console.debug?.(e);
		}
		H.push(p(u, "pointerdown", B)), H.push(p(u, "dblclick", V, { capture: !0 })), H.push(p(u, "wheel", V, {
			capture: !0,
			passive: !1
		})), H.push(p(window, "dblclick", (e) => {
			try {
				u.contains?.(e?.target) && V(e);
			} catch (e) {
				console.debug?.(e);
			}
		}, { capture: !0 })), H.push(p(window, "wheel", (e) => {
			try {
				u.contains?.(e?.target) && V(e);
			} catch (e) {
				console.debug?.(e);
			}
		}, {
			capture: !0,
			passive: !1
		}));
		let U = {
			outFrame: null,
			frameCount: null,
			loop: s,
			pingpong: !1,
			once: !1,
			playbackRate: Math.max(.25, Math.min(2, Number(t?.initialPlaybackRate) || 1)),
			_seeking: !1,
			_ppReverse: !1,
			_ppRafId: null,
			_userInteracted: !1
		};
		U.nativeFps = c ? m(c, 30) : null, U.fps = U.nativeFps || m(A.value, 30);
		let Ve = () => {
			let e = Number(U.nativeFps), t = Number(U.fps);
			return Number.isFinite(e) && e > 0 && !ye(t, e);
		}, He = (e = !1) => {
			try {
				if (!A || r) return;
				let t = Number(U.nativeFps), n = Ve(), i = o("video.fpsStepping", "FPS (used for frame stepping)");
				A.classList.toggle("is-overridden", n), Number.isFinite(t) && t > 0 ? (A.dataset.defaultFps = String(t), A.title = `${i} - Source FPS: ${t}`, n && (A.title += " - Modified")) : (delete A.dataset.defaultFps, A.title = i), e && !A.matches?.(":focus") && (A.value = String(m(U.fps, U.nativeFps || 30)));
			} catch (e) {
				console.debug?.(e);
			}
		};
		He(!0);
		let Ue = () => {
			if (!U._userInteracted) {
				U._userInteracted = !0;
				try {
					e.muted && (e.muted = !1, ot?.());
				} catch (e) {
					console.debug?.(e);
				}
			}
		}, We = null, Ge = () => {
			if (s) try {
				O.classList.add("is-step");
				try {
					We?.();
				} catch (e) {
					console.debug?.(e);
				}
				We = fe(ze.signal, le, () => {
					try {
						O.classList.remove("is-step");
					} catch (e) {
						console.debug?.(e);
					}
				});
			} catch (e) {
				console.debug?.(e);
			}
		};
		H.push(() => {
			try {
				We?.();
			} catch (e) {
				console.debug?.(e);
			}
			We = null;
			try {
				O?.classList?.remove?.("is-step");
			} catch (e) {
				console.debug?.(e);
			}
		});
		let Ke = (e, t) => {
			try {
				if (!e) return;
				t ? e.classList.add("is-on") : e.classList.remove("is-on");
			} catch (e) {
				console.debug?.(e);
			}
		}, qe = (t) => {
			try {
				let n = Number(t);
				if (!Number.isFinite(n) || n <= 0) return U.playbackRate;
				let r = Math.max(.25, Math.min(2, Math.round(n * 100) / 100));
				U.playbackRate = r;
				try {
					e.playbackRate = r;
				} catch (e) {
					console.debug?.(e);
				}
				try {
					j.matches?.(":focus") || (j.value = String(r));
				} catch (e) {
					console.debug?.(e);
				}
				return r;
			} catch {
				return U.playbackRate;
			}
		}, Je = () => {
			try {
				Ke(Ae, !!(U.loop || U.pingpong));
				try {
					ke?.icon && (U.pingpong ? (ke.icon.className = "pi pi-sort-alt", Ae.title = o("video.pingpongPlayback", "Ping-pong playback (forward then reverse)")) : (ke.icon.className = "pi pi-refresh", Ae.title = o("video.loopPlaybackInRange", "Loop playback in range")));
				} catch (e) {
					console.debug?.(e);
				}
			} catch (e) {
				console.debug?.(e);
			}
		}, Ye = () => {
			try {
				let t = Number(U.frameCount);
				if (Number.isFinite(t) && t > 0) return Math.max(1, Math.floor(t));
				let n = Number(e?.duration), r = m(U.fps, 30);
				return !Number.isFinite(n) || n <= 0 ? 0 : Math.max(0, Math.floor(n * r));
			} catch {
				return 0;
			}
		}, W = (t = null) => {
			try {
				let n = t ?? e?.currentTime, r = Number(n), i = m(U.fps, 30);
				return !Number.isFinite(r) || r < 0 ? 0 : Math.max(0, Math.floor(r * i + 1e-6));
			} catch {
				return 0;
			}
		}, Xe = (e) => {
			let t = m(U.fps, 30);
			return Math.max(0, Number(e) || 0) / t;
		}, G = () => {
			try {
				let e = Ye();
				if (e <= 0) return;
				let t = U.inFrame == null ? 0 : _(U.inFrame, 0, e), n = U.outFrame == null ? e : _(U.outFrame, 0, e);
				n < t ? (U.inFrame = n, U.outFrame = t) : (U.inFrame = t, U.outFrame = n);
			} catch (e) {
				console.debug?.(e);
			}
		}, K = () => {
			try {
				let e = Ye();
				return {
					inF: U.inFrame == null ? 0 : _(U.inFrame, 0, e),
					outF: U.outFrame == null ? e : _(U.outFrame, 0, e),
					maxF: e
				};
			} catch {
				return {
					inF: 0,
					outF: 0,
					maxF: 0
				};
			}
		}, Ze = () => {
			try {
				if (!s || r) return ce;
				let e = Ye();
				if (Number.isFinite(e) && e > ce) return Math.max(ce, Math.floor(e));
			} catch (e) {
				console.debug?.(e);
			}
			return ce;
		}, Qe = () => {
			try {
				b.max = String(Ze());
			} catch (e) {
				console.debug?.(e);
			}
		}, q = () => {
			try {
				Se.textContent = !e?.paused || U._ppReverse ? o("video.pause", "Pause") : o("video.play", "Play");
			} catch (e) {
				console.debug?.(e);
			}
		}, $e = () => {
			try {
				let t = !!e?.muted || (Number(e?.volume) || 0) <= .001;
				try {
					Ne.icon.className = `pi ${t ? "pi-volume-off" : "pi-volume-up"}`;
				} catch (e) {
					console.debug?.(e);
				}
				let n = t ? o("video.unmute", "Unmute") : o("video.mute", "Mute");
				M.title = n, M.setAttribute("aria-label", n);
			} catch (e) {
				console.debug?.(e);
			}
		}, J = (t = null) => {
			try {
				let n = Number(e?.duration), i = t ?? e?.currentTime, o = Number(i), c = Number.isFinite(n) && n > 0;
				if (ue.textContent = `${pe(o)} / ${c ? pe(n) : "0:00"}`, b.disabled = !c, c) {
					let e = g((o || 0) / n);
					Qe();
					let t = Math.round(e * Ze());
					!Number.isNaN(t) && !U._seeking && !b.matches?.(":active") && (b.value = String(t));
					try {
						re.style.left = `${e * 100}%`;
					} catch (e) {
						console.debug?.(e);
					}
				} else {
					b.value = "0";
					try {
						re.style.left = "0%";
					} catch (e) {
						console.debug?.(e);
					}
				}
				let l = s ? Ye() : 0, u = s ? W(o) : 0;
				if (a) {
					s && (O.textContent = r ? `T: ${pe(o)} / ${pe(n)}` : `F: ${u} / ${l}`);
					try {
						if (Number.isFinite(n) && n > 0) {
							let e = g((o || 0) / n);
							ie.style.left = `${e * 100}%`, ie.textContent = r ? pe(o) : String(u), ie.style.display = "";
						} else ie.style.display = "none";
					} catch (e) {
						console.debug?.(e);
					}
				}
				if (s) {
					je.matches?.(":focus") || (je.value = String(U.inFrame ?? 0)), Me.matches?.(":focus") || (Me.value = String(U.outFrame ?? l));
					try {
						let { inF: e, outF: t, maxF: n } = K(), i = e <= 0 && t >= n, a = Math.max(0, Math.floor(t) - Math.floor(e) + 1);
						!i && n > 0 ? (D.textContent = r ? `R: ${pe(a / m(U.fps, 30))}` : `R: ${a}f`, D.style.display = "") : D.style.display = "none";
					} catch (e) {
						console.debug?.(e);
					}
				}
			} catch (e) {
				console.debug?.(e);
			}
		}, et = () => {
			if (!(!a || !r)) try {
				let t = Number(e?.duration);
				if (!Number.isFinite(t) || t <= 0) {
					T.style.backgroundImage = "", E.replaceChildren();
					try {
						E.dataset.mjrLabelKey = "";
					} catch (e) {
						console.debug?.(e);
					}
					return;
				}
				let n = de(t, 80), r = de(t, 8), i = n / t * 100, a = r / t * 100;
				if (Number.isFinite(i) && i > .02) {
					let e = `repeating-linear-gradient(to right, rgba(255,255,255,0.16) 0, rgba(255,255,255,0.16) 1px, transparent 1px, transparent ${i}%)`, t = `repeating-linear-gradient(to right, rgba(255,255,255,0.3) 0, rgba(255,255,255,0.3) 1px, transparent 1px, transparent ${a}%)`;
					T.style.backgroundImage = `${t}, ${e}`;
				} else T.style.backgroundImage = "";
				let o = `audio|${Math.round(t * 1e3)}|${Math.round(r * 1e3)}`;
				if (E?.dataset?.mjrLabelKey === o) return;
				E.dataset.mjrLabelKey = o, E.replaceChildren();
				let s = (e) => {
					let n = document.createElement("span");
					n.className = "mjr-video-seek-label";
					let r = Math.max(0, Math.min(t, Number(e) || 0));
					return n.style.left = `${g(r / t) * 100}%`, n.textContent = pe(r), n;
				};
				E.appendChild(s(0));
				for (let e = r; e < t; e += r) E.appendChild(s(e));
				E.appendChild(s(t));
			} catch (e) {
				console.debug?.(e);
			}
		}, Y = () => {
			if (!s) {
				et();
				return;
			}
			try {
				let { inF: e, outF: t, maxF: n } = K();
				if (!Number.isFinite(n) || n <= 0) return;
				let i = g(e / n) * 100, a = g(t / n) * 100, o = e <= 0 && t >= n;
				try {
					b.style.background = "";
				} catch (e) {
					console.debug?.(e);
				}
				try {
					let e = g(i / 100) * 100, t = g(a / 100) * 100, n = Math.min(e, t), r = Math.max(e, t);
					if (S && ee && C && w) {
						ee.style.left = "0%", ee.style.width = `${n}%`, C.style.left = `${n}%`, C.style.width = `${Math.max(0, r - n)}%`, w.style.left = `${r}%`, w.style.width = `${Math.max(0, 100 - r)}%`;
						try {
							S.classList.toggle("is-trimmed", !o), S.classList.toggle("is-fullrange", o);
						} catch (e) {
							console.debug?.(e);
						}
					}
				} catch (e) {
					console.debug?.(e);
				}
				try {
					te.style.left = `${i}%`, ne.style.left = `${a}%`;
				} catch (e) {
					console.debug?.(e);
				}
				try {
					ae.style.left = `${i}%`, oe.style.left = `${a}%`;
				} catch (e) {
					console.debug?.(e);
				}
				if (r) {
					et();
					return;
				}
				try {
					let e = Math.max(1, Math.floor(n / se)), t = Math.max(e, Math.floor(Number(U.step) || 1)), r = t / n * 100, i = r * 10;
					if (Number.isFinite(r) && r > .02) {
						let e = `repeating-linear-gradient(to right, rgba(255,255,255,0.16) 0, rgba(255,255,255,0.16) 1px, transparent 1px, transparent ${r}%)`, t = `repeating-linear-gradient(to right, rgba(255,255,255,0.28) 0, rgba(255,255,255,0.28) 1px, transparent 1px, transparent ${i}%)`;
						T.style.backgroundImage = `${t}, ${e}`;
					} else T.style.backgroundImage = "";
					(() => {
						try {
							let e = `${n}|${t}`;
							if (E?.dataset?.mjrLabelKey === e) return;
							E.dataset.mjrLabelKey = e;
						} catch (e) {
							console.debug?.(e);
						}
						try {
							E.replaceChildren();
						} catch (e) {
							console.debug?.(e);
						}
						let e = Math.max(1, t * 10);
						try {
							for (; e > 0 && Math.ceil(n / e) > 22;) e *= 2;
						} catch (e) {
							console.debug?.(e);
						}
						let r = (e) => {
							let t = document.createElement("span");
							t.className = "mjr-video-seek-label";
							let r = g(e / n) * 100;
							return t.style.left = `${r}%`, t.textContent = String(Math.floor(e)), t;
						};
						try {
							E.appendChild(r(0));
						} catch (e) {
							console.debug?.(e);
						}
						for (let t = e; t < n; t += e) try {
							E.appendChild(r(t));
						} catch (e) {
							console.debug?.(e);
						}
						try {
							E.appendChild(r(n));
						} catch (e) {
							console.debug?.(e);
						}
					})();
				} catch (e) {
					console.debug?.(e);
				}
			} catch (e) {
				console.debug?.(e);
			}
		}, X = ({ prefer: e = null } = {}) => {
			if (s) try {
				G();
				let { inF: t, outF: n } = K(), r = W();
				e === "in" ? Z(t) : e === "out" ? r > n && Z(n) : r < t ? Z(t) : r > n && Z(n);
			} catch (e) {
				console.debug?.(e);
			}
		}, tt = () => {
			try {
				U.inFrame = 0, G(), J(), Y(), X({ prefer: "in" });
			} catch (e) {
				console.debug?.(e);
			}
		}, nt = () => {
			try {
				let { maxF: e } = K();
				U.outFrame = Math.max(0, Number(e) || 0), G(), J(), Y(), X({ prefer: "out" });
			} catch (e) {
				console.debug?.(e);
			}
		}, rt = () => {
			try {
				U._ppRafId != null && (cancelAnimationFrame(U._ppRafId), U._ppRafId = null);
			} catch (e) {
				console.debug?.(e);
			}
		};
		H.push(rt);
		let it = () => {
			try {
				rt(), U._ppReverse = !0, e.pause?.(), q();
				let t = 1e3 / (m(U.fps, 30) * Math.max(.25, Number(U.playbackRate) || 1)), n = performance.now(), r = (i) => {
					try {
						if (!U._ppReverse || !U.pingpong) {
							U._ppReverse = !1, q();
							return;
						}
						let a = i - n;
						if (a >= t) {
							n = i - a % t;
							let { inF: r } = K(), o = W();
							if (o <= r) {
								U._ppReverse = !1, Z(r);
								let t = e.play?.();
								t && typeof t.catch == "function" && t.catch(() => {}), q(), J();
								return;
							}
							Z(o - Math.max(1, Math.floor(Number(U.step) || 1))), J();
						}
						U._ppRafId = requestAnimationFrame(r);
					} catch (e) {
						console.debug?.(e), U._ppReverse = !1, q();
					}
				};
				U._ppRafId = requestAnimationFrame(r);
			} catch (e) {
				console.debug?.(e), U._ppReverse = !1;
			}
		}, at = () => {
			try {
				let e = Ye();
				U.inFrame = 0, U.outFrame = e > 0 ? e : null, U.step = 1, U.loop = !!s, U.pingpong = !1, U._ppReverse = !1, rt(), U.once = !1, qe(1);
				try {
					k.value = "1";
				} catch (e) {
					console.debug?.(e);
				}
				try {
					j.matches?.(":focus") || (j.value = "1");
				} catch (e) {
					console.debug?.(e);
				}
				G(), Je(), J(), Y(), X({ prefer: "in" });
			} catch (e) {
				console.debug?.(e);
			}
		}, ot = () => {
			try {
				let t = g(Number(e?.volume) || 0);
				try {
					P && !P.matches?.(":active") && (P.value = String(t));
				} catch (e) {
					console.debug?.(e);
				}
				$e();
			} catch (e) {
				console.debug?.(e);
			}
		}, Z = (t) => {
			try {
				let { maxF: n } = K();
				e.currentTime = Xe(_(t, 0, n > 0 ? n : Infinity));
			} catch (e) {
				console.debug?.(e);
			}
			J();
		}, st = (t) => {
			Ue();
			try {
				let n = Math.max(1, Math.floor(Number(U.step) || 1)), { inF: r, outF: i } = K(), a = W() + t * n;
				U.loop ? (a < r && (a = i), a > i && (a = r)) : a = _(a, r, i);
				try {
					e.pause?.();
				} catch (e) {
					console.debug?.(e);
				}
				Z(a), Ge();
			} catch (e) {
				console.debug?.(e);
			}
		}, ct = () => {
			if (s) try {
				G();
				let { inF: e, outF: t } = K(), n = W();
				(n < e || n > t) && Z(e);
			} catch (e) {
				console.debug?.(e);
			}
		}, lt = () => {
			Ue();
			try {
				if (U._ppReverse) {
					U._ppReverse = !1, rt(), q();
					return;
				}
				if (e.paused) {
					ct();
					let t = e.play?.();
					t && typeof t.catch == "function" && t.catch(() => {});
				} else e.pause?.();
			} catch (e) {
				console.debug?.(e);
			}
			q();
		};
		H.push(p(e, "click", (t) => {
			try {
				if (t?.target !== e) return;
			} catch (e) {
				console.debug?.(e);
			}
			lt();
		})), H.push(p(Se, "click", (e) => {
			B(e), lt();
		})), H.push(p(Ce, "click", (e) => {
			B(e), st(-1);
		})), H.push(p(we, "click", (e) => {
			B(e), st(1);
		})), H.push(p(Te, "click", (e) => {
			B(e);
			let { inF: t } = K();
			Z(t), Ge();
		})), H.push(p(Ee, "click", (e) => {
			B(e);
			let { outF: t } = K();
			Z(t), Ge();
		}));
		let ut = (t) => {
			try {
				let n = Number(e?.duration);
				if (!Number.isFinite(n) || n <= 0) return !1;
				let r = y.getBoundingClientRect?.(), i = Number(r?.width) || 0;
				if (!(i > 0)) return !1;
				let a = g(_((Number(t) || 0) - Number(r.left || 0), 0, i) / i), o = a * n;
				return e.currentTime = o, Qe(), b.value = String(Math.round(a * Ze())), J(o), !0;
			} catch (e) {
				return console.debug?.(e), !1;
			}
		}, Q = {
			active: !1,
			pointerId: null,
			ac: null
		}, dt = (e = null) => {
			if (Q.active) {
				e && V(e), Q.active = !1, U._seeking = !1;
				try {
					y.releasePointerCapture?.(Q.pointerId);
				} catch (e) {
					console.debug?.(e);
				}
				Q.pointerId = null;
				try {
					Q.ac?.abort?.();
				} catch (e) {
					console.debug?.(e);
				}
				Q.ac = null, J();
			}
		}, ft = (e) => {
			Q.active && (V(e), ut(e.clientX));
		};
		if (H.push(() => dt()), H.push(p(y, "pointerdown", (e) => {
			try {
				if (e?.button != null && e.button !== 0 || e?.target?.closest?.(".mjr-video-seek-handle, .mjr-video-seek-mark")) return;
			} catch (e) {
				console.debug?.(e);
			}
			V(e), Ue(), U._seeking = !0, Q.active = !0, Q.pointerId = e?.pointerId ?? null, ut(e?.clientX);
			try {
				y.setPointerCapture?.(Q.pointerId);
			} catch (e) {
				console.debug?.(e);
			}
			try {
				Q.ac?.abort?.();
			} catch (e) {
				console.debug?.(e);
			}
			try {
				let e = new AbortController();
				Q.ac = e, window.addEventListener("pointermove", ft, {
					passive: !1,
					capture: !0,
					signal: e.signal
				}), window.addEventListener("pointerup", dt, {
					passive: !1,
					capture: !0,
					signal: e.signal
				}), window.addEventListener("pointercancel", dt, {
					passive: !1,
					capture: !0,
					signal: e.signal
				}), window.addEventListener("blur", dt, { signal: e.signal });
			} catch (e) {
				console.debug?.(e);
			}
		}, { passive: !1 })), H.push(p(b, "pointerdown", () => {
			U._seeking = !0;
		})), H.push(p(b, "pointerup", () => {
			Q.active || (U._seeking = !1);
		})), H.push(p(b, "pointercancel", () => {
			Q.active || (U._seeking = !1);
		})), H.push(p(b, "input", (t) => {
			B(t), Ue();
			try {
				let t = Number(e?.duration);
				if (!Number.isFinite(t) || t <= 0) return;
				let n = Number(b.value);
				e.currentTime = g((Number.isFinite(n) ? n : 0) / Ze()) * t;
			} catch (e) {
				console.debug?.(e);
			}
			J();
		})), s) {
			H.push(p(De, "click", (e) => {
				B(e), U.inFrame = W(), G(), J(), Y(), X({ prefer: "in" });
			})), H.push(p(Oe, "click", (e) => {
				B(e), U.outFrame = W(), G(), J(), Y(), X({ prefer: "out" });
			})), H.push(p(je, "change", (e) => {
				B(e);
				try {
					let e = Number(je.value);
					U.inFrame = Number.isFinite(e) ? Math.max(0, Math.floor(e)) : null, G();
				} catch (e) {
					console.debug?.(e);
				}
				J(), Y(), X({ prefer: "in" });
			})), H.push(p(Me, "change", (e) => {
				B(e);
				try {
					let e = Number(Me.value);
					U.outFrame = Number.isFinite(e) ? Math.max(0, Math.floor(e)) : null, G();
				} catch (e) {
					console.debug?.(e);
				}
				J(), Y(), X({ prefer: "out" });
			})), H.push(p(k, "change", (e) => {
				B(e);
				try {
					U.step = Math.max(1, Math.floor(Number(k.value) || 1)), k.value = String(U.step);
				} catch (e) {
					console.debug?.(e);
				}
			})), H.push(p(A, "change", (e) => {
				B(e);
				try {
					U.fps = m(A.value, 30), A.value = String(U.fps), He(!1), G();
				} catch (e) {
					console.debug?.(e);
				}
				J(), Y();
			})), H.push(p(Ae, "click", (e) => {
				B(e), !U.loop && !U.pingpong ? (U.loop = !0, U.pingpong = !1) : U.loop && !U.pingpong ? (U.loop = !1, U.pingpong = !0) : (U.loop = !1, U.pingpong = !1), (U.loop || U.pingpong) && (U.once = !1), U.pingpong || (U._ppReverse = !1, rt()), Je();
			})), H.push(p(Pe, "click", (e) => {
				B(e), tt();
			})), H.push(p(Fe, "click", (e) => {
				B(e), nt();
			})), H.push(p(D, "click", (e) => {
				B(e), at();
			}));
			try {
				D.title = o("video.resetPlayerControls", "Reset player controls"), D.style.cursor = "pointer", D.style.userSelect = "none";
			} catch (e) {
				console.debug?.(e);
			}
		}
		H.push(p(M, "click", (t) => {
			B(t);
			try {
				e.muted = !e.muted, N && (N.style.display = e.muted ? "none" : "inline-flex");
			} catch (e) {
				console.debug?.(e);
			}
			ot();
		})), H.push(p(M, "contextmenu", (e) => {
			V(e);
			try {
				if (!N) return;
				let e = N.style.display !== "none";
				N.style.display = e ? "none" : "inline-flex";
			} catch (e) {
				console.debug?.(e);
			}
			ot();
		})), H.push(p(window, "pointerdown", (e) => {
			try {
				if (!N || N.style.display === "none" || M.contains?.(e?.target) || N.contains?.(e?.target)) return;
				N.style.display = "none";
			} catch (e) {
				console.debug?.(e);
			}
		}, { capture: !0 })), P && H.push(p(P, "input", (t) => {
			B(t);
			try {
				let t = g(Number(P.value) || 0);
				e.volume = t, t > .001 && (e.muted = !1);
			} catch (e) {
				console.debug?.(e);
			}
			ot();
		})), H.push(p(j, "change", (e) => {
			B(e);
			try {
				qe(Number(j.value) || 1);
			} catch (e) {
				console.debug?.(e);
			}
		})), H.push(p(e, "ratechange", () => {
			try {
				qe(Number(e.playbackRate) || U.playbackRate || 1);
			} catch (e) {
				console.debug?.(e);
			}
		}));
		let pt = () => {
			if (s) try {
				if (U._seeking || e?.paused) return;
				let { inF: t, outF: n, maxF: r } = K();
				if (r <= 0 || t <= 0 && n >= r && !U.loop && !U.pingpong && !U.once || U._ppReverse) return;
				let i = W();
				if (i >= n - Math.max(1, Math.floor(Number(U.step) || 1))) if (U.pingpong) {
					it();
					return;
				} else if (U.loop) {
					Z(t);
					try {
						let t = e.play?.();
						t && typeof t.catch == "function" && t.catch(() => {});
					} catch (e) {
						console.debug?.(e);
					}
				} else if (U.once) {
					try {
						e.pause?.();
					} catch (e) {
						console.debug?.(e);
					}
					Z(n);
				} else {
					try {
						e.pause?.();
					} catch (e) {
						console.debug?.(e);
					}
					Z(n);
				}
				else i < t && Z(t);
			} catch (e) {
				console.debug?.(e);
			}
		}, $ = {
			rafId: null,
			rvfcId: null
		}, mt = () => {
			try {
				$.rvfcId != null && typeof e?.cancelVideoFrameCallback == "function" && e.cancelVideoFrameCallback($.rvfcId);
			} catch (e) {
				console.debug?.(e);
			}
			$.rvfcId = null;
			try {
				$.rafId != null && typeof cancelAnimationFrame == "function" && cancelAnimationFrame($.rafId);
			} catch (e) {
				console.debug?.(e);
			}
			$.rafId = null;
		}, ht = (t = 0, n = null) => {
			$.rafId = null, $.rvfcId = null;
			try {
				d(J, n?.mediaTime), d(pt);
			} catch (e) {
				console.debug?.(e);
			}
			if (!(!(U._ppReverse || !e?.paused) || ze.signal?.aborted)) {
				try {
					if (typeof e?.requestVideoFrameCallback == "function" && !U._ppReverse) {
						$.rvfcId = e.requestVideoFrameCallback(ht);
						return;
					}
				} catch (e) {
					console.debug?.(e);
				}
				try {
					typeof requestAnimationFrame == "function" && ($.rafId = requestAnimationFrame((t) => {
						ht(t, { mediaTime: Number(e?.currentTime) || 0 });
					}));
				} catch (e) {
					console.debug?.(e);
				}
			}
		}, gt = () => {
			mt(), !(!(U._ppReverse || !e?.paused) || ze.signal?.aborted) && ht(0, { mediaTime: Number(e?.currentTime) || 0 });
		};
		H.push(mt), H.push(p(e, "play", () => {
			d(q), gt();
		}));
		for (let t of ["pause", "ended"]) H.push(p(e, t, () => {
			mt(), d(q), d(J);
		}));
		for (let t of [
			"timeupdate",
			"loadedmetadata",
			"durationchange",
			"seeked"
		]) H.push(p(e, t, () => d(J)));
		H.push(p(e, "timeupdate", pt)), H.push(p(e, "ended", () => {
			if (s) try {
				let { inF: t, outF: n, maxF: r } = K(), i = t <= 0 && n >= r;
				if (U.pingpong && !U._ppReverse) {
					it();
					return;
				}
				if (!U.loop && !i) return;
				Z(t);
				try {
					let t = e.play?.();
					t && typeof t.catch == "function" && t.catch(() => {});
				} catch (e) {
					console.debug?.(e);
				}
			} catch (e) {
				console.debug?.(e);
			}
		}, { passive: !0 })), a && (H.push(p(e, "loadedmetadata", () => {
			if (!s) {
				Y();
				return;
			}
			try {
				let e = Ye();
				e > 0 && U.inFrame == null && U.outFrame == null && (U.inFrame = 0, U.outFrame = e, G());
			} catch (e) {
				console.debug?.(e);
			}
			Y();
		})), H.push(p(e, "durationchange", () => d(Y)))), s && H.push(p(e, "mjr:frameStep", () => {
			d(Ge);
		}));
		for (let t of ["volumechange"]) H.push(p(e, t, () => d(ot)));
		try {
			U.fps = m(A.value, U.nativeFps || 30), He(!0), U.step = Math.max(1, Math.floor(Number(k.value) || 1)), G(), Je(), qe(U.playbackRate);
		} catch (e) {
			console.debug?.(e);
		}
		d(q), d(J), d(Y), d(ot);
		try {
			(!e?.paused || U._ppReverse) && gt();
		} catch (e) {
			console.debug?.(e);
		}
		let _t = (e = {}) => {
			let t = 0, n = !1;
			try {
				t = Math.max(0, Ye()), n = t > 0 && U.outFrame != null && U.outFrame >= t - 1;
			} catch (e) {
				console.debug?.(e);
			}
			try {
				let t = Number(e?.fps);
				if (Number.isFinite(t) && t > 0) {
					if (String(e?.fpsSource || e?.source || "") === "rvfc" && Number(U.nativeFps) > 0) return;
					let n = Ve();
					U.nativeFps = m(t, U.nativeFps || 30), n || (U.fps = U.nativeFps);
					try {
						He(!0);
					} catch (e) {
						console.debug?.(e);
					}
				}
			} catch (e) {
				console.debug?.(e);
			}
			try {
				let t = Number(e?.frameCount);
				U.frameCount = Number.isFinite(t) && t > 0 ? Math.floor(t) : null;
			} catch {
				U.frameCount = null;
			}
			try {
				let e = Math.max(0, Ye());
				n && e > t + .5 && (U.outFrame = null), G(), Je(), J(), Y();
			} catch (e) {
				console.debug?.(e);
			}
		};
		try {
			if (s) {
				let e = Number(t?.initialFps), n = Number(t?.initialFrameCount);
				(Number.isFinite(e) || Number.isFinite(n)) && _t({
					fps: e,
					frameCount: n
				});
			}
		} catch (e) {
			console.debug?.(e);
		}
		if (s) {
			let e = {
				active: !1,
				which: null,
				pointerId: null,
				ac: null,
				captureEl: null
			}, t = (e) => {
				try {
					let t = y.getBoundingClientRect(), n = _((Number(e) || 0) - t.left, 0, t.width || 1), r = t.width > 0 ? n / t.width : 0, { maxF: i } = K();
					return _(Math.round(r * i), 0, i);
				} catch {
					return 0;
				}
			}, n = (n, a) => {
				V(n);
				try {
					e.ac?.abort?.();
				} catch (e) {
					console.debug?.(e);
				}
				e.ac = null, e.active = !0, e.which = a, e.pointerId = n.pointerId;
				try {
					e.captureEl = n.currentTarget || null;
				} catch {
					e.captureEl = null;
				}
				try {
					e.captureEl?.setPointerCapture?.(n.pointerId);
				} catch (e) {
					console.debug?.(e);
				}
				try {
					y.setPointerCapture?.(n.pointerId);
				} catch (e) {
					console.debug?.(e);
				}
				try {
					let t = new AbortController();
					e.ac = t, window.addEventListener("pointermove", r, {
						passive: !1,
						capture: !0,
						signal: t.signal
					}), window.addEventListener("pointerup", i, {
						passive: !1,
						capture: !0,
						signal: t.signal
					}), window.addEventListener("pointercancel", i, {
						passive: !1,
						capture: !0,
						signal: t.signal
					});
				} catch (e) {
					console.debug?.(e);
				}
				let o = t(n.clientX);
				a === "in" ? U.inFrame = o : U.outFrame = o, G(), J(), Y(), X({ prefer: a });
			}, r = (n) => {
				if (!e.active) return;
				V(n);
				let r = t(n.clientX);
				e.which === "in" ? U.inFrame = r : U.outFrame = r, G(), J(), Y();
			}, i = (t) => {
				if (e.active) {
					V(t), e.active = !1;
					try {
						y.releasePointerCapture?.(e.pointerId);
					} catch (e) {
						console.debug?.(e);
					}
					try {
						e.captureEl?.releasePointerCapture?.(e.pointerId);
					} catch (e) {
						console.debug?.(e);
					}
					e.captureEl = null, e.pointerId = null;
					try {
						X({ prefer: e.which });
					} catch (e) {
						console.debug?.(e);
					}
					try {
						e.ac?.abort?.();
					} catch (e) {
						console.debug?.(e);
					}
					e.ac = null;
				}
			};
			H.push(p(ae, "pointerdown", (e) => n(e, "in"), { passive: !1 })), H.push(p(oe, "pointerdown", (e) => n(e, "out"), { passive: !1 })), H.push(p(te, "pointerdown", (e) => n(e, "in"), { passive: !1 })), H.push(p(ne, "pointerdown", (e) => n(e, "out"), { passive: !1 })), H.push(p(y, "pointermove", r, { passive: !1 })), H.push(p(y, "pointerup", i, { passive: !1 })), H.push(p(y, "pointercancel", i, { passive: !1 }));
		}
		return d(() => l.appendChild(u)), {
			controlsEl: u,
			setMediaInfo: _t,
			setPlaybackRate: (e) => {
				try {
					return qe(e);
				} catch {
					return U.playbackRate || 1;
				}
			},
			getPlaybackRate: () => {
				try {
					return Number(U.playbackRate) || 1;
				} catch {
					return 1;
				}
			},
			adjustPlaybackRate: (e) => {
				try {
					let t = Number(e);
					return Number.isFinite(t) ? qe((Number(U.playbackRate) || 1) + t) : U.playbackRate || 1;
				} catch {
					return U.playbackRate || 1;
				}
			},
			togglePlay: () => {
				try {
					return lt(), !0;
				} catch {
					return !1;
				}
			},
			stepFrames: (e) => {
				try {
					return st(e), !0;
				} catch {
					return !1;
				}
			},
			setInPoint: () => {
				if (!s) return !1;
				try {
					return U.inFrame = W(), G(), J(), Y(), X({ prefer: "in" }), !0;
				} catch {
					return !1;
				}
			},
			setOutPoint: () => {
				if (!s) return !1;
				try {
					return U.outFrame = W(), G(), J(), Y(), X({ prefer: "out" }), !0;
				} catch {
					return !1;
				}
			},
			goToIn: () => {
				if (!s) return !1;
				try {
					let { inF: e } = K();
					return Z(e), Ge(), !0;
				} catch {
					return !1;
				}
			},
			goToOut: () => {
				if (!s) return !1;
				try {
					let { outF: e } = K();
					return Z(e), Ge(), !0;
				} catch {
					return !1;
				}
			},
			destroy: () => {
				for (let e of H) d(e);
				d(() => u.remove());
			}
		};
	} catch {
		return {
			controlsEl: null,
			destroy: h
		};
	}
}
//#endregion
//#region ui/features/viewer/mediaPlayer.ts
function O(e) {
	let t = String(e || "").toLowerCase();
	return t === "video" || t === "audio";
}
function Se({ mode: e, VIEWER_MODES: t, singleView: n, abView: r, sideView: i } = {}) {
	try {
		let a = n;
		return e === t?.AB_COMPARE ? a = r : e === t?.SIDE_BY_SIDE && (a = i), a ? Array.from(a.querySelectorAll?.(".mjr-viewer-video-src, .mjr-viewer-audio-src") || []) : [];
	} catch {
		return [];
	}
}
function Ce(e) {
	try {
		let t = Array.isArray(e) ? e : [];
		return t.find((e) => String(e?.dataset?.mjrCompareRole || "") === "A") || t[0] || null;
	} catch {
		return null;
	}
}
function we(e, t = {}) {
	try {
		if (!e) return null;
		let n = String(t?.mediaKind || "").toLowerCase();
		return xe(e, {
			...t,
			mediaKind: n
		});
	} catch {
		return null;
	}
}
//#endregion
//#region ui/utils/tooltipShortcuts.ts
function Te(e, t) {
	let n = String(e || "").trim(), r = String(t || "").trim();
	if (!r) return n;
	if (!n) return r;
	if (r.length === 1) {
		let e = r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		if (RegExp(`\\(${e}\\)|\\b${e}\\b`, "i").test(n)) return n;
	} else if (n.toLowerCase().includes(r.toLowerCase())) return n;
	return `${n} (${r})`;
}
function Ee(e, t, n, { setAriaLabel: r = !0, ariaLabel: i = null } = {}) {
	if (!e) return "";
	let a = Te(t, n);
	if (e.title = a, r) {
		let r = i ?? t;
		e.setAttribute("aria-label", Te(r, n));
	}
	return a;
}
//#endregion
//#region ui/features/viewer/videoSync.ts
var De = () => {
	try {
		return !!i?.DEBUG_VIEWER;
	} catch {
		return !1;
	}
};
function Oe(e, t, { threshold: n = .15 } = {}) {
	let r = new AbortController();
	try {
		if (!e) return r;
		let i = Array.isArray(t) ? t.filter((t) => t && t !== e) : [];
		if (!i.length) return r;
		let a = [e, ...i].filter(Boolean), o = !1, s = /* @__PURE__ */ new WeakSet(), c = {
			source: null,
			rafId: null,
			rvfcId: null
		}, l = () => {
			try {
				let e = c.source;
				c.rvfcId != null && typeof e?.cancelVideoFrameCallback == "function" && e.cancelVideoFrameCallback(c.rvfcId);
			} catch (e) {
				console.debug?.(e);
			}
			c.rvfcId = null;
			try {
				c.rafId != null && typeof cancelAnimationFrame == "function" && cancelAnimationFrame(c.rafId);
			} catch (e) {
				console.debug?.(e);
			}
			c.rafId = null, c.source = null;
		}, u = (e) => {
			try {
				if (e && e.paused === !1) return;
				try {
					s.add(e);
				} catch (e) {
					console.debug?.(e);
				}
				let t = e.play?.();
				t && typeof t.catch == "function" && t.catch(() => {});
			} catch (e) {
				console.debug?.(e);
			}
		}, d = (e) => {
			if (!o) try {
				let t = Number(e?.currentTime) || 0;
				for (let r of a) if (!(!r || r === e)) try {
					Math.abs((Number(r.currentTime) || 0) - t) > n && (o = !0, r.currentTime = t, o = !1);
				} catch {
					o = !1;
				}
			} catch {
				o = !1;
			}
		}, f = () => {
			let t = c.source || e;
			if (c.rafId = null, c.rvfcId = null, !(!t || r.signal.aborted || t.paused)) {
				d(t);
				try {
					if (typeof t?.requestVideoFrameCallback == "function") {
						c.rvfcId = t.requestVideoFrameCallback(f);
						return;
					}
				} catch (e) {
					console.debug?.(e);
				}
				try {
					typeof requestAnimationFrame == "function" && (c.rafId = requestAnimationFrame(f));
				} catch (e) {
					console.debug?.(e);
				}
			}
		}, p = (t = e) => {
			l(), c.source = t || e, !(!c.source || c.source.paused || r.signal.aborted) && f();
		};
		try {
			r.signal.addEventListener("abort", l, { once: !0 });
		} catch (e) {
			console.debug?.(e);
		}
		let m = () => d(e), h = (t, n = e) => {
			if (!o) {
				for (let e of a) if (!(!e || e === n)) try {
					if (t) u(e);
					else {
						try {
							s.add(e);
						} catch (e) {
							console.debug?.(e);
						}
						e.pause?.();
					}
				} catch (e) {
					console.debug?.(e);
				}
			}
		}, g = (t = e) => {
			if (!o) {
				for (let e of a) if (!(!e || e === t)) try {
					e.muted = !!t.muted, e.volume = Number(t.volume) || 0;
				} catch (e) {
					console.debug?.(e);
				}
			}
		}, _ = (t = e) => {
			if (!o) {
				for (let e of a) if (!(!e || e === t)) try {
					e.playbackRate = Number(t.playbackRate) || 1;
				} catch (e) {
					console.debug?.(e);
				}
			}
		};
		try {
			for (let e of i) {
				try {
					e.muted = !0;
				} catch (e) {
					console.debug?.(e);
				}
				try {
					e.loop = !1;
				} catch (e) {
					console.debug?.(e);
				}
			}
		} catch (e) {
			console.debug?.(e);
		}
		try {
			g(), _(), m(), e.paused || (h(!0), p(e));
		} catch (e) {
			console.debug?.(e);
		}
		e.addEventListener("play", () => h(!0), {
			signal: r.signal,
			passive: !0
		}), e.addEventListener("play", () => p(e), {
			signal: r.signal,
			passive: !0
		}), e.addEventListener("pause", () => {
			l(), h(!1);
		}, {
			signal: r.signal,
			passive: !0
		}), e.addEventListener("timeupdate", m, {
			signal: r.signal,
			passive: !0
		}), e.addEventListener("seeking", m, {
			signal: r.signal,
			passive: !0
		}), e.addEventListener("seeked", m, {
			signal: r.signal,
			passive: !0
		}), e.addEventListener("ended", m, {
			signal: r.signal,
			passive: !0
		}), e.addEventListener("volumechange", g, {
			signal: r.signal,
			passive: !0
		}), e.addEventListener("ratechange", _, {
			signal: r.signal,
			passive: !0
		});
		for (let t of i) try {
			t.addEventListener("play", () => {
				if (s.has(t)) {
					s.delete(t), p(e);
					return;
				}
				d(t), _(t), h(!0, t), p(t);
			}, {
				signal: r.signal,
				passive: !0
			}), t.addEventListener("pause", () => {
				if (s.has(t)) {
					s.delete(t);
					return;
				}
				t?.ended || (l(), h(!1, t));
			}, {
				signal: r.signal,
				passive: !0
			}), t.addEventListener("seeking", () => d(t), {
				signal: r.signal,
				passive: !0
			}), t.addEventListener("seeked", () => d(t), {
				signal: r.signal,
				passive: !0
			}), t.addEventListener("ratechange", () => _(t), {
				signal: r.signal,
				passive: !0
			});
		} catch (e) {
			console.debug?.(e);
		}
		try {
			for (let t of i) try {
				t.addEventListener("ended", () => {
					if (!o) {
						try {
							o = !0, t.currentTime = Number(e.currentTime) || 0;
						} catch (e) {
							console.debug?.(e);
						} finally {
							o = !1;
						}
						try {
							e.paused || u(t);
						} catch (e) {
							console.debug?.(e);
						}
					}
				}, {
					signal: r.signal,
					passive: !0
				});
			} catch (e) {
				console.debug?.(e);
			}
		} catch (e) {
			console.debug?.(e);
		}
		try {
			for (let e of i) try {
				e.addEventListener("loadedmetadata", m, {
					signal: r.signal,
					passive: !0,
					once: !0
				});
			} catch (e) {
				console.debug?.(e);
			}
		} catch (e) {
			console.debug?.(e);
		}
	} catch (e) {
		if (De()) try {
			console.warn("[Viewer] follower video sync setup failed", e);
		} catch (e) {
			console.debug?.(e);
		}
	}
	return r;
}
//#endregion
//#region ui/utils/dom.ts
function ke(e, t) {
	if (!t) return null;
	try {
		if (!e) return null;
		if (e instanceof Element && typeof e.closest == "function") return e.closest(t);
		let n = e?.parentElement;
		if (n && typeof n.closest == "function") return n.closest(t);
	} catch (e) {
		console.debug?.(e);
	}
	return null;
}
function Ae(e) {
	let t = String(e ?? "");
	try {
		if (typeof CSS?.escape == "function") return CSS.escape(t);
	} catch (e) {
		console.debug?.(e);
	}
	return t.replace(/([!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, "\\$1");
}
async function je(e) {
	try {
		return navigator?.clipboard?.writeText ? (await navigator.clipboard.writeText(String(e ?? "")), !0) : !1;
	} catch {
		return !1;
	}
}
//#endregion
//#region ui/features/viewer/workflowSidebar/widgetAdapters.ts
function Me(e, t, n = null) {
	switch (String(e?.type || "").toLowerCase()) {
		case "number":
		case "int":
		case "float": return j(e, t, n);
		case "combo": return Ne(e, t, n);
		case "text":
		case "string":
		case "customtext": return M(e, t, n);
		case "toggle":
		case "boolean": return N(e, t, n);
		default: return P(e);
	}
}
function k(e, t, i = null) {
	if (!e) return !1;
	let a = String(e.type || "").toLowerCase();
	if (a === "number" || a === "int" || a === "float") {
		let n = Number(t);
		if (Number.isNaN(n)) return !1;
		let r = e.options ?? {}, i = r.min ?? -Infinity, o = r.max ?? Infinity, s = Math.min(o, Math.max(i, n));
		(a === "int" || r.precision === 0 || r.round === 1) && (s = Math.round(s)), e.value = s;
	} else a === "toggle" || a === "boolean" ? e.value = !!t : e.value = t;
	try {
		let t = r(), o = i ?? e?.parent ?? null, s = e.value;
		e.callback?.(e.value, t, o, null, e), (a === "number" || a === "int" || a === "float") && (e.value = s), A(e), n(o);
	} catch (e) {
		console.debug?.("[MFV] writeWidgetValue", e);
	}
	return !0;
}
function A(e) {
	let t = String(e.value ?? ""), n = e?.inputEl ?? e?.element ?? e?.el ?? e?.cachedDeepestByFrame?.widget?.inputEl ?? e?.cachedDeepestByFrame?.widget?.element ?? e?.cachedDeepestByFrame?.widget?.el ?? null;
	n != null && "value" in n && n.value !== t && (n.value = t);
}
function j(e, t, n = null) {
	let r = document.createElement("input");
	r.type = "number", r.className = "mjr-ws-input", r.value = e.value ?? "";
	let i = e.options ?? {}, a = String(e?.type || "").toLowerCase() === "int" || i.precision === 0 || i.round === 1;
	if (i.min != null && (r.min = String(i.min)), i.max != null && (r.max = String(i.max)), a) r.step = "1";
	else {
		let e = i.precision;
		r.step = e == null ? "any" : String(10 ** -e);
	}
	return r.addEventListener("input", () => {
		let i = r.value;
		i === "" || i === "-" || i === "." || i.endsWith(".") || (k(e, i, n), t?.(e.value));
	}), r.addEventListener("change", () => {
		k(e, r.value, n) && (r.value = String(e.value), t?.(e.value));
	}), r;
}
function Ne(e, t, n = null) {
	let r = document.createElement("select");
	r.className = "mjr-ws-input";
	let i = e.options?.values ?? [];
	if (typeof i == "function") try {
		i = i() ?? [];
	} catch {
		i = [];
	}
	Array.isArray(i) || (i = []);
	for (let t of i) {
		let n = document.createElement("option"), i = typeof t == "string" ? t : t?.content ?? t?.value ?? t?.text ?? String(t);
		n.value = i, n.textContent = i, i === String(e.value) && (n.selected = !0), r.appendChild(n);
	}
	return r.addEventListener("change", () => {
		k(e, r.value, n) && t?.(e.value);
	}), r;
}
function M(e, t, n = null) {
	let r = document.createElement("div");
	r.className = "mjr-ws-text-wrapper";
	let i = document.createElement("textarea");
	i.className = "mjr-ws-input mjr-ws-textarea", i.value = e.value ?? "", i.rows = 2;
	let a = () => {
		i.style.height = "auto", i.style.height = i.scrollHeight + "px";
	};
	return i.addEventListener("change", () => {
		k(e, i.value, n) && t?.(e.value);
	}), i.addEventListener("input", () => {
		k(e, i.value, n), t?.(e.value), a();
	}), r.appendChild(i), r._mjrAutoFit = a, i._mjrAutoFit = a, requestAnimationFrame(a), r;
}
function N(e, t, n = null) {
	let r = document.createElement("label");
	r.className = "mjr-ws-toggle-label";
	let i = document.createElement("input");
	return i.type = "checkbox", i.className = "mjr-ws-checkbox", i.checked = !!e.value, i.addEventListener("change", () => {
		k(e, i.checked, n) && t?.(e.value);
	}), r.appendChild(i), r;
}
function P(e) {
	let t = document.createElement("input");
	return t.type = "text", t.className = "mjr-ws-input mjr-ws-readonly", t.value = e.value == null ? "" : String(e.value), t.readOnly = !0, t.tabIndex = -1, t;
}
//#endregion
//#region ui/app/settings/MajoorSettingsDialog.ts
var F = "mjr-settings-dialog", Pe = "mjr-settings-dialog-style", I = null, Fe = {
	Cards: {
		icon: "pi pi-th-large",
		label: "Cards"
	},
	Badges: {
		icon: "pi pi-tags",
		label: "Badges"
	},
	Grid: {
		icon: "pi pi-table",
		label: "Grid"
	},
	Sidebar: {
		icon: "pi pi-window-maximize",
		label: "Sidebar"
	},
	Viewer: {
		icon: "pi pi-images",
		label: "Viewer"
	},
	"Floating Viewer": {
		icon: "pi pi-window-maximize",
		label: "Floating Viewer"
	},
	"Generated Feed": {
		icon: "pi pi-bolt",
		label: "Generated Feed"
	},
	Search: {
		icon: "pi pi-search",
		label: "Search"
	},
	Scanning: {
		icon: "pi pi-sync",
		label: "Scanning"
	},
	Security: {
		icon: "pi pi-shield",
		label: "Security"
	},
	Advanced: {
		icon: "pi pi-cog",
		label: "Advanced"
	},
	Remote: {
		icon: "pi pi-cloud",
		label: "Remote"
	},
	General: {
		icon: "pi pi-sliders-h",
		label: "General"
	}
};
function L() {
	if (typeof document > "u" || document.getElementById(Pe)) return;
	let e = document.createElement("style");
	e.id = Pe, e.textContent = `
#${F} {
    position: fixed;
    inset: 0;
    z-index: 10080;
    display: grid;
    place-items: center;
    background: rgba(0, 0, 0, 0.48);
    color: var(--fg-color, #ddd);
    font: 13px/1.4 system-ui, -apple-system, Segoe UI, sans-serif;
}
#${F}[hidden] { display: none; }
#${F} .mjr-settings-panel {
    width: min(860px, calc(100vw - 32px));
    max-height: min(780px, calc(100vh - 32px));
    display: grid;
    grid-template-rows: auto auto 1fr;
    background: var(--comfy-menu-bg, #252525);
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 8px;
    box-shadow: 0 18px 60px rgba(0, 0, 0, 0.45);
    overflow: hidden;
}
#${F} .mjr-settings-head,
#${F} .mjr-settings-tools {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.10);
}
#${F} .mjr-settings-title {
    font-weight: 700;
    font-size: 14px;
    flex: 1;
}
#${F} .mjr-settings-close,
#${F} .mjr-settings-reset {
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.06);
    color: inherit;
    border-radius: 6px;
    min-height: 30px;
    padding: 0 10px;
    cursor: pointer;
}
#${F} .mjr-settings-close {
    width: 30px;
    padding: 0;
}
#${F} .mjr-settings-search {
    flex: 1;
    min-width: 160px;
    height: 30px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: rgba(0, 0, 0, 0.22);
    color: inherit;
    padding: 0 10px;
}
#${F} .mjr-settings-body {
    overflow: auto;
    padding: 12px;
}
#${F} .mjr-settings-stack {
    display: grid;
    gap: 10px;
}
#${F} .mjr-settings-group {
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.035);
    overflow: hidden;
}
#${F} .mjr-settings-group summary {
    min-height: 42px;
    display: grid;
    grid-template-columns: 28px 1fr auto 18px;
    align-items: center;
    gap: 10px;
    padding: 8px 11px;
    cursor: pointer;
    user-select: none;
    background: rgba(255, 255, 255, 0.045);
}
#${F} .mjr-settings-group summary::-webkit-details-marker {
    display: none;
}
#${F} .mjr-settings-group-icon {
    width: 28px;
    height: 28px;
    display: grid;
    place-items: center;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.07);
    color: var(--input-text, #fff);
}
#${F} .mjr-settings-group-title {
    color: var(--input-text, #fff);
    font-weight: 700;
}
#${F} .mjr-settings-group-meta {
    opacity: 0.68;
    font-size: 12px;
}
#${F} .mjr-settings-chevron {
    transition: transform 0.16s ease;
}
#${F} details[open] > summary .mjr-settings-chevron {
    transform: rotate(90deg);
}
#${F} .mjr-settings-group-body {
    padding: 4px 11px 11px;
}
#${F} .mjr-settings-subgroup {
    margin-top: 8px;
}
#${F} .mjr-settings-subgroup-title {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 10px 0 2px;
    color: var(--input-text, #fff);
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    opacity: 0.86;
}
#${F} .mjr-settings-subgroup-title::after {
    content: "";
    height: 1px;
    flex: 1;
    background: rgba(255, 255, 255, 0.10);
}
#${F} .mjr-settings-row {
    display: grid;
    grid-template-columns: minmax(220px, 1fr) minmax(180px, 280px);
    align-items: center;
    gap: 16px;
    padding: 9px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.07);
}
#${F} .mjr-settings-name {
    font-weight: 600;
    color: var(--p-primary-color, var(--comfy-accent, #8ab4f8));
}
#${F} .mjr-settings-tip {
    margin-top: 2px;
    opacity: 0.72;
    font-size: 12px;
}
#${F} input,
#${F} select {
    min-height: 30px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: rgba(0, 0, 0, 0.22);
    color: inherit;
    padding: 0 8px;
}
#${F} input[type="checkbox"] {
    justify-self: end;
    width: 18px;
    min-height: 18px;
}
#${F} input[type="color"] {
    padding: 2px;
    width: 56px;
    justify-self: end;
}
@media (max-width: 620px) {
    #${F} .mjr-settings-row {
        grid-template-columns: 1fr;
        gap: 8px;
    }
}
`, document.head.appendChild(e);
}
function Ie(e) {
	return String(e || "").replace(/^\s*Majoor:\s*/i, "").trim();
}
function Le(e) {
	let t = Array.isArray(e?.category) ? e.category : [];
	return String(t[1] || "General").trim() || "General";
}
function Re(e) {
	return (Array.isArray(e?.category) ? e.category : []).slice(2).filter(Boolean).join(" / ") || "General";
}
function R(e) {
	return Fe[e] || {
		icon: "pi pi-sliders-h",
		label: e || "General"
	};
}
function z(e, t) {
	return t ? [
		e?.id,
		e?.name,
		e?.tooltip,
		...Array.isArray(e?.category) ? e.category : []
	].join(" ").toLowerCase().includes(t) : !0;
}
function B(e, t) {
	if (typeof e?.onChange == "function") {
		e.defaultValue = t;
		try {
			let n = e.onChange(t);
			n && typeof n.catch == "function" && n.catch((e) => {
				console.error?.("[Majoor] settings change failed", e);
			});
		} catch (e) {
			console.error?.("[Majoor] settings change failed", e);
		}
	}
}
function V(e) {
	let t = String(e?.type || "text").toLowerCase(), n = e?.defaultValue, r;
	if (t === "boolean") return r = document.createElement("input"), r.type = "checkbox", r.checked = !!n, r.addEventListener("change", () => B(e, r.checked)), r;
	if (t === "combo") {
		r = document.createElement("select");
		for (let t of e?.options || []) {
			let e = document.createElement("option"), n = t && typeof t == "object" ? t.value ?? t.text ?? t.label : t;
			e.value = String(n ?? ""), e.textContent = String(t && typeof t == "object" ? t.text ?? t.label ?? t.value : t), r.appendChild(e);
		}
		return r.value = String(n ?? ""), r.addEventListener("change", () => B(e, r.value)), r;
	}
	if (r = document.createElement("input"), r.type = t === "color" ? "color" : t === "number" ? "number" : t === "password" ? "password" : "text", e?.attrs && typeof e.attrs == "object") for (let [t, n] of Object.entries(e.attrs)) n != null && r.setAttribute(t, String(n));
	r.value = String(n ?? "");
	let i = t === "color" ? "input" : "change";
	return r.addEventListener(i, () => {
		B(e, t === "number" ? Number(r.value) : r.value);
	}), r;
}
function H(e, t, n = "") {
	e.replaceChildren();
	let r = document.createElement("div");
	r.className = "mjr-settings-stack", e.appendChild(r);
	let i = /* @__PURE__ */ new Map();
	for (let e of t || []) {
		if (!z(e, n)) continue;
		let t = Le(e), r = Re(e);
		i.has(t) || i.set(t, /* @__PURE__ */ new Map());
		let a = i.get(t);
		a.has(r) || a.set(r, []), a.get(r).push(e);
	}
	for (let [e, t] of i.entries()) {
		let i = Array.from(t.values()).flat(), a = R(e), o = document.createElement("details");
		o.className = "mjr-settings-group", o.open = !!n;
		let s = document.createElement("summary"), c = document.createElement("span");
		c.className = "mjr-settings-group-icon";
		let l = document.createElement("i");
		l.className = a.icon, l.setAttribute("aria-hidden", "true"), c.appendChild(l);
		let u = document.createElement("span");
		u.className = "mjr-settings-group-title", u.textContent = a.label || e;
		let d = document.createElement("span");
		d.className = "mjr-settings-group-meta", d.textContent = `${i.length} setting${i.length === 1 ? "" : "s"}`;
		let f = document.createElement("i");
		f.className = "pi pi-chevron-right mjr-settings-chevron", f.setAttribute("aria-hidden", "true"), s.append(c, u, d, f), o.appendChild(s);
		let p = document.createElement("div");
		p.className = "mjr-settings-group-body";
		for (let [e, n] of t.entries()) {
			let t = document.createElement("section");
			t.className = "mjr-settings-subgroup";
			let r = document.createElement("div");
			r.className = "mjr-settings-subgroup-title", r.textContent = e, t.appendChild(r);
			for (let e of n) {
				let n = document.createElement("label");
				n.className = "mjr-settings-row";
				let r = document.createElement("div"), i = document.createElement("div");
				if (i.className = "mjr-settings-name", i.textContent = Ie(e?.name) || e?.id || "Setting", r.appendChild(i), e?.tooltip) {
					let t = document.createElement("div");
					t.className = "mjr-settings-tip", t.textContent = String(e.tooltip), r.appendChild(t);
				}
				n.appendChild(r), n.appendChild(V(e)), t.appendChild(n);
			}
			p.appendChild(t);
		}
		o.appendChild(p), r.appendChild(o);
	}
}
function ze() {
	L();
	let e = document.createElement("div");
	e.id = F, e.hidden = !0, e.addEventListener("click", (t) => {
		t.target === e && Be();
	});
	let t = document.createElement("div");
	t.className = "mjr-settings-panel", t.setAttribute("role", "dialog"), t.setAttribute("aria-modal", "true");
	let n = document.createElement("div");
	n.className = "mjr-settings-head";
	let r = document.createElement("div");
	r.className = "mjr-settings-title", r.textContent = o("settings.majoor.title", "Majoor Assets Manager Settings");
	let i = document.createElement("button");
	i.type = "button", i.className = "mjr-settings-close", i.textContent = "X", i.setAttribute("aria-label", o("btn.close", "Close")), i.addEventListener("click", Be), n.append(r, i);
	let a = document.createElement("div");
	a.className = "mjr-settings-tools";
	let s = document.createElement("input");
	s.type = "search", s.className = "mjr-settings-search", s.placeholder = o("placeholder.searchSettings", "Search settings"), a.appendChild(s);
	let c = document.createElement("div");
	return c.className = "mjr-settings-body", t.append(n, a, c), e.appendChild(t), document.body.appendChild(e), {
		body: c,
		root: e,
		search: s
	};
}
function Be() {
	I?.root && (I.root.hidden = !0);
}
function U(t = e()) {
	if (typeof document > "u") return !1;
	I?.root?.isConnected || (I = ze());
	let n = f(t), r = () => H(I.body, n, String(I.search.value || "").trim().toLowerCase());
	return I.search.oninput = r, I.search.value = "", r(), I.root.hidden = !1, setTimeout(() => I?.search?.focus?.(), 0), !0;
}
//#endregion
//#region ui/app/openMajoorSettings.ts
function Ve(t = e()) {
	return U(t);
}
try {
	typeof window < "u" && (window.MajoorAssetsManager = window.MajoorAssetsManager || {}, window.MajoorAssetsManager.openSettings = Ve);
} catch (e) {
	console.debug?.(e);
}
//#endregion
export { oe as _, ke as a, Te as c, O as d, we as f, ie as g, ae as h, je as i, Ee as l, xe as m, Me as n, Ae as o, Ce as p, k as r, Oe as s, Ve as t, Se as u, T as v, w as y };

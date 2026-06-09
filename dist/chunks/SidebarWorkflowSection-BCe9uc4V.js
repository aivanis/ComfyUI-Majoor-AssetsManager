import { A as e, B as t, C as n, Dt as r, F as i, G as a, H as o, I as s, It as c, K as l, L as u, Lt as d, N as f, Ot as p, P as m, R as h, St as g, Tt as _, V as v, W as y, _t as b, at as x, ct as S, dt as C, ft as w, h as ee, it as T, kt as te, lt as ne, mt as re, ot as ie, pt as E, rt as ae, st as oe, u as se, ut as ce, vt as D, xt as O, yt as le, z as ue } from "./client-CXKc-lUD.js";
import { B as de, C as fe, D as pe, T as me, a as he, c as ge, i as _e, l as k, m as ve, n as A, o as ye, ot as be, r as xe, s as Se, t as j, u as Ce, x as we, y as Te } from "./config-CvC3JxWV.js";
import { $ as M, C as N, D as P, E as F, F as Ee, G as De, H as Oe, L as I, O as ke, P as Ae, T as je, V as Me, W as Ne, a as Pe, at as L, b as Fe, c as Ie, ct as R, d as Le, f as Re, g as ze, h as Be, i as Ve, k as He, l as Ue, m as We, n as Ge, o as Ke, ot as qe, p as Je, r as Ye, s as Xe, st as z, t as Ze, u as Qe, v as $e, w as B, x as V, y as et, z as H } from "./mjr-primevue-CJ2E0Gsv.js";
import { n as tt, r as nt, t as rt } from "./mjr-vue-vendor-DRftM6R3.js";
import { a as it, i as at, n as ot, o as st, r as ct, t as lt } from "./geninfoParser-5vKgjqjD.js";
//#region ui/utils/events.ts
function ut(e, t, { target: n = null, warnPrefix: r = "[Majoor]" } = {}) {
	let i = n || (typeof window < "u" ? window : null);
	if (!i || typeof i.dispatchEvent != "function") return !1;
	try {
		return i.dispatchEvent(new CustomEvent(e, { detail: t }));
	} catch (t) {
		try {
			console.warn(`${r} Failed to dispatch event: ${e}`, t);
		} catch (e) {
			console.debug?.(e);
		}
		return !1;
	}
}
//#endregion
//#region ui/app/settings/settingsUtils.ts
var U = (e, t) => {
	if (typeof e == "boolean") return e;
	if (typeof e == "string") {
		let t = e.trim().toLowerCase();
		if ([
			"1",
			"true",
			"yes",
			"on"
		].includes(t)) return !0;
		if ([
			"0",
			"false",
			"no",
			"off"
		].includes(t)) return !1;
	}
	return !!t;
}, W = (e, t) => {
	let n = Number(e);
	return Number.isFinite(n) ? n : Number(t);
}, dt = (e, t, n) => {
	let r = typeof e == "string" ? e.trim() : String(e ?? "");
	return t.includes(r) ? r : n;
}, ft = (e) => e === "__proto__" || e === "prototype" || e === "constructor", pt = (e, t) => {
	let n = { ...e };
	return !t || typeof t != "object" || Object.keys(t).forEach((r) => {
		if (ft(r)) return;
		let i = t[r];
		i && typeof i == "object" && !Array.isArray(i) ? n[r] = pt(e[r] || {}, i) : i !== void 0 && (n[r] = i);
	}), n;
}, mt = Object.freeze({
	small: 80,
	medium: 120,
	large: 180
}), ht = Object.freeze([
	"small",
	"medium",
	"large"
]), gt = (e, t) => Math.max(60, Math.min(600, Math.round(W(e, t)))), _t = (e = {}) => {
	let t = Number(e?.minSize);
	if (Number.isFinite(t)) return gt(t, A.GRID_MIN_SIZE);
	let n = dt(String(e?.minSizePreset || "").toLowerCase(), ht, "");
	return n ? mt[n] : gt(e?.minSize, A.GRID_MIN_SIZE);
}, vt = (e = {}) => gt(e?.minSize, A.FEED_GRID_MIN_SIZE), yt = (e) => {
	let t = Math.round(W(e, A.GRID_MIN_SIZE));
	return t <= 100 ? "small" : t >= 150 ? "large" : "medium";
}, bt = async (e, t = "Majoor", n = {}) => {
	let r = wt();
	if (r && typeof r.alert == "function") try {
		await r.alert({
			title: String(t || "Majoor"),
			message: String(e || "")
		});
		return;
	} catch (e) {
		console.debug?.(e);
	}
	let i = Tt();
	if (i) try {
		let n = String(e || "");
		typeof i.addAlert == "function" ? i.addAlert(n) : i.add({
			severity: "info",
			summary: String(t || "Majoor"),
			detail: n,
			life: 5e3
		});
		return;
	} catch (e) {
		console.debug?.(e);
	}
	if (n?.native !== !1) {
		let n = Et();
		if (n) try {
			n.show(Dt(e, t));
			try {
				n.element?.style?.setProperty?.("z-index", "1100");
			} catch (e) {
				console.debug?.(e);
			}
			return;
		} catch (e) {
			console.debug?.(e);
		}
	}
	let a = Mt();
	if (!a) {
		try {
			window.alert(e);
		} catch (e) {
			console.debug?.(e);
		}
		return;
	}
	return new Promise((n) => {
		let r = new a();
		It(r);
		let i = G("div", { style: {
			display: "flex",
			flexDirection: "column",
			gap: "18px",
			padding: "18px 20px 18px 20px"
		} }, [
			G("div", { style: {
				display: "flex",
				alignItems: "center",
				justifyContent: "flex-start"
			} }, [G("div", {
				textContent: t,
				style: {
					fontWeight: "700",
					fontSize: "30px",
					color: "rgba(255,255,255,0.96)",
					lineHeight: "1.2"
				}
			})]),
			G("div", {
				textContent: String(e || ""),
				style: {
					fontSize: "22px",
					color: "rgba(255,255,255,0.86)",
					whiteSpace: "pre-wrap",
					lineHeight: "1.45"
				}
			}),
			G("div", { style: {
				display: "flex",
				justifyContent: "flex-end",
				gap: "10px"
			} }, [G("button", {
				textContent: k("dialog.confirm", "Confirm"),
				onclick: () => {
					try {
						r.close();
					} catch (e) {
						console.debug?.(e);
					}
					n();
				},
				style: {
					padding: "10px 16px",
					borderRadius: "10px",
					border: "1px solid rgba(17,132,255,0.75)",
					background: "#1184ff",
					color: "rgba(255,255,255,0.98)",
					fontWeight: "600",
					cursor: "pointer"
				}
			})])
		]);
		try {
			r.show(i), setTimeout(() => Lt(r), 0);
		} catch {
			try {
				window.alert(e);
			} catch (e) {
				console.debug?.(e);
			}
			n();
		}
	});
}, xt = async (e, t = "Majoor") => {
	let n = wt();
	if (n) try {
		let r = {
			title: String(t || k("dialog.confirm", "Confirm")),
			message: String(e || "")
		};
		return !!(typeof n.confirm == "function" && await n.confirm(r));
	} catch (e) {
		console.debug?.(e);
	}
	let r = Mt();
	if (!r) try {
		return window.confirm(e);
	} catch {
		return !1;
	}
	return new Promise((n) => {
		let i = new r();
		It(i);
		let a = (e) => {
			try {
				i.close();
			} catch (e) {
				console.debug?.(e);
			}
			n(!!e);
		}, o = G("div", { style: {
			display: "flex",
			flexDirection: "column",
			gap: "18px",
			padding: "18px 20px 18px 20px"
		} }, [
			G("div", { style: {
				display: "flex",
				alignItems: "center",
				justifyContent: "flex-start"
			} }, [G("div", {
				textContent: t,
				style: {
					fontWeight: "700",
					fontSize: "30px",
					color: "rgba(255,255,255,0.96)",
					lineHeight: "1.2"
				}
			})]),
			G("div", {
				textContent: String(e || ""),
				style: {
					fontSize: "22px",
					color: "rgba(255,255,255,0.86)",
					whiteSpace: "pre-wrap",
					lineHeight: "1.45"
				}
			}),
			G("div", { style: {
				display: "flex",
				justifyContent: "flex-end",
				gap: "10px"
			} }, [G("button", {
				textContent: k("dialog.cancel", "Cancel"),
				onclick: () => a(!1),
				style: {
					padding: "10px 16px",
					borderRadius: "10px",
					border: "1px solid rgba(255,255,255,0.18)",
					background: "rgba(255,255,255,0.06)",
					color: "rgba(255,255,255,0.85)",
					fontWeight: "600",
					cursor: "pointer"
				}
			}), G("button", {
				textContent: k("dialog.confirm", "Confirm"),
				onclick: () => a(!0),
				style: {
					padding: "10px 16px",
					borderRadius: "10px",
					border: "1px solid rgba(17,132,255,0.75)",
					background: "#1184ff",
					color: "rgba(255,255,255,0.98)",
					fontWeight: "600",
					cursor: "pointer"
				}
			})])
		]);
		try {
			i.show(o), setTimeout(() => Lt(i), 0);
		} catch {
			try {
				n(!!window.confirm(e));
			} catch {
				n(!1);
			}
		}
	});
}, St = async (e, t = "", n = "Majoor") => {
	let r = wt();
	if (r) try {
		let i = {
			title: String(n || k("dialog.prompt", "Prompt")),
			message: String(e || ""),
			defaultValue: String(t ?? "")
		}, a = typeof r.prompt == "function" ? await r.prompt(i) : null;
		return a == null ? null : String(a);
	} catch (e) {
		console.debug?.(e);
	}
	let i = Mt();
	if (!i) try {
		return window.prompt(e, t);
	} catch {
		return null;
	}
	return new Promise((r) => {
		let a = new i();
		It(a);
		let o = (e) => {
			try {
				a.close();
			} catch (e) {
				console.debug?.(e);
			}
			r(e ?? null);
		}, s = G("input", {
			type: "text",
			value: String(t ?? ""),
			style: {
				width: "100%",
				padding: "10px 10px",
				borderRadius: "10px",
				border: "1px solid rgba(255,255,255,0.12)",
				background: "rgba(0,0,0,0.25)",
				color: "rgba(255,255,255,0.9)",
				outline: "none",
				boxSizing: "border-box"
			},
			onkeydown: (e) => {
				e.key === "Enter" && o(s.value), e.key === "Escape" && o(null), e.stopPropagation();
			}
		}), c = G("div", { style: {
			display: "flex",
			flexDirection: "column",
			gap: "12px",
			padding: "16px"
		} }, [
			G("div", {
				textContent: n,
				style: {
					fontWeight: "600",
					fontSize: "14px",
					color: "rgba(255,255,255,0.95)"
				}
			}),
			G("div", {
				textContent: String(e || ""),
				style: {
					fontSize: "13px",
					color: "rgba(255,255,255,0.80)",
					whiteSpace: "pre-wrap",
					lineHeight: "1.4"
				}
			}),
			s,
			G("div", { style: {
				display: "flex",
				justifyContent: "flex-end",
				gap: "10px"
			} }, [G("button", {
				textContent: k("dialog.cancel", "Cancel"),
				onclick: () => o(null),
				style: {
					padding: "8px 12px",
					borderRadius: "8px",
					border: "1px solid rgba(255,255,255,0.12)",
					background: "rgba(0,0,0,0.25)",
					color: "rgba(255,255,255,0.85)",
					cursor: "pointer"
				}
			}), G("button", {
				textContent: k("dialog.ok", "OK"),
				onclick: () => o(s.value),
				style: {
					padding: "8px 12px",
					borderRadius: "8px",
					border: "1px solid rgba(95,179,255,0.45)",
					background: "rgba(95,179,255,0.18)",
					color: "rgba(255,255,255,0.95)",
					cursor: "pointer"
				}
			})])
		]);
		try {
			a.show(c), setTimeout(() => Lt(a), 0), setTimeout(() => {
				try {
					s.focus(), s.select();
				} catch (e) {
					console.debug?.(e);
				}
			}, 0);
		} catch {
			try {
				r(window.prompt(e, t));
			} catch {
				r(null);
			}
		}
	});
}, Ct = () => {
	try {
		return me()?.ui || null;
	} catch {
		return null;
	}
}, wt = () => {
	let e = (e) => !!e && (typeof e.alert == "function" || typeof e.confirm == "function" || typeof e.prompt == "function");
	try {
		let t = we();
		if (e(t)) return t;
	} catch (e) {
		console.debug?.(e);
	}
	return null;
}, Tt = () => {
	try {
		let e = fe();
		if (e && typeof e.add == "function") return e;
	} catch (e) {
		console.debug?.(e);
	}
	return null;
}, Et = () => {
	try {
		let e = Ct();
		if (e?.dialog && typeof e.dialog.show == "function") return e.dialog;
	} catch (e) {
		console.debug?.(e);
	}
	return null;
}, Dt = (e, t = "Majoor") => {
	let n = String(e ?? ""), r = String(t ?? "").trim();
	return !r || r.toLowerCase() === "majoor" ? n : `${r}<br><br>${n}`;
}, Ot = new Set(/* @__PURE__ */ "abort.blur.change.click.close.contextmenu.dblclick.dragend.dragenter.dragleave.dragover.dragstart.drop.error.focus.input.keydown.keypress.keyup.load.mousedown.mouseenter.mouseleave.mousemove.mouseout.mouseover.mouseup.reset.resize.scroll.select.submit.touchcancel.touchend.touchmove.touchstart.transitionend.unload.wheel".split(".")), kt = new Set([
	"__proto__",
	"constructor",
	"prototype",
	"innerHTML",
	"outerHTML",
	"srcdoc",
	"__defineGetter__",
	"__defineSetter__",
	"__lookupGetter__",
	"__lookupSetter__"
]), At = new Set([
	"id",
	"name",
	"value",
	"type",
	"checked",
	"disabled",
	"placeholder",
	"title",
	"textContent",
	"htmlFor",
	"role",
	"tabIndex"
]), jt = (e, t = {}, n = []) => {
	let r = document.createElement(e);
	return Object.entries(t || {}).forEach(([e, t]) => {
		let n = String(e || "");
		if (!(!n || kt.has(n))) {
			if (e === "style" && t && typeof t == "object") {
				Object.assign(r.style, t);
				return;
			}
			if (e === "className") {
				r.className = String(t);
				return;
			}
			if (n.startsWith("on")) {
				if (typeof t == "function") {
					let e = n.slice(2).toLowerCase();
					Ot.has(e) && r.addEventListener(e, t);
				}
				return;
			}
			if (At.has(n)) try {
				r[n] = t;
				return;
			} catch (e) {
				console.debug?.(e);
			}
			try {
				r.setAttribute(n, String(t));
			} catch (e) {
				console.debug?.(e);
			}
		}
	}), (Array.isArray(n) ? n : [n]).filter(Boolean).forEach((e) => {
		try {
			r.appendChild(e);
		} catch {
			r.appendChild(document.createTextNode(String(e)));
		}
	}), r;
}, G = (e, t, n) => {
	let r = Ct();
	if (r?.$el) try {
		return r.$el(e, t, n);
	} catch {}
	return jt(e, t, n);
}, Mt = () => Ct()?.ComfyDialog || null, Nt = 999999, Pt = 560, Ft = 12, It = (e) => {
	try {
		e.element.style.zIndex = String(Nt), e.element.style.width = `${Pt}px`, e.element.style.padding = "0", e.element.style.backgroundColor = "var(--comfy-menu-bg, #131722)", e.element.style.border = "1px solid rgba(255,255,255,0.14)", e.element.style.borderRadius = `${Ft}px`, e.element.style.boxSizing = "border-box", e.element.style.overflow = "hidden", e.element.style.boxShadow = "0 18px 48px rgba(0,0,0,0.48)";
	} catch (e) {
		console.debug?.(e);
	}
}, Lt = (e) => {
	try {
		let t = e?.element;
		if (!t) return;
		let n = t.querySelectorAll("button,[role='button']");
		for (let e of n) {
			let t = String(e?.textContent || "").trim().toLowerCase(), n = String(e?.getAttribute?.("aria-label") || "").trim().toLowerCase();
			if (t === "close" || n === "close") try {
				e.style.display = "none";
			} catch (e) {
				console.debug?.(e);
			}
		}
	} catch (e) {
		console.debug?.(e);
	}
}, K = {
	debug: {
		safeCall: A.DEBUG_SAFE_CALL,
		safeListeners: A.DEBUG_SAFE_LISTENERS,
		viewer: A.DEBUG_VIEWER
	},
	grid: {
		pageSize: A.DEFAULT_PAGE_SIZE,
		minSize: A.GRID_MIN_SIZE,
		minSizePreset: "medium",
		gap: A.GRID_GAP,
		showExtBadge: A.GRID_SHOW_BADGES_EXTENSION,
		showRatingBadge: A.GRID_SHOW_BADGES_RATING,
		showTagsBadge: A.GRID_SHOW_BADGES_TAGS,
		showDetails: A.GRID_SHOW_DETAILS,
		showFilename: A.GRID_SHOW_DETAILS_FILENAME,
		showDate: A.GRID_SHOW_DETAILS_DATE,
		showDimensions: A.GRID_SHOW_DETAILS_DIMENSIONS,
		showGenTime: A.GRID_SHOW_DETAILS_GENTIME,
		showHoverInfo: A.GRID_SHOW_HOVER_INFO,
		showWorkflowDot: A.GRID_SHOW_WORKFLOW_DOT,
		workflowGroupBy: A.WORKFLOW_GRID_GROUP_BY,
		videoAutoplayMode: A.GRID_VIDEO_AUTOPLAY_MODE,
		starColor: A.BADGE_STAR_COLOR,
		badgeImageColor: A.BADGE_IMAGE_COLOR,
		badgeVideoColor: A.BADGE_VIDEO_COLOR,
		badgeAudioColor: A.BADGE_AUDIO_COLOR,
		badgeModel3dColor: A.BADGE_MODEL3D_COLOR,
		badgeDuplicateAlertColor: A.BADGE_DUPLICATE_ALERT_COLOR
	},
	infiniteScroll: {
		enabled: A.INFINITE_SCROLL_ENABLED,
		rootMargin: A.INFINITE_SCROLL_ROOT_MARGIN,
		threshold: A.INFINITE_SCROLL_THRESHOLD,
		bottomGapPx: A.BOTTOM_GAP_PX
	},
	siblings: { hidePngSiblings: !0 },
	autoScan: { onStartup: A.AUTO_SCAN_ON_STARTUP },
	scan: { fastMode: !0 },
	watcher: {
		enabled: !0,
		debounceMs: A.WATCHER_DEBOUNCE_MS,
		dedupeTtlMs: A.WATCHER_DEDUPE_TTL_MS,
		maxPending: 500,
		minSize: 100,
		maxSize: 4294967296
	},
	safety: { confirmDeletion: !0 },
	status: { pollInterval: A.STATUS_POLL_INTERVAL },
	viewer: {
		allowPanAtZoom1: A.VIEWER_ALLOW_PAN_AT_ZOOM_1,
		disableWebGL: A.VIEWER_DISABLE_WEBGL_VIDEO,
		pauseDuringExecution: A.VIEWER_PAUSE_DURING_EXECUTION,
		floatingPauseDuringExecution: A.FLOATING_VIEWER_PAUSE_DURING_EXECUTION,
		mfvLiveDefault: A.MFV_LIVE_DEFAULT,
		mfvPreviewDefault: A.MFV_PREVIEW_DEFAULT,
		videoGradeThrottleFps: A.VIEWER_VIDEO_GRADE_THROTTLE_FPS,
		scopesFps: A.VIEWER_SCOPES_FPS,
		metaTtlMs: A.VIEWER_META_TTL_MS,
		metaMaxEntries: A.VIEWER_META_MAX_ENTRIES,
		mfvSidebarPosition: "right",
		mfvPreviewMethod: A.MFV_PREVIEW_METHOD,
		ltxavRgbFallback: !1
	},
	rtHydrate: {
		concurrency: A.RT_HYDRATE_CONCURRENCY,
		queueMax: A.RT_HYDRATE_QUEUE_MAX,
		seenMax: A.RT_HYDRATE_SEEN_MAX,
		pruneBudget: A.RT_HYDRATE_PRUNE_BUDGET,
		seenTtlMs: A.RT_HYDRATE_SEEN_TTL_MS
	},
	observability: {
		enabled: !1,
		runtimeDashboardMode: "autoHide30",
		verboseErrors: !1,
		verboseRouteRegistrationLogs: !1,
		verboseStartupLogs: !1
	},
	feed: {
		minSize: A.FEED_GRID_MIN_SIZE,
		showInfo: A.FEED_SHOW_INFO,
		showFilename: A.FEED_SHOW_FILENAME,
		showDimensions: A.FEED_SHOW_DIMENSIONS,
		showDate: A.FEED_SHOW_DATE,
		showGenTime: A.FEED_SHOW_GENTIME,
		showWorkflowDot: A.FEED_SHOW_WORKFLOW_DOT,
		showExtBadge: A.FEED_SHOW_BADGES_EXTENSION,
		showRatingBadge: A.FEED_SHOW_BADGES_RATING,
		showTagsBadge: A.FEED_SHOW_BADGES_TAGS
	},
	sidebar: {
		position: "right",
		showPreviewThumb: !0,
		widthPx: 360
	},
	probeBackend: { mode: "auto" },
	i18n: { followComfyLanguage: !0 },
	metadataFallback: {
		image: !0,
		media: !0
	},
	paths: {
		outputDirectory: "",
		indexDirectory: ""
	},
	db: {
		timeoutMs: 5e3,
		maxConnections: 10,
		queryTimeoutMs: 1e3
	},
	ratingTagsSync: { enabled: !0 },
	cache: { tagsTTLms: 3e4 },
	search: { maxResults: A.SEARCH_DEFAULT_LIMIT },
	ai: {
		vectorSearchEnabled: !0,
		vectorCaptionOnIndex: !1,
		verboseAiLogs: !1
	},
	executionGrouping: { enabled: A.EXECUTION_GROUPING_ENABLED },
	workflowMinimap: {
		enabled: !1,
		nodeColors: !0,
		showLinks: !0,
		showGroups: !0,
		renderBypassState: !0,
		renderErrorState: !0,
		showViewport: !0,
		showNodeLabels: !1,
		size: "comfortable"
	},
	ui: {
		cardHoverColor: A.UI_CARD_HOVER_COLOR,
		cardSelectionColor: A.UI_CARD_SELECTION_COLOR,
		ratingColor: A.UI_RATING_COLOR,
		tagColor: A.UI_TAG_COLOR
	},
	security: {
		safeMode: !1,
		allowWrite: !0,
		allowRemoteWrite: !0,
		allowDelete: !0,
		allowRename: !0,
		allowOpenInFolder: !0,
		allowResetIndex: !0,
		apiToken: "",
		tokenConfigured: !1,
		tokenHint: ""
	}
}, q = () => {
	try {
		let e = Ce.get(d);
		if (!e) return { ...K };
		let t = JSON.parse(e), n = t && typeof t == "object" && Number.isInteger(t.version) && t.data && typeof t.data == "object";
		if (!n && !(t && typeof t == "object" && !Array.isArray(t))) return { ...K };
		if (n && Number(t.version) > 1) return console.warn("[Majoor] settings schema version is newer than this build, using defaults"), { ...K };
		let r = n ? t.data : t, i = new Set(/* @__PURE__ */ "debug.grid.infiniteScroll.siblings.autoScan.scan.watcher.status.viewer.rtHydrate.observability.feed.sidebar.probeBackend.i18n.paths.db.ratingTagsSync.cache.search.ai.executionGrouping.workflowMinimap.ui.security.safety".split(".")), a = {};
		if (r && typeof r == "object") for (let [e, t] of Object.entries(r)) i.has(e) && (a[e] = t);
		let o = pt(K, a);
		if (!n) try {
			J(o);
		} catch (e) {
			console.debug?.(e);
		}
		return o;
	} catch (e) {
		return console.warn("[Majoor] settings load failed, using defaults", e), { ...K };
	}
}, J = (e) => {
	try {
		let t = JSON.parse(JSON.stringify(e || {}));
		t?.security && typeof t.security == "object" && (t.security.apiToken = "");
		let n = {
			version: 1,
			data: t
		};
		if (!Ce.set("mjrSettings", JSON.stringify(n))) throw Error("SettingsStore rejected the write");
	} catch (e) {
		console.warn("[Majoor] settings save failed", e);
		try {
			let e = Date.now();
			e - (Number(window?._mjrSettingsSaveFailAt || 0) || 0) > 3e4 && (window._mjrSettingsSaveFailAt = e, bt(k("dialog.settingsSaveFailed", "Majoor: Failed to save settings (browser storage full or blocked).")));
		} catch (e) {
			console.debug?.(e);
		}
		try {
			ut("mjr-settings-save-failed", { error: String(e?.message || e || "") }, { warnPrefix: "[Majoor]" });
		} catch (e) {
			console.debug?.(e);
		}
	}
}, Y = (e) => {
	let t = Number(A.MAX_PAGE_SIZE) || 2e3;
	j.DEFAULT_PAGE_SIZE = Math.max(50, Math.min(t, Number(e.grid?.pageSize) || A.DEFAULT_PAGE_SIZE)), j.AUTO_SCAN_ON_STARTUP = !!e.autoScan?.onStartup, j.EXECUTION_GROUPING_ENABLED = !!(e.executionGrouping?.enabled ?? A.EXECUTION_GROUPING_ENABLED), j.STATUS_POLL_INTERVAL = Math.max(1e3, Number(e.status?.pollInterval) || A.STATUS_POLL_INTERVAL), j.DEBUG_SAFE_CALL = !!e.debug?.safeCall, j.DEBUG_SAFE_LISTENERS = !!e.debug?.safeListeners, j.DEBUG_VIEWER = !!e.debug?.viewer, j.GRID_MIN_SIZE = _t(e.grid), j.FEED_GRID_MIN_SIZE = vt(e.feed), j.GRID_GAP = Math.max(0, Math.min(40, Math.round(W(e.grid?.gap, A.GRID_GAP)))), j.GRID_SHOW_BADGES_EXTENSION = !!(e.grid?.showExtBadge ?? A.GRID_SHOW_BADGES_EXTENSION), j.GRID_SHOW_BADGES_RATING = !!(e.grid?.showRatingBadge ?? A.GRID_SHOW_BADGES_RATING), j.GRID_SHOW_BADGES_TAGS = !!(e.grid?.showTagsBadge ?? A.GRID_SHOW_BADGES_TAGS), j.GRID_SHOW_DETAILS = !!(e.grid?.showDetails ?? A.GRID_SHOW_DETAILS), j.GRID_SHOW_DETAILS_FILENAME = !!(e.grid?.showFilename ?? A.GRID_SHOW_DETAILS_FILENAME), j.GRID_SHOW_DETAILS_DATE = !!(e.grid?.showDate ?? A.GRID_SHOW_DETAILS_DATE), j.GRID_SHOW_DETAILS_DIMENSIONS = !!(e.grid?.showDimensions ?? A.GRID_SHOW_DETAILS_DIMENSIONS), j.GRID_SHOW_DETAILS_GENTIME = !!(e.grid?.showGenTime ?? A.GRID_SHOW_DETAILS_GENTIME), j.GRID_SHOW_HOVER_INFO = !!(e.grid?.showHoverInfo ?? A.GRID_SHOW_HOVER_INFO), j.GRID_SHOW_WORKFLOW_DOT = !!(e.grid?.showWorkflowDot ?? A.GRID_SHOW_WORKFLOW_DOT);
	{
		let t = String(e.grid?.workflowGroupBy ?? A.WORKFLOW_GRID_GROUP_BY).toLowerCase();
		j.WORKFLOW_GRID_GROUP_BY = [
			"none",
			"task",
			"model",
			"category"
		].includes(t) ? t : A.WORKFLOW_GRID_GROUP_BY;
	}
	j.FEED_SHOW_INFO = !!(e.feed?.showInfo ?? A.FEED_SHOW_INFO), j.FEED_SHOW_FILENAME = !!(e.feed?.showFilename ?? A.FEED_SHOW_FILENAME), j.FEED_SHOW_DIMENSIONS = !!(e.feed?.showDimensions ?? A.FEED_SHOW_DIMENSIONS), j.FEED_SHOW_DATE = !!(e.feed?.showDate ?? A.FEED_SHOW_DATE), j.FEED_SHOW_GENTIME = !!(e.feed?.showGenTime ?? A.FEED_SHOW_GENTIME), j.FEED_SHOW_WORKFLOW_DOT = !!(e.feed?.showWorkflowDot ?? A.FEED_SHOW_WORKFLOW_DOT), j.FEED_SHOW_BADGES_EXTENSION = !!(e.feed?.showExtBadge ?? A.FEED_SHOW_BADGES_EXTENSION), j.FEED_SHOW_BADGES_RATING = !!(e.feed?.showRatingBadge ?? A.FEED_SHOW_BADGES_RATING), j.FEED_SHOW_BADGES_TAGS = !!(e.feed?.showTagsBadge ?? A.FEED_SHOW_BADGES_TAGS);
	{
		let t = e.grid?.videoAutoplayMode ?? A.GRID_VIDEO_AUTOPLAY_MODE;
		t ??= e.grid?.videoHoverAutoplay === !1 ? "off" : "hover", t === !0 && (t = "hover"), t === !1 && (t = "off"), t !== "hover" && t !== "always" && t !== "off" && (t = "hover"), j.GRID_VIDEO_AUTOPLAY_MODE = t;
	}
	let n = (e, t) => {
		let n = String(e || "").trim();
		return /^[0-9a-fA-F]{6}$/.test(n) && (n = `#${n}`), /^#[0-9a-fA-F]{3,8}$/.test(n) ? n : t;
	};
	j.BADGE_STAR_COLOR = n(e.grid?.starColor, A.BADGE_STAR_COLOR), j.BADGE_IMAGE_COLOR = n(e.grid?.badgeImageColor, A.BADGE_IMAGE_COLOR), j.BADGE_VIDEO_COLOR = n(e.grid?.badgeVideoColor, A.BADGE_VIDEO_COLOR), j.BADGE_AUDIO_COLOR = n(e.grid?.badgeAudioColor, A.BADGE_AUDIO_COLOR), j.BADGE_MODEL3D_COLOR = n(e.grid?.badgeModel3dColor, A.BADGE_MODEL3D_COLOR), j.BADGE_DUPLICATE_ALERT_COLOR = n(e.grid?.badgeDuplicateAlertColor, A.BADGE_DUPLICATE_ALERT_COLOR), j.UI_CARD_HOVER_COLOR = n(e.ui?.cardHoverColor, A.UI_CARD_HOVER_COLOR), j.UI_CARD_SELECTION_COLOR = n(e.ui?.cardSelectionColor, A.UI_CARD_SELECTION_COLOR), j.UI_RATING_COLOR = n(e.ui?.ratingColor, A.UI_RATING_COLOR), j.UI_TAG_COLOR = n(e.ui?.tagColor, A.UI_TAG_COLOR);
	try {
		let e = Array.from(document.querySelectorAll(".mjr-assets-manager"));
		for (let t of e) t.style.setProperty("--mjr-star-active", j.BADGE_STAR_COLOR), t.style.setProperty("--mjr-badge-image", j.BADGE_IMAGE_COLOR), t.style.setProperty("--mjr-badge-video", j.BADGE_VIDEO_COLOR), t.style.setProperty("--mjr-badge-audio", j.BADGE_AUDIO_COLOR), t.style.setProperty("--mjr-badge-model3d", j.BADGE_MODEL3D_COLOR), t.style.setProperty("--mjr-badge-duplicate-alert", j.BADGE_DUPLICATE_ALERT_COLOR), t.style.setProperty("--mjr-card-hover-color", j.UI_CARD_HOVER_COLOR), t.style.setProperty("--mjr-card-selection-color", j.UI_CARD_SELECTION_COLOR), t.style.setProperty("--mjr-rating-color", j.UI_RATING_COLOR), t.style.setProperty("--mjr-tag-color", j.UI_TAG_COLOR);
	} catch (e) {
		console.debug?.(e);
	}
	j.INFINITE_SCROLL_ENABLED = !!e.infiniteScroll?.enabled, j.INFINITE_SCROLL_ROOT_MARGIN = String(e.infiniteScroll?.rootMargin || A.INFINITE_SCROLL_ROOT_MARGIN), j.INFINITE_SCROLL_THRESHOLD = Math.max(0, Math.min(1, W(e.infiniteScroll?.threshold, A.INFINITE_SCROLL_THRESHOLD))), j.BOTTOM_GAP_PX = Math.max(0, Math.min(5e3, Math.round(W(e.infiniteScroll?.bottomGapPx, A.BOTTOM_GAP_PX)))), j.VIEWER_ALLOW_PAN_AT_ZOOM_1 = !!e.viewer?.allowPanAtZoom1, j.VIEWER_DISABLE_WEBGL_VIDEO = !!e.viewer?.disableWebGL, j.VIEWER_PAUSE_DURING_EXECUTION = !!(e.viewer?.pauseDuringExecution ?? A.VIEWER_PAUSE_DURING_EXECUTION), j.FLOATING_VIEWER_PAUSE_DURING_EXECUTION = !!(e.viewer?.floatingPauseDuringExecution ?? A.FLOATING_VIEWER_PAUSE_DURING_EXECUTION), j.MFV_LIVE_DEFAULT = e.viewer?.mfvLiveDefault ?? A.MFV_LIVE_DEFAULT, j.MFV_PREVIEW_DEFAULT = e.viewer?.mfvPreviewDefault ?? A.MFV_PREVIEW_DEFAULT, j.MFV_LIVE_AUTO_OPEN = !1, j.MFV_PREVIEW_AUTO_OPEN = !1, j.MFV_NODE_STREAM_AUTO_OPEN = !1;
	{
		let t = String(e.viewer?.mfvPreviewMethod || A.MFV_PREVIEW_METHOD).toLowerCase();
		j.MFV_PREVIEW_METHOD = [
			"default",
			"auto",
			"latent2rgb",
			"taesd",
			"none"
		].includes(t) ? t : A.MFV_PREVIEW_METHOD;
	}
	{
		let t = String(e.viewer?.mfvSidebarPosition || "right").toLowerCase();
		j.MFV_SIDEBAR_POSITION = [
			"left",
			"right",
			"bottom"
		].includes(t) ? t : "right";
	}
	j.VIEWER_VIDEO_GRADE_THROTTLE_FPS = Math.max(1, Math.min(60, Math.round(W(e.viewer?.videoGradeThrottleFps, A.VIEWER_VIDEO_GRADE_THROTTLE_FPS)))), j.VIEWER_SCOPES_FPS = Math.max(1, Math.min(60, Math.round(W(e.viewer?.scopesFps, A.VIEWER_SCOPES_FPS)))), j.VIEWER_META_TTL_MS = Math.max(1e3, Math.min(10 * 6e4, Math.round(W(e.viewer?.metaTtlMs, A.VIEWER_META_TTL_MS)))), j.VIEWER_META_MAX_ENTRIES = Math.max(50, Math.min(5e3, Math.round(W(e.viewer?.metaMaxEntries, A.VIEWER_META_MAX_ENTRIES)))), j.WORKFLOW_MINIMAP_ENABLED = !!(e.workflowMinimap?.enabled ?? !1), j.RT_HYDRATE_CONCURRENCY = Math.max(1, Math.min(16, Math.round(W(e.rtHydrate?.concurrency, A.RT_HYDRATE_CONCURRENCY)))), j.RT_HYDRATE_QUEUE_MAX = Math.max(10, Math.min(5e3, Math.round(W(e.rtHydrate?.queueMax, A.RT_HYDRATE_QUEUE_MAX)))), j.RT_HYDRATE_SEEN_MAX = Math.max(1e3, Math.min(2e5, Math.round(W(e.rtHydrate?.seenMax, A.RT_HYDRATE_SEEN_MAX)))), j.RT_HYDRATE_PRUNE_BUDGET = Math.max(10, Math.min(1e4, Math.round(W(e.rtHydrate?.pruneBudget, A.RT_HYDRATE_PRUNE_BUDGET)))), j.RT_HYDRATE_SEEN_TTL_MS = Math.max(5e3, Math.min(360 * 6e4, Math.round(W(e.rtHydrate?.seenTtlMs, A.RT_HYDRATE_SEEN_TTL_MS)))), j.DELETE_CONFIRMATION = !!e.safety?.confirmDeletion, j.DEBUG_VERBOSE_ERRORS = !!e.observability?.verboseErrors, j.WATCHER_MAX_PENDING = Math.max(10, Math.min(5e3, Math.round(W(e.watcher?.maxPending, 500)))), j.WATCHER_MIN_SIZE = Math.max(0, Math.min(1e6, Math.round(W(e.watcher?.minSize, 100)))), j.WATCHER_MAX_SIZE = Math.max(1e5, Math.min(17179869184, Math.round(W(e.watcher?.maxSize, 4294967296)))), j.DB_TIMEOUT_MS = Math.max(1e3, Math.min(3e4, Math.round(W(e.db?.timeoutMs, 5e3)))), j.DB_MAX_CONNECTIONS = Math.max(1, Math.min(100, Math.round(W(e.db?.maxConnections, 10)))), j.DB_QUERY_TIMEOUT_MS = Math.max(500, Math.min(1e4, Math.round(W(e.db?.queryTimeoutMs, 1e3)))), j.SEARCH_REQUEST_LIMIT = Math.max(10, Math.min(A.MAX_PAGE_SIZE || 2e3, Math.round(W(e.search?.maxResults, A.SEARCH_DEFAULT_LIMIT))));
};
async function Rt() {
	try {
		let e = await v();
		if (!e?.ok) return;
		let t = e.data?.prefs;
		if (!t || typeof t != "object") return;
		let r = q();
		if (r.security = r.security || {}, r.security.safeMode = U(t.safe_mode, r.security.safeMode), r.security.allowWrite = U(t.allow_write, r.security.allowWrite), r.security.requireAuth = U(t.require_auth, r.security.requireAuth), r.security.allowRemoteWrite = U(t.allow_remote_write, r.security.allowRemoteWrite), r.security.allowInsecureTokenTransport = U(t.allow_insecure_token_transport, r.security.allowInsecureTokenTransport), r.security.allowDelete = U(t.allow_delete, r.security.allowDelete), r.security.allowRename = U(t.allow_rename, r.security.allowRename), r.security.allowOpenInFolder = U(t.allow_open_in_folder, r.security.allowOpenInFolder), r.security.allowResetIndex = U(t.allow_reset_index, r.security.allowResetIndex), r.security.tokenConfigured = U(t.token_configured, r.security.tokenConfigured), r.security.tokenHint = String(t.token_hint || "").trim(), !String(r.security.apiToken || "").trim()) try {
			let e = await n(), t = String(e?.data?.token || "").trim();
			e?.ok && t && (r.security.apiToken = t);
		} catch (e) {
			console.debug?.(e);
		}
		J(r), Y(r), ut("mjr-settings-changed", { key: "security" }, { warnPrefix: "[Majoor]" });
	} catch (e) {
		console.warn("[Majoor] failed to sync backend security settings", e);
	}
}
async function zt() {
	try {
		let e = await y();
		if (!e?.ok) return;
		let t = e.data?.prefs;
		if (!t || typeof t != "object") return;
		let n = q();
		n.ai = n.ai || {}, n.ai.vectorSearchEnabled = U(t.enabled, n.ai.vectorSearchEnabled ?? !0), n.ai.vectorCaptionOnIndex = U(t.caption_on_index ?? t.captionOnIndex, n.ai.vectorCaptionOnIndex ?? !1), J(n), Y(n), ut("mjr-settings-changed", { key: "ai.vectorSearch" }, { warnPrefix: "[Majoor]" });
	} catch (e) {
		console.warn("[Majoor] failed to sync backend vector search settings", e);
	}
}
async function Bt() {
	try {
		let e = await f();
		if (!e?.ok) return;
		let t = e.data?.prefs;
		if (!t || typeof t != "object") return;
		let n = q();
		n.executionGrouping = n.executionGrouping || {}, n.executionGrouping.enabled = U(t.enabled, n.executionGrouping.enabled ?? A.EXECUTION_GROUPING_ENABLED), J(n), Y(n), ut("mjr-settings-changed", { key: "executionGrouping.enabled" }, { warnPrefix: "[Majoor]" });
	} catch (e) {
		console.warn("[Majoor] failed to sync backend execution grouping settings", e);
	}
}
//#endregion
//#region ui/app/settings/settingsRuntime.ts
var Vt = "mjr-runtime-status-dashboard", Ht = "__mjr_write_token", Ut = 3e4;
function Wt() {
	try {
		let e = q(), t = String(e?.observability?.runtimeDashboardMode || K.observability.runtimeDashboardMode);
		return [
			"autoHide30",
			"always",
			"hidden"
		].includes(t) ? t : "autoHide30";
	} catch {
		return "autoHide30";
	}
}
function Gt() {
	try {
		document.getElementById(Vt)?.remove?.();
	} catch (e) {
		console.debug?.(e);
	}
}
function Kt() {
	try {
		window.__MJR_RUNTIME_STATUS_HIDE_TIMEOUT__ && (clearTimeout(window.__MJR_RUNTIME_STATUS_HIDE_TIMEOUT__), window.__MJR_RUNTIME_STATUS_HIDE_TIMEOUT__ = null);
	} catch (e) {
		console.debug?.(e);
	}
}
function qt() {
	try {
		return String(sessionStorage?.getItem?.(Ht) || "").trim();
	} catch {
		return "";
	}
}
function Jt(e, t) {
	let n = t === "auth" ? "__mjrAuthLine" : "__mjrMetricsLine";
	if (e?.[n]) return e[n];
	let r = document.createElement("div");
	return r.style.whiteSpace = "nowrap", r.style.lineHeight = "1.35", t === "auth" && (r.style.marginTop = "4px", r.style.fontWeight = "600"), e.appendChild(r), e[n] = r, r;
}
function Yt(e) {
	let t = qt(), n = String(e?.token_hint || "").trim() || (t ? `...${t.slice(-4)}` : ""), r = e?.allow_write !== !1, i = e?.require_auth === !0, a = e?.token_configured === !0;
	return r ? t ? {
		text: k("runtime.writeAuthActive", "Write auth: active {tokenHint}", { tokenHint: n || "(session)" }),
		color: "#7ee0a0"
	} : i && a ? {
		text: k("runtime.writeAuthMissing", "Write auth: missing in this browser {tokenHint}", { tokenHint: n || "(server token configured)" }),
		color: "#f1c36d"
	} : i ? {
		text: k("runtime.writeAuthRequired", "Write auth: required"),
		color: "#f1c36d"
	} : e && typeof e == "object" ? {
		text: k("runtime.writeAuthNotRequired", "Write auth: not required"),
		color: "#8fd0ff"
	} : {
		text: k("runtime.writeAuthUnknown", "Write auth: unknown"),
		color: "#c8ced8"
	} : {
		text: k("runtime.writeAuthBlocked", "Write auth: writes blocked by server"),
		color: "#ff9b9b"
	};
}
function Xt() {
	try {
		if (Wt() === "hidden" || window.__MJR_RUNTIME_STATUS_HIDDEN__) return Gt(), null;
		let e = document.querySelector(".mjr-assets-manager.mjr-am-container"), t = document.getElementById(Vt);
		if (!e) {
			try {
				t?.remove?.();
			} catch (e) {
				console.debug?.(e);
			}
			return null;
		}
		try {
			let t = String(getComputedStyle(e).position || "").toLowerCase();
			(!t || t === "static") && (e.style.position = "relative");
		} catch (e) {
			console.debug?.(e);
		}
		let n = document.getElementById(Vt);
		return n ? n.parentElement !== e && e.appendChild(n) : (n = document.createElement("div"), n.id = Vt, n.style.position = "absolute", n.style.bottom = "10px", n.style.right = "10px", n.style.zIndex = "9999", n.style.padding = "6px 10px", n.style.borderRadius = "10px", n.style.border = "1px solid rgba(255,255,255,0.16)", n.style.background = "rgba(0,0,0,0.45)", n.style.backdropFilter = "blur(4px)", n.style.color = "var(--content-fg, #fff)", n.style.fontSize = "11px", n.style.pointerEvents = "none", n.style.display = "flex", n.style.flexDirection = "column", e.appendChild(n)), n;
	} catch {
		return null;
	}
}
async function Zt() {
	let e = Xt();
	if (!e) return !1;
	let n = Jt(e, "metrics"), r = Jt(e, "auth");
	try {
		let [i, a] = await Promise.all([t(), v()]), o = k("runtime.unavailable", "Runtime: unavailable");
		if (!i?.ok || !i?.data) n.textContent = o;
		else {
			let e = i.data.db || {}, t = i.data.index || {}, r = i.data.watcher || {}, a = Number(e.active_connections || 0), s = Number(t.enrichment_queue_length || 0), c = Number(r.pending_files || 0);
			n.textContent = k("runtime.metricsLine", "DB active: {active} | Enrich Q: {enrichQ} | Watcher pending: {pending}", {
				active: a,
				enrichQ: s,
				pending: c
			}), o = k("runtime.metricsTitle", "Runtime Metrics\nDB active connections: {active}\nEnrichment queue: {enrichQ}\nWatcher pending files: {pending}", {
				active: a,
				enrichQ: s,
				pending: c
			});
		}
		let s = Yt(a?.data?.prefs || null);
		return r.textContent = s.text, r.style.color = s.color, e.title = `${o}\n${s.text}`, !0;
	} catch {
		return n.textContent = k("runtime.unavailable", "Runtime: unavailable"), r.textContent = k("runtime.writeAuthUnknown", "Write auth: unknown"), r.style.color = "#c8ced8", e.title = `${k("runtime.unavailable", "Runtime: unavailable")}\n${r.textContent}`, !0;
	}
}
function Qt() {
	try {
		let e = Wt();
		if (e === "hidden") {
			window.__MJR_RUNTIME_STATUS_HIDDEN__ = !0, Kt(), Gt();
			return;
		}
		window.__MJR_RUNTIME_STATUS_SETTINGS_LISTENER__ || (window.__MJR_RUNTIME_STATUS_SETTINGS_LISTENER__ = (e) => {
			if (e?.detail?.key !== "observability.runtimeDashboardMode") return;
			let t = Wt();
			window.__MJR_RUNTIME_STATUS_HIDDEN__ = t === "hidden", Kt(), Gt(), t !== "hidden" && Qt();
		}, window.addEventListener?.("mjr-settings-changed", window.__MJR_RUNTIME_STATUS_SETTINGS_LISTENER__)), window.__MJR_RUNTIME_STATUS_HIDDEN__ = !1, Kt(), e === "autoHide30" && (window.__MJR_RUNTIME_STATUS_HIDE_TIMEOUT__ = setTimeout(() => {
			window.__MJR_RUNTIME_STATUS_HIDDEN__ = !0, Gt();
		}, Ut)), Zt().catch(() => {}), window.__MJR_RUNTIME_STATUS_INFLIGHT__ ?? (window.__MJR_RUNTIME_STATUS_INFLIGHT__ = !1), window.__MJR_RUNTIME_STATUS_MISS_COUNT__ ?? (window.__MJR_RUNTIME_STATUS_MISS_COUNT__ = 0), window.__MJR_RUNTIME_STATUS_INTERVAL__ || (window.__MJR_RUNTIME_STATUS_INTERVAL__ = setInterval(() => {
			window.__MJR_RUNTIME_STATUS_INFLIGHT__ || (window.__MJR_RUNTIME_STATUS_INFLIGHT__ = !0, Zt().then((e) => {
				if (e) {
					window.__MJR_RUNTIME_STATUS_MISS_COUNT__ = 0;
					return;
				}
				window.__MJR_RUNTIME_STATUS_MISS_COUNT__ = Number(window.__MJR_RUNTIME_STATUS_MISS_COUNT__ || 0) + 1;
			}).catch(() => {}).finally(() => {
				window.__MJR_RUNTIME_STATUS_INFLIGHT__ = !1;
			}));
		}, 1e4));
	} catch (e) {
		console.debug?.(e);
	}
}
//#endregion
//#region ui/utils/debounce.ts
var $t = 300;
function en(e, t = $t) {
	let n, r = (...r) => {
		clearTimeout(n), n = setTimeout(() => e(...r), t);
	};
	return r.cancel = () => {
		clearTimeout(n);
	}, r.flush = (...t) => {
		clearTimeout(n), e(...t);
	}, r;
}
//#endregion
//#region ui/app/settings/settingsGrid.ts
var X = "Majoor", tn = "Majoor Assets Manager";
function nn(e, t, n) {
	let r = (e, t) => [
		tn,
		e,
		t
	], i = (e) => [
		tn,
		k("cat.cards", "Cards"),
		e
	], a = (e) => [
		tn,
		k("cat.badges", "Badges"),
		e
	], o = (e) => [
		tn,
		k("cat.badges", "Badges"),
		e
	], s = (e, t) => {
		let n = String(e || "").trim();
		return /^[0-9a-fA-F]{6}$/.test(n) && (n = `#${n}`), /^#[0-9a-fA-F]{6}$/.test(n) ? n.toUpperCase() : t;
	};
	t.grid?.minSizePreset || (t.grid = t.grid || {}, t.grid.minSizePreset = yt(t.grid.minSize), J(t)), e({
		id: `${X}.Cards.ThumbSize`,
		category: i(k("setting.grid.cardSize.group", "Card size")),
		name: k("setting.grid.cardSize.name", "Majoor: Card Size"),
		tooltip: k("setting.grid.cardSize.desc", "Choose the card size preset used by the grid layout."),
		type: "combo",
		defaultValue: (() => {
			let e = dt(String(t.grid?.minSizePreset || "").toLowerCase(), ht, yt(t.grid?.minSize)), n = {
				small: k("setting.grid.cardSize.small", "Small"),
				medium: k("setting.grid.cardSize.medium", "Medium"),
				large: k("setting.grid.cardSize.large", "Large")
			};
			return n[e] || n.medium;
		})(),
		options: [
			k("setting.grid.cardSize.small", "Small"),
			k("setting.grid.cardSize.medium", "Medium"),
			k("setting.grid.cardSize.large", "Large")
		],
		onChange: (e) => {
			let r = String(e || "").trim().toLowerCase(), i = k("setting.grid.cardSize.small", "Small").toLowerCase(), a = k("setting.grid.cardSize.medium", "Medium").toLowerCase(), o = k("setting.grid.cardSize.large", "Large").toLowerCase(), s = "medium";
			r === i || r === "small" || r === "petit" ? s = "small" : r === o || r === "large" || r === "grand" ? s = "large" : (r === a || r === "medium" || r === "moyen") && (s = "medium"), t.grid.minSizePreset = s, t.grid.minSize = mt[s], J(t), Y(t), n("grid.minSizePreset");
		}
	}), e({
		id: `${X}.Cards.CustomThumbSize`,
		category: i(k("setting.grid.cardSize.group", "Card size")),
		name: "Majoor: Custom Card Size (px)",
		tooltip: "Set the minimum card width used by the main grid layout (60-600 px).",
		type: "number",
		defaultValue: Math.max(60, Math.min(600, Number(t.grid?.minSize) || 120)),
		attrs: {
			min: 60,
			max: 600,
			step: 10
		},
		onChange: (e) => {
			let r = Math.max(60, Math.min(600, Math.round(Number(e) || 120)));
			t.grid.minSize = r, t.grid.minSizePreset = yt(r), J(t), Y(t), n("grid.minSize");
		}
	}), e({
		id: `${X}.Grid.ShowDetails`,
		category: i("Show card details"),
		name: "Show metadata panel",
		tooltip: "Show the bottom details panel on asset cards (filename, date, etc.)",
		type: "boolean",
		defaultValue: !!t.grid?.showDetails,
		onChange: (e) => {
			t.grid.showDetails = !!e, J(t), Y(t), n("grid.showDetails");
		}
	}), e({
		id: `${X}.Grid.ShowFilename`,
		category: i("Show filename"),
		name: "Show filename",
		tooltip: "Display filename in details panel",
		type: "boolean",
		defaultValue: !!t.grid?.showFilename,
		onChange: (e) => {
			t.grid.showFilename = !!e, J(t), Y(t), n("grid.showFilename");
		}
	}), e({
		id: `${X}.Grid.ShowDate`,
		category: i("Show date/time"),
		name: "Show date/time",
		tooltip: "Display date and time in details panel",
		type: "boolean",
		defaultValue: !!t.grid?.showDate,
		onChange: (e) => {
			t.grid.showDate = !!e, J(t), Y(t), n("grid.showDate");
		}
	}), e({
		id: `${X}.Grid.ShowDimensions`,
		category: i("Show dimensions"),
		name: "Show dimensions",
		tooltip: "Display resolution (WxH) in details panel",
		type: "boolean",
		defaultValue: !!t.grid?.showDimensions,
		onChange: (e) => {
			t.grid.showDimensions = !!e, J(t), Y(t), n("grid.showDimensions");
		}
	}), e({
		id: `${X}.Grid.ShowGenTime`,
		category: i("Show generation time"),
		name: "Show generation time",
		tooltip: "Display seconds taken to generate the asset (if available)",
		type: "boolean",
		defaultValue: !!(t.grid?.showGenTime ?? A.GRID_SHOW_DETAILS_GENTIME),
		onChange: (e) => {
			t.grid.showGenTime = !!e, J(t), Y(t), n("grid.showGenTime");
		}
	}), e({
		id: `${X}.Grid.ShowHoverInfo`,
		category: i("Show prompt on hover"),
		name: "Show prompt on hover",
		tooltip: "Show positive prompt and generation time as a tooltip overlay when hovering over a card thumbnail. Does not block video play-on-hover.",
		type: "boolean",
		defaultValue: !!(t.grid?.showHoverInfo ?? A.GRID_SHOW_HOVER_INFO),
		onChange: (e) => {
			t.grid.showHoverInfo = !!e, J(t), Y(t), n("grid.showHoverInfo");
		}
	}), e({
		id: `${X}.Grid.ShowWorkflowDot`,
		category: i("Show workflow dot"),
		name: "Show workflow indicator",
		tooltip: "Display the green dot indicating workflow metadata availability (bottom right of card)",
		type: "boolean",
		defaultValue: !!t.grid?.showWorkflowDot,
		onChange: (e) => {
			t.grid.showWorkflowDot = !!e, J(t), Y(t), n("grid.showWorkflowDot");
		}
	}), e({
		id: `${X}.Grid.ShowExtBadge`,
		category: a("Show format badges"),
		name: "Show format badges",
		tooltip: "Display format badges (e.g. JPG, MP4) on thumbnails",
		type: "boolean",
		defaultValue: !!t.grid?.showExtBadge,
		onChange: (e) => {
			t.grid.showExtBadge = !!e, J(t), Y(t), n("grid.showExtBadge");
		}
	}), e({
		id: `${X}.Grid.ShowRatingBadge`,
		category: a("Show rating badges"),
		name: "Show ratings",
		tooltip: "Display star ratings on thumbnails",
		type: "boolean",
		defaultValue: !!t.grid?.showRatingBadge,
		onChange: (e) => {
			t.grid.showRatingBadge = !!e, J(t), Y(t), n("grid.showRatingBadge");
		}
	}), e({
		id: `${X}.Grid.ShowTagsBadge`,
		category: a("Show tags badges"),
		name: "Show tags",
		tooltip: "Display a small indicator if an asset has tags",
		type: "boolean",
		defaultValue: !!t.grid?.showTagsBadge,
		onChange: (e) => {
			t.grid.showTagsBadge = !!e, J(t), Y(t), n("grid.showTagsBadge");
		}
	}), e({
		id: `${X}.Badges.StarColor`,
		category: o(k("setting.starColor", "Star color")),
		name: k("setting.starColor", "Majoor: Star color"),
		tooltip: k("setting.starColor.tooltip", "Color of rating stars on thumbnails (hex, e.g. #FFD45A)"),
		type: "color",
		defaultValue: s(t.grid?.starColor, A.BADGE_STAR_COLOR),
		onChange: (e) => {
			t.grid.starColor = s(e, A.BADGE_STAR_COLOR), J(t), Y(t), n("grid.starColor");
		}
	}), e({
		id: `${X}.Badges.ImageColor`,
		category: o(k("setting.badgeImageColor", "Image badge color")),
		name: k("setting.badgeImageColor", "Majoor: Image badge color"),
		tooltip: k("setting.badgeImageColor.tooltip", "Color for image badges: PNG, JPG, WEBP, GIF, BMP, TIF (hex)"),
		type: "color",
		defaultValue: s(t.grid?.badgeImageColor, A.BADGE_IMAGE_COLOR),
		onChange: (e) => {
			t.grid.badgeImageColor = s(e, A.BADGE_IMAGE_COLOR), J(t), Y(t), n("grid.badgeImageColor");
		}
	}), e({
		id: `${X}.Badges.VideoColor`,
		category: o(k("setting.badgeVideoColor", "Video badge color")),
		name: k("setting.badgeVideoColor", "Majoor: Video badge color"),
		tooltip: k("setting.badgeVideoColor.tooltip", "Color for video badges: MP4, WEBM, MOV, AVI, MKV (hex)"),
		type: "color",
		defaultValue: s(t.grid?.badgeVideoColor, A.BADGE_VIDEO_COLOR),
		onChange: (e) => {
			t.grid.badgeVideoColor = s(e, A.BADGE_VIDEO_COLOR), J(t), Y(t), n("grid.badgeVideoColor");
		}
	}), e({
		id: `${X}.Badges.AudioColor`,
		category: o(k("setting.badgeAudioColor", "Audio badge color")),
		name: k("setting.badgeAudioColor", "Majoor: Audio badge color"),
		tooltip: k("setting.badgeAudioColor.tooltip", "Color for audio badges: MP3, WAV, OGG, FLAC (hex)"),
		type: "color",
		defaultValue: s(t.grid?.badgeAudioColor, A.BADGE_AUDIO_COLOR),
		onChange: (e) => {
			t.grid.badgeAudioColor = s(e, A.BADGE_AUDIO_COLOR), J(t), Y(t), n("grid.badgeAudioColor");
		}
	}), e({
		id: `${X}.Badges.Model3dColor`,
		category: o(k("setting.badgeModel3dColor", "3D model badge color")),
		name: k("setting.badgeModel3dColor", "Majoor: 3D model badge color"),
		tooltip: k("setting.badgeModel3dColor.tooltip", "Color for 3D model badges: OBJ, FBX, GLB, GLTF (hex)"),
		type: "color",
		defaultValue: s(t.grid?.badgeModel3dColor, A.BADGE_MODEL3D_COLOR),
		onChange: (e) => {
			t.grid.badgeModel3dColor = s(e, A.BADGE_MODEL3D_COLOR), J(t), Y(t), n("grid.badgeModel3dColor");
		}
	}), e({
		id: `${X}.Badges.DuplicateAlertColor`,
		category: o(k("setting.badgeDuplicateAlertColor", "Duplicate alert badge color")),
		name: k("setting.badgeDuplicateAlertColor", "Majoor: Duplicate alert badge color"),
		tooltip: k("setting.badgeDuplicateAlertColor.tooltip", "Color for duplicate extension badges (PNG+, JPG+, etc)."),
		type: "color",
		defaultValue: s(t.grid?.badgeDuplicateAlertColor, A.BADGE_DUPLICATE_ALERT_COLOR),
		onChange: (e) => {
			t.grid.badgeDuplicateAlertColor = s(e, A.BADGE_DUPLICATE_ALERT_COLOR), J(t), Y(t), n("grid.badgeDuplicateAlertColor");
		}
	}), e({
		id: `${X}.Grid.PageSize`,
		category: r(k("cat.grid"), k("setting.grid.pagesize.name").replace("Majoor: ", "")),
		name: k("setting.grid.pagesize.name"),
		tooltip: k("setting.grid.pagesize.desc"),
		type: "number",
		defaultValue: t.grid.pageSize,
		attrs: {
			min: 50,
			max: Number(j.MAX_PAGE_SIZE) || 2e3,
			step: 50
		},
		onChange: (e) => {
			let r = Number(j.MAX_PAGE_SIZE) || 2e3;
			t.grid.pageSize = Math.max(50, Math.min(r, Number(e) || A.DEFAULT_PAGE_SIZE)), J(t), Y(t), n("grid.pageSize");
		}
	}), e({
		id: `${X}.Grid.WorkflowGroupBy`,
		category: r(k("cat.grid"), "Workflow grouping"),
		name: "Workflow grid grouping",
		tooltip: "In Workflow scope, insert titled separators and group cards by Task, Model, or Category.",
		type: "combo",
		defaultValue: (() => {
			let e = String(t.grid?.workflowGroupBy || A.WORKFLOW_GRID_GROUP_BY).trim().toLowerCase(), n = {
				none: "None",
				task: "Task",
				model: "Model",
				category: "Category"
			};
			return n[e] || n.none;
		})(),
		options: [
			"None",
			"Task",
			"Model",
			"Category"
		],
		onChange: (e) => {
			let r = {
				None: "none",
				Task: "task",
				Model: "model",
				Category: "category"
			}[String(e || "")] || "none";
			t.grid = t.grid || {}, t.grid.workflowGroupBy = r, J(t), Y(t), n("grid.workflowGroupBy");
		}
	}), e({
		id: `${X}.InfiniteScroll.Enabled`,
		category: r(k("cat.grid"), k("setting.nav.infinite.name").replace("Majoor: ", "")),
		name: k("setting.nav.infinite.name"),
		tooltip: k("setting.nav.infinite.desc"),
		type: "boolean",
		defaultValue: !!t.infiniteScroll?.enabled,
		onChange: (e) => {
			t.infiniteScroll = t.infiniteScroll || {}, t.infiniteScroll.enabled = !!e, J(t), Y(t), n("infiniteScroll.enabled");
		}
	}), e({
		id: `${X}.Sidebar.Position`,
		category: r(k("cat.grid"), k("setting.sidebar.pos.name").replace("Majoor: ", "")),
		name: k("setting.sidebar.pos.name"),
		tooltip: k("setting.sidebar.pos.desc"),
		type: "combo",
		defaultValue: t.sidebar?.position || "right",
		options: ["left", "right"],
		onChange: (e) => {
			t.sidebar = t.sidebar || {}, t.sidebar.position = e === "left" ? "left" : "right", J(t), n("sidebar.position");
		}
	}), e({
		id: `${X}.Sidebar.ShowPreviewThumb`,
		category: r(k("cat.grid"), "Sidebar preview"),
		name: "Show sidebar preview thumb",
		tooltip: "Show/hide the large media preview at the top of the sidebar metadata panel.",
		type: "boolean",
		defaultValue: !!(t.sidebar?.showPreviewThumb ?? !0),
		onChange: (e) => {
			t.sidebar = t.sidebar || {}, t.sidebar.showPreviewThumb = !!e, J(t), n("sidebar.showPreviewThumb");
		}
	}), e({
		id: `${X}.Sidebar.WidthPx`,
		category: r(k("cat.grid"), "Sidebar width"),
		name: "Sidebar width (px)",
		tooltip: "Set the details sidebar width in pixels (240-640).",
		type: "number",
		defaultValue: Math.max(240, Math.min(640, Number(t.sidebar?.widthPx) || 360)),
		attrs: {
			min: 240,
			max: 640,
			step: 10
		},
		onChange: (e) => {
			t.sidebar = t.sidebar || {}, t.sidebar.widthPx = Math.max(240, Math.min(640, Math.round(Number(e) || 360))), J(t), n("sidebar.widthPx");
		}
	}), e({
		id: `${X}.General.HideSiblings`,
		category: r(k("cat.grid"), k("setting.siblings.hide.name").replace("Majoor: ", "")),
		name: k("setting.siblings.hide.name"),
		tooltip: k("setting.siblings.hide.desc"),
		type: "boolean",
		defaultValue: !!t.siblings?.hidePngSiblings,
		onChange: (e) => {
			t.siblings = t.siblings || {}, t.siblings.hidePngSiblings = !!e, J(t), n("siblings.hidePngSiblings");
		}
	}), e({
		id: `${X}.Grid.VideoAutoplayMode`,
		category: r(k("cat.grid"), k("setting.grid.videoAutoplayMode.name", "Video autoplay").replace("Majoor: ", "")),
		name: k("setting.grid.videoAutoplayMode.name", "Majoor: Video autoplay"),
		tooltip: k("setting.grid.videoAutoplayMode.desc", "Controls video thumbnail playback in the grid. Off: static frame. Hover: play on mouse hover. Always: loop while visible."),
		type: "combo",
		defaultValue: (() => {
			let e = t.grid?.videoAutoplayMode;
			e ??= t.grid?.videoHoverAutoplay === !1 ? "off" : "hover", e === !0 && (e = "hover"), e === !1 && (e = "off"), e !== "hover" && e !== "always" && e !== "off" && (e = "hover");
			let n = {
				off: k("setting.grid.videoAutoplayMode.off", "Off"),
				hover: k("setting.grid.videoAutoplayMode.hover", "Hover"),
				always: k("setting.grid.videoAutoplayMode.always", "Always")
			};
			return n[e] || n.off;
		})(),
		options: [
			k("setting.grid.videoAutoplayMode.off", "Off"),
			k("setting.grid.videoAutoplayMode.hover", "Hover"),
			k("setting.grid.videoAutoplayMode.always", "Always")
		],
		onChange: (e) => {
			let r = {
				[k("setting.grid.videoAutoplayMode.off", "Off")]: "off",
				[k("setting.grid.videoAutoplayMode.hover", "Hover")]: "hover",
				[k("setting.grid.videoAutoplayMode.always", "Always")]: "always"
			}[e] || "off";
			t.grid = t.grid || {}, t.grid.videoAutoplayMode = r, delete t.grid.videoHoverAutoplay, J(t), Y(t), n("grid.videoAutoplayMode");
		}
	}), e({
		id: `${X}.Cards.HoverColor`,
		category: i("Hover color"),
		name: "Majoor: Card hover color",
		tooltip: "Background tint used when hovering a card (hex, e.g. #3D3D3D).",
		type: "color",
		defaultValue: s(t.ui?.cardHoverColor, A.UI_CARD_HOVER_COLOR),
		onChange: (e) => {
			t.ui = t.ui || {}, t.ui.cardHoverColor = s(e, A.UI_CARD_HOVER_COLOR), J(t), Y(t), n("ui.cardHoverColor");
		}
	}), e({
		id: `${X}.Cards.SelectionColor`,
		category: i("Selection color"),
		name: "Majoor: Card selection color",
		tooltip: "Outline/accent color used for selected cards (hex, e.g. #4A90E2).",
		type: "color",
		defaultValue: s(t.ui?.cardSelectionColor, A.UI_CARD_SELECTION_COLOR),
		onChange: (e) => {
			t.ui = t.ui || {}, t.ui.cardSelectionColor = s(e, A.UI_CARD_SELECTION_COLOR), J(t), Y(t), n("ui.cardSelectionColor");
		}
	}), e({
		id: `${X}.Badges.RatingColor`,
		category: a("Rating color"),
		name: "Majoor: Rating badge color",
		tooltip: "Color used for rating badge text/accent (hex, e.g. #FF9500).",
		type: "color",
		defaultValue: s(t.ui?.ratingColor, A.UI_RATING_COLOR),
		onChange: (e) => {
			t.ui = t.ui || {}, t.ui.ratingColor = s(e, A.UI_RATING_COLOR), J(t), Y(t), n("ui.ratingColor");
		}
	}), e({
		id: `${X}.Badges.TagColor`,
		category: a("Tag color"),
		name: "Majoor: Tags badge color",
		tooltip: "Color used for tags badge text/accent (hex, e.g. #4A90E2).",
		type: "color",
		defaultValue: s(t.ui?.tagColor, A.UI_TAG_COLOR),
		onChange: (e) => {
			t.ui = t.ui || {}, t.ui.tagColor = s(e, A.UI_TAG_COLOR), J(t), Y(t), n("ui.tagColor");
		}
	});
}
//#endregion
//#region ui/app/settings/settingsViewer.ts
var rn = "Majoor", an = "Majoor Assets Manager";
function on(e, t, n) {
	let r = (e, t) => [
		an,
		e,
		t
	], i = (e) => r(k("cat.viewer", "Viewer"), e), a = (e) => r(k("cat.floatingViewer", "Floating Viewer"), e);
	e({
		id: `${rn}.Viewer.AllowPanAtZoom1`,
		category: i(k("setting.viewer.pan.name").replace("Majoor: ", "")),
		name: k("setting.viewer.pan.name"),
		tooltip: k("setting.viewer.pan.desc"),
		type: "boolean",
		defaultValue: !!t.viewer?.allowPanAtZoom1,
		onChange: (e) => {
			t.viewer = t.viewer || {}, t.viewer.allowPanAtZoom1 = !!e, J(t), Y(t), n("viewer.allowPanAtZoom1");
		}
	}), e({
		id: `${rn}.Viewer.DisableWebGL`,
		category: i("Disable WebGL Video"),
		name: "Disable WebGL Video",
		tooltip: "Use CPU rendering (Canvas 2D) for video playback. Fixes 'black screen' issues on incompatible hardware/browsers.",
		type: "boolean",
		defaultValue: !!t.viewer?.disableWebGL,
		onChange: (e) => {
			t.viewer = t.viewer || {}, t.viewer.disableWebGL = !!e, J(t), Y(t), n("viewer.disableWebGL");
		}
	}), e({
		id: `${rn}.Viewer.PauseDuringExecution`,
		category: i(k("setting.viewer.pauseExecution.name").replace("Majoor: ", "")),
		name: k("setting.viewer.pauseExecution.name"),
		tooltip: k("setting.viewer.pauseExecution.desc"),
		type: "boolean",
		defaultValue: !!t.viewer?.pauseDuringExecution,
		onChange: (e) => {
			t.viewer = t.viewer || {}, t.viewer.pauseDuringExecution = !!e, J(t), Y(t), n("viewer.pauseDuringExecution");
		}
	}), e({
		id: `${rn}.Viewer.FloatingPauseDuringExecution`,
		category: a(k("setting.viewer.floatingPauseExecution.name").replace("Majoor: ", "")),
		name: k("setting.viewer.floatingPauseExecution.name"),
		tooltip: k("setting.viewer.floatingPauseExecution.desc"),
		type: "boolean",
		defaultValue: !!t.viewer?.floatingPauseDuringExecution,
		onChange: (e) => {
			t.viewer = t.viewer || {}, t.viewer.floatingPauseDuringExecution = !!e, J(t), Y(t), n("viewer.floatingPauseDuringExecution");
		}
	}), e({
		id: `${rn}.Viewer.MfvLiveDefault`,
		category: a(k("setting.viewer.mfvLiveDefault.name").replace("Majoor: ", "")),
		name: k("setting.viewer.mfvLiveDefault.name"),
		tooltip: k("setting.viewer.mfvLiveDefault.desc"),
		type: "boolean",
		defaultValue: !!(t.viewer?.mfvLiveDefault ?? A.MFV_LIVE_DEFAULT),
		onChange: (e) => {
			t.viewer = t.viewer || {}, t.viewer.mfvLiveDefault = !!e, J(t), Y(t), n("viewer.mfvLiveDefault");
		}
	}), e({
		id: `${rn}.Viewer.MfvPreviewDefault`,
		category: a(k("setting.viewer.mfvPreviewDefault.name").replace("Majoor: ", "")),
		name: k("setting.viewer.mfvPreviewDefault.name"),
		tooltip: k("setting.viewer.mfvPreviewDefault.desc"),
		type: "boolean",
		defaultValue: !!(t.viewer?.mfvPreviewDefault ?? A.MFV_PREVIEW_DEFAULT),
		onChange: (e) => {
			t.viewer = t.viewer || {}, t.viewer.mfvPreviewDefault = !!e, J(t), Y(t), n("viewer.mfvPreviewDefault");
		}
	}), e({
		id: `${rn}.Viewer.MfvSidebarPosition`,
		category: a("Node Parameters sidebar position"),
		name: "Node Parameters sidebar position",
		tooltip: "Position of the Node Parameters sidebar in the Floating Viewer (right, left, or bottom).",
		type: "combo",
		defaultValue: t.viewer?.mfvSidebarPosition || "right",
		options: [
			"right",
			"left",
			"bottom"
		],
		onChange: (e) => {
			let r = [
				"left",
				"right",
				"bottom"
			].includes(e) ? e : "right";
			t.viewer = t.viewer || {}, t.viewer.mfvSidebarPosition = r, J(t), Y(t), n("viewer.mfvSidebarPosition");
		}
	}), e({
		id: `${rn}.Viewer.MfvPreviewMethod`,
		category: a(k("setting.viewer.mfvPreviewMethod.name").replace("Majoor: ", "")),
		name: k("setting.viewer.mfvPreviewMethod.name"),
		tooltip: k("setting.viewer.mfvPreviewMethod.desc"),
		type: "combo",
		defaultValue: t.viewer?.mfvPreviewMethod || A.MFV_PREVIEW_METHOD,
		options: [
			"taesd",
			"latent2rgb",
			"auto",
			"default",
			"none"
		],
		onChange: (e) => {
			let r = [
				"taesd",
				"latent2rgb",
				"auto",
				"default",
				"none"
			].includes(e) ? e : A.MFV_PREVIEW_METHOD;
			t.viewer = t.viewer || {}, t.viewer.mfvPreviewMethod = r, J(t), Y(t), n("viewer.mfvPreviewMethod");
		}
	}), e({
		id: `${rn}.Viewer.LtxavRgbFallback`,
		category: a("LTXAV preview fallback"),
		name: "Majoor: LTXAV RGB Preview Fallback (experimental)",
		tooltip: "Reuse LTXV RGB projection for LTXAV when native latent preview is unavailable. Experimental; quality may be approximate.",
		type: "boolean",
		defaultValue: !!t.viewer?.ltxavRgbFallback,
		onChange: async (e) => {
			let r = !!e, i = !!t.viewer?.ltxavRgbFallback;
			t.viewer = t.viewer || {}, t.viewer.ltxavRgbFallback = r, J(t), Y(t), n("viewer.ltxavRgbFallback");
			try {
				let e = await oe(r);
				if (!e?.ok) throw Error(e?.error || "Failed to update LTXAV RGB preview fallback setting");
			} catch (e) {
				t.viewer.ltxavRgbFallback = i, J(t), Y(t), n("viewer.ltxavRgbFallback"), p(e?.message || "Failed to update LTXAV RGB preview fallback setting", "error");
			}
		}
	});
	try {
		s().then((e) => {
			if (!e?.ok) return;
			let r = !!e?.data?.prefs?.enabled, i = q();
			i.viewer = i.viewer || {}, !!i.viewer.ltxavRgbFallback !== r && (i.viewer.ltxavRgbFallback = r, Object.assign(t, i), J(i), Y(i), n("viewer.ltxavRgbFallback"));
		}).catch(() => {});
	} catch (e) {
		console.debug?.(e);
	}
	((r, a, o, s) => {
		e({
			id: `${rn}.WorkflowMinimap.${r}`,
			category: i(k(o).replace("Majoor: ", "")),
			name: k(o),
			tooltip: k(s),
			type: "boolean",
			defaultValue: !!t.workflowMinimap?.[a],
			onChange: (e) => {
				t.workflowMinimap = t.workflowMinimap || {}, t.workflowMinimap[a] = !!e, J(t), n(`workflowMinimap.${a}`);
			}
		});
	})("Enabled", "enabled", "setting.minimap.enabled.name", "setting.minimap.enabled.desc");
}
//#endregion
//#region ui/app/settings/settingsScanning.ts
var sn = "Majoor", cn = "Majoor Assets Manager";
function ln(e, t, n) {
	let r = (e, t) => [
		cn,
		e,
		t
	];
	e({
		id: `${sn}.ExecutionGrouping.Enabled`,
		category: r(k("cat.scanning"), "Execution grouping"),
		name: "Execution job/stack grouping",
		tooltip: "Enable or disable all live job_id / stack_id tracking, grouping, and stack finalization logic.",
		type: "boolean",
		defaultValue: !!(t.executionGrouping?.enabled ?? A.EXECUTION_GROUPING_ENABLED),
		onChange: async (e) => {
			let r = !!(t.executionGrouping?.enabled ?? A.EXECUTION_GROUPING_ENABLED), i = !!e;
			t.executionGrouping = t.executionGrouping || {}, t.executionGrouping.enabled = i, J(t), Y(t), n("executionGrouping.enabled");
			try {
				let e = await T(i);
				if (!e?.ok) throw Error(e?.error || "Failed to update execution grouping setting");
				t.executionGrouping.enabled = !!e?.data?.prefs?.enabled, J(t), Y(t), n("executionGrouping.enabled");
			} catch (e) {
				t.executionGrouping.enabled = r, J(t), Y(t), n("executionGrouping.enabled"), p(e?.message || "Failed to update execution grouping setting", "error");
			}
		}
	}), e({
		id: `${sn}.AutoScan.OnStartup`,
		category: r(k("cat.scanning"), k("setting.scan.startup.name").replace("Majoor: ", "")),
		name: k("setting.scan.startup.name"),
		tooltip: k("setting.scan.startup.desc"),
		type: "boolean",
		defaultValue: !!t.autoScan?.onStartup,
		onChange: (e) => {
			t.autoScan = t.autoScan || {}, t.autoScan.onStartup = !!e, J(t), Y(t), n("autoScan.onStartup");
		}
	}), e({
		id: `${sn}.Scan.FastMode`,
		category: r(k("cat.scanning"), "Scan mode"),
		name: "Fast scan mode",
		tooltip: "Use fast scan mode for manual backfill scans (skip heavier metadata work during scan).",
		type: "boolean",
		defaultValue: !!(t.scan?.fastMode ?? !0),
		onChange: (e) => {
			t.scan = t.scan || {}, t.scan.fastMode = !!e, J(t), n("scan.fastMode");
		}
	}), e({
		id: `${sn}.RtHydrate.Concurrency`,
		category: r(k("cat.scanning"), "Hydration"),
		name: "Hydrate Concurrency",
		tooltip: "Maximum concurrent hydration requests for rating/tags.",
		type: "number",
		defaultValue: Number(t.rtHydrate?.concurrency || A.RT_HYDRATE_CONCURRENCY || 5),
		attrs: {
			min: 1,
			max: 20,
			step: 1
		},
		onChange: (e) => {
			t.rtHydrate = t.rtHydrate || {}, t.rtHydrate.concurrency = Math.max(1, Math.min(20, Math.round(W(e, A.RT_HYDRATE_CONCURRENCY || 5)))), J(t), Y(t), n("rtHydrate.concurrency");
		}
	});
	let i = (e, t, n, r) => {
		let i = Math.round(W(e, t));
		return Math.max(n, Math.min(r, i));
	}, o = (e = {}) => {
		let r = [];
		if (t.watcher = t.watcher || {}, typeof e.debounce_ms == "number") {
			let n = Math.max(50, Math.min(5e3, Math.round(e.debounce_ms)));
			t.watcher.debounceMs !== n && (t.watcher.debounceMs = n, r.push("watcher.debounceMs"));
		}
		if (typeof e.dedupe_ttl_ms == "number") {
			let n = Math.max(100, Math.min(3e4, Math.round(e.dedupe_ttl_ms)));
			t.watcher.dedupeTtlMs !== n && (t.watcher.dedupeTtlMs = n, r.push("watcher.dedupeTtlMs"));
		}
		r.length && (J(t), r.forEach((e) => n(e)));
	}, s = async () => {
		try {
			let e = await a();
			if (!e?.ok) return;
			o(e.data || {});
		} catch (e) {
			console.debug?.(e);
		}
	};
	e({
		id: `${sn}.Watcher.Enabled`,
		category: r(k("cat.scanning"), k("setting.watcher.enabled.label", "Enable watcher")),
		name: k("setting.watcher.name"),
		tooltip: k("setting.watcher.desc") + " (env: MJR_ENABLE_WATCHER)",
		type: "boolean",
		defaultValue: !!t.watcher?.enabled,
		onChange: async (e) => {
			t.watcher = t.watcher || {}, t.watcher.enabled = !!e, J(t), n("watcher.enabled");
			try {
				let r = await b(!!e);
				r?.ok || (t.watcher.enabled = !e, J(t), n("watcher.enabled"), p(r?.error || k("toast.failedToggleWatcher", "Failed to toggle watcher"), "error"));
			} catch {
				t.watcher.enabled = !e, J(t), n("watcher.enabled");
			}
		}
	}), e({
		id: `${sn}.Watcher.DebounceDelay`,
		category: r(k("cat.scanning"), k("setting.watcher.debounce.label", "Watcher debounce delay")),
		name: k("setting.watcher.debounce.name"),
		tooltip: k("setting.watcher.debounce.desc") + " (env: MJR_WATCHER_DEBOUNCE_MS)",
		type: "number",
		defaultValue: t.watcher?.debounceMs ?? A.WATCHER_DEBOUNCE_MS,
		attrs: {
			min: 50,
			max: 6e4,
			step: 50
		},
		onChange: async (e) => {
			let r = A.WATCHER_DEBOUNCE_MS, a = i(e, r, 50, 6e4), o = t.watcher?.debounceMs ?? r;
			if (a !== o) {
				t.watcher = t.watcher || {}, t.watcher.debounceMs = a, J(t);
				try {
					let e = await D({ debounce_ms: a });
					if (!e?.ok) throw Error(e?.error || k("setting.watcher.debounce.error"));
					let r = Math.round(Number(e?.data?.debounce_ms ?? a));
					t.watcher.debounceMs = r, J(t), n("watcher.debounceMs");
				} catch (e) {
					t.watcher.debounceMs = o, J(t), n("watcher.debounceMs"), p(e?.message || k("setting.watcher.debounce.error"), "error");
				}
			}
		}
	}), e({
		id: `${sn}.Watcher.DedupeWindow`,
		category: r(k("cat.scanning"), k("setting.watcher.dedupe.label", "Watcher dedupe window")),
		name: k("setting.watcher.dedupe.name"),
		tooltip: k("setting.watcher.dedupe.desc") + " (env: MJR_WATCHER_DEDUPE_TTL_MS)",
		type: "number",
		defaultValue: t.watcher?.dedupeTtlMs ?? A.WATCHER_DEDUPE_TTL_MS,
		attrs: {
			min: 100,
			max: 12e4,
			step: 100
		},
		onChange: async (e) => {
			let r = A.WATCHER_DEDUPE_TTL_MS, a = i(e, r, 100, 12e4), o = t.watcher?.dedupeTtlMs ?? r;
			if (a !== o) {
				t.watcher = t.watcher || {}, t.watcher.dedupeTtlMs = a, J(t);
				try {
					let e = await D({ dedupe_ttl_ms: a });
					if (!e?.ok) throw Error(e?.error || k("setting.watcher.dedupe.error"));
					let r = Math.round(Number(e?.data?.dedupe_ttl_ms ?? a));
					t.watcher.dedupeTtlMs = r, J(t), n("watcher.dedupeTtlMs");
				} catch (e) {
					t.watcher.dedupeTtlMs = o, J(t), n("watcher.dedupeTtlMs"), p(e?.message || k("setting.watcher.dedupe.error"), "error");
				}
			}
		}
	}), e({
		id: `${sn}.Watcher.MaxPending`,
		category: r(k("cat.scanning"), "Watcher queue"),
		name: "Watcher: max pending files",
		tooltip: "Maximum number of pending watcher files kept in memory.",
		type: "number",
		defaultValue: Number(t.watcher?.maxPending ?? 500),
		attrs: {
			min: 10,
			max: 5e3,
			step: 10
		},
		onChange: (e) => {
			t.watcher = t.watcher || {}, t.watcher.maxPending = Math.max(10, Math.min(5e3, Math.round(W(e, 500)))), J(t), Y(t), n("watcher.maxPending");
		}
	}), e({
		id: `${sn}.Watcher.MinSize`,
		category: r(k("cat.scanning"), "Watcher file size"),
		name: "Watcher: min size (bytes)",
		tooltip: "Minimum file size indexed by watcher.",
		type: "number",
		defaultValue: Number(t.watcher?.minSize ?? 100),
		attrs: {
			min: 0,
			max: 1e6,
			step: 100
		},
		onChange: (e) => {
			t.watcher = t.watcher || {}, t.watcher.minSize = Math.max(0, Math.min(1e6, Math.round(W(e, 100)))), J(t), Y(t), n("watcher.minSize");
		}
	}), e({
		id: `${sn}.Watcher.MaxSize`,
		category: r(k("cat.scanning"), "Watcher file size"),
		name: "Watcher: max size (bytes)",
		tooltip: "Maximum file size indexed by watcher.",
		type: "number",
		defaultValue: Number(t.watcher?.maxSize ?? 4294967296),
		attrs: {
			min: 1e5,
			max: 17179869184,
			step: 1e5
		},
		onChange: (e) => {
			t.watcher = t.watcher || {}, t.watcher.maxSize = Math.max(1e5, Math.min(17179869184, Math.round(W(e, 4294967296)))), J(t), Y(t), n("watcher.maxSize");
		}
	});
	try {
		s().catch(() => {});
	} catch (e) {
		console.debug?.(e);
	}
	e({
		id: `${sn}.RatingTagsSync.Enabled`,
		category: r(k("cat.scanning"), k("setting.sync.rating.name").replace("Majoor: ", "")),
		name: k("setting.sync.rating.name"),
		tooltip: k("setting.sync.rating.desc"),
		type: "boolean",
		defaultValue: !!t.ratingTagsSync?.enabled,
		onChange: (e) => {
			t.ratingTagsSync = t.ratingTagsSync || {}, t.ratingTagsSync.enabled = !!e, J(t), n("ratingTagsSync.enabled");
		}
	});
}
//#endregion
//#region ui/app/settings/settingsFeed.ts
var un = "Majoor", dn = "Majoor Assets Manager";
function fn(e, t, n) {
	let r = (e) => [
		dn,
		k("cat.feed", "Generated Feed"),
		e
	], i = () => {
		t.feed = t.feed || {};
	};
	e({
		id: `${un}.Feed.CardSize`,
		category: r("Card size"),
		name: "Feed card size (px)",
		tooltip: "Set the minimum card width used by the Generated Feed layout (60-600 px).",
		type: "number",
		defaultValue: Math.max(60, Math.min(600, Number(t.feed?.minSize) || 120)),
		attrs: {
			min: 60,
			max: 600,
			step: 10
		},
		onChange: (e) => {
			i(), t.feed.minSize = Math.max(60, Math.min(600, Math.round(Number(e) || 120))), J(t), Y(t), n("feed.minSize");
		}
	}), e({
		id: `${un}.Feed.ShowInfo`,
		category: r("Show info section"),
		name: "Show card info section",
		tooltip: "Show or hide the entire info section (filename, metadata, dots) below thumbnails in the Generated Feed.",
		type: "boolean",
		defaultValue: !!(t.feed?.showInfo ?? A.FEED_SHOW_INFO),
		onChange: (e) => {
			i(), t.feed.showInfo = !!e, J(t), Y(t), n("feed.showInfo");
		}
	}), e({
		id: `${un}.Feed.ShowFilename`,
		category: r("Show filename"),
		name: "Show filename",
		tooltip: "Display the filename on feed cards.",
		type: "boolean",
		defaultValue: !!(t.feed?.showFilename ?? A.FEED_SHOW_FILENAME),
		onChange: (e) => {
			i(), t.feed.showFilename = !!e, J(t), Y(t), n("feed.showFilename");
		}
	}), e({
		id: `${un}.Feed.ShowDimensions`,
		category: r("Show dimensions"),
		name: "Show dimensions",
		tooltip: "Display resolution (WxH) and duration on feed cards.",
		type: "boolean",
		defaultValue: !!(t.feed?.showDimensions ?? A.FEED_SHOW_DIMENSIONS),
		onChange: (e) => {
			i(), t.feed.showDimensions = !!e, J(t), Y(t), n("feed.showDimensions");
		}
	}), e({
		id: `${un}.Feed.ShowDate`,
		category: r("Show date/time"),
		name: "Show date/time",
		tooltip: "Display date and time on feed cards.",
		type: "boolean",
		defaultValue: !!(t.feed?.showDate ?? A.FEED_SHOW_DATE),
		onChange: (e) => {
			i(), t.feed.showDate = !!e, J(t), Y(t), n("feed.showDate");
		}
	}), e({
		id: `${un}.Feed.ShowGenTime`,
		category: r("Show generation time"),
		name: "Show generation time",
		tooltip: "Display the generation time badge on feed cards.",
		type: "boolean",
		defaultValue: !!(t.feed?.showGenTime ?? A.FEED_SHOW_GENTIME),
		onChange: (e) => {
			i(), t.feed.showGenTime = !!e, J(t), Y(t), n("feed.showGenTime");
		}
	}), e({
		id: `${un}.Feed.ShowWorkflowDot`,
		category: r("Show workflow dot"),
		name: "Show workflow indicator",
		tooltip: "Display the workflow availability dot on feed cards.",
		type: "boolean",
		defaultValue: !!(t.feed?.showWorkflowDot ?? A.FEED_SHOW_WORKFLOW_DOT),
		onChange: (e) => {
			i(), t.feed.showWorkflowDot = !!e, J(t), Y(t), n("feed.showWorkflowDot");
		}
	}), e({
		id: `${un}.Feed.ShowExtBadge`,
		category: r("Show format badges"),
		name: "Show format badges",
		tooltip: "Display format badges (e.g. JPG, MP4) on feed card thumbnails.",
		type: "boolean",
		defaultValue: !!(t.feed?.showExtBadge ?? A.FEED_SHOW_BADGES_EXTENSION),
		onChange: (e) => {
			i(), t.feed.showExtBadge = !!e, J(t), Y(t), n("feed.showExtBadge");
		}
	}), e({
		id: `${un}.Feed.ShowRatingBadge`,
		category: r("Show rating badges"),
		name: "Show ratings",
		tooltip: "Display star ratings on feed card thumbnails.",
		type: "boolean",
		defaultValue: !!(t.feed?.showRatingBadge ?? A.FEED_SHOW_BADGES_RATING),
		onChange: (e) => {
			i(), t.feed.showRatingBadge = !!e, J(t), Y(t), n("feed.showRatingBadge");
		}
	}), e({
		id: `${un}.Feed.ShowTagsBadge`,
		category: r("Show tags badges"),
		name: "Show tags",
		tooltip: "Display tag indicators on feed card thumbnails.",
		type: "boolean",
		defaultValue: !!(t.feed?.showTagsBadge ?? A.FEED_SHOW_BADGES_TAGS),
		onChange: (e) => {
			i(), t.feed.showTagsBadge = !!e, J(t), Y(t), n("feed.showTagsBadge");
		}
	});
}
//#endregion
//#region ui/app/settings/settingsSecurity.ts
var pn = "Majoor", mn = "Majoor Assets Manager", hn = 16, gn = {
	safeMode: !1,
	allowWrite: !0,
	allowDelete: !0,
	allowRename: !0,
	allowOpenInFolder: !0,
	allowResetIndex: !0
};
function _n(e) {
	return !!e;
}
function vn(e, t) {
	return _n(e) === _n(t);
}
function yn(e) {
	return typeof e == "string" ? e.trim() : "";
}
function bn(e) {
	let t = String(e || "").trim().toLowerCase();
	return t === "localhost" || t === "127.0.0.1" || t === "::1";
}
function xn() {
	return globalThis.location || globalThis.window?.location || null;
}
function Sn() {
	let e = xn();
	if (!e) return !1;
	let t = String(e.protocol || "").toLowerCase(), n = String(e.hostname || "").trim();
	return t === "http:" && !bn(n);
}
function Cn(e) {
	let t = globalThis.crypto;
	if (!t?.getRandomValues) throw Error("Secure token generation requires crypto.getRandomValues().");
	return t.getRandomValues(e);
}
function wn(e) {
	let t = Math.max(4, Number(e) || 0), n = new Uint8Array(t);
	return Cn(n), Array.from(n, (e) => e.toString(16).padStart(2, "0")).join("");
}
function Tn() {
	return `mjr_${wn(18)}`;
}
function En(e) {
	return String(e?.apiToken || "").trim().length >= hn && U(e?.allowWrite, !0) && U(e?.requireAuth, !1) && !U(e?.allowRemoteWrite, !1);
}
function Dn(e) {
	let t = String((e && typeof e == "object" ? e : {}).apiToken || "").trim();
	return {
		apiToken: t.length >= hn ? t : Tn(),
		allowWrite: !0,
		requireAuth: !0,
		allowRemoteWrite: !1,
		allowInsecureTokenTransport: Sn()
	};
}
function On(e) {
	let t = e || {};
	return {
		safe_mode: U(t.safeMode, !1),
		allow_write: U(t.allowWrite, !0),
		require_auth: U(t.requireAuth, !1),
		allow_remote_write: U(t.allowRemoteWrite, !1),
		allow_insecure_token_transport: U(t.allowInsecureTokenTransport, !1),
		allow_delete: U(t.allowDelete, !0),
		allow_rename: U(t.allowRename, !0),
		allow_open_in_folder: U(t.allowOpenInFolder, !0),
		allow_reset_index: U(t.allowResetIndex, !0),
		...String(t.apiToken || "").trim() ? { api_token: String(t.apiToken || "").trim() } : {}
	};
}
function kn(e) {
	return w(On(e));
}
function An(e) {
	let t = String(e?.security?.tokenHint || "").trim();
	return t ? k("setting.sec.token.placeholderConfigured", "Token configured on server ({tokenHint}). Leave blank to keep the current server token.", { tokenHint: t }) : e?.security?.tokenConfigured ? k("setting.sec.token.placeholderConfiguredGeneric", "Token configured on server. Leave blank to keep the current server token.") : k("setting.sec.token.placeholder", "Auto-generated for this browser session.");
}
function jn(e, t, n) {
	let i = (e, t) => [
		mn,
		e,
		t
	];
	e({
		id: `${pn}.Safety.ConfirmDeletion`,
		category: i(k("cat.security"), "Confirm before deleting"),
		name: "Confirm before deleting",
		tooltip: "Show a confirmation dialog before deleting files. Disabling this allows instant deletion.",
		type: "boolean",
		defaultValue: t.safety?.confirmDeletion !== !1,
		onChange: (e) => {
			vn(t.safety?.confirmDeletion !== !1, e) || (t.safety = t.safety || {}, t.safety.confirmDeletion = !!e, J(t), Y(t), n("safety.confirmDeletion"));
		}
	});
	let a = (r, a, o, s = "cat.security") => {
		e({
			id: `${pn}.Security.${r}`,
			category: i(k(s), k(a).replace("Majoor: ", "")),
			name: k(a),
			tooltip: k(o),
			type: "boolean",
			defaultValue: U(t.security?.[r], gn[r] ?? !1),
			onChange: (e) => {
				if (!vn(t.security?.[r], e)) {
					t.security = t.security || {}, t.security[r] = !!e, J(t), n(`security.${r}`);
					try {
						kn(t.security).then((e) => {
							e?.ok && e.data?.prefs ? Rt() : e && e.ok === !1 && console.warn("[Majoor] backend security settings update failed", e.error || e);
						}).catch(() => {});
					} catch (e) {
						console.debug?.(e);
					}
				}
			}
		});
	};
	a("safeMode", "setting.sec.safe.name", "setting.sec.safe.desc"), a("allowWrite", "setting.sec.write.name", "setting.sec.write.desc"), a("allowDelete", "setting.sec.del.name", "setting.sec.del.desc"), a("allowRename", "setting.sec.ren.name", "setting.sec.ren.desc"), a("allowOpenInFolder", "setting.sec.open.name", "setting.sec.open.desc"), a("allowResetIndex", "setting.sec.reset.name", "setting.sec.reset.desc"), e({
		id: `${pn}.Security.RemoteLanPreset`,
		category: i(k("cat.remote"), k("setting.sec.remoteLanPreset.name").replace("Majoor: ", "")),
		name: k("setting.sec.remoteLanPreset.name"),
		tooltip: k("setting.sec.remoteLanPreset.desc"),
		type: "boolean",
		defaultValue: En(t.security),
		onChange: (e) => {
			if (t.security = t.security || {}, vn(t.security.remoteLanPreset, e)) return;
			if (t.security.remoteLanPreset = !!e, !e) {
				J(t), n("security.remoteLanPreset");
				return;
			}
			let i;
			try {
				i = Dn(t.security);
			} catch (e) {
				p(e?.message || k("toast.remoteLanPresetFailed", "Failed to apply the recommended remote LAN setup."), "error");
				return;
			}
			Object.assign(t.security, i), t.security.tokenConfigured = !0, t.security.tokenHint = String(i.apiToken || "").trim() ? `...${String(i.apiToken).trim().slice(-4)}` : "", i.apiToken && r(i.apiToken), J(t), n("security.remoteLanPreset"), n("security.apiToken"), n("security.allowWrite"), n("security.requireAuth"), n("security.allowRemoteWrite"), n("security.allowInsecureTokenTransport");
			try {
				kn(t.security).then((e) => {
					e?.ok && e.data?.prefs ? (Rt(), p(k("toast.remoteLanPresetApplied", "Recommended remote LAN setup applied. This browser session is now authorized for Majoor write operations."), "success")) : e && e.ok === !1 && (p(e.error || k("toast.remoteLanPresetFailed", "Failed to apply the recommended remote LAN setup."), "error"), console.warn("[Majoor] backend remote LAN preset update failed", e.error || e));
				}).catch((e) => {
					p(e?.message || k("toast.remoteLanPresetFailed", "Failed to apply the recommended remote LAN setup."), "error");
				});
			} catch (e) {
				console.debug?.(e);
			}
		}
	}), e({
		id: `${pn}.Security.ApiToken`,
		category: i(k("cat.remote"), k("setting.sec.token.name").replace("Majoor: ", "")),
		name: k("setting.sec.token.name", "Majoor: API Token"),
		tooltip: k("setting.sec.token.desc", "Store the API token used for write operations. Majoor sends it via X-MJR-Token and Authorization headers."),
		type: "text",
		defaultValue: t.security?.apiToken || "",
		attrs: { placeholder: An(t) },
		onChange: (e) => {
			t.security = t.security || {};
			let i = yn(e);
			if (yn(t.security.apiToken) !== i && (t.security.apiToken = i, t.security.apiToken && (t.security.tokenConfigured = !0, t.security.tokenHint = `...${t.security.apiToken.slice(-4)}`, r(t.security.apiToken)), J(t), n("security.apiToken"), t.security.apiToken)) try {
				w({ api_token: t.security.apiToken }).then((e) => {
					e?.ok && e.data?.prefs ? Rt() : e && e.ok === !1 && console.warn("[Majoor] backend token update failed", e.error || e);
				}).catch(() => {});
			} catch (e) {
				console.debug?.(e);
			}
		}
	}), a("requireAuth", "setting.sec.requireAuth.name", "setting.sec.requireAuth.desc", "cat.remote"), a("allowRemoteWrite", "setting.sec.remote.name", "setting.sec.remote.desc", "cat.remote"), a("allowInsecureTokenTransport", "setting.sec.insecureTransport.name", "setting.sec.insecureTransport.desc", "cat.remote");
}
//#endregion
//#region ui/app/settings/settingsAdvanced.ts
var Z = "Majoor", Mn = "Majoor Assets Manager";
function Nn(t, n, r, a) {
	let s = (e, t) => [
		Mn,
		e,
		t
	], c = String(n.paths?.outputDirectory || ""), l = null, d = 0, f = null;
	t({
		id: `${Z}.Paths.OutputDirectory`,
		category: s(k("cat.advanced"), "Paths / Output"),
		name: "Majoor: Generation Output Directory",
		tooltip: "Override the ComfyUI generation output directory used by Majoor (equivalent to --output-directory). Leave empty to keep the current backend default.",
		type: "text",
		defaultValue: String(n.paths?.outputDirectory || ""),
		attrs: { placeholder: "D:\\\\____COMFY_OUTPUTS" },
		onChange: async (e) => {
			let t = String(e || "").trim();
			n.paths = n.paths || {}, n.paths.outputDirectory = t, J(n);
			try {
				l &&= (clearTimeout(l), null);
			} catch (e) {
				console.debug?.(e);
			}
			l = setTimeout(async () => {
				l = null;
				let e = ++d;
				try {
					f?.abort?.();
				} catch (e) {
					console.debug?.(e);
				}
				f = typeof AbortController < "u" ? new AbortController() : null;
				try {
					let i = await ne(t, f ? { signal: f.signal } : {});
					if (e !== d) return;
					if (!i?.ok) throw Error(i?.error || k("toast.failedSetOutputDirectory", "Failed to set output directory"));
					let a = String(i?.data?.output_directory || t).trim();
					n.paths.outputDirectory = a, c = a, J(n), r("paths.outputDirectory");
				} catch (t) {
					if (e !== d || String(t?.name || "") === "AbortError" || String(t?.code || "") === "ABORTED") return;
					n.paths.outputDirectory = c, J(n), r("paths.outputDirectory"), p(t?.message || k("toast.failedSetOutputDirectory", "Failed to set output directory"), "error");
				}
			}, 700);
		}
	});
	try {
		h().then((e) => {
			if (!e?.ok) return;
			let t = String(e?.data?.output_directory || "").trim();
			n.paths = n.paths || {}, n.paths.outputDirectory !== t && (n.paths.outputDirectory = t, c = t, J(n), r("paths.outputDirectory"));
		}).catch(() => {});
	} catch (e) {
		console.debug?.(e);
	}
	let g = String(n.paths?.indexDirectory || ""), v = null, y = 0, b = null;
	t({
		id: `${Z}.Paths.IndexDirectory`,
		category: s(k("cat.advanced"), "Paths / Index"),
		name: "Majoor: Index Database Directory",
		tooltip: "Override the Majoor index database directory. Use this to keep the SQLite index on a different local disk. Requires restart.",
		type: "text",
		defaultValue: String(n.paths?.indexDirectory || ""),
		attrs: { placeholder: "D:\\MajoorIndex" },
		onChange: async (e) => {
			let t = String(e || "").trim();
			n.paths = n.paths || {}, n.paths.indexDirectory = t, J(n);
			try {
				v &&= (clearTimeout(v), null);
			} catch (e) {
				console.debug?.(e);
			}
			v = setTimeout(async () => {
				v = null;
				let e = ++y;
				try {
					b?.abort?.();
				} catch (e) {
					console.debug?.(e);
				}
				b = typeof AbortController < "u" ? new AbortController() : null;
				try {
					let i = await ie(t, b ? { signal: b.signal } : {});
					if (e !== y) return;
					if (!i?.ok) throw Error(i?.error || k("toast.failedSetIndexDirectory", "Failed to set index directory"));
					let a = String(i?.data?.index_directory || t).trim(), o = a !== g;
					n.paths.indexDirectory = a, g = a, J(n), r("paths.indexDirectory"), o && p(k("toast.indexDirectorySavedRestart", "Index directory saved. Restart ComfyUI to apply."), "success", void 0, { history: { trackId: "settings:index-directory-saved" } });
				} catch (t) {
					if (e !== y || String(t?.name || "") === "AbortError" || String(t?.code || "") === "ABORTED") return;
					n.paths.indexDirectory = g, J(n), r("paths.indexDirectory"), p(t?.message || k("toast.failedSetIndexDirectory", "Failed to set index directory"), "error");
				}
			}, 700);
		}
	});
	try {
		i().then((e) => {
			if (!e?.ok) return;
			let t = String(e?.data?.index_directory || "").trim();
			n.paths = n.paths || {}, n.paths.indexDirectory !== t && (n.paths.indexDirectory = t, g = t, J(n), r("paths.indexDirectory"));
		}).catch(() => {});
	} catch (e) {
		console.debug?.(e);
	}
	let w = _e().map((e) => e.code), ee = ["auto", ...w];
	t({
		id: `${Z}.Language`,
		category: s(k("cat.advanced"), k("setting.language.name", "Language")),
		name: k("setting.language.name", "Majoor: Language"),
		tooltip: "Use auto to detect and follow ComfyUI language. Or choose a fixed language for Majoor only.",
		type: "combo",
		defaultValue: n.i18n?.followComfyLanguage ? "auto" : xe(),
		options: ee,
		onChange: (e) => {
			if (n.i18n = n.i18n || {}, e === "auto") {
				n.i18n.followComfyLanguage = !0, ye(!0), he(a), J(n), r("language");
				return;
			}
			w.includes(e) && (n.i18n.followComfyLanguage = !1, ye(!1), Se(e), J(n), r("language"));
		}
	}), t({
		id: `${Z}.ProbeBackend.Mode`,
		category: s(k("cat.advanced"), k("setting.probe.mode.name").replace("Majoor: ", "")),
		name: k("setting.probe.mode.name"),
		tooltip: k("setting.probe.mode.desc") + " (env: MAJOOR_MEDIA_PROBE_BACKEND)",
		type: "combo",
		defaultValue: n.probeBackend?.mode || K.probeBackend.mode,
		options: [
			"auto",
			"exiftool",
			"ffprobe",
			"both"
		],
		onChange: (e) => {
			let t = dt(e, [
				"auto",
				"exiftool",
				"ffprobe",
				"both"
			], K.probeBackend.mode);
			n.probeBackend = n.probeBackend || {}, n.probeBackend.mode = t, J(n), Y(n), r("probeBackend.mode"), ce(t).catch(() => {});
		}
	}), t({
		id: `${Z}.MetadataFallback.Image`,
		category: s(k("cat.advanced"), "Metadata"),
		name: "Majoor: Metadata Fallback (Images)",
		tooltip: "Enable Pillow fallback when ExifTool is missing or fails.",
		type: "boolean",
		defaultValue: n.metadataFallback?.image ?? K.metadataFallback.image,
		onChange: async (e) => {
			let t = !!e, i = !!(n.metadataFallback?.image ?? K.metadataFallback.image);
			n.metadataFallback = n.metadataFallback || {}, n.metadataFallback.image = t, J(n), r("metadataFallback.image");
			try {
				let e = await S({
					image: t,
					media: n.metadataFallback?.media ?? K.metadataFallback.media
				});
				if (!e?.ok) throw Error(e?.error || k("toast.failedUpdateMetadataFallback", "Failed to update metadata fallback settings"));
			} catch (e) {
				n.metadataFallback.image = i, J(n), r("metadataFallback.image"), p(e?.message || k("toast.failedUpdateMetadataFallback", "Failed to update metadata fallback settings"), "error");
			}
		}
	}), t({
		id: `${Z}.MetadataFallback.Media`,
		category: s(k("cat.advanced"), "Metadata"),
		name: "Majoor: Metadata Fallback (Audio/Video)",
		tooltip: "Enable hachoir fallback when ffprobe is missing or fails.",
		type: "boolean",
		defaultValue: n.metadataFallback?.media ?? K.metadataFallback.media,
		onChange: async (e) => {
			let t = !!e, i = !!(n.metadataFallback?.media ?? K.metadataFallback.media);
			n.metadataFallback = n.metadataFallback || {}, n.metadataFallback.media = t, J(n), r("metadataFallback.media");
			try {
				let e = await S({
					image: n.metadataFallback?.image ?? K.metadataFallback.image,
					media: t
				});
				if (!e?.ok) throw Error(e?.error || k("toast.failedUpdateMetadataFallback", "Failed to update metadata fallback settings"));
			} catch (e) {
				n.metadataFallback.media = i, J(n), r("metadataFallback.media"), p(e?.message || k("toast.failedUpdateMetadataFallback", "Failed to update metadata fallback settings"), "error");
			}
		}
	});
	try {
		u().then((e) => {
			if (!e?.ok || !e?.data?.prefs) return;
			let t = e.data.prefs || {}, i = !!(t.image ?? K.metadataFallback.image), a = !!(t.media ?? K.metadataFallback.media);
			n.metadataFallback = n.metadataFallback || {};
			let o = !1;
			n.metadataFallback.image !== i && (n.metadataFallback.image = i, o = !0), n.metadataFallback.media !== a && (n.metadataFallback.media = a, o = !0), o && (J(n), r("metadataFallback"));
		}).catch(() => {});
	} catch (e) {
		console.debug?.(e);
	}
	t({
		id: `${Z}.Db.Timeout`,
		category: s(k("cat.advanced"), "Database"),
		name: "DB Timeout (ms)",
		tooltip: "Client-side DB timeout preference (stored locally).",
		type: "number",
		defaultValue: Number(n.db?.timeoutMs || 5e3),
		attrs: {
			min: 1e3,
			max: 3e4,
			step: 1e3
		},
		onChange: (e) => {
			n.db = n.db || {}, n.db.timeoutMs = Math.max(1e3, Math.min(3e4, Math.round(W(e, 5e3)))), J(n), Y(n), r("db.timeoutMs");
		}
	}), t({
		id: `${Z}.Db.MaxConnections`,
		category: s(k("cat.advanced"), "Database"),
		name: "DB Max Connections",
		tooltip: "Client-side DB max connections preference (stored locally).",
		type: "number",
		defaultValue: Number(n.db?.maxConnections || 10),
		attrs: {
			min: 1,
			max: 100,
			step: 1
		},
		onChange: (e) => {
			n.db = n.db || {}, n.db.maxConnections = Math.max(1, Math.min(100, Math.round(W(e, 10)))), J(n), Y(n), r("db.maxConnections");
		}
	}), t({
		id: `${Z}.Db.QueryTimeout`,
		category: s(k("cat.advanced"), "Database"),
		name: "DB Query Timeout (ms)",
		tooltip: "Client-side DB query timeout preference (stored locally).",
		type: "number",
		defaultValue: Number(n.db?.queryTimeoutMs || 1e3),
		attrs: {
			min: 500,
			max: 1e4,
			step: 500
		},
		onChange: (e) => {
			n.db = n.db || {}, n.db.queryTimeoutMs = Math.max(500, Math.min(1e4, Math.round(W(e, 1e3)))), J(n), Y(n), r("db.queryTimeoutMs");
		}
	}), t({
		id: `${Z}.Observability.Enabled`,
		category: s(k("cat.advanced"), k("setting.obs.enabled.name").replace("Majoor: ", "")),
		name: k("setting.obs.enabled.name"),
		tooltip: k("setting.obs.enabled.desc"),
		type: "boolean",
		defaultValue: !!n.observability?.enabled,
		onChange: (e) => {
			n.observability = n.observability || {}, n.observability.enabled = !!e, J(n), Y(n), r("observability.enabled");
		}
	}), t({
		id: `${Z}.Observability.RuntimeDashboardMode`,
		category: s(k("cat.advanced"), "Runtime metrics badge"),
		name: "Majoor: Runtime metrics badge",
		tooltip: "Controls the small DB/enrichment/watcher metrics badge in the Assets Manager panel.",
		type: "combo",
		defaultValue: n.observability?.runtimeDashboardMode || K.observability.runtimeDashboardMode,
		options: [
			"autoHide30",
			"always",
			"hidden"
		],
		onChange: (e) => {
			let t = dt(e, [
				"autoHide30",
				"always",
				"hidden"
			], K.observability.runtimeDashboardMode);
			n.observability = n.observability || {}, n.observability.runtimeDashboardMode = t, J(n), r("observability.runtimeDashboardMode");
		}
	}), t({
		id: `${Z}.Observability.VerboseErrors`,
		category: s(k("cat.advanced"), "Verbose error logging"),
		name: "Verbose error logging",
		tooltip: "Show detailed error messages in toasts and console. Useful for debugging.",
		type: "boolean",
		defaultValue: !!n.observability?.verboseErrors,
		onChange: (e) => {
			n.observability = n.observability || {}, n.observability.verboseErrors = !!e, J(n), Y(n), r("observability.verboseErrors");
		}
	}), t({
		id: `${Z}.Observability.VerboseRouteRegistrationLogs`,
		category: s(k("cat.advanced"), "Logs"),
		name: "Majoor: Verbose route registration logs",
		tooltip: "When disabled, Majoor prints a compact startup summary instead of listing every registered API route. Takes effect on the next backend restart.",
		type: "boolean",
		defaultValue: !!(n.observability?.verboseRouteRegistrationLogs ?? K.observability?.verboseRouteRegistrationLogs ?? !1),
		onChange: async (e) => {
			let t = !!e, i = !!(n.observability?.verboseRouteRegistrationLogs ?? K.observability?.verboseRouteRegistrationLogs ?? !1);
			n.observability = n.observability || {}, n.observability.verboseRouteRegistrationLogs = t, J(n), r("observability.verboseRouteRegistrationLogs");
			try {
				let e = await C(t);
				if (!e?.ok) throw Error(e?.error || "Failed to update route logging settings");
			} catch (e) {
				n.observability.verboseRouteRegistrationLogs = i, J(n), r("observability.verboseRouteRegistrationLogs"), p(e?.message || "Failed to update route logging settings", "error");
			}
		}
	}), (async () => {
		try {
			let e = !!(await ue())?.data?.prefs?.enabled;
			n.observability = n.observability || {}, n.observability.verboseRouteRegistrationLogs !== e && (n.observability.verboseRouteRegistrationLogs = e, J(n), r("observability.verboseRouteRegistrationLogs"));
		} catch (e) {
			console.debug?.(e);
		}
	})(), t({
		id: `${Z}.Observability.VerboseStartupLogs`,
		category: s(k("cat.advanced"), "Logs"),
		name: "Majoor: Verbose startup logs",
		tooltip: "When disabled, Majoor suppresses most informational bootstrap logs during backend startup while keeping warnings and errors. Takes effect on the next backend restart.",
		type: "boolean",
		defaultValue: !!(n.observability?.verboseStartupLogs ?? K.observability?.verboseStartupLogs ?? !1),
		onChange: async (e) => {
			let t = !!e, i = !!(n.observability?.verboseStartupLogs ?? K.observability?.verboseStartupLogs ?? !1);
			n.observability = n.observability || {}, n.observability.verboseStartupLogs = t, J(n), r("observability.verboseStartupLogs");
			try {
				let e = await E(t);
				if (!e?.ok) throw Error(e?.error || "Failed to update startup logging settings");
			} catch (e) {
				n.observability.verboseStartupLogs = i, J(n), r("observability.verboseStartupLogs"), p(e?.message || "Failed to update startup logging settings", "error");
			}
		}
	}), (async () => {
		try {
			let e = !!(await o())?.data?.prefs?.enabled;
			n.observability = n.observability || {}, n.observability.verboseStartupLogs !== e && (n.observability.verboseStartupLogs = e, J(n), r("observability.verboseStartupLogs"));
		} catch (e) {
			console.debug?.(e);
		}
	})();
	{
		let i = "HuggingFace Token", a = "", o = null, c = 0, l = !!n.ai?.huggingFaceTokenVisible, u = () => {
			try {
				let e = Array.from(document.querySelectorAll("input[data-mjr-hf-token=\"1\"]"));
				for (let t of e) try {
					t.type = l ? "text" : "password";
				} catch (e) {
					console.debug?.(e);
				}
			} catch (e) {
				console.debug?.(e);
			}
		}, d = (e) => {
			try {
				let t = String(e || "").trim();
				if (!t) return;
				let n = Array.from(document.querySelectorAll("input[data-mjr-hf-token=\"1\"]"));
				for (let e of n) try {
					e.placeholder = t;
				} catch (e) {
					console.debug?.(e);
				}
			} catch (e) {
				console.debug?.(e);
			}
		};
		t({
			id: `${Z}.AI.HuggingFaceTokenVisible`,
			category: s(k("cat.advanced"), i),
			name: "Show HuggingFace token",
			tooltip: "Show or hide the HuggingFace token while editing.",
			type: "boolean",
			defaultValue: l,
			onChange: (e) => {
				let t = !!e;
				l = t, n.ai = n.ai || {}, n.ai.huggingFaceTokenVisible = t, J(n), r("ai.huggingFaceTokenVisible"), setTimeout(u, 0);
			}
		}), t({
			id: `${Z}.AI.HuggingFaceToken`,
			category: s(k("cat.advanced"), i),
			name: "HuggingFace Token",
			tooltip: [
				"Optional token for HuggingFace Hub downloads (higher rate limits).",
				"Saved server-side and used by CLIP model loading.",
				"Leave empty to clear the stored token."
			].join("\n"),
			type: "text",
			defaultValue: "",
			attrs: {
				placeholder: "Paste HuggingFace token (hf_...)",
				type: l ? "text" : "password",
				autocomplete: "new-password",
				name: "mjr_huggingface_token",
				"data-mjr-hf-token": "1"
			},
			onChange: (e) => {
				let t = String(e || "").trim();
				if (t !== a) {
					try {
						o &&= (clearTimeout(o), null);
					} catch (e) {
						console.debug?.(e);
					}
					o = setTimeout(async () => {
						o = null;
						let e = ++c;
						try {
							let n = await x(t);
							if (e !== c) return;
							if (!n?.ok) throw Error(n?.error || "Failed to update HuggingFace token");
							a = t, r("ai.huggingFaceToken"), t ? p("HuggingFace token saved", "success") : p("HuggingFace token cleared", "success", void 0, { noHistory: !0 });
						} catch (t) {
							if (e !== c) return;
							p(t?.message || "Failed to update HuggingFace token", "error");
						}
					}, 900);
				}
			}
		}), setTimeout(u, 0), (async () => {
			try {
				let e = (await m())?.data?.prefs || {}, t = !!e?.has_token, n = String(e?.token_hint || "").trim();
				d(t ? `Configured ${n || "(saved)"}` : "Paste HuggingFace token (hf_...)");
			} catch (e) {
				console.debug?.(e);
			}
		})(), t({
			id: `${Z}.AI.VerboseLogs`,
			category: s(k("cat.advanced"), i),
			name: "Majoor: Verbose AI logs",
			tooltip: "Enable detailed HuggingFace/SigLIP2/X-CLIP logs and progress bars during model download/loading.",
			type: "boolean",
			defaultValue: !!(n.ai?.verboseAiLogs ?? K.ai?.verboseAiLogs ?? !1),
			onChange: async (e) => {
				let t = !!e, i = !!(n.ai?.verboseAiLogs ?? K.ai?.verboseAiLogs ?? !1);
				n.ai = n.ai || {}, n.ai.verboseAiLogs = t, J(n), r("ai.verboseAiLogs");
				try {
					let e = await ae(t);
					if (!e?.ok) throw Error(e?.error || "Failed to update AI logging settings");
				} catch (e) {
					n.ai.verboseAiLogs = i, J(n), r("ai.verboseAiLogs"), p(e?.message || "Failed to update AI logging settings", "error");
				}
			}
		}), (async () => {
			try {
				let t = !!(await e())?.data?.prefs?.enabled;
				n.ai = n.ai || {}, n.ai.verboseAiLogs !== t && (n.ai.verboseAiLogs = t, J(n), r("ai.verboseAiLogs"));
			} catch (e) {
				console.debug?.(e);
			}
		})();
	}
	t({
		id: `${Z}.AI.VectorStats`,
		category: s(k("cat.advanced"), "AI / Vector Search"),
		name: "Vector Index Status",
		tooltip: "Current status of the SigLIP2/X-CLIP vector index used for semantic search",
		type: "text",
		defaultValue: "Loading vector status..."
	}), (async () => {
		try {
			let e = await _();
			e?.ok ? console.debug?.("[Majoor] Vector status:", `${e.data?.total || 0} assets indexed | Model: ${e.data?.model || "N/A"}`) : console.debug?.("[Majoor] Vector status unavailable");
		} catch (e) {
			console.debug?.("[Majoor] Vector status fetch failed", e);
		}
	})(), t({
		id: `${Z}.AI.VectorBackfillAction`,
		category: s(k("cat.advanced"), "AI / Vector Search"),
		name: "Vector Index Action",
		tooltip: [
			"Compute CLIP embeddings for all assets that don't have them yet.",
			"This is required for AI semantic search to work.",
			"",
			"Choose 'Run backfill now' to start indexing.",
			"This may take several minutes for large libraries.",
			"",
			"Note: New assets are indexed automatically during scanning."
		].join("\n"),
		type: "combo",
		defaultValue: "Idle",
		options: ["Idle", "Run backfill now"],
		onChange: async (e) => {
			if (String(e || "") !== "Run backfill now") return;
			let t = { history: {
				trackId: "vector-backfill:advanced-settings",
				title: "Vector Backfill",
				source: "all",
				operation: "vector_backfill",
				forceStore: !0
			} };
			try {
				p(k("toast.vectorBackfillStarting", "Starting vector backfill... This may take a while."), "info", void 0, { history: {
					...t.history,
					status: "started",
					detail: "Starting vector backfill... This may take a while."
				} });
				let e = await le(64, { onProgress: (e) => {
					let n = String(e?.status || "running").toLowerCase() || "running", r = e?.progress || e?.result || {}, i = Number(r?.candidates ?? r?.processed ?? 0), a = Number(r?.indexed ?? 0), o = Number(r?.skipped ?? 0), s = Number(r?.errors ?? 0), c = Math.max(i, a + o + s), l = c > 0 ? Math.round((a + o + s) / c * 100) : null, u = n === "queued" ? "Vector backfill queued" : `Candidates ${i}, indexed ${a}, skipped ${o}, errors ${s}`;
					te({
						summary: "Vector Backfill",
						detail: u
					}, n === "failed" ? "error" : n === "succeeded" ? "success" : "info", 0, { history: {
						...t.history,
						status: n,
						detail: u,
						progress: {
							current: a + o + s,
							total: c,
							percent: l,
							indexed: a,
							skipped: o,
							errors: s,
							label: n
						}
					} });
				} });
				if (e?.ok) {
					let n = e.data || {}, r = String(n?.status || "").toLowerCase(), i = !!n?.pending || [
						"queued",
						"running",
						"pending"
					].includes(r), a = n?.progress || {}, o = Number(n?.processed ?? a?.candidates ?? 0), s = Number(n?.indexed ?? a?.indexed ?? 0), c = Number(n?.skipped ?? a?.skipped ?? 0);
					if (i) {
						let e = String(n?.job_id || "").trim();
						p(k("toast.vectorBackfillRunning", "Vector backfill still running in background{job}.", { job: e ? ` (job ${e.slice(0, 8)})` : "" }), "info", void 0, { history: {
							...t.history,
							status: "running",
							detail: `Vector backfill still running in background${e ? ` (${e.slice(0, 8)})` : ""}.`,
							progress: {
								current: s + c,
								total: Math.max(o, s + c),
								percent: Math.max(o, s + c) > 0 ? Math.round((s + c) / Math.max(o, s + c) * 100) : null,
								indexed: s,
								skipped: c,
								label: "running"
							}
						} });
					} else p(k("toast.vectorBackfillComplete", "Vector backfill complete! Processed: {processed}, Indexed: {indexed}, Skipped: {skipped}", {
						processed: o,
						indexed: s,
						skipped: c
					}), "success", void 0, { history: {
						...t.history,
						status: "succeeded",
						detail: `Processed ${o}, indexed ${s}, skipped ${c}`,
						progress: {
							current: o,
							total: o,
							percent: o > 0 ? 100 : null,
							indexed: s,
							skipped: c,
							label: "done"
						}
					} });
					try {
						let e = await _();
						e?.ok && console.debug?.("[Majoor] Vector stats after backfill:", e.data);
					} catch (e) {
						console.debug?.("[Majoor] Failed to refresh vector stats:", e);
					}
				} else throw Error(e?.error || k("toast.vectorBackfillFailedGeneric", "Backfill failed"));
			} catch (e) {
				let n = e?.message || String(e || k("status.unknown", "unknown"));
				p(k("toast.vectorBackfillFailedDetail", "Vector backfill failed: {error}", { error: n }), "error", void 0, { history: {
					...t.history,
					status: "failed",
					detail: n
				} }), console.error("[Majoor] Vector backfill error:", e);
			}
		}
	});
}
//#endregion
//#region ui/app/settings/settingsSearch.ts
var Pn = "Majoor", Fn = "Majoor Assets Manager";
function In(e, t, n) {
	let r = (e, t) => [
		Fn,
		e,
		t
	];
	e({
		id: `${Pn}.AI.VectorSearchEnabled`,
		category: r(k("cat.search", "Search"), "AI"),
		name: k("setting.ai.vector.enabled.name", "Enable AI semantic search"),
		tooltip: k("setting.ai.vector.enabled.desc", "Enable/disable AI vector search features (SigLIP2/X-CLIP: description search, prompt alignment, AI tag suggestions, smart collections)."),
		type: "boolean",
		defaultValue: !!(t.ai?.vectorSearchEnabled ?? !0),
		onChange: async (e) => {
			t.ai = t.ai || {};
			let r = !!(t.ai.vectorSearchEnabled ?? !0), i = !!e;
			t.ai.vectorSearchEnabled = i, J(t), Y(t), n("ai.vectorSearchEnabled");
			try {
				let e = await re(i);
				if (!e?.ok) {
					t.ai.vectorSearchEnabled = r, J(t), Y(t), n("ai.vectorSearchEnabled"), p(e?.error || "Failed to update AI vector search setting", "error");
					return;
				}
				p(i ? "AI semantic search enabled" : "AI semantic search disabled", "info", 2200);
			} catch (e) {
				t.ai.vectorSearchEnabled = r, J(t), Y(t), n("ai.vectorSearchEnabled"), p(e?.message || "Failed to update AI vector search setting", "error");
			}
		}
	}), e({
		id: `${Pn}.AI.VectorCaptionOnIndex`,
		category: r(k("cat.search", "Search"), "AI"),
		name: k("setting.ai.vector.captionOnIndex.name", "Generate AI captions during indexing"),
		tooltip: k("setting.ai.vector.captionOnIndex.desc", "Allow automatic vector indexing and backfill to run Florence-2 captions for image assets. This is slower and can use significant VRAM/CPU; leave it off for faster grid startup."),
		type: "boolean",
		defaultValue: !!(t.ai?.vectorCaptionOnIndex ?? !1),
		onChange: async (e) => {
			t.ai = t.ai || {};
			let r = !!(t.ai.vectorCaptionOnIndex ?? !1), i = !!e;
			t.ai.vectorCaptionOnIndex = i, J(t), Y(t), n("ai.vectorCaptionOnIndex");
			try {
				let e = await re({ caption_on_index: i });
				if (!e?.ok) {
					t.ai.vectorCaptionOnIndex = r, J(t), Y(t), n("ai.vectorCaptionOnIndex"), p(e?.error || "Failed to update AI caption indexing setting", "error");
					return;
				}
				i && p("AI captions during indexing enabled", "info", 2600);
			} catch (e) {
				t.ai.vectorCaptionOnIndex = r, J(t), Y(t), n("ai.vectorCaptionOnIndex"), p(e?.message || "Failed to update AI caption indexing setting", "error");
			}
		}
	}), e({
		id: `${Pn}.Search.MaxResults`,
		category: r(k("cat.search", "Search")),
		name: k("setting.search.maxResults.name", "Max search results (client)"),
		tooltip: k("setting.search.maxResults.desc", "Maximum number of results requested per search. The backend still enforces MAJOOR_SEARCH_MAX_LIMIT; increase that env var if you need a higher hard cap."),
		type: "number",
		defaultValue: Number(t.search?.maxResults || A.SEARCH_DEFAULT_LIMIT),
		attrs: {
			min: 10,
			max: A.MAX_PAGE_SIZE || 2e3,
			step: 1
		},
		onChange: (e) => {
			t.search = t.search || {}, t.search.maxResults = Math.max(10, Math.min(A.MAX_PAGE_SIZE || 2e3, Number(e) || A.SEARCH_DEFAULT_LIMIT)), J(t), Y(t), n("search.maxResults");
		}
	}), e({
		id: `${Pn}.EnvVars.Reference`,
		category: r(k("cat.advanced"), "Environment variables"),
		name: "Environment variables reference",
		tooltip: [
			"Set these env vars before starting ComfyUI to override defaults:",
			"",
			"MAJOOR_OUTPUT_DIRECTORY - Override output root directory",
			"MAJOOR_EXIFTOOL_PATH - Path to exiftool binary",
			"MAJOOR_FFPROBE_PATH - Path to ffprobe binary",
			"MAJOOR_MEDIA_PROBE_BACKEND - Probe mode: auto|exiftool|ffprobe|both",
			"MAJOOR_EXIFTOOL_TIMEOUT - ExifTool timeout in seconds (default: 15)",
			"MAJOOR_FFPROBE_TIMEOUT - FFprobe timeout in seconds (default: 10)",
			"MAJOOR_DB_TIMEOUT - Database timeout in seconds (default: 30)",
			"MAJOOR_DB_MAX_CONNECTIONS - Max DB connections (default: 8)",
			"MAJOOR_METADATA_CACHE_MAX - Metadata cache max entries (default: 100000)",
			"MAJOOR_METADATA_EXTRACT_CONCURRENCY - Parallel metadata workers (default: 1)",
			"MJR_ENABLE_WATCHER - Enable file watcher: 1|0 (default: 1)",
			"MJR_WATCHER_DEBOUNCE_MS - Watcher debounce delay in ms (default: 3000)",
			"MJR_WATCHER_DEDUPE_TTL_MS - Watcher dedupe window in ms (default: 3000)",
			"MJR_WATCHER_MAX_FILE_SIZE_BYTES - Max file size to index (default: 512MB)",
			"MJR_WATCHER_FLUSH_MAX_FILES - Max files per flush batch (default: 256)",
			"MJR_WATCHER_PENDING_MAX - Max pending watcher queue (default: 5000)",
			"MJR_AM_ENABLE_VECTOR_SEARCH - Enable AI vector/semantic search: 1|0 (default: 1)",
			"MJR_AM_VECTOR_CAPTION_ON_INDEX - Generate Florence captions during vector indexing: 1|0 (default: 0)",
			"MAJOOR_SEARCH_MAX_LIMIT - Max search results (default: 500)",
			"MAJOOR_BG_SCAN_ON_LIST - Scan on directory list: 0|1 (default: 0)"
		].join("\n"),
		type: "text",
		defaultValue: "Hover for full list of environment variables"
	});
}
//#endregion
//#region ui/app/settings/SettingsPanel.ts
var Ln = "Majoor Assets Manager", Rn = /^\s*Majoor:\s*/i, zn = Object.freeze({
	ASSETS_PANEL: "Assets Panel",
	GENERATED_FEED: "Generated Feed",
	VIEWER: "Viewer & Floating Viewer",
	INDEXING: "Indexing & Watcher",
	SEARCH_AI: "Search & AI",
	GENERAL: "General",
	ADVANCED: "Advanced",
	SECURITY: "Security"
}), Bn = new Set([
	"grid.starColor",
	"grid.badgeImageColor",
	"grid.badgeVideoColor",
	"grid.badgeAudioColor",
	"grid.badgeModel3dColor",
	"grid.badgeDuplicateAlertColor",
	"ui.cardHoverColor",
	"ui.cardSelectionColor",
	"ui.ratingColor",
	"ui.tagColor"
]), Vn = "Majoor.General.ResetAllSettings", Hn = "mjr-settings-reset-btn", Un = null, Wn = null;
function Gn(e) {
	let t = String(e || "").trim();
	return t ? /^Majoor\.(Safety|Security)\./.test(t) ? zn.SECURITY : /^Majoor\.(Paths|ProbeBackend|MetadataFallback|Db|Observability)\./.test(t) || t === "Majoor.EnvVars.Reference" || t === "Majoor.AI.HuggingFaceTokenVisible" || t === "Majoor.AI.HuggingFaceToken" || t === "Majoor.AI.VerboseLogs" || t === "Majoor.AI.VectorStats" || t === "Majoor.AI.VectorBackfillAction" ? zn.ADVANCED : /^Majoor\.(Viewer|WorkflowMinimap)\./.test(t) ? zn.VIEWER : /^Majoor\.Feed\./.test(t) ? zn.GENERATED_FEED : /^Majoor\.(AutoScan|Scan|Watcher|ExecutionGrouping|RatingTagsSync)\./.test(t) ? zn.INDEXING : t === "Majoor.RtHydrate.Concurrency" ? zn.ADVANCED : t === "Majoor.AI.VectorSearchEnabled" || t === "Majoor.AI.VectorCaptionOnIndex" || /^Majoor\.Search\./.test(t) ? zn.SEARCH_AI : /^Majoor\.(Grid|Cards|Badges|Sidebar|InfiniteScroll|General)\./.test(t) ? zn.ASSETS_PANEL : zn.GENERAL : zn.GENERAL;
}
function Kn(e) {
	let t = Array.isArray(e?.category) ? e.category.filter(Boolean) : [], n = Gn(e?.id), r = String(t[1] || t[0] || "").trim(), i = String(t[2] || "").trim(), a = String(e?.name || "").replace(Rn, "").trim();
	return [
		Ln,
		n,
		i || r || a || n
	];
}
var qn = !1, Jn = null, Yn = null, Xn = !1, Zn = /* @__PURE__ */ new Set();
function Qn(e) {
	if (!e || typeof e != "object") return null;
	let t = { ...e };
	try {
		typeof t.name == "string" && (t.name = t.name.replace(Rn, "").trim());
	} catch (e) {
		console.debug?.(e);
	}
	try {
		t.category = Kn(t);
	} catch {
		t.category = [Ln, zn.GENERAL];
	}
	return !t.tooltip && typeof t.name == "string" && t.name.trim() && (t.tooltip = t.name.trim()), t;
}
function $n(e, t, n) {
	let r = String(t?.id || "").trim();
	if (!r || Zn.has(r)) return !1;
	Zn.add(r);
	try {
		return de(e, r, n);
	} finally {
		Zn.delete(r);
	}
}
function er(e, t) {
	if (!t || typeof t != "object") return t;
	let n = { ...t };
	$n(e, n, n.defaultValue);
	let r = n.onChange;
	return n.onChange = (t, ...i) => {
		if ($n(e, n, t), typeof r == "function") return r(t, ...i);
		n.defaultValue = t;
	}, n;
}
function tr(e) {
	try {
		return JSON.parse(JSON.stringify(e || {}));
	} catch {
		return { ...K };
	}
}
function nr(e, t, n, { wrapForComfy: r = !0 } = {}) {
	let i = [], a = (e) => {
		let n = Qn(e);
		n && i.push(r ? er(t, n) : n);
	};
	return nn(a, e, n), fn(a, e, n), on(a, e, n), ln(a, e, n), jn(a, e, n), Nn(a, e, n, t), In(a, e, n), i;
}
function rr(e, t) {
	if (e === t) return !0;
	try {
		return JSON.stringify(e) === JSON.stringify(t);
	} catch {
		return !1;
	}
}
function ir(e) {
	return e ? e.querySelector(".form-input") || e.querySelector(".p-inputgroup") || e.querySelector(".setting-input") || e.querySelector("[class*='input']") : null;
}
function ar(e, t) {
	let n = document.createElement("button");
	return n.type = "button", n.className = Hn, n.textContent = e, n.title = t, n.style.marginLeft = "8px", n.style.minWidth = e.length > 2 ? "auto" : "24px", n.style.height = "24px", n.style.padding = e.length > 2 ? "0 10px" : "0", n.style.borderRadius = "6px", n.style.border = "1px solid var(--border-color, #555)", n.style.background = "var(--comfy-input-bg, #2b2b2b)", n.style.color = "var(--input-text, inherit)", n.style.cursor = "pointer", n.style.fontSize = "12px", n.style.lineHeight = "22px", n.style.flexShrink = "0", n;
}
function or(e, t, n) {
	String(e?.id || "").trim() && ($n(n, e, t), typeof e?.onChange == "function" && e.onChange(t));
}
function sr(e, t, n, r) {
	let i = !rr(pe(r, t.id, t.defaultValue), n);
	e.disabled = !i, e.style.opacity = i ? "1" : "0.45";
}
function cr() {
	if (typeof document > "u" || !Wn) return;
	let { app: e, definitions: t, defaultValues: n } = Wn, r = document.querySelector(`[data-setting-id="${Vn}"]`), i = ir(r);
	if (r && i && !r.getAttribute("data-mjr-reset-injected")) {
		r.setAttribute("data-mjr-reset-injected", "true"), i.innerHTML = "";
		let a = ar("Reset all settings", "Reset all Majoor settings to defaults");
		a.onclick = (r) => {
			r.preventDefault(), r.stopPropagation();
			for (let r of t) r.id !== Vn && n.has(r.id) && or(r, n.get(r.id), e);
			cr();
		}, i.appendChild(a);
	}
	for (let r of t) {
		if (!r?.id || r.id === Vn || !n.has(r.id)) continue;
		let t = document.querySelector(`[data-setting-id="${r.id}"]`);
		if (!t || t.getAttribute("data-mjr-reset-injected")) continue;
		let i = ir(t);
		if (!i) continue;
		t.setAttribute("data-mjr-reset-injected", "true");
		let a = ar("Reset", "Reset this setting to default");
		sr(a, r, n.get(r.id), e), a.onclick = (t) => {
			t.preventDefault(), t.stopPropagation();
			let i = n.get(r.id);
			or(r, i, e), sr(a, r, i, e);
		}, i.appendChild(a);
	}
}
function lr(e, t, n) {
	typeof document > "u" || typeof MutationObserver > "u" || (Wn = {
		app: e,
		definitions: t,
		defaultValues: new Map(n.filter((e) => e?.id && e.id !== Vn).map((e) => [e.id, e.defaultValue]))
	}, cr(), !Un && (Un = new MutationObserver(() => cr()), Un.observe(document.body, {
		childList: !0,
		subtree: !0
	})));
}
function ur(e, t, { initRuntime: n = !1 } = {}) {
	if (Yn) typeof t == "function" && Yn.onAppliedListeners.add(t), e && !Yn.app && (Yn.app = e);
	else {
		let n = q();
		n.i18n = n.i18n || {}, typeof n.i18n.followComfyLanguage == "boolean" ? ye(!!n.i18n.followComfyLanguage) : (n.i18n.followComfyLanguage = !0, ye(!0), J(n));
		let r = /* @__PURE__ */ new Set();
		typeof t == "function" && r.add(t);
		let i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), o = () => {
			if (!i.size) return;
			let e = Array.from(i);
			i.clear();
			for (let t of e) ut("mjr-settings-changed", { key: t }, { warnPrefix: "[Majoor]" });
		}, s = () => {
			if (!a.size) return;
			let e = Array.from(a);
			a.clear();
			for (let t of e) ut("mjr-settings-changed", { key: t }, { warnPrefix: "[Majoor]" });
		}, c = en(o, 120), l = en(s, 450), u = (e) => {
			typeof e == "string" && i.add(e), c();
		}, d = (e) => {
			typeof e == "string" && a.add(e), l();
		}, f = () => {
			let e = q();
			Object.assign(n, e), Y(n), u("storage");
		}, p = (e) => {
			!e || e.key !== "mjrSettings" || e.newValue !== e.oldValue && f();
		};
		if (!qn) {
			if (Jn && typeof window < "u") try {
				window.removeEventListener("storage", Jn);
			} catch (e) {
				console.debug?.(e);
			}
			try {
				window.addEventListener("storage", p), qn = !0, Jn = p;
			} catch (e) {
				console.debug?.(e);
			}
		}
		Yn = {
			app: e,
			notifyApplied: (e) => {
				for (let t of r) try {
					t(n, e);
				} catch (e) {
					console.debug?.(e);
				}
				Bn.has(String(e || "")) ? d(e) : u(e);
			},
			onAppliedListeners: r,
			refreshFromStorage: f,
			settings: n
		};
	}
	if (n && !Xn) {
		let t = e || Yn.app, n = Yn.settings;
		he(t), Y(n), ge(t), Rt(), zt(), Bt(), n?.watcher && typeof n.watcher.enabled == "boolean" && b(!!n.watcher.enabled).catch(() => {}), Qt(), Xn = !0;
	}
	return Yn;
}
var dr = (e, t) => ur(e, t, { initRuntime: !0 }).settings, fr = (e, t) => {
	let n = ur(e, t, { initRuntime: !1 });
	Object.assign(n.settings, q());
	let r = e || n.app, i = nr(n.settings, r, n.notifyApplied), a = nr(tr(K), r, () => {}, { wrapForComfy: !1 });
	return i.unshift(er(r, {
		id: Vn,
		category: [
			Ln,
			zn.GENERAL,
			"Reset"
		],
		name: "Reset all settings to defaults",
		tooltip: "Reset every Majoor Assets Manager setting to its default value.",
		type: "text",
		defaultValue: ""
	})), lr(r, i, a), i;
};
try {
	let e = q();
	e?.watcher && typeof e.watcher.enabled == "boolean" && l().then((e) => {
		let t = !!e?.ok && !!e?.data?.enabled, n = q();
		n.watcher = n.watcher || {}, typeof t == "boolean" && t !== !!n.watcher.enabled && (n.watcher.enabled = t, J(n), ut("mjr-settings-changed", { key: "watcher.enabled" }, { warnPrefix: "[Majoor]" }));
	}).catch(() => {});
} catch (e) {
	console.debug?.(e);
}
//#endregion
//#region ui/features/status/AssetStatusDotTheme.ts
function pr(e) {
	return String(e || "").trim().toLowerCase();
}
function mr({ dot: e = null, asset: t = null, scope: n = "" } = {}) {
	let r = pr(n);
	if (r) return r === "custom";
	let i = pr(t?.type || t?.scope);
	if (i) return i === "custom";
	try {
		let t = pr(e?.closest?.(".mjr-grid")?.dataset?.mjrScope);
		if (t) return t === "custom";
	} catch (e) {
		console.debug?.(e);
	}
	return !1;
}
function hr(e, t = {}) {
	let n = pr(e);
	return mr(t) ? n === "pending" || n === "info" ? "var(--mjr-browser-status-info, #4DB6AC)" : n === "success" ? "var(--mjr-browser-status-success, #2E7D32)" : n === "warning" ? "var(--mjr-browser-status-warning, #FFB74D)" : n === "error" ? "var(--mjr-browser-status-error, #EF5350)" : "var(--mjr-browser-status-neutral, #90A4AE)" : n === "pending" || n === "info" ? "var(--mjr-status-info, #64B5F6)" : n === "success" ? "var(--mjr-status-success, #4CAF50)" : n === "warning" ? "var(--mjr-status-warning, #FFA726)" : n === "error" ? "var(--mjr-status-error, #f44336)" : "var(--mjr-status-neutral, #666)";
}
//#endregion
//#region ui/stores/useRuntimeStore.ts
var gr = tt("mjr-runtime", () => {
	let e = M(null), t = M(null), n = M(!1), r = M(0), i = M(null), a = M(null), o = M(null), s = M(null), c = M(null), l = M([]), u = N(() => !!i.value), d = N(() => {
		let e = s.value, t = c.value;
		return !t || t <= 0 || e == null ? 0 : Math.round(e / t * 100);
	});
	function f(t) {
		e.value = t;
	}
	function p(e) {
		t.value = e;
	}
	function m(e, t) {
		n.value = !!e, r.value = Math.max(0, Number(t || 0) || 0);
	}
	function h() {
		return {
			active: n.value,
			queueLength: r.value
		};
	}
	function g(e = {}) {
		e.active_prompt_id !== void 0 && (i.value = e.active_prompt_id), e.queue_remaining !== void 0 && (a.value = e.queue_remaining), e.progress_node !== void 0 && (o.value = e.progress_node), e.progress_value !== void 0 && (s.value = e.progress_value), e.progress_max !== void 0 && (c.value = e.progress_max), e.cached_nodes !== void 0 && (l.value = e.cached_nodes ?? []);
	}
	function _() {
		i.value = null, a.value = null, o.value = null, s.value = null, c.value = null, l.value = [];
	}
	return {
		comfyApp: e,
		comfyApi: t,
		enrichmentActive: n,
		enrichmentQueueLength: r,
		activePromptId: i,
		queueRemaining: a,
		progressNode: o,
		progressValue: s,
		progressMax: c,
		cachedNodes: l,
		isExecuting: u,
		progressPercent: d,
		setComfyApp: f,
		setComfyApi: p,
		setEnrichmentState: m,
		getEnrichmentState: h,
		applyExecutionStatus: g,
		resetExecution: _
	};
});
//#endregion
//#region ui/stores/getOptionalRuntimeStore.ts
function _r() {
	try {
		return nt() ? gr() : null;
	} catch {
		return null;
	}
}
//#endregion
//#region ui/stores/runtimeEnrichmentState.ts
var vr = Symbol.for("majoor.assets_manager.runtime_state");
function yr() {
	return {
		api: null,
		assetsDeletedHandler: null,
		enrichmentActive: !1,
		enrichmentQueueLength: 0
	};
}
function br() {
	try {
		let e = typeof globalThis < "u" ? globalThis : {};
		return (!e[vr] || typeof e[vr] != "object") && (e[vr] = yr()), e[vr];
	} catch {
		return yr();
	}
}
function xr(e, t) {
	let n = _r();
	if (n) {
		n.setEnrichmentState(e, t);
		return;
	}
	let r = br();
	r.enrichmentActive = !!e, r.enrichmentQueueLength = Math.max(0, Number(t || 0) || 0);
}
function Sr() {
	let e = _r();
	if (e) return e.getEnrichmentState();
	let t = br();
	return {
		active: !!t.enrichmentActive,
		queueLength: Math.max(0, Number(t.enrichmentQueueLength || 0) || 0)
	};
}
//#endregion
//#region ui/features/grid/AssetCardRenderer.ts
function Cr(e) {
	try {
		return String(e || "").trim().toLowerCase();
	} catch {
		return "";
	}
}
function wr(e) {
	try {
		return (String(e || "").split(".").pop() || "").toUpperCase();
	} catch {
		return "";
	}
}
function Tr(e) {
	try {
		let t = String(e || ""), n = t.lastIndexOf("."), r = n > 0 ? t.slice(0, n) : t;
		return String(r || "").trim().toLowerCase();
	} catch {
		return "";
	}
}
function Er(e) {
	try {
		if (String(e?.kind || "").toLowerCase() !== "video") return !1;
		let t = String(e?.filename || "").toLowerCase();
		return t.includes("-audio") || t.includes("_audio");
	} catch {
		return !1;
	}
}
function Dr(e) {
	try {
		let t = String(e?.kind || "").toLowerCase(), n = 0;
		Er(e) ? n = 2 : t === "video" && (n = 1);
		let r = +(Number(e?.has_generation_data || 0) > 0), i = Number(e?.size || 0), a = Number(e?.mtime || 0);
		return [
			n,
			a,
			r,
			i
		];
	} catch {
		return [
			0,
			0,
			0,
			0
		];
	}
}
function Or(e, t) {
	for (let n = 0; n < Math.max(e.length, t.length); n++) {
		let r = (e[n] || 0) - (t[n] || 0);
		if (r !== 0) return r;
	}
	return 0;
}
function kr(e) {
	if (!Array.isArray(e) || e.length === 0) return null;
	if (e.length === 1) return e[0];
	let t = e[0], n = Dr(t);
	for (let r = 1; r < e.length; r++) {
		let i = e[r], a = Dr(i);
		Or(a, n) > 0 && (t = i, n = a);
	}
	return t;
}
function Ar(e, t) {
	if (!e || !Array.isArray(t) || t.length === 0 || (Number(e?.generation_time_ms ?? e?.metadata?.generation_time_ms ?? 0) || 0) > 0) return e;
	let n = t.find((e) => (Number(e?.generation_time_ms ?? e?.metadata?.generation_time_ms ?? 0) || 0) > 0);
	if (!n) return e;
	let r = Number(n?.generation_time_ms ?? n?.metadata?.generation_time_ms ?? 0) || 0;
	return r <= 0 ? e : (e.generation_time_ms = r, !e.has_generation_data && n?.has_generation_data && (e.has_generation_data = n.has_generation_data), e);
}
function jr(e, t) {
	let n = String(e?.kind || "").toLowerCase();
	if (n) return n;
	let r = new Set([
		"PNG",
		"JPG",
		"JPEG",
		"WEBP",
		"GIF",
		"BMP",
		"TIF",
		"TIFF"
	]), i = new Set([
		"MP4",
		"WEBM",
		"MOV",
		"AVI",
		"MKV"
	]), a = new Set([
		"MP3",
		"WAV",
		"OGG",
		"FLAC"
	]), o = new Set([
		"OBJ",
		"FBX",
		"GLB",
		"GLTF",
		"STL",
		"PLY",
		"SPLAT",
		"KSPLAT",
		"SPZ"
	]);
	return r.has(t) ? "image" : i.has(t) ? "video" : a.has(t) ? "audio" : o.has(t) ? "model3d" : "unknown";
}
function Mr(e) {
	try {
		return !!e()?.siblings?.hidePngSiblings;
	} catch {
		return !1;
	}
}
function Nr(e) {
	return `${String(e?.source || e?.type || "").trim().toLowerCase()}|${String(e?.root_id || e?.custom_root_id || "").trim().toLowerCase()}|${String(e?.subfolder || "").trim().toLowerCase()}`;
}
function Pr(e) {
	let t = Cr(e?.filename);
	return t ? `${Nr(e)}|${t}` : "";
}
function Fr(e, t = wr(e?.filename || "")) {
	let n = jr(e, t), r = String(e?.filename || "").trim();
	if (!r) return "";
	let i = Nr(e);
	if (n === "model3d") return `${i}|model3d|${r.toLowerCase()}`;
	let a = Tr(r);
	return a ? `${i}|media|${a}` : "";
}
function Ir(e) {
	let t = e.nonImageSiblingKeys || /* @__PURE__ */ new Set();
	e.nonImageSiblingKeys = t;
	let n = e.stemMap || /* @__PURE__ */ new Map();
	e.stemMap = n;
	let r = e.assetIdSet || /* @__PURE__ */ new Set();
	e.assetIdSet = r;
	let i = e.seenKeys || /* @__PURE__ */ new Set();
	return e.seenKeys = i, e.hiddenPngSiblings ??= 0, {
		nonImageSiblingKeys: t,
		stemMap: n,
		assetIdSet: r,
		seenKeys: i
	};
}
function Lr(e, t, n) {
	try {
		t?.id != null && n.assetIdSet.delete(String(t.id));
	} catch (e) {
		console.debug?.(e);
	}
	try {
		let r = e?.assetKeyFn?.(t);
		r && n.seenKeys.delete(r);
	} catch (e) {
		console.debug?.(e);
	}
}
function Rr(e, t, n, r) {
	let i = n.stemMap.get(t);
	if (!i?.length) return [];
	let a = [];
	for (let e = i.length - 1; e >= 0; e--) r(i[e]) && (a.push(i[e]), i.splice(e, 1));
	return i.length || n.stemMap.delete(t), a;
}
function zr(e, t, n) {
	if (!Mr(n)) return {
		hidden: !1,
		hideEnabled: !1,
		removed: []
	};
	let r = Ir(t), i = String(e?.filename || ""), a = wr(i), o = jr(e, a), s = Fr(e, a);
	if (!s) return {
		hidden: !1,
		hideEnabled: !0,
		removed: []
	};
	if (o === "video" || o === "audio" || o === "model3d" || a === "WEBP") return r.nonImageSiblingKeys.add(s), {
		hidden: !1,
		hideEnabled: !0,
		removed: Rr(t, s, r, (e) => wr(e?.filename || "") === "PNG")
	};
	if (a === "PNG") {
		let t = `${Nr(e)}|model3d|${Tr(i)}`;
		if (r.nonImageSiblingKeys.has(s) || r.nonImageSiblingKeys.has(t)) return {
			hidden: !0,
			hideEnabled: !0,
			removed: []
		};
	}
	return {
		hidden: !1,
		hideEnabled: !0,
		removed: []
	};
}
function Br(e, t, n, r) {
	let i = Mr(r.loadMajoorSettings), a = n.filenameCounts || /* @__PURE__ */ new Map();
	n.filenameCounts = a, r.clearGridMessage(e);
	let o = r.ensureVirtualGrid(e, n);
	if (!o) return 0;
	i || (n.hiddenPngSiblings = 0), n.assetKeyFn = r.assetKey;
	let s = Ir(n), c = /* @__PURE__ */ new Map();
	for (let e of n.assets || []) {
		let t = Pr(e);
		if (!t) continue;
		let n = c.get(t);
		n || (n = [], c.set(t, n)), n.push(e);
	}
	let l = 0, u = !1, d = [], f = /* @__PURE__ */ new Set(), p = () => {
		try {
			let t = new Set((Array.isArray(n.assets) ? n.assets : []).map((e) => String(e?.id || "")).filter(Boolean));
			for (let [i, o] of c.entries()) {
				let s = (Array.isArray(o) ? o : []).filter((e) => {
					let n = String(e?.id || "");
					return n ? t.has(n) : !1;
				}), c = s.length;
				if (a.set(i, c), c < 2) {
					for (let e of s) e._mjrNameCollision = !1, delete e._mjrNameCollisionCount, delete e._mjrNameCollisionPaths, e._mjrDupStack && (e._mjrDupStack = !1, e._mjrDupMembers = null, e._mjrDupCount = 0);
					let t = n.renderedFilenameMap?.get(i);
					if (t) for (let n of t) {
						let t = n.querySelector?.(".mjr-file-badge");
						r.setFileBadgeCollision(t, !1);
						try {
							r.ensureDupStackCard?.(e, n, n._mjrAsset);
						} catch (e) {
							console.debug?.(e);
						}
					}
					continue;
				}
				let l = Ar(kr(s), s), u = s.filter((e) => e !== l);
				for (let e of s) e._mjrNameCollision = !1, delete e._mjrNameCollisionCount, delete e._mjrNameCollisionPaths, e !== l && (e._mjrDupStack = !1, e._mjrDupMembers = null, e._mjrDupCount = 0);
				let d = Array.isArray(l._mjrDupMembers) ? l._mjrDupMembers : [], f = new Set(d.map((e) => String(e?.id || ""))), p = [...d, ...s.filter((e) => !f.has(String(e?.id || "")))];
				l._mjrDupStack = !0, l._mjrDupMembers = p, l._mjrDupCount = p.length, l._mjrNameCollision = !1;
				let m = new Set(u.map((e) => String(e?.id || "")));
				m.size > 0 && (n.assets = n.assets.filter((e) => !m.has(String(e?.id || ""))));
				let h = n.renderedFilenameMap?.get(i);
				if (h) for (let t of h) {
					let n = t._mjrAsset, i = t.querySelector?.(".mjr-file-badge");
					if (n === l || String(n?.id || "") === String(l?.id || "")) {
						r.setFileBadgeCollision(i, !1);
						try {
							r.ensureDupStackCard?.(e, t, l);
						} catch (e) {
							console.debug?.(e);
						}
					}
				}
			}
		} catch (e) {
			console.debug?.(e);
		}
	};
	for (let e of t || []) {
		try {
			if (e?.id == null || String(e.id).trim() === "") {
				let t = String(e?.kind || "").toLowerCase(), n = String(e?.filepath || "").trim(), r = String(e?.subfolder || "").trim(), i = String(e?.filename || "").trim();
				e.id = `asset:${`${String(e?.type || "").trim().toLowerCase()}|${t}|${n}|${r}|${i}` || "unknown"}`;
			}
		} catch (e) {
			console.debug?.(e);
		}
		let t = wr(String(e?.filename || "")), i = zr(e, n, r.loadMajoorSettings);
		for (let e of i.removed || []) f.add(e);
		if (i.hidden) {
			n.hiddenPngSiblings += 1;
			continue;
		}
		let a = Pr(e);
		if (a) {
			let t = c.get(a);
			t || (t = [], c.set(a, t)), t.push(e);
		}
		let o = r.assetKey(e);
		if (!o || s.seenKeys.has(o) || e.id != null && s.assetIdSet.has(String(e.id))) continue;
		s.seenKeys.add(o), e.id != null && s.assetIdSet.add(String(e.id)), d.push(e);
		let u = Fr(e, t);
		if (u) {
			let t = s.stemMap.get(u);
			t || (t = [], s.stemMap.set(u, t)), t.push(e);
		}
		l++;
	}
	if (f.size > 0) {
		n.hiddenPngSiblings += f.size, n.assets = n.assets.filter((e) => !f.has(e));
		for (let e = d.length - 1; e >= 0; e--) f.has(d[e]) && (d.splice(e, 1), l = Math.max(0, l - 1));
		for (let e of f) Lr(n, e, s);
		try {
			for (let e of f) {
				let t = Pr(e);
				if (!t) continue;
				let n = c.get(t);
				if (!n) continue;
				let r = n.indexOf(e);
				r > -1 && n.splice(r, 1), n.length || c.delete(t);
			}
		} catch (e) {
			console.debug?.(e);
		}
		u = !0;
	}
	d.length > 0 && (n.assets.push(...d), u = !0), u && (p(), o.setItems(n.assets), n.sentinel && e.appendChild(n.sentinel));
	try {
		e.dataset.mjrHidePngSiblingsEnabled = i ? "1" : "0", e.dataset.mjrHiddenPngSiblings = String(Number(n.hiddenPngSiblings || 0) || 0);
	} catch (e) {
		console.debug?.(e);
	}
	return l;
}
//#endregion
//#region ui/components/Badges.ts
function Vr({ ext: e = "", filename: t = "", count: n = 0, paths: r = [] } = {}) {
	let i = String(e || "").trim(), a = String(t || "").trim(), o = Math.max(0, Number(n) || 0), s = Array.isArray(r) ? r.map((e) => String(e || "").trim()).filter(Boolean) : [];
	if (o < 2) return `${i} file`;
	let c = [`${i}+ name collision in current view (${o})`];
	if (a && c.push(`Name: ${a}`), s.length) {
		c.push("Paths:");
		for (let e of s.slice(0, 4)) c.push(`- ${e}`);
		s.length > 4 && c.push(`- ... +${s.length - 4} more`);
	}
	return c.push("Click to select collisions in current view"), c.join("\n");
}
function Hr(e, t, n = !1, r = null) {
	let i = document.createElement("div");
	i.className = "mjr-file-badge";
	let a = String(e || "").split(".").pop()?.toUpperCase?.() || "";
	try {
		i.dataset.mjrExt = a;
	} catch (e) {
		console.debug?.(e);
	}
	let o = {
		image: "--mjr-badge-image",
		video: "--mjr-badge-video",
		audio: "--mjr-badge-audio",
		model3d: "--mjr-badge-model3d"
	}[jr({ kind: t }, a)], s = o ? `var(${o}, #607D8B)` : "#607D8B", c = n ? "var(--mjr-badge-duplicate-alert, #ff1744)" : s;
	i.textContent = a + (n ? "+" : ""), i.title = n ? Vr({
		ext: a,
		filename: e,
		count: r?.count,
		paths: r?.paths
	}) : `${a} file`, i.style.cssText = `
        position: absolute;
        top: 6px;
        left: 6px;
        padding: 3px 8px;
        border-radius: 4px;
        font-size: 10px;
        font-weight: 700;
        background: ${c};
        opacity: 0.85;
        color: white;
        text-transform: uppercase;
        pointer-events: auto;
        z-index: 10;
        letter-spacing: 0.5px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        cursor: ${n ? "pointer" : "default"};
    `;
	try {
		i.dataset.mjrBadgeBg = s;
	} catch (e) {
		console.debug?.(e);
	}
	return i;
}
function Ur(e, t, n = null) {
	if (e) try {
		let r = e.dataset?.mjrExt || "", i = e.dataset?.mjrBadgeBg || "var(--mjr-badge-image, #607D8B)";
		e.textContent = String(r || "") + (t ? "+" : ""), e.title = t ? Vr({
			ext: r,
			filename: n?.filename || "",
			count: n?.count,
			paths: n?.paths
		}) : `${r} file`, e.style.background = t ? "var(--mjr-badge-duplicate-alert, #ff1744)" : i, e.style.cursor = t ? "pointer" : "default";
	} catch (e) {
		console.debug?.(e);
	}
}
function Wr(e) {
	return e === !0 ? !0 : e === !1 ? !1 : e === 1 || e === "1" ? !0 : e === 0 || e === "0" ? !1 : null;
}
function Gr(e, t = []) {
	if (!e || typeof e != "object") return null;
	for (let n of t) if (e[n] != null) return e[n];
	return null;
}
function Kr(e) {
	return typeof e == "string" && e.trim().length > 0;
}
function qr(e) {
	if (Array.isArray(e)) return e.some((e) => String(e ?? "").trim().length > 0);
	if (e && typeof e == "object") return Object.keys(e).length > 0;
	if (typeof e != "string") return !1;
	let t = e.trim();
	if (!t || t === "[]" || t === "[ ]" || /^(null|none)$/i.test(t)) return !1;
	if (t.startsWith("[") && t.endsWith("]") || t.startsWith("{") && t.endsWith("}")) try {
		let e = JSON.parse(t);
		return Array.isArray(e) ? e.some((e) => String(e ?? "").trim().length > 0) : e && typeof e == "object" ? Object.keys(e).length > 0 : !!e;
	} catch (e) {
		console.debug?.(e);
	}
	return !0;
}
function Jr(e) {
	let t = Gr(e, [
		"auto_tags",
		"autoTags",
		"ai_auto_tags",
		"aiAutoTags",
		"suggested_tags",
		"suggestedTags"
	]), n = Gr(e, [
		"enhanced_caption",
		"enhancedCaption",
		"enhanced_prompt",
		"enhancedPrompt",
		"ai_enhanced_prompt",
		"aiEnhancedPrompt"
	]), r = Wr(Gr(e, [
		"has_ai_auto_tags",
		"hasAiAutoTags",
		"ai_has_auto_tags",
		"aiHasAutoTags"
	])), i = Wr(Gr(e, [
		"has_ai_enhanced_caption",
		"hasAiEnhancedCaption",
		"ai_has_enhanced_caption",
		"aiHasEnhancedCaption"
	])), a = Wr(Gr(e, [
		"has_ai_vector",
		"hasAiVector",
		"has_vector_embedding",
		"hasVectorEmbedding",
		"vector_indexed",
		"vectorIndexed"
	])), o = Wr(Gr(e, [
		"has_ai_info",
		"hasAiInfo",
		"ai_indexed",
		"aiIndexed"
	])), s = r === !0 || r === null && qr(t), c = i === !0 || i === null && Kr(n), l = a === !0 || o === !0;
	return {
		hasAiInfo: o === !0 || s || c || l,
		hasAutoTags: s,
		hasEnhancedPrompt: c,
		hasVectorIndexed: l
	};
}
function Yr(e) {
	let t = document.createElement("span");
	t.className = "mjr-workflow-dot mjr-asset-status-dot";
	let n = Wr(e?.has_workflow ?? e?.hasWorkflow), r = Wr(e?.has_generation_data ?? e?.hasGenerationData), i = Sr(), a = i.queueLength, o = i.active || a > 0, s = "Pending: parsing metadata...", c = n === !0 || r === !0, l = n === !1 || r === !1, u = n === null || r === null;
	n === !0 && r === !0 ? s = "Complete: workflow + generation data detected" : c ? s = n === !0 ? "Partial: workflow only (generation data missing)" : "Partial: generation data only (workflow missing)" : l && !c && !u ? s = "None: no workflow or generation data found" : u && (s = "Pending: metadata not parsed yet");
	let d = u ? "pending" : n === !0 && r === !0 ? "success" : c ? "warning" : "error";
	o && d !== "success" && (d = "pending", s = a > 0 ? `Pending: database metadata enrichment in progress (${a} queued)` : "Pending: database metadata enrichment in progress"), Xr(t, d, s, { asset: e });
	let f = Jr(e);
	if (f.hasAiInfo) {
		let e = [];
		f.hasVectorIndexed && e.push("vector indexed"), f.hasAutoTags && e.push("AI tag suggestions"), f.hasEnhancedPrompt && e.push("enhanced prompt"), t.textContent = "";
		let n = document.createElement("i");
		n.className = "pi pi-sparkles", n.setAttribute("aria-hidden", "true"), n.style.fontSize = "11px", n.style.lineHeight = "1", t.appendChild(n);
		try {
			t.dataset.mjrAi = "1";
		} catch (e) {
			console.debug?.(e);
		}
		t.title = `${s}\nAI: ${e.length ? e.join(", ") : "indexed"}\nClick to rescan this file`;
	} else {
		try {
			t.dataset.mjrAi = "0";
		} catch (e) {
			console.debug?.(e);
		}
		t.textContent = "●", t.title = `${s}\nClick to rescan this file`;
	}
	return t;
}
function Xr(e, t, n = "", r = {}) {
	if (!e) return;
	let i = String(t || "").toLowerCase(), a = hr(i, {
		dot: e,
		...r || {}
	});
	try {
		e.dataset.mjrStatus = i || "neutral";
	} catch (e) {
		console.debug?.(e);
	}
	if (e.style.cssText = `
        color: ${a};
        margin-left: 4px;
        font-size: 12px;
        line-height: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: color 0.25s ease, opacity 0.25s ease;
    `, n) try {
		e.title = String(n);
	} catch (e) {
		console.debug?.(e);
	}
}
function Zr(e) {
	let t = Math.max(0, Math.min(5, Number(e) || 0));
	if (t <= 0) return null;
	let n = document.createElement("div");
	n.className = "mjr-rating-badge", n.title = `Rating: ${t} star${t > 1 ? "s" : ""}`, n.style.cssText = "\n        position: absolute;\n        top: 6px;\n        right: 6px;\n        background: rgba(0, 0, 0, 0.55);\n        border: 1px solid rgba(255, 255, 255, 0.12);\n        padding: 2px 6px;\n        border-radius: 6px;\n        font-size: 13px;\n        letter-spacing: 1px;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        pointer-events: none;\n        z-index: 10;\n        text-shadow: 0 2px 6px rgba(0,0,0,0.6);\n        box-shadow: 0 6px 18px rgba(0,0,0,0.25);\n    ";
	for (let e = 1; e <= t; e++) {
		let r = document.createElement("span");
		r.textContent = "★", r.style.color = "var(--mjr-rating-color, var(--mjr-star-active, #FFD45A))", r.style.marginRight = e < t ? "2px" : "0", n.appendChild(r);
	}
	return n;
}
function Qr(e) {
	if (Array.isArray(e)) return e.map((e) => String(e ?? "").trim()).filter(Boolean);
	if (typeof e == "string") {
		let t = e.trim();
		if (!t) return [];
		try {
			let e = JSON.parse(t);
			if (Array.isArray(e)) return e.map((e) => String(e ?? "").trim()).filter(Boolean);
		} catch {}
		return t.split(",").map((e) => e.trim()).filter(Boolean);
	}
	return [];
}
function $r(e) {
	let t = Number(e) / 1e3;
	return t >= 60 ? "#FF9800" : t >= 30 ? "#FFC107" : t >= 10 ? "#8BC34A" : "#4CAF50";
}
function ei(e) {
	let t = e / 1e3;
	if (t >= 60) {
		let e = (t / 60).toFixed(1);
		return {
			text: `${e}m`,
			title: `Generation time: ${e} minutes (${t.toFixed(1)}s)`
		};
	}
	let n = t.toFixed(1);
	return {
		text: `${n}s`,
		title: `Generation time: ${n} seconds`
	};
}
function ti(e, { maxMs: t = 864e5 } = {}) {
	let n;
	if (e == null) return 0;
	if (typeof e == "string") {
		let t = e.trim().toLowerCase();
		if (!t) return 0;
		let r = t.match(/^(-?\d+(?:[.,]\d+)?)\s*(s|sec|secs|second|seconds)$/i);
		if (r) n = Number(r[1].replace(",", ".")) * 1e3;
		else {
			let e = t.match(/^(-?\d+(?:[.,]\d+)?)\s*(ms|msec|millisecond|milliseconds)$/i);
			n = Number(e ? e[1].replace(",", ".") : t.replace(",", "."));
		}
	} else n = Number(e);
	return !Number.isFinite(n) || n <= 0 || n >= Number(t) ? 0 : n;
}
function ni(e) {
	let t = document.createElement("div");
	t.className = "mjr-tags-badge";
	let n = Qr(e);
	return n.length === 0 ? (t.style.display = "none", t) : (t.textContent = n.join(", "), t.title = `Tags: ${n.join(", ")}`, t.style.cssText = "\n        position: absolute;\n        bottom: 6px;\n        left: 6px;\n        padding: 3px 6px;\n        border-radius: 4px;\n        background: rgba(0,0,0,0.8);\n        color: var(--mjr-tag-color, #90CAF9);\n        font-size: 9px;\n        max-width: 80%;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n        pointer-events: none;\n        z-index: 10;\n        box-shadow: 0 2px 4px rgba(0,0,0,0.3);\n    ", t);
}
//#endregion
//#region ui/utils/safeCall.ts
var ri = () => {};
function ii(e) {
	try {
		return !!j?.[e];
	} catch {
		return !1;
	}
}
function ai(e, t) {
	try {
		console.warn(`[Majoor] ${e}`, t);
	} catch (e) {
		console.debug?.(e);
	}
}
function oi(e, t = "safeCall") {
	try {
		return e?.();
	} catch (e) {
		ii("DEBUG_SAFE_CALL") && ai(t, e);
		return;
	}
}
function si(e, t, n, r, i = "safeAddListener") {
	try {
		return e?.addEventListener?.(t, n, r), () => {
			try {
				e?.removeEventListener?.(t, n, r);
			} catch (e) {
				ii("DEBUG_SAFE_LISTENERS") && ai(`${i}:remove:${String(t || "")}`, e);
			}
		};
	} catch (e) {
		return ii("DEBUG_SAFE_LISTENERS") && ai(`${i}:add:${String(t || "")}`, e), ri;
	}
}
//#endregion
//#region ui/utils/mediaFps.ts
function ci(e) {
	try {
		let t = Number(e);
		if (Number.isFinite(t) && t > 0) return t;
		let n = String(e || "").trim();
		if (!n) return null;
		if (n.includes("/")) {
			let [e, t] = n.split("/"), r = Number(e), i = Number(t);
			if (Number.isFinite(r) && Number.isFinite(i) && i !== 0) {
				let e = r / i;
				return Number.isFinite(e) && e > 0 ? e : null;
			}
		}
		let r = Number.parseFloat(n);
		return Number.isFinite(r) && r > 0 ? r : null;
	} catch {
		return null;
	}
}
function li(e) {
	try {
		let t = e, n = t.metadata_raw || {}, r = (n.raw_ffprobe || {}).video_stream || {};
		return ci(t.fps) ?? ci(n.fps) ?? ci(n.frame_rate) ?? ci(r.avg_frame_rate) ?? ci(r.r_frame_rate);
	} catch {
		return null;
	}
}
function ui(e, t) {
	try {
		let n = e, r = n.metadata_raw || {}, i = (r.raw_ffprobe || {}).video_stream || {}, a = Number(n.frame_count) || Number(r.frame_count) || Number(r.frames) || Number(i.nb_frames) || Number(i.nb_read_frames) || 0;
		if (Number.isFinite(a) && a > 0) return Math.floor(a);
		let o = Number(n.duration ?? r.duration ?? i.duration);
		if (Number.isFinite(o) && o > 0 && t != null && Number.isFinite(t) && t > 0) return Math.max(1, Math.round(o * t));
	} catch (e) {
		console.debug?.(e);
	}
	return null;
}
function di(e) {
	let t = Number(e);
	return !Number.isFinite(t) || t <= 0 ? "" : Math.abs(t - Math.round(t)) < .001 ? `${Math.round(t)} fps` : `${t.toFixed(3).replace(/\.?0+$/, "")} fps`;
}
function fi(e, t = 30) {
	let n = ci(e);
	if (n != null) return Math.max(1, Math.round(n * 1e3) / 1e3);
	let r = ci(t);
	return r == null ? 30 : Math.max(1, Math.round(r * 1e3) / 1e3);
}
//#endregion
//#region ui/vue/majoorPrimeVue.ts
var pi = {
	Button: Le,
	Checkbox: Qe,
	InputText: Ue,
	Select: Xe,
	ToggleButton: Ke,
	Badge: Re,
	Tag: Pe,
	Dialog: Ve,
	Menu: Ye,
	Listbox: Ge,
	Tree: Ze,
	VirtualScroller: Ie
};
function mi(e) {
	return e.use(Be, {
		ripple: !1,
		unstyled: !0,
		zIndex: { overlay: 10100 }
	}), e.use(We), e.use(Je), Object.entries(pi).forEach(([t, n]) => {
		e.component(`M${t}`, n);
	}), e;
}
//#endregion
//#region ui/vue/createVueApp.ts
function hi(e, t = void 0) {
	let n = rt(), r = ze(e, t);
	return r.use(n), mi(r), {
		app: r,
		pinia: n
	};
}
var gi = /* @__PURE__ */ new Map();
function _i(e, t, n) {
	try {
		window.dispatchEvent(new CustomEvent("mjr:keepalive-attached", { detail: {
			mountKey: String(e || "_mjrVueApp"),
			host: t || null,
			container: n || null
		} }));
	} catch {}
}
function vi(e) {
	let t = document.createElement("div");
	return t.dataset.mjrKeepAliveHost = String(e || "_mjrVueApp"), t.style.height = "100%", t.style.width = "100%", t.style.minHeight = "0", t.style.display = "flex", t.style.flexDirection = "column", t.style.overflow = "hidden", t;
}
function yi(e, t) {
	!e || !t || (e.style.height = "100%", e.style.minHeight = "0", e.style.display = "flex", e.style.flexDirection = "column", e.style.overflow = "hidden", !(e.firstChild === t && e.childNodes.length === 1) && (e.replaceChildren(t), _i(t?.dataset?.mjrKeepAliveHost, t, e)));
}
function bi(e, t, n = "_mjrVueApp") {
	if (!e) return !1;
	let r = gi.get(n), i = !1;
	if (!r) {
		let e = vi(n), { app: a } = hi(t);
		a.mount(e), r = {
			app: a,
			host: e,
			container: null
		}, gi.set(n, r), i = !0;
	}
	return yi(e, r.host), r.container = e, i;
}
function xi(e, t = "_mjrVueApp") {
	let n = gi.get(t);
	if (n?.app) {
		try {
			n.app.unmount();
		} catch {}
		try {
			n.host?.remove?.();
		} catch {}
		gi.delete(t);
	}
}
//#endregion
//#region ui/utils/format.ts
function Si(e) {
	if (!e) return null;
	let t = Number(e);
	if (!isNaN(t)) return /* @__PURE__ */ new Date(t * 1e3);
	let n = new Date(e);
	return isNaN(n.getTime()) ? null : n;
}
function Ci(e) {
	let t = Si(e);
	return t ? `${t.getDate().toString().padStart(2, "0")}/${(t.getMonth() + 1).toString().padStart(2, "0")}` : "";
}
function wi(e) {
	let t = Si(e);
	return t ? `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}` : "";
}
function Ti(e) {
	return e ? e < 60 ? `${Math.round(e)}s` : `${Math.floor(e / 60)}m ${Math.round(e % 60)}s` : "";
}
//#endregion
//#region ui/vue/components/panel/sidebar/SidebarFileInfoSection.vue
var Ei = {
	key: 0,
	class: "mjr-sidebar-section",
	style: {
		background: "rgba(255, 255, 255, 0.03)",
		border: "1px solid var(--mjr-border, rgba(255, 255, 255, 0.12))",
		"border-radius": "8px",
		padding: "10px"
	}
}, Di = { style: {
	display: "flex",
	"flex-direction": "column",
	gap: "6px"
} }, Oi = ["title"], ki = ["title"], Ai = {
	__name: "SidebarFileInfoSection",
	props: { asset: {
		type: Object,
		required: !0
	} },
	setup(e) {
		let t = e;
		function n(e) {
			if (!e || e <= 0) return "0 B";
			let t = [
				"B",
				"KB",
				"MB",
				"GB"
			], n = 0, r = e;
			for (; r >= 1024 && n < t.length - 1;) r /= 1024, n += 1;
			return `${r.toFixed(+(n > 0))} ${t[n]}`;
		}
		function r(e) {
			try {
				if (String(e?.kind || "").toLowerCase() === "video") return !0;
				let t = String(e?.filename || e?.filepath || e?.path || "").toLowerCase();
				return /\.(gif|webp|webm)$/.test(t);
			} catch {
				return !1;
			}
		}
		function i(e, t) {
			let n = e?.[t] ?? e?.file_info?.[t];
			return n != null && n !== "" ? n : t === "workflow_id" ? e?.user_metadata?.workflow?.id ?? e?.metadata?.workflow_id ?? "" : "";
		}
		let a = N(() => {
			let e = t.asset || {}, a = [];
			if (e.width && e.height && a.push({
				label: "Dimensions",
				value: `${e.width} x ${e.height}`,
				tooltip: "Image/video resolution in pixels"
			}), e.duration && e.duration > 0 && a.push({
				label: "Duration",
				value: Ti(e.duration),
				tooltip: "Video duration"
			}), r(e)) {
				let t = li(e);
				t != null && a.push({
					label: "FPS",
					value: di(t),
					tooltip: "Native frame rate"
				});
				let n = ui(e, t);
				n != null && a.push({
					label: "Length",
					value: `${Math.max(0, Math.floor(n))} frames`,
					tooltip: "Total frame count"
				});
			}
			let o = ti(e.generation_time_ms ?? e.metadata?.generation_time_ms ?? 0);
			o > 0 && a.push({
				label: "Generation Time",
				value: `${(Number(o) / 1e3).toFixed(1)}s`,
				tooltip: "Time taken to generate this asset (workflow execution time)",
				valueStyle: `color: ${$r(o)}; font-weight: 600;`
			});
			let s = e.generation_time || e.file_creation_time || e.mtime || e.created_at;
			if (s) {
				let e = Ci(s), t = wi(s);
				e && a.push({
					label: "Date",
					value: e,
					tooltip: "File creation/generation date"
				}), t && a.push({
					label: "Time",
					value: t,
					tooltip: "File creation/generation time"
				});
			}
			e.size && e.size > 0 && a.push({
				label: "File Size",
				value: n(e.size),
				tooltip: "File size on disk"
			}), e.id != null && a.push({
				label: "Asset ID",
				value: String(e.id),
				tooltip: "Internal database asset identifier"
			});
			let c = String(i(e, "job_id") || "").trim();
			c && a.push({
				label: "Job ID",
				value: c,
				tooltip: "Workflow execution job identifier (prompt_id)"
			});
			let l = String(i(e, "source_node_id") || "").trim();
			l && a.push({
				label: "Source Node",
				value: l,
				tooltip: "ComfyUI node id that produced this file"
			});
			let u = String(i(e, "source_node_type") || "").trim();
			u && a.push({
				label: "Node Type",
				value: u,
				tooltip: "ComfyUI node class that produced this file"
			});
			let d = String(i(e, "workflow_id") || "").trim();
			return d && a.push({
				label: "Workflow ID",
				value: d,
				tooltip: "ComfyUI workflow identifier (from workflow.id in extra_data)"
			}), a;
		});
		return (e, t) => a.value.length ? (I(), P("div", Ei, [t[0] ||= B("div", { style: {
			"font-size": "12px",
			"font-weight": "700",
			color: "#607d8b",
			"margin-bottom": "8px",
			"text-transform": "uppercase",
			"letter-spacing": "0.4px"
		} }, " File Info ", -1), B("div", Di, [(I(!0), P(V, null, H(a.value, (e) => (I(), P("div", {
			key: e.label,
			style: {
				display: "flex",
				gap: "10px",
				"align-items": "flex-start",
				"justify-content": "space-between"
			}
		}, [B("div", {
			title: e.tooltip || "",
			style: {
				"font-size": "12px",
				opacity: "0.68",
				"min-width": "92px"
			}
		}, R(e.label), 9, Oi), B("div", {
			style: z(e.valueStyle || "font-size: 12px; text-align: right; word-break: break-word"),
			title: String(e.value || "")
		}, R(e.value), 13, ki)]))), 128))])])) : F("", !0);
	}
}, ji = new Set([
	"png",
	"jpg",
	"jpeg",
	"webp",
	"gif",
	"bmp",
	"tiff",
	"tif",
	"avif",
	"heic",
	"heif",
	"apng",
	"hdr",
	"svg"
]);
function Mi(e) {
	let t = String(e?.filename || e?.name || e?.filepath || e?.path || "").trim().toLowerCase();
	return !t || !t.includes(".") ? "" : t.split(".").pop() || "";
}
function Ni(e) {
	return String(e?.kind || "").trim().toLowerCase() === "image" || String(e?.mime || e?.mimetype || "").trim().toLowerCase().startsWith("image/") ? !0 : ji.has(Mi(e));
}
function Pi(e) {
	let t = Mi(e);
	return t === "jpg" || t === "jpeg";
}
function Fi() {
	try {
		return !!(q()?.ai?.vectorSearchEnabled ?? !0);
	} catch {
		return !0;
	}
}
function Ii(e) {
	return e >= .75 ? "#4CAF50" : e >= .5 ? "#8BC34A" : e >= .3 ? "#FF9800" : "#F44336";
}
function Li(e) {
	return e >= .85 ? "Excellent" : e >= .7 ? "Good" : e >= .5 ? "Fair" : e >= .3 ? "Low" : "Very Low";
}
function Ri(e) {
	let t = String(e || "").trim();
	if (!t) return "";
	let n = [];
	for (let e of t.replace(/\r\n/g, "\n").split("\n")) {
		let t = String(e || "").trim();
		t && (/^title\s*:/i.test(t) || (/^caption\s*:/i.test(t) && (t = t.replace(/^caption\s*:/i, "").trim()), t && n.push(t)));
	}
	return (n.length ? n.join(" ") : t).replace(/\s+/g, " ").replace(/:{2,}\s*$/, "").trim();
}
function zi(e) {
	let t = String(e?.filename || "").trim();
	if (!t) return [];
	let n = String(e?.subfolder || "").trim(), r = String(e?.folder_type || "input").trim().toLowerCase(), i = [], a = (e) => {
		if (!e) return;
		let r = be(t, n, e);
		r && !i.includes(r) && i.push(r);
	};
	return (r === "input" || r === "output") && a(r), a("input"), a("output"), i;
}
function Bi(e) {
	let t = String(e || "").trim();
	if (!t) return !1;
	if (t.startsWith("/")) return !0;
	try {
		let e = new URL(t);
		return e.protocol === "http:" || e.protocol === "https:";
	} catch {
		return !1;
	}
}
function Q(e) {
	return e == null || e === "" ? "-" : String(e);
}
function Vi(e, t) {
	let n = String(e?.pass_stage || e?.stage || e?.kind || "").trim().toLowerCase();
	if (n === "txt2img" || n === "text_to_image" || n === "text-to-image") return k("sidebar.generation.stageTextToImage", "Text-to-Image");
	if (n === "img2img" || n === "image_to_image" || n === "image-to-image") return k("sidebar.generation.stageImageToImage", "Image-to-Image");
	if (n === "inpaint" || n === "inpainting") return k("sidebar.generation.stageInpaint", "Inpaint");
	if (n === "upscale" || n === "upscaling") return k("sidebar.generation.stageUpscale", "Upscale");
	if (n === "refine" || n === "refiner") return k("sidebar.generation.stageRefine", "Refine");
	let r = String(e?.pass_name || "").trim();
	if (r && r.toLowerCase() !== "base") return r;
	let i = Number(e?.denoise);
	return t === 0 || i === 1 ? k("sidebar.generation.stageBase", "Base") : Number.isFinite(i) && i < 1 ? k("sidebar.generation.stageRefineUpscale", "Refine / Upscale") : k("sidebar.generation.stagePassN", "Pass {n}", { n: t + 1 });
}
function Hi(e) {
	return e?.geninfo && typeof e.geninfo == "object" ? { geninfo: e.geninfo } : e?.metadata && (typeof e.metadata == "object" || typeof e.metadata == "string") ? e.metadata : e?.prompt && (typeof e.prompt == "object" || typeof e.prompt == "string") ? e.prompt : e?.metadata_raw ? e.metadata_raw : e?.exif ? e.exif : null;
}
function Ui(e) {
	try {
		if (!e || typeof e != "object") return !1;
		if (e.is_override || typeof e.workflow_notes == "string" && e.workflow_notes.trim() || typeof e.notes == "string" && e.notes.trim() || Array.isArray(e.custom_info) && e.custom_info.length > 0 || e.engine && typeof e.engine == "object" && e.engine.type || st(e.prompt) || typeof (e.negative_prompt || e.negativePrompt) == "string" && st(e.negative_prompt || e.negativePrompt) || e.models || e.model || e.checkpoint || e.loras || e.sampler || e.sampler_name || e.steps || e.cfg || e.cfg_scale || e.cfg_high_noise || e.cfg_low_noise || e.scheduler || Array.isArray(e.chained_passes) && e.chained_passes.length > 0 || Array.isArray(e.all_samplers) && e.all_samplers.length > 0 || e.seed || e.denoise || e.denoising || e.clip_skip || e.voice || e.language || e.temperature || e.top_k || e.top_p || e.repetition_penalty || e.max_new_tokens || e.device || e.voice_preset || e.instruct || e.dtype || e.attn_implementation || e.enable_chunking !== void 0 || e.max_chars_per_chunk || e.chunk_combination_method || e.silence_between_chunks_ms || e.enable_audio_cache !== void 0 || e.batch_size !== void 0 || e.use_torch_compile !== void 0 || e.use_cuda_graphs !== void 0 || e.compile_mode || typeof e.lyrics == "string" && e.lyrics.trim()) return !0;
	} catch {
		return !1;
	}
	return !1;
}
function Wi(e) {
	return e ? typeof e == "string" ? ct(e) : typeof e == "object" ? ct(e.name || e.value || "") : "" : "";
}
function Gi(e, t, n, r) {
	let i = String(r || "").trim();
	if (!i) return;
	let a = `${n}::${i}`;
	t.has(a) || (t.add(a), e.push({
		label: n,
		value: i
	}));
}
function Ki(e) {
	let t = `${String(e?.source || "").toLowerCase()} ${String(e?.name || e?.lora_name || "").toLowerCase()}`;
	return t.includes("high_noise") || t.includes("high noise") ? "high_noise" : t.includes("low_noise") || t.includes("low noise") ? "low_noise" : "";
}
function qi(e) {
	let t = [], n = Array.isArray(e.model_groups) ? e.model_groups : [];
	if (n.length) return n.forEach((e) => {
		if (!e || typeof e != "object") return;
		let n = Wi(e.model), r = Array.isArray(e.loras) ? e.loras.map((e) => ot(e)).filter(Boolean) : [];
		!n && !r.length || t.push({
			key: String(e.key || "").trim() || `group-${t.length + 1}`,
			label: String(e.label || "").trim() || `Group ${t.length + 1}`,
			model: n,
			loras: r
		});
	}), t;
	let r = e.models && typeof e.models == "object" ? e.models : null, i = Array.isArray(e.loras) ? e.loras : [];
	return r && [{
		key: "high_noise",
		label: k("sidebar.generation.highNoise", "High Noise"),
		model: Wi(r.unet_high_noise)
	}, {
		key: "low_noise",
		label: k("sidebar.generation.lowNoise", "Low Noise"),
		model: Wi(r.unet_low_noise)
	}].forEach((e) => {
		let n = i.filter((t) => Ki(t) === e.key).map((e) => ot(e)).filter(Boolean);
		!e.model && !n.length || t.push({
			...e,
			loras: n
		});
	}), t;
}
function Ji(e, t) {
	return t == null ? null : {
		label: e,
		value: t ? k("state.on", "on") : k("state.off", "off")
	};
}
function Yi(e) {
	return e != null && String(e).trim() !== "";
}
function Xi(e) {
	return new Set(Array.isArray(e.override_fields) ? e.override_fields.map((e) => String(e || "").trim()).filter(Boolean) : []);
}
function $(e, ...t) {
	return t.some((t) => e.has(t));
}
function Zi(e) {
	return Array.isArray(e) ? e.filter((e) => e && typeof e == "object").map((e, t) => ({
		title: String(e.title || k("sidebar.generation.customInfoN", "Custom Info {n}", { n: t + 1 })).trim(),
		content: String(e.content ?? e.value ?? "").trim(),
		color: /^#[0-9a-fA-F]{6}$/.test(String(e.color || "").trim()) ? String(e.color).trim() : "#2196F3"
	})).filter((e) => e.content) : [];
}
function Qi(e) {
	let t = at(Hi(e)), n = {
		kind: "empty",
		title: k("sidebar.generation.title", "Generation"),
		workflowType: "",
		workflowLabel: "",
		workflowBadge: "",
		isTruncated: !1,
		positivePrompt: "",
		negativePrompt: "",
		positivePromptOverride: !1,
		negativePromptOverride: !1,
		promptTabs: [],
		mediaOnlyMessage: "",
		showAlignment: !1,
		captionLabel: k("sidebar.generation.imageDescription", "Image Description"),
		emptyCaptionText: k("sidebar.generation.noImageDescription", "No image description yet."),
		isImageAsset: Ni(e),
		lyrics: "",
		modelFields: [],
		modelGroups: [],
		pipelineTabs: [],
		samplingFields: [],
		ttsFields: [],
		ttsEngineFields: [],
		ttsInstruction: "",
		ttsRuntimeFields: [],
		audioFields: [],
		seed: null,
		imageFields: [],
		inputFiles: [],
		isOverride: !1,
		overrideLabel: "",
		notesFields: [],
		customInfoBlocks: []
	};
	if (!t || typeof t == "object" && Object.keys(t).length === 0 || !Ui(t)) {
		let t = e?.metadata_raw?.geninfo_status || e?.geninfo_status;
		return t && typeof t == "object" && t.kind === "media_pipeline" ? {
			...n,
			kind: "media-only",
			mediaOnlyMessage: k("sidebar.generation.mediaOnlyPipeline", "This file looks like a media-only pipeline (e.g. LoadVideo/VideoCombine) and does not contain generation parameters.")
		} : Ni(e) || Pi(e) ? {
			...n,
			kind: "caption-only",
			showAlignment: !1
		} : n;
	}
	let r = t, i = Xi(r), a = r.engine && typeof r.engine == "object" ? r.engine : null, o = !!(r.is_override || a?.mode === "override" || a?.parser_version === "geninfo-override-v1" || a?.source === "majoor_geninfo"), s = lt(r), c = it(typeof r.prompt == "string" ? r.prompt : null, typeof (r.negative_prompt || r.negativePrompt) == "string" ? r.negative_prompt || r.negativePrompt : null), l = Array.isArray(r.all_positive_prompts) && r.all_positive_prompts.length > 1 ? r.all_positive_prompts.map((e, t) => {
		let n = it(typeof e == "string" ? e : "", typeof r.all_negative_prompts?.[t] == "string" ? r.all_negative_prompts[t] : "");
		return {
			label: k("sidebar.generation.promptN", "Prompt {n}", { n: t + 1 }),
			positive: st(n.positive),
			negative: st(n.negative)
		};
	}).filter((e) => e.positive) : [], u = [], d = /* @__PURE__ */ new Set(), f = r.models && typeof r.models == "object" ? r.models : null, p = qi(r), m = new Set(p.map((e) => String(e.model || "").trim()).filter(Boolean)), h = Array.isArray(r.all_checkpoints) && r.all_checkpoints.length > 1 ? r.all_checkpoints : null;
	if (f) {
		let e = new Set([
			Wi(f.unet_high_noise),
			Wi(f.unet_low_noise),
			...m
		].filter(Boolean));
		if (h) h.forEach((e, t) => {
			let n = Wi(e);
			Gi(u, d, k("sidebar.generation.checkpointN", "Checkpoint {n}", { n: t + 1 }), n);
		});
		else {
			let t = Wi(f.checkpoint);
			t && !e.has(t) && Gi(u, d, k("sidebar.generation.checkpoint", "Checkpoint"), t);
		}
		[
			["UNet", Wi(f.unet)],
			["Diffusion", Wi(f.diffusion)],
			[k("sidebar.generation.upscaler", "Upscaler"), Wi(f.upscaler)],
			["CLIP", Wi(f.clip)],
			["VAE", Wi(f.vae)]
		].forEach(([t, n]) => {
			e.has(n) || Gi(u, d, t, n);
		});
	} else (r.model || r.checkpoint) && Gi(u, d, k("sidebar.generation.model", "Model"), ct(r.model || r.checkpoint));
	if (Array.isArray(r.loras) && r.loras.length > 0) {
		let e = r.loras.map((e) => ot(e)).filter(Boolean).join("\n");
		e && Gi(u, d, r.loras.length > 1 ? k("sidebar.generation.loras", "LoRAs") : "LoRA", e);
	}
	!f && r.clip && Gi(u, d, "CLIP", ct(r.clip)), !f && r.vae && Gi(u, d, "VAE", ct(r.vae)), !f && r.unet && Gi(u, d, "UNet", ct(r.unet)), !f && r.diffusion && Gi(u, d, "Diffusion", ct(r.diffusion)), f && r.clip && Gi(u, d, "CLIP", ct(r.clip)), f && r.vae && Gi(u, d, "VAE", ct(r.vae));
	for (let e of u) {
		let t = String(e.label || "").toLowerCase();
		(t.includes("checkpoint") || t === "model") && (e.override = $(i, "checkpoint", "model")), t === "clip" && (e.override = $(i, "clip")), t === "vae" && (e.override = $(i, "vae")), t.includes("lora") && (e.override = $(i, "loras"));
	}
	let g = [];
	Yi(r.seed) && g.push({
		label: k("sidebar.generation.seed", "Seed"),
		value: r.seed,
		override: $(i, "seed")
	}), (r.sampler || r.sampler_name) && g.push({
		label: k("sidebar.generation.sampler", "Sampler"),
		value: r.sampler || r.sampler_name,
		override: $(i, "sampler", "sampler_name")
	}), Yi(r.steps) && g.push({
		label: k("sidebar.generation.steps", "Steps"),
		value: r.steps,
		override: $(i, "steps")
	});
	let _ = Yi(r.cfg) ? r.cfg : r.cfg_scale;
	Yi(_) && g.push({
		label: k("sidebar.generation.cfgScale", "CFG Scale"),
		value: _,
		override: $(i, "cfg", "cfg_scale")
	}), r.cfg_high_noise !== void 0 && r.cfg_high_noise !== null && g.push({
		label: k("sidebar.generation.cfgHighNoise", "CFG High Noise"),
		value: r.cfg_high_noise
	}), r.cfg_low_noise !== void 0 && r.cfg_low_noise !== null && g.push({
		label: k("sidebar.generation.cfgLowNoise", "CFG Low Noise"),
		value: r.cfg_low_noise
	}), r.scheduler && g.push({
		label: k("sidebar.generation.scheduler", "Scheduler"),
		value: r.scheduler,
		override: $(i, "scheduler")
	});
	let v = Yi(r.denoise) ? r.denoise : r.denoising;
	Yi(v) && g.push({
		label: k("sidebar.generation.denoise", "Denoise"),
		value: v,
		override: $(i, "denoise", "denoising")
	});
	let y = [];
	Array.isArray(r.chained_passes) && r.chained_passes.length > 1 ? y = r.chained_passes.filter((e) => e && typeof e == "object").map((e, t) => ({
		label: Vi(e, t),
		fields: [
			{
				label: k("sidebar.generation.model", "Model"),
				value: Q(e?.model)
			},
			{
				label: k("sidebar.generation.sampler", "Sampler"),
				value: Q(e?.sampler_name || e?.sampler)
			},
			{
				label: k("sidebar.generation.scheduler", "Scheduler"),
				value: Q(e?.scheduler)
			},
			{
				label: k("sidebar.generation.steps", "Steps"),
				value: Q(e?.steps)
			},
			{
				label: "CFG",
				value: Q(e?.cfg)
			},
			{
				label: k("sidebar.generation.denoise", "Denoise"),
				value: Q(e?.denoise)
			},
			{
				label: k("sidebar.generation.seed", "Seed"),
				value: Q(e?.seed_val || e?.seed)
			}
		]
	})) : Array.isArray(r.all_samplers) && r.all_samplers.length > 1 && (y = r.all_samplers.filter((e) => e && typeof e == "object").map((e, t) => ({
		label: Vi(e, t),
		fields: [
			{
				label: k("sidebar.generation.model", "Model"),
				value: Q(e?.model)
			},
			{
				label: k("sidebar.generation.sampler", "Sampler"),
				value: Q(e?.sampler_name || e?.sampler)
			},
			{
				label: k("sidebar.generation.scheduler", "Scheduler"),
				value: Q(e?.scheduler)
			},
			{
				label: k("sidebar.generation.steps", "Steps"),
				value: Q(e?.steps)
			},
			{
				label: "CFG",
				value: Q(e?.cfg)
			},
			{
				label: k("sidebar.generation.denoise", "Denoise"),
				value: Q(e?.denoise)
			},
			{
				label: k("sidebar.generation.seed", "Seed"),
				value: Q(e?.seed_val || e?.seed)
			}
		]
	})));
	let b = [];
	r.voice && b.push({
		label: k("sidebar.generation.narratorVoice", "Narrator Voice"),
		value: r.voice
	}), r.language && b.push({
		label: k("sidebar.generation.language", "Language"),
		value: r.language
	}), r.top_k !== void 0 && r.top_k !== null && b.push({
		label: "Top-k",
		value: r.top_k
	}), r.top_p !== void 0 && r.top_p !== null && b.push({
		label: "Top-p",
		value: r.top_p
	}), r.temperature !== void 0 && r.temperature !== null && b.push({
		label: k("sidebar.generation.temperature", "Temperature"),
		value: r.temperature
	}), r.repetition_penalty !== void 0 && r.repetition_penalty !== null && b.push({
		label: k("sidebar.generation.repetitionPenalty", "Repetition Penalty"),
		value: r.repetition_penalty
	}), r.max_new_tokens !== void 0 && r.max_new_tokens !== null && b.push({
		label: k("sidebar.generation.maxNewTokens", "Max New Tokens"),
		value: r.max_new_tokens
	});
	let x = [];
	r.device && x.push({
		label: k("sidebar.generation.device", "Device"),
		value: r.device
	}), r.voice_preset && x.push({
		label: k("sidebar.generation.voicePreset", "Voice Preset"),
		value: r.voice_preset
	}), r.dtype && x.push({
		label: k("sidebar.generation.dtype", "Dtype"),
		value: r.dtype
	}), r.attn_implementation && x.push({
		label: k("sidebar.generation.attention", "Attention"),
		value: r.attn_implementation
	}), r.compile_mode && x.push({
		label: k("sidebar.generation.compileMode", "Compile Mode"),
		value: r.compile_mode
	}), [
		Ji(k("sidebar.generation.torchCompile", "Torch Compile"), r.use_torch_compile),
		Ji(k("sidebar.generation.cudaGraphs", "CUDA Graphs"), r.use_cuda_graphs),
		Ji(k("sidebar.generation.xVectorOnly", "X-Vector Only"), r.x_vector_only_mode)
	].filter(Boolean).forEach((e) => x.push(e));
	let S = [];
	[
		Ji(k("sidebar.generation.chunking", "Chunking"), r.enable_chunking),
		r.max_chars_per_chunk !== void 0 && r.max_chars_per_chunk !== null ? {
			label: k("sidebar.generation.maxCharsChunk", "Max Chars/Chunk"),
			value: r.max_chars_per_chunk
		} : null,
		r.chunk_combination_method ? {
			label: k("sidebar.generation.chunkMethod", "Chunk Method"),
			value: r.chunk_combination_method
		} : null,
		r.silence_between_chunks_ms !== void 0 && r.silence_between_chunks_ms !== null ? {
			label: k("sidebar.generation.silenceBetweenChunks", "Silence Between Chunks (ms)"),
			value: r.silence_between_chunks_ms
		} : null,
		Ji(k("sidebar.generation.audioCache", "Audio Cache"), r.enable_audio_cache),
		r.batch_size !== void 0 && r.batch_size !== null ? {
			label: k("sidebar.generation.batchSize", "Batch Size"),
			value: r.batch_size
		} : null
	].filter(Boolean).forEach((e) => S.push(e));
	let C = [];
	r.lyrics_strength !== void 0 && r.lyrics_strength !== null && C.push({
		label: k("sidebar.generation.lyricsStrength", "Lyrics Strength"),
		value: r.lyrics_strength
	});
	let w = [];
	Yi(v) && !g.some((e) => e.label === "Denoise") && w.push({
		label: k("sidebar.generation.denoise", "Denoise"),
		value: v
	}), Yi(r.clip_skip) && w.push({
		label: k("sidebar.generation.clipSkip", "Clip Skip"),
		value: r.clip_skip
	});
	let ee = [], T = String(r.workflow_notes || r.notes || "").trim();
	T && ee.push({
		label: k("sidebar.generation.workflowNotes", "Workflow Notes"),
		value: T,
		override: $(i, "workflow_notes", "notes")
	});
	let te = Zi(r.custom_info), ne = Array.isArray(r.inputs) ? r.inputs.filter((e) => e && typeof e == "object" && e.filename).map((e, t) => ({
		id: `${e.filename}-${t}`,
		filename: String(e.filename || "").trim(),
		filepath: String(e.filepath || e.filename || "").trim(),
		role: String(e.role || "").trim(),
		roleLabel: String(e.role || "").trim().replace(/_/g, " "),
		isVideo: String(e.type || "").toLowerCase() === "video" || /\.(mp4|mov|webm)$/i.test(String(e.filename || "")),
		previewCandidates: zi(e)
	})) : [];
	return {
		...n,
		kind: "full",
		metadata: r,
		workflowType: s.workflowType,
		workflowLabel: s.workflowLabel,
		workflowBadge: s.workflowBadge,
		isTruncated: !!(e?.geninfo?._truncated || e?.metadata?._truncated || e?.prompt?._truncated),
		positivePrompt: l.length ? "" : String(c.positive || "").trim(),
		negativePrompt: l.length ? "" : String(c.negative || "").trim(),
		positivePromptOverride: $(i, "prompt", "positive", "positive_prompt"),
		negativePromptOverride: $(i, "negative_prompt", "negative", "negativePrompt"),
		promptTabs: l,
		showAlignment: !!e?.id && (!!String(c.positive || "").trim() || l.length > 0),
		isImageAsset: Ni(e),
		lyrics: String(r.lyrics || "").trim(),
		modelFields: u,
		modelGroups: p,
		pipelineTabs: y,
		samplingFields: g,
		ttsFields: b,
		ttsEngineFields: x,
		ttsInstruction: String(r.instruct || "").trim(),
		ttsRuntimeFields: S,
		audioFields: C,
		seed: r.seed ?? null,
		imageFields: w,
		inputFiles: ne,
		isOverride: o,
		overrideLabel: o ? "Gen Info Override" : "",
		notesFields: ee,
		customInfoBlocks: te
	};
}
//#endregion
//#region ui/vue/components/panel/sidebar/GenerationInputThumb.vue
var $i = ["title"], ea = ["src"], ta = ["src"], na = {
	key: 2,
	style: {
		position: "absolute",
		bottom: "0",
		left: "0",
		right: "0",
		background: "rgba(0,0,0,0.7)",
		color: "white",
		"font-size": "8px",
		padding: "2px",
		"text-align": "center",
		"white-space": "nowrap",
		overflow: "hidden",
		"text-overflow": "ellipsis"
	}
}, ra = {
	key: 3,
	title: "Video file",
	style: {
		position: "absolute",
		color: "white",
		opacity: "0.7",
		"font-size": "16px",
		"pointer-events": "none"
	}
}, ia = {
	__name: "GenerationInputThumb",
	props: { inputFile: {
		type: Object,
		required: !0
	} },
	setup(e) {
		let t = e, n = M(0), r = M(!1);
		function i() {
			return (Array.isArray(t.inputFile?.previewCandidates) ? t.inputFile.previewCandidates : [])[n.value] || "";
		}
		function a() {
			let e = Array.isArray(t.inputFile?.previewCandidates) ? t.inputFile.previewCandidates : [];
			n.value < e.length - 1 && (n.value += 1);
		}
		async function o(e) {
			e?.stopPropagation?.();
			let n = String(t.inputFile?.filepath || t.inputFile?.filename || "").trim();
			if (n) try {
				await navigator.clipboard.writeText(n), r.value = !0, setTimeout(() => {
					r.value = !1;
				}, 350);
			} catch (e) {
				console.debug?.(e);
			}
		}
		function s(e) {
			e?.stopPropagation?.();
			let t = i();
			if (Bi(t)) try {
				window.open(t, "_blank", "noopener,noreferrer");
			} catch (e) {
				console.debug?.(e);
			}
		}
		function c(e) {
			e.target?.play?.().catch?.(() => {});
		}
		function l(e) {
			try {
				e.target?.pause?.();
			} catch (e) {
				console.debug?.(e);
			}
		}
		return (t, n) => (I(), P("div", {
			title: `${e.inputFile.filename} (click to copy, double-click to open in new tab)`,
			style: z({
				width: "64px",
				height: "64px",
				background: "#222",
				borderRadius: "4px",
				overflow: "hidden",
				position: "relative",
				cursor: "pointer",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				outline: r.value ? "2px solid rgba(76, 175, 80, 0.9)" : "",
				outlineOffset: r.value ? "1px" : ""
			}),
			onClick: o,
			onDblclick: s
		}, [e.inputFile.isVideo ? (I(), P("video", {
			key: 0,
			src: i(),
			muted: "",
			loop: "",
			playsinline: "",
			preload: "metadata",
			style: {
				width: "100%",
				height: "100%",
				"object-fit": "cover"
			},
			onError: a,
			onMouseover: c,
			onMouseout: l
		}, null, 40, ea)) : (I(), P("img", {
			key: 1,
			src: i(),
			style: {
				width: "100%",
				height: "100%",
				"object-fit": "cover"
			},
			onError: a
		}, null, 40, ta)), e.inputFile.role && e.inputFile.role !== "secondary" ? (I(), P("div", na, R(e.inputFile.roleLabel), 1)) : e.inputFile.isVideo ? (I(), P("div", ra, " Play ")) : F("", !0)], 44, $i));
	}
}, aa = {
	key: 0,
	style: {
		display: "flex",
		"flex-direction": "column",
		gap: "12px"
	}
}, oa = {
	key: 0,
	style: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		padding: "10px 12px",
		background: "linear-gradient(135deg, rgba(33, 150, 243, 0.18) 0%, rgba(0, 188, 212, 0.10) 100%)",
		borderLeft: "3px solid #2196F3",
		border: "1px solid rgba(33, 150, 243, 0.45)",
		boxShadow: "0 0 0 1px rgba(33, 150, 243, 0.15) inset",
		borderRadius: "6px",
		fontSize: "11px",
		color: "var(--fg-color, #ccc)"
	}
}, sa = { style: { opacity: "0.85" } }, ca = { style: {
	display: "flex",
	"align-items": "center",
	gap: "8px",
	"flex-wrap": "wrap",
	"justify-content": "flex-end"
} }, la = ["title"], ua = ["title"], da = { style: {
	display: "flex",
	"align-items": "center",
	"justify-content": "space-between",
	gap: "10px"
} }, fa = { style: {
	"font-size": "11px",
	"font-weight": "700",
	color: "#00BCD4",
	"text-transform": "uppercase",
	"letter-spacing": "0.6px"
} }, pa = { style: {
	"font-size": "11px",
	color: "var(--fg-color, rgba(255,255,255,0.9))",
	"font-weight": "600"
} }, ma = { style: {
	"font-size": "11px",
	"font-weight": "600",
	color: "#FF9800",
	"text-transform": "uppercase",
	"letter-spacing": "0.5px",
	"margin-bottom": "8px"
} }, ha = { style: {
	"font-size": "12px",
	color: "var(--fg-color, rgba(255,255,255,0.9))",
	"line-height": "1.5",
	"white-space": "pre-wrap",
	"word-break": "break-word"
} }, ga = { style: {
	"font-size": "11px",
	"font-weight": "600",
	color: "#9E9E9E",
	"text-transform": "uppercase",
	"letter-spacing": "0.5px",
	"margin-bottom": "8px"
} }, _a = { style: {
	"font-size": "12px",
	color: "var(--fg-color, rgba(255,255,255,0.9))",
	"line-height": "1.5",
	"white-space": "pre-wrap",
	"word-break": "break-word"
} }, va = { style: {
	"font-size": "11px",
	"font-weight": "600",
	color: "#4CAF50",
	"text-transform": "uppercase",
	"letter-spacing": "0.5px",
	"margin-bottom": "10px"
} }, ya = { style: {
	display: "flex",
	"flex-wrap": "wrap",
	gap: "6px",
	"margin-bottom": "10px"
} }, ba = { style: {
	"font-size": "10px",
	"font-weight": "700",
	color: "#4CAF50",
	"letter-spacing": "0.4px"
} }, xa = ["onClick"], Sa = { style: {
	"font-size": "10px",
	"font-weight": "700",
	color: "#F44336",
	"letter-spacing": "0.4px",
	"margin-top": "4px"
} }, Ca = ["onClick"], wa = { style: {
	display: "flex",
	"justify-content": "space-between",
	"align-items": "center",
	"font-size": "11px",
	"font-weight": "600",
	color: "#4CAF50",
	"text-transform": "uppercase",
	"letter-spacing": "0.5px",
	"margin-bottom": "8px"
} }, Ta = ["title"], Ea = ["title"], Da = { style: {
	display: "flex",
	"justify-content": "space-between",
	"align-items": "center",
	"font-size": "11px",
	"font-weight": "600",
	color: "#F44336",
	"text-transform": "uppercase",
	"letter-spacing": "0.5px",
	"margin-bottom": "8px"
} }, Oa = ["title"], ka = ["title"], Aa = { style: {
	"font-size": "11px",
	"font-weight": "600",
	color: "#00BCD4",
	"text-transform": "uppercase",
	"letter-spacing": "0.5px",
	display: "flex",
	"align-items": "center",
	"justify-content": "space-between"
} }, ja = ["title"], Ma = { style: {
	display: "flex",
	"align-items": "center",
	gap: "10px"
} }, Na = { style: {
	flex: "1",
	height: "8px",
	background: "rgba(255,255,255,0.1)",
	"border-radius": "4px",
	overflow: "hidden"
} }, Pa = {
	key: 0,
	style: {
		"font-size": "10px",
		color: "rgba(255,255,255,0.65)",
		border: "1px dashed rgba(255,255,255,0.25)",
		"border-radius": "4px",
		padding: "6px 8px",
		background: "rgba(255,255,255,0.04)"
	}
}, Fa = { style: {
	"font-size": "10px",
	"font-weight": "600",
	color: "rgba(0, 188, 212, 0.75)",
	"text-transform": "uppercase",
	"letter-spacing": "0.5px",
	"margin-top": "8px",
	display: "flex",
	"align-items": "center",
	"justify-content": "space-between",
	gap: "8px"
} }, Ia = ["title"], La = { style: {
	display: "flex",
	"align-items": "center",
	gap: "6px"
} }, Ra = ["title"], za = { style: {
	display: "flex",
	"justify-content": "space-between",
	"align-items": "center",
	"font-size": "11px",
	"font-weight": "600",
	color: "#00BCD4",
	"text-transform": "uppercase",
	"letter-spacing": "0.5px",
	"margin-bottom": "8px"
} }, Ba = { style: {
	"font-size": "12px",
	color: "var(--fg-color, rgba(255,255,255,0.9))",
	"line-height": "1.5",
	"white-space": "pre-wrap",
	"word-break": "break-word"
} }, Va = { style: {
	"font-size": "11px",
	"font-weight": "600",
	color: "#FF9800",
	"text-transform": "uppercase",
	"letter-spacing": "0.5px",
	"margin-bottom": "10px"
} }, Ha = { style: {
	display: "flex",
	"flex-wrap": "wrap",
	gap: "6px",
	"margin-bottom": "10px"
} }, Ua = { style: {
	"font-size": "10px",
	"font-weight": "600",
	color: "rgba(255,255,255,0.6)",
	"text-transform": "uppercase",
	"letter-spacing": "0.4px"
} }, Wa = ["onClick"], Ga = { style: {
	"font-size": "11px",
	"font-weight": "600",
	color: "#9C27B0",
	"text-transform": "uppercase",
	"letter-spacing": "0.5px",
	"margin-bottom": "10px"
} }, Ka = { style: {
	display: "grid",
	"grid-template-columns": "repeat(auto-fit, minmax(220px, 1fr))",
	gap: "10px"
} }, qa = { style: {
	display: "flex",
	"align-items": "center",
	"justify-content": "space-between",
	gap: "10px"
} }, Ja = { style: {
	display: "flex",
	"flex-direction": "column",
	gap: "4px"
} }, Ya = ["onClick"], Xa = {
	key: 0,
	style: {
		display: "flex",
		"flex-direction": "column",
		gap: "6px"
	}
}, Za = { style: {
	"font-size": "10px",
	"font-weight": "700",
	color: "rgba(255,255,255,0.58)",
	"text-transform": "uppercase",
	"letter-spacing": "0.4px"
} }, Qa = { style: {
	display: "flex",
	"flex-direction": "column",
	gap: "5px"
} }, $a = ["onClick"], eo = { style: {
	display: "grid",
	"grid-template-columns": "auto 1fr",
	gap: "8px 12px",
	"align-items": "start"
} }, to = ["title"], no = ["title"], ro = ["title", "onClick"], io = { style: {
	"font-size": "11px",
	"font-weight": "600",
	color: "#4CAF50",
	"text-transform": "uppercase",
	"letter-spacing": "0.5px",
	"margin-bottom": "10px"
} }, ao = ["title", "onClick"], oo = ["title", "onClick"], so = { style: {
	display: "flex",
	"justify-content": "space-between",
	"align-items": "center",
	"font-size": "11px",
	"font-weight": "600",
	color: "#26A69A",
	"text-transform": "uppercase",
	"letter-spacing": "0.5px",
	"margin-bottom": "8px"
} }, co = ["title"], lo = { style: {
	"font-size": "11px",
	"font-weight": "700",
	color: "#E91E63",
	"text-transform": "uppercase",
	"letter-spacing": "1px"
} }, uo = ["title"], fo = ["title"], po = { style: {
	display: "flex",
	gap: "8px",
	"flex-wrap": "wrap"
} }, mo = {
	__name: "SidebarGenerationSection",
	props: { asset: {
		type: Object,
		required: !0
	} },
	setup(e) {
		let t = e, n = M(0), r = M(0), i = M(""), a = M(k("action.copy", "Copy")), o = M(k("action.generate", "Generate")), s = M(!1), c = M(u()), l = 0;
		function u() {
			return {
				scoreText: "...",
				scoreColor: "#888",
				qualityText: k("status.loading", "Loading"),
				qualityColor: "#888",
				qualityBackground: "rgba(127,127,127,0.3)",
				fillWidth: "0%",
				fillColor: "#666",
				aiStatusVisible: !1,
				aiStatusText: k("sidebar.generation.aiDisabledEnv", "AI features are disabled (enable vector search env var).")
			};
		}
		function d(e, t) {
			let n = String(e || "").trim().replace(/^#/, "");
			return /^[0-9a-fA-F]{6}$/.test(n) ? `rgba(${Number.parseInt(n.slice(0, 2), 16)}, ${Number.parseInt(n.slice(2, 4), 16)}, ${Number.parseInt(n.slice(4, 6), 16)}, ${t})` : `rgba(255,255,255,${t})`;
		}
		function f(e, { emphasis: t = !1, startAlpha: n = .16, endAlpha: r = .08 } = {}) {
			return {
				background: t ? `linear-gradient(135deg, ${d(e, n)} 0%, ${d(e, r)} 100%)` : "var(--comfy-menu-bg, rgba(0,0,0,0.3))",
				borderLeft: `3px solid ${e}`,
				border: t ? `1px solid ${d(e, .45)}` : "1px solid var(--border-color, rgba(255,255,255,0.12))",
				boxShadow: t ? `0 0 0 1px ${d(e, .15)} inset` : "none",
				borderRadius: "6px",
				padding: "12px"
			};
		}
		function p() {
			return {
				background: "linear-gradient(135deg, rgba(233, 30, 99, 0.15) 0%, rgba(156, 39, 176, 0.15) 100%)",
				border: "2px solid #E91E63",
				borderRadius: "8px",
				padding: "12px 16px",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: "12px"
			};
		}
		function m() {
			return {
				display: "inline-flex",
				alignItems: "center",
				borderRadius: "999px",
				border: "1px solid rgba(0, 188, 212, 0.55)",
				background: "rgba(0, 188, 212, 0.16)",
				color: "#4DD0E1",
				fontSize: "9px",
				fontWeight: "700",
				lineHeight: "1",
				padding: "2px 6px",
				letterSpacing: "0.2px",
				textTransform: "uppercase",
				whiteSpace: "nowrap"
			};
		}
		let h = N(() => Qi(t.asset)), _ = N(() => Fi()), v = N(() => h.value.kind === "full" || h.value.kind === "caption-only"), y = N(() => Ri(i.value) || h.value.emptyCaptionText), b = N(() => _.value && h.value.isImageAsset && !!t.asset?.id), x = N(() => _.value && !!Ri(y.value) && y.value !== h.value.emptyCaptionText), S = N(() => {
			let e = [];
			return h.value.modelFields.length && e.push({
				key: "model",
				title: k("sidebar.generation.modelLora", "Model & LoRA"),
				accent: "#9C27B0",
				emphasis: !0,
				fields: h.value.modelFields
			}), !h.value.pipelineTabs.length && h.value.samplingFields.length && e.push({
				key: "sampling",
				title: k("sidebar.generation.sampling", "Sampling"),
				accent: "#FF9800",
				emphasis: !0,
				fields: h.value.samplingFields
			}), (h.value.ttsFields.length || h.value.workflowType.toLowerCase() === "tts") && e.push({
				key: "tts",
				title: "TTS",
				accent: "#26A69A",
				emphasis: !0,
				fields: h.value.ttsFields
			}), h.value.ttsEngineFields.length && e.push({
				key: "tts-engine",
				title: "TTS Engine",
				accent: "#00897B",
				emphasis: !1,
				fields: h.value.ttsEngineFields
			}), h.value.ttsRuntimeFields.length && e.push({
				key: "tts-runtime",
				title: "TTS Runtime",
				accent: "#00796B",
				emphasis: !1,
				fields: h.value.ttsRuntimeFields
			}), h.value.audioFields.length && e.push({
				key: "audio",
				title: k("sidebar.generation.audio", "Audio"),
				accent: "#00BCD4",
				emphasis: !1,
				fields: h.value.audioFields
			}), h.value.imageFields.length && e.push({
				key: "image",
				title: k("sidebar.generation.image", "Image"),
				accent: "#2196F3",
				emphasis: !1,
				fields: h.value.imageFields
			}), e;
		});
		function C(e, t, n = 450) {
			if (!e) return;
			let r = e.style.background;
			e.style.background = t, setTimeout(() => {
				e.style.background = r || "";
			}, n);
		}
		function w(e, t = !0) {
			return {
				background: t ? `linear-gradient(135deg, ${d(e, .16)} 0%, ${d(e, .08)} 100%)` : "var(--comfy-menu-bg, rgba(0,0,0,0.3))",
				border: `1px solid ${d(e, .42)}`,
				boxShadow: `0 0 0 1px ${d(e, .14)} inset`,
				borderRadius: "8px",
				padding: "12px",
				display: "flex",
				flexDirection: "column",
				gap: "10px"
			};
		}
		function ee(e) {
			return e === "high_noise" ? "#FF7043" : e === "low_noise" ? "#29B6F6" : "#AB47BC";
		}
		async function T(e, t = null, n = "rgba(76, 175, 80, 0.35)") {
			let r = String(e ?? "").trim();
			if (!(!r || r === "-")) try {
				await navigator.clipboard.writeText(r), C(t, n);
			} catch (e) {
				console.debug?.(e);
			}
		}
		function te() {
			c.value = {
				scoreText: "AI OFF",
				scoreColor: "#9E9E9E",
				qualityText: k("status.disabled", "Disabled"),
				qualityColor: "#BDBDBD",
				qualityBackground: "rgba(158,158,158,0.25)",
				fillWidth: "0%",
				fillColor: "#777",
				aiStatusVisible: !0,
				aiStatusText: k("sidebar.generation.aiDisabledSettings", "AI features are disabled in settings.")
			};
		}
		function ne() {
			c.value = u();
		}
		async function re() {
			l += 1;
			let e = l;
			if (!h.value.showAlignment || !t.asset?.id) {
				ne();
				return;
			}
			if (!_.value) {
				te();
				return;
			}
			ne();
			try {
				let n = await g(t.asset.id);
				if (e !== l) return;
				if (!n?.ok && (String(n?.code || "").toUpperCase() === "SERVICE_UNAVAILABLE" || /vector search is not enabled/i.test(String(n?.error || "")))) {
					te();
					return;
				}
				let r = n?.ok && n.data != null ? Number(n.data) : null;
				if (!Number.isFinite(r)) {
					c.value = {
						scoreText: "N/A",
						scoreColor: "#888",
						qualityText: k("status.na", "N/A"),
						qualityColor: "#888",
						qualityBackground: "rgba(127,127,127,0.3)",
						fillWidth: "0%",
						fillColor: "#666",
						aiStatusVisible: !1,
						aiStatusText: ""
					};
					return;
				}
				let i = Math.round(r * 100), a = Ii(r);
				c.value = {
					scoreText: `${i}%`,
					scoreColor: a,
					qualityText: Li(r),
					qualityColor: a,
					qualityBackground: `${a}33`,
					fillWidth: `${i}%`,
					fillColor: a,
					aiStatusVisible: !1,
					aiStatusText: ""
				};
			} catch (t) {
				if (console.debug?.(t), e !== l) return;
				c.value = {
					scoreText: "-",
					scoreColor: "#888",
					qualityText: k("status.unavailable", "Unavailable"),
					qualityColor: "#888",
					qualityBackground: "rgba(127,127,127,0.3)",
					fillWidth: "0%",
					fillColor: "#666",
					aiStatusVisible: !1,
					aiStatusText: ""
				};
			}
		}
		async function ie() {
			if (!(!b.value || s.value)) {
				s.value = !0, o.value = k("status.generating", "Generating...");
				try {
					let e = await O(t.asset.id);
					e?.ok && (i.value = String(e?.data || "").trim());
				} catch (e) {
					console.debug?.(e);
				} finally {
					s.value = !1, o.value = k("action.generate", "Generate");
				}
			}
		}
		async function E() {
			if (x.value) try {
				await navigator.clipboard.writeText(y.value), a.value = k("viewer.copySuccessShort", "Copied!"), setTimeout(() => {
					a.value = k("action.copy", "Copy");
				}, 900);
			} catch (e) {
				console.debug?.(e);
			}
		}
		return Oe(() => t.asset, () => {
			n.value = 0, r.value = 0, i.value = String(t.asset?.enhanced_caption || "").trim(), a.value = k("action.copy", "Copy"), o.value = k("action.generate", "Generate");
		}, { immediate: !0 }), Oe(() => [
			t.asset?.id,
			h.value.kind,
			h.value.showAlignment,
			_.value
		], () => {
			re();
		}, { immediate: !0 }), (e, t) => {
			let i = Me("MButton");
			return h.value.kind === "empty" ? F("", !0) : (I(), P("div", aa, [
				h.value.workflowType ? (I(), P("div", oa, [B("span", sa, R(L(k)("viewer.workflow", "Workflow")), 1), B("div", ca, [B("span", {
					title: L(k)("sidebar.generation.workflowEngine", "Workflow engine: {value}", { value: h.value.workflowType }),
					style: {
						background: "#2196F3",
						color: "white",
						padding: "2px 8px",
						"border-radius": "999px",
						"font-weight": "bold",
						"font-size": "10px",
						"letter-spacing": "0.2px"
					}
				}, R(h.value.workflowLabel || h.value.workflowType), 9, la), h.value.workflowBadge ? (I(), P("span", {
					key: 0,
					title: L(k)("sidebar.generation.apiProvider", "API provider: {value}", { value: h.value.workflowBadge }),
					style: {
						background: "rgba(255,255,255,0.08)",
						color: "var(--fg-color, #eee)",
						padding: "2px 8px",
						"border-radius": "999px",
						border: "1px solid rgba(255,255,255,0.14)",
						"font-weight": "600",
						"font-size": "10px",
						"letter-spacing": "0.2px"
					}
				}, R(h.value.workflowBadge), 9, ua)) : F("", !0)])])) : F("", !0),
				h.value.isOverride ? (I(), P("div", {
					key: 1,
					style: z(f("#00BCD4", {
						emphasis: !0,
						startAlpha: .14,
						endAlpha: .08
					}))
				}, [B("div", da, [B("span", fa, R(L(k)("sidebar.generation.override", "Override")), 1), B("span", pa, R(h.value.overrideLabel), 1)])], 4)) : F("", !0),
				h.value.isTruncated ? (I(), P("div", {
					key: 2,
					style: z(f("#FF9800", {
						emphasis: !0,
						startAlpha: .12,
						endAlpha: .08
					}))
				}, [B("div", ma, R(L(k)("sidebar.generation.metadataTruncated", "Metadata Truncated")), 1), B("div", ha, R(L(k)("sidebar.generation.metadataTruncatedBody", "Generation data is incomplete because it exceeded the size limit.")), 1)], 4)) : F("", !0),
				h.value.kind === "media-only" ? (I(), P("div", {
					key: 3,
					style: z(f("#9E9E9E", {
						emphasis: !0,
						startAlpha: .1,
						endAlpha: .06
					}))
				}, [B("div", ga, R(L(k)("sidebar.generation.generationData", "Generation Data")), 1), B("div", _a, R(h.value.mediaOnlyMessage), 1)], 4)) : F("", !0),
				h.value.kind === "full" ? (I(), P(V, { key: 4 }, [h.value.promptTabs.length ? (I(), P("div", {
					key: 0,
					style: z(f("#4CAF50", {
						emphasis: !0,
						startAlpha: .16,
						endAlpha: .1
					}))
				}, [
					B("div", va, R(L(k)("sidebar.generation.promptPipeline", "Prompt Pipeline ({count} variants)", { count: h.value.promptTabs.length })), 1),
					B("div", ya, [(I(!0), P(V, null, H(h.value.promptTabs, (e, t) => (I(), je(i, {
						key: e.label,
						type: "button",
						severity: "secondary",
						text: "",
						rounded: "",
						style: z({
							appearance: "none",
							border: n.value === t ? "1px solid #4CAF50" : "1px solid var(--border-color, rgba(255,255,255,0.12))",
							borderRadius: "999px",
							background: n.value === t ? "#4CAF5033" : "rgba(127,127,127,0.12)",
							color: n.value === t ? "#4CAF50" : "var(--fg-color, #ddd)",
							fontSize: "11px",
							padding: "4px 10px",
							cursor: "pointer",
							fontWeight: n.value === t ? "700" : "500",
							boxShadow: n.value === t ? "0 0 0 1px #4CAF5055 inset" : "none"
						}),
						onClick: (e) => n.value = t
					}, {
						default: Ne(() => [ke(R(e.label), 1)]),
						_: 2
					}, 1032, ["style", "onClick"]))), 128))]),
					(I(!0), P(V, null, H(h.value.promptTabs, (e, t) => De((I(), P("div", {
						key: `${e.label}-panel`,
						style: {
							display: "flex",
							"flex-direction": "column",
							gap: "8px",
							border: "1px solid rgba(76, 175, 80, 0.35)",
							"border-radius": "6px",
							background: "linear-gradient(135deg, rgba(76, 175, 80, 0.12) 0%, rgba(33, 150, 243, 0.08) 100%)",
							"box-shadow": "0 0 0 1px rgba(76, 175, 80, 0.12) inset",
							padding: "10px"
						}
					}, [
						B("div", ba, R(L(k)("sidebar.generation.positive", "POSITIVE")), 1),
						B("div", {
							style: {
								"font-size": "12px",
								color: "var(--fg-color, #ddd)",
								"white-space": "pre-wrap",
								"line-height": "1.35",
								cursor: "pointer"
							},
							onClick: (t) => T(e.positive, t.currentTarget)
						}, R(e.positive), 9, xa),
						e.negative ? (I(), P(V, { key: 0 }, [B("div", Sa, R(L(k)("sidebar.generation.negative", "NEGATIVE")), 1), B("div", {
							style: {
								"font-size": "12px",
								color: "var(--fg-color, #ddd)",
								"white-space": "pre-wrap",
								"line-height": "1.35",
								cursor: "pointer"
							},
							onClick: (t) => T(e.negative, t.currentTarget)
						}, R(e.negative), 9, Ca)], 64)) : F("", !0)
					])), [[et, n.value === t]])), 128))
				], 4)) : h.value.positivePrompt ? (I(), P("div", {
					key: 1,
					style: z(f("#4CAF50", {
						emphasis: !0,
						startAlpha: .16,
						endAlpha: .1
					}))
				}, [B("div", wa, [B("span", null, R(L(k)("sidebar.generation.positivePrompt", "Positive Prompt")), 1), h.value.positivePromptOverride ? (I(), P("span", {
					key: 0,
					style: z(m()),
					title: L(k)("sidebar.generation.overrideTooltip", "This field was forced by Majoor Gen Info Override")
				}, R(L(k)("sidebar.generation.override", "override")), 13, Ta)) : F("", !0)]), B("div", {
					title: L(k)("action.clickToCopy", "Click to copy"),
					style: {
						"font-size": "12px",
						color: "var(--fg-color, rgba(255,255,255,0.9))",
						"line-height": "1.5",
						"white-space": "pre-wrap",
						"word-break": "break-word",
						cursor: "pointer"
					},
					onClick: t[0] ||= (e) => T(h.value.positivePrompt, e.currentTarget)
				}, R(h.value.positivePrompt), 9, Ea)], 4)) : F("", !0), !h.value.promptTabs.length && h.value.negativePrompt ? (I(), P("div", {
					key: 2,
					style: z(f("#F44336", {
						emphasis: !0,
						startAlpha: .16,
						endAlpha: .1
					}))
				}, [B("div", Da, [B("span", null, R(L(k)("sidebar.generation.negativePrompt", "Negative Prompt")), 1), h.value.negativePromptOverride ? (I(), P("span", {
					key: 0,
					style: z(m()),
					title: L(k)("sidebar.generation.overrideTooltip", "This field was forced by Majoor Gen Info Override")
				}, R(L(k)("sidebar.generation.override", "override")), 13, Oa)) : F("", !0)]), B("div", {
					title: L(k)("action.clickToCopy", "Click to copy"),
					style: {
						"font-size": "12px",
						color: "var(--fg-color, rgba(255,255,255,0.9))",
						"line-height": "1.5",
						"white-space": "pre-wrap",
						"word-break": "break-word",
						cursor: "pointer"
					},
					onClick: t[1] ||= (e) => T(h.value.negativePrompt, e.currentTarget)
				}, R(h.value.negativePrompt), 9, ka)], 4)) : F("", !0)], 64)) : F("", !0),
				v.value ? (I(), P("div", {
					key: 5,
					style: {
						background: "linear-gradient(135deg, rgba(0, 188, 212, 0.14) 0%, rgba(33, 150, 243, 0.10) 100%)",
						border: "1px solid rgba(0, 188, 212, 0.40)",
						"border-radius": "6px",
						padding: "12px",
						display: "flex",
						"flex-direction": "column",
						gap: "10px"
					},
					class: qe({ "mjr-ai-disabled-block": !_.value })
				}, [
					h.value.showAlignment ? (I(), P(V, { key: 0 }, [
						B("div", Aa, [B("span", { title: L(k)("sidebar.generation.promptAlignmentTooltip", "How closely the generated image matches the prompt (SigLIP2 score)") }, R(L(k)("sidebar.generation.promptAlignment", "Prompt Alignment")), 9, ja)]),
						B("div", Ma, [
							B("div", Na, [B("div", { style: z({
								height: "100%",
								width: c.value.fillWidth,
								background: c.value.fillColor,
								borderRadius: "4px",
								transition: "width 0.6s ease, background 0.4s ease"
							}) }, null, 4)]),
							B("span", { style: z({
								fontSize: "13px",
								fontWeight: "700",
								color: c.value.scoreColor,
								minWidth: "60px",
								textAlign: "right",
								fontFamily: "'Consolas', 'Monaco', monospace"
							}) }, R(c.value.scoreText), 5),
							B("span", { style: z({
								fontSize: "9px",
								fontWeight: "700",
								padding: "2px 6px",
								borderRadius: "3px",
								background: c.value.qualityBackground,
								color: c.value.qualityColor,
								textTransform: "uppercase",
								letterSpacing: "0.5px"
							}) }, R(c.value.qualityText), 5)
						]),
						c.value.aiStatusVisible ? (I(), P("div", Pa, R(c.value.aiStatusText), 1)) : F("", !0)
					], 64)) : F("", !0),
					B("div", Fa, [B("span", { title: L(k)("sidebar.generation.aiCaptionTooltip", "AI caption generated by Florence-2") }, R(h.value.captionLabel), 9, Ia), B("div", La, [He(i, {
						type: "button",
						class: "mjr-ai-control",
						severity: "secondary",
						text: "",
						disabled: !b.value || s.value,
						style: z([{
							border: "1px solid rgba(0,188,212,0.45)",
							background: "rgba(0,188,212,0.12)",
							color: "#00BCD4",
							"border-radius": "4px",
							"font-size": "10px",
							"font-weight": "600",
							padding: "2px 8px",
							cursor: "pointer"
						}, {
							opacity: b.value ? "1" : "0.6",
							cursor: b.value ? "pointer" : "default"
						}]),
						onClick: Fe(ie, ["stop"])
					}, {
						default: Ne(() => [ke(R(o.value), 1)]),
						_: 1
					}, 8, ["disabled", "style"]), He(i, {
						type: "button",
						class: "mjr-ai-control",
						severity: "secondary",
						text: "",
						disabled: !x.value,
						style: z([{
							border: "1px solid rgba(0,188,212,0.45)",
							background: "rgba(0,188,212,0.12)",
							color: "#00BCD4",
							"border-radius": "4px",
							"font-size": "10px",
							"font-weight": "600",
							padding: "2px 8px",
							cursor: "pointer"
						}, {
							opacity: x.value ? "1" : "0.6",
							cursor: x.value ? "pointer" : "default"
						}]),
						onClick: Fe(E, ["stop"])
					}, {
						default: Ne(() => [ke(R(a.value), 1)]),
						_: 1
					}, 8, ["disabled", "style"])])]),
					B("div", {
						title: _.value ? L(k)("sidebar.generation.copyCaptionTooltip", "Click to copy caption") : L(k)("sidebar.generation.aiCaptionDisabled", "AI caption controls are disabled"),
						style: z({
							marginTop: "4px",
							padding: "8px",
							borderRadius: "6px",
							border: "1px solid rgba(0, 188, 212, 0.30)",
							background: "rgba(0, 188, 212, 0.08)",
							color: "rgba(230, 250, 255, 0.95)",
							fontSize: "11px",
							lineHeight: "1.45",
							whiteSpace: "pre-wrap",
							wordBreak: "break-word",
							cursor: x.value ? "copy" : "default"
						}),
						onClick: E
					}, R(y.value), 13, Ra)
				], 2)) : F("", !0),
				h.value.lyrics ? (I(), P("div", {
					key: 6,
					style: z(f("#00BCD4", { emphasis: !1 }))
				}, [B("div", za, [B("span", null, R(L(k)("sidebar.generation.lyrics", "Lyrics")), 1)]), B("div", Ba, R(h.value.lyrics), 1)], 4)) : F("", !0),
				h.value.pipelineTabs.length ? (I(), P("div", {
					key: 7,
					style: z(f("#FF9800", {
						emphasis: !0,
						startAlpha: .16,
						endAlpha: .1
					}))
				}, [
					B("div", Va, R(L(k)("sidebar.generation.pipeline", "Generation Pipeline")), 1),
					B("div", Ha, [(I(!0), P(V, null, H(h.value.pipelineTabs, (e, t) => (I(), je(i, {
						key: e.label,
						type: "button",
						severity: "secondary",
						text: "",
						rounded: "",
						style: z({
							appearance: "none",
							border: r.value === t ? "1px solid #FF9800" : "1px solid var(--border-color, rgba(255,255,255,0.12))",
							borderRadius: "999px",
							background: r.value === t ? "#FF980033" : "rgba(127,127,127,0.12)",
							color: r.value === t ? "#FF9800" : "var(--fg-color, #ddd)",
							fontSize: "11px",
							padding: "4px 10px",
							cursor: "pointer",
							fontWeight: r.value === t ? "700" : "500",
							boxShadow: r.value === t ? "0 0 0 1px #FF980055 inset" : "none"
						}),
						onClick: (e) => r.value = t
					}, {
						default: Ne(() => [ke(R(e.label), 1)]),
						_: 2
					}, 1032, ["style", "onClick"]))), 128))]),
					(I(!0), P(V, null, H(h.value.pipelineTabs, (e, t) => De((I(), P("div", {
						key: `${e.label}-pipeline`,
						style: {
							display: "grid",
							"grid-template-columns": "repeat(auto-fit, minmax(150px, 1fr))",
							gap: "8px",
							padding: "8px",
							border: "1px solid rgba(255, 152, 0, 0.35)",
							"border-radius": "6px",
							background: "linear-gradient(135deg, rgba(255, 152, 0, 0.12) 0%, rgba(255, 193, 7, 0.08) 100%)",
							"box-shadow": "0 0 0 1px rgba(255, 152, 0, 0.12) inset"
						}
					}, [(I(!0), P(V, null, H(e.fields, (t) => (I(), P("div", {
						key: `${e.label}-${t.label}`,
						style: {
							display: "flex",
							"flex-direction": "column",
							gap: "2px",
							"min-width": "0"
						}
					}, [B("span", Ua, R(t.label), 1), B("span", {
						style: {
							"font-size": "12px",
							color: "var(--fg-color, #ddd)",
							"word-break": "break-word",
							padding: "1px 3px",
							"border-radius": "3px",
							transition: "background 0.2s ease",
							cursor: "copy"
						},
						onClick: (e) => T(t.value, e.currentTarget)
					}, R(t.value), 9, Wa)]))), 128))])), [[et, r.value === t]])), 128))
				], 4)) : F("", !0),
				h.value.modelGroups.length ? (I(), P("div", {
					key: 8,
					style: z(f("#9C27B0", {
						emphasis: !0,
						startAlpha: .18,
						endAlpha: .1
					}))
				}, [B("div", Ga, R(L(k)("sidebar.generation.modelBranches", "Model Branches")), 1), B("div", Ka, [(I(!0), P(V, null, H(h.value.modelGroups, (e) => (I(), P("div", {
					key: `model-group-${e.key}`,
					style: z(w(ee(e.key), !0))
				}, [
					B("div", qa, [B("div", { style: z({
						fontSize: "10px",
						fontWeight: "800",
						color: ee(e.key),
						letterSpacing: "0.6px",
						textTransform: "uppercase"
					}) }, R(e.label), 5), B("span", { style: z({
						fontSize: "9px",
						fontWeight: "700",
						color: "#fff",
						background: d(ee(e.key), .22),
						border: `1px solid ${d(ee(e.key), .48)}`,
						borderRadius: "999px",
						padding: "2px 8px",
						letterSpacing: "0.4px",
						textTransform: "uppercase"
					}) }, R(e.loras?.length || 0) + " LoRA ", 5)]),
					B("div", Ja, [t[4] ||= B("div", { style: {
						"font-size": "10px",
						"font-weight": "700",
						color: "rgba(255,255,255,0.58)",
						"text-transform": "uppercase",
						"letter-spacing": "0.4px"
					} }, " UNet ", -1), B("div", {
						style: {
							"font-size": "12px",
							color: "var(--fg-color, rgba(255,255,255,0.96))",
							"line-height": "1.45",
							"word-break": "break-word",
							cursor: "pointer"
						},
						onClick: (t) => T(e.model, t.currentTarget)
					}, R(e.model || "-"), 9, Ya)]),
					e.loras?.length ? (I(), P("div", Xa, [B("div", Za, R(L(k)("sidebar.generation.loraStack", "LoRA Stack")), 1), B("div", Qa, [(I(!0), P(V, null, H(e.loras, (t, n) => (I(), P("div", {
						key: `${e.key}-lora-${n}`,
						style: {
							"font-size": "12px",
							color: "var(--fg-color, rgba(255,255,255,0.92))",
							"line-height": "1.4",
							"word-break": "break-word",
							padding: "6px 8px",
							"border-radius": "6px",
							background: "rgba(255,255,255,0.05)",
							border: "1px solid rgba(255,255,255,0.08)",
							cursor: "pointer"
						},
						onClick: (e) => T(t, e.currentTarget)
					}, R(t), 9, $a))), 128))])])) : F("", !0)
				], 4))), 128))])], 4)) : F("", !0),
				(I(!0), P(V, null, H(S.value, (e) => (I(), P("div", {
					key: e.key,
					style: z(f(e.accent, { emphasis: e.emphasis }))
				}, [B("div", { style: z({
					fontSize: "11px",
					fontWeight: "600",
					color: e.accent,
					textTransform: "uppercase",
					letterSpacing: "0.5px",
					marginBottom: "10px"
				}) }, R(e.title), 5), B("div", eo, [(I(!0), P(V, null, H(e.fields, (t) => (I(), P(V, { key: `${e.key}-${t.label}` }, [B("div", {
					title: t.label,
					style: {
						"font-size": "11px",
						color: "var(--mjr-muted, rgba(127,127,127,0.9))",
						"font-weight": "500",
						display: "flex",
						"align-items": "center",
						gap: "6px"
					}
				}, [B("span", null, R(t.label) + ":", 1), t.override ? (I(), P("span", {
					key: 0,
					style: z(m()),
					title: L(k)("sidebar.generation.overrideTooltip", "This field was forced by Majoor Gen Info Override")
				}, R(L(k)("sidebar.generation.override", "override")), 13, no)) : F("", !0)], 8, to), B("div", {
					title: `${t.label}: ${t.value}`,
					style: {
						"font-size": "12px",
						color: "var(--fg-color, rgba(255,255,255,0.95))",
						"word-break": "break-word",
						"white-space": "pre-wrap",
						cursor: "pointer"
					},
					onClick: (e) => T(t.value, e.currentTarget)
				}, R(t.value), 9, ro)], 64))), 128))])], 4))), 128)),
				h.value.notesFields.length ? (I(), P("div", {
					key: 9,
					style: z(f("#4CAF50", { emphasis: !1 }))
				}, [B("div", io, R(L(k)("sidebar.generation.notes", "Notes")), 1), (I(!0), P(V, null, H(h.value.notesFields, (e) => (I(), P("div", {
					key: e.label,
					title: `${e.label}: ${e.value}`,
					style: {
						"font-size": "12px",
						color: "var(--fg-color, rgba(255,255,255,0.9))",
						"line-height": "1.5",
						"white-space": "pre-wrap",
						"word-break": "break-word",
						cursor: "pointer"
					},
					onClick: (t) => T(e.value, t.currentTarget)
				}, R(e.value), 9, ao))), 128))], 4)) : F("", !0),
				(I(!0), P(V, null, H(h.value.customInfoBlocks, (e) => (I(), P("div", {
					key: `${e.title}-${e.content}`,
					style: z(f(e.color, { emphasis: !1 }))
				}, [B("div", { style: z({
					fontSize: "11px",
					fontWeight: "600",
					color: e.color,
					textTransform: "uppercase",
					letterSpacing: "0.5px",
					marginBottom: "8px"
				}) }, R(e.title), 5), B("div", {
					title: `${e.title}: ${e.content}`,
					style: {
						"font-size": "12px",
						color: "var(--fg-color, rgba(255,255,255,0.9))",
						"line-height": "1.5",
						"white-space": "pre-wrap",
						"word-break": "break-word",
						cursor: "pointer"
					},
					onClick: (t) => T(e.content, t.currentTarget)
				}, R(e.content), 9, oo)], 4))), 128)),
				h.value.ttsInstruction ? (I(), P("div", {
					key: 10,
					style: z(f("#26A69A", { emphasis: !1 }))
				}, [B("div", so, [B("span", null, R(L(k)("sidebar.generation.ttsInstruction", "TTS Instruction")), 1)]), B("div", {
					title: L(k)("action.clickToCopy", "Click to copy"),
					style: {
						"font-size": "12px",
						color: "var(--fg-color, rgba(255,255,255,0.9))",
						"line-height": "1.5",
						"white-space": "pre-wrap",
						"word-break": "break-word",
						cursor: "pointer"
					},
					onClick: t[2] ||= (e) => T(h.value.ttsInstruction, e.currentTarget)
				}, R(h.value.ttsInstruction), 9, co)], 4)) : F("", !0),
				h.value.seed !== null && h.value.seed !== void 0 && h.value.seed !== "" ? (I(), P("div", {
					key: 11,
					style: z(p())
				}, [B("div", lo, R(L(k)("sidebar.generation.seed", "SEED")), 1), B("div", {
					title: L(k)("sidebar.generation.copySeedTooltip", "Click to copy seed: {seed}", { seed: h.value.seed }),
					style: {
						"font-size": "18px",
						"font-weight": "700",
						color: "#fff",
						"font-family": "'Consolas', 'Monaco', monospace",
						"letter-spacing": "1px",
						cursor: "pointer",
						padding: "4px 8px",
						"border-radius": "4px",
						transition: "background 0.2s"
					},
					onClick: t[3] ||= (e) => T(h.value.seed, e.currentTarget, "rgba(76, 175, 80, 0.4)")
				}, R(h.value.seed), 9, uo)], 4)) : F("", !0),
				h.value.inputFiles.length ? (I(), P("div", {
					key: 12,
					style: z(f("#4CAF50", {
						emphasis: !0,
						startAlpha: .16,
						endAlpha: .1
					}))
				}, [B("div", {
					title: L(k)("tooltip.generationInputs", "Input files used in generation"),
					style: {
						"font-size": "11px",
						"font-weight": "600",
						color: "#4CAF50",
						"text-transform": "uppercase",
						"letter-spacing": "0.5px",
						"margin-bottom": "8px"
					}
				}, R(L(k)("sidebar.generation.sourceFiles", "Source Files")), 9, fo), B("div", po, [(I(!0), P(V, null, H(h.value.inputFiles, (e) => (I(), je(ia, {
					key: e.id,
					"input-file": e
				}, null, 8, ["input-file"]))), 128))])], 4)) : F("", !0)
			]));
		};
	}
}, ho = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, go = /^[0-9a-f]{20,}$/i;
function _o(...e) {
	for (let t of e) {
		let e = String(t || "").trim();
		if (e) return e;
	}
	return "";
}
function vo(e) {
	let t = String(e || "").trim();
	return !!t && (ho.test(t) || go.test(t));
}
function yo(e) {
	return String(e?.type || e?.class_type || e?.comfyClass || e?.classType || "").trim();
}
function bo(e) {
	return _o(e?.properties?.subgraph_name, e?.title, e?.properties?.title, e?.properties?.name, e?.properties?.label, e?.name, e?.subgraph?.name, e?.subgraph_instance?.name);
}
function xo(e) {
	let t = yo(e), n = bo(e);
	return n && (!t || vo(t) || n !== t) ? n : t && !vo(t) ? t : n || (t ? "Subgraph" : String(e?.id || "Node").trim() || "Node");
}
function So(e) {
	let t = yo(e);
	return t && !vo(t) ? t : t ? "Subgraph" : "Node";
}
//#endregion
//#region ui/components/sidebar/utils/minimap.ts
var Co = 6, wo = 1, To = 8, Eo = 74, Do = 42, Oo = [
	["sampler", "#8e5cff"],
	["ksampler", "#8e5cff"],
	["loader", "#4f8cff"],
	["load", "#4f8cff"],
	["clip", "#d4a634"],
	["vae", "#36a7c9"],
	["latent", "#47a56d"],
	["image", "#8fb04a"],
	["video", "#c47b3d"],
	["mask", "#999999"],
	["conditioning", "#b56bd8"],
	["controlnet", "#c44f76"],
	["lora", "#d27a45"],
	["save", "#4aa37c"],
	["preview", "#4aa37c"],
	["api", "#3aa6a6"]
], ko = (e, t, n) => {
	let r = Number(e);
	return Number.isFinite(r) ? Math.max(t, Math.min(n, r)) : t;
}, Ao = (e, t = !1) => {
	let n = String(e || "").toUpperCase();
	return n.includes("IMAGE") ? "rgba(145,198,99,0.9)" : n.includes("LATENT") ? "rgba(89,178,118,0.9)" : n.includes("MODEL") ? "rgba(112,155,255,0.9)" : n.includes("CONDITIONING") ? "rgba(191,123,226,0.9)" : n.includes("CLIP") ? "rgba(220,178,77,0.9)" : n.includes("VAE") ? "rgba(72,184,214,0.9)" : n.includes("MASK") ? "rgba(190,190,190,0.88)" : n.includes("STRING") || n.includes("TEXT") ? "rgba(230,230,230,0.86)" : n.includes("INT") || n.includes("FLOAT") || n.includes("NUMBER") ? "rgba(130,210,220,0.88)" : t ? "rgba(170,220,255,0.82)" : "rgba(255,255,255,0.72)";
}, jo = (e, t, n) => {
	let r = String(t || "").replace(/\s+/g, " ").trim(), i = Math.max(1, Number(n) || 1);
	if (!r || e.measureText(r).width <= i) return r;
	let a = r;
	for (; a.length > 3 && e.measureText(`${a}...`).width > i;) a = a.slice(0, -1);
	return a.length > 3 ? `${a}...` : r.slice(0, 3);
};
function Mo(e, t, n = null) {
	if (!e) return;
	let r = e.getContext?.("2d");
	if (!r) return;
	let i = {
		nodeColors: !0,
		showLinks: !0,
		showGroups: !0,
		renderBypassState: !0,
		renderErrorState: !0,
		showViewport: !0,
		showNodeLabels: !1,
		expandSubgraphs: !0,
		...n && typeof n == "object" ? n : {}
	}, a = i.expandSubgraphs === !1 ? t : No(t), o = Array.isArray(a?.nodes) ? a.nodes : [], s = Array.isArray(a?.groups) && a.groups || Array.isArray(a?.extra?.groups) && a.extra.groups || Array.isArray(a?.extra?.groupNodes) && a.extra.groupNodes || Array.isArray(a?.extra?.group_nodes) && a.extra.group_nodes || [], c = Array.isArray(a?.links) && a.links || Array.isArray(a?.extra?.links) && a.extra.links || [], l = Math.max(1, e.clientWidth || e.width || 1), u = Math.max(1, e.clientHeight || e.height || 1);
	if ((!o || o.length === 0) && (!s || s.length === 0)) return r.clearRect(0, 0, l, u), null;
	let d = (e, t) => {
		if (!e || typeof e != "string") return `rgba(255,255,255,${t})`;
		let n = e.trim();
		if (!n) return `rgba(255,255,255,${t})`;
		let r = n.match(/^rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([0-9.]+))?\)\s*$/i);
		if (r) {
			let e = Number(r[1]), n = Number(r[2]), i = Number(r[3]);
			if ([
				e,
				n,
				i
			].every((e) => Number.isFinite(e))) return `rgba(${e},${n},${i},${t})`;
		}
		let i = n.startsWith("#") ? n.slice(1) : "";
		if (i.length === 3) {
			let e = parseInt(i[0] + i[0], 16), n = parseInt(i[1] + i[1], 16), r = parseInt(i[2] + i[2], 16);
			if ([
				e,
				n,
				r
			].every((e) => Number.isFinite(e))) return `rgba(${e},${n},${r},${t})`;
		}
		if (i.length === 6) {
			let e = parseInt(i.slice(0, 2), 16), n = parseInt(i.slice(2, 4), 16), r = parseInt(i.slice(4, 6), 16);
			if ([
				e,
				n,
				r
			].every((e) => Number.isFinite(e))) return `rgba(${e},${n},${r},${t})`;
		}
		return n;
	}, f = (e) => {
		let t = e?.bgcolor || e?.color || null;
		if (t) return t;
		let n = String(e?.category || e?.type || e?.comfyClass || e?.class_type || e?.title || "").toLowerCase();
		for (let [e, t] of Oo) if (n.includes(e)) return t;
		let r = 0;
		for (let e = 0; e < n.length; e += 1) r = r * 31 + n.charCodeAt(e) | 0;
		return `hsl(${Math.abs(r) % 360} 42% 42%)`;
	}, p = (e) => {
		let t = [], n = e?.inputs && typeof e.inputs == "object" && !Array.isArray(e.inputs) ? e.inputs : null;
		if (n) {
			for (let [e, r] of Object.entries(n)) if (!(Array.isArray(r) || r && typeof r == "object") && (t.push([e, r]), t.length >= 3)) return t;
		}
		let r = Array.isArray(e?.widgets_values) ? e.widgets_values : [], i = Array.isArray(e?.widgets) ? e.widgets : [], a = Array.isArray(e?.inputs) ? e.inputs : [], o = a.filter((e) => e?.widget === !0 || e?.widget && typeof e.widget == "object" || typeof e?.widget == "string" && e.widget.trim()), s = a.filter((e) => e?.link == null && Vo(e?.type)), c = (o.length ? o : s.length ? s : a).map((e) => String(e?.label || e?.localized_name || e?.name || e?.widget?.name || e?.widget?.label || "").trim());
		return r.forEach((e, n) => {
			let r = i[n]?.name || i[n]?.label || c[n] || `p${n + 1}`;
			t.push([r, e]);
		}), t.slice(0, 3);
	}, m = [], h = /* @__PURE__ */ new Map(), g = (e) => {
		if (Array.isArray(e) && e.length >= 2) return [Number(e[0]), Number(e[1])];
		if (e && typeof e == "object") {
			let t = e[0] ?? e[0] ?? e.x ?? e.left ?? null, n = e[1] ?? e[1] ?? e.y ?? e.top ?? null;
			if (t !== null && n !== null) return [Number(t), Number(n)];
		}
		return null;
	}, _ = (e) => {
		if (Array.isArray(e) && e.length >= 2) return [Number(e[0]), Number(e[1])];
		if (e && typeof e == "object") {
			let t = e[0] ?? e[0] ?? e.w ?? e.width ?? null, n = e[1] ?? e[1] ?? e.h ?? e.height ?? null;
			if (t !== null && n !== null) return [Number(t), Number(n)];
		}
		return null;
	};
	for (let e of o || []) {
		let t = e?.id ?? e?.ID ?? e?.node_id ?? null, n = t == null ? null : String(t), r = g(e?.pos), o = _(e?.size);
		if (!r || !o) continue;
		let s = Number(r[0]), c = Number(r[1]), l = Math.max(1, Number(o[0])), u = Math.max(1, Number(o[1]));
		if (!Number.isFinite(s) || !Number.isFinite(c) || !Number.isFinite(l) || !Number.isFinite(u)) continue;
		let d = Number(e?.mode), v = d === 2 || d === 4, y = a?.extra?.errors || a?.extra?.node_errors || null, b = !!(y && typeof y == "object" && n && y[n] || e?.error || e?.errors || e?.flags?.error || e?.properties?.error), x = f(e), S = Array.isArray(e?.inputs) ? e.inputs : [], C = Array.isArray(e?.outputs) ? e.outputs : [];
		m.push({
			kind: "node",
			id: n,
			x: s,
			y: c,
			w: l,
			h: u,
			fill: i.nodeColors ? x : null,
			stroke: i.nodeColors ? e?.color || x : null,
			bypassed: v,
			errored: b,
			type: String(e?.type || e?.comfyClass || e?.class_type || "").trim(),
			rows: p(e),
			inputs: S,
			outputs: C,
			inputCount: S.length || (e?.inputs && typeof e.inputs == "object" ? Object.keys(e.inputs).length : 0),
			outputCount: C.length,
			label: xo(e).replace(/\s+/g, " ").trim()
		}), n && h.set(n, m[m.length - 1]);
	}
	if (i.showGroups) for (let e of s || []) {
		let t = Array.isArray(e?.bounding) && e.bounding.length >= 4 ? e.bounding : null, n = t ? [Number(t[0]), Number(t[1])] : g(e?.pos), r = t ? [Number(t[2]), Number(t[3])] : _(e?.size);
		if (!n || !r) continue;
		let i = Number(n[0]), a = Number(n[1]), o = Math.max(1, Number(r[0])), s = Math.max(1, Number(r[1]));
		!Number.isFinite(i) || !Number.isFinite(a) || !Number.isFinite(o) || !Number.isFinite(s) || m.push({
			kind: "group",
			x: i,
			y: a,
			w: o,
			h: s,
			fill: e?.color || e?.bgcolor || e?.borderColor || null,
			stroke: e?.borderColor || e?.color || e?.bgcolor || null
		});
	}
	if (!m.length) return r.clearRect(0, 0, l, u), null;
	let v = m[0].x, y = m[0].y, b = m[0].x + m[0].w, x = m[0].y + m[0].h;
	for (let e of m) v = Math.min(v, e.x), y = Math.min(y, e.y), b = Math.max(b, e.x + e.w), x = Math.max(x, e.y + e.h);
	let S = Math.max(1, b - v), C = Math.max(1, x - y), w = v + S / 2, ee = y + C / 2, T = i.view && typeof i.view == "object" ? i.view : Object.create(null), te = ko(T.zoom ?? 1, wo, To), ne = Math.max(1, S / te), re = Math.max(1, C / te), ie = ne / 2, E = re / 2, ae = ne >= S ? w : ko(T.centerX ?? w, v + ie, b - ie), oe = re >= C ? ee : ko(T.centerY ?? ee, y + E, x - E), se = ae - ie, ce = oe - E, D = Co, O = Math.min((l - D * 2) / ne, (u - D * 2) / re), le = T.hoveredNodeId !== null && T.hoveredNodeId !== void 0 ? String(T.hoveredNodeId) : null;
	r.clearRect(0, 0, l, u), r.fillStyle = "rgba(0,0,0,0.22)", r.fillRect(0, 0, l, u);
	let ue = (e, t) => ({
		x: D + (e - se) * O,
		y: D + (t - ce) * O
	}), de = (e, t) => ({
		x: ko(se + (Number(e) - D) / O, v, b),
		y: ko(ce + (Number(t) - D) / O, y, x)
	}), fe = (e) => ({
		x: D + (e.x - se) * O,
		y: D + (e.y - ce) * O,
		w: Math.max(1, e.w * O),
		h: Math.max(1, e.h * O)
	}), pe = (e) => Math.max(10, Math.min(24, Math.floor(Number(e) * .2))), me = (e, t, n) => {
		let r = fe(e), i = pe(r.h), a = n === "output" ? e.outputs : e.inputs, o = Math.max(1, Array.isArray(a) ? a.length : Number(e[`${n}Count`]) || 0), s = ko(t, 0, Math.max(0, o - 1));
		return r.y + i + (r.h - i) * (s + 1) / (o + 1);
	}, he = (e) => Array.isArray(e) && e.length >= 5 ? {
		originId: e[1],
		originSlot: Number(e[2]) || 0,
		targetId: e[3],
		targetSlot: Number(e[4]) || 0,
		type: e[5]
	} : e && typeof e == "object" ? {
		originId: e.origin_id ?? e.originId ?? e.from ?? null,
		originSlot: Number(e.origin_slot ?? e.originSlot ?? e.fromSlot ?? 0) || 0,
		targetId: e.target_id ?? e.targetId ?? e.to ?? null,
		targetSlot: Number(e.target_slot ?? e.targetSlot ?? e.toSlot ?? 0) || 0,
		type: e.type
	} : null, ge = (e) => {
		let t = String(e || "").toUpperCase();
		return t.includes("IMAGE") ? "rgba(145,198,99,0.38)" : t.includes("LATENT") ? "rgba(89,178,118,0.38)" : t.includes("MODEL") ? "rgba(112,155,255,0.38)" : t.includes("CONDITIONING") ? "rgba(191,123,226,0.38)" : t.includes("CLIP") ? "rgba(220,178,77,0.38)" : t.includes("VAE") ? "rgba(72,184,214,0.38)" : t.includes("MASK") ? "rgba(190,190,190,0.36)" : "rgba(255,255,255,0.2)";
	}, _e = () => {
		if (i.showLinks && !(!c || c.length === 0)) {
			r.save(), r.globalAlpha = 1, r.lineWidth = 1;
			for (let e of c) {
				let t = he(e), n = t?.originId, i = t?.targetId;
				if (n === null || i === null) continue;
				let a = h.get(String(n)), o = h.get(String(i));
				if (!a || !o) continue;
				let s = fe(a), c = fe(o), l = {
					x: s.x + s.w,
					y: me(a, t?.originSlot ?? 0, "output")
				}, u = {
					x: c.x,
					y: me(o, t?.targetSlot ?? 0, "input")
				}, d = Math.max(12, Math.min(80, Math.abs(u.x - l.x) * .35));
				r.strokeStyle = ge(t?.type), r.beginPath(), r.moveTo(l.x, l.y), r.bezierCurveTo(l.x + d, l.y, u.x - d, u.y, u.x, u.y), r.stroke();
			}
			r.restore();
		}
	}, k = (e) => {
		let { x: t, y: n, w: a, h: o } = fe(e), s = e.kind === "node", c = e.kind === "group", l = !!e.bypassed, u = !!e.errored, f = c ? .18 : l && i.renderBypassState ? .14 : .62, p = c ? .55 : l && i.renderBypassState ? .32 : .8, m = d(e.fill, f), h = d(e.stroke, p), g = s && i.showNodeLabels && a >= Eo && o >= Do, _ = Math.max(2, Math.min(g ? 7 : 8, Math.floor(Math.min(a, o) * .08))), v = s ? pe(o) : 0;
		if (r.save(), r.globalAlpha = 1, typeof m == "string" && (m.startsWith("#") || m.startsWith("rgb") || m.startsWith("hsl")) ? (r.fillStyle = m, r.globalAlpha = f) : (r.fillStyle = typeof m == "string" ? m : "rgba(82,88,96,0.72)", r.globalAlpha = f), typeof r.roundRect == "function" ? (r.beginPath(), r.roundRect(t, n, a, o, _), r.fill()) : r.fillRect(t, n, a, o), r.restore(), s && (r.save(), r.fillStyle = d(e.stroke || e.fill, l ? .34 : .9), typeof r.roundRect == "function" ? (r.beginPath(), r.roundRect(t, n, a, v, [
			_,
			_,
			0,
			0
		]), r.fill()) : r.fillRect(t, n, a, v), r.restore()), r.globalAlpha = 1, r.strokeStyle = "rgba(255,255,255,0.22)", typeof h == "string" && (h.startsWith("#") || h.startsWith("rgb") || h.startsWith("hsl")) && (r.save(), r.globalAlpha = p, r.strokeStyle = h, r.restore()), s && l && i.renderBypassState) try {
			r.setLineDash([3, 2]);
		} catch (e) {
			console.debug?.(e);
		}
		else try {
			r.setLineDash([]);
		} catch (e) {
			console.debug?.(e);
		}
		if (r.lineWidth = 1, typeof r.roundRect == "function" ? (r.beginPath(), r.roundRect(t, n, a, o, _), r.stroke()) : r.strokeRect(t, n, a, o), s && a >= 24 && o >= 20) {
			let n = Math.min(g ? 16 : 6, Number(e.inputCount) || 0), i = Math.min(g ? 16 : 6, Number(e.outputCount) || 0);
			r.save(), r.strokeStyle = "rgba(0,0,0,0.48)", r.lineWidth = 1;
			for (let i = 0; i < n; i += 1) {
				let n = me(e, i, "input");
				r.fillStyle = Ao(e.inputs?.[i]?.type, !1), r.beginPath(), r.arc(t, n, g ? 3 : 2.2, 0, Math.PI * 2), r.fill(), r.stroke();
			}
			for (let n = 0; n < i; n += 1) {
				let i = me(e, n, "output");
				r.fillStyle = Ao(e.outputs?.[n]?.type, !0), r.beginPath(), r.arc(t + a, i, g ? 3 : 2.2, 0, Math.PI * 2), r.fill(), r.stroke();
			}
			r.restore();
		}
		if (s && u && i.renderErrorState) {
			try {
				r.setLineDash([]);
			} catch (e) {
				console.debug?.(e);
			}
			r.strokeStyle = "rgba(244,67,54,0.95)", r.lineWidth = 1.5, r.strokeRect(t - .5, n - .5, a + 1, o + 1);
		}
		if (s && le && String(e.id || "") === le) {
			try {
				r.setLineDash([]);
			} catch (e) {
				console.debug?.(e);
			}
			r.strokeStyle = "rgba(255,224,130,0.96)", r.lineWidth = 2, r.strokeRect(t - 1, n - 1, a + 2, o + 2);
		}
		if (s && i.showNodeLabels && e.label && a >= 42 && o >= 12) {
			let i = Math.max(8, Math.min(12, Math.floor(v * .58))), o = n + Math.max(8, Math.floor((v + i) / 2) - 1), s = Math.max(20, a - 6), c = e.label;
			for (r.save(), r.beginPath(), r.rect(t + 2, n + 1, a - 4, v - 1), r.clip(), r.font = `600 ${i}px sans-serif`; c.length > 3 && r.measureText(`${c}...`).width > s;) c = c.slice(0, -1);
			let l = c === e.label ? c : `${c}...`;
			r.fillStyle = "rgba(255,255,255,0.92)", r.shadowColor = "rgba(0,0,0,0.5)", r.shadowBlur = 2, r.fillText(l, t + 3, o, s), r.restore();
		}
		if (s && i.showNodeLabels && Array.isArray(e.rows) && a >= 76 && o >= 46) {
			let i = Math.max(7, Math.min(10, Math.floor(o * .12))), s = Math.max(9, i + 4), c = n + v + 4;
			r.save(), r.font = `500 ${i}px sans-serif`, r.fillStyle = "rgba(255,255,255,0.62)";
			for (let l = 0; l < e.rows.length; l += 1) {
				let u = c + l * s;
				if (u + s > n + o - 2) break;
				let [d, f] = e.rows[l], p = `${String(d)}: ${String(f).replace(/\s+/g, " ").slice(0, 42)}`;
				r.fillText(p, t + 5, u + i, Math.max(20, a - 10));
			}
			r.restore();
		}
		if (g && a >= 110) {
			let n = Math.max(7, Math.min(9, Math.floor(o * .09)));
			r.save(), r.font = `500 ${n}px sans-serif`, r.fillStyle = "rgba(255,255,255,0.5)";
			let i = Math.max(24, a * .34);
			for (let a = 0; a < Math.min(8, e.inputs?.length || 0); a += 1) {
				let o = e.inputs[a], s = String(o?.label || o?.localized_name || o?.name || "").trim();
				s && r.fillText(jo(r, s, i), t + 7, me(e, a, "input") + n * .35, i);
			}
			for (let o = 0; o < Math.min(8, e.outputs?.length || 0); o += 1) {
				let s = e.outputs[o], c = String(s?.label || s?.localized_name || s?.name || "").trim();
				if (!c) continue;
				let l = jo(r, c, i);
				r.fillText(l, t + a - 7 - Math.min(i, r.measureText(l).width), me(e, o, "output") + n * .35, i);
			}
			r.restore();
		}
	};
	for (let e of m.filter((e) => e.kind === "group")) k(e);
	_e();
	for (let e of m.filter((e) => e.kind === "node")) k(e);
	if (i.showViewport) try {
		let e = Te();
		if (e) {
			let t = ue(e.x0, e.y0), n = ue(e.x1, e.y1), i = Math.min(t.x, n.x), a = Math.min(t.y, n.y), o = Math.abs(n.x - t.x), s = Math.abs(n.y - t.y);
			r.save(), r.globalAlpha = 1, r.strokeStyle = "rgba(255,255,255,0.9)", r.lineWidth = 1, r.strokeRect(i, a, o, s), r.restore();
		}
	} catch (e) {
		console.debug?.(e);
	}
	return r.globalAlpha = 1, {
		bounds: {
			minX: v,
			minY: y,
			maxX: b,
			maxY: x,
			width: S,
			height: C
		},
		resolvedView: {
			zoom: te,
			centerX: ae,
			centerY: oe,
			visibleW: ne,
			visibleH: re,
			viewMinX: se,
			viewMinY: ce,
			pad: D,
			renderScale: O
		},
		canvasToWorld: de,
		worldToCanvas: ue,
		hitTestNode: (e, t) => {
			let n = de(e, t);
			for (let e = m.length - 1; e >= 0; --e) {
				let t = m[e];
				if (t.kind === "node" && n.x >= t.x && n.x <= t.x + t.w && n.y >= t.y && n.y <= t.y + t.h) return t;
			}
			return null;
		}
	};
}
function No(e) {
	if (!e || typeof e != "object") return e;
	let t = Array.isArray(e.nodes) ? e.nodes.filter(Boolean) : [], n = Po(e);
	if (!t.length) return e;
	let r = [], i = Array.isArray(e.links) ? [...e.links] : [], a = [...Array.isArray(e.groups) ? e.groups : [], ...Array.isArray(e.extra?.groups) ? e.extra.groups : []];
	for (let e of t) {
		r.push(e);
		let t = Fo(e, n);
		if (!t || !Array.isArray(t.nodes) || !t.nodes.length) continue;
		let o = Lo(e, No(t));
		r.push(...o.nodes), i.push(...o.links), o.group && a.push(o.group);
	}
	return {
		...e,
		nodes: r,
		links: i,
		groups: a,
		extra: {
			...e.extra || {},
			groups: a
		}
	};
}
function Po(e) {
	let t = [
		...Array.isArray(e?.definitions?.subgraphs) ? e.definitions.subgraphs : [],
		...Array.isArray(e?.subgraphs) ? e.subgraphs : [],
		...Array.isArray(e?.rootGraph?.subgraphs) ? e.rootGraph.subgraphs : []
	], n = /* @__PURE__ */ new Map();
	for (let e of t) for (let t of Io(e)) t != null && n.set(String(t), e);
	return n;
}
function Fo(e, t) {
	let n = [
		e?.type,
		e?.comfyClass,
		e?.class_type,
		e?.properties?.subgraph_id,
		e?.properties?.subgraphId,
		e?.subgraph?.id,
		e?._subgraph?.id,
		e?.subgraph_instance?.id
	];
	for (let e of n) {
		if (e == null) continue;
		let n = t.get(String(e));
		if (n) return n;
	}
	return [
		e?.subgraph,
		e?._subgraph,
		e?.subgraph?.graph,
		e?.subgraph?.lgraph,
		e?.properties?.subgraph,
		e?.subgraph_instance,
		e?.subgraph_instance?.graph,
		e?.inner_graph,
		e?.subgraph_graph
	].find((e) => e && typeof e == "object" && Array.isArray(e.nodes)) || null;
}
function Io(e) {
	return [
		e?.id,
		e?.name,
		e?.type,
		e?.uuid,
		e?.workflowId,
		e?.workflow_id,
		e?.properties?.subgraph_id,
		e?.properties?.subgraphId
	].filter((e) => e != null && String(e).trim());
}
function Lo(e, t) {
	let n = String(e?.id ?? e?.ID ?? ""), r = zo(e?.pos) || [0, 0], i = Bo(e?.size) || [260, 180], a = t.nodes.filter(Boolean), o = Ro(a), s = Math.min(22, Math.max(8, i[0] * .08)), c = Math.min(34, Math.max(18, i[1] * .18)), l = Math.min(18, Math.max(8, i[1] * .08)), u = Math.max(40, i[0] - s * 2), d = Math.max(34, i[1] - c - l), f = Math.min(1, u / o.width, d / o.height), p = r[0] + s + (u - o.width * f) / 2, m = r[1] + c + (d - o.height * f) / 2, h = a.map((r) => {
		let i = zo(r?.pos) || [o.minX, o.minY], a = Bo(r?.size) || [140, 60];
		return {
			...r,
			id: `${n}::${r?.id ?? r?.ID ?? ""}`,
			pos: [p + (i[0] - o.minX) * f, m + (i[1] - o.minY) * f],
			size: [Math.max(18, a[0] * f), Math.max(14, a[1] * f)],
			_mjrSubgraphParentId: n,
			_mjrSubgraphName: t?.name || e?.title || e?.type || "Subgraph"
		};
	}), g = (e) => `${n}::${e}`;
	return {
		nodes: h,
		links: (Array.isArray(t.links) ? t.links : []).map((e) => {
			if (Array.isArray(e) && e.length >= 4) {
				let t = [...e];
				return t[1] = g(t[1]), t[3] = g(t[3]), t;
			}
			return e && typeof e == "object" ? {
				...e,
				origin_id: e.origin_id == null ? e.origin_id : g(e.origin_id),
				originId: e.originId == null ? e.originId : g(e.originId),
				from: e.from == null ? e.from : g(e.from),
				target_id: e.target_id == null ? e.target_id : g(e.target_id),
				targetId: e.targetId == null ? e.targetId : g(e.targetId),
				to: e.to == null ? e.to : g(e.to)
			} : e;
		}),
		group: {
			title: t?.name || e?.title || "Subgraph",
			bounding: [
				r[0] + 4,
				r[1] + 18,
				Math.max(1, i[0] - 8),
				Math.max(1, i[1] - 22)
			],
			color: e?.color || e?.bgcolor || "#7f8ca3",
			borderColor: "#9fb5d8"
		}
	};
}
function Ro(e) {
	let t = Infinity, n = Infinity, r = -Infinity, i = -Infinity;
	for (let a of e) {
		let e = zo(a?.pos);
		if (!e) continue;
		let o = Bo(a?.size) || [140, 60];
		t = Math.min(t, e[0]), n = Math.min(n, e[1]), r = Math.max(r, e[0] + o[0]), i = Math.max(i, e[1] + o[1]);
	}
	return Number.isFinite(t) ? {
		minX: t,
		minY: n,
		width: Math.max(1, r - t),
		height: Math.max(1, i - n)
	} : {
		minX: 0,
		minY: 0,
		width: 1,
		height: 1
	};
}
function zo(e) {
	if (Array.isArray(e) && e.length >= 2) return [Number(e[0]), Number(e[1])];
	if (e && typeof e == "object") {
		let t = e[0] ?? e[0] ?? e.x ?? e.left ?? null, n = e[1] ?? e[1] ?? e.y ?? e.top ?? null;
		if (t !== null && n !== null) return [Number(t), Number(n)];
	}
	return null;
}
function Bo(e) {
	if (Array.isArray(e) && e.length >= 2) return [Number(e[0]), Number(e[1])];
	if (e && typeof e == "object") {
		let t = e[0] ?? e[0] ?? e.w ?? e.width ?? null, n = e[1] ?? e[1] ?? e.h ?? e.height ?? null;
		if (t !== null && n !== null) return [Number(t), Number(n)];
	}
	return null;
}
function Vo(e) {
	if (Array.isArray(e)) return !0;
	let t = String(e || "").trim().toUpperCase();
	return t === "INT" || t === "FLOAT" || t === "STRING" || t === "BOOLEAN" || t === "BOOL" || t === "COMBO" || t === "ENUM";
}
function Ho(e, t = null) {
	if (!e || typeof e != "object") return null;
	let n = {
		maxNodes: 220,
		...t && typeof t == "object" ? t : {}
	}, r = Object.entries(e);
	if (!r.length) return null;
	let i = [], a = [], o = /* @__PURE__ */ new Map(), s = (e) => e == null ? null : String(e) || null, c = (e) => Array.isArray(e) && e.length === 2 && s(e[0]) != null && Number.isFinite(Number(e[1]));
	for (let [e, t] of r.slice(0, n.maxNodes)) {
		if (!t || typeof t != "object") continue;
		let n = s(e);
		if (!n) continue;
		let r = String(t.class_type || t.type || t.classType || "").trim(), l = t.inputs && typeof t.inputs == "object" ? t.inputs : {}, u = {}, d = [];
		for (let e of Object.values(l)) {
			if (!c(e)) continue;
			let t = s(e[0]);
			t && (d.push(t), a.push([t, n]));
		}
		for (let [e, t] of Object.entries(l)) c(t) || (u[e] = t);
		o.set(n, d);
		let f = r.toLowerCase(), p = "#3a3a3a", m = "#6b6b6b";
		f.includes("ksampler") || f.includes("sampler") ? (p = "#6a4b1f", m = "#b07a2c") : f.includes("cliptext") || f.includes("textencode") || f.includes("conditioning") ? (p = "#1f5f3a", m = "#2cb06c") : f.includes("checkpoint") || f.includes("loader") || f.includes("model") ? (p = "#243a6a", m = "#3f6fd6") : (f.includes("save") || f.includes("preview") || f.includes("video")) && (p = "#4a2a5f", m = "#8c4cd1"), i.push({
			id: Number.isFinite(Number(n)) ? Number(n) : n,
			type: r || "Node",
			pos: [0, 0],
			size: [180, 80],
			bgcolor: p,
			color: m,
			title: String(t?._meta?.title || t?.title || "").trim() || void 0,
			inputs: u,
			outputs: []
		});
	}
	if (!i.length) return null;
	let l = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Set(), d = (e) => {
		if (l.has(e)) return l.get(e);
		if (u.has(e)) return 0;
		u.add(e);
		let t = 0, n = o.get(e) || [];
		for (let e of n) t = Math.max(t, d(e) + 1);
		return u.delete(e), l.set(e, t), t;
	};
	for (let e of i) d(String(e.id));
	let f = /* @__PURE__ */ new Map();
	for (let e of i) {
		let t = l.get(String(e.id)) ?? 0;
		f.has(t) || f.set(t, []), f.get(t).push(e);
	}
	let p = Array.from(f.keys()).sort((e, t) => e - t);
	for (let e of p) {
		let t = f.get(e) || [];
		t.sort((e, t) => Number(e.id) - Number(t.id));
		for (let n = 0; n < t.length; n++) t[n].pos = [e * 220, n * 110];
	}
	let m = 1;
	return {
		id: "synthetic",
		nodes: i,
		links: a.filter(([e, t]) => e !== t).slice(0, 4e3).map(([e, t]) => [
			m++,
			Number.isFinite(Number(e)) ? Number(e) : e,
			0,
			Number.isFinite(Number(t)) ? Number(t) : t,
			0,
			"LINK"
		]),
		extra: { synthetic: !0 }
	};
}
//#endregion
//#region ui/vue/components/panel/sidebar/SidebarWorkflowSection.vue
var Uo = {
	key: 0,
	class: "mjr-sidebar-section",
	style: {
		background: "var(--comfy-menu-bg, rgba(0,0,0,0.2))",
		border: "1px solid var(--border-color, rgba(255,255,255,0.14))",
		"border-radius": "8px",
		padding: "12px",
		"min-width": "300px"
	}
}, Wo = { style: {
	display: "flex",
	"flex-wrap": "wrap",
	gap: "8px",
	"margin-bottom": "10px"
} }, Go = { style: {
	padding: "4px 9px",
	"border-radius": "999px",
	background: "rgba(33,150,243,0.14)",
	border: "1px solid rgba(33,150,243,0.30)",
	"font-size": "11px",
	"font-weight": "700",
	color: "#90CAF9",
	"text-transform": "uppercase",
	"letter-spacing": "0.4px"
} }, Ko = {
	key: 0,
	style: {
		padding: "4px 9px",
		"border-radius": "999px",
		background: "rgba(255,255,255,0.06)",
		border: "1px solid rgba(255,255,255,0.12)",
		"font-size": "11px",
		"font-weight": "600",
		color: "rgba(255,255,255,0.82)"
	}
}, qo = { style: {
	display: "grid",
	"grid-template-columns": "repeat(3, minmax(0, 1fr))",
	gap: "8px",
	"margin-bottom": "12px"
} }, Jo = { style: {
	padding: "8px 10px",
	"border-radius": "10px",
	background: "rgba(255,255,255,0.04)",
	border: "1px solid rgba(255,255,255,0.10)"
} }, Yo = { style: {
	"font-size": "18px",
	"font-weight": "700",
	color: "rgba(255,255,255,0.94)",
	"margin-top": "2px"
} }, Xo = { style: {
	padding: "8px 10px",
	"border-radius": "10px",
	background: "rgba(255,255,255,0.04)",
	border: "1px solid rgba(255,255,255,0.10)"
} }, Zo = { style: {
	"font-size": "18px",
	"font-weight": "700",
	color: "rgba(255,255,255,0.94)",
	"margin-top": "2px"
} }, Qo = { style: {
	padding: "8px 10px",
	"border-radius": "10px",
	background: "rgba(255,255,255,0.04)",
	border: "1px solid rgba(255,255,255,0.10)"
} }, $o = { style: {
	"font-size": "18px",
	"font-weight": "700",
	color: "rgba(255,255,255,0.94)",
	"margin-top": "2px"
} }, es = { style: {
	"margin-bottom": "12px",
	padding: "10px",
	"border-radius": "10px",
	background: "rgba(255,255,255,0.03)",
	border: "1px solid rgba(255,255,255,0.10)"
} }, ts = { style: {
	display: "flex",
	"align-items": "center",
	"justify-content": "space-between",
	gap: "10px",
	"margin-bottom": "8px"
} }, ns = { style: {
	"font-size": "12px",
	color: "rgba(255,255,255,0.8)",
	"margin-top": "2px"
} }, rs = {
	key: 0,
	style: {
		display: "flex",
		"flex-wrap": "wrap",
		gap: "4px",
		"justify-content": "flex-end"
	}
}, is = { style: {
	display: "flex",
	gap: "8px",
	"align-items": "center"
} }, as = ["placeholder"], os = {
	key: 0,
	class: "mjr-workflow-tree-wrap"
}, ss = { class: "mjr-workflow-tree-node" }, cs = { class: "mjr-workflow-tree-node-name" }, ls = {
	key: 0,
	class: "mjr-workflow-tree-node-type"
}, us = { class: "mjr-menu-item-hint" }, ds = {
	key: 0,
	class: "mjr-section-hint"
}, fs = { style: {
	display: "flex",
	"align-items": "center",
	"justify-content": "space-between",
	gap: "10px",
	"margin-top": "8px"
} }, ps = { style: {
	display: "flex",
	"flex-wrap": "wrap",
	gap: "6px",
	"align-items": "center"
} }, ms = {
	key: 1,
	style: {
		display: "grid",
		"grid-template-columns": "repeat(auto-fit, minmax(180px, 1fr))",
		gap: "8px",
		"align-items": "stretch",
		"margin-top": "10px",
		"margin-bottom": "10px"
	}
}, hs = { style: {
	display: "flex",
	"flex-direction": "column",
	gap: "2px",
	"min-width": "0"
} }, gs = { style: {
	"font-size": "13px",
	"font-weight": "600"
} }, _s = { style: {
	"font-size": "11px",
	color: "rgba(255,255,255,0.58)"
} }, vs = { style: {
	display: "flex",
	gap: "10px",
	"align-items": "stretch",
	"margin-top": "10px"
} }, ys = { style: {
	display: "flex",
	"justify-content": "space-between",
	"align-items": "center",
	gap: "10px",
	"margin-top": "8px",
	"font-size": "11px",
	color: "rgba(255,255,255,0.58)"
} }, bs = ["open"], xs = { style: {
	background: "rgba(0,0,0,0.5)",
	padding: "10px",
	"border-radius": "6px",
	"font-size": "11px",
	overflow: "auto",
	"max-height": "180px",
	margin: "10px 0 0 0",
	color: "#90CAF9",
	"font-family": "'Consolas', 'Monaco', monospace"
} }, Ss = 1, Cs = 8, ws = 250, Ts = {
	__name: "SidebarWorkflowSection",
	props: { asset: {
		type: Object,
		required: !0
	} },
	setup(e) {
		let t = e, n = Object.freeze({
			nodeColors: !0,
			showLinks: !0,
			showGroups: !0,
			renderBypassState: !0,
			renderErrorState: !0,
			showViewport: !0,
			showNodeLabels: !1,
			size: "comfortable"
		}), r = Object.freeze({
			zoom: 1,
			centerX: null,
			centerY: null,
			hoveredNodeId: null
		}), i = Object.freeze([
			{
				key: "compact",
				label: "Compact",
				height: 120
			},
			{
				key: "comfortable",
				label: "Comfort",
				height: 160
			},
			{
				key: "expanded",
				label: "Expanded",
				height: 220
			}
		]), a = M(null), o = M(""), s = M(!1), l = M(!1), u = M(null), d = M(!1), f = M(!1), m = M(re()), h = M({ ...r }), g = M("crosshair"), _ = M(""), v = null, y = null, b = null;
		function x(e, t, n) {
			let r = Number(e);
			return Number.isFinite(r) ? Math.max(t, Math.min(n, r)) : t;
		}
		function S(e) {
			!e || typeof e != "object" || (h.value = {
				...h.value,
				zoom: x(e.zoom ?? h.value.zoom, Ss, Cs),
				centerX: Number.isFinite(Number(e.centerX)) ? Number(e.centerX) : null,
				centerY: Number.isFinite(Number(e.centerY)) ? Number(e.centerY) : null
			});
		}
		function C() {
			h.value = { ...r }, _.value = "";
		}
		function w(e) {
			let t = e?.metadata_raw ?? null;
			if (!t) return null;
			if (typeof t == "object") return t;
			if (typeof t == "string") {
				let e = t.trim();
				if (!e) return null;
				try {
					let t = JSON.parse(e);
					return t && typeof t == "object" ? t : null;
				} catch {
					return null;
				}
			}
			return null;
		}
		function T(e) {
			try {
				let t = Object.entries(e || {});
				if (!t.length) return !1;
				let n = 0;
				for (let [, e] of t.slice(0, 50)) if (!(!e || typeof e != "object") && (e.inputs && typeof e.inputs == "object" && (n += 1), n >= 2)) return !0;
			} catch {
				return !1;
			}
			return !1;
		}
		function te(e) {
			let t = w(e), n = e?.workflow || e?.Workflow || e?.comfy_workflow || t?.workflow || t?.Workflow || t?.comfy_workflow || null;
			if (!n) return null;
			if (typeof n == "object") return n;
			if (typeof n == "string") {
				let e = n.trim();
				if (!e) return null;
				try {
					return JSON.parse(e);
				} catch {
					return null;
				}
			}
			return null;
		}
		function ne(e) {
			let t = w(e), n = e?.prompt || e?.Prompt || t?.prompt || t?.Prompt || null;
			if (!n) return null;
			if (typeof n == "object") return T(n) ? n : null;
			if (typeof n == "string") {
				let e = n.trim();
				if (!e) return null;
				try {
					let t = JSON.parse(e);
					return T(t) ? t : null;
				} catch {
					return null;
				}
			}
			return null;
		}
		function re() {
			try {
				let e = q?.()?.workflowMinimap;
				if (e && typeof e == "object") return {
					...n,
					...e
				};
			} catch (e) {
				console.debug?.(e);
			}
			try {
				let e = localStorage?.getItem?.(c);
				if (!e) return { ...n };
				let t = JSON.parse(e);
				if (!t || typeof t != "object") return { ...n };
				let r = {
					...n,
					...t
				};
				try {
					let e = q();
					e.workflowMinimap = {
						...e.workflowMinimap,
						...r
					}, J(e), localStorage?.removeItem?.(c);
				} catch (e) {
					console.debug?.(e);
				}
				return r;
			} catch {
				return { ...n };
			}
		}
		function ie(e) {
			try {
				let t = q();
				t.workflowMinimap = {
					...t.workflowMinimap,
					...e
				}, J(t);
			} catch (e) {
				console.debug?.(e);
			}
		}
		let E = N(() => {
			let e = te(t.asset) || te(u.value), n = ne(t.asset) || ne(u.value);
			return !e && !n ? null : e || Ho(n);
		}), ae = N(() => String(t.asset?.filepath || t.asset?.path || t.asset?.file_info?.filepath || "").trim());
		async function oe() {
			if (E.value) return;
			let e = ae.value;
			if (e && !l.value) {
				l.value = !0;
				try {
					let t = await se(e, { timeoutMs: 25e3 });
					if (!t?.ok) return;
					let n = t?.data?.workflow || t?.workflow || null, r = t?.data?.prompt || t?.prompt || null;
					if (!n && !r) return;
					u.value = {
						workflow: n,
						prompt: r
					};
				} catch (e) {
					console.debug?.(e);
				} finally {
					l.value = !1;
				}
			}
		}
		let ce = N(() => t.asset?.has_generation_data ? "Complete" : "Partial"), D = N(() => E.value ? JSON.stringify(E.value, null, 2) : ""), O = N(() => String(t.asset?.category || t.asset?.subfolder || t.asset?.folder || "").trim().replace(/^\/+|\/+$/g, "")), le = N(() => O.value ? O.value.split(/[\\/]+/).filter(Boolean) : []);
		function ue(e, t) {
			let n = e?.id ?? e?.key ?? t + 1;
			return String(e?.title || e?._meta?.title || e?.type || e?.class_type || e?.name || `Node ${n}`);
		}
		function de(e) {
			return String(e?.type || e?.class_type || e?.name || "").trim();
		}
		function fe() {
			o.value = O.value;
		}
		async function pe() {
			let e = String(t.asset?.filepath || t.asset?.path || t.asset?.file_info?.filepath || "").trim();
			if (!e) {
				p(k("toast.workflowMissingPath", "Workflow file path is missing."), "error");
				return;
			}
			let n = String(o.value || "").trim();
			if (n !== O.value) {
				s.value = !0;
				try {
					let t = await ee({
						filepath: e,
						category: n
					}, { timeoutMs: 3e4 });
					if (!t?.ok) {
						p(t?.error || k("toast.workflowMoveFailed", "Failed to move workflow."), "error");
						return;
					}
					o.value = String(t?.data?.workflow?.category || n || "").trim(), p(k("toast.workflowCategoryUpdated", "Workflow category updated"), "success", 1800);
				} catch {
					p(k("toast.workflowMoveFailed", "Failed to move workflow."), "error");
				} finally {
					s.value = !1;
				}
			}
		}
		let me = N(() => (Array.isArray(E.value?.nodes) ? E.value.nodes : []).slice(0, ws).map((e, t) => {
			let n = e?.id ?? e?.key ?? t + 1, r = de(e);
			return {
				key: String(n),
				label: ue(e, t),
				icon: "pi pi-circle-fill",
				data: {
					id: n,
					type: r
				}
			};
		})), he = N(() => Math.max(0, Number(ge.value.nodes || 0) - me.value.length)), ge = N(() => {
			let e = E.value;
			return e ? {
				nodes: Array.isArray(e?.nodes) ? e.nodes.length : 0,
				links: Array.isArray(e?.links) && e.links.length || Array.isArray(e?.extra?.links) && e.extra.links.length || 0,
				groups: Array.isArray(e?.groups) && e.groups.length || Array.isArray(e?.extra?.groups) && e.extra.groups.length || Array.isArray(e?.extra?.groupNodes) && e.extra.groupNodes.length || Array.isArray(e?.extra?.group_nodes) && e.extra.group_nodes.length || 0,
				source: e?.extra?.synthetic ? "Synthetic" : "Embedded"
			} : {
				nodes: 0,
				links: 0,
				groups: 0,
				source: ""
			};
		}), _e = N(() => {
			let e = String(m.value?.size || "comfortable");
			return i.find((t) => t.key === e) || i[1];
		}), A = N(() => `${_e.value.height}px`), ye = N(() => [
			{
				key: "showNodeLabels",
				label: "Node Labels",
				iconClass: "pi pi-tag"
			},
			{
				key: "nodeColors",
				label: "Node Colors",
				iconClass: "pi pi-palette"
			},
			{
				key: "showLinks",
				label: "Show Links",
				iconClass: "pi pi-share-alt"
			},
			{
				key: "showGroups",
				label: "Show Frames/Groups",
				iconClass: "pi pi-th-large"
			},
			{
				key: "renderBypassState",
				label: "Render Bypass State",
				iconClass: "pi pi-ban"
			},
			{
				key: "renderErrorState",
				label: "Render Error State",
				iconClass: "pi pi-exclamation-triangle"
			},
			{
				key: "showViewport",
				label: "Show Viewport",
				iconClass: "pi pi-window-maximize"
			}
		]);
		function be() {
			let e = a.value, t = E.value;
			if (!e || !t) return;
			let n = Math.max(1, e.clientWidth || 320), r = Math.max(1, e.clientHeight || 120), i = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
			e.width = Math.floor(n * i), e.height = Math.floor(r * i);
			let o = e.getContext("2d");
			o && o.setTransform(i, 0, 0, i, 0, 0), y = Mo(e, t, {
				...m.value,
				view: h.value
			}) || null, S(y?.resolvedView);
		}
		function xe(e) {
			ve(e);
		}
		function Se(e) {
			let t = a.value;
			if (!t) return null;
			let n = t.getBoundingClientRect?.();
			return n ? {
				x: Number(e?.clientX) - n.left,
				y: Number(e?.clientY) - n.top
			} : null;
		}
		function j(e) {
			let t = Se(e);
			return !t || !y?.canvasToWorld ? null : {
				local: t,
				world: y.canvasToWorld(t.x, t.y)
			};
		}
		function Ce(e) {
			let t = Se(e), n = t && y?.hitTestNode ? y.hitTestNode(t.x, t.y) : null, r = n?.id !== null && n?.id !== void 0 ? String(n.id) : null, i = h.value.hoveredNodeId !== null && h.value.hoveredNodeId !== void 0 ? String(h.value.hoveredNodeId) : null;
			_.value = n?.label || "", r !== i && (h.value = {
				...h.value,
				hoveredNodeId: r
			}, be());
		}
		function we(e) {
			e && (xe(e), h.value = {
				...h.value,
				centerX: Number(e.x),
				centerY: Number(e.y)
			}, be());
		}
		function Te(e) {
			if (Number(e?.button ?? 0) !== 0) return;
			let t = j(e);
			t && (b = e.pointerId ?? 1, g.value = "grabbing", a.value?.setPointerCapture?.(b), we(t.world), Ce(e), e.preventDefault?.(), e.stopPropagation?.());
		}
		function Pe(e) {
			if (b !== null && e.pointerId === b) {
				let t = j(e);
				t && we(t.world), e.preventDefault?.(), e.stopPropagation?.();
				return;
			}
			Ce(e);
		}
		function Fe(e) {
			b !== null && e?.pointerId === b && (a.value?.releasePointerCapture?.(b), b = null, g.value = "crosshair"), e?.type === "pointerleave" && (_.value = "", h.value.hoveredNodeId !== null && (h.value = {
				...h.value,
				hoveredNodeId: null
			}, be()));
		}
		function Ie(e) {
			let t = j(e), n = y?.resolvedView;
			if (!t || !n) return;
			let r = x(Number(e?.deltaY) || 0, -240, 240), i = Math.exp(-r * .0025), a = x((Number(h.value.zoom) || 1) * i, Ss, Cs);
			if (Math.abs(a - (Number(h.value.zoom) || 1)) < .001) {
				e.preventDefault?.(), e.stopPropagation?.();
				return;
			}
			let o = Math.max(1, Number(y?.bounds?.width || 1) / a), s = Math.max(1, Number(y?.bounds?.height || 1) / a), c = x((Number(t.world.x) - Number(n.viewMinX || 0)) / Math.max(1, Number(n.visibleW || 1)), 0, 1), l = x((Number(t.world.y) - Number(n.viewMinY || 0)) / Math.max(1, Number(n.visibleH || 1)), 0, 1);
			h.value = {
				...h.value,
				zoom: a,
				centerX: Number(t.world.x) + (.5 - c) * o,
				centerY: Number(t.world.y) + (.5 - l) * s
			}, be(), Ce(e), e.preventDefault?.(), e.stopPropagation?.();
		}
		function Le(e) {
			let t = j(e);
			C(), t && xe(t.world), be(), e.preventDefault?.(), e.stopPropagation?.();
		}
		function Re(e) {
			m.value = {
				...m.value,
				[e]: !m.value?.[e]
			}, ie(m.value);
		}
		function ze(e) {
			i.some((t) => t.key === e) && (m.value = {
				...m.value,
				size: e
			}, ie(m.value));
		}
		return Ee(() => {
			a.value && typeof ResizeObserver == "function" && (v = new ResizeObserver(() => be()), v.observe(a.value)), fe(), oe(), be();
		}), Oe(E, () => {
			C(), be();
		}, { flush: "post" }), Oe(ae, () => {
			u.value = null, oe();
		}, { immediate: !0 }), Oe(O, () => {
			fe();
		}), Oe(m, () => {
			be();
		}, {
			deep: !0,
			flush: "post"
		}), Oe(d, () => {
			be();
		}, { flush: "post" }), Ae(() => {
			try {
				v?.disconnect?.();
			} catch (e) {
				console.debug?.(e);
			}
			v = null, b = null;
		}), (e, t) => {
			let n = Me("MButton"), r = Me("MTree");
			return E.value ? (I(), P("div", Uo, [
				t[10] ||= B("div", { style: {
					"font-size": "13px",
					"font-weight": "600",
					color: "var(--fg-color, #eaeaea)",
					"margin-bottom": "12px",
					"text-transform": "uppercase",
					"letter-spacing": "0.5px"
				} }, " ComfyUI Workflow ", -1),
				B("div", Wo, [B("div", Go, R(ce.value), 1), ge.value.source ? (I(), P("div", Ko, R(ge.value.source), 1)) : F("", !0)]),
				B("div", qo, [
					B("div", Jo, [t[3] ||= B("div", { style: {
						"font-size": "10px",
						"font-weight": "700",
						color: "rgba(255,255,255,0.55)",
						"text-transform": "uppercase",
						"letter-spacing": "0.4px"
					} }, "Nodes", -1), B("div", Yo, R(ge.value.nodes), 1)]),
					B("div", Xo, [t[4] ||= B("div", { style: {
						"font-size": "10px",
						"font-weight": "700",
						color: "rgba(255,255,255,0.55)",
						"text-transform": "uppercase",
						"letter-spacing": "0.4px"
					} }, "Links", -1), B("div", Zo, R(ge.value.links), 1)]),
					B("div", Qo, [t[5] ||= B("div", { style: {
						"font-size": "10px",
						"font-weight": "700",
						color: "rgba(255,255,255,0.55)",
						"text-transform": "uppercase",
						"letter-spacing": "0.4px"
					} }, "Groups", -1), B("div", $o, R(ge.value.groups), 1)])
				]),
				B("div", es, [B("div", ts, [B("div", null, [t[6] ||= B("div", { style: {
					"font-size": "10px",
					"font-weight": "700",
					color: "rgba(255,255,255,0.55)",
					"text-transform": "uppercase",
					"letter-spacing": "0.4px"
				} }, "Category", -1), B("div", ns, R(O.value || "Root"), 1)]), le.value.length ? (I(), P("div", rs, [(I(!0), P(V, null, H(le.value, (e) => (I(), P("span", {
					key: e,
					style: {
						padding: "3px 7px",
						"border-radius": "999px",
						background: "rgba(33,150,243,0.12)",
						border: "1px solid rgba(33,150,243,0.22)",
						"font-size": "10px",
						"font-weight": "700",
						color: "#90CAF9",
						"text-transform": "uppercase",
						"letter-spacing": "0.3px"
					}
				}, R(e), 1))), 128))])) : F("", !0)]), B("div", is, [De(B("input", {
					"onUpdate:modelValue": t[0] ||= (e) => o.value = e,
					type: "text",
					placeholder: L(k)("dialog.workflowCategory", "Workflow category"),
					style: {
						flex: "1",
						"min-width": "0",
						padding: "9px 10px",
						"border-radius": "8px",
						border: "1px solid rgba(255,255,255,0.12)",
						background: "rgba(0,0,0,0.22)",
						color: "rgba(255,255,255,0.92)",
						"font-size": "12px"
					}
				}, null, 8, as), [[$e, o.value]]), He(n, {
					type: "button",
					severity: "secondary",
					text: "",
					rounded: "",
					disabled: s.value,
					style: z({
						padding: "8px 12px",
						borderRadius: "8px",
						border: "1px solid rgba(255,255,255,0.12)",
						background: s.value ? "rgba(255,255,255,0.06)" : "rgba(33,150,243,0.16)",
						color: "rgba(255,255,255,0.92)",
						cursor: s.value ? "wait" : "pointer",
						fontSize: "12px",
						fontWeight: "700",
						whiteSpace: "nowrap"
					}),
					onClick: pe
				}, {
					default: Ne(() => [ke(R(s.value ? "Saving..." : "Move"), 1)]),
					_: 1
				}, 8, ["disabled", "style"])])]),
				me.value.length ? (I(), P("div", os, [
					t[7] ||= B("div", { class: "mjr-section-title" }, " Workflow Nodes ", -1),
					He(r, {
						value: me.value,
						class: "mjr-workflow-tree",
						"scroll-height": "180px",
						pt: {
							wrapper: { class: "mjr-workflow-tree-scroll" },
							rootChildren: { class: "mjr-workflow-tree-list" },
							nodeContent: { class: "mjr-workflow-tree-node-content" },
							nodeToggleButton: { class: "mjr-workflow-tree-toggle" },
							nodeIcon: { class: "mjr-workflow-tree-icon" },
							nodeLabel: { class: "mjr-workflow-tree-label" }
						}
					}, {
						default: Ne(({ node: e }) => [B("span", ss, [
							B("span", cs, R(e.label), 1),
							e.data?.type ? (I(), P("span", ls, R(e.data.type), 1)) : F("", !0),
							B("span", us, "#" + R(e.data?.id), 1)
						])]),
						_: 1
					}, 8, ["value"]),
					he.value ? (I(), P("div", ds, " +" + R(he.value) + " more nodes ", 1)) : F("", !0)
				])) : F("", !0),
				B("div", fs, [B("div", ps, [(I(!0), P(V, null, H(L(i), (e) => (I(), je(n, {
					key: e.key,
					type: "button",
					severity: "secondary",
					text: "",
					rounded: "",
					title: `${e.label} minimap`,
					style: z({
						appearance: "none",
						border: m.value.size === e.key ? "1px solid rgba(33,150,243,0.55)" : "1px solid rgba(255,255,255,0.12)",
						borderRadius: "999px",
						padding: "4px 10px",
						background: m.value.size === e.key ? "rgba(33,150,243,0.18)" : "rgba(255,255,255,0.04)",
						color: m.value.size === e.key ? "#90CAF9" : "rgba(255,255,255,0.78)",
						fontSize: "11px",
						fontWeight: m.value.size === e.key ? "700" : "600",
						cursor: "pointer"
					}),
					onClick: (t) => ze(e.key)
				}, {
					default: Ne(() => [ke(R(e.label), 1)]),
					_: 2
				}, 1032, [
					"title",
					"style",
					"onClick"
				]))), 128))]), He(n, {
					type: "button",
					class: "mjr-btn mjr-icon-btn",
					severity: "secondary",
					text: "",
					rounded: "",
					title: L(k)("tooltip.minimapSettings", "Minimap settings"),
					style: {
						width: "28px",
						height: "28px",
						"border-radius": "8px",
						display: "inline-flex",
						"align-items": "center",
						"justify-content": "center",
						border: "1px solid var(--mjr-border, rgba(255,255,255,0.12))",
						background: "rgba(255,255,255,0.06)",
						color: "rgba(255,255,255,0.9)",
						cursor: "pointer"
					},
					onClick: t[1] ||= (e) => d.value = !d.value
				}, {
					default: Ne(() => [...t[8] ||= [B("i", { class: "pi pi-sliders-h" }, null, -1)]]),
					_: 1
				}, 8, ["title"])]),
				d.value ? (I(), P("div", ms, [(I(!0), P(V, null, H(ye.value, (e) => (I(), je(n, {
					key: e.key,
					type: "button",
					severity: "secondary",
					text: "",
					style: z({
						display: "flex",
						alignItems: "center",
						gap: "10px",
						padding: "9px 10px",
						borderRadius: "10px",
						border: m.value?.[e.key] ? "1px solid rgba(76,175,80,0.40)" : "1px solid rgba(255,255,255,0.12)",
						background: m.value?.[e.key] ? "rgba(76,175,80,0.10)" : "rgba(255,255,255,0.04)",
						cursor: "pointer",
						color: "rgba(255,255,255,0.92)",
						textAlign: "left"
					}),
					onClick: (t) => Re(e.key)
				}, {
					default: Ne(() => [
						B("span", { style: z({
							width: "22px",
							height: "22px",
							borderRadius: "6px",
							display: "inline-flex",
							alignItems: "center",
							justifyContent: "center",
							background: m.value?.[e.key] ? "rgba(76,175,80,0.95)" : "rgba(255,255,255,0.08)",
							border: m.value?.[e.key] ? "1px solid rgba(76,175,80,0.35)" : "1px solid rgba(255,255,255,0.12)",
							flex: "0 0 auto"
						}) }, [B("i", {
							class: "pi pi-check",
							style: z({
								fontSize: "12px",
								opacity: m.value?.[e.key] ? "1" : "0"
							})
						}, null, 4)], 4),
						B("i", {
							class: qe(e.iconClass),
							style: {
								"font-size": "18px",
								opacity: "0.9",
								width: "18px"
							}
						}, null, 2),
						B("div", hs, [B("div", gs, R(e.label), 1), B("div", _s, R(m.value?.[e.key] ? "On" : "Off"), 1)])
					]),
					_: 2
				}, 1032, ["style", "onClick"]))), 128))])) : F("", !0),
				B("div", vs, [B("canvas", {
					ref_key: "canvasRef",
					ref: a,
					style: z({
						width: "100%",
						height: A.value,
						cursor: g.value,
						touchAction: "none",
						borderRadius: "10px",
						marginTop: "0",
						background: "linear-gradient(180deg, rgba(7, 12, 18, 0.95) 0%, rgba(10, 16, 24, 0.92) 100%)",
						border: "1px solid var(--mjr-border, rgba(255,255,255,0.12))",
						boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)"
					}),
					onPointerdown: Te,
					onPointermove: Pe,
					onPointerup: Fe,
					onPointercancel: Fe,
					onPointerleave: Fe,
					onWheel: Ie,
					onDblclick: Le
				}, null, 36)]),
				B("div", ys, [B("span", null, R(_.value || "Click/drag to navigate | wheel to zoom"), 1), B("span", null, R(Math.round((h.value.zoom || 1) * 100)) + "% | " + R(_e.value.label), 1)]),
				B("details", {
					open: f.value,
					style: { "margin-top": "10px" },
					onToggle: t[2] ||= (e) => f.value = e.target.open
				}, [t[9] ||= B("summary", { style: {
					cursor: "pointer",
					color: "var(--mjr-muted, rgba(255,255,255,0.65))",
					"font-size": "12px",
					"user-select": "none"
				} }, " Show raw JSON ", -1), B("pre", xs, R(D.value), 1)], 40, bs)
			])) : F("", !0);
		};
	}
};
//#endregion
export { ti as A, fr as B, Xr as C, Yr as D, ni as E, kr as F, J as G, en as H, zr as I, ut as J, xt as K, Lr as L, Br as M, Cr as N, ei as O, Ar as P, Sr as R, oi as S, Zr as T, Y as U, dr as V, q as W, ci as _, yo as a, ri as b, Qi as c, Ti as d, wi as f, fi as g, xi as h, xo as i, Ur as j, $r as k, Ai as l, bi as m, Mo as n, So as o, hi as p, St as q, Ho as r, mo as s, Ts as t, Ci as u, li as v, Hr as w, si as x, ui as y, xr as z };

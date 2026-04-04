import { s as G, t as B, E as T, n as te, a as U, e as R, g as z, b as $, i as W, c as ie, d as ne, M as se, h as oe, j as re, k as le } from "./entry-CXLg7p3s.js";
const g = Object.freeze({
  SIMPLE: "simple",
  AB: "ab",
  SIDE: "side",
  GRID: "grid"
}), X = 0.25, K = 8, ae = 8e-4, H = 8;
let de = 0;
const ce = /* @__PURE__ */ new Set([".mp4", ".webm", ".mov", ".avi", ".mkv"]), he = /* @__PURE__ */ new Set([".mp3", ".wav", ".flac", ".ogg", ".m4a", ".aac", ".opus", ".wma"]), pe = "C", q = "L", Z = "K", ue = "N", me = "Esc";
function _e() {
  var p, e, t, i, s;
  try {
    const n = typeof window < "u" ? window : globalThis, r = (e = (p = n == null ? void 0 : n.process) == null ? void 0 : p.versions) == null ? void 0 : e.electron;
    if (typeof r == "string" && r.trim() || n != null && n.electron || n != null && n.ipcRenderer || n != null && n.electronAPI)
      return !0;
    const a = String(((t = n == null ? void 0 : n.navigator) == null ? void 0 : t.userAgent) || ((i = globalThis == null ? void 0 : globalThis.navigator) == null ? void 0 : i.userAgent) || ""), l = /\bElectron\//i.test(a), o = /\bCode\//i.test(a);
    if (l && !o)
      return !0;
  } catch (n) {
    (s = console.debug) == null || s.call(console, n);
  }
  return !1;
}
function C(p, e = null, t = "info") {
  var s, n;
  const i = {
    stage: String(p || "unknown"),
    detail: e,
    ts: Date.now()
  };
  try {
    const r = typeof window < "u" ? window : globalThis, a = "__MJR_MFV_POPOUT_TRACE__", l = Array.isArray(r[a]) ? r[a] : [];
    l.push(i), r[a] = l.slice(-20), r.__MJR_MFV_POPOUT_LAST__ = i;
  } catch (r) {
    (s = console.debug) == null || s.call(console, r);
  }
  try {
    const r = t === "error" ? console.error : t === "warn" ? console.warn : console.info;
    r == null || r("[MFV popout]", i);
  } catch (r) {
    (n = console.debug) == null || n.call(console, r);
  }
}
function fe(p) {
  try {
    const e = String(p || "").trim(), t = e.lastIndexOf(".");
    return t >= 0 ? e.slice(t).toLowerCase() : "";
  } catch {
    return "";
  }
}
function I(p) {
  const e = String((p == null ? void 0 : p.kind) || "").toLowerCase();
  if (e === "video") return "video";
  if (e === "audio") return "audio";
  if (e === "model3d") return "model3d";
  const t = fe((p == null ? void 0 : p.filename) || "");
  return t === ".gif" ? "gif" : ce.has(t) ? "video" : he.has(t) ? "audio" : se.has(t) ? "model3d" : "image";
}
function Q(p) {
  return p ? p.url ? String(p.url) : p.filename && p.id == null ? re(p.filename, p.subfolder || "", p.type || "output") : p.filename && le(p) || "" : "";
}
function M(p = "No media — select assets in the grid") {
  const e = document.createElement("div");
  return e.className = "mjr-mfv-empty", e.textContent = p, e;
}
function j(p, e) {
  const t = document.createElement("div");
  return t.className = `mjr-mfv-label label-${e}`, t.textContent = p, t;
}
function J(p) {
  var e;
  if (!(!p || typeof p.play != "function"))
    try {
      const t = p.play();
      t && typeof t.catch == "function" && t.catch(() => {
      });
    } catch (t) {
      (e = console.debug) == null || e.call(console, t);
    }
}
function ge(p, e) {
  var i, s;
  let t = p && p.nodeType === 1 ? p : (p == null ? void 0 : p.parentElement) || null;
  for (; t && t !== e; ) {
    try {
      const n = (i = window.getComputedStyle) == null ? void 0 : i.call(window, t), r = /(auto|scroll|overlay)/.test(String((n == null ? void 0 : n.overflowY) || "")), a = /(auto|scroll|overlay)/.test(String((n == null ? void 0 : n.overflowX) || ""));
      if (r || a)
        return t;
    } catch (n) {
      (s = console.debug) == null || s.call(console, n);
    }
    t = t.parentElement || null;
  }
  return null;
}
function be(p, e, t) {
  if (!p) return !1;
  if (Math.abs(Number(t) || 0) >= Math.abs(Number(e) || 0)) {
    const n = Number(p.scrollTop || 0), r = Math.max(0, Number(p.scrollHeight || 0) - Number(p.clientHeight || 0));
    if (t < 0 && n > 0 || t > 0 && n < r) return !0;
  }
  const i = Number(p.scrollLeft || 0), s = Math.max(0, Number(p.scrollWidth || 0) - Number(p.clientWidth || 0));
  return e < 0 && i > 0 || e > 0 && i < s;
}
function ve(p) {
  var e, t, i, s;
  if (p)
    try {
      const n = (e = p.querySelectorAll) == null ? void 0 : e.call(p, "video, audio");
      if (!n || !n.length) return;
      for (const r of n)
        try {
          (t = r.pause) == null || t.call(r);
        } catch (a) {
          (i = console.debug) == null || i.call(console, a);
        }
    } catch (n) {
      (s = console.debug) == null || s.call(console, n);
    }
}
function D(p, { fill: e = !1 } = {}) {
  var r;
  const t = Q(p);
  if (!t) return null;
  const i = I(p), s = `mjr-mfv-media mjr-mfv-media--fit-height${e ? " mjr-mfv-media--fill" : ""}`;
  if (i === "audio") {
    const a = document.createElement("div");
    a.className = `mjr-mfv-audio-card${e ? " mjr-mfv-audio-card--fill" : ""}`;
    const l = document.createElement("div");
    l.className = "mjr-mfv-audio-head";
    const o = document.createElement("i");
    o.className = "pi pi-volume-up mjr-mfv-audio-icon", o.setAttribute("aria-hidden", "true");
    const d = document.createElement("div");
    d.className = "mjr-mfv-audio-title", d.textContent = String((p == null ? void 0 : p.filename) || "Audio"), l.appendChild(o), l.appendChild(d);
    const c = document.createElement("audio");
    c.className = "mjr-mfv-audio-player", c.src = t, c.controls = !0, c.autoplay = !0, c.preload = "metadata";
    try {
      c.addEventListener("loadedmetadata", () => J(c), { once: !0 });
    } catch (m) {
      (r = console.debug) == null || r.call(console, m);
    }
    return J(c), a.appendChild(l), a.appendChild(c), a;
  }
  if (i === "video") {
    const a = document.createElement("video");
    return a.className = s, a.src = t, a.controls = !0, a.loop = !0, a.muted = !0, a.autoplay = !0, a.playsInline = !0, a;
  }
  if (i === "model3d")
    return oe(p, t, {
      hostClassName: `mjr-model3d-host mjr-mfv-model3d-host${e ? " mjr-mfv-model3d-host--fill" : ""}`,
      canvasClassName: `mjr-mfv-media mjr-model3d-render-canvas${e ? " mjr-mfv-media--fill" : ""}`,
      hintText: "Rotate: left drag  Pan: right drag  Zoom: wheel or middle drag",
      disableViewerTransform: !0
    });
  const n = document.createElement("img");
  return n.className = s, n.src = t, n.alt = String((p == null ? void 0 : p.filename) || ""), n.draggable = !1, n;
}
function ee(p, e, t, i, s, n) {
  p.beginPath(), typeof p.roundRect == "function" ? p.roundRect(e, t, i, s, n) : (p.moveTo(e + n, t), p.lineTo(e + i - n, t), p.quadraticCurveTo(e + i, t, e + i, t + n), p.lineTo(e + i, t + s - n), p.quadraticCurveTo(e + i, t + s, e + i - n, t + s), p.lineTo(e + n, t + s), p.quadraticCurveTo(e, t + s, e, t + s - n), p.lineTo(e, t + n), p.quadraticCurveTo(e, t, e + n, t), p.closePath());
}
function F(p, e, t, i) {
  p.save(), p.font = "bold 10px system-ui, sans-serif";
  const s = 5, n = p.measureText(e).width;
  p.fillStyle = "rgba(0,0,0,0.58)", ee(p, t, i, n + s * 2, 18, 4), p.fill(), p.fillStyle = "#fff", p.fillText(e, t + s, i + 13), p.restore();
}
class ye {
  constructor({ controller: e = null } = {}) {
    this._instanceId = ++de, this._controller = e && typeof e == "object" ? { ...e } : null, this.element = null, this.isVisible = !1, this._contentEl = null, this._closeBtn = null, this._modeBtn = null, this._pinSelect = null, this._liveBtn = null, this._genBtn = null, this._genDropdown = null, this._captureBtn = null, this._genInfoSelections = /* @__PURE__ */ new Set(["genTime"]), this._mode = g.SIMPLE, this._mediaA = null, this._mediaB = null, this._mediaC = null, this._mediaD = null, this._pinnedSlot = null, this._abDividerX = 0.5, this._zoom = 1, this._panX = 0, this._panY = 0, this._panzoomAC = null, this._dragging = !1, this._compareSyncAC = null, this._btnAC = null, this._refreshGen = 0, this._popoutWindow = null, this._popoutBtn = null, this._isPopped = !1, this._desktopExpanded = !1, this._desktopExpandRestore = null, this._desktopPopoutUnsupported = !1, this._popoutCloseHandler = null, this._popoutKeydownHandler = null, this._popoutCloseTimer = null, this._popoutRestoreGuard = !1, this._previewBtn = null, this._previewBlobUrl = null, this._previewActive = !1, this._nodeStreamBtn = null, this._nodeStreamActive = !1, this._docAC = new AbortController(), this._popoutAC = null, this._panelAC = new AbortController(), this._resizeState = null, this._titleId = `mjr-mfv-title-${this._instanceId}`, this._genDropdownId = `mjr-mfv-gen-dropdown-${this._instanceId}`, this._docClickHost = null, this._handleDocClick = null;
  }
  _dispatchControllerAction(e, t) {
    var i, s, n;
    try {
      const r = (i = this._controller) == null ? void 0 : i[e];
      if (typeof r == "function")
        return r();
    } catch (r) {
      (s = console.debug) == null || s.call(console, r);
    }
    if (t)
      try {
        window.dispatchEvent(new Event(t));
      } catch (r) {
        (n = console.debug) == null || n.call(console, r);
      }
  }
  _forwardKeydownToController(e) {
    var t, i, s;
    try {
      const n = (t = this._controller) == null ? void 0 : t.handleForwardedKeydown;
      if (typeof n == "function") {
        n(e);
        return;
      }
    } catch (n) {
      (i = console.debug) == null || i.call(console, n);
    }
    try {
      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: e == null ? void 0 : e.key,
          code: e == null ? void 0 : e.code,
          keyCode: e == null ? void 0 : e.keyCode,
          ctrlKey: e == null ? void 0 : e.ctrlKey,
          shiftKey: e == null ? void 0 : e.shiftKey,
          altKey: e == null ? void 0 : e.altKey,
          metaKey: e == null ? void 0 : e.metaKey
        })
      );
    } catch (n) {
      (s = console.debug) == null || s.call(console, n);
    }
  }
  // ── Build DOM ─────────────────────────────────────────────────────────────
  render() {
    const e = document.createElement("div");
    return e.className = "mjr-mfv", e.setAttribute("role", "dialog"), e.setAttribute("aria-modal", "false"), e.setAttribute("aria-hidden", "true"), this.element = e, e.appendChild(this._buildHeader()), e.setAttribute("aria-labelledby", this._titleId), e.appendChild(this._buildToolbar()), this._contentEl = document.createElement("div"), this._contentEl.className = "mjr-mfv-content", e.appendChild(this._contentEl), this._rebindControlHandlers(), this._bindPanelInteractions(), this._bindDocumentUiHandlers(), this._refresh(), e;
  }
  _buildHeader() {
    const e = document.createElement("div");
    e.className = "mjr-mfv-header";
    const t = document.createElement("span");
    t.className = "mjr-mfv-header-title", t.id = this._titleId, t.textContent = "Majoor Viewer Lite";
    const i = document.createElement("button");
    this._closeBtn = i, i.type = "button", i.className = "mjr-icon-btn", G(i, B("tooltip.closeViewer", "Close viewer"), me);
    const s = document.createElement("i");
    return s.className = "pi pi-times", s.setAttribute("aria-hidden", "true"), i.appendChild(s), e.appendChild(t), e.appendChild(i), e;
  }
  _buildToolbar() {
    var l, o;
    const e = document.createElement("div");
    e.className = "mjr-mfv-toolbar", this._modeBtn = document.createElement("button"), this._modeBtn.type = "button", this._modeBtn.className = "mjr-icon-btn", this._updateModeBtnUI(), e.appendChild(this._modeBtn), this._pinSelect = document.createElement("select"), this._pinSelect.className = "mjr-mfv-pin-select", this._pinSelect.setAttribute("aria-label", "Pin Reference"), this._pinSelect.value = this._pinnedSlot || "";
    for (const { value: d, label: c } of [
      { value: "", label: "No Pin" },
      { value: "A", label: "Pin A" },
      { value: "B", label: "Pin B" },
      { value: "C", label: "Pin C" },
      { value: "D", label: "Pin D" }
    ]) {
      const m = document.createElement("option");
      m.value = d, m.textContent = c, this._pinSelect.appendChild(m);
    }
    this._updatePinSelectUI(), e.appendChild(this._pinSelect);
    const t = document.createElement("div");
    t.className = "mjr-mfv-toolbar-sep", t.setAttribute("aria-hidden", "true"), e.appendChild(t), this._liveBtn = document.createElement("button"), this._liveBtn.type = "button", this._liveBtn.className = "mjr-icon-btn", this._liveBtn.innerHTML = '<i class="pi pi-circle" aria-hidden="true"></i>', this._liveBtn.setAttribute("aria-pressed", "false"), G(
      this._liveBtn,
      B("tooltip.liveStreamOff", "Live Stream: OFF — click to follow"),
      q
    ), e.appendChild(this._liveBtn), this._previewBtn = document.createElement("button"), this._previewBtn.type = "button", this._previewBtn.className = "mjr-icon-btn", this._previewBtn.innerHTML = '<i class="pi pi-eye" aria-hidden="true"></i>', this._previewBtn.setAttribute("aria-pressed", "false"), G(
      this._previewBtn,
      B(
        "tooltip.previewStreamOff",
        "KSampler Preview: OFF — click to stream denoising steps"
      ),
      Z
    ), e.appendChild(this._previewBtn), this._nodeStreamBtn = document.createElement("button"), this._nodeStreamBtn.type = "button", this._nodeStreamBtn.className = "mjr-icon-btn", this._nodeStreamBtn.innerHTML = '<i class="pi pi-sitemap" aria-hidden="true"></i>', this._nodeStreamBtn.setAttribute("aria-pressed", "false"), G(
      this._nodeStreamBtn,
      B("tooltip.nodeStreamOff", "Node Stream: OFF — click to stream selected node output"),
      ue
    ), e.appendChild(this._nodeStreamBtn), (o = (l = this._nodeStreamBtn).remove) == null || o.call(l), this._nodeStreamBtn = null, this._genBtn = document.createElement("button"), this._genBtn.type = "button", this._genBtn.className = "mjr-icon-btn", this._genBtn.setAttribute("aria-haspopup", "dialog"), this._genBtn.setAttribute("aria-expanded", "false");
    const i = document.createElement("i");
    i.className = "pi pi-info-circle", i.setAttribute("aria-hidden", "true"), this._genBtn.appendChild(i), e.appendChild(this._genBtn), this._updateGenBtnUI(), this._popoutBtn = document.createElement("button"), this._popoutBtn.type = "button", this._popoutBtn.className = "mjr-icon-btn";
    const s = B(
      "tooltip.popOutViewer",
      "Pop out viewer to separate window"
    );
    this._popoutBtn.title = s, this._popoutBtn.setAttribute("aria-label", s), this._popoutBtn.setAttribute("aria-pressed", "false");
    const n = document.createElement("i");
    n.className = "pi pi-external-link", n.setAttribute("aria-hidden", "true"), this._popoutBtn.appendChild(n), e.appendChild(this._popoutBtn), this._captureBtn = document.createElement("button"), this._captureBtn.type = "button", this._captureBtn.className = "mjr-icon-btn";
    const r = B("tooltip.captureView", "Save view as image");
    this._captureBtn.title = r, this._captureBtn.setAttribute("aria-label", r);
    const a = document.createElement("i");
    return a.className = "pi pi-download", a.setAttribute("aria-hidden", "true"), this._captureBtn.appendChild(a), e.appendChild(this._captureBtn), this._handleDocClick = (d) => {
      var m, h;
      if (!this._genDropdown) return;
      const c = d == null ? void 0 : d.target;
      (h = (m = this._genBtn) == null ? void 0 : m.contains) != null && h.call(m, c) || this._genDropdown.contains(c) || this._closeGenDropdown();
    }, this._bindDocumentUiHandlers(), e;
  }
  _rebindControlHandlers() {
    var t, i, s, n, r, a, l, o, d, c, m;
    try {
      (t = this._btnAC) == null || t.abort();
    } catch (h) {
      (i = console.debug) == null || i.call(console, h);
    }
    this._btnAC = new AbortController();
    const e = this._btnAC.signal;
    (s = this._closeBtn) == null || s.addEventListener(
      "click",
      () => {
        this._dispatchControllerAction("close", T.MFV_CLOSE);
      },
      { signal: e }
    ), (n = this._modeBtn) == null || n.addEventListener("click", () => this._cycleMode(), { signal: e }), (r = this._pinSelect) == null || r.addEventListener(
      "change",
      (h) => {
        var _;
        this._pinnedSlot = ((_ = h == null ? void 0 : h.target) == null ? void 0 : _.value) || null, this._pinnedSlot === "C" || this._pinnedSlot === "D" ? this._mode !== g.GRID && this.setMode(g.GRID) : this._pinnedSlot && this._mode === g.SIMPLE && this.setMode(g.AB), this._updatePinSelectUI();
      },
      { signal: e }
    ), (a = this._liveBtn) == null || a.addEventListener(
      "click",
      () => {
        this._dispatchControllerAction("toggleLive", T.MFV_LIVE_TOGGLE);
      },
      { signal: e }
    ), (l = this._previewBtn) == null || l.addEventListener(
      "click",
      () => {
        this._dispatchControllerAction("togglePreview", T.MFV_PREVIEW_TOGGLE);
      },
      { signal: e }
    ), (o = this._nodeStreamBtn) == null || o.addEventListener(
      "click",
      () => {
        this._dispatchControllerAction(
          "toggleNodeStream",
          T.MFV_NODESTREAM_TOGGLE
        );
      },
      { signal: e }
    ), (d = this._genBtn) == null || d.addEventListener(
      "click",
      (h) => {
        var _, u;
        h.stopPropagation(), (u = (_ = this._genDropdown) == null ? void 0 : _.classList) != null && u.contains("is-visible") ? this._closeGenDropdown() : this._openGenDropdown();
      },
      { signal: e }
    ), (c = this._popoutBtn) == null || c.addEventListener(
      "click",
      () => {
        this._dispatchControllerAction("popOut", T.MFV_POPOUT);
      },
      { signal: e }
    ), (m = this._captureBtn) == null || m.addEventListener("click", () => this._captureView(), { signal: e });
  }
  _resetGenDropdownForCurrentDocument() {
    var e, t, i;
    this._closeGenDropdown();
    try {
      (t = (e = this._genDropdown) == null ? void 0 : e.remove) == null || t.call(e);
    } catch (s) {
      (i = console.debug) == null || i.call(console, s);
    }
    this._genDropdown = null, this._updateGenBtnUI();
  }
  _bindDocumentUiHandlers() {
    var t, i, s;
    if (!this._handleDocClick) return;
    const e = ((t = this.element) == null ? void 0 : t.ownerDocument) || document;
    if (this._docClickHost !== e) {
      this._unbindDocumentUiHandlers();
      try {
        (i = this._docAC) == null || i.abort();
      } catch (n) {
        (s = console.debug) == null || s.call(console, n);
      }
      this._docAC = new AbortController(), e.addEventListener("click", this._handleDocClick, { signal: this._docAC.signal }), this._docClickHost = e;
    }
  }
  _unbindDocumentUiHandlers() {
    var e, t;
    try {
      (e = this._docAC) == null || e.abort();
    } catch (i) {
      (t = console.debug) == null || t.call(console, i);
    }
    this._docAC = new AbortController(), this._docClickHost = null;
  }
  _isGenDropdownOpen() {
    var e, t;
    return !!((t = (e = this._genDropdown) == null ? void 0 : e.classList) != null && t.contains("is-visible"));
  }
  _openGenDropdown() {
    if (!this.element) return;
    this._genDropdown || (this._genDropdown = this._buildGenDropdown(), this.element.appendChild(this._genDropdown)), this._bindDocumentUiHandlers();
    const e = this._genBtn.getBoundingClientRect(), t = this.element.getBoundingClientRect(), i = e.left - t.left, s = e.bottom - t.top + 6;
    this._genDropdown.style.left = `${i}px`, this._genDropdown.style.top = `${s}px`, this._genDropdown.classList.add("is-visible"), this._updateGenBtnUI();
  }
  _closeGenDropdown() {
    this._genDropdown && (this._genDropdown.classList.remove("is-visible"), this._updateGenBtnUI());
  }
  /** Reflect how many fields are enabled on the gen info button. */
  _updateGenBtnUI() {
    if (!this._genBtn) return;
    const e = this._genInfoSelections.size, t = e > 0, i = this._isGenDropdownOpen();
    this._genBtn.classList.toggle("is-on", t), this._genBtn.classList.toggle("is-open", i);
    const s = t ? `Gen Info (${e} field${e > 1 ? "s" : ""} shown)${i ? " — open" : " — click to configure"}` : `Gen Info${i ? " — open" : " — click to show overlay"}`;
    this._genBtn.title = s, this._genBtn.setAttribute("aria-label", s), this._genBtn.setAttribute("aria-expanded", String(i)), this._genDropdown ? this._genBtn.setAttribute("aria-controls", this._genDropdownId) : this._genBtn.removeAttribute("aria-controls");
  }
  _buildGenDropdown() {
    const e = document.createElement("div");
    e.className = "mjr-mfv-gen-dropdown", e.id = this._genDropdownId, e.setAttribute("role", "group"), e.setAttribute("aria-label", "Generation info fields");
    const t = [
      ["prompt", "Prompt"],
      ["seed", "Seed"],
      ["model", "Model"],
      ["lora", "LoRA"],
      ["sampler", "Sampler"],
      ["scheduler", "Scheduler"],
      ["cfg", "CFG"],
      ["step", "Step"],
      ["genTime", "Gen Time"]
    ];
    for (const [i, s] of t) {
      const n = document.createElement("label");
      n.className = "mjr-mfv-gen-dropdown-row";
      const r = document.createElement("input");
      r.type = "checkbox", r.checked = this._genInfoSelections.has(i), r.addEventListener("change", () => {
        r.checked ? this._genInfoSelections.add(i) : this._genInfoSelections.delete(i), this._updateGenBtnUI(), this._refresh();
      });
      const a = document.createElement("span");
      a.textContent = s, n.appendChild(r), n.appendChild(a), e.appendChild(n);
    }
    return e;
  }
  _getGenFields(e) {
    var n, r, a, l;
    if (!e) return {};
    try {
      const o = e.geninfo ? { geninfo: e.geninfo } : e.metadata || e.metadata_raw || e, d = te(o) || null, c = {
        prompt: "",
        seed: "",
        model: "",
        lora: "",
        sampler: "",
        scheduler: "",
        cfg: "",
        step: "",
        genTime: ""
      };
      if (d && typeof d == "object") {
        d.prompt && (c.prompt = String(d.prompt)), d.seed != null && (c.seed = String(d.seed)), d.model && (c.model = Array.isArray(d.model) ? d.model.join(", ") : String(d.model)), Array.isArray(d.loras) && (c.lora = d.loras.map(
          (h) => typeof h == "string" ? h : (h == null ? void 0 : h.name) || (h == null ? void 0 : h.lora_name) || (h == null ? void 0 : h.model_name) || ""
        ).filter(Boolean).join(", ")), d.sampler && (c.sampler = String(d.sampler)), d.scheduler && (c.scheduler = String(d.scheduler)), d.cfg != null && (c.cfg = String(d.cfg)), d.steps != null && (c.step = String(d.steps)), !c.prompt && (o != null && o.prompt) && (c.prompt = String(o.prompt || ""));
        const m = e.generation_time_ms ?? ((n = e.metadata_raw) == null ? void 0 : n.generation_time_ms) ?? (o == null ? void 0 : o.generation_time_ms) ?? ((r = o == null ? void 0 : o.geninfo) == null ? void 0 : r.generation_time_ms) ?? 0;
        return m && Number.isFinite(Number(m)) && m > 0 && m < 864e5 && (c.genTime = (Number(m) / 1e3).toFixed(1) + "s"), c;
      }
    } catch (o) {
      (a = console.debug) == null || a.call(console, "[MFV] _getGenFields error:", o);
    }
    const t = e.meta || e.metadata || e.parsed || e.parsed_meta || e, i = {
      prompt: "",
      seed: "",
      model: "",
      lora: "",
      sampler: "",
      scheduler: "",
      cfg: "",
      step: "",
      genTime: ""
    };
    i.prompt = (t == null ? void 0 : t.prompt) || (t == null ? void 0 : t.text) || "", i.seed = (t == null ? void 0 : t.seed) != null ? String(t.seed) : (t == null ? void 0 : t.noise_seed) != null ? String(t.noise_seed) : "", t != null && t.model ? i.model = Array.isArray(t.model) ? t.model.join(", ") : String(t.model) : i.model = (t == null ? void 0 : t.model_name) || "", i.lora = (t == null ? void 0 : t.lora) || (t == null ? void 0 : t.loras) || "", Array.isArray(i.lora) && (i.lora = i.lora.join(", ")), i.sampler = (t == null ? void 0 : t.sampler) || (t == null ? void 0 : t.sampler_name) || "", i.scheduler = (t == null ? void 0 : t.scheduler) || "", i.cfg = (t == null ? void 0 : t.cfg) != null ? String(t.cfg) : (t == null ? void 0 : t.cfg_scale) != null ? String(t.cfg_scale) : "", i.step = (t == null ? void 0 : t.steps) != null ? String(t.steps) : "";
    const s = e.generation_time_ms ?? ((l = e.metadata_raw) == null ? void 0 : l.generation_time_ms) ?? (t == null ? void 0 : t.generation_time_ms) ?? 0;
    return s && Number.isFinite(Number(s)) && s > 0 && s < 864e5 && (i.genTime = (Number(s) / 1e3).toFixed(1) + "s"), i;
  }
  /**
   * Build a DocumentFragment of gen-info rows using the DOM API.
   * Returns null when no fields are selected or all are empty.
   * Using the DOM API instead of innerHTML string concatenation eliminates
   * any XSS risk from metadata values and avoids fragile HTML escaping.
   */
  _buildGenInfoDOM(e) {
    const t = this._getGenFields(e);
    if (!t) return null;
    const i = document.createDocumentFragment(), s = [
      "prompt",
      "seed",
      "model",
      "lora",
      "sampler",
      "scheduler",
      "cfg",
      "step",
      "genTime"
    ];
    for (const n of s) {
      if (!this._genInfoSelections.has(n)) continue;
      const r = t[n] != null ? String(t[n]) : "";
      if (!r) continue;
      let a = n.charAt(0).toUpperCase() + n.slice(1);
      n === "lora" ? a = "LoRA" : n === "cfg" ? a = "CFG" : n === "genTime" && (a = "Gen Time");
      const l = document.createElement("div");
      l.dataset.field = n;
      const o = document.createElement("strong");
      if (o.textContent = `${a}: `, l.appendChild(o), n === "prompt")
        l.appendChild(document.createTextNode(r));
      else if (n === "genTime") {
        const d = parseFloat(r);
        let c = "#4CAF50";
        d >= 60 ? c = "#FF9800" : d >= 30 ? c = "#FFC107" : d >= 10 && (c = "#8BC34A");
        const m = document.createElement("span");
        m.style.color = c, m.style.fontWeight = "600", m.textContent = r, l.appendChild(m);
      } else
        l.appendChild(document.createTextNode(r));
      i.appendChild(l);
    }
    return i.childNodes.length > 0 ? i : null;
  }
  // ── Mode ──────────────────────────────────────────────────────────────────
  _cycleMode() {
    const e = [g.SIMPLE, g.AB, g.SIDE, g.GRID];
    this._mode = e[(e.indexOf(this._mode) + 1) % e.length], this._updateModeBtnUI(), this._refresh();
  }
  setMode(e) {
    Object.values(g).includes(e) && (this._mode = e, this._updateModeBtnUI(), this._refresh());
  }
  getPinnedSlot() {
    return this._pinnedSlot;
  }
  _updatePinSelectUI() {
    if (!this._pinSelect) return;
    const t = ["A", "B", "C", "D"].includes(this._pinnedSlot);
    this._pinSelect.value = this._pinnedSlot || "", this._pinSelect.classList.toggle("is-pinned", t);
    const i = t ? `Pin Reference: ${this._pinnedSlot}` : "Pin Reference: Off";
    this._pinSelect.title = i, this._pinSelect.setAttribute("aria-label", i);
  }
  _updateModeBtnUI() {
    if (!this._modeBtn) return;
    const e = {
      [g.SIMPLE]: { icon: "pi-image", label: "Mode: Simple - click to switch" },
      [g.AB]: { icon: "pi-clone", label: "Mode: A/B Compare - click to switch" },
      [g.SIDE]: { icon: "pi-table", label: "Mode: Side-by-Side - click to switch" },
      [g.GRID]: {
        icon: "pi-th-large",
        label: "Mode: Grid Compare (up to 4) - click to switch"
      }
    }, { icon: t = "pi-image", label: i = "" } = e[this._mode] || {}, s = U(i, pe), n = document.createElement("i");
    n.className = `pi ${t}`, n.setAttribute("aria-hidden", "true"), this._modeBtn.replaceChildren(n), this._modeBtn.title = s, this._modeBtn.setAttribute("aria-label", s), this._modeBtn.removeAttribute("aria-pressed");
  }
  // ── Live Stream UI ────────────────────────────────────────────────────────
  setLiveActive(e) {
    if (!this._liveBtn) return;
    const t = !!e;
    this._liveBtn.classList.toggle("mjr-live-active", t);
    const i = t ? B("tooltip.liveStreamOn", "Live Stream: ON — click to disable") : B("tooltip.liveStreamOff", "Live Stream: OFF — click to follow"), s = U(i, q);
    if (this._liveBtn.setAttribute("aria-pressed", String(t)), this._liveBtn.setAttribute("aria-label", s), t) {
      const n = document.createElement("i");
      n.className = "pi pi-circle-fill", n.setAttribute("aria-hidden", "true"), this._liveBtn.replaceChildren(n), this._liveBtn.title = s;
    } else {
      const n = document.createElement("i");
      n.className = "pi pi-circle", n.setAttribute("aria-hidden", "true"), this._liveBtn.replaceChildren(n), this._liveBtn.title = s;
    }
  }
  // ── KSampler Preview Stream UI ─────────────────────────────────────────────
  setPreviewActive(e) {
    if (this._previewActive = !!e, !this._previewBtn) return;
    this._previewBtn.classList.toggle("mjr-preview-active", this._previewActive);
    const t = this._previewActive ? B("tooltip.previewStreamOn", "KSampler Preview: ON — streaming denoising steps") : B(
      "tooltip.previewStreamOff",
      "KSampler Preview: OFF — click to stream denoising steps"
    ), i = U(t, Z);
    if (this._previewBtn.setAttribute("aria-pressed", String(this._previewActive)), this._previewBtn.setAttribute("aria-label", i), this._previewActive) {
      const s = document.createElement("i");
      s.className = "pi pi-eye", s.setAttribute("aria-hidden", "true"), this._previewBtn.replaceChildren(s), this._previewBtn.title = i;
    } else {
      const s = document.createElement("i");
      s.className = "pi pi-eye-slash", s.setAttribute("aria-hidden", "true"), this._previewBtn.replaceChildren(s), this._previewBtn.title = i, this._revokePreviewBlob();
    }
  }
  /**
   * Display a preview blob (JPEG/PNG from KSampler denoising steps).
   * Uses a blob: URL and shows it in Simple mode without metadata enrichment.
   * @param {Blob} blob  Image blob received from ComfyUI WebSocket.
   */
  loadPreviewBlob(e) {
    if (!e || !(e instanceof Blob)) return;
    this._revokePreviewBlob();
    const t = URL.createObjectURL(e);
    this._previewBlobUrl = t;
    const i = { url: t, filename: "preview.jpg", kind: "image", _isPreview: !0 };
    if (this._mode === g.AB || this._mode === g.SIDE || this._mode === g.GRID) {
      const n = this.getPinnedSlot();
      if (this._mode === g.GRID) {
        const r = ["A", "B", "C", "D"].find((a) => a !== n) || "A";
        this[`_media${r}`] = i;
      } else n === "B" ? this._mediaA = i : this._mediaB = i;
    } else
      this._mediaA = i, this._resetMfvZoom(), this._mode !== g.SIMPLE && (this._mode = g.SIMPLE, this._updateModeBtnUI());
    ++this._refreshGen, this._refresh();
  }
  _revokePreviewBlob() {
    if (this._previewBlobUrl) {
      try {
        URL.revokeObjectURL(this._previewBlobUrl);
      } catch {
      }
      this._previewBlobUrl = null;
    }
  }
  // ── Node Stream UI ───────────────────────────────────────────────────────
  setNodeStreamActive(e) {
    {
      this._nodeStreamActive = !1;
      return;
    }
  }
  // ── Media loading ─────────────────────────────────────────────────────────
  /**
   * Load one file/asset into slot A.
   * @param {object} fileData
   * @param {{ autoMode?: boolean }} opts  autoMode=true → force SIMPLE mode
   */
  loadMediaA(e, { autoMode: t = !1 } = {}) {
    if (this._mediaA = e || null, this._resetMfvZoom(), t && this._mode !== g.SIMPLE && (this._mode = g.SIMPLE, this._updateModeBtnUI()), this._mediaA && typeof R == "function") {
      const i = ++this._refreshGen;
      (async () => {
        var s;
        try {
          const n = await R(this._mediaA, {
            getAssetMetadata: $,
            getFileMetadataScoped: z
          });
          if (this._refreshGen !== i) return;
          n && typeof n == "object" && (this._mediaA = n, this._refresh());
        } catch (n) {
          (s = console.debug) == null || s.call(console, "[MFV] metadata enrich error", n);
        }
      })();
    } else
      this._refresh();
  }
  /**
   * Load two assets for compare modes.
   * Auto-switches from SIMPLE → AB on first call.
   */
  loadMediaPair(e, t) {
    this._mediaA = e || null, this._mediaB = t || null, this._resetMfvZoom(), this._mode === g.SIMPLE && (this._mode = g.AB, this._updateModeBtnUI());
    const i = ++this._refreshGen, s = async (n) => {
      if (!n) return n;
      try {
        return await R(n, {
          getAssetMetadata: $,
          getFileMetadataScoped: z
        }) || n;
      } catch {
        return n;
      }
    };
    (async () => {
      const [n, r] = await Promise.all([s(this._mediaA), s(this._mediaB)]);
      this._refreshGen === i && (this._mediaA = n || null, this._mediaB = r || null, this._refresh());
    })();
  }
  /**
   * Load up to 4 assets for grid compare mode.
   * Auto-switches to GRID mode if not already.
   */
  loadMediaQuad(e, t, i, s) {
    this._mediaA = e || null, this._mediaB = t || null, this._mediaC = i || null, this._mediaD = s || null, this._resetMfvZoom(), this._mode !== g.GRID && (this._mode = g.GRID, this._updateModeBtnUI());
    const n = ++this._refreshGen, r = async (a) => {
      if (!a) return a;
      try {
        return await R(a, {
          getAssetMetadata: $,
          getFileMetadataScoped: z
        }) || a;
      } catch {
        return a;
      }
    };
    (async () => {
      const [a, l, o, d] = await Promise.all([
        r(this._mediaA),
        r(this._mediaB),
        r(this._mediaC),
        r(this._mediaD)
      ]);
      this._refreshGen === n && (this._mediaA = a || null, this._mediaB = l || null, this._mediaC = o || null, this._mediaD = d || null, this._refresh());
    })();
  }
  // ── Pan/Zoom ──────────────────────────────────────────────────────────────
  _resetMfvZoom() {
    this._zoom = 1, this._panX = 0, this._panY = 0;
  }
  /** Apply current zoom+pan state to all media elements (img/video only — divider/overlays unaffected). */
  _applyTransform() {
    if (!this._contentEl) return;
    const e = Math.max(X, Math.min(K, this._zoom)), t = this._contentEl.clientWidth || 0, i = this._contentEl.clientHeight || 0, s = Math.max(0, (e - 1) * t / 2), n = Math.max(0, (e - 1) * i / 2);
    this._panX = Math.max(-s, Math.min(s, this._panX)), this._panY = Math.max(-n, Math.min(n, this._panY));
    const r = `translate(${this._panX}px,${this._panY}px) scale(${e})`;
    for (const a of this._contentEl.querySelectorAll(".mjr-mfv-media"))
      a != null && a._mjrDisableViewerTransform || (a.style.transform = r, a.style.transformOrigin = "center");
    this._contentEl.classList.remove("mjr-mfv-content--grab", "mjr-mfv-content--grabbing"), e > 1.01 && this._contentEl.classList.add(
      this._dragging ? "mjr-mfv-content--grabbing" : "mjr-mfv-content--grab"
    );
  }
  /**
   * Set zoom, optionally centered at (clientX, clientY).
   * Keeps the image point under the cursor stationary.
   */
  _setMfvZoom(e, t, i) {
    const s = Math.max(X, Math.min(K, this._zoom)), n = Math.max(X, Math.min(K, Number(e) || 1));
    if (t != null && i != null && this._contentEl) {
      const r = n / s, a = this._contentEl.getBoundingClientRect(), l = t - (a.left + a.width / 2), o = i - (a.top + a.height / 2);
      this._panX = this._panX * r + (1 - r) * l, this._panY = this._panY * r + (1 - r) * o;
    }
    this._zoom = n, Math.abs(n - 1) < 1e-3 && (this._zoom = 1, this._panX = 0, this._panY = 0), this._applyTransform();
  }
  /** Bind wheel + pointer events to the clip viewport element. */
  _initPanZoom(e) {
    if (this._destroyPanZoom(), !e) return;
    this._panzoomAC = new AbortController();
    const t = { signal: this._panzoomAC.signal };
    e.addEventListener(
      "wheel",
      (o) => {
        var h, _;
        if ((_ = (h = o.target) == null ? void 0 : h.closest) != null && _.call(h, "audio") || W(o.target)) return;
        const d = ge(o.target, e);
        if (d && be(
          d,
          Number(o.deltaX || 0),
          Number(o.deltaY || 0)
        ))
          return;
        o.preventDefault();
        const m = 1 - (o.deltaY || o.deltaX || 0) * ae;
        this._setMfvZoom(this._zoom * m, o.clientX, o.clientY);
      },
      { ...t, passive: !1 }
    );
    let i = !1, s = 0, n = 0, r = 0, a = 0;
    e.addEventListener(
      "pointerdown",
      (o) => {
        var d, c, m, h, _, u, f;
        if (!(o.button !== 0 && o.button !== 1) && !(this._zoom <= 1.01) && !((c = (d = o.target) == null ? void 0 : d.closest) != null && c.call(d, "video")) && !((h = (m = o.target) == null ? void 0 : m.closest) != null && h.call(m, "audio")) && !((u = (_ = o.target) == null ? void 0 : _.closest) != null && u.call(_, ".mjr-mfv-ab-divider")) && !W(o.target)) {
          o.preventDefault(), i = !0, this._dragging = !0, s = o.clientX, n = o.clientY, r = this._panX, a = this._panY;
          try {
            e.setPointerCapture(o.pointerId);
          } catch (y) {
            (f = console.debug) == null || f.call(console, y);
          }
          this._applyTransform();
        }
      },
      t
    ), e.addEventListener(
      "pointermove",
      (o) => {
        i && (this._panX = r + (o.clientX - s), this._panY = a + (o.clientY - n), this._applyTransform());
      },
      t
    );
    const l = (o) => {
      var d;
      if (i) {
        i = !1, this._dragging = !1;
        try {
          e.releasePointerCapture(o.pointerId);
        } catch (c) {
          (d = console.debug) == null || d.call(console, c);
        }
        this._applyTransform();
      }
    };
    e.addEventListener("pointerup", l, t), e.addEventListener("pointercancel", l, t), e.addEventListener(
      "dblclick",
      (o) => {
        var c, m, h, _;
        if ((m = (c = o.target) == null ? void 0 : c.closest) != null && m.call(c, "video") || (_ = (h = o.target) == null ? void 0 : h.closest) != null && _.call(h, "audio") || W(o.target)) return;
        const d = Math.abs(this._zoom - 1) < 0.05;
        this._setMfvZoom(d ? Math.min(4, this._zoom * 4) : 1, o.clientX, o.clientY);
      },
      t
    );
  }
  /** Remove all pan/zoom event listeners. */
  _destroyPanZoom() {
    var e, t;
    try {
      (e = this._panzoomAC) == null || e.abort();
    } catch (i) {
      (t = console.debug) == null || t.call(console, i);
    }
    this._panzoomAC = null, this._dragging = !1;
  }
  _destroyCompareSync() {
    var e, t, i;
    try {
      (t = (e = this._compareSyncAC) == null ? void 0 : e.abort) == null || t.call(e);
    } catch (s) {
      (i = console.debug) == null || i.call(console, s);
    }
    this._compareSyncAC = null;
  }
  _initCompareSync() {
    var e;
    if (this._destroyCompareSync(), !!this._contentEl && this._mode !== g.SIMPLE)
      try {
        const t = Array.from(this._contentEl.querySelectorAll("video, audio"));
        if (t.length < 2) return;
        const i = t[0] || null, s = t.slice(1);
        if (!i || !s.length) return;
        this._compareSyncAC = ie(i, s, { threshold: 0.08 });
      } catch (t) {
        (e = console.debug) == null || e.call(console, t);
      }
  }
  // ── Render ────────────────────────────────────────────────────────────────
  _refresh() {
    if (this._contentEl) {
      switch (this._destroyPanZoom(), this._destroyCompareSync(), this._contentEl.replaceChildren(), this._contentEl.style.overflow = "hidden", this._mode) {
        case g.SIMPLE:
          this._renderSimple();
          break;
        case g.AB:
          this._renderAB();
          break;
        case g.SIDE:
          this._renderSide();
          break;
        case g.GRID:
          this._renderGrid();
          break;
      }
      this._applyTransform(), this._initPanZoom(this._contentEl), this._initCompareSync();
    }
  }
  _renderSimple() {
    if (!this._mediaA) {
      this._contentEl.appendChild(M());
      return;
    }
    const e = I(this._mediaA), t = D(this._mediaA);
    if (!t) {
      this._contentEl.appendChild(M("Could not load media"));
      return;
    }
    const i = document.createElement("div");
    if (i.className = "mjr-mfv-simple-container", i.appendChild(t), e !== "audio") {
      const s = this._buildGenInfoDOM(this._mediaA);
      if (s) {
        const n = document.createElement("div");
        n.className = "mjr-mfv-geninfo", n.appendChild(s), i.appendChild(n);
      }
    }
    this._contentEl.appendChild(i);
  }
  _renderAB() {
    var u;
    const e = this._mediaA ? D(this._mediaA, { fill: !0 }) : null, t = this._mediaB ? D(this._mediaB, { fill: !0 }) : null, i = this._mediaA ? I(this._mediaA) : "", s = this._mediaB ? I(this._mediaB) : "";
    if (!e && !t) {
      this._contentEl.appendChild(M("Select 2 assets for A/B compare"));
      return;
    }
    if (!t) {
      this._renderSimple();
      return;
    }
    if (i === "audio" || s === "audio" || i === "model3d" || s === "model3d") {
      this._renderSide();
      return;
    }
    const n = document.createElement("div");
    n.className = "mjr-mfv-ab-container";
    const r = document.createElement("div");
    r.className = "mjr-mfv-ab-layer", e && r.appendChild(e);
    const a = document.createElement("div");
    a.className = "mjr-mfv-ab-layer mjr-mfv-ab-layer--b";
    const l = Math.round(this._abDividerX * 100);
    a.style.clipPath = `inset(0 0 0 ${l}%)`, a.appendChild(t);
    const o = document.createElement("div");
    o.className = "mjr-mfv-ab-divider", o.style.left = `${l}%`;
    const d = this._buildGenInfoDOM(this._mediaA);
    let c = null;
    d && (c = document.createElement("div"), c.className = "mjr-mfv-geninfo-a", c.appendChild(d), c.style.right = `calc(${100 - l}% + 8px)`);
    const m = this._buildGenInfoDOM(this._mediaB);
    let h = null;
    m && (h = document.createElement("div"), h.className = "mjr-mfv-geninfo-b", h.appendChild(m), h.style.left = `calc(${l}% + 8px)`);
    let _ = null;
    o.addEventListener(
      "pointerdown",
      (f) => {
        f.preventDefault(), o.setPointerCapture(f.pointerId);
        try {
          _ == null || _.abort();
        } catch {
        }
        _ = new AbortController();
        const y = _.signal, w = n.getBoundingClientRect(), b = (k) => {
          const L = Math.max(0.02, Math.min(0.98, (k.clientX - w.left) / w.width));
          this._abDividerX = L;
          const v = Math.round(L * 100);
          a.style.clipPath = `inset(0 0 0 ${v}%)`, o.style.left = `${v}%`, c && (c.style.right = `calc(${100 - v}% + 8px)`), h && (h.style.left = `calc(${v}% + 8px)`);
        }, A = () => {
          try {
            _ == null || _.abort();
          } catch {
          }
        };
        o.addEventListener("pointermove", b, { signal: y }), o.addEventListener("pointerup", A, { signal: y });
      },
      (u = this._panelAC) != null && u.signal ? { signal: this._panelAC.signal } : void 0
    ), n.appendChild(r), n.appendChild(a), n.appendChild(o), c && n.appendChild(c), h && n.appendChild(h), n.appendChild(j("A", "left")), n.appendChild(j("B", "right")), this._contentEl.appendChild(n);
  }
  _renderSide() {
    const e = this._mediaA ? D(this._mediaA) : null, t = this._mediaB ? D(this._mediaB) : null, i = this._mediaA ? I(this._mediaA) : "", s = this._mediaB ? I(this._mediaB) : "";
    if (!e && !t) {
      this._contentEl.appendChild(M("Select 2 assets for Side-by-Side"));
      return;
    }
    const n = document.createElement("div");
    n.className = "mjr-mfv-side-container";
    const r = document.createElement("div");
    r.className = "mjr-mfv-side-panel", e ? r.appendChild(e) : r.appendChild(M("—")), r.appendChild(j("A", "left"));
    const a = i === "audio" ? null : this._buildGenInfoDOM(this._mediaA);
    if (a) {
      const d = document.createElement("div");
      d.className = "mjr-mfv-geninfo-a", d.appendChild(a), r.appendChild(d);
    }
    const l = document.createElement("div");
    l.className = "mjr-mfv-side-panel", t ? l.appendChild(t) : l.appendChild(M("—")), l.appendChild(j("B", "right"));
    const o = s === "audio" ? null : this._buildGenInfoDOM(this._mediaB);
    if (o) {
      const d = document.createElement("div");
      d.className = "mjr-mfv-geninfo-b", d.appendChild(o), l.appendChild(d);
    }
    n.appendChild(r), n.appendChild(l), this._contentEl.appendChild(n);
  }
  _renderGrid() {
    const e = [
      { media: this._mediaA, label: "A" },
      { media: this._mediaB, label: "B" },
      { media: this._mediaC, label: "C" },
      { media: this._mediaD, label: "D" }
    ];
    if (!e.filter((s) => s.media).length) {
      this._contentEl.appendChild(M("Select up to 4 assets for Grid Compare"));
      return;
    }
    const i = document.createElement("div");
    i.className = "mjr-mfv-grid-container";
    for (const { media: s, label: n } of e) {
      const r = document.createElement("div");
      if (r.className = "mjr-mfv-grid-cell", s) {
        const a = I(s), l = D(s);
        if (l ? r.appendChild(l) : r.appendChild(M("—")), r.appendChild(
          j(n, n === "A" || n === "C" ? "left" : "right")
        ), a !== "audio") {
          const o = this._buildGenInfoDOM(s);
          if (o) {
            const d = document.createElement("div");
            d.className = `mjr-mfv-geninfo-${n.toLowerCase()}`, d.appendChild(o), r.appendChild(d);
          }
        }
      } else
        r.appendChild(M("—")), r.appendChild(
          j(n, n === "A" || n === "C" ? "left" : "right")
        );
      i.appendChild(r);
    }
    this._contentEl.appendChild(i);
  }
  // ── Visibility ────────────────────────────────────────────────────────────
  show() {
    this.element && (this._bindDocumentUiHandlers(), this.element.classList.add("is-visible"), this.element.setAttribute("aria-hidden", "false"), this.isVisible = !0);
  }
  hide() {
    this.element && (this._destroyPanZoom(), this._destroyCompareSync(), this._stopEdgeResize(), this._closeGenDropdown(), ve(this.element), this.element.classList.remove("is-visible"), this.element.setAttribute("aria-hidden", "true"), this.isVisible = !1);
  }
  // ── Pop-out / Pop-in (separate OS window for second monitor) ────────────
  _setDesktopExpanded(e) {
    if (!this.element) return;
    const t = !!e;
    if (this._desktopExpanded === t) return;
    const i = this.element;
    if (t) {
      this._desktopExpandRestore = {
        parent: i.parentNode || null,
        nextSibling: i.nextSibling || null,
        styleAttr: i.getAttribute("style")
      }, i.parentNode !== document.body && document.body.appendChild(i), i.classList.add("mjr-mfv--desktop-expanded", "is-visible"), i.setAttribute("aria-hidden", "false"), i.style.position = "fixed", i.style.top = "12px", i.style.left = "12px", i.style.right = "12px", i.style.bottom = "12px", i.style.width = "auto", i.style.height = "auto", i.style.maxWidth = "none", i.style.maxHeight = "none", i.style.minWidth = "320px", i.style.minHeight = "240px", i.style.resize = "none", i.style.margin = "0", i.style.zIndex = "2147483000", this._desktopExpanded = !0, this.isVisible = !0, this._resetGenDropdownForCurrentDocument(), this._rebindControlHandlers(), this._bindPanelInteractions(), this._bindDocumentUiHandlers(), this._updatePopoutBtnUI(), C("electron-in-app-expanded", { isVisible: this.isVisible });
      return;
    }
    const s = this._desktopExpandRestore;
    this._desktopExpanded = !1, i.classList.remove("mjr-mfv--desktop-expanded"), (s == null ? void 0 : s.styleAttr) == null || s.styleAttr === "" ? i.removeAttribute("style") : i.setAttribute("style", s.styleAttr), s != null && s.parent && s.parent.isConnected && (s.nextSibling && s.nextSibling.parentNode === s.parent ? s.parent.insertBefore(i, s.nextSibling) : s.parent.appendChild(i)), this._desktopExpandRestore = null, this._resetGenDropdownForCurrentDocument(), this._rebindControlHandlers(), this._bindPanelInteractions(), this._bindDocumentUiHandlers(), this._updatePopoutBtnUI(), C("electron-in-app-restored", null);
  }
  _activateDesktopExpandedFallback(e) {
    var t;
    this._desktopPopoutUnsupported = !0, C(
      "electron-in-app-fallback",
      { message: (e == null ? void 0 : e.message) || String(e || "unknown error") },
      "warn"
    ), this._setDesktopExpanded(!0);
    try {
      ne(
        B(
          "toast.popoutElectronInAppFallback",
          "Desktop PiP is unavailable here. Viewer expanded inside the app instead."
        ),
        "warning",
        4500
      );
    } catch (i) {
      (t = console.debug) == null || t.call(console, i);
    }
  }
  _tryElectronPopupFallback(e, t, i, s) {
    return C(
      "electron-popup-fallback-attempt",
      { reason: (s == null ? void 0 : s.message) || String(s || "unknown") },
      "warn"
    ), this._fallbackPopout(e, t, i), this._popoutWindow ? (this._desktopPopoutUnsupported = !1, C("electron-popup-fallback-opened", null), !0) : !1;
  }
  /**
   * Move the viewer into a separate browser window so it can be
   * dragged onto a second monitor. Opens a dedicated same-origin page,
   * then adopts the live DOM tree into that page so state/listeners persist.
   */
  popOut() {
    var a, l;
    if (this._isPopped || !this.element) return;
    const e = this.element;
    this._stopEdgeResize();
    const t = _e(), i = typeof window < "u" && "documentPictureInPicture" in window, s = String(((a = window == null ? void 0 : window.navigator) == null ? void 0 : a.userAgent) || ((l = globalThis == null ? void 0 : globalThis.navigator) == null ? void 0 : l.userAgent) || ""), n = Math.max(e.offsetWidth || 520, 400), r = Math.max(e.offsetHeight || 420, 300);
    if (C("start", {
      isElectronHost: t,
      hasDocumentPiP: i,
      userAgent: s,
      width: n,
      height: r,
      desktopPopoutUnsupported: this._desktopPopoutUnsupported
    }), t && this._desktopPopoutUnsupported) {
      C("electron-in-app-fallback-reuse", null), this._setDesktopExpanded(!0);
      return;
    }
    if (!(t && (C("electron-popup-request", { width: n, height: r }), this._tryElectronPopupFallback(e, n, r, new Error("Desktop popup requested"))))) {
      if (t && "documentPictureInPicture" in window) {
        C("electron-pip-request", { width: n, height: r }), window.documentPictureInPicture.requestWindow({ width: n, height: r }).then((o) => {
          var _, u;
          C("electron-pip-opened", {
            hasDocument: !!(o != null && o.document)
          }), this._popoutWindow = o, this._isPopped = !0, this._popoutRestoreGuard = !1;
          try {
            (_ = this._popoutAC) == null || _.abort();
          } catch (f) {
            (u = console.debug) == null || u.call(console, f);
          }
          this._popoutAC = new AbortController();
          const d = this._popoutAC.signal, c = () => this._schedulePopInFromPopupClose();
          this._popoutCloseHandler = c;
          const m = o.document;
          m.title = "Majoor Viewer", this._installPopoutStyles(m), m.body.style.cssText = "margin:0;display:flex;min-height:100vh;background:#111;overflow:hidden;";
          const h = m.createElement("div");
          h.id = "mjr-mfv-popout-root", h.style.cssText = "flex:1;min-width:0;min-height:0;display:flex;", m.body.appendChild(h);
          try {
            const f = typeof m.adoptNode == "function" ? m.adoptNode(e) : e;
            h.appendChild(f), C("electron-pip-adopted", {
              usedAdoptNode: typeof m.adoptNode == "function"
            });
          } catch (f) {
            C(
              "electron-pip-adopt-failed",
              { message: (f == null ? void 0 : f.message) || String(f) },
              "warn"
            ), console.warn("[MFV] PiP adoptNode failed", f), this._isPopped = !1, this._popoutWindow = null;
            try {
              o.close();
            } catch {
            }
            this._activateDesktopExpandedFallback(f);
            return;
          }
          e.classList.add("is-visible"), this.isVisible = !0, this._resetGenDropdownForCurrentDocument(), this._rebindControlHandlers(), this._bindDocumentUiHandlers(), this._updatePopoutBtnUI(), C("electron-pip-ready", { isPopped: this._isPopped }), o.addEventListener("pagehide", c, {
            signal: d
          }), this._startPopoutCloseWatch(), this._popoutKeydownHandler = (f) => {
            var w, b;
            const y = String(((w = f == null ? void 0 : f.target) == null ? void 0 : w.tagName) || "").toLowerCase();
            f != null && f.defaultPrevented || (b = f == null ? void 0 : f.target) != null && b.isContentEditable || y === "input" || y === "textarea" || y === "select" || this._forwardKeydownToController(f);
          }, o.addEventListener("keydown", this._popoutKeydownHandler, {
            signal: d
          });
        }).catch((o) => {
          C(
            "electron-pip-request-failed",
            { message: (o == null ? void 0 : o.message) || String(o) },
            "warn"
          ), this._activateDesktopExpandedFallback(o);
        });
        return;
      }
      if (t) {
        C("electron-no-pip-api", { hasDocumentPiP: i }), this._activateDesktopExpandedFallback(
          new Error("Document Picture-in-Picture unavailable after popup failure")
        );
        return;
      }
      C("browser-fallback-popup", { width: n, height: r }), this._fallbackPopout(e, n, r);
    }
  }
  /**
   * Classic popup fallback used when Document PiP is unavailable.
   * Opens about:blank and builds the shell directly in the popup document
   * to avoid Electron / Chrome App mode issues where navigating to a
   * backend URL results in a blank page.
   */
  _fallbackPopout(e, t, i) {
    var c, m, h, _;
    C("browser-popup-open", { width: t, height: i });
    const s = (window.screenX || window.screenLeft) + Math.round((window.outerWidth - t) / 2), n = (window.screenY || window.screenTop) + Math.round((window.outerHeight - i) / 2), r = `width=${t},height=${i},left=${s},top=${n},resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,status=no`, a = window.open("about:blank", "_mjr_viewer", r);
    if (!a) {
      C("browser-popup-blocked", null, "warn"), console.warn("[MFV] Pop-out blocked — allow popups for this site.");
      return;
    }
    C("browser-popup-opened", { hasDocument: !!(a != null && a.document) }), this._popoutWindow = a, this._isPopped = !0, this._popoutRestoreGuard = !1;
    try {
      (c = this._popoutAC) == null || c.abort();
    } catch (u) {
      (m = console.debug) == null || m.call(console, u);
    }
    this._popoutAC = new AbortController();
    const l = this._popoutAC.signal, o = () => this._schedulePopInFromPopupClose();
    this._popoutCloseHandler = o;
    const d = () => {
      let u;
      try {
        u = a.document;
      } catch {
        return;
      }
      if (!u) return;
      u.title = "Majoor Viewer", this._installPopoutStyles(u), u.body.style.cssText = "margin:0;display:flex;min-height:100vh;background:#111;overflow:hidden;";
      const f = u.createElement("div");
      f.id = "mjr-mfv-popout-root", f.style.cssText = "flex:1;min-width:0;min-height:0;display:flex;", u.body.appendChild(f);
      try {
        f.appendChild(u.adoptNode(e));
      } catch (y) {
        console.warn("[MFV] adoptNode failed", y);
        return;
      }
      e.classList.add("is-visible"), this.isVisible = !0, this._resetGenDropdownForCurrentDocument(), this._rebindControlHandlers(), this._bindDocumentUiHandlers(), this._updatePopoutBtnUI();
    };
    try {
      d();
    } catch (u) {
      (h = console.debug) == null || h.call(console, "[MFV] immediate mount failed, retrying on load", u);
      try {
        a.addEventListener("load", d, { signal: l });
      } catch (f) {
        (_ = console.debug) == null || _.call(console, "[MFV] pop-out page load listener failed", f);
      }
    }
    a.addEventListener("beforeunload", o, { signal: l }), a.addEventListener("pagehide", o, { signal: l }), a.addEventListener("unload", o, { signal: l }), this._startPopoutCloseWatch(), this._popoutKeydownHandler = (u) => {
      var w, b, A, k;
      const f = String(((w = u == null ? void 0 : u.target) == null ? void 0 : w.tagName) || "").toLowerCase();
      if (u != null && u.defaultPrevented || (b = u == null ? void 0 : u.target) != null && b.isContentEditable || f === "input" || f === "textarea" || f === "select")
        return;
      if (String((u == null ? void 0 : u.key) || "").toLowerCase() === "v" && (u != null && u.ctrlKey || u != null && u.metaKey) && !(u != null && u.altKey) && !(u != null && u.shiftKey)) {
        u.preventDefault(), (A = u.stopPropagation) == null || A.call(u), (k = u.stopImmediatePropagation) == null || k.call(u), this._dispatchControllerAction("toggle", T.MFV_TOGGLE);
        return;
      }
      this._forwardKeydownToController(u);
    }, a.addEventListener("keydown", this._popoutKeydownHandler, { signal: l });
  }
  _clearPopoutCloseWatch() {
    var e;
    if (this._popoutCloseTimer != null) {
      try {
        window.clearInterval(this._popoutCloseTimer);
      } catch (t) {
        (e = console.debug) == null || e.call(console, t);
      }
      this._popoutCloseTimer = null;
    }
  }
  _startPopoutCloseWatch() {
    this._clearPopoutCloseWatch(), this._popoutCloseTimer = window.setInterval(() => {
      if (!this._isPopped) {
        this._clearPopoutCloseWatch();
        return;
      }
      const e = this._popoutWindow;
      (!e || e.closed) && (this._clearPopoutCloseWatch(), this._schedulePopInFromPopupClose());
    }, 250);
  }
  _schedulePopInFromPopupClose() {
    !this._isPopped || this._popoutRestoreGuard || (this._popoutRestoreGuard = !0, window.setTimeout(() => {
      try {
        this.popIn({ closePopupWindow: !1 });
      } finally {
        this._popoutRestoreGuard = !1;
      }
    }, 0));
  }
  _installPopoutStyles(e) {
    var i, s;
    if (!(e != null && e.head)) return;
    try {
      for (const n of e.head.querySelectorAll(
        "[data-mjr-popout-cloned-style='1']"
      ))
        n.remove();
    } catch (n) {
      (i = console.debug) == null || i.call(console, n);
    }
    for (const n of document.querySelectorAll('link[rel="stylesheet"], style'))
      try {
        let r = null;
        if (n.tagName === "LINK") {
          r = e.createElement("link");
          for (const a of Array.from(n.attributes || []))
            (a == null ? void 0 : a.name) !== "href" && r.setAttribute(a.name, a.value);
          r.setAttribute("href", n.href || n.getAttribute("href") || "");
        } else
          r = e.importNode(n, !0);
        r.setAttribute("data-mjr-popout-cloned-style", "1"), e.head.appendChild(r);
      } catch (r) {
        (s = console.debug) == null || s.call(console, r);
      }
    const t = e.createElement("style");
    t.setAttribute("data-mjr-popout-cloned-style", "1"), t.textContent = `
            .mjr-mfv {
                position: static !important;
                width: 100% !important;
                height: 100% !important;
                min-width: 0 !important;
                min-height: 0 !important;
                resize: none !important;
                border: none !important;
                border-radius: 0 !important;
                box-shadow: none !important;
                /* Override animated hidden state so it shows immediately in popup */
                display: flex !important;
                opacity: 1 !important;
                visibility: visible !important;
                pointer-events: auto !important;
                transform: none !important;
                transition: none !important;
            }
        `, e.head.appendChild(t);
  }
  /**
   * Move the viewer back from the popup window into the main ComfyUI page.
   */
  popIn({ closePopupWindow: e = !0 } = {}) {
    var s, n, r, a;
    if (this._desktopExpanded) {
      this._setDesktopExpanded(!1);
      return;
    }
    if (!this._isPopped || !this.element) return;
    const t = this._popoutWindow;
    this._clearPopoutCloseWatch();
    try {
      (s = this._popoutAC) == null || s.abort();
    } catch (l) {
      (n = console.debug) == null || n.call(console, l);
    }
    this._popoutAC = null, this._popoutCloseHandler = null, this._popoutKeydownHandler = null, this._isPopped = !1;
    let i = this.element;
    try {
      i = (i == null ? void 0 : i.ownerDocument) === document ? i : document.adoptNode(i);
    } catch (l) {
      (r = console.debug) == null || r.call(console, "[MFV] pop-in adopt failed", l);
    }
    if (document.body.appendChild(i), this._resetGenDropdownForCurrentDocument(), this._rebindControlHandlers(), this._bindPanelInteractions(), this._bindDocumentUiHandlers(), i.classList.add("is-visible"), i.setAttribute("aria-hidden", "false"), this.isVisible = !0, this._updatePopoutBtnUI(), e)
      try {
        t == null || t.close();
      } catch (l) {
        (a = console.debug) == null || a.call(console, l);
      }
    this._popoutWindow = null;
  }
  /** Toggle pop-out button icon between external-link (pop out) and sign-in (pop in). */
  _updatePopoutBtnUI() {
    if (!this._popoutBtn) return;
    const e = this._isPopped || this._desktopExpanded;
    this.element && this.element.classList.toggle("mjr-mfv--popped", e), this._popoutBtn.classList.toggle("mjr-popin-active", e);
    const t = this._popoutBtn.querySelector("i") || document.createElement("i"), i = e ? B("tooltip.popInViewer", "Return to floating panel") : B("tooltip.popOutViewer", "Pop out viewer to separate window");
    e ? t.className = "pi pi-sign-in" : t.className = "pi pi-external-link", this._popoutBtn.title = i, this._popoutBtn.setAttribute("aria-label", i), this._popoutBtn.setAttribute("aria-pressed", String(e)), this._popoutBtn.contains(t) || this._popoutBtn.replaceChildren(t);
  }
  /** Whether the viewer is currently in a pop-out window. */
  get isPopped() {
    return this._isPopped || this._desktopExpanded;
  }
  _resizeCursorForDirection(e) {
    return {
      n: "ns-resize",
      s: "ns-resize",
      e: "ew-resize",
      w: "ew-resize",
      ne: "nesw-resize",
      nw: "nwse-resize",
      se: "nwse-resize",
      sw: "nesw-resize"
    }[e] || "";
  }
  _getResizeDirectionFromPoint(e, t, i) {
    if (!i) return "";
    const s = e <= i.left + H, n = e >= i.right - H, r = t <= i.top + H, a = t >= i.bottom - H;
    return r && s ? "nw" : r && n ? "ne" : a && s ? "sw" : a && n ? "se" : r ? "n" : a ? "s" : s ? "w" : n ? "e" : "";
  }
  _stopEdgeResize() {
    var e, t;
    if (this.element) {
      if (((e = this._resizeState) == null ? void 0 : e.pointerId) != null)
        try {
          this.element.releasePointerCapture(this._resizeState.pointerId);
        } catch (i) {
          (t = console.debug) == null || t.call(console, i);
        }
      this._resizeState = null, this.element.classList.remove("mjr-mfv--resizing"), this.element.style.cursor = "";
    }
  }
  _bindPanelInteractions() {
    var e, t;
    if (this.element) {
      this._stopEdgeResize();
      try {
        (e = this._panelAC) == null || e.abort();
      } catch (i) {
        (t = console.debug) == null || t.call(console, i);
      }
      this._panelAC = new AbortController(), this._initEdgeResize(this.element), this._initDrag(this.element.querySelector(".mjr-mfv-header"));
    }
  }
  _initEdgeResize(e) {
    var a;
    if (!e) return;
    const t = (l) => {
      if (!this.element || this._isPopped) return "";
      const o = this.element.getBoundingClientRect();
      return this._getResizeDirectionFromPoint(l.clientX, l.clientY, o);
    }, i = (a = this._panelAC) == null ? void 0 : a.signal, s = (l) => {
      var _;
      if (l.button !== 0 || !this.element || this._isPopped) return;
      const o = t(l);
      if (!o) return;
      l.preventDefault(), l.stopPropagation();
      const d = this.element.getBoundingClientRect(), c = window.getComputedStyle(this.element), m = Math.max(120, Number.parseFloat(c.minWidth) || 0), h = Math.max(100, Number.parseFloat(c.minHeight) || 0);
      this._resizeState = {
        pointerId: l.pointerId,
        dir: o,
        startX: l.clientX,
        startY: l.clientY,
        startLeft: d.left,
        startTop: d.top,
        startWidth: d.width,
        startHeight: d.height,
        minWidth: m,
        minHeight: h
      }, this.element.style.left = `${Math.round(d.left)}px`, this.element.style.top = `${Math.round(d.top)}px`, this.element.style.right = "auto", this.element.style.bottom = "auto", this.element.classList.add("mjr-mfv--resizing"), this.element.style.cursor = this._resizeCursorForDirection(o);
      try {
        this.element.setPointerCapture(l.pointerId);
      } catch (u) {
        (_ = console.debug) == null || _.call(console, u);
      }
    }, n = (l) => {
      if (!this.element || this._isPopped) return;
      const o = this._resizeState;
      if (!o) {
        const f = t(l);
        this.element.style.cursor = f ? this._resizeCursorForDirection(f) : "";
        return;
      }
      if (o.pointerId !== l.pointerId) return;
      const d = l.clientX - o.startX, c = l.clientY - o.startY;
      let m = o.startWidth, h = o.startHeight, _ = o.startLeft, u = o.startTop;
      o.dir.includes("e") && (m = o.startWidth + d), o.dir.includes("s") && (h = o.startHeight + c), o.dir.includes("w") && (m = o.startWidth - d, _ = o.startLeft + d), o.dir.includes("n") && (h = o.startHeight - c, u = o.startTop + c), m < o.minWidth && (o.dir.includes("w") && (_ -= o.minWidth - m), m = o.minWidth), h < o.minHeight && (o.dir.includes("n") && (u -= o.minHeight - h), h = o.minHeight), m = Math.min(m, Math.max(o.minWidth, window.innerWidth)), h = Math.min(h, Math.max(o.minHeight, window.innerHeight)), _ = Math.min(Math.max(0, _), Math.max(0, window.innerWidth - m)), u = Math.min(Math.max(0, u), Math.max(0, window.innerHeight - h)), this.element.style.width = `${Math.round(m)}px`, this.element.style.height = `${Math.round(h)}px`, this.element.style.left = `${Math.round(_)}px`, this.element.style.top = `${Math.round(u)}px`, this.element.style.right = "auto", this.element.style.bottom = "auto";
    }, r = (l) => {
      if (!this.element || !this._resizeState || this._resizeState.pointerId !== l.pointerId) return;
      const o = t(l);
      this._stopEdgeResize(), o && (this.element.style.cursor = this._resizeCursorForDirection(o));
    };
    e.addEventListener("pointerdown", s, { capture: !0, signal: i }), e.addEventListener("pointermove", n, { signal: i }), e.addEventListener("pointerup", r, { signal: i }), e.addEventListener("pointercancel", r, { signal: i }), e.addEventListener(
      "pointerleave",
      () => {
        !this._resizeState && this.element && (this.element.style.cursor = "");
      },
      { signal: i }
    );
  }
  // ── Drag ──────────────────────────────────────────────────────────────────
  _initDrag(e) {
    var s;
    if (!e) return;
    const t = (s = this._panelAC) == null ? void 0 : s.signal;
    let i = null;
    e.addEventListener(
      "pointerdown",
      (n) => {
        if (n.button !== 0 || n.target.closest("button") || n.target.closest("select") || this._isPopped || !this.element || this._getResizeDirectionFromPoint(
          n.clientX,
          n.clientY,
          this.element.getBoundingClientRect()
        )) return;
        n.preventDefault(), e.setPointerCapture(n.pointerId);
        try {
          i == null || i.abort();
        } catch {
        }
        i = new AbortController();
        const a = i.signal, l = this.element, o = l.getBoundingClientRect(), d = n.clientX - o.left, c = n.clientY - o.top, m = (_) => {
          const u = Math.min(
            window.innerWidth - l.offsetWidth,
            Math.max(0, _.clientX - d)
          ), f = Math.min(
            window.innerHeight - l.offsetHeight,
            Math.max(0, _.clientY - c)
          );
          l.style.left = `${u}px`, l.style.top = `${f}px`, l.style.right = "auto", l.style.bottom = "auto";
        }, h = () => {
          try {
            i == null || i.abort();
          } catch {
          }
        };
        e.addEventListener("pointermove", m, { signal: a }), e.addEventListener("pointerup", h, { signal: a });
      },
      t ? { signal: t } : void 0
    );
  }
  // ── Canvas capture ────────────────────────────────────────────────────────
  /**
   * Draw a media asset (image or current video frame) letterboxed into
   * the canvas region (ox, oy, w, h).  preferredVideo is used for multi-
   * video modes so we grab the right element.
   */
  async _drawMediaFit(e, t, i, s, n, r, a) {
    var h, _, u, f, y;
    if (!t) return;
    const l = I(t);
    let o = null;
    if (l === "video" && (o = a instanceof HTMLVideoElement ? a : ((h = this._contentEl) == null ? void 0 : h.querySelector("video")) || null), !o && l === "model3d") {
      const w = (t == null ? void 0 : t.id) != null ? String(t.id) : "";
      w && (o = ((u = (_ = this._contentEl) == null ? void 0 : _.querySelector) == null ? void 0 : u.call(
        _,
        `.mjr-model3d-render-canvas[data-mjr-asset-id="${w}"]`
      )) || null), o || (o = ((y = (f = this._contentEl) == null ? void 0 : f.querySelector) == null ? void 0 : y.call(f, ".mjr-model3d-render-canvas")) || null);
    }
    if (!o) {
      const w = Q(t);
      if (!w) return;
      o = await new Promise((b) => {
        const A = new Image();
        A.crossOrigin = "anonymous", A.onload = () => b(A), A.onerror = () => b(null), A.src = w;
      });
    }
    if (!o) return;
    const d = o.videoWidth || o.naturalWidth || n, c = o.videoHeight || o.naturalHeight || r;
    if (!d || !c) return;
    const m = Math.min(n / d, r / c);
    e.drawImage(
      o,
      i + (n - d * m) / 2,
      s + (r - c * m) / 2,
      d * m,
      c * m
    );
  }
  /** Render the gen-info overlay onto the canvas region (ox, oy, w, h). */
  _drawGenInfoOverlay(e, t, i, s, n, r) {
    if (!t || !this._genInfoSelections.size) return;
    const a = this._getGenFields(t), l = {
      prompt: "#7ec8ff",
      seed: "#ffd47a",
      model: "#7dda8a",
      lora: "#d48cff",
      sampler: "#ff9f7a",
      scheduler: "#ff7a9f",
      cfg: "#7a9fff",
      step: "#7affd4",
      genTime: "#e0ff7a"
    }, o = [
      "prompt",
      "seed",
      "model",
      "lora",
      "sampler",
      "scheduler",
      "cfg",
      "step",
      "genTime"
    ], d = [];
    for (const v of o) {
      if (!this._genInfoSelections.has(v)) continue;
      const S = a[v] != null ? String(a[v]) : "";
      if (!S) continue;
      let E = v.charAt(0).toUpperCase() + v.slice(1);
      v === "lora" ? E = "LoRA" : v === "cfg" ? E = "CFG" : v === "genTime" && (E = "Gen Time");
      const x = v === "prompt" && S.length > 500 ? S.slice(0, 500) + "…" : S;
      d.push({
        label: `${E}: `,
        value: x,
        color: l[v] || "#ffffff"
      });
    }
    if (!d.length) return;
    const c = 11, m = 16, h = 8, _ = Math.max(100, n - h * 2);
    e.save();
    const u = [];
    for (const { label: v, value: S, color: E } of d) {
      e.font = `bold ${c}px system-ui, sans-serif`;
      const x = e.measureText(v).width;
      e.font = `${c}px system-ui, sans-serif`;
      const N = _ - h * 2 - x, O = [];
      let P = "";
      for (const V of S.split(" ")) {
        const Y = P ? P + " " + V : V;
        e.measureText(Y).width > N && P ? (O.push(P), P = V) : P = Y;
      }
      P && O.push(P), u.push({ label: v, labelW: x, lines: O, color: E });
    }
    const f = Math.max(1, Math.floor((r * 0.4 - h * 2) / m)), y = [];
    let w = 0;
    for (const v of u) {
      if (w >= f) break;
      const S = [];
      for (const E of v.lines) {
        if (w >= f) break;
        S.push(E), w++;
      }
      S.length > 0 && y.push({ ...v, lines: S });
    }
    const b = w * m + h * 2, A = i + h, k = s + r - b - h;
    e.globalAlpha = 0.72, e.fillStyle = "#000", ee(e, A, k, _, b, 6), e.fill(), e.globalAlpha = 1;
    let L = k + h + c;
    for (const { label: v, labelW: S, lines: E, color: x } of y)
      for (let N = 0; N < E.length; N++)
        N === 0 ? (e.font = `bold ${c}px system-ui, sans-serif`, e.fillStyle = x, e.fillText(v, A + h, L), e.font = `${c}px system-ui, sans-serif`, e.fillStyle = "rgba(255,255,255,0.88)", e.fillText(E[N], A + h + S, L)) : (e.font = `${c}px system-ui, sans-serif`, e.fillStyle = "rgba(255,255,255,0.88)", e.fillText(E[N], A + h + S, L)), L += m;
    e.restore();
  }
  /** Capture the current view to PNG and trigger a browser download. */
  async _captureView() {
    var a;
    if (!this._contentEl) return;
    this._captureBtn && (this._captureBtn.disabled = !0, this._captureBtn.setAttribute("aria-label", B("tooltip.capturingView", "Capturing…")));
    const e = this._contentEl.clientWidth || 480, t = this._contentEl.clientHeight || 360, i = document.createElement("canvas");
    i.width = e, i.height = t;
    const s = i.getContext("2d");
    s.fillStyle = "#0d0d0d", s.fillRect(0, 0, e, t);
    try {
      if (this._mode === g.SIMPLE)
        this._mediaA && (await this._drawMediaFit(s, this._mediaA, 0, 0, e, t), this._drawGenInfoOverlay(s, this._mediaA, 0, 0, e, t));
      else if (this._mode === g.AB) {
        const l = Math.round(this._abDividerX * e), o = this._contentEl.querySelector(
          ".mjr-mfv-ab-layer:not(.mjr-mfv-ab-layer--b) video"
        ), d = this._contentEl.querySelector(".mjr-mfv-ab-layer--b video");
        this._mediaA && await this._drawMediaFit(s, this._mediaA, 0, 0, e, t, o), this._mediaB && (s.save(), s.beginPath(), s.rect(l, 0, e - l, t), s.clip(), await this._drawMediaFit(s, this._mediaB, 0, 0, e, t, d), s.restore()), s.save(), s.strokeStyle = "rgba(255,255,255,0.88)", s.lineWidth = 2, s.beginPath(), s.moveTo(l, 0), s.lineTo(l, t), s.stroke(), s.restore(), F(s, "A", 8, 8), F(s, "B", l + 8, 8), this._mediaA && this._drawGenInfoOverlay(s, this._mediaA, 0, 0, l, t), this._mediaB && this._drawGenInfoOverlay(s, this._mediaB, l, 0, e - l, t);
      } else if (this._mode === g.SIDE) {
        const l = Math.floor(e / 2), o = this._contentEl.querySelector(".mjr-mfv-side-panel:first-child video"), d = this._contentEl.querySelector(".mjr-mfv-side-panel:last-child video");
        this._mediaA && (await this._drawMediaFit(s, this._mediaA, 0, 0, l, t, o), this._drawGenInfoOverlay(s, this._mediaA, 0, 0, l, t)), s.fillStyle = "#111", s.fillRect(l, 0, 2, t), this._mediaB && (await this._drawMediaFit(s, this._mediaB, l, 0, l, t, d), this._drawGenInfoOverlay(s, this._mediaB, l, 0, l, t)), F(s, "A", 8, 8), F(s, "B", l + 8, 8);
      } else if (this._mode === g.GRID) {
        const l = Math.floor(e / 2), o = Math.floor(t / 2), d = 1, c = [
          { media: this._mediaA, label: "A", x: 0, y: 0, w: l - d, h: o - d },
          {
            media: this._mediaB,
            label: "B",
            x: l + d,
            y: 0,
            w: l - d,
            h: o - d
          },
          {
            media: this._mediaC,
            label: "C",
            x: 0,
            y: o + d,
            w: l - d,
            h: o - d
          },
          {
            media: this._mediaD,
            label: "D",
            x: l + d,
            y: o + d,
            w: l - d,
            h: o - d
          }
        ], m = this._contentEl.querySelectorAll(".mjr-mfv-grid-cell");
        for (let h = 0; h < c.length; h++) {
          const _ = c[h], u = ((a = m[h]) == null ? void 0 : a.querySelector("video")) || null;
          _.media && (await this._drawMediaFit(s, _.media, _.x, _.y, _.w, _.h, u), this._drawGenInfoOverlay(s, _.media, _.x, _.y, _.w, _.h)), F(s, _.label, _.x + 8, _.y + 8);
        }
        s.save(), s.fillStyle = "#111", s.fillRect(l - d, 0, d * 2, t), s.fillRect(0, o - d, e, d * 2), s.restore();
      }
    } catch (l) {
      console.debug("[MFV] capture error:", l);
    }
    const r = `${{
      [g.AB]: "mfv-ab",
      [g.SIDE]: "mfv-side",
      [g.GRID]: "mfv-grid"
    }[this._mode] ?? "mfv"}-${Date.now()}.png`;
    try {
      const l = i.toDataURL("image/png"), o = document.createElement("a");
      o.href = l, o.download = r, document.body.appendChild(o), o.click(), setTimeout(() => document.body.removeChild(o), 100);
    } catch (l) {
      console.warn("[MFV] download failed:", l);
    } finally {
      this._captureBtn && (this._captureBtn.disabled = !1, this._captureBtn.setAttribute(
        "aria-label",
        B("tooltip.captureView", "Save view as image")
      ));
    }
  }
  // ── Lifecycle ─────────────────────────────────────────────────────────────
  dispose() {
    var e, t, i, s, n, r, a, l, o, d, c, m, h, _, u, f, y, w;
    this._destroyPanZoom(), this._destroyCompareSync(), this._stopEdgeResize(), this._clearPopoutCloseWatch();
    try {
      (e = this._panelAC) == null || e.abort(), this._panelAC = null;
    } catch (b) {
      (t = console.debug) == null || t.call(console, b);
    }
    try {
      (i = this._btnAC) == null || i.abort(), this._btnAC = null;
    } catch (b) {
      (s = console.debug) == null || s.call(console, b);
    }
    try {
      (n = this._docAC) == null || n.abort(), this._docAC = null;
    } catch (b) {
      (r = console.debug) == null || r.call(console, b);
    }
    try {
      (a = this._popoutAC) == null || a.abort(), this._popoutAC = null;
    } catch (b) {
      (l = console.debug) == null || l.call(console, b);
    }
    try {
      (o = this._panzoomAC) == null || o.abort(), this._panzoomAC = null;
    } catch (b) {
      (d = console.debug) == null || d.call(console, b);
    }
    try {
      (m = (c = this._compareSyncAC) == null ? void 0 : c.abort) == null || m.call(c), this._compareSyncAC = null;
    } catch (b) {
      (h = console.debug) == null || h.call(console, b);
    }
    try {
      this._isPopped && this.popIn();
    } catch (b) {
      (_ = console.debug) == null || _.call(console, b);
    }
    this._revokePreviewBlob();
    try {
      (u = this.element) == null || u.remove();
    } catch (b) {
      (f = console.debug) == null || f.call(console, b);
    }
    this.element = null, this._contentEl = null, this._closeBtn = null, this._modeBtn = null, this._pinSelect = null, this._liveBtn = null, this._nodeStreamBtn = null, this._popoutBtn = null, this._captureBtn = null, this._unbindDocumentUiHandlers();
    try {
      (y = this._genDropdown) == null || y.remove();
    } catch (b) {
      (w = console.debug) == null || w.call(console, b);
    }
    this._mediaA = null, this._mediaB = null, this._mediaC = null, this._mediaD = null, this.isVisible = !1;
  }
}
export {
  ye as FloatingViewer,
  g as MFV_MODES
};

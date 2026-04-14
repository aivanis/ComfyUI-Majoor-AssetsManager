import { p as It, M as Ft, c as Lt, q as xt, t as kt, A as K, u as Y, v as N, x as _t, y as jt, z as Tt, B as w, E as $, n as Vt, s as et, C as at, D as Gt, F as lt, G as dt, d as nt, H as Rt, I as Ht } from "./entry-S3Px94gV.js";
import { ensureViewerMetadataAsset as J } from "./genInfo-Vy2sM9JG.js";
const C = Object.freeze({
  SIMPLE: "simple",
  AB: "ab",
  SIDE: "side",
  GRID: "grid"
}), ot = 0.25, st = 8, Ot = 8e-4, v = 8, Dt = "C", gt = "L", bt = "K", Ut = "N", zt = "Esc", Q = 30;
function it(t) {
  const e = Number(t);
  if (!Number.isFinite(e) || e < 0) return "0:00";
  const n = Math.floor(e), o = Math.floor(n / 3600), i = Math.floor(n % 3600 / 60), s = n % 60;
  return o > 0 ? `${o}:${String(i).padStart(2, "0")}:${String(s).padStart(2, "0")}` : `${i}:${String(s).padStart(2, "0")}`;
}
function pt(t) {
  var e, n;
  try {
    const o = (e = t == null ? void 0 : t.play) == null ? void 0 : e.call(t);
    o && typeof o.catch == "function" && o.catch(() => {
    });
  } catch (o) {
    (n = console.debug) == null || n.call(console, o);
  }
}
function $t(t, e) {
  const n = Math.floor(Number(t) || 0), o = Math.max(0, Math.floor(Number(e) || 0));
  return n < 0 ? 0 : o > 0 && n > o ? o : n;
}
function mt(t, e) {
  const n = Number((t == null ? void 0 : t.currentTime) || 0), o = Number(e) > 0 ? Number(e) : Q;
  return Math.max(0, Math.floor(n * o));
}
function yt(t, e) {
  const n = Number((t == null ? void 0 : t.duration) || 0), o = Number(e) > 0 ? Number(e) : Q;
  return !Number.isFinite(n) || n <= 0 ? 0 : Math.max(0, Math.floor(n * o));
}
function Wt(t, e, n) {
  var d;
  const o = Number(n) > 0 ? Number(n) : Q, i = yt(t, o), l = $t(e, i) / o;
  try {
    t.currentTime = Math.max(0, l);
  } catch (u) {
    (d = console.debug) == null || d.call(console, u);
  }
}
function Xt(t) {
  return t instanceof HTMLMediaElement;
}
function qt(t, e) {
  return String(t || "").toLowerCase() === "video" ? !0 : e instanceof HTMLVideoElement;
}
function Kt(t, e) {
  return String(t || "").toLowerCase() === "audio" ? !0 : e instanceof HTMLAudioElement;
}
function Yt(t) {
  const e = String(t || "").toLowerCase();
  return e === "gif" || e === "animated-image";
}
function Zt(t) {
  var e;
  try {
    const n = Number((t == null ? void 0 : t.naturalWidth) || (t == null ? void 0 : t.width) || 0), o = Number((t == null ? void 0 : t.naturalHeight) || (t == null ? void 0 : t.height) || 0);
    if (!(n > 0 && o > 0)) return "";
    const i = document.createElement("canvas");
    i.width = n, i.height = o;
    const s = i.getContext("2d");
    return s ? (s.drawImage(t, 0, 0, n, o), i.toDataURL("image/png")) : "";
  } catch (n) {
    return (e = console.debug) == null || e.call(console, n), "";
  }
}
function rt(t, e = null, { kind: n = "" } = {}) {
  var ut;
  if (!t || t._mjrSimplePlayerMounted) return (t == null ? void 0 : t.parentElement) || null;
  t._mjrSimplePlayerMounted = !0;
  const o = It(e) || Q, i = Xt(t), s = qt(n, t), l = Kt(n, t), d = Yt(n), u = document.createElement("div");
  u.className = "mjr-mfv-simple-player", l && u.classList.add("is-audio"), d && u.classList.add("is-animated-image");
  const r = document.createElement("div");
  r.className = "mjr-mfv-simple-player-controls";
  const a = document.createElement("input");
  a.type = "range", a.className = "mjr-mfv-simple-player-seek", a.min = "0", a.max = "1000", a.step = "1", a.value = "0", a.setAttribute("aria-label", "Seek"), i || (a.disabled = !0, a.classList.add("is-disabled"));
  const c = document.createElement("div");
  c.className = "mjr-mfv-simple-player-row";
  const h = document.createElement("button");
  h.type = "button", h.className = "mjr-icon-btn mjr-mfv-simple-player-btn", h.setAttribute("aria-label", "Play/Pause");
  const m = document.createElement("i");
  m.className = "pi pi-pause", m.setAttribute("aria-hidden", "true"), h.appendChild(m);
  const f = document.createElement("button");
  f.type = "button", f.className = "mjr-icon-btn mjr-mfv-simple-player-btn", f.setAttribute("aria-label", "Step back");
  const p = document.createElement("i");
  p.className = "pi pi-step-backward", p.setAttribute("aria-hidden", "true"), f.appendChild(p);
  const _ = document.createElement("button");
  _.type = "button", _.className = "mjr-icon-btn mjr-mfv-simple-player-btn", _.setAttribute("aria-label", "Step forward");
  const g = document.createElement("i");
  g.className = "pi pi-step-forward", g.setAttribute("aria-hidden", "true"), _.appendChild(g);
  const b = document.createElement("div");
  b.className = "mjr-mfv-simple-player-time", b.textContent = "0:00 / 0:00";
  const y = document.createElement("div");
  y.className = "mjr-mfv-simple-player-frame", y.textContent = "F: 0", s || (y.style.display = "none");
  const A = document.createElement("button");
  A.type = "button", A.className = "mjr-icon-btn mjr-mfv-simple-player-btn", A.setAttribute("aria-label", "Mute/Unmute");
  const E = document.createElement("i");
  if (E.className = "pi pi-volume-up", E.setAttribute("aria-hidden", "true"), A.appendChild(E), s || (f.disabled = !0, _.disabled = !0, f.classList.add("is-disabled"), _.classList.add("is-disabled")), c.appendChild(f), c.appendChild(h), c.appendChild(_), c.appendChild(b), c.appendChild(y), c.appendChild(A), r.appendChild(a), r.appendChild(c), u.appendChild(t), l) {
    const S = document.createElement("div");
    S.className = "mjr-mfv-simple-player-audio-backdrop", S.textContent = String((e == null ? void 0 : e.filename) || "Audio"), u.appendChild(S);
  }
  u.appendChild(r);
  try {
    t instanceof HTMLMediaElement && (t.controls = !1, t.playsInline = !0, t.loop = !0, t.muted = !0, t.autoplay = !0);
  } catch (S) {
    (ut = console.debug) == null || ut.call(console, S);
  }
  const I = d ? String((t == null ? void 0 : t.src) || "") : "";
  let M = !1, j = "";
  const L = () => {
    if (i) {
      m.className = t.paused ? "pi pi-play" : "pi pi-pause";
      return;
    }
    if (d) {
      m.className = M ? "pi pi-play" : "pi pi-pause";
      return;
    }
    m.className = "pi pi-play";
  }, O = () => {
    if (t instanceof HTMLMediaElement) {
      E.className = t.muted ? "pi pi-volume-off" : "pi pi-volume-up";
      return;
    }
    E.className = "pi pi-volume-off", A.disabled = !0, A.classList.add("is-disabled");
  }, F = () => {
    if (!s || !(t instanceof HTMLVideoElement)) return;
    const S = mt(t, o), B = yt(t, o);
    y.textContent = B > 0 ? `F: ${S}/${B}` : `F: ${S}`;
  }, H = () => {
    const S = Math.max(0, Math.min(100, Number(a.value) / 1e3 * 100));
    a.style.setProperty("--mjr-seek-pct", `${S}%`);
  }, T = () => {
    if (!i) {
      b.textContent = d ? "Animated" : "Preview", a.value = "0", H();
      return;
    }
    const S = Number(t.currentTime || 0), B = Number(t.duration || 0);
    if (Number.isFinite(B) && B > 0) {
      const k = Math.max(0, Math.min(1, S / B));
      a.value = String(Math.round(k * 1e3)), b.textContent = `${it(S)} / ${it(B)}`;
    } else
      a.value = "0", b.textContent = `${it(S)} / 0:00`;
    H();
  }, X = (S) => {
    var B;
    try {
      (B = S == null ? void 0 : S.stopPropagation) == null || B.call(S);
    } catch {
    }
  }, Bt = (S) => {
    var B, k;
    X(S);
    try {
      if (i)
        t.paused ? pt(t) : (B = t.pause) == null || B.call(t);
      else if (d)
        if (!M)
          j || (j = Zt(t)), j && (t.src = j), M = !0;
        else {
          const V = I ? `${I}${I.includes("?") ? "&" : "?"}mjr_anim=${Date.now()}` : t.src;
          t.src = V, M = !1;
        }
    } catch (V) {
      (k = console.debug) == null || k.call(console, V);
    }
    L();
  }, ct = (S, B) => {
    var V, Z;
    if (X(B), !s || !(t instanceof HTMLVideoElement)) return;
    try {
      (V = t.pause) == null || V.call(t);
    } catch (Nt) {
      (Z = console.debug) == null || Z.call(console, Nt);
    }
    const k = mt(t, o);
    Wt(t, k + S, o), L(), F(), T();
  }, Mt = (S) => {
    var B;
    if (X(S), t instanceof HTMLMediaElement) {
      try {
        t.muted = !t.muted;
      } catch (k) {
        (B = console.debug) == null || B.call(console, k);
      }
      O();
    }
  }, Pt = (S) => {
    var V;
    if (X(S), !i) return;
    H();
    const B = Number(t.duration || 0);
    if (!Number.isFinite(B) || B <= 0) return;
    const k = Math.max(0, Math.min(1, Number(a.value) / 1e3));
    try {
      t.currentTime = B * k;
    } catch (Z) {
      (V = console.debug) == null || V.call(console, Z);
    }
    F(), T();
  }, tt = (S) => X(S);
  return h.addEventListener("click", Bt), f.addEventListener("click", (S) => ct(-1, S)), _.addEventListener("click", (S) => ct(1, S)), A.addEventListener("click", Mt), a.addEventListener("input", Pt), r.addEventListener("pointerdown", tt), r.addEventListener("click", tt), r.addEventListener("dblclick", tt), t instanceof HTMLMediaElement && (t.addEventListener("play", L, { passive: !0 }), t.addEventListener("pause", L, { passive: !0 }), t.addEventListener(
    "timeupdate",
    () => {
      F(), T();
    },
    { passive: !0 }
  ), t.addEventListener(
    "seeked",
    () => {
      F(), T();
    },
    { passive: !0 }
  ), t.addEventListener(
    "loadedmetadata",
    () => {
      F(), T();
    },
    { passive: !0 }
  )), pt(t), L(), O(), F(), T(), u;
}
const vt = /* @__PURE__ */ new Set([".mp4", ".webm", ".mov", ".avi", ".mkv"]), wt = /* @__PURE__ */ new Set([".mp3", ".wav", ".flac", ".ogg", ".m4a", ".aac", ".opus", ".wma"]);
function Ct(t) {
  try {
    const e = String(t || "").trim(), n = e.lastIndexOf(".");
    return n >= 0 ? e.slice(n).toLowerCase() : "";
  } catch {
    return "";
  }
}
function R(t) {
  const e = String((t == null ? void 0 : t.kind) || "").toLowerCase();
  if (e === "video") return "video";
  if (e === "audio") return "audio";
  if (e === "model3d") return "model3d";
  const n = Ct((t == null ? void 0 : t.filename) || "");
  return n === ".gif" ? "gif" : vt.has(n) ? "video" : wt.has(n) ? "audio" : Ft.has(n) ? "model3d" : "image";
}
function St(t) {
  return t ? t.url ? String(t.url) : t.filename && t.id == null ? xt(t.filename, t.subfolder || "", t.type || "output") : t.filename && kt(t) || "" : "";
}
function G(t = "No media — select assets in the grid") {
  const e = document.createElement("div");
  return e.className = "mjr-mfv-empty", e.textContent = t, e;
}
function D(t, e) {
  const n = document.createElement("div");
  return n.className = `mjr-mfv-label label-${e}`, n.textContent = t, n;
}
function ht(t) {
  var e;
  if (!(!t || typeof t.play != "function"))
    try {
      const n = t.play();
      n && typeof n.catch == "function" && n.catch(() => {
      });
    } catch (n) {
      (e = console.debug) == null || e.call(console, n);
    }
}
function Jt(t, e) {
  var o, i;
  let n = t && t.nodeType === 1 ? t : (t == null ? void 0 : t.parentElement) || null;
  for (; n && n !== e; ) {
    try {
      const s = (o = window.getComputedStyle) == null ? void 0 : o.call(window, n), l = /(auto|scroll|overlay)/.test(String((s == null ? void 0 : s.overflowY) || "")), d = /(auto|scroll|overlay)/.test(String((s == null ? void 0 : s.overflowX) || ""));
      if (l || d)
        return n;
    } catch (s) {
      (i = console.debug) == null || i.call(console, s);
    }
    n = n.parentElement || null;
  }
  return null;
}
function Qt(t, e, n) {
  if (!t) return !1;
  if (Math.abs(Number(n) || 0) >= Math.abs(Number(e) || 0)) {
    const s = Number(t.scrollTop || 0), l = Math.max(0, Number(t.scrollHeight || 0) - Number(t.clientHeight || 0));
    if (n < 0 && s > 0 || n > 0 && s < l) return !0;
  }
  const o = Number(t.scrollLeft || 0), i = Math.max(0, Number(t.scrollWidth || 0) - Number(t.clientWidth || 0));
  return e < 0 && o > 0 || e > 0 && o < i;
}
function te(t) {
  var e, n, o, i;
  if (t)
    try {
      const s = (e = t.querySelectorAll) == null ? void 0 : e.call(t, "video, audio");
      if (!s || !s.length) return;
      for (const l of s)
        try {
          (n = l.pause) == null || n.call(l);
        } catch (d) {
          (o = console.debug) == null || o.call(console, d);
        }
    } catch (s) {
      (i = console.debug) == null || i.call(console, s);
    }
}
function U(t, { fill: e = !1 } = {}) {
  var u, r;
  const n = St(t);
  if (!n) return null;
  const o = R(t), i = `mjr-mfv-media mjr-mfv-media--fit-height${e ? " mjr-mfv-media--fill" : ""}`, l = Ct((t == null ? void 0 : t.filename) || "") === ".webp" && Number((t == null ? void 0 : t.duration) ?? ((u = t == null ? void 0 : t.metadata_raw) == null ? void 0 : u.duration) ?? 0) > 0;
  if (o === "audio") {
    const a = document.createElement("audio");
    a.className = i, a.src = n, a.controls = !1, a.autoplay = !0, a.preload = "metadata", a.loop = !0, a.muted = !0;
    try {
      a.addEventListener("loadedmetadata", () => ht(a), { once: !0 });
    } catch (h) {
      (r = console.debug) == null || r.call(console, h);
    }
    return ht(a), rt(a, t, { kind: "audio" }) || a;
  }
  if (o === "video") {
    const a = document.createElement("video");
    return a.className = i, a.src = n, a.controls = !1, a.loop = !0, a.muted = !0, a.autoplay = !0, a.playsInline = !0, rt(a, t, { kind: "video" }) || a;
  }
  if (o === "model3d")
    return Lt(t, n, {
      hostClassName: `mjr-model3d-host mjr-mfv-model3d-host${e ? " mjr-mfv-model3d-host--fill" : ""}`,
      canvasClassName: `mjr-mfv-media mjr-model3d-render-canvas${e ? " mjr-mfv-media--fill" : ""}`,
      hintText: "Rotate: left drag  Pan: right drag  Zoom: wheel or middle drag",
      disableViewerTransform: !0,
      pauseDuringExecution: !!K.FLOATING_VIEWER_PAUSE_DURING_EXECUTION
    });
  const d = document.createElement("img");
  return d.className = i, d.src = n, d.alt = String((t == null ? void 0 : t.filename) || ""), d.draggable = !1, (o === "gif" || l) && rt(d, t, {
    kind: o === "gif" ? "gif" : "animated-image"
  }) || d;
}
function At(t, e, n, o, i, s) {
  t.beginPath(), typeof t.roundRect == "function" ? t.roundRect(e, n, o, i, s) : (t.moveTo(e + s, n), t.lineTo(e + o - s, n), t.quadraticCurveTo(e + o, n, e + o, n + s), t.lineTo(e + o, n + i - s), t.quadraticCurveTo(e + o, n + i, e + o - s, n + i), t.lineTo(e + s, n + i), t.quadraticCurveTo(e, n + i, e, n + i - s), t.lineTo(e, n + s), t.quadraticCurveTo(e, n, e + s, n), t.closePath());
}
function q(t, e, n, o) {
  t.save(), t.font = "bold 10px system-ui, sans-serif";
  const i = 5, s = t.measureText(e).width;
  t.fillStyle = "rgba(0,0,0,0.58)", At(t, n, o, s + i * 2, 18, 4), t.fill(), t.fillStyle = "#fff", t.fillText(e, n + i, o + 13), t.restore();
}
function ee(t, e) {
  switch (String((t == null ? void 0 : t.type) || "").toLowerCase()) {
    case "number":
      return ne(t, e);
    case "combo":
      return oe(t, e);
    case "text":
    case "string":
    case "customtext":
      return se(t, e);
    case "toggle":
      return ie(t, e);
    default:
      return re(t);
  }
}
function W(t, e) {
  var o, i, s, l, d, u, r;
  if (!t) return !1;
  const n = String(t.type || "").toLowerCase();
  if (n === "number") {
    const a = Number(e);
    if (Number.isNaN(a)) return !1;
    const c = t.options ?? {}, h = c.min ?? -1 / 0, m = c.max ?? 1 / 0;
    t.value = Math.min(m, Math.max(h, a));
  } else n === "toggle" ? t.value = !!e : t.value = e;
  try {
    (o = t.callback) == null || o.call(t, t.value);
  } catch (a) {
    (i = console.debug) == null || i.call(console, a);
  }
  try {
    const a = Y();
    (l = (s = a == null ? void 0 : a.canvas) == null ? void 0 : s.setDirty) == null || l.call(s, !0, !0), (u = (d = a == null ? void 0 : a.graph) == null ? void 0 : d.setDirtyCanvas) == null || u.call(d, !0, !0);
  } catch (a) {
    (r = console.debug) == null || r.call(console, a);
  }
  return !0;
}
function ne(t, e) {
  const n = document.createElement("input");
  n.type = "number", n.className = "mjr-ws-input", n.value = t.value ?? "";
  const o = t.options ?? {};
  return o.min != null && (n.min = String(o.min)), o.max != null && (n.max = String(o.max)), o.step != null && (n.step = String(o.step)), n.addEventListener("input", () => {
    const i = n.value;
    i === "" || i === "-" || i === "." || i.endsWith(".") || (W(t, i), e == null || e(t.value));
  }), n.addEventListener("change", () => {
    W(t, n.value) && (n.value = t.value, e == null || e(t.value));
  }), n;
}
function oe(t, e) {
  var i;
  const n = document.createElement("select");
  n.className = "mjr-ws-input";
  let o = ((i = t.options) == null ? void 0 : i.values) ?? [];
  if (typeof o == "function")
    try {
      o = o() ?? [];
    } catch {
      o = [];
    }
  Array.isArray(o) || (o = []);
  for (const s of o) {
    const l = document.createElement("option"), d = typeof s == "string" ? s : (s == null ? void 0 : s.content) ?? (s == null ? void 0 : s.value) ?? (s == null ? void 0 : s.text) ?? String(s);
    l.value = d, l.textContent = d, d === String(t.value) && (l.selected = !0), n.appendChild(l);
  }
  return n.addEventListener("change", () => {
    W(t, n.value) && (e == null || e(t.value));
  }), n;
}
function se(t, e) {
  const o = document.createElement("div");
  o.className = "mjr-ws-text-wrapper";
  const i = document.createElement("textarea");
  i.className = "mjr-ws-input mjr-ws-textarea", i.value = t.value ?? "", i.rows = 2;
  const s = document.createElement("button");
  s.type = "button", s.className = "mjr-ws-expand-btn", s.textContent = "Expand", s.style.display = "none";
  let l = !1;
  const d = () => {
    i.style.height = "auto";
    const u = i.scrollHeight;
    l ? (i.style.height = u + "px", i.style.maxHeight = "none", s.textContent = "Collapse") : (i.style.height = Math.min(u, 80) + "px", i.style.maxHeight = "80px", s.textContent = "Expand"), s.style.display = u > 80 ? "" : "none";
  };
  return i.addEventListener("change", () => {
    W(t, i.value) && (e == null || e(t.value));
  }), i.addEventListener("input", () => {
    W(t, i.value), d();
  }), s.addEventListener("click", () => {
    l = !l, d();
  }), o.appendChild(i), o.appendChild(s), requestAnimationFrame(d), o;
}
function ie(t, e) {
  const n = document.createElement("label");
  n.className = "mjr-ws-toggle-label";
  const o = document.createElement("input");
  return o.type = "checkbox", o.className = "mjr-ws-checkbox", o.checked = !!t.value, o.addEventListener("change", () => {
    W(t, o.checked) && (e == null || e(t.value));
  }), n.appendChild(o), n;
}
function re(t) {
  const e = document.createElement("input");
  return e.type = "text", e.className = "mjr-ws-input mjr-ws-readonly", e.value = t.value != null ? String(t.value) : "", e.readOnly = !0, e.tabIndex = -1, e;
}
const ae = /* @__PURE__ */ new Set(["imageupload", "button", "hidden"]);
class le {
  /**
   * @param {object} node  LGraphNode instance
   * @param {object} [opts]
   * @param {() => void} [opts.onLocate]  Custom locate handler (optional)
   */
  constructor(e, n = {}) {
    this._node = e, this._onLocate = n.onLocate ?? null, this._el = null, this._inputMap = /* @__PURE__ */ new Map();
  }
  get el() {
    return this._el || (this._el = this._render()), this._el;
  }
  /** Re-read widget values from the live graph and update inputs. */
  syncFromGraph() {
    var e, n;
    if ((e = this._node) != null && e.widgets)
      for (const o of this._node.widgets) {
        let i = this._inputMap.get(o.name);
        i && ((n = i.classList) != null && n.contains("mjr-ws-text-wrapper") && (i = i.querySelector("textarea") ?? i), i.type === "checkbox" ? i.checked = !!o.value : i.value = o.value != null ? String(o.value) : "");
      }
  }
  dispose() {
    var e;
    (e = this._el) == null || e.remove(), this._el = null, this._inputMap.clear();
  }
  // ── Private ───────────────────────────────────────────────────────────────
  _render() {
    var a;
    const e = this._node, n = document.createElement("section");
    n.className = "mjr-ws-node", n.dataset.nodeId = String(e.id ?? "");
    const o = document.createElement("div");
    o.className = "mjr-ws-node-header";
    const i = document.createElement("span");
    i.className = "mjr-ws-node-title", i.textContent = e.title || e.type || `Node #${e.id}`, o.appendChild(i);
    const s = document.createElement("button");
    s.type = "button", s.className = "mjr-icon-btn mjr-ws-locate", s.title = "Locate on canvas";
    const l = document.createElement("i");
    l.className = "pi pi-map-marker", l.setAttribute("aria-hidden", "true"), s.appendChild(l), s.addEventListener("click", () => this._locateNode()), o.appendChild(s), n.appendChild(o);
    const d = document.createElement("div");
    d.className = "mjr-ws-node-body";
    const u = e.widgets ?? [];
    let r = !1;
    for (const c of u) {
      const h = String(c.type || "").toLowerCase();
      if (ae.has(h) || c.hidden || (a = c.options) != null && a.hidden) continue;
      r = !0;
      const m = h === "text" || h === "string" || h === "customtext", f = document.createElement("div");
      f.className = m ? "mjr-ws-widget-row mjr-ws-widget-row--block" : "mjr-ws-widget-row";
      const p = document.createElement("label");
      p.className = "mjr-ws-widget-label", p.textContent = c.name || "";
      const _ = document.createElement("div");
      _.className = "mjr-ws-widget-input";
      const g = ee(c, () => {
      });
      _.appendChild(g), this._inputMap.set(c.name, g), f.appendChild(p), f.appendChild(_), d.appendChild(f);
    }
    if (!r) {
      const c = document.createElement("div");
      c.className = "mjr-ws-node-empty", c.textContent = "No editable parameters", d.appendChild(c);
    }
    return n.appendChild(d), n;
  }
  _locateNode() {
    var n, o, i, s, l, d, u, r;
    if (this._onLocate) {
      this._onLocate();
      return;
    }
    const e = this._node;
    if (e)
      try {
        const a = Y(), c = a == null ? void 0 : a.canvas;
        if (!c) return;
        if (typeof c.centerOnNode == "function")
          c.centerOnNode(e);
        else if (c.ds && e.pos) {
          const h = ((n = c.canvas) == null ? void 0 : n.width) || ((o = c.element) == null ? void 0 : o.width) || 800, m = ((i = c.canvas) == null ? void 0 : i.height) || ((s = c.element) == null ? void 0 : s.height) || 600;
          c.ds.offset[0] = -e.pos[0] - (((l = e.size) == null ? void 0 : l[0]) || 0) / 2 + h / 2, c.ds.offset[1] = -e.pos[1] - (((d = e.size) == null ? void 0 : d[1]) || 0) / 2 + m / 2, (u = c.setDirty) == null || u.call(c, !0, !0);
        }
      } catch (a) {
        (r = console.debug) == null || r.call(console, "[MFV sidebar] locateNode error", a);
      }
  }
}
class de {
  /**
   * @param {object} opts
   * @param {HTMLElement} opts.hostEl  The MFV root element to append to
   * @param {() => void}  [opts.onClose]
   */
  constructor({ hostEl: e, onClose: n } = {}) {
    this._hostEl = e, this._onClose = n ?? null, this._renderers = [], this._visible = !1, this._el = this._build();
  }
  get el() {
    return this._el;
  }
  get isVisible() {
    return this._visible;
  }
  show() {
    this._visible = !0, this._el.classList.add("open"), this.refresh();
  }
  hide() {
    this._visible = !1, this._el.classList.remove("open");
  }
  toggle() {
    var e;
    this._visible ? (this.hide(), (e = this._onClose) == null || e.call(this)) : this.show();
  }
  /** Re-read selected nodes and rebuild widget sections. */
  refresh() {
    if (!this._visible) return;
    this._clear();
    const e = ce();
    if (!e.length) {
      this._showEmpty();
      return;
    }
    for (const n of e) {
      const o = new le(n);
      this._renderers.push(o), this._body.appendChild(o.el);
    }
  }
  /** Sync existing renderers from graph values without full rebuild. */
  syncFromGraph() {
    for (const e of this._renderers) e.syncFromGraph();
  }
  dispose() {
    var e;
    this._clear(), (e = this._el) == null || e.remove();
  }
  // ── Private ───────────────────────────────────────────────────────────────
  _build() {
    const e = document.createElement("div");
    e.className = "mjr-ws-sidebar";
    const n = document.createElement("div");
    n.className = "mjr-ws-sidebar-header";
    const o = document.createElement("span");
    o.className = "mjr-ws-sidebar-title", o.textContent = "Node Parameters", n.appendChild(o);
    const i = document.createElement("button");
    i.type = "button", i.className = "mjr-icon-btn", i.title = "Close sidebar";
    const s = document.createElement("i");
    return s.className = "pi pi-times", s.setAttribute("aria-hidden", "true"), i.appendChild(s), i.addEventListener("click", () => {
      var l;
      this.hide(), (l = this._onClose) == null || l.call(this);
    }), n.appendChild(i), e.appendChild(n), this._body = document.createElement("div"), this._body.className = "mjr-ws-sidebar-body", e.appendChild(this._body), e;
  }
  _clear() {
    for (const e of this._renderers) e.dispose();
    this._renderers = [], this._body && (this._body.innerHTML = "");
  }
  _showEmpty() {
    const e = document.createElement("div");
    e.className = "mjr-ws-sidebar-empty", e.textContent = "Select nodes on the canvas to edit their parameters", this._body.appendChild(e);
  }
}
function ce() {
  var t, e, n;
  try {
    const o = Y(), i = ((t = o == null ? void 0 : o.canvas) == null ? void 0 : t.selected_nodes) ?? ((e = o == null ? void 0 : o.canvas) == null ? void 0 : e.selectedNodes) ?? null;
    if (!i) return [];
    if (Array.isArray(i)) return i.filter(Boolean);
    if (i instanceof Map) return Array.from(i.values()).filter(Boolean);
    if (typeof i == "object") return Object.values(i).filter(Boolean);
  } catch (o) {
    (n = console.debug) == null || n.call(console, "[MFV sidebar] _getSelectedNodes error", o);
  }
  return [];
}
const x = Object.freeze({ IDLE: "idle", RUNNING: "running", ERROR: "error" }), ue = /* @__PURE__ */ new Set(["default", "auto", "latent2rgb", "taesd", "none"]);
function pe() {
  const t = document.createElement("div");
  t.className = "mjr-mfv-run-controls";
  const e = document.createElement("button");
  e.type = "button", e.className = "mjr-icon-btn mjr-mfv-run-btn";
  const n = N("tooltip.queuePrompt", "Queue Prompt (Run)");
  e.title = n, e.setAttribute("aria-label", n);
  const o = document.createElement("i");
  o.className = "pi pi-play", o.setAttribute("aria-hidden", "true"), e.appendChild(o);
  const i = document.createElement("button");
  i.type = "button", i.className = "mjr-icon-btn mjr-mfv-stop-btn";
  const s = document.createElement("i");
  s.className = "pi pi-stop", s.setAttribute("aria-hidden", "true"), i.appendChild(s), t.appendChild(e), t.appendChild(i);
  let l = x.IDLE;
  function d(h) {
    l = h, e.classList.toggle("running", l === x.RUNNING), e.classList.toggle("error", l === x.ERROR), e.disabled = l === x.RUNNING, l === x.RUNNING ? o.className = "pi pi-spin pi-spinner" : o.className = "pi pi-play";
  }
  function u() {
    const h = N("tooltip.queueStop", "Stop Generation");
    i.title = h, i.setAttribute("aria-label", h);
  }
  async function r() {
    const h = Y(), m = _t(h);
    if (m && typeof m.interrupt == "function") {
      await m.interrupt();
      return;
    }
    const f = await fetch("/interrupt", { method: "POST" });
    if (!f.ok) throw new Error(`POST /interrupt failed (${f.status})`);
  }
  async function a() {
    var h;
    if (l !== x.RUNNING) {
      d(x.RUNNING);
      try {
        await _e(), d(x.IDLE);
      } catch (m) {
        (h = console.error) == null || h.call(console, "[MFV Run]", m), d(x.ERROR), setTimeout(() => {
          l === x.ERROR && d(x.IDLE);
        }, 1500);
      }
    }
  }
  async function c() {
    var h;
    if (l !== x.RUNNING) {
      i.disabled = !0;
      try {
        await r();
      } catch (m) {
        (h = console.error) == null || h.call(console, "[MFV Stop]", m);
      } finally {
        i.disabled = !1;
      }
    }
  }
  return u(), e.addEventListener("click", a), i.addEventListener("click", c), {
    el: t,
    dispose() {
      e.removeEventListener("click", a), i.removeEventListener("click", c);
    }
  };
}
function me(t = K.MFV_PREVIEW_METHOD) {
  const e = String(t || "").trim().toLowerCase();
  return ue.has(e) ? e : "taesd";
}
function Et(t, e = K.MFV_PREVIEW_METHOD) {
  var i;
  const n = me(e), o = {
    ...(t == null ? void 0 : t.extra_data) || {},
    extra_pnginfo: {
      ...((i = t == null ? void 0 : t.extra_data) == null ? void 0 : i.extra_pnginfo) || {}
    }
  };
  return (t == null ? void 0 : t.workflow) != null && (o.extra_pnginfo.workflow = t.workflow), n !== "default" ? o.preview_method = n : delete o.preview_method, {
    ...t,
    extra_data: o
  };
}
function he(t, { previewMethod: e = K.MFV_PREVIEW_METHOD, clientId: n = null } = {}) {
  const o = Et(t, e), i = {
    prompt: o == null ? void 0 : o.output,
    extra_data: (o == null ? void 0 : o.extra_data) || {}
  }, s = String(n || "").trim();
  return s && (i.client_id = s), i;
}
function fe(t, e) {
  const n = [
    t == null ? void 0 : t.clientId,
    t == null ? void 0 : t.clientID,
    t == null ? void 0 : t.client_id,
    e == null ? void 0 : e.clientId,
    e == null ? void 0 : e.clientID,
    e == null ? void 0 : e.client_id
  ];
  for (const o of n) {
    const i = String(o || "").trim();
    if (i) return i;
  }
  return "";
}
async function _e() {
  const t = Y();
  if (!t) throw new Error("ComfyUI app not available");
  const e = typeof t.graphToPrompt == "function" ? await t.graphToPrompt() : null;
  if (!(e != null && e.output)) throw new Error("graphToPrompt returned empty output");
  const n = _t(t);
  if (n && typeof n.queuePrompt == "function") {
    await n.queuePrompt(0, Et(e));
    return;
  }
  const o = await fetch("/prompt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(
      he(e, {
        clientId: fe(n, t)
      })
    )
  });
  if (!o.ok) throw new Error(`POST /prompt failed (${o.status})`);
}
function ge(t) {
  const e = document.createElement("div");
  return e.className = "mjr-mfv", e.setAttribute("role", "dialog"), e.setAttribute("aria-modal", "false"), e.setAttribute("aria-hidden", "true"), t.element = e, e.appendChild(t._buildHeader()), e.setAttribute("aria-labelledby", t._titleId), e.appendChild(t._buildToolbar()), e.appendChild(jt(t)), t._contentWrapper = document.createElement("div"), t._contentWrapper.className = "mjr-mfv-content-wrapper", t._applySidebarPosition(), t._contentEl = document.createElement("div"), t._contentEl.className = "mjr-mfv-content", t._contentWrapper.appendChild(t._contentEl), t._contentEl.appendChild(Tt(t)), t._sidebar = new de({
    hostEl: e,
    onClose: () => t._updateSettingsBtnState(!1)
  }), t._contentWrapper.appendChild(t._sidebar.el), e.appendChild(t._contentWrapper), t._rebindControlHandlers(), t._bindPanelInteractions(), t._bindDocumentUiHandlers(), t._onSidebarPosChanged = (n) => {
    var o;
    ((o = n == null ? void 0 : n.detail) == null ? void 0 : o.key) === "viewer.mfvSidebarPosition" && t._applySidebarPosition();
  }, window.addEventListener("mjr-settings-changed", t._onSidebarPosChanged), t._refresh(), e;
}
function be(t) {
  const e = document.createElement("div");
  e.className = "mjr-mfv-header";
  const n = document.createElement("span");
  n.className = "mjr-mfv-header-title", n.id = t._titleId, n.textContent = "Majoor Viewer Lite";
  const o = document.createElement("button");
  t._closeBtn = o, o.type = "button", o.className = "mjr-icon-btn mjr-mfv-close-btn", w(o, N("tooltip.closeViewer", "Close viewer"), zt);
  const i = document.createElement("i");
  return i.className = "pi pi-times", i.setAttribute("aria-hidden", "true"), o.appendChild(i), e.appendChild(n), e.appendChild(o), e;
}
function ye(t) {
  var c, h;
  const e = document.createElement("div");
  e.className = "mjr-mfv-toolbar", t._modeBtn = document.createElement("button"), t._modeBtn.type = "button", t._modeBtn.className = "mjr-icon-btn", t._updateModeBtnUI(), e.appendChild(t._modeBtn), t._pinGroup = document.createElement("div"), t._pinGroup.className = "mjr-mfv-pin-group", t._pinGroup.setAttribute("role", "group"), t._pinGroup.setAttribute("aria-label", "Pin References"), t._pinBtns = {};
  for (const m of ["A", "B", "C", "D"]) {
    const f = document.createElement("button");
    f.type = "button", f.className = "mjr-mfv-pin-btn", f.textContent = m, f.dataset.slot = m, f.title = `Pin ${m}`, f.setAttribute("aria-pressed", "false"), t._pinBtns[m] = f, t._pinGroup.appendChild(f);
  }
  t._updatePinUI(), e.appendChild(t._pinGroup);
  const n = document.createElement("div");
  n.className = "mjr-mfv-toolbar-sep", n.setAttribute("aria-hidden", "true"), e.appendChild(n), t._liveBtn = document.createElement("button"), t._liveBtn.type = "button", t._liveBtn.className = "mjr-icon-btn", t._liveBtn.innerHTML = '<i class="pi pi-circle" aria-hidden="true"></i>', t._liveBtn.setAttribute("aria-pressed", "false"), w(
    t._liveBtn,
    N("tooltip.liveStreamOff", "Live Stream: OFF — click to follow"),
    gt
  ), e.appendChild(t._liveBtn), t._previewBtn = document.createElement("button"), t._previewBtn.type = "button", t._previewBtn.className = "mjr-icon-btn", t._previewBtn.innerHTML = '<i class="pi pi-eye" aria-hidden="true"></i>', t._previewBtn.setAttribute("aria-pressed", "false"), w(
    t._previewBtn,
    N(
      "tooltip.previewStreamOff",
      "KSampler Preview: OFF — click to stream denoising steps"
    ),
    bt
  ), e.appendChild(t._previewBtn), t._nodeStreamBtn = document.createElement("button"), t._nodeStreamBtn.type = "button", t._nodeStreamBtn.className = "mjr-icon-btn", t._nodeStreamBtn.innerHTML = '<i class="pi pi-sitemap" aria-hidden="true"></i>', t._nodeStreamBtn.setAttribute("aria-pressed", "false"), w(
    t._nodeStreamBtn,
    N("tooltip.nodeStreamOff", "Node Stream: OFF — click to stream selected node output"),
    Ut
  ), e.appendChild(t._nodeStreamBtn), (h = (c = t._nodeStreamBtn).remove) == null || h.call(c), t._nodeStreamBtn = null, t._genBtn = document.createElement("button"), t._genBtn.type = "button", t._genBtn.className = "mjr-icon-btn", t._genBtn.setAttribute("aria-haspopup", "dialog"), t._genBtn.setAttribute("aria-expanded", "false");
  const o = document.createElement("i");
  o.className = "pi pi-info-circle", o.setAttribute("aria-hidden", "true"), t._genBtn.appendChild(o), e.appendChild(t._genBtn), t._updateGenBtnUI(), t._popoutBtn = document.createElement("button"), t._popoutBtn.type = "button", t._popoutBtn.className = "mjr-icon-btn";
  const i = N("tooltip.popOutViewer", "Pop out viewer to separate window");
  t._popoutBtn.title = i, t._popoutBtn.setAttribute("aria-label", i), t._popoutBtn.setAttribute("aria-pressed", "false");
  const s = document.createElement("i");
  s.className = "pi pi-external-link", s.setAttribute("aria-hidden", "true"), t._popoutBtn.appendChild(s), e.appendChild(t._popoutBtn), t._captureBtn = document.createElement("button"), t._captureBtn.type = "button", t._captureBtn.className = "mjr-icon-btn";
  const l = N("tooltip.captureView", "Save view as image");
  t._captureBtn.title = l, t._captureBtn.setAttribute("aria-label", l);
  const d = document.createElement("i");
  d.className = "pi pi-download", d.setAttribute("aria-hidden", "true"), t._captureBtn.appendChild(d), e.appendChild(t._captureBtn);
  const u = document.createElement("div");
  u.className = "mjr-mfv-toolbar-sep", u.style.marginLeft = "auto", u.setAttribute("aria-hidden", "true"), e.appendChild(u), t._settingsBtn = document.createElement("button"), t._settingsBtn.type = "button", t._settingsBtn.className = "mjr-icon-btn mjr-mfv-settings-btn";
  const r = N("tooltip.nodeParams", "Node Parameters");
  t._settingsBtn.title = r, t._settingsBtn.setAttribute("aria-label", r), t._settingsBtn.setAttribute("aria-pressed", "false");
  const a = document.createElement("i");
  return a.className = "pi pi-sliders-h", a.setAttribute("aria-hidden", "true"), t._settingsBtn.appendChild(a), e.appendChild(t._settingsBtn), t._runHandle = pe(), e.appendChild(t._runHandle.el), t._handleDocClick = (m) => {
    var p, _;
    if (!t._genDropdown) return;
    const f = m == null ? void 0 : m.target;
    (_ = (p = t._genBtn) == null ? void 0 : p.contains) != null && _.call(p, f) || t._genDropdown.contains(f) || t._closeGenDropdown();
  }, t._bindDocumentUiHandlers(), e;
}
function Ce(t) {
  var n, o, i, s, l, d, u, r, a, c, h, m;
  try {
    (n = t._btnAC) == null || n.abort();
  } catch (f) {
    (o = console.debug) == null || o.call(console, f);
  }
  t._btnAC = new AbortController();
  const e = t._btnAC.signal;
  (i = t._closeBtn) == null || i.addEventListener(
    "click",
    () => {
      t._dispatchControllerAction("close", $.MFV_CLOSE);
    },
    { signal: e }
  ), (s = t._modeBtn) == null || s.addEventListener("click", () => t._cycleMode(), { signal: e }), (l = t._pinGroup) == null || l.addEventListener(
    "click",
    (f) => {
      var g, b;
      const p = (b = (g = f.target) == null ? void 0 : g.closest) == null ? void 0 : b.call(g, ".mjr-mfv-pin-btn");
      if (!p) return;
      const _ = p.dataset.slot;
      _ && (t._pinnedSlots.has(_) ? t._pinnedSlots.delete(_) : t._pinnedSlots.add(_), t._pinnedSlots.has("C") || t._pinnedSlots.has("D") ? t._mode !== C.GRID && t.setMode(C.GRID) : t._pinnedSlots.size > 0 && t._mode === C.SIMPLE && t.setMode(C.AB), t._updatePinUI());
    },
    { signal: e }
  ), (d = t._liveBtn) == null || d.addEventListener(
    "click",
    () => {
      t._dispatchControllerAction("toggleLive", $.MFV_LIVE_TOGGLE);
    },
    { signal: e }
  ), (u = t._previewBtn) == null || u.addEventListener(
    "click",
    () => {
      t._dispatchControllerAction("togglePreview", $.MFV_PREVIEW_TOGGLE);
    },
    { signal: e }
  ), (r = t._nodeStreamBtn) == null || r.addEventListener(
    "click",
    () => {
      t._dispatchControllerAction("toggleNodeStream", $.MFV_NODESTREAM_TOGGLE);
    },
    { signal: e }
  ), (a = t._genBtn) == null || a.addEventListener(
    "click",
    (f) => {
      var p, _;
      f.stopPropagation(), (_ = (p = t._genDropdown) == null ? void 0 : p.classList) != null && _.contains("is-visible") ? t._closeGenDropdown() : t._openGenDropdown();
    },
    { signal: e }
  ), (c = t._popoutBtn) == null || c.addEventListener(
    "click",
    () => {
      t._dispatchControllerAction("popOut", $.MFV_POPOUT);
    },
    { signal: e }
  ), (h = t._captureBtn) == null || h.addEventListener("click", () => t._captureView(), { signal: e }), (m = t._settingsBtn) == null || m.addEventListener(
    "click",
    () => {
      var f, p;
      (f = t._sidebar) == null || f.toggle(), t._updateSettingsBtnState(((p = t._sidebar) == null ? void 0 : p.isVisible) ?? !1);
    },
    { signal: e }
  );
}
function Se(t, e) {
  t._settingsBtn && (t._settingsBtn.classList.toggle("active", !!e), t._settingsBtn.setAttribute("aria-pressed", String(!!e)));
}
function Ae(t) {
  var n;
  if (!t._contentWrapper) return;
  const e = K.MFV_SIDEBAR_POSITION || "right";
  t._contentWrapper.setAttribute("data-sidebar-pos", e), (n = t._sidebar) != null && n.el && t._contentEl && (e === "left" ? t._contentWrapper.insertBefore(t._sidebar.el, t._contentEl) : t._contentWrapper.appendChild(t._sidebar.el));
}
function Ee(t) {
  var e, n, o;
  t._closeGenDropdown();
  try {
    (n = (e = t._genDropdown) == null ? void 0 : e.remove) == null || n.call(e);
  } catch (i) {
    (o = console.debug) == null || o.call(console, i);
  }
  t._genDropdown = null, t._updateGenBtnUI();
}
function Be(t) {
  var n, o, i;
  if (!t._handleDocClick) return;
  const e = ((n = t.element) == null ? void 0 : n.ownerDocument) || document;
  if (t._docClickHost !== e) {
    t._unbindDocumentUiHandlers();
    try {
      (o = t._docAC) == null || o.abort();
    } catch (s) {
      (i = console.debug) == null || i.call(console, s);
    }
    t._docAC = new AbortController(), e.addEventListener("click", t._handleDocClick, { signal: t._docAC.signal }), t._docClickHost = e;
  }
}
function Me(t) {
  var e, n;
  try {
    (e = t._docAC) == null || e.abort();
  } catch (o) {
    (n = console.debug) == null || n.call(console, o);
  }
  t._docAC = new AbortController(), t._docClickHost = null;
}
function Pe(t) {
  var e, n;
  return !!((n = (e = t._genDropdown) == null ? void 0 : e.classList) != null && n.contains("is-visible"));
}
function Ne(t) {
  if (!t.element) return;
  t._genDropdown || (t._genDropdown = t._buildGenDropdown(), t.element.appendChild(t._genDropdown)), t._bindDocumentUiHandlers();
  const e = t._genBtn.getBoundingClientRect(), n = t.element.getBoundingClientRect(), o = e.left - n.left, i = e.bottom - n.top + 6;
  t._genDropdown.style.left = `${o}px`, t._genDropdown.style.top = `${i}px`, t._genDropdown.classList.add("is-visible"), t._updateGenBtnUI();
}
function Ie(t) {
  t._genDropdown && (t._genDropdown.classList.remove("is-visible"), t._updateGenBtnUI());
}
function Fe(t) {
  if (!t._genBtn) return;
  const e = t._genInfoSelections.size, n = e > 0, o = t._isGenDropdownOpen();
  t._genBtn.classList.toggle("is-on", n), t._genBtn.classList.toggle("is-open", o);
  const i = n ? `Gen Info (${e} field${e > 1 ? "s" : ""} shown)${o ? " — open" : " — click to configure"}` : `Gen Info${o ? " — open" : " — click to show overlay"}`;
  t._genBtn.title = i, t._genBtn.setAttribute("aria-label", i), t._genBtn.setAttribute("aria-expanded", String(o)), t._genDropdown ? t._genBtn.setAttribute("aria-controls", t._genDropdownId) : t._genBtn.removeAttribute("aria-controls");
}
function Le(t) {
  const e = document.createElement("div");
  e.className = "mjr-mfv-gen-dropdown", e.id = t._genDropdownId, e.setAttribute("role", "group"), e.setAttribute("aria-label", "Generation info fields");
  const n = [
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
  for (const [o, i] of n) {
    const s = document.createElement("label");
    s.className = "mjr-mfv-gen-dropdown-row";
    const l = document.createElement("input");
    l.type = "checkbox", l.checked = t._genInfoSelections.has(o), l.addEventListener("change", () => {
      l.checked ? t._genInfoSelections.add(o) : t._genInfoSelections.delete(o), t._updateGenBtnUI(), t._refresh();
    });
    const d = document.createElement("span");
    d.textContent = i, s.appendChild(l), s.appendChild(d), e.appendChild(s);
  }
  return e;
}
function ft(t) {
  const e = Number(t);
  return !Number.isFinite(e) || e <= 0 ? "" : e >= 60 ? `${(e / 60).toFixed(1)}m` : `${e.toFixed(1)}s`;
}
function xe(t) {
  const e = String(t || "").trim().toLowerCase();
  if (!e) return 0;
  if (e.endsWith("m")) {
    const o = Number.parseFloat(e.slice(0, -1));
    return Number.isFinite(o) ? o * 60 : 0;
  }
  if (e.endsWith("s")) {
    const o = Number.parseFloat(e.slice(0, -1));
    return Number.isFinite(o) ? o : 0;
  }
  const n = Number.parseFloat(e);
  return Number.isFinite(n) ? n : 0;
}
function ke(t, e) {
  var s, l, d, u;
  if (!e) return {};
  try {
    const r = e.geninfo ? { geninfo: e.geninfo } : e.metadata || e.metadata_raw || e, a = Vt(r) || null, c = {
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
    if (a && typeof a == "object") {
      a.prompt && (c.prompt = et(String(a.prompt))), a.seed != null && (c.seed = String(a.seed)), a.model && (c.model = Array.isArray(a.model) ? a.model.join(", ") : String(a.model)), Array.isArray(a.loras) && (c.lora = a.loras.map(
        (m) => typeof m == "string" ? m : (m == null ? void 0 : m.name) || (m == null ? void 0 : m.lora_name) || (m == null ? void 0 : m.model_name) || ""
      ).filter(Boolean).join(", ")), a.sampler && (c.sampler = String(a.sampler)), a.scheduler && (c.scheduler = String(a.scheduler)), a.cfg != null && (c.cfg = String(a.cfg)), a.steps != null && (c.step = String(a.steps)), !c.prompt && (r != null && r.prompt) && (c.prompt = et(String(r.prompt || "")));
      const h = e.generation_time_ms ?? ((s = e.metadata_raw) == null ? void 0 : s.generation_time_ms) ?? (r == null ? void 0 : r.generation_time_ms) ?? ((l = r == null ? void 0 : r.geninfo) == null ? void 0 : l.generation_time_ms) ?? 0;
      return h && Number.isFinite(Number(h)) && h > 0 && h < 864e5 && (c.genTime = ft(Number(h) / 1e3)), c;
    }
  } catch (r) {
    (d = console.debug) == null || d.call(console, "[MFV] geninfo normalize failed", r);
  }
  const n = (e == null ? void 0 : e.metadata) || (e == null ? void 0 : e.metadata_raw) || e || {}, o = {
    prompt: et(String((n == null ? void 0 : n.prompt) || (n == null ? void 0 : n.positive) || "")),
    seed: (n == null ? void 0 : n.seed) != null ? String(n.seed) : "",
    model: (n == null ? void 0 : n.checkpoint) || (n == null ? void 0 : n.ckpt_name) || (n == null ? void 0 : n.model) || "",
    lora: Array.isArray(n == null ? void 0 : n.loras) ? n.loras.join(", ") : (n == null ? void 0 : n.lora) || "",
    sampler: (n == null ? void 0 : n.sampler_name) || (n == null ? void 0 : n.sampler) || "",
    scheduler: (n == null ? void 0 : n.scheduler) || "",
    cfg: (n == null ? void 0 : n.cfg) != null ? String(n.cfg) : (n == null ? void 0 : n.cfg_scale) != null ? String(n.cfg_scale) : "",
    step: (n == null ? void 0 : n.steps) != null ? String(n.steps) : "",
    genTime: ""
  }, i = e.generation_time_ms ?? ((u = e.metadata_raw) == null ? void 0 : u.generation_time_ms) ?? (n == null ? void 0 : n.generation_time_ms) ?? 0;
  return i && Number.isFinite(Number(i)) && i > 0 && i < 864e5 && (o.genTime = ft(Number(i) / 1e3)), o;
}
function je(t, e) {
  const n = t._getGenFields(e);
  if (!n) return null;
  const o = document.createDocumentFragment(), i = [
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
  for (const s of i) {
    if (!t._genInfoSelections.has(s)) continue;
    const l = n[s] != null ? String(n[s]) : "";
    if (!l) continue;
    let d = s.charAt(0).toUpperCase() + s.slice(1);
    s === "lora" ? d = "LoRA" : s === "cfg" ? d = "CFG" : s === "genTime" && (d = "Gen Time");
    const u = document.createElement("div");
    u.dataset.field = s;
    const r = document.createElement("strong");
    if (r.textContent = `${d}: `, u.appendChild(r), s === "prompt")
      u.appendChild(document.createTextNode(l));
    else if (s === "genTime") {
      const a = xe(l);
      let c = "#4CAF50";
      a >= 60 ? c = "#FF9800" : a >= 30 ? c = "#FFC107" : a >= 10 && (c = "#8BC34A");
      const h = document.createElement("span");
      h.style.color = c, h.style.fontWeight = "600", h.textContent = l, u.appendChild(h);
    } else
      u.appendChild(document.createTextNode(l));
    o.appendChild(u);
  }
  return o.childNodes.length > 0 ? o : null;
}
function Te(t) {
  var e, n, o;
  try {
    (n = (e = t._controller) == null ? void 0 : e.onModeChanged) == null || n.call(e, t._mode);
  } catch (i) {
    (o = console.debug) == null || o.call(console, i);
  }
}
function Ve(t) {
  const e = [C.SIMPLE, C.AB, C.SIDE, C.GRID];
  t._mode = e[(e.indexOf(t._mode) + 1) % e.length], t._updateModeBtnUI(), t._refresh(), t._notifyModeChanged();
}
function Ge(t, e) {
  Object.values(C).includes(e) && (t._mode = e, t._updateModeBtnUI(), t._refresh(), t._notifyModeChanged());
}
function Re(t) {
  return t._pinnedSlots;
}
function He(t) {
  if (t._pinBtns)
    for (const e of ["A", "B", "C", "D"]) {
      const n = t._pinBtns[e];
      if (!n) continue;
      const o = t._pinnedSlots.has(e);
      n.classList.toggle("is-pinned", o), n.setAttribute("aria-pressed", String(o)), n.title = o ? `Unpin ${e}` : `Pin ${e}`;
    }
}
function Oe(t) {
  if (!t._modeBtn) return;
  const e = {
    [C.SIMPLE]: { icon: "pi-image", label: "Mode: Simple - click to switch" },
    [C.AB]: { icon: "pi-clone", label: "Mode: A/B Compare - click to switch" },
    [C.SIDE]: { icon: "pi-table", label: "Mode: Side-by-Side - click to switch" },
    [C.GRID]: {
      icon: "pi-th-large",
      label: "Mode: Grid Compare (up to 4) - click to switch"
    }
  }, { icon: n = "pi-image", label: o = "" } = e[t._mode] || {}, i = at(o, Dt), s = document.createElement("i");
  s.className = `pi ${n}`, s.setAttribute("aria-hidden", "true"), t._modeBtn.replaceChildren(s), t._modeBtn.title = i, t._modeBtn.setAttribute("aria-label", i), t._modeBtn.removeAttribute("aria-pressed");
}
function De(t, e) {
  if (!t._liveBtn) return;
  const n = !!e;
  t._liveBtn.classList.toggle("mjr-live-active", n);
  const o = n ? N("tooltip.liveStreamOn", "Live Stream: ON — click to disable") : N("tooltip.liveStreamOff", "Live Stream: OFF — click to follow"), i = at(o, gt);
  t._liveBtn.setAttribute("aria-pressed", String(n)), t._liveBtn.setAttribute("aria-label", i);
  const s = document.createElement("i");
  s.className = n ? "pi pi-circle-fill" : "pi pi-circle", s.setAttribute("aria-hidden", "true"), t._liveBtn.replaceChildren(s), t._liveBtn.title = i;
}
function Ue(t, e) {
  if (t._previewActive = !!e, !t._previewBtn) return;
  t._previewBtn.classList.toggle("mjr-preview-active", t._previewActive);
  const n = t._previewActive ? N("tooltip.previewStreamOn", "KSampler Preview: ON — streaming denoising steps") : N(
    "tooltip.previewStreamOff",
    "KSampler Preview: OFF — click to stream denoising steps"
  ), o = at(n, bt);
  t._previewBtn.setAttribute("aria-pressed", String(t._previewActive)), t._previewBtn.setAttribute("aria-label", o);
  const i = document.createElement("i");
  i.className = t._previewActive ? "pi pi-eye" : "pi pi-eye-slash", i.setAttribute("aria-hidden", "true"), t._previewBtn.replaceChildren(i), t._previewBtn.title = o, t._previewActive || t._revokePreviewBlob();
}
function ze(t, e, n = {}) {
  if (!e || !(e instanceof Blob)) return;
  t._revokePreviewBlob();
  const o = URL.createObjectURL(e);
  t._previewBlobUrl = o;
  const i = {
    url: o,
    filename: "preview.jpg",
    kind: "image",
    _isPreview: !0,
    _sourceLabel: (n == null ? void 0 : n.sourceLabel) || null
  };
  if (t._mode === C.AB || t._mode === C.SIDE || t._mode === C.GRID) {
    const l = t.getPinnedSlots();
    if (t._mode === C.GRID) {
      const d = ["A", "B", "C", "D"].find((u) => !l.has(u)) || "A";
      t[`_media${d}`] = i;
    } else l.has("B") ? t._mediaA = i : t._mediaB = i;
  } else
    t._mediaA = i, t._resetMfvZoom(), t._mode !== C.SIMPLE && (t._mode = C.SIMPLE, t._updateModeBtnUI());
  ++t._refreshGen, t._refresh();
}
function $e(t) {
  if (t._previewBlobUrl) {
    try {
      URL.revokeObjectURL(t._previewBlobUrl);
    } catch {
    }
    t._previewBlobUrl = null;
  }
}
function We(t, e) {
  {
    t._nodeStreamActive = !1;
    return;
  }
}
function Xe() {
  var t, e, n, o, i;
  try {
    const s = typeof window < "u" ? window : globalThis, l = (e = (t = s == null ? void 0 : s.process) == null ? void 0 : t.versions) == null ? void 0 : e.electron;
    if (typeof l == "string" && l.trim() || s != null && s.electron || s != null && s.ipcRenderer || s != null && s.electronAPI)
      return !0;
    const d = String(((n = s == null ? void 0 : s.navigator) == null ? void 0 : n.userAgent) || ((o = globalThis == null ? void 0 : globalThis.navigator) == null ? void 0 : o.userAgent) || ""), u = /\bElectron\//i.test(d), r = /\bCode\//i.test(d);
    if (u && !r)
      return !0;
  } catch (s) {
    (i = console.debug) == null || i.call(console, s);
  }
  return !1;
}
function P(t, e = null, n = "info") {
  var i, s;
  const o = {
    stage: String(t || "unknown"),
    detail: e,
    ts: Date.now()
  };
  try {
    const l = typeof window < "u" ? window : globalThis, d = "__MJR_MFV_POPOUT_TRACE__", u = Array.isArray(l[d]) ? l[d] : [];
    u.push(o), l[d] = u.slice(-20), l.__MJR_MFV_POPOUT_LAST__ = o;
  } catch (l) {
    (i = console.debug) == null || i.call(console, l);
  }
  try {
    const l = n === "error" ? console.error : n === "warn" ? console.warn : console.info;
    l == null || l("[MFV popout]", o);
  } catch (l) {
    (s = console.debug) == null || s.call(console, l);
  }
}
function qe(t, e) {
  if (!t.element) return;
  const n = !!e;
  if (t._desktopExpanded === n) return;
  const o = t.element;
  if (n) {
    t._desktopExpandRestore = {
      parent: o.parentNode || null,
      nextSibling: o.nextSibling || null,
      styleAttr: o.getAttribute("style")
    }, o.parentNode !== document.body && document.body.appendChild(o), o.classList.add("mjr-mfv--desktop-expanded", "is-visible"), o.setAttribute("aria-hidden", "false"), o.style.position = "fixed", o.style.top = "12px", o.style.left = "12px", o.style.right = "12px", o.style.bottom = "12px", o.style.width = "auto", o.style.height = "auto", o.style.maxWidth = "none", o.style.maxHeight = "none", o.style.minWidth = "320px", o.style.minHeight = "240px", o.style.resize = "none", o.style.margin = "0", o.style.zIndex = "2147483000", t._desktopExpanded = !0, t.isVisible = !0, t._resetGenDropdownForCurrentDocument(), t._rebindControlHandlers(), t._bindPanelInteractions(), t._bindDocumentUiHandlers(), t._updatePopoutBtnUI(), P("electron-in-app-expanded", { isVisible: t.isVisible });
    return;
  }
  const i = t._desktopExpandRestore;
  t._desktopExpanded = !1, o.classList.remove("mjr-mfv--desktop-expanded"), (i == null ? void 0 : i.styleAttr) == null || i.styleAttr === "" ? o.removeAttribute("style") : o.setAttribute("style", i.styleAttr), i != null && i.parent && i.parent.isConnected && (i.nextSibling && i.nextSibling.parentNode === i.parent ? i.parent.insertBefore(o, i.nextSibling) : i.parent.appendChild(o)), t._desktopExpandRestore = null, t._resetGenDropdownForCurrentDocument(), t._rebindControlHandlers(), t._bindPanelInteractions(), t._bindDocumentUiHandlers(), t._updatePopoutBtnUI(), P("electron-in-app-restored", null);
}
function Ke(t, e) {
  var n;
  t._desktopPopoutUnsupported = !0, P(
    "electron-in-app-fallback",
    { message: (e == null ? void 0 : e.message) || String(e || "unknown error") },
    "warn"
  ), t._setDesktopExpanded(!0);
  try {
    Gt(
      N(
        "toast.popoutElectronInAppFallback",
        "Desktop PiP is unavailable here. Viewer expanded inside the app instead."
      ),
      "warning",
      4500
    );
  } catch (o) {
    (n = console.debug) == null || n.call(console, o);
  }
}
function Ye(t, e, n, o, i) {
  return P(
    "electron-popup-fallback-attempt",
    { reason: (i == null ? void 0 : i.message) || String(i || "unknown") },
    "warn"
  ), t._fallbackPopout(e, n, o), t._popoutWindow ? (t._desktopPopoutUnsupported = !1, P("electron-popup-fallback-opened", null), !0) : !1;
}
function Ze(t) {
  var d, u;
  if (t._isPopped || !t.element) return;
  const e = t.element;
  t._stopEdgeResize();
  const n = Xe(), o = typeof window < "u" && "documentPictureInPicture" in window, i = String(((d = window == null ? void 0 : window.navigator) == null ? void 0 : d.userAgent) || ((u = globalThis == null ? void 0 : globalThis.navigator) == null ? void 0 : u.userAgent) || ""), s = Math.max(e.offsetWidth || 520, 400), l = Math.max(e.offsetHeight || 420, 300);
  if (P("start", {
    isElectronHost: n,
    hasDocumentPiP: o,
    userAgent: i,
    width: s,
    height: l,
    desktopPopoutUnsupported: t._desktopPopoutUnsupported
  }), n && t._desktopPopoutUnsupported) {
    P("electron-in-app-fallback-reuse", null), t._setDesktopExpanded(!0);
    return;
  }
  if (!(n && (P("electron-popup-request", { width: s, height: l }), t._tryElectronPopupFallback(e, s, l, new Error("Desktop popup requested"))))) {
    if (n && "documentPictureInPicture" in window) {
      P("electron-pip-request", { width: s, height: l }), window.documentPictureInPicture.requestWindow({ width: s, height: l }).then((r) => {
        var f, p, _;
        P("electron-pip-opened", {
          hasDocument: !!(r != null && r.document)
        }), t._popoutWindow = r, t._isPopped = !0, t._popoutRestoreGuard = !1;
        try {
          (f = t._popoutAC) == null || f.abort();
        } catch (g) {
          (p = console.debug) == null || p.call(console, g);
        }
        t._popoutAC = new AbortController();
        const a = t._popoutAC.signal, c = () => t._schedulePopInFromPopupClose();
        t._popoutCloseHandler = c;
        const h = r.document;
        h.title = "Majoor Viewer", t._installPopoutStyles(h), h.body.style.cssText = "margin:0;display:flex;min-height:100vh;background:#0d0d0d;overflow:hidden;";
        const m = h.createElement("div");
        m.id = "mjr-mfv-popout-root", m.style.cssText = "flex:1;min-width:0;min-height:0;display:flex;", h.body.appendChild(m);
        try {
          const g = typeof h.adoptNode == "function" ? h.adoptNode(e) : e;
          m.appendChild(g), P("electron-pip-adopted", {
            usedAdoptNode: typeof h.adoptNode == "function"
          });
        } catch (g) {
          P(
            "electron-pip-adopt-failed",
            { message: (g == null ? void 0 : g.message) || String(g) },
            "warn"
          ), console.warn("[MFV] PiP adoptNode failed", g), t._isPopped = !1, t._popoutWindow = null;
          try {
            r.close();
          } catch (b) {
            (_ = console.debug) == null || _.call(console, b);
          }
          t._activateDesktopExpandedFallback(g);
          return;
        }
        e.classList.add("is-visible"), t.isVisible = !0, t._resetGenDropdownForCurrentDocument(), t._rebindControlHandlers(), t._bindDocumentUiHandlers(), t._updatePopoutBtnUI(), P("electron-pip-ready", { isPopped: t._isPopped }), r.addEventListener("pagehide", c, {
          signal: a
        }), t._startPopoutCloseWatch(), t._popoutKeydownHandler = (g) => {
          var y, A;
          const b = String(((y = g == null ? void 0 : g.target) == null ? void 0 : y.tagName) || "").toLowerCase();
          g != null && g.defaultPrevented || (A = g == null ? void 0 : g.target) != null && A.isContentEditable || b === "input" || b === "textarea" || b === "select" || t._forwardKeydownToController(g);
        }, r.addEventListener("keydown", t._popoutKeydownHandler, {
          signal: a
        });
      }).catch((r) => {
        P(
          "electron-pip-request-failed",
          { message: (r == null ? void 0 : r.message) || String(r) },
          "warn"
        ), t._activateDesktopExpandedFallback(r);
      });
      return;
    }
    if (n) {
      P("electron-no-pip-api", { hasDocumentPiP: o }), t._activateDesktopExpandedFallback(
        new Error("Document Picture-in-Picture unavailable after popup failure")
      );
      return;
    }
    P("browser-fallback-popup", { width: s, height: l }), t._fallbackPopout(e, s, l);
  }
}
function ve(t, e, n, o) {
  var c, h, m, f;
  P("browser-popup-open", { width: n, height: o });
  const i = (window.screenX || window.screenLeft) + Math.round((window.outerWidth - n) / 2), s = (window.screenY || window.screenTop) + Math.round((window.outerHeight - o) / 2), l = `width=${n},height=${o},left=${i},top=${s},resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,status=no`, d = window.open("about:blank", "_mjr_viewer", l);
  if (!d) {
    P("browser-popup-blocked", null, "warn"), console.warn("[MFV] Pop-out blocked — allow popups for this site.");
    return;
  }
  P("browser-popup-opened", { hasDocument: !!(d != null && d.document) }), t._popoutWindow = d, t._isPopped = !0, t._popoutRestoreGuard = !1;
  try {
    (c = t._popoutAC) == null || c.abort();
  } catch (p) {
    (h = console.debug) == null || h.call(console, p);
  }
  t._popoutAC = new AbortController();
  const u = t._popoutAC.signal, r = () => t._schedulePopInFromPopupClose();
  t._popoutCloseHandler = r;
  const a = () => {
    let p;
    try {
      p = d.document;
    } catch {
      return;
    }
    if (!p) return;
    p.title = "Majoor Viewer", t._installPopoutStyles(p), p.body.style.cssText = "margin:0;display:flex;min-height:100vh;background:#0d0d0d;overflow:hidden;";
    const _ = p.createElement("div");
    _.id = "mjr-mfv-popout-root", _.style.cssText = "flex:1;min-width:0;min-height:0;display:flex;", p.body.appendChild(_);
    try {
      _.appendChild(p.adoptNode(e));
    } catch (g) {
      console.warn("[MFV] adoptNode failed", g);
      return;
    }
    e.classList.add("is-visible"), t.isVisible = !0, t._resetGenDropdownForCurrentDocument(), t._rebindControlHandlers(), t._bindDocumentUiHandlers(), t._updatePopoutBtnUI();
  };
  try {
    a();
  } catch (p) {
    (m = console.debug) == null || m.call(console, "[MFV] immediate mount failed, retrying on load", p);
    try {
      d.addEventListener("load", a, { signal: u });
    } catch (_) {
      (f = console.debug) == null || f.call(console, "[MFV] pop-out page load listener failed", _);
    }
  }
  d.addEventListener("beforeunload", r, { signal: u }), d.addEventListener("pagehide", r, { signal: u }), d.addEventListener("unload", r, { signal: u }), t._startPopoutCloseWatch(), t._popoutKeydownHandler = (p) => {
    var b, y, A, E;
    const _ = String(((b = p == null ? void 0 : p.target) == null ? void 0 : b.tagName) || "").toLowerCase();
    if (p != null && p.defaultPrevented || (y = p == null ? void 0 : p.target) != null && y.isContentEditable || _ === "input" || _ === "textarea" || _ === "select")
      return;
    if (String((p == null ? void 0 : p.key) || "").toLowerCase() === "v" && (p != null && p.ctrlKey || p != null && p.metaKey) && !(p != null && p.altKey) && !(p != null && p.shiftKey)) {
      p.preventDefault(), (A = p.stopPropagation) == null || A.call(p), (E = p.stopImmediatePropagation) == null || E.call(p), t._dispatchControllerAction("toggle", $.MFV_TOGGLE);
      return;
    }
    t._forwardKeydownToController(p);
  }, d.addEventListener("keydown", t._popoutKeydownHandler, { signal: u });
}
function we(t) {
  var e;
  if (t._popoutCloseTimer != null) {
    try {
      window.clearInterval(t._popoutCloseTimer);
    } catch (n) {
      (e = console.debug) == null || e.call(console, n);
    }
    t._popoutCloseTimer = null;
  }
}
function Je(t) {
  t._clearPopoutCloseWatch(), t._popoutCloseTimer = window.setInterval(() => {
    if (!t._isPopped) {
      t._clearPopoutCloseWatch();
      return;
    }
    const e = t._popoutWindow;
    (!e || e.closed) && (t._clearPopoutCloseWatch(), t._schedulePopInFromPopupClose());
  }, 250);
}
function Qe(t) {
  !t._isPopped || t._popoutRestoreGuard || (t._popoutRestoreGuard = !0, window.setTimeout(() => {
    try {
      t.popIn({ closePopupWindow: !1 });
    } finally {
      t._popoutRestoreGuard = !1;
    }
  }, 0));
}
function tn(t, e) {
  var o, i, s;
  if (!(e != null && e.head)) return;
  try {
    for (const l of e.head.querySelectorAll("[data-mjr-popout-cloned-style='1']"))
      l.remove();
  } catch (l) {
    (o = console.debug) == null || o.call(console, l);
  }
  try {
    const l = document.documentElement.style.cssText;
    if (l) {
      const d = e.createElement("style");
      d.setAttribute("data-mjr-popout-cloned-style", "1"), d.textContent = `:root { ${l} }`, e.head.appendChild(d);
    }
  } catch (l) {
    (i = console.debug) == null || i.call(console, l);
  }
  for (const l of document.querySelectorAll('link[rel="stylesheet"], style'))
    try {
      let d = null;
      if (l.tagName === "LINK") {
        d = e.createElement("link");
        for (const u of Array.from(l.attributes || []))
          (u == null ? void 0 : u.name) !== "href" && d.setAttribute(u.name, u.value);
        d.setAttribute("href", l.href || l.getAttribute("href") || "");
      } else
        d = e.importNode(l, !0);
      d.setAttribute("data-mjr-popout-cloned-style", "1"), e.head.appendChild(d);
    } catch (d) {
      (s = console.debug) == null || s.call(console, d);
    }
  const n = e.createElement("style");
  n.setAttribute("data-mjr-popout-cloned-style", "1"), n.textContent = `
        html, body { background: #0d0d0d !important; }
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
            display: flex !important;
            opacity: 1 !important;
            visibility: visible !important;
            pointer-events: auto !important;
            transform: none !important;
            transition: none !important;
        }
    `, e.head.appendChild(n);
}
function en(t, { closePopupWindow: e = !0 } = {}) {
  var i, s, l, d;
  if (t._desktopExpanded) {
    t._setDesktopExpanded(!1);
    return;
  }
  if (!t._isPopped || !t.element) return;
  const n = t._popoutWindow;
  t._clearPopoutCloseWatch();
  try {
    (i = t._popoutAC) == null || i.abort();
  } catch (u) {
    (s = console.debug) == null || s.call(console, u);
  }
  t._popoutAC = null, t._popoutCloseHandler = null, t._popoutKeydownHandler = null, t._isPopped = !1;
  let o = t.element;
  try {
    o = (o == null ? void 0 : o.ownerDocument) === document ? o : document.adoptNode(o);
  } catch (u) {
    (l = console.debug) == null || l.call(console, "[MFV] pop-in adopt failed", u);
  }
  if (document.body.appendChild(o), t._resetGenDropdownForCurrentDocument(), t._rebindControlHandlers(), t._bindPanelInteractions(), t._bindDocumentUiHandlers(), o.classList.add("is-visible"), o.setAttribute("aria-hidden", "false"), t.isVisible = !0, t._updatePopoutBtnUI(), e)
    try {
      n == null || n.close();
    } catch (u) {
      (d = console.debug) == null || d.call(console, u);
    }
  t._popoutWindow = null;
}
function nn(t) {
  if (!t._popoutBtn) return;
  const e = t._isPopped || t._desktopExpanded;
  t.element && t.element.classList.toggle("mjr-mfv--popped", e), t._popoutBtn.classList.toggle("mjr-popin-active", e);
  const n = t._popoutBtn.querySelector("i") || document.createElement("i"), o = e ? N("tooltip.popInViewer", "Return to floating panel") : N("tooltip.popOutViewer", "Pop out viewer to separate window");
  n.className = e ? "pi pi-sign-in" : "pi pi-external-link", t._popoutBtn.title = o, t._popoutBtn.setAttribute("aria-label", o), t._popoutBtn.setAttribute("aria-pressed", String(e)), t._popoutBtn.contains(n) || t._popoutBtn.replaceChildren(n);
}
function on(t) {
  return {
    n: "ns-resize",
    s: "ns-resize",
    e: "ew-resize",
    w: "ew-resize",
    ne: "nesw-resize",
    nw: "nwse-resize",
    se: "nwse-resize",
    sw: "nesw-resize"
  }[t] || "";
}
function sn(t, e, n) {
  if (!n) return "";
  const o = t <= n.left + v, i = t >= n.right - v, s = e <= n.top + v, l = e >= n.bottom - v;
  return s && o ? "nw" : s && i ? "ne" : l && o ? "sw" : l && i ? "se" : s ? "n" : l ? "s" : o ? "w" : i ? "e" : "";
}
function rn(t) {
  var e, n;
  if (t.element) {
    if (((e = t._resizeState) == null ? void 0 : e.pointerId) != null)
      try {
        t.element.releasePointerCapture(t._resizeState.pointerId);
      } catch (o) {
        (n = console.debug) == null || n.call(console, o);
      }
    t._resizeState = null, t.element.classList.remove("mjr-mfv--resizing"), t.element.style.cursor = "";
  }
}
function an(t) {
  var e, n;
  if (t.element) {
    t._stopEdgeResize();
    try {
      (e = t._panelAC) == null || e.abort();
    } catch (o) {
      (n = console.debug) == null || n.call(console, o);
    }
    t._panelAC = new AbortController(), t._initEdgeResize(t.element), t._initDrag(t.element.querySelector(".mjr-mfv-header"));
  }
}
function ln(t, e) {
  var d;
  if (!e) return;
  const n = (u) => {
    if (!t.element || t._isPopped) return "";
    const r = t.element.getBoundingClientRect();
    return t._getResizeDirectionFromPoint(u.clientX, u.clientY, r);
  }, o = (d = t._panelAC) == null ? void 0 : d.signal, i = (u) => {
    var f;
    if (u.button !== 0 || !t.element || t._isPopped) return;
    const r = n(u);
    if (!r) return;
    u.preventDefault(), u.stopPropagation();
    const a = t.element.getBoundingClientRect(), c = window.getComputedStyle(t.element), h = Math.max(120, Number.parseFloat(c.minWidth) || 0), m = Math.max(100, Number.parseFloat(c.minHeight) || 0);
    t._resizeState = {
      pointerId: u.pointerId,
      dir: r,
      startX: u.clientX,
      startY: u.clientY,
      startLeft: a.left,
      startTop: a.top,
      startWidth: a.width,
      startHeight: a.height,
      minWidth: h,
      minHeight: m
    }, t.element.style.left = `${Math.round(a.left)}px`, t.element.style.top = `${Math.round(a.top)}px`, t.element.style.right = "auto", t.element.style.bottom = "auto", t.element.classList.add("mjr-mfv--resizing"), t.element.style.cursor = t._resizeCursorForDirection(r);
    try {
      t.element.setPointerCapture(u.pointerId);
    } catch (p) {
      (f = console.debug) == null || f.call(console, p);
    }
  }, s = (u) => {
    if (!t.element || t._isPopped) return;
    const r = t._resizeState;
    if (!r) {
      const _ = n(u);
      t.element.style.cursor = _ ? t._resizeCursorForDirection(_) : "";
      return;
    }
    if (r.pointerId !== u.pointerId) return;
    const a = u.clientX - r.startX, c = u.clientY - r.startY;
    let h = r.startWidth, m = r.startHeight, f = r.startLeft, p = r.startTop;
    r.dir.includes("e") && (h = r.startWidth + a), r.dir.includes("s") && (m = r.startHeight + c), r.dir.includes("w") && (h = r.startWidth - a, f = r.startLeft + a), r.dir.includes("n") && (m = r.startHeight - c, p = r.startTop + c), h < r.minWidth && (r.dir.includes("w") && (f -= r.minWidth - h), h = r.minWidth), m < r.minHeight && (r.dir.includes("n") && (p -= r.minHeight - m), m = r.minHeight), h = Math.min(h, Math.max(r.minWidth, window.innerWidth)), m = Math.min(m, Math.max(r.minHeight, window.innerHeight)), f = Math.min(Math.max(0, f), Math.max(0, window.innerWidth - h)), p = Math.min(Math.max(0, p), Math.max(0, window.innerHeight - m)), t.element.style.width = `${Math.round(h)}px`, t.element.style.height = `${Math.round(m)}px`, t.element.style.left = `${Math.round(f)}px`, t.element.style.top = `${Math.round(p)}px`, t.element.style.right = "auto", t.element.style.bottom = "auto";
  }, l = (u) => {
    if (!t.element || !t._resizeState || t._resizeState.pointerId !== u.pointerId) return;
    const r = n(u);
    t._stopEdgeResize(), r && (t.element.style.cursor = t._resizeCursorForDirection(r));
  };
  e.addEventListener("pointerdown", i, { capture: !0, signal: o }), e.addEventListener("pointermove", s, { signal: o }), e.addEventListener("pointerup", l, { signal: o }), e.addEventListener("pointercancel", l, { signal: o }), e.addEventListener(
    "pointerleave",
    () => {
      !t._resizeState && t.element && (t.element.style.cursor = "");
    },
    { signal: o }
  );
}
function dn(t, e) {
  var i;
  if (!e) return;
  const n = (i = t._panelAC) == null ? void 0 : i.signal;
  let o = null;
  e.addEventListener(
    "pointerdown",
    (s) => {
      if (s.button !== 0 || s.target.closest("button") || s.target.closest("select") || t._isPopped || !t.element || t._getResizeDirectionFromPoint(
        s.clientX,
        s.clientY,
        t.element.getBoundingClientRect()
      )) return;
      s.preventDefault(), e.setPointerCapture(s.pointerId);
      try {
        o == null || o.abort();
      } catch {
      }
      o = new AbortController();
      const d = o.signal, u = t.element, r = u.getBoundingClientRect(), a = s.clientX - r.left, c = s.clientY - r.top, h = (f) => {
        const p = Math.min(
          window.innerWidth - u.offsetWidth,
          Math.max(0, f.clientX - a)
        ), _ = Math.min(
          window.innerHeight - u.offsetHeight,
          Math.max(0, f.clientY - c)
        );
        u.style.left = `${p}px`, u.style.top = `${_}px`, u.style.right = "auto", u.style.bottom = "auto";
      }, m = () => {
        try {
          o == null || o.abort();
        } catch {
        }
      };
      e.addEventListener("pointermove", h, { signal: d }), e.addEventListener("pointerup", m, { signal: d });
    },
    n ? { signal: n } : void 0
  );
}
async function cn(t, e, n, o, i, s, l, d) {
  var m, f, p, _, g;
  if (!n) return;
  const u = R(n);
  let r = null;
  if (u === "video" && (r = d instanceof HTMLVideoElement ? d : ((m = t._contentEl) == null ? void 0 : m.querySelector("video")) || null), !r && u === "model3d") {
    const b = (n == null ? void 0 : n.id) != null ? String(n.id) : "";
    b && (r = ((p = (f = t._contentEl) == null ? void 0 : f.querySelector) == null ? void 0 : p.call(
      f,
      `.mjr-model3d-render-canvas[data-mjr-asset-id="${b}"]`
    )) || null), r || (r = ((g = (_ = t._contentEl) == null ? void 0 : _.querySelector) == null ? void 0 : g.call(_, ".mjr-model3d-render-canvas")) || null);
  }
  if (!r) {
    const b = St(n);
    if (!b) return;
    r = await new Promise((y) => {
      const A = new Image();
      A.crossOrigin = "anonymous", A.onload = () => y(A), A.onerror = () => y(null), A.src = b;
    });
  }
  if (!r) return;
  const a = r.videoWidth || r.naturalWidth || s, c = r.videoHeight || r.naturalHeight || l;
  if (!a || !c) return;
  const h = Math.min(s / a, l / c);
  e.drawImage(
    r,
    o + (s - a * h) / 2,
    i + (l - c * h) / 2,
    a * h,
    c * h
  );
}
function un(t, e, n, o) {
  if (!e || !n || !t._genInfoSelections.size) return 0;
  const i = t._getGenFields(n), s = [
    "prompt",
    "seed",
    "model",
    "lora",
    "sampler",
    "scheduler",
    "cfg",
    "step",
    "genTime"
  ], l = 11, d = 16, u = 8, r = Math.max(100, Number(o || 0) - u * 2);
  let a = 0;
  for (const c of s) {
    if (!t._genInfoSelections.has(c)) continue;
    const h = i[c] != null ? String(i[c]) : "";
    if (!h) continue;
    let m = c.charAt(0).toUpperCase() + c.slice(1);
    c === "lora" ? m = "LoRA" : c === "cfg" ? m = "CFG" : c === "genTime" && (m = "Gen Time");
    const f = `${m}: `;
    e.font = `bold ${l}px system-ui, sans-serif`;
    const p = e.measureText(f).width;
    e.font = `${l}px system-ui, sans-serif`;
    const _ = Math.max(32, r - u * 2 - p);
    let g = 0, b = "";
    for (const y of h.split(" ")) {
      const A = b ? b + " " + y : y;
      e.measureText(A).width > _ && b ? (g += 1, b = y) : b = A;
    }
    b && (g += 1), a += g;
  }
  return a > 0 ? a * d + u * 2 : 0;
}
function pn(t, e, n, o, i, s, l) {
  if (!n || !t._genInfoSelections.size) return;
  const d = t._getGenFields(n), u = {
    prompt: "#7ec8ff",
    seed: "#ffd47a",
    model: "#7dda8a",
    lora: "#d48cff",
    sampler: "#ff9f7a",
    scheduler: "#ff7a9f",
    cfg: "#7a9fff",
    step: "#7affd4",
    genTime: "#e0ff7a"
  }, r = [
    "prompt",
    "seed",
    "model",
    "lora",
    "sampler",
    "scheduler",
    "cfg",
    "step",
    "genTime"
  ], a = [];
  for (const E of r) {
    if (!t._genInfoSelections.has(E)) continue;
    const I = d[E] != null ? String(d[E]) : "";
    if (!I) continue;
    let M = E.charAt(0).toUpperCase() + E.slice(1);
    E === "lora" ? M = "LoRA" : E === "cfg" ? M = "CFG" : E === "genTime" && (M = "Gen Time"), a.push({
      label: `${M}: `,
      value: I,
      color: u[E] || "#ffffff"
    });
  }
  if (!a.length) return;
  const c = 11, h = 16, m = 8, f = Math.max(100, s - m * 2);
  e.save();
  const p = [];
  for (const { label: E, value: I, color: M } of a) {
    e.font = `bold ${c}px system-ui, sans-serif`;
    const j = e.measureText(E).width;
    e.font = `${c}px system-ui, sans-serif`;
    const L = f - m * 2 - j, O = [];
    let F = "";
    for (const H of I.split(" ")) {
      const T = F ? F + " " + H : H;
      e.measureText(T).width > L && F ? (O.push(F), F = H) : F = T;
    }
    F && O.push(F), p.push({ label: E, labelW: j, lines: O, color: M });
  }
  const g = p.reduce((E, I) => E + I.lines.length, 0) * h + m * 2, b = o + m, y = i + l - g - m;
  e.globalAlpha = 0.72, e.fillStyle = "#000", At(e, b, y, f, g, 6), e.fill(), e.globalAlpha = 1;
  let A = y + m + c;
  for (const { label: E, labelW: I, lines: M, color: j } of p)
    for (let L = 0; L < M.length; L++)
      L === 0 ? (e.font = `bold ${c}px system-ui, sans-serif`, e.fillStyle = j, e.fillText(E, b + m, A), e.font = `${c}px system-ui, sans-serif`, e.fillStyle = "rgba(255,255,255,0.88)", e.fillText(M[L], b + m + I, A)) : (e.font = `${c}px system-ui, sans-serif`, e.fillStyle = "rgba(255,255,255,0.88)", e.fillText(M[L], b + m + I, A)), A += h;
  e.restore();
}
async function mn(t) {
  var u;
  if (!t._contentEl) return;
  t._captureBtn && (t._captureBtn.disabled = !0, t._captureBtn.setAttribute("aria-label", N("tooltip.capturingView", "Capturing…")));
  const e = t._contentEl.clientWidth || 480, n = t._contentEl.clientHeight || 360;
  let o = n;
  if (t._mode === C.SIMPLE && t._mediaA && t._genInfoSelections.size) {
    const r = document.createElement("canvas");
    r.width = e, r.height = n;
    const a = r.getContext("2d"), c = t._estimateGenInfoOverlayHeight(a, t._mediaA, e);
    if (c > 0) {
      const h = Math.max(n, c + 24);
      o = Math.min(h, n * 4);
    }
  }
  const i = document.createElement("canvas");
  i.width = e, i.height = o;
  const s = i.getContext("2d");
  s.fillStyle = "#0d0d0d", s.fillRect(0, 0, e, o);
  try {
    if (t._mode === C.SIMPLE)
      t._mediaA && (await t._drawMediaFit(s, t._mediaA, 0, 0, e, n), t._drawGenInfoOverlay(s, t._mediaA, 0, 0, e, o));
    else if (t._mode === C.AB) {
      const r = Math.round(t._abDividerX * e), a = t._contentEl.querySelector(
        ".mjr-mfv-ab-layer:not(.mjr-mfv-ab-layer--b) video"
      ), c = t._contentEl.querySelector(".mjr-mfv-ab-layer--b video");
      t._mediaA && await t._drawMediaFit(s, t._mediaA, 0, 0, e, o, a), t._mediaB && (s.save(), s.beginPath(), s.rect(r, 0, e - r, o), s.clip(), await t._drawMediaFit(s, t._mediaB, 0, 0, e, o, c), s.restore()), s.save(), s.strokeStyle = "rgba(255,255,255,0.88)", s.lineWidth = 2, s.beginPath(), s.moveTo(r, 0), s.lineTo(r, o), s.stroke(), s.restore(), q(s, "A", 8, 8), q(s, "B", r + 8, 8), t._mediaA && t._drawGenInfoOverlay(s, t._mediaA, 0, 0, r, o), t._mediaB && t._drawGenInfoOverlay(s, t._mediaB, r, 0, e - r, o);
    } else if (t._mode === C.SIDE) {
      const r = Math.floor(e / 2), a = t._contentEl.querySelector(".mjr-mfv-side-panel:first-child video"), c = t._contentEl.querySelector(".mjr-mfv-side-panel:last-child video");
      t._mediaA && (await t._drawMediaFit(s, t._mediaA, 0, 0, r, o, a), t._drawGenInfoOverlay(s, t._mediaA, 0, 0, r, o)), s.fillStyle = "#111", s.fillRect(r, 0, 2, o), t._mediaB && (await t._drawMediaFit(s, t._mediaB, r, 0, r, o, c), t._drawGenInfoOverlay(s, t._mediaB, r, 0, r, o)), q(s, "A", 8, 8), q(s, "B", r + 8, 8);
    } else if (t._mode === C.GRID) {
      const r = Math.floor(e / 2), a = Math.floor(o / 2), c = 1, h = [
        { media: t._mediaA, label: "A", x: 0, y: 0, w: r - c, h: a - c },
        {
          media: t._mediaB,
          label: "B",
          x: r + c,
          y: 0,
          w: r - c,
          h: a - c
        },
        {
          media: t._mediaC,
          label: "C",
          x: 0,
          y: a + c,
          w: r - c,
          h: a - c
        },
        {
          media: t._mediaD,
          label: "D",
          x: r + c,
          y: a + c,
          w: r - c,
          h: a - c
        }
      ], m = t._contentEl.querySelectorAll(".mjr-mfv-grid-cell");
      for (let f = 0; f < h.length; f++) {
        const p = h[f], _ = ((u = m[f]) == null ? void 0 : u.querySelector("video")) || null;
        p.media && (await t._drawMediaFit(s, p.media, p.x, p.y, p.w, p.h, _), t._drawGenInfoOverlay(s, p.media, p.x, p.y, p.w, p.h)), q(s, p.label, p.x + 8, p.y + 8);
      }
      s.save(), s.fillStyle = "#111", s.fillRect(r - c, 0, c * 2, o), s.fillRect(0, a - c, e, c * 2), s.restore();
    }
  } catch (r) {
    console.debug("[MFV] capture error:", r);
  }
  const d = `${{
    [C.AB]: "mfv-ab",
    [C.SIDE]: "mfv-side",
    [C.GRID]: "mfv-grid"
  }[t._mode] ?? "mfv"}-${Date.now()}.png`;
  try {
    const r = i.toDataURL("image/png"), a = document.createElement("a");
    a.href = r, a.download = d, document.body.appendChild(a), a.click(), setTimeout(() => document.body.removeChild(a), 100);
  } catch (r) {
    console.warn("[MFV] download failed:", r);
  } finally {
    t._captureBtn && (t._captureBtn.disabled = !1, t._captureBtn.setAttribute("aria-label", N("tooltip.captureView", "Save view as image")));
  }
}
function hn(t, e, { autoMode: n = !1 } = {}) {
  if (t._mediaA = e || null, t._resetMfvZoom(), n && t._mode !== C.SIMPLE && (t._mode = C.SIMPLE, t._updateModeBtnUI()), t._mediaA && typeof J == "function") {
    const o = ++t._refreshGen;
    (async () => {
      var i;
      try {
        const s = await J(t._mediaA, {
          getAssetMetadata: dt,
          getFileMetadataScoped: lt
        });
        if (t._refreshGen !== o) return;
        s && typeof s == "object" && (t._mediaA = s, t._refresh());
      } catch (s) {
        (i = console.debug) == null || i.call(console, "[MFV] metadata enrich error", s);
      }
    })();
  } else
    t._refresh();
}
function fn(t, e, n) {
  t._mediaA = e || null, t._mediaB = n || null, t._resetMfvZoom(), t._mode === C.SIMPLE && (t._mode = C.AB, t._updateModeBtnUI());
  const o = ++t._refreshGen, i = async (s) => {
    if (!s) return s;
    try {
      return await J(s, {
        getAssetMetadata: dt,
        getFileMetadataScoped: lt
      }) || s;
    } catch {
      return s;
    }
  };
  (async () => {
    const [s, l] = await Promise.all([i(t._mediaA), i(t._mediaB)]);
    t._refreshGen === o && (t._mediaA = s || null, t._mediaB = l || null, t._refresh());
  })();
}
function _n(t, e, n, o, i) {
  t._mediaA = e || null, t._mediaB = n || null, t._mediaC = o || null, t._mediaD = i || null, t._resetMfvZoom(), t._mode !== C.GRID && (t._mode = C.GRID, t._updateModeBtnUI());
  const s = ++t._refreshGen, l = async (d) => {
    if (!d) return d;
    try {
      return await J(d, {
        getAssetMetadata: dt,
        getFileMetadataScoped: lt
      }) || d;
    } catch {
      return d;
    }
  };
  (async () => {
    const [d, u, r, a] = await Promise.all([
      l(t._mediaA),
      l(t._mediaB),
      l(t._mediaC),
      l(t._mediaD)
    ]);
    t._refreshGen === s && (t._mediaA = d || null, t._mediaB = u || null, t._mediaC = r || null, t._mediaD = a || null, t._refresh());
  })();
}
function z(t) {
  var e, n;
  try {
    return !!((e = t == null ? void 0 : t.classList) != null && e.contains("mjr-mfv-simple-player"));
  } catch (o) {
    return (n = console.debug) == null || n.call(console, o), !1;
  }
}
let gn = 0;
class Cn {
  constructor({ controller: e = null } = {}) {
    this._instanceId = ++gn, this._controller = e && typeof e == "object" ? { ...e } : null, this.element = null, this.isVisible = !1, this._contentEl = null, this._closeBtn = null, this._modeBtn = null, this._pinGroup = null, this._pinBtns = null, this._liveBtn = null, this._genBtn = null, this._genDropdown = null, this._captureBtn = null, this._genInfoSelections = /* @__PURE__ */ new Set(["genTime"]), this._mode = C.SIMPLE, this._mediaA = null, this._mediaB = null, this._mediaC = null, this._mediaD = null, this._pinnedSlots = /* @__PURE__ */ new Set(), this._abDividerX = 0.5, this._zoom = 1, this._panX = 0, this._panY = 0, this._panzoomAC = null, this._dragging = !1, this._compareSyncAC = null, this._btnAC = null, this._refreshGen = 0, this._popoutWindow = null, this._popoutBtn = null, this._isPopped = !1, this._desktopExpanded = !1, this._desktopExpandRestore = null, this._desktopPopoutUnsupported = !1, this._popoutCloseHandler = null, this._popoutKeydownHandler = null, this._popoutCloseTimer = null, this._popoutRestoreGuard = !1, this._previewBtn = null, this._previewBlobUrl = null, this._previewActive = !1, this._nodeStreamBtn = null, this._nodeStreamActive = !1, this._docAC = new AbortController(), this._popoutAC = null, this._panelAC = new AbortController(), this._resizeState = null, this._titleId = `mjr-mfv-title-${this._instanceId}`, this._genDropdownId = `mjr-mfv-gen-dropdown-${this._instanceId}`, this._progressEl = null, this._progressNodesEl = null, this._progressStepsEl = null, this._progressTextEl = null, this._mediaProgressEl = null, this._mediaProgressTextEl = null, this._progressUpdateHandler = null, this._progressCurrentNodeId = null, this._docClickHost = null, this._handleDocClick = null;
  }
  _dispatchControllerAction(e, n) {
    var o, i, s;
    try {
      const l = (o = this._controller) == null ? void 0 : o[e];
      if (typeof l == "function")
        return l();
    } catch (l) {
      (i = console.debug) == null || i.call(console, l);
    }
    if (n)
      try {
        window.dispatchEvent(new Event(n));
      } catch (l) {
        (s = console.debug) == null || s.call(console, l);
      }
  }
  _forwardKeydownToController(e) {
    var n, o, i;
    try {
      const s = (n = this._controller) == null ? void 0 : n.handleForwardedKeydown;
      if (typeof s == "function") {
        s(e);
        return;
      }
    } catch (s) {
      (o = console.debug) == null || o.call(console, s);
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
    } catch (s) {
      (i = console.debug) == null || i.call(console, s);
    }
  }
  // ── Build DOM ─────────────────────────────────────────────────────────────
  render() {
    return ge(this);
  }
  _buildHeader() {
    return be(this);
  }
  _buildToolbar() {
    return ye(this);
  }
  _rebindControlHandlers() {
    return Ce(this);
  }
  _updateSettingsBtnState(e) {
    return Se(this, e);
  }
  _applySidebarPosition() {
    return Ae(this);
  }
  refreshSidebar() {
    var e;
    (e = this._sidebar) == null || e.refresh();
  }
  _resetGenDropdownForCurrentDocument() {
    return Ee(this);
  }
  _bindDocumentUiHandlers() {
    return Be(this);
  }
  _unbindDocumentUiHandlers() {
    return Me(this);
  }
  _isGenDropdownOpen() {
    return Pe(this);
  }
  _openGenDropdown() {
    return Ne(this);
  }
  _closeGenDropdown() {
    return Ie(this);
  }
  _updateGenBtnUI() {
    return Fe(this);
  }
  _buildGenDropdown() {
    return Le(this);
  }
  _getGenFields(e) {
    return ke(this, e);
  }
  _buildGenInfoDOM(e) {
    return je(this, e);
  }
  _notifyModeChanged() {
    return Te(this);
  }
  _cycleMode() {
    return Ve(this);
  }
  setMode(e) {
    return Ge(this, e);
  }
  getPinnedSlots() {
    return Re(this);
  }
  _updatePinUI() {
    return He(this);
  }
  _updateModeBtnUI() {
    return Oe(this);
  }
  setLiveActive(e) {
    return De(this, e);
  }
  setPreviewActive(e) {
    return Ue(this, e);
  }
  loadPreviewBlob(e, n = {}) {
    return ze(this, e, n);
  }
  _revokePreviewBlob() {
    return $e(this);
  }
  setNodeStreamActive(e) {
    return We(this);
  }
  loadMediaA(e, { autoMode: n = !1 } = {}) {
    return hn(this, e, { autoMode: n });
  }
  /**
   * Load two assets for compare modes.
   * Auto-switches from SIMPLE → AB on first call.
   */
  loadMediaPair(e, n) {
    return fn(this, e, n);
  }
  /**
   * Load up to 4 assets for grid compare mode.
   * Auto-switches to GRID mode if not already.
   */
  loadMediaQuad(e, n, o, i) {
    return _n(this, e, n, o, i);
  }
  /** Apply current zoom+pan state to all media elements (img/video only — divider/overlays unaffected). */
  _applyTransform() {
    if (!this._contentEl) return;
    const e = Math.max(ot, Math.min(st, this._zoom)), n = this._contentEl.clientWidth || 0, o = this._contentEl.clientHeight || 0, i = Math.max(0, (e - 1) * n / 2), s = Math.max(0, (e - 1) * o / 2);
    this._panX = Math.max(-i, Math.min(i, this._panX)), this._panY = Math.max(-s, Math.min(s, this._panY));
    const l = `translate(${this._panX}px,${this._panY}px) scale(${e})`;
    for (const d of this._contentEl.querySelectorAll(".mjr-mfv-media"))
      d != null && d._mjrDisableViewerTransform || (d.style.transform = l, d.style.transformOrigin = "center");
    this._contentEl.classList.remove("mjr-mfv-content--grab", "mjr-mfv-content--grabbing"), e > 1.01 && this._contentEl.classList.add(
      this._dragging ? "mjr-mfv-content--grabbing" : "mjr-mfv-content--grab"
    );
  }
  /**
   * Set zoom, optionally centered at (clientX, clientY).
   * Keeps the image point under the cursor stationary.
   */
  _setMfvZoom(e, n, o) {
    const i = Math.max(ot, Math.min(st, this._zoom)), s = Math.max(ot, Math.min(st, Number(e) || 1));
    if (n != null && o != null && this._contentEl) {
      const l = s / i, d = this._contentEl.getBoundingClientRect(), u = n - (d.left + d.width / 2), r = o - (d.top + d.height / 2);
      this._panX = this._panX * l + (1 - l) * u, this._panY = this._panY * l + (1 - l) * r;
    }
    this._zoom = s, Math.abs(s - 1) < 1e-3 && (this._zoom = 1, this._panX = 0, this._panY = 0), this._applyTransform();
  }
  /** Reset zoom and pan to the default 1:1 fit. Called when new media is loaded. */
  _resetMfvZoom() {
    this._zoom = 1, this._panX = 0, this._panY = 0, this._applyTransform();
  }
  /** Bind wheel + pointer events to the clip viewport element. */
  _initPanZoom(e) {
    if (this._destroyPanZoom(), !e) return;
    this._panzoomAC = new AbortController();
    const n = { signal: this._panzoomAC.signal };
    e.addEventListener(
      "wheel",
      (r) => {
        var m, f, p, _;
        if ((f = (m = r.target) == null ? void 0 : m.closest) != null && f.call(m, "audio") || (_ = (p = r.target) == null ? void 0 : p.closest) != null && _.call(p, ".mjr-mfv-simple-player-controls") || nt(r.target)) return;
        const a = Jt(r.target, e);
        if (a && Qt(
          a,
          Number(r.deltaX || 0),
          Number(r.deltaY || 0)
        ))
          return;
        r.preventDefault();
        const h = 1 - (r.deltaY || r.deltaX || 0) * Ot;
        this._setMfvZoom(this._zoom * h, r.clientX, r.clientY);
      },
      { ...n, passive: !1 }
    );
    let o = !1, i = 0, s = 0, l = 0, d = 0;
    e.addEventListener(
      "pointerdown",
      (r) => {
        var a, c, h, m, f, p, _, g, b;
        if (!(r.button !== 0 && r.button !== 1) && !(this._zoom <= 1.01) && !((c = (a = r.target) == null ? void 0 : a.closest) != null && c.call(a, "video")) && !((m = (h = r.target) == null ? void 0 : h.closest) != null && m.call(h, "audio")) && !((p = (f = r.target) == null ? void 0 : f.closest) != null && p.call(f, ".mjr-mfv-simple-player-controls")) && !((g = (_ = r.target) == null ? void 0 : _.closest) != null && g.call(_, ".mjr-mfv-ab-divider")) && !nt(r.target)) {
          r.preventDefault(), o = !0, this._dragging = !0, i = r.clientX, s = r.clientY, l = this._panX, d = this._panY;
          try {
            e.setPointerCapture(r.pointerId);
          } catch (y) {
            (b = console.debug) == null || b.call(console, y);
          }
          this._applyTransform();
        }
      },
      n
    ), e.addEventListener(
      "pointermove",
      (r) => {
        o && (this._panX = l + (r.clientX - i), this._panY = d + (r.clientY - s), this._applyTransform());
      },
      n
    );
    const u = (r) => {
      var a;
      if (o) {
        o = !1, this._dragging = !1;
        try {
          e.releasePointerCapture(r.pointerId);
        } catch (c) {
          (a = console.debug) == null || a.call(console, c);
        }
        this._applyTransform();
      }
    };
    e.addEventListener("pointerup", u, n), e.addEventListener("pointercancel", u, n), e.addEventListener(
      "dblclick",
      (r) => {
        var c, h, m, f, p, _;
        if ((h = (c = r.target) == null ? void 0 : c.closest) != null && h.call(c, "video") || (f = (m = r.target) == null ? void 0 : m.closest) != null && f.call(m, "audio") || (_ = (p = r.target) == null ? void 0 : p.closest) != null && _.call(p, ".mjr-mfv-simple-player-controls") || nt(r.target)) return;
        const a = Math.abs(this._zoom - 1) < 0.05;
        this._setMfvZoom(a ? Math.min(4, this._zoom * 4) : 1, r.clientX, r.clientY);
      },
      n
    );
  }
  /** Remove all pan/zoom event listeners. */
  _destroyPanZoom() {
    var e, n;
    try {
      (e = this._panzoomAC) == null || e.abort();
    } catch (o) {
      (n = console.debug) == null || n.call(console, o);
    }
    this._panzoomAC = null, this._dragging = !1;
  }
  _destroyCompareSync() {
    var e, n, o;
    try {
      (n = (e = this._compareSyncAC) == null ? void 0 : e.abort) == null || n.call(e);
    } catch (i) {
      (o = console.debug) == null || o.call(console, i);
    }
    this._compareSyncAC = null;
  }
  _initCompareSync() {
    var e;
    if (this._destroyCompareSync(), !!this._contentEl && this._mode !== C.SIMPLE)
      try {
        const n = Array.from(this._contentEl.querySelectorAll("video, audio"));
        if (n.length < 2) return;
        const o = n[0] || null, i = n.slice(1);
        if (!o || !i.length) return;
        this._compareSyncAC = Rt(o, i, { threshold: 0.08 });
      } catch (n) {
        (e = console.debug) == null || e.call(console, n);
      }
  }
  // ── Render ────────────────────────────────────────────────────────────────
  _refresh() {
    if (this._contentEl) {
      switch (this._destroyPanZoom(), this._destroyCompareSync(), this._contentEl.replaceChildren(), this._contentEl.style.overflow = "hidden", this._mode) {
        case C.SIMPLE:
          this._renderSimple();
          break;
        case C.AB:
          this._renderAB();
          break;
        case C.SIDE:
          this._renderSide();
          break;
        case C.GRID:
          this._renderGrid();
          break;
      }
      this._mediaProgressEl && this._contentEl.appendChild(this._mediaProgressEl), this._applyTransform(), this._initPanZoom(this._contentEl), this._initCompareSync();
    }
  }
  _renderSimple() {
    if (!this._mediaA) {
      this._contentEl.appendChild(G());
      return;
    }
    const e = R(this._mediaA), n = U(this._mediaA);
    if (!n) {
      this._contentEl.appendChild(G("Could not load media"));
      return;
    }
    const o = document.createElement("div");
    if (o.className = "mjr-mfv-simple-container", o.appendChild(n), e !== "audio") {
      const i = this._buildGenInfoDOM(this._mediaA);
      if (i) {
        const s = document.createElement("div");
        s.className = "mjr-mfv-geninfo", z(n) && s.classList.add("mjr-mfv-geninfo--above-player"), s.appendChild(i), o.appendChild(s);
      }
    }
    this._contentEl.appendChild(o);
  }
  _renderAB() {
    var p;
    const e = this._mediaA ? U(this._mediaA, { fill: !0 }) : null, n = this._mediaB ? U(this._mediaB, { fill: !0 }) : null, o = this._mediaA ? R(this._mediaA) : "", i = this._mediaB ? R(this._mediaB) : "";
    if (!e && !n) {
      this._contentEl.appendChild(G("Select 2 assets for A/B compare"));
      return;
    }
    if (!n) {
      this._renderSimple();
      return;
    }
    if (o === "audio" || i === "audio" || o === "model3d" || i === "model3d") {
      this._renderSide();
      return;
    }
    const s = document.createElement("div");
    s.className = "mjr-mfv-ab-container";
    const l = document.createElement("div");
    l.className = "mjr-mfv-ab-layer", e && l.appendChild(e);
    const d = document.createElement("div");
    d.className = "mjr-mfv-ab-layer mjr-mfv-ab-layer--b";
    const u = Math.round(this._abDividerX * 100);
    d.style.clipPath = `inset(0 0 0 ${u}%)`, d.appendChild(n);
    const r = document.createElement("div");
    r.className = "mjr-mfv-ab-divider", r.style.left = `${u}%`;
    const a = this._buildGenInfoDOM(this._mediaA);
    let c = null;
    a && (c = document.createElement("div"), c.className = "mjr-mfv-geninfo-a", z(e) && c.classList.add("mjr-mfv-geninfo--above-player"), c.appendChild(a), c.style.right = `calc(${100 - u}% + 8px)`);
    const h = this._buildGenInfoDOM(this._mediaB);
    let m = null;
    h && (m = document.createElement("div"), m.className = "mjr-mfv-geninfo-b", z(n) && m.classList.add("mjr-mfv-geninfo--above-player"), m.appendChild(h), m.style.left = `calc(${u}% + 8px)`);
    let f = null;
    r.addEventListener(
      "pointerdown",
      (_) => {
        _.preventDefault(), r.setPointerCapture(_.pointerId);
        try {
          f == null || f.abort();
        } catch {
        }
        f = new AbortController();
        const g = f.signal, b = s.getBoundingClientRect(), y = (E) => {
          const I = Math.max(0.02, Math.min(0.98, (E.clientX - b.left) / b.width));
          this._abDividerX = I;
          const M = Math.round(I * 100);
          d.style.clipPath = `inset(0 0 0 ${M}%)`, r.style.left = `${M}%`, c && (c.style.right = `calc(${100 - M}% + 8px)`), m && (m.style.left = `calc(${M}% + 8px)`);
        }, A = () => {
          try {
            f == null || f.abort();
          } catch {
          }
        };
        r.addEventListener("pointermove", y, { signal: g }), r.addEventListener("pointerup", A, { signal: g });
      },
      (p = this._panelAC) != null && p.signal ? { signal: this._panelAC.signal } : void 0
    ), s.appendChild(l), s.appendChild(d), s.appendChild(r), c && s.appendChild(c), m && s.appendChild(m), s.appendChild(D("A", "left")), s.appendChild(D("B", "right")), this._contentEl.appendChild(s);
  }
  _renderSide() {
    const e = this._mediaA ? U(this._mediaA) : null, n = this._mediaB ? U(this._mediaB) : null, o = this._mediaA ? R(this._mediaA) : "", i = this._mediaB ? R(this._mediaB) : "";
    if (!e && !n) {
      this._contentEl.appendChild(G("Select 2 assets for Side-by-Side"));
      return;
    }
    const s = document.createElement("div");
    s.className = "mjr-mfv-side-container";
    const l = document.createElement("div");
    l.className = "mjr-mfv-side-panel", e ? l.appendChild(e) : l.appendChild(G("—")), l.appendChild(D("A", "left"));
    const d = o === "audio" ? null : this._buildGenInfoDOM(this._mediaA);
    if (d) {
      const a = document.createElement("div");
      a.className = "mjr-mfv-geninfo-a", z(e) && a.classList.add("mjr-mfv-geninfo--above-player"), a.appendChild(d), l.appendChild(a);
    }
    const u = document.createElement("div");
    u.className = "mjr-mfv-side-panel", n ? u.appendChild(n) : u.appendChild(G("—")), u.appendChild(D("B", "right"));
    const r = i === "audio" ? null : this._buildGenInfoDOM(this._mediaB);
    if (r) {
      const a = document.createElement("div");
      a.className = "mjr-mfv-geninfo-b", z(n) && a.classList.add("mjr-mfv-geninfo--above-player"), a.appendChild(r), u.appendChild(a);
    }
    s.appendChild(l), s.appendChild(u), this._contentEl.appendChild(s);
  }
  _renderGrid() {
    const e = [
      { media: this._mediaA, label: "A" },
      { media: this._mediaB, label: "B" },
      { media: this._mediaC, label: "C" },
      { media: this._mediaD, label: "D" }
    ];
    if (!e.filter((i) => i.media).length) {
      this._contentEl.appendChild(G("Select up to 4 assets for Grid Compare"));
      return;
    }
    const o = document.createElement("div");
    o.className = "mjr-mfv-grid-container";
    for (const { media: i, label: s } of e) {
      const l = document.createElement("div");
      if (l.className = "mjr-mfv-grid-cell", i) {
        const d = R(i), u = U(i);
        if (u ? l.appendChild(u) : l.appendChild(G("—")), l.appendChild(
          D(s, s === "A" || s === "C" ? "left" : "right")
        ), d !== "audio") {
          const r = this._buildGenInfoDOM(i);
          if (r) {
            const a = document.createElement("div");
            a.className = `mjr-mfv-geninfo-${s.toLowerCase()}`, z(u) && a.classList.add("mjr-mfv-geninfo--above-player"), a.appendChild(r), l.appendChild(a);
          }
        }
      } else
        l.appendChild(G("—")), l.appendChild(
          D(s, s === "A" || s === "C" ? "left" : "right")
        );
      o.appendChild(l);
    }
    this._contentEl.appendChild(o);
  }
  // ── Visibility ────────────────────────────────────────────────────────────
  show() {
    this.element && (this._bindDocumentUiHandlers(), this.element.classList.add("is-visible"), this.element.setAttribute("aria-hidden", "false"), this.isVisible = !0);
  }
  hide() {
    this.element && (this._destroyPanZoom(), this._destroyCompareSync(), this._stopEdgeResize(), this._closeGenDropdown(), te(this.element), this.element.classList.remove("is-visible"), this.element.setAttribute("aria-hidden", "true"), this.isVisible = !1);
  }
  // ── Pop-out / Pop-in (separate OS window for second monitor) ────────────
  _setDesktopExpanded(e) {
    return qe(this, e);
  }
  _activateDesktopExpandedFallback(e) {
    return Ke(this, e);
  }
  _tryElectronPopupFallback(e, n, o, i) {
    return Ye(this, e, n, o, i);
  }
  popOut() {
    return Ze(this);
  }
  _fallbackPopout(e, n, o) {
    return ve(this, e, n, o);
  }
  _clearPopoutCloseWatch() {
    return we(this);
  }
  _startPopoutCloseWatch() {
    return Je(this);
  }
  _schedulePopInFromPopupClose() {
    return Qe(this);
  }
  _installPopoutStyles(e) {
    return tn(this, e);
  }
  popIn(e) {
    return en(this, e);
  }
  _updatePopoutBtnUI() {
    return nn(this);
  }
  get isPopped() {
    return this._isPopped || this._desktopExpanded;
  }
  _resizeCursorForDirection(e) {
    return on(e);
  }
  _getResizeDirectionFromPoint(e, n, o) {
    return sn(e, n, o);
  }
  _stopEdgeResize() {
    return rn(this);
  }
  _bindPanelInteractions() {
    return an(this);
  }
  _initEdgeResize(e) {
    return ln(this, e);
  }
  _initDrag(e) {
    return dn(this, e);
  }
  async _drawMediaFit(e, n, o, i, s, l, d) {
    return cn(this, e, n, o, i, s, l, d);
  }
  _estimateGenInfoOverlayHeight(e, n, o) {
    return un(this, e, n, o);
  }
  _drawGenInfoOverlay(e, n, o, i, s, l) {
    return pn(this, e, n, o, i, s, l);
  }
  async _captureView() {
    return mn(this);
  }
  dispose() {
    var e, n, o, i, s, l, d, u, r, a, c, h, m, f, p, _, g, b;
    Ht(this), this._destroyPanZoom(), this._destroyCompareSync(), this._stopEdgeResize(), this._clearPopoutCloseWatch();
    try {
      (e = this._panelAC) == null || e.abort(), this._panelAC = null;
    } catch (y) {
      (n = console.debug) == null || n.call(console, y);
    }
    try {
      (o = this._btnAC) == null || o.abort(), this._btnAC = null;
    } catch (y) {
      (i = console.debug) == null || i.call(console, y);
    }
    try {
      (s = this._docAC) == null || s.abort(), this._docAC = null;
    } catch (y) {
      (l = console.debug) == null || l.call(console, y);
    }
    try {
      (d = this._popoutAC) == null || d.abort(), this._popoutAC = null;
    } catch (y) {
      (u = console.debug) == null || u.call(console, y);
    }
    try {
      (r = this._panzoomAC) == null || r.abort(), this._panzoomAC = null;
    } catch (y) {
      (a = console.debug) == null || a.call(console, y);
    }
    try {
      (h = (c = this._compareSyncAC) == null ? void 0 : c.abort) == null || h.call(c), this._compareSyncAC = null;
    } catch (y) {
      (m = console.debug) == null || m.call(console, y);
    }
    try {
      this._isPopped && this.popIn();
    } catch (y) {
      (f = console.debug) == null || f.call(console, y);
    }
    this._revokePreviewBlob(), this._onSidebarPosChanged && (window.removeEventListener("mjr-settings-changed", this._onSidebarPosChanged), this._onSidebarPosChanged = null);
    try {
      (p = this.element) == null || p.remove();
    } catch (y) {
      (_ = console.debug) == null || _.call(console, y);
    }
    this.element = null, this._contentEl = null, this._closeBtn = null, this._modeBtn = null, this._pinGroup = null, this._pinBtns = null, this._liveBtn = null, this._nodeStreamBtn = null, this._popoutBtn = null, this._captureBtn = null, this._unbindDocumentUiHandlers();
    try {
      (g = this._genDropdown) == null || g.remove();
    } catch (y) {
      (b = console.debug) == null || b.call(console, y);
    }
    this._mediaA = null, this._mediaB = null, this._mediaC = null, this._mediaD = null, this.isVisible = !1;
  }
}
export {
  Cn as FloatingViewer,
  C as MFV_MODES
};

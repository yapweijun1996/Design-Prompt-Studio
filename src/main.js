// Design Prompt Studio — entry point
// Boots a hash-routed app: #gallery | #studio | #express
// At P0 each route renders a placeholder; real content lands in P1+.

import "./styles/reset.css";
import "./styles/tokens.css";
import "./styles/main.css";

import { store } from "./lib/store.js";
import { ALL_PROMPTS, promptStats } from "./data/prompts/index.js";
import { STYLE_IDS } from "./data/styles/index.js";
import { pageTypeCount } from "./data/taxonomy.js";
import { assembleFromCard, promptStats as charStats } from "./lib/assemblePrompt.js";

const VERSION = "0.4.0-p0";
const ROUTES = ["gallery", "studio", "express"];
const DEFAULT_ROUTE = "gallery";

// ─── Router ─────────────────────────────────────────────────────────────────
function currentRoute() {
  const hash = location.hash.replace(/^#/, "").split("?")[0].split("/")[0];
  return ROUTES.includes(hash) ? hash : DEFAULT_ROUTE;
}

function go(route) {
  if (!ROUTES.includes(route)) route = DEFAULT_ROUTE;
  if (location.hash !== "#" + route) location.hash = route;
  render();
}

// ─── Renderers (placeholder UI for P0) ──────────────────────────────────────
const app = () => document.getElementById("app");

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function") {
      node.addEventListener(k.slice(2).toLowerCase(), v);
    } else if (v !== false && v != null) {
      node.setAttribute(k, v);
    }
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return node;
}

function header() {
  return el(
    "header",
    { class: "appbar" },
    el("div", { class: "appbar__logo" },
      "DESIGN",
      el("span", { class: "appbar__slash" }, "/"),
      "md",
      el("span", { class: "appbar__ver" }, "v" + VERSION),
    ),
    el(
      "nav",
      { class: "appbar__nav", "aria-label": "Primary" },
      ...ROUTES.map((r) =>
        el("a", {
          class: "appbar__link" + (currentRoute() === r ? " is-active" : ""),
          href: "#" + r,
        }, r.charAt(0).toUpperCase() + r.slice(1)),
      ),
    ),
  );
}

function placeholder(routeName, blurb) {
  return el(
    "main",
    { id: "main", class: "placeholder" },
    el("div", { class: "placeholder__inner" },
      el("p", { class: "placeholder__eyebrow" }, "P0 · Scaffold"),
      el("h1", { class: "placeholder__title" }, routeName),
      el("p", { class: "placeholder__blurb" }, blurb),
      el("p", { class: "placeholder__hint" },
        "Real content lands in P1 (data) and P2+ (UI). Check ",
        el("code", { class: "placeholder__code" }, "task.md"),
        " for the build plan.",
      ),
    ),
  );
}

function renderGallery() {
  const stats = promptStats();
  // Smoke-test the assembler against the first curated prompt so wiring is exercised.
  const first = ALL_PROMPTS[0];
  let sampleChars = 0;
  try {
    const prompt = assembleFromCard(first);
    sampleChars = charStats(prompt).chars;
  } catch (e) {
    console.error("[dps] assemble smoke test failed:", e);
  }

  const wrap = placeholder(
    "Prompt Gallery",
    "100+ ready-made prompts you can copy and paste into any LLM. One default-loaded with a huge Copy button; click any tile to swap. Built in P2.",
  );

  const datacard = el(
    "p",
    { class: "placeholder__hint" },
    `Data layer ready · ${stats.curated} curated + ${stats.standard} standard = ${stats.total} prompts · ${STYLE_IDS.length} styles · ${pageTypeCount()} page types · sample assemble: ${sampleChars.toLocaleString()} chars`,
  );
  wrap.querySelector(".placeholder__inner").appendChild(datacard);
  return wrap;
}

function renderStudio() {
  return placeholder(
    "Studio · Wizard",
    "5-step wizard for fine-tuning a prompt: Style → Page → Brief → Tech → Review. Opens with the gallery prompt's state pre-loaded. Built in P4.",
  );
}

function renderExpress() {
  return placeholder(
    "Studio · Express",
    "Single-page composer for power users — every control on one screen. v0.3 layout preserved here. Ported in P6.",
  );
}

function render() {
  const route = currentRoute();
  const root = app();
  root.removeAttribute("aria-busy");
  root.innerHTML = "";
  root.appendChild(header());
  if (route === "gallery") root.appendChild(renderGallery());
  else if (route === "studio") root.appendChild(renderStudio());
  else root.appendChild(renderExpress());
  root.appendChild(footer());
  document.title = `${route.charAt(0).toUpperCase() + route.slice(1)} · Design Prompt Studio`;
}

function footer() {
  return el(
    "footer",
    { class: "appfoot" },
    el("span", null, "© 2026 Design/md"),
    el("span", { class: "appfoot__dot" }, "·"),
    el("span", null, "v" + VERSION),
    el("span", { class: "appfoot__dot" }, "·"),
    el("a", { href: "https://github.com/yapweijun1996/Design-Prompt-Studio", rel: "noopener", target: "_blank" }, "GitHub"),
  );
}

// ─── Boot ───────────────────────────────────────────────────────────────────
function boot() {
  // Restore theme preference (default: auto via prefers-color-scheme)
  const savedTheme = store.get("prefs", {})?.theme;
  if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);

  // Hash routing
  window.addEventListener("hashchange", render);
  if (!location.hash) go(DEFAULT_ROUTE);
  else render();

  // Console handshake — useful for verifying SW + dev build hooked up
  console.log(`[dps] v${VERSION} booted · route=${currentRoute()}`);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

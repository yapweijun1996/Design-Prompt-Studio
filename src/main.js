// Design Prompt Studio — entry point
// Boots a hash-routed app: #gallery | #studio | #express
// P0 = placeholders. P2 wires real Gallery. P4 wires Studio. P6 wires Express.

import "./styles/reset.css";
import "./styles/tokens.css";
import "./styles/main.css";
import "./styles/tiles.css";
import "./styles/tiles-extended.css";
import "./styles/tiles-extended-2.css";
import "./styles/gallery.css";
import "./styles/studio.css";

import { el } from "./lib/dom.js";
import { store } from "./lib/store.js";
import { renderGallery } from "./gallery/Gallery.js";
import { renderStudio } from "./studio/Studio.js";
import { renderExpress } from "./studio/Express.js";

const VERSION = "0.4.0";
const ROUTES = ["gallery", "studio", "express"];
const DEFAULT_ROUTE = "gallery";

// ─── Router ─────────────────────────────────────────────────────────────────
function currentRoute() {
  const hash = location.hash.replace(/^#/, "").split("?")[0].split("/")[0];
  return ROUTES.includes(hash) ? hash : DEFAULT_ROUTE;
}

// ─── Renderers ─────────────────────────────────────────────────────────────
const appRoot = () => document.getElementById("app");

function header() {
  return el(
    "header",
    { class: "appbar" },
    el(
      "a",
      { class: "appbar__logo", href: "#gallery" },
      "DESIGN",
      el("span", { class: "appbar__slash" }, "/"),
      "md",
      el("span", { class: "appbar__ver" }, "v" + VERSION),
    ),
    el(
      "nav",
      { class: "appbar__nav", "aria-label": "Primary" },
      ...ROUTES.map((r) =>
        el(
          "a",
          {
            class: "appbar__link" + (currentRoute() === r ? " is-active" : ""),
            href: "#" + r,
          },
          r.charAt(0).toUpperCase() + r.slice(1),
        ),
      ),
    ),
  );
}

function handleTune(card) {
  // P4 will fully implement the Studio wizard. For now, route to #studio + remember the card.
  store.setImmediate("last-prompt", card.id);
  store.setImmediate("studio-from-gallery", card.id);
  location.hash = `studio?p=${encodeURIComponent(card.id)}`;
}

function render() {
  const route = currentRoute();
  const root = appRoot();
  root.removeAttribute("aria-busy");
  root.replaceChildren();
  root.appendChild(header());

  if (route === "gallery") {
    root.appendChild(renderGallery({ onTune: handleTune }));
  } else if (route === "studio") {
    root.appendChild(renderStudio({ onExit: () => { location.hash = "gallery"; } }));
  } else {
    root.appendChild(renderExpress({ onExit: () => { location.hash = "gallery"; } }));
  }

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
    el(
      "a",
      {
        href: "https://github.com/yapweijun1996/Design-Prompt-Studio",
        rel: "noopener",
        target: "_blank",
      },
      "GitHub",
    ),
  );
}

// ─── Boot ───────────────────────────────────────────────────────────────────
function boot() {
  const savedTheme = store.get("prefs", {})?.theme;
  if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);

  window.addEventListener("hashchange", render);
  if (!location.hash) {
    location.hash = DEFAULT_ROUTE;
  }
  render();

  console.log(`[dps] v${VERSION} booted · route=${currentRoute()}`);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

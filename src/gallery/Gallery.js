// Gallery — the main landing view. Composes HeroStrip + FilterBar + tile grid.
//
// State held locally:
//   selectedId  — which prompt is in the hero strip
//   filter      — current filter object (query, purpose, style, tier)
//   tiles       — current filtered list
//
// Public surface: `renderGallery({ initialPromptId, onTune })`.

import { el, mount } from "../lib/dom.js";
import { store } from "../lib/store.js";
import { ALL_PROMPTS, searchPrompts, sortForBrowse, collapseToStyles, pickFeaturedPrompt, getPromptById, getFeaturedPrompts, getAvailableLocales, getAvailableMarkets } from "../data/prompts/index.js";
import { getLocale } from "../data/locales.js";
import { getMarket } from "../data/markets.js";
import { PAGE_TYPES } from "../data/taxonomy.js";
import { renderHeroStrip } from "./HeroStrip.js";
import { renderFilterBar } from "./FilterBar.js";
import { renderPromptTile } from "./PromptTile.js";

const STORAGE_KEY_LAST = "last-prompt";
const STORAGE_KEY_COPIES = "copies";

const TILE_PAGE_SIZE = 24;
// Every base style is generated in all page types, so each collapsed catalog card
// stands in for this many page-type layouts (advertised via the drill-in hint).
const LAYOUTS_PER_STYLE = Object.keys(PAGE_TYPES).length;

export function renderGallery({ initialPromptId = null, onTune }) {
  // ─── Initial state ────────────────────────────────────────────────────────
  const lastSeen = store.get(STORAGE_KEY_LAST, null);
  const hashPromptId = parseHashPrompt(location.hash);

  const initial = pickFeaturedPrompt({
    lastPromptId: initialPromptId || hashPromptId || lastSeen,
    hashPromptId,
  });

  const state = {
    selectedId: initial.id,
    filter: { query: "", purpose: null, category: null, style: null, locale: null, market: null, tier: null },
    visibleCount: TILE_PAGE_SIZE,
  };

  // Region/Culture + Market chips — only the values that actually tag a card, with
  // their display names. Passed to FilterBar so it stays decoupled from the catalog.
  const localeOptions = getAvailableLocales().map((id) => ({ id, name: getLocale(id).name }));
  const marketOptions = getAvailableMarkets().map((id) => ({ id, name: getMarket(id).name }));

  // ─── Containers ───────────────────────────────────────────────────────────
  const root = el("main", { id: "main", class: "gallery" });
  const introSlot = el("div", { class: "gallery__intro-slot" });
  const heroSlot = el("div", { class: "gallery__hero-slot" });
  const filterSlot = el("div", { class: "gallery__filter-slot" });
  const gridSlot = el("div", { class: "gallery__grid", role: "list", "aria-label": "Prompt gallery" });
  const moreSlot = el("div", { class: "gallery__more-slot" });
  const emptySlot = el("div", { class: "gallery__empty-slot" });

  root.append(introSlot, heroSlot, filterSlot, gridSlot, moreSlot, emptySlot);

  // ─── First-visit intro (U3) ────────────────────────────────────────────────
  // Slim one-liner explaining what this is, since the default route drops users
  // straight onto a raw prompt. Dismissible; the choice persists.
  function renderIntro() {
    introSlot.replaceChildren();
    if (store.get("intro-dismissed", false)) return;
    introSlot.appendChild(
      el(
        "div",
        { class: "gallery__intro", role: "note" },
        el(
          "p",
          { class: "gallery__intro-text" },
          el("strong", null, "Design Prompt Studio"),
          " — copy-paste prompts that make any LLM design a webpage. Pick one below, hit ",
          el("strong", null, "Copy"),
          ", paste into Claude, ChatGPT, or Google AI Studio. Or ",
          el("a", { class: "gallery__intro-link", href: "#studio" }, "build your own in Studio"),
          ".",
        ),
        el(
          "button",
          {
            type: "button",
            class: "gallery__intro-dismiss",
            "aria-label": "Dismiss intro",
            onClick: () => {
              store.setImmediate("intro-dismissed", true);
              renderIntro();
            },
          },
          "✕",
        ),
      ),
    );
  }

  // ─── Render helpers ───────────────────────────────────────────────────────
  function selectCard(card) {
    if (!card) return;
    state.selectedId = card.id;
    store.setImmediate(STORAGE_KEY_LAST, card.id);
    updateHashPrompt(card.id);
    renderHero();
    refreshGridActiveStates();
    // Scroll the hero into view smoothly so the user sees the swap
    window.requestAnimationFrame(() => {
      heroSlot.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Drill in from a collapsed catalog card → show that style's full page-type set.
  // Reuses the same filter path as the Style chip (renderFilters re-syncs the chip UI).
  function drillIntoStyle(styleId) {
    if (!styleId) return;
    state.filter = { ...state.filter, style: styleId };
    state.visibleCount = TILE_PAGE_SIZE;
    renderFilters();
    renderGrid();
    window.requestAnimationFrame(() => {
      gridSlot.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function pickRandom() {
    const featured = getFeaturedPrompts();
    let next;
    do {
      next = featured[Math.floor(Math.random() * featured.length)];
    } while (next.id === state.selectedId && featured.length > 1);
    selectCard(next);
  }

  function recordCopy(card) {
    const copies = store.get(STORAGE_KEY_COPIES, {});
    copies[card.id] = (copies[card.id] || 0) + 1;
    store.set(STORAGE_KEY_COPIES, copies);
  }

  function renderHero() {
    const card = getPromptById(state.selectedId) || ALL_PROMPTS[0];
    mount(
      heroSlot,
      renderHeroStrip({
        card,
        onTune: (c) => onTune?.(c),
        onRandom: pickRandom,
        onCopy: (c, ok) => { if (ok) recordCopy(c); },
      }),
    );
  }

  function renderFilters() {
    mount(
      filterSlot,
      renderFilterBar({
        initial: state.filter,
        locales: localeOptions,
        markets: marketOptions,
        onChange: (f) => {
          state.filter = f;
          state.visibleCount = TILE_PAGE_SIZE;
          renderGrid();
        },
      }),
    );
  }

  function refreshGridActiveStates() {
    for (const t of gridSlot.querySelectorAll("[data-id]")) {
      const active = t.getAttribute("data-id") === state.selectedId;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-pressed", active ? "true" : "false");
    }
  }

  function renderGrid() {
    const results = searchPrompts(state.filter);
    gridSlot.replaceChildren();
    emptySlot.replaceChildren();
    moreSlot.replaceChildren();

    if (results.length === 0) {
      emptySlot.appendChild(
        el(
          "div",
          { class: "gallery__empty" },
          el("p", null, "No prompts match those filters."),
          el(
            "button",
            { type: "button", class: "gallery__empty-cta", onClick: () => { state.filter = { query: "", purpose: null, category: null, style: null, locale: null, market: null, tier: null }; renderFilters(); renderGrid(); } },
            "Clear filters",
          ),
        ),
      );
      return;
    }

    // Curated pinned first, then standard interleaved so consecutive cards differ
    // by style (premium-first, landing before 404) — see sortForBrowse.
    // Default view = one-card-per-style catalog; picking a specific style expands to
    // that style's full page-type set (see collapseToStyles).
    let ordered = sortForBrowse(results);
    const collapsed = !state.filter.style;
    if (collapsed) ordered = collapseToStyles(ordered);
    const visible = ordered.slice(0, state.visibleCount);
    for (const card of visible) {
      const tile = renderPromptTile({
        card,
        isActive: card.id === state.selectedId,
        onSelect: (c) => selectCard(c),
        onQuickCopy: (c, ok) => { if (ok) recordCopy(c); },
        // Collapsed catalog: each standard card stands in for a whole style — offer a
        // one-click drill-in to its full set of page-type layouts.
        layoutCount: collapsed && card.tier !== "curated" ? LAYOUTS_PER_STYLE : null,
        onDrillIn: drillIntoStyle,
      });
      gridSlot.appendChild(tile);
    }

    if (ordered.length > visible.length) {
      moreSlot.appendChild(
        el(
          "button",
          {
            class: "gallery__more-btn",
            type: "button",
            onClick: () => {
              state.visibleCount += TILE_PAGE_SIZE;
              renderGrid();
            },
          },
          `Show more · ${ordered.length - visible.length} remaining`,
        ),
      );
    }

    // Result count aria-live
    let countLabel = root.querySelector(".gallery__count");
    if (!countLabel) {
      countLabel = el("p", { class: "gallery__count", "aria-live": "polite" });
      filterSlot.appendChild(countLabel);
    }
    countLabel.textContent = `${ordered.length} prompt${ordered.length === 1 ? "" : "s"}`;
  }

  // ─── Initial paint ────────────────────────────────────────────────────────
  renderIntro();
  renderHero();
  renderFilters();
  renderGrid();

  return root;
}

// ─── Hash helpers ───────────────────────────────────────────────────────────
function parseHashPrompt(hash) {
  // Supports #gallery?p=<id> or #gallery/p/<id> patterns
  const m = hash.match(/[?&]p=([^&]+)/);
  if (m) return decodeURIComponent(m[1]);
  return null;
}

function updateHashPrompt(id) {
  const url = new URL(location.href);
  // Keep the route prefix; add/replace ?p=
  const base = location.hash.replace(/^#/, "").split("?")[0] || "gallery";
  url.hash = `${base}?p=${encodeURIComponent(id)}`;
  history.replaceState(null, "", url.toString());
}

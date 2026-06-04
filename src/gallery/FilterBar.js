// FilterBar — sticky filter strip below the hero.
// Search input + purpose/style/page-type filters.
// Emits onChange(filterState) on any change.

import { el } from "../lib/dom.js";
import { PURPOSE_BUCKETS } from "../data/taxonomy.js";
import { STYLE_PRESETS } from "../data/styles/index.js";
import { STYLE_CATEGORIES, STYLE_CATEGORY_MAP, categoryCount, DEFAULT_HIDDEN_CATEGORY } from "../data/styles/categories.js";

export function renderFilterBar({ initial = {}, onChange, locales = [], markets = [] }) {
  const state = {
    query: initial.query || "",
    purpose: initial.purpose || null,
    category: initial.category || null,
    style: initial.style || null,
    locale: initial.locale || null,
    market: initial.market || null,
    tier: initial.tier || null,
  };

  const root = el("section", { class: "filter-bar", role: "search", "aria-label": "Filter prompts" });

  // Search input
  const searchInput = el("input", {
    class: "filter-bar__search",
    type: "search",
    id: "gallery-search",
    name: "gallery-search",
    placeholder: "Search by name, industry, tone…",
    value: state.query,
    "aria-label": "Search prompts",
  });
  searchInput.addEventListener("input", (e) => {
    state.query = e.target.value;
    onChange?.({ ...state });
  });

  const searchWrap = el(
    "div",
    { class: "filter-bar__search-wrap" },
    el("span", { class: "filter-bar__search-icon", "aria-hidden": "true" }, "🔍"),
    searchInput,
  );

  // Style chips filtered by selected category. The unfiltered Gallery excludes
  // experimental/retro styles; those surface via the Experimental category.
  function stylesForCategory(catId) {
    const all = Object.values(STYLE_PRESETS);
    const filtered = catId
      ? all.filter((s) => STYLE_CATEGORY_MAP[s.id] === catId)
      : all.filter((s) => STYLE_CATEGORY_MAP[s.id] !== DEFAULT_HIDDEN_CATEGORY);
    return [
      { id: null, name: "All" },
      ...filtered.map((s) => ({ id: s.id, name: s.name })),
    ];
  }

  // Stable wrapper per group — we repaint their *contents* so the cascade keeps
  // working across repeated interactions (replaceWith on a stale node is a no-op).
  const purposeGroup = el("div");
  const categoryGroup = el("div");
  const styleGroup = el("div");
  const localeGroup = el("div"); // Region/Culture axis — only painted if locales exist
  const marketGroup = el("div"); // Market/Region axis — only painted if markets exist
  const tierGroup = el("div");

  // U2: the flat style list is very large. By default (no category, no style
  // picked) show a handful with a "+N more" expander so the filter doesn't wall
  // off the prompt tiles — especially on mobile. Picking a Category collapses
  // the list naturally, so we only cap the unfiltered view.
  const STYLE_CHIP_LIMIT = 14;
  let styleExpanded = false;

  function paint() {
    fillChipGroup(purposeGroup, {
      label: "Purpose",
      options: [
        { id: null, name: "All" },
        ...Object.values(PURPOSE_BUCKETS).map((b) => ({ id: b.id, name: b.name })),
      ],
      selected: state.purpose,
      onSelect: (id) => { state.purpose = id; onChange?.({ ...state }); paint(); },
    });

    // Category (primary) — cascades into the style group below.
    fillChipGroup(categoryGroup, {
      label: "Category",
      options: [
        { id: null, name: "All" },
        ...Object.values(STYLE_CATEGORIES).map((c) => ({ id: c.id, name: `${c.name} · ${categoryCount(c.id)}` })),
      ],
      selected: state.category,
      onSelect: (id) => { state.category = id; state.style = null; onChange?.({ ...state }); paint(); },
    });

    const styleOpts = stylesForCategory(state.category);
    // Collapse only the big unfiltered list when nothing is picked yet.
    const collapsible = !state.category && !state.style && styleOpts.length > STYLE_CHIP_LIMIT;
    fillChipGroup(styleGroup, {
      label: "Style",
      options: styleOpts,
      selected: state.style,
      onSelect: (id) => { state.style = id; onChange?.({ ...state }); paint(); },
      limit: collapsible && !styleExpanded ? STYLE_CHIP_LIMIT : null,
      onToggle: collapsible ? () => { styleExpanded = !styleExpanded; paint(); } : null,
    });

    // Culture (Region/Culture axis) — only shown when the catalog has localized
    // cards, so the chip never yields zero results. "All" = no locale filter.
    if (locales.length) {
      fillChipGroup(localeGroup, {
        label: "Culture",
        options: [{ id: null, name: "All" }, ...locales],
        selected: state.locale,
        onSelect: (id) => { state.locale = id; onChange?.({ ...state }); paint(); },
      });
    }

    // Market (Market/Region axis) — only shown when the catalog has market-tagged cards.
    if (markets.length) {
      fillChipGroup(marketGroup, {
        label: "Market",
        options: [{ id: null, name: "All" }, ...markets],
        selected: state.market,
        onSelect: (id) => { state.market = id; onChange?.({ ...state }); paint(); },
      });
    }

    fillChipGroup(tierGroup, {
      label: "Tier",
      options: [
        { id: null, name: "All" },
        { id: "curated", name: "★ Curated" },
        { id: "standard", name: "Standard" },
      ],
      selected: state.tier,
      onSelect: (id) => { state.tier = id; onChange?.({ ...state }); paint(); },
    });
  }

  paint();

  root.append(
    searchWrap,
    el("div", { class: "filter-bar__chips" }, purposeGroup, categoryGroup, styleGroup, localeGroup, marketGroup, tierGroup),
  );

  return root;
}

// Repaints `host` in place with a fresh `.chip-group`, preserving the host node
// so closures over it stay valid across re-renders. When `limit`/`onToggle` are
// given the group is collapsible: it shows `limit` chips + a "+N more" toggle.
function fillChipGroup(host, { label, options, selected, onSelect, limit = null, onToggle = null }) {
  const wrap = el(
    "div",
    { class: "chip-group", role: "group", "aria-label": label },
    el("span", { class: "chip-group__label" }, label),
  );
  const shown = limit ? options.slice(0, limit) : options;
  for (const opt of shown) {
    const isActive = opt.id === selected;
    wrap.appendChild(
      el(
        "button",
        {
          class: "chip" + (isActive ? " is-active" : ""),
          type: "button",
          "aria-pressed": isActive ? "true" : "false",
          onClick: () => onSelect?.(opt.id),
        },
        opt.name,
      ),
    );
  }
  if (onToggle) {
    const hidden = options.length - shown.length;
    wrap.appendChild(
      el(
        "button",
        {
          class: "chip chip--toggle",
          type: "button",
          "aria-expanded": hidden > 0 ? "false" : "true",
          onClick: onToggle,
        },
        hidden > 0 ? `+${hidden} more` : "Show fewer",
      ),
    );
  }
  host.replaceChildren(wrap);
  return host;
}

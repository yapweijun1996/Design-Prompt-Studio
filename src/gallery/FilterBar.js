// FilterBar — sticky filter strip below the hero.
// Search input + purpose/style/page-type filters.
// Emits onChange(filterState) on any change.

import { el } from "../lib/dom.js";
import { PURPOSE_BUCKETS } from "../data/taxonomy.js";
import { STYLE_PRESETS } from "../data/styles/index.js";
import { STYLE_CATEGORIES, STYLE_CATEGORY_MAP, categoryCount } from "../data/styles/categories.js";

export function renderFilterBar({ initial = {}, onChange }) {
  const state = {
    query: initial.query || "",
    purpose: initial.purpose || null,
    category: initial.category || null,
    style: initial.style || null,
    tier: initial.tier || null,
  };

  const root = el("section", { class: "filter-bar", role: "search", "aria-label": "Filter prompts" });

  // Search input
  const searchInput = el("input", {
    class: "filter-bar__search",
    type: "search",
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

  // Chip groups
  const purposeChips = renderChipGroup({
    label: "Purpose",
    options: [
      { id: null, name: "All" },
      ...Object.values(PURPOSE_BUCKETS).map((b) => ({ id: b.id, name: b.name })),
    ],
    selected: state.purpose,
    onSelect: (id) => {
      state.purpose = id;
      onChange?.({ ...state });
      refresh();
    },
  });

  // Category chips (primary — cascades to style chips below)
  const categoryChips = renderChipGroup({
    label: "Category",
    options: [
      { id: null, name: "All" },
      ...Object.values(STYLE_CATEGORIES).map((c) => ({ id: c.id, name: `${c.name} · ${categoryCount(c.id)}` })),
    ],
    selected: state.category,
    onSelect: (id) => {
      state.category = id;
      state.style = null; // reset secondary when category changes
      onChange?.({ ...state });
      refresh();
    },
  });

  // Style chips filtered by selected category. Renders the FULL list when
  // no category is picked, so existing power-users keep their flat browse.
  function stylesForCategory(catId) {
    const all = Object.values(STYLE_PRESETS);
    const filtered = catId ? all.filter((s) => STYLE_CATEGORY_MAP[s.id] === catId) : all;
    return [
      { id: null, name: "All" },
      ...filtered.map((s) => ({ id: s.id, name: s.name })),
    ];
  }

  const styleChips = renderChipGroup({
    label: "Style",
    options: stylesForCategory(state.category),
    selected: state.style,
    onSelect: (id) => {
      state.style = id;
      onChange?.({ ...state });
      refresh();
    },
  });

  const tierChips = renderChipGroup({
    label: "Tier",
    options: [
      { id: null, name: "All" },
      { id: "curated", name: "★ Curated" },
      { id: "standard", name: "Standard" },
    ],
    selected: state.tier,
    onSelect: (id) => {
      state.tier = id;
      onChange?.({ ...state });
      refresh();
    },
  });

  function refresh() {
    const purposeOpts = Object.values(PURPOSE_BUCKETS).map((b) => ({ id: b.id, name: b.name }));
    const categoryOpts = Object.values(STYLE_CATEGORIES).map((c) => ({ id: c.id, name: `${c.name} · ${categoryCount(c.id)}` }));
    const tierOpts = [{ id: "curated", name: "★ Curated" }, { id: "standard", name: "Standard" }];
    // stylesForCategory already returns the leading "All" option; pass through wrapped: false
    const styleOpts = stylesForCategory(state.category).slice(1); // drop dup "All"; rebuiltGroup re-prepends it

    purposeChips.replaceWith(rebuiltGroup("Purpose", purposeOpts, state.purpose, (id) => { state.purpose = id; onChange?.({ ...state }); refresh(); }));
    categoryChips.replaceWith(rebuiltGroup("Category", categoryOpts, state.category, (id) => { state.category = id; state.style = null; onChange?.({ ...state }); refresh(); }));
    styleChips.replaceWith(rebuiltGroup("Style", styleOpts, state.style, (id) => { state.style = id; onChange?.({ ...state }); refresh(); }));
    tierChips.replaceWith(rebuiltGroup("Tier", tierOpts, state.tier, (id) => { state.tier = id; onChange?.({ ...state }); refresh(); }));
  }

  function rebuiltGroup(label, options, selected, onSelect) {
    return renderChipGroup({
      label,
      options: [{ id: null, name: "All" }, ...options],
      selected,
      onSelect,
    });
  }

  root.append(
    searchWrap,
    el("div", { class: "filter-bar__chips" }, purposeChips, styleChips, tierChips),
  );

  return root;
}

function renderChipGroup({ label, options, selected, onSelect }) {
  const wrap = el(
    "div",
    { class: "chip-group", role: "group", "aria-label": label },
    el("span", { class: "chip-group__label" }, label),
  );
  for (const opt of options) {
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
  return wrap;
}

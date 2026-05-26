// FilterBar — sticky filter strip below the hero.
// Search input + purpose/style/page-type filters.
// Emits onChange(filterState) on any change.

import { el } from "../lib/dom.js";
import { PURPOSE_BUCKETS } from "../data/taxonomy.js";
import { STYLE_PRESETS } from "../data/styles/index.js";

export function renderFilterBar({ initial = {}, onChange }) {
  const state = {
    query: initial.query || "",
    purpose: initial.purpose || null,
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

  const styleChips = renderChipGroup({
    label: "Style",
    options: [
      { id: null, name: "All" },
      ...Object.values(STYLE_PRESETS).map((s) => ({ id: s.id, name: s.name })),
    ],
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
    purposeChips.replaceWith(rebuiltGroup("Purpose", Object.values(PURPOSE_BUCKETS).map((b) => ({ id: b.id, name: b.name })), state.purpose, (id) => { state.purpose = id; onChange?.({ ...state }); refresh(); }));
    styleChips.replaceWith(rebuiltGroup("Style", Object.values(STYLE_PRESETS).map((s) => ({ id: s.id, name: s.name })), state.style, (id) => { state.style = id; onChange?.({ ...state }); refresh(); }));
    tierChips.replaceWith(rebuiltGroup("Tier", [ { id: "curated", name: "★ Curated" }, { id: "standard", name: "Standard" } ], state.tier, (id) => { state.tier = id; onChange?.({ ...state }); refresh(); }));
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

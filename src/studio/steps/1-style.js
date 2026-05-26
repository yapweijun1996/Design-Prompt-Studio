// Step 1 — Style & feel
// Picker: 90 variant cards (10 base styles × 9 moods). Search + base-style filter chips.
// Clicking a card sets state.style + density + drama + motion together.
// Modifier radio rows remain available below for power-users who want to tune off-mood.

import { el } from "../../lib/dom.js";
import { STYLE_PRESETS, STYLE_LIST } from "../../data/styles/index.js";
import { STYLE_VARIANTS, findVariantForState } from "../../data/style-variants.js";
import { DENSITY_LEVELS, DRAMA_LEVELS, MOTION_LEVELS } from "../../data/modifiers.js";
import { MOOD_PRESETS } from "../../data/moods.js";
import { STYLE_CATEGORIES, STYLE_CATEGORY_MAP, categoryCount } from "../../data/styles/categories.js";

export function renderStep1({ state, onStateChange }) {
  const root = el("section", { class: "step step--style" });

  // ─── State for the filter UI (local — not persisted) ─────────────────────
  const ui = {
    query: "",
    categoryFilter: null, // null = all categories
    baseFilter: null, // null = all bases
    moodFilter: null,
  };

  // ─── Filter bar ──────────────────────────────────────────────────────────
  const filterBar = el("div", { class: "step__variant-filter" });
  const searchInput = el("input", {
    type: "search",
    class: "step__variant-search",
    placeholder: `Search ${STYLE_VARIANTS.length} style presets…`,
    "aria-label": "Search style presets",
  });
  searchInput.addEventListener("input", (e) => {
    ui.query = e.target.value;
    rebuildCards();
  });

  // Category chip row (primary — cascades to base chips)
  const categoryChips = el(
    "div",
    { class: "step__variant-chips step__variant-chips--category", role: "radiogroup", "aria-label": "Filter by category" },
    chip("All", null, () => { ui.categoryFilter = null; ui.baseFilter = null; rebuildAll(); }, ui.categoryFilter === null),
    ...Object.values(STYLE_CATEGORIES).map((c) =>
      chip(`${c.name} · ${categoryCount(c.id)}`, c.id, () => {
        ui.categoryFilter = c.id;
        ui.baseFilter = null; // reset secondary base filter when category changes
        rebuildAll();
      }, ui.categoryFilter === c.id),
    ),
  );

  const baseChips = el(
    "div",
    { class: "step__variant-chips", role: "radiogroup", "aria-label": "Filter by base style" },
    ...basesForCategory(ui.categoryFilter, ui.baseFilter),
  );

  const moodChips = el(
    "div",
    { class: "step__variant-chips", role: "radiogroup", "aria-label": "Filter by mood" },
    chip("All moods", null, () => { ui.moodFilter = null; rebuildAll(); }, ui.moodFilter === null),
    ...MOOD_PRESETS.map((m) =>
      chip(m.name, m.id, () => { ui.moodFilter = m.id; rebuildAll(); }, ui.moodFilter === m.id),
    ),
  );

  filterBar.append(searchInput, categoryChips, baseChips, moodChips);

  // Helper: build base-style chips filtered by current category.
  // Returns array of chip elements (with leading "All bases" chip).
  function basesForCategory(catId, selected) {
    const stylesInCat = STYLE_LIST.filter((s) => !catId || STYLE_CATEGORY_MAP[s.id] === catId);
    return [
      chip("All bases", null, () => { ui.baseFilter = null; rebuildAll(); }, selected === null),
      ...stylesInCat.map((s) =>
        chip(s.name, s.id, () => { ui.baseFilter = s.id; rebuildAll(); }, selected === s.id),
      ),
    ];
  }

  // ─── Variant grid ────────────────────────────────────────────────────────
  const grid = el("div", { class: "step__variant-grid", role: "radiogroup", "aria-label": "Style preset" });
  const countLine = el("p", { class: "step__variant-count", "aria-live": "polite" });

  function applyVariant(variant) {
    state.style = variant.baseStyle;
    state.density = variant.density;
    state.drama = variant.drama;
    state.motion = variant.motion;
    onStateChange?.();
  }

  function rebuildCards() {
    const q = ui.query.trim().toLowerCase();
    const visible = STYLE_VARIANTS.filter((v) => {
      if (ui.categoryFilter && STYLE_CATEGORY_MAP[v.baseStyle] !== ui.categoryFilter) return false;
      if (ui.baseFilter && v.baseStyle !== ui.baseFilter) return false;
      if (ui.moodFilter && v.moodId !== ui.moodFilter) return false;
      if (q) {
        const hay = (v.name + " " + v.tag + " " + (v.feel || "")).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    grid.replaceChildren();
    countLine.textContent = `${visible.length} of ${STYLE_VARIANTS.length} variants`;

    if (visible.length === 0) {
      grid.appendChild(el("p", { class: "step__variant-empty" }, "No matches. Clear filters to see all 90."));
      return;
    }

    const activeVariant = findVariantForState(state);
    const activeId = activeVariant?.id;

    for (const v of visible) {
      const isActive = v.id === activeId;
      grid.appendChild(
        el(
          "label",
          {
            class: "step__variant-card" + (isActive ? " is-active" : ""),
            tabindex: "0",
            role: "radio",
            "aria-checked": isActive ? "true" : "false",
            onClick: () => applyVariant(v),
            onKeydown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                applyVariant(v);
              }
            },
          },
          el("div", {
            class: "step__variant-preview tile__preview tile__preview--" + (v.tile || "tile-mono"),
            "aria-hidden": "true",
            html: v.tileHTML || "",
          }),
          el(
            "div",
            { class: "step__variant-info" },
            el("div", { class: "step__variant-name" }, v.name),
            el("div", { class: "step__variant-mood-tag" }, v.tag),
          ),
        ),
      );
    }
  }

  function rebuildAll() {
    // Category chips (primary)
    const categoryOptions = [
      { id: null, name: "All" },
      ...Object.values(STYLE_CATEGORIES).map((c) => ({ id: c.id, name: `${c.name} · ${categoryCount(c.id)}` })),
    ];
    rebuildChip(categoryChips, categoryOptions, ui.categoryFilter, (id) => {
      ui.categoryFilter = id;
      ui.baseFilter = null; // reset secondary when category changes
      rebuildAll();
    });

    // Base chips (cascade by category)
    baseChips.replaceChildren(...basesForCategory(ui.categoryFilter, ui.baseFilter));

    // Mood chips (unchanged)
    rebuildChip(moodChips, [{ id: null, name: "All moods" }, ...MOOD_PRESETS.map((m) => ({ id: m.id, name: m.name }))], ui.moodFilter, (id) => { ui.moodFilter = id; rebuildAll(); });

    rebuildCards();
  }

  function rebuildChip(parent, options, selected, onSelect) {
    parent.replaceChildren(...options.map((o) => chip(o.name, o.id, () => onSelect(o.id), o.id === selected)));
  }

  // ─── Initial paint ───────────────────────────────────────────────────────
  root.append(
    sectionLabel(`Style preset · ${STYLE_VARIANTS.length} variants`, "10 base styles × 9 moods"),
    filterBar,
    countLine,
    grid,
  );

  // Modifier radio rows (kept for power users who want fine-tune off-mood)
  const advancedToggle = el(
    "details",
    { class: "step__advanced" },
    el("summary", { class: "step__advanced-summary" }, "Fine-tune modifiers (advanced)"),
    sectionLabel("Density", ""),
    radioRow(DENSITY_LEVELS, state.density, (id) => { state.density = id; onStateChange?.(); rebuildCards(); }),
    sectionLabel("Drama", ""),
    radioRow(DRAMA_LEVELS, state.drama, (id) => { state.drama = id; onStateChange?.(); rebuildCards(); }),
    sectionLabel("Motion", ""),
    radioRow(MOTION_LEVELS, state.motion, (id) => { state.motion = id; onStateChange?.(); rebuildCards(); }),
  );
  root.appendChild(advancedToggle);

  rebuildCards();
  return root;
}

// ─── Helpers ────────────────────────────────────────────────────────────────
function sectionLabel(title, hint) {
  return el(
    "div",
    { class: "step__section-label" },
    el("span", null, title),
    el("span", { class: "step__section-hint" }, hint),
  );
}

function chip(label, id, onSelect, isActive) {
  return el(
    "button",
    {
      type: "button",
      class: "chip" + (isActive ? " is-active" : ""),
      role: "radio",
      "aria-checked": isActive ? "true" : "false",
      onClick: onSelect,
    },
    label,
  );
}

function radioRow(items, selected, onSelect) {
  const row = el("div", { class: "radio-row", role: "radiogroup" });
  for (const item of items) {
    const isActive = item.id === selected;
    row.appendChild(
      el(
        "button",
        {
          type: "button",
          class: "radio-row__btn" + (isActive ? " is-active" : ""),
          role: "radio",
          "aria-checked": isActive ? "true" : "false",
          onClick: () => onSelect(item.id),
        },
        el("span", { class: "radio-row__name" }, item.name),
        item.desc ? el("span", { class: "radio-row__desc" }, item.desc) : null,
      ),
    );
  }
  return row;
}

// Eliminate unused import lint complaints — these are referenced via imports above.
void STYLE_PRESETS;

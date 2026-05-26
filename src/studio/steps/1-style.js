// Step 1 — Style & feel
// Choose: style preset (5 cards w/ live preview), density, drama, motion modifiers.

import { el } from "../../lib/dom.js";
import { STYLE_PRESETS, STYLE_LIST } from "../../data/styles/index.js";
import { DENSITY_LEVELS, DRAMA_LEVELS, MOTION_LEVELS } from "../../data/modifiers.js";

export function renderStep1({ state, onStateChange }) {
  const root = el("section", { class: "step step--style" });

  // ─── Style preset cards ──────────────────────────────────────────────────
  const cards = el("div", { class: "step__cards", role: "radiogroup", "aria-label": "Style preset" });
  for (const preset of STYLE_LIST) {
    const isActive = state.style === preset.id;
    cards.appendChild(
      el(
        "label",
        {
          class: "step__card" + (isActive ? " is-active" : ""),
          tabindex: "0",
          role: "radio",
          "aria-checked": isActive ? "true" : "false",
          onClick: () => {
            state.style = preset.id;
            onStateChange?.();
          },
          onKeydown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              state.style = preset.id;
              onStateChange?.();
            }
          },
        },
        el("div", {
          class: "step__card-preview tile__preview tile__preview--" + preset.tile,
          "aria-hidden": "true",
          html: preset.tileHTML,
        }),
        el(
          "div",
          { class: "step__card-info" },
          el("div", { class: "step__card-name" }, preset.name),
          el("div", { class: "step__card-tag" }, preset.tag),
          el("div", { class: "step__card-desc" }, preset.desc),
          preset.feel ? el("div", { class: "step__card-feel" }, `"${preset.feel}"`) : null,
        ),
      ),
    );
  }

  root.append(
    sectionLabel("Style preset", `${STYLE_LIST.length} options`),
    cards,
  );

  // ─── Modifiers ────────────────────────────────────────────────────────────
  root.append(
    sectionLabel("Density", "Cross-cutting"),
    renderRadioRow(DENSITY_LEVELS, state.density, (id) => { state.density = id; onStateChange?.(); }),
  );
  root.append(
    sectionLabel("Drama", "Cross-cutting"),
    renderRadioRow(DRAMA_LEVELS, state.drama, (id) => { state.drama = id; onStateChange?.(); }),
  );
  root.append(
    sectionLabel("Motion", "Optional override"),
    renderRadioRow(MOTION_LEVELS, state.motion, (id) => { state.motion = id; onStateChange?.(); }),
  );

  return root;
}

function sectionLabel(title, hint) {
  return el(
    "div",
    { class: "step__section-label" },
    el("span", null, title),
    el("span", { class: "step__section-hint" }, hint),
  );
}

function renderRadioRow(items, selected, onSelect) {
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

// Re-export for the style-card preview tile referenced from STYLE_PRESETS keys
void STYLE_PRESETS;

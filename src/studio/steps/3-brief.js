// Step 3 — Brief
// 7 structured fields. Required: name, audience, tone. Optional: industry, references,
// must-include, must-avoid. Inputs debounce-save via store wrapper.

import { el } from "../../lib/dom.js";
import { suggestIndustries } from "../../data/industries.js";

const FIELDS = [
  { key: "name",       label: "Product / company name", placeholder: "e.g. HORLOGE",       required: true,  type: "input" },
  { key: "industry",   label: "Industry / category",    placeholder: "e.g. Swiss watch subscription", required: false, type: "input" },
  { key: "audience",   label: "Audience",               placeholder: "Who are they? Age range? What do they value?", required: true,  type: "textarea", full: true },
  { key: "tone",       label: "Tone / voice",           placeholder: "5-7 keywords, comma-separated", required: true, type: "input", full: true },
  { key: "references", label: "Real-world references",  placeholder: "Brands / publications / spaces — not websites", required: false, type: "input", full: true },
  { key: "context",    label: "Must include",           placeholder: "Copy, sections, hero word, anything non-negotiable", required: false, type: "textarea", full: true },
  { key: "avoid",      label: "Must avoid",             placeholder: "Anti-patterns, forbidden words, aesthetics to dodge", required: false, type: "input", full: true },
];

export function renderStep3({ state, onStateChange }) {
  const root = el("section", { class: "step step--brief" });

  if (!state.brief) state.brief = {};

  root.append(sectionLabel("Brief", "Structured beats prose"));

  const grid = el("div", { class: "step__grid" });
  for (const field of FIELDS) {
    const wrap = el(
      "div",
      { class: "step__field" + (field.full ? " step__field--full" : "") },
      el(
        "label",
        { class: "step__label", "for": `brief-${field.key}` },
        field.label,
        field.required ? el("span", { class: "step__label-req" }, " (required)") : null,
      ),
    );

    if (field.type === "textarea") {
      const ta = el("textarea", {
        id: `brief-${field.key}`,
        class: "step__textarea",
        placeholder: field.placeholder,
        rows: "4",
      });
      ta.value = state.brief[field.key] || "";
      ta.addEventListener("input", (e) => {
        state.brief[field.key] = e.target.value;
        onStateChange?.();
      });
      wrap.appendChild(ta);
    } else {
      const input = el("input", {
        id: `brief-${field.key}`,
        class: "step__input",
        type: "text",
        placeholder: field.placeholder,
      });
      input.value = state.brief[field.key] || "";
      input.addEventListener("input", (e) => {
        state.brief[field.key] = e.target.value;
        onStateChange?.();
      });
      wrap.appendChild(input);
    }
    grid.appendChild(wrap);
  }
  root.appendChild(grid);

  // Tip about empty brief
  const hasBrief = FIELDS.some((f) => state.brief[f.key]);
  if (!hasBrief) {
    root.appendChild(
      el(
        "p",
        { class: "step__tip" },
        "💡 A blank brief produces generic output. Fill in at least name, audience, and tone for sharper results.",
      ),
    );
  }

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

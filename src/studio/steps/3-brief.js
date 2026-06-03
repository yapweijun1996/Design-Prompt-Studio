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

  // Validation errors flagged by the Wizard when the user tried to advance with
  // required fields empty. Shown inline; cleared as the user types.
  const errorKeys = new Set(state.meta?.validationErrors?.brief || []);

  root.append(sectionLabel("Brief", "Structured beats prose"));

  const grid = el("div", { class: "step__grid" });
  for (const field of FIELDS) {
    const hasError = errorKeys.has(field.key);
    const fieldId = `brief-${field.key}`;
    const errId = `${fieldId}-err`;
    const wrap = el(
      "div",
      { class: "step__field" + (field.full ? " step__field--full" : "") + (hasError ? " step__field--error" : "") },
      el(
        "label",
        { class: "step__label", "for": fieldId },
        field.label,
        field.required ? el("span", { class: "step__label-req" }, " (required)") : null,
      ),
    );

    const sharedAttrs = hasError ? { "aria-invalid": "true", "aria-describedby": errId } : {};

    if (field.type === "textarea") {
      const ta = el("textarea", {
        id: fieldId,
        class: "step__textarea",
        placeholder: field.placeholder,
        rows: "4",
        ...sharedAttrs,
      });
      ta.value = state.brief[field.key] || "";
      ta.addEventListener("input", (e) => {
        state.brief[field.key] = e.target.value;
        clearFieldError(state, wrap, field, e.target, errId);
        onStateChange?.({ repaint: false }); // keep focus while typing
      });
      wrap.appendChild(ta);
    } else {
      const input = el("input", {
        id: fieldId,
        class: "step__input",
        type: "text",
        placeholder: field.placeholder,
        ...sharedAttrs,
      });
      input.value = state.brief[field.key] || "";

      // Assigned only for the industry field; declared here so the input listener
      // can call it (block-scoped function decls would not be visible to it).
      let refreshIndustryChips = null;

      input.addEventListener("input", (e) => {
        state.brief[field.key] = e.target.value;
        clearFieldError(state, wrap, field, e.target, errId);
        refreshIndustryChips?.(); // industry field: update chips in place (no full repaint)
        onStateChange?.({ repaint: false }); // keep focus while typing

      });
      wrap.appendChild(input);

      // Industry is the second taxonomy axis: offer quick-pick chips sourced from the
      // selected page type's commonIndustries (docs/RESEARCH-REVIEW.md § 3a).
      if (field.key === "industry") {
        const chipRow = el("div", { class: "step__industry-chips", role: "group", "aria-label": "Suggested industries" });
        wrap.appendChild(chipRow);
        refreshIndustryChips = () => {
          chipRow.replaceChildren();
          const current = (state.brief.industry || "").trim().toLowerCase();
          for (const s of suggestIndustries(state.pageType)) {
            const isActive = current === s.label.toLowerCase();
            chipRow.appendChild(
              el(
                "button",
                {
                  type: "button",
                  class: "chip chip--sm" + (isActive ? " is-active" : ""),
                  "aria-pressed": isActive ? "true" : "false",
                  onClick: () => {
                    state.brief.industry = s.label;
                    input.value = s.label;
                    refreshIndustryChips();
                    onStateChange?.();
                  },
                },
                s.label,
              ),
            );
          }
        };
        refreshIndustryChips();
      }
    }

    if (hasError) {
      wrap.appendChild(el("p", { id: errId, class: "step__field-err", role: "alert" }, `${field.label} is required.`));
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

// Validate required brief fields. Returns { ok, invalidKeys, firstInvalidId }.
// Used by the Wizard to gate forward navigation (B3).
export function validateBrief(state) {
  const brief = state.brief || {};
  const invalidKeys = FIELDS
    .filter((f) => f.required)
    .filter((f) => !String(brief[f.key] || "").trim())
    .map((f) => f.key);
  return {
    ok: invalidKeys.length === 0,
    invalidKeys,
    firstInvalidId: invalidKeys.length ? `brief-${invalidKeys[0]}` : null,
  };
}

// Clear a field's error styling inline (no full repaint → focus preserved) once
// the user has typed something into a previously-invalid required field.
function clearFieldError(state, wrap, field, target, errId) {
  if (!wrap.classList.contains("step__field--error")) return;
  if (!String(target.value || "").trim()) return;
  wrap.classList.remove("step__field--error");
  target.removeAttribute("aria-invalid");
  target.removeAttribute("aria-describedby");
  wrap.querySelector("#" + CSS.escape(errId))?.remove();
  const list = state.meta?.validationErrors?.brief;
  if (Array.isArray(list)) {
    const i = list.indexOf(field.key);
    if (i >= 0) list.splice(i, 1);
  }
}

function sectionLabel(title, hint) {
  return el(
    "div",
    { class: "step__section-label" },
    el("span", null, title),
    el("span", { class: "step__section-hint" }, hint),
  );
}

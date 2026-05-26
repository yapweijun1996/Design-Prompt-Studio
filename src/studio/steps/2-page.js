// Step 2 — Page basics
// Choose: purpose (6 buckets) → page type (filtered) → sections (checklist).

import { el } from "../../lib/dom.js";
import { PURPOSE_BUCKETS, PAGE_TYPES, PAGE_TYPES_BY_PURPOSE } from "../../data/taxonomy.js";

export function renderStep2({ state, onStateChange }) {
  const root = el("section", { class: "step step--page" });

  // Derive initial purpose from current pageType if not set
  if (!state.purpose && state.pageType && PAGE_TYPES[state.pageType]) {
    state.purpose = PAGE_TYPES[state.pageType].purpose;
  }
  if (!state.purpose) state.purpose = "marketing";

  // ─── Purpose chips ───────────────────────────────────────────────────────
  const purposeChips = el("div", { class: "step__chips", role: "radiogroup", "aria-label": "Purpose" });
  for (const bucket of Object.values(PURPOSE_BUCKETS)) {
    const isActive = state.purpose === bucket.id;
    purposeChips.appendChild(
      el(
        "button",
        {
          type: "button",
          class: "chip chip--lg" + (isActive ? " is-active" : ""),
          role: "radio",
          "aria-checked": isActive ? "true" : "false",
          onClick: () => {
            state.purpose = bucket.id;
            // Reset pageType if it's not in the new purpose
            const allowed = PAGE_TYPES_BY_PURPOSE[bucket.id] || [];
            if (!allowed.find((t) => t.id === state.pageType)) {
              state.pageType = allowed[0]?.id || "landing";
              state.sections = new Set(PAGE_TYPES[state.pageType]?.sections || []);
            }
            onStateChange?.();
          },
        },
        bucket.name,
      ),
    );
  }
  root.append(sectionLabel("Purpose", "Top-level category"), purposeChips);

  // ─── Page type cards ─────────────────────────────────────────────────────
  const allowedTypes = PAGE_TYPES_BY_PURPOSE[state.purpose] || [];
  const typeCards = el("div", { class: "step__type-cards", role: "radiogroup", "aria-label": "Page type" });
  for (const type of allowedTypes) {
    const isActive = state.pageType === type.id;
    typeCards.appendChild(
      el(
        "button",
        {
          type: "button",
          class: "step__type-card" + (isActive ? " is-active" : ""),
          role: "radio",
          "aria-checked": isActive ? "true" : "false",
          onClick: () => {
            state.pageType = type.id;
            // Replace sections with the type's default set
            state.sections = new Set(type.sections);
            onStateChange?.();
          },
        },
        el("div", { class: "step__type-name" }, type.name),
        el("div", { class: "step__type-tagline" }, type.genericTagline),
      ),
    );
  }
  root.append(sectionLabel("Page type", `${allowedTypes.length} in this category`), typeCards);

  // ─── Sections checklist ──────────────────────────────────────────────────
  const sections = ensureSet(state.sections);
  state.sections = sections;
  const allSections = PAGE_TYPES[state.pageType]?.sections || [];
  const checks = el("div", { class: "step__checks" });
  for (const s of allSections) {
    const isChecked = sections.has(s);
    checks.appendChild(
      el(
        "label",
        {
          class: "step__check" + (isChecked ? " is-checked" : ""),
        },
        el("input", {
          type: "checkbox",
          checked: isChecked,
          onChange: (e) => {
            if (e.target.checked) sections.add(s);
            else sections.delete(s);
            onStateChange?.();
          },
        }),
        el("span", { class: "step__check-box", "aria-hidden": "true" }),
        el("span", { class: "step__check-label" }, s),
      ),
    );
  }
  root.append(sectionLabel("Sections", "Default set — edit as needed"), checks);

  return root;
}

function ensureSet(s) {
  if (s instanceof Set) return s;
  if (Array.isArray(s)) return new Set(s);
  return new Set();
}

function sectionLabel(title, hint) {
  return el(
    "div",
    { class: "step__section-label" },
    el("span", null, title),
    el("span", { class: "step__section-hint" }, hint),
  );
}

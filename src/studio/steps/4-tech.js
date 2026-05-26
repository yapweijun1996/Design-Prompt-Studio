// Step 4 — Tech
// Stack (html / react / next), output mode, prompt mode, and Libraries picker.

import { el } from "../../lib/dom.js";
import { LIBRARIES, LIBRARY_CATEGORIES, getLibrariesByStack } from "../../data/libraries.js";

const STACKS = [
  { id: "html",  name: "Vanilla HTML",    desc: "Single self-contained .html file" },
  { id: "react", name: "React + Tailwind", desc: "JSX with Tailwind classes" },
  { id: "next",  name: "Next.js",          desc: "App Router conventions, RSC by default" },
];

const OUTPUT_MODES = [
  { id: "single-file",     name: "Single file",     desc: "One self-contained file" },
  { id: "multi-file",      name: "Multi-file",      desc: "Split into multiple files" },
  { id: "component-only",  name: "Component only",  desc: "Just the JSX/HTML component" },
];

const PROMPT_MODES = [
  { id: "one-shot",       name: "One-shot",       desc: "Single response, no questions" },
  { id: "conversational", name: "Conversational", desc: "Ask questions, propose plan, then code (Cursor / IDE workflow)" },
];

export function renderStep4({ state, onStateChange }) {
  const root = el("section", { class: "step step--tech" });

  if (!state.stack) state.stack = "html";
  if (!state.outputMode) state.outputMode = "single-file";
  if (!state.promptMode) state.promptMode = "one-shot";
  if (!state.libraries) state.libraries = new Set();
  if (Array.isArray(state.libraries)) state.libraries = new Set(state.libraries);

  root.append(
    sectionLabel("Tech stack", "What format does the LLM output?"),
    radioRow(STACKS, state.stack, (id) => {
      state.stack = id;
      // Prune libraries that don't support the new stack
      const validLibs = new Set(getLibrariesByStack(id).map((l) => l.id));
      for (const libId of Array.from(state.libraries)) {
        if (!validLibs.has(libId)) state.libraries.delete(libId);
      }
      onStateChange?.();
    }),
  );

  root.append(
    sectionLabel("Output mode", ""),
    radioRow(OUTPUT_MODES, state.outputMode, (id) => { state.outputMode = id; onStateChange?.(); }),
  );

  root.append(
    sectionLabel("Prompt mode", "One-shot for chat; conversational for IDE assistants"),
    radioRow(PROMPT_MODES, state.promptMode, (id) => { state.promptMode = id; onStateChange?.(); }),
  );

  // ─── Libraries picker ──────────────────────────────────────────────────────
  const supportedLibs = LIBRARIES.filter((l) => l.stacks.includes(state.stack));

  root.append(
    sectionLabel(
      `Libraries · ${state.libraries.size} selected`,
      `Pre-vetted MIT / Apache / BSD — pick to let the LLM lean on them instead of writing from scratch`,
    ),
  );

  // Search input
  const libUi = { query: "", category: null };
  const searchInput = el("input", {
    type: "search",
    class: "step__lib-search",
    placeholder: `Search ${supportedLibs.length} libraries…`,
    "aria-label": "Search libraries",
  });
  searchInput.addEventListener("input", (e) => { libUi.query = e.target.value; rebuildLibGrid(); });

  // Category chips
  const catChips = el("div", { class: "step__lib-chips", role: "radiogroup", "aria-label": "Filter libraries by category" });
  function rebuildCatChips() {
    catChips.replaceChildren(
      chip("All categories", null, () => { libUi.category = null; rebuildAll(); }, libUi.category === null),
      ...LIBRARY_CATEGORIES
        .filter((c) => supportedLibs.some((l) => l.category === c.id))
        .map((c) => chip(c.name, c.id, () => { libUi.category = c.id; rebuildAll(); }, libUi.category === c.id)),
    );
  }
  rebuildCatChips();

  // Lib grid
  const libGrid = el("div", { class: "step__lib-grid", role: "group", "aria-label": "Available libraries" });

  function rebuildLibGrid() {
    const q = libUi.query.trim().toLowerCase();
    const visible = supportedLibs.filter((l) => {
      if (libUi.category && l.category !== libUi.category) return false;
      if (q) {
        const hay = (l.name + " " + l.desc + " " + l.category + " " + l.license).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    libGrid.replaceChildren();
    if (visible.length === 0) {
      libGrid.appendChild(el("p", { class: "step__lib-empty" }, "No libraries match this filter."));
      return;
    }

    for (const lib of visible) {
      const isChecked = state.libraries.has(lib.id);
      const card = el(
        "label",
        {
          class: "step__lib-card" + (isChecked ? " is-checked" : ""),
          tabindex: "0",
          role: "checkbox",
          "aria-checked": isChecked ? "true" : "false",
        },
        el("input", {
          type: "checkbox",
          checked: isChecked,
          onChange: (e) => {
            if (e.target.checked) state.libraries.add(lib.id);
            else state.libraries.delete(lib.id);
            onStateChange?.();
            // Rebuild the count label
            const label = root.querySelector(".step__section-label .step__lib-count");
            if (label) label.textContent = `${state.libraries.size} selected`;
            card.classList.toggle("is-checked", e.target.checked);
          },
        }),
        el(
          "div",
          { class: "step__lib-card-header" },
          el("span", { class: "step__lib-card-name" }, lib.name),
          el("span", { class: "step__lib-card-license" }, lib.license),
        ),
        el("p", { class: "step__lib-card-desc" }, lib.desc),
        el(
          "div",
          { class: "step__lib-card-meta" },
          el("span", { class: "step__lib-card-cat" }, lib.category),
          lib.size ? el("span", { class: "step__lib-card-size" }, lib.size) : null,
        ),
      );
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const input = card.querySelector("input");
          input.checked = !input.checked;
          input.dispatchEvent(new Event("change", { bubbles: true }));
        }
      });
      libGrid.appendChild(card);
    }
  }

  function rebuildAll() {
    rebuildCatChips();
    rebuildLibGrid();
  }

  root.append(searchInput, catChips, libGrid);

  rebuildLibGrid();
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

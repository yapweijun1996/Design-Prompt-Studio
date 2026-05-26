// Step 4 — Tech
// Stack (html / react / next), output mode (single-file / multi-file / component-only),
// prompt mode (one-shot / conversational).

import { el } from "../../lib/dom.js";

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

  root.append(
    sectionLabel("Tech stack", "What format does the LLM output?"),
    radioRow(STACKS, state.stack, (id) => { state.stack = id; onStateChange?.(); }),
  );

  root.append(
    sectionLabel("Output mode", ""),
    radioRow(OUTPUT_MODES, state.outputMode, (id) => { state.outputMode = id; onStateChange?.(); }),
  );

  root.append(
    sectionLabel("Prompt mode", "One-shot for chat; conversational for IDE assistants"),
    radioRow(PROMPT_MODES, state.promptMode, (id) => { state.promptMode = id; onStateChange?.(); }),
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

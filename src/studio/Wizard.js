// Wizard — sidebar + step container + progress + Back/Next.
// Step modules are rendered into the center pane. State is mutated in place by step
// callbacks; the Wizard re-renders the current step + progress on each change.

import { el } from "../lib/dom.js";

export const STEPS = [
  { id: "style",  title: "Style & feel",   blurb: "Pick a preset + density / drama / motion." },
  { id: "page",   title: "Page basics",    blurb: "Purpose, page type, sections." },
  { id: "brief",  title: "Brief",          blurb: "Product, audience, tone, references." },
  { id: "tech",   title: "Tech",           blurb: "Stack, output mode, prompt mode." },
  { id: "review", title: "Review & copy",  blurb: "Full assembled prompt, ready to paste." },
];

export function renderWizard({ state, onStateChange, onExit, stepRenderers }) {
  const wizard = el("section", { class: "wizard" });

  const sidebar = el("aside", { class: "wizard__sidebar", "aria-label": "Wizard steps" });
  const main = el("div", { class: "wizard__main" });
  const footer = el("div", { class: "wizard__footer" });

  wizard.append(sidebar, main, footer);

  function go(idx) {
    if (idx < 0 || idx >= STEPS.length) return;
    state.meta.currentStep = idx;
    if (idx > 0) {
      const prev = idx - 1;
      state.meta.completedSteps = state.meta.completedSteps || new Set();
      if (typeof state.meta.completedSteps.add === "function") state.meta.completedSteps.add(STEPS[prev].id);
      else if (Array.isArray(state.meta.completedSteps)) {
        if (!state.meta.completedSteps.includes(STEPS[prev].id)) state.meta.completedSteps.push(STEPS[prev].id);
      }
    }
    onStateChange?.();
    paint();
  }

  function paint() {
    const i = state.meta.currentStep ?? 0;
    paintSidebar(i);
    paintMain(i);
    paintFooter(i);
  }

  function paintSidebar(currentIdx) {
    sidebar.replaceChildren();
    sidebar.appendChild(el("h2", { class: "wizard__sidebar-title" }, "Studio"));
    const list = el("ol", { class: "wizard__steps", role: "list" });
    STEPS.forEach((s, i) => {
      const isCurrent = i === currentIdx;
      const isDone = i < currentIdx;
      list.appendChild(
        el(
          "li",
          {
            class: "wizard__step" + (isCurrent ? " is-current" : "") + (isDone ? " is-done" : ""),
          },
          el(
            "button",
            {
              type: "button",
              class: "wizard__step-btn",
              onClick: () => go(i),
              "aria-current": isCurrent ? "step" : "false",
            },
            el("span", { class: "wizard__step-mark", "aria-hidden": "true" }, isDone ? "◉" : (isCurrent ? "●" : "○")),
            el("span", { class: "wizard__step-num" }, String(i + 1).padStart(2, "0")),
            el("span", { class: "wizard__step-label" }, s.title),
          ),
        ),
      );
    });
    sidebar.appendChild(list);

    if (typeof onExit === "function") {
      sidebar.appendChild(
        el(
          "button",
          { type: "button", class: "wizard__exit", onClick: onExit },
          "← Back to Gallery",
        ),
      );
    }
  }

  function paintMain(currentIdx) {
    main.replaceChildren();
    const step = STEPS[currentIdx];
    const renderer = stepRenderers[step.id];
    main.appendChild(
      el(
        "header",
        { class: "wizard__main-header" },
        el("p", { class: "wizard__step-eyebrow" }, `Step ${currentIdx + 1} of ${STEPS.length}`),
        el("h1", { class: "wizard__step-title" }, step.title),
        el("p", { class: "wizard__step-blurb" }, step.blurb),
      ),
    );
    if (renderer) {
      const stepEl = renderer({
        state,
        onStateChange: () => { onStateChange?.(); paint(); },
      });
      main.appendChild(stepEl);
    } else {
      main.appendChild(el("p", { class: "wizard__step-todo" }, "[step renderer missing]"));
    }
  }

  function paintFooter(currentIdx) {
    footer.replaceChildren();
    const progress = el(
      "div",
      { class: "wizard__progress", "aria-label": `Step ${currentIdx + 1} of ${STEPS.length}` },
      el("div", {
        class: "wizard__progress-bar",
        style: { width: `${((currentIdx + 1) / STEPS.length) * 100}%` },
      }),
    );
    const actions = el(
      "div",
      { class: "wizard__nav" },
      el(
        "button",
        {
          type: "button",
          class: "wizard__nav-btn",
          disabled: currentIdx === 0,
          onClick: () => go(currentIdx - 1),
        },
        "← Back",
      ),
      el(
        "button",
        {
          type: "button",
          class: "wizard__nav-btn wizard__nav-btn--primary",
          disabled: currentIdx === STEPS.length - 1,
          onClick: () => go(currentIdx + 1),
        },
        "Next →",
      ),
    );
    footer.append(progress, actions);
  }

  // Keyboard nav: arrow keys move between steps when focus is outside form fields.
  function keyHandler(e) {
    const tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const i = state.meta.currentStep ?? 0;
    if (e.key === "ArrowLeft" && i > 0) { e.preventDefault(); go(i - 1); }
    else if (e.key === "ArrowRight" && i < STEPS.length - 1) { e.preventDefault(); go(i + 1); }
  }
  window.addEventListener("keydown", keyHandler);

  // Detach listener when wizard is removed from DOM.
  const observer = new MutationObserver(() => {
    if (!document.body.contains(wizard)) {
      window.removeEventListener("keydown", keyHandler);
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  paint();
  return wizard;
}

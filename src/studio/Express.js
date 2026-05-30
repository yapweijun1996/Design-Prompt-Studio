// Express — single-page composer for power users. Reuses the same step renderers
// from the Wizard but stacks them vertically on one scrollable page, with the
// assembled prompt as a sticky preview on the right (desktop) or below (mobile).

import { el } from "../lib/dom.js";
import { store } from "../lib/store.js";
import { copyText } from "../lib/clipboard.js";
import { getPromptById } from "../data/prompts/index.js";
import { assemblePrompt, promptStats } from "../lib/assemblePrompt.js";
import { renderQualityPanel } from "./qualityPanel.js";
import { renderStep1 } from "./steps/1-style.js";
import { renderStep2 } from "./steps/2-page.js";
import { renderStep3 } from "./steps/3-brief.js";
import { renderStep4 } from "./steps/4-tech.js";

const STATE_KEY = "studio-state";

const DEFAULT_STATE = () => ({
  meta: { currentStep: 0, enteredFrom: "express" },
  style: "monochrome",
  density: "default",
  drama: "confident",
  motion: "default",
  purpose: "marketing",
  pageType: "landing",
  sections: new Set(["hero", "features", "cta", "footer"]),
  stack: "html",
  outputMode: "single-file",
  promptMode: "one-shot",
  libraries: new Set(),
  brief: { name: "", industry: "", audience: "", tone: "", references: "", context: "", avoid: "" },
});

function toSet(value) {
  if (value instanceof Set) return value;
  if (Array.isArray(value)) return new Set(value);
  return new Set();
}

function loadState() {
  // Express + Wizard share studio-state. If gallery handoff is pending, use that.
  const galleryId = store.get("studio-from-gallery", null);
  if (galleryId) {
    const card = getPromptById(galleryId);
    if (card) {
      store.remove("studio-from-gallery");
      return {
        ...DEFAULT_STATE(),
        style: card.style,
        density: card.density ?? "default",
        drama: card.drama ?? "confident",
        motion: card.motion ?? "default",
        purpose: card.purpose,
        pageType: card.pageType,
        sections: new Set(card.sections || []),
        stack: card.stack ?? "html",
        outputMode: card.outputMode ?? "single-file",
        promptMode: card.promptMode ?? "one-shot",
        libraries: toSet(card.libraries),
        brief: { ...(card.brief || {}) },
      };
    }
  }

  const saved = store.get(STATE_KEY, null);
  if (saved) {
    saved.sections = toSet(saved.sections);
    saved.libraries = toSet(saved.libraries);
    return saved;
  }
  return DEFAULT_STATE();
}

function persist(state) {
  const serializable = {
    ...state,
    sections: state.sections instanceof Set ? Array.from(state.sections) : (state.sections || []),
    libraries: state.libraries instanceof Set ? Array.from(state.libraries) : (state.libraries || []),
  };
  store.set(STATE_KEY, serializable);
}

export function renderExpress({ onExit }) {
  const state = loadState();

  const root = el("main", { id: "main", class: "express" });

  const layout = el("div", { class: "express__layout" });
  const controls = el("div", { class: "express__controls" });
  const preview = el("aside", { class: "express__preview", "aria-label": "Live prompt preview" });

  layout.append(controls, preview);
  root.appendChild(
    el(
      "header",
      { class: "express__header" },
      el("div", { class: "express__eyebrow" }, "Express mode"),
      el("h1", { class: "express__title" }, "All controls, one page."),
      el(
        "p",
        { class: "express__blurb" },
        "Power-user layout — every wizard step visible at once. The prompt preview updates live as you edit.",
      ),
      typeof onExit === "function"
        ? el(
            "button",
            { type: "button", class: "express__exit", onClick: onExit },
            "← Back to Gallery",
          )
        : null,
    ),
  );
  root.appendChild(layout);

  function rerender() {
    persist(state);
    // Rebuild controls (cheap — reuses step renderers)
    controls.replaceChildren();
    controls.append(
      sectionWrap("01 Style & feel",    renderStep1({ state, onStateChange: rerender })),
      sectionWrap("02 Page basics",     renderStep2({ state, onStateChange: rerender })),
      sectionWrap("03 Brief",           renderStep3({ state, onStateChange: rerender })),
      sectionWrap("04 Tech",            renderStep4({ state, onStateChange: rerender })),
    );
    updatePreview();
  }

  function sectionWrap(label, contents) {
    return el(
      "section",
      { class: "express__section" },
      el("h2", { class: "express__section-title" }, label),
      contents,
    );
  }

  function updatePreview() {
    const carrier = {
      ...state,
      sections: state.sections instanceof Set ? Array.from(state.sections) : (state.sections || []),
    };
    let prompt;
    try { prompt = assemblePrompt(carrier); }
    catch (e) { prompt = "[assemble failed: " + (e?.message || e) + "]"; }
    const stats = promptStats(prompt);

    // Quality score + export gating — same shared panel as the Studio wizard.
    const { node: qualityNode, quality } = renderQualityPanel(carrier);

    preview.replaceChildren(
      el(
        "div",
        { class: "express__preview-meta" },
        el("span", null, "05 Review"),
        el("span", { class: "express__preview-stats" }, `${stats.chars.toLocaleString()} chars · ~${stats.tokens.toLocaleString()} tokens`),
      ),
      qualityNode,
      el(
        "pre",
        { class: "express__preview-prompt", tabindex: "0", "aria-label": "Assembled prompt" },
        prompt,
      ),
      el(
        "div",
        { class: "express__preview-actions" },
        buildCopyBtn(prompt, quality.gate === "block"),
        el(
          "button",
          {
            type: "button",
            class: "step__action-btn",
            onClick: () => downloadPrompt(state, prompt),
          },
          "Download .md",
        ),
        el(
          "a",
          {
            class: "step__action-btn",
            href: "https://claude.ai/new",
            target: "_blank",
            rel: "noopener",
          },
          "Open Claude →",
        ),
      ),
    );
  }

  function buildCopyBtn(prompt, blocked = false) {
    const defaultLabel = blocked ? "Copy anyway" : "Copy prompt";
    const btn = el(
      "button",
      { type: "button", class: "step__copy-btn" + (blocked ? " is-blocked" : "") },
      el("span", { class: "step__copy-icon", "aria-hidden": "true" }, "📋"),
      el("span", { class: "step__copy-label" }, defaultLabel),
    );
    btn.addEventListener("click", async () => {
      const ok = await copyText(prompt);
      const label = btn.querySelector(".step__copy-label");
      if (ok) {
        btn.classList.add("is-copied");
        label.textContent = "Copied ✓";
        setTimeout(() => { btn.classList.remove("is-copied"); label.textContent = defaultLabel; }, 1800);
      } else {
        label.textContent = "Copy failed — select & ⌘C";
        setTimeout(() => { label.textContent = defaultLabel; }, 2200);
      }
    });
    return btn;
  }

  function downloadPrompt(s, prompt) {
    const blob = new Blob([prompt], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dps-${s.style}-${s.pageType}-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  rerender();
  return root;
}

// Studio — top-level container. Loads state (from gallery handoff, URL share, or fresh),
// renders the Wizard with our 5 step modules, persists state via localStorage.

import { el } from "../lib/dom.js";
import { store } from "../lib/store.js";
import { getPromptById, ALL_PROMPTS } from "../data/prompts/index.js";
import { renderWizard } from "./Wizard.js";
import { renderStep1 } from "./steps/1-style.js";
import { renderStep2 } from "./steps/2-page.js";
import { renderStep3 } from "./steps/3-brief.js";
import { renderStep4 } from "./steps/4-tech.js";
import { renderStep5 } from "./steps/5-review.js";

const STATE_KEY = "studio-state";

const DEFAULT_STATE = () => ({
  meta: {
    currentStep: 0,
    completedSteps: [],
    enteredFrom: "scratch",
    galleryPromptId: null,
    promptMode: "one-shot",
  },
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
  includeComponents: true,
  forcedComponents: new Set(),
  brief: { name: "", industry: "", audience: "", tone: "", references: "", context: "", avoid: "" },
});

// Helper: coerce an arbitrary value into a Set<string>. Handles Set, Array, undefined, plain {}.
function toSet(value) {
  if (value instanceof Set) return value;
  if (Array.isArray(value)) return new Set(value);
  return new Set();
}

function stateFromCard(card) {
  const base = DEFAULT_STATE();
  return {
    ...base,
    meta: { ...base.meta, enteredFrom: "gallery", galleryPromptId: card.id },
    style: card.style ?? base.style,
    density: card.density ?? base.density,
    drama: card.drama ?? base.drama,
    motion: card.motion ?? base.motion,
    purpose: card.purpose ?? base.purpose,
    pageType: card.pageType ?? base.pageType,
    sections: new Set(card.sections ?? base.sections),
    stack: card.stack ?? base.stack,
    outputMode: card.outputMode ?? base.outputMode,
    promptMode: card.promptMode ?? base.promptMode,
    libraries: toSet(card.libraries),
    brief: { ...(card.brief || {}) },
  };
}

function stateFromHashShare(hash) {
  const m = hash.match(/[?&]s=([^&]+)/);
  if (!m) return null;
  try {
    const b64 = decodeURIComponent(m[1]);
    const json = decodeURIComponent(escape(atob(b64)));
    const p = JSON.parse(json);
    const base = DEFAULT_STATE();
    return {
      ...base,
      meta: { ...base.meta, enteredFrom: "shared-url" },
      style: p.s ?? base.style,
      pageType: p.p ?? base.pageType,
      density: p.d ?? base.density,
      drama: p.r ?? base.drama,
      motion: p.m ?? base.motion,
      stack: p.k ?? base.stack,
      outputMode: p.o ?? base.outputMode,
      promptMode: p.M ?? base.promptMode,
      sections: new Set(p.se || base.sections),
      libraries: toSet(p.l),
      brief: p.b || base.brief,
    };
  } catch {
    return null;
  }
}

function resumeOrFresh() {
  // 1. URL share wins
  const shared = stateFromHashShare(location.hash);
  if (shared) return shared;

  // 2. Gallery handoff (set in main.js)
  const galleryId = store.get("studio-from-gallery", null);
  if (galleryId) {
    const card = getPromptById(galleryId);
    if (card) {
      store.remove("studio-from-gallery");
      return stateFromCard(card);
    }
  }

  // 3. Last-saved studio state
  const saved = store.get(STATE_KEY, null);
  if (saved) {
    saved.sections = toSet(saved.sections);
    saved.libraries = toSet(saved.libraries);
    saved.forcedComponents = toSet(saved.forcedComponents);
    // Components-page handoff — pinned component ids are merged onto whatever
    // saved state we resume into (additive — doesn't overwrite other prefs).
    const pinned = store.get("studio-forced-components", null);
    if (Array.isArray(pinned) && pinned.length > 0) {
      for (const id of pinned) saved.forcedComponents.add(id);
      saved.includeComponents = true; // make sure block isn't suppressed
      store.remove("studio-forced-components");
    }
    return saved;
  }

  // 3b. Fresh state but with components-page handoff
  const pinnedFresh = store.get("studio-forced-components", null);
  if (Array.isArray(pinnedFresh) && pinnedFresh.length > 0) {
    const fresh = DEFAULT_STATE();
    for (const id of pinnedFresh) fresh.forcedComponents.add(id);
    fresh.meta.enteredFrom = "components-page";
    store.remove("studio-forced-components");
    return fresh;
  }

  // 4. Fresh
  return DEFAULT_STATE();
}

function persist(state) {
  const serializable = {
    ...state,
    sections: state.sections instanceof Set ? Array.from(state.sections) : (state.sections || []),
    libraries: state.libraries instanceof Set ? Array.from(state.libraries) : (state.libraries || []),
    forcedComponents: state.forcedComponents instanceof Set ? Array.from(state.forcedComponents) : (state.forcedComponents || []),
  };
  store.set(STATE_KEY, serializable);
}

export function renderStudio({ onExit }) {
  const state = resumeOrFresh();

  const root = el("main", { id: "main", class: "studio" });

  // Resume banner if we restored from a previous session (not fresh, not gallery, not share)
  const fromSavedState = state.meta.enteredFrom !== "gallery"
    && state.meta.enteredFrom !== "shared-url"
    && (state.brief?.name || state.meta.currentStep > 0);
  if (fromSavedState) {
    const banner = el(
      "div",
      { class: "studio__resume-banner", role: "status" },
      el("span", { class: "studio__resume-text" }, "Continued where you left off."),
      el(
        "button",
        {
          type: "button",
          class: "studio__resume-reset",
          onClick: () => {
            store.remove(STATE_KEY);
            location.reload();
          },
        },
        "Start fresh →",
      ),
      el(
        "button",
        {
          type: "button",
          class: "studio__resume-dismiss",
          "aria-label": "Dismiss banner",
          onClick: () => banner.remove(),
        },
        "✕",
      ),
    );
    root.appendChild(banner);
  }

  const wizard = renderWizard({
    state,
    stepRenderers: {
      style: renderStep1,
      page: renderStep2,
      brief: renderStep3,
      tech: renderStep4,
      review: renderStep5,
    },
    onStateChange: () => persist(state),
    onExit,
  });

  root.appendChild(wizard);

  // Persist once on entry too
  persist(state);

  return root;
}

void ALL_PROMPTS;

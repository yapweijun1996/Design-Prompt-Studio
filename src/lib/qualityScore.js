// Prompt-quality scorer — pure, dependency-free, unit-testable.
//
// Why this exists: a well-specified prompt produces a better first-pass generation,
// so the Studio should flag (and visibly gate) under-specified prompts BEFORE they
// are copied into an LLM. See docs/RESEARCH-REVIEW.md § 3a (adopt: quality score +
// export gating) — the highest-ROI idea surfaced by the deep-research report.
//
// Input: the Studio `state` (style/pageType/sections/stack + brief fields).
// Output: { score 0-100, gate, criticalMissing, dimensions[], fixes[] }.

// Values that look filled but carry no real signal. Treated as empty.
const PLACEHOLDER = /^\s*(\[.*\]|test|todo|tbd|n\/?a|product|your product|your company|untitled)\s*$/i;

function has(v, min = 1) {
  if (v == null) return false;
  const s = String(v).trim();
  if (!s || PLACEHOLDER.test(s)) return false;
  return s.length >= min;
}

function sectionCount(state) {
  const s = state && state.sections;
  if (s instanceof Set) return s.size;
  if (Array.isArray(s)) return s.length;
  return 0;
}

/**
 * Score a Studio state. Each dimension earns 0..weight; weights sum to 100.
 * `critical` dimensions gate the prompt hard when missing.
 *
 * Format-aware: a DESIGN.md is a reusable design-system document, NOT tied to a
 * one-shot brief — so grading it on brief richness (audience/tone/avoid) misfires
 * and would wrongly block a perfectly complete system doc. When the state targets
 * the "design-md" format we grade SYSTEM completeness instead (layout structure,
 * component library, stack, localization). See docs/RESEARCH-REVIEW.md § 3a.
 */
export function scoreQuality(state = {}) {
  if (state.outputFormat === "design-md") return scoreDesignDoc(state);

  const brief = state.brief || {};
  const nSections = sectionCount(state);

  const dimensions = [
    {
      key: "audience", label: "Target audience", weight: 20, critical: true,
      earned: has(brief.audience, 20) ? 20 : has(brief.audience) ? 10 : 0,
      hint: "Name who they are, their context, and what they value — don't imply it.",
    },
    {
      key: "sections", label: "Sections chosen", weight: 18, critical: true,
      earned: nSections >= 3 ? 18 : nSections === 2 ? 12 : nSections === 1 ? 6 : 0,
      hint: "Pick at least 3 sections so the page has real structure.",
    },
    {
      key: "tone", label: "Tone / voice", weight: 14, critical: true,
      earned: has(brief.tone, 6) ? 14 : has(brief.tone) ? 7 : 0,
      hint: "Give 5-7 tone keywords (e.g. calm, technical, confident).",
    },
    {
      key: "avoid", label: "Avoid list", weight: 12,
      earned: has(brief.avoid) ? 12 : 0,
      hint: "State what to avoid — anti-patterns matter as much as the positives.",
    },
    {
      key: "mustInclude", label: "Must-include specifics", weight: 12,
      earned: has(brief.context) ? 12 : 0,
      hint: "Name non-negotiables: hero copy, a required section, a key feature.",
    },
    {
      key: "industry", label: "Industry / category", weight: 8,
      earned: has(brief.industry) ? 8 : 0,
      hint: "Set the industry so copy and references stay grounded.",
    },
    {
      key: "name", label: "Product / brand name", weight: 6,
      earned: has(brief.name) ? 6 : 0,
      hint: "Use a real product name instead of a placeholder.",
    },
    {
      key: "technical", label: "Technical output", weight: 10,
      earned: has(state.stack) ? 10 : 0,
      hint: "Pick an output stack (HTML / React / Next).",
    },
  ];

  const score = dimensions.reduce((sum, d) => sum + d.earned, 0); // 0..100
  const criticalMissing = dimensions.filter((d) => d.critical && d.earned === 0).length;

  let gate;
  if (criticalMissing >= 2 || score < 50) gate = "block";
  else if (criticalMissing >= 1 || score < 80) gate = "warn";
  else gate = "ready";

  // Actionable fixes for any not-full dimension, critical first, then by weight.
  const fixes = dimensions
    .filter((d) => d.earned < d.weight)
    .sort((a, b) => (Number(b.critical || 0) - Number(a.critical || 0)) || (b.weight - a.weight))
    .map((d) => d.hint);

  return { kind: "prompt", score, gate, criticalMissing, dimensions, fixes };
}

// ─── DESIGN.md completeness scorer ───────────────────────────────────────────
// Grades the reusable design-system document, not a one-shot brief. The visual
// system (tokens, typography, color, do/don't) is GUARANTEED by the style-preset
// schema, so it's awarded as a flat baseline; the user-controlled levers are the
// layout structure, component library, target stack, and localization context.
function scoreDesignDoc(state = {}) {
  const nSections = sectionCount(state);
  const localized = (state.locale && state.locale !== "default") || (state.market && state.market !== "none");

  const dimensions = [
    {
      key: "layout", label: "Layout structure", weight: 35, critical: true,
      earned: nSections >= 3 ? 35 : nSections === 2 ? 21 : nSections === 1 ? 10 : 0,
      hint: "Pick at least 3 sections so §5 Layout Blueprints has real structure to govern.",
    },
    {
      key: "visual", label: "Visual system (tokens, type, color)", weight: 15,
      earned: 15, // guaranteed by the style-preset schema
      hint: "",
    },
    {
      key: "components", label: "Component library", weight: 20,
      earned: state.includeComponents === false ? 0 : 20,
      hint: "Keep components enabled so §6 ships a real primitive catalog with a11y rules.",
    },
    {
      key: "technical", label: "Target stack", weight: 20,
      earned: has(state.stack) ? 20 : 0,
      hint: "Pick an output stack (HTML / React / Next) so §10 Implementation is concrete.",
    },
    {
      key: "context", label: "Cultural / market context", weight: 10,
      earned: localized ? 10 : 0,
      hint: "Optional: add a culture or market layer for localized type, currency, and tone.",
    },
  ];

  const score = dimensions.reduce((sum, d) => sum + d.earned, 0);
  const criticalMissing = dimensions.filter((d) => d.critical && d.earned === 0).length;

  // A registry-built design doc is complete by construction, so it rarely blocks:
  // only a doc with no layout structure at all is held back.
  let gate;
  if (criticalMissing >= 1 || score < 50) gate = "block";
  else if (score < 80) gate = "warn";
  else gate = "ready";

  const fixes = dimensions
    .filter((d) => d.earned < d.weight && d.hint)
    .sort((a, b) => (Number(b.critical || 0) - Number(a.critical || 0)) || (b.weight - a.weight))
    .map((d) => d.hint);

  return { kind: "design", score, gate, criticalMissing, dimensions, fixes };
}

export const GATE_LABEL = {
  ready: "Ready to ship",
  warn: "Usable — could be sharper",
  block: "Under-specified",
};

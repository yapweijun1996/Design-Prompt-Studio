// Global rules block — applies to every assembled prompt regardless of style.
// Sourced from PROMPT-PATTERNS.md Sample #2 P15-P21 (AI slop tropes, content discipline,
// scale minimums, OKLCH, placeholders, avoid-web-tropes-off-web).
//
// Style presets can override specific items via `overrideGlobalRules: []`.

export const GLOBAL_RULES = {
  // Each entry has an id (for override matching) and the text emitted into the prompt.
  accessibility: {
    id: "accessibility",
    title: "ACCESSIBILITY MINIMUMS",
    bullets: [
      "Mobile touch targets ≥ 44×44px",
      "Body text ≥ 16px (≥18px preferred)",
      "Every interactive element has a visible focus state (use :focus-visible, never bare :focus)",
      "Contrast: AA minimum (4.5:1 body text, 3:1 large text)",
      "Visible skip-to-content link as the first focusable element",
    ],
  },

  responsivePwa: {
    id: "responsivePwa",
    title: "RESPONSIVE & PWA (mandatory for every web page / app)",
    bullets: [
      "Mobile-first and fully responsive: design from 360px up and reflow — don't shrink — at each breakpoint (sm 640 · md 768 · lg 1024 · xl 1280). Nothing may overflow, clip, or cause horizontal scroll at 360px.",
      "Always include `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\">` and honour safe-area insets via `env(safe-area-inset-*)`.",
      "Fluid by construction: CSS grid/flex for layout, `clamp()` for type, `min()/max()/%` for widths — never fixed pixel widths that break on small screens.",
      "Ship as an installable PWA: a web app manifest (name, short_name, theme_color, background_color, `display: standalone`, start_url, and 192 + 512 + maskable icons), a registered service worker that precaches the app shell and serves an offline fallback, plus a `<meta name=\"theme-color\">`.",
      "For a single self-contained .html deliverable, keep it PWA-ready: reference a manifest via `<link rel=\"manifest\">` (a `data:` URI is acceptable) and register a minimal inline service worker where the runtime allows; note anything that needs separate files in Design Decisions.",
      "Respect `prefers-reduced-motion` and `prefers-color-scheme`; keep tap targets ≥ 44×44px.",
    ],
  },

  contentDiscipline: {
    id: "contentDiscipline",
    title: "CONTENT DISCIPLINE",
    bullets: [
      "Every section must earn its place. No filler, no padding, no dummy stats.",
      "Less is more. When tempted to add a tooltip / badge / icon, ask: does it serve the user?",
      "If a section feels empty, that's a layout problem — solve it with composition, not invented content.",
      "Use real copy. Lorem ipsum is forbidden.",
    ],
  },

  aiSlopTropes: {
    id: "aiSlopTropes",
    title: "AVOID AI SLOP TROPES (style preset may override specific items)",
    bullets: [
      "No aggressive gradient backgrounds as the primary aesthetic.",
      "No emoji unless the brand explicitly uses them.",
      "No \"container with rounded corners + left-border accent color\" template cards.",
      "No SVG-drawn imagery for icons or illustrations — use clearly-labelled placeholders instead.",
      "No defaulting to Inter / Roboto / Arial / system-ui if the style names a specific typeface.",
      "No data slop — unnecessary numbers, icons, or stats that don't serve the user.",
    ],
  },

  craftFloor: {
    id: "craftFloor",
    title: "CRAFT FLOOR (senior-designer vs template; the style may override)",
    bullets: [
      "Deliberate design only — no default-framework look, no default form controls, no flat-by-accident boxes. Commit the style's point of view in EVERY section (footer included) and match its own depth language. If a section could belong to any other site, it isn't done.",
      "Real type scale (distinct display / heading / body / caption); body 16–18px, line-height ~1.5–1.7, reading measure ≤ ~70ch.",
      "One consistent spacing scale; generous, consistent whitespace and rhythm — crowding reads as cheap.",
    ],
  },

  visualDefaults: {
    id: "visualDefaults",
    title: "VISUAL DEFAULTS WHEN UNCERTAIN",
    bullets: [
      "When the user's brand has colors, use them.",
      "When extending the palette, use OKLCH formulas for harmony — never invent random hex values.",
      "For missing assets (icons, images, charts): output a clearly-labelled placeholder, never a bad SVG fake.",
      "Real-world references (brands, publications, spaces) are inspiration — never copy them visually.",
    ],
  },

  nonWebArtifacts: {
    id: "nonWebArtifacts",
    title: "WHEN BUILDING NON-WEB ARTIFACTS (deck, print, poster, animation)",
    bullets: [
      "Avoid web design tropes — no hero/features/CTA reflexes. The artifact is what it is.",
      "Match the medium's conventions: a slide is not a webpage; a poster is not a slide.",
    ],
  },
};

// ─── Render to prompt-friendly Markdown ─────────────────────────────────────
/**
 * Render the global-rules block as a Markdown string, applying style-level overrides.
 *
 * @param {string[]} overrideStrings  Lines from preset.overrideGlobalRules to APPEND
 *                                    (each line is a sentence explaining what's overridden).
 * @returns {string}
 */
export function renderGlobalRules(overrideStrings = []) {
  const sections = Object.values(GLOBAL_RULES).map((rule) => {
    const lines = [`## ${rule.title}`];
    for (const b of rule.bullets) lines.push(`- ${b}`);
    return lines.join("\n");
  });

  let out = sections.join("\n\n");

  if (overrideStrings.length > 0) {
    out += "\n\n## STYLE-LEVEL OVERRIDES (these override the global rules above for this style)";
    for (const o of overrideStrings) out += `\n- ${o}`;
  }
  return out;
}

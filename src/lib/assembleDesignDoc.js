// DESIGN.md assembler — emits a professional, REUSABLE design-system document
// (a project's "design law") that an LLM reads to generate consistent UI/UX
// across EVERY screen. Contrast with assemblePrompt.js, which emits a single
// imperative one-shot "build me THIS page right now" prompt.
//
// Same structured data (tokens, typography, components, page blueprints) — a
// declarative document wrapper instead of an imperative prompt wrapper. The
// style-preset schema (src/data/styles/schema.js) GUARANTEES these fields, so
// they need no guard:
//   id, name, tag, desc, feel, boldFactor[], successLooksLike[],
//   failureLooksLike[], tokens{≥4}, typography{display, body, …}
// These are OPTIONAL and MUST be guarded:
//   references, antiPatterns[], responsive[], snippets[], overrideGlobalRules[]

import { STYLE_PRESETS } from "../data/styles/index.js";
import { PAGE_TYPES, PAGE_TYPES_BY_PURPOSE, PURPOSE_BUCKETS } from "../data/taxonomy.js";
import { DENSITY_LEVELS, MOTION_LEVELS } from "../data/modifiers.js";
import { getLocale } from "../data/locales.js";
import { getMarket } from "../data/markets.js";
import { renderGlobalRules } from "../data/global-rules.js";
import { getLibrary } from "../data/libraries.js";
import {
  getComponent,
  getComponentsForStyle,
  getComponentsForContext,
} from "../data/components.js";
import { STACKS } from "./assemblePrompt.js";

const MAX_COMPONENTS = 18;

// A base 4px spacing scale is the backbone of a layout system. The style data
// carries per-element responsive padding but no global scale, so we ship a sane
// default here and let the density modifier nudge the rhythm (see §4).
const SPACING_SCALE = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160];

// ─── Token helpers (machine-usable color system) ─────────────────────────────
// Styles name their tokens freely (bg/fg/brand vs background/ink/primary…). To
// emit a SEMANTIC layer an agent can rely on, map whatever primitive keys exist
// onto a stable role vocabulary by keyword. First match per role wins.
const SEMANTIC_ROLES = [
  { role: "bg",          label: "Page background",     match: ["bg", "background", "canvas", "base", "page", "paper"], neutral: true },
  { role: "surface",     label: "Card / panel surface", match: ["surface", "card", "panel", "raised", "elevated", "sheet"], neutral: true },
  { role: "text",        label: "Primary text",        match: ["fg", "text", "ink", "foreground", "body", "heading", "title"], neutral: true },
  { role: "text-muted",  label: "Secondary text",      match: ["muted", "secondary", "subtle", "dim", "caption", "meta"], neutral: true },
  { role: "action",      label: "Primary action",      match: ["brand", "primary", "accent", "action", "cta", "link", "interactive"] },
  { role: "border",      label: "Borders / dividers",  match: ["border", "line", "divider", "hairline", "stroke", "rule"], neutral: true },
  { role: "success",     label: "Success",             match: ["ok", "success", "positive", "good"] },
  { role: "warning",     label: "Warning",             match: ["warn", "warning", "caution", "pending"] },
  { role: "danger",      label: "Error / danger",      match: ["danger", "error", "negative", "destructive", "alert"] },
  { role: "info",        label: "Info",                match: ["info", "informational", "note"] },
];

// A documented, contrast-sane neutral ramp for the dark theme. We deliberately do
// NOT fabricate per-hue dark values (that risks off-brand color); we remap only the
// neutral roles and keep the style's action/status hues, flagging them for a check.
const DARK_NEUTRALS = {
  bg: "#0F172A",
  surface: "#1E293B",
  text: "#E2E8F0",
  "text-muted": "#94A3B8",
  border: "#334155",
};

function tokenValue(v) {
  return (typeof v === "object" && v !== null) ? v.value : v;
}

function tokenEntries(style) {
  return Object.entries(style.tokens).map(([key, v]) => ({
    key,
    value: tokenValue(v),
    usage: (typeof v === "object" && v !== null) ? (v.usage || "") : "",
  }));
}

// Map primitive token keys → semantic roles. Returns [{role, label, key, neutral}].
// Precision order: an EXACT key match always beats a substring match, so a style
// with both `fg` and `sidebar-fg` maps primary text to `fg`, not `sidebar-fg`.
function mapSemanticTokens(entries) {
  const out = [];
  for (const r of SEMANTIC_ROLES) {
    const lc = (e) => e.key.toLowerCase();
    const hit =
      entries.find((e) => r.match.some((m) => lc(e) === m)) ||
      entries.find((e) => r.match.some((m) => lc(e).includes(m)));
    if (hit) out.push({ role: r.role, label: r.label, key: hit.key, neutral: !!r.neutral });
  }
  return out;
}

// Relative luminance of a #rgb / #rrggbb color (0 dark → 1 light); null if unparseable.
function hexLuminance(value) {
  if (typeof value !== "string") return null;
  let h = value.trim().replace(/^#/, "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

// ─── Component selection ─────────────────────────────────────────────────────
// Same scoring as assemblePrompt.buildComponentsBlock (+2 style-paired,
// +3 context-implied, +100 user-forced) but returns the raw Component[] so this
// module can format them as a markdown catalog rather than a <components> block.
function selectComponents(state, sections, pageType) {
  if (state.includeComponents === false) return [];
  const contextKeywords = [...sections, pageType?.id, pageType?.purpose].filter(Boolean);

  const scored = new Map();
  for (const c of getComponentsForStyle(state.style)) {
    scored.set(c.id, (scored.get(c.id) || 0) + 2);
  }
  for (const c of getComponentsForContext(contextKeywords)) {
    scored.set(c.id, (scored.get(c.id) || 0) + 3);
  }
  const forced = state.forcedComponents instanceof Set
    ? Array.from(state.forcedComponents)
    : (Array.isArray(state.forcedComponents) ? state.forcedComponents : []);
  for (const id of forced) {
    if (getComponent(id)) scored.set(id, (scored.get(id) || 0) + 100);
  }

  return [...scored.entries()]
    .map(([id, score]) => ({ c: getComponent(id), score }))
    .filter((e) => e.c)
    .sort((a, b) => (b.score !== a.score ? b.score - a.score : a.c.tier - b.c.tier))
    .slice(0, MAX_COMPONENTS)
    .map((e) => e.c);
}

// ─── Section builders ────────────────────────────────────────────────────────
// Bump when the DESIGN.md structure changes in a way agents/humans should notice.
const DOC_FORMAT_VERSION = "1.0";

function today() {
  // ISO date (UTC) — stamps when this copy of the doc was generated.
  try { return new Date().toISOString().slice(0, 10); } catch { return ""; }
}

function buildHeader(style) {
  const stamp = today();
  return `# DESIGN.md — ${style.name}
<!-- Generated by Design Prompt Studio · ${style.tag} · format v${DOC_FORMAT_VERSION}${stamp ? ` · ${stamp}` : ""} -->

> **Status:** Design source of truth · format v${DOC_FORMAT_VERSION}${stamp ? ` · generated ${stamp}` : ""}
>
> **How to use this file.** This is the design source of truth for this project.
> Keep it at the repo root as \`DESIGN.md\`. Before you generate or edit ANY UI,
> read this file top to bottom and treat every token, scale, and rule as binding.
> When you build a screen: follow §5 (Layout Blueprints) for structure and
> §2–§4 for the visual language. The Do / Don't rules in §9 are hard constraints,
> not suggestions. If a later instruction or brief conflicts with this file, this
> file wins — surface the conflict instead of silently overriding it.
>
> **How to update.** This file is the single source of truth — edit it here, not
> in scattered component comments. When you change a token, scale, or rule, update
> this file in the same change and note what shifted so reviewers (and agents) can
> see the design decision, not just the code diff.`;
}

function buildPrinciples(style) {
  const lines = ["## 1. Design Principles"];
  lines.push(`- **Feel** — ${style.feel}`);
  lines.push(`- **Core principle** — ${style.desc}`);
  if (style.references) {
    lines.push(`- **References** (study the spirit, never copy) — ${style.references}`);
  }
  lines.push("");
  lines.push("**Signature moves — these MUST be visibly present for the style to read as authentic:**");
  lines.push(style.boldFactor.map((b, i) => `${i + 1}. ${b}`).join("\n"));
  return lines.join("\n");
}

function buildColorSystem(style) {
  const entries = tokenEntries(style);
  const semantic = mapSemanticTokens(entries);

  const lines = ["## 2. Color System"];
  lines.push("Two layers: **primitive** tokens (the raw palette) and **semantic** tokens");
  lines.push("(roles that map onto primitives). Build UI against the SEMANTIC names so a");
  lines.push("theme swap only touches the mapping. Do not introduce colors outside this set");
  lines.push("without recording the reason in review.");

  // 2.1 — primitives (human table + machine-pasteable :root)
  lines.push("");
  lines.push("### 2.1 Primitive tokens");
  lines.push("| Token | Value | Role |");
  lines.push("|:------|:------|:-----|");
  lines.push(entries.map((e) => `| \`--${e.key}\` | \`${e.value}\` | ${e.usage} |`).join("\n"));
  lines.push("");
  lines.push("Paste this into your global stylesheet (or your framework's token layer):");
  lines.push("```css");
  lines.push(":root {");
  lines.push(entries.map((e) => `  --${e.key}: ${e.value};`).join("\n"));
  lines.push("}");
  lines.push("```");

  // 2.2 — semantic aliases
  if (semantic.length) {
    lines.push("");
    lines.push("### 2.2 Semantic tokens (build against these)");
    lines.push("```css");
    lines.push(":root {");
    lines.push(semantic.map((s) => `  --color-${s.role}: var(--${s.key});`).join("\n"));
    lines.push("}");
    lines.push("```");
  }

  // 2.3 — dark theme
  const bg = semantic.find((s) => s.role === "bg");
  const bgVal = bg ? entries.find((e) => e.key === bg.key)?.value : null;
  const lum = hexLuminance(bgVal);
  const neutralsMapped = semantic.filter((s) => s.neutral && DARK_NEUTRALS[s.role]);
  lines.push("");
  lines.push("### 2.3 Dark theme");
  if (lum != null && lum < 0.4) {
    lines.push("This palette is **dark-first** — the primitives above already define the dark");
    lines.push("appearance. If you need a light theme, invert the neutral ramp (light bg/surface,");
    lines.push("dark text) and re-check contrast; keep the action/status hues.");
  } else if (neutralsMapped.length) {
    lines.push("Light-first palette. Remap the NEUTRAL semantic tokens under");
    lines.push("`prefers-color-scheme: dark` (and/or a `[data-theme=\"dark\"]` selector). Action");
    lines.push("and status hues are kept — **verify each still meets AA contrast on the dark");
    lines.push("surfaces** and nudge in OKLCH if not. This ramp is a sane default, not gospel:");
    lines.push("```css");
    lines.push("@media (prefers-color-scheme: dark) {");
    lines.push("  :root {");
    lines.push(neutralsMapped.map((s) => `    --color-${s.role}: ${DARK_NEUTRALS[s.role]};`).join("\n"));
    lines.push("  }");
    lines.push("}");
    lines.push("```");
  } else {
    lines.push("No neutral semantic tokens were detected to remap automatically. Define a dark");
    lines.push("theme by overriding background/surface/text/border under");
    lines.push("`prefers-color-scheme: dark`, preserving the action and status hues.");
  }

  return lines.join("\n");
}

function buildTypography(style, locale) {
  const t = style.typography;
  const lines = ["## 3. Typography"];
  lines.push(`- **Display** — \`${t.display}\``);
  lines.push(`- **Body** — \`${t.body}\``);
  if (t.mono) lines.push(`- **Mono** — \`${t.mono}\``);
  if (t.scale) lines.push(`- **Type scale** — ${t.scale}`);
  if (t.weight) lines.push(`- **Weights** — ${t.weight}`);
  if (t.tracking) lines.push(`- **Tracking** — ${t.tracking}`);
  if (locale?.fonts) {
    lines.push("");
    lines.push("**Font loading (required — the named fonts MUST actually load, no silent system fallback):**");
    lines.push(`Add to \`<head>\`: \`<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="${locale.fonts}" rel="stylesheet">\``);
  }
  return lines.join("\n");
}

function buildSpacingGrid(state) {
  const density = DENSITY_LEVELS.find((d) => d.id === state.density);
  const lines = ["## 4. Spacing, Grid & Breakpoints"];
  lines.push(`- **Spacing scale (px)** — ${SPACING_SCALE.join(" · ")}. Compose all padding, margin, and gaps from this scale; never use off-scale values.`);
  lines.push("- **Grid** — 12-column, max content width 1200px, gutter 24px. Center the container; let full-bleed sections break out deliberately.");
  lines.push("- **Breakpoints** — `sm 640` · `md 768` · `lg 1024` · `xl 1280`. Design mobile-first; layer enhancements upward.");
  if (density?.override) {
    lines.push("");
    lines.push(`**Density directive — ${density.name}:** ${density.desc}. Apply the rhythm adjustments below on top of the scale above.`);
    lines.push("");
    lines.push(density.override);
  }
  return lines.join("\n");
}

function buildLayoutBlueprints(sections, pageType) {
  const lines = ["## 5. Layout Blueprints"];
  lines.push("This design system governs **every screen in the product**, not one page. Below:");
  lines.push("the primary screen's blueprint, then the other screens this surface is expected to");
  lines.push("cover — all of them share §2–§4 (color, type, spacing) and §6 (components).");

  // Primary blueprint
  lines.push("");
  lines.push(`### 5.1 Primary screen — ${pageType.name}`);
  lines.push("Build it from these sections, in order. Include only what earns its place — do not pad with sections that don't belong.");
  lines.push("");
  lines.push(sections.map((s, i) => `${i + 1}. ${s}`).join("\n"));

  // Sibling screens in the same product surface (purpose bucket) — makes this a
  // cross-screen system doc instead of a single-page brief.
  const bucket = PURPOSE_BUCKETS[pageType.purpose];
  const siblings = (PAGE_TYPES_BY_PURPOSE[pageType.purpose] || [])
    .filter((t) => t.id !== pageType.id)
    .slice(0, 6);
  if (siblings.length) {
    lines.push("");
    lines.push(`### 5.2 Other screens in this product${bucket ? ` (${bucket.name})` : ""}`);
    lines.push("Apply the SAME tokens, spacing scale, components, and motion to each. Keep the");
    lines.push("navigation shell, density, and interaction patterns identical across screens —");
    lines.push("consistency across the surface is what makes it feel like one product.");
    lines.push("");
    lines.push("| Screen | Typical sections |");
    lines.push("|:-------|:-----------------|");
    for (const t of siblings) {
      lines.push(`| **${t.name}** | ${(t.sections || []).join(" · ") || "—"} |`);
    }
  }

  lines.push("");
  lines.push("### 5.3 Layout principles (apply to every screen)");
  lines.push("- Establish a clear visual hierarchy: one primary action per view, supporting content subordinate to it.");
  lines.push("- Maintain a consistent vertical rhythm between sections using the spacing scale in §4.");
  lines.push("- Reflow, don't shrink: at narrow widths collapse multi-column layouts to a single column rather than scaling type down.");
  lines.push("- **Mobile-first & installable** — every screen MUST be responsive from 360px up and the build MUST meet the Responsive & PWA requirements in §8 (manifest, service worker, offline, theme-color). This is non-negotiable.");
  lines.push("- Every section needs real, specific content — no placeholder copy, lorem ipsum, or empty stats.");
  return lines.join("\n");
}

function buildComponentsSection(components) {
  if (!components.length) return null;
  const lines = ["## 6. Component Library"];
  lines.push("Reach for these primitives when the layout implies them — don't invent ad-hoc widgets when one fits. The accessibility notes are non-negotiable.");
  lines.push("");
  for (const c of components) {
    lines.push(`### ${c.name} _(${c.category} · tier ${c.tier})_`);
    lines.push(`- **Use when** — ${c.whenToUse}`);
    lines.push(`- **Not when** — ${c.whenNotToUse}`);
    lines.push(`- **A11y** — ${c.a11y}`);
    if (c.variants?.length) lines.push(`- **Variants** — ${c.variants.join(" · ")}`);
    if (c.pairsWithLibraries?.length) lines.push(`- **Pairs with** — ${c.pairsWithLibraries.join(", ")}`);
    lines.push("");
  }
  return lines.join("\n").trimEnd();
}

function buildMotion(style, state) {
  const lines = ["## 7. Motion"];
  // Pull any motion-flavored signature moves out of boldFactor as the baseline.
  const motionCues = style.boldFactor.filter((b) =>
    /motion|eas|animat|transition|hover|spring|scroll|parallax|micro-?interaction/i.test(b),
  );
  if (motionCues.length) {
    lines.push("**Style motion language:**");
    lines.push(motionCues.map((m) => `- ${m}`).join("\n"));
  } else {
    lines.push("- Keep motion purposeful and restrained: short durations (150–300ms), ease-out, no gratuitous movement.");
  }
  const motion = MOTION_LEVELS.find((m) => m.id === state.motion);
  if (motion?.override) {
    lines.push("");
    lines.push(motion.override);
  }
  lines.push("");
  lines.push("- Respect `prefers-reduced-motion`: disable non-essential animation when the user requests it.");
  return lines.join("\n");
}

function buildAccessibility(style, locale) {
  const overrides = [
    ...(style.overrideGlobalRules || []),
    ...(locale?.overrideGlobalRules || []),
  ];
  return [
    "## 8. Accessibility & Global Rules",
    "These apply to every screen, regardless of style. They are minimums, not targets.",
    "",
    renderGlobalRules(overrides),
  ].join("\n");
}

function buildDoDont(style) {
  const lines = ["## 9. Do / Don't"];
  lines.push("**Do — success looks like:**");
  lines.push(style.successLooksLike.map((s) => `- ${s}`).join("\n"));
  lines.push("");
  lines.push("**Don't — failure looks like:**");
  lines.push(style.failureLooksLike.map((s) => `- ${s}`).join("\n"));
  if (style.antiPatterns?.length) {
    lines.push("");
    lines.push("**Anti-patterns (and why they break the style):**");
    lines.push(style.antiPatterns.map((a) => `- **${a.name}** — don't ${a.dont}. _Why:_ ${a.why}.`).join("\n"));
  }
  if (style.responsive?.length) {
    lines.push("");
    lines.push("**Per-element responsive sizing:**");
    lines.push("| Element | Mobile | Tablet | Desktop |");
    lines.push("|---|---|---|---|");
    lines.push(style.responsive.map((r) => `| ${r.element} | ${r.mobile} | ${r.tablet} | ${r.desktop} |`).join("\n"));
  }
  return lines.join("\n");
}

function buildImplementation(style, stack, libraryIds) {
  const lines = ["## 10. Implementation Notes"];
  lines.push(`- **Target stack** — ${stack.name}. ${stack.desc}`);
  if (stack.pwa) lines.push(`- **PWA setup (${stack.name})** — ${stack.pwa}`);

  const libs = (libraryIds || [])
    .map((id) => getLibrary(id))
    .filter(Boolean)
    .filter((l) => l.stacks.length === 0 || l.stacks.includes(stack.id));
  if (libs.length) {
    lines.push("- **Approved libraries** (pin exact versions; prefer over hand-rolled UI logic):");
    for (const lib of libs) {
      const cdn = lib.cdn?.js || lib.cdn?.css || "";
      lines.push(`  - **${lib.name}** (${lib.category}, ${lib.license}) — ${lib.whenToUse}${cdn ? ` · \`${cdn}\`` : ""}`);
    }
  }

  if (style.snippets?.length) {
    lines.push("");
    lines.push("**Reference snippets — extend these, don't reinvent the signature effects:**");
    lines.push(style.snippets.map((s) => "```css\n" + s + "\n```").join("\n\n"));
  }
  return lines.join("\n");
}

function buildCultureMarket(locale, market) {
  if (!locale?.override && !market?.override) return null;
  const lines = ["## 11. Cultural & Market Context"];
  if (locale?.override) {
    lines.push("**Cultural layer (applies on top of the visual system — fonts, palette, and motifs here are mandatory; the anti-stereotype rules override decorative defaults):**");
    lines.push("");
    lines.push(locale.override);
  }
  if (market?.override) {
    if (locale?.override) lines.push("");
    lines.push("**Market / operating context (copy language, currency, payments, calendar, legal/trust cues — NOT the primary visual style):**");
    lines.push("");
    lines.push(market.override);
    if (market.visual) {
      lines.push("");
      lines.push(`- National visual accent (use sparingly, civic/national contexts only): ${market.visual}`);
    }
  }
  return lines.join("\n");
}

// ─── Main assembler ──────────────────────────────────────────────────────────
/**
 * Assemble a professional, reusable DESIGN.md from a studio state object.
 *
 * @param {object} state — same shape assemblePrompt() consumes: { style,
 *   density, drama, motion, locale, market, pageType, sections (Set|Array),
 *   stack, libraries (Set|Array), includeComponents, forcedComponents }
 * @returns {string} the DESIGN.md document (markdown)
 */
export function assembleDesignDoc(state) {
  const style = STYLE_PRESETS[state.style] || STYLE_PRESETS.monochrome;
  const pageType = PAGE_TYPES[state.pageType] || PAGE_TYPES.landing;
  const stack = STACKS[state.stack] || STACKS.html;

  const sections = state.sections instanceof Set
    ? Array.from(state.sections)
    : (Array.isArray(state.sections) && state.sections.length ? state.sections : pageType.sections);

  const libraryIds = state.libraries instanceof Set
    ? Array.from(state.libraries)
    : (Array.isArray(state.libraries) ? state.libraries : []);

  const locale = getLocale(state.locale);
  const market = getMarket(state.market);
  const components = selectComponents(state, sections, pageType);

  return [
    buildHeader(style),
    buildPrinciples(style),
    buildColorSystem(style),
    buildTypography(style, locale),
    buildSpacingGrid(state),
    buildLayoutBlueprints(sections, pageType),
    buildComponentsSection(components),
    buildMotion(style, state),
    buildAccessibility(style, locale),
    buildDoDont(style),
    buildImplementation(style, stack, libraryIds),
    buildCultureMarket(locale, market),
  ].filter(Boolean).join("\n\n");
}

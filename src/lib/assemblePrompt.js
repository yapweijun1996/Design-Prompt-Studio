// Prompt assembler — emits a 5-block prompt the user copies into Claude/GPT/etc.
//
// Structure (per docs/FLOW.md § 10a):
//   <role>            — who LLM is + posture (one-shot OR conversational)
//   <global-rules>    — applies to every prompt regardless of style
//   <design-system>   — chosen style + modifiers (longest block)
//   <operating-rules> — workflow guardrails (mode-specific)
//   <request>         — the brief

import { STYLE_PRESETS } from "../data/styles/index.js";
import { PAGE_TYPES } from "../data/taxonomy.js";
import { DENSITY_LEVELS, DRAMA_LEVELS, MOTION_LEVELS } from "../data/modifiers.js";
import { renderGlobalRules } from "../data/global-rules.js";
import { getLibrary } from "../data/libraries.js";
import {
  getComponent,
  getComponentsForStyle,
  getComponentsForContext,
} from "../data/components.js";

// Cap the number of components included per prompt. Each adds ~4 lines;
// 18 keeps the block under ~80 lines and prompt token-budget reasonable.
const MAX_COMPONENTS_PER_PROMPT = 18;

// ─── Stack defaults ─────────────────────────────────────────────────────────
const STACKS = {
  html: {
    id: "html",
    name: "Vanilla HTML",
    desc: "Single self-contained .html file with inline CSS and JS, Google Fonts via <link>, SVG icons inlined. No build step, no framework dependencies. Final file should open directly in a browser.",
  },
  react: {
    id: "react",
    name: "React + Tailwind",
    desc: "React functional components using Tailwind utility classes. lucide-react for icons. Default export. Single .jsx file unless multiple files are clearly warranted. Pin dependencies (React 18.3.1) with integrity hashes if delivering inline.",
  },
  next: {
    id: "next",
    name: "Next.js App Router",
    desc: "Next.js 14+ app router conventions. Server components by default with 'use client' only where needed. Tailwind for styling, shadcn/ui-compatible component patterns, lucide-react icons.",
  },
};

// ─── Role block ─────────────────────────────────────────────────────────────
function buildRole(promptMode, pageTypeName) {
  if (promptMode === "conversational") {
    return `<role>
You are an expert frontend designer and engineer working with the user as their product/design manager. They hold authority over scope and direction; you bring execution expertise across UI/UX, visual design, typography, and frontend code.

Your job: help them integrate the design system below into their work — by understanding context first, then proposing, then executing.
</role>`;
  }
  // one-shot (default)
  return `<role>
You are an expert frontend engineer, UI/UX designer, and typography specialist. Deliver a complete, production-ready ${pageTypeName.toLowerCase()} in a single response. No clarifying questions. No plans submitted for approval. No back-and-forth.
</role>`;
}

// ─── Operating rules block ──────────────────────────────────────────────────
function buildOperatingRules(state, stack, sectionList) {
  const { promptMode, pageType } = state;
  const pageTypeName = PAGE_TYPES[pageType]?.name || pageType;
  const stackInfo = STACKS[stack];

  if (promptMode === "conversational") {
    const questions = PAGE_TYPES[pageType]?.clarifyingQuestions || [];
    const questionBlock = questions.length > 0
      ? questions.map((q, i) => `   ${i + 1}. ${q}`).join("\n")
      : "   1-4. (use your judgment — 4 problem-specific questions)";
    return `<operating-rules>
You are working as the user's design execution partner. Follow this sequence:

1. CONTEXT — If no codebase / UI kit / brand has been attached, ask for one. Mocking a full product from scratch is a last resort.

2. CLARIFY — Before deciding direction, ask 8-12 focused questions covering:
   - Existing context (codebase, design system, UI kit, brand)
   - Variations desired (how many, across which axes)
   - Novelty: by-the-book or surprising
   - Priority: flow > copy > visuals
   - Tweaks: what should be tunable in the output
${questionBlock}
   (Bias toward concrete questions over open-ended ones.)

3. PLAN — Write a 5-7 bullet implementation plan. Wait for a nod before coding.

4. CODE — Build. Match the existing visual vocabulary if context was provided. Show file early with assumptions placeholder. Don't surface a 100% finished thing as your first reveal.

5. CLOSE — Summarize EXTREMELY BRIEFLY. Caveats and next steps only.

DESIGN SYSTEM IS LAW. Every Bold Factor item is mandatory, not optional. Layered textures are required where specified — never ship flat design. The CROSS-CUTTING OVERRIDES (if present) modify the system; apply on top without compromising non-negotiables.
</operating-rules>`;
  }

  // one-shot
  return `<operating-rules>
1. **No questions.** Make confident decisions. If an assumption is non-obvious, state it in one line inside the Design Decisions section at the end — never ask the user to confirm before delivering code.

2. **Tech stack**: ${stackInfo.name}. ${stackInfo.desc}

3. **Scope**: Deliver a complete responsive ${pageTypeName.toLowerCase()}. Include ONLY the sections listed below; do not pad with sections that don't belong.

   **Sections to include**:
${sectionList}

4. **Design system is law.** Every Bold Factor item and Enforcement rule is mandatory. Layered textures are required where specified — never ship flat design. The CROSS-CUTTING OVERRIDES (if present) modify the design system — apply those modifications on top of the base style without compromising the non-negotiables. If the brief contradicts the design system, the design system wins; note the conflict in Design Decisions.

5. **Accessibility is non-negotiable.** See the GLOBAL RULES block above — every item applies.

6. **Output format — strict.**
   - Start immediately with the code. No preamble.
   - After the code, a section titled **Design Decisions** with 4–7 bullets: assumptions made, which non-negotiables you applied and why, how you handled the cross-cutting overrides (if any), any deliberate deviations.
   - Then **EXTREMELY BRIEFLY** — caveats and next steps only. Nothing else.

7. **Express the design's personality.** Make deliberate, creative choices in layout, motion, interaction details, and typography. Generic boilerplate is a failure mode. The result should feel like the success references named in the design system below.
</operating-rules>`;
}

// ─── Design-system block ────────────────────────────────────────────────────
function buildDesignSystem(state) {
  const preset = STYLE_PRESETS[state.style];
  if (!preset) return "[unknown style]";

  const overrides = [];
  const density = DENSITY_LEVELS.find((d) => d.id === state.density);
  const drama = DRAMA_LEVELS.find((d) => d.id === state.drama);
  const motion = MOTION_LEVELS.find((m) => m.id === state.motion);
  if (density?.override) overrides.push(density.override);
  if (drama?.override) overrides.push(drama.override);
  if (motion?.override) overrides.push(motion.override);

  const boldFactorBlock = preset.boldFactor?.length
    ? `## Bold Factor — these MUST be present for authenticity\n${preset.boldFactor.map((b, i) => `${i + 1}. **${b}**`).join("\n")}`
    : "";

  const feelBlock = preset.feel ? `## The Feel\n_${preset.feel}_` : "";

  const responsiveBlock = preset.responsive?.length
    ? `\n## Mobile-Specific Adjustments\n| Element | Mobile | Tablet | Desktop |\n|---|---|---|---|\n${preset.responsive.map((r) => `| ${r.element} | ${r.mobile} | ${r.tablet} | ${r.desktop} |`).join("\n")}`
    : "";

  const overridesBlock = overrides.length > 0
    ? `\n## CROSS-CUTTING OVERRIDES (apply on top of the design system above)\n\n${overrides.join("\n\n")}\n`
    : "";

  return [
    feelBlock,
    boldFactorBlock,
    preset.md,
    responsiveBlock,
    overridesBlock,
  ].filter(Boolean).join("\n\n");
}

// ─── Libraries block ────────────────────────────────────────────────────────
function buildLibrariesBlock(libraryIds, stack) {
  if (!libraryIds || libraryIds.length === 0) return null;
  const libs = libraryIds
    .map((id) => getLibrary(id))
    .filter(Boolean)
    .filter((l) => !stack || l.stacks.length === 0 || l.stacks.includes(stack));
  if (libs.length === 0) return null;

  const lines = [];
  lines.push("<libraries>");
  lines.push("Prefer these libraries instead of writing UI logic from scratch.");
  lines.push("All are verified business-OK (MIT / Apache-2.0 / BSD / ISC).");
  lines.push("Load via the CDN URLs below — pin to the exact versions shown.\n");

  for (const lib of libs) {
    lines.push(`### ${lib.name}`);
    lines.push(`- Category: ${lib.category}`);
    lines.push(`- License: ${lib.license} ${lib.businessOk ? "(commercial OK)" : "(verify before commercial use)"}`);
    if (lib.size) lines.push(`- Size: ${lib.size}`);
    lines.push(`- ${lib.desc}`);
    lines.push(`- When to use: ${lib.whenToUse}`);
    if (lib.whenNotToUse) lines.push(`- When NOT to use: ${lib.whenNotToUse}`);
    if (lib.caveat) lines.push(`- Caveat: ${lib.caveat}`);
    if (lib.cdn.js) lines.push(`- CDN (JS): \`${lib.cdn.js}\``);
    if (lib.cdn.css) lines.push(`- CDN (CSS): \`${lib.cdn.css}\``);
    lines.push("");
  }

  lines.push("Usage rules:");
  lines.push("- Always include CDN script/link tags in the output's <head>.");
  lines.push("- Pin to the exact version shown — do not use @latest.");
  lines.push("- If a chosen library is overkill for the actual need, prefer vanilla and note the deviation in Design Decisions.");
  lines.push("- For any library that returns HTML you didn't write (markdown, rich-text), pipe through DOMPurify before innerHTML.");
  lines.push("</libraries>");
  return lines.join("\n");
}

// ─── Components block ───────────────────────────────────────────────────────
// Auto-include UI component primitives the LLM should pick from based on
// the chosen style + page sections + page-type purpose. Capped at
// MAX_COMPONENTS_PER_PROMPT to keep prompt budget reasonable.
//
// Scoring:
//   +3 — implied by a section / page-type keyword (strongest signal)
//   +2 — commonly paired with the chosen style
//   Tier 1 outranks Tier 2 outranks Tier 3 on equal scores.
function buildComponentsBlock(state, sectionNames, pageType) {
  if (state.includeComponents === false) return null;

  const contextKeywords = [
    ...sectionNames,
    pageType?.id,
    pageType?.purpose,
  ].filter(Boolean);

  const scored = new Map();
  for (const c of getComponentsForStyle(state.style)) {
    scored.set(c.id, (scored.get(c.id) || 0) + 2);
  }
  for (const c of getComponentsForContext(contextKeywords)) {
    scored.set(c.id, (scored.get(c.id) || 0) + 3);
  }

  // Forced components — explicitly pinned by the user (e.g. via the
  // "Use in Studio" button on the Components page). Always included,
  // win every tie via a very high score that sorts them to the top.
  const forced = state.forcedComponents instanceof Set
    ? Array.from(state.forcedComponents)
    : (Array.isArray(state.forcedComponents) ? state.forcedComponents : []);
  for (const id of forced) {
    if (getComponent(id)) scored.set(id, (scored.get(id) || 0) + 100);
  }

  if (scored.size === 0) return null;

  const sorted = [...scored.entries()]
    .map(([id, score]) => ({ component: getComponent(id), score }))
    .filter((e) => e.component)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.component.tier - b.component.tier;
    })
    .slice(0, MAX_COMPONENTS_PER_PROMPT);

  if (sorted.length === 0) return null;

  const lines = ["<components>"];
  lines.push(
    "Pick from these component primitives when the brief or sections imply them.",
  );
  lines.push(
    "Each entry tells you WHEN to use, when NOT to use (and what to use instead), and the accessibility musts.",
  );
  lines.push("");

  for (const { component: c } of sorted) {
    lines.push(`### ${c.name} _(${c.category} · tier ${c.tier})_`);
    lines.push(`- **When**: ${c.whenToUse}`);
    lines.push(`- **Not when**: ${c.whenNotToUse}`);
    lines.push(`- **A11y**: ${c.a11y}`);
    if (c.variants?.length) lines.push(`- **Variants**: ${c.variants.join(" · ")}`);
    if (c.pairsWithLibraries?.length) {
      lines.push(`- **Libs**: ${c.pairsWithLibraries.join(", ")}`);
    }
    lines.push("");
  }

  lines.push("Rules:");
  lines.push(
    "- Match a primitive to user needs implied by the sections + brief — don't invent ad-hoc widgets when a primitive fits.",
  );
  lines.push(
    "- A11y notes are non-negotiable. Failing them is a failure mode, same as breaking the design system.",
  );
  lines.push(
    "- If you deliberately skip a recommended primitive, note it in Design Decisions with the reason.",
  );
  lines.push("</components>");
  return lines.join("\n");
}

// ─── Request (brief) block ──────────────────────────────────────────────────
function buildRequest(brief) {
  const parts = [];
  if (brief.name) parts.push(`**Product / company name**: ${brief.name}`);
  if (brief.industry) parts.push(`**Industry / category**: ${brief.industry}`);
  if (brief.audience) parts.push(`**Audience**: ${brief.audience}`);
  if (brief.tone) parts.push(`**Tone / voice**: ${brief.tone}`);
  if (brief.references)
    parts.push(`**Real-world references** (use as inspiration, do not copy): ${brief.references}`);
  if (brief.context) parts.push(`**Must include**:\n${brief.context}`);
  if (brief.avoid) parts.push(`**Must avoid**: ${brief.avoid}`);
  return parts.length
    ? parts.join("\n\n")
    : "[REPLACE WITH YOUR PROJECT BRIEF — fill in the structured fields in Studio for best results.]";
}

// ─── Main assembler ─────────────────────────────────────────────────────────
/**
 * Assemble a full prompt from a state object.
 *
 * @param {object} state — { style, density, drama, motion, pageType, sections (Set or Array),
 *                            stack, outputMode, promptMode, brief }
 * @returns {string} the assembled prompt
 */
export function assemblePrompt(state) {
  const promptMode = state.promptMode || "one-shot";
  const style = STYLE_PRESETS[state.style] || STYLE_PRESETS.monochrome;
  const pageType = PAGE_TYPES[state.pageType] || PAGE_TYPES.landing;
  const stack = state.stack || "html";

  const sections = state.sections instanceof Set
    ? Array.from(state.sections)
    : (Array.isArray(state.sections) ? state.sections : pageType.sections);
  const sectionList = sections.length
    ? sections.map((s) => `- ${s}`).join("\n")
    : "- (none specified — pick reasonable sections from the design system)";

  const libraryIds = state.libraries instanceof Set
    ? Array.from(state.libraries)
    : (Array.isArray(state.libraries) ? state.libraries : []);

  const roleBlock = buildRole(promptMode, pageType.name);
  const globalRulesText = renderGlobalRules(style.overrideGlobalRules || []);
  const designSystemBlock = buildDesignSystem(state);
  const librariesBlock = buildLibrariesBlock(libraryIds, stack);
  const componentsBlock = buildComponentsBlock(state, sections, pageType);
  const operatingRulesBlock = buildOperatingRules(state, stack, sectionList);
  const requestBlock = buildRequest(state.brief || {});

  return [
    roleBlock,
    `<global-rules>\n${globalRulesText}\n</global-rules>`,
    `<design-system>\n${designSystemBlock}\n</design-system>`,
    librariesBlock,
    componentsBlock,
    operatingRulesBlock,
    `<request>\n${requestBlock}\n</request>`,
  ].filter(Boolean).join("\n\n");
}

// ─── Token / char stats ─────────────────────────────────────────────────────
export function promptStats(prompt) {
  return {
    chars: prompt.length,
    tokens: Math.ceil(prompt.length / 3.6),
    lines: prompt.split("\n").length,
  };
}

// ─── Convenience: assemble from a prompt-card object ────────────────────────
export function assembleFromCard(card) {
  return assemblePrompt({
    style: card.style,
    density: card.density,
    drama: card.drama,
    motion: card.motion,
    pageType: card.pageType,
    sections: card.sections,
    stack: card.stack,
    outputMode: card.outputMode,
    promptMode: card.promptMode || "one-shot",
    libraries: card.libraries,
    includeComponents: card.includeComponents,
    forcedComponents: card.forcedComponents,
    brief: card.brief,
  });
}

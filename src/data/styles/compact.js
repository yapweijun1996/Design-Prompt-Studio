// Compact preset format — lets new styles ship without 250-line hand-written md.
// expandCompactPreset() synthesizes a full md from the structured fields when
// the prompt is assembled. Original 5 styles (mono/brutalist/editorial/y2k/glass)
// keep their hand-written md and bypass this expansion.

/**
 * Schema (informal):
 *   {
 *     id, name, tag, desc, feel,
 *     boldFactor: string[4-6],
 *     references: string,        // 4-7 brands/publications/spaces
 *     tokens: { primary, fg, bg, accent, ... },
 *     typography: { display, body, mono },
 *     antiPatterns: [{ name, dont, why }],
 *     responsive: [{ element, mobile, tablet, desktop }],
 *     snippets: string[3-5],
 *     successLooksLike: string[3-4],
 *     failureLooksLike: string[3-4],
 *     overrideGlobalRules: string[],
 *     tile: string,              // CSS class for the tile preview
 *     tileHTML: string,          // inner HTML of the preview tile
 *     // No `md` field — synthesized by expandCompactPreset
 *   }
 */

export function expandCompactPreset(preset) {
  const sections = [];

  sections.push(`# Design Style: ${preset.name}`);

  // ─── 1. Philosophy ─────────────────────────────────────────────────────────
  sections.push(`## 1. Philosophy`);
  sections.push(`**Core principle**: ${preset.desc}`);
  sections.push(`**Feel**: ${preset.feel}`);
  if (preset.references) sections.push(`**Real-world references**: ${preset.references}`);

  // ─── 2. DNA / Bold Factor ──────────────────────────────────────────────────
  if (preset.boldFactor?.length) {
    sections.push(`## 2. Bold Factor (these MUST be present for authenticity)`);
    sections.push(preset.boldFactor.map((b, i) => `${i + 1}. **${b}**`).join("\n"));
  }

  // ─── 3. Tokens ────────────────────────────────────────────────────────────
  if (preset.tokens) {
    sections.push(`## 3. Tokens`);
    const rows = Object.entries(preset.tokens).map(([k, v]) => {
      const value = typeof v === "object" ? v.value : v;
      const usage = typeof v === "object" ? v.usage : "";
      return `| --${k} | ${value} | ${usage} |`;
    });
    sections.push(`| Token | Value | Usage |\n|:------|:------|:------|\n${rows.join("\n")}`);
  }

  // Typography
  if (preset.typography) {
    const t = preset.typography;
    sections.push(`### Typography`);
    sections.push(`- Display: \`${t.display}\``);
    sections.push(`- Body: \`${t.body}\``);
    if (t.mono) sections.push(`- Mono: \`${t.mono}\``);
    if (t.scale) sections.push(`- Scale: ${t.scale}`);
    if (t.weight) sections.push(`- Weight: ${t.weight}`);
    if (t.tracking) sections.push(`- Tracking: ${t.tracking}`);
  }

  // ─── 4. Anti-Patterns ──────────────────────────────────────────────────────
  if (preset.antiPatterns?.length) {
    sections.push(`## 4. Anti-Patterns (what this design is NOT)`);
    sections.push(preset.antiPatterns.map((a) => `- **${a.name}**: don't ${a.dont}. Why: ${a.why}.`).join("\n"));
  }

  // ─── 5. Responsive ────────────────────────────────────────────────────────
  if (preset.responsive?.length) {
    sections.push(`## 5. Mobile-Specific Adjustments`);
    sections.push(`| Element | Mobile | Tablet | Desktop |\n|---|---|---|---|`);
    sections.push(preset.responsive.map((r) => `| ${r.element} | ${r.mobile} | ${r.tablet} | ${r.desktop} |`).join("\n"));
  }

  // ─── 6. Code Snippets ──────────────────────────────────────────────────────
  if (preset.snippets?.length) {
    sections.push(`## 6. Code Snippets (extend these, don't invent from scratch)`);
    sections.push(preset.snippets.map((s) => "```css\n" + s + "\n```").join("\n\n"));
  }

  // ─── 7. Success vs Failure ─────────────────────────────────────────────────
  if (preset.successLooksLike?.length || preset.failureLooksLike?.length) {
    sections.push(`## 7. What success / failure looks like`);
    if (preset.successLooksLike?.length) {
      sections.push(`### Success`);
      sections.push(preset.successLooksLike.map((s) => `- ${s}`).join("\n"));
    }
    if (preset.failureLooksLike?.length) {
      sections.push(`### Failure`);
      sections.push(preset.failureLooksLike.map((s) => `- ${s}`).join("\n"));
    }
  }

  return sections.join("\n\n");
}

/**
 * Apply expandCompactPreset to a compact preset and return one that "looks like" a
 * full preset (with the synthesized md field), preserving all other fields.
 */
export function asFullPreset(compact) {
  return {
    ...compact,
    md: expandCompactPreset(compact),
  };
}

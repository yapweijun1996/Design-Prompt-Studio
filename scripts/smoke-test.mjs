// Standalone smoke test for the data layer + assembler.
// Run with: node scripts/smoke-test.mjs
//
// Not part of the build — useful for verifying P1 / future data-layer changes.

import { ALL_PROMPTS, CURATED_PROMPTS, promptStats, pickFeaturedPrompt, searchPrompts } from "../src/data/prompts/index.js";
import { STYLE_PRESETS, STYLE_IDS } from "../src/data/styles/index.js";
import { PAGE_TYPES, pageTypeCount } from "../src/data/taxonomy.js";
import { assemblePrompt, assembleFromCard, promptStats as charStats } from "../src/lib/assemblePrompt.js";
import { STYLE_VARIANTS, getVariant, findVariantForState } from "../src/data/style-variants.js";
import { MOOD_PRESETS } from "../src/data/moods.js";

const checks = [];
function check(label, fn) {
  try {
    const result = fn();
    checks.push({ label, ok: result !== false, value: result });
  } catch (e) {
    checks.push({ label, ok: false, error: e.message });
  }
}

// ─── Counts ────────────────────────────────────────────────────────────────
check("style count = 10 (5 original + 5 compact)", () => STYLE_IDS.length === 10);
check("page-type count ≥ 30", () => pageTypeCount() >= 30);
check("curated prompts = 5", () => CURATED_PROMPTS.length === 5);
check("ALL_PROMPTS ≥ 300", () => ALL_PROMPTS.length >= 300);
check("MOOD_PRESETS = 9", () => MOOD_PRESETS.length === 9);
check("STYLE_VARIANTS = 90 (10×9)", () => STYLE_VARIANTS.length === 90);

// Verify a variant resolves back to its base + modifiers
check("variant linear--whisper resolves correctly", () => {
  const v = getVariant("linear--whisper");
  return v?.baseStyle === "linear" && v?.density === "sparse" && v?.drama === "subtle" && v?.motion === "minimal";
});

// Reverse lookup
check("findVariantForState round-trip", () => {
  const state = { style: "cyberpunk", density: "dense", drama: "loud", motion: "playful" };
  const v = findVariantForState(state);
  return v?.id === "cyberpunk--frenzy";
});

// Compact preset md synthesized
check("compact preset 'linear' has synthesized md > 1000 chars", () => {
  return STYLE_PRESETS.linear?.md?.length > 1000;
});
check("compact preset 'memphis' has Bold Factor section in md", () => {
  return STYLE_PRESETS.memphis?.md?.includes("Bold Factor");
});

// ─── Assemble each curated ────────────────────────────────────────────────
for (const card of CURATED_PROMPTS) {
  check(`assemble curated: ${card.id}`, () => {
    const prompt = assembleFromCard(card);
    const s = charStats(prompt);
    // Curated briefs should be sizeable
    return s.chars > 3000 ? `${s.chars} chars / ~${s.tokens} tokens` : false;
  });
}

// ─── Assemble a sampling of standard prompts ──────────────────────────────
for (const styleId of STYLE_IDS.slice(0, 2)) {
  for (const pageId of Object.keys(PAGE_TYPES).slice(0, 3)) {
    check(`assemble standard: ${styleId}-${pageId}`, () => {
      const prompt = assemblePrompt({
        style: styleId,
        pageType: pageId,
        density: "default",
        drama: "confident",
        motion: "default",
        sections: PAGE_TYPES[pageId].sections,
        stack: "html",
        outputMode: "single-file",
        promptMode: "one-shot",
        brief: { name: "[YOUR PRODUCT]" },
      });
      return prompt.length > 2000;
    });
  }
}

// ─── Block-structure check ─────────────────────────────────────────────────
check("prompt contains <role> block", () => {
  const p = assembleFromCard(CURATED_PROMPTS[0]);
  return p.includes("<role>") && p.includes("</role>");
});
check("prompt contains <global-rules> block", () => {
  const p = assembleFromCard(CURATED_PROMPTS[0]);
  return p.includes("<global-rules>") && p.includes("</global-rules>");
});
check("prompt contains <design-system> block", () => {
  const p = assembleFromCard(CURATED_PROMPTS[0]);
  return p.includes("<design-system>") && p.includes("</design-system>");
});
check("prompt contains <operating-rules> block", () => {
  const p = assembleFromCard(CURATED_PROMPTS[0]);
  return p.includes("<operating-rules>") && p.includes("</operating-rules>");
});
check("prompt contains <request> block", () => {
  const p = assembleFromCard(CURATED_PROMPTS[0]);
  return p.includes("<request>") && p.includes("</request>");
});

// ─── Conversational mode toggle ────────────────────────────────────────────
check("conversational mode emits different <role>", () => {
  const card = { ...CURATED_PROMPTS[0], promptMode: "conversational" };
  const conv = assembleFromCard(card);
  const oneshot = assembleFromCard(CURATED_PROMPTS[0]);
  return conv.includes("working with the user as their product/design manager") && !oneshot.includes("working with the user as their product/design manager");
});

// ─── overrideGlobalRules ───────────────────────────────────────────────────
check("Editorial preset overrides global rule for Fraunces", () => {
  const card = { ...CURATED_PROMPTS[0], style: "editorial" };
  const p = assembleFromCard(card);
  return p.includes("STYLE-LEVEL OVERRIDES") && p.includes("Fraunces");
});

// ─── search ────────────────────────────────────────────────────────────────
check("search for 'watch' finds horloge", () => {
  const results = searchPrompts({ query: "watch" });
  return results.some((r) => r.id === "horloge");
});
check("filter by style=monochrome works", () => {
  const results = searchPrompts({ style: "monochrome" });
  return results.length > 0 && results.every((r) => r.style === "monochrome");
});

// ─── featured rotation ─────────────────────────────────────────────────────
check("pickFeaturedPrompt returns a curated", () => {
  const p = pickFeaturedPrompt();
  return p && p.tier === "curated";
});

// ─── Report ────────────────────────────────────────────────────────────────
const passed = checks.filter((c) => c.ok).length;
const failed = checks.filter((c) => !c.ok);

console.log(`\n=== Smoke test: ${passed}/${checks.length} passed ===\n`);
for (const c of checks) {
  const status = c.ok ? "✓" : "✗";
  const detail = c.value !== undefined && c.ok ? `  → ${typeof c.value === "string" ? c.value : ""}` : (c.error ? `  → ${c.error}` : "");
  console.log(`${status} ${c.label}${detail}`);
}

console.log(`\nStats: ${JSON.stringify(promptStats(), null, 2)}`);

process.exit(failed.length === 0 ? 0 : 1);

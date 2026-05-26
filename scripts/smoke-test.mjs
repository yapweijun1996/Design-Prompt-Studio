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
import { LIBRARIES, LIBRARY_CATEGORIES, libraryCount, getLibrary } from "../src/data/libraries.js";

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
check("style count = 20 (5 original + 15 compact)", () => STYLE_IDS.length === 20);
check("page-type count ≥ 30", () => pageTypeCount() >= 30);
check("curated prompts = 5", () => CURATED_PROMPTS.length === 5);
check("ALL_PROMPTS ≥ 600", () => ALL_PROMPTS.length >= 600);
check("MOOD_PRESETS = 9", () => MOOD_PRESETS.length === 9);
check("STYLE_VARIANTS = 180 (20×9)", () => STYLE_VARIANTS.length === 180);

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

// ─── Libraries ─────────────────────────────────────────────────────────────
check("LIBRARIES has ≥ 30 entries", () => libraryCount() >= 30);
check("LIBRARY_CATEGORIES has ≥ 10", () => LIBRARY_CATEGORIES.length >= 10);
check("All libraries are business-OK", () => LIBRARIES.every((l) => l.businessOk === true));
check("All libraries have license in safe list", () => {
  const safe = new Set(["MIT", "Apache-2.0", "BSD-2", "BSD-3", "ISC"]);
  return LIBRARIES.every((l) => safe.has(l.license));
});
check("No library mentions a paid tier in its fields", () => {
  // Strict policy: zero libraries with commercial-tier complications. Reject any
  // entry whose desc / caveat / whenToUse / whenNotToUse mention paid features.
  const forbidden = /\b(paid|enterprise version|pro plan|pro tier|premium tier|commercial license|requires a license|license fee)\b/i;
  const bad = LIBRARIES.filter((l) => {
    const blob = [l.desc, l.caveat, l.whenToUse, l.whenNotToUse].filter(Boolean).join(" ");
    return forbidden.test(blob);
  });
  if (bad.length > 0) {
    console.error("Libraries with paid-tier mentions:", bad.map((l) => l.id));
    return false;
  }
  return true;
});
check("All CDN URLs are pinned to a version (no @latest)", () => {
  return LIBRARIES.every((l) => {
    const urls = [l.cdn.js, l.cdn.css].filter(Boolean);
    return urls.every((u) => !u.includes("@latest"));
  });
});
check("chartjs library exists and has CDN url", () => {
  const c = getLibrary("chartjs");
  return c && c.cdn.js?.startsWith("https://");
});
check("DOMPurify is present (required for markdown safety)", () => {
  return !!getLibrary("dompurify");
});

// Prompt assembly with libraries
check("assembling with libraries injects <libraries> block", () => {
  const prompt = assemblePrompt({
    style: "monochrome", pageType: "landing",
    density: "default", drama: "confident", motion: "default",
    sections: ["hero"], stack: "html", outputMode: "single-file",
    promptMode: "one-shot",
    libraries: ["chartjs", "marked", "lucide"],
    brief: { name: "Test" },
  });
  return prompt.includes("<libraries>") && prompt.includes("Chart.js") && prompt.includes("marked.js") && prompt.includes("Lucide");
});

check("library block omitted when no libraries selected", () => {
  const prompt = assemblePrompt({
    style: "monochrome", pageType: "landing",
    density: "default", drama: "confident", motion: "default",
    sections: ["hero"], stack: "html",
    promptMode: "one-shot",
    libraries: [],
    brief: { name: "Test" },
  });
  return !prompt.includes("<libraries>");
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

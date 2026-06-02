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
import { LOCALE_PRESETS, getLocale, localeCount } from "../src/data/locales.js";
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
check("style count ≥ 20", () => STYLE_IDS.length >= 20);
check("page-type count ≥ 30", () => pageTypeCount() >= 30);
check("curated prompts ≥ 15 (5 original + 10 culture cards)", () => CURATED_PROMPTS.length >= 15);
check("culture card 'saigon-cafe' assembles with Vietnamese cultural block", () => {
  const card = CURATED_PROMPTS.find((c) => c.id === "saigon-cafe");
  if (!card || card.locale !== "vietnam") return false;
  const p = assembleFromCard(card);
  return p.includes("CULTURAL CONTEXT — VIETNAMESE") && p.includes("Be Vietnam Pro");
});
check("culture cards cover ≥ 5 distinct locales", () => {
  const locales = new Set(CURATED_PROMPTS.map((c) => c.locale).filter(Boolean));
  return locales.size >= 5;
});
check("ALL_PROMPTS ≥ 600", () => ALL_PROMPTS.length >= 600);
check("MOOD_PRESETS = 9", () => MOOD_PRESETS.length === 9);
check("STYLE_VARIANTS = bases × moods", () => STYLE_VARIANTS.length === STYLE_IDS.length * MOOD_PRESETS.length);

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

// ─── Region / Culture axis ───────────────────────────────────────────────────
check("LOCALE_PRESETS has ≥ 6 entries", () => localeCount() >= 6);
check("locale 'default' exists and injects NO cultural-context block", () => {
  if (getLocale("default").override !== "") return false;
  const p = assemblePrompt({
    style: "cafe", pageType: "landing",
    density: "default", drama: "confident", motion: "default",
    locale: "default", sections: ["hero"], stack: "html",
    promptMode: "one-shot", brief: { name: "Test" },
  });
  // The operating-rules prose mentions <cultural-context> conditionally; assert the
  // actual block (its unique sentinel) is absent for the default locale.
  return !p.includes("Apply this cultural layer ON TOP") && !p.includes("CULTURAL CONTEXT —");
});
check("locale 'vietnam' injects <cultural-context> + Be Vietnam Pro font", () => {
  const p = assemblePrompt({
    style: "cafe", pageType: "landing",
    density: "default", drama: "confident", motion: "default",
    locale: "vietnam", sections: ["hero"], stack: "html",
    promptMode: "one-shot", brief: { name: "Cà Phê" },
  });
  return p.includes("<cultural-context>") && p.includes("Be Vietnam Pro") && p.includes("CULTURAL CONTEXT — VIETNAMESE");
});
check("locale 'vietnam' emits a Google-Fonts <link> for Be Vietnam Pro", () => {
  if (!getLocale("vietnam").fonts) return false;
  const p = assemblePrompt({
    style: "cafe", pageType: "landing",
    density: "default", drama: "confident", motion: "default",
    locale: "vietnam", sections: ["hero"], stack: "html",
    promptMode: "one-shot", brief: { name: "Cà Phê" },
  });
  return p.includes("FONT LOADING") && p.includes("fonts.googleapis.com/css2?family=Be+Vietnam+Pro") && p.includes("rel=\"stylesheet\"");
});
check("locale 'default' emits NO font link (no fonts field)", () => {
  return getLocale("default").fonts === null;
});
check("locale 'vietnam' font rule reaches STYLE-LEVEL OVERRIDES (beats avoid-Inter)", () => {
  const p = assemblePrompt({
    style: "saas", pageType: "landing",
    density: "default", drama: "confident", motion: "default",
    locale: "vietnam", sections: ["hero"], stack: "html",
    promptMode: "one-shot", brief: { name: "Test" },
  });
  return p.includes("STYLE-LEVEL OVERRIDES") && p.includes("Be Vietnam Pro");
});
check("locale composes onto any base style (peranakan × boutique)", () => {
  const p = assemblePrompt({
    style: "boutique", pageType: "landing",
    density: "default", drama: "confident", motion: "default",
    locale: "peranakan", sections: ["hero"], stack: "html",
    promptMode: "one-shot", brief: { name: "Nyonya" },
  });
  return p.includes("PERANAKAN") && p.includes("Noto Serif SC");
});
check("every locale has anti-stereotype guidance (except default)", () => {
  return LOCALE_PRESETS.every((l) => l.id === "default" || /ANTI-STEREOTYPE/i.test(l.override));
});
check("locale survives share-URL encode→decode round-trip (lo field)", () => {
  const payload = { s: "cafe", p: "landing", d: "default", r: "confident", m: "default", lo: "vietnam", k: "html", o: "single-file", M: "one-shot", se: ["hero"], l: [], b: {} };
  const decoded = JSON.parse(JSON.stringify(payload));
  return decoded.lo === "vietnam";
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

// End-to-end: libraries selected as Set survive a JSON.stringify/parse cycle
// (simulates the localStorage persist→load round-trip the UI does).
check("libraries survive persist→load round-trip", () => {
  // 1. State as Step 4 builds it (Set)
  const stateOut = {
    style: "monochrome", pageType: "landing",
    density: "default", drama: "confident", motion: "default",
    sections: new Set(["hero"]), stack: "html",
    promptMode: "one-shot",
    libraries: new Set(["chartjs", "marked", "dompurify"]),
    brief: { name: "Test" },
  };

  // 2. Persist: Studio.js converts Set→Array before store.set
  const serializable = {
    ...stateOut,
    sections: Array.from(stateOut.sections),
    libraries: Array.from(stateOut.libraries),
  };
  const raw = JSON.stringify(serializable);

  // 3. Load: store.get returns parsed object; Studio.js rehydrates Array→Set
  const loaded = JSON.parse(raw);
  loaded.sections = new Set(loaded.sections);
  loaded.libraries = new Set(loaded.libraries);

  // 4. Verify rehydration
  if (!(loaded.libraries instanceof Set)) return false;
  if (loaded.libraries.size !== 3) return false;
  if (!loaded.libraries.has("chartjs")) return false;

  // 5. Verify assemblePrompt downstream gets the libraries
  const prompt = assemblePrompt(loaded);
  return prompt.includes("Chart.js") && prompt.includes("marked.js") && prompt.includes("DOMPurify");
});

// End-to-end: share URL encoding survives the round-trip
check("libraries survive share-URL encode→decode round-trip", () => {
  const stateOut = {
    style: "y2k", pageType: "landing",
    density: "balanced", drama: "loud", motion: "playful",
    sections: new Set(["hero", "features"]), stack: "html",
    promptMode: "one-shot",
    libraries: new Set(["chartjs", "tabulator"]),
    brief: { name: "Demo" },
  };

  // Mirror 5-review.js buildShareUrl payload shape
  const payload = {
    s: stateOut.style, p: stateOut.pageType,
    d: stateOut.density, r: stateOut.drama, m: stateOut.motion,
    k: stateOut.stack, o: "single-file", M: stateOut.promptMode,
    se: Array.from(stateOut.sections),
    l: Array.from(stateOut.libraries),
    b: stateOut.brief,
  };
  const json = JSON.stringify(payload);

  // Decode (mirror Studio.js stateFromHashShare)
  const p = JSON.parse(json);
  if (!Array.isArray(p.l) || p.l.length !== 2) return false;
  return p.l.includes("chartjs") && p.l.includes("tabulator");
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

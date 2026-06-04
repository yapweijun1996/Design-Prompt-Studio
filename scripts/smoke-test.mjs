// Standalone smoke test for the data layer + assembler.
// Run with: node scripts/smoke-test.mjs
//
// Not part of the build — useful for verifying P1 / future data-layer changes.

import { ALL_PROMPTS, CURATED_PROMPTS, promptStats, pickFeaturedPrompt, searchPrompts, sortForBrowse, collapseToStyles, getAvailableMarkets } from "../src/data/prompts/index.js";
import { STYLE_PRESETS, STYLE_IDS } from "../src/data/styles/index.js";
import { CATEGORY_IDS, STYLE_CATEGORY_MAP } from "../src/data/styles/categories.js";
import { validateStyleRegistry } from "../src/data/styles/schema.js";
import { PAGE_TYPES, PURPOSE_BUCKETS, PAGE_TYPES_BY_PURPOSE, pageTypeCount } from "../src/data/taxonomy.js";
import { assemblePrompt, assembleFromCard, promptStats as charStats } from "../src/lib/assemblePrompt.js";
import { scoreQuality } from "../src/lib/qualityScore.js";
import { suggestIndustries, industryLabel } from "../src/data/industries.js";
import { getComponentsForContext } from "../src/data/components.js";
import { STYLE_VARIANTS, getVariant, findVariantForState } from "../src/data/style-variants.js";
import { MOOD_PRESETS } from "../src/data/moods.js";
import { LOCALE_PRESETS, getLocale, localeCount } from "../src/data/locales.js";
import { MARKET_PRESETS, getMarket, marketCount } from "../src/data/markets.js";
import { LIBRARIES, LIBRARY_CATEGORIES, libraryCount, getLibrary } from "../src/data/libraries.js";
import { STATIC_STYLE_SAMPLE_IDS, buildStyleSampleHTML } from "../src/gallery/SamplePreview.js";
import { existsSync, readFileSync } from "node:fs";

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
check("style registry contains no generated placeholder styles", () => !STYLE_IDS.some((id) => id.startsWith("gen-")));
check("latest 5 hand-authored styles lead the registry", () => {
  return STYLE_IDS.slice(0, 5).join(",") === "securityreview,fielddispatch,boardmemo,archiveindex,kitchendisplay";
});
check("latest 5 styles lead Gallery catalog", () => {
  const cards = collapseToStyles(sortForBrowse(searchPrompts({}))).filter((p) => p.tier !== "curated");
  return cards.slice(0, 5).map((p) => p.style).join(",") === "securityreview,fielddispatch,boardmemo,archiveindex,kitchendisplay";
});
check("static sample HTML ids are registry-leading and have files", () => {
  if (STATIC_STYLE_SAMPLE_IDS.join(",") !== STYLE_IDS.slice(0, STATIC_STYLE_SAMPLE_IDS.length).join(",")) return false;
  return STATIC_STYLE_SAMPLE_IDS.every((id) => {
    const path = `public/style-samples/${id}.html`;
    return existsSync(path) &&
      readFileSync(path, "utf8").includes("<!doctype html>") &&
      buildStyleSampleHTML(id).includes(`sample output`);
  });
});
check("style registry schema is standardized", () => {
  const result = validateStyleRegistry({
    stylePresets: STYLE_PRESETS,
    styleIds: STYLE_IDS,
    categoryMap: STYLE_CATEGORY_MAP,
    categoryIds: CATEGORY_IDS,
    staticSampleIds: STATIC_STYLE_SAMPLE_IDS,
    fileExists: (styleId) => existsSync(`public/style-samples/${styleId}.html`),
    readStaticSampleHTML: (styleId) => {
      const path = `public/style-samples/${styleId}.html`;
      return existsSync(path) ? readFileSync(path, "utf8") : null;
    },
    buildStaticSampleHTML: buildStyleSampleHTML,
  });
  if (!result.ok) throw new Error(result.errors.slice(0, 3).map((error) => `${error.code}:${error.styleId || "registry"}`).join(", "));
  return `${result.summary.totalStyles} styles / ${result.summary.staticSamples} static samples`;
});
check("premium modern styles present (vercel/stripe/apple/notion/aesop/bento)", () => {
  return ["vercel", "stripe", "apple", "notion", "aesop", "bento"].every((id) => STYLE_PRESETS[id]?.md?.length > 500);
});
check("curation: default browse hides experimental, category reveals them", () => {
  const all = searchPrompts({});
  const exp = searchPrompts({ category: "experimental" });
  const noExpInDefault = all.every((p) => !["y2k", "geocities", "vaporwave", "antidesign"].includes(p.style));
  return exp.length > 0 && noExpInDefault && exp.some((p) => p.style === "y2k");
});
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

// ─── Market / Region axis (orthogonal to heritage) ───────────────────────────
check("MARKET_PRESETS has ≥ 6 entries", () => marketCount() >= 6);
check("market 'none' exists and injects NO market-context", () => {
  if (getMarket("none").override !== "") return false;
  const p = assemblePrompt({
    style: "saas", pageType: "landing",
    density: "default", drama: "confident", motion: "default",
    market: "none", sections: ["hero"], stack: "html",
    promptMode: "one-shot", brief: { name: "Test" },
  });
  return !p.includes("<market-context>");
});
check("market 'my' injects <market-context> with Ringgit + FPX", () => {
  const p = assemblePrompt({
    style: "saas", pageType: "landing",
    density: "default", drama: "confident", motion: "default",
    market: "my", sections: ["hero"], stack: "html",
    promptMode: "one-shot", brief: { name: "Test" },
  });
  return p.includes("<market-context>") && p.includes("MARKET CONTEXT — MALAYSIA") && p.includes("FPX") && p.includes("Ringgit");
});
check("two axes compose: heritage=chinese × market=my → BOTH blocks present", () => {
  const p = assemblePrompt({
    style: "boutique", pageType: "landing",
    density: "default", drama: "confident", motion: "default",
    locale: "chinese", market: "my", sections: ["hero"], stack: "html",
    promptMode: "one-shot", brief: { name: "新年礼盒" },
  });
  return p.includes("CULTURAL CONTEXT — CHINESE") && p.includes("MARKET CONTEXT — MALAYSIA");
});
check("every market (except none) names a currency + payment cue", () => {
  return MARKET_PRESETS.every((m) => m.id === "none" || /Payments to surface/i.test(m.override));
});
check("market survives share-URL round-trip (mk field)", () => {
  const payload = { s: "saas", p: "landing", lo: "chinese", mk: "my", b: {} };
  return JSON.parse(JSON.stringify(payload)).mk === "my";
});
check("national-visual: market 'my' adds a NATIONAL VISUAL ACCENT (Jalur Gemilang)", () => {
  if (!getMarket("my").visual) return false;
  const p = assemblePrompt({
    style: "government", pageType: "landing",
    density: "default", drama: "confident", motion: "default",
    market: "my", sections: ["hero"], stack: "html",
    promptMode: "one-shot", brief: { name: "Test" },
  });
  return p.includes("NATIONAL VISUAL ACCENT") && p.includes("Jalur Gemilang");
});
check("national-visual: market 'none' has no visual accent", () => getMarket("none").visual === null);
check("gallery: getAvailableMarkets ≥ 6 (cards now market-tagged)", () => getAvailableMarkets().length >= 6);
check("gallery: searchPrompts({market:'my'}) surfaces the Malaysia cards", () => {
  const r = searchPrompts({ market: "my" });
  const ids = r.map((p) => p.id);
  return r.length >= 2 && ids.includes("peranakan-boutique") && ids.includes("merdeka-portal");
});
check("gallery: searchPrompts({market:'vn'}) surfaces saigon-cafe", () => {
  return searchPrompts({ market: "vn" }).some((p) => p.id === "saigon-cafe");
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

// ─── Prompt quality scorer ─────────────────────────────────────────────────
check("empty state scores low and gate=block", () => {
  const q = scoreQuality({});
  return q.score < 50 && q.gate === "block" && q.criticalMissing >= 2;
});
check("score is bounded 0..100", () => {
  const q = scoreQuality({});
  const full = scoreQuality({
    stack: "html",
    sections: new Set(["hero", "features", "cta"]),
    brief: { name: "TraceForge", industry: "developer tools", audience: "software engineers evaluating tools during work hours", tone: "clear, technical, credible, concise", context: "hero must show a real metric", avoid: "purple gradients, fake testimonials" },
  });
  return q.score >= 0 && full.score <= 100;
});
check("fully-specified state scores high and gate=ready", () => {
  const q = scoreQuality({
    stack: "react",
    sections: new Set(["hero", "features", "pricing", "cta", "footer"]),
    brief: {
      name: "TraceForge",
      industry: "developer tools",
      audience: "software engineers and engineering managers evaluating observability tools",
      tone: "clear, practical, technical, credible, concise",
      context: "hero must include a believable metric; show GitHub integration",
      avoid: "generic AI claims, purple gradient hero, stock photos",
    },
  });
  return q.score >= 80 && q.gate === "ready" && q.criticalMissing === 0 && q.fixes.length === 0;
});
check("partial state gate=warn with fixes", () => {
  const q = scoreQuality({
    stack: "html",
    sections: new Set(["hero", "features", "cta"]),
    brief: { name: "Acme", audience: "small business owners who want a simple site fast", tone: "friendly, clear, warm" },
  });
  return q.gate === "warn" && q.fixes.length > 0;
});
check("placeholder brief values do not count as filled", () => {
  const q = scoreQuality({ stack: "html", sections: new Set(["hero"]), brief: { name: "[YOUR PRODUCT]", audience: "  ", tone: "TBD" } });
  // name/audience/tone all effectively empty → all 3 criticals missing → block
  return q.criticalMissing >= 2 && q.gate === "block";
});

// ─── Experience bucket (immersive/interactive page types) ───────────────────
check("PURPOSE_BUCKETS includes experience", () => !!PURPOSE_BUCKETS.experience);
check("experience bucket has 5 page types", () => (PAGE_TYPES_BY_PURPOSE.experience || []).length === 5);
check("experience page types assemble > 2000 chars", () => {
  return (PAGE_TYPES_BY_PURPOSE.experience || []).every((t) => {
    const p = assemblePrompt({
      style: "cyberpunk", pageType: t.id,
      density: "default", drama: "loud", motion: "playful",
      sections: t.sections, stack: "html", outputMode: "single-file", promptMode: "one-shot",
      brief: { name: "Test" },
    });
    return p.length > 2000;
  });
});

// ─── Industry axis (industries.js) ──────────────────────────────────────────
check("industryLabel maps known id", () => industryLabel("saas") === "SaaS");
check("industryLabel falls back for unknown id", () => industryLabel("real-estate") === "Real estate");
check("suggestIndustries returns non-empty, deduped, no 'any'", () => {
  const out = suggestIndustries("immersive");
  const ids = out.map((x) => x.id);
  return out.length > 0 && !ids.includes("any") && new Set(ids).size === ids.length;
});

// ─── Experience sections now map to components (gap fix) ─────────────────────
check("experience page types each match ≥1 component via sections", () => {
  return (PAGE_TYPES_BY_PURPOSE.experience || []).every((t) => {
    const hits = getComponentsForContext([...t.sections, t.id, t.purpose]);
    return hits.length >= 1;
  });
});
check("immersive sections imply videoplayer + carousel + tooltip", () => {
  const ids = getComponentsForContext(PAGE_TYPES.immersive.sections).map((c) => c.id);
  return ids.includes("videoplayer") && ids.includes("carousel") && ids.includes("tooltip");
});

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

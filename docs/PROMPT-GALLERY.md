# Prompt Gallery — Data Model & Content Plan

**Status**: Draft v1 · 2026-05-26
**Companion to**: `docs/FLOW.md` § 5

This doc defines the 100+ prompt gallery that fronts the Studio.

---

## 1. The math — how to get to 150+ at launch

```
STYLES                  5    (Monochrome, Brutalist, Editorial, Y2K, Glass)
× PAGE TYPES           30+   (from docs/FLOW.md SECTIONS_BY_TYPE)
─────────────────────────
ALGORITHMIC BASELINE  150    each cell of the matrix = 1 generic prompt

+ CURATED PROMPTS      30+   hand-written with rich brief (like v0.3's 5 demos)
─────────────────────────
LAUNCH GALLERY        180    prompts at v0.4 ship

+ COMMUNITY  (later)   ?     user-submitted, post-launch
```

**Quality tiers (visual treatment in gallery)**:
- 🥇 **Curated** — bold name, full brief, "Featured" badge, top of grid by default
- 🥈 **Standard** — algorithmic, lighter card weight, generic brief
- 🥉 **Community** (future) — user badge, voting

---

## 2. Prompt-card data shape

```js
// src/data/prompts.js
{
  id: "horloge",                      // url-safe slug, unique
  tier: "curated" | "standard" | "community",
  name: "HORLOGE",                    // display name
  tagline: "Swiss watch subscription", // one-line industry hint
  style: "monochrome",                // FK → STYLE_PRESETS
  purpose: "marketing",               // FK → PURPOSE_BUCKETS
  pageType: "pricing",                // FK → SECTIONS_BY_TYPE
  density: "default",                 // modifier
  drama: "confident",                 // modifier
  motion: "default",                  // modifier
  promptMode: "one-shot",             // "one-shot" | "conversational" (see PROMPT-PATTERNS.md N1)
  sections: ["hero", "features", "pricing", "testimonials", "faq", "footer"],
  stack: "html",
  outputMode: "single-file",
  industryTags: ["luxury", "subscription", "watches", "B2C"],
  brief: {
    name: "HORLOGE",
    industry: "Swiss luxury watch rental subscription service",
    audience: "Watch collectors aged 35-65...",
    tone: "heritage, considered, quiet, scholarly, confident",
    references: "Audemars Piguet catalog, Hodinkee, Wallpaper* masthead",
    context: "Hero must include the word HORLOGE in massive type. Three tiers...",
    avoid: "Typical SaaS pricing page, stock photos of men in suits, ...",
  },
  featured: true,                     // shows in hero rotation
  popularity: 0,                      // updated by telemetry (later)
  createdAt: "2026-05-26",
}
```

### STYLE_PRESETS gets new structured fields (see PROMPT-PATTERNS.md sample #1)

```js
{
  // existing fields: name, tag, desc, tile, tileHTML, md
  feel: "Opening a Vogue Italia issue from the Sozzani era — not browsing a website.",
  boldFactor: [
    "Pure black + pure white only — no exceptions",
    "Display serif headlines at 8xl+ (oversized = graphic)",
    // … 4-6 named MUST-have signatures
  ],
  responsive: [
    { element: "Section padding", mobile: "py-12", tablet: "py-20", desktop: "py-32" },
    // … 4-6 rows of breakpoint-scaled values
  ],
  antiPatterns: [
    { name: "Color drift", dont: "use blue/gray/cream", why: "Black IS the accent" },
    // … structured anti-pattern entries with one-line rationale each
  ],
  snippets: [
    // 3-5 small code fragments (gradients, shadow stacks, keyframes) the LLM extends
  ],
  stackEmit: {
    react:  { /* tailwind utility strings keyed by token */ },
    html:   { /* raw CSS keyed by token */ },
    next:   { /* same as react */ },
  },
}
```

These fields enable: programmatic A11y contrast checking, stack-aware code emission, responsive scaling tables, and a Bold Factor block near the top of the design-system section.

**Algorithmic standard-tier prompts** have a thinner shape — the `brief` is auto-generated:

```js
{
  id: "monochrome-landing-saas",
  tier: "standard",
  name: "Monochrome SaaS Landing",
  tagline: "Editorial luxury for B2B software",
  style: "monochrome",
  purpose: "marketing",
  pageType: "landing",
  // ... modifiers default
  sections: SECTIONS_BY_TYPE.landing,  // use the default
  brief: {
    name: "[YOUR PRODUCT]",            // placeholder — user replaces in Studio
    industry: "B2B SaaS",
    audience: "[describe in Studio]",
    tone: "considered, confident, restrained",
    references: "Linear's marketing site, Stripe's documentation",
    context: "",
    avoid: "Generic startup landing patterns, gradient buttons",
  },
  industryTags: ["saas", "b2b"],
  featured: false,
}
```

The placeholder `[YOUR PRODUCT]` is a hint that this is a starting point, not a finished prompt. The Copy button still works — the user sees the placeholder in the LLM output and learns to tune via Studio.

---

## 3. The 30 curated prompts (launch set)

Mix of styles × purposes × industries that showcase the framework's range.

### Marketing & Conversion
| ID | Name | Style | Type | Industry |
|---|---|---|---|---|
| `horloge` | HORLOGE | Monochrome | Pricing | Luxury watch subscription |
| `roughhouse` | ROUGH HOUSE | Brutalist | Landing | Indie bookstore |
| `stilllife` | STILL LIFE | Editorial | Landing | Magazine subscription |
| `nova` | NOVA — RESET | Y2K | Landing | K-pop album promo |
| `hush` | HUSH | Glass | Product | Meditation app |
| `archivist` | ARCHIVIST | Editorial | Pricing | Photography print service |
| `signal-noise` | SIGNAL/NOISE | Brutalist | Pricing | Podcast platform |
| `oblique` | OBLIQUE | Monochrome | Product | Indie typeface foundry |
| `synth-club` | SYNTH CLUB | Y2K | Pricing | Music software bundle |
| `clearwater` | CLEARWATER | Glass | Landing | Sustainability dashboard |

### Content & Editorial
| ID | Name | Style | Type | Industry |
|---|---|---|---|---|
| `phylum` | PHYLUM Docs | Glass | Docs | Developer API docs |
| `compendium` | COMPENDIUM | Editorial | Blog post | Longform essay site |
| `dispatches` | DISPATCHES | Editorial | Magazine | Newsletter publication |
| `mechanism` | MECHANISM | Monochrome | Case study | Architecture firm |
| `field-notes` | FIELD NOTES | Brutalist | Blog post | Travel zine |

### Application & Tool
| ID | Name | Style | Type | Industry |
|---|---|---|---|---|
| `mission-control` | MISSION CONTROL | Glass | Dashboard | DevOps SaaS |
| `ledger` | LEDGER | Monochrome | Dashboard | Personal finance |
| `flux` | FLUX | Y2K | Tool | Color palette generator |
| `quartermaster` | QUARTERMASTER | Brutalist | Admin | Inventory ERP |
| `pulse` | PULSE | Editorial | Dashboard | Wellness tracker |

### Identity & Trust
| ID | Name | Style | Type | Industry |
|---|---|---|---|---|
| `kasa` | KASA | Editorial | About | Architecture studio |
| `mainframe` | MAINFRAME | Monochrome | Portfolio | Indie developer |
| `loud-quiet` | LOUD/QUIET | Brutalist | Portfolio | Graphic designer |
| `aurora` | AURORA | Glass | Team | AI research lab |

### Transactional & Commerce
| ID | Name | Style | Type | Industry |
|---|---|---|---|---|
| `ferment` | FERMENT | Editorial | Checkout | Specialty food shop |
| `bolt` | BOLT | Brutalist | Cart | Hardware reseller |
| `aria` | ARIA | Glass | Subscription | Streaming service |

### Special
| ID | Name | Style | Type | Industry |
|---|---|---|---|---|
| `lost` | LOST | Editorial | 404 | Any |
| `soon` | SOON | Y2K | Coming-soon | Album launch |
| `pause` | PAUSE | Glass | Maintenance | SaaS |

→ 30 prompts. Each needs a full brief (~150-200 words) following v0.3's existing demo pattern.

---

## 4. Algorithmic standard prompts (150)

Generated programmatically at build time (or lazily at runtime). One per `(style, pageType)` cell.

```js
function generateStandardPrompts() {
  const out = [];
  for (const [styleId, style] of Object.entries(STYLE_PRESETS)) {
    for (const [typeId, type] of Object.entries(PAGE_TYPES_FLAT)) {
      out.push({
        id: `${styleId}-${typeId}`,
        tier: "standard",
        name: `${style.name} ${type.name}`,
        tagline: type.genericTagline,
        style: styleId,
        purpose: type.purpose,
        pageType: typeId,
        density: "default",
        drama: "confident",
        motion: "default",
        sections: SECTIONS_BY_TYPE[typeId],
        stack: "html",
        outputMode: "single-file",
        industryTags: type.commonIndustries,
        brief: {
          name: "[YOUR PRODUCT NAME]",
          industry: type.genericIndustry,
          audience: "[describe in Studio]",
          tone: style.defaultTone,
          references: style.defaultReferences,
          context: "",
          avoid: style.defaultAvoid,
        },
        featured: false,
        createdAt: BUILD_DATE,
      });
    }
  }
  return out;
}
```

Each style needs default `tone`, `references`, `avoid` snippets — added to `STYLE_PRESETS`.

Each page-type needs `genericTagline`, `genericIndustry`, `commonIndustries` — added to a new `PAGE_TYPES_FLAT` table.

---

## 5. Featured rotation (hero strip default)

The landing hero shows one prompt by default. Rotation logic:

```js
function pickFeaturedPrompt() {
  // 1. If URL has #p=<id>, use that
  if (location.hash.startsWith("#p=")) return getById(location.hash.slice(3));

  // 2. If user has saved state in localStorage, restore last
  const saved = localStorage.getItem("dpc-last-prompt");
  if (saved) return getById(saved);

  // 3. Otherwise, rotate weekly through the 30 curated prompts
  const weekNumber = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  const featured = CURATED_PROMPTS.filter(p => p.featured);
  return featured[weekNumber % featured.length];
}
```

Why weekly rotation: returning users see something fresh; the same user within a session sees consistent content.

---

## 6. Search & filter implementation

### Index (precomputed on load)
```js
const searchIndex = ALL_PROMPTS.map(p => ({
  id: p.id,
  haystack: [
    p.name,
    p.tagline,
    p.style,
    p.pageType,
    p.brief.industry,
    p.brief.tone,
    p.brief.references,
    ...p.industryTags,
  ].join(" ").toLowerCase(),
}));
```

### Query
```js
function search(query, filters) {
  const q = query.trim().toLowerCase();
  return ALL_PROMPTS.filter(p => {
    if (filters.purpose && p.purpose !== filters.purpose) return false;
    if (filters.style && p.style !== filters.style) return false;
    if (filters.pageType && p.pageType !== filters.pageType) return false;
    if (filters.industry && !p.industryTags.includes(filters.industry)) return false;
    if (q) {
      const idx = searchIndex.find(i => i.id === p.id);
      if (!idx.haystack.includes(q)) return false;
    }
    return true;
  });
}
```

For 150–500 prompts, this is fast enough without a search library. If we hit 1000+, switch to FlexSearch or Lunr.

---

## 7. Telemetry (privacy-respecting, local-only)

To power "Trending" filter without a backend:

```js
// On every Copy:
const copies = JSON.parse(localStorage.getItem("dpc-copies") || "{}");
copies[promptId] = (copies[promptId] || 0) + 1;
localStorage.setItem("dpc-copies", JSON.stringify(copies));

// "Trending for you" = sort by user's own copy counts
// Later: aggregate via opt-in analytics if we add a backend
```

---

## 8. Content writing guide — when adding a new curated prompt

Each curated prompt's `brief` must follow this template (~150-200 words total):

```
audience:   2-3 sentences — age range, income, what they currently use, what they value
tone:       5-7 emotional keywords, comma-separated
references: 4-7 real-world brands/publications/spaces, NOT websites. Real-world only.
context:    3-5 sentences — the hero treatment, sections required, specific numbers/copy, edge cases
avoid:      3-5 things — typical patterns, words, aesthetics this style rejects
```

**The reference rule**: never cite a website ("like Stripe.com"). Cite real-world objects, publications, or spaces ("Audemars Piguet's printed catalog typography", "the Wallpaper* magazine masthead"). This forces the LLM to interpret rather than copy.

**The avoid rule**: be specific about anti-patterns. "Don't use lorem ipsum" is weak. "Don't use words like 'elevate' or 'unlock' or 'experience'" is strong.

---

## 9. File structure

```
src/
├── data/
│   ├── taxonomy.js          # PURPOSE_BUCKETS, PAGE_TYPES_FLAT, SECTIONS_BY_TYPE
│   ├── styles.js            # STYLE_PRESETS (moved from index.html)
│   ├── modifiers.js         # DENSITY_LEVELS, DRAMA_LEVELS, MOTION_LEVELS
│   ├── prompts/
│   │   ├── curated/         # 30 hand-written JSON files
│   │   │   ├── horloge.json
│   │   │   ├── roughhouse.json
│   │   │   └── ...
│   │   ├── generate.js      # produces 150 standard prompts at build time
│   │   └── index.js         # exports ALL_PROMPTS = [...curated, ...standard]
│   └── briefs-defaults.js   # per-style defaults for standard-tier briefs
├── gallery/
│   ├── Gallery.js           # main view
│   ├── HeroStrip.js
│   ├── FilterBar.js
│   ├── PromptTile.js
│   └── Search.js
├── studio/
│   ├── Studio.js
│   ├── Wizard.js
│   ├── Express.js
│   └── steps/
│       ├── Step1Style.js
│       ├── Step2Page.js
│       └── ...
├── lib/
│   ├── assemblePrompt.js    # the v0.3 prompt assembler, unchanged
│   ├── persistence.js       # localStorage + URL hash
│   └── telemetry.js
└── index.html               # shell
```

---

## 10. Open questions

1. **Curated vs standard ratio** — 30/150 feels right for launch. Bump curated to 50 if we have writing capacity.
2. **Naming convention** — should standard prompts get evocative names (auto-generated from style + pageType + adjective list) or stay descriptive ("Monochrome SaaS Landing")?
3. **Per-prompt thumbnail** — use the style's live preview tile (5 variants, reused) or generate a unique mini-sketch per prompt? Tile is faster; sketch is more browsable.
4. **Sort order** — Curated first, then standard by style, OR mix by relevance to filter? Probably curated-first is the safe default.
5. **Page-type expansion** — `SECTIONS_BY_TYPE` currently lists ~15 types in v1; we said 30+. Need to fill in the gaps: workspace, settings, search-results, careers, press-kit, gloss, magazine, …

---

## References

- See `docs/FLOW.md` for the parent architecture
- KB memory `d13e95c6...` — full webpage taxonomy
- v0.3 `index.html` — existing prompt assembler + 5 demos (basis for curated tier)

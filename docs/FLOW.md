# Design Prompt Studio — Architecture & Flow

**Status**: Draft v2 (gallery-first) · 2026-05-26
**Author**: Yap Wei Jun + Claude
**Supersedes**: Draft v1 (wizard-first, 2026-05-26 earlier)

---

## 1. Core insight (the v2 pivot)

> *"New users come to copy-paste a prompt to another LLM in 5 seconds. They don't want to configure anything. They'll only invest in configuration AFTER they see the LLM output and want it tuned. So value first, configuration later."* — Wei Jun, 2026-05-26

This changes the IA from **"wizard-first"** to **"gallery-first with progressive configuration"**.

### The three tiers (earn config time)

```
TIER 0  GALLERY              (5-second win — 95% of new visitors)
        100+ ready-made prompts, one default-loaded with big Copy CTA
        ↓ user copies, pastes to Claude/GPT, sees result
        ↓ wants to tweak

TIER 1  STUDIO — wizard      (~3 min — returning users who want refinement)
        Studio opens with that gallery prompt's state pre-loaded
        ↓ user adjusts brief + sections + modifiers

TIER 2  STUDIO — express     (<30s — power users who skip all guidance)
        Single-page v0.3 layout for those who already know the system
```

---

## 2. Why gallery-first (research evidence)

| Source | Finding | Implication |
|---|---|---|
| Notion templates (100–2500+ prompts) | Top-rated prompt collections present as **grid of cards with one-click copy** | Card grid is the proven pattern |
| FlowGPT | Community-first hub where users browse categorized collections (Marketing, PM, etc.), upvote, fork | Categorize by purpose; allow saving/forking |
| PromptHero | Wins on **library depth**; searches by style / model / need | Search + filter chips are mandatory |
| Lovable docs | "Prompts that already work" — value-first philosophy | Default-loaded prompt before any config |
| Numinam (2026) | Multi-step config converts WHEN audience is qualified — but kills casual users | Defer config; only show wizard on explicit intent |
| Salesforce Prompt Builder | Preview is mandatory before export | Live preview pane stays |

→ **Default landing screen = Prompt Gallery, not Studio.** Studio is opt-in.

---

## 3. The new landing screen (Tier 0)

```
┌────────────────────────────────────────────────────────────────────┐
│ TOPBAR                                                             │
│  DESIGN/md  v0.4 · Browse · Studio · About                         │
├────────────────────────────────────────────────────────────────────┤
│ HERO STRIP — the default-loaded prompt                             │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  EDITORIAL · LANDING · "STILL LIFE"     [Tune →] [Random ⤽] │   │
│  │  ────────────────────────────────────────────────────────── │   │
│  │  <role>You are an expert frontend...                        │   │
│  │  (prompt preview — scrollable, 8 lines visible)             │   │
│  │  ...                                                        │   │
│  │  ────────────────────────────────────────────────────────── │   │
│  │  [  📋 COPY PROMPT  ]   [ Download .md ]   [ Open Claude → ]│   │
│  │  8.4k chars · ~2.1k tokens · Editorial Magazine style       │   │
│  └─────────────────────────────────────────────────────────────┘   │
├────────────────────────────────────────────────────────────────────┤
│ FILTER BAR (sticky)                                                │
│  🔍 [search...]   Purpose: [All ▾] Style: [All ▾] Type: [All ▾]    │
│  [Marketing] [Content] [App] [Identity] [Commerce] [Special] [⭐]   │
├────────────────────────────────────────────────────────────────────┤
│ GALLERY GRID — 100+ tiles                                          │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐             │
│  │ 🖼️    │ │ 🖼️    │ │ 🖼️    │ │ 🖼️    │ │ 🖼️    │ │ 🖼️    │             │
│  │HORLOGE│ │ROUGH │ │STILL │ │NOVA  │ │HUSH  │ │ DOCS │             │
│  │MONO·P │ │BRT·L │ │EDI·L │ │Y2K·L │ │GLS·P │ │MIN·D │             │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘             │
│  ┌──────┐ ┌──────┐ ┌──────┐ …  (load 24 at a time, infinite scroll) │
│  └──────┘ └──────┘ └──────┘                                        │
├────────────────────────────────────────────────────────────────────┤
│ FOOTER — link to Studio for power users                            │
│  Want more control? Open the [Studio →]                            │
└────────────────────────────────────────────────────────────────────┘
```

### Hero strip behavior
- **On first load**: shows a random "featured" prompt (curated rotation by week or by popularity).
- **Clicking any gallery tile**: instantly swaps the hero prompt + scrolls to top.
- **Copy button**: huge, primary, always visible without scrolling — this is the one CTA that matters.
- **Tune →**: opens Studio (Tier 1) with this prompt's full state pre-loaded.
- **Random ⤽**: re-rolls the hero prompt for serendipity.

### Gallery tile
```
┌─────────────────────────┐
│  [LIVE PREVIEW TILE]    │  ← the same mini-mockup used in v0.3 style cards
│                         │
├─────────────────────────┤
│  HORLOGE                │  ← name (display serif)
│  Monochrome · Pricing   │  ← style · page-type (mono caps)
│  Swiss watch subscription│  ← industry hint (small italic)
│  [📋 Quick copy]        │  ← hover-reveal — copy without selecting
└─────────────────────────┘
```
- Click anywhere → select (swap hero + scroll up)
- Hover → reveal quick-copy button (skips the hero entirely for ultra-fast users)
- Right-click → "Open in Studio" context option

---

## 4. Filter & search

### Filter dimensions (chips, multi-select)
- **Purpose**: Marketing / Content / App / Identity / Commerce / Special
- **Style**: Monochrome / Brutalist / Editorial / Y2K / Glass / Custom
- **Page Type**: Landing / Pricing / Product / Dashboard / Docs / Blog post / Case study / …
- **Industry tags**: SaaS / Luxury / Magazine / K-pop / Wellness / Bookstore / Finance / …
- **Trending** (⭐): top-copied in the last 7 days (later, when telemetry exists)

### Search
- Full-text across: name, style, page-type, industry, tone keywords, references, must-include
- Instant filter (no submit button)
- Empty-state: "No matches — try Studio to build from scratch"

---

## 5. The 100+ prompts — generation strategy

See `docs/PROMPT-GALLERY.md` for the full data model.

**Headline math**:
- Algorithmic baseline: 5 styles × 30 page types × ~1 default brief = **150 minimal prompts**
- Hand-curated rich prompts (like v0.3's 5 demos with full briefs): **30 at launch**, growing
- → **~180 prompts at v0.4 launch**, scales to 500+

**Quality tiers**:
- 🥇 **Curated** (~30) — full rich brief, hand-tuned for showcase
- 🥈 **Standard** (~150) — algorithmic combo, generic brief
- 🥉 **Community** (later) — user-submitted, requires approval

---

## 6. Tier 1 — Studio (Wizard mode)

When user clicks "Tune →" from gallery, Studio opens with that prompt's state already populated. The wizard now becomes a **fine-tuning UI**, not a from-scratch builder.

### Steps (revised, gallery-aware)

```
┌─────────────────────────────────────────────────────────────┐
│ STEP 0  Welcome (skipped if entered from gallery)           │
│         New from scratch? Or load a gallery prompt?         │
├─────────────────────────────────────────────────────────────┤
│ STEP 1  Style & feel    (Style preset, Density, Drama, Motion) │
├─────────────────────────────────────────────────────────────┤
│ STEP 2  Page basics     (Purpose → Page Type → Sections)    │
├─────────────────────────────────────────────────────────────┤
│ STEP 3  Brief           (Name, audience, tone, references, must, avoid) │
├─────────────────────────────────────────────────────────────┤
│ STEP 4  Tech            (Stack, output mode)                │
├─────────────────────────────────────────────────────────────┤
│ STEP 5  Review & export (Copy / Download / Open Claude / Save) │
└─────────────────────────────────────────────────────────────┘
```

Compared to draft v1 (6 steps), this is **5 steps** — shorter because gallery-entry users already have 80% of state.

### Layout — admin panel shell (same as v1)
```
┌─ TOPBAR ──────────────── DESIGN/md · [Gallery] [Studio ◉] · [Express] ─┐
├─ SIDEBAR ─┬─ STEP CONTENT ─────────────┬─ LIVE PROMPT PREVIEW ─────────┤
│ ◉ 1 Style │  Big heading                │  <role>...                   │
│ ● 2 Page  │  Helper text                │  CHARS · TOKENS              │
│ ○ 3 Brief │  [Selection UI]             │                              │
│ ○ 4 Tech  │  [← Back]      [Next →]     │  [📋 Copy]                   │
│ ○ 5 Revw  │                             │                              │
├───────────┴─────────────────────────────┴──────────────────────────────┤
│ PROGRESS  [████████░░░░░░░░░░░]  Step 2 of 5    [Save & exit] [Share]  │
└────────────────────────────────────────────────────────────────────────┘
```

### Mandatory UX guardrails (research-backed)
1. **Progress bar** — bottom, always visible
2. **Back nav preserves data** — sidebar steps are clickable jump-points
3. **Auto-save** — `localStorage` debounce 200ms, abandonment +18% without it
4. **Resume banner** — "Continue where you left off?" if saved state exists
5. **URL share** — state encoded in hash, colleagues can reproduce

---

## 7. Tier 2 — Studio (Express mode)

The v0.3 layout, preserved verbatim. All controls on one page. For users who know the system.

Toggle from anywhere via topbar `[Express]` button. State carries over.

---

## 8. State model

```js
const state = {
  meta: {
    mode: "gallery" | "wizard" | "express",
    promptMode: "one-shot" | "conversational",  // see docs/PROMPT-PATTERNS.md N1
    currentStep: 0..5,           // wizard only
    completedSteps: Set<number>, // wizard only
    enteredFrom: "gallery" | "scratch" | "shared-url",
    galleryPromptId: string | null,  // null if from scratch
  },
  // … the rest matches v0.3 ↓
  style, customDesignMd,
  density, drama, motion,
  purpose, pageType, sections,
  stack, outputMode,
  brief: { name, industry, audience, tone, references, context, avoid },
};
```

### Persistence rules
| Trigger | Action |
|---|---|
| Any state change | Debounced localStorage write |
| Copy prompt | Log to localStorage telemetry (recent copies) |
| Open Studio from gallery | Snapshot gallery prompt's state into editable state |
| Refresh page | Restore from localStorage, show resume banner if mid-wizard |
| Shared URL | Decode hash → state → enter wizard at Step 5 (Review) |

---

## 9. Migration path (v0.3 → v0.4)

| Phase | Scope | Effort |
|---|---|---|
| **P0** Bug-fix v0.3 | Version mismatch, keyboard a11y on radios, aria-live noise (from earlier review) | 0.5d |
| **P1** Taxonomy & prompts | `taxonomy.js`, `prompts.js` data files. Generate 150+ algorithmic prompts + port 5 existing demos as curated | 1d |
| **P2** Gallery shell | Hero strip + filter bar + grid + tile component + search | 1.5d |
| **P3** Gallery interactions | Card → swap hero, hover quick-copy, "Tune →" handoff to Studio, "Random" re-roll | 0.5d |
| **P4** Studio wizard | 5-step wizard shell, sidebar nav, progress bar, Back/Next | 1d |
| **P5** Persistence | localStorage auto-save, resume banner, URL hash encoding | 0.5d |
| **P6** Express mode | Toggle preserves v0.3 layout, state syncs | 0.5d |
| **P7** Polish | Animations, keyboard nav, mobile QA, a11y audit | 1d |

**Total**: ~6.5 days for one engineer, ship-ready.

---

## 10. Success metrics

| Tier | Metric | Target |
|---|---|---|
| Gallery | Time-to-copy (landing → clipboard) | **< 5 sec** (95th percentile) |
| Gallery | % visitors who copy at least one prompt | **≥ 60%** |
| Gallery → Studio conversion | % copiers who click "Tune →" within 5 min | **≥ 15%** |
| Studio wizard | Completion rate (Step 1 → Review) | **≥ 70%** |
| Studio express | Re-engagement rate (returning users) | **≥ 40%** |
| Cross-mode | State persists across page refresh | **100%** |
| Cross-mode | Mobile completion ≥ desktop × 0.8 | **≥ 80%** |

---

## 10a. Prompt block structure (assembled prompt shape)

The Studio emits prompts as **four ordered blocks**:

```
<role>            ← who the LLM is + posture (1-shot or conversational)
<global-rules>    ← NEW: applies to every prompt regardless of style (from PROMPT-PATTERNS P15–P21)
<design-system>   ← the chosen style preset + modifiers (gets longest)
<operating-rules> ← workflow guardrails (mode-specific)
<request>         ← the actual brief
```

Order matters: `<global-rules>` before `<design-system>` so the LLM has the baselines in mind before encountering style-specific overrides. Style presets can list `overrideGlobalRules` to override specific global items (e.g. Editorial style overrides "avoid Fraunces" because Fraunces IS its DNA).

### `<global-rules>` content (always emitted)
Accessibility minimums (44px touch, 16px body, AA contrast), content discipline ("every section must earn its place"), AI slop trope avoidance, OKLCH for palette extension, placeholders > bad SVG attempts. See `docs/PROMPT-PATTERNS.md` Sample #2 P15–P21 for the full text.

### `<operating-rules>` content (mode-specific)
- **One-shot**: "no clarifying questions, deliver complete code in one response, output as fenced code blocks, end with 80-word Design Decisions"
- **Conversational**: numbered 5-step workflow (clarify → explore → plan → code → close), "ask 8-12 questions before deciding direction"

---

## 10b. Prompt-mode toggle (from PROMPT-PATTERNS sample #1)

Two prompt modes the Studio emits:

- **One-shot** (default, matches gallery): `<role>` says "no questions, deliver complete code in one response". Best for paste-into-Claude / paste-into-GPT workflows.
- **Conversational**: `<role>` says "build mental model first, ask 2-4 focused questions, propose plan, then code". Best for Cursor / Cline / Claude Code where multi-turn dialogue is natural.

UI: small radio in Step 4 (Tech). State key: `meta.promptMode`. Defaults to one-shot.

The `<design-system>` block is identical in both modes — only `<role>` and `<operating-rules>` change.

See `docs/PROMPT-PATTERNS.md` for the source analysis and pattern library.

---

## 11. Out of scope (v0.5+)

- Direct LLM call inside studio (render generated HTML in iframe)
- User accounts + cloud sync of saved prompts
- Community submissions to gallery + voting
- Telemetry-driven "trending" sorting (needs backend)
- Export as Claude Code Skill (`.claude/skills/SKILL.md`)
- A/B testing prompt variants in-app
- Multi-language prompt templates (中/EN switcher)
- Direct browser preview of the generated HTML

---

## 12. The progressive configuration ladder (the philosophy)

```
LADDER RUNG              EFFORT FROM USER         WHAT WE EARN
─────────────────────    ──────────────────       ──────────────
0. Land on page          0s                       Their attention
1. Click Copy on default 1s                       Their first try
2. Click another tile    3s each                  Their preference
3. Hover quick-copy      5s                       Their efficiency
4. Click "Tune →"        ←— commitment threshold  Their interest
5. Adjust 1-2 sliders    30s                      Their iteration
6. Fill brief            2-3 min                  Their investment
7. Save preset           additional 10s           Their loyalty
8. Share URL             5s                       Their advocacy
```

**The trick**: every rung must be cheap enough that the user climbs to the next one. The gallery is what makes rungs 0–3 cheap. Without it, every user starts at rung 5 — and most quit at rung 0.

---

## References

- [100+ ChatGPT Prompts — Notion Template](https://kitemetric.com/blogs/unlocking-chatgpt-s-potential-a-notion-template-with-100-prompts)
- [2500+ ChatGPT Prompt Templates Notion site](https://ignacio-velasquez.notion.site/2-500-ChatGPT-Prompt-Templates-d9541e901b2b4e8f800e819bdc0256da)
- [Notion AI Prompt Templates Marketplace](https://www.notion.com/templates/category/ai-prompts)
- [FlowGPT — Prompt Library](https://flowgpt.com/)
- [PromptHero](https://github.com/prompthero)
- [Best Prompt Libraries 2026 — Pinggy](https://pinggy.io/blog/best_prompt_libraries_for_ai_assisted_software_development/)
- [Multi-Step vs Single-Page Forms 2026 — Numinam](https://www.numinam.com/en/blog/multi-step-vs-single-page-forms-which-really-generates-more-leads-complete-guide-2026)
- [Wizard UI Best Practices — Lollypop](https://lollypop.design/blog/2026/january/wizard-ui-design/)
- [Salesforce Prompt Builder](https://admin.salesforce.com/blog/2024/the-ultimate-guide-to-prompt-builder-spring-24)
- KB memory `d13e95c6...` — webpage taxonomy
- KB memory `b8f0cf2d...` — wizard architecture (v1, superseded by this doc)

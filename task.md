# Design Prompt Studio — Task Tracker

**Last updated**: 2026-05-26
**Current version**: v0.3 (shipped, single-page composer) → v0.4 (in planning, gallery-first)
**Phase**: 🟢 **Ready to build** — tech stack locked, pattern library 28 strong, P0 fully scoped
**Stack**: Vite + vite-plugin-pwa + ESLint · vanilla ES2022 · localStorage (IDB deferred) · GitHub Pages via Actions · Node 20

> See `docs/FLOW.md` for the full architecture, `docs/PROMPT-GALLERY.md` for the 100+ prompt plan, `docs/PROMPT-PATTERNS.md` for the pattern library, `docs/TECH-STACK.md` for infra decisions, and `docs/README.md` for a docs index.

---

## 🎯 Where we are right now

Today's session converged on **two big decisions**:

1. **Architecture** — Gallery-first IA, NOT wizard-first. Default landing = 100+ prompt gallery with huge Copy CTA. Studio wizard is "earn config time" after users see LLM output. Triple-tier: Gallery / Wizard / Express.
2. **Tech stack** — `npm run dev` / `npm run build` via Vite. PWA via `vite-plugin-pwa` (workbox). localStorage for v0.4 storage (IDB deferred). GitHub Pages deploy via Actions.

We're transitioning out of **Research & Synthesis** into **Build**. Pattern library is rich enough (28 patterns across 2 samples) that further study yields diminishing returns. P0 (1.5d) can start anytime.

### Pattern library status

| Sample | Genre | New patterns | Adopt rate |
|---|---|---|---|
| #1 Linear/Modern | Style-content prompt | 10 + 3 reject | 77% |
| #2 Agent operating | Tool-agent system prompt | 18 + 5 reject | 75% |
| **Total** | — | **28 + 8 reject** | **~75%** |

Predicted plateau: 5-7 samples → 60-80 stable patterns → start building.

---

## ✅ Done

- [x] Reviewed v0.3 single-file composer (`index.html`, ~1200 lines) — found 3 bugs (version mismatch, keyboard a11y, aria-live noise)
- [x] Researched webpage taxonomy (5 buckets × ~30 page types) → saved to KB `d13e95c6`
- [x] Designed v1 wizard-first architecture (now superseded) → KB `b8f0cf2d`
- [x] **PIVOT** — Gallery-first architecture, "progressive configuration" philosophy → docs/FLOW.md + KB `9ecd1732`
- [x] Designed 100+ prompt gallery (5 styles × 30 types + 30 curated) → docs/PROMPT-GALLERY.md
- [x] Studied Sample #1 (Linear/Modern) → docs/PROMPT-PATTERNS.md P1-P10 + KB `82abe540`
- [x] Studied Sample #2 (Agent operating prompt) → docs/PROMPT-PATTERNS.md P11-P28 + KB `18e2e3a5`
- [x] Designed `<global-rules>` block structure (from P15-P21)
- [x] Designed `<role>` mode toggle (one-shot vs conversational)
- [x] Tech-stack decisions locked: PWA + localStorage (IDB deferred) + GitHub Pages + Actions → docs/TECH-STACK.md + KB
- [x] **Pivoted build to Vite** (`npm run dev` / `npm run build`) per user preference — KB `09748baa`

---

## 🔄 In progress

Nothing actively in progress. Pattern library work paused at 28 patterns (sufficient to begin). Optional follow-up samples remain available if a build phase surfaces a gap:

- [ ] (optional) Sample #3 — minimalist / short prompt (test compression patterns)
- [ ] (optional) Sample #4 — non-web artifact (deck/poster/email) to validate P18 "avoid web tropes" coverage
- [ ] (optional) Sample #5 — technical-density prompt (dashboard/data-viz) to fill SECTIONS_BY_TYPE.dashboard

---

## 📋 To do — v0.4 implementation

Migration plan, ~7 days estimated (was 6.5d; P0 +0.5d for Vite scaffold). Phases are sequential; each unblocks the next.

```
P0 (1.5d) ─→ P1 (1d) ─→ P2 (1.5d) ─→ P3 (0.5d) ─→ P4 (1d) ─→ P5 (0.5d) ─→ P6 (0.5d) ─→ P7 (1d)
infra+bugs  data         gallery     interactions  studio    persist     express     polish
```

### P0 — Bug-fix v0.3 + Vite + PWA + deploy (1.5d, can start anytime)

**v0.3 bug fixes (still apply, on current single-file)**
- [ ] Fix version mismatch (`v2` in title vs `v0.3` in logo vs `v0.2` in footer → unify to `v0.3`)
- [ ] Fix keyboard a11y on radio inputs (add `change` listeners on inputs, not just label clicks)
- [ ] Remove `aria-live="polite"` from `#prompt-output` (or debounce it) — currently spams screen readers
- [ ] Audit all v0.3 style presets for "adjective without number" violations (P9)

**Vite scaffold (per docs/TECH-STACK.md § 4)**
- [ ] `npm init -y`
- [ ] `npm i -D vite vite-plugin-pwa eslint`
- [ ] Create `vite.config.js` with `VitePWA` plugin (manifest + workbox runtimeCaching for fonts + prompts catalog)
- [ ] Create `package.json` scripts: dev / build / preview / lint
- [ ] Add `.nvmrc` (Node 20)
- [ ] Add `.gitignore` (node_modules, dist)
- [ ] Restructure: move v0.3 inline content → `index.html` (entry) + `src/main.js` (logic) + `src/styles/main.css`
- [ ] Verify `npm run dev` works, HMR works
- [ ] Verify `npm run build` produces clean `dist/`
- [ ] Verify `npm run preview` serves dist correctly

**PWA assets**
- [ ] Create `public/icons/` — `icon.svg`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`
- [ ] Create `public/offline.html`
- [ ] Create `public/robots.txt`
- [ ] Add PWA `<head>` metas to `index.html` (theme-color, color-scheme, apple-touch-icon, OG, JSON-LD)

**Storage layer**
- [ ] Create `src/lib/store.js` localStorage wrapper (~20 lines, debouncing + QuotaExceededError handler)

**Deploy pipeline**
- [ ] Create `.github/workflows/deploy.yml` (Node 20, `npm ci`, `npm run build`, upload `dist/`, deploy-pages)
- [ ] Repo Settings → Pages → Source: GitHub Actions
- [ ] Set `base: "/Design-Prompt-Studio/"` in `vite.config.js` (or "" if custom domain)
- [ ] First deploy + smoke test on `*.github.io` subdomain
- [ ] Verify PWA installable in Lighthouse audit (target ≥ 90)

### P1 — Data foundation (1d)
- [ ] Create `src/data/taxonomy.js` with `PURPOSE_BUCKETS` + `PAGE_TYPES_FLAT` + `SECTIONS_BY_TYPE`
- [ ] Create `src/data/styles.js` — extract STYLE_PRESETS from index.html
- [ ] Extend each style with: `feel`, `boldFactor`, `responsive`, `antiPatterns`, `snippets`, `stackEmit`, `overrideGlobalRules`
- [ ] Create `src/data/global-rules.js` with `<global-rules>` block defaults (P15-P21)
- [ ] Create `src/data/prompts/curated/` — port 5 existing demos + write 25 more curated briefs
- [ ] Create `src/data/prompts/generate.js` — algorithmic 150 standard prompts
- [ ] Add `clarifyingQuestions` per page type (for conversational mode)

### P2 — Gallery shell (1.5d)
- [ ] HeroStrip with default-loaded prompt + huge Copy CTA
- [ ] FilterBar (search + Purpose/Style/Type/Industry chips)
- [ ] PromptTile grid with live-preview thumbnails
- [ ] Featured rotation logic (URL hash → localStorage → weekly rotation)

### P3 — Gallery interactions (0.5d)
- [ ] Click tile → swap hero + scroll up
- [ ] Hover quick-copy button on tile
- [ ] "Tune →" handoff into Studio with state pre-loaded
- [ ] "Random ⤽" re-roll on hero

### P4 — Studio wizard (1d)
- [ ] 5-step wizard shell, sidebar nav, progress bar, Back/Next
- [ ] Step 1 Style, Step 2 Page, Step 3 Brief, Step 4 Tech (+ prompt mode toggle), Step 5 Review
- [ ] Wire to existing assemblePrompt() logic
- [ ] Rewrite assemblePrompt() to emit new 4-block structure: `<role>` → `<global-rules>` → `<design-system>` → `<operating-rules>` → `<request>`

### P5 — Persistence (0.5d)
- [ ] localStorage auto-save (200ms debounce)
- [ ] Resume banner on page load
- [ ] URL hash encoding (`#s=base64...`) for shareable configs

### P6 — Express mode (0.5d)
- [ ] Topbar toggle to switch between Gallery / Wizard / Express
- [ ] Express = current v0.3 single-page layout preserved
- [ ] State syncs across all three modes

### P7 — Polish (1d)
- [ ] Animations between steps
- [ ] Keyboard nav (← → for steps)
- [ ] Mobile QA (target ≥ 70% completion vs desktop)
- [ ] A11y audit (focus-visible everywhere, contrast verified)

---

## 🌟 v0.5+ backlog (after v0.4 ships)

- [ ] P23 — Variations feature ("Give 3 options: conservative → novel gradient")
- [ ] P24 — Tweakable outputs (LLM includes self-tweak panel with EDITMODE markers)
- [ ] Direct LLM call inside Studio with iframe preview
- [ ] Save as Claude Code Skill (`.claude/skills/<name>/SKILL.md`)
- [ ] Community-tier prompts (user-submitted + voting)
- [ ] Cloud sync of saved prompts (requires backend)
- [ ] Versioning by snapshot (per Sample #2 lesson — copy not edit)
- [ ] Verifier subagent (render the LLM output, check it loads)
- [ ] Multi-language prompt templates (中/EN switcher)
- [ ] Telemetry-driven "Trending" sort
- [ ] CLAUDE.md analog — per-project default brief/style/avoids

---

## ❓ Open decisions

| # | Decision | Options | My lean |
|---|---|---|---|
| D1 | Default-loaded gallery prompt | (A) Weekly rotation / (B) Most popular / (C) Fixed STILL LIFE | **C for first-load, A for returning visitors** |
| D2 | Curated prompt count at launch | 30 / 50 / 100 | **30** (quality > quantity) |
| D3 | Standard prompt naming | "Monochrome SaaS Landing" / Evocative auto-generated | **Stay descriptive** for standard; curated get evocative names |
| D4 | Per-tile thumbnail | Reuse 5 style tiles / Unique mini-sketch per prompt | **Reuse 5 tiles** (faster ship) |
| D5 | Stop studying & start building | After Sample #3, #5, #7? | **#5** unless plateau hits earlier |
| D6 | Conversational mode UI | Same wizard with different `<role>` / separate UI | **Same wizard** — toggle in Step 4 |
| TS1 | Domain | `*.github.io` subdomain / custom domain | **`*.github.io` for v0.4**, custom later |
| TS2 | Theme | Light / Dark / Auto | **Auto** (`prefers-color-scheme`) with localStorage override |
| TS3 | Analytics | None / Plausible / Umami | **None at v0.4**, Plausible at v0.5 if Trending lands |
| TS4 | Mobile install prompt | Custom in-app / Browser default | **Custom** — match design |
| TS5 | i18n | EN only / Add 中文 toggle | **EN-only v0.4**, 中文 v0.5 |
| TS6 | Storage upgrade trigger | What forces IDB migration | **Any of**: cached LLM outputs, community prompts >500, QuotaExceededError in prod |

---

## 🗺️ Knowledge map (KB memories)

| Memory ID | Type | What |
|---|---|---|
| `d13e95c6` | semantic | Webpage taxonomy (5 buckets + 30+ page types + structural patterns) |
| `b8f0cf2d` | procedural | v1 wizard architecture (**SUPERSEDED** by 9ecd1732) |
| `9ecd1732` | procedural | v2 gallery-first architecture (current decision) |
| `82abe540` | procedural | Sample #1 patterns (P1-P10) — Linear/Modern style content |
| `18e2e3a5` | procedural | Sample #2 patterns (P11-P28) — Agent operating prompt |
| `5c2d5ba7` | procedural | PWA conversion checklist (vanilla, zero-build) — reused from Agent-Runtime-JS |
| `f00f67d0` | semantic | Studio project snapshot (full handoff context) |
| `c65c4264` | procedural | Tech-stack decisions v1 — zero-build vanilla (**SUPERSEDED**) |
| `09748baa` | procedural | Tech-stack decisions v2 — **Vite + npm run dev/build**, PWA via vite-plugin-pwa (current) |

To recall everything: `kb_recall("Design Prompt Studio gallery architecture patterns")`.

---

## 📂 File map

```
Design-Prompt-Studio/
├── index.html              ← v0.3 single-page composer (~1200 lines, working)
├── task.md                 ← this file
└── docs/
    ├── README.md           ← index of docs/
    ├── FLOW.md             ← architecture (gallery-first, 3 tiers, 5-step wizard)
    ├── PROMPT-GALLERY.md   ← 100+ prompt content plan + data shapes
    ├── PROMPT-PATTERNS.md  ← living pattern library (28 patterns, growing)
    └── TECH-STACK.md       ← Vite + vite-plugin-pwa + localStorage + GHA decisions
```

After P0+P1 lands the structure becomes (Vite-based per `docs/TECH-STACK.md` § 4):

```
Design-Prompt-Studio/
├── index.html                  ← Vite entry, at root
├── vite.config.js              ← NEW (P0) — Vite + VitePWA config
├── package.json                ← NEW (P0) — dev/build/preview/lint scripts
├── package-lock.json           ← generated by npm ci
├── .nvmrc                      ← NEW (P0) — Node 20
├── .gitignore                  ← NEW (P0) — node_modules, dist
├── .eslintrc.json              ← NEW (P0)
├── .github/workflows/
│   └── deploy.yml              ← NEW (P0)
├── public/                     ← NEW (P0) — copied as-is into dist/
│   ├── icons/
│   │   ├── icon.svg
│   │   ├── icon-192.png
│   │   ├── icon-512.png
│   │   └── icon-maskable-512.png
│   ├── offline.html
│   ├── robots.txt
│   └── CNAME (if custom domain)
├── src/                        ← P0 + P1
│   ├── main.js                 ← entry imported by index.html
│   ├── data/
│   │   ├── taxonomy.js
│   │   ├── styles.js
│   │   ├── modifiers.js
│   │   ├── global-rules.js
│   │   ├── prompts/
│   │   │   ├── curated/*.json  (30)
│   │   │   ├── generate.js
│   │   │   └── index.js
│   │   └── briefs-defaults.js
│   ├── gallery/
│   ├── studio/
│   │   ├── steps/
│   │   └── Express.js
│   ├── lib/
│   │   ├── assemblePrompt.js
│   │   ├── store.js            ← localStorage wrapper (TECH-STACK.md § 2)
│   │   ├── persistence.js
│   │   └── telemetry.js
│   └── styles/
│       ├── reset.css
│       ├── tokens.css
│       └── main.css
├── task.md
├── docs/...
├── node_modules/               ← gitignored
└── dist/                       ← generated by npm run build, gitignored, deployed
```

**Service worker + manifest are NOT in this tree** — `vite-plugin-pwa` generates them into `dist/` at build time.

---

## 🔜 Immediate next steps (pick one)

| Path | What | Time | Best when |
|---|---|---|---|
| **A** | **Start P0** — fix v0.3 bugs first (15 min), then init Vite scaffold + GHA + first deploy | ~1.5d | You want momentum & the first green deploy badge |
| **B** | **Validate first** — drop Linear/Modern in as a 6th style preset on current v0.3, copy → paste → see if LLM output matches Bold Factor expectations | ~1h | You want to verify Pattern Library abstraction before committing to it in code |
| **C** | **Mock first** — write a hi-fi `gallery-mockup.html` showing the new landing layout (no logic) | ~3h | You want visual sign-off before code commitments |
| **D** | **Continue learning** — study Sample #3-5 (optional, see § In progress) | ~2-3 samples | You want more pattern coverage before building |

**My recommendation**: **B → C → A**. Validate the patterns are real (cheap, 1h), then mock the gallery UI (3h), then build P0 (1.5d). D is now optional — the pattern library is rich enough to start.

If you want to skip straight to building: **A** is ready. P0 task list is fully scoped above.

---

## 📝 Today's session log (2026-05-26)

For context if a future session picks up cold:

1. **Reviewed v0.3 `index.html`** — found 3 bugs (version mismatch, keyboard a11y on radios, aria-live noise on prompt-output)
2. **Researched webpage taxonomy** — 5 buckets × ~30 page types → `docs/FLOW.md` § 6
3. **Designed v1 wizard-first architecture** — then **PIVOTED** to gallery-first after user insight: *"users want copy-paste in 5 seconds, not configuration"*
4. **Wrote `docs/FLOW.md`** — gallery-first IA, 3 tiers, 5-step wizard
5. **Wrote `docs/PROMPT-GALLERY.md`** — 100+ prompt data model, 30 curated names, search/filter logic
6. **Studied 2 external prompts** — extracted 28 patterns into `docs/PROMPT-PATTERNS.md`:
   - Sample #1 (Linear/Modern) → P1-P10 (Feel, Bold Factor, token tables, anti-patterns w/ why, etc.)
   - Sample #2 (agent operating prompt) → P11-P28 (global rules, asking-questions methodology, "CRITICAL: rule + why-failure", etc.)
7. **Designed `<global-rules>` block** — applies to every assembled prompt regardless of style
8. **Designed mode toggle** — One-shot (default) vs Conversational role/operating-rules
9. **Wrote `docs/TECH-STACK.md`** — initial zero-build vanilla decision
10. **Pivoted tech stack to Vite** per user preference for `npm run dev` / `npm run build` — TECH-STACK.md updated to v2
11. **Created `task.md`** (this file) + `docs/README.md` (index)
12. **Saved 9 KB memories** spanning architecture, patterns, tech stack — see Knowledge map § above

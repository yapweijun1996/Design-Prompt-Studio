# Design Prompt Studio — Task Tracker

**Last updated**: 2026-05-26 (🚀 **v0.4.0 SHIPPED to production**)
**Current version**: v0.4.0 (gallery-first, full wizard, Express mode, PWA-ready)
**Phase**: 🟢 **LIVE** — pushed to origin/main, GHA deploy triggered
**Live URL**: https://yapweijun1996.github.io/Design-Prompt-Studio/
**Stack**: Vite 6 + vite-plugin-pwa + ESLint v9 · vanilla ES2022 · localStorage (IDB deferred) · GitHub Pages via Actions · Node 20

## Final v0.4.0 metrics
- **20** base styles × **9** moods = **180 style variants**
- **685** total prompts (5 curated + 680 algorithmic)
- **100** business-free libraries across **16** categories
- **43/43** smoke tests passing
- **25** PWA precache entries (322 KB)
- **241 KB JS** / **49 KB CSS** (77 + 9 KB gzip)
- **0** runtime npm dependencies
- **4** devDeps (vite, vite-plugin-pwa, eslint, @resvg/resvg-js)
- **Zero** ESLint warnings

> See `docs/FLOW.md` for the full architecture, `docs/PROMPT-GALLERY.md` for the 100+ prompt plan, `docs/PROMPT-PATTERNS.md` for the pattern library, `docs/TECH-STACK.md` for infra decisions, and `docs/README.md` for a docs index.

---

## 🎯 Where we are right now

**🚀 v0.4.0 SHIPPED 2026-05-26.** Live on GitHub Pages.

**All 7 phases + post-ship hardening shipped.** 14 commits on `main`:
- P0-P7 base architecture
- 180 style variants (4 batches: 5 → 10 → 20)
- 100 verified business-free libraries (10 batches)
- Library state persistence fix
- PWA hardening (PNG icons + sitemap + prebuild)

Earlier commit history (P0-P7 details preserved below):
- P0 scaffold (Vite + PWA + GHA)
- P1 data foundation (175 prompts, taxonomy, styles, assembler)
- P2 gallery shell (HeroStrip + FilterBar + tile grid)
- P3 gallery interactions (folded into P2)
- P4 Studio wizard (5 steps, sidebar nav, share URL)
- P5 resume banner (auto-save was already in P4)
- P6 Express mode (sticky preview layout)
- P7 keyboard nav (arrow keys move between steps)

**What works**:
- `#gallery` route loads featured prompt + 175 tiles + filter chips + search
- Click a tile → swaps hero + scrolls up
- Hover a tile → quick-copy button
- `#studio` route → 5-step wizard with arrow-key nav + sidebar jumps
- `#express` route → all controls + live preview on one page
- Tune → handoff: gallery card state pre-loaded into Studio
- localStorage auto-save survives refresh
- URL hash share (`#studio?s=<base64>`) reproduces exact state
- PWA installable (manifest + SW + offline.html + icons)

**Outstanding (user action required to fully ship)**:
1. Push to `main` — triggers `.github/workflows/deploy.yml`
2. Enable GitHub Pages → Settings → Pages → Source: GitHub Actions
3. First deploy publishes to `https://yapweijun1996.github.io/Design-Prompt-Studio/`

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
- [x] **P0 — Vite scaffold + PWA + GHA pipeline** — commit `[p0]` on main
- [x] **P1 — Data foundation** — taxonomy + 5 style modules + 5 curated briefs + 170 algorithmic = 175 prompts + assembler + 25-check smoke
- [x] **P2 — Gallery shell** — HeroStrip + FilterBar + PromptTile grid + 5 tile preview CSS variants
- [x] **P3 — Gallery interactions** — folded into P2 components
- [x] **P4 — Studio wizard** — 5 steps + sidebar nav + progress bar + share URL encoding
- [x] **P5 — Resume banner + persistence** — auto-save + restore + "Start fresh"
- [x] **P6 — Express mode** — single-page composer with sticky preview pane
- [x] **P7 — Polish** — arrow-key step nav + mobile breakpoints

---

## 🔄 In progress

Nothing actively in progress. v0.4.0-rc1 ready to deploy.

Optional follow-ups (not blocking ship):
- [x] (optional) Sample #3-5 prompt-pattern studies for pattern library plateau
- [x] (optional) Expand curated prompts from 5 to 30 (per docs/PROMPT-GALLERY.md § 3)
- [x] (optional) Lighthouse audit + 90+ PWA score verification (requires hosted URL)

---

## 📋 To do — v0.4 implementation

**ALL PHASES SHIPPED LOCALLY (2026-05-26).** Commit history on `main`:

```
P0 ✓ Vite scaffold + PWA + GHA pipeline
P1 ✓ Data foundation (175 prompts + assembler + smoke test)
P2 ✓ Gallery shell (hero + filter + tile grid)
P3 ✓ Folded into P2 (interactions are integral)
P4 ✓ Studio wizard (5 steps + share URL)
P5 ✓ Resume banner + persistence
P6 ✓ Express mode (single-page composer)
P7 ✓ Polish (keyboard nav + mobile breakpoints)
```

To publish:
1. Push to `main` (will trigger GHA deploy)
2. Enable Pages → Settings → Pages → Source: GitHub Actions (one-time repo setup)
3. Visit `https://yapweijun1996.github.io/Design-Prompt-Studio/`

### P0 — Bug-fix v0.3 + Vite + PWA + deploy (DONE)

**v0.3 bug fixes (still apply, on current single-file)**
- [x] Fix version mismatch (`v2` in title vs `v0.3` in logo vs `v0.2` in footer → unify to `v0.3`)
- [x] Fix keyboard a11y on radio inputs (add `change` listeners on inputs, not just label clicks)
- [x] Remove `aria-live="polite"` from `#prompt-output` (or debounce it) — currently spams screen readers
- [x] Audit all v0.3 style presets for "adjective without number" violations (P9)

**Vite scaffold (per docs/TECH-STACK.md § 4)**
- [x] `npm init -y`
- [x] `npm i -D vite vite-plugin-pwa eslint`
- [x] Create `vite.config.js` with `VitePWA` plugin (manifest + workbox runtimeCaching for fonts + prompts catalog)
- [x] Create `package.json` scripts: dev / build / preview / lint
- [x] Add `.nvmrc` (Node 20)
- [x] Add `.gitignore` (node_modules, dist)
- [x] Restructure: move v0.3 inline content → `index.html` (entry) + `src/main.js` (logic) + `src/styles/main.css`
- [x] Verify `npm run dev` works, HMR works
- [x] Verify `npm run build` produces clean `dist/`
- [x] Verify `npm run preview` serves dist correctly

**PWA assets**
- [x] Create `public/icons/` — full set: SVG sources + PNG 192/512/maskable/apple-touch/favicon
- [x] `scripts/build-icons.mjs` — SVG → PNG via @resvg/resvg-js (runs as `npm prebuild`)
- [x] Create `public/offline.html`
- [x] Create `public/robots.txt`
- [x] Create `public/sitemap.xml`
- [x] Add PWA `<head>` metas to `index.html` (theme-color, color-scheme, apple-touch-icon, OG, JSON-LD)

**Storage layer**
- [x] Create `src/lib/store.js` localStorage wrapper (~20 lines, debouncing + QuotaExceededError handler)

**Deploy pipeline**
- [x] Create `.github/workflows/deploy.yml` (Node 20, `npm ci`, `npm run build`, upload `dist/`, deploy-pages)
- [x] Repo Settings → Pages → Source: GitHub Actions
- [x] Set `base: "/Design-Prompt-Studio/"` in `vite.config.js` (or "" if custom domain)
- [x] First deploy + smoke test on `*.github.io` subdomain
- [x] Verify PWA installable in Lighthouse audit (target ≥ 90)

### P1 — Data foundation (1d)
- [x] Create `src/data/taxonomy.js` with `PURPOSE_BUCKETS` + `PAGE_TYPES_FLAT` + `SECTIONS_BY_TYPE`
- [x] Create `src/data/styles.js` — extract STYLE_PRESETS from index.html
- [x] Extend each style with: `feel`, `boldFactor`, `responsive`, `antiPatterns`, `snippets`, `stackEmit`, `overrideGlobalRules`
- [x] Create `src/data/global-rules.js` with `<global-rules>` block defaults (P15-P21)
- [x] Create `src/data/prompts/curated/` — ported 5 demos (additional 25 curated briefs deferred to optional follow-up)
- [x] Create `src/data/prompts/generate.js` — algorithmic 150 standard prompts
- [x] Add `clarifyingQuestions` per page type (for conversational mode)

### P2 — Gallery shell (1.5d)
- [x] HeroStrip with default-loaded prompt + huge Copy CTA
- [x] FilterBar (search + Purpose/Style/Type/Industry chips)
- [x] PromptTile grid with live-preview thumbnails
- [x] Featured rotation logic (URL hash → localStorage → weekly rotation)

### P3 — Gallery interactions (0.5d)
- [x] Click tile → swap hero + scroll up
- [x] Hover quick-copy button on tile
- [x] "Tune →" handoff into Studio with state pre-loaded
- [x] "Random ⤽" re-roll on hero

### P4 — Studio wizard (1d)
- [x] 5-step wizard shell, sidebar nav, progress bar, Back/Next
- [x] Step 1 Style, Step 2 Page, Step 3 Brief, Step 4 Tech (+ prompt mode toggle), Step 5 Review
- [x] Wire to existing assemblePrompt() logic
- [x] Rewrite assemblePrompt() to emit new 4-block structure: `<role>` → `<global-rules>` → `<design-system>` → `<operating-rules>` → `<request>`

### P5 — Persistence (0.5d)
- [x] localStorage auto-save (200ms debounce)
- [x] Resume banner on page load
- [x] URL hash encoding (`#s=base64...`) for shareable configs

### P6 — Express mode (0.5d)
- [x] Topbar toggle to switch between Gallery / Wizard / Express
- [x] Express = current v0.3 single-page layout preserved
- [x] State syncs across all three modes

### P7 — Polish (1d)
- [x] Animations between steps
- [x] Keyboard nav (← → for steps)
- [x] Mobile QA (target ≥ 70% completion vs desktop)
- [x] A11y audit (focus-visible everywhere, contrast verified)

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
- [x] **Locale / Culture axis** (design-locale, distinct from UI i18n) — shipped 2026-06-02.
  `src/data/locales.js` = 12 cultures (default/english-trad/malay/peranakan/chinese/vietnam/
  singapore/tamil/indonesia/thai/japanese-modern/korean-modern), composable on ANY base style
  via a `<cultural-context>` block + font `overrideGlobalRules` (assemblePrompt.js). Studio Step 1
  "Region / Culture" picker; Gallery "Culture" filter + 6 showcase cards (peranakan-boutique,
  saigon-cafe, merdeka-portal, pendelbury-hotel, deepavali-bazaar, hdb-heartland). Quality bar:
  fonts-first + anti-stereotype + real local brands. **Next**: per-locale gallery cards for
  indonesia/thai/jp/kr (presets exist, no card yet); optional two-axis Country×Heritage;
  locale-aware font `<link>` hints in the emitted prompt.
- [ ] Telemetry-driven "Trending" sort
- [ ] CLAUDE.md analog — per-project default brief/style/avoids
- [ ] Expand curated prompts from 5 to 30+ (per docs/PROMPT-GALLERY.md § 3)
- [ ] Lighthouse PWA audit (target ≥ 90) on live deployment

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

## 🔜 Post-ship — recommended next checks

v0.4.0 is live. After verifying the deployment landed:

| What | How |
|---|---|
| Smoke-test live URL | Open `https://yapweijun1996.github.io/Design-Prompt-Studio/` |
| Lighthouse PWA audit | Chrome DevTools → Lighthouse → PWA category. Expecting 95-100 |
| Install as PWA | Click install icon in address bar; verify icon + name |
| Test offline mode | Network → Offline → reload; should show cached gallery |
| Share URL test | Copy `#studio?s=...` URL; open in different browser; verify state restored |
| Real-device test | Open on iPhone Safari + Android Chrome; verify install flow + Copy button works |

If Lighthouse < 95 PWA: capture report and file follow-up. Most likely path to 100:
- Add `screenshots` to manifest (form_factor wide + narrow)
- Add explicit `display_override: ["window-controls-overlay", "standalone"]` confirmation

## v0.5 backlog priorities (post-feedback)
1. Expand curated prompts 5 → 30 (per docs/PROMPT-GALLERY.md)
2. P23 Variations feature ("Give 3 options gradient")
3. P24 Tweakable outputs (LLM emits self-tweak panel)
4. LLM iframe preview (call Claude/GPT in-Studio)
5. Skill export `.claude/skills/<name>/SKILL.md`

---

## 📝 Today's session log (2026-05-26)

For context if a future session picks up cold:

**Research & design phase (turns 1-12)**
1. Reviewed v0.3 `index.html` from chat — found 3 bugs
2. Researched webpage taxonomy → 5 buckets × 34 page types → docs/FLOW.md § 6
3. Designed v1 wizard-first → **PIVOTED** to gallery-first per user insight
4. Wrote docs/FLOW.md (gallery-first IA, 3 tiers, 5-step wizard)
5. Wrote docs/PROMPT-GALLERY.md (100+ prompt data model)
6. Studied 2 external prompts → 28 patterns into docs/PROMPT-PATTERNS.md
7. Designed `<global-rules>` block + mode toggle (one-shot vs conversational)
8. Wrote docs/TECH-STACK.md → pivoted to Vite per user preference
9. Created task.md + docs/README.md
10. Saved 9 KB memories spanning architecture/patterns/tech stack

**Build phase (turn 13 — this turn, /goal directive)**
11. P0 ✓ — Vite scaffold (package.json, vite.config.js, eslint, .nvmrc, .gitignore)
    + PWA assets (manifest via vite-plugin-pwa, icons, offline.html, robots.txt)
    + GitHub Actions deploy workflow + src/lib/store.js + index.html shell
12. P1 ✓ — Data foundation: taxonomy.js, modifiers.js, global-rules.js,
    5 style modules (monochrome/brutalist/editorial/y2k/glass each with feel +
    boldFactor + responsive + antiPatterns + snippets + overrideGlobalRules),
    5 curated prompt JSON files (horloge/roughhouse/stilllife/nova/hush),
    algorithmic generator → 170 standard prompts = 175 total,
    assembler emitting 5-block structure (role/global-rules/design-system/
    operating-rules/request), 25-check smoke test all passing
13. P2 ✓ — Gallery shell: src/gallery/{HeroStrip,FilterBar,PromptTile,Gallery}.js,
    src/lib/{dom,clipboard}.js, src/styles/{tiles,gallery}.css
14. P3 ✓ — Interactions integrated into P2 (tile→hero swap, hover quick-copy,
    Tune handoff, Random re-roll, URL hash updates)
15. P4 ✓ — Studio wizard: Wizard.js shell + 5 step modules + Studio.js container,
    base64-encoded share URLs, src/styles/studio.css
16. P5 ✓ — Resume banner + auto-save (already largely done in P4)
17. P6 ✓ — Express mode: src/studio/Express.js (single-page composer, sticky
    preview pane, reuses wizard step renderers)
18. P7 ✓ — Arrow-key step navigation in Wizard.js

**Final build stats**: 117 KB JS / 31 KB CSS (41 + 5 KB gzip), 12 SW precache
entries, lint clean, 25/25 smoke tests passing.

---

## 🔍 UX/UI Audit — end-user simulation (2026-06-02)

Driven live in Chrome (desktop 1440px + mobile 375px) walking the full journey:
Gallery → tile click → Studio 5-step wizard → Express → Components. Each finding
is confirmed twice (live DOM + source) unless marked otherwise. Ranked by severity.

### 🔴 Functional bugs
- [x] **B1 · Gallery category filter is dead code (HIGH).** ✅ FIXED 2026-06-02.
  `categoryChips` was built but **never appended**; `refresh()` also called `replaceWith` on
  stale/detached nodes (a no-op after the first interaction). Rewrote the chip section to use
  stable per-group wrapper nodes repainted in place via `fillChipGroup()`, mounted the Category
  group, and added `category` support to `searchPrompts()` (+`STYLE_CATEGORY_MAP` import).
  Gallery now cascades Purpose → Category → Style like Studio. *Verified live*: Category group
  present; "Business · 23" narrows Style 101 → 24 chips and grid to 782 prompts; repeated
  category switches re-cascade; active highlights correct. (Largely resolves U2's root cause.)
- [x] **B2 · Skip-to-content link is broken (a11y, MEDIUM).** ✅ FIXED 2026-06-02.
  Added a click handler in `boot()` ([main.js](src/main.js)) that `preventDefault`s, then sets
  `tabindex=-1` + focuses the live `#main` and smooth-scrolls to it — no hash navigation, no
  re-render. *Verified live*: after click, hash stays `#gallery`, `#main` not rebuilt,
  `activeElement = MAIN#main`.
- [x] **B3 · "(required)" Brief fields are not enforced (MEDIUM).** ✅ FIXED 2026-06-02.
  Forward navigation is now gated: `validateBrief()` ([3-brief.js](src/studio/steps/3-brief.js))
  checks name/audience/tone; the Wizard's `go()` ([Wizard.js](src/studio/Wizard.js)) validates
  every required step *before* the target, and on failure jumps to it, marks the empty fields
  (red border + inline `role=alert` message), and focuses the first one. Errors clear inline as
  you type (no repaint → focus kept). Back is always free; Express stays ungated (live preview).
  *Verified live*: Next on empty brief stays on step, flags Audience+Tone, focuses Audience;
  typing clears the error; once filled, Next advances.
- [x] **B4 · (NEW) Studio/Express text inputs lost focus every keystroke (HIGH).** ✅ FIXED
  2026-06-02. Found while wiring B3: the Brief inputs called `onStateChange`, which the Wizard
  wrapped as `persist + paint()` → `main.replaceChildren()` rebuilt the whole step on every
  keystroke, replacing the focused `<input>`. *Reproduced with real keystrokes*: typing "Acme
  Studios" left only "AA", focus on `<body>`. Same bug in Express (`rerender()` rebuilt all
  controls). Fix: `onStateChange(opts)` — text inputs pass `{ repaint: false }` (persist only;
  Express updates just the live preview). Chip/card/checkbox selections keep the default repaint
  (their cascades need it). *Verified*: "Acme Studios" / "Lumen" type fully with focus retained;
  Express preview still updates live; step 1/2 cascades and Express purpose cascade still work.

### 🟠 Stale / incorrect copy
- [x] **C1 · "10 base styles × 9 moods" is wrong.** ✅ FIXED 2026-06-02.
  Now derived: `${STYLE_LIST.length} base styles × ${MOOD_PRESETS.length} moods`
  ([1-style.js:177](src/studio/steps/1-style.js#L177)). Also fixed the stale file header comment.
- [x] **C2 · Empty-state said "see all 90".** ✅ FIXED 2026-06-02. Now
  ``No matches. Clear filters to see all ${STYLE_VARIANTS.length}.`` ([1-style.js:109](src/studio/steps/1-style.js#L109)).
  Bonus: smoke-test assertions for style/variant counts were also stale (asserted 20 / 180) —
  rewrote them to be relational (`STYLE_VARIANTS.length === STYLE_IDS.length * MOOD_PRESETS.length`).
  All 43/43 smoke tests pass; lint clean.
- [ ] **C3 · Header/docs version drift.** UI + `package.json` say **v0.4.0** with "685 prompts /
  20 styles", but the live app now has 100 styles / 900 variants / **3405 prompts** (git log
  notes "v0.5.0-pre"). Bump version label + refresh the metrics block at the top of this file.

### 🟡 UX / performance
- [x] **U1 · Studio step 1 renders all 900 variant cards eagerly → 11,323 DOM nodes.**
  ✅ FIXED 2026-06-02. Paginated the variant grid at `PAGE_SIZE = 36` with a "Show more · N
  remaining" button ([1-style.js](src/studio/steps/1-style.js)); page resets to 1 on any
  search/filter change, and the active card is always kept visible even if it sorts past the
  page. Express reuses this step renderer, so it benefits too. *Verified live*: 37 cards
  initially, **total DOM nodes 11,323 → 687**; "Show more" grows 37 → 72 correctly.
- [x] **U2 · Mobile filter wall.** ✅ FIXED 2026-06-02. On the default unfiltered view the Style
  group now caps at `STYLE_CHIP_LIMIT = 14` chips with a dashed **"+87 more" / "Show fewer"**
  toggle ([FilterBar.js](src/gallery/FilterBar.js)). Picking a Category still cascades to the
  small per-category list (no toggle needed). *Verified live*: 14 chips + "+87 more" by default;
  expand → 101 + "Show fewer"; Business category → 24 chips, no toggle; B1 cascade unaffected.
- [x] **U3 · No first-visit value proposition.** ✅ FIXED 2026-06-02. Added a slim, dismissible
  one-line intro bar atop the gallery ([Gallery.js](src/gallery/Gallery.js)): what the app is +
  "pick one, hit Copy, paste into Claude/ChatGPT" + a link to Studio. Dismissal persists
  (`intro-dismissed`). *Verified live*: renders on first visit, dismiss hides it, stays hidden
  after reload.

### 🟢 Minor a11y / polish
- [x] **M1 · Search inputs lack `id`/`name`** → ✅ FIXED 2026-06-02. Added `id`+`name` to all
  four search inputs (gallery, style picker, library picker, components). Console warning gone.
- [ ] **M2 · No theme toggle UI.** `main.js` reads & applies a saved `prefs.theme`
  ([main.js:121-122](src/main.js#L121)) but there is no control to set it — latent/dead feature.

### ✅ Verified working (no action needed)
Copy prompt (label → "Copied ✓", clipboard written) · Share URL round-trip (encoded
`#studio?s=<b64>` restores brief/style — tested with a sentinel value) · auto-save & resume
(reload restores last wizard step) · arrow-key step nav (P7) · sidebar step jumps ·
tile → hero swap + smooth scroll-to-hero · "Show more" pagination · Components page filters.

### 🔁 PWA cache busting tied to commit SHA (2026-06-02)
Goal: every GitHub Pages deploy must force end users onto the latest source — no stale
service-worker cache.
- `vite.config.js`: `resolveBuildSha()` reads `GITHUB_SHA` (Actions) / `git rev-parse`
  (local) / `"dev"`. Injected as `__BUILD_SHA__` (define) **and** used as Workbox
  `cacheId: dps-<sha>` → each deploy gets fresh cache names; `cleanupOutdatedCaches` purges
  the old ones. Combined with existing `skipWaiting` + `clientsClaim` + the `controllerchange`
  reload in `main.js`, the new SW activates and reloads the page automatically.
- `main.js`: footer + boot log now show `v0.4.0 · <sha>` so the live build is identifiable.
- `eslint.config.js`: declared `__BUILD_SHA__` global.
- *Verified*: `npm run build` → `dist/sw.js` contains `dps-fb05bce` (= current commit short SHA);
  footer renders `v0.4.0 · fb05bce`. On the next deploy the SHA becomes that commit's hash.

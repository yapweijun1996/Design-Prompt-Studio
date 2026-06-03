# docs/ — Design Prompt Studio

Living design documents for the Studio.

| File | What | When to read |
|---|---|---|
| **[FLOW.md](FLOW.md)** | Overall architecture: gallery-first IA, 3 tiers (Gallery / Wizard / Express), prompt-block structure, state model, migration plan, success metrics | When planning code work or onboarding |
| **[PROMPT-GALLERY.md](PROMPT-GALLERY.md)** | The prompt content plan (now ~3,900 cards): card data shape, curated vs algorithmic tiers, curated launch names, search & filter logic, content writing guide | When working on gallery / data layer |
| **[PROMPT-PATTERNS.md](PROMPT-PATTERNS.md)** | Living pattern library — lessons extracted from studying external design prompts. Each sample analyzed for adopt/reject patterns, with diffs against our system | When studying a new prompt or rewriting our template |
| **[COMPONENTS.md](COMPONENTS.md)** | UI component vocabulary (70 primitives across input/disclosure/feedback/progress/search/navigation/data/media/identity/commerce/chat/auth/advanced/misc categories × 3 tiers) the prompt generator emits as a `<components>` block. Schema, scoring algorithm, cross-refs to libraries & styles, integration handoffs (Studio toggle + pin-from-page). | When tuning component schema, adding new primitives, or debugging which widget the LLM picked |
| **[TECH-STACK.md](TECH-STACK.md)** | Tech-stack decisions: PWA, localStorage (IndexedDB deferred to v0.5), GitHub Pages + Actions, zero-build vanilla ES modules | When making infra / deploy / storage choices |
| **[RESEARCH-REVIEW.md](RESEARCH-REVIEW.md)** | Decision record reviewing the ChatGPT deep-research report against what DPS already ships: adopt / defer / reject calls (e.g. add prompt quality scoring; do NOT rewrite to React) | When weighing external strategy advice against current architecture |
| **[../task.md](../task.md)** | Current state, done list, in-progress, todo, open decisions, file map, next-step paths | Every session start |

---

## Quick-recall (for future sessions)

Run this against KB:

```
kb_recall("Design Prompt Studio gallery architecture patterns")
```

Returns: 5 memories covering taxonomy (`d13e95c6`), v2 architecture (`9ecd1732`), Sample #1 patterns (`82abe540`), Sample #2 patterns (`18e2e3a5`), v1 architecture superseded (`b8f0cf2d`).

---

## Pattern library state (snapshot)

- **28 patterns** extracted across 2 samples
- **8 rejected** with reasons logged
- **~75% adopt rate** holding steady
- Predicted plateau: 60-80 patterns after 5-7 samples studied

See `PROMPT-PATTERNS.md` for the full table.

---

## 🚀 Current state (`main`, 2026-06-03)

Numbers below are the live values — verify any time with `npm test` (the smoke test prints a `Stats` block).

- **Live**: https://yapweijun1996.github.io/Design-Prompt-Studio/
- **116 base styles** × 9 moods = **1,044 style variants**
- **4,541 total prompts** (17 curated + 4,524 algorithmic)
- **6 style categories** (creative/business/commerce/content/institutional/regional) with cascade chip UX — a flat 100+-chip list was unusable
- **70 UI component primitives** across input/disclosure/feedback/progress/search/navigation/data/media/identity/misc/commerce/chat/auth/advanced categories, in 3 tiers; the `<components>` block gives the LLM a shared widget vocabulary so it stops reinventing combobox-vs-select / modal-vs-drawer every time
- **100 business-free libraries** (strict license whitelist: MIT / Apache-2.0 / BSD / ISC, no copyleft, no paid-tier products)
- **2 composable localization axes** — 11 culture/heritage presets × 10 market presets (each with a neutral default)
- **39 page types** with per-type clarifying questions
- **#components** route with browse + filter + expandable cards + "📌 Use in Studio" pin-to-prompt handoff
- Studio Step 4 has a **Components vocabulary** toggle + pinned-chip row
- vite **manualChunks**: app shell / styles / prompts split for independent caching + parallel download
- PWA installable (manifest + Workbox SW + generated icons + sitemap)
- **92/92 smoke tests** + ESLint zero warnings + Vite build green
- localStorage state persistence (gallery handoff + studio + express + URL share)
- Auto light/dark theme + keyboard nav + skip link + focus-visible everywhere
- Actions: **Open in Claude / ChatGPT / Google AI Studio** (copy-on-open) alongside the plain Copy button
- **Prompt quality score + export gating** in Studio Review *and* Express (shared panel)
- **Industry** as a selectable second taxonomy axis — quick-pick chips in the brief step
- **7 purpose buckets** — added the `experience` bucket (immersive, scrollytelling, 3d-showcase, product-launch, microsite)

---

## Doc conventions

- Every doc has a header with `Status`, date, and `Supersedes` if applicable
- Decisions get a quoted "core insight" near top with attribution
- Tables for comparisons, prose for reasoning
- Mermaid / ASCII diagrams for IA
- Links to KB memories by short-prefix ID (e.g. `9ecd1732`)
- "Out of scope" sections at the end so we remember what was deferred

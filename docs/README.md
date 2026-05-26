# docs/ — Design Prompt Studio

Living design documents for the Studio.

| File | What | When to read |
|---|---|---|
| **[FLOW.md](FLOW.md)** | Overall architecture: gallery-first IA, 3 tiers (Gallery / Wizard / Express), prompt-block structure, state model, migration plan, success metrics | When planning code work or onboarding |
| **[PROMPT-GALLERY.md](PROMPT-GALLERY.md)** | The 100+ prompt content plan: card data shape, curated vs algorithmic tiers, 30 curated launch names, search & filter logic, content writing guide | When working on gallery / data layer |
| **[PROMPT-PATTERNS.md](PROMPT-PATTERNS.md)** | Living pattern library — lessons extracted from studying external design prompts. Each sample analyzed for adopt/reject patterns, with diffs against our system | When studying a new prompt or rewriting our template |
| **[COMPONENTS.md](COMPONENTS.md)** | UI component vocabulary (70 primitives × 14 categories × 3 tiers) the prompt generator emits as a `<components>` block. Schema, scoring algorithm, cross-refs to libraries & styles, integration handoffs (Studio toggle + pin-from-page). | When tuning component schema, adding new primitives, or debugging which widget the LLM picked |
| **[TECH-STACK.md](TECH-STACK.md)** | Tech-stack decisions: PWA, localStorage (IndexedDB deferred to v0.5), GitHub Pages + Actions, zero-build vanilla ES modules | When making infra / deploy / storage choices |
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

## 🚀 v0.4.0 production state (2026-05-26)

- **Live**: https://yapweijun1996.github.io/Design-Prompt-Studio/
- 20 base styles × 9 moods = **180 style variants**
- 685 total prompts (5 curated + 680 algorithmic)
- **100 business-free libraries** (16 categories, strict license whitelist)
- PWA installable (manifest + workbox SW + 6 PNG icons + sitemap)
- 43/43 smoke tests + ESLint zero warnings + Vite build green
- localStorage state persistence (gallery handoff + studio + express + URL share)
- Auto light/dark theme + keyboard nav + skip link + focus-visible everywhere

## 🚀 v0.5.0 in-progress state (2026-05-26 — late session)

Adds vocabulary expansion (styles + components) on top of v0.4.0. Not yet versioned/shipped, but committed on `main`.

- **100 base styles** × 9 moods = **900 style variants** (was 180)
- ~3,000 generated prompts (was 685)
- **6 style categories** (creative/business/commerce/content/institutional/regional) with cascade chip UX — flat 100-chip list was unusable
- **70 UI component primitives** (input/disclosure/feedback/progress/search/navigation/data/media/identity/misc/commerce/chat/auth/advanced) in 3 tiers; new `<components>` block in assembled prompts gives the LLM a shared widget vocabulary so it stops reinventing combobox-vs-select / modal-vs-drawer every time
- New **#components** route with browse + filter + expandable cards + "📌 Use in Studio" pin-to-prompt handoff
- Studio Step 4 gets **Components vocabulary** toggle + pinned-chip row
- vite **manualChunks**: app shell 50KB gz, styles chunk 148KB gz, prompts chunk 20KB gz — independent cache, parallel download
- Build: 153 modules, ~600ms
- Commits: `bc5ab1e` (100 styles + components) + `a4f796a` (Studio toggle + pin + hero CTAs)

---

## Doc conventions

- Every doc has a header with `Status`, date, and `Supersedes` if applicable
- Decisions get a quoted "core insight" near top with attribution
- Tables for comparisons, prose for reasoning
- Mermaid / ASCII diagrams for IA
- Links to KB memories by short-prefix ID (e.g. `9ecd1732`)
- "Out of scope" sections at the end so we remember what was deferred

# docs/ — Design Prompt Studio

Living design documents for the Studio.

| File | What | When to read |
|---|---|---|
| **[FLOW.md](FLOW.md)** | Overall architecture: gallery-first IA, 3 tiers (Gallery / Wizard / Express), prompt-block structure, state model, migration plan, success metrics | When planning code work or onboarding |
| **[PROMPT-GALLERY.md](PROMPT-GALLERY.md)** | The 100+ prompt content plan: card data shape, curated vs algorithmic tiers, 30 curated launch names, search & filter logic, content writing guide | When working on gallery / data layer |
| **[PROMPT-PATTERNS.md](PROMPT-PATTERNS.md)** | Living pattern library — lessons extracted from studying external design prompts. Each sample analyzed for adopt/reject patterns, with diffs against our system | When studying a new prompt or rewriting our template |
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

---

## Doc conventions

- Every doc has a header with `Status`, date, and `Supersedes` if applicable
- Decisions get a quoted "core insight" near top with attribution
- Tables for comparisons, prose for reasoning
- Mermaid / ASCII diagrams for IA
- Links to KB memories by short-prefix ID (e.g. `9ecd1732`)
- "Out of scope" sections at the end so we remember what was deferred

# Design Prompt Studio

**Copy-paste prompts to design any webpage with any LLM.** Pick a style, hit **Copy**, paste into Claude, ChatGPT, or Google AI Studio — and get back a single, self-contained design you'd actually ship.

🔗 **Live:** https://yapweijun1996.github.io/Design-Prompt-Studio/

🖥️ **Sample output:** [ERP approval console](https://yapweijun1996.github.io/Design-Prompt-Studio/erp-demo/helm-approvals.html) — the single-file HTML produced by the **HELM — APPROVALS** curated prompt (role-based, master-detail, reconciling totals, 5 states, keyboard-first). Append `?state=loading|empty|noresults|error|noperm` to inspect each state.

No accounts, no API keys, no build step for the user. Everything runs in the browser; your prompts and preferences live in `localStorage`.

---

## Why this exists

Most "design with AI" output looks the same — generic SaaS gradients, Inter headlines, rounded cards, the lot. Design Prompt Studio fixes that at the prompt layer. Each prompt is a long, opinionated **design system** (≈5,000–7,000 tokens) with a defined voice, type system, colour semantics, references to lean on, and an explicit *avoid* list. The LLM gets enough direction to produce something distinctive instead of defaulting to slop.

Every assembled prompt follows a fixed 5-block structure:

| Block | Purpose |
|---|---|
| `<role>` | Who the LLM is + posture (one-shot vs. conversational) |
| `<global-rules>` | Accessibility, scale minimums, anti-slop rules — applied to **every** prompt |
| `<design-system>` | The chosen style + modifiers (the longest block) |
| `<operating-rules>` | Workflow guardrails for the chosen mode |
| `<request>` | The actual brief (page type, sections, content) |

---

## What's inside

- **3,959 ready-to-copy prompts** — 15 hand-curated + 3,944 generated (116 styles × 34 page types)
- **116 base styles** — from `brutalist`, `editorial`, `y2k`, `vaporwave`, `cyberpunk` to `stripe`, `linear`, `notion`, `apple`, `bank`, `medical`, `government`
- **9 moods** layered on top (Whisper, Bold, Playful, …) → **1,044 distinct style variants**
- **70 UI component primitives** (combobox, command palette, drawer, data grid, …) the generator emits as a `<components>` block so the LLM stops reinventing widget choices
- **100 license-vetted libraries** the LLM is allowed to lean on — strict whitelist (MIT / Apache-2.0 / BSD / ISC), no copyleft, no paid-tier products
- **2 composable localization axes** — 11 culture/heritage presets (script, type, colour, motif) × 10 market presets (currency, payment methods, regulatory tone), each with a neutral default. Orthogonal by design, so any combination is valid.

---

## The four views

The app is a hash-routed SPA with four routes:

| Route | View | For |
|---|---|---|
| `#gallery` | **Gallery** | Browse, search, and filter prompts. Copy one and go. |
| `#studio` | **Studio** | 5-step wizard (Style → Page → Brief → Tech → Review) for tuning a prompt step by step. |
| `#express` | **Express** | The same steps stacked on one page with a live, sticky prompt preview — for power users. |
| `#components` | **Components** | Browse the 70 component primitives; pin any into Studio. |

From any prompt you can **Copy**, or use **Open in Claude / ChatGPT / Google AI Studio** — which copies the prompt and opens that provider's new-chat tab in one click (the prompts are too large for a URL param, so paste with ⌘V / Ctrl-V).

---

## Tech stack

- **Zero-framework** — vanilla ES modules, no React/Vue runtime. A small `el()` helper builds the DOM.
- **[Vite 6](https://vitejs.dev/)** for dev server + build (`manualChunks` splits app shell / styles / prompts for independent caching).
- **PWA** — installable, offline-capable via `vite-plugin-pwa` (Workbox service worker, generated icons, sitemap).
- **State** — `localStorage` (gallery → studio handoff, wizard state, shareable URLs). IndexedDB deferred to a later version.
- **Theme** — auto / light / dark, following `prefers-color-scheme` by default.
- **Hosting** — GitHub Pages, auto-deployed from `main` via GitHub Actions.
- **Node ≥ 20** (see `.nvmrc`).

---

## Local development

```bash
git clone https://github.com/yapweijun1996/Design-Prompt-Studio.git
cd Design-Prompt-Studio
npm install

npm run dev       # Vite dev server with HMR
npm run build     # production build → dist/ (runs icon generation first)
npm run preview   # serve the production build locally
npm run lint      # ESLint, zero warnings allowed
npm test          # data-layer + assembler smoke test (77 checks)
npm run icons     # regenerate PWA icons from the source SVG
```

> **GitHub Pages base path:** the app is served under `/Design-Prompt-Studio/`, set via `base` in [`vite.config.js`](vite.config.js). If you fork to a custom domain, change `base` to `"/"`.

---

## Project structure

```
src/
  main.js                 Entry point — hash router, theme, app shell
  gallery/                Gallery view (tiles, filters, hero strip)
  studio/                 Studio wizard + Express composer + 5 step modules
  components-page/        #components browse view
  lib/
    assemblePrompt.js     Builds the 5-block prompt from state
    providers.js          "Open in Claude / ChatGPT / AI Studio" links
    store.js              localStorage wrapper
    dom.js · clipboard.js Small helpers
  data/
    styles/               116 base style presets (one file each) + categories
    prompts/              Curated JSON + algorithmic generator + registry
    components.js         70 UI component primitives
    libraries.js          100 license-vetted libraries
    locales.js · markets.js   The two localization axes
    moods.js · modifiers.js   Density / drama / motion layers
    taxonomy.js           Page types + clarifying questions
    global-rules.js       Rules injected into every prompt
  styles/                 CSS (tokens, reset, gallery, studio, tiles-*)
scripts/                  build-icons · enhance-components · smoke-test
docs/                     Living design docs (see below)
```

---

## Documentation

The `docs/` folder holds the living design documents:

| File | Covers |
|---|---|
| [FLOW.md](docs/FLOW.md) | Architecture: gallery-first IA, the 3 modes, prompt-block structure, state model |
| [PROMPT-GALLERY.md](docs/PROMPT-GALLERY.md) | Prompt content plan: card shape, curated vs. algorithmic tiers, search/filter |
| [PROMPT-PATTERNS.md](docs/PROMPT-PATTERNS.md) | Pattern library — lessons extracted from studying external design prompts |
| [COMPONENTS.md](docs/COMPONENTS.md) | UI component vocabulary: schema, scoring, cross-refs to libraries & styles |
| [TECH-STACK.md](docs/TECH-STACK.md) | Infra decisions: PWA, storage, GitHub Pages, zero-build ES modules |
| [../task.md](task.md) | Current state, done/in-progress/todo, file map |

---

## License

[MIT](LICENSE) © Yap Wei Jun

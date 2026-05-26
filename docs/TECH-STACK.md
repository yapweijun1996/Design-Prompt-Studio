# Tech Stack — Design Prompt Studio

**Status**: Draft v2 (Vite pivot) · 2026-05-26
**Companion to**: `docs/FLOW.md` (architecture), `task.md` (tracker)
**Supersedes**: Draft v1 (zero-build vanilla) — user prefers `npm run dev` / `npm run build` for DX

This doc fixes the tech-stack decisions for v0.4 ship. Every choice optimizes for **zero-friction copy-paste**, **offline-first**, **good developer experience (HMR + npm scripts)**, and **shipping the next 10 features without rewriting the foundation**.

---

## TL;DR — verdict

| Choice | Verdict | Notes |
|---|---|---|
| ✅ **PWA standard** | Yes | Via `vite-plugin-pwa` (workbox-based, far better than hand-written sw.js) |
| ⚠ **IndexedDB for storage** | **Defer to v0.5** | Not needed for v0.4 — explanation in § 2 |
| ✅ **localStorage for preferences** | Yes | Expanded to cover all v0.4 user data |
| ✅ **GitHub Actions deploy** | Yes | Target: **GitHub Pages**, with `npm run build` step |
| ✅ **`npm run dev` / `npm run build`** | Yes | **Vite** (latest) — HMR in dev, optimized bundle on build |

The only pushback is IndexedDB — over-engineering for v0.4. localStorage handles everything we need. We can graduate to IDB when data outgrows ~3 MB or we add community prompts / cached LLM outputs.

---

## 1. PWA — yes, via `vite-plugin-pwa`

### Why

- **Offline access**: users can open the Studio without network and still copy a prompt
- **Installable**: "Add to home screen" → feels like a real app
- **Fast loads**: service worker caches static assets, no flash of unstyled content
- **Mobile-first**: 63% higher completion on stepped forms when mobile-installed (per FLOW.md research)
- **No SaaS lock-in**: just static files (after build), deployable anywhere

### `vite-plugin-pwa` does the heavy lifting

Instead of hand-writing `sw.js` (the v1 approach in KB memory `5c2d5ba7`), the plugin auto-generates a workbox-based service worker that:
- Precaches every hashed asset Vite emits (no manual cache list to maintain)
- Auto-invalidates on every deploy (file hash changes → new SW)
- Supports `registerType: 'autoUpdate'` for transparent background updates
- Generates the manifest.webmanifest from a JS config block
- Adds the SW registration script automatically

This removes a **whole class of bugs** (stale precache lists, mismatched CACHE_VERSION, hand-written fetch handlers).

### Plugin config (in `vite.config.js`)

```js
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/Design-Prompt-Studio/",  // for github.io subdir; "" for custom domain
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icons/*", "offline.html"],
      manifest: {
        id: "/design-prompt-studio/",
        name: "Design Prompt Studio",
        short_name: "DPS",
        description: "Copy-paste prompts to design any webpage with any LLM",
        start_url: ".",
        scope: ".",
        display: "standalone",
        display_override: ["window-controls-overlay", "standalone"],
        background_color: "#FFFFFF",
        theme_color: "#000000",
        categories: ["productivity", "design", "developer"],
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
          { src: "icons/icon.svg", sizes: "any", type: "image/svg+xml" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,woff2,json}"],
        runtimeCaching: [
          {
            // Google Fonts: stale-while-revalidate
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\//,
            handler: "StaleWhileRevalidate",
            options: { cacheName: "google-fonts", expiration: { maxAgeSeconds: 60 * 60 * 24 * 365 } },
          },
          {
            // prompts catalog: cache-first with bg revalidate
            urlPattern: /\/data\/prompts\/.*\.json$/,
            handler: "CacheFirst",
            options: { cacheName: "prompts-catalog", expiration: { maxEntries: 200 } },
          },
        ],
        navigateFallback: "offline.html",
      },
    }),
  ],
});
```

### Source files we still write
- `index.html` — entry point with `<head>` metas
- `offline.html` — fallback when navigation fails
- `icons/` — `icon.svg` + 192/512 PNG (any + maskable)

### index.html `<head>` additions (manual, not plugin-generated)
viewport (viewport-fit=cover), theme-color (light+dark via media queries), color-scheme, apple-touch-icon + apple-mobile-web-app-* metas, OG + Twitter cards, JSON-LD `SoftwareApplication` schema. The plugin handles `<link rel="manifest">` and the SW registration script for us.

### Note on previous KB checklist
KB memory `5c2d5ba7` documents a **zero-build, hand-written SW** approach. With Vite + `vite-plugin-pwa`, most of that checklist is automated — but the conceptual goals (offline fallback, maskable icons, network-first navigation, install prompt UX) all still apply. Treat that memory as the "what" and `vite-plugin-pwa` as the "how".

---

## 2. Storage split — localStorage wins for v0.4

### What we actually need to store

| Data | Size estimate | Frequency | Best fit |
|---|---|---|---|
| **180 prompts catalog** (curated + standard) | ~2 MB JSON | Read on load, ~weekly updates | **Static file + SW cache** |
| **User preferences** (mode, last style, theme) | < 1 KB | Read/write per setting change | **localStorage** |
| **Session state** (wizard step, current selection) | < 5 KB | Write on every change | **localStorage** |
| **Custom presets** (user-saved configurations) | ~10 KB each, expect < 50 items | Write on Save | **localStorage** |
| **Copy telemetry** (per-prompt counts) | < 50 KB | Write on Copy | **localStorage** |
| **Recent prompts** (last 20 copied) | < 20 KB | Write on Copy | **localStorage** |
| **Cached LLM outputs** (v0.5 if we add iframe preview) | 50-500 KB each | Write on generation | **IndexedDB** ← when this lands |
| **Community-submitted prompts** (v0.5+) | unbounded | Sync on demand | **IndexedDB** ← when this lands |

**Total v0.4 storage footprint: ~100 KB max.** localStorage's 5 MB cap is 50× what we need. IDB is overkill until we add LLM-output caching or community prompts.

### The split (v0.4)

```js
// localStorage keys (all under `dpc-` prefix to avoid collisions)
dpc-prefs       = { mode, promptMode, theme, lastStyle, lastPageType }
dpc-state       = { ... full state object, auto-saved on change }
dpc-presets     = { [id]: { name, savedAt, state } }
dpc-recent      = [ promptId1, promptId2, ... ] (max 20)
dpc-copies      = { [promptId]: count }
dpc-install     = { dismissedAt }
```

### Why not IndexedDB now

| Cost | localStorage | IndexedDB |
|---|---|---|
| Lines of code | ~20 | ~150 (async wrapper) |
| API style | sync, simple | async, callbacks/promises |
| Schema migrations | none | required, painful |
| Debuggability | inspectable in DevTools as plain object | Application tab, less friendly |
| Crash recovery | trivial | requires schema versioning |

We pay all of IDB's cost up-front; we get none of its benefits until we have data > 5 MB or need to query/index.

### Graduation criteria — when to move to IndexedDB

Trigger on **any** of:
1. Cached LLM outputs land (each ~50-500 KB, could blow past 5 MB quickly)
2. Community-submitted prompts > 500 items
3. We need to **query** saved presets by tag / date / similarity
4. We add full-text search across all stored content (LunrJS or FlexSearch indices)
5. localStorage QuotaExceededError happens to a real user

**Until then**: localStorage. One JSON object per key, parse-on-read, stringify-on-write, debounce-200ms.

### Recommended wrapper (v0.4)

```js
// src/lib/store.js — thin localStorage wrapper with debouncing + JSON
const PREFIX = "dpc-";
const debouncers = new Map();

export const store = {
  get(key, fallback = null) {
    try { return JSON.parse(localStorage.getItem(PREFIX + key)) ?? fallback; }
    catch { return fallback; }
  },
  set(key, value) {
    // debounce writes per key (200ms)
    clearTimeout(debouncers.get(key));
    debouncers.set(key, setTimeout(() => {
      try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); }
      catch (e) {
        if (e.name === "QuotaExceededError") {
          console.warn("[dpc] localStorage full — consider IDB upgrade");
          // future: trigger migration
        }
      }
    }, 200));
  },
  setImmediate(key, value) {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  },
  remove(key) { localStorage.removeItem(PREFIX + key); },
};
```

20 lines. Done.

---

## 3. GitHub Actions deploy — yes, target GitHub Pages

### Why GitHub Pages (vs Cloudflare Pages / Netlify / Vercel)

| Host | Pros | Cons |
|---|---|---|
| **GitHub Pages** ✅ | Free, no signup, integrated with repo, custom domain free, automatic HTTPS, no analytics noise | Slightly slower CDN than Cloudflare |
| Cloudflare Pages | Faster CDN globally, edge functions if needed later | Separate account, extra config |
| Netlify / Vercel | Best DX, preview deploys per PR | Free tier limits, vendor lock |

For a static prompt tool, **GitHub Pages wins on simplicity**. We can swap to Cloudflare Pages in 30 minutes if we need the speed later.

### The workflow file

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deploy.outputs.page_url }}
    steps:
      - id: deploy
        uses: actions/deploy-pages@v4
```

### Repo settings to enable once
- Settings → Pages → Source: **GitHub Actions**
- Custom domain (optional): point `CNAME` file in `public/` + DNS

### Branch protection
- Optional: require PR review on `main`
- Optional: add `npm run build` + `npm run lint` as required status checks once they exist

---

## 4. Build pipeline — **Vite**

User preference: `npm run dev` / `npm run build` workflow. Vite is the right tool — fast dev server with HMR, optimized production builds, first-class PWA plugin, zero config for most cases.

### Why Vite (vs alternatives)

| Tool | Verdict | Notes |
|---|---|---|
| **Vite** ✅ | **Pick this** | Fastest dev (native ESM, no bundling in dev). Rollup in build = small optimized bundles. Best PWA plugin. Largest community in 2026. |
| esbuild (direct) | Skip | No dev server, no HMR, manual config gets messy fast |
| Parcel | Skip | Slower DX than Vite now, smaller ecosystem |
| Next.js / Astro | Skip | Overkill — we don't need SSR/SSG, we ARE the static content |
| Webpack | Hard skip | Slow, complex, legacy |

### `package.json` (initial)

```json
{
  "name": "design-prompt-studio",
  "version": "0.4.0",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --max-warnings 0"
  },
  "devDependencies": {
    "vite": "^6.0.0",
    "vite-plugin-pwa": "^0.21.0",
    "eslint": "^9.0.0"
  }
}
```

Two `devDependencies`. Zero runtime dependencies. No React, no Tailwind, no UI framework. Add only when justified.

### Commands

| Command | What | When |
|---|---|---|
| `npm run dev` | Starts Vite dev server on `localhost:5173` with HMR | Daily development |
| `npm run build` | Bundles to `dist/` — hashed assets, optimized SW, manifest | Before deploy / preview |
| `npm run preview` | Serves the built `dist/` locally to test the production bundle | Pre-deploy smoke test |
| `npm run lint` | ESLint with zero warnings | Pre-commit / CI |

### Repo file structure

```
Design-Prompt-Studio/
├── index.html              ← Vite entry (root, not src/)
├── public/                 ← Static assets copied as-is
│   ├── icons/*.png
│   ├── icons/icon.svg
│   ├── offline.html
│   ├── robots.txt
│   └── (CNAME if custom domain)
├── src/
│   ├── main.js             ← Entry, imports everything else
│   ├── data/
│   │   ├── taxonomy.js
│   │   ├── styles.js
│   │   ├── modifiers.js
│   │   ├── global-rules.js
│   │   ├── prompts/
│   │   │   ├── curated/*.json
│   │   │   ├── generate.js
│   │   │   └── index.js
│   │   └── briefs-defaults.js
│   ├── gallery/
│   │   ├── Gallery.js
│   │   ├── HeroStrip.js
│   │   ├── FilterBar.js
│   │   └── PromptTile.js
│   ├── studio/
│   │   ├── Studio.js
│   │   ├── Wizard.js
│   │   ├── Express.js
│   │   └── steps/*.js
│   ├── lib/
│   │   ├── assemblePrompt.js
│   │   ├── store.js        ← localStorage wrapper
│   │   ├── persistence.js
│   │   └── telemetry.js
│   └── styles/
│       ├── reset.css
│       ├── tokens.css
│       └── main.css
├── vite.config.js          ← Vite + PWA plugin config
├── package.json
├── package-lock.json
├── .gitignore              ← dist/, node_modules/
├── .nvmrc                  ← Node 20 LTS
├── .eslintrc.json
├── .github/workflows/
│   └── deploy.yml
├── docs/...
├── task.md
└── README.md (project-level, when we add one)
```

### Why `index.html` at root (not `src/`)
That's Vite's convention. The HTML file IS the entry point; Vite parses its `<script type="module">` tag and pulls in `src/main.js` from there.

### Output (`npm run build`)
- All JS is bundled, minified, hashed: `dist/assets/main-a3f8c2.js`
- All CSS extracted: `dist/assets/main-d92e1b.css`
- SW + manifest auto-generated
- `index.html` rewritten with correct asset paths
- `public/` contents copied to `dist/` root verbatim

### Dev experience
- Changes to JS/CSS hot-reload in < 50 ms (no page refresh, state preserved)
- Errors show in browser overlay
- Source maps work out of the box
- Vite serves modules natively in dev — fast cold start (~200 ms)

### When to graduate further

Add when needed (NOT now):
- **TypeScript** — add `typescript` devDep, rename `.js → .ts`, Vite handles it natively
- **Preact** — add `preact` + `@preact/preset-vite` if Studio reactivity gets gnarly
- **React** — only if we actually need a real component model (probably never for this scale)
- **Tailwind** — only if we adopt JSX components; **don't** ship Tailwind to the prompt output (keep stack-agnostic)
- **Tests** — Vitest is the obvious pick (same author, same config)

---

## 5. The complete tech surface (v0.4)

```
LANGUAGE         HTML5 + ES2022 JS (no TS for v0.4 — Vite ready when needed)
FRAMEWORK        None (vanilla JS modules; Preact via @preact/preset-vite if reactivity demands)
STYLING          CSS files + CSS custom properties (NOT Tailwind — keep prompt output stack-agnostic)
STATE            Plain object + localStorage (per § 2)
ROUTING          Hash-based (#gallery, #studio, #s=<encoded-state>) — no History API
ICONS            Inline SVG (preferred) or Lucide via static URLs
FONTS            Google Fonts via <link> (only the families our 5 styles need)
PWA              vite-plugin-pwa (workbox under the hood)
HOSTING          GitHub Pages
CI/CD            GitHub Actions: npm ci → npm run build → upload dist/ → deploy
BUILD            Vite (npm run dev / npm run build / npm run preview)
LINT             ESLint v9 (flat config)
NODE             20 LTS (pinned via .nvmrc + GHA cache)
DEPS (dev)       vite, vite-plugin-pwa, eslint
DEPS (runtime)   none
ANALYTICS        None initially; add Plausible / Umami if telemetry needed (privacy-friendly)
```

### Optional add-ons (when justified)
- **TypeScript** — add `typescript` devDep, rename files, Vite handles transpilation natively
- **Preact** — `@preact/preset-vite` if Studio wizard reactivity gets gnarly (~3 KB gzip)
- **Vitest** — same author as Vite, ~zero config, when we add real tests
- **FlexSearch** — if prompt count grows beyond 500 and search needs ranking
- **Plausible** — privacy-friendly analytics for "trending" feature (no cookies, GDPR-clean)
- **lit-html** — if vanilla template literals get unwieldy without going full component framework

---

## 6. Deployment risk register

| Risk | Probability | Mitigation |
|---|---|---|
| SW caches stale assets | Low | Vite hashes every asset; new hash → SW auto-updates |
| `base` config wrong → 404s on Pages | Medium (first deploy) | Set `base: "/Design-Prompt-Studio/"` in vite.config.js; test with `npm run preview` before deploy |
| localStorage quota exceeded | Low (v0.4) | Wrapper catches `QuotaExceededError` and warns; IDB migration ready |
| GitHub Pages downtime | Very low | PWA serves cached version offline |
| npm dependency vulnerability | Low | Dependabot enabled; only 2-3 devDeps |
| Browser doesn't support ES modules | Negligible | Drop IE11 (EOL); Safari ≥13 fine |
| User clears localStorage | Medium | Resume banner gracefully handles; gallery still works |
| Custom domain DNS misconfig | Low | Test on `*.github.io` URL first |
| Node version drift between dev & CI | Low | `.nvmrc` pinned + `actions/setup-node` reads it |

---

## 7. Open decisions

| # | Question | Options | Lean |
|---|---|---|---|
| TS1 | Domain | `design-prompt-studio.<your-domain>` / GitHub Pages subdomain | **Pages subdomain for v0.4**, custom later |
| TS2 | Theme | Light only / Dark only / Auto via `prefers-color-scheme` | **Auto** with localStorage override |
| TS3 | Analytics | None / Plausible self-hosted / Umami | **None at v0.4**, Plausible at v0.5 if Trending feature lands |
| TS4 | Mobile install prompt | Custom in-app / Browser default | **Custom** — match the design |
| TS5 | i18n | English only / Add 中文 toggle | **EN-only at v0.4**, 中文 at v0.5 |

---

## 8. Out of scope for v0.4

- Backend API (no server — pure static)
- User accounts / cloud sync
- Real-time collaboration
- Payment / paid tier
- Email / notifications
- Mobile app (PWA install covers it)
- Native desktop wrapper (Tauri / Electron)

These come back into scope only if telemetry shows real demand.

---

## References

- KB memory `5c2d5ba7` — PWA conversion checklist (zero-build vanilla)
- KB memory `f00f67d0` — Studio project snapshot (this stack feeds into it)
- KB memory `9ecd1732` — gallery-first architecture
- `docs/FLOW.md` — overall architecture
- `task.md` — current state + roadmap

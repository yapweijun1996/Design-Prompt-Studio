# COMPONENTS.md — UI component vocabulary

`Status: introduced 2026-05-26 (session-late v0.5.0-pre)`

A catalog of **70 UI component primitives** the prompt generator can include in a `<components>` block so LLMs have a shared widget vocabulary. Mirrors `libraries.js` in shape but for **patterns**, not packages.

## Why this exists

Before: prompts told LLM the *style* (Brutalist, Y2K, …) and the *sections* (hero, pricing, faq, …) but never the *widget* (combobox vs select vs radio, modal vs drawer, datatable vs card grid). Same prompt → 100 different widget choices, often wrong (country picker as `<select>`, multi-select as 8 checkboxes, etc.).

After: the assembler scores up to 18 relevant components per prompt and emits each with `when / not when / a11y / variants / libs`. Same prompt → consistent widget vocabulary.

## File layout

| File | Purpose |
|---|---|
| [`src/data/components.js`](../src/data/components.js) | 70 entries + helper functions |
| [`src/lib/assemblePrompt.js`](../src/lib/assemblePrompt.js) | `buildComponentsBlock()` |
| [`src/components-page/ComponentsPage.js`](../src/components-page/ComponentsPage.js) | `#components` browse UI |
| [`src/studio/steps/4-tech.js`](../src/studio/steps/4-tech.js) | "Components vocabulary" toggle + pinned-chip row |
| [`scripts/enhance-components.mjs`](../scripts/enhance-components.mjs) | Idempotent enhancer (safe to re-run) |

## Schema

```js
{
  id, name, category, tier,
  desc,                // 1-line summary
  whenToUse,           // when this IS the right primitive
  whenNotToUse,        // when an alternative beats it
  a11y,                // non-negotiable accessibility behaviour
  pairsWithLibraries,  // ids from libraries.js that implement it
  pairsWithStyles,     // ids from styles/* commonly needing it
  impliesBy,           // section / page-type / purpose keywords that trigger it
  variants?,           // optional named variants
}
```

## Distribution

| Tier | Count | Coverage |
|---|---|---|
| **1 — essential** | 25 | inputs / search / disclosure / feedback / progress (80% of modern UIs) |
| **2 — recommended** | 25 | navigation / data display / media / identity / misc |
| **3 — vertical** | 20 | commerce / chat / auth / advanced productivity |

| Category | n | Examples |
|---|---|---|
| input | 12 | combobox · multiselect · taginput · datepicker · fileupload · numberstepper · slider · toggle · segmented · otpinput · formwizard · inlineedit |
| search | 1 | searchbar (global ⌘K) |
| disclosure | 6 | modal · drawer · popover · tooltip · menu · accordion |
| feedback | 5 | toast · alertbanner · skeleton · emptystate · confirmdialog |
| progress | 1 | progressbar |
| navigation | 8 | breadcrumbs · tabs · pagination · infinitescroll · commandpalette · sidebarnav · bottomnav · skiplink |
| data | 12 | datatable · kanban · calendar · timeline · treeview · statkpi · sparkline · heatmap · comparisontable · diffview · jsonviewer · codeblock |
| media | 3 | carousel · lightbox · videoplayer |
| identity | 1 | avatar |
| misc | 1 | badge |
| commerce | 7 | variantpicker · minicart · wishlist · pricedisplay · checkoutstepper · addressbook · ratinginput |
| chat | 4 | messagebubble · typingindicator · chatcomposer · reactionpicker |
| auth | 4 | signinsocial · signupwizard · magiclinksent · profilemenu |
| advanced | 5 | sortablelist · resizablepanes · fab · onboardingtour · themetoggle |

## Scoring algorithm (assembler picks per prompt)

```
+3   impliesBy hit by a section / pageType.id / pageType.purpose
+2   pairsWithStyles hit by the chosen style.id
+100 forcedComponents pin (always wins, sorts to top)
```

Tiebreaker: lower `tier` ranks higher (T1 before T2 before T3). Capped at `MAX_COMPONENTS_PER_PROMPT = 18`.

### Why these scores

- Sections name *what's on the page*; if the page has a `filters` section, you really do need a combobox / multiselect / slider. Strongest signal → +3.
- Style names *the aesthetic register*; admin pages tend to have datatables, ecommerce tends to have variant pickers — useful but softer signal → +2.
- Pinned components are the user's explicit override; they outrank everything → +100.

## Pinning flow (Components page → Studio)

```
Card "📌 Use in Studio" → store.setImmediate("studio-forced-components", [...ids])
                       → location.hash = "studio"
                       → Studio.resumeOrFresh() merges into state.forcedComponents
                       → store.remove("studio-forced-components")
                       → Step 4 renders pinned chips (gold dashed border)
                       → assemblePrompt scores forced +100
                       → <components> block lists them at the top
```

The handoff is **additive**: multiple pins accumulate, don't overwrite saved Studio state.

## Toggle (state.includeComponents)

Step 4 → "Components vocabulary" radio:
- `Include` (default) — emit `<components>` block (~2.7K tokens for 18 picks)
- `Skip` — suppress entirely; saves prompt budget when LLM doesn't need the vocabulary

`buildComponentsBlock()` returns `null` on Skip, so the block is omitted (not just emptied).

## Cross-references (the joins that make it useful)

| Direction | Source | Target | Helper |
|---|---|---|---|
| Component → libraries | `pairsWithLibraries` ids | `libraries.js` entries | `getLibrary()` |
| Component → styles | `pairsWithStyles` ids | `styles/index.js` ids | `getComponentsForStyle()` |
| Section → component | `impliesBy` keywords | section slugs in `taxonomy.js` | `getComponentsForContext()` |

When you add a new style: skim component `pairsWithStyles` arrays and add your style id where it fits. When you add a new page type with new section slugs: re-run `scripts/enhance-components.mjs` after editing the additions map in that file.

## Anti-patterns codified (the parts LLMs forget)

A11y notes are not boilerplate — they encode the **specific** mistakes Claude / GPT / Llama make when asked to build these widgets:

- `combobox` — typically built as plain `<input list>` instead of `role=combobox + aria-activedescendant`
- `modal` — focus trap missing → tab escapes into the page behind
- `kanban` — drag-drop ships with no keyboard alternative; cards become un-reorderable for keyboard users
- `carousel` — autoplay can't be paused, doesn't respect `prefers-reduced-motion`
- `confirmdialog` — default focus on Confirm (dangerous on Enter); should be Cancel
- `themetoggle` — sets the class async, causes FOUC; should sync-update `<html>` before paint
- `sortablelist` — relies on HTML5 DnD only; should expose arrow-key + Space-to-confirm fallback
- `skiplink` — target `#main` not given `tabindex='-1'`; skip jumps don't actually receive focus

Each entry's `a11y` field is one sentence chosen to make the LLM produce code without these bugs.

## Future work (out of scope for v0.5)

- **Tier-4 components** — admin patterns (saved filters, inline drawer-editor, column visibility), social (reaction chain, share strip), AI-native (streaming chat composer, suggestion chips, citation hover-card)
- **Auto-suggested libraries** — when a component is picked and its `pairsWithLibraries` includes a lib not already selected, suggest enabling it in Step 4
- **Live preview tiles** — render a tiny working demo of each component in `#components` cards (mostly-static SVG/CSS, no JS framework)
- **Tier-3 push into prompt budget** — if Skip block too aggressive, expose a slider in Studio: 0 / 6 / 12 / 18 / 24 components
- **Variant cards** — separate browse entry per `variants[]` so e.g. "Single-open accordion" and "Multi-open accordion" are findable individually

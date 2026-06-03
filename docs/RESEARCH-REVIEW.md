# Research Review — ChatGPT Deep-Research Report

**Status**: Decision record · 2026-05-30
**Reviews**: [`Deep-Research-Report-from-Chatgpt.md`](Deep-Research-Report-from-Chatgpt.md)
**Companion to**: [`FLOW.md`](FLOW.md), [`../task.md`](../task.md)

> **Core insight**: The report independently re-derives the architecture Design Prompt
> Studio already shipped. Read it as **validation + an enrichment roadmap**, not as a
> greenfield plan to "start here". ~85% of its recommendations are things DPS already
> does; the value is in the handful of genuinely new, low-cost, high-ROI ideas — and in
> knowing which 2 recommendations **not** to follow because they assume a from-scratch
> React project, which DPS is not.

---

## 1. Verdict

**Direction confirmed.** The report's recommended product position — an *intent-to-blueprint
compiler* that is renderer-agnostic and agent-agnostic, outputs a copy-paste prompt (not a
website), and is driven by versioned JSON registries rather than prompt strings — **is exactly
what DPS already is**. The thesis ("AI website generation fails because the prompt is
under-specified, so own the upstream requirements-engineering layer") matches the original
product judgment recorded in [`FLOW.md`](FLOW.md).

The report reads as if the product does not exist yet ("the first version should be…"). DPS is
already past the report's "Phase 1". So every recommendation below is scored against **what is
already in the repo**, not against zero.

---

## 2. Report recommendation × DPS reality

| Report recommends | DPS today | Status | Evidence |
|---|---|---|---|
| Intent→prompt compiler, renderer/agent-agnostic, output = prompt | This is the product | ✅ Already | [`assemblePrompt.js`](../src/lib/assemblePrompt.js) |
| Registries (JSON), not prompt strings | taxonomy + 100 styles + 70 components + 100 libraries | ✅ Already | [`taxonomy.js`](../src/data/taxonomy.js), [`components.js`](../src/data/components.js), `styles/`, [`libraries.js`](../src/data/libraries.js) |
| 2-D: surface type (page) **and** industry as separate axes | page types yes; industry only a `genericIndustry` field, not user-selectable | ⚠️ Partial — real gap | `PAGE_TYPES[*].genericIndustry` in [`taxonomy.js`](../src/data/taxonomy.js) |
| Structure → style → implementation staging | wizard is **style(1) → page(2)** → brief → tech | ⚠️ Reversed order, debatable | `src/studio/steps/` |
| Style as DTCG token packs | styles have structured fields (boldFactor / antiPatterns / responsive / snippets), not formal DTCG tokens | ⚠️ Future | `styles/*.js` |
| **Prompt quality score + export gating** | **none** | ❗ Adopt — highest ROI | — |
| Multiple agent-specific adapters (v0 / bolt / cursor / brief-only) | stack adapters only (html / react / next) | ⚠️ Extend | `STACKS` in [`assemblePrompt.js`](../src/lib/assemblePrompt.js) |
| Formal intermediate Blueprint JSON schema + structured outputs | `state` object → assembler → text; no formal blueprint layer | ⚠️ Defer (YAGNI until AI intake) | `src/studio/Studio.js` |
| localStorage for prefs, IndexedDB for projects | localStorage only; IDB already planned for v0.5 | ✅ Matches own plan | [`TECH-STACK.md`](TECH-STACK.md) |
| WCAG/ARIA baked into prompts | partial via global-rules | ⚠️ Strengthen | [`global-rules.js`](../src/data/global-rules.js) |
| **React + TS + Vite for a "serious" MVP** | vanilla ES + Vite, **0 runtime deps** | ❌ Do NOT adopt | [`package.json`](../package.json) |

---

## 3. Decisions

### 3a. Adopt (low cost, high ROI — do these)

1. **Prompt quality score + export gating.** A 0-100 rubric (clarity / specificity /
   completeness / layout / visual / technical / agent-readiness) that warns or blocks when the
   assembled prompt lacks audience, primary CTA, required sections, responsive, or a11y. This is
   the single biggest differentiator the report surfaces and DPS lacks. Hook into the Review
   step (`5-review.js`) and/or `assemblePrompt.js`.
2. **Per-page-type `avoid` / anti-patterns.** Styles already carry `antiPatterns`; extend the
   same idea to page types (the new `experience` types especially). Cheap, immediately improves
   output quality.
3. **Industry as a selectable axis.** The `genericIndustry` / `commonIndustries` fields already
   exist on every page type — promote industry to a first-class, user-pickable dimension so
   "Healthcare + Booking" or "Finance + Dashboard" can compose. Validates the report's central
   2-D taxonomy claim with minimal new structure.
4. **Agent-specific prompt adapters.** On top of the existing html/react/next stack adapters,
   add target-agent variants (v0, Cursor/Codex, brief-only for human designers). Reuses
   `assemblePrompt` output shaping.

### 3b. Defer (sound, but not now)

- **Formal Blueprint JSON intermediate layer.** Only pays off once free-text → AI auto-classify
  intake exists. Until then the `state` object is sufficient. Revisit when adding AI intake.
- **HTML live preview + CSP sandbox.** The report itself flags this as the biggest source of
  scope creep and security risk. Keep deferred (consistent with current roadmap).
- **DTCG design tokens.** Worth it when feeding designers/exports from one source of truth;
  not blocking prompt quality today.

### 3c. Reject (does not fit DPS context)

- **Rewrite to React + TypeScript.** DPS runs on vanilla ES modules + Vite with **zero runtime
  dependencies** — that is a feature and a moat, not a deficiency. The report's advice assumes a
  from-scratch project with no existing stack; it does not account for DPS's working, shipped
  codebase. Rewriting would be high cost for unclear benefit. **Hold the vanilla stack.**

---

## 4. Caveats about the report itself

1. **The `cite…turn…view…` markers are broken citation placeholders**, not clickable sources.
   The report *looks* heavily cited but the citations are unverifiable as written. Its claims
   about Webflow / Framer / Wix / Bolt / Builder are broadly consistent with the 2024-2025
   market but should be **re-verified independently** before being treated as fact.
2. **It is written as greenfield strategy.** Map every "should build" back to "already built /
   partially built / not built" (see §2) before acting.
3. **Style-vs-structure ordering** differs from DPS (report = structure-first; DPS =
   style/gallery-first). Both are defensible; DPS leads with style because the gallery is the
   entry surface. No change required, but the divergence is intentional, not an oversight.

---

## 5. What to do next

1. Treat the report as a confidence signal — the shipped architecture is validated.
2. Sequence the §3a adopt-list by ROI: **(1) quality score + gating → (2) page-type
   anti-patterns → (3) industry axis → (4) agent adapters.**
3. Keep the §3c rejection (no React rewrite) on record so future contributors are not
   re-persuaded by the report's generic stack advice.

# Prompt Patterns — Lessons from Studying Real-World Design Prompts

**Status**: Living doc · 2026-05-26
**Purpose**: Capture reusable patterns learned from external prompts before we ship our own template library. Each entry: source → extracted patterns → lessons that change our system.

---

## Sample #1 — "Linear / Modern" design-system prompt

**Submitted**: 2026-05-26 by Wei Jun
**Genre**: Conversational integration prompt (style applied to existing codebase, not greenfield)
**Length**: ~2500 words

### Top-level structure
```
<role>            ← posture, scope-discovery instructions
  - mental model first
  - ask focused questions
  - propose plan
  - explain reasoning as you go
<design-system>   ← the system itself
  Philosophy → Differentiation → Tokens → Background → Typography
  → Radius/Border → Shadows → Components → Layout → Bold Factor
  → Anti-Patterns → Motion → A11y
```

### Patterns worth stealing

#### P1. "The 'X' Feel" heuristic line
> *"The 'Software Feel': This design should feel like using a desktop application, not a website. Interactions are instant and precise."*

A single sentence that gives the LLM an emotional anchor stronger than any list of properties. One per style.

**Apply to us**: every style preset gets a `feel` field — one short sentence using "feel like / not like" framing.

#### P2. "Bold Factor" — numbered MUST-have signatures
> *"These elements MUST be present for authenticity:*
> *1. Animated Ambient Blobs ...*
> *2. Mouse-Tracking Spotlights ...*
> *3. Gradient Typography ..."*

Stronger than a generic enforcement list because:
- It's **short** (4–6 items vs. our 14–16)
- Each is **named** ("Animated Ambient Blobs") not described
- The word **"authenticity"** + **"MUST"** is rhetorical pressure

**Apply to us**: every style preset gets a `boldFactor: string[]` of 4–6 named signatures, in addition to (not replacing) the long enforcement rules. The Bold Factor goes near the TOP of the design-system block where attention is highest.

#### P3. Numbered "Differentiation via signature elements"
> *"Unlike flat dark modes or simple gradient overlays, this creates genuine atmospheric presence through:*
> *1. Multi-layer background system ...*
> *2. Animated gradient blobs ..."*

Parallel to our differentiation tables, but list form. Lists are easier to write for some styles where the contrast isn't 1:1 with a competitor (e.g. a style that mixes 3 influences).

**Apply to us**: keep tables for styles with 1–2 close competitors; add list form for styles defined against a broader category.

#### P4. Tokens as Markdown tables, not just CSS code blocks
```
| Token                 | Value                       | Usage             |
|:----------------------|:----------------------------|:------------------|
| background-deep       | #020203                     | Footer, deepest   |
| background-base       | #050506                     | Primary canvas    |
```

Scannable. Lets the LLM map "this token name → this hex → this purpose" in one glance.

**Apply to us**: render the v0.3 `--var #hex Description` blocks as 3-column tables instead.

#### P5. Inline Tailwind utility strings as evidence
```
bg-[radial-gradient(ellipse_at_top,#0a0a0f_0%,#050506_50%,#020203_100%)]
shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_2px_20px_rgba(0,0,0,0.4),0_0_40px_rgba(0,0,0,0.2)]
```

Copy-pasteable. The LLM doesn't have to translate prose → CSS → Tailwind; the answer is already in the prompt.

**Apply to us**: when `stack === "react"` or `stack === "next"`, emit Tailwind strings inline in tokens / shadows / gradients. When `stack === "html"`, emit raw CSS. The data file holds both forms keyed by stack.

#### P6. Anti-patterns with one-line "why"
> *"1. **Flat backgrounds:** Never use a single solid color. Always layer gradients, noise, and ambient light."*
> *"7. **Colorful accent overuse:** The accent color is for highlights and interaction, not decoration. Most of the UI is monochromatic."*

Format: `**Anti-pattern name:** Don't X. Reason: Y.` — short, rhetorical, complete.

**Apply to us**: reformat v0.3's "What this design is NOT" bullets to follow this pattern. Each bullet becomes:
```
- **<short name>**: Don't <X>. Why: <one-line reason>.
```

#### P7. Explicit mobile scaling table
> *"- Section padding scales: py-16 (mobile) → py-24 (tablet) → py-32 (desktop)*
> *- Hero typography: text-4xl → text-5xl → text-7xl/text-8xl*
> *- Body text: text-base → text-lg → text-xl"*

Lists exact responsive scaling per element. The LLM stops guessing breakpoints.

**Apply to us**: every style preset gets a `responsive` table listing 4–6 element classes × 3 breakpoints. We currently don't have this — major gap.

#### P8. Verified contrast ratios in the A11y section
> *"- Primary text (#EDEDEF on #050506): ~15:1 ratio ✓*
> *- Muted text (#8A8F98 on #050506): ~6:1 ratio ✓"*

Pre-computed ratios with checkmarks. The LLM doesn't have to verify; the prompt has already done the work.

**Apply to us**: compute ratios at prompt-assembly time from the chosen palette and emit them inline. Catches palette mistakes before they reach the LLM.

#### P9. Numbers EVERYWHERE
Examples from the prompt:
- `blur-[150px]`
- `900×1400px`
- `25% opacity`
- `300px diameter`
- `15% opacity`
- `4-8px max`
- `0.98-1.02 scale`
- `200-300ms`
- `8000-10000ms`
- `0.08s stagger`
- `15-20% viewport threshold`

Every adjective ("subtle", "soft", "quick") is paired with a number. Adjectives are aspirational; numbers are testable.

**Apply to us**: audit each v0.3 style preset for adjectives without numbers and add ranges. (We're already good at this for typography scale, weaker for opacity/blur/duration.)

#### P10. Pseudo-code snippets inside the prompt
```css
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(1deg); }
}
```

Even small code fragments — keyframes, mask-composite tricks, shadow stacks — act as templates the LLM extends rather than invents.

**Apply to us**: each style preset embeds 3–5 small code snippets for its signature techniques (we partly do this; make it systematic).

### Patterns that DON'T fit us

#### N1. "Ask the user focused questions"
This prompt is **conversational** — it expects to be pasted into a chat where the user answers questions before code is written. Our v0.3 is **one-shot**: paste, hit enter, get code.

Both are valid. They serve different scenarios:
- **One-shot**: greenfield, single LLM round-trip, user wants HTML output to paste somewhere
- **Conversational**: integrating into existing codebase, multi-turn dialogue, IDE-assistant style (Cursor / Cline / Claude Code)

**Decision**: Studio should offer **both modes** as a top-level toggle, generating different role/operating-rules blocks:

- **Mode A · One-shot** (current v0.3, gallery default) — "no questions, deliver complete code"
- **Mode B · Conversational** (new) — "build a mental model first, ask focused questions, then propose a plan"

The `<design-system>` block is identical either way; only `<role>` and `<operating-rules>` change.

#### N2. Stack-locked prose
This prompt assumes Tailwind + likely React. Many of the inline utility strings only make sense in that stack. Our system is stack-agnostic.

**Decision**: keep emit-by-stack logic (per P5). Don't bake Tailwind into the style data — store both raw values and stack-specific utility strings.

#### N3. Brand-comparison framing ("Like Linear, Vercel, Raycast")
The prompt directly names competitor products. This grounds the LLM fast but is brittle:
- If the LLM doesn't know the named product well, the anchor fails silently
- Some users may not want their output to look like Linear

**Decision**: keep our existing "real-world references" rule that cites brands/publications/spaces (not websites). It's more robust.

---

## Synthesized lessons → concrete changes

### Changes to `STYLE_PRESETS` data shape

```diff
 const STYLE_PRESETS = {
   monochrome: {
     name: "Minimalist Monochrome",
     tag: "Editorial luxury",
     desc: "Pure black & white. Oversized serif. Sharp corners. Vogue-meets-Bauhaus.",
+    feel: "Opening a Vogue Italia issue from the Sozzani era — not browsing a website.",
+    boldFactor: [
+      "Pure black + pure white only — no exceptions",
+      "Display serif headlines at 8xl+ (oversized = graphic)",
+      "Hairlines and rules — never shadows",
+      "Inversion blocks (whole-section black-on-white swap) for emphasis",
+      "Boxed drop cap on long-form sections",
+      "Mono labels in tracking-widest uppercase",
+    ],
+    tokens: {
+      // 3-column structured form for table rendering
+      colors: [
+        { name: "bg",           value: "#FFFFFF", usage: "Page canvas" },
+        { name: "fg",           value: "#000000", usage: "Body text, primary borders" },
+        // …
+      ],
+    },
+    stackEmit: {
+      // when stack === "react", use tailwind strings; when "html", use raw CSS
+      hero: {
+        css:      "font-size: clamp(56px, 11vw, 160px); letter-spacing: -0.04em;",
+        tailwind: "text-[clamp(56px,11vw,160px)] tracking-[-0.04em]",
+      },
+    },
+    responsive: [
+      { element: "Section padding",   mobile: "py-12",   tablet: "py-20",  desktop: "py-32" },
+      { element: "Hero type",         mobile: "text-5xl",tablet: "text-7xl",desktop: "text-9xl" },
+      { element: "Body type",         mobile: "text-base",tablet:"text-lg", desktop: "text-xl" },
+      // …
+    ],
+    antiPatterns: [
+      { name: "Color drift",     dont: "use blue/gray/cream",          why: "Black IS the accent — adding any color breaks the system" },
+      { name: "Rounded corners", dont: "use border-radius > 0",        why: "Sharp corners are constitutional — exceptions read as mistakes" },
+      // …
+    ],
+    snippets: [
+      // small code blocks the LLM extends instead of inventing
+      `repeating-linear-gradient(0deg, transparent, transparent 1px, #000 1px, #000 2px)`,
+      `inset 0 1px 0 0 rgba(255,255,255,0.1)`,
+    ],
     md: `# Design Style: Minimalist Monochrome  ...existing rich MD...`,
   },
 };
```

The existing `md` field stays as the authoritative source. The new structured fields enable:
- Programmatic A11y contrast checking
- Stack-aware code emission
- Responsive scaling tables
- Hero "Bold Factor" rendering near top of prompt

### Changes to prompt assembly

Add to the `<role>` block (one-shot mode unchanged), then mode-toggle:

```js
function buildRole(state) {
  if (state.meta.promptMode === "conversational") {
    return `<role>
You are an expert frontend engineer, UI/UX designer, visual design specialist, and typography expert. Your goal is to help the user integrate this design system into their existing codebase.

Before proposing or writing any code:
1. Build a clear mental model of the current system (stack, tokens, conventions).
2. Ask 2-4 focused questions about scope and goals.
3. Propose a concise plan emphasizing token centralization, reusability, and consistency.
4. Explain reasoning briefly as you write code.
</role>`;
  }
  // default: one-shot, v0.3 behavior
  return `<role>
You are an expert frontend engineer and UI/UX designer. Deliver a complete, production-ready ${pageType} page in a single response. No clarifying questions. No plans. No back-and-forth.
</role>`;
}
```

Add a **Bold Factor** block near the TOP of the design-system section:

```
## Bold Factor (these MUST be present for authenticity)
${preset.boldFactor.map((s, i) => `${i+1}. **${s}**`).join("\n")}
```

Add a **Responsive Scaling** table:
```
## Mobile-Specific Adjustments
| Element | Mobile | Tablet | Desktop |
|---|---|---|---|
${preset.responsive.map(r => `| ${r.element} | ${r.mobile} | ${r.tablet} | ${r.desktop} |`).join("\n")}
```

Add an **Accessibility** block with pre-computed ratios:
```
## Accessibility (verified)
- Primary text (${fg} on ${bg}): ~${ratio(fg,bg)}:1 ${ratio(fg,bg)>=7?"✓ AAA":ratio(fg,bg)>=4.5?"✓ AA":"⚠ below AA"}
- Muted text   (${muted} on ${bg}): ~${ratio(muted,bg)}:1 ...
```

### Studio UI changes (small)

Add a mode toggle in Step 4 (Tech):
```
PROMPT MODE
( ) One-shot       — Single LLM response (paste, hit enter, get HTML)
( ) Conversational — Multi-turn integration (best for Cursor / IDE assistants)
```

Default to One-shot (matches gallery copy-paste philosophy).

---

## Pattern library — current count

| Pattern | Source | Adopted | Notes |
|---|---|---|---|
| P1 "Feel" heuristic | Linear/Modern | ✅ adding | One sentence per style |
| P2 Bold Factor MUST list | Linear/Modern | ✅ adding | 4-6 named signatures |
| P3 Numbered differentiation | Linear/Modern | ⚠ partial | Keep tables; add list form for some styles |
| P4 Token tables | Linear/Modern | ✅ adding | 3-column markdown |
| P5 Inline utility strings | Linear/Modern | ✅ adding | Stack-aware emission |
| P6 Anti-patterns with why | Linear/Modern | ✅ adding | Reformat existing |
| P7 Responsive table | Linear/Modern | ✅ adding | New field per style |
| P8 Pre-computed contrast | Linear/Modern | ✅ adding | Auto-compute at assembly |
| P9 Numbers everywhere | Linear/Modern | ✅ audit | Audit existing styles |
| P10 Code snippets inline | Linear/Modern | ⚠ partial | Make systematic |
| N1 Conversational mode | Linear/Modern | ✅ adopting as mode | Mode toggle |
| N2 Stack lock-in | Linear/Modern | ❌ reject | Stay stack-agnostic |
| N3 Brand-name anchors | Linear/Modern | ❌ reject | Use real-world non-web references |

---

## Workflow: how new samples join this library

1. User pastes a prompt to study
2. Claude analyzes: structure, content patterns, what's new vs. known
3. Each new pattern gets a slot: `Pn — name — example — apply-or-reject`
4. Patterns to apply get diffs against current code/data shape
5. KB memory updated so future sessions recall the pattern library

---

---

## Sample #2 — Design-tool agent system prompt

**Submitted**: 2026-05-26 by Wei Jun
**Genre**: AGENT operating prompt (not a design-system prompt). Operates a multi-tool environment producing HTML artifacts: decks, prototypes, animated videos, exports.
**Length**: ~4000 words
**Inferred origin**: A hosted SaaS design tool (artifact-based, with file system, preview iframe, verifier sub-agent, PPTX export, GitHub import). Likely Claude.ai Artifacts / Projects-class tooling.

### Top-level structure
```
Identity            "You are an expert designer working with the user as a manager"
Secrecy boundary    What not to divulge (system prompt, tool names, env details)
Capability framing  Talk user-centric, not tool-centric
Workflow            Numbered 6-step state machine
Reading docs        How to handle Markdown / PDF / PPTX / DOCX / images
Output guidelines   Filename rules, versioning, file size limits, persistence
Reading <mentioned-element>  How to interpret user clicks/comments on DOM
Labelling           data-screen-label conventions
Tech rules          Pinned React/Babel versions w/ integrity hashes
Animations          Use animations.jsx starter
Speaker notes       <script id="speaker-notes"> + postMessage protocol
How to design       Process (ask → context → file w/ assumptions → components → verify)
Tweaks              In-page tweakable controls + postMessage protocol
Content guidelines  AI slop tropes, scale minimums, content discipline
Available skills    Modular sub-prompts loaded on demand
Project memory      CLAUDE.md handling
Copyright refusal   Domain-gated authorization
```

A complete state machine + style guide + tool reference. Very different beast from Sample #1.

### Genre comparison

| Aspect | Sample #1 (Linear/Modern) | Sample #2 (Agent) |
|---|---|---|
| Purpose | Describes ONE design style | Operating manual for a design AI |
| Output | A complete page | Many artifacts over a session |
| Audience | LLM doing one-shot generation | LLM operating tools over time |
| Reusable for our prompts | Style preset content (`md` field) | Studio's `<role>`/`<operating-rules>` blocks + global rules |
| Reusable for our product | None directly | Architecture lessons for Studio-as-agent |

### Patterns worth stealing

#### P11. Agent identity as "X working for Y as manager"
> *"You are an expert designer working with the user as a manager."*

A two-sided role: agent has expertise; user has authority. Sets the power dynamic. Compare Sample #1's "you are an expert frontend engineer..." — that's just one side.

**Apply to us (conversational mode only)**: replace `"You are an expert frontend engineer..."` with `"You are an expert frontend designer working with the user as their product/design manager. They have authority over scope and direction; you have expertise in execution."`

#### P12. Numbered workflow as part of the role
> *"## Your workflow*
> *1. Understand user needs ...*
> *2. Explore provided resources ...*
> *3. Plan and/or make a todo list ...*
> *4. Build folder structure ...*
> *5. Finish: call `done` ...*
> *6. Summarize EXTREMELY BRIEFLY"*

The role doesn't just describe WHO the LLM is, it scripts the SEQUENCE of work. This is a stronger guardrail than "do your best".

**Apply to us**:
- **One-shot mode**: keep current "just deliver" — but add 4-line numbered "Internal sequence" that the LLM should follow silently before emitting code: *(1) re-read design system → (2) plan sections → (3) write code → (4) close with Design Decisions*.
- **Conversational mode**: explicit 5-step visible workflow (clarify → explore → plan → code → verify).

#### P13. "EXTREMELY BRIEFLY" closing rhetoric
> *"6. Summarize EXTREMELY BRIEFLY — caveats and next steps only."*

Capitalization as emphasis. Combined with "caveats and next steps only" eliminates LLM verbosity tail.

**Apply to us**: every prompt ends with `### Closing: under 80 words. Caveats and next steps only. No recap of what you built.`

#### P14. The "asking questions" methodology (massive)
> *"Ask at least 10 questions, maybe more ...*
> *- Always confirm the starting point and product context*
> *- Always ask whether they'd like variations, and for which aspects*
> *- ... whether they want divergent visuals, interactions, or ideas*
> *- ... at least 4 other problem-specific questions"*

A checklist for what to ask **before** doing creative work. This is gold for our conversational mode.

**Apply to us — Conversational mode**: bake this directly into `<operating-rules>` when `promptMode === "conversational"`:
```
Before writing code, ask 8-12 focused questions covering:
1. Existing context (codebase, design system, UI kit, brand)
2. Variations desired (how many, across which axes)
3. Novel vs by-the-book preference
4. Flow vs copy vs visual priorities
5. Tweaks/parameters the user wants exposed
6-12. Problem-specific
```

Also: add a **"questions checklist"** field to each `pageType` in our taxonomy — pre-written questions specific to that artifact (different for a dashboard vs a 404 vs a checkout).

#### P15. AI slop tropes — named anti-patterns at the META level
> *"**Avoid AI slop tropes:** incl. but not limited to:*
> *- Avoiding aggressive use of gradient backgrounds*
> *- Avoiding emoji unless explicitly part of the brand*
> *- Avoiding containers using rounded corners with a left-border accent color*
> *- Avoiding drawing imagery using SVG; use placeholders and ask for real materials*
> *- Avoid overused font families (Inter, Roboto, Arial, Fraunces, system fonts)"*

This is **meta-level**, not style-specific. It applies to ALL design output regardless of style. Naming them BY NAME ("AI slop tropes") creates rhetorical pressure.

**Apply to us (every prompt)**: add a `<global-rules>` block above `<design-system>` listing these. Each style preset's anti-patterns layer on top of global anti-patterns. Note that some — like "avoid Inter / Fraunces" — directly conflict with our existing styles (Editorial uses Fraunces). So this list should be **opinionated default** that the chosen style can override (e.g. Editorial preset says "Fraunces is required, overriding the global avoid").

#### P16. Content discipline as operating principle
> *"**Do not add filler content.** Never pad a design with placeholder text, dummy sections, or informational material just to fill space. Every element should earn its place ... One thousand no's for every yes. Avoid 'data slop' — unnecessary numbers or icons or stats that are not useful. Less is more."*

Strong, quotable, memorable. The Steve Jobs reference ("one thousand no's") carries cultural weight.

**Apply to us (every prompt)**: add to `<global-rules>`:
- "Every section must earn its place. No filler, no padding, no dummy stats."
- "Less is more. When tempted to add — ask 'does this serve the user?'"

#### P17. Scale minimums as testable rules
> *"- 1920x1080 slides: text never smaller than 24px*
> *- 12pt minimum for print*
> *- Mobile mockup hit targets: never less than 44px"*

Numbers with units. The LLM can self-check.

**Apply to us**: add to `<global-rules>`:
- "Mobile touch targets ≥ 44×44px"
- "Body text ≥ 16px (≥18px preferred)"
- "Print: ≥ 12pt"
- "Slide text: ≥ 24px"

#### P18. "Avoid web design tropes unless making a web page"
> *"Avoid web design tropes and conventions unless you are making a web page."*

A single line that prevents the LLM from defaulting to hero+features+CTA layout when the artifact is a slide / poster / printable / animation.

**Apply to us**: relevant when our `pageType` is non-marketing (e.g. case-study, deck-export, print-form). Add as conditional rule: `if pageType in [print, deck, poster, animation]: emit "avoid web design tropes — this is a {pageType}, not a website."`

#### P19. "Placeholders > bad attempts"
> *"If you do not have an icon, asset or component, draw a placeholder: in hi-fi design, a placeholder is better than a bad attempt at the real thing."*

Counterintuitive but right. The LLM tends to invent low-quality SVGs when asked for visuals it can't deliver.

**Apply to us**: global rule — "When unsure about an image / icon / chart, output a clearly-labelled placeholder (e.g. `<div class='placeholder'>HERO IMAGE</div>`) instead of attempting an SVG fake."

#### P20. Match-the-visual-vocabulary protocol
> *"When adding to an existing UI, try to understand the visual vocabulary of the UI first, and follow it. Match copywriting style, color palette, tone, hover/click states, animation styles, shadow + card + layout patterns, density, etc. It can help to 'think out loud' about what you observe."*

Parallel to Sample #1 N1, but framed as a procedure for the LLM ("think out loud first"). The "think out loud" instruction encourages chain-of-thought that the user sees, building trust.

**Apply to us — Conversational mode**: add operating rule "When the user has provided an existing codebase or reference, begin by reading 2-3 representative files and writing a 5-bullet observation of their visual vocabulary BEFORE proposing changes."

#### P21. Color discipline: brand → OKLCH harmony → never invent
> *"Color usage: try to use colors from brand / design system, if you have one. If it's too restrictive, use oklch to define harmonious colors that match the existing palette. Avoid inventing new colors from scratch."*

A graduated fallback: brand colors → harmonious-but-novel via OKLCH → never random. OKLCH is current (perceptually uniform color space, widely supported in modern browsers since ~2023).

**Apply to us**: global rule for the brief assembly — when user provides a palette, use it; when they don't, the style preset's palette wins; when extending the palette, use OKLCH formulas, never random hex.

#### P22. CRITICAL: pattern with "why-violation matters"
> *"**CRITICAL: When defining global-scoped style objects, give them SPECIFIC names...** This is non-negotiable — style objects with name collisions cause breakages."*

Format: **CRITICAL: rule. Why-failure happens: Y.** The "why-failure" line is what makes the LLM actually obey rather than relativize.

**Apply to us**: rewrite our enforcement rules in this format. Currently we say "use SOMETHING font-family"; should say "**CRITICAL**: use SOMETHING font-family. Inter/Roboto fallback fails because the style depends on serif contrast — without it the output reads as generic SaaS, not the intended aesthetic."

#### P23. Variation strategy: basic → creative gradient
> *"Give options: try to give 3+ variations across several dimensions ... Start your variations basic and get more advanced and creative as you go!"*

For our Studio's "Variations" feature (future): when asking the LLM for N options, request basic→exotic gradient explicitly. Not 3 random options, but option-1=conventional, option-2=intermediate, option-3=novel.

**Apply to us — variations feature (future)**: when assembling a multi-variant prompt, format the request: *"Give 3 options: (1) conservative, by-the-book, (2) confident, brand-true, (3) novel and creative, surprising. Each option is a separate complete page."*

#### P24. Tweakable artifacts protocol (architectural)
The whole Tweaks section — postMessage protocol + JSON comment markers `/*EDITMODE-BEGIN*/.../*EDITMODE-END*/` enabling host-rewritable defaults.

This is an **architecture lesson** for Studio v0.5+: any generated HTML can embed its own tweak controls that survive reload. We could emit prompts that **request** the LLM include this pattern in its output, so users get a self-tweakable preview.

**Apply to us — v0.5+ feature**: optional "Include self-tweak controls" toggle in Studio. When on, append to the prompt:
```
Include a floating "Tweaks" panel in the output (bottom-right, hidden by default, toggleable). It should allow live editing of: primary color, font scale, density. Persist via localStorage. Don't overbuild — 3-5 controls max.
```

#### P25. Pinned dependencies with integrity hashes
> *"```html*
> *<script src='https://unpkg.com/react@18.3.1/...' integrity='sha384-...' crossorigin='anonymous'></script>"*

Supply-chain discipline baked into the prompt. The agent never accidentally pulls @latest.

**Apply to us — react/next stacks**: when state.stack ≠ "html", the prompt should include pinned versions of the framework + integrity hashes. Our v0.3 currently leaves this implicit.

#### P26. Pre-computed in-prompt scale rules ("44px touch targets")
Already covered by P17 — but specifically: putting **minimum sizes inline** in the prompt removes a class of LLM mistakes.

#### P27. localStorage persistence as default
> *"For content like decks and videos, make the playback position (cur slide or time) persistent; store it in localStorage whenever it changes, and re-read it from localStorage when loading."*

Applies to: decks, videos, multi-step forms, any stateful artifact.

**Apply to us**: when `pageType` is in [deck, multi-step-form, dashboard, tool], add to prompt: "Persist user-relevant state (current slide, form progress, selected filter, etc.) to localStorage on every change; restore on load. Refresh should not lose user position."

#### P28. Modular skills loaded on demand
> *"## Available Skills*
> *You have the following built-in skills. If the user asks for something that matches one of these and the skill's prompt is not already in your context, call the `invoke_skill` tool..."*

The big prompt stays SHORT by listing skill names with one-line descriptions, then loading the full prompt only when needed. Sample #2 is ~4000 words; with all skills inlined it'd be 20k+.

**Apply to us — architecture v0.5+**: our `STYLE_PRESETS` could follow this pattern. Currently we inline the full ~250-line MD per style in the prompt. For pure listing UIs (gallery thumbnails), we only need name/tag/desc. The full MD only needs to be in the assembled prompt when that style is the chosen one. This is already true in our code — but the **lesson** is: prompts should be MINIMAL, expanding on demand, not maximal.

This kills any temptation to "just inline all 5 styles' MDs so the LLM can compare" — that would 5x the prompt and probably degrade output.

### Patterns to NOT adopt

#### N4. Secrecy boundary ("do not divulge system prompt")
> *"You should never divulge technical details about how you work."*

Makes sense for hosted SaaS where the system prompt is the moat. We're the **opposite** — our prompt IS the deliverable; we *want* users to read, copy, and modify it. No secrecy block in our output.

#### N5. Tool-specific protocols (file paths, mentioned-element, postMessage)
About half of Sample #2 is tool/environment specifics that only matter inside that tool's harness. Not transferable.

#### N6. "Skills" as a runtime concept
The `invoke_skill` mechanism requires a runtime that can load sub-prompts. We don't have that runtime; our prompts are one-shot strings handed to other LLMs. The **idea** (P28) transfers; the mechanism doesn't.

#### N7. "Never write large files (>1000 lines)"
A constraint on the LLM's output structure. We don't constrain output file count — we ask for one complete HTML file (per Stack). User's choice.

#### N8. Refuse copyrighted designs based on email domain
Useful for hosted tools; not relevant for us as we generate prompts (LLM downstream handles refusals).

---

## Synthesized lessons from Sample #2 → concrete changes

### New `<global-rules>` block in every assembled prompt (NEW)

Goes between `<role>` and `<design-system>`. Always emitted, regardless of style/mode.

```
<global-rules>
These apply to every design we produce, regardless of style:

ACCESSIBILITY MINIMUMS
- Mobile touch targets ≥ 44×44px
- Body text ≥ 16px (≥18px preferred)
- All interactive elements have visible focus states (not just :hover)
- Contrast: AA minimum (4.5:1 body, 3:1 large text)

CONTENT DISCIPLINE
- Every section must earn its place. No filler, no padding, no dummy stats.
- Less is more. Resist the urge to add explanatory tooltips, badges, or icons.
- If a section feels empty, that's a layout problem — solve with composition, not invented content.

AVOID AI SLOP TROPES (the chosen style may override specific items)
- No aggressive gradient backgrounds as the primary aesthetic.
- No emoji unless the brand explicitly uses them.
- No "container with rounded corners + left-border accent color" cards.
- No SVG-drawn imagery for icons or illustrations — use clearly-labelled placeholders.
- No defaulting to Inter / Roboto / Arial / system-ui if the style names a specific typeface.

VISUAL DEFAULTS WHEN UNCERTAIN
- When the user's brand has colors, use them.
- When extending the palette, use OKLCH formulas for harmony — never random hex.
- For missing assets (icons, images, charts): output a clearly-labelled placeholder, never a bad SVG fake.

WHEN BUILDING NON-WEB ARTIFACTS (deck, print, poster, animation)
- Avoid web design tropes (no hero/features/CTA reflexes). The artifact is what it is.
</global-rules>
```

The chosen style preset gets to **override** specific items (e.g. Editorial says "Fraunces is required, overriding the global avoid-Fraunces rule"). Our prompt assembler inspects style preset for `overrideGlobalRules: [...]` and edits the global-rules block accordingly.

### New `<operating-rules>` for Conversational mode

```
<operating-rules>
You are working as the user's design execution partner. Before any code:

1. CONTEXT (1-2 messages): If no codebase / UI kit / brand was attached, ask for one.
   "Mocking a full product from scratch is a last resort." Read what they give you.

2. CLARIFY (1 message, ~8-12 questions): Before deciding direction, ask:
   - Variations: how many, across which axes (visuals / interactions / copy)?
   - Novelty: by-the-book or surprising?
   - Priority: flow > copy > visuals?
   - Tweaks: what should be tunable in the output?
   - 4+ problem-specific questions

3. PLAN (1 message): Write a 5-7 bullet plan. Get nod before coding.

4. CODE (≥1 message): Build. Match existing visual vocabulary if context provided.
   Show file early with assumptions placeholder. Don't surface a 100% finished
   thing as your first reveal.

5. CLOSE: Summarize EXTREMELY BRIEFLY. Caveats and next steps only.
</operating-rules>
```

### New per-style field: `overrideGlobalRules`

```js
{
  // existing style preset fields
  overrideGlobalRules: [
    "Fraunces serif is required for this style, overriding the global 'avoid overused fonts' rule.",
    // … other style-specific overrides of global defaults
  ],
}
```

### New per-pageType field: `clarifyingQuestions`

For Conversational mode, each `pageType` in taxonomy gets 4-8 pre-written questions specific to that artifact type:

```js
SECTIONS_BY_TYPE.dashboard.clarifyingQuestions = [
  "What are the 3-5 KPIs that matter most to your user?",
  "Do users need to drill into details, or is the dashboard read-only?",
  "What time ranges should be available (24h / 7d / 30d / custom)?",
  "Will this be embedded in another app or stand alone?",
  // …
];
```

### Variation-mode prompt template (future v0.5)

When user requests N variations:

```
Give ${n} options. Order them basic → creative:
- Option 1: conventional, by-the-book, matches the design system perfectly
- Option ${n}: novel, surprising, takes one bold creative swing while still respecting the brand
- Options 2..${n-1}: intermediate gradient

Each option is a complete page. Output as N separate fenced code blocks with filenames.
```

### Tweakable-output toggle (future v0.5)

```js
// state.outputMode now includes: "tweakable"
if (state.outputMode === "tweakable") {
  prompt += `\n<include-tweaks>
Append a floating Tweaks panel to the output (bottom-right, toggle button, hidden by default).
Allow live editing of: primary color, body font size, layout density (sparse/balanced/dense).
Persist values to localStorage. Wrap defaults in /*EDITMODE-BEGIN*/{ ... }/*EDITMODE-END*/ markers.
Keep the panel small — 3-5 controls max, not a full theme editor.
</include-tweaks>`;
}
```

---

## Updated pattern library count

| Pattern | Source | Adopted | Notes |
|---|---|---|---|
| P1 "Feel" heuristic | #1 | ✅ | One sentence per style |
| P2 Bold Factor MUST list | #1 | ✅ | 4-6 named signatures |
| P3 Numbered differentiation | #1 | ⚠ partial | Mix with tables |
| P4 Token tables | #1 | ✅ | 3-column markdown |
| P5 Inline utility strings | #1 | ✅ | Stack-aware emission |
| P6 Anti-patterns with why | #1 | ✅ | Reformat existing |
| P7 Responsive table | #1 | ✅ | New field per style |
| P8 Pre-computed contrast | #1 | ✅ | Auto-compute at assembly |
| P9 Numbers everywhere | #1 | ✅ | Audit existing styles |
| P10 Code snippets inline | #1 | ⚠ partial | Make systematic |
| **P11 "X working for Y as manager"** | **#2** | **✅** | Conversational role |
| **P12 Numbered workflow in role** | **#2** | **✅** | Mode-specific |
| **P13 "EXTREMELY BRIEFLY" close** | **#2** | **✅** | Caps + caveats-only |
| **P14 Asking-questions methodology** | **#2** | **✅** | 8-12 q's checklist + per-type questions |
| **P15 AI slop tropes (meta anti-patterns)** | **#2** | **✅** | New `<global-rules>` block |
| **P16 Content discipline** | **#2** | **✅** | "One thousand no's" in global |
| **P17 Scale minimums** | **#2** | **✅** | 44px, 16px, 12pt, 24px |
| **P18 Avoid web tropes off-web** | **#2** | **✅** | Conditional on pageType |
| **P19 Placeholders > bad attempts** | **#2** | **✅** | Global rule |
| **P20 Match visual vocabulary** | **#2** | **✅** | Conversational op-rule |
| **P21 Brand → OKLCH → never random** | **#2** | **✅** | Global rule |
| **P22 CRITICAL: pattern w/ why-fail** | **#2** | **✅** | Rewrite enforcement |
| **P23 Basic→creative variations gradient** | **#2** | **⏳** | v0.5 variation feature |
| **P24 Tweakable artifacts protocol** | **#2** | **⏳** | v0.5 outputMode |
| **P25 Pinned deps + integrity hashes** | **#2** | **✅** | When stack ≠ "html" |
| **P26 Min sizes inline in prompt** | **#2** | **✅** | Part of P17 |
| **P27 localStorage persistence default** | **#2** | **✅** | Conditional on pageType |
| **P28 Modular prompts (min, expand on demand)** | **#2** | **✅ implicit** | Don't inline all 5 styles |
| N1 Conversational mode | #1 | ✅ as mode | |
| N2 Stack lock-in | #1 | ❌ | Stay stack-agnostic |
| N3 Brand-name anchors | #1 | ❌ | Real-world non-web refs |
| **N4 Secrecy boundary** | **#2** | **❌** | Our prompt IS the deliverable |
| **N5 Tool-specific protocols** | **#2** | **❌** | Not transferable |
| **N6 invoke_skill runtime** | **#2** | **❌ idea only** | No runtime; principle adopted (P28) |
| **N7 File size limits** | **#2** | **❌** | LLM decides output structure |
| **N8 Email-domain copyright refusal** | **#2** | **❌** | Downstream LLM handles |

**Patterns so far: 28 (+10 from this sample). Adopted: 24. Rejected: 8.**

---

## Sample #2 — Studio architecture implications (beyond prompt content)

These are not changes to the prompt template; they're lessons for the Studio product itself.

1. **Versioning by copy, not edit** — when user saves a "tuned" version, snapshot the prior. Enables undo, A/B comparison.
2. **Mid-task previews** (`show_to_user` vs `done`) — the Studio could "show progress" before final delivery. v0.5+ feature.
3. **Verifier subagent** — automated check of generated output before presenting to user. v1.0 feature: send the LLM-returned HTML through a quick "does it actually render?" check.
4. **`done` vs verify split** — UX: load fast for the user, run heavy checks in background.
5. **CLAUDE.md project memory** — Studio could let users save a "project profile" (default style, default brief, common avoid list) and merge it into every prompt. Sticky settings.

---

## Pattern library — overall growth curve

| Sample | New patterns | Cumulative | Adopt rate |
|---|---|---|---|
| #1 Linear/Modern (design system) | 10 + 3 reject | 13 | 77% |
| #2 Agent (operating prompt) | 18 + 5 reject | 36 | 75% |
| #3 (next…) | — | — | — |

Diminishing-returns prediction: by Sample #5–7 we should plateau around 60-80 patterns, after which new samples mostly **confirm** rather than add. That's the right time to stop studying and start building.

---

## References

- `docs/FLOW.md` — overall architecture
- `docs/PROMPT-GALLERY.md` — 100+ prompt content plan
- KB memory `9ecd1732...` — gallery-first architecture decision
- KB memory `82abe540...` — Sample #1 patterns
- KB memory (this update) — Sample #2 patterns

// Style preset: Minimalist Monochrome — editorial luxury, pure B&W, oversized serif.
// Ported from v0.3 with new structured fields per PROMPT-PATTERNS.md.

export const monochrome = {
  id: "monochrome",
  name: "Minimalist Monochrome",
  tag: "Editorial luxury",
  desc: "Pure black & white. Oversized serif. Sharp corners. Vogue-meets-Bauhaus.",

  // P1 — "X Feel" heuristic line
  feel: "Opening a Vogue Italia issue from the Sozzani era — not browsing a website.",

  // P2 — Bold Factor: 4-6 named MUST-have signatures
  boldFactor: [
    "Pure black + pure white only — no exceptions, no warmth, no off-whites",
    "Display serif headlines at 8xl (128px) minimum, oversized as graphic element",
    "Sharp 0px corners universally — even on inputs and avatars",
    "Inversion blocks for emphasis (whole-section black-on-white swap) — never colored accents",
    "Hairlines and rules, never shadows — depth via line-weight, not blur",
    "Mono labels in tracking-widest uppercase for all metadata",
  ],

  // P6 — anti-patterns with one-line why
  antiPatterns: [
    { name: "Color drift", dont: "use blue / gray / cream / any accent color", why: "Black IS the accent — adding any color breaks the constitutional rule" },
    { name: "Rounded corners", dont: "use border-radius > 0 on any element", why: "Sharp corners are the typographic discipline — exceptions read as accidents" },
    { name: "Shadow elevation", dont: "add box-shadow to create depth", why: "Depth comes from inversion, scale contrast, and line weight" },
    { name: "Sans-serif headlines", dont: "use Inter / Helvetica for display type", why: "Display serif at extreme scale IS the style — sans for headlines is a different style entirely" },
    { name: "Generic SaaS template", dont: "default to hero/features/testimonials in a centered column", why: "Asymmetric editorial composition is the point — center-stacked reads as boilerplate" },
  ],

  // P7 — responsive scaling table
  responsive: [
    { element: "Section padding", mobile: "96px", tablet: "128px", desktop: "160px" },
    { element: "Hero type", mobile: "text-5xl (56px)", tablet: "text-7xl (96px)", desktop: "text-9xl (160px)" },
    { element: "Section title", mobile: "text-3xl (32px)", tablet: "text-4xl (40px)", desktop: "text-5xl (56px)" },
    { element: "Body text", mobile: "16px", tablet: "18px", desktop: "18px" },
    { element: "Container max-width", mobile: "100%", tablet: "100%", desktop: "1280px" },
  ],

  // P10 — code snippets for the LLM to extend
  snippets: [
    // Horizontal-line body texture
    `background-image: repeating-linear-gradient(0deg, transparent, transparent 1px, #000 1px, #000 2px);
background-size: 100% 4px;
opacity: 0.018;`,
    // Inverted vertical-line texture (on black sections)
    `background-image: repeating-linear-gradient(90deg, transparent, transparent 1px, #fff 1px, #fff 2px);
background-size: 4px 100%;
opacity: 0.03;`,
    // Inset highlight for buttons / elevated surfaces
    `box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.1);`,
    // Italic mid-word swap pattern
    `<h1>V<em>O</em>GUE</h1> /* with em { font-weight: 400; font-style: italic; } */`,
  ],

  // Style overrides specific global-rules items (each string explains the override)
  overrideGlobalRules: [
    "Source Serif (or Playfair Display for display) is REQUIRED — overrides global 'avoid overused fonts' rule for this style.",
  ],

  // Live preview tile in the gallery (matches v0.3)
  tile: "tile-mono",
  tileHTML: `
    <div class="top"><span>EDITORIAL · №01</span><span class="sq"></span></div>
    <div class="word">V<em>O</em>GUE</div>
    <div class="rule"></div>
  `,

  // Authoritative content — emitted into <design-system> block.
  md: `# Design Style: Minimalist Monochrome

## 1. Philosophy

**Core principle**: Reduction to essence. Strip design down to pure black, pure white, and typography. No accent colors to hide behind, no gradients to soften edges, no shadows to create false depth. Every element must justify its existence on its own merit. Restraint as the ultimate expression of confidence.

**Vibe** (10 emotional keywords): Austere, Authoritative, Timeless, Editorial, Intellectual, Dramatic, Refined, Stark, Confident, Uncompromising.

**Real-world references**: Vogue Italia covers under Franca Sozzani, Bottega Veneta under Daniel Lee, Helmut Lang archives, Maison Margiela's tags-as-design, Hermès' Le Petit h catalogs, Massimo Vignelli's NYC Subway map, Phaidon art monographs, MoMA exhibition graphics, Karl Lagerfeld's editorial work.

**Origin & lineage**: Bauhaus typography + Swiss International Style + 1990s minimalist fashion (Margiela, Jil Sander) + contemporary editorial print design.

### What this design is NOT (anti-patterns)
- ❌ Colorful or playful — every chromatic temptation must be resisted
- ❌ Soft, rounded, or friendly — no curves except in letterforms themselves
- ❌ Gradient-based or with accent colors — black IS the accent, no exceptions
- ❌ Shadow-heavy or "elevated" — depth comes from inversion and scale, never drop shadows
- ❌ A tech startup template "made luxury" by removing colors — that's still tech, just bleached
- ❌ "Editorial Magazine" with the warmth stripped — Editorial uses warm cream and book serif body; Monochrome is colder, uses display serif as graphic element

## 2. DNA (core identifying characteristics)

1. **Pure black & white palette.** True #000000 and #FFFFFF for primary elements. Gray (#525252) reserved strictly for secondary text. No greens, blues, reds, warm whites, or cool whites under any circumstances.
2. **Serif typography as hero.** Classical high-contrast display serif (Playfair Display, Fraunces) used at oversized scale. Typography isn't decoration — it's the primary visual element of the page.
3. **Oversized type scale.** Hero headlines at 8xl (128px) minimum, ideally 9xl (160px) on desktop. Single words become graphic compositions.
4. **Line-based visual system.** Structure built from lines: hairlines, thick rules, vertical column dividers.
5. **Sharp geometric precision.** Zero border-radius everywhere — no exceptions.
6. **Dramatic negative space.** Generous margins (96-160px section padding) make black elements more impactful.
7. **Inversion for emphasis.** Replace accent colors with whole-section inversion: black bg + white text.

## 3. Tokens

| Token | Value | Usage |
|:------|:------|:------|
| --bg | #FFFFFF | Pure white canvas |
| --fg | #000000 | Body text, primary borders |
| --muted | #F5F5F5 | Off-white for subtle alt sections only |
| --muted-fg | #525252 | Dark gray — secondary text, captions |
| --border-light | #E5E5E5 | Subtle internal dividers only |
| --accent | #000000 | Black IS the accent (rule, not hex) |
| --accent-fg | #FFFFFF | White on black (inverted) |

Forbidden: any other color value. No tints, no warmth, no off-whites.

### Typography
- Display: "Playfair Display", "Fraunces", Georgia, serif
- Body: "Source Serif 4", "EB Garamond", Georgia, serif
- Mono: "JetBrains Mono", Menlo, monospace

**Type scale**: xs 12 / sm 14 / base 16 / lg 18 / xl 20 / 2xl 24 / 3xl 32 / 4xl 40 / 5xl 56 / 6xl 72 / 7xl 96 / 8xl 128 (REQUIRED somewhere) / 9xl 160 (desktop hero) / 10xl 208 (max one per page).

**Tracking**: display 5xl+ -0.04em · 3xl-4xl -0.025em · body normal · mono/eyebrows 0.15em uppercase.
**Leading**: display 0.92-1 · body 1.625 · captions 1.4.
**Italic**: emphasis WITHIN headlines (mid-word swap roman→italic). Never for normal body emphasis.

### Border radius
ALL VALUES: 0px. Constitutional rule.

### Borders
- hairline 1px solid #E5E5E5 (subtle dividers)
- thin 1px solid #000 (standard)
- medium 2px solid #000 (emphasis, active states)
- thick 4px solid #000 (section dividers — REQUIRED)
- ultra 8px solid #000 (page-level)

### Shadows
NONE. Zero box-shadow declarations.

### Textures (REQUIRED — flat design forbidden)
Minimum 2 globally:
- Horizontal lines on body (1px black, 4px repeat, 0.018 opacity)
- Noise grain via SVG feTurbulence (0.025 opacity)

## 4. Components

**Primary button**: bg #000 · text #FFF · padding 16/32 · mono uppercase 13px tracking-widest · 0 radius · hover INVERTS to white bg + black text + 2px black border · 100ms transition · focus 3px black outline + 3px offset.

**Card**: 1px black border · white bg · 0 shadow · 0 radius · padding 32 · hover INVERTS (bg+text+border, 100ms).

**Input**: 2px solid black bottom border only · italic placeholder #525252 · focus thickens to 4px · NO colored ring.

**Pull quote**: large italic display serif 5xl-6xl · oversized open-quote glyph 8xl+ hanging in margin · 1px hairlines above and below.

## 5. Layout

Container max-width 1280px. Section padding 96/128/160px. **4px solid #000 horizontal rule between EVERY major section — non-negotiable.** 12-column grid with REQUIRED asymmetric spans.

## 6. Motion

**Philosophy**: Minimal and instant. 100ms maximum. Stillness as the default state.

**Hover**: buttons invert (100ms) · cards invert (100ms) · blog images border 2px→4px instantly + scale 1.05 + grayscale removed (300ms exception).

**Focus** (REQUIRED): 3px solid #000 outline + 3px offset (focus-visible only).

**Forbidden**: bouncy springs, parallax, gradient animations, slow easing 200ms+.

## 7. Enforcement (NON-NEGOTIABLE)

1. **CRITICAL**: at least one word at 8xl (128px) minimum, ideally 9xl on desktop. **Why-failure**: without it the typography reads as a blog header, not editorial graphic design.
2. Thick (4-8px) horizontal rule + small bordered square (12-20px) somewhere in hero.
3. Inverted stats section if stats exist (black bg + white text + vertical-line texture).
4. Zero accent colors. No exceptions.
5. 4px solid #000 section rules between EVERY major section.
6. Border-radius: 0 universally.
7. 100ms max transitions (except documented blog-image hover 300ms).
8. **CRITICAL**: at least one headline functions as a graphic element. **Why-failure**: if every headline is "normal-sized text", the design becomes generic minimalism, not Monochrome.
9. Minimum 2 texture patterns globally. Flat design forbidden.
10. Boxed drop cap on first body section (3-line height, bordered).
11. Pricing tier elevation via position+inversion, never badges or gradient.
12. Cards fully invert on hover (100ms).
13. Mono labels in tracking-widest uppercase for all metadata.
14. Footer reads like editorial masthead — issue/date, multiple link columns, fine credits.

### What success looks like
- Opening a Vogue Italia issue from the Sozzani era
- Walking through a MoMA retrospective
- Reading an architectural monograph from Phaidon

### What failure looks like
- A generic SaaS landing page with colors muted
- Tech startup template that "needs more whitespace"
- Anything using Inter for headlines
- Any element with border-radius greater than 0`,
};

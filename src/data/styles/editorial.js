// Style preset: Editorial Magazine — layout-driven, cultured, warm cream + mixed typography.

export const editorial = {
  id: "editorial",
  name: "Editorial Magazine",
  tag: "Layout-driven · cultured",
  desc: "Asymmetric grid. Mixed serif + sans. Warm cream. Drop caps. Kinfolk-meets-NYT.",

  feel: "Reading a Kinfolk spread on a Sunday morning — not browsing a content marketing blog.",

  boldFactor: [
    "Warm cream background (#F4F1EA) — never pure white",
    "Two typefaces in dialogue: display serif + sans for UI/captions (or two contrasting serifs)",
    "Asymmetric 12-column grid — at least one section uses non-centered off-grid composition",
    "Drop caps + small caps + pull quotes as architectural elements",
    "Single muted accent color used <10% of UI surface",
    "1px hairline section dividers — never thick rules",
    "Generous photography with thin sans 12px italic captions + 1px hairline below caption",
  ],

  antiPatterns: [
    { name: "Pure white background", dont: "use #FFFFFF as the page canvas", why: "Warm cream IS the editorial signal — pure white reads as 'tech blog with serif font'" },
    { name: "Single typeface", dont: "use the same family for headlines and body", why: "The two-typeface dialogue IS the design — same-family is a different style entirely" },
    { name: "Center-stacked layout", dont: "use every-section-centered patterns", why: "Asymmetric grid is the editorial DNA — center-stacked reads as Squarespace template" },
    { name: "Sans-serif body text", dont: "use Inter / system-ui for body paragraphs", why: "Book serif body is the readerly quality — sans body breaks the print-feel" },
    { name: "Tech-modern UI patterns", dont: "use cards-with-shadows-and-icons or hero-with-product-screenshot", why: "These come from SaaS marketing — Editorial composes content, doesn't merchandise it" },
  ],

  responsive: [
    { element: "Section padding", mobile: "80px", tablet: "120px", desktop: "160px" },
    { element: "Side margins", mobile: "5%", tablet: "8%", desktop: "12%" },
    { element: "Hero type", mobile: "text-5xl (56px)", tablet: "text-6xl (72px)", desktop: "text-7xl (88px)" },
    { element: "Body text", mobile: "16px", tablet: "18px", desktop: "18px" },
    { element: "Container max-width", mobile: "100%", tablet: "100%", desktop: "1280px" },
  ],

  snippets: [
    // Drop cap
    `.drop-cap::first-letter { font-family: var(--font-display); font-size: 5em; line-height: 1; float: left; padding: 0.1em 0.1em 0 0; }`,
    // Pull quote with hanging open-quote
    `.pull-quote { position: relative; font-size: 36px; font-style: italic; padding-left: 1.5em; }
.pull-quote::before { content: '"'; position: absolute; left: 0; top: -0.1em; font-size: 4em; line-height: 1; }`,
    // Hairline section divider
    `<hr style="border: none; border-top: 1px solid #2B2926;">`,
    // Caption with hairline
    `.caption { font-family: var(--font-sans); font-size: 12px; font-style: italic; color: #6B6660; padding-bottom: 8px; border-bottom: 1px solid #2B2926; }`,
  ],

  overrideGlobalRules: [
    "Fraunces / Source Serif / Cormorant Garamond serifs are REQUIRED — overrides global 'avoid overused fonts' rule.",
    "Warm cream #F4F1EA background overrides default-to-pure-white visual default.",
  ],

  tile: "tile-editorial",
  tileHTML: `
    <div class="col-l">
      <div class="eyebrow">ISSUE №04</div>
      <div class="body">
        <span class="dropcap">K</span>
        <span class="text">infolk. A Slow<br/>life manifesto.</span>
      </div>
    </div>
    <div class="col-r">
      <div class="cap">SPRING<br/>VOL XII</div>
      <div>Words on slowness, intention, and the considered domestic life.</div>
    </div>
  `,

  md: `# Design Style: Editorial Magazine

## 1. Philosophy

**Core principle**: Layout is the message. Sophisticated grid hierarchy turns content into narrative. The page should feel composed, not assembled. Reading is a deliberate act.

**Vibe** (10 keywords): Considered, Literate, Cultured, Slow, Warm, Intelligent, Sensorial, Lived-in, Confident, Quiet.

**Real-world references**: Kinfolk magazine spreads, The Gentlewoman, Cereal Magazine, MUBI Notebook, The New York Times Magazine T section, Aesop's printed materials, Apartamento, Wallpaper* magazine, Toast catalog.

**Origin & lineage**: Mid-century editorial design (Esquire, Show, Eros under Herb Lubalin) + Scandinavian design publications + contemporary slow-media editorial revival (post-2010).

### What this design is NOT (anti-patterns)
- ❌ Stark / minimalist — Editorial is WARM (cream not white, serif body not display)
- ❌ Maximalist or chaotic — every element is composed
- ❌ Tech-modern — analog feel; should remind you of paper and ink
- ❌ Feed-style scrolling content — this is a composed PAGE, not a stream
- ❌ Monochrome — that's pure B&W; Editorial has accent color + warmth
- ❌ Center-stacked layouts — the grid asymmetry is the point

## 2. DNA

1. **Multi-column asymmetric grid.** 12-column base; content spans 4-8-12 unevenly.
2. **Mixed typography pairing.** Display serif + clean sans for body/labels OR two contrasting serifs.
3. **Warm cream background.** Off-white #F4F1EA, never pure white.
4. **Generous editorial photography.** Large images with thin sans captions.
5. **Drop caps, ligatures, small caps.** Typographic refinements from print tradition.
6. **One restrained accent color.** Rust, ochre, forest, navy — muted, used sparingly (<10% of UI surface).
7. **Pull quotes as architectural elements.** Display-size, breaking column flow, oversized open-quote.

## 3. Tokens

| Token | Value | Usage |
|:------|:------|:------|
| --bg | #F4F1EA | Warm cream (REQUIRED, never #FFFFFF) |
| --fg | #2B2926 | Warm black (NOT pure #000) |
| --muted-fg | #6B6660 | Warm gray for secondary |
| --paper | #E8E3D6 | Slightly darker for layered surfaces |
| --accent | #C1392B | Rust (or #8B7355 caramel, or #2F4F3A forest) |
| --accent-soft | #8B7355 | Caramel for less-loud accenting |

ONE accent per page. Rust OR forest OR navy OR ochre — not multiple.

### Typography
- Display: "Fraunces", "Cormorant Garamond", "PP Editorial New", serif
- Body: "Source Serif 4", "EB Garamond", Georgia, serif
- Sans: "Inter Tight", "Söhne", Helvetica (labels, captions, UI)
- Mono: "JetBrains Mono"

**Scale**: 14/16/18/22/28/36/48/64/88/120. Smaller jumps — relies on GRID not SCALE for drama.
**Special**: drop caps 4-5 line height, small caps for emphasis, hanging punctuation.

### Border radius
0px on layout elements. 2px max on small UI (badges).

### Borders
- hairline 0.5-1px solid #2B2926 (column dividers, caption rules)

### Shadows
NONE on UI. Very rare exception: photographs may have soft warm offset (4px 4px 16px rgba(43,41,38,0.08)).

### Textures
Optional very subtle paper grain (noise SVG at 0.04 opacity).

## 4. Components

**Primary button**: rust accent bg · cream text · padding 14/28 · sans uppercase 12px tracking-widest · 0 radius · hover darkens 10%.

**Text link**: body serif underlined with 1px thin rule · hover thickens to 2px.

**Pull quote**: large italic display serif 36-64px · oversized open-quote glyph (8xl+) hanging in margin · 1px rules above & below.

**Image with caption**: image then thin sans 12px italic caption + 1px hairline rule below caption.

**Drop cap**: first paragraph starts with 4-5 line tall display serif initial, optionally in accent color.

## 5. Layout

Container max-width 1280px. Section padding 120/160px. **12-column grid with REQUIRED asymmetric spans** — e.g. headline cols 2-9, body cols 4-9, image cols 1-7.

## 6. Motion

**Philosophy**: Page-turning. Slow, considered. 400-600ms.

**Hover**: links thicken underline (200ms) · images soften with warm overlay (300ms) · buttons darken accent (200ms).

**Scroll**: subtle reveal animations welcome — fade up 24px, 600ms ease-out, stagger 80ms.

**Focus**: 1.5px solid accent outline + 4px offset.

**Forbidden**: bouncy springs, snappy fast interactions, parallax scenes.

## 7. Enforcement (NON-NEGOTIABLE)

1. **CRITICAL**: warm cream bg #F4F1EA — never pure #FFFFFF. **Why-failure**: pure white IS the marker of tech-modern; the cream IS the editorial signal.
2. **CRITICAL**: two typefaces minimum (headlines + body must be different families). **Why-failure**: same-family typography reads as a single-voice design, not editorial dialogue.
3. Asymmetric grid — at least one section uses non-centered composition.
4. Drop cap on first body section (4-5 line height, display serif).
5. Pull quote present (display serif italic with oversized open-quote glyph).
6. Captions with hairlines (thin sans + 1px rule below).
7. Single accent color, <10% of UI surface area.
8. Small caps and tracking-widest for at least one element class.
9. 1px hairline section dividers, never thick rules.
10. Footer as masthead — issue number, date, credits, ToC, like print magazine.
11. Photography is generous and large. No tiny thumbnails.
12. Body text in book serif (not sans, not display serif). 18px preferred.
13. Hanging punctuation on display quotes.
14. Margin notes / sidebars for additional context, not separate sections.

### What success looks like
- A Kinfolk magazine spread on slow living
- An Aesop product detail page
- A New York Times Style Magazine cover story
- A Wallpaper* travel guide

### What failure looks like
- A WordPress "magazine theme" with widgets
- A SaaS blog with a slightly fancier font
- Anything center-stacked
- Pure white background "for cleanliness"
- All-serif (no contrast) OR all-sans (no warmth) typography`,
};

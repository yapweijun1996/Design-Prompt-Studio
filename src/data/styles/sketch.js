import { asFullPreset } from "./compact.js";

export const sketch = asFullPreset({
  id: "sketch",
  name: "Hand-drawn Sketch",
  tag: "Illustrative · imperfect · warm",
  desc: "Hand-lettered headlines, sketchy borders, ink-and-paper warmth. Approachable and human.",

  feel: "Reading a Quentin Blake illustrated book — not a 'playful brand' SaaS slapped together.",

  references: "Oliver Jeffers picture books, Quentin Blake illustrations, Maira Kalman New Yorker covers, Aesop Sunday papers, Field Notes notebooks, Apartment Therapy hand-drawn editorials",

  boldFactor: [
    "Hand-drawn SVG borders / underlines (wobbly stroke, not perfect)",
    "Headline in hand-lettered display (Caveat, Kalam, Indie Flower)",
    "Warm paper background (#FAF6EE) — never pure white",
    "Sketchy arrows + asterisks as ornaments, drawn not symbol-typed",
    "Slight rotation on cards (-1° to +1°) — feels placed, not snapped",
    "Earthy accents: ochre, terracotta, forest — never neon",
    "Visible paper texture (subtle SVG noise)",
  ],

  tokens: {
    "bg":          { value: "#FAF6EE", usage: "Warm paper" },
    "fg":          { value: "#2B2820", usage: "Ink (NOT pure #000)" },
    "muted-fg":    { value: "#6E6960", usage: "Pencil grey" },
    "accent-ochre":{ value: "#C97B30", usage: "Primary warm accent" },
    "accent-forest":{ value: "#3E5C3A", usage: "Cool secondary" },
    "accent-rose": { value: "#C97B7B", usage: "Soft tertiary" },
  },

  typography: {
    display: '"Caveat", "Kalam", "Indie Flower", cursive',
    body:    '"Source Serif 4", "Lyon Text", Georgia, serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "14/16/18/24/32/48/72/96",
    weight:  "display 600-700 · body 400",
    tracking: "display normal · body normal",
  },

  antiPatterns: [
    { name: "Perfect strokes",  dont: "use straight 1px borders or geometric shapes", why: "Imperfection IS the language — clean geometry kills the human feel" },
    { name: "Pure white bg",    dont: "use #FFFFFF",                                  why: "Warm paper signals analog; pure white reads as digital" },
    { name: "Sans-serif body",  dont: "use Inter / Helvetica for body",              why: "Readerly serif body continues the book feel; sans body breaks the metaphor" },
    { name: "Neon accents",     dont: "use saturated bright colors",                 why: "Earthy palette IS the warmth; neon belongs to Y2K / Cyberpunk" },
    { name: "Strict grid",      dont: "snap everything to a 12-col grid",            why: "Slight irregularity is the charm" },
  ],

  responsive: [
    { element: "Section padding",     mobile: "56px", tablet: "80px", desktop: "112px" },
    { element: "Hero type",           mobile: "56px", tablet: "80px", desktop: "120px" },
    { element: "Border roughness",    mobile: "2px wobbly", tablet: "3px", desktop: "4px" },
    { element: "Body line-height",    mobile: "1.7", tablet: "1.75", desktop: "1.8" },
  ],

  snippets: [
    `/* Hand-drawn underline via SVG */
.underline {
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 12"><path d="M2,8 Q50,2 100,7 T198,6" fill="none" stroke="%23C97B30" stroke-width="3" stroke-linecap="round"/></svg>');
  background-repeat: no-repeat;
  background-position: 0 100%;
  background-size: 100% 0.4em;
  padding-bottom: 0.2em;
}`,
    `/* Sketchy border via filter:url() — feTurbulence wobble */
.sketchy {
  border: 3px solid #2B2820;
  filter: url(#wobble);
}
/* Inline SVG filter */
<svg width="0" height="0"><filter id="wobble"><feTurbulence baseFrequency="0.02" numOctaves="2"/><feDisplacementMap in="SourceGraphic" scale="3"/></filter></svg>`,
    `/* Card with slight rotation */
.card:nth-child(odd) { transform: rotate(-1deg); }
.card:nth-child(even) { transform: rotate(0.8deg); }`,
  ],

  successLooksLike: [
    "An Oliver Jeffers picture-book spread",
    "An Aesop in-store letter",
    "A Field Notes journal page",
    "A Quentin Blake illustrated Roald Dahl cover",
  ],

  failureLooksLike: [
    "A SaaS 'playful brand' with one Caveat font headline",
    "Pure white background",
    "Geometric perfect shapes",
    "Sans-serif body text",
    "Neon accent colors",
  ],

  overrideGlobalRules: [
    "Hand-drawn SVG decorations (arrows, asterisks, underlines, borders) are REQUIRED — overrides global 'no SVG-drawn imagery' rule (these are typographic ornaments, the style's whole point).",
    "Cursive display fonts (Caveat / Kalam) are REQUIRED — overrides global 'avoid overused fonts' rule.",
  ],

  tile: "tile-sketch",
  tileHTML: `
    <div class="paper">
      <div class="word">hello!</div>
      <div class="underline"></div>
      <div class="arrow">↳ a story →</div>
    </div>
  `,
});

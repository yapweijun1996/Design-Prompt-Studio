import { asFullPreset } from "./compact.js";

export const bauhaus = asFullPreset({
  id: "bauhaus",
  name: "Bauhaus Primary",
  tag: "Geometric · primary · modernist",
  desc: "Red + yellow + blue primaries. Pure geometric shapes (circle, triangle, square). Modular composition.",

  feel: "Walking through the 1923 Bauhaus exhibition catalog — not a 2010s 'flat-design' SaaS pretending modernist.",

  references: "Herbert Bayer typography, László Moholy-Nagy compositions, Bauhaus exhibition posters 1923, Wassily Kandinsky's Composition VIII, Mondrian's later compositions, Josef Albers' Homage to the Square",

  boldFactor: [
    "Pure primary colors: red #DC2626, yellow #FCD34D, blue #2563EB — never tints",
    "Three primitive shapes (circle, triangle, square) as the entire visual vocabulary",
    "Geometric sans (Futura, Avenir, Geist) — never humanist or display serif",
    "Modular grid (4-6 columns) — every element snapped to it",
    "Lowercase headlines (Herbert Bayer's universal lowercase alphabet)",
    "Composition feels assembled — visible 'placement' of shapes on a canvas",
    "Strict 1:1, 1:2, 1:3 ratios for shape sizing — never arbitrary",
  ],

  tokens: {
    "bg":          { value: "#F5F5F0", usage: "Bone canvas" },
    "fg":          { value: "#0F0F0F", usage: "Near-black ink" },
    "red":         { value: "#DC2626", usage: "Primary red" },
    "yellow":      { value: "#FCD34D", usage: "Primary yellow" },
    "blue":        { value: "#2563EB", usage: "Primary blue" },
  },

  typography: {
    display: '"Futura PT", "Avenir Next", "Geist", system-ui',
    body:    '"Futura PT", "Inter", system-ui',
    mono:    '"JetBrains Mono", monospace',
    scale:   "12/16/24/36/56/88/120",
    weight:  "display 500-700 · body 400",
    tracking: "display tight · body normal · lowercase for headlines",
  },

  antiPatterns: [
    { name: "Display serif",      dont: "use Playfair / Fraunces",         why: "Bauhaus is sans-only — serifs read as editorial, not Bauhaus" },
    { name: "Pastel / muted",     dont: "use tints of red/yellow/blue",    why: "Pure primaries at full saturation — muting breaks the modernist clarity" },
    { name: "Curves beyond circle", dont: "use squiggle / arbitrary curve", why: "ONLY circle / triangle / square — additional shapes dilute the system" },
    { name: "Capitalized headlines", dont: "USE ALL CAPS FOR DISPLAY",      why: "Herbert Bayer's lowercase alphabet is the typographic discipline" },
    { name: "Off-grid placement", dont: "place elements freely without snap", why: "Modular grid IS the visual order; off-grid reads as anti-Bauhaus" },
  ],

  responsive: [
    { element: "Section padding", mobile: "48px",  tablet: "72px",  desktop: "96px" },
    { element: "Grid columns",    mobile: "4",     tablet: "6",     desktop: "6" },
    { element: "Hero type",       mobile: "44px",  tablet: "72px",  desktop: "120px" },
    { element: "Shape size base", mobile: "48px",  tablet: "64px",  desktop: "96px" },
  ],

  snippets: [
    `/* Modular shape grid */
.bauhaus-canvas {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 96px);
  gap: 0;
  background: #F5F5F0;
}
.shape-circle { background: #DC2626; border-radius: 50%; grid-column: span 2; grid-row: span 2; }
.shape-square { background: #FCD34D; grid-column: span 1; grid-row: span 1; }
.shape-triangle {
  width: 0; height: 0;
  border-left: 48px solid transparent;
  border-right: 48px solid transparent;
  border-bottom: 96px solid #2563EB;
  grid-column: span 1; grid-row: span 2;
}`,
    `/* Lowercase headline */
.headline {
  font-family: "Futura PT", system-ui;
  font-weight: 700;
  font-size: 88px;
  line-height: 0.9;
  letter-spacing: -0.02em;
  text-transform: lowercase;
  color: #0F0F0F;
}`,
  ],

  successLooksLike: [
    "A Bauhaus 1923 exhibition poster",
    "Herbert Bayer's universal alphabet specimen",
    "A Moholy-Nagy photogram",
    "Josef Albers' color study",
  ],

  failureLooksLike: [
    "Memphis 80s with primary colors",
    "Display serif headlines",
    "ALL CAPS display type",
    "Off-grid free composition",
    "Pastel versions of the primaries",
  ],

  overrideGlobalRules: [
    "Multi-color primary palette (red + yellow + blue) is the language — overrides global 'avoid aggressive gradient' caution.",
  ],

  tile: "tile-bauhaus",
  tileHTML: `
    <div class="circle"></div>
    <div class="square"></div>
    <div class="tri"></div>
    <div class="word">bauhaus</div>
  `,
});

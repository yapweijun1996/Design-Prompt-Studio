// Style preset: Swiss / International — strict 12-col grid, Helvetica, functional, formal.

import { asFullPreset } from "./compact.js";

export const swiss = asFullPreset({
  id: "swiss",
  name: "Swiss / Grid",
  tag: "Modular · functional · formal",
  desc: "Strict 12-column grid. Helvetica or Neue Haas Unica. Black + red + white. Total typographic discipline.",

  feel: "A 1960s Swiss tourism poster by Josef Müller-Brockmann — not a tech startup pretending minimalist.",

  references: "Josef Müller-Brockmann posters, Massimo Vignelli's NYC subway map, IBM's 1970s identity, Swissted concert posters, Helmut Schmid Baseline magazine, MIT Press Design",

  boldFactor: [
    "Strict 12-column grid visible in baseline layer — every element snapped",
    "Helvetica (or Neue Haas Unica) as the ONLY typeface — no display alternative",
    "Black + white + one accent (red #E30613, or yellow #FFD500)",
    "Type at exactly 1 / 1.5 / 2.25 / 3.375x ratio (typographic scale)",
    "Left-aligned everything — no justified, no centered display",
    "Asymmetric balance through scale, never symmetry",
    "Numbers as design elements (page numbers, dates, counters in massive type)",
  ],

  tokens: {
    "bg":          { value: "#FFFFFF", usage: "Page canvas" },
    "fg":          { value: "#000000", usage: "Primary text and rules" },
    "muted-fg":    { value: "#666666", usage: "Secondary text" },
    "accent":      { value: "#E30613", usage: "Single accent — red OR yellow, never both" },
    "grid-line":   { value: "rgba(0,0,0,0.05)", usage: "Visible baseline grid" },
  },

  typography: {
    display: '"Neue Haas Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
    body:    '"Neue Haas Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
    mono:    '"Helvetica Mono", "JetBrains Mono", monospace',
    scale:   "8/12/18/27/40/60/90 (1.5x ratio strict)",
    weight:  "55 Roman body · 75 Bold headlines · NEVER mix more than 2 weights",
    tracking: "display tight (-0.02em) · body normal · labels tracking-wide (0.05em) uppercase",
  },

  antiPatterns: [
    { name: "Display serif", dont: "use Playfair / Fraunces / any serif",     why: "Swiss is sans-only — serifs read as editorial, not Swiss" },
    { name: "Centered headlines", dont: "center large display type",          why: "Asymmetric left-aligned grid IS the discipline — centered breaks the system" },
    { name: "More than 1 accent", dont: "use both red AND yellow",            why: "ONE accent — choose; mixing dilutes the discipline" },
    { name: "Gradient fills", dont: "use any gradient",                       why: "Solid colors only — Swiss is about clarity, not depth illusion" },
    { name: "Rounded corners", dont: "use border-radius > 0",                 why: "Sharp grid means sharp corners — rounding softens the system" },
  ],

  responsive: [
    { element: "Section padding", mobile: "48px",      tablet: "72px",     desktop: "96px" },
    { element: "Grid columns",    mobile: "6 cols",    tablet: "12 cols",  desktop: "12 cols" },
    { element: "Hero type",       mobile: "60px",      tablet: "90px",     desktop: "120px" },
    { element: "Body text",       mobile: "18px",      tablet: "18px",     desktop: "18px" },
  ],

  snippets: [
    `/* Visible baseline grid */
body {
  background-image: linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px);
  background-size: calc(100% / 12) 100%;
}`,
    `/* Strict modular type scale */
:root {
  --t-1: 12px; --t-2: 18px; --t-3: 27px; --t-4: 40px;
  --t-5: 60px; --t-6: 90px; --t-7: 135px;
}`,
    `/* Number as design element */
.page-num {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 240px;
  line-height: 0.85;
  letter-spacing: -0.04em;
}`,
  ],

  successLooksLike: [
    "A Müller-Brockmann concert poster",
    "Vignelli's NYC subway map at full scale",
    "IBM's 1972 annual report",
    "A Bauhaus textbook spread",
  ],

  failureLooksLike: [
    "Helvetica with rounded corners",
    "Centered display type",
    "Two accent colors fighting",
    "Soft gradients on cards",
    "Any element off-grid",
  ],

  overrideGlobalRules: [
    "Helvetica / Inter / Arial are REQUIRED — overrides global 'avoid Inter/Roboto/Arial' rule (here they are the deliberate constitutional choice).",
  ],

  tile: "tile-swiss",
  tileHTML: `
    <div class="num">04</div>
    <div class="text">
      <div class="big">Order.</div>
      <div class="small">A grid for everything.</div>
    </div>
    <div class="bar"></div>
  `,
});

import { asFullPreset } from "./compact.js";

export const swisslate = asFullPreset({
  id: "swisslate",
  name: "Swiss Late-Period",
  tag: "Grid · Akzidenz · poster",
  desc: "Late-Müller-Brockmann / Vignelli grid posters. Akzidenz Grotesk. Monochromatic + single accent. NYC subway / IBM 1970s register.",

  feel: "Holding a 1973 Müller-Brockmann poster up against the light — every element earned its position on a strict mathematical grid — not a designer cosplaying as Swiss with one Helvetica title.",

  references: "Josef Müller-Brockmann poster archive, Massimo Vignelli's NYC subway diagram (1972), IBM 1970s identity, Helvetica documentary, Wim Crouwel, Karl Gerstner, Total Design (Amsterdam)",

  boldFactor: [
    "Strict mathematical grid (6/8/12 cols) — every element snapped, no exceptions",
    "Akzidenz Grotesk / Helvetica Now in 400-700 — no other font families",
    "Monochromatic with ONE accent (red, yellow, or blue) — never multi-color",
    "Poster-scale display type (96-200px) flush-left, never centered",
    "Geometric shapes (circle, rectangle, perpendicular lines) only",
    "Asymmetric grid composition: white space + text + accent shape",
    "Visible baseline grid as a typographic discipline (not always shown, always honored)",
  ],

  tokens: {
    "bg":      { value: "#F2F0EB", usage: "Off-white poster paper" },
    "fg":      { value: "#0A0A0A", usage: "Ink black" },
    "accent":  { value: "#E63946", usage: "One bold red (or yellow / blue)" },
    "rule":    { value: "#0A0A0A", usage: "Sharp black rule" },
  },

  typography: {
    display: '"Akzidenz Grotesk", "Helvetica Now", "Inter", system-ui',
    body:    '"Akzidenz Grotesk", "Helvetica Now", "Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "10/12/14/16/24/40/96/200",
    weight:  "display 400-700 · body 400-500 · numbers tabular",
    tracking: "display very tight (-0.03em) · body normal",
  },

  antiPatterns: [
    { name: "Multiple type families", dont: "use any font besides Akzidenz/Helvetica", why: "Single grotesque family IS the entire typographic discipline" },
    { name: "Multi-color palette",  dont: "use 3+ accent colors", why: "Monochromatic + ONE accent — multi-color breaks the modernist rigor" },
    { name: "Off-grid placement",  dont: "place elements freely", why: "Strict mathematical grid IS the design — off-grid = anti-Swiss" },
    { name: "Centered composition", dont: "center-align display type", why: "Flush-left is the Swiss register; centered reads as wedding-invitation" },
    { name: "Decoration",          dont: "add ornament, illustration, gradient", why: "Pure typography + geometry; ornament breaks the rigor" },
  ],

  responsive: [
    { element: "Display type",   mobile: "44px",  tablet: "96px",  desktop: "200px" },
    { element: "Grid cols",      mobile: "6",     tablet: "8",     desktop: "12" },
    { element: "Section padding", mobile: "24px", tablet: "64px",  desktop: "96px" },
  ],

  snippets: [
    `/* Strict 12-col grid */
.swiss-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; padding: 96px 48px; background: #F2F0EB; }
.swiss-h1 { grid-column: 1 / span 8; font-family: "Akzidenz Grotesk", "Helvetica Now", sans-serif; font-weight: 700; font-size: 200px; line-height: 0.9; letter-spacing: -0.04em; color: #0A0A0A; margin: 0; }
.swiss-meta { grid-column: 1 / span 3; font-family: "Akzidenz Grotesk", sans-serif; font-weight: 400; font-size: 14px; line-height: 1.5; color: #0A0A0A; }`,
    `/* Accent geometric shape */
.swiss-dot { grid-column: 10 / span 2; aspect-ratio: 1; background: #E63946; border-radius: 50%; align-self: start; }
.swiss-rule { height: 4px; background: #0A0A0A; width: 100%; }`,
  ],

  successLooksLike: [
    "A 1973 Müller-Brockmann concert poster",
    "Vignelli's 1972 NYC Subway diagram",
    "IBM 1976 annual report",
  ],

  failureLooksLike: [
    "Modern site with one Helvetica title bolted on",
    "Multi-color rainbow palette claiming to be Swiss",
    "Centered composition with display serif",
  ],

  tile: "tile-swisslate",
  tileHTML: `
    <div class="word">DESIGN<br/>1972</div>
    <div class="dot"></div>
    <div class="meta">Müller-Brockmann · Zurich · 14.10–22.11</div>
  `,
});

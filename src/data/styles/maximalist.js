import { asFullPreset } from "./compact.js";

export const maximalist = asFullPreset({
  id: "maximalist",
  name: "Maximalist Ornate",
  tag: "Dense · ornate · busy",
  desc: "Dense, ornate, busy. Pattern + texture + multiple type families. Reform Theatre / Wes Anderson / Iris Apfel register.",

  feel: "Stepping into a richly-decorated room that's NOT overdesigned — every surface considered, every layer earned — not a clean site with one ornament bolted on.",

  references: "The Reform Theatre, Wes Anderson production design, Iris Apfel apartments, Gucci 2018-2021 (Michele era), Anthropologie home, House of Hackney, Liberty London, Christian Lacroix Maisons",

  boldFactor: [
    "Rich pattern backgrounds: damask, brocade, paisley, William-Morris, art-deco geometry",
    "Multiple type families layered: display serif + ornamental script + small caps + condensed sans",
    "Jewel-tone palette: emerald, oxblood, sapphire, mustard, plum — saturated and warm",
    "Decorative borders, dingbats, ornaments framing content blocks",
    "Photographic still lifes: arranged objects, books stacked, flowers, fabric draped",
    "Generous content density: nothing minimalist, everything earned its place",
    "Gold-foil / metallic accents on key elements (logo, dividers, headings)",
  ],

  tokens: {
    "bg":      { value: "#F8EFE0", usage: "Champagne cream" },
    "bg-alt":  { value: "#2D5A4F", usage: "Deep emerald section alt" },
    "fg":      { value: "#1F1A14", usage: "Walnut ink body" },
    "muted":   { value: "#6E5E4D", usage: "Antique brown caption" },
    "emerald": { value: "#2D5A4F", usage: "Emerald accent" },
    "oxblood": { value: "#7A2E2A", usage: "Oxblood accent" },
    "mustard": { value: "#C9942F", usage: "Mustard accent" },
    "gold":    { value: "#B89D63", usage: "Gold-foil ornament" },
    "rule":    { value: "#B89D63", usage: "Gold ornament rule" },
  },

  typography: {
    display: '"Playfair Display", "Bodoni Moda", "DM Serif Display", "Fraunces", serif',
    body:    '"Source Serif 4", "Lora", "EB Garamond", Georgia, serif',
    script:  '"Allura", "Tangerine", "Pinyon Script", cursive',
    smallcaps: '"Trajan Pro", "Optima", serif',
    mono:    '"Courier Prime", monospace',
    scale:   "12/14/16/18/22/32/56/96",
    weight:  "display 400-700 (italic for ornament) · body 400 · script 400",
    tracking: "display open (0.02em) · small-caps wide (0.12em) · script natural",
  },

  antiPatterns: [
    { name: "Minimalist whitespace", dont: "use 96px section padding with nothing in it", why: "Maximalism is intentional density; whitespace voids destroy the layered effect" },
    { name: "Single type family",  dont: "use only one font", why: "Multiple layered families (display + script + small-caps) IS the typographic vocabulary" },
    { name: "Flat palette",        dont: "use a 2-color scheme", why: "Jewel-tones in layered combinations — flat = minimalist, not maximalist" },
    { name: "Plain background",    dont: "use #FFFFFF flat backgrounds", why: "Pattern, texture, or photographic still-life backdrops are required" },
    { name: "Modern grid",         dont: "use 12-col Bootstrap grid", why: "Ornamental layout with decorative borders and asymmetric panels" },
  ],

  responsive: [
    { element: "Section padding", mobile: "32px",  tablet: "48px",  desktop: "64px" },
    { element: "Display serif",   mobile: "44px",  tablet: "72px",  desktop: "96px" },
    { element: "Ornament size",   mobile: "32px",  tablet: "48px",  desktop: "64px" },
  ],

  snippets: [
    `/* Damask pattern backdrop */
.max-bg {
  background-color: #F8EFE0;
  background-image:
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><g fill="none" stroke="%23B89D63" stroke-width="0.6" opacity="0.22"><path d="M40,10 C20,20 20,40 40,50 C60,40 60,20 40,10 Z M40,30 C30,35 30,45 40,50 M40,30 C50,35 50,45 40,50"/></g></svg>');
  background-size: 80px 80px;
}`,
    `/* Layered headline with script and small-caps */
.max-headline {
  font-family: "Playfair Display", serif;
  font-weight: 400;
  font-size: 96px;
  line-height: 1;
  color: #1F1A14;
  letter-spacing: -0.005em;
}
.max-headline em {
  font-family: "Allura", "Tangerine", cursive;
  font-style: normal;
  color: #7A2E2A;
  font-size: 1.1em;
  margin-right: 0.1em;
}
.max-eyebrow {
  font-family: "Trajan Pro", "Optima", serif;
  font-size: 13px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #B89D63;
}`,
    `/* Decorative dingbat border */
.max-divider {
  text-align: center;
  margin: 48px 0;
  color: #B89D63;
  font-size: 24px;
  letter-spacing: 0.5em;
}
.max-divider::before, .max-divider::after {
  content: ""; display: inline-block; width: 80px; height: 1px;
  background: linear-gradient(90deg, transparent, #B89D63, transparent);
  vertical-align: middle; margin: 0 16px;
}`,
  ],

  successLooksLike: [
    "The Reform Theatre's website (deep emerald + pattern)",
    "Wes Anderson's Asteroid City press kit",
    "Christian Lacroix Maisons fabric catalog",
  ],

  failureLooksLike: [
    "Clean modern landing with one decorative ornament bolted on",
    "Pure white background + single font + flat palette",
    "Bootstrap 12-col grid for an ornamental editorial",
  ],

  tile: "tile-maximalist",
  tileHTML: `
    <div class="brow">MAISON · EST 1987</div>
    <div class="head"><em>L'</em>Hôtel</div>
    <div class="div">❧ &nbsp; ✦ &nbsp; ❧</div>
    <div class="sub">A house of considered things.</div>
  `,
});

import { asFullPreset } from "./compact.js";

export const industrial = asFullPreset({
  id: "industrial",
  name: "Industrial Concrete",
  tag: "Raw · functional · warning-yellow",
  desc: "Exposed concrete textures, warning-tape yellow, monospace, mil-spec aesthetic. Heavy machinery feel.",

  feel: "An exposed-concrete factory loft converted to a workshop — not a faux-rugged outdoor brand.",

  references: "Barbican Centre London, Tadao Ando concrete pieces, Patagonia's Worn Wear program (raw side), Carhartt work catalogs, Anchor Brewing labels, factory safety signage, Bauhaus Dessau exterior",

  boldFactor: [
    "Concrete-grey body (#888) on warm bone (#EBE7E0)",
    "Warning-tape yellow (#FFCC00) as safety/CTA accent",
    "Monospace body — IBM Plex Mono, JetBrains Mono",
    "Bold mil-spec labels (HAZARD / EXIT / 04-A.7) in mono uppercase",
    "Heavy 3-4px borders on key panels (industrial brackets)",
    "Diagonal hazard stripes as accent (45° yellow+black)",
    "Numbers + codes everywhere (serial numbers, dates, lot codes)",
  ],

  tokens: {
    "bg":          { value: "#EBE7E0", usage: "Bone / concrete light" },
    "fg":          { value: "#1A1A1A", usage: "Heavy ink" },
    "concrete":    { value: "#888888", usage: "Mid-grey panels" },
    "warning":     { value: "#FFCC00", usage: "Safety yellow CTA" },
    "rust":        { value: "#8B3A0E", usage: "Weathered metal accent" },
    "stripe-dark": { value: "#1A1A1A", usage: "Hazard stripe" },
  },

  typography: {
    display: '"IBM Plex Mono", "Space Mono", "Courier New", monospace',
    body:    '"IBM Plex Mono", "JetBrains Mono", monospace',
    mono:    '"IBM Plex Mono", monospace',
    scale:   "11/13/16/20/28/40/64/96",
    weight:  "display 700 · body 400",
    tracking: "display 0.05em uppercase · body normal · labels 0.15em uppercase",
  },

  antiPatterns: [
    { name: "Soft rounding",    dont: "use border-radius > 4px",         why: "Industrial = hard edges; rounding softens the heaviness" },
    { name: "Pastel accents",   dont: "use muted version of yellow",     why: "Safety yellow is FULL saturation — muting kills the warning signal" },
    { name: "Proportional fonts", dont: "use Inter / Helvetica",         why: "Monospace IS the industrial typographic signal" },
    { name: "Gradient fills",   dont: "use any gradient",                why: "Flat material colors only — concrete is matte, not glossy" },
    { name: "Clean / sterile",  dont: "leave everything pristine",       why: "Slight weathering (rust accent, scuff textures) reads honest" },
  ],

  responsive: [
    { element: "Section padding", mobile: "48px",  tablet: "72px",  desktop: "96px" },
    { element: "Border weight",   mobile: "2px",   tablet: "3px",   desktop: "4px" },
    { element: "Hero type",       mobile: "44px",  tablet: "64px",  desktop: "96px" },
    { element: "Label tracking",  mobile: "0.1em", tablet: "0.15em", desktop: "0.2em" },
  ],

  snippets: [
    `/* Hazard stripe pattern */
.hazard {
  background: repeating-linear-gradient(
    -45deg,
    #FFCC00 0,
    #FFCC00 20px,
    #1A1A1A 20px,
    #1A1A1A 40px);
  height: 24px;
}`,
    `/* Mil-spec label */
.spec-label {
  font-family: "IBM Plex Mono", monospace;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #1A1A1A;
  padding: 4px 8px;
  background: #FFCC00;
  display: inline-block;
}
/* HTML: <span class="spec-label">LOT 04-A.7 / 2026.05</span> */`,
    `/* Concrete texture (subtle noise) */
.concrete-panel {
  background-color: #888888;
  background-image:
    radial-gradient(circle at 25% 30%, rgba(255,255,255,0.05) 2px, transparent 3px),
    radial-gradient(circle at 70% 60%, rgba(0,0,0,0.05) 2px, transparent 3px);
  background-size: 60px 60px;
  border: 3px solid #1A1A1A;
}`,
  ],

  successLooksLike: [
    "The Barbican Centre's wayfinding",
    "A Carhartt heritage catalog page",
    "Anchor Brewing label artwork",
    "A Patagonia Worn Wear repair record",
  ],

  failureLooksLike: [
    "An outdoor SaaS pretending rugged",
    "Soft rounded corners",
    "Sans-serif body (Inter / Helvetica)",
    "Pristine clean composition",
    "Pastel safety yellow",
  ],

  overrideGlobalRules: [
    "Monospace body fonts (IBM Plex Mono) are REQUIRED — overrides global 'avoid overused fonts' rule.",
  ],

  tile: "tile-industrial",
  tileHTML: `
    <div class="label">LOT 04-A.7</div>
    <div class="word">RAW.</div>
    <div class="stripe"></div>
  `,
});

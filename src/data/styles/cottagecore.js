import { asFullPreset } from "./compact.js";

export const cottagecore = asFullPreset({
  id: "cottagecore",
  name: "Cottagecore",
  tag: "Warm · folk · handmade",
  desc: "Warm earth tones, folk-print florals, hand-lettered nostalgia. Slow craft brands and rural life.",

  feel: "Stepping into a Sunday farmers' market — not a 'rustic' SaaS template.",

  references: "Toast catalogs, Beatrix Potter watercolors, Cabin Porn, The Old Farmer's Almanac, Anthropologie store interiors, Sunday Times Style section, William Morris textiles",

  boldFactor: [
    "Warm earth palette: butter, terracotta, sage, dusty rose — NEVER bright",
    "Folk-print floral / botanical patterns as section dividers or borders",
    "Hand-lettered display (Sacramento, Yellowtail) for sentiment moments",
    "Serif body text on cream paper (#F5EFE0) — slow reading feel",
    "Decorative dingbats: ❀ ✿ ✾ as section markers, never icons",
    "Slight imperfection (1-2° rotation, slightly-off-center)",
    "Generous body line-height (1.8+) — unhurried reading",
  ],

  tokens: {
    "bg":           { value: "#F5EFE0", usage: "Cream paper" },
    "fg":           { value: "#3A2C1E", usage: "Walnut brown" },
    "muted-fg":     { value: "#6B5A47", usage: "Aged wood" },
    "butter":       { value: "#F0D27E", usage: "Warm cream highlight" },
    "terracotta":   { value: "#C97B5B", usage: "Earth red accent" },
    "sage":         { value: "#8FA989", usage: "Plant green" },
    "dusty-rose":   { value: "#D4A6A6", usage: "Soft pink" },
  },

  typography: {
    display: '"Fraunces", "Cormorant Garamond", "EB Garamond", serif',
    body:    '"Source Serif 4", "Crimson Text", Georgia, serif',
    accent:  '"Sacramento", "Yellowtail", cursive (sparingly)',
    mono:    '"JetBrains Mono", monospace',
    scale:   "14/16/18/24/32/48/72/96",
    weight:  "display 400-600 · body 400",
    tracking: "display normal · body normal · cursive normal",
  },

  antiPatterns: [
    { name: "Saturated colors",    dont: "use bright hex like #FF0000",          why: "Cottagecore is muted earth tones — saturation kills the warmth" },
    { name: "Sans-serif body",     dont: "use Inter / system-ui for body",       why: "Slow serif reading IS the language" },
    { name: "Strict modern grid",  dont: "use 12-col snapped layout",            why: "Slight irregularity feels handmade; strict grid feels industrial" },
    { name: "Floral as fake icon", dont: "use lucide flower icons",              why: "Real botanical illustration or none — vector icons look corporate" },
    { name: "Cool palette",        dont: "use blues / greys",                    why: "Warm earth ONLY — cool tones break the cottage feel" },
  ],

  responsive: [
    { element: "Section padding", mobile: "56px",  tablet: "80px",  desktop: "112px" },
    { element: "Hero type",       mobile: "44px",  tablet: "64px",  desktop: "88px" },
    { element: "Body line-height", mobile: "1.7",  tablet: "1.8",   desktop: "1.85" },
    { element: "Reading column max", mobile: "100%", tablet: "65ch", desktop: "60ch" },
  ],

  snippets: [
    `/* Section divider with dingbat */
.divider {
  display: flex; align-items: center; gap: 16px;
  color: #8FA989;
  font-family: "Fraunces", serif;
  margin: 64px 0;
}
.divider::before, .divider::after {
  content: ""; flex: 1; height: 1px; background: currentColor; opacity: 0.4;
}
/* HTML: <div class="divider">❀</div> */`,
    `/* Cream paper texture */
body {
  background: #F5EFE0;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(0,0,0,0.015) 1px, transparent 2px),
    radial-gradient(circle at 70% 60%, rgba(0,0,0,0.012) 1px, transparent 2px);
  background-size: 80px 80px;
}`,
    `/* Slow reading column */
.reading {
  font-family: "Source Serif 4", serif;
  font-size: 18px;
  line-height: 1.8;
  max-width: 60ch;
  color: #3A2C1E;
}`,
  ],

  successLooksLike: [
    "A Toast catalog winter issue",
    "A William Morris textile pattern book",
    "Beatrix Potter's manuscript pages",
    "An Anthropologie store window in October",
  ],

  failureLooksLike: [
    "Modern SaaS with one terracotta accent",
    "Bright saturated colors anywhere",
    "Sans-serif body text",
    "Strict snapped grid",
    "Lucide flower icons",
  ],

  overrideGlobalRules: [
    "Botanical / dingbat decorative SVG is encouraged — overrides global 'no SVG-drawn imagery' rule.",
    "Serif body fonts (Source Serif / EB Garamond) are REQUIRED — overrides global 'avoid overused fonts' rule.",
  ],

  tile: "tile-cottagecore",
  tileHTML: `
    <div class="dingbat">❀</div>
    <div class="word">Slow.<br/><em>Soft.</em></div>
    <div class="rule"></div>
  `,
});

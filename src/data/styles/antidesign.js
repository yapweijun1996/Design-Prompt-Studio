import { asFullPreset } from "./compact.js";

export const antidesign = asFullPreset({
  id: "antidesign",
  name: "Anti-Design",
  tag: "Broken · clashing · raw",
  desc: "Deliberately broken layouts, clashing type, raw HTML aesthetic. Yale School of Art / Are.na / Cargo Collective register.",

  feel: "Landing on the Yale School of Art's wiki-edited site — typography clashes, layout breaks, the page refuses to perform 'design' — not a clean site cosplaying as messy.",

  references: "Yale School of Art (art.yale.edu), Cargo Collective, Are.na, Hooning.com, Dirty Bird Recipes, ribald-corp.com, Indexhibit, Folder Studio, Ben Schwartz's website",

  boldFactor: [
    "Multiple type families on one page that don't 'belong' together (Times + Comic Sans + Helvetica)",
    "Asymmetric, off-grid, sometimes overlapping element placement",
    "Default browser styling visible (blue underlined links, dotted focus rings)",
    "Aggressive size mismatches: tiny captions next to massive headlines",
    "Embedded raw HTML: <hr>, <pre>, default <button>, <select>",
    "Color combinations that 'shouldn't work' — clashing on purpose",
    "Content-first: image alt text visible, file paths shown, RSS link prominent",
  ],

  tokens: {
    "bg":      { value: "#FFFFFF", usage: "Browser default white" },
    "fg":      { value: "#000000", usage: "Browser default black" },
    "link":    { value: "#0000EE", usage: "Default browser link blue" },
    "visited": { value: "#551A8B", usage: "Default visited purple" },
    "accent":  { value: "#FFFF00", usage: "Highlight yellow (clashing)" },
    "clash":   { value: "#FF00FF", usage: "Magenta clash accent" },
    "border":  { value: "#000000", usage: "Solid 2px black border" },
  },

  typography: {
    display: '"Times New Roman", "Comic Sans MS", "Helvetica", "Courier New", "Verdana", serif',
    body:    '"Times New Roman", "Georgia", "Verdana", serif',
    mono:    '"Courier New", "Courier", monospace',
    scale:   "10/12/14/16/18/24/36/72",
    weight:  "any · mixed · bold + italic + underline used liberally",
    tracking: "default browser metrics · no custom kerning",
  },

  antiPatterns: [
    { name: "Polished SaaS look", dont: "use Inter + soft shadows + rounded corners", why: "Anti-design rejects the SaaS visual language; refusal IS the statement" },
    { name: "Cohesive type system", dont: "stick to one font family", why: "Multiple clashing families IS the typographic vocabulary" },
    { name: "Strict grid",        dont: "snap all elements to 12-col grid", why: "Off-grid, overlapping, broken placement is the layout primitive" },
    { name: "Hidden defaults",    dont: "strip browser styling with a reset.css", why: "Visible browser defaults (blue links, dotted focus, etc.) ARE the aesthetic" },
    { name: "Subtle palette",     dont: "use a designed muted palette", why: "Clashing color (yellow + magenta + lime) is the rebellion" },
  ],

  responsive: [
    { element: "Mobile",          mobile: "broken on purpose — fine", tablet: "still broken", desktop: "still broken" },
    { element: "Section padding", mobile: "0",     tablet: "12px",  desktop: "24px" },
    { element: "Hero",            mobile: "wraps weirdly", tablet: "overlaps", desktop: "free-placed" },
  ],

  snippets: [
    `/* Clashing type stack */
.anti-h1 {
  font-family: "Times New Roman", serif;
  font-size: 72px;
  font-weight: 400;
  color: #000000;
  text-decoration: underline wavy #FF00FF;
}
.anti-h2 {
  font-family: "Comic Sans MS", cursive;
  font-size: 14px;
  color: #0000EE;
  margin-top: -20px; /* deliberate overlap */
}
.anti-body {
  font-family: "Courier New", monospace;
  font-size: 16px;
  background: #FFFF00;
  padding: 4px;
}`,
    `/* Default browser link styling (no reset) */
a { color: #0000EE; text-decoration: underline; }
a:visited { color: #551A8B; }
a:active { background: yellow; color: red; }
hr { border: 0; border-top: 2px dashed #000; margin: 24px 0; }
button { /* unstyled default */ }
input, select, textarea { /* unstyled default */ }`,
    `/* Off-grid placement with absolute */
.anti-canvas { position: relative; min-height: 100vh; padding: 24px; }
.anti-canvas .item-a { position: absolute; top: 24px; left: 24px; transform: rotate(-3deg); }
.anti-canvas .item-b { position: absolute; top: 180px; right: 8%; transform: rotate(2deg); }
.anti-canvas .item-c { position: absolute; bottom: 48px; left: 40%; transform: rotate(-1deg); }`,
  ],

  successLooksLike: [
    "art.yale.edu wiki-edited department pages",
    "Cargo Collective portfolio sites",
    "Folder Studio's archive page",
    "Hooning.com",
  ],

  failureLooksLike: [
    "Polished Inter + soft-shadow SaaS landing claiming to be 'anti-design'",
    "Single type family + 12-col grid + neutral palette",
    "Stripped browser defaults with a reset.css",
  ],

  overrideGlobalRules: [
    "Multiple clashing type families are REQUIRED — overrides any 'cohesive system' guidance.",
    "Default browser styling (blue underlined links, dotted focus) should be PRESERVED — overrides reset.css conventions.",
    "Off-grid, overlapping placement is the layout vocabulary — overrides grid guidance.",
  ],

  tile: "tile-antidesign",
  tileHTML: `
    <div class="h1">Welcome.</div>
    <div class="h2">it is anti.</div>
    <div class="hr"></div>
    <a class="lnk">click here.</a>
    <div class="block">a yellow box.</div>
  `,
});

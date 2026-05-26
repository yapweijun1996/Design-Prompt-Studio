import { asFullPreset } from "./compact.js";

export const solarpunk = asFullPreset({
  id: "solarpunk",
  name: "Solarpunk",
  tag: "Optimistic · green · future",
  desc: "Optimistic eco-futurism. Plant motifs interwoven with clean modern UI. Warm sun + verdant green.",

  feel: "Reading about a regenerative city in 2050 — not greenwashing on a corporate sustainability page.",

  references: "Studio Ghibli's Castle in the Sky, Hayao Miyazaki's late films, Kim Stanley Robinson's Ministry for the Future, Allbirds early brand, Patagonia's enviro reports, Yutaka Sone's terrarium sculptures, growing-city illustrations of Tim Fasano",

  boldFactor: [
    "Verdant green primary (#3A8B45) + warm sun gold (#F0B83C) — never both saturated together",
    "Plant / leaf SVG decorations interwoven with UI (vines along section dividers)",
    "Warm-cream background (#FDF8EF) — sunlit paper feel",
    "Rounded humanist sans (Söhne, Lexend) — never harsh geometric",
    "Optimistic data viz: progress bars look like growing plants",
    "Asymmetric organic shapes (blob, leaf) NOT geometric circles/rectangles",
    "Body copy reads forward-looking — never apocalyptic / 'last chance'",
  ],

  tokens: {
    "bg":           { value: "#FDF8EF", usage: "Sunlit paper" },
    "fg":           { value: "#1F3326", usage: "Forest dark" },
    "muted-fg":     { value: "#587362", usage: "Lichen grey-green" },
    "leaf":         { value: "#3A8B45", usage: "Primary plant green" },
    "sun":          { value: "#F0B83C", usage: "Warm gold sun" },
    "moss":         { value: "#A8C09A", usage: "Soft moss" },
    "clay":         { value: "#C97B5B", usage: "Earth accent" },
  },

  typography: {
    display: '"Söhne Breit", "Lexend Mega", "DM Serif Display", system-ui',
    body:    '"Söhne", "Lexend", "Inter", system-ui',
    mono:    '"JetBrains Mono", monospace',
    scale:   "14/16/18/24/32/48/72/120",
    weight:  "display 500-700 · body 400",
    tracking: "display tight (-0.02em) · body normal",
  },

  antiPatterns: [
    { name: "Dystopian palette",  dont: "use grey / cool / corporate tones", why: "Solarpunk is OPTIMISTIC — grey reads as cyberpunk" },
    { name: "Geometric primitive", dont: "use rectangle + circle only",      why: "Organic asymmetric shapes ARE the language" },
    { name: "Sterile clean",      dont: "leave all space empty",             why: "Plant decorations should weave through; cleanness reads as corporate" },
    { name: "Doom messaging",     dont: "lead with 'last chance to save'",   why: "Solarpunk asserts the future is buildable — fear-mongering breaks the genre" },
    { name: "Bright neon",        dont: "use saturated electric green",      why: "Verdant earthy green; neon is cyberpunk" },
  ],

  responsive: [
    { element: "Section padding", mobile: "60px",  tablet: "88px",  desktop: "120px" },
    { element: "Hero type",       mobile: "44px",  tablet: "64px",  desktop: "112px" },
    { element: "Plant decoration", mobile: "subtle", tablet: "medium", desktop: "abundant" },
  ],

  snippets: [
    `/* Growing-plant progress bar */
.progress {
  position: relative; height: 8px; background: rgba(58,139,69,0.15);
  border-radius: 4px; overflow: hidden;
}
.progress::after {
  content: ""; position: absolute; left: 0; top: 0; height: 100%;
  width: var(--pct, 60%);
  background: linear-gradient(to right, #3A8B45, #5BAD5B);
  border-radius: 4px;
  transition: width 800ms cubic-bezier(0.22, 1, 0.36, 1);
}`,
    `/* Vine divider SVG */
.vine-divider {
  height: 24px;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 24"><path d="M0,12 Q50,4 100,12 T200,12" fill="none" stroke="%233A8B45" stroke-width="2"/><circle cx="50" cy="8" r="3" fill="%233A8B45"/><circle cx="100" cy="12" r="3" fill="%23F0B83C"/><circle cx="150" cy="16" r="3" fill="%233A8B45"/></svg>') no-repeat center / contain;
}`,
    `/* Organic blob CTA */
.cta {
  background: #3A8B45;
  color: #FDF8EF;
  padding: 16px 32px;
  border-radius: 50% 30% 50% 30%;  /* organic shape */
  font-family: "Söhne", system-ui;
  font-weight: 600;
  transition: border-radius 600ms cubic-bezier(0.22, 1, 0.36, 1);
}
.cta:hover { border-radius: 30% 50% 30% 50%; }`,
  ],

  successLooksLike: [
    "A Studio Ghibli landscape painting",
    "An Allbirds 2017 brand book",
    "A Patagonia regenerative agriculture report",
    "A community-garden mural in Lisbon",
  ],

  failureLooksLike: [
    "A corporate ESG report with one green checkmark",
    "Dystopian grey palette",
    "Geometric icons only (no organic shapes)",
    "Apocalyptic 'last chance' copy",
    "Neon electric green",
  ],

  overrideGlobalRules: [
    "Plant / leaf / vine SVG decorations are REQUIRED — overrides global 'no SVG-drawn imagery' rule (organic decoration IS the style's defining trait).",
    "Multi-color palette (green + gold + earth) is encouraged — overrides global 'avoid aggressive gradient' caution.",
  ],

  tile: "tile-solarpunk",
  tileHTML: `
    <div class="leaf">❦</div>
    <div class="word">Grow<br/><em>forward.</em></div>
    <div class="cta">Plant a seed →</div>
  `,
});

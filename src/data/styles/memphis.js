// Style preset: Memphis 80s — geometric shapes, terrazzo patterns, primary on pastel.

import { asFullPreset } from "./compact.js";

export const memphis = asFullPreset({
  id: "memphis",
  name: "Memphis 80s",
  tag: "Geometric · pattern · joyful",
  desc: "Geometric shape decorations, squiggle patterns, terrazzo textures. Primary saturated colors on pastel grounds.",

  feel: "An Ettore Sottsass Carlton bookcase showroom — not a 2024 'playful brand' SaaS.",

  references: "Ettore Sottsass furniture (Carlton, Ultrafragola), Memphis Group 1981-1988 catalogs, Nathalie Du Pasquier textiles, Karim Rashid early work, Bottega Veneta SS22 prints, Marimekko 1960s patterns",

  boldFactor: [
    "Geometric shape decorations (squiggles, circles, triangles, zigzags) placed playfully",
    "Terrazzo / confetti pattern as section background",
    "Saturated primary on pastel grounds (red on pink, blue on cyan, etc.)",
    "Curves + angles in same composition — never one or the other alone",
    "Type at multiple rotations (-8° to +8°) — never strictly horizontal",
    "Pattern as content, not as decoration — the page IS the pattern",
    "Mismatched corners: one card rounded 32px, another sharp 0px, deliberate",
  ],

  tokens: {
    "bg":          { value: "#FFF5E1", usage: "Pastel apricot ground" },
    "fg":          { value: "#1A1A1A", usage: "Near-black ink" },
    "red":         { value: "#FF3333", usage: "Primary red" },
    "yellow":      { value: "#FFD500", usage: "Primary yellow" },
    "blue":        { value: "#0066CC", usage: "Primary blue" },
    "pink":        { value: "#FF6BAA", usage: "Pastel pink" },
    "mint":        { value: "#A8E6CF", usage: "Pastel mint" },
    "terrazzo-1":  { value: "#1A1A1A", usage: "Terrazzo speckle 1" },
    "terrazzo-2":  { value: "#FF6BAA", usage: "Terrazzo speckle 2" },
  },

  typography: {
    display: '"Fraunces", "Bagel Fat One", "Bungee", display sans',
    body:    '"Source Serif 4", "Plus Jakarta Sans", system-ui',
    mono:    '"Space Mono", monospace',
    scale:   "14/18/24/36/56/84/120 — large jumps for drama",
    weight:  "display 800-900 · body 400",
    tracking: "display tight (-0.02em) · body normal",
  },

  antiPatterns: [
    { name: "Tasteful restraint", dont: "use a single muted accent",        why: "Memphis IS unrestrained joy — restraint reads as Scandinavian, not Memphis" },
    { name: "Symmetric layout",   dont: "use centered or balanced symmetry", why: "Asymmetric playful composition IS the language" },
    { name: "Single shape vocab", dont: "use only circles OR only squares",  why: "Memphis mixes squiggles, circles, triangles, zigzags — coherence comes from joy, not consistency" },
    { name: "Subdued colors",     dont: "use muted versions of primaries",   why: "Saturated primaries are non-negotiable; muting kills the era" },
    { name: "Generic 'playful' SaaS", dont: "use one rounded card with one bright button", why: "Memphis demands TOTAL commitment — partial is the worst outcome" },
  ],

  responsive: [
    { element: "Section padding",  mobile: "48px", tablet: "72px",  desktop: "96px" },
    { element: "Pattern density",  mobile: "small (16px)", tablet: "medium (24px)", desktop: "large (40px)" },
    { element: "Decoration count", mobile: "3 per section", tablet: "6", desktop: "10+" },
    { element: "Hero type",        mobile: "48px", tablet: "84px",  desktop: "120px" },
  ],

  snippets: [
    `/* Terrazzo pattern via SVG background */
.terrazzo {
  background-color: #FFF5E1;
  background-image:
    radial-gradient(circle at 20% 30%, #FF3333 3px, transparent 4px),
    radial-gradient(circle at 70% 60%, #0066CC 4px, transparent 5px),
    radial-gradient(circle at 40% 80%, #FFD500 3px, transparent 4px),
    radial-gradient(circle at 90% 20%, #FF6BAA 5px, transparent 6px);
  background-size: 120px 120px;
}`,
    `/* Squiggle SVG decoration */
.squiggle {
  position: absolute;
  width: 80px; height: 24px;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 24"><path d="M0,12 Q10,0 20,12 T40,12 T60,12 T80,12" fill="none" stroke="%23FF3333" stroke-width="3"/></svg>');
  transform: rotate(-5deg);
}`,
    `/* Tilted card */
.card {
  background: #FF6BAA;
  color: #1A1A1A;
  border-radius: 24px 4px 24px 4px;  /* asymmetric corners */
  transform: rotate(-2deg);
  padding: 32px;
}`,
  ],

  successLooksLike: [
    "An Ettore Sottsass furniture catalog",
    "A 1985 Nathalie Du Pasquier textile sample",
    "A Memphis Group exhibition poster",
    "A Bottega Veneta SS22 lookbook page",
  ],

  failureLooksLike: [
    "A modern SaaS with one playful gradient",
    "Pastels alone (no saturated primaries)",
    "Symmetric centered composition",
    "Restrained 'tasteful' Memphis",
    "Single shape type repeated",
  ],

  overrideGlobalRules: [
    "Geometric SVG shape decorations (squiggles, triangles, circles) are encouraged — overrides global 'no SVG-drawn imagery' rule (these are typographic ornaments, not pretending to be photography).",
    "Multiple accent colors used unapologetically — overrides global 'no aggressive gradient' caution since saturated solid blocks ARE the language.",
  ],

  tile: "tile-memphis",
  tileHTML: `
    <div class="dot dot-red"></div>
    <div class="dot dot-blue"></div>
    <div class="squiggle">~</div>
    <div class="word">Pop!</div>
    <div class="tri"></div>
  `,
});

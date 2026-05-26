import { asFullPreset } from "./compact.js";

export const riso = asFullPreset({
  id: "riso",
  name: "Risograph Print",
  tag: "Spot · grain · offset",
  desc: "Limited spot-color palette. Visible registration offset. Halftone grain. Indie-press / zine-press / It's Nice That register.",

  feel: "Holding a freshly riso-printed event poster — fluorescent pink slightly offset from federal blue, grainy halftone texture — not a digital design pretending to be print.",

  references: "It's Nice That riso editions, Hato Press, Risotto Studio, Mr. Cup, Out of the Box, Knust riso, Print Club London, Stencil Vault",

  boldFactor: [
    "Limited 2-3 spot-color palette (e.g. fluorescent pink + federal blue + cream paper)",
    "Visible registration offset: colors slightly mis-aligned (1-3px) on purpose",
    "Halftone / dot-grain texture overlaid on every color block",
    "Cream / kraft paper background (#F1ECDC) — never pure white",
    "Heavy display sans (Druk, GT America Mono, Helvetica Bold) for posters",
    "Layered overprint: where two colors overlap, a third multiply-blend color appears",
    "Composition feels printed: trim marks, page registration crosses welcome",
  ],

  tokens: {
    "bg":      { value: "#F1ECDC", usage: "Cream stock paper" },
    "fg":      { value: "#0F1A33", usage: "Federal blue ink" },
    "spot-1":  { value: "#FF48B0", usage: "Fluorescent pink (Riso F-pink)" },
    "spot-2":  { value: "#FFC836", usage: "Sunflower yellow (Riso yellow)" },
    "spot-3":  { value: "#33B95F", usage: "Mid green (Riso green) — alt" },
    "muted":   { value: "#6B6B6B", usage: "Caption grey" },
    "overprint": { value: "rgba(255,72,176,0.7)", usage: "Pink overprint blend" },
  },

  typography: {
    display: '"Druk", "GT America Mono", "Helvetica Bold", "Anton", sans-serif',
    body:    '"GT America", "Söhne", "Helvetica Neue", sans-serif',
    mono:    '"GT America Mono", "JetBrains Mono", monospace',
    scale:   "12/14/16/18/24/40/72/120",
    weight:  "display 800-900 · body 400-500 · mono mono",
    tracking: "display very tight (-0.04em) · mono normal",
  },

  antiPatterns: [
    { name: "Full RGB palette",   dont: "use vibrant 6-color photo gradients", why: "Riso = 2-3 spot colors max; full RGB destroys the medium's identity" },
    { name: "Pixel-perfect alignment", dont: "snap all elements to a strict grid", why: "Registration offset (1-3px on color elements) IS the print signal" },
    { name: "Smooth gradients",   dont: "render smooth color transitions", why: "Riso prints in solid spots with halftone — no smooth gradients possible" },
    { name: "Pure white bg",      dont: "use #FFFFFF", why: "Cream / kraft stock is the medium; pure white reads as digital" },
    { name: "Anti-aliased clean", dont: "render images without grain texture", why: "Halftone dot grain on every color block IS the texture; clean reads as digital" },
  ],

  responsive: [
    { element: "Section padding", mobile: "32px",  tablet: "64px",  desktop: "96px" },
    { element: "Hero display",    mobile: "60px",  tablet: "96px",  desktop: "120px" },
    { element: "Registration offset", mobile: "1px", tablet: "2px",  desktop: "3px" },
  ],

  snippets: [
    `/* Spot-color text with registration offset */
.riso-headline {
  font-family: "Druk", "Anton", sans-serif;
  font-weight: 900;
  font-size: 120px;
  line-height: 0.9;
  color: #0F1A33;
  position: relative;
}
.riso-headline::before {
  content: attr(data-text);
  position: absolute;
  top: 2px; left: -3px;
  color: #FF48B0;
  z-index: -1;
  mix-blend-mode: multiply;
}`,
    `/* Halftone dot-grain overlay on color block */
.riso-block {
  background-color: #FF48B0;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(0,0,0,0.12) 1.5px, transparent 2px),
    radial-gradient(circle at 70% 60%, rgba(0,0,0,0.08) 1px, transparent 2px),
    radial-gradient(circle at 40% 80%, rgba(0,0,0,0.1) 1.5px, transparent 2px);
  background-size: 6px 6px, 9px 9px, 7px 7px;
  padding: 32px;
  color: #0F1A33;
}`,
    `/* Overprint where two colors meet */
.riso-shape-a { background: #FF48B0; mix-blend-mode: multiply; }
.riso-shape-b { background: #FFC836; mix-blend-mode: multiply; }
/* Overlap region will appear as deep orange / red multiply blend */`,
    `/* Paper grain texture */
body.riso {
  background-color: #F1ECDC;
  background-image:
    radial-gradient(circle at 25% 30%, rgba(0,0,0,0.025) 1px, transparent 2px),
    radial-gradient(circle at 60% 80%, rgba(0,0,0,0.02) 1px, transparent 2px);
  background-size: 50px 50px;
}`,
  ],

  successLooksLike: [
    "A Hato Press riso event poster",
    "It's Nice That riso-printed feature spread",
    "Risotto Studio commission",
  ],

  failureLooksLike: [
    "Full-RGB digital design with one 'grain filter' overlay",
    "Pure white background + clean alignment claiming to be riso",
    "Smooth gradient hero on a 'riso' page",
  ],

  overrideGlobalRules: [
    "Registration offset (1-3px) on color elements is REQUIRED — overrides any 'pixel-perfect alignment' guidance.",
    "Halftone dot grain texture is REQUIRED on color blocks — overrides smoothness defaults.",
    "Limited 2-3 spot color palette is the medium — overrides any 'rich palette' guidance.",
  ],

  tile: "tile-riso",
  tileHTML: `
    <div class="head" data-text="EDITION">EDITION</div>
    <div class="meta">№ 04 · printed by hand</div>
    <div class="dot"></div>
  `,
});

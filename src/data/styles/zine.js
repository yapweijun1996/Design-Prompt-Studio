import { asFullPreset } from "./compact.js";

export const zine = asFullPreset({
  id: "zine",
  name: "Underground Zine",
  tag: "Photocopied · DIY · raw",
  desc: "Photocopied black & white. Cut-and-paste collage. Distressed type. Punk DIY ethic.",

  feel: "A 1980s Riot Grrrl zine you found at a record store — not a brand pretending underground.",

  references: "Sniffin' Glue (1976-77), Bikini Kill zines, Maximum Rocknroll covers, Crass Records album art, early Vice Magazine, Raymond Pettibon's Black Flag flyers, Ed Ruscha's Twentysix Gasoline Stations",

  boldFactor: [
    "Pure black on photocopy white (#F7F4EE) — never pure white",
    "Heavy contrast / distressed type (Knockout, slab serif but ROUGH)",
    "Cut-and-paste layout: visible scotch tape lines, torn paper edges, ransom-note headlines",
    "Hand-stamped / typewriter body text feel",
    "High-contrast halftone photo treatment",
    "Stapled-page borders + page numbers in margin",
    "Confidently amateur: alignment is approximate, intentional",
  ],

  tokens: {
    "bg":          { value: "#F7F4EE", usage: "Photocopy white" },
    "fg":          { value: "#0F0F0F", usage: "Ink black" },
    "muted-fg":    { value: "#4A4A4A", usage: "Faded photocopy" },
    "tape":        { value: "rgba(15,15,15,0.08)", usage: "Scotch tape overlay" },
  },

  typography: {
    display: '"Knockout", "Anton", "Bebas Neue", "League Gothic", sans-serif',
    body:    '"Courier Prime", "Special Elite", "American Typewriter", monospace',
    mono:    '"Courier Prime", monospace',
    scale:   "12/14/16/22/32/56/96/140",
    weight:  "display 700-900 · body 400",
    tracking: "display tight · body slightly loose (0.02em)",
  },

  antiPatterns: [
    { name: "Modern sans body",   dont: "use Inter / Helvetica / system-ui",  why: "Typewriter body is the DIY signal; modern sans reads corporate" },
    { name: "Perfect alignment", dont: "snap to a strict grid",                why: "Slight misalignment IS the cut-and-paste authenticity" },
    { name: "Color photography", dont: "use full-color images",                why: "Halftone B&W only — color breaks the photocopy reality" },
    { name: "Pure white bg",     dont: "use #FFFFFF",                          why: "Off-white photocopy tint signals the medium; pure white reads digital" },
    { name: "Symmetric layout",  dont: "use balanced centered composition",   why: "Asymmetric collage IS the zine layout vocabulary" },
  ],

  responsive: [
    { element: "Section padding", mobile: "32px",  tablet: "56px",  desktop: "80px" },
    { element: "Hero type",       mobile: "56px",  tablet: "96px",  desktop: "140px" },
    { element: "Rotation amount", mobile: "1-2°",  tablet: "1-3°",  desktop: "1-4°" },
  ],

  snippets: [
    `/* Halftone image treatment */
img.halftone {
  filter: grayscale(100%) contrast(200%);
  mix-blend-mode: multiply;
}`,
    `/* Cut-and-paste headline strip */
.cut-headline {
  display: inline-block;
  background: #F7F4EE;
  border: 1px dashed #0F0F0F;
  padding: 4px 12px;
  transform: rotate(-2deg);
  margin: 4px;
}
/* Multiple stitched headlines: rotate each differently */`,
    `/* Photocopy paper texture */
body {
  background-color: #F7F4EE;
  background-image:
    radial-gradient(circle at 25% 30%, rgba(0,0,0,0.04) 1px, transparent 2px),
    radial-gradient(circle at 70% 60%, rgba(0,0,0,0.03) 1px, transparent 2px);
  background-size: 60px 60px;
}`,
    `/* Scotch tape strip */
.tape {
  position: absolute;
  width: 80px; height: 20px;
  background: rgba(15,15,15,0.08);
  border: 1px solid rgba(15,15,15,0.15);
  transform: rotate(-8deg);
}`,
  ],

  successLooksLike: [
    "A 1977 Sniffin' Glue cover",
    "A Bikini Kill DIY tour zine",
    "A Crass Records sleeve",
    "An early Vice fold-and-staple newsletter",
  ],

  failureLooksLike: [
    "A modern site with one 'distressed' filter overlay",
    "Pure white background",
    "Sans-serif body text",
    "Pristine grid alignment",
    "Full-color photography",
  ],

  overrideGlobalRules: [
    "Typewriter / Courier body fonts are REQUIRED — overrides global 'avoid overused fonts' rule.",
    "Slight rotation on every element is encouraged — overrides typical alignment expectations.",
  ],

  tile: "tile-zine",
  tileHTML: `
    <div class="tape t1"></div>
    <div class="head">D.I.Y</div>
    <div class="body">issue zero · this means you</div>
    <div class="tape t2"></div>
  `,
});

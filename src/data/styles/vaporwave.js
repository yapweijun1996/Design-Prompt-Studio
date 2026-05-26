import { asFullPreset } from "./compact.js";

export const vaporwave = asFullPreset({
  id: "vaporwave",
  name: "Vaporwave",
  tag: "90s mall · classical · synth",
  desc: "90s mall aesthetic. Greek bust + magenta/teal gradient. Japanese katakana. Glitch nostalgia.",

  feel: "An A E S T H E T I C tumblr from 2014 done sincerely in 2026 — not Cyberpunk's nighttime city.",

  references: "Macintosh Plus Floral Shoppe album cover, MTV bumpers 1989-1993, early Windows 95 demo screens, Japanese 1980s ads, classical Greek sculptures, palm tree silhouettes",

  boldFactor: [
    "Magenta + teal + warm beige base — distinct from cyberpunk's pure neon",
    "Classical statue silhouettes or Greek column motifs",
    "Wide-tracking display type (letter-spacing 0.3em+) — A E S T H E T I C",
    "Pink/teal grid floor in perspective (synthwave horizon)",
    "Japanese katakana decorations (ベイパーウェイヴ)",
    "VHS-style chromatic aberration on key images",
    "Sunset gradient (pink → purple → teal)",
  ],

  tokens: {
    "bg":          { value: "#0F0B2A", usage: "Deep purple night" },
    "fg":          { value: "#FFE5F1", usage: "Soft pink-white" },
    "magenta":     { value: "#FF6EC7", usage: "Primary hot pink" },
    "teal":        { value: "#5EE5D5", usage: "Mint accent" },
    "beige":       { value: "#F5D8B5", usage: "Statue / warm element" },
    "purple":      { value: "#9B59B6", usage: "Mid-gradient stop" },
  },

  typography: {
    display: '"Tan Pearl", "Limelight", "Times New Roman", serif',
    body:    '"Inter Tight", "Plus Jakarta Sans", system-ui',
    mono:    '"VT323", "Space Mono", monospace',
    scale:   "14/18/28/44/72/120",
    weight:  "display 400-700 · body 400",
    tracking: "display wide (0.3em+) uppercase · body normal",
  },

  antiPatterns: [
    { name: "Cyberpunk neon",  dont: "use pure-neon on pure-black",       why: "Vaporwave is softer, warmer, more dreamy than cyberpunk's hacker grit" },
    { name: "Sharp clean type", dont: "use tight letter-spacing on display", why: "W I D E tracking IS the vaporwave typographic signature" },
    { name: "Modern grid layout", dont: "snap to a strict grid",         why: "Floaty pastiche layouts feel right; strict order kills the vibe" },
    { name: "Subtle accents",  dont: "use only one muted color",        why: "Pink + teal duality is non-negotiable" },
  ],

  responsive: [
    { element: "Section padding", mobile: "60px",  tablet: "80px",  desktop: "120px" },
    { element: "Hero tracking",   mobile: "0.2em", tablet: "0.3em", desktop: "0.4em" },
    { element: "Hero type",       mobile: "48px",  tablet: "72px",  desktop: "120px" },
  ],

  snippets: [
    `/* Sunset gradient bg */
body {
  background: linear-gradient(180deg,
    #0F0B2A 0%,
    #4B2E5C 30%,
    #9B59B6 50%,
    #FF6EC7 75%,
    #F5D8B5 100%);
  min-height: 100dvh;
}`,
    `/* Synthwave grid floor */
.grid-floor {
  position: absolute; bottom: 0; left: 0; right: 0; height: 40vh;
  background-image:
    linear-gradient(to right, rgba(255,110,199,0.6) 1px, transparent 1px),
    linear-gradient(to top, rgba(255,110,199,0.6) 1px, transparent 1px);
  background-size: 40px 40px;
  transform: perspective(400px) rotateX(60deg);
  transform-origin: center bottom;
}`,
    `/* W I D E display tracking */
.aesthetic-heading {
  font-family: "Tan Pearl", serif;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  font-size: 80px;
  text-shadow: -2px 0 #FF6EC7, 2px 0 #5EE5D5;
}`,
  ],

  successLooksLike: [
    "A Floral Shoppe vinyl reissue",
    "An MTV 1989 station ID",
    "A Tokyo arcade in 1994",
    "A Macintosh Plus screensaver",
  ],

  failureLooksLike: [
    "Cyberpunk with one Greek statue added",
    "Tight letter-spacing on the headline",
    "Modern minimalist grid layout",
    "Just one color (no pink+teal duality)",
  ],

  overrideGlobalRules: [
    "Sunset gradient background is REQUIRED — overrides global 'avoid aggressive gradient backgrounds' rule (gradient atmosphere IS the entire aesthetic).",
    "Classical statue silhouettes are encouraged — overrides global 'no SVG imagery' rule (these are iconic genre markers).",
  ],

  tile: "tile-vaporwave",
  tileHTML: `
    <div class="kata">ベイパー</div>
    <div class="word">A E S</div>
    <div class="grid"></div>
  `,
});

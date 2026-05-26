import { asFullPreset } from "./compact.js";

export const pixel = asFullPreset({
  id: "pixel",
  name: "Pixel 8-bit",
  tag: "Retro · blocky · arcade",
  desc: "8-bit pixel aesthetic. Chunky blocks, dithering, CRT scanlines, arcade UI patterns.",

  feel: "An NES arcade cabinet in 1988 — not a 2024 'retro gaming' brand template.",

  references: "Super Mario Bros (1985), Mega Man box art, NES Punch-Out, Game Boy Pokemon Red sprites, early Atari 2600 menus, Pico-8 game-jam art, Lemmings 1991",

  boldFactor: [
    "Pixel-perfect 8-bit type — Press Start 2P, VT323, m3x6",
    "image-rendering: pixelated on ALL images",
    "Chunky 4px+ blocks as UI primitives (no anti-aliased curves)",
    "Limited palette: 8-12 colors max from a defined picker",
    "Dithered gradients (50% checkerboard) instead of smooth gradients",
    "CRT scanline overlay + slight phosphor glow",
    "Step-based animation (no easing — 100ms snap between frames)",
  ],

  tokens: {
    "bg":          { value: "#0F0F23", usage: "Deep arcade purple" },
    "fg":          { value: "#FFE3A4", usage: "Sprite cream" },
    "magenta":     { value: "#FF4D8B", usage: "Mario red-pink" },
    "cyan":        { value: "#5DE5FF", usage: "Game Boy cyan" },
    "yellow":      { value: "#FFD53D", usage: "Power-up yellow" },
    "green":       { value: "#3DDC84", usage: "Health green" },
    "deep-purple": { value: "#3D0F4D", usage: "Background detail" },
  },

  typography: {
    display: '"Press Start 2P", "VT323", monospace',
    body:    '"VT323", "Press Start 2P", monospace',
    mono:    '"VT323", monospace',
    scale:   "8/10/12/16/24/40/64",
    weight:  "400 only (pixel fonts have one weight)",
    tracking: "display 0.05em · body normal",
  },

  antiPatterns: [
    { name: "Anti-aliased smoothness", dont: "use border-radius or smooth gradients",  why: "Aliased pixels ARE the language; smooth reads as modern, not 8-bit" },
    { name: "Modern font",            dont: "use Inter / Helvetica / any TTF font",   why: "Pixel-perfect bitmap fonts only" },
    { name: "Too many colors",        dont: "use full RGB",                            why: "Limited 8-12 color palette IS the constraint — full color breaks the era" },
    { name: "Smooth animation",       dont: "use ease curves on transitions",          why: "Step-based snap animation; smooth curves break the frame-by-frame feel" },
    { name: "Modern UI patterns",     dont: "use floating action buttons or modals",  why: "Match arcade UI: HUDs, life bars, score counters, menu screens" },
  ],

  responsive: [
    { element: "Pixel scale",     mobile: "2x",   tablet: "3x",   desktop: "4x" },
    { element: "Hero type",       mobile: "24px", tablet: "40px", desktop: "64px" },
    { element: "Border thickness", mobile: "2px", tablet: "3px",  desktop: "4px" },
  ],

  snippets: [
    `/* Force pixel-perfect rendering */
img, .pixel-art {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}`,
    `/* CRT scanline overlay */
body::after {
  content: ""; position: fixed; inset: 0; pointer-events: none; z-index: 10;
  background: repeating-linear-gradient(
    0deg,
    transparent 0,
    transparent 2px,
    rgba(0,0,0,0.15) 2px,
    rgba(0,0,0,0.15) 4px);
}`,
    `/* Dithered gradient (50% checkerboard) */
.dither {
  background:
    linear-gradient(45deg, transparent 25%, currentColor 25%, currentColor 50%, transparent 50%, transparent 75%, currentColor 75%) 0 0 / 8px 8px;
  color: #FF4D8B;
}`,
    `/* Health-bar UI */
.health-bar {
  display: flex; gap: 4px;
  padding: 4px;
  background: #0F0F23;
  border: 4px solid #FFE3A4;
}
.health-bar .pip { width: 16px; height: 16px; background: #3DDC84; }`,
  ],

  successLooksLike: [
    "An NES Super Mario Bros 3 title screen",
    "A Game Boy Pokemon Red intro",
    "A Pico-8 indie game's main menu",
    "A 1990 arcade cabinet attract mode",
  ],

  failureLooksLike: [
    "A modern site with one 'retro' pixel font",
    "Anti-aliased smooth shapes",
    "Full RGB color palette",
    "Modern UI patterns (FAB, modals)",
    "Smooth ease animations",
  ],

  overrideGlobalRules: [
    "Pixel display fonts (Press Start 2P, VT323) are REQUIRED — overrides global 'avoid overused fonts' rule.",
    "Limited pixel-blocky decorative elements are encouraged — overrides global 'no SVG-drawn imagery' rule (these are typographic ornaments in the 8-bit grammar).",
  ],

  tile: "tile-pixel",
  tileHTML: `
    <div class="score">SCORE: 31337</div>
    <div class="word">PLAY!</div>
    <div class="hearts">♥♥♥</div>
  `,
});

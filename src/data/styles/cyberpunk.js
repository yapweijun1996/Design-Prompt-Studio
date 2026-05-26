// Style preset: Cyberpunk Neon — black canvas, magenta + cyan, monospace glitch.

import { asFullPreset } from "./compact.js";

export const cyberpunk = asFullPreset({
  id: "cyberpunk",
  name: "Cyberpunk Neon",
  tag: "Neon · glitch · night-city",
  desc: "Near-black with electric magenta and cyan. Monospace glitch headlines. Scanlines and chromatic aberration.",

  feel: "Walking through a 2077 night-city ad — not a 2024 SaaS pretending dystopian.",

  references: "Cyberpunk 2077 promotional materials, Akira (1988), Ghost in the Shell, Mr. Robot opening titles, Anamanaguchi album art, Vitaly's portfolio, Vercel's Conf 2023 site",

  boldFactor: [
    "Pure-near-black canvas (#0A0014) — never lighter than #0A",
    "Magenta (#FF0080) + cyan (#00FFFF) as twin accents",
    "Monospace display (Space Mono, IBM Plex Mono) at 700+ weight",
    "Glitch keyframe animation on headline hover (clip-path shifts)",
    "Scanline overlay (4px repeating-linear-gradient)",
    "Neon text-shadow: 0 0 8px on accent text",
    "Chromatic aberration on key images (RGB channel offset)",
  ],

  tokens: {
    "bg":          { value: "#0A0014", usage: "Near-black canvas" },
    "fg":          { value: "#E5E5FF", usage: "Slightly cyan-tinted off-white" },
    "muted-fg":    { value: "#6B6B8C", usage: "Cool-gray secondary text" },
    "magenta":     { value: "#FF0080", usage: "Primary accent — buttons, glows" },
    "cyan":        { value: "#00FFFF", usage: "Secondary accent — links, highlights" },
    "danger":      { value: "#FF3333", usage: "Error / breach indicator" },
    "scanline":    { value: "rgba(255,255,255,0.02)", usage: "Subtle overlay every 4px" },
  },

  typography: {
    display: '"Space Mono", "IBM Plex Mono", "Courier New", monospace',
    body:    '"Space Mono", "IBM Plex Mono", "Courier New", monospace',
    mono:    '"Space Mono", monospace',
    scale:   "13/15/18/24/36/56/84/128",
    weight:  "700 display · 400 body · 700 labels",
    tracking: "display 0.02em uppercase · body 0.01em · labels 0.15em uppercase",
  },

  antiPatterns: [
    { name: "Sans-serif headlines", dont: "use Inter / Helvetica / proportional fonts",  why: "Monospace IS the cyberpunk typographic signal — proportional fonts kill the era reference" },
    { name: "Bright background",    dont: "use any bg lighter than #0A0014",             why: "The dystopian darkness is non-negotiable; light themes break the world" },
    { name: "Soft shadows",         dont: "use blurred soft shadows",                    why: "Sharp neon glows are the language; soft shadows belong to Glassmorphism" },
    { name: "Pastel accents",       dont: "use muted versions of magenta/cyan",          why: "Saturated electric colors at FULL intensity — muting kills the neon" },
    { name: "Generic gradient",     dont: "use diagonal gradient backgrounds",            why: "Cyberpunk uses solid color blocks + neon glows, not gradient washes" },
  ],

  responsive: [
    { element: "Section padding", mobile: "60px",   tablet: "80px",   desktop: "120px" },
    { element: "Hero type",       mobile: "48px",   tablet: "72px",   desktop: "120px" },
    { element: "Glow intensity",  mobile: "6px",    tablet: "8px",    desktop: "12px" },
    { element: "Scanline visibility", mobile: "0.015 opacity", tablet: "0.02", desktop: "0.025" },
  ],

  snippets: [
    `/* Scanline overlay */
body::before {
  content: ""; position: fixed; inset: 0; pointer-events: none; z-index: 1;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px);
}`,
    `/* Neon text glow */
.headline {
  color: #FF0080;
  text-shadow:
    0 0 8px rgba(255,0,128,0.8),
    0 0 16px rgba(255,0,128,0.5),
    0 0 32px rgba(255,0,128,0.3);
}`,
    `/* Glitch keyframe */
@keyframes glitch {
  0%, 100% { clip-path: inset(0 0 0 0); transform: translateX(0); }
  20% { clip-path: inset(20% 0 30% 0); transform: translateX(-3px); }
  40% { clip-path: inset(50% 0 10% 0); transform: translateX(3px); }
  60% { clip-path: inset(10% 0 60% 0); transform: translateX(-2px); }
  80% { clip-path: inset(70% 0 5% 0); transform: translateX(2px); }
}
.glitch:hover { animation: glitch 600ms linear; }`,
    `/* RGB chromatic aberration on hover */
.aberration {
  position: relative;
  text-shadow:
    -1px 0 #FF0080,
    1px 0 #00FFFF;
}`,
  ],

  successLooksLike: [
    "A Cyberpunk 2077 in-game ad",
    "Mr. Robot's title sequence",
    "Akira's poster",
    "A Vitaly Friedman conf landing page",
  ],

  failureLooksLike: [
    "A dark-mode SaaS dashboard with one neon button",
    "Pastel-on-black ('pastel cyberpunk' is a contradiction)",
    "Inter or Helvetica headlines",
    "Soft gradient backgrounds",
  ],

  overrideGlobalRules: [
    "Monospace display fonts (Space Mono, IBM Plex Mono) are REQUIRED — overrides global 'avoid overused fonts' rule.",
    "Aggressive radial-gradient glows are part of the language — overrides global 'avoid aggressive gradient backgrounds' rule (these are atmosphere, not bloat).",
  ],

  tile: "tile-cyberpunk",
  tileHTML: `
    <div class="head">SECTOR_7 · ONLINE</div>
    <div class="big">JACK<br/>_IN.</div>
    <div class="cta">RUN.EXE ▸</div>
  `,
});

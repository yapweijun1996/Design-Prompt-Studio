import { asFullPreset } from "./compact.js";

export const geocities = asFullPreset({
  id: "geocities",
  name: "GeoCities '99",
  tag: "Tiled bg · GIF · marquee",
  desc: "Tiled background, animated GIFs, hit counter, marquee, MIDI auto-play. 1996-2001 GeoCities / Angelfire / Tripod register.",

  feel: "Loading a friend's personal GeoCities homepage in 1999 on a 56k modem — tiled stars background, animated mailbox GIF, 'You are visitor #00428' — not a clean retro homage.",

  references: "Archive of 1996-2001 GeoCities sites, Angelfire 'starter pages', Tripod homepages, early Geocitiesizer art projects, the Internet Archive Wayback 1999-2001 snapshots, oneterabyteofkilobytemagazine",

  boldFactor: [
    "Tiled background image (stars, fire, water, marble texture) — never solid color",
    "Comic Sans, Impact, Courier, and Times jammed together",
    "Animated GIFs everywhere: spinning email, marching ants, sparkling text, dancing baby",
    "MARQUEE scrolling text + BLINK tags (or modern equivalents)",
    "Hit counter / 'You are visitor #00000123' / Under Construction signs",
    "Webrings, 'My Friends', 'Awards I've Won', 'Cool Links' sections",
    "MIDI auto-play (or just an audio control showing 'Now playing: Smashing Pumpkins')",
  ],

  tokens: {
    "bg":      { value: "#000080", usage: "Pure navy blue (or tiled image)" },
    "fg":      { value: "#00FF00", usage: "Lime green text" },
    "link":    { value: "#FFFF00", usage: "Yellow link" },
    "visited": { value: "#FF00FF", usage: "Magenta visited link" },
    "accent":  { value: "#FF0000", usage: "Red emphasis" },
    "warn":    { value: "#FFA500", usage: "Orange under-construction" },
    "border":  { value: "#C0C0C0", usage: "Silver embossed border" },
  },

  typography: {
    display: '"Comic Sans MS", "Impact", "Times New Roman", "Courier New", cursive',
    body:    '"Times New Roman", "Courier New", serif',
    mono:    '"Courier New", monospace',
    scale:   "10/12/14/16/18/24/36/48",
    weight:  "default — mixed bold / italic / underline / blink",
    tracking: "default browser metrics · 1999 not 2024",
  },

  antiPatterns: [
    { name: "Modern clean look", dont: "use Inter + flat color + soft shadows", why: "GeoCities is loud + chaotic; clean reads as a 2024 retro homage" },
    { name: "Subtle palette",    dont: "use a designed muted palette", why: "Pure RGB primaries + neon CYMK on tiled bg IS the era's palette" },
    { name: "Single font",       dont: "use one font family throughout", why: "Comic Sans + Impact + Times jammed together IS the typographic chaos" },
    { name: "No animation",      dont: "use only static elements", why: "Animated GIFs + marquee + blink were the lifeblood — animation is the medium" },
    { name: "Responsive grid",   dont: "build a clean responsive layout", why: "Fixed-width tables, frames, inline-styled font tags — 1999 layout primitives" },
  ],

  responsive: [
    { element: "Layout",         mobile: "fixed-width tables", tablet: "fixed-width tables", desktop: "fixed-width tables (1024px)" },
    { element: "Animated GIF",   mobile: "everywhere",  tablet: "everywhere",  desktop: "everywhere" },
    { element: "Section padding", mobile: "8px",  tablet: "16px",  desktop: "24px" },
  ],

  snippets: [
    `/* Tiled background */
body.geo {
  background-color: #000080;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="8" cy="8" r="1" fill="white"/><circle cx="24" cy="14" r="1.5" fill="white"/><circle cx="32" cy="28" r="1" fill="white"/><circle cx="14" cy="32" r="1.5" fill="yellow"/></svg>');
  background-repeat: repeat;
  color: #00FF00;
  font-family: "Times New Roman", serif;
}`,
    `/* Marquee scroller */
.geo-marquee {
  background: #FF0000;
  color: #FFFF00;
  padding: 4px;
  font-family: "Impact", sans-serif;
  font-size: 18px;
  overflow: hidden; white-space: nowrap;
}
.geo-marquee span {
  display: inline-block;
  padding-left: 100%;
  animation: marq 12s linear infinite;
}
@keyframes marq { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }`,
    `/* Hit counter LED-look */
.geo-counter {
  background: #000;
  color: #00FF00;
  font-family: "Courier New", monospace;
  font-size: 24px;
  padding: 4px 8px;
  display: inline-block;
  border: 2px inset #C0C0C0;
  letter-spacing: 4px;
}
.geo-counter::before { content: "VISITORS: "; color: #FFFF00; font-size: 14px; }`,
    `/* Under construction */
.geo-construction {
  display: inline-flex; align-items: center; gap: 8px;
  background: #FFA500; color: #000;
  padding: 6px 12px;
  font-family: "Impact", sans-serif;
  text-transform: uppercase;
  border: 3px ridge #C0C0C0;
}
.geo-construction::before { content: "⚠"; font-size: 24px; }
.geo-construction::after { content: "⚠"; font-size: 24px; animation: blink 1s steps(2) infinite; }
@keyframes blink { to { visibility: hidden; } }`,
  ],

  successLooksLike: [
    "An archived 1999 GeoCities personal homepage from the Wayback Machine",
    "oneterabyteofkilobytemagazine tumblr archives",
    "An Angelfire 'starter page' from 2000",
  ],

  failureLooksLike: [
    "Clean modern retro homage with one pixel font",
    "Single muted palette claiming to be 'GeoCities-inspired'",
    "No animated GIFs, no marquee, no chaos",
  ],

  overrideGlobalRules: [
    "Multiple clashing fonts (Comic Sans + Impact + Times) are REQUIRED — overrides cohesive typography guidance.",
    "Tiled background images are REQUIRED — overrides flat-color background guidance.",
    "Animated GIF / marquee / blink elements are REQUIRED — overrides 'subtle motion' guidance.",
    "Fixed-width table layouts are the genre — overrides modern responsive grid expectations.",
  ],

  tile: "tile-geocities",
  tileHTML: `
    <div class="marq"><span>★★★ WELCOME TO MY HOMEPAGE!!! ★★★</span></div>
    <div class="word">My <em>Awesome</em> Page</div>
    <div class="ctr">VISITORS: 00428</div>
    <div class="cnst">⚠ UNDER CONSTRUCTION ⚠</div>
  `,
});

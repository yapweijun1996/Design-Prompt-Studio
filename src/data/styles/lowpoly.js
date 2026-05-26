import { asFullPreset } from "./compact.js";

export const lowpoly = asFullPreset({
  id: "lowpoly",
  name: "Low-Poly 3D",
  tag: "Polygon · PS1 · gradient",
  desc: "Low-polygon 3D aesthetic. Flat-shaded geometry. Crystals + nostalgia. PS1 era + Mass Effect / Monument Valley register.",

  feel: "Booting a PS1 in 1998 — angular characters, flat-shaded crystals, gradient sky — not a modern site with one chrome ball cosplaying as 3D.",

  references: "PS1 era games (FF7, Crash Bandicoot, MGS), early Tomb Raider, Monument Valley 1 & 2, Alto's Odyssey, Mass Effect codex art, vapor 3D aesthetic by Bobby Pin, Daniel Arsham crystals",

  boldFactor: [
    "Visible polygon facets — never smooth surfaces; flat-shaded triangles",
    "Limited color: 2-3 saturated gradients across faces (no realistic lighting)",
    "Crystalline / geometric subject matter (mountains, crystals, isometric architecture)",
    "Cinematic horizon / sky gradient backdrop (sunset purple → coral, dusk teal)",
    "Subtle film grain + chromatic-aberration overlay for nostalgia",
    "Display type: angular sans (Druk, Univers Condensed) or pixel-perfect glyphs",
    "Minimal UI chrome — subject art is hero, text is small + utility",
  ],

  tokens: {
    "bg":      { value: "#1A1430", usage: "Dusk purple sky" },
    "bg-2":    { value: "#FF7B72", usage: "Coral horizon gradient stop" },
    "fg":      { value: "#F5EBE6", usage: "Cream text" },
    "muted":   { value: "#B3A8C0", usage: "Lilac caption" },
    "crystal": { value: "#7BB6FF", usage: "Crystal blue facet" },
    "mountain":{ value: "#3D2E66", usage: "Mountain dark facet" },
    "accent":  { value: "#FFD580", usage: "Sun glow accent" },
  },

  typography: {
    display: '"Druk", "Univers Condensed", "Bebas Neue", "Anton", sans-serif',
    body:    '"Söhne", "Inter", system-ui, sans-serif',
    mono:    '"VT323", "Courier New", monospace',
    scale:   "12/14/16/20/32/56/96/160",
    weight:  "display 700-900 · body 400-500",
    tracking: "display tight · pixel display normal",
  },

  antiPatterns: [
    { name: "Smooth 3D ball",     dont: "use realistic shaded spheres", why: "Low-poly = visible facets; smooth shading kills the era" },
    { name: "Realistic lighting", dont: "use raytrace shadows", why: "Flat shading per polygon, 2-3 colors max — never gradient mesh" },
    { name: "Modern UI chrome",   dont: "overlay a SaaS sidebar", why: "Subject art is hero; UI is minimal pixel-utility" },
    { name: "Photoreal subject",  dont: "render realistic people / cars", why: "Stylized geometric subject (crystal, mountain, isometric room)" },
  ],

  responsive: [
    { element: "Hero 3D scene",   mobile: "100vw 70vh", tablet: "100vw 80vh", desktop: "100vw 100vh" },
    { element: "Display type",    mobile: "44px",  tablet: "80px",  desktop: "160px" },
  ],

  snippets: [
    `/* Dusk sky gradient backdrop */
.lp-sky { background: linear-gradient(180deg, #1A1430 0%, #4A2A66 35%, #FF7B72 75%, #FFD580 100%); min-height: 100vh; padding: 64px 32px; position: relative; }
.lp-sky::after { content: ""; position: absolute; inset: 0; background-image: radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.15) 100%); pointer-events: none; }`,
    `/* Low-poly mountain SVG */
.lp-mountain { width: 100%; height: 320px; color: #3D2E66; }
/* Inside use <svg><polygon points="..." fill="#3D2E66"/><polygon points="..." fill="#7BB6FF"/></svg> with explicit triangles + 2-3 fill colors */`,
    `/* Film grain overlay */
.lp-grain::after {
  content: "";
  position: absolute; inset: 0;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.9"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.18 0"/></filter><rect width="200" height="200" filter="url(%23g)"/></svg>');
  pointer-events: none; mix-blend-mode: overlay;
}`,
  ],

  successLooksLike: [
    "Monument Valley loading screen",
    "PS1 era FF7 backgrounds",
    "Alto's Odyssey hero shot",
  ],

  failureLooksLike: [
    "Smooth realistic 3D ball labeled 'low-poly'",
    "Modern SaaS UI with one geometric icon",
  ],

  tile: "tile-lowpoly",
  tileHTML: `
    <div class="sky"></div>
    <svg class="m" viewBox="0 0 100 60" preserveAspectRatio="none">
      <polygon points="0,60 20,35 35,50 50,20 65,45 80,30 100,55 100,60" fill="#3D2E66"/>
      <polygon points="35,50 50,20 65,45 50,60" fill="#7BB6FF" opacity="0.6"/>
    </svg>
    <div class="word">ALTO</div>
  `,
});

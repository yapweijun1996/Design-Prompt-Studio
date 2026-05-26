import { asFullPreset } from "./compact.js";

export const brutalmod = asFullPreset({
  id: "brutalmod",
  name: "Brutalist-Modern (Y2K × Brutalist)",
  tag: "Chrome · raw · GenZ",
  desc: "Y2K chrome + brutalist rawness. Gen Z designer aesthetic. Sucia Studio / Brockmann revival / NSS magazine / hyperpop covers register.",

  feel: "A 2024 Gen-Z designer's portfolio that loves both 1998 Y2K chrome AND 2018 web-brutalism — the page glitches between iridescent gradients and raw HTML chunks — not a clean SaaS pretending to be edgy.",

  references: "Sucia Studio, NSS Magazine, hyperpop album covers (100 gecs, SOPHIE), Bloodbath labels, Marbled.html aesthetic, Diesel SS24, Heaven by Marc Jacobs, late Telfar lookbooks",

  boldFactor: [
    "Iridescent / chrome gradients (silver / oil-slick / blue-pink shift)",
    "Raw HTML chunks: visible borders, default form controls, monospace blocks",
    "Headline type: heavy display sans (Druk, Migra) + glitch / liquid-chrome treatment",
    "Saturated y2k accent (electric blue, lime, hot pink) over near-black or chrome bg",
    "Animation: subtle hover-liquid, marquee, autoplay-vibe (without actual MIDI)",
    "Layout breaks: overlapping z-stacks, asymmetric chunks, intentionally awkward",
    "Mono labels everywhere: file paths, version numbers, '/static/v04/img/' aesthetic",
  ],

  tokens: {
    "bg":      { value: "#0A0A0A", usage: "Page near-black" },
    "chrome":  { value: "linear-gradient(135deg, #C0C0E0 0%, #80FFEA 35%, #FFB7E6 65%, #FFD580 100%)", usage: "Iridescent chrome gradient" },
    "fg":      { value: "#F5F5F5", usage: "Primary text" },
    "muted":   { value: "#888899", usage: "Secondary" },
    "neon":    { value: "#00FFD0", usage: "Electric cyan accent" },
    "pink":    { value: "#FF3F94", usage: "Hot pink accent" },
    "border":  { value: "#FFFFFF", usage: "Hard 1px white borders on dark" },
  },

  typography: {
    display: '"Druk Wide", "Migra", "GT America Extended", "Bebas Neue", sans-serif',
    body:    '"Söhne Mono", "JetBrains Mono", monospace',
    mono:    '"JetBrains Mono", "Geist Mono", monospace',
    scale:   "10/11/12/14/16/22/48/120",
    weight:  "display 800-900 · body 400-500 (mono) · mono 400",
    tracking: "display very tight (-0.04em) · mono normal",
  },

  antiPatterns: [
    { name: "Polished SaaS",      dont: "use clean Inter + soft shadows", why: "Brutalist-modern is intentionally rough; polish kills it" },
    { name: "Only Y2K",           dont: "use only chrome + bubble UI", why: "Hybrid: chrome + raw HTML brutalism, both visible" },
    { name: "Only brutalist",     dont: "use only black-and-yellow brutalism", why: "Hybrid: brutalism + Y2K chrome, both visible" },
    { name: "Smooth gradients",   dont: "use SaaS-style subtle gradients", why: "Iridescent oil-slick chrome is the gradient vocabulary" },
    { name: "Stock sans body",    dont: "use Inter for body", why: "Mono body (Söhne Mono / JB Mono) is part of the rough register" },
  ],

  responsive: [
    { element: "Display",         mobile: "44px",  tablet: "80px",  desktop: "120px" },
    { element: "Section padding", mobile: "16px",  tablet: "32px",  desktop: "48px" },
    { element: "Chrome shape",    mobile: "80px",  tablet: "160px", desktop: "240px" },
  ],

  snippets: [
    `/* Iridescent chrome text */
.brutal-chrome {
  background: linear-gradient(135deg, #C0C0E0 0%, #80FFEA 35%, #FFB7E6 65%, #FFD580 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-family: "Druk Wide", "Migra", sans-serif;
  font-weight: 900;
  font-size: 120px;
  line-height: 0.9;
  letter-spacing: -0.04em;
}`,
    `/* Raw HTML chunk */
.brutal-chunk { border: 1px solid #FFFFFF; padding: 16px; background: #0A0A0A; font-family: "JetBrains Mono", monospace; font-size: 14px; color: #F5F5F5; }
.brutal-chunk .path { color: #00FFD0; font-size: 11px; margin-bottom: 8px; letter-spacing: 0.04em; }
.brutal-chunk input, .brutal-chunk button, .brutal-chunk select { background: #1A1A1A; border: 1px solid #FFFFFF; color: #F5F5F5; padding: 4px 8px; font-family: inherit; font-size: 12px; }`,
    `/* Liquid chrome shape */
.brutal-shape {
  width: 200px; height: 200px;
  background: linear-gradient(135deg, #C0C0E0 0%, #80FFEA 35%, #FFB7E6 65%, #FFD580 100%);
  filter: blur(0.3px) contrast(1.1);
  border-radius: 50%;
  animation: chrome-shift 8s ease-in-out infinite alternate;
}
@keyframes chrome-shift { from { transform: scale(1) rotate(0deg); } to { transform: scale(1.1) rotate(20deg); } }`,
  ],

  successLooksLike: [
    "Sucia Studio's portfolio",
    "100 gecs album landing",
    "Diesel SS24 campaign site",
  ],

  failureLooksLike: [
    "Clean SaaS landing with one chrome shape bolted on",
    "Y2K-only Frutiger Aero with no brutalist edge",
    "Pure brutalism with no iridescent chrome",
  ],

  tile: "tile-brutalmod",
  tileHTML: `
    <div class="word">RAW<br/>CHROME</div>
    <div class="shape"></div>
    <div class="chunk">/static/v04/img/asset_42.png</div>
  `,
});

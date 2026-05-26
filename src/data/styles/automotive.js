import { asFullPreset } from "./compact.js";

export const automotive = asFullPreset({
  id: "automotive",
  name: "EV / Automotive",
  tag: "Spec · configure · cinematic",
  desc: "Cinematic vehicle hero. Configurator + spec sheet + range estimator. Tesla / Rivian / Lucid / Polestar register.",

  feel: "Configuring a Rivian R1S at midnight — full-bleed truck driving through Patagonia, then a clean configurator with battery / wheels / interior — not a 2008 car-brand site with rotating thumbnail slider.",

  references: "Tesla, Rivian, Lucid Motors, Polestar, Genesis, BMW i, Mercedes EQ, Porsche.com",

  boldFactor: [
    "Cinematic full-bleed hero: vehicle in landscape, often video, no UI overlay",
    "Configurator: paint / wheels / interior / range / drive — image updates live",
    "Spec sheet: 0-60, range, charge time, ground clearance, towing — minimalist table",
    "Estimated-range slider tied to weather / load / driving style",
    "Reservation / pre-order CTA prominent; financing options secondary",
    "Restrained automotive palette: matte black + cream + ONE accent color (brand specific)",
  ],

  tokens: {
    "bg":      { value: "#FFFFFF", usage: "Page white (configurator)" },
    "bg-dark": { value: "#0A0A0A", usage: "Cinematic backdrop" },
    "fg":      { value: "#0F0F0F", usage: "Body" },
    "muted":   { value: "#6B6B6B", usage: "Spec label" },
    "brand":   { value: "#0046AD", usage: "Polestar blue (or Rivian green #1FB573)" },
    "accent":  { value: "#C9A24B", usage: "Champagne accent" },
    "border":  { value: "#E0E0E0", usage: "Border" },
  },

  typography: {
    display: '"Polestar Unica", "Söhne", "Helvetica Now", system-ui',
    body:    '"Söhne", "Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "11/12/14/16/20/32/56/96",
    weight:  "display 300-500 (light is the register) · body 400 · numbers tabular",
    tracking: "display tight (-0.025em) · numbers tabular",
  },

  antiPatterns: [
    { name: "Carousel hero",     dont: "use auto-rotating thumbnail slider", why: "Modern EV hero = single cinematic video, no rotation" },
    { name: "Heavy display",    dont: "use 800-weight headlines", why: "Polestar / Tesla lean LIGHT (300-500); heavy reads as 2008 brochure" },
    { name: "Marketing dealer-speak", dont: "use 'unbeatable financing offers'", why: "Voice: 'Range from 314 mi · 0-60 in 3.0s · Reserve $100'" },
    { name: "Stock car-on-road photo", dont: "use Shutterstock car-driving stock", why: "Brand-shot cinematography (in landscape, often slow-mo) is the genre" },
    { name: "Vibrant palette",  dont: "use bright multi-color brand", why: "Automotive luxury = restraint — matte black + cream + ONE accent" },
  ],

  responsive: [
    { element: "Hero film",      mobile: "70vh", tablet: "90vh", desktop: "100vh" },
    { element: "Configurator",   mobile: "stack", tablet: "split", desktop: "split 60/40" },
    { element: "Display type",   mobile: "44px", tablet: "72px", desktop: "96px" },
  ],

  snippets: [
    `/* Cinematic hero */
.auto-hero { position: relative; height: 100vh; overflow: hidden; background: #0A0A0A; }
.auto-hero video { width: 100%; height: 100%; object-fit: cover; }
.auto-hero h1 { position: absolute; bottom: 96px; left: 64px; color: #FFFFFF; font-family: "Polestar Unica", "Söhne", system-ui; font-weight: 300; font-size: 96px; line-height: 1; letter-spacing: -0.025em; }
.auto-hero .meta { position: absolute; bottom: 64px; left: 64px; font-family: "JetBrains Mono", monospace; font-size: 13px; letter-spacing: 0.08em; color: #FFFFFF; }`,
    `/* Spec table */
.spec-table { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; padding: 64px 48px; border-top: 1px solid #E0E0E0; }
.spec-item .num { font-family: "Söhne", system-ui; font-weight: 300; font-size: 56px; color: #0F0F0F; line-height: 1; font-variant-numeric: tabular-nums; letter-spacing: -0.025em; }
.spec-item .unit { font-size: 16px; color: #6B6B6B; }
.spec-item .label { font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: #6B6B6B; margin-top: 12px; }`,
    `/* Configurator option row */
.config-row { display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid #E0E0E0; }
.config-swatch { width: 48px; height: 48px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; }
.config-swatch.selected { border-color: #0F0F0F; }`,
  ],

  successLooksLike: [
    "Rivian R1S configurator + cinematic hero",
    "Polestar 3 hero film + spec sheet",
  ],

  failureLooksLike: [
    "Carousel hero with 6 rotating product thumbnails",
    "Heavy 800-weight font + dealer-speak copy",
  ],

  tile: "tile-automotive",
  tileHTML: `
    <div class="film"></div>
    <div class="word">R1S</div>
    <div class="meta">314 MI · 0-60 IN 3.0s</div>
  `,
});

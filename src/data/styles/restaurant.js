import { asFullPreset } from "./compact.js";

export const restaurant = asFullPreset({
  id: "restaurant",
  name: "Restaurant Warm",
  tag: "Appetite · serif · food",
  desc: "Warm cream + deep red/forest. Food photography. Menu-as-typography. Eleven Madison Park / Noma / Carbone register.",

  feel: "Reading a printed dinner menu at a candlelit restaurant — appetite-warm, generous serifs, photograph of the plate is a still life — not Yelp listing a pizza place.",

  references: "Eleven Madison Park, Noma, Carbone NYC, The French Laundry, Atomix, Sushi Saito, Atelier Crenn, Quintonil",

  boldFactor: [
    "Warm cream / linen background — never pure white",
    "Deep accent: oxblood red, forest green, or aubergine",
    "Big editorial serif (Tiempos, Canela, Bodoni) for course names",
    "Menu typography: course name + provenance line + price — three-line composition",
    "Single hero food photograph — overhead shot, dark background, plate centered",
    "Reservation widget prominent in the header",
    "Sommelier-style copy: provenance, season, technique, story",
  ],

  tokens: {
    "bg":      { value: "#F4EFE3", usage: "Warm linen" },
    "bg-alt":  { value: "#EBE3D3", usage: "Section alt — wheat" },
    "fg":      { value: "#1F1612", usage: "Espresso ink body" },
    "muted":   { value: "#6E5E54", usage: "Caption / provenance" },
    "accent":  { value: "#6B1A1A", usage: "Oxblood red — links, accents" },
    "gold":    { value: "#B89D63", usage: "Stars, awards" },
    "rule":    { value: "#D7CCB7", usage: "Hairline rule" },
  },

  typography: {
    display: '"Canela Deck", "Tiempos Headline", "Bodoni Moda", serif',
    body:    '"Tiempos Text", "Source Serif 4", Georgia, serif',
    mono:    '"Söhne Mono", monospace',
    scale:   "12/13/14/16/20/28/40/64',",
    weight:  "display 400-500 · body 400 · italic for provenance",
    tracking: "display open (0.02em) · italic accents",
  },

  antiPatterns: [
    { name: "Cold tech palette",   dont: "use SaaS Inter + grey", why: "Restaurants live on appetite warmth; cold palette kills the craving" },
    { name: "Casual sans menu",    dont: "render the menu in Inter", why: "Menu = serif typography is the dining culture; sans reads as cafe-chain" },
    { name: "Stock food photo",    dont: "use bright lit-by-flash food photography", why: "Moody, low-key, overhead food shots are the genre" },
    { name: "Loud CTAs",           dont: "use 'BOOK NOW' all caps neon", why: "Reservation CTA is small, elegant, served — never shouted" },
    { name: "Spec listing",        dont: "treat dishes like product cards with badges", why: "Each dish is a paragraph of provenance — not a SKU" },
  ],

  responsive: [
    { element: "Section padding", mobile: "32px",  tablet: "64px",  desktop: "96px" },
    { element: "Hero serif",      mobile: "36px",  tablet: "52px",  desktop: "64px" },
    { element: "Menu item",       mobile: "1col",  tablet: "1col",  desktop: "2col grid" },
  ],

  snippets: [
    `/* Menu item — course / provenance / price */
.menu-item { display: grid; grid-template-columns: 1fr auto; gap: 24px; padding: 20px 0; border-bottom: 1px solid #D7CCB7; }
.menu-item .name { font-family: "Canela Deck", "Tiempos Headline", serif; font-size: 22px; font-weight: 500; color: #1F1612; letter-spacing: 0.01em; }
.menu-item .prov { font-family: "Tiempos Text", serif; font-style: italic; font-size: 14px; color: #6E5E54; line-height: 1.4; margin-top: 4px; max-width: 48ch; }
.menu-item .price { font-family: "Tiempos Text", serif; font-size: 16px; color: #6B1A1A; font-variant-numeric: tabular-nums; }`,
    `/* Hero food shot, dark plate */
.hero-plate { background: #1F1612; padding: 96px 24px; text-align: center; color: #F4EFE3; }
.hero-plate img { max-width: 480px; width: 100%; height: auto; mix-blend-mode: lighten; }
.hero-plate h1 { font-family: "Canela Deck", serif; font-weight: 400; font-size: 64px; margin: 32px 0 8px; letter-spacing: 0.02em; }
.hero-plate .tagline { font-style: italic; color: #B89D63; font-size: 16px; }`,
    `/* Reservation strip */
.reserve { display: inline-flex; align-items: center; gap: 8px; padding: 12px 20px; background: transparent; border: 1px solid #1F1612; color: #1F1612; font-family: "Tiempos Text", serif; font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none; }
.reserve:hover { background: #1F1612; color: #F4EFE3; }`,
  ],

  successLooksLike: [
    "Eleven Madison Park's menu page",
    "Noma's reservation landing",
    "Carbone NYC's homepage with red velvet warmth",
  ],

  failureLooksLike: [
    "Bootstrap restaurant template with carousel + 'BOOK NOW'",
    "Bright stock-photo pasta-on-white-plate hero",
    "Sans-serif menu rendered as a price list",
  ],

  tile: "tile-restaurant",
  tileHTML: `
    <div class="head">Tasting Menu</div>
    <div class="sub">Eight courses, evolving with the season.</div>
    <div class="row"><span class="nm">Oyster, kelp, finger lime</span><span class="pr">—</span></div>
    <div class="row"><span class="nm">Hand-cut tagliolini, truffle</span><span class="pr">—</span></div>
    <div class="row"><span class="nm">Wagyu, smoked beet, jus</span><span class="pr">—</span></div>
  `,
});

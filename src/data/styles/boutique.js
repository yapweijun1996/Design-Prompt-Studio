import { asFullPreset } from "./compact.js";

export const boutique = asFullPreset({
  id: "boutique",
  name: "Boutique Lux",
  tag: "Editorial · serif · whitespace",
  desc: "Big editorial photography. Sparse serif type. Generous whitespace. Net-a-Porter / Aesop / SSENSE register.",

  feel: "Browsing Aesop's site for hand wash — calm, considered, every product framed like a museum object — not Amazon trying to sell luxury.",

  references: "Aesop, Net-a-Porter, SSENSE, MR PORTER, Mytheresa, Goop, La Garçonne, Acne Studios",

  boldFactor: [
    "Photography is 70% of the page — full-bleed, oversized, considered crop",
    "Sparse editorial serif (Tiempos, Söhne Mono accents) for product names",
    "Single product per fold — never a grid of 24 SKUs",
    "Off-white background (#FAF8F3 / #F5F1EA), never pure white",
    "Cinema-credit type styling: product name + size + price stacked, all-lowercase or small-caps",
    "Hairline thin everything (1px) — borders, lines, dividers",
    "Mostly text + image: no badges, no countdown, no urgency theater",
  ],

  tokens: {
    "bg":      { value: "#FAF8F3", usage: "Off-white paper" },
    "bg-alt":  { value: "#F5F1EA", usage: "Section alt — slightly deeper warm" },
    "fg":      { value: "#1A1815", usage: "Near-black ink" },
    "muted":   { value: "#7A736A", usage: "Captions, metadata" },
    "accent":  { value: "#3D2914", usage: "Espresso brown for emphasis (rare)" },
    "rule":    { value: "#D8D2C5", usage: "Hairline rule" },
  },

  typography: {
    display: '"Tiempos Headline", "Söhne", "Söhne Mono", serif',
    body:    '"Söhne", "Inter", system-ui, sans-serif',
    mono:    '"Söhne Mono", "JetBrains Mono", monospace',
    scale:   "11/12/14/16/22/32/48/72",
    weight:  "display 400-500 · body 400 · small-caps for product names",
    tracking: "display open (0.02em) · body normal · small-caps wider (0.08em)",
  },

  antiPatterns: [
    { name: "Product grid 8x",   dont: "show 24+ products in a tight grid", why: "Lux = one product per fold; abundance feels like a flea market" },
    { name: "Sale badges",       dont: "stamp 'SALE -40%' on cards", why: "Discount theater destroys the lux register — sale = single mention, end of page" },
    { name: "Vibrant brand color", dont: "use saturated brand red/blue", why: "Off-white + ink black + one earthy accent; saturation reads cheap" },
    { name: "Stock product shots", dont: "use white-background packshot", why: "Editorial photography (model, environment, still life) is the brand" },
    { name: "Marketing exclamation", dont: "write 'Shop the sale!'", why: "Voice: 'AW25 edit, now available' — declarative, not exclamatory" },
  ],

  responsive: [
    { element: "Section padding", mobile: "32px",  tablet: "80px",  desktop: "120px" },
    { element: "Hero serif",      mobile: "36px",  tablet: "56px",  desktop: "72px" },
    { element: "Image height",    mobile: "120vw", tablet: "85vh",  desktop: "90vh" },
  ],

  snippets: [
    `/* Full-bleed editorial photograph */
.editorial-shot { width: 100%; height: 90vh; object-fit: cover; display: block; background: #F5F1EA; }
.editorial-caption { font-family: "Söhne Mono", monospace; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: #7A736A; padding: 12px 0; }`,
    `/* Product name — cinema-credit stack */
.product-meta { font-family: "Söhne", system-ui; font-size: 13px; line-height: 1.6; }
.product-name { font-family: "Tiempos Headline", serif; font-size: 22px; font-weight: 400; letter-spacing: 0.01em; margin-bottom: 8px; }
.product-price { font-variant-numeric: tabular-nums; letter-spacing: 0.04em; }`,
    `/* Hairline navigation underline */
nav a { color: #1A1815; text-decoration: none; padding: 0 12px; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; border-bottom: 1px solid transparent; }
nav a:hover { border-bottom-color: #1A1815; }`,
  ],

  successLooksLike: [
    "Aesop product page — single bottle, editorial environment",
    "Net-a-Porter editorial story",
    "SSENSE product page — full-bleed model shot",
  ],

  failureLooksLike: [
    "Shopee grid applied to a luxury catalogue",
    "Yellow buy-button on a 1,200 SGD coat",
    "Countdown timer + sale badge on a designer item",
  ],

  tile: "tile-boutique",
  tileHTML: `
    <div class="img"></div>
    <div class="cap">RESURRECTION AROMATIQUE HAND WASH</div>
    <div class="nm">No. 04</div>
    <div class="pr">SGD 47</div>
  `,
});

import { asFullPreset } from "./compact.js";

export const marketplace = asFullPreset({
  id: "marketplace",
  name: "Marketplace Vibrant",
  tag: "Orange · grid · busy",
  desc: "Hot orange + red. Dense product grid. Price tags everywhere. Shopee / Lazada / TikTok Shop SEA register.",

  feel: "Opening Shopee on a 10.10 sale day in Jakarta — loud, fast, every pixel screams 'buy now' — not a Western minimal e-comm site pretending to be a marketplace.",

  references: "Shopee, Lazada, TikTok Shop, Tokopedia, Bukalapak, JD.com, Tmall, Taobao",

  boldFactor: [
    "Hot orange / red brand color (#EE4D2D Shopee orange OR #FF0000 marketplace red) as everything",
    "Dense 6-8 column product grid on desktop, 2-3 on mobile",
    "Big visible price + slashed-out original price + % off badge on EVERY card",
    "Flash-sale banner with countdown timer (HH:MM:SS) on hero",
    "Rating stars + sold-count + free-shipping pill stacked under each price",
    "Stacked promo strips: coins, vouchers, free shipping, cashback",
    "Category icon row across the top — 8-12 colorful round icons",
  ],

  tokens: {
    "bg":      { value: "#F5F5F5", usage: "Page grey" },
    "surface": { value: "#FFFFFF", usage: "Product card" },
    "fg":      { value: "#222222", usage: "Body text" },
    "muted":   { value: "#757575", usage: "Secondary text" },
    "brand":   { value: "#EE4D2D", usage: "Shopee-style orange — primary CTA, price" },
    "discount":{ value: "#FFD600", usage: "Discount badge yellow" },
    "free":    { value: "#26AA99", usage: "Free shipping pill green" },
    "border":  { value: "#E5E5E5", usage: "Card border" },
  },

  typography: {
    display: '"Roboto", "Inter", system-ui',
    body:    '"Roboto", "Inter", system-ui, sans-serif',
    mono:    '"Roboto Mono", monospace',
    scale:   "10/11/12/13/14/16/20/28",
    weight:  "display 500-700 · body 400 · price 600-700",
    tracking: "tight on prices",
  },

  antiPatterns: [
    { name: "Minimal whitespace", dont: "use 96px padding around product grid", why: "Marketplaces = density; whitespace = wasted opportunity to surface SKUs" },
    { name: "Neutral palette",    dont: "use grey-on-white minimal styling", why: "Hot orange/red IS the marketplace register — neutral reads as Western boutique" },
    { name: "One product hero",   dont: "feature one product like Apple.com", why: "Show 24-48 products above the fold — variety is the value prop" },
    { name: "No social proof",    dont: "hide rating / sold-count", why: "Stars + sold-count drive purchase — front-and-center on every card" },
    { name: "Plain price",        dont: "show only the sale price", why: "Strikethrough original + % off badge IS the discount theater" },
  ],

  responsive: [
    { element: "Product grid cols", mobile: "2",     tablet: "4",     desktop: "6" },
    { element: "Card padding",      mobile: "6px",   tablet: "8px",   desktop: "10px" },
    { element: "Hero banner",       mobile: "120px", tablet: "180px", desktop: "240px" },
  ],

  snippets: [
    `/* Product card */
.product-card { background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 4px; overflow: hidden; position: relative; }
.product-card .img { aspect-ratio: 1/1; background: #F5F5F5; }
.product-card .name { font-size: 13px; line-height: 1.3; padding: 6px 8px 0; color: #222; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.product-card .price { color: #EE4D2D; font-weight: 700; font-size: 16px; padding: 4px 8px; }
.product-card .price .was { color: #999; font-size: 11px; text-decoration: line-through; font-weight: 400; margin-left: 4px; }
.product-card .meta { font-size: 11px; color: #757575; padding: 0 8px 6px; display: flex; gap: 4px; }`,
    `/* Discount corner badge */
.badge-discount { position: absolute; top: 0; right: 0; background: #FFD600; color: #EE4D2D; font-weight: 700; font-size: 11px; padding: 2px 6px; border-radius: 0 0 0 4px; }
.badge-free { background: #26AA99; color: #FFFFFF; font-size: 10px; padding: 1px 4px; border-radius: 2px; }`,
    `/* Flash-sale countdown */
.flash-banner { background: linear-gradient(90deg, #EE4D2D, #F53D2D); color: #FFFFFF; padding: 8px 12px; display: flex; align-items: center; gap: 8px; }
.flash-timer { font-family: "Roboto Mono", monospace; font-weight: 700; background: #000; padding: 4px 6px; border-radius: 4px; }`,
  ],

  successLooksLike: [
    "Shopee homepage on a 9.9 sale day",
    "Lazada Birthday campaign landing",
    "TikTok Shop category page with creator videos",
  ],

  failureLooksLike: [
    "Aesop / Net-a-Porter minimalism applied to a marketplace",
    "Single-product hero with whitespace",
    "Greyscale price tags",
  ],

  tile: "tile-marketplace",
  tileHTML: `
    <div class="flash">⚡ FLASH SALE · 02:14:07</div>
    <div class="grid">
      <div class="prod"><div class="img"></div><div class="p">$4.<small>90</small></div><div class="was">$12</div></div>
      <div class="prod hl"><div class="img"></div><div class="p">$9.<small>90</small></div><div class="was">$25</div></div>
      <div class="prod"><div class="img"></div><div class="p">$2.<small>50</small></div><div class="was">$8</div></div>
    </div>
  `,
});

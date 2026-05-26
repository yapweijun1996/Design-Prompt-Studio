import { asFullPreset } from "./compact.js";

export const utility = asFullPreset({
  id: "utility",
  name: "Utility Retail",
  tag: "Information · dense · Amazon",
  desc: "Information-first. Tabbed nav. Yellow CTA. Reviews-prominent. Amazon / Newegg / Walmart register.",

  feel: "Logging into Amazon to buy a USB cable — pure utility, every link is functional, ugly is fine — not a brand boutique masquerading as a megastore.",

  references: "Amazon, Newegg, Walmart.com, BestBuy, eBay, Aliexpress, Costco.com, Home Depot",

  boldFactor: [
    "Function over form: brand color (Amazon orange #FF9900) used for CTAs only",
    "Sticky top bar: deliver-to, search (huge), account, cart — never collapses",
    "Tabbed product page: Description / Specs / Reviews / Q&A",
    "Reviews block dominates the page: star histogram + verified-purchase + helpful votes",
    "Specs as a key:value table (NOT bullet list) — comparable to other listings",
    "Add-to-cart yellow gradient button (#FFD814 → #F7CA00) — instantly recognizable",
    "Bundle/frequently-bought-together carousel below the fold",
  ],

  tokens: {
    "bg":       { value: "#FFFFFF", usage: "Page white" },
    "header":   { value: "#131921", usage: "Amazon-style dark header" },
    "subheader":{ value: "#232F3E", usage: "Secondary nav band" },
    "fg":       { value: "#0F1111", usage: "Body text" },
    "muted":    { value: "#565959", usage: "Secondary" },
    "brand":    { value: "#FF9900", usage: "Amazon orange — link accent" },
    "cta":      { value: "#FFD814", usage: "Buy button yellow" },
    "price":    { value: "#B12704", usage: "Price red" },
    "border":   { value: "#DDDDDD", usage: "Hairline border" },
  },

  typography: {
    display: '"Amazon Ember", "Inter", "Arial", system-ui',
    body:    '"Amazon Ember", "Inter", "Arial", system-ui, sans-serif',
    mono:    '"Menlo", monospace',
    scale:   "11/12/13/14/16/18/24/28",
    weight:  "display 500-700 · body 400 · price 400 (size carries weight)",
    tracking: "normal — Amazon Ember was designed for screen density",
  },

  antiPatterns: [
    { name: "Pretty marketing hero",  dont: "use a full-bleed lifestyle image", why: "Utility retail = search bar + listings, not lifestyle imagery" },
    { name: "Minimal product page",   dont: "show only image + title + price", why: "Specs, reviews, Q&A are the conversion drivers — show them all" },
    { name: "Centered hero copy",     dont: "use centered 'Welcome to our store' hero", why: "Utility = density; centered hero copy wastes the fold" },
    { name: "Brand-color CTAs only",  dont: "make every button brand orange", why: "Yellow gradient buy button is sacred — orange is for links only" },
    { name: "Hidden reviews",         dont: "tuck reviews behind a 'See more' fold", why: "Reviews block must dominate; that's the trust mechanic" },
  ],

  responsive: [
    { element: "Header height",  mobile: "60px",  tablet: "60px",  desktop: "60px" },
    { element: "Product cols",   mobile: "1",     tablet: "2",     desktop: "1 (detail) or 4 (list)" },
    { element: "Search bar",     mobile: "100%",  tablet: "100%",  desktop: "50% of header" },
  ],

  snippets: [
    `/* Top bar */
.topbar { background: #131921; color: #FFFFFF; padding: 8px 16px; display: flex; gap: 12px; align-items: center; height: 60px; position: sticky; top: 0; z-index: 50; }
.topbar .search { flex: 1; display: flex; height: 38px; border-radius: 4px; overflow: hidden; }
.topbar .search input { flex: 1; border: 0; padding: 0 12px; font-size: 14px; }
.topbar .search button { background: #FF9900; border: 0; padding: 0 16px; cursor: pointer; }`,
    `/* Buy button — yellow gradient */
.btn-buy { background: linear-gradient(180deg, #F7DFA5 0%, #F0C14B 100%); border: 1px solid #A88734; border-radius: 4px; padding: 8px 12px; font-size: 13px; color: #111; cursor: pointer; width: 100%; }
.btn-buy:hover { background: linear-gradient(180deg, #F5D78E 0%, #EEB933 100%); }
.btn-buy--now { background: linear-gradient(180deg, #FFA751 0%, #FF8F00 100%); }`,
    `/* Star rating + count */
.stars { color: #FFA41C; display: inline-flex; gap: 1px; font-size: 14px; }
.review-count { color: #007185; font-size: 13px; margin-left: 6px; text-decoration: none; }
.review-count:hover { color: #C7511F; text-decoration: underline; }`,
  ],

  successLooksLike: [
    "Amazon product detail page",
    "Newegg laptop listing with spec table",
    "Home Depot tool listing with reviews",
  ],

  failureLooksLike: [
    "Apple.com applied to a USB cable listing",
    "Lifestyle hero image with no search bar",
    "All buttons in brand orange (lost CTA hierarchy)",
  ],

  tile: "tile-utility",
  tileHTML: `
    <div class="hdr"><span>amzn</span><span class="srch">Search…</span></div>
    <div class="title">USB-C Cable 6ft, Nylon Braided, 100W</div>
    <div class="stars">★★★★★ <span class="cnt">12,840</span></div>
    <div class="price"><sup>$</sup>9<sup>99</sup></div>
    <div class="buy">Add to Cart</div>
  `,
});

import { asFullPreset } from "./compact.js";

export const cafe = asFullPreset({
  id: "cafe",
  name: "Cafe Cozy",
  tag: "Soft · handwritten · cream",
  desc: "Cream + butter yellow. Hand-drawn type. Pastel illustration. Blue Bottle / Sightglass / independent cafe register.",

  feel: "Walking into a 3rd-wave cafe in Brooklyn on a Sunday — soft, handwritten signage, latte on a wooden tray — not a Starbucks-clone chain store.",

  references: "Blue Bottle Coffee, Sightglass, Verve, Stumptown, La Colombe, Onyx Coffee Lab, Origin Coffee, Joe Coffee NYC",

  boldFactor: [
    "Cream / butter / oat milk palette — warm pastel base",
    "Hand-drawn / hand-set display type (Caveat, La Belle Aurore, custom signpainter)",
    "Soft hand-drawn illustration: coffee cup, bean, leaf, steam swirl",
    "Menu items priced with hand-feel typography ($4 · oat milk +.50)",
    "Origin story / bean source as a section (where the beans come from)",
    "Hours, address, neighborhood photograph in the footer",
    "Cup-of-the-day or seasonal-drink spotlight section",
  ],

  tokens: {
    "bg":      { value: "#FBF6E8", usage: "Oat milk cream" },
    "bg-alt":  { value: "#F4EAD0", usage: "Butter section alt" },
    "fg":      { value: "#3A2A1E", usage: "Espresso brown body" },
    "muted":   { value: "#7A6450", usage: "Caption brown" },
    "accent":  { value: "#C97B30", usage: "Cinnamon orange" },
    "sage":    { value: "#9CB291", usage: "Mint green for fresh" },
    "rule":    { value: "#D9C8A8", usage: "Soft border" },
  },

  typography: {
    display: '"Caveat", "Caveat Brush", "Permanent Marker", cursive',
    body:    '"Fraunces", "Source Serif 4", Georgia, serif',
    mono:    '"Special Elite", "Courier Prime", monospace',
    scale:   "12/14/16/18/24/36/52/72',",
    weight:  "display 400-700 hand · body 400-500 · italic for menu",
    tracking: "display loose (slightly playful) · body normal",
  },

  antiPatterns: [
    { name: "Corporate sans",       dont: "use Inter for the cafe name", why: "Handwritten/hand-set display IS the indie cafe register" },
    { name: "Stock latte art photo", dont: "use generic Shutterstock latte-art shot", why: "Photography should feel of the place — barista's hand, the actual cup" },
    { name: "Aggressive CTAs",      dont: "use 'ORDER NOW' shouty buttons", why: "Voice is calm: 'Order ahead' / 'Visit us' / 'See the menu'" },
    { name: "Bright tech palette",  dont: "use saturated brand colors", why: "Pastel cream/butter/sage IS the warmth; saturation breaks it" },
    { name: "Long marketing copy",  dont: "write paragraphs about coffee science", why: "Short hand-felt sentences. 'Single-origin. Slow-roasted. By us.'" },
  ],

  responsive: [
    { element: "Section padding", mobile: "32px",  tablet: "64px",  desktop: "96px" },
    { element: "Display hand",    mobile: "44px",  tablet: "60px",  desktop: "72px" },
    { element: "Body measure",    mobile: "100%",  tablet: "50ch",  desktop: "56ch" },
  ],

  snippets: [
    `/* Hand-drawn display heading */
.cafe-h1 {
  font-family: "Caveat", "Caveat Brush", cursive;
  font-weight: 600;
  font-size: 72px;
  line-height: 0.95;
  color: #3A2A1E;
  transform: rotate(-1.5deg);
  display: inline-block;
}
.cafe-h1 .accent { color: #C97B30; }`,
    `/* Menu row */
.menu-row { display: grid; grid-template-columns: 1fr auto; gap: 16px; padding: 12px 0; border-bottom: 1px dashed #D9C8A8; font-family: "Fraunces", serif; font-size: 18px; color: #3A2A1E; }
.menu-row .item { font-style: italic; }
.menu-row .price { font-variant-numeric: tabular-nums; color: #7A6450; }`,
    `/* Steam swirl illustration */
.steam { width: 32px; height: 48px; color: #9CB291; }
/* Place as <svg> with two squiggly paths above a coffee cup. */
@keyframes steam-rise { 0% { transform: translateY(4px); opacity: 0.6; } 100% { transform: translateY(-4px); opacity: 1; } }
.steam path { animation: steam-rise 2.4s ease-in-out infinite alternate; }`,
  ],

  successLooksLike: [
    "Blue Bottle Coffee shop page",
    "Sightglass single-origin landing",
    "An indie cafe's hand-illustrated about page",
  ],

  failureLooksLike: [
    "Starbucks marketing landing applied to a small cafe",
    "Corporate sans logo + stock latte photo",
    "All-caps 'ORDER NOW' button on a cafe site",
  ],

  tile: "tile-cafe",
  tileHTML: `
    <div class="steam">≋</div>
    <div class="head">good <em>morning.</em></div>
    <div class="sub">freshly roasted today.</div>
    <div class="row"><span>flat white</span><span>$5</span></div>
    <div class="row"><span>oat latte</span><span>$5.50</span></div>
  `,
});

import { asFullPreset } from "./compact.js";

export const flash = asFullPreset({
  id: "flash",
  name: "Flash Sale Hype",
  tag: "Red · countdown · urgent",
  desc: "Burning red + yellow. Massive countdown timers. Scarcity bars. Pinduoduo / TikTok Shop / Temu register.",

  feel: "Opening Pinduoduo at 8pm hitting refresh during a flash drop — visceral, fast, the page sells urgency itself — not a calm e-comm pretending to be hyped.",

  references: "Pinduoduo, Temu, TikTok Shop live, JD.com 618 campaign, Tmall Double 11, AliExpress Choice, SHEIN flash sales",

  boldFactor: [
    "Burning red gradient (#FF0000 → #FF6B00) as the page atmosphere",
    "Countdown timer at HUGE size (40-60px) — HH:MM:SS pulsing",
    "Scarcity bars: 'Only 3 left at this price!' / progress meter",
    "Stacked discount math: '$29 → $9 (Save 68%)' + 'Extra -10% in cart'",
    "Live activity ticker: 'Sarah from NYC just bought…'",
    "Spin-the-wheel / scratch-card coupon mechanics",
    "Lottery-style font (italic, slanted, almost neon) for headlines",
  ],

  tokens: {
    "bg":      { value: "#FFF4E0", usage: "Warm cream backdrop" },
    "fg":      { value: "#1A0000", usage: "Near-black body" },
    "brand":   { value: "#FF0000", usage: "Burning red — CTA, timer" },
    "brand-2": { value: "#FF6B00", usage: "Orange gradient stop" },
    "yellow":  { value: "#FFCE00", usage: "Discount badge yellow" },
    "discount":{ value: "#B81E1E", usage: "Strikethrough red (deeper)" },
    "border":  { value: "#FFD7A5", usage: "Warm border" },
  },

  typography: {
    display: '"Bebas Neue", "Anton", "Impact", sans-serif',
    body:    '"Roboto", "Inter", system-ui, sans-serif',
    mono:    '"Roboto Mono", monospace',
    scale:   "12/14/16/20/28/40/56/80",
    weight:  "display 700-900 · body 400-500 · price 700",
    tracking: "display tight + italic on numbers",
  },

  antiPatterns: [
    { name: "Calm whitespace",   dont: "use 96px section padding", why: "Hype = density; whitespace kills the urgency atmosphere" },
    { name: "Neutral palette",   dont: "use Aesop-style off-white", why: "Burning red/orange/yellow IS the conversion mechanic" },
    { name: "No countdown",      dont: "show prices without time pressure", why: "Countdown timer is the page — without it, no urgency" },
    { name: "Honest pricing",    dont: "show only the sale price", why: "Strikethrough + extra-discount-in-cart math is the dopamine drop" },
    { name: "Quiet voice",       dont: "write 'Limited time discount available'", why: "Voice: 'GRAB IT NOW · ONLY 3 LEFT · 02:14:07'" },
  ],

  responsive: [
    { element: "Countdown size",  mobile: "32px",  tablet: "44px",  desktop: "56px" },
    { element: "Product grid",    mobile: "2",     tablet: "4",     desktop: "5" },
    { element: "Section padding", mobile: "12px",  tablet: "16px",  desktop: "20px" },
  ],

  snippets: [
    `/* Countdown timer block */
.countdown { display: inline-flex; gap: 6px; font-family: "Bebas Neue", sans-serif; font-size: 56px; line-height: 1; color: #FFF; }
.countdown .unit { background: #1A0000; padding: 8px 12px; border-radius: 6px; min-width: 64px; text-align: center; }
.countdown .sep { color: #FF0000; }
.countdown-label { font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: #FFF; text-align: center; }`,
    `/* Burning hero banner */
.hype-banner { background: linear-gradient(90deg, #FF0000 0%, #FF6B00 100%); color: #FFFFFF; padding: 16px 20px; display: flex; flex-direction: column; align-items: center; text-align: center; }
.hype-banner h1 { font-family: "Bebas Neue", sans-serif; font-size: 56px; letter-spacing: 0.04em; margin: 0; transform: skewX(-6deg); }`,
    `/* Scarcity bar */
.scarcity { background: #FFF4E0; border: 1px solid #FFD7A5; border-radius: 4px; padding: 8px 12px; font-size: 12px; color: #B81E1E; font-weight: 600; }
.scarcity .bar { height: 6px; background: #FFE4C7; border-radius: 3px; overflow: hidden; margin-top: 4px; }
.scarcity .bar > i { display: block; height: 100%; background: linear-gradient(90deg, #FF0000, #FF6B00); width: 87%; }`,
  ],

  successLooksLike: [
    "Pinduoduo flash-sale group-buy page",
    "Temu daily-deal hero",
    "TikTok Shop live with countdown sticker",
  ],

  failureLooksLike: [
    "Aesop minimalism + a small 'sale' badge",
    "Calm timer without color or motion",
    "Whitespace-heavy single-product layout",
  ],

  tile: "tile-flash",
  tileHTML: `
    <div class="hype">FLASH DROP</div>
    <div class="time">02 : 14 : 07</div>
    <div class="prc"><s>$29</s> $9<sup>.90</sup></div>
    <div class="bar"><i></i></div>
    <div class="left">Only 3 left!</div>
  `,
});

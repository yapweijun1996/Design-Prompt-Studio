import { asFullPreset } from "./compact.js";

export const salon = asFullPreset({
  id: "salon",
  name: "Salon / Wellness",
  tag: "Soft · pastel · booking",
  desc: "Soft pastels + cream. Service-list + booking widget. Beauty / spa / wellness. Glossier salon / Aman spa / boutique nail bar register.",

  feel: "Booking a haircut at a curated salon in Tribeca — soft, pastel-warm, the booking widget is two taps — not a corporate Massage Envy chain page.",

  references: "Glossier shops, Drybar, Aman spa pages, Hims & Hers, boutique nail bars, Equinox spa pages, ESPA, Aesop facial spaces",

  boldFactor: [
    "Soft pastel palette: blush, sage, warm cream — never saturated",
    "Service list: name + duration + price + brief description",
    "Booking widget: choose service → choose stylist → choose time slot",
    "Stylist / therapist bio cards with portrait, specialty, years of experience",
    "Editorial 'About / Philosophy' page — the salon as a brand POV",
    "Gallery section: hair / nails / before-and-after — high-craft imagery",
    "Loyalty / membership program with tier benefits",
  ],

  tokens: {
    "bg":      { value: "#FBF7F2", usage: "Warm cream" },
    "bg-alt":  { value: "#F4E8E0", usage: "Section alt — blush" },
    "fg":      { value: "#3A2E2A", usage: "Espresso brown ink" },
    "muted":   { value: "#7A6B65", usage: "Caption muted brown" },
    "accent":  { value: "#D4A5A5", usage: "Dusty pink — CTA, accents" },
    "sage":    { value: "#A5BFA0", usage: "Wellness sage" },
    "rule":    { value: "#E5D8CE", usage: "Soft border" },
  },

  typography: {
    display: '"Fraunces", "Tiempos Headline", Georgia, serif',
    body:    '"Inter", "Söhne", system-ui, sans-serif',
    mono:    '"Söhne Mono", monospace',
    scale:   "12/14/16/18/22/32/48/64",
    weight:  "display 300-500 (italic emphasis) · body 400",
    tracking: "display open (0.02em) · italic in display for warmth",
  },

  antiPatterns: [
    { name: "Aggressive booking CTA", dont: "use 'BOOK NOW' shouty buttons", why: "Voice: 'Reserve a service' / 'Find a stylist' — calm" },
    { name: "Chain-store palette",  dont: "use saturated brand colors", why: "Soft pastel is the boutique salon register; saturated reads chain" },
    { name: "Stock smiling-customer photo", dont: "use generic Shutterstock spa imagery", why: "Show real interiors, real stylists, real work" },
    { name: "Discount theater",     dont: "show '50% off first visit' banner", why: "Loyalty + first-time intro is calmer than discount theater" },
    { name: "Marketing-heavy hero", dont: "open with a 'Welcome to our salon!' banner", why: "Open with service list or booking widget — utility-first" },
  ],

  responsive: [
    { element: "Section padding", mobile: "32px",  tablet: "64px",  desktop: "96px" },
    { element: "Display serif",   mobile: "36px",  tablet: "48px",  desktop: "64px" },
    { element: "Booking widget",  mobile: "stack",  tablet: "row",   desktop: "row sticky" },
  ],

  snippets: [
    `/* Service row */
.service-row { display: grid; grid-template-columns: 1fr auto auto; gap: 24px; padding: 20px 0; border-bottom: 1px solid #E5D8CE; align-items: baseline; }
.service-row .name { font-family: "Fraunces", serif; font-weight: 400; font-size: 20px; color: #3A2E2A; }
.service-row .desc { font-size: 13px; color: #7A6B65; max-width: 32ch; margin-top: 4px; }
.service-row .dur { font-family: "Söhne Mono", monospace; font-size: 12px; color: #7A6B65; letter-spacing: 0.04em; }
.service-row .price { font-family: "Söhne Mono", monospace; font-size: 14px; color: #3A2E2A; font-variant-numeric: tabular-nums; }`,
    `/* Booking CTA */
.btn-book { display: inline-flex; align-items: center; gap: 8px; background: #D4A5A5; color: #3A2E2A; border: 0; border-radius: 999px; padding: 12px 28px; font-family: "Inter", sans-serif; font-size: 14px; font-weight: 500; letter-spacing: 0.04em; cursor: pointer; }
.btn-book:hover { background: #C29393; }`,
    `/* Stylist card */
.stylist-card { display: grid; grid-template-rows: 240px auto; gap: 12px; }
.stylist-card img { width: 100%; height: 100%; object-fit: cover; }
.stylist-card .name { font-family: "Fraunces", serif; font-weight: 500; font-size: 18px; color: #3A2E2A; }
.stylist-card .spec { font-style: italic; color: #7A6B65; font-size: 13px; }
.stylist-card .yrs { font-family: "Söhne Mono", monospace; font-size: 11px; color: #7A6B65; letter-spacing: 0.06em; }`,
  ],

  successLooksLike: [
    "A boutique Tribeca salon's booking page",
    "Drybar service-list landing",
    "Aman spa treatment menu",
  ],

  failureLooksLike: [
    "Chain-salon discount-banner hero",
    "Stock spa-stones-and-candle hero photo",
    "Cluttered shouty 'BOOK NOW 50% OFF' CTA",
  ],

  tile: "tile-salon",
  tileHTML: `
    <div class="hd">Services</div>
    <div class="row"><span class="nm">Cut & finish</span><span class="dur">60 MIN</span><span class="pr">$120</span></div>
    <div class="row"><span class="nm">Color & gloss</span><span class="dur">120 MIN</span><span class="pr">$240</span></div>
    <div class="btn">reserve a service →</div>
  `,
});

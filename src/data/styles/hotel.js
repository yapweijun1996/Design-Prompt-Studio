import { asFullPreset } from "./compact.js";

export const hotel = asFullPreset({
  id: "hotel",
  name: "Hotel Hospitality",
  tag: "Booking · gallery · serif",
  desc: "Full-bleed property photography. Booking widget sticky. Room types + amenities. Aman / Rosewood / Soho House register.",

  feel: "Researching a long-weekend hotel on Rosewood's site — every image makes you want to be there, booking widget is one tap away — not a Booking.com listing card.",

  references: "rosewoodhotels.com, aman.com, sohohouse.com, ace-hotel.com, edition-hotels.com, banyantree.com, four-seasons.com",

  boldFactor: [
    "Full-bleed hero of the property — pool, lobby, suite — no people in shot",
    "Sticky booking widget: dates, guests, rooms, rate code, BOOK button",
    "Room types as a grid: hero shot + name + sqm + bed config + 'View room'",
    "Amenities strip with icons: pool, spa, restaurant, gym, business center",
    "Editorial 'Stories' section: chef, design, neighborhood, art collection",
    "Discreet luxury voice: 'A retreat in the heart of the city' — never 'Book the best deal'",
    "Multi-property nav (if a group) with map view + city list",
  ],

  tokens: {
    "bg":      { value: "#FBF9F4", usage: "Warm linen page" },
    "fg":      { value: "#2C2A26", usage: "Espresso ink" },
    "muted":   { value: "#7A736A", usage: "Caption, metadata" },
    "accent":  { value: "#9B7E54", usage: "Brass / champagne accent" },
    "rule":    { value: "#D8D2C5", usage: "Hairline rule" },
  },

  typography: {
    display: '"Canela", "Tiempos Headline", "Bodoni Moda", serif',
    body:    '"Söhne", "Inter", "Söhne Mono", sans-serif',
    mono:    '"Söhne Mono", "JetBrains Mono", monospace',
    scale:   "11/12/14/16/22/32/48/72",
    weight:  "display 300-400 · body 400 · italic for editorial accents",
    tracking: "display open (0.02em) · body normal · small-caps for nav",
  },

  antiPatterns: [
    { name: "OTA price comparison", dont: "show '15% cheaper than Booking.com'", why: "Direct-booking is luxury; price-haggling cheapens the brand" },
    { name: "Stock smiling concierge", dont: "use stock hotel-staff photography", why: "Show the property itself — architecture, gardens, suite views" },
    { name: "Aggressive CTAs",     dont: "use 'BOOK NOW LIMITED OFFER'", why: "Voice: 'Reserve your stay' / 'Begin your journey' — measured" },
    { name: "Carousel of guests",  dont: "auto-rotate testimonial quotes", why: "Editorial 'Stories' section beats a generic testimonial carousel" },
    { name: "Cluttered booking widget", dont: "show 12 filter fields", why: "Dates + guests + rooms — power-users can add more in a calmer detail view" },
  ],

  responsive: [
    { element: "Hero height",    mobile: "60vh",  tablet: "85vh",  desktop: "100vh" },
    { element: "Booking widget", mobile: "stacked bottom", tablet: "sticky bottom", desktop: "floating bottom-right" },
    { element: "Display serif",  mobile: "40px",  tablet: "60px",  desktop: "72px" },
  ],

  snippets: [
    `/* Hero with serif name overlay */
.hotel-hero { position: relative; height: 100vh; overflow: hidden; }
.hotel-hero img { width: 100%; height: 100%; object-fit: cover; }
.hotel-hero::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, transparent 30%, rgba(0,0,0,0.4) 100%); }
.hotel-hero-name { position: absolute; bottom: 96px; left: 48px; color: #FBF9F4; font-family: "Canela", serif; font-weight: 300; font-size: 72px; letter-spacing: 0.02em; z-index: 2; }
.hotel-hero-loc { position: absolute; bottom: 64px; left: 48px; color: #FBF9F4; font-family: "Söhne Mono", monospace; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; z-index: 2; }`,
    `/* Booking widget — sticky bottom */
.booking-widget { position: sticky; bottom: 24px; margin: 0 auto; max-width: 720px; background: #FBF9F4; border: 1px solid #D8D2C5; border-radius: 4px; padding: 16px; display: grid; grid-template-columns: repeat(4, 1fr) auto; gap: 12px; box-shadow: 0 12px 32px rgba(0,0,0,0.08); }
.booking-field { display: flex; flex-direction: column; }
.booking-field label { font-family: "Söhne Mono", monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #7A736A; }
.booking-field input { border: 0; background: none; padding: 4px 0; font-size: 14px; color: #2C2A26; }
.btn-book { background: #2C2A26; color: #FBF9F4; padding: 10px 24px; font-family: "Söhne Mono", monospace; letter-spacing: 0.1em; text-transform: uppercase; font-size: 11px; border: 0; cursor: pointer; }`,
    `/* Room card */
.room-card { display: grid; grid-template-rows: 280px auto; gap: 12px; }
.room-card img { width: 100%; height: 100%; object-fit: cover; }
.room-card h3 { font-family: "Canela", serif; font-weight: 400; font-size: 24px; color: #2C2A26; }
.room-card .meta { font-family: "Söhne Mono", monospace; font-size: 11px; letter-spacing: 0.06em; color: #7A736A; text-transform: uppercase; }`,
  ],

  successLooksLike: [
    "rosewoodhotels.com property page",
    "aman.com resort hero + editorial",
    "edition-hotels.com booking widget",
  ],

  failureLooksLike: [
    "Booking.com-style listing card applied to a 5-star property",
    "'BOOK NOW SAVE 40%' CTA on a luxury site",
    "Cluttered widget with 12 filter fields above the hero",
  ],

  tile: "tile-hotel",
  tileHTML: `
    <div class="img"></div>
    <div class="nm">Rosewood</div>
    <div class="loc">SINGAPORE</div>
    <div class="bk">arrival · departure · 2 guests · reserve →</div>
  `,
});

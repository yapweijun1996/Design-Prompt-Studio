import { asFullPreset } from "./compact.js";

export const airline = asFullPreset({
  id: "airline",
  name: "Airline / Travel",
  tag: "Search · calendar · routes",
  desc: "Search-first booking. Origin/destination/dates. Loyalty-prominent. Singapore Airlines / Delta / Skyscanner register.",

  feel: "Booking a trans-Pacific flight on Singapore Airlines — search owns the page, loyalty tier shown, calendar with low-fare highlights — not a generic OTA wearing an airline logo.",

  references: "singaporeair.com, delta.com, qantas.com, emirates.com, lufthansa.com, skyscanner.net, kayak.com, google.com/travel/flights",

  boldFactor: [
    "Hero is the search form: from, to, dates, passengers, class — visible above the fold",
    "Calendar view shows cheapest dates highlighted (color-coded fare buckets)",
    "Loyalty/miles widget prominent: tier, miles balance, status to next tier",
    "Route maps showing destinations from your origin (often curved-line globe viz)",
    "Cabin class showcase: economy / premium / business / first with cabin photos",
    "Promotional fares strip ('Fly to Tokyo from $499') — but understated, not flash-sale",
    "Trip-management surface: 'Manage booking', 'Check-in', 'Flight status'",
  ],

  tokens: {
    "bg":      { value: "#FFFFFF", usage: "Page white" },
    "bg-soft": { value: "#F4F6F9", usage: "Search bar bg" },
    "fg":      { value: "#0D1B2A", usage: "Deep navy body" },
    "muted":   { value: "#5C6B7F", usage: "Secondary copy" },
    "brand":   { value: "#003876", usage: "SQ navy / airline navy" },
    "accent":  { value: "#F0B323", usage: "Gold class / loyalty tier" },
    "border":  { value: "#D5DAE0", usage: "Hairline border" },
  },

  typography: {
    display: '"Söhne", "Inter Display", system-ui',
    body:    '"Söhne", "Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "11/12/14/16/18/24/32/48",
    weight:  "display 500-700 · body 400 · numbers tabular",
    tracking: "display tight (-0.01em) · numbers tabular",
  },

  antiPatterns: [
    { name: "Buried search",     dont: "show a marketing hero before search", why: "80% of arrivals want to book or manage — search above the fold" },
    { name: "Vague fare display", dont: "show only 'Search to see prices'", why: "Calendar with fare buckets builds trust + accelerates decision" },
    { name: "Cluttered hero",    dont: "stack 6 promos with the search form", why: "Search is the workhorse; promos go below — focus the entry point" },
    { name: "Hidden loyalty",    dont: "tuck miles balance under a menu", why: "Loyalty visibility drives repeat booking — show tier + miles prominently" },
    { name: "Stock smiling flight attendant", dont: "use generic FA stock photography", why: "Cabin photography (the actual seat / meal / view) builds trust + tier-class differentiation" },
  ],

  responsive: [
    { element: "Search form",    mobile: "stacked", tablet: "2-col", desktop: "single-row" },
    { element: "Hero height",    mobile: "auto",   tablet: "auto",  desktop: "auto" },
    { element: "Calendar grid",  mobile: "week",   tablet: "month", desktop: "month + adjacent" },
  ],

  snippets: [
    `/* Search bar — hero */
.flight-search { background: #FFFFFF; border: 1px solid #D5DAE0; border-radius: 4px; padding: 16px; display: grid; grid-template-columns: 1fr 1fr 1fr 1fr auto; gap: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.04); }
.search-field { display: flex; flex-direction: column; padding: 8px 12px; border-right: 1px solid #D5DAE0; }
.search-field:last-child { border-right: 0; }
.search-field label { font-size: 11px; color: #5C6B7F; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 4px; }
.search-field input { border: 0; padding: 0; font-size: 18px; color: #0D1B2A; font-weight: 500; }
.btn-search { background: #003876; color: #FFFFFF; padding: 0 32px; font-size: 16px; font-weight: 600; border: 0; border-radius: 4px; cursor: pointer; }`,
    `/* Calendar fare bucket */
.fare-day { padding: 8px 4px; text-align: center; cursor: pointer; border-radius: 4px; }
.fare-day .date { font-size: 12px; color: #5C6B7F; }
.fare-day .price { font-size: 13px; font-weight: 600; margin-top: 2px; font-variant-numeric: tabular-nums; }
.fare-day--low  { background: #DEF7E0; color: #0F6F30; }
.fare-day--mid  { background: #FFF5D6; color: #8C6700; }
.fare-day--high { background: #FFE0E0; color: #8C0000; }`,
    `/* Loyalty tier pill */
.tier-pill { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 999px; background: linear-gradient(135deg, #F0B323 0%, #B58A20 100%); color: #FFFFFF; font-size: 12px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; }
.tier-pill::before { content: "★"; }`,
  ],

  successLooksLike: [
    "singaporeair.com search + KrisFlyer tier card",
    "delta.com SkyMiles dashboard + booking",
    "Google Flights calendar fare view",
  ],

  failureLooksLike: [
    "Marketing landing burying search 3 folds down",
    "'Search to see prices' calendar with no fare hints",
    "Generic flight-attendant smile stock photo as hero",
  ],

  tile: "tile-airline",
  tileHTML: `
    <div class="srch">
      <div class="fld"><span>FROM</span><b>SIN</b></div>
      <div class="fld"><span>TO</span><b>NRT</b></div>
      <div class="fld"><span>DATE</span><b>Jun 14</b></div>
      <div class="btn">SEARCH</div>
    </div>
    <div class="tier">★ KRISFLYER GOLD · 28,400 miles</div>
  `,
});

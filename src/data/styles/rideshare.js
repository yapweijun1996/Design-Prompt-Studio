import { asFullPreset } from "./compact.js";

export const rideshare = asFullPreset({
  id: "rideshare",
  name: "Ride-share App",
  tag: "Map · ETA · pickup",
  desc: "Map-dominant with bottom-sheet booking. ETA + driver photo + vehicle. Uber / Grab / Lyft / Bolt register.",

  feel: "Booking an Uber from outside a bar at 11pm — map fills the screen, pickup pin drops, driver photo + plate + ETA appear — not a generic map app dressed up as ride-share.",

  references: "Uber, Grab, Lyft, Bolt, DiDi, Ola, FreeNow, Cabify",

  boldFactor: [
    "Full-bleed map (90%) + bottom sheet that slides up for booking states",
    "Pickup + destination pins with route polyline (animated when finding driver)",
    "Vehicle tier cards: UberX / Comfort / Black / XL — price + ETA + seats",
    "Driver-en-route card: photo + name + rating + plate + vehicle + ETA countdown",
    "Surge / fare-multiplier badge prominent (transparency = trust)",
    "Trip safety: share-ETA, RideCheck, emergency button accessible mid-trip",
  ],

  tokens: {
    "bg":      { value: "#FFFFFF", usage: "App background" },
    "fg":      { value: "#0E1116", usage: "Body text" },
    "muted":   { value: "#5E6166", usage: "Secondary" },
    "brand":   { value: "#000000", usage: "Uber black (or Grab green #00B14F)" },
    "ok":      { value: "#1E8E3E", usage: "Confirmed / live" },
    "warn":    { value: "#F5B342", usage: "Surge multiplier" },
    "border":  { value: "#E0E0E0", usage: "Card border" },
  },

  typography: {
    display: '"UberMove", "Söhne", "Inter Display", system-ui',
    body:    '"Söhne", "Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "11/12/14/16/20/28/40",
    weight:  "display 600-700 · body 400-500 · price 700 tabular",
  },

  antiPatterns: [
    { name: "Tiny map area", dont: "use 40% map + 60% chrome", why: "Map is the page; booking sheet is the chrome — not vice versa" },
    { name: "Hidden surge",  dont: "obscure surge multiplier", why: "Surprise-pricing destroys trust; show 1.6x upfront" },
    { name: "No driver photo", dont: "show driver as text-only", why: "Photo + plate + name is the safety primitive" },
    { name: "Modal cascades", dont: "open modals for every step", why: "Bottom-sheet morphs through states — single surface" },
  ],

  responsive: [
    { element: "Map area", mobile: "100vh map + sheet", tablet: "same", desktop: "same" },
    { element: "Bottom sheet", mobile: "swipe up", tablet: "swipe up", desktop: "fixed bottom" },
  ],

  snippets: [
    `/* Bottom sheet */
.ride-sheet { position: fixed; bottom: 0; left: 0; right: 0; background: #FFFFFF; border-radius: 16px 16px 0 0; padding: 16px; box-shadow: 0 -4px 24px rgba(0,0,0,0.15); max-height: 60vh; }
.ride-handle { width: 36px; height: 4px; background: #E0E0E0; border-radius: 2px; margin: 0 auto 12px; }
.ride-tier { display: grid; grid-template-columns: 48px 1fr auto; gap: 12px; padding: 12px 0; border-bottom: 1px solid #E0E0E0; align-items: center; cursor: pointer; }
.ride-tier .name { font-weight: 600; font-size: 15px; }
.ride-tier .meta { font-size: 12px; color: #5E6166; }
.ride-tier .price { font-weight: 700; font-size: 16px; font-variant-numeric: tabular-nums; }`,
    `/* Driver-en-route card */
.driver-card { display: grid; grid-template-columns: 48px 1fr auto; gap: 12px; padding: 14px; background: #FFFFFF; border-radius: 12px; }
.driver-card img { width: 48px; height: 48px; border-radius: 50%; }
.driver-card .name { font-weight: 600; }
.driver-card .plate { background: #F4F4F4; padding: 2px 6px; border-radius: 4px; font-family: "JetBrains Mono", monospace; font-size: 13px; font-weight: 700; letter-spacing: 0.05em; }
.driver-card .eta { font-family: "JetBrains Mono", monospace; font-size: 18px; font-weight: 700; color: #1E8E3E; }`,
  ],

  successLooksLike: [
    "Uber booking screen with map + tier sheet",
    "Grab driver-en-route card with plate + rating",
  ],

  failureLooksLike: [
    "Marketing landing instead of map-first UI",
    "Hidden surge multiplier behind a tooltip",
  ],

  tile: "tile-rideshare",
  tileHTML: `
    <div class="map">
      <div class="pin a">A</div>
      <div class="pin b">B</div>
      <svg class="rt" viewBox="0 0 100 50" preserveAspectRatio="none"><path d="M20,12 Q50,5 80,42" fill="none" stroke="#000" stroke-width="2.5"/></svg>
    </div>
    <div class="sheet">
      <div class="row"><span>UberX</span><span class="eta">3 min</span><span class="pr">$12.40</span></div>
    </div>
  `,
});

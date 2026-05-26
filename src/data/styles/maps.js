import { asFullPreset } from "./compact.js";

export const maps = asFullPreset({
  id: "maps",
  name: "Maps / Navigation",
  tag: "Map · search · POI",
  desc: "Full-bleed map. Search-bar floating top. POI / directions panels. Google Maps / Apple Maps / AllTrails / Citymapper register.",

  feel: "Opening Google Maps to navigate downtown — map dominates, search bar floats above, POI cards slide up from the bottom — not a static atlas dressed up as 'maps'.",

  references: "Google Maps, Apple Maps, AllTrails, Citymapper, Mapbox demos, Strava Routes, Komoot, Onx Hunt",

  boldFactor: [
    "Full-bleed map as the page (90%+ of viewport) — chrome floats on top",
    "Search bar pinned top: 'Search here' + recent + saved",
    "POI / place card slides up from bottom: photo + name + rating + hours + directions",
    "Directions panel: start / end + alternate-route choices + step-by-step + ETA",
    "Layer toggle: traffic, transit, terrain, satellite, bike, walking",
    "Pin marker styles: numbered, category-icon, photo-mini",
    "Mini-map / overview map in the corner for context during navigation",
  ],

  tokens: {
    "bg":       { value: "#F1EFE8", usage: "Map base tone" },
    "surface":  { value: "#FFFFFF", usage: "Card / panel surface" },
    "fg":       { value: "#202124", usage: "Body near-black" },
    "muted":    { value: "#5F6368", usage: "Secondary text" },
    "brand":    { value: "#1A73E8", usage: "Google blue (or Apple Maps #007AFF)" },
    "route":    { value: "#1A73E8", usage: "Route polyline blue" },
    "alt-route":{ value: "#9AA0A6", usage: "Alternate route grey" },
    "rating":   { value: "#F9AB00", usage: "Star rating yellow" },
    "border":   { value: "#E0E0E0", usage: "Card border" },
  },

  typography: {
    display: '"Google Sans", "Söhne", "Inter", system-ui',
    body:    '"Roboto", "Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "11/12/13/14/16/18/24/32",
    weight:  "display 500-600 · body 400 · ETA mono 600 tabular",
    tracking: "normal · ETA tabular",
  },

  antiPatterns: [
    { name: "Tiny map area",     dont: "use 40% map + 60% sidebar layout", why: "Maps apps live on the map — give it 90%+ of the viewport" },
    { name: "Walls of POI cards", dont: "show 50 POIs in a sidebar list", why: "Selected POI slides up as a card; map + pins are the index" },
    { name: "No directions panel", dont: "rely on text-only route description", why: "Step-by-step + ETA + route alternates are core navigation primitives" },
    { name: "Generic stock marker", dont: "use a single grey-pin for everything", why: "Numbered + category-icon + photo-mini markers carry context" },
    { name: "Hidden layer toggle", dont: "tuck layers behind a deep menu", why: "Traffic / satellite / transit toggles are commonly used — surface them" },
  ],

  responsive: [
    { element: "Map area",        mobile: "100vh", tablet: "100%",  desktop: "100%" },
    { element: "Search bar",      mobile: "top-floating", tablet: "top-floating", desktop: "top-floating" },
    { element: "POI card",        mobile: "slide-up sheet", tablet: "left 360px", desktop: "left 400px" },
  ],

  snippets: [
    `/* Map shell with floating chrome */
.map-shell { position: relative; width: 100vw; height: 100vh; background: #F1EFE8; overflow: hidden; }
.map-chrome { position: absolute; z-index: 10; }
.map-search { top: 16px; left: 16px; right: 16px; max-width: 480px; background: #FFFFFF; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); padding: 8px 12px; display: flex; align-items: center; gap: 8px; }
.map-search input { flex: 1; border: 0; padding: 6px; font-size: 14px; color: #202124; }`,
    `/* POI card — slide-up bottom sheet */
.poi-card { position: absolute; left: 16px; bottom: 16px; width: 380px; max-height: 70vh; background: #FFFFFF; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.2); overflow: hidden; }
.poi-photo { width: 100%; height: 160px; object-fit: cover; background: #E0E0E0; }
.poi-body { padding: 16px; }
.poi-body h3 { font-family: "Google Sans", system-ui; font-weight: 500; font-size: 20px; margin: 0; color: #202124; }
.poi-rating { display: flex; align-items: center; gap: 4px; margin: 6px 0; font-size: 14px; color: #5F6368; }
.poi-rating .stars { color: #F9AB00; }
.poi-actions { display: flex; gap: 8px; margin-top: 12px; }
.poi-btn { background: #1A73E8; color: #FFFFFF; border: 0; border-radius: 6px; padding: 8px 16px; font-size: 14px; font-weight: 500; cursor: pointer; }`,
    `/* Route step row */
.route-step { display: grid; grid-template-columns: 32px 1fr auto; gap: 12px; padding: 12px 16px; border-bottom: 1px solid #E0E0E0; align-items: center; }
.route-step .icon { width: 32px; height: 32px; border-radius: 50%; background: #E8F0FE; color: #1A73E8; display: grid; place-items: center; }
.route-step .ins { font-size: 14px; color: #202124; }
.route-step .dist { font-size: 13px; color: #5F6368; font-variant-numeric: tabular-nums; }`,
  ],

  successLooksLike: [
    "Google Maps full-bleed with floating search + POI card",
    "Apple Maps directions panel + alt-route badges",
    "AllTrails hike map + elevation profile",
  ],

  failureLooksLike: [
    "40% map + 60% sidebar layout (genre violation)",
    "Walls of POI list dominating, map shrunken",
    "Generic grey pin for every POI with no category context",
  ],

  tile: "tile-maps",
  tileHTML: `
    <div class="map">
      <div class="srch">🔍 Search here</div>
      <div class="pin a">A</div>
      <div class="pin b">B</div>
      <svg class="rt" viewBox="0 0 100 60" preserveAspectRatio="none"><path d="M20,15 Q40,5 60,25 T85,45" fill="none" stroke="#1A73E8" stroke-width="2.5"/></svg>
    </div>
    <div class="poi">
      <div class="ttl">Blue Bottle Coffee</div>
      <div class="meta">★ 4.6 · Open · 12 min</div>
    </div>
  `,
});

import { asFullPreset } from "./compact.js";

export const realestate = asFullPreset({
  id: "realestate",
  name: "Real Estate",
  tag: "Map · listing · gallery",
  desc: "Map + listing grid hybrid. Property cards with hero photo. Zillow / Redfin / PropertyGuru / Rightmove register.",

  feel: "Searching for a 2-bedroom in a new neighborhood on Zillow — map left, listings right, both update as you pan — not a static property catalog.",

  references: "Zillow, Redfin, Realtor.com, Rightmove, PropertyGuru, 99.co, Compass, Streeteasy",

  boldFactor: [
    "Split layout: interactive map (left, 50%) + listing grid (right, 50%) — both linked",
    "Listing card: hero photo + price + beds/baths/sqft + address + agent",
    "Map markers show price; clicking pans + highlights the card",
    "Filters: price range, beds, baths, type, sqft, more (drawer for advanced)",
    "Saved searches + favorited listings with heart icon — login-aware",
    "Property detail: photo gallery, floor plan, neighborhood data, schools, walk score",
    "'Contact agent' as a sticky CTA on detail page",
  ],

  tokens: {
    "bg":      { value: "#FFFFFF", usage: "Page white" },
    "bg-soft": { value: "#F7F8FA", usage: "Filter bar bg" },
    "fg":      { value: "#0E1A2B", usage: "Body deep navy" },
    "muted":   { value: "#5C6B7F", usage: "Secondary copy" },
    "brand":   { value: "#0061DF", usage: "Action blue" },
    "price":   { value: "#0E1A2B", usage: "Listing price (bold, dark)" },
    "fav":     { value: "#E63946", usage: "Heart / favorited red" },
    "border":  { value: "#E5E7EB", usage: "Card border" },
  },

  typography: {
    display: '"Inter Display", "Söhne", system-ui',
    body:    '"Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "11/12/14/16/18/24/32/40",
    weight:  "display 600-700 · body 400-500 · price 700",
    tracking: "display tight (-0.01em) · price tight, tabular",
  },

  antiPatterns: [
    { name: "Map only OR list only", dont: "force users to switch tabs between map and list", why: "Synchronized split is the genre — both views always visible" },
    { name: "Vague pricing",       dont: "show 'Contact for price'", why: "Listings without price kill exploration — power-users skip them" },
    { name: "Tiny thumbnails",     dont: "use 60px photos in cards", why: "Real-estate decisions start with the photo — show it big (160-200px)" },
    { name: "Hidden agent",        dont: "tuck agent contact in a long footer", why: "Sticky 'Contact agent' is the primary conversion path" },
    { name: "Generic stock photo",  dont: "use Shutterstock house photos", why: "Real listing photos build trust + comparability" },
  ],

  responsive: [
    { element: "Map / List split", mobile: "tabs",  tablet: "55/45",  desktop: "55/45" },
    { element: "Listing card",    mobile: "1col",   tablet: "1col",   desktop: "1col 360px" },
    { element: "Detail gallery",  mobile: "carousel", tablet: "2-up",  desktop: "3-up grid" },
  ],

  snippets: [
    `/* Split layout */
.realestate-shell { display: grid; grid-template-columns: 55% 45%; height: calc(100vh - 64px); }
.realestate-map { background: #E5E7EB; position: relative; }
.realestate-list { overflow-y: auto; padding: 16px; background: #FFFFFF; }`,
    `/* Listing card */
.listing { display: grid; grid-template-rows: 200px auto; gap: 0; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; overflow: hidden; cursor: pointer; transition: box-shadow 200ms; margin-bottom: 16px; }
.listing:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.listing img { width: 100%; height: 100%; object-fit: cover; }
.listing .body { padding: 12px 14px; }
.listing .price { font-size: 22px; font-weight: 700; color: #0E1A2B; font-variant-numeric: tabular-nums; }
.listing .spec { font-size: 14px; color: #5C6B7F; margin: 4px 0; }
.listing .addr { font-size: 13px; color: #0E1A2B; }
.listing .fav { position: absolute; top: 12px; right: 12px; background: rgba(255,255,255,0.9); border: 0; border-radius: 50%; width: 32px; height: 32px; display: grid; place-items: center; cursor: pointer; color: #E63946; }`,
    `/* Price-marker on map */
.map-marker { background: #FFFFFF; border: 2px solid #0061DF; color: #0E1A2B; padding: 4px 10px; border-radius: 14px; font-size: 12px; font-weight: 700; font-variant-numeric: tabular-nums; box-shadow: 0 2px 6px rgba(0,0,0,0.15); cursor: pointer; white-space: nowrap; }
.map-marker--active { background: #0E1A2B; color: #FFFFFF; border-color: #0E1A2B; transform: scale(1.1); }`,
  ],

  successLooksLike: [
    "Zillow search results with synced map + cards",
    "Redfin property detail page with floor plan + walk score",
    "PropertyGuru Singapore HDB listing",
  ],

  failureLooksLike: [
    "Map tab + List tab forcing user to switch",
    "Tiny 60px thumbnails in a marketing-style listing card",
    "Listings without prices, agents buried in footer",
  ],

  tile: "tile-realestate",
  tileHTML: `
    <div class="map">
      <div class="pin">$1.2M</div>
      <div class="pin">$890k</div>
      <div class="pin hl">$1.4M</div>
    </div>
    <div class="list">
      <div class="card">
        <div class="img"></div>
        <div class="pr">$1,420,000</div>
        <div class="sp">3 bd · 2 ba · 1,840 sqft</div>
      </div>
    </div>
  `,
});

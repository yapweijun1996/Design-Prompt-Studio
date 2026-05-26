import { asFullPreset } from "./compact.js";

export const agtech = asFullPreset({
  id: "agtech",
  name: "Agriculture / Agtech",
  tag: "Field · soil · yield",
  desc: "Field map + crop / soil / weather overlays. Yield + irrigation insights. Climate FieldView / Granular / John Deere Operations Center register.",

  feel: "A farmer checking nitrogen levels on Climate FieldView before dawn — field tiles colored by crop stress, weather forecast pinned, planting plan ready — not a SaaS dashboard pretending to know about corn.",

  references: "Climate FieldView (Bayer), Granular, John Deere Operations Center, FarmLogs, Cropio, Taranis, AgriWebb",

  boldFactor: [
    "Field-map UI: aerial parcel view, color overlays for NDVI / yield / soil moisture",
    "Weather panel: forecast, GDD accumulation, rainfall, ET demand",
    "Crop / variety library: planting date, hybrid, population, treatment",
    "Yield / harvest record: bushels / acre by field by year",
    "Earth-tone palette: brown soil + green leaf + sky blue + harvest gold",
    "Practical voice: 'Apply 40 lb N per acre' / 'Soil moisture: deficit 0.8 in'",
  ],

  tokens: {
    "bg":      { value: "#F5F1E8", usage: "Warm parchment" },
    "surface": { value: "#FFFFFF", usage: "Card" },
    "fg":      { value: "#2D2417", usage: "Soil brown body" },
    "muted":   { value: "#6B5F4D", usage: "Caption brown" },
    "leaf":    { value: "#2D7A3F", usage: "Crop green" },
    "sky":     { value: "#4A90C2", usage: "Weather blue" },
    "harvest": { value: "#C99435", usage: "Harvest gold" },
    "border":  { value: "#D9CFB8", usage: "Soft border" },
  },

  typography: {
    display: '"Söhne", "Inter Display", system-ui',
    body:    '"Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "11/12/14/16/18/24/32",
    weight:  "display 600-700 · body 400-500 · numbers tabular",
  },

  antiPatterns: [
    { name: "Generic SaaS palette", dont: "use SaaS indigo brand", why: "Earth tones (soil/leaf/sky/harvest) match the domain mental model" },
    { name: "Hide weather",      dont: "treat weather as a side widget", why: "Weather drives field decisions; surface it persistently" },
    { name: "Stock farmer photo", dont: "use Shutterstock farmer-with-hat imagery", why: "Real field photos + product UI + drone imagery > stock" },
    { name: "Imperial-only OR metric-only", dont: "ship one unit system", why: "Acres vs hectares matters by region; let users pick" },
  ],

  responsive: [
    { element: "Field map",    mobile: "fullscreen + bottom sheet", tablet: "primary surface", desktop: "70% + sidebar" },
    { element: "Weather strip", mobile: "drawer", tablet: "sticky top", desktop: "header band" },
  ],

  snippets: [
    `/* Field tile (NDVI overlay) */
.field-tile { aspect-ratio: 4/3; position: relative; border-radius: 8px; overflow: hidden; background: linear-gradient(135deg, #2D7A3F 0%, #6B9A4A 50%, #C99435 100%); }
.field-tile .label { position: absolute; top: 8px; left: 8px; background: rgba(255,255,255,0.9); color: #2D2417; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; }
.field-tile .stat { position: absolute; bottom: 8px; left: 8px; color: #FFFFFF; font-size: 11px; font-family: "JetBrains Mono", monospace; }`,
    `/* Weather strip */
.weather-strip { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; padding: 12px 16px; background: #FFFFFF; border-bottom: 1px solid #D9CFB8; }
.weather-day { text-align: center; }
.weather-day .day { font-size: 11px; color: #6B5F4D; letter-spacing: 0.04em; text-transform: uppercase; }
.weather-day .temp { font-family: "JetBrains Mono", monospace; font-weight: 600; font-size: 16px; color: #2D2417; font-variant-numeric: tabular-nums; }
.weather-day .rain { font-size: 11px; color: #4A90C2; }`,
  ],

  successLooksLike: [
    "Climate FieldView NDVI overlay + variable-rate map",
    "John Deere Operations Center field summary",
  ],

  failureLooksLike: [
    "Generic SaaS dashboard with one tractor icon",
    "Stock farmer-with-hat hero photography",
  ],

  tile: "tile-agtech",
  tileHTML: `
    <div class="field"><div class="lbl">N-12 · Corn</div><div class="st">NDVI 0.78</div></div>
    <div class="weather">
      <div><span class="d">MON</span><span class="t">82°</span></div>
      <div><span class="d">TUE</span><span class="t">78°</span></div>
      <div><span class="d">WED</span><span class="t">71°</span><span class="r">0.4″</span></div>
    </div>
  `,
});

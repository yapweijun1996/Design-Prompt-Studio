import { asFullPreset } from "./compact.js";

export const climateatlas = asFullPreset({
  id: "climateatlas",
  name: "Climate Atlas",
  tag: "climate data · maps · scenarios",
  desc: "A climate-intelligence style for maps, risk scenarios, environmental dashboards, resilience plans, and sustainability reporting.",

  feel: "A data atlas for climate decisions: map-led, scenario-aware, calm but urgent, with evidence, geography, and time horizons kept visible.",

  references: "Climate Central maps, CarbonPlan, NASA Earthdata, ArcGIS dashboards, Bloomberg Green data graphics, Stripe Climate pages",

  boldFactor: [
    "Map or geospatial layer is the primary visual system",
    "Scenarios compare time horizons, emissions pathways, and confidence",
    "Use data legends, units, and uncertainty labels everywhere",
    "Environmental color is restrained and readable, not generic greenwash",
    "Action recommendations tie directly to local risk evidence",
  ],

  tokens: {
    bg: { value: "#EEF4F1", usage: "Atlas background" },
    ocean: { value: "#234B5E", usage: "Map water / deep data" },
    land: { value: "#DDE7D8", usage: "Map land layer" },
    fg: { value: "#16251F", usage: "Primary text" },
    muted: { value: "#65746D", usage: "Legend metadata" },
    accent: { value: "#D97706", usage: "Risk / action highlight" },
    safe: { value: "#2F7D5C", usage: "Lower risk / positive state" },
    border: { value: "#B8C9C0", usage: "Map and panel dividers" },
  },

  typography: {
    display: '"IBM Plex Sans Condensed", "Inter Tight", system-ui',
    body: '"IBM Plex Sans", "Inter", system-ui',
    mono: '"IBM Plex Mono", "Geist Mono", monospace',
    scale: "11/12/14/16/20/28/44/64",
    weight: "display 650-780 · body 400-520 · data labels 600",
    tracking: "map labels +0.06em, display tight",
  },

  antiPatterns: [
    { name: "Greenwashing palette", dont: "make everything bright eco green", why: "Climate intelligence needs measured data colors" },
    { name: "Map without legend", dont: "show geography without units and scale", why: "The user must understand what the layer means" },
    { name: "Doom-only design", dont: "use alarmist red everywhere", why: "Risk needs urgency plus actionability" },
    { name: "Static report page", dont: "bury scenarios in paragraphs", why: "Time horizon and pathway comparison are core interactions" },
  ],

  responsive: [
    { element: "Map stage", mobile: "map card with bottom legend", tablet: "map + scenario controls", desktop: "full atlas map with side analysis rail" },
    { element: "Scenario controls", mobile: "segmented horizontal controls", tablet: "top toolbar", desktop: "left control column" },
    { element: "Risk explanation", mobile: "stacked cards", tablet: "side panel", desktop: "right evidence and action rail" },
  ],

  snippets: [
    `.atlas-shell { background:#EEF4F1; color:#16251F; font-family:'IBM Plex Sans',Inter,system-ui,sans-serif; }`,
    `.map-panel { background:linear-gradient(135deg,#234B5E,#DDE7D8); border:1px solid #B8C9C0; border-radius:16px; }`,
    `.risk-chip[data-risk="high"] { background:#D97706; color:#fff; }`,
  ],

  successLooksLike: [
    "The map, scenario, units, and local risk are visible at the same time",
    "Users can compare futures without losing geographic context",
    "The design feels analytical, not promotional green branding",
  ],

  failureLooksLike: [
    "A sustainability landing page with leaf icons",
    "A pretty map with no legend or uncertainty",
    "Generic dashboards disconnected from location",
  ],

  tile: "tile-climateatlas",
  tileHTML: `
    <div style="height:150px;background:#EEF4F1;color:#16251F;display:flex;flex-direction:column;justify-content:space-between;padding:15px;font-family:'IBM Plex Sans',Inter,system-ui,sans-serif">
      <div style="display:flex;justify-content:space-between;font:10px 'IBM Plex Mono',monospace;color:#234B5E;letter-spacing:.1em;text-transform:uppercase"><span>climate atlas</span><span>2050</span></div>
      <div style="height:58px;border-radius:14px;background:linear-gradient(135deg,#234B5E 0 42%,#DDE7D8 43% 67%,#D97706 68%);border:1px solid #B8C9C0;box-shadow:0 14px 26px rgba(22,37,31,.13)"></div>
      <div style="display:flex;justify-content:space-between;align-items:end"><b style="font-size:22px;letter-spacing:-.03em;line-height:1">Risk by<br/>scenario</b><span style="background:#D97706;color:#fff;border-radius:999px;padding:6px 10px;font-size:10px;font-weight:800">high tide</span></div>
    </div>
  `,
});

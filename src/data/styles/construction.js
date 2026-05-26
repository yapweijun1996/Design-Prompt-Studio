import { asFullPreset } from "./compact.js";

export const construction = asFullPreset({
  id: "construction",
  name: "Construction Tech",
  tag: "Drawings · RFI · field",
  desc: "Plans + RFIs + punch lists + photo logs. Procore / Buildertrend / PlanGrid / Autodesk Construction Cloud register.",

  feel: "A site supervisor pulling up sheet plans on an iPad at 7am with mud on it — overlay markup, photo log of yesterday's pour, RFI thread on a beam — not a desk-bound SaaS pretending to understand the field.",

  references: "Procore, Buildertrend, PlanGrid (Autodesk), Autodesk Construction Cloud, Fieldwire, Raken, BuilderTrend",

  boldFactor: [
    "Sheet viewer: A-101 plan with pinch-zoom, markup tools, version compare",
    "RFI thread: attached to a plan location, threaded answers, days-open SLA",
    "Photo log: gallery from the field, geotagged, dated, attached to spec section",
    "Punch list: location pin + category + priority + assignee + due-date + photo-after",
    "Daily report: weather, crew count, equipment, deliveries, work performed",
    "Field-tough palette: safety orange, hi-viz yellow, steel grey, on iPad-bright bg",
  ],

  tokens: {
    "bg":       { value: "#F4F5F7", usage: "App background" },
    "surface":  { value: "#FFFFFF", usage: "Card / panel" },
    "fg":       { value: "#1A1A1A", usage: "Body" },
    "muted":    { value: "#5F6368", usage: "Secondary" },
    "brand":    { value: "#FF5C00", usage: "Procore orange (safety)" },
    "hiviz":    { value: "#FFD600", usage: "Hi-viz yellow accent" },
    "ok":       { value: "#1E8E3E", usage: "Closed / approved" },
    "danger":   { value: "#D93025", usage: "Critical / overdue" },
    "border":   { value: "#D0D3D7", usage: "Border" },
  },

  typography: {
    display: '"Söhne", "Inter", system-ui',
    body:    '"Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "11/12/14/16/18/24/32",
    weight:  "display 600-700 · body 400-500",
  },

  antiPatterns: [
    { name: "Desktop-only flow", dont: "build a non-mobile UI", why: "Field users work on iPads in dust; mobile-first is non-negotiable" },
    { name: "Plain text RFIs",   dont: "thread RFIs without plan-location attachment", why: "RFI without 'which beam on which sheet' is unactionable" },
    { name: "Hide weather/crew", dont: "omit daily-report basics", why: "Daily report is the audit trail for delays + change orders" },
    { name: "Pastel palette",    dont: "use SaaS pastel branding", why: "Safety orange + hi-viz yellow signals 'field' — pastel reads as toy" },
  ],

  responsive: [
    { element: "Sheet viewer",  mobile: "full-screen + tools overlay", tablet: "primary surface", desktop: "70%+ viewport" },
    { element: "Sidebar",       mobile: "drawer", tablet: "icon", desktop: "260px" },
  ],

  snippets: [
    `/* Sheet viewer chrome */
.sheet-viewer { position: relative; background: #2A2A2A; min-height: 100vh; }
.sheet-pdf { width: 100%; height: 100%; object-fit: contain; background: #FFFFFF; }
.sheet-tools { position: absolute; top: 16px; left: 16px; background: #FFFFFF; border-radius: 8px; padding: 6px; display: flex; gap: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.2); }
.sheet-tools button { width: 36px; height: 36px; border: 0; background: transparent; border-radius: 4px; cursor: pointer; }
.sheet-tools button.active { background: #FF5C00; color: #FFFFFF; }`,
    `/* RFI card */
.rfi-card { background: #FFFFFF; border: 1px solid #D0D3D7; border-radius: 8px; padding: 12px 16px; border-left: 4px solid #FF5C00; }
.rfi-card .num { font-family: "JetBrains Mono", monospace; font-size: 12px; color: #5F6368; font-weight: 600; }
.rfi-card .ttl { font-size: 14px; font-weight: 600; color: #1A1A1A; margin: 2px 0 4px; }
.rfi-card .meta { font-size: 12px; color: #5F6368; display: flex; gap: 12px; }
.rfi-card .days-open { color: #D93025; font-weight: 600; font-variant-numeric: tabular-nums; }`,
    `/* Punch item */
.punch-item { display: grid; grid-template-columns: 32px 1fr auto; gap: 12px; padding: 10px 14px; border-bottom: 1px solid #D0D3D7; align-items: center; font-size: 14px; }
.punch-item .pin { width: 32px; height: 32px; border-radius: 50%; background: #FFD600; color: #1A1A1A; display: grid; place-items: center; font-weight: 700; font-size: 12px; }
.punch-item .loc { color: #1A1A1A; }
.punch-item .due { font-size: 12px; color: #5F6368; }
.punch-item.overdue .pin { background: #D93025; color: #FFFFFF; }`,
  ],

  successLooksLike: [
    "Procore sheet viewer with markups + RFIs",
    "Fieldwire punch-list with location pins",
  ],

  failureLooksLike: [
    "Desktop-only SaaS labeled as construction tech",
    "Pastel palette on a field-ops tool",
  ],

  tile: "tile-construction",
  tileHTML: `
    <div class="sht">A-101</div>
    <div class="row"><span class="num">RFI #042</span><span>Beam B12 conflict</span><span class="day">3d</span></div>
    <div class="row"><span class="pin">7</span><span>L2-NE · Drywall touch-up</span><span class="dueOK">Mon</span></div>
  `,
});

import { asFullPreset } from "./compact.js";

export const fielddispatch = asFullPreset({
  id: "fielddispatch",
  name: "Field Dispatch",
  tag: "field ops · map · work orders",
  desc: "A field-operations style for dispatch boards, work orders, technician routes, asset service, inspections, and fleet tasks.",
  sampleTemplate: "dashboard",

  feel: "A live operations board for work happening outside the office: maps, crews, ETAs, job status, parts, photos, and exception handling.",

  references: "Samsara fleet dashboards, ServiceTitan dispatch board, Uber internal dispatch maps, ArcGIS field maps, Jobber, Fleetio",

  boldFactor: [
    "Map and job queue share the first viewport",
    "Every job shows owner, ETA, priority, required parts, and next action",
    "Route, crew, asset, and customer context are visible together",
    "Offline/mobile field states are designed, not ignored",
    "Use operational color sparingly for priority and SLA risk",
  ],

  tokens: {
    bg: { value: "#F2F4F1", usage: "Operations canvas" },
    panel: { value: "#FFFFFF", usage: "Queue and route panels" },
    fg: { value: "#18211D", usage: "Primary text" },
    muted: { value: "#66726B", usage: "Job metadata" },
    accent: { value: "#2563EB", usage: "Active route / selected crew" },
    urgent: { value: "#E11D48", usage: "SLA breach" },
    route: { value: "#F59E0B", usage: "Route highlight" },
    border: { value: "#D8DED8", usage: "Panel dividers" },
  },

  typography: {
    display: '"Inter Tight", "Roboto Condensed", system-ui',
    body: '"Inter", "Roboto", system-ui',
    mono: '"Roboto Mono", "IBM Plex Mono", monospace',
    scale: "11/12/13/14/16/20/30/44",
    weight: "display 650-760 · job labels 600 · body 400-520",
    tracking: "labels +0.06em, map labels normal",
  },

  antiPatterns: [
    { name: "Map decoration", dont: "show a vague map with no work order state", why: "The map must drive dispatch decisions" },
    { name: "Pretty cards only", dont: "hide the actual queue behind overview cards", why: "Dispatchers need actionable rows" },
    { name: "No offline state", dont: "assume perfect connectivity", why: "Field work often happens in weak signal" },
    { name: "Consumer delivery look", dont: "make it feel like food tracking", why: "This is industrial service operations" },
  ],

  responsive: [
    { element: "Map and queue", mobile: "queue first with mini map", tablet: "map above queue", desktop: "map, queue, and job inspector split" },
    { element: "Job detail", mobile: "bottom sheet", tablet: "side sheet", desktop: "fixed right job panel" },
    { element: "Crew status", mobile: "chips", tablet: "route rail", desktop: "crew lane board" },
  ],

  snippets: [
    `.dispatch-shell { background:#F2F4F1; color:#18211D; font-family:Inter,system-ui,sans-serif; }`,
    `.map-stage { background:linear-gradient(135deg,#D8DED8,#F2F4F1); border:1px solid #D8DED8; border-radius:18px; }`,
    `.job-row[data-priority="urgent"] { border-left:4px solid #E11D48; }`,
  ],

  successLooksLike: [
    "Dispatchers can assign or reroute work from the first screen",
    "Jobs show ETA, owner, SLA risk, and next action",
    "Mobile view still works for field crews",
  ],

  failureLooksLike: [
    "A generic map with pins and no operations",
    "Marketing copy where job rows should be",
    "No clear priority or assignment state",
  ],

  tile: "tile-fielddispatch",
  tileHTML: `
    <div style="height:150px;background:#F2F4F1;color:#18211D;display:flex;flex-direction:column;justify-content:space-between;padding:15px;font-family:Inter,system-ui,sans-serif">
      <div style="display:flex;justify-content:space-between;font:10px 'Roboto Mono',monospace;color:#2563EB;letter-spacing:.1em;text-transform:uppercase"><span>dispatch</span><span>14 jobs</span></div>
      <div style="height:55px;border-radius:14px;background:linear-gradient(135deg,#D8DED8,#fff);border:1px solid #D8DED8;position:relative;overflow:hidden">
        <span style="position:absolute;left:18px;top:28px;width:90px;height:4px;background:#F59E0B;border-radius:99px;transform:rotate(-14deg)"></span>
        <span style="position:absolute;right:35px;top:18px;width:13px;height:13px;background:#2563EB;border-radius:50%"></span>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:end"><b style="font-size:22px;line-height:1;letter-spacing:-.03em">Route the<br/>next job.</b><span style="color:#E11D48;font-size:11px;font-weight:800">SLA 12m</span></div>
    </div>
  `,
});

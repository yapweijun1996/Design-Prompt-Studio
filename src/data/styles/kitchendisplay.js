import { asFullPreset } from "./compact.js";

export const kitchendisplay = asFullPreset({
  id: "kitchendisplay",
  name: "Kitchen Display",
  tag: "restaurant ops · orders · station timing",
  desc: "A restaurant-operations style for kitchen display systems, order queues, expo screens, pickup status, station timing, and menu throughput.",
  sampleTemplate: "dashboard",

  feel: "A high-pressure service screen made readable: tickets, station lanes, timers, modifiers, allergens, pickup windows, and handoff state.",

  references: "Toast kitchen display, Square for Restaurants, Lightspeed Restaurant, McDonald's production screens, Deliveroo restaurant tablets, Olo order manager",

  boldFactor: [
    "Order tickets and station lanes are the main layout",
    "Timers, modifiers, allergens, and rush state must be impossible to miss",
    "Use high contrast and chunky touch targets for gloved hands",
    "Completed, held, fired, and pickup states are visually distinct",
    "Avoid decorative food photography; this is live service operations",
  ],

  tokens: {
    bg: { value: "#11100E", usage: "Kitchen screen background" },
    panel: { value: "#1F1D19", usage: "Order ticket surface" },
    fg: { value: "#FFF7E8", usage: "Ticket text" },
    muted: { value: "#B7AA96", usage: "Order metadata" },
    accent: { value: "#F97316", usage: "Fire / active order" },
    ready: { value: "#22C55E", usage: "Ready / complete" },
    hold: { value: "#EAB308", usage: "Hold / warning" },
    border: { value: "#3A342B", usage: "Ticket dividers" },
  },

  typography: {
    display: '"Inter Tight", "Arial Narrow", system-ui',
    body: '"Inter", system-ui, sans-serif',
    mono: '"Roboto Mono", "IBM Plex Mono", monospace',
    scale: "12/14/16/18/22/30/44/62",
    weight: "display 750-850 · tickets 650-800 · body 500",
    tracking: "station labels +0.08em, ticket numbers tabular",
  },

  antiPatterns: [
    { name: "Food photography", dont: "use plated food imagery as the main visual", why: "Kitchen screens are operational tools" },
    { name: "Tiny elegant UI", dont: "make controls delicate", why: "Kitchen staff need distance-readable, touchable controls" },
    { name: "Ambiguous timers", dont: "hide elapsed time in small text", why: "Timing drives service quality" },
    { name: "Marketing restaurant style", dont: "make it look like a dining landing page", why: "This is back-of-house execution" },
  ],

  responsive: [
    { element: "Ticket lanes", mobile: "single lane queue", tablet: "two station lanes", desktop: "multi-lane expo board" },
    { element: "Order detail", mobile: "expanded ticket", tablet: "ticket drawer", desktop: "right station detail" },
    { element: "Actions", mobile: "large bottom buttons", tablet: "ticket actions", desktop: "lane-level quick actions" },
  ],

  snippets: [
    `.kds-shell { background:#11100E; color:#FFF7E8; font-family:Inter,system-ui,sans-serif; }`,
    `.ticket { background:#1F1D19; border:1px solid #3A342B; border-radius:12px; padding:14px; }`,
    `.ticket[data-state="fire"] { border-color:#F97316; box-shadow:0 0 0 3px rgba(249,115,22,.18); }`,
  ],

  successLooksLike: [
    "A cook can read order number, station, modifiers, allergens, and timer at a glance",
    "Fire, hold, ready, and completed states are visually distinct",
    "The style feels like a real kitchen display, not a restaurant homepage",
  ],

  failureLooksLike: [
    "A food delivery landing page",
    "Low contrast elegant text",
    "Order timing buried inside tiny metadata",
  ],

  tile: "tile-kitchendisplay",
  tileHTML: `
    <div style="height:150px;background:#11100E;color:#FFF7E8;display:flex;flex-direction:column;justify-content:space-between;padding:15px;font-family:Inter,system-ui,sans-serif">
      <div style="display:flex;justify-content:space-between;font:10px 'Roboto Mono',monospace;color:#F97316;letter-spacing:.1em;text-transform:uppercase"><span>expo</span><span>08:42</span></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <div style="background:#1F1D19;border:1px solid #F97316;border-radius:10px;padding:9px;font-size:11px"><b>#184</b><br/><span style="color:#B7AA96">fire</span></div>
        <div style="background:#1F1D19;border:1px solid #3A342B;border-radius:10px;padding:9px;font-size:11px"><b>#185</b><br/><span style="color:#22C55E">ready</span></div>
      </div>
      <div style="font-size:22px;font-weight:850;letter-spacing:-.03em;line-height:1">Service<br/>on time.</div>
    </div>
  `,
});

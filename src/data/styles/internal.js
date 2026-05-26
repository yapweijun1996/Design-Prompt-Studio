import { asFullPreset } from "./compact.js";

export const internal = asFullPreset({
  id: "internal",
  name: "Internal Tool",
  tag: "Pragmatic · grey · table",
  desc: "Grey/white. No-frills. Table + form rapid assembly. Retool / Airtable / Internal.io register.",

  feel: "An ops tool a dev built in an afternoon to unblock the support team — pragmatic, unglamorous, every widget earns its keep — not a polished SaaS product.",

  references: "Retool, Airtable interfaces, Internal.io, ToolJet, Appsmith, Budibase, low-code admin panels",

  boldFactor: [
    "Default fonts (system-ui / Inter) — no custom typography spend",
    "Greys + one accent blue — color used only for action and state",
    "Dense form layouts: 2-3 columns, labels left-aligned, inputs full-width",
    "Component grid: tables, forms, charts dropped in modular blocks",
    "Toolbar with action buttons (Refresh, Export CSV, Run query)",
    "Modals for create/edit forms — quick to build, OK to use",
    "Console-friendly: JSON viewers, query results, debug panels",
  ],

  tokens: {
    "bg":       { value: "#F4F5F7", usage: "App background" },
    "surface":  { value: "#FFFFFF", usage: "Card / panel" },
    "fg":       { value: "#1F2937", usage: "Body text" },
    "muted":    { value: "#6B7280", usage: "Secondary" },
    "brand":    { value: "#3366FF", usage: "Action blue" },
    "border":   { value: "#D1D5DB", usage: "Hairline border" },
  },

  typography: {
    display: '"Inter", system-ui, sans-serif',
    body:    '"Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", "Menlo", monospace',
    scale:   "11/12/13/14/16/20/24",
    weight:  "display 600 · body 400-500",
    tracking: "normal",
  },

  antiPatterns: [
    { name: "Marketing polish",   dont: "spend design time on hero illustration", why: "Internal tools value speed-to-ship over polish" },
    { name: "Custom typography",  dont: "load Söhne / Tiempos for an internal tool", why: "System fonts ship faster and there's no end-user brand to defend" },
    { name: "Dense info-design",  dont: "build Datadog-grade chart layouts", why: "Internal tools are CRUD-first; observability is a separate beast" },
    { name: "Cute illustration",  dont: "add Notion-style empty-state mascots", why: "Internal users want fast access, not delight detours" },
    { name: "Vibrant gradients",  dont: "use brand gradient backdrops", why: "Pragmatic = greys + one action blue; gradients waste pixels" },
  ],

  responsive: [
    { element: "Page padding",  mobile: "12px",  tablet: "16px",  desktop: "20px" },
    { element: "Form columns",  mobile: "1",     tablet: "2",     desktop: "3" },
    { element: "Row height",    mobile: "44px",  tablet: "40px",  desktop: "36px" },
  ],

  snippets: [
    `/* Form row — label left, input right */
.form-row { display: grid; grid-template-columns: 160px 1fr; gap: 12px; align-items: center; padding: 6px 0; }
.form-row label { font-size: 13px; color: #4B5563; }
.form-row input, .form-row select { height: 32px; padding: 0 10px; border: 1px solid #D1D5DB; border-radius: 4px; font-size: 13px; background: #FFFFFF; }`,
    `/* Action toolbar */
.toolbar { display: flex; gap: 8px; padding: 8px 12px; background: #FFFFFF; border-bottom: 1px solid #D1D5DB; }
.btn { background: #FFFFFF; border: 1px solid #D1D5DB; color: #1F2937; padding: 6px 12px; border-radius: 4px; font-size: 13px; cursor: pointer; }
.btn--primary { background: #3366FF; border-color: #3366FF; color: #FFFFFF; }
.btn:hover { background: #F4F5F7; }`,
    `/* JSON / query result panel */
.result-panel { background: #1F2937; color: #E5E7EB; font-family: "JetBrains Mono", monospace; font-size: 12px; padding: 12px; border-radius: 4px; max-height: 240px; overflow: auto; }`,
  ],

  successLooksLike: [
    "A Retool app built in 2 hours for a support workflow",
    "An Airtable interface for order management",
    "An internal admin built on Material UI defaults",
  ],

  failureLooksLike: [
    "Marketing-polished hero on an internal tool",
    "Custom-font landing for a CSV uploader",
    "Animated Lottie illustration on an empty form",
  ],

  tile: "tile-internal",
  tileHTML: `
    <div class="bar">Run query · Export CSV · ⟳</div>
    <div class="form">
      <div class="lbl">user_id</div><div class="ipt">42</div>
      <div class="lbl">status</div><div class="ipt">active</div>
    </div>
    <div class="json">{ "result": "ok" }</div>
  `,
});

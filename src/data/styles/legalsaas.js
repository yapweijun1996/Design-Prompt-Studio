import { asFullPreset } from "./compact.js";

export const legalsaas = asFullPreset({
  id: "legalsaas",
  name: "Legal Tech SaaS",
  tag: "Matter · billing · doc",
  desc: "Matter management + time tracking + document workflow. Clio / Casetext / Harvey / NetDocuments register.",

  feel: "An associate logging billable hours in Clio at 6pm — matter timeline, timer running, document repository, e-sign queue — not a corporate law-firm site dressed up as software.",

  references: "Clio, Casetext, Harvey AI, NetDocuments, MyCase, PracticePanther, Smokeball, Filevine",

  boldFactor: [
    "Matter / client list with case status, billable hours, next-event, lead attorney",
    "Time-tracking timer prominent: start/stop, code activity, attach to matter",
    "Document repository with version history + redline diff + e-sign workflow",
    "Billing surface: WIP, invoices ready, AR aging, trust account balance",
    "Conflict-of-interest check tool + new-client intake wizard",
    "Calm professional palette: deep navy + slate + warm accent (gold or burgundy)",
  ],

  tokens: {
    "bg":      { value: "#F7F8FA", usage: "App background" },
    "surface": { value: "#FFFFFF", usage: "Card surface" },
    "fg":      { value: "#0F1E33", usage: "Body navy" },
    "muted":   { value: "#5A6B7F", usage: "Secondary" },
    "brand":   { value: "#1F4FD9", usage: "Action blue" },
    "accent":  { value: "#7A2E2A", usage: "Burgundy accent" },
    "ok":      { value: "#1B7A3E", usage: "Billed / paid" },
    "warn":    { value: "#E08E00", usage: "Pending / WIP" },
    "border":  { value: "#D5DAE0", usage: "Border" },
  },

  typography: {
    display: '"Söhne", "Inter Display", "Source Serif 4", system-ui',
    body:    '"Inter", "Söhne", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "11/12/13/14/16/18/24/32",
    weight:  "display 600 · body 400-500 · numbers tabular",
  },

  antiPatterns: [
    { name: "Law-firm marketing site", dont: "design as if it's the firm's home page", why: "Legal SaaS = tool for lawyers, not a brand site" },
    { name: "Hidden timer",      dont: "tuck time-tracking 3 menus deep", why: "Billable hour = lifeblood; timer must be top-bar primary" },
    { name: "Vibrant SaaS palette", dont: "use playful colors", why: "Legal work is sober; calm navy/slate fits the user's mental model" },
    { name: "Stock courtroom photo", dont: "use gavel + scales-of-justice imagery", why: "Show product UI; cliché imagery erodes professional trust" },
  ],

  responsive: [
    { element: "Sidebar nav",   mobile: "drawer", tablet: "icon", desktop: "240px" },
    { element: "Matter list",   mobile: "1col card", tablet: "table", desktop: "table dense" },
  ],

  snippets: [
    `/* Matter row */
.matter-row { display: grid; grid-template-columns: 1fr auto auto auto auto; gap: 16px; padding: 12px 16px; border-bottom: 1px solid #D5DAE0; align-items: center; font-size: 14px; }
.matter-row .name { font-weight: 600; color: #0F1E33; }
.matter-row .client { font-size: 12px; color: #5A6B7F; }
.matter-row .hours { font-family: "JetBrains Mono", monospace; font-variant-numeric: tabular-nums; font-weight: 600; }
.matter-row .status { font-size: 11px; padding: 2px 8px; border-radius: 10px; }
.matter-row .status--active { background: #DBEAFE; color: #1F4FD9; }
.matter-row .status--billed { background: #DEFBE6; color: #1B7A3E; }`,
    `/* Time tracker */
.timer { display: inline-flex; align-items: center; gap: 12px; padding: 8px 16px; background: #FFFFFF; border: 1px solid #D5DAE0; border-radius: 999px; }
.timer .dot { width: 8px; height: 8px; border-radius: 50%; background: #1B7A3E; animation: pulse 2s ease-in-out infinite; }
.timer .clock { font-family: "JetBrains Mono", monospace; font-weight: 600; font-size: 18px; font-variant-numeric: tabular-nums; color: #0F1E33; }
.timer .matter { font-size: 13px; color: #5A6B7F; }
.timer .stop { background: #7A2E2A; color: #FFFFFF; border: 0; border-radius: 999px; padding: 4px 12px; font-size: 12px; font-weight: 600; cursor: pointer; }`,
  ],

  successLooksLike: [
    "Clio matter dashboard + billing",
    "Harvey AI legal-research interface",
  ],

  failureLooksLike: [
    "Law-firm marketing landing as 'legal tech tool'",
    "Vibrant playful palette on billing UI",
  ],

  tile: "tile-legalsaas",
  tileHTML: `
    <div class="tm">● 01:24:07 · Smith v. Acme · ⏹</div>
    <div class="row"><span>Smith v. Acme</span><span class="hr">12.4h</span><span class="st a">Active</span></div>
    <div class="row"><span>Estate of Jones</span><span class="hr">3.2h</span><span class="st b">Billed</span></div>
  `,
});

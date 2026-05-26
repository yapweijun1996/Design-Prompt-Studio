import { asFullPreset } from "./compact.js";

export const enterprise = asFullPreset({
  id: "enterprise",
  name: "Enterprise ERP",
  tag: "Dense · functional · system",
  desc: "High-density tables. System colors. Tight spacing. SAP / Oracle / Workday register — built for power users.",

  feel: "An SAP Fiori screen used by a controller closing the month — every pixel earns its place — not a marketing site dressed up as enterprise.",

  references: "SAP Fiori, Oracle Cloud, Workday, NetSuite, IBM Carbon Design System, Microsoft Fluent (Enterprise mode), Salesforce Lightning",

  boldFactor: [
    "Information density first: 12-14px body, 32-40px row heights in tables",
    "Functional palette: blue #0F62FE (action), green (success), amber (warn), red (error)",
    "Sticky toolbars, persistent left nav, breadcrumbs always visible",
    "Tabular numbers everywhere — alignment is a feature",
    "Inline validation, badge counts, status pills — UI talks to the user",
    "Subdued surfaces (#F4F4F4 / #FFF) — color reserved for state and action",
    "Form-first layouts: labels, helper text, required markers, field groups",
  ],

  tokens: {
    "bg":       { value: "#F4F4F4", usage: "App background" },
    "surface":  { value: "#FFFFFF", usage: "Card / panel surface" },
    "fg":       { value: "#161616", usage: "Body text" },
    "muted":    { value: "#525252", usage: "Secondary text" },
    "action":   { value: "#0F62FE", usage: "Primary action blue (Carbon)" },
    "success":  { value: "#198038", usage: "Success state" },
    "warn":     { value: "#F1C21B", usage: "Warning state" },
    "danger":   { value: "#DA1E28", usage: "Error state" },
    "border":   { value: "#E0E0E0", usage: "Divider / border" },
  },

  typography: {
    display: '"IBM Plex Sans", "Inter", system-ui',
    body:    '"IBM Plex Sans", "Inter", system-ui',
    mono:    '"IBM Plex Mono", "JetBrains Mono", monospace',
    scale:   "11/12/14/16/20/28/36",
    weight:  "display 500-600 · body 400 · numbers tabular",
    tracking: "normal · numbers tabular",
  },

  antiPatterns: [
    { name: "Marketing whitespace", dont: "use 128px section padding", why: "Enterprise users want density; whitespace = wasted screen real estate" },
    { name: "Display serif",        dont: "use Playfair / Source Serif", why: "ERP is utilitarian; serif reads as marketing site, not tool" },
    { name: "Decorative gradients", dont: "use brand gradient backgrounds", why: "Color must signal state (info/warn/error), not decoration" },
    { name: "Modal-driven UX",      dont: "open a modal for every action", why: "Power users want inline edit + side panel — modals interrupt flow" },
    { name: "Single-column form",   dont: "stack every field full-width", why: "Two/three-column form layouts reduce scroll and group related fields" },
  ],

  responsive: [
    { element: "Page padding",  mobile: "16px",  tablet: "24px",  desktop: "32px" },
    { element: "Row height",    mobile: "44px",  tablet: "40px",  desktop: "36px" },
    { element: "Sidebar width", mobile: "drawer", tablet: "224px", desktop: "256px" },
  ],

  snippets: [
    `/* Carbon-style data table */
.data-table { width: 100%; border-collapse: collapse; font-size: 14px; }
.data-table th { background: #F4F4F4; text-align: left; padding: 10px 16px; font-weight: 600; border-bottom: 1px solid #E0E0E0; }
.data-table td { padding: 8px 16px; border-bottom: 1px solid #E0E0E0; font-variant-numeric: tabular-nums; }
.data-table tr:hover td { background: #F9F9F9; }`,
    `/* Status pills */
.pill { display: inline-flex; align-items: center; gap: 4px; height: 20px; padding: 0 8px; border-radius: 10px; font-size: 12px; font-weight: 500; }
.pill--success { background: #DEFBE6; color: #044317; }
.pill--warn    { background: #FCF4D6; color: #684E00; }
.pill--danger  { background: #FFD7D9; color: #750E13; }`,
    `/* Toolbar */
.toolbar { display: flex; align-items: center; gap: 8px; height: 48px; padding: 0 16px; background: #FFFFFF; border-bottom: 1px solid #E0E0E0; position: sticky; top: 0; z-index: 10; }`,
  ],

  successLooksLike: [
    "An SAP Fiori invoice list",
    "Workday's expense report screen",
    "IBM Cloud console main view",
  ],

  failureLooksLike: [
    "Marketing landing page with one data table embedded",
    "Centered single-column form with 800px max-width",
    "Gradient hero on an admin screen",
  ],

  tile: "tile-enterprise",
  tileHTML: `
    <div class="row head">Invoice ▾ &nbsp; Status &nbsp; Amount</div>
    <div class="row"><span>INV-1042</span> <span class="pill ok">Paid</span> <span class="num">$12,400</span></div>
    <div class="row"><span>INV-1043</span> <span class="pill warn">Due</span> <span class="num">$8,920</span></div>
    <div class="row"><span>INV-1044</span> <span class="pill err">Late</span> <span class="num">$2,150</span></div>
  `,
});

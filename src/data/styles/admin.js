import { asFullPreset } from "./compact.js";

export const admin = asFullPreset({
  id: "admin",
  name: "Admin Dense",
  tag: "Sidebar · table-first · pro",
  desc: "Left rail navigation. Dense data tables. Bulk actions. Ant Design Pro / Metronic / Vuexy register.",

  feel: "An admin panel for a SaaS that just hit Series B — every screen is a table, every table has filters — not a marketing site dressed up as admin.",

  references: "Ant Design Pro, Metronic, Vuexy Admin, Tailwind UI Application templates, Refine.dev, AdminLTE 4, ProseUI Admin",

  boldFactor: [
    "Fixed left sidebar (220-256px) with icon + label nav items",
    "Top breadcrumb + page-title bar + primary action button",
    "Filter bar above every table: search, date range, status, owner, save view",
    "Tables: zebra rows, sortable headers, sticky header, row hover, bulk-select checkbox column",
    "Right-side detail drawer for row inspection (no full page nav)",
    "Inline pills for status, avatar+name combo for owner column",
    "Pagination + page-size selector + total count footer",
  ],

  tokens: {
    "bg":       { value: "#F9FAFB", usage: "App background" },
    "surface":  { value: "#FFFFFF", usage: "Card / panel surface" },
    "sidebar":  { value: "#111827", usage: "Dark sidebar background" },
    "sidebar-fg": { value: "#D1D5DB", usage: "Sidebar text" },
    "fg":       { value: "#111827", usage: "Body text" },
    "muted":    { value: "#6B7280", usage: "Secondary text" },
    "brand":    { value: "#2563EB", usage: "Primary action blue" },
    "border":   { value: "#E5E7EB", usage: "Borders" },
  },

  typography: {
    display: '"Inter", system-ui, sans-serif',
    body:    '"Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "11/12/13/14/16/20/24/30",
    weight:  "display 600 · body 400-500 · numbers tabular",
    tracking: "normal · numbers tabular",
  },

  antiPatterns: [
    { name: "Marketing whitespace", dont: "use 96px section padding on admin pages", why: "Admin = density; whitespace wastes screen for power users" },
    { name: "Top-only nav",         dont: "rely solely on horizontal top nav", why: "Left rail scales to 20+ sections; top nav doesn't" },
    { name: "Modal-per-action",     dont: "open a modal for every row action", why: "Use side drawer for inspect/edit — preserves table context" },
    { name: "Card grid for lists",  dont: "show 100 records as a card grid", why: "Tables let users scan/sort/filter faster than cards" },
    { name: "Full-page edit form",  dont: "navigate away to edit one field", why: "Inline-edit or drawer-edit keeps power users in flow" },
  ],

  responsive: [
    { element: "Sidebar",       mobile: "drawer", tablet: "icon-only", desktop: "220px" },
    { element: "Table padding", mobile: "8px",   tablet: "10px",  desktop: "12px" },
    { element: "Row height",    mobile: "48px",  tablet: "44px",  desktop: "40px" },
  ],

  snippets: [
    `/* App shell: sidebar + main */
.app-shell { display: grid; grid-template-columns: 220px 1fr; min-height: 100vh; }
.sidebar { background: #111827; color: #D1D5DB; padding: 16px 12px; position: sticky; top: 0; height: 100vh; overflow-y: auto; }
.sidebar a { display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-radius: 6px; color: inherit; font-size: 14px; }
.sidebar a:hover { background: rgba(255,255,255,0.06); }
.sidebar a.active { background: #2563EB; color: #FFF; }`,
    `/* Filter bar */
.filter-bar { display: flex; gap: 8px; align-items: center; padding: 12px 16px; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; }
.filter-bar input[type=search] { flex: 1; height: 32px; border: 1px solid #E5E7EB; border-radius: 6px; padding: 0 10px; font-size: 13px; }`,
    `/* Bulk-action bar (appears when rows selected) */
.bulk-bar { display: flex; gap: 8px; align-items: center; padding: 8px 16px; background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 8px; font-size: 13px; }
.bulk-bar .count { font-weight: 600; color: #1D4ED8; }`,
  ],

  successLooksLike: [
    "Ant Design Pro user management screen",
    "Tailwind UI Catalyst admin template",
    "Linear's settings → members table",
  ],

  failureLooksLike: [
    "Marketing landing-page hero on an admin index",
    "Card grid showing 200 customers",
    "Modal popping up for every row edit",
  ],

  tile: "tile-admin",
  tileHTML: `
    <div class="rail"></div>
    <div class="main">
      <div class="bar"></div>
      <div class="row"></div>
      <div class="row"></div>
      <div class="row"></div>
      <div class="row last"></div>
    </div>
  `,
});

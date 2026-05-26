import { asFullPreset } from "./compact.js";

export const crm = asFullPreset({
  id: "crm",
  name: "CRM Friendly",
  tag: "Pipeline · cards · warm",
  desc: "Soft rounded cards. Warm orange/blue accent. Pipeline kanban. HubSpot / Salesforce Lightning / Pipedrive register.",

  feel: "A sales rep dragging a deal from 'Qualified' to 'Proposal' in HubSpot — warm, encouraging, never punishing — not a cold ERP UI.",

  references: "HubSpot CRM, Salesforce Lightning Experience, Pipedrive, Close, Copper, Attio, Folk",

  boldFactor: [
    "Soft 12-16px rounded corners on every card / button / input",
    "Warm primary (orange #FF7A59 HubSpot OR friendly blue #0070D2 Lightning)",
    "Pipeline kanban: 5-7 columns, drag-and-drop cards, count + value per column",
    "Contact / company avatar with initials fallback (color hash)",
    "Activity timeline: emails, calls, meetings — chronological, vertical",
    "Inline edit on every record field — click → input → save on blur",
    "Friendly empty states with illustration + 'Create your first…' CTA",
  ],

  tokens: {
    "bg":      { value: "#F5F8FA", usage: "App background — cool tint" },
    "surface": { value: "#FFFFFF", usage: "Card surface" },
    "fg":      { value: "#33475B", usage: "HubSpot navy body" },
    "muted":   { value: "#7C98B6", usage: "Secondary copy" },
    "brand":   { value: "#FF7A59", usage: "HubSpot orange — primary CTA" },
    "ok":      { value: "#00BDA5", usage: "Won deal teal" },
    "warn":    { value: "#FFAB00", usage: "At-risk" },
    "border":  { value: "#CBD6E2", usage: "Card border" },
  },

  typography: {
    display: '"Lexend Deca", "Inter", system-ui',
    body:    '"Lexend Deca", "Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "12/13/14/16/18/24/32",
    weight:  "display 500-600 · body 400-500",
    tracking: "normal · slightly open for readability",
  },

  antiPatterns: [
    { name: "Dense data table",  dont: "use 8px row padding ERP-style", why: "CRM users prefer card/kanban views; tables exist but are spacious" },
    { name: "Cold grey palette", dont: "use Carbon greys exclusively", why: "Sales tools are warmer — orange/teal accents encourage action" },
    { name: "Hard corners",      dont: "use 0-2px border-radius", why: "Soft rounded corners signal 'friendly tool', not 'enterprise system'" },
    { name: "Modal-only edit",   dont: "open modal to edit a contact's email", why: "Inline-edit on every field — click cell, type, blur saves" },
    { name: "Sterile empty state", dont: "show 'No records found' plain text", why: "Friendly illustration + 'Add your first deal' CTA is the convention" },
  ],

  responsive: [
    { element: "Card radius",     mobile: "10px",  tablet: "12px",  desktop: "14px" },
    { element: "Kanban col width", mobile: "stack", tablet: "280px", desktop: "300px" },
    { element: "Section padding", mobile: "16px",  tablet: "24px",  desktop: "32px" },
  ],

  snippets: [
    `/* Kanban column */
.kanban-col { width: 300px; background: #F5F8FA; border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 8px; }
.kanban-col-head { display: flex; justify-content: space-between; align-items: center; font-size: 13px; font-weight: 600; color: #33475B; padding: 4px 8px; }
.kanban-col-count { background: #FFFFFF; border-radius: 10px; padding: 2px 8px; font-size: 12px; color: #7C98B6; }`,
    `/* Deal card */
.deal-card { background: #FFFFFF; border: 1px solid #CBD6E2; border-radius: 8px; padding: 12px; cursor: grab; }
.deal-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.06); border-color: #FF7A59; }
.deal-name { font-weight: 500; font-size: 14px; color: #33475B; }
.deal-amt { color: #00BDA5; font-weight: 600; font-size: 13px; font-variant-numeric: tabular-nums; }`,
    `/* Avatar with initials */
.avatar { width: 32px; height: 32px; border-radius: 50%; background: #FF7A59; color: #FFFFFF; display: inline-flex; align-items: center; justify-content: center; font-weight: 600; font-size: 13px; }`,
  ],

  successLooksLike: [
    "HubSpot deals pipeline view",
    "Salesforce Lightning Opportunity Kanban",
    "Attio contact record page",
  ],

  failureLooksLike: [
    "ERP-dense table for managing 50 deals",
    "Dark dashboard UI with neon kanban",
    "All-grey palette with hard square corners",
  ],

  tile: "tile-crm",
  tileHTML: `
    <div class="col">
      <div class="head">Qualified <span class="ct">5</span></div>
      <div class="card"><div class="nm">Acme Corp</div><div class="amt">$12.4k</div></div>
      <div class="card"><div class="nm">Globex</div><div class="amt">$8.2k</div></div>
    </div>
    <div class="col">
      <div class="head">Proposal <span class="ct">3</span></div>
      <div class="card hl"><div class="nm">Initech</div><div class="amt">$24k</div></div>
    </div>
  `,
});

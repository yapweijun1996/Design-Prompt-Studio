import { asFullPreset } from "./compact.js";

export const treasurydesk = asFullPreset({
  id: "treasurydesk",
  name: "Treasury Desk",
  tag: "finance ops · cash · approvals",
  desc: "A finance-operations style for cash positions, payment approvals, treasury workflows, FX exposure, and audit-ready ledgers.",
  sampleTemplate: "dashboard",

  feel: "A CFO control room: sober, exact, table-led, and built around cash movement, exceptions, approvals, and audit trails.",

  references: "Modern Treasury, Brex, Ramp treasury tools, Mercury, Stripe Treasury, Wise Business, Bloomberg terminal restraint",

  boldFactor: [
    "Cash position and exceptions lead the first viewport",
    "Approvals, counterparties, payment rails, and risk flags are visible",
    "Tables are compact and scannable, never decorative cards only",
    "Use tabular numerals and exact timestamps",
    "Audit trails and maker-checker states are first-class UI",
  ],

  tokens: {
    bg: { value: "#F5F7F8", usage: "Finance workspace" },
    panel: { value: "#FFFFFF", usage: "Ledger panels" },
    fg: { value: "#10202A", usage: "Primary financial data" },
    muted: { value: "#63717B", usage: "Metadata and helper text" },
    accent: { value: "#087B5B", usage: "Approved / primary action" },
    warning: { value: "#B7791F", usage: "Review states" },
    danger: { value: "#B42318", usage: "Failed / blocked transfers" },
    border: { value: "#D8E0E5", usage: "Ledger dividers" },
  },

  typography: {
    display: '"Inter Tight", "IBM Plex Sans", system-ui',
    body: '"Inter", "IBM Plex Sans", system-ui',
    mono: '"IBM Plex Mono", "JetBrains Mono", monospace',
    scale: "11/12/13/14/16/20/28/42",
    weight: "display 650-760 · data 500-650 · body 400",
    tracking: "labels +0.07em, numbers tabular",
  },

  antiPatterns: [
    { name: "Fintech confetti", dont: "use playful gradients and cartoon money icons", why: "Treasury users need trust and precision" },
    { name: "Card-only finance", dont: "replace ledgers with big vague KPI cards", why: "Cash operations need row-level detail" },
    { name: "Hidden approvals", dont: "bury maker-checker state in a modal", why: "Approval state is the workflow" },
    { name: "Marketing bank blue", dont: "make it look like a consumer bank landing page", why: "This is an operations desk" },
  ],

  responsive: [
    { element: "Cash overview", mobile: "stacked summary with exception list", tablet: "summary + approval queue", desktop: "cash grid, exposure rail, approval queue" },
    { element: "Ledger table", mobile: "row cards with key fields", tablet: "horizontally scrollable table", desktop: "dense table with sticky columns" },
    { element: "Approval action", mobile: "sticky bottom bar", tablet: "side panel", desktop: "right inspector rail" },
  ],

  snippets: [
    `.treasury-shell { background:#F5F7F8; color:#10202A; font-family:Inter,system-ui,sans-serif; }`,
    `.ledger-row { display:grid; grid-template-columns:120px 1fr 110px 90px; gap:14px; border-bottom:1px solid #D8E0E5; padding:12px 0; }`,
    `.money { font-variant-numeric:tabular-nums; font-family:'IBM Plex Mono',monospace; }`,
  ],

  successLooksLike: [
    "Cash, risk, and approvals are understandable in one scan",
    "A finance operator can trace every payment to owner and status",
    "The UI feels operational and credible, not promotional",
  ],

  failureLooksLike: [
    "A generic fintech landing page",
    "Oversized KPIs without transaction detail",
    "Approvals hidden behind unclear buttons",
  ],

  tile: "tile-treasurydesk",
  tileHTML: `
    <div style="height:150px;background:#F5F7F8;color:#10202A;display:flex;flex-direction:column;justify-content:space-between;padding:15px;font-family:Inter,system-ui,sans-serif">
      <div style="font:10px 'IBM Plex Mono',monospace;color:#087B5B;letter-spacing:.1em;text-transform:uppercase">treasury desk</div>
      <div style="font-size:30px;font-weight:760;letter-spacing:-.04em;line-height:1">$2.84M<br/><span style="font-size:13px;color:#63717B;font-weight:500">available cash</span></div>
      <div style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;font-size:11px"><span style="height:8px;background:#D8E0E5;border-radius:99px"><i style="display:block;width:72%;height:8px;background:#087B5B;border-radius:99px"></i></span><b style="color:#B7791F">3 review</b></div>
    </div>
  `,
});

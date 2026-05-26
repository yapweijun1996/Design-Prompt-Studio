import { asFullPreset } from "./compact.js";

export const bizcard = asFullPreset({
  id: "bizcard",
  name: "Corporate Spend",
  tag: "Cards · receipts · controls",
  desc: "Corporate card issuance + expense capture + spend controls. Ramp / Brex / Pleo / Spendesk register.",

  feel: "A startup CFO closing the month in Ramp — cards-by-employee, receipts auto-matched, policy violations flagged — not a personal-banking UI dressed up as B2B.",

  references: "Ramp, Brex, Pleo, Spendesk, Airbase, Divvy, Mesh Payments",

  boldFactor: [
    "Card issuance flow: physical + virtual cards per employee with spend limit + category",
    "Real-time transaction feed: merchant + employee + amount + auto-matched receipt",
    "Receipt capture: drag image / forward email → auto-extract + match to txn",
    "Spend controls UI: vendor allow/block lists, daily/monthly caps, MCC restrictions",
    "Reimbursement workflow: claim + approve + bank-transfer in one screen",
    "AI / automation badges: 'Auto-categorized', 'Receipt extracted', 'Policy match'",
  ],

  tokens: {
    "bg":      { value: "#FFFFFF", usage: "Page white" },
    "bg-soft": { value: "#F7F8FA", usage: "Section alt" },
    "fg":      { value: "#0E0F11", usage: "Body near-black" },
    "muted":   { value: "#6B7079", usage: "Secondary" },
    "brand":   { value: "#FFCC00", usage: "Ramp yellow (or orange #FF5000 Brex)" },
    "ok":      { value: "#0A8C5C", usage: "Approved" },
    "warn":    { value: "#E08E00", usage: "Policy violation" },
    "border":  { value: "#E1E3E8", usage: "Card border" },
  },

  typography: {
    display: '"Söhne", "Inter Display", system-ui',
    body:    '"Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "11/12/14/16/18/24/32",
    weight:  "display 600-700 · body 400-500 · numbers tabular",
  },

  antiPatterns: [
    { name: "Personal-bank UI",   dont: "use consumer banking palette/tone", why: "B2B spend = CFO + ops + employees; different mental model" },
    { name: "Manual receipt entry", dont: "force users to upload receipts manually", why: "Auto-extract + auto-match is the modern table-stake" },
    { name: "Hidden controls",   dont: "tuck spend rules in deep settings", why: "Spend controls + policy violations are core admin surface" },
    { name: "Modal-driven flow", dont: "open modals for every transaction approve", why: "Inline approve / one-tap approval is the genre" },
  ],

  responsive: [
    { element: "Txn feed",   mobile: "1col card", tablet: "table", desktop: "table 1-row" },
    { element: "Card UI",    mobile: "stacked", tablet: "grid 2", desktop: "grid 3" },
  ],

  snippets: [
    `/* Transaction row with receipt match */
.spend-txn { display: grid; grid-template-columns: 32px 1fr auto auto auto; gap: 12px; padding: 12px 16px; border-bottom: 1px solid #E1E3E8; align-items: center; font-size: 14px; }
.spend-txn .merch { font-weight: 500; color: #0E0F11; }
.spend-txn .who { font-size: 12px; color: #6B7079; }
.spend-txn .amt { font-variant-numeric: tabular-nums; font-weight: 600; }
.spend-txn .badge { display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: 600; }
.spend-txn .badge--auto { background: #F0F7E8; color: #0A8C5C; }
.spend-txn .badge--warn { background: #FFF4E0; color: #E08E00; }`,
    `/* Virtual card */
.virt-card { background: linear-gradient(135deg, #0E0F11 0%, #2A2D33 100%); color: #FFFFFF; border-radius: 12px; padding: 16px; aspect-ratio: 1.586/1; max-width: 320px; }
.virt-card .num { font-family: "JetBrains Mono", monospace; font-size: 18px; letter-spacing: 0.08em; margin-top: 36px; font-variant-numeric: tabular-nums; }
.virt-card .name { font-size: 11px; color: rgba(255,255,255,0.7); letter-spacing: 0.04em; text-transform: uppercase; margin-top: 8px; }`,
  ],

  successLooksLike: [
    "Ramp transaction feed with auto-categorized + receipt-matched",
    "Brex card-issuance flow",
  ],

  failureLooksLike: [
    "Personal-banking UI cosplaying as B2B spend",
    "Manual receipt-upload flow on a 'modern' platform",
  ],

  tile: "tile-bizcard",
  tileHTML: `
    <div class="card"><div class="num">···· 8421</div><div class="nm">Engineering · monthly</div></div>
    <div class="row"><span>Vercel</span><span>Jordan M.</span><span class="amt">$240.00</span><span class="bd ok">✓ Auto</span></div>
    <div class="row"><span>Notion</span><span>Priya R.</span><span class="amt">$80.00</span><span class="bd wn">⚠ Policy</span></div>
  `,
});

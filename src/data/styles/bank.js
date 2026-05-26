import { asFullPreset } from "./compact.js";

export const bank = asFullPreset({
  id: "bank",
  name: "Personal Banking",
  tag: "Accounts · transfer · trust",
  desc: "Account tiles + transaction list. Transfer / pay flows. Chase / DBS / Revolut Personal / Citibank register.",

  feel: "Logging into Chase to pay the credit-card bill on payday — accounts at the top, transactions below, transfer is two taps — not a marketing site cosplaying as banking.",

  references: "Chase (US), DBS digibank (SG), HSBC, Citibank, Bank of America, Revolut, OCBC, Maybank",

  boldFactor: [
    "Account summary tiles at the top: checking, savings, credit card, mortgage — balance + masked account number",
    "Recent-transactions list with category icons, amount, balance after",
    "Quick actions: Pay bill, Transfer, Deposit, Statements — accessible from any screen",
    "Trust palette: deep navy / royal blue + cream + restrained accent (gold, green)",
    "Security signals: last-login timestamp, secure-session indicator, biometric badge",
    "Bill-pay flow with payee directory + scheduled-payments list",
    "Mobile-first responsive — consumer banking lives on phones",
  ],

  tokens: {
    "bg":       { value: "#F4F6F9", usage: "App background" },
    "surface":  { value: "#FFFFFF", usage: "Card surface" },
    "fg":       { value: "#0B2545", usage: "Deep navy body" },
    "muted":    { value: "#5C6B7F", usage: "Secondary text" },
    "brand":    { value: "#0A4D8C", usage: "Royal banking blue" },
    "accent":   { value: "#C9A24B", usage: "Gold loyalty accent (or green)" },
    "ok":       { value: "#1B7A3E", usage: "Credit / positive balance" },
    "danger":   { value: "#C8252C", usage: "Debit / overdraft" },
    "border":   { value: "#D5DAE0", usage: "Card border" },
  },

  typography: {
    display: '"Söhne", "Inter Display", system-ui',
    body:    '"Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "11/12/13/14/16/20/28/40",
    weight:  "display 600-700 · body 400-500 · numbers 600 tabular",
    tracking: "display tight (-0.01em) · numbers tabular",
  },

  antiPatterns: [
    { name: "Marketing-y palette", dont: "use playful pink-purple gradients", why: "Banking = trust + restraint; playful palette breaks the trust register" },
    { name: "Proportional balance numbers", dont: "use default font-variant-numeric on $", why: "Currency MUST be tabular-nums; alignment is non-negotiable" },
    { name: "Hidden security",   dont: "tuck last-login / session timer in a menu", why: "Security signals (last-login, biometric badge) belong on the dashboard" },
    { name: "Stock smiling-couple photo", dont: "use generic 'family at laptop' imagery", why: "Show real app UI screenshots; banking trust = product UI, not aspiration" },
    { name: "Aggressive upsell",  dont: "block dashboard with 'Open a credit card!' modal", why: "Personal banking is utility-first; upsell strips are OK, modals break trust" },
  ],

  responsive: [
    { element: "Account tile",   mobile: "1col",  tablet: "2col",  desktop: "3-4col" },
    { element: "Quick actions",  mobile: "icon-row", tablet: "icon+label",  desktop: "icon+label" },
    { element: "Transaction list", mobile: "100%",   tablet: "100%",  desktop: "100%" },
  ],

  snippets: [
    `/* Account tile */
.account-tile { background: #FFFFFF; border: 1px solid #D5DAE0; border-radius: 12px; padding: 20px; }
.account-tile .name { font-size: 13px; color: #5C6B7F; text-transform: uppercase; letter-spacing: 0.06em; }
.account-tile .num { font-family: "JetBrains Mono", monospace; font-size: 12px; color: #5C6B7F; margin: 4px 0; font-variant-numeric: tabular-nums; }
.account-tile .balance { font-family: "Söhne", system-ui; font-weight: 700; font-size: 28px; color: #0B2545; font-variant-numeric: tabular-nums; line-height: 1; margin: 8px 0; }
.account-tile .balance .cents { font-size: 18px; color: #5C6B7F; }
.account-tile .change { font-size: 12px; color: #1B7A3E; font-variant-numeric: tabular-nums; }`,
    `/* Transaction row */
.txn-row { display: grid; grid-template-columns: 36px 1fr auto auto; gap: 12px; padding: 12px 16px; border-bottom: 1px solid #D5DAE0; align-items: center; }
.txn-row .icon { width: 36px; height: 36px; border-radius: 50%; background: #F4F6F9; display: grid; place-items: center; color: #5C6B7F; }
.txn-row .desc { font-size: 14px; color: #0B2545; }
.txn-row .when { font-size: 12px; color: #5C6B7F; }
.txn-row .amt { font-size: 14px; font-weight: 600; font-variant-numeric: tabular-nums; }
.txn-row .amt--neg { color: #0B2545; }
.txn-row .amt--pos { color: #1B7A3E; }
.txn-row .bal { font-size: 12px; color: #5C6B7F; font-variant-numeric: tabular-nums; }`,
    `/* Quick-action row */
.quick-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.quick-btn { background: #FFFFFF; border: 1px solid #D5DAE0; border-radius: 12px; padding: 14px; text-align: center; cursor: pointer; }
.quick-btn .ico { width: 28px; height: 28px; margin: 0 auto 6px; color: #0A4D8C; }
.quick-btn .lbl { font-size: 13px; font-weight: 500; color: #0B2545; }`,
  ],

  successLooksLike: [
    "Chase dashboard with accounts + recent txns + quick actions",
    "DBS digibank account overview",
    "Revolut personal home with multi-currency tiles",
  ],

  failureLooksLike: [
    "Playful pink-purple gradient on a banking app",
    "Balance figure in proportional numbers (lost alignment)",
    "Marketing landing 'open a credit card' modal blocking the dashboard",
  ],

  tile: "tile-bank",
  tileHTML: `
    <div class="acc">
      <div class="nm">CHECKING · ···4821</div>
      <div class="bal">$8,420<span class="c">.18</span></div>
    </div>
    <div class="qr">⇄ Transfer &nbsp; ⓟ Pay bill &nbsp; ⤓ Deposit</div>
    <div class="txn"><span>Stripe payout</span><span class="pos">+$3,200.00</span></div>
    <div class="txn"><span>Whole Foods</span><span class="neg">−$82.40</span></div>
  `,
});

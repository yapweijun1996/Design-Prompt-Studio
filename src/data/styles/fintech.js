import { asFullPreset } from "./compact.js";

export const fintech = asFullPreset({
  id: "fintech",
  name: "Fintech Clean",
  tag: "Calm · cards · data",
  desc: "Mint or muted indigo. Card-based balance/transaction UI. Tabular numbers. Mercury / Wise / Brex register.",

  feel: "Logging into Mercury after your Series A closed — calm, confident with money, never anxious-flashy — not a crypto exchange wearing a suit.",

  references: "Mercury.com, Wise (TransferWise), Brex, Ramp, Stripe Atlas, Monzo, Revolut Business, Lithic",

  boldFactor: [
    "Mint green #0FA968 OR muted indigo #5048E5 as the single brand color",
    "Card-based layout: balance cards, transaction rows, account tiles",
    "Tabular numbers EVERYWHERE — alignment is non-negotiable",
    "Sparkline / micro-chart inline with currency figures",
    "Soft borders + tiny shadows (no big SaaS drop shadows)",
    "Currency formatting with proper typography ($, decimals, locale)",
    "Subtle accent illustration of money/cards/charts — not stock people",
  ],

  tokens: {
    "bg":      { value: "#FAFAF7", usage: "Page tint — warmer than pure white" },
    "surface": { value: "#FFFFFF", usage: "Card surface" },
    "fg":      { value: "#0F1419", usage: "Near-black body" },
    "muted":   { value: "#6B7280", usage: "Secondary copy" },
    "brand":   { value: "#0FA968", usage: "Mint — positive balance, primary CTA" },
    "danger":  { value: "#DC2626", usage: "Negative balance, decline" },
    "border":  { value: "#E8E6E0", usage: "Card borders, dividers" },
  },

  typography: {
    display: '"Söhne", "Inter", system-ui',
    body:    '"Inter", system-ui, sans-serif',
    mono:    '"IBM Plex Mono", monospace',
    scale:   "12/13/14/16/20/28/40/56",
    weight:  "display 500-600 · body 400-500 · numbers 500 tabular",
    tracking: "display tight (-0.02em) · body normal · numbers tabular-nums",
  },

  antiPatterns: [
    { name: "Crypto neon glow",  dont: "use neon green-on-black trading UI", why: "Calm fintech ≠ crypto exchange; mint is calm, neon is anxious" },
    { name: "Stock office photos", dont: "use Shutterstock laptop-on-desk", why: "Use product UI screenshots — money apps sell the actual UI" },
    { name: "Proportional numbers", dont: "use default font-variant-numeric", why: "Currency columns MUST be tabular-nums or alignment breaks" },
    { name: "Loud marketing copy", dont: "write '10x your finances'", why: "Fintech voice is measured: 'Banking that just works'" },
    { name: "Crypto rainbow",    dont: "use purple-pink gradient hero", why: "Reads as crypto/Web3, not boring-trustworthy banking" },
  ],

  responsive: [
    { element: "Section padding",  mobile: "32px",  tablet: "64px",  desktop: "96px" },
    { element: "Card radius",      mobile: "12px",  tablet: "14px",  desktop: "16px" },
    { element: "Balance type",     mobile: "32px",  tablet: "44px",  desktop: "56px" },
  ],

  snippets: [
    `/* Balance card */
.balance-card {
  background: #FFFFFF; border: 1px solid #E8E6E0; border-radius: 16px;
  padding: 24px; box-shadow: 0 1px 2px rgba(0,0,0,0.04);
}
.balance-amount { font-family: "Söhne", "Inter", system-ui; font-size: 44px; font-weight: 500; line-height: 1; font-variant-numeric: tabular-nums; color: #0F1419; }
.balance-label { font-size: 13px; color: #6B7280; margin-bottom: 8px; letter-spacing: 0.02em; text-transform: uppercase; }`,
    `/* Transaction row */
.txn { display: grid; grid-template-columns: 40px 1fr auto; gap: 12px; align-items: center; padding: 12px 0; border-bottom: 1px solid #E8E6E0; }
.txn-amt { font-variant-numeric: tabular-nums; font-weight: 500; font-size: 14px; }
.txn-amt--neg { color: #0F1419; } .txn-amt--pos { color: #0FA968; }`,
    `/* Inline sparkline */
.sparkline { display: inline-block; width: 60px; height: 18px; vertical-align: middle; }
/* Use SVG <polyline stroke="#0FA968" stroke-width="1.5" fill="none"/> for the line. */`,
  ],

  successLooksLike: [
    "Mercury dashboard — balance card, transaction list, calm mint accent",
    "Wise transfer flow — clear FX rate, fee breakdown, tabular numbers",
    "Brex card management screen",
  ],

  failureLooksLike: [
    "Crypto exchange dashboard with green-on-black candlesticks",
    "Marketing landing with stock photo of person at laptop",
    "Balance figure in proportional font (numbers don't align)",
  ],

  tile: "tile-fintech",
  tileHTML: `
    <div class="label">CHECKING · USD</div>
    <div class="bal">$248,902<span class="cents">.41</span></div>
    <div class="row"><span>Stripe payout</span><span class="pos">+$12,400.00</span></div>
    <div class="row"><span>AWS</span><span class="neg">−$1,820.55</span></div>
  `,
});

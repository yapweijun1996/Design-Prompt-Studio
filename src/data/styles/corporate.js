import { asFullPreset } from "./compact.js";

export const corporate = asFullPreset({
  id: "corporate",
  name: "Corporate Trust",
  tag: "Enterprise · navy · serif",
  desc: "Deep navy + warm grey. Restrained serif logo. Generous whitespace. IBM / Accenture / Deloitte register.",

  feel: "Walking into the lobby of a 60-year-old consultancy — confident, quiet, unmistakably expensive — not a 2024 startup pretending Fortune 500.",

  references: "IBM.com, Accenture, Deloitte, Bain, KPMG, PwC, BlackRock annual report, Goldman Sachs",

  boldFactor: [
    "Deep navy #0B1F3A as the only brand color (no rainbow)",
    "One subtle accent (gold #C9A24B or muted teal #2E7D7B) — used sparingly",
    "Generous whitespace: 96-160px section padding on desktop",
    "Editorial serif (Source Serif / Tiempos) for display, system sans for UI",
    "Photography of real people in real rooms — no stock illustration",
    "Numbers, dates, and stats given typographic weight (revenue, AUM, clients)",
  ],

  tokens: {
    "bg":      { value: "#FFFFFF", usage: "Paper white" },
    "bg-alt":  { value: "#F5F2EC", usage: "Warm grey for alternating sections" },
    "fg":      { value: "#0B1F3A", usage: "Brand navy — body & display" },
    "muted":   { value: "#5A6679", usage: "Secondary copy" },
    "accent":  { value: "#C9A24B", usage: "Gold accent — used 1-2x per page" },
    "rule":    { value: "#D9D3C7", usage: "Hairline dividers" },
  },

  typography: {
    display: '"Source Serif 4", "Tiempos Headline", Georgia, serif',
    body:    '"Inter", "Helvetica Neue", system-ui, sans-serif',
    mono:    '"IBM Plex Mono", monospace',
    scale:   "12/14/16/18/22/32/48/72",
    weight:  "display 400-600 · body 400-500",
    tracking: "display tight (-0.01em) · body normal · stat numbers tabular",
  },

  antiPatterns: [
    { name: "Gradient hero",    dont: "use vibrant gradients", why: "Trust comes from restraint; gradients read as startup, not institution" },
    { name: "Emoji in copy",    dont: "drop emoji in headlines or CTAs", why: "Institutional voice is sober; emoji breaks the frame" },
    { name: "Cartoon illustration", dont: "use Notion-style blob illustration", why: "Real photography of real people is the trust signal" },
    { name: "Rounded everything", dont: "use 16-24px border-radius everywhere", why: "Sharp 2-4px corners read more institutional than pillowy" },
    { name: "Marketing superlatives", dont: "write 'revolutionary' or 'game-changing'", why: "Numbers and case studies do the work; adjectives undermine credibility" },
  ],

  responsive: [
    { element: "Section padding", mobile: "48px",  tablet: "80px",  desktop: "128px" },
    { element: "Hero serif",      mobile: "40px",  tablet: "56px",  desktop: "72px" },
    { element: "Body measure",    mobile: "100%",  tablet: "60ch",  desktop: "68ch" },
  ],

  snippets: [
    `/* Hairline section divider */
.section + .section { border-top: 1px solid #D9D3C7; }
.eyebrow { font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: #5A6679; }`,
    `/* Stat block — the headline-grabber on corporate sites */
.stat { font-family: "Source Serif 4", Georgia, serif; font-size: 72px; line-height: 0.95; color: #0B1F3A; font-feature-settings: "tnum"; }
.stat-label { font-size: 14px; letter-spacing: 0.06em; text-transform: uppercase; color: #5A6679; margin-top: 8px; }`,
    `/* Editorial pull quote */
.pull-quote { font-family: "Source Serif 4", serif; font-size: 32px; line-height: 1.3; max-width: 24ch; border-left: 2px solid #C9A24B; padding-left: 24px; }`,
  ],

  successLooksLike: [
    "IBM.com homepage — serif headlines, muted palette, real photography",
    "Deloitte Insights article page",
    "A BlackRock annual report cover",
  ],

  failureLooksLike: [
    "A SaaS landing with one navy nav bar bolted on",
    "Gradient hero + blob illustration",
    "Emoji in the hero headline",
  ],

  tile: "tile-corporate",
  tileHTML: `
    <div class="eyebrow">GLOBAL · 2025</div>
    <div class="word">Trust,<br/>at scale.</div>
    <div class="rule"></div>
    <div class="stat">$2.4T</div>
    <div class="label">ASSETS MANAGED</div>
  `,
});

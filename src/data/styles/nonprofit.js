import { asFullPreset } from "./compact.js";

export const nonprofit = asFullPreset({
  id: "nonprofit",
  name: "Nonprofit Mission",
  tag: "Story · donate · impact",
  desc: "Story-driven hero. Impact numbers. Donate-CTA prominent. Charity:Water / Patagonia Action Works / Doctors Without Borders register.",

  feel: "Landing on Charity:Water on Giving Tuesday — the cause hits you in the chest, donating is one tap, transparency is built in — not an institutional NGO site cosplaying as mission-driven.",

  references: "charitywater.org, patagonia.com/action-works, doctorswithoutborders.org, kiva.org, donorschoose.org, oxfam.org, wwf.org, room-to-read.org",

  boldFactor: [
    "Story-driven hero: full-bleed photograph of the people / place + one-line mission",
    "Donate CTA is the loudest, most persistent button on the site (header + multiple sections)",
    "Impact numbers: '$1 = 1 month of clean water' / '12,400 schools built'",
    "Transparency strip: 100% donations strike-through, audited financials link",
    "Story-driven case studies: name + photo + quote from a real beneficiary",
    "Ways to give: monthly, one-time, sponsor, fundraise, corporate, planned giving",
    "Volunteer / partner CTAs as secondary actions",
  ],

  tokens: {
    "bg":      { value: "#FFFFFF", usage: "Page white" },
    "bg-alt":  { value: "#F5F2EC", usage: "Section alt — warm" },
    "fg":      { value: "#1A1A1A", usage: "Body ink" },
    "muted":   { value: "#5C5C5C", usage: "Caption" },
    "brand":   { value: "#FFC907", usage: "Charity:Water yellow OR mission-specific" },
    "trust":   { value: "#1B6CAC", usage: "Trust blue — links, accreditation" },
    "border":  { value: "#E5E5E5", usage: "Hairline" },
  },

  typography: {
    display: '"Söhne", "Inter Display", "Knockout", system-ui',
    body:    '"Söhne", "Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "12/14/16/18/22/32/48/72",
    weight:  "display 700-800 · body 400-500 · stat numbers 700",
    tracking: "display tight (-0.02em) · stat numbers tabular",
  },

  antiPatterns: [
    { name: "Buried donate CTA", dont: "tuck donate behind a menu", why: "Donate is the primary action — header + every section needs it visible" },
    { name: "Stock smiling-children photo", dont: "use Shutterstock NGO imagery", why: "Use real photography of real recipients (with consent + dignity)" },
    { name: "Vague impact",     dont: "say 'We help thousands'", why: "Concrete numbers + $-to-impact mapping is the trust mechanic" },
    { name: "Corporate voice",  dont: "write 'Our stakeholders…'", why: "Voice: 'A girl named Amani walks 4 hours for water. Here's how you change that.'" },
    { name: "No transparency",  dont: "hide financials / accreditation", why: "Donors give to trustworthy orgs — show ratings, audits, 100% model" },
  ],

  responsive: [
    { element: "Section padding", mobile: "48px",  tablet: "80px",  desktop: "112px" },
    { element: "Hero type",       mobile: "40px",  tablet: "56px",  desktop: "72px" },
    { element: "Donate CTA",      mobile: "sticky bottom", tablet: "header", desktop: "header + sections" },
  ],

  snippets: [
    `/* Story hero */
.cause-hero { position: relative; height: 80vh; overflow: hidden; background: #1A1A1A; }
.cause-hero img { width: 100%; height: 100%; object-fit: cover; }
.cause-hero::after { content: ""; position: absolute; inset: 0; background: linear-gradient(0deg, rgba(0,0,0,0.6), transparent 60%); }
.cause-hero h1 { position: absolute; bottom: 64px; left: 48px; color: #FFFFFF; font-family: "Söhne", "Knockout", sans-serif; font-weight: 800; font-size: 72px; line-height: 0.95; letter-spacing: -0.025em; max-width: 18ch; z-index: 2; }`,
    `/* Donate button — bold, friendly */
.btn-donate { display: inline-flex; align-items: center; gap: 8px; background: #FFC907; color: #1A1A1A; border: 0; border-radius: 999px; padding: 14px 28px; font-weight: 700; font-size: 16px; cursor: pointer; box-shadow: 0 2px 8px rgba(255,201,7,0.4); }
.btn-donate:hover { background: #E6B505; transform: translateY(-1px); }`,
    `/* Impact stat row */
.impact-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; padding: 64px 24px; text-align: center; }
.impact-stat .num { font-family: "Söhne", "Knockout", sans-serif; font-weight: 800; font-size: 72px; color: #1B6CAC; font-variant-numeric: tabular-nums; line-height: 1; letter-spacing: -0.02em; }
.impact-stat .label { font-size: 16px; color: #5C5C5C; margin-top: 12px; max-width: 24ch; margin-inline: auto; }`,
  ],

  successLooksLike: [
    "charitywater.org with persistent donate CTA",
    "doctorswithoutborders.org appeal page",
    "patagonia.com/action-works grant-funded story page",
  ],

  failureLooksLike: [
    "Institutional NGO site with hidden donate in footer",
    "Stock photo of smiling children with no story",
    "Vague impact ('We help many') with no numbers",
  ],

  tile: "tile-nonprofit",
  tileHTML: `
    <div class="img"></div>
    <div class="word">Water<br/>changes<br/>everything.</div>
    <div class="impact"><strong>703M</strong> people without clean water · today.</div>
    <div class="btn">DONATE $30</div>
  `,
});

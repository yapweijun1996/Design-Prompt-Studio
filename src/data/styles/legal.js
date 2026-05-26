import { asFullPreset } from "./compact.js";

export const legal = asFullPreset({
  id: "legal",
  name: "Legal / Law Firm",
  tag: "Sober · serif · partner-bios",
  desc: "Deep navy / oxblood. Conservative serif. Partner bios + practice areas. Wachtell / Allen & Overy / WongPartnership register.",

  feel: "Researching a corporate-law firm at 11pm before a deal — sober, confidence-by-restraint, partner bios show 30 years of M&A — not a marketing site cosplaying as Big Law.",

  references: "Wachtell Lipton, Allen & Overy, Latham & Watkins, Sullivan & Cromwell, WongPartnership, Allen & Gledhill, Linklaters, Slaughter and May",

  boldFactor: [
    "Deep navy (#0B1F3A) or oxblood red — single brand color, used with restraint",
    "Conservative serif (Garamond / Caslon / Source Serif) for display and partner names",
    "Partner / Counsel directory: name + practice area + bio + bar admissions",
    "Practice-area landing pages: M&A, Litigation, Tax, Capital Markets, etc.",
    "Insights / Client Memo section: dated PDFs on legal/regulatory developments",
    "Award strip: Chambers, Legal 500, IFLR rankings — quietly displayed",
    "Office locations grid: city + address + flagship partner",
  ],

  tokens: {
    "bg":      { value: "#FFFFFF", usage: "Paper white" },
    "bg-alt":  { value: "#F5F2EC", usage: "Section alt — warm grey" },
    "fg":      { value: "#0B1F3A", usage: "Body deep navy" },
    "muted":   { value: "#5A6679", usage: "Caption, metadata" },
    "accent":  { value: "#7A1F2B", usage: "Oxblood accent — used 1-2x per page" },
    "rule":    { value: "#CFC9B8", usage: "Hairline rule" },
  },

  typography: {
    display: '"Sabon", "Source Serif 4", "Caslon", Georgia, serif',
    body:    '"Source Serif 4", "Sabon", Georgia, serif',
    mono:    '"IBM Plex Mono", monospace',
    scale:   "11/12/14/16/18/24/32/48",
    weight:  "display 400-500 · body 400 · italic for journal titles + Latin",
    tracking: "display tight (-0.01em) · body normal · small-caps for offices",
  },

  antiPatterns: [
    { name: "Marketing illustration", dont: "use blob or modern illustration", why: "Law-firm trust comes from restraint; illustration reads as marketing agency" },
    { name: "Aggressive CTAs",       dont: "use 'Hire us today' bold buttons", why: "Voice: 'Speak with a partner' / 'Contact our practice'" },
    { name: "Stock courthouse photo", dont: "use generic gavel / courthouse stock", why: "Authentic firm photography (partners at desk, office interiors) or none" },
    { name: "Bright color palette",  dont: "use saturated brand colors", why: "Navy + oxblood + paper — saturation breaks the institutional register" },
    { name: "Hidden partner bios",   dont: "show only practice areas — no partners", why: "Clients hire individual lawyers, not abstract 'expertise' — bios are central" },
  ],

  responsive: [
    { element: "Section padding", mobile: "48px",  tablet: "80px",  desktop: "128px" },
    { element: "Hero serif",      mobile: "32px",  tablet: "44px",  desktop: "60px" },
    { element: "Article measure", mobile: "100%",  tablet: "62ch",  desktop: "68ch" },
  ],

  snippets: [
    `/* Partner card */
.partner-card { display: grid; grid-template-rows: 240px auto; gap: 0; background: #FFFFFF; }
.partner-card img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(10%); }
.partner-card .body { padding: 16px 0; border-top: 1px solid #CFC9B8; }
.partner-card .name { font-family: "Sabon", serif; font-size: 18px; font-weight: 500; color: #0B1F3A; }
.partner-card .role { font-family: "Source Serif 4", serif; font-style: italic; font-size: 14px; color: #7A1F2B; margin-top: 4px; }
.partner-card .area { font-size: 13px; color: #5A6679; margin-top: 6px; }`,
    `/* Practice-area hero */
.practice-hero { padding: 96px 32px; background: #FFFFFF; }
.practice-hero .eyebrow { font-family: "Source Serif 4", serif; font-size: 13px; color: #7A1F2B; letter-spacing: 0.16em; text-transform: uppercase; }
.practice-hero h1 { font-family: "Sabon", serif; font-weight: 400; font-size: 60px; line-height: 1.05; color: #0B1F3A; margin: 12px 0 0; max-width: 20ch; }
.practice-hero .deck { font-family: "Source Serif 4", serif; font-style: italic; font-size: 22px; line-height: 1.45; color: #5A6679; max-width: 36ch; margin-top: 24px; }`,
    `/* Award strip */
.awards { display: flex; gap: 32px; padding: 32px 0; border-top: 1px solid #CFC9B8; border-bottom: 1px solid #CFC9B8; align-items: center; opacity: 0.8; }
.awards .award { font-family: "Source Serif 4", serif; font-size: 13px; color: #5A6679; font-style: italic; }`,
  ],

  successLooksLike: [
    "Wachtell Lipton partner directory",
    "Allen & Overy practice-area page with partner bios",
    "WongPartnership Chambers-quoted profile",
  ],

  failureLooksLike: [
    "SaaS landing with 'Try our legal service free' CTA",
    "Stock gavel + scales-of-justice hero image",
    "Vibrant brand color + Notion-blob illustration",
  ],

  tile: "tile-legal",
  tileHTML: `
    <div class="brow">PRACTICE · M&A</div>
    <div class="word">Counsel<br/>on the<br/>most<br/>complex<br/>matters.</div>
    <div class="rule"></div>
    <div class="aw">Chambers · Tier 1</div>
  `,
});

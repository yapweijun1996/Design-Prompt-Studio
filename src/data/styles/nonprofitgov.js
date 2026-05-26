import { asFullPreset } from "./compact.js";

export const nonprofitgov = asFullPreset({
  id: "nonprofitgov",
  name: "Nonprofit-Gov Hybrid",
  tag: "Civic · service · transparent",
  desc: "Civic-nonprofit hybrid — service delivery, eligibility check, donate + apply both visible. United Way / Code for America / Red Cross / civic-tech orgs register.",

  feel: "Visiting a 211 service-finder site to help a neighbor get food assistance — clear civic palette, apply-for-help AND donate-to-help both prominent — not a marketing landing for either.",

  references: "United Way (211.org), Code for America projects, Red Cross, Salvation Army, Feeding America, World Central Kitchen, civic-tech foundations, government foundation hybrids",

  boldFactor: [
    "Two parallel CTAs above the fold: 'Find help' (eligible recipient) + 'Give help' (donor)",
    "Eligibility / service-finder tool: ZIP + need category → matched programs",
    "Program cards: agency + service description + eligibility + apply path",
    "Donate flow with impact mapping: '$50 = a week of meals for 1 family'",
    "Transparency strip: 990 download, board, financials, audited statements",
    "Civic palette: trust blue + warm cream + ONE warm accent (red, orange)",
    "Multilingual + accessibility-first surface",
  ],

  tokens: {
    "bg":      { value: "#FBF9F4", usage: "Warm cream" },
    "surface": { value: "#FFFFFF", usage: "Card" },
    "fg":      { value: "#1A2A3A", usage: "Body navy" },
    "muted":   { value: "#5A6B7F", usage: "Secondary" },
    "trust":   { value: "#1B5E9C", usage: "Civic trust blue" },
    "warm":    { value: "#D62828", usage: "Warm action red" },
    "ok":      { value: "#1B7A3E", usage: "Eligible / approved" },
    "border":  { value: "#D9D2C0", usage: "Soft border" },
  },

  typography: {
    display: '"Söhne", "Inter Display", system-ui',
    body:    '"Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "12/14/16/18/22/28/40/56",
    weight:  "display 600-700 · body 400-500",
  },

  antiPatterns: [
    { name: "Donor-only emphasis", dont: "treat the site only as fundraising", why: "Hybrid serves BOTH recipients and donors — both CTAs visible" },
    { name: "Recipient-only emphasis", dont: "treat as government services only", why: "Donor / volunteer pathways are equally important; hybrid is the genre" },
    { name: "Insider jargon",   dont: "use 'wrap-around services'", why: "Plain English — 'help with rent / food / job training'" },
    { name: "Hidden transparency", dont: "tuck 990 / financials in footer", why: "Audited financials build trust for both donors and partners" },
  ],

  responsive: [
    { element: "Hero CTAs",     mobile: "stack", tablet: "split", desktop: "side-by-side" },
    { element: "Service finder", mobile: "stacked form", tablet: "row form", desktop: "row form + map" },
  ],

  snippets: [
    `/* Dual-CTA hero */
.npg-hero { padding: 80px 32px; background: #FBF9F4; display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
.npg-cta { background: #FFFFFF; border: 1px solid #D9D2C0; border-radius: 16px; padding: 32px; }
.npg-cta h2 { font-size: 28px; font-weight: 700; margin: 0 0 8px; color: #1A2A3A; }
.npg-cta--recipient h2 { color: #1B5E9C; }
.npg-cta--donor h2 { color: #D62828; }
.npg-cta .btn { display: inline-block; padding: 12px 24px; border-radius: 999px; font-weight: 600; font-size: 15px; margin-top: 16px; cursor: pointer; text-decoration: none; }
.npg-cta--recipient .btn { background: #1B5E9C; color: #FFFFFF; }
.npg-cta--donor .btn { background: #D62828; color: #FFFFFF; }`,
    `/* Service-finder form */
.svc-finder { background: #FFFFFF; border-radius: 12px; padding: 24px; border: 2px solid #1B5E9C; }
.svc-finder-row { display: grid; grid-template-columns: 1fr 1fr auto; gap: 12px; }
.svc-finder input, .svc-finder select { padding: 10px 14px; border: 1px solid #D9D2C0; border-radius: 6px; font-size: 15px; }
.svc-finder button { background: #1B5E9C; color: #FFFFFF; border: 0; border-radius: 6px; padding: 10px 24px; font-weight: 600; cursor: pointer; }`,
  ],

  successLooksLike: [
    "211.org service finder + donate path",
    "Feeding America food-bank locator + donate",
  ],

  failureLooksLike: [
    "Donor-only fundraising landing (no service finder)",
    "Government-only services page (no donate / volunteer)",
  ],

  tile: "tile-nonprofitgov",
  tileHTML: `
    <div class="rg">
      <div class="r"><b>Find help</b><span>I need assistance</span></div>
      <div class="d"><b>Give help</b><span>I want to donate</span></div>
    </div>
    <div class="impact"><strong>$50</strong> = 1 week of meals for a family</div>
  `,
});

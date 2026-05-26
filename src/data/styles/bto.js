import { asFullPreset } from "./compact.js";

export const bto = asFullPreset({
  id: "bto",
  name: "Government Housing (BTO)",
  tag: "Eligibility · scheme · queue",
  desc: "Civic housing portal. Eligibility check + scheme cards + application status. HDB (Singapore) / HKHA / KHFC register.",

  feel: "Checking BTO eligibility on HDB's site as a first-time applicant — calc tool front-and-center, scheme comparison clear, application status traceable — not a SaaS-style 'product' landing.",

  references: "hdb.gov.sg (Singapore), housingauthority.gov.hk (HK), khfc.co.kr (Korea), data.gov.sg HDB datasets, gov-style civic housing portals",

  boldFactor: [
    "Eligibility calculator: income ceiling, citizenship, household, age, owned-property checkboxes",
    "Scheme cards: BTO, SBF, Open Booking, Resale — each with quota, price range, wait time",
    "Application status tracker: Ballot → Selection → Signing → Key collection (timeline)",
    "Plain-language explanations of housing schemes — never insider jargon",
    "Tabular project listings: project name, town, flat types, est. completion, indicative price",
    "Government civic palette: deep blue + white + sparing accent (yellow for action)",
    "WCAG-AA strict + multi-language (EN / 中文 / 멜레유 / Tamil for SG context)",
  ],

  tokens: {
    "bg":       { value: "#FFFFFF", usage: "Page white" },
    "bg-soft":  { value: "#F0F4F8", usage: "Section alt" },
    "fg":       { value: "#1A2A3A", usage: "Body ink" },
    "muted":    { value: "#5A6B7F", usage: "Secondary text" },
    "brand":    { value: "#0066B3", usage: "Civic blue (HDB)" },
    "action":   { value: "#FFC107", usage: "Action yellow (apply CTA)" },
    "ok":       { value: "#0E7C40", usage: "Eligible / approved" },
    "danger":   { value: "#C62828", usage: "Not eligible" },
    "border":   { value: "#CFD8DC", usage: "Border" },
  },

  typography: {
    display: '"Inter", "Söhne", "Noto Sans SC", system-ui',
    body:    '"Inter", "Noto Sans SC", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "12/14/16/18/22/28/36/44",
    weight:  "display 600-700 · body 400-500 · numbers tabular",
    tracking: "normal · numbers tabular",
  },

  antiPatterns: [
    { name: "SaaS marketing voice", dont: "write 'Make your housing journey magical'", why: "Civic voice: 'Apply for a new BTO flat. Check your eligibility.'" },
    { name: "Hidden eligibility",  dont: "make users guess if they qualify", why: "Eligibility calc is the #1 surface — answer 'can I apply?' in 3 fields" },
    { name: "Insider jargon",      dont: "use 'EHG' / 'EIP / SPR' without explanation", why: "Plain-language + glossary; assume zero domain knowledge" },
    { name: "Marketing illustration", dont: "use Lottie blob illustrations", why: "Civic sites are taken seriously — illustration must be informational" },
    { name: "Mobile afterthought", dont: "build a desktop-only flow", why: "Most applicants check on phones — mobile-first is non-negotiable" },
  ],

  responsive: [
    { element: "Section padding", mobile: "16px",  tablet: "32px",  desktop: "48px" },
    { element: "Body type",       mobile: "16px",  tablet: "17px",  desktop: "18px" },
    { element: "Scheme cards",    mobile: "1col",  tablet: "2col",  desktop: "3col" },
  ],

  snippets: [
    `/* Eligibility calc */
.bto-calc { background: #FFFFFF; border: 2px solid #0066B3; border-radius: 8px; padding: 24px; }
.bto-calc h3 { font-size: 22px; color: #1A2A3A; margin: 0 0 16px; }
.bto-calc-row { display: grid; grid-template-columns: 1fr auto; gap: 12px; padding: 8px 0; border-bottom: 1px solid #CFD8DC; align-items: center; }
.bto-calc-row label { font-size: 15px; color: #1A2A3A; }
.bto-calc-row select, .bto-calc-row input { padding: 8px 12px; border: 1px solid #CFD8DC; border-radius: 4px; font-size: 15px; min-width: 200px; }
.bto-calc-result { margin-top: 16px; padding: 16px; border-radius: 4px; }
.bto-calc-result.ok { background: #E0F2E9; border: 1px solid #0E7C40; color: #0E7C40; font-weight: 600; }
.bto-calc-result.no { background: #FDECEC; border: 1px solid #C62828; color: #C62828; font-weight: 600; }`,
    `/* Scheme card */
.scheme-card { background: #FFFFFF; border: 1px solid #CFD8DC; border-radius: 8px; padding: 20px; }
.scheme-card .name { font-size: 20px; font-weight: 700; color: #1A2A3A; }
.scheme-card .desc { font-size: 14px; color: #5A6B7F; margin: 6px 0 12px; line-height: 1.45; }
.scheme-card .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 12px 0; border-top: 1px solid #CFD8DC; font-size: 13px; color: #5A6B7F; }
.scheme-card .stats strong { color: #1A2A3A; font-variant-numeric: tabular-nums; }`,
    `/* Application status tracker */
.bto-status { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; position: relative; padding: 16px 0; }
.bto-status::before { content: ""; position: absolute; top: 36px; left: 12%; right: 12%; height: 2px; background: #CFD8DC; z-index: 0; }
.bto-step { text-align: center; position: relative; z-index: 1; }
.bto-step .dot { width: 28px; height: 28px; border-radius: 50%; background: #FFFFFF; border: 2px solid #CFD8DC; margin: 0 auto 8px; display: grid; place-items: center; font-weight: 700; color: #5A6B7F; }
.bto-step.done .dot { background: #0E7C40; border-color: #0E7C40; color: #FFFFFF; }
.bto-step.current .dot { background: #0066B3; border-color: #0066B3; color: #FFFFFF; }
.bto-step .lbl { font-size: 13px; color: #1A2A3A; font-weight: 500; }`,
  ],

  successLooksLike: [
    "hdb.gov.sg BTO project listing + eligibility tool",
    "Hong Kong Housing Authority application status page",
    "KHFC (Korea) housing eligibility flow",
  ],

  failureLooksLike: [
    "SaaS-style 'Make housing magical' marketing landing",
    "Eligibility tool buried 4 menus deep",
    "Insider jargon (EHG / EIP / SPR) without explanation",
  ],

  overrideGlobalRules: [
    "Plain-language voice is REQUIRED — overrides any marketing-style guidance.",
    "WCAG-AA strict contrast is mandatory — overrides 'subtle muted text' aesthetics.",
    "Mobile-first responsive is REQUIRED — overrides desktop-led layout guidance.",
  ],

  tile: "tile-bto",
  tileHTML: `
    <div class="hd">CHECK BTO ELIGIBILITY</div>
    <div class="row"><span>Household income</span><b>≤ $14,000</b></div>
    <div class="row"><span>Singapore Citizen</span><b>✓ Yes</b></div>
    <div class="ok">✓ Eligible · proceed to apply</div>
  `,
});

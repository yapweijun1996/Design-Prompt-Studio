import { asFullPreset } from "./compact.js";

export const government = asFullPreset({
  id: "government",
  name: "Government Formal",
  tag: "Civic · accessible · plain",
  desc: "Civic blue + white. Plain language. WCAG-strict contrast. GOV.UK / USWDS / Singapore gov register.",

  feel: "Filing a tax return on GOV.UK at 11pm — boring, clear, accessible, you trust it works — not a marketing site cosplaying as official.",

  references: "GOV.UK, USWDS (U.S. Web Design System), Canada.ca, Singapore gov sites, Australia.gov.au, NHS.uk, gov-style design systems",

  boldFactor: [
    "Civic blue (#1D70B8 GOV.UK OR #005EA2 USWDS) + black + white — three colors total",
    "Plain-language voice: 'Apply for…' 'Check your…' — verbs and pronouns",
    "WCAG-AA strict: 4.5:1 body, 3:1 large text, visible focus rings on EVERY interactive",
    "Skip-to-content link, semantic HTML, ARIA labels, proper heading hierarchy",
    "Task-based IA: 'Pay your tax' not 'Department of Revenue'",
    "Status banners (yellow/red/green) for service outages and notices",
    "Forms with explicit error summary at top + per-field inline errors",
  ],

  tokens: {
    "bg":      { value: "#FFFFFF", usage: "Page white" },
    "bg-alt":  { value: "#F3F2F1", usage: "GOV.UK light grey alt section" },
    "fg":      { value: "#0B0C0C", usage: "Body ink black" },
    "muted":   { value: "#505A5F", usage: "Secondary text" },
    "brand":   { value: "#1D70B8", usage: "Civic blue — links, CTA" },
    "focus":   { value: "#FFDD00", usage: "Yellow focus ring (high contrast)" },
    "danger":  { value: "#D4351C", usage: "Error red" },
    "ok":      { value: "#00703C", usage: "Success green" },
    "border":  { value: "#B1B4B6", usage: "Border grey" },
  },

  typography: {
    display: '"GDS Transport", "Helvetica Neue", "Arial", sans-serif',
    body:    '"GDS Transport", "Helvetica Neue", "Arial", sans-serif',
    mono:    '"Courier New", monospace',
    scale:   "14/16/19/24/30/36/48",
    weight:  "display 700 · body 400 · numbers tabular",
    tracking: "normal — Transport / Helvetica were chosen for readability",
  },

  antiPatterns: [
    { name: "Marketing illustration", dont: "use Lottie / blob illustration", why: "Civic sites are taken seriously — illustration reads frivolous" },
    { name: "Low-contrast text",     dont: "use grey-on-grey for body", why: "WCAG-AA is non-negotiable; gov sites legally require it" },
    { name: "Brand-color CTA spam",  dont: "make every button blue", why: "Blue = primary action only; secondary buttons are outline / grey" },
    { name: "Carousel hero",         dont: "auto-rotate hero banners", why: "Carousels fail accessibility + comprehension; use a single clear hero" },
    { name: "Modal popups",          dont: "open a modal for cookie consent", why: "Use a non-blocking banner; modals trap focus + frustrate users" },
  ],

  responsive: [
    { element: "Section padding", mobile: "16px",  tablet: "32px",  desktop: "48px" },
    { element: "Body type",       mobile: "16px",  tablet: "19px",  desktop: "19px" },
    { element: "Tap target",      mobile: "44px",  tablet: "44px",  desktop: "40px" },
  ],

  snippets: [
    `/* GOV.UK-style hero (no image, just clear copy) */
.gov-hero { background: #1D70B8; color: #FFFFFF; padding: 48px 24px; }
.gov-hero h1 { font-family: "GDS Transport", Arial, sans-serif; font-weight: 700; font-size: 48px; line-height: 1.1; margin: 0 0 16px; }
.gov-hero p { font-size: 19px; line-height: 1.5; max-width: 30em; margin: 0; }`,
    `/* Action link with chevron */
.gov-link { color: #1D70B8; text-decoration: underline; text-underline-offset: 0.15em; font-weight: 700; font-size: 19px; }
.gov-link:hover { color: #003078; }
.gov-link:focus { background: #FFDD00; color: #0B0C0C; outline: 3px solid #FFDD00; outline-offset: 0; box-shadow: 0 -2px #FFDD00, 0 4px #0B0C0C; text-decoration: none; }`,
    `/* Error summary block (top of form) */
.error-summary { border: 4px solid #D4351C; padding: 16px; margin-bottom: 32px; background: #FFFFFF; }
.error-summary h2 { color: #D4351C; font-size: 24px; margin: 0 0 8px; }
.error-summary ul { padding-left: 20px; margin: 0; }
.error-summary a { color: #D4351C; font-weight: 700; text-decoration: underline; }`,
  ],

  successLooksLike: [
    "GOV.UK 'Apply for a passport' service page",
    "USWDS-built federal agency homepage",
    "Singapore Life SG portal landing",
  ],

  failureLooksLike: [
    "SaaS gradient hero on a tax filing page",
    "Carousel hero with stock images of diverse citizens",
    "Grey-on-grey body text failing contrast",
  ],

  overrideGlobalRules: [
    "WCAG-AA strict contrast is mandatory — overrides any 'subtle muted text' aesthetic guidance.",
    "Focus rings must be visible and high-contrast — overrides any 'remove default focus' styling.",
  ],

  tile: "tile-government",
  tileHTML: `
    <div class="crown">GOV·UK</div>
    <div class="hero">
      <div class="word">Apply for<br/>a passport</div>
      <div class="sub">Use this service to apply for a new passport.</div>
      <div class="btn">Start now →</div>
    </div>
  `,
});

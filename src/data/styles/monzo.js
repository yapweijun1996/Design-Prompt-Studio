import { asFullPreset } from "./compact.js";

export const monzo = asFullPreset({
  id: "monzo",
  name: "Neobank Bold",
  tag: "Color-blocked · friendly fintech · confident",
  desc: "Bold consumer-fintech marketing. Big color-blocked sections, oversized friendly sans, one hot brand color, playful but trustworthy. Money made approachable.",
  feel: "A Monzo / Revolut / Cash App page — confident hot-coral blocks, huge rounded type, a phone mockup, cheerful and direct. Bold, not corporate-grey.",
  references: "monzo.com, Revolut, Cash App, N26, Wise, Starling Bank",
  boldFactor: [
    "Full-bleed color-blocked sections that alternate (hot coral, ink, off-white)",
    "Oversized friendly sans headlines (rounded grotesque), short and confident",
    "One hot signature color used fearlessly across large fields",
    "A phone-app mockup as the recurring hero device",
    "Big rounded buttons, generous radii, cheerful micro-copy",
  ],
  tokens: {
    "bg":       { value: "#FFFFFF", usage: "Page" },
    "ink":      { value: "#11131A", usage: "Dark block / text" },
    "fg":       { value: "#11131A", usage: "Text" },
    "accent":   { value: "#FF3B5C", usage: "Hot coral — the brand block" },
    "accent-2": { value: "#FFD166", usage: "Warm secondary pop" },
    "muted":    { value: "#5B5F6B", usage: "Secondary text" },
  },
  typography: {
    display: '"Space Grotesk", "Inter", system-ui, sans-serif',
    body:    '"Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", ui-monospace, monospace',
    scale:   "14/16/18/24/34/52/76",
    weight:  "display 700 · body 400-500",
    tracking: "display tight (-0.03em) · body normal",
  },
  antiPatterns: [
    { name: "Corporate grey", dont: "use a muted bank-blue corporate palette", why: "neobank energy is BOLD color blocks, not institutional grey" },
    { name: "Tiny type", dont: "use small timid headlines", why: "oversized confident type is the whole vibe" },
    { name: "Sharp edges", dont: "use hard square corners", why: "generous rounding signals friendly-modern money" },
  ],
  responsive: [
    { element: "Section padding", mobile: "48px", tablet: "80px", desktop: "112px" },
    { element: "Hero type",       mobile: "44px", tablet: "64px", desktop: "76px" },
    { element: "Body",            mobile: "17px", tablet: "18px", desktop: "18px" },
  ],
  snippets: [
    `/* Full-bleed color block */
.block--coral { background:#FF3B5C; color:#fff; }
.block--ink { background:#11131A; color:#fff; }
.block { padding:clamp(48px,8vw,112px) 0; }`,
    `/* Big rounded pill button */
.btn { background:#11131A; color:#fff; border:none; border-radius:999px; padding:16px 28px; font-weight:600; font-size:17px; }
.btn--on-coral { background:#fff; color:#FF3B5C; }`,
  ],
  successLooksLike: ["monzo.com", "Revolut home", "Cash App marketing"],
  failureLooksLike: ["muted corporate bank-blue", "tiny timid headlines", "sharp grey enterprise cards"],
  overrideGlobalRules: [
    "Large saturated color fields ARE the design here — overrides 'no aggressive color backgrounds'; used as deliberate brand blocks, not slop.",
  ],
  tile: "tile-premium",
  tileHTML: `<div style="height:150px;display:grid;grid-template-rows:1fr auto;font-family:Inter,system-ui">
    <div style="background:#FF3B5C;color:#fff;padding:16px;display:flex;flex-direction:column;justify-content:center">
      <div style="font-family:'Space Grotesk',sans-serif;font-size:30px;font-weight:700;letter-spacing:-.03em;line-height:1">Money,<br/>made easy.</div>
    </div>
    <div style="background:#11131A;color:#fff;padding:10px 16px;display:flex;justify-content:space-between;align-items:center">
      <span style="font-size:12px;opacity:.8">No fees, no fuss</span>
      <span style="background:#fff;color:#FF3B5C;font-size:12px;font-weight:600;padding:5px 12px;border-radius:999px">Get the app</span>
    </div>
  </div>`,
});

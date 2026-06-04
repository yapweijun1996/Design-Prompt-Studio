import { asFullPreset } from "./compact.js";

export const aurora = asFullPreset({
  id: "aurora",
  name: "Aurora",
  tag: "Aurora gradient · dark · luminous",
  desc: "Dark canvas lit from within by a luminous aurora gradient. Modern AI / dev-product register — indigo→violet→cyan bloom, glassy edges, a tight grotesque. Premium, current, restrained.",
  sampleTemplate: "product",
  feel: "Linear's aurora hero / a Vercel Ship keynote / Resend — a dark room lit by a slow-moving gradient. Looks built by people who ship, not by a template.",
  references: "Linear (aurora hero), Vercel Ship, Resend, Framer, Perplexity, Cursor, Midjourney",
  boldFactor: [
    "Near-black blue canvas (#08080F) lit by a large soft aurora bloom (indigo #6366F1 → violet #A855F7 → cyan #22D3EE) — light grows from within, never flat black",
    "A clean modern grotesque (Geist / Inter / Söhne), tight and confident — the gradient is the only flourish",
    "Glassy hairline-bordered surfaces with a subtle inner highlight and soft outer glow — depth from light, not heavy shadow",
    "ONE luminous gradient used with restraint: the hero wash + a single gradient CTA/keyline; everything else is calm dark neutrals",
    "Crisp near-white headlines over the bloom, muted slate body, generous spacing — high contrast, never busy",
  ],
  tokens: {
    "bg":       { value: "#08080F", usage: "Near-black blue canvas" },
    "surface":  { value: "#12121C", usage: "Elevated glass surface" },
    "fg":       { value: "#F4F4F8", usage: "Near-white text" },
    "muted":    { value: "#9AA0B4", usage: "Secondary" },
    "border":   { value: "#23233A", usage: "Cool hairline" },
    "accent":   { value: "#818CF8", usage: "Indigo — base of the aurora" },
    "gradient": { value: "linear-gradient(120deg,#6366F1,#A855F7,#22D3EE)", usage: "The aurora — hero wash + one CTA only" },
  },
  typography: {
    display: '"Geist", "Inter", "Söhne", system-ui, sans-serif',
    body:    '"Inter", "Söhne", system-ui, sans-serif',
    mono:    '"Geist Mono", "JetBrains Mono", monospace',
    scale:   "13/15/17/21/30/46/66",
    weight:  "display 500-600 · body 400 · tight",
    tracking: "display -0.02em · body normal · body line-height 1.6",
  },
  antiPatterns: [
    { name: "Flat black", dont: "use pure #000 with no light", why: "the aurora bloom IS the style; flat black reads as a generic dark template" },
    { name: "Rainbow overload", dont: "scatter many gradients / neon everywhere", why: "one restrained aurora; overuse reads as a crypto-scam page" },
    { name: "Heavy shadows", dont: "use big dark drop-shadows for depth", why: "depth here is light — glow + inner highlight, not blur" },
    { name: "Decorative type", dont: "use a display serif or rounded font", why: "a tight modern grotesque keeps it credible and fast" },
  ],
  responsive: [
    { element: "Section padding", mobile: "56px", tablet: "96px",  desktop: "128px" },
    { element: "Hero type",       mobile: "34px", tablet: "48px",  desktop: "66px" },
    { element: "Body / measure",  mobile: "17px", tablet: "17px / 60ch", desktop: "18px / 62ch" },
  ],
  snippets: [
    `/* Aurora hero bloom on near-black */
.hero { background:
  radial-gradient(60% 50% at 50% 0%, rgba(168,85,247,.28), transparent 70%),
  radial-gradient(50% 40% at 82% 12%, rgba(34,211,238,.20), transparent 70%),
  #08080F; }
.hero h1 { font-family:"Geist",Inter,sans-serif; font-weight:600; font-size:clamp(34px,6vw,66px); letter-spacing:-.02em; line-height:1.05; color:#F4F4F8; }
.hero p { color:#9AA0B4; font-size:18px; line-height:1.6; max-width:60ch; }`,
    `/* Glass surface + the single gradient CTA */
.card { background:#12121C; border:1px solid #23233A; border-radius:16px; box-shadow:inset 0 1px 0 rgba(255,255,255,.05), 0 0 40px rgba(99,102,241,.10); }
.btn { background:linear-gradient(120deg,#6366F1,#22D3EE); color:#fff; border:0; border-radius:10px; padding:12px 22px; font-weight:600; box-shadow:0 0 30px rgba(99,102,241,.45); }`,
  ],
  successLooksLike: ["Linear's aurora landing", "a Vercel Ship keynote page", "Resend / Perplexity hero"],
  failureLooksLike: ["flat pure-black generic dark template", "neon rainbow crypto-scam gradients everywhere", "heavy drop-shadow cards", "serif or rounded display font"],
  overrideGlobalRules: [
    "A luminous aurora gradient on a near-black canvas is the register — overrides any 'avoid gradients / prefer flat' default; the bloom is the signature, used with restraint (hero + one CTA).",
  ],
  tile: "tile-premium",
  tileHTML: `<div style='height:150px;background:radial-gradient(70% 60% at 50% 0%,rgba(168,85,247,.45),transparent 70%),radial-gradient(60% 50% at 85% 20%,rgba(34,211,238,.30),transparent 70%),#08080F;display:flex;flex-direction:column;justify-content:space-between;padding:18px;font-family:Inter,system-ui,sans-serif;color:#F4F4F8'><div style='font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#A5B4FC'>Ship faster</div><div style='font-size:25px;font-weight:600;letter-spacing:-.02em;line-height:1.05'>Build at the<br/>speed of thought.</div><div style='align-self:flex-start;font-size:11px;font-weight:600;color:#fff;background:linear-gradient(120deg,#6366F1,#22D3EE);border-radius:8px;padding:7px 14px;box-shadow:0 0 24px rgba(99,102,241,.55)'>Start building →</div></div>`,
});

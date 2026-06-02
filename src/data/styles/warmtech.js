import { asFullPreset } from "./compact.js";

export const warmtech = asFullPreset({
  id: "warmtech",
  name: "Warm Minimal",
  tag: "Cream · humanist · calm-intelligent",
  desc: "Warm, intelligent minimalism for AI/tech and thoughtful products. Cream/sand canvas, a humanist serif or warm grotesque, calm confidence, generous space. Smart without being cold.",
  feel: "Anthropic.com / Linear's warmer moments / a Stripe Press book — warm off-white, considered type, unhurried and intelligent. Tech that feels human and trustworthy, not clinical SaaS-blue.",
  references: "anthropic.com, Stripe Press, Linear, Readwise, Things, Oak (Heptabase), Maven",
  boldFactor: [
    "Warm cream/sand canvas (#F4F0E8) — never stark white or cold grey",
    "A humanist serif (Tiempos / Newsreader / Source Serif) for display, paired with a clean sans body — calm, literate",
    "A single grounded accent (terracotta / clay #C2683E or deep ink) — warm, not tech-blue",
    "Generous whitespace, long readable measure, unhurried pacing — confidence through calm",
    "Subtle, soft depth: hairline warm borders, gentle shadows; tasteful restrained motion",
  ],
  tokens: {
    "bg":       { value: "#F4F0E8", usage: "Warm cream canvas" },
    "surface":  { value: "#FBF9F3", usage: "Cards" },
    "fg":       { value: "#2A2723", usage: "Warm ink" },
    "muted":    { value: "#6B655B", usage: "Secondary" },
    "border":   { value: "#E4DECF", usage: "Warm hairline" },
    "accent":   { value: "#C2683E", usage: "Clay / terracotta accent" },
  },
  typography: {
    display: '"Tiempos Headline", "Newsreader", "Source Serif 4", Georgia, serif',
    body:    '"Inter", "Söhne", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "13/15/17/21/28/42/60",
    weight:  "display 400-500 · body 400 · italic for warmth",
    tracking: "display -0.01em · body normal · body line-height 1.65",
  },
  antiPatterns: [
    { name: "Cold tech-blue", dont: "use the default SaaS blue + stark white", why: "warmth (cream + clay) is the whole point — it reads human, not clinical" },
    { name: "Loud color", dont: "introduce bright/neon accents", why: "one grounded warm accent; calm is the signal" },
    { name: "Cramped density", dont: "pack tight feature grids", why: "generous space + readable measure = the considered, intelligent feel" },
  ],
  responsive: [
    { element: "Section padding", mobile: "48px", tablet: "88px", desktop: "120px" },
    { element: "Hero serif",      mobile: "36px", tablet: "48px", desktop: "60px" },
    { element: "Body / measure",  mobile: "17px / 100%", tablet: "17px / 62ch", desktop: "18px / 66ch" },
  ],
  snippets: [
    `/* Warm serif hero on cream */
.hero { background:#F4F0E8; }
.hero h1 { font-family:"Tiempos Headline","Newsreader",Georgia,serif; font-weight:450; font-size:clamp(36px,5.5vw,60px); letter-spacing:-.01em; line-height:1.08; color:#2A2723; max-width:18ch; }
.hero p { font-size:18px; line-height:1.65; color:#6B655B; max-width:60ch; }`,
    `/* Clay accent + soft card */
.btn { background:#C2683E; color:#FBF9F3; border:0; border-radius:10px; padding:13px 22px; font-weight:500; }
.card { background:#FBF9F3; border:1px solid #E4DECF; border-radius:14px; padding:24px; box-shadow:0 1px 2px rgba(42,39,35,.04); }`,
  ],
  successLooksLike: ["anthropic.com", "a Stripe Press book page", "Readwise / Things marketing"],
  failureLooksLike: ["cold SaaS-blue on stark white", "neon accents", "cramped feature grid", "clinical enterprise tone"],
  overrideGlobalRules: [
    "A humanist serif display on a warm cream canvas is the register — overrides 'avoid serif display' and any default to cold neutral palettes.",
  ],
  tile: "tile-premium",
  tileHTML: `<div style='height:150px;background:#F4F0E8;display:flex;flex-direction:column;justify-content:space-between;padding:18px;font-family:Georgia,serif;color:#2A2723'><div style='font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#C2683E;font-family:Inter,sans-serif'>Thoughtful tools</div><div style='font-size:28px;font-weight:450;letter-spacing:-.01em;line-height:1.05'>Software with<br/>a <em>point of view.</em></div><div style='font-size:13px;color:#6B655B;font-family:Inter,sans-serif'>Calm, considered, human.</div></div>`,
});

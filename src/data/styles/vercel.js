import { asFullPreset } from "./compact.js";

export const vercel = asFullPreset({
  id: "vercel",
  name: "Vercel / Geist",
  tag: "Mono-precise · dev-product · high-craft",
  desc: "Ultra-clean developer-product marketing. Geist type, black/white, surgical spacing, one restrained accent. The 'shipped by people with taste' look.",
  sampleTemplate: "product",
  feel: "A Vercel or Geist-era developer platform page — confident, minimal, fast, every pixel deliberate. Not a generic SaaS template.",
  references: "vercel.com, Geist design system, Resend, Linear, Railway, turbo.build",
  boldFactor: [
    "Geist Sans + Geist Mono (or Inter + a mono) — mono used for code, labels, and stats",
    "Near-pure black/white with a single restrained accent; depth from hairlines + soft shadows, not color",
    "Surgical, generous whitespace and a strict grid — content breathes",
    "Crisp product UI mockups / code blocks as the hero visual",
    "Subtle motion only: fades, 1px borders that brighten on hover, no bounce",
  ],
  tokens: {
    "bg":       { value: "#FFFFFF", usage: "Page" },
    "bg-soft":  { value: "#FAFAFA", usage: "Sections / cards" },
    "fg":       { value: "#0A0A0A", usage: "Text" },
    "muted":    { value: "#666666", usage: "Secondary text" },
    "border":   { value: "#EAEAEA", usage: "Hairline borders" },
    "accent":   { value: "#0070F3", usage: "One blue accent — links, primary CTA" },
  },
  typography: {
    display: '"Geist", "Inter", system-ui, sans-serif',
    body:    '"Geist", "Inter", system-ui, sans-serif',
    mono:    '"Geist Mono", "JetBrains Mono", ui-monospace, monospace',
    scale:   "12/14/16/20/28/44/64",
    weight:  "display 600 · body 400 · mono 500 for labels/stats",
    tracking: "display tight (-0.03em) · labels normal · generous line-height 1.6 body",
  },
  antiPatterns: [
    { name: "Decorative color", dont: "use gradients or multiple accent colors", why: "Vercel craft is black/white + ONE accent; color noise breaks it" },
    { name: "Rounded-pill everything", dont: "make every element a big pill", why: "use restrained radii (6-8px); precision over softness" },
    { name: "Stock illustration", dont: "drop in blob/3D-character art", why: "the hero is a real product UI or code block, not mascots" },
  ],
  responsive: [
    { element: "Section padding", mobile: "48px", tablet: "80px", desktop: "120px" },
    { element: "Hero type",       mobile: "40px", tablet: "56px", desktop: "64px" },
    { element: "Body",            mobile: "16px", tablet: "16px", desktop: "16px" },
  ],
  snippets: [
    `/* Hairline card that brightens on hover */
.card { background:#FAFAFA; border:1px solid #EAEAEA; border-radius:8px; padding:24px; transition:border-color .2s, box-shadow .2s; }
.card:hover { border-color:#999; box-shadow:0 8px 30px rgba(0,0,0,.06); }`,
    `/* Mono stat / label */
.stat { font-family:"Geist Mono",monospace; font-size:13px; color:#666; letter-spacing:0; }
.stat b { color:#0A0A0A; }`,
  ],
  successLooksLike: ["vercel.com home", "a Geist component gallery", "Resend's docs marketing"],
  failureLooksLike: ["rainbow gradients", "blobby 3D characters", "generic Bootstrap SaaS"],
  overrideGlobalRules: [
    "Geist Sans/Mono (or Inter + mono) is the deliberate choice — mono labels are correct here, overriding the global 'avoid mono UI' lean.",
  ],
  tile: "tile-premium",
  tileHTML: `<div style="height:150px;background:#fff;display:flex;flex-direction:column;justify-content:space-between;padding:16px;font-family:Inter,system-ui">
    <div style="display:flex;align-items:center;gap:8px"><div style="width:0;height:0;border-left:9px solid transparent;border-right:9px solid transparent;border-bottom:15px solid #0A0A0A"></div><span style="font-weight:600;letter-spacing:-.02em;color:#0A0A0A">geist</span></div>
    <div style="font-size:26px;font-weight:600;letter-spacing:-.03em;color:#0A0A0A;line-height:1">Ship faster.</div>
    <div style="display:flex;gap:6px;align-items:center"><span style="font-family:monospace;font-size:11px;color:#666">99.99%</span><span style="background:#0070F3;color:#fff;font-size:11px;padding:3px 10px;border-radius:6px">Deploy →</span></div>
  </div>`,
});

import { asFullPreset } from "./compact.js";

export const apple = asFullPreset({
  id: "apple",
  name: "Apple / Hero Product",
  tag: "Premium minimal · giant product · cinematic",
  desc: "Cinematic premium product marketing. Enormous centered product imagery, vast whitespace, huge tight headlines, near-monochrome. Let the product be the hero.",
  sampleTemplate: "product",
  feel: "An Apple product page — full-bleed product photography, a few perfect words, deep black sections that make the product glow. Calm, premium, inevitable.",
  references: "apple.com, Nothing, Teenage Engineering, Sonos, Leica, Aesop (restraint)",
  boldFactor: [
    "Huge centered product image is THE hero (use a clearly-labelled placeholder if none)",
    "Massive tight headlines (SF Pro / Inter Display), short and confident",
    "Alternating pure-white and rich-black full-bleed sections for drama",
    "Vast whitespace; one idea per screen, centered composition",
    "Quiet scroll-reveal: product fades/scales in; no gimmicks",
  ],
  tokens: {
    "bg":       { value: "#FFFFFF", usage: "Light section" },
    "bg-dark":  { value: "#000000", usage: "Dramatic dark section" },
    "fg":       { value: "#1D1D1F", usage: "Apple near-black ink" },
    "muted":    { value: "#6E6E73", usage: "Secondary text" },
    "accent":   { value: "#0071E3", usage: "Apple blue — links, 'Learn more'" },
  },
  typography: {
    display: '"SF Pro Display", "Inter", system-ui, sans-serif',
    body:    '"SF Pro Text", "Inter", system-ui, sans-serif',
    mono:    '"SF Mono", ui-monospace, monospace',
    scale:   "14/17/21/28/40/64/96",
    weight:  "display 600-700 · body 400 · 'Learn more' links 400",
    tracking: "display very tight (-0.04em) · body normal · headline line-height 1.05",
  },
  antiPatterns: [
    { name: "Busy layout", dont: "cram multiple ideas per screen", why: "Apple pacing is ONE focal idea per full-height section" },
    { name: "Small hero", dont: "shrink the product image", why: "the product is the hero — it should dominate the viewport" },
    { name: "Loud color", dont: "introduce bright brand colors", why: "near-monochrome lets the product photography carry all the color" },
  ],
  responsive: [
    { element: "Section padding", mobile: "64px", tablet: "100px", desktop: "140px" },
    { element: "Hero type",       mobile: "44px", tablet: "72px", desktop: "96px" },
    { element: "Body",            mobile: "17px", tablet: "19px", desktop: "21px" },
  ],
  snippets: [
    `/* Full-height product moment */
.stage { min-height:100vh; display:grid; place-items:center; text-align:center; }
.stage--dark { background:#000; color:#F5F5F7; }
.stage h2 { font-size:clamp(40px,7vw,96px); font-weight:600; letter-spacing:-.04em; line-height:1.04; }`,
    `/* Quiet 'Learn more' link pair */
.links { display:flex; gap:28px; justify-content:center; }
.links a { color:#0071E3; font-size:21px; } .links a::after { content:" ›"; }`,
  ],
  successLooksLike: ["apple.com/iphone", "Nothing phone page", "Sonos product page"],
  failureLooksLike: ["cramped feature grid", "tiny product thumbnail", "rainbow CTAs"],
  overrideGlobalRules: [
    "Full-height single-idea sections and a dominant product image override the 'pack sections densely' instinct — restraint IS the design.",
  ],
  tile: "tile-premium",
  tileHTML: `<div style="height:150px;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:16px;font-family:Inter,system-ui;text-align:center">
    <div style="width:46px;height:46px;border-radius:12px;background:radial-gradient(circle at 35% 30%,#bbb,#222);box-shadow:0 10px 30px -6px rgba(255,255,255,.25)"></div>
    <div style="font-size:22px;font-weight:600;letter-spacing:-.04em;color:#F5F5F7;line-height:1">Titanium.</div>
    <div style="font-size:12px;color:#0A84FF">Learn more ›</div>
  </div>`,
});

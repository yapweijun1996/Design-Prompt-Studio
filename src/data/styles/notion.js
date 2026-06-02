import { asFullPreset } from "./compact.js";

export const notion = asFullPreset({
  id: "notion",
  name: "Notion / Warm Docs",
  tag: "Friendly · warm-neutral · approachable",
  desc: "Warm, friendly productivity-product look. Soft off-white, rounded cards, gentle illustration accents, approachable type. Clean but human — never cold.",
  feel: "A Notion or Linear-docs page — calm warm background, rounded blocks, a little playful, very legible. Software that feels welcoming, not enterprise-grey.",
  references: "notion.so, Linear docs, Height, Cron/Notion Calendar, Loom, Tella",
  boldFactor: [
    "Warm off-white / cream canvas (never stark #FFF), soft #F7F6F3 surfaces",
    "Rounded cards (12-16px) with very soft shadows; cozy, tactile",
    "Friendly readable sans (Inter) + occasional emoji/illustration accent the brand owns",
    "Generous spacing and clear hierarchy — doc-like calm",
    "Gentle hover lifts; warm neutral borders, one soft accent",
  ],
  tokens: {
    "bg":       { value: "#FBFBFA", usage: "Warm canvas" },
    "surface":  { value: "#F7F6F3", usage: "Cards / sidebar" },
    "fg":       { value: "#37352F", usage: "Notion warm ink" },
    "muted":    { value: "#787774", usage: "Secondary text" },
    "border":   { value: "#EAE8E3", usage: "Soft warm borders" },
    "accent":   { value: "#2E75CC", usage: "Calm blue accent" },
  },
  typography: {
    display: '"Inter", system-ui, sans-serif',
    body:    '"Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", ui-monospace, monospace',
    scale:   "14/15/17/20/26/38/56",
    weight:  "display 600-700 · body 400 · slightly relaxed",
    tracking: "display -0.02em · body normal · line-height 1.6",
  },
  antiPatterns: [
    { name: "Cold grey", dont: "use stark white + pure-grey enterprise palette", why: "warmth (cream + warm ink) is what makes it friendly" },
    { name: "Sharp corners", dont: "use 0-radius hard edges", why: "soft rounded blocks are the cozy signature" },
    { name: "Heavy shadows", dont: "drop harsh drop-shadows", why: "shadows are whisper-soft; depth is gentle" },
  ],
  responsive: [
    { element: "Section padding", mobile: "40px", tablet: "72px", desktop: "104px" },
    { element: "Hero type",       mobile: "34px", tablet: "46px", desktop: "56px" },
    { element: "Body",            mobile: "16px", tablet: "17px", desktop: "17px" },
  ],
  snippets: [
    `/* Cozy rounded card */
.block { background:#F7F6F3; border:1px solid #EAE8E3; border-radius:14px; padding:22px; box-shadow:0 1px 2px rgba(55,53,47,.04); transition:transform .2s, box-shadow .2s; }
.block:hover { transform:translateY(-2px); box-shadow:0 14px 30px -18px rgba(55,53,47,.25); }`,
    `/* Friendly callout with emoji */
.callout { display:flex; gap:12px; background:#F1F5FB; border-radius:10px; padding:14px 16px; color:#37352F; }`,
  ],
  successLooksLike: ["notion.so home", "Linear docs", "Cron/Notion Calendar marketing"],
  failureLooksLike: ["cold enterprise grey", "sharp shadowless boxes", "stark clinical white"],
  overrideGlobalRules: [
    "Warm off-white canvas + tasteful emoji accents are on-brand here — overrides the global 'no emoji' and 'pure neutral' leanings.",
  ],
  tile: "tile-premium",
  tileHTML: `<div style="height:150px;background:#FBFBFA;display:flex;flex-direction:column;gap:8px;padding:16px;font-family:Inter,system-ui;color:#37352F">
    <div style="font-size:20px;font-weight:700;letter-spacing:-.02em;line-height:1.1">📝 Your workspace,<br/>your way.</div>
    <div style="background:#F7F6F3;border:1px solid #EAE8E3;border-radius:12px;padding:10px 12px;font-size:12px;color:#787774;box-shadow:0 1px 2px rgba(55,53,47,.05)">✓ Docs &nbsp; ✓ Tasks &nbsp; ✓ Wiki</div>
    <div style="background:#F1F5FB;border-radius:10px;padding:8px 12px;font-size:12px;color:#2E75CC">💡 Tip: type / for blocks</div>
  </div>`,
});

import { asFullPreset } from "./compact.js";

export const claymorphism = asFullPreset({
  id: "claymorphism",
  name: "Soft Clay",
  tag: "Soft 3D · puffy · playful-premium",
  desc: "Soft claymorphic UI. Puffy rounded shapes with inner + outer soft shadows, gentle pastel palette, friendly depth. Tactile and playful without being childish.",
  sampleTemplate: "spatial",
  feel: "A modern playful product (Clay UI, soft 3D app marketing) — chunky rounded cards that look pressable, pastel tints, soft double shadows. Friendly, tactile, premium-cute.",
  references: "claymorphism UI trend, Spline soft-3D, Headspace, Duolingo (restrained), modern playful SaaS",
  boldFactor: [
    "Soft 'clay' shadows: combine an outer drop shadow + a soft inner highlight for puffy depth",
    "Big rounded radii (24-40px) on cards, buttons, inputs — everything pillowy",
    "Gentle pastel palette on a soft tinted background (never stark white)",
    "Chunky pressable buttons with a pressed (active) state",
    "Rounded, friendly sans; generous spacing; soft, optimistic copy",
  ],
  tokens: {
    "bg":       { value: "#ECE9FF", usage: "Soft lavender canvas" },
    "surface":  { value: "#F6F4FF", usage: "Clay card surface" },
    "fg":       { value: "#2C2A4A", usage: "Soft deep ink" },
    "muted":    { value: "#6E6B92", usage: "Secondary text" },
    "accent":   { value: "#7C6CFF", usage: "Periwinkle accent" },
    "accent-2": { value: "#FF9AA2", usage: "Soft coral pop" },
  },
  typography: {
    display: '"Space Grotesk", "Inter", system-ui, sans-serif',
    body:    '"Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", ui-monospace, monospace',
    scale:   "14/16/18/22/30/44/64",
    weight:  "display 600-700 · body 400-500",
    tracking: "display -0.02em · body normal",
  },
  antiPatterns: [
    { name: "Flat design", dont: "ship flat shadowless cards", why: "the soft puffy double-shadow depth IS claymorphism" },
    { name: "Sharp corners", dont: "use small radii", why: "clay needs generous 24-40px rounding to read as pillowy" },
    { name: "Stark white", dont: "use #FFF on #FFF", why: "a soft tinted bg makes the clay surfaces pop with depth" },
  ],
  responsive: [
    { element: "Section padding", mobile: "40px", tablet: "72px", desktop: "100px" },
    { element: "Hero type",       mobile: "36px", tablet: "52px", desktop: "64px" },
    { element: "Card radius",     mobile: "24px", tablet: "32px", desktop: "36px" },
  ],
  snippets: [
    `/* Soft clay card — outer drop + inner highlight */
.clay { background:#F6F4FF; border-radius:32px; padding:28px;
  box-shadow: 0 18px 40px -16px rgba(44,42,74,.30), inset 0 2px 4px rgba(255,255,255,.9), inset 0 -6px 12px rgba(124,108,255,.12); }`,
    `/* Pressable clay button */
.clay-btn { background:#7C6CFF; color:#fff; border:none; border-radius:20px; padding:16px 26px; font-weight:600;
  box-shadow:0 10px 22px -8px rgba(124,108,255,.6), inset 0 2px 3px rgba(255,255,255,.4); transition:transform .12s; }
.clay-btn:active { transform:translateY(2px); }`,
  ],
  successLooksLike: ["a polished claymorphism dribbble shot shipped for real", "Headspace softness", "a friendly soft-3D app page"],
  failureLooksLike: ["flat material cards", "sharp corners", "harsh single drop-shadow", "stark white on white"],
  overrideGlobalRules: [
    "Soft layered shadows (incl. inner highlights) are required here — overrides any 'avoid shadows / keep it flat' leaning.",
  ],
  tile: "tile-premium",
  tileHTML: `<div style="height:150px;background:#ECE9FF;display:flex;flex-direction:column;justify-content:center;gap:12px;padding:18px;font-family:Inter,system-ui;color:#2C2A4A">
    <div style="background:#F6F4FF;border-radius:22px;padding:14px 16px;box-shadow:0 14px 30px -14px rgba(44,42,74,.35), inset 0 2px 3px rgba(255,255,255,.9), inset 0 -5px 10px rgba(124,108,255,.12)">
      <div style="font-family:'Space Grotesk',sans-serif;font-size:21px;font-weight:700;letter-spacing:-.02em;line-height:1.05">Feel-good<br/>software.</div>
    </div>
    <div style="align-self:flex-start;background:#7C6CFF;color:#fff;font-size:13px;font-weight:600;padding:10px 18px;border-radius:16px;box-shadow:0 10px 20px -8px rgba(124,108,255,.6), inset 0 2px 3px rgba(255,255,255,.4)">Try it →</div>
  </div>`,
});

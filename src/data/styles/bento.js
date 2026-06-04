import { asFullPreset } from "./compact.js";

export const bento = asFullPreset({
  id: "bento",
  name: "Bento Grid",
  tag: "Modular · rounded cards · feature-rich",
  desc: "The modern bento-box product layout. A grid of rounded cards in mixed sizes, each showing one feature with a mini visual. Organized, scannable, premium-playful.",
  sampleTemplate: "product",
  feel: "An Apple-keynote 'bento' feature wall or a Linear/Raycast feature grid — modular rounded tiles of varying spans, each a self-contained feature moment. Tidy yet rich.",
  references: "Apple keynote bento slides, Raycast, Linear features, Vercel, bentogrids.com, Cron",
  boldFactor: [
    "A mixed-span grid of rounded cards (some 2×, some 1×) — the bento layout IS the hero",
    "Each card = one feature: a short label + a tiny visual / number / mini-UI",
    "Soft rounded corners (16-24px), gentle shadows, subtle per-card tint",
    "Clean sans, confident short labels, one accent shared across cards",
    "Hover: card lifts slightly; the visual animates in",
  ],
  tokens: {
    "bg":       { value: "#0E0F13", usage: "Dark canvas (bento pops on dark)" },
    "surface":  { value: "#181A20", usage: "Card surface" },
    "fg":       { value: "#F2F3F5", usage: "Text" },
    "muted":    { value: "#9BA0AA", usage: "Secondary text" },
    "border":   { value: "#262A33", usage: "Card border" },
    "accent":   { value: "#7C6CFF", usage: "Shared accent across cards" },
  },
  typography: {
    display: '"Space Grotesk", "Inter", system-ui, sans-serif',
    body:    '"Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", ui-monospace, monospace',
    scale:   "12/14/16/20/28/40/56",
    weight:  "display 600 · body 400-500",
    tracking: "display -0.02em · labels normal",
  },
  antiPatterns: [
    { name: "Uniform grid", dont: "make every card the same size", why: "bento rhythm comes from MIXED spans (2×1, 1×1, 1×2)" },
    { name: "Sharp tiles", dont: "use square hard corners", why: "generous rounding (16-24px) is the bento signature" },
    { name: "Empty cards", dont: "leave cards as bare text", why: "each card needs a small visual/number/mini-UI to earn its place" },
  ],
  responsive: [
    { element: "Grid", mobile: "1 col", tablet: "2-3 col bento", desktop: "4-col bento" },
    { element: "Card radius", mobile: "16px", tablet: "20px", desktop: "24px" },
    { element: "Body", mobile: "15px", tablet: "16px", desktop: "16px" },
  ],
  snippets: [
    `/* Bento grid with mixed spans */
.bento { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
.bento .card { background:#181A20; border:1px solid #262A33; border-radius:22px; padding:24px; transition:transform .25s; }
.bento .card:hover { transform:translateY(-4px); }
.bento .wide { grid-column:span 2; } .bento .tall { grid-row:span 2; }`,
    `/* Accent stat inside a card */
.card .num { font-family:"Space Grotesk",sans-serif; font-size:40px; font-weight:600; color:#7C6CFF; }`,
  ],
  successLooksLike: ["an Apple keynote bento wall", "Raycast features grid", "Linear 'why' section"],
  failureLooksLike: ["a plain uniform card grid", "sharp-cornered boxes", "text-only cards with no visuals"],
  overrideGlobalRules: [
    "A mixed-span rounded-card grid is the required structure here — lean into modular composition over a single linear column.",
  ],
  tile: "tile-premium",
  tileHTML: `<div style="height:150px;background:#0E0F13;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:7px;padding:14px;font-family:Inter,system-ui">
    <div style="grid-column:span 2;background:#181A20;border:1px solid #262A33;border-radius:12px;padding:10px;display:flex;align-items:center;gap:8px"><span style="font-family:'Space Grotesk',sans-serif;font-size:22px;font-weight:600;color:#7C6CFF">12×</span><span style="font-size:11px;color:#9BA0AA">faster builds</span></div>
    <div style="background:#181A20;border:1px solid #262A33;border-radius:12px;padding:10px;font-size:11px;color:#F2F3F5;display:flex;align-items:flex-end">Realtime</div>
    <div style="background:#181A20;border:1px solid #262A33;border-radius:12px;padding:10px;font-size:11px;color:#F2F3F5;display:flex;align-items:flex-end">Edge ⚡</div>
  </div>`,
});

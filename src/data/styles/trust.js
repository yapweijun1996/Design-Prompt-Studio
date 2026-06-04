import { asFullPreset } from "./compact.js";

export const trust = asFullPreset({
  id: "trust",
  name: "Enterprise Trust",
  tag: "Navy · crisp · B2B-grade",
  desc: "Polished modern B2B / enterprise — deep navy + crisp white + ONE confident accent, a tight grid, real social proof, security-grade calm. Confident and credible, never cold or clip-arty.",
  sampleTemplate: "dashboard",
  feel: "Linear / Ramp / Mercury / Vanta / WorkOS — a B2B product that looks expensive and trustworthy: tight grid, navy ink, a confident blue accent, logo walls, real numbers.",
  references: "Linear, Ramp, Mercury, Vanta, WorkOS, Stripe (corporate pages), Notion enterprise",
  boldFactor: [
    "Deep navy/ink (#0B1220) headlines on a crisp white canvas + ONE confident accent (electric blue #2563EB) — disciplined, never multi-color",
    "A clean neutral grotesque (Inter / Söhne / Geist) at tight tracking — confident, legible, enterprise-grade",
    "A tight aligned grid with real social proof — logo wall, hard metrics (99.99% uptime, SOC 2), customer quotes; nothing fluffy",
    "Soft 8–12px radii + crisp hairline borders + restrained shadows — credible depth, not playful, not brutalist",
    "Confident-not-cold: generous spacing, a single accent, calm authority; the trust signals do the selling",
  ],
  tokens: {
    "bg":      { value: "#FFFFFF", usage: "Crisp white" },
    "surface": { value: "#F7F9FC", usage: "Cool off-white sections" },
    "fg":      { value: "#0B1220", usage: "Deep navy ink" },
    "muted":   { value: "#56607A", usage: "Slate secondary" },
    "border":  { value: "#E4E9F2", usage: "Cool hairline" },
    "accent":  { value: "#2563EB", usage: "Confident blue — one accent only" },
  },
  typography: {
    display: '"Inter", "Söhne", "Geist", system-ui, sans-serif',
    body:    '"Inter", "Söhne", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "13/15/17/20/28/40/56",
    weight:  "display 600-700 · body 400 · tight",
    tracking: "display -0.02em · body normal · body line-height 1.6",
  },
  antiPatterns: [
    { name: "Multi-color", dont: "use several accent colors", why: "ONE confident blue; the discipline reads as enterprise-grade" },
    { name: "Fluffy / clip-art", dont: "use blob illustrations or stocky business photos", why: "real logos, metrics, and quotes sell trust — not decoration" },
    { name: "Cold clinical grey", dont: "go flat clinical grey-on-grey", why: "navy + one accent + generous space stays confident and human" },
    { name: "Cramped hero", dont: "pack dense feature tables into the hero", why: "calm hierarchy and space read as credibility" },
  ],
  responsive: [
    { element: "Section padding", mobile: "56px", tablet: "96px",  desktop: "128px" },
    { element: "Hero type",       mobile: "30px", tablet: "40px",  desktop: "56px" },
    { element: "Logo wall",       mobile: "wrap 2-col", tablet: "row", desktop: "row" },
  ],
  snippets: [
    `/* Navy hero + one blue CTA + a faint logo wall */
.hero h1 { font-family:"Inter",sans-serif; font-weight:700; font-size:clamp(30px,5vw,56px); letter-spacing:-.02em; line-height:1.08; color:#0B1220; }
.btn { background:#2563EB; color:#fff; border:0; border-radius:9px; padding:12px 20px; font-weight:600; box-shadow:0 6px 16px rgba(37,99,235,.22); }
.logos { display:flex; gap:32px; opacity:.55; filter:grayscale(1); }`,
    `/* Hard metric + crisp card */
.metric { font-size:40px; font-weight:700; letter-spacing:-.02em; color:#0B1220; }
.card { background:#fff; border:1px solid #E4E9F2; border-radius:12px; padding:24px; box-shadow:0 1px 2px rgba(11,18,32,.04); }`,
  ],
  successLooksLike: ["Linear's marketing site", "Ramp / Mercury landing", "Vanta / WorkOS trust pages"],
  failureLooksLike: ["rainbow multi-accent palette", "blob illustrations & stock business photos", "flat clinical grey", "cramped dense hero tables"],
  overrideGlobalRules: [
    "Deep navy + a single confident blue accent + real trust signals are the register — overrides any 'add visual variety / multiple accents' instinct. Discipline and proof are the selling tools.",
  ],
  tile: "tile-premium",
  tileHTML: `<div style='height:150px;background:#fff;display:flex;flex-direction:column;justify-content:space-between;padding:18px;font-family:Inter,system-ui,sans-serif;color:#0B1220'><div style='font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#2563EB;font-weight:600'>SOC 2 · Type II</div><div style='font-size:25px;font-weight:700;letter-spacing:-.02em;line-height:1.06'>Security that<br/>scales with you.</div><div style='display:flex;align-items:center;gap:10px'><span style='font-size:11px;font-weight:600;color:#fff;background:#2563EB;border-radius:8px;padding:7px 14px'>Book a demo</span><span style='display:flex;gap:6px'><i style='width:26px;height:7px;background:#E4E9F2;border-radius:3px;display:block'></i><i style='width:22px;height:7px;background:#E4E9F2;border-radius:3px;display:block'></i><i style='width:28px;height:7px;background:#E4E9F2;border-radius:3px;display:block'></i></span></div></div>`,
});

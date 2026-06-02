import { asFullPreset } from "./compact.js";

export const devdark = asFullPreset({
  id: "devdark",
  name: "Dev Product Dark",
  tag: "Dark · terminal · emerald accent",
  desc: "Dark developer-product marketing. Near-black canvas, mono for code/labels, one vivid emerald accent, a real terminal or code block as the hero. Built-by-engineers energy.",
  feel: "A Supabase / Railway / Fly.io landing — confident dark page, a live-looking code block or CLI as the hero, glowing emerald accent, fast and technical. Not a generic dark SaaS template.",
  references: "supabase.com, railway.app, fly.io, neon.tech, planetscale.com, upstash.com",
  boldFactor: [
    "Near-black canvas (#0B0F0E) with a single vivid emerald accent (#3ECF8E) — glow used sparingly",
    "A real, syntax-highlighted code block OR CLI/terminal as the hero visual (not a stock illustration)",
    "Mono (JetBrains/Geist Mono) for code, labels, stats; clean sans for prose",
    "Feature cards with a subtle emerald top-border or glow on hover; hairline #1C2B26 borders",
    "Copy speaks to engineers: latency numbers, 'npm i', 'deploy in seconds', SOC2 — concrete, not fluffy",
  ],
  tokens: {
    "bg":       { value: "#0B0F0E", usage: "Near-black canvas" },
    "surface":  { value: "#121917", usage: "Cards / code block bg" },
    "fg":       { value: "#E8EDEB", usage: "Text" },
    "muted":    { value: "#8A968F", usage: "Secondary text" },
    "border":   { value: "#1C2B26", usage: "Hairline borders" },
    "accent":   { value: "#3ECF8E", usage: "Emerald — CTAs, code keywords, glow" },
  },
  typography: {
    display: '"Inter", "Geist", system-ui, sans-serif',
    body:    '"Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", "Geist Mono", ui-monospace, monospace',
    scale:   "12/14/16/20/28/44/64",
    weight:  "display 600-700 · body 400 · mono 500 for code/labels",
    tracking: "display tight (-0.03em) · code normal",
  },
  antiPatterns: [
    { name: "Stock illustration hero", dont: "use a blob/3D-character hero", why: "the hero is a real code block / terminal — that's the dev-credibility signal" },
    { name: "Neon overload", dont: "make everything glow emerald", why: "one accent, used sparingly; the dark restraint is the premium part" },
    { name: "Fluffy copy", dont: "use vague 'empower your business' lines", why: "engineers want concrete specifics — latency, commands, limits" },
  ],
  responsive: [
    { element: "Section padding", mobile: "48px", tablet: "80px", desktop: "112px" },
    { element: "Hero type",       mobile: "40px", tablet: "56px", desktop: "64px" },
    { element: "Code block",      mobile: "full-width", tablet: "inset", desktop: "right column" },
  ],
  snippets: [
    `/* Terminal / code-block hero */
.code { background:#121917; border:1px solid #1C2B26; border-radius:12px; padding:20px; font-family:"JetBrains Mono",monospace; font-size:13px; line-height:1.7; color:#E8EDEB; }
.code .kw { color:#3ECF8E; } .code .dim { color:#8A968F; } .code .ok { color:#3ECF8E; }`,
    `/* Emerald CTA with subtle glow */
.btn { background:#3ECF8E; color:#06140E; border:0; border-radius:8px; padding:12px 20px; font-weight:600; box-shadow:0 8px 28px -10px rgba(62,207,142,.5); }
.btn--ghost { background:transparent; color:#E8EDEB; border:1px solid #1C2B26; box-shadow:none; }`,
  ],
  successLooksLike: ["supabase.com home", "railway.app landing", "fly.io marketing"],
  failureLooksLike: ["generic dark SaaS template", "blobby 3D hero", "everything glowing neon", "fluffy enterprise copy"],
  overrideGlobalRules: [
    "Mono for code/labels + a real code-block hero are deliberate here — overrides the global 'avoid mono UI' lean.",
  ],
  tile: "tile-premium",
  tileHTML: `<div style='height:150px;background:#0B0F0E;display:flex;flex-direction:column;justify-content:space-between;padding:16px;font-family:Inter,system-ui;color:#E8EDEB'><div style='font-size:22px;font-weight:700;letter-spacing:-.03em;line-height:1'>Ship the backend<br/>in <span style='color:#3ECF8E'>seconds</span>.</div><div style='background:#121917;border:1px solid #1C2B26;border-radius:8px;padding:8px 10px;font-family:monospace;font-size:11px;color:#8A968F'><span style='color:#3ECF8E'>$</span> npx create-edge@latest <span style='color:#3ECF8E'>✓</span></div></div>`,
});

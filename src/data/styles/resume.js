import { asFullPreset } from "./compact.js";

export const resume = asFullPreset({
  id: "resume",
  name: "CV / Resume",
  tag: "Single-page · type · printable",
  desc: "Single-page personal CV. Typography-only. Print-ready. Read.cv / Are.na profile / academic CV register.",

  feel: "Looking at a beautifully typeset CV that prints to one page — every line earns its place, the typography IS the design — not a developer GitHub README pretending to be a CV.",

  references: "read.cv profiles, Are.na profile pages, Tobias Frere-Jones CV, classic academic curriculum vitae, single-page resume templates from Stripe Press",

  boldFactor: [
    "Single column on print, two-column on desktop (left = sections, right = content)",
    "Name + role + contact in a typographic letterhead (not a header banner)",
    "Sections: Experience, Education, Projects, Speaking, Writing — date-aligned right",
    "Year + range left-aligned in tabular numbers, role / company bold",
    "Bullet lists with em-dash markers (—) instead of disc bullets",
    "Print-ready CSS (@media print) — pages, page-break, no background colors",
    "Single accent color used only for links and section heads (or none — print purist)",
  ],

  tokens: {
    "bg":      { value: "#FFFFFF", usage: "Paper white" },
    "fg":      { value: "#0F0F0F", usage: "Ink black body" },
    "muted":   { value: "#666666", usage: "Date, location, context" },
    "accent":  { value: "#1F4FD9", usage: "Link blue (or omit for purist print)" },
    "rule":    { value: "#CCCCCC", usage: "Hairline divider" },
  },

  typography: {
    display: '"Source Serif 4", "Tiempos Text", Georgia, serif',
    body:    '"Source Serif 4", "Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "10/11/12/14/16/22/32",
    weight:  "display 500-600 · body 400-500 · numbers tabular",
    tracking: "normal · small-caps for section heads",
  },

  antiPatterns: [
    { name: "Photo as hero",     dont: "use a large headshot as the page hero", why: "Modern CVs are typographic; photo (if any) is small and right-aligned" },
    { name: "Skill bars",        dont: "render JavaScript as a 75% progress bar", why: "Bars/scores read as juniors' attempts at design — listed strengths suffice" },
    { name: "Bright background", dont: "color the whole page in brand color", why: "CV is paper-first; print it, it should still work" },
    { name: "Icon-per-line",     dont: "icon-tag every bullet point", why: "Typography does the visual work; icons add noise" },
    { name: "Curriculum vitae in PDF only", dont: "force a download to view the CV", why: "HTML CV is shareable, accessible, indexable" },
  ],

  responsive: [
    { element: "Layout",          mobile: "1col", tablet: "2col 200px+1fr", desktop: "2col 240px+1fr" },
    { element: "Section heading", mobile: "14px",  tablet: "12px small-caps", desktop: "12px small-caps" },
    { element: "Page padding",    mobile: "24px",  tablet: "64px",  desktop: "96px" },
  ],

  snippets: [
    `/* CV layout */
.cv { max-width: 800px; margin: 0 auto; padding: 96px 64px; display: grid; grid-template-columns: 240px 1fr; gap: 48px; font-family: "Source Serif 4", Georgia, serif; color: #0F0F0F; }
.cv-section-label { font-family: "Source Serif 4", serif; font-size: 12px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: #666; padding-top: 4px; }
.cv-role { font-weight: 600; font-size: 16px; }
.cv-meta { color: #666; font-size: 14px; font-variant-numeric: tabular-nums; }
.cv-bullets { padding: 0; list-style: none; }
.cv-bullets li::before { content: "— "; color: #666; }`,
    `/* Print-ready */
@media print {
  body { font-size: 11pt; }
  .cv { padding: 0; max-width: none; }
  a { color: #0F0F0F !important; text-decoration: none; }
  .no-print { display: none; }
}`,
    `/* Header letterhead */
.cv-letterhead { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #CCCCCC; padding-bottom: 12px; margin-bottom: 32px; grid-column: 1 / -1; }
.cv-name { font-family: "Source Serif 4", serif; font-size: 32px; font-weight: 500; letter-spacing: -0.005em; }
.cv-contact { font-size: 13px; color: #666; text-align: right; line-height: 1.6; }`,
  ],

  successLooksLike: [
    "A read.cv profile page",
    "A classic academic CV in Source Serif",
    "Tobias Frere-Jones' resume — typographic letterhead",
  ],

  failureLooksLike: [
    "A two-page colored-background resume with skill bars",
    "A PDF download wall — no HTML version",
    "Photo + icons + colored sections + Comic Sans accents",
  ],

  tile: "tile-resume",
  tileHTML: `
    <div class="head">
      <div class="nm">Brittany Chiang</div>
      <div class="loc">NYC · brittanychiang.com</div>
    </div>
    <div class="row"><span class="lbl">EXPERIENCE</span></div>
    <div class="row"><span class="role">Senior Designer · Linear</span><span class="yr">2024 —</span></div>
    <div class="row"><span class="role">Designer · Stripe</span><span class="yr">2020 — 24</span></div>
  `,
});

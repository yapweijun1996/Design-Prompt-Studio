import { asFullPreset } from "./compact.js";

export const biotech = asFullPreset({
  id: "biotech",
  name: "Biotech / Pharma",
  tag: "Pipeline · clinical · evidence",
  desc: "Drug-pipeline grid. Clinical-trial phase tracker. Investor + scientific dual audience. Moderna / Ginkgo / Vertex / Regeneron register.",

  feel: "Reading Moderna's pipeline page during earnings prep — drugs in Phase 1/2/3 tracked transparently, R&D approach explained, investor + scientist both served — not a corporate site cosplaying as biotech.",

  references: "Moderna, Vertex Pharmaceuticals, Regeneron, Ginkgo Bioworks, Recursion, BioNTech, Genentech, Insitro",

  boldFactor: [
    "Pipeline grid: drug name × phase (Preclinical → Phase 1 → 2 → 3 → Approved) — visual progress bar",
    "Each drug card: indication, target, modality (mRNA / CAR-T / small molecule), latest milestone",
    "Science explainer section: 'Our platform' — diagrams of mechanism of action",
    "Investor surface: pipeline summary, recent earnings, SEC filings, press releases",
    "Trial enrollment / clinicaltrials.gov links per asset",
    "Restrained science palette: deep teal + cream + accent (orange or magenta for milestone)",
  ],

  tokens: {
    "bg":      { value: "#FAFAF7", usage: "Off-white lab" },
    "surface": { value: "#FFFFFF", usage: "Card" },
    "fg":      { value: "#0F2A2A", usage: "Deep teal body" },
    "muted":   { value: "#5A6B6E", usage: "Secondary" },
    "brand":   { value: "#147060", usage: "Biotech teal" },
    "milestone": { value: "#E8744D", usage: "Milestone orange" },
    "approved":{ value: "#1B7A3E", usage: "Approved drug green" },
    "border":  { value: "#D9D6CB", usage: "Border" },
  },

  typography: {
    display: '"Söhne", "Source Serif 4", "Inter Display", serif',
    body:    '"Söhne", "Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "11/12/14/16/18/22/32/48",
    weight:  "display 500-600 · body 400 · numbers tabular",
  },

  antiPatterns: [
    { name: "Stock lab photo",   dont: "use generic 'scientist with pipette' imagery", why: "Diagrams (MoA, pipeline) + product photography > stock people" },
    { name: "Marketing fluff",   dont: "write 'revolutionary breakthroughs'", why: "Voice: 'mRNA-1273. Phase 3. Enrollment 30,420. Read the NEJM paper.'" },
    { name: "Hidden pipeline",   dont: "treat pipeline as a deep PDF download", why: "Pipeline visualization IS the company; surface it on the home page" },
    { name: "No science explainer", dont: "skip the 'How it works' section", why: "Both investors and scientists need the mechanism explained" },
  ],

  responsive: [
    { element: "Pipeline grid", mobile: "stack cards", tablet: "table", desktop: "table dense" },
    { element: "Section padding", mobile: "32px", tablet: "64px", desktop: "96px" },
  ],

  snippets: [
    `/* Pipeline phase bar */
.pipe-row { display: grid; grid-template-columns: 200px 1fr 120px; gap: 16px; padding: 16px 0; border-bottom: 1px solid #D9D6CB; align-items: center; }
.pipe-row .name { font-weight: 600; color: #0F2A2A; }
.pipe-row .indication { font-size: 13px; color: #5A6B6E; }
.pipe-row .phases { display: grid; grid-template-columns: repeat(5, 1fr); gap: 4px; height: 28px; }
.pipe-row .phase { background: #EFEDE5; border-radius: 4px; display: grid; place-items: center; font-size: 11px; color: #5A6B6E; font-weight: 600; }
.pipe-row .phase.done { background: #147060; color: #FFFFFF; }
.pipe-row .phase.current { background: #E8744D; color: #FFFFFF; }
.pipe-row .nct { font-family: "JetBrains Mono", monospace; font-size: 11px; color: #147060; text-decoration: underline; }`,
    `/* Science explainer card */
.sci-card { background: #FFFFFF; border: 1px solid #D9D6CB; border-radius: 12px; padding: 24px; }
.sci-card h3 { font-family: "Source Serif 4", serif; font-weight: 500; font-size: 24px; color: #0F2A2A; margin: 0 0 8px; }
.sci-card .deck { font-size: 16px; line-height: 1.55; color: #5A6B6E; max-width: 56ch; }`,
  ],

  successLooksLike: [
    "Moderna pipeline page with mRNA assets + phases",
    "Vertex Pharmaceuticals R&D portfolio",
    "Recursion platform explainer",
  ],

  failureLooksLike: [
    "Generic pharma marketing landing with stock lab photo",
    "Hidden pipeline buried in 'Investors' PDF",
  ],

  tile: "tile-biotech",
  tileHTML: `
    <div class="hd">PIPELINE · 2026</div>
    <div class="row">
      <span class="nm">mRNA-1273</span>
      <div class="ph"><span class="d"></span><span class="d"></span><span class="d"></span><span class="c"></span><span></span></div>
      <span class="nct">NCT04...</span>
    </div>
    <div class="row">
      <span class="nm">mRNA-4157</span>
      <div class="ph"><span class="d"></span><span class="c"></span><span></span><span></span><span></span></div>
      <span class="nct">NCT05...</span>
    </div>
  `,
});

import { asFullPreset } from "./compact.js";

export const citationlab = asFullPreset({
  id: "citationlab",
  name: "Citation Lab",
  tag: "research · citations · answer engine",
  desc: "A research-answer style for evidence-led pages, source cards, claim trails, notebooks, and AI-assisted investigation.",
  sampleTemplate: "dashboard",

  feel: "A serious research workspace: calm reading surface, visible sources, claim-by-claim provenance, and a compact answer area that never hides evidence.",

  references: "Perplexity answer pages, Google NotebookLM, Elicit, Consensus, Readwise Reader, LexisNexis research surfaces",

  boldFactor: [
    "Every important claim has a source marker or evidence card",
    "The answer summary and source trail are visible together",
    "Use dense but calm typography, not marketing hero copy",
    "Filters separate source type, date, confidence, and open questions",
    "Unverified, conflicting, and missing evidence states are explicit",
  ],

  tokens: {
    bg: { value: "#F8F6F0", usage: "Reading canvas" },
    panel: { value: "#FFFFFF", usage: "Answer and source cards" },
    fg: { value: "#1E2329", usage: "Primary text" },
    muted: { value: "#68707A", usage: "Source metadata" },
    accent: { value: "#315CFF", usage: "Active citation / selected source" },
    note: { value: "#F0E4BD", usage: "Highlighted evidence" },
    border: { value: "#DDD8CC", usage: "Card dividers" },
  },

  typography: {
    display: '"Source Serif 4", Georgia, serif',
    body: '"Inter", system-ui, sans-serif',
    mono: '"IBM Plex Mono", "Geist Mono", monospace',
    scale: "11/12/14/16/18/24/34/48",
    weight: "display 500-650 · body 400-520 · citation labels 600",
    tracking: "body normal, source labels +0.08em",
  },

  antiPatterns: [
    { name: "Citation theater", dont: "show fake numbered citations with no source detail", why: "The style is about evidence, not decoration" },
    { name: "Chat-only layout", dont: "make the page a single conversational thread", why: "Research needs source browsing and claim review" },
    { name: "Marketing summary", dont: "open with a vague big promise headline", why: "The answer and evidence are the product" },
    { name: "Hidden uncertainty", dont: "bury conflicts or low-confidence claims", why: "Good research surfaces uncertainty" },
  ],

  responsive: [
    { element: "Answer + sources", mobile: "answer first, source cards below", tablet: "answer with source rail", desktop: "answer, source rail, and claim inspector" },
    { element: "Filters", mobile: "sticky segmented row", tablet: "toolbar", desktop: "left research controls" },
    { element: "Claim trail", mobile: "accordion", tablet: "side sheet", desktop: "persistent right panel" },
  ],

  snippets: [
    `.research-shell { background:#F8F6F0; color:#1E2329; font-family:Inter,system-ui,sans-serif; }`,
    `.source-card { background:#fff; border:1px solid #DDD8CC; border-radius:12px; padding:14px; }`,
    `.claim-mark { color:#315CFF; font-weight:700; font-variant-numeric:tabular-nums; }`,
  ],

  successLooksLike: [
    "Readers can trace the answer back to sources without leaving the page",
    "Source quality, date, and confidence are visible",
    "The surface feels like research software, not a generic AI chat app",
  ],

  failureLooksLike: [
    "A chatbot with fake footnotes",
    "A blog article with citations pasted at the bottom",
    "No visual difference between verified and uncertain claims",
  ],

  tile: "tile-citationlab",
  tileHTML: `
    <div style="height:150px;background:#F8F6F0;color:#1E2329;display:flex;flex-direction:column;justify-content:space-between;padding:16px;font-family:Inter,system-ui,sans-serif">
      <div style="display:flex;justify-content:space-between;font:10px 'IBM Plex Mono',monospace;color:#315CFF;letter-spacing:.1em;text-transform:uppercase"><span>research</span><span>7 sources</span></div>
      <div style="font-family:'Source Serif 4',Georgia,serif;font-size:25px;line-height:1.02;letter-spacing:-.02em">Answer with<br/>evidence.</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;font-size:10px;color:#68707A"><span style="background:#fff;border:1px solid #DDD8CC;border-radius:8px;padding:7px">[1] paper</span><span style="background:#F0E4BD;border:1px solid #DDD8CC;border-radius:8px;padding:7px">claim trail</span></div>
    </div>
  `,
});

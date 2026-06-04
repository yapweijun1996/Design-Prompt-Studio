import { asFullPreset } from "./compact.js";

export const boardmemo = asFullPreset({
  id: "boardmemo",
  name: "Board Memo",
  tag: "executive memo · metrics · decisions",
  desc: "An executive-report style for board updates, investor memos, quarterly reviews, strategy pages, and decision briefs.",
  sampleTemplate: "dashboard",

  feel: "A crisp board packet distilled for the web: answer-first narrative, financial metrics, decision asks, risks, and appendices with restraint.",

  references: "Stripe annual letters, Amazon shareholder letters, Sequoia memos, Linear changelog restraint, McKinsey executive summaries, Carta investor updates",

  boldFactor: [
    "Lead with decisions needed, not a decorative hero",
    "Metrics, narrative, risks, and asks are visibly connected",
    "Use restrained tables, callout boxes, and appendix links",
    "Quarter, owner, confidence, and source date are always visible",
    "Charts support the memo; they never become dashboard clutter",
  ],

  tokens: {
    bg: { value: "#FAFAF7", usage: "Memo page background" },
    panel: { value: "#FFFFFF", usage: "Metric and decision blocks" },
    fg: { value: "#171717", usage: "Primary executive text" },
    muted: { value: "#62615A", usage: "Source and note text" },
    accent: { value: "#1F4E79", usage: "Decision / link accent" },
    signal: { value: "#8A5A00", usage: "Risk and watchlist notes" },
    border: { value: "#DFDDD3", usage: "Memo rules" },
  },

  typography: {
    display: '"Tiempos Headline", "Source Serif 4", Georgia, serif',
    body: '"Inter", "IBM Plex Sans", system-ui',
    mono: '"IBM Plex Mono", monospace',
    scale: "11/12/14/16/18/24/36/52",
    weight: "display 450-620 · body 400-520 · metric 650",
    tracking: "section labels +0.1em, body normal",
  },

  antiPatterns: [
    { name: "Dashboard overload", dont: "turn the memo into only charts", why: "Board readers need synthesis and decisions" },
    { name: "Marketing hero", dont: "open with vague vision copy", why: "Executive memos should be answer-first" },
    { name: "Unlabeled numbers", dont: "show metrics without period and source", why: "Board context depends on time and provenance" },
    { name: "Buried ask", dont: "hide decisions at the bottom", why: "The ask is the purpose of the memo" },
  ],

  responsive: [
    { element: "Decision summary", mobile: "top stack with key asks", tablet: "summary + metric rail", desktop: "memo body with sticky decision rail" },
    { element: "Metrics", mobile: "2-column compact cards", tablet: "row of cards", desktop: "inline metric table" },
    { element: "Appendix", mobile: "accordion links", tablet: "section list", desktop: "right appendix rail" },
  ],

  snippets: [
    `.memo-page { background:#FAFAF7; color:#171717; font-family:Inter,system-ui,sans-serif; }`,
    `.memo-title { font-family:'Tiempos Headline',Georgia,serif; font-size:clamp(36px,6vw,52px); font-weight:500; line-height:1; }`,
    `.decision-box { border-left:4px solid #1F4E79; background:#fff; padding:16px; }`,
  ],

  successLooksLike: [
    "A reader immediately sees the decisions requested",
    "Metrics and risks are sourced and tied to narrative",
    "The page feels like an executive memo, not a marketing dashboard",
  ],

  failureLooksLike: [
    "A SaaS landing page pretending to be a report",
    "Charts without a recommendation",
    "Key asks hidden below long paragraphs",
  ],

  tile: "tile-boardmemo",
  tileHTML: `
    <div style="height:150px;background:#FAFAF7;color:#171717;display:flex;flex-direction:column;justify-content:space-between;padding:16px;font-family:Inter,system-ui,sans-serif">
      <div style="display:flex;justify-content:space-between;font:10px 'IBM Plex Mono',monospace;color:#1F4E79;letter-spacing:.1em;text-transform:uppercase"><span>board memo</span><span>q2</span></div>
      <div style="font-family:'Source Serif 4',Georgia,serif;font-size:27px;line-height:1;letter-spacing:-.02em">Three asks,<br/>one page.</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px;font-size:10px"><span style="border-top:3px solid #1F4E79;padding-top:6px">$4.2M</span><span style="border-top:3px solid #8A5A00;padding-top:6px">risk</span><span style="border-top:3px solid #DFDDD3;padding-top:6px">vote</span></div>
    </div>
  `,
});

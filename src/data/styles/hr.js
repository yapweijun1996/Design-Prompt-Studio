import { asFullPreset } from "./compact.js";

export const hr = asFullPreset({
  id: "hr",
  name: "HR / Recruiting",
  tag: "Pipeline · candidate · ATS",
  desc: "Candidate pipeline kanban. Job-req cards. Interview scheduler. Workday / Greenhouse / Lever / Ashby register.",

  feel: "A recruiter coordinating 40 in-flight roles in Greenhouse — pipeline kanban, candidate cards, scorecard inline — not a marketing landing pretending to be an ATS.",

  references: "Greenhouse, Lever, Ashby, Workday Recruiting, Gem, Rippling, Personio, BambooHR",

  boldFactor: [
    "Candidate-pipeline kanban: 5-7 stages (Applied → Phone → Onsite → Offer → Hired)",
    "Candidate card: avatar + name + role + source + recruiter + stage-age",
    "Job-req cards: title + department + location + headcount + status + opened-date",
    "Interview scheduler with availability heatmap + timezone aware",
    "Scorecard / interview-kit inline: structured rubric, not free-text only",
    "DEI dashboard: pipeline diversity, time-to-hire, source effectiveness",
    "Calm, recruiter-friendly palette: soft greens + greys (Greenhouse) or indigo (Ashby)",
  ],

  tokens: {
    "bg":       { value: "#F7F9FA", usage: "App background" },
    "surface":  { value: "#FFFFFF", usage: "Card surface" },
    "fg":       { value: "#1F2937", usage: "Body text" },
    "muted":    { value: "#6B7280", usage: "Secondary text" },
    "brand":    { value: "#2E8E5C", usage: "Greenhouse green (or indigo #5B5BD6 for Ashby)" },
    "ok":       { value: "#10B981", usage: "Hired / passed" },
    "warn":     { value: "#F59E0B", usage: "Stalled / overdue" },
    "danger":   { value: "#EF4444", usage: "Rejected" },
    "border":   { value: "#E5E7EB", usage: "Borders" },
  },

  typography: {
    display: '"Inter", system-ui, sans-serif',
    body:    '"Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "11/12/13/14/16/20/24/30",
    weight:  "display 600 · body 400-500 · numbers tabular",
    tracking: "normal · tabular for stage-age + counts",
  },

  antiPatterns: [
    { name: "Marketing whitespace", dont: "use 96px section padding on an ATS", why: "Recruiters scan 40+ candidates per day — density wins over polish" },
    { name: "Modal-per-action",     dont: "open modal for every stage change", why: "Drag-between-columns is the genre primitive — modals break flow" },
    { name: "Free-text-only scorecards", dont: "show a single 'notes' textarea", why: "Structured rubric reduces bias + enables aggregate scoring" },
    { name: "Vanity vibrant palette", dont: "use saturated brand colors throughout", why: "Calm, recruiter-friendly palette — color reserved for stage + state" },
    { name: "Stock smiling-team photo", dont: "use Shutterstock team-in-meeting", why: "Product UI screenshots show the tool — that's the trust signal" },
  ],

  responsive: [
    { element: "Pipeline cols",  mobile: "stack",  tablet: "scroll-h", desktop: "5-7 visible" },
    { element: "Candidate card", mobile: "100%",   tablet: "260px",    desktop: "280px" },
    { element: "Side drawer",    mobile: "full",   tablet: "60%",      desktop: "480px" },
  ],

  snippets: [
    `/* Candidate card in pipeline */
.candidate-card { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; padding: 10px 12px; display: grid; grid-template-columns: 32px 1fr auto; gap: 10px; cursor: grab; }
.candidate-card .avatar { width: 32px; height: 32px; border-radius: 50%; background: #2E8E5C; color: #FFFFFF; display: grid; place-items: center; font-weight: 600; font-size: 13px; }
.candidate-card .name { font-weight: 500; font-size: 14px; color: #1F2937; }
.candidate-card .role { font-size: 12px; color: #6B7280; }
.candidate-card .age { font-size: 11px; color: #6B7280; font-variant-numeric: tabular-nums; }
.candidate-card.stalled { border-color: #F59E0B; background: #FFFBEB; }`,
    `/* Pipeline column */
.pipeline-col { width: 280px; flex-shrink: 0; }
.pipeline-col-head { display: flex; justify-content: space-between; align-items: center; padding: 8px 10px; }
.pipeline-col-head .stage { font-size: 13px; font-weight: 600; color: #1F2937; letter-spacing: 0.02em; }
.pipeline-col-head .count { background: #E5E7EB; border-radius: 10px; padding: 1px 8px; font-size: 11px; color: #4B5563; font-variant-numeric: tabular-nums; }`,
    `/* Job-req card */
.req-card { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; padding: 16px; }
.req-card .title { font-size: 16px; font-weight: 600; color: #1F2937; }
.req-card .meta { font-size: 12px; color: #6B7280; margin: 4px 0; }
.req-card .stats { display: flex; gap: 16px; padding-top: 10px; border-top: 1px solid #E5E7EB; font-size: 12px; color: #6B7280; font-variant-numeric: tabular-nums; }
.req-card .stats strong { color: #1F2937; font-weight: 600; }`,
  ],

  successLooksLike: [
    "Greenhouse candidate pipeline view",
    "Ashby pipeline + scorecards screen",
    "Workday Recruiting requisition list",
  ],

  failureLooksLike: [
    "Marketing landing with 'Hire smarter' hero applied to an ATS",
    "Single-page free-text interview notes (no rubric)",
    "Cluttered modal flow for every candidate stage change",
  ],

  tile: "tile-hr",
  tileHTML: `
    <div class="col">
      <div class="hd">Phone <span class="ct">8</span></div>
      <div class="card"><div class="av">JM</div><div class="nm">Jordan M.</div></div>
      <div class="card"><div class="av">PR</div><div class="nm">Priya R.</div></div>
    </div>
    <div class="col">
      <div class="hd">Onsite <span class="ct">3</span></div>
      <div class="card hl"><div class="av">SL</div><div class="nm">Sam L.</div></div>
    </div>
  `,
});

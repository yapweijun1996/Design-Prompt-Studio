import { asFullPreset } from "./compact.js";

export const analytics = asFullPreset({
  id: "analytics",
  name: "Product Analytics",
  tag: "Funnels · cohorts · charts",
  desc: "Funnel + cohort + retention. Query builder. Big charts. Mixpanel / Amplitude / PostHog / Heap register.",

  feel: "A PM debugging a drop-off in onboarding at 4pm — funnel chart shows the cliff, cohort table proves it's not seasonal — not a marketing dashboard with vanity counters.",

  references: "Mixpanel, Amplitude, PostHog, Heap, June, Snowplow, Pendo, Hotjar (Heatmaps)",

  boldFactor: [
    "Chart-first canvas: funnel, cohort, retention curve, time-series, breakdown",
    "Query / segment builder: 'Did event X / Property Y / In time Z' chip composer",
    "Saved dashboards with shareable URLs + scheduled emails",
    "Cohort table with retention heatmap (D0 / D1 / D7 / D30) color-coded",
    "Breakdown / pivot by property (country, device, plan) — inline switcher",
    "Event taxonomy browser in the left panel — search-first",
    "Calm light theme with one analyst-blue or violet accent",
  ],

  tokens: {
    "bg":       { value: "#F9FAFB", usage: "App background" },
    "surface":  { value: "#FFFFFF", usage: "Card / chart surface" },
    "fg":       { value: "#111827", usage: "Body text" },
    "muted":    { value: "#6B7280", usage: "Axis labels, captions" },
    "brand":    { value: "#7C3AED", usage: "Amplitude violet (or Mixpanel indigo)" },
    "ok":       { value: "#10B981", usage: "Up / positive" },
    "danger":   { value: "#EF4444", usage: "Drop-off / down" },
    "neutral":  { value: "#9CA3AF", usage: "Comparison line" },
    "border":   { value: "#E5E7EB", usage: "Borders" },
  },

  typography: {
    display: '"Inter", system-ui, sans-serif',
    body:    '"Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", "Fira Code", monospace',
    scale:   "10/11/12/13/14/16/22/32",
    weight:  "display 500-600 · body 400 · numbers 500 tabular",
    tracking: "normal · tabular-nums on every figure",
  },

  antiPatterns: [
    { name: "Vanity counters",   dont: "show single big numbers without context", why: "Numbers without comparison (vs. last period, vs. cohort) are vanity — meaningless" },
    { name: "Rainbow charts",    dont: "use 8+ colors in one line chart", why: "Brand-accent + neutral grey for comparison; rainbows lose the story" },
    { name: "Modal-driven query", dont: "open a modal for every filter change", why: "Inline chip composer in the chart header — fast iteration is the workflow" },
    { name: "Hidden event taxonomy", dont: "hide the events catalog behind a menu", why: "Discoverability of tracked events drives self-serve analytics" },
    { name: "Dense unreadable tables", dont: "show cohort table with 16 cols + 9px font", why: "Cohort tables need breathing room; horizontal scroll OK, illegibility not" },
  ],

  responsive: [
    { element: "Sidebar",       mobile: "drawer", tablet: "icon",  desktop: "240px" },
    { element: "Chart card",    mobile: "100%",   tablet: "100%",  desktop: "8col / 12col" },
    { element: "Cohort table",  mobile: "scroll-h", tablet: "scroll-h", desktop: "full" },
  ],

  snippets: [
    `/* Chart card */
.chart-card { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; padding: 20px; }
.chart-card .head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 16px; }
.chart-card .title { font-size: 14px; font-weight: 600; color: #111827; }
.chart-card .delta { font-size: 13px; font-weight: 600; font-variant-numeric: tabular-nums; }
.chart-card .delta--up   { color: #10B981; }
.chart-card .delta--down { color: #EF4444; }`,
    `/* Query chip composer */
.query-chips { display: flex; flex-wrap: wrap; gap: 6px; padding: 8px; background: #F3F4F6; border-radius: 6px; }
.query-chip { display: inline-flex; align-items: center; gap: 6px; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 14px; padding: 4px 10px; font-size: 12px; color: #111827; cursor: pointer; }
.query-chip .key { color: #6B7280; }
.query-chip .val { font-weight: 600; color: #7C3AED; }
.query-chip .x { color: #9CA3AF; cursor: pointer; }`,
    `/* Cohort retention heatmap cell */
.cohort-cell { padding: 6px 8px; text-align: center; font-size: 12px; font-variant-numeric: tabular-nums; border-radius: 3px; }
.cohort-cell[data-v="90+"] { background: #5B21B6; color: #FFF; }
.cohort-cell[data-v="60-90"] { background: #7C3AED; color: #FFF; }
.cohort-cell[data-v="30-60"] { background: #A78BFA; color: #1F2937; }
.cohort-cell[data-v="10-30"] { background: #DDD6FE; color: #1F2937; }
.cohort-cell[data-v="0-10"]  { background: #F3F4F6; color: #6B7280; }`,
  ],

  successLooksLike: [
    "Mixpanel funnel + breakdown view",
    "Amplitude cohort retention heatmap",
    "PostHog dashboard with insight panels",
  ],

  failureLooksLike: [
    "Marketing dashboard with 5 big vanity counters",
    "Rainbow line chart with 8 series and no legend hierarchy",
    "Modal-flow filter UX requiring 4 clicks per query change",
  ],

  tile: "tile-analytics",
  tileHTML: `
    <div class="hd">SIGNUP FUNNEL · 7d</div>
    <svg class="bars" viewBox="0 0 100 40" preserveAspectRatio="none">
      <rect x="2"  y="2"  width="18" height="36" fill="#7C3AED"/>
      <rect x="22" y="10" width="18" height="28" fill="#A78BFA"/>
      <rect x="42" y="20" width="18" height="18" fill="#A78BFA"/>
      <rect x="62" y="28" width="18" height="10" fill="#DDD6FE"/>
    </svg>
    <div class="lbl"><span>Visit</span><span>Sign</span><span>Verify</span><span>Active</span></div>
    <div class="ft">12,400 → 4,820 → 2,140 → <strong>980</strong> · <em>7.9%</em></div>
  `,
});

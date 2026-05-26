import { asFullPreset } from "./compact.js";

export const darkboard = asFullPreset({
  id: "darkboard",
  name: "Dashboard Dark",
  tag: "Charts · dark · observability",
  desc: "Dark slate background. Chart-grid layout. Status-color coded. Grafana / Datadog / New Relic register.",

  feel: "An on-call engineer's main monitor at 3am during an incident — every panel is a graph, color = severity — not a marketing site with a dark mode toggle.",

  references: "Grafana dashboards, Datadog monitoring, New Relic One, Honeycomb, Splunk Observability, AWS CloudWatch dashboards, Lightdash",

  boldFactor: [
    "Slate background (#0B1020 / #111827) — never pure black",
    "Chart grid layout: time-series panels arranged in a 12-column grid",
    "Severity color coding: green=healthy, amber=warn, red=critical, blue=info",
    "Sparkline + big-number + delta % combo at top of each panel",
    "Compact 12-13px sans-serif for everything, mono for values",
    "Persistent time-range selector + auto-refresh indicator",
    "Live data indicators: pulsing dot, last-updated timestamp",
  ],

  tokens: {
    "bg":        { value: "#0B1020", usage: "App background" },
    "surface":   { value: "#141A2E", usage: "Panel surface" },
    "surface-2": { value: "#1C2440", usage: "Elevated surface" },
    "fg":        { value: "#E5E7EB", usage: "Primary text" },
    "muted":     { value: "#8B93A7", usage: "Secondary text / axis labels" },
    "ok":        { value: "#10B981", usage: "Healthy / success" },
    "warn":      { value: "#F59E0B", usage: "Warning threshold" },
    "crit":      { value: "#EF4444", usage: "Critical / firing" },
    "border":    { value: "#1F2740", usage: "Panel border" },
  },

  typography: {
    display: '"Inter", system-ui, sans-serif',
    body:    '"Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", "IBM Plex Mono", monospace',
    scale:   "10/11/12/13/16/24/36/48",
    weight:  "display 500-600 · body 400 · numbers 500 mono',",
    tracking: "normal · mono numbers tabular",
  },

  antiPatterns: [
    { name: "Pure black bg",   dont: "use #000 as the panel background", why: "Slate (#0B1020) reduces eye strain in 3am incident rooms" },
    { name: "Decorative gradient", dont: "use brand gradient backdrop", why: "Color must encode severity; gradient steals that signal" },
    { name: "Large hero type",  dont: "use 56px display headlines", why: "Dashboards are info-dense; 12-13px body, big NUMBERS only" },
    { name: "Rounded cards",    dont: "use 16px+ border-radius", why: "Tight 4-6px radius for panels — feels like a tool, not a marketing card" },
    { name: "Stock illustration", dont: "use Lottie animations on dashboards", why: "Charts are the illustration; anything else is noise" },
  ],

  responsive: [
    { element: "Page padding",  mobile: "12px",  tablet: "16px",  desktop: "20px" },
    { element: "Panel gap",     mobile: "8px",   tablet: "12px",  desktop: "16px" },
    { element: "Big-number",    mobile: "28px",  tablet: "36px",  desktop: "48px" },
  ],

  snippets: [
    `/* Dashboard grid */
.dash-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 16px; padding: 20px; background: #0B1020; min-height: 100vh; }
.panel { background: #141A2E; border: 1px solid #1F2740; border-radius: 6px; padding: 16px; color: #E5E7EB; }
.panel--6 { grid-column: span 6; } .panel--4 { grid-column: span 4; } .panel--12 { grid-column: span 12; }`,
    `/* Big number panel */
.kpi-num { font-family: "JetBrains Mono", monospace; font-size: 36px; font-weight: 500; font-variant-numeric: tabular-nums; line-height: 1; }
.kpi-label { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: #8B93A7; margin-bottom: 6px; }
.kpi-delta--up { color: #10B981; } .kpi-delta--down { color: #EF4444; }`,
    `/* Live status indicator */
.live { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; color: #10B981; }
.live::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: #10B981; animation: pulse 1.6s ease-in-out infinite; }
@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }`,
  ],

  successLooksLike: [
    "A Grafana production dashboard",
    "A Datadog APM service map",
    "Honeycomb's BubbleUp view",
  ],

  failureLooksLike: [
    "A SaaS marketing landing with dark mode",
    "Pure black background with neon graphs",
    "Rounded 24px panels with one big illustration",
  ],

  tile: "tile-darkboard",
  tileHTML: `
    <div class="head">PROD · us-east-1 <span class="live">● live</span></div>
    <div class="kpi">99.94<span class="pct">%</span></div>
    <div class="lbl">UPTIME · 30d</div>
    <svg class="spark" viewBox="0 0 100 24" preserveAspectRatio="none"><polyline points="0,18 10,16 20,17 30,14 40,15 50,10 60,12 70,8 80,9 90,5 100,6" fill="none" stroke="#10B981" stroke-width="1.5"/></svg>
  `,
});

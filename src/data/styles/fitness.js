import { asFullPreset } from "./compact.js";

export const fitness = asFullPreset({
  id: "fitness",
  name: "Fitness Tracker",
  tag: "Activity · stats · graphs",
  desc: "Activity-feed + stats charts. Map traces for runs. Strava / Whoop / Garmin Connect / Apple Fitness register.",

  feel: "Logging into Strava on Sunday night to see the week's runs — map trace front-and-center, splits + heart-rate, kudos to friends — not a marketing site pretending to be fitness.",

  references: "Strava, Whoop, Garmin Connect, Apple Fitness+, Peloton, Hevy, MyFitnessPal, AllTrails",

  boldFactor: [
    "Activity feed: workout cards with map trace + duration + distance + pace + HR zone",
    "Stats charts: weekly volume bars, HR-zone donut, pace curve, cadence line",
    "Athletic palette: vibrant orange (Strava), electric green (Whoop), or burnt red",
    "Kudos / comments mechanic on each activity — social proof of effort",
    "Achievement badges: 'Personal Best', 'Longest Run', 'Streak: 14 days'",
    "Goal progress: weekly distance bar, training-load gauge, recovery score",
    "Mono font for all numeric values — alignment is critical",
  ],

  tokens: {
    "bg":       { value: "#FFFFFF", usage: "Page white (Strava feed)" },
    "bg-dark":  { value: "#0A0F1F", usage: "Whoop dark alt" },
    "surface":  { value: "#F7F8FA", usage: "Card alt section" },
    "fg":       { value: "#0F1620", usage: "Body near-black" },
    "muted":    { value: "#6B7280", usage: "Secondary text" },
    "brand":    { value: "#FC4C02", usage: "Strava orange (or Whoop green #16D784)" },
    "hr-easy":  { value: "#3DB7E4", usage: "HR zone 1-2 cyan" },
    "hr-hard":  { value: "#F5B342", usage: "HR zone 4-5 orange" },
    "hr-peak":  { value: "#E32444", usage: "HR zone 5 red" },
    "border":   { value: "#E5E7EB", usage: "Card border" },
  },

  typography: {
    display: '"Söhne", "Inter Display", system-ui',
    body:    '"Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", "Roboto Mono", monospace',
    scale:   "10/11/12/14/16/22/32/56",
    weight:  "display 700-800 · body 400-500 · stat numbers mono tabular",
    tracking: "display tight (-0.025em) · stats mono tabular",
  },

  antiPatterns: [
    { name: "Marketing-only landing", dont: "show only feature copy without app UI", why: "Activity cards + stat dashboards ARE the product — show them" },
    { name: "Proportional stat numbers", dont: "use default font-variant-numeric on pace/distance", why: "Numeric columns MUST be tabular-nums or alignment breaks" },
    { name: "No map trace",        dont: "show runs as text-only entries", why: "Map polyline of the route IS the social/visual artifact" },
    { name: "Stock fit-model photo", dont: "use generic stock-photo athletes", why: "Real athlete photography or product UI screenshots — never stock" },
    { name: "Pastel calm palette", dont: "use muted serene colors", why: "Fitness apps are kinetic — vibrant orange/green/red signals effort" },
  ],

  responsive: [
    { element: "Feed card",       mobile: "100%",  tablet: "600px",  desktop: "640px" },
    { element: "Stat chart",      mobile: "stack", tablet: "2-up",   desktop: "3-up" },
    { element: "Map trace",       mobile: "16:9",  tablet: "16:9",   desktop: "21:9" },
  ],

  snippets: [
    `/* Activity card */
.activity-card { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; padding: 16px; }
.activity-card .head { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.activity-card .avatar { width: 36px; height: 36px; border-radius: 50%; background: #FC4C02; }
.activity-card .name { font-weight: 600; font-size: 14px; color: #0F1620; }
.activity-card .when { font-size: 12px; color: #6B7280; }
.activity-card h3 { font-size: 18px; font-weight: 700; color: #0F1620; margin: 4px 0 12px; }
.activity-card .map { aspect-ratio: 16/9; background: linear-gradient(135deg, #E8F4F0, #C5E5D7); border-radius: 8px; margin-bottom: 12px; }`,
    `/* Stat row — distance / pace / time */
.stat-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 12px 0; border-top: 1px solid #E5E7EB; }
.stat-block .num { font-family: "JetBrains Mono", monospace; font-size: 22px; font-weight: 700; color: #0F1620; font-variant-numeric: tabular-nums; line-height: 1; }
.stat-block .lbl { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: #6B7280; margin-top: 4px; }`,
    `/* HR zone bar */
.hr-zone-bar { display: flex; height: 6px; border-radius: 3px; overflow: hidden; }
.hr-zone-bar .z1 { background: #3DB7E4; flex: 12; }
.hr-zone-bar .z2 { background: #2DA876; flex: 28; }
.hr-zone-bar .z3 { background: #F5B342; flex: 36; }
.hr-zone-bar .z4 { background: #E32444; flex: 18; }
.hr-zone-bar .z5 { background: #8B1538; flex: 6; }`,
  ],

  successLooksLike: [
    "Strava activity feed with map + splits + kudos",
    "Whoop daily-recovery dashboard",
    "Garmin Connect training-load gauge",
  ],

  failureLooksLike: [
    "Marketing landing with stock photo of person running",
    "Activity entries without a map trace",
    "Vague pastel palette on a high-intensity app",
  ],

  tile: "tile-fitness",
  tileHTML: `
    <div class="hd"><div class="av"></div><div class="nm">Tuesday Long Run</div></div>
    <svg class="trace" viewBox="0 0 100 28" preserveAspectRatio="none"><path d="M2,20 Q15,8 30,12 T55,16 T80,8 T98,14" fill="none" stroke="#FC4C02" stroke-width="2"/></svg>
    <div class="row">
      <div><span class="n">12.4</span><span class="l">km</span></div>
      <div><span class="n">5:12</span><span class="l">/km</span></div>
      <div><span class="n">64:32</span><span class="l">time</span></div>
    </div>
  `,
});

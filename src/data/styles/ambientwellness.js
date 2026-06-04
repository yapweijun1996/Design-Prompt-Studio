import { asFullPreset } from "./compact.js";

export const ambientwellness = asFullPreset({
  id: "ambientwellness",
  name: "Ambient Wellness",
  tag: "wellness · calm app · soft sensory",
  desc: "A calm wellness style for meditation, sleep, therapy, recovery, breathwork, and reflective self-care products.",
  sampleTemplate: "spatial",

  feel: "Quiet, spacious, sensory, and non-clinical: a product that lowers cognitive load without becoming vague pastel mush.",

  references: "Headspace restraint, Calm app, Endel, Reflectly, One Medical warmth, Kinfolk wellness editorial, Apple Fitness recovery surfaces",

  boldFactor: [
    "Soft atmospheric field with one clear daily action",
    "Use humane, non-alarming language; never guilt users",
    "Progress is gentle and reflective, not streak-addictive",
    "Large touch targets and low-contrast-but-readable surfaces",
    "Sound, breath, sleep, or mood state is represented visually",
  ],

  tokens: {
    bg: { value: "#F7F1EA", usage: "Warm calm background" },
    fg: { value: "#2A2521", usage: "Primary text" },
    muted: { value: "#756B62", usage: "Secondary copy" },
    accent: { value: "#6E8B7E", usage: "Primary action / selected state" },
    soft: { value: "#E8DCCF", usage: "Soft surfaces" },
    glow: { value: "#D9C7F2", usage: "Ambient highlight" },
    border: { value: "#DDD0C3", usage: "Gentle dividers" },
  },

  typography: {
    display: '"Newsreader", Georgia, serif',
    body: '"Inter", system-ui, sans-serif',
    mono: '"IBM Plex Mono", monospace',
    scale: "12/14/16/18/24/34/52/68",
    weight: "display 450-620 · body 400-500",
    tracking: "display normal, labels +0.1em",
  },

  antiPatterns: [
    { name: "Pastel mush", dont: "make everything low-contrast and vague", why: "Calm still needs usable hierarchy" },
    { name: "Streak pressure", dont: "gamify wellness with guilt-heavy streaks", why: "The style should reduce pressure" },
    { name: "Clinical sterility", dont: "look like a hospital portal", why: "This is supportive wellness, not medical administration" },
    { name: "Decorative nature cliche", dont: "use random leaf icons everywhere", why: "Sensory state should be meaningful" },
  ],

  responsive: [
    { element: "Daily action", mobile: "single large card", tablet: "action + reflection side by side", desktop: "centered action with ambient side panels" },
    { element: "Mood / state", mobile: "thumb-friendly segmented controls", tablet: "large selectable chips", desktop: "radial or horizontal state map" },
    { element: "Progress", mobile: "gentle weekly reflection", tablet: "calendar strip", desktop: "trend + journal excerpts" },
  ],

  snippets: [
    `.wellness-shell { background:radial-gradient(circle at 70% 10%, #D9C7F2 0, transparent 34%), #F7F1EA; color:#2A2521; }`,
    `.breath-card { background:rgba(255,255,255,.56); border:1px solid #DDD0C3; border-radius:28px; box-shadow:0 24px 70px rgba(60,45,30,.10); }`,
    `.gentle-button { background:#6E8B7E; color:#fff; border-radius:999px; min-height:48px; padding:0 22px; }`,
  ],

  successLooksLike: [
    "The first screen offers one calm, obvious action",
    "The interface feels warm and grounded without becoming unreadable",
    "Progress supports reflection instead of pressure",
  ],

  failureLooksLike: [
    "A generic pastel landing page",
    "Tiny low-contrast controls",
    "Streaks and badges that make wellness feel like homework",
  ],

  tile: "tile-ambientwellness",
  tileHTML: `
    <div style="height:150px;background:radial-gradient(circle at 74% 12%,#D9C7F2,transparent 38%),#F7F1EA;color:#2A2521;display:flex;flex-direction:column;justify-content:space-between;padding:17px;font-family:Inter,system-ui,sans-serif">
      <div style="font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#6E8B7E">today</div>
      <div style="font-family:Newsreader,Georgia,serif;font-size:30px;line-height:1;letter-spacing:-.02em">Breathe<br/>softly.</div>
      <div style="display:flex;align-items:center;gap:8px"><span style="background:#6E8B7E;color:#fff;border-radius:999px;padding:7px 13px;font-size:11px;font-weight:700">Begin</span><span style="font-size:11px;color:#756B62">4 min reset</span></div>
    </div>
  `,
});

import { asFullPreset } from "./compact.js";

export const event = asFullPreset({
  id: "event",
  name: "Conference / Event",
  tag: "Countdown · speakers · agenda",
  desc: "Date + countdown. Speaker grid. Multi-track agenda. Config / Stripe Sessions / FWA / Web Summit register.",

  feel: "Landing on Config's site three weeks before the conference — date dominates the hero, speakers stare back at you, the agenda is already drafted — not a generic event-management template.",

  references: "config.figma.com, sessions.stripe.com, awwwards.com/events, webflow.com/conf, framer.com/conf, ramp.com/sessions, web-summit.com",

  boldFactor: [
    "Hero: event name + date + location + countdown timer + register CTA",
    "Speaker grid: portrait + name + role + company — hover reveals bio",
    "Agenda as a multi-track timetable (Track 1, Track 2, Workshops)",
    "Sponsor tier strip: Platinum, Gold, Silver — logos sized by tier",
    "Past-edition recap (photos, recordings, attendee numbers)",
    "FAQ + venue / travel section",
    "Ticket-tier table with feature comparison + 'Buy ticket' CTA per tier",
  ],

  tokens: {
    "bg":      { value: "#0E0E10", usage: "Stage black (or invert for daylight events)" },
    "surface": { value: "#1A1A1D", usage: "Card / speaker surface" },
    "fg":      { value: "#F5F5F5", usage: "Primary text" },
    "muted":   { value: "#9A9A9A", usage: "Secondary, captions" },
    "brand":   { value: "#E12C75", usage: "Event brand color (varies per event)" },
    "brand-2": { value: "#F4B400", usage: "Secondary accent (sponsor tier gold)" },
    "border":  { value: "#2A2A2E", usage: "Border" },
  },

  typography: {
    display: '"PP Editorial New", "Söhne", "Inter Display", system-ui',
    body:    '"Söhne", "Inter", system-ui, sans-serif',
    mono:    '"Söhne Mono", "JetBrains Mono", monospace',
    scale:   "12/14/16/18/24/36/56/96",
    weight:  "display 500-700 · body 400 · countdown 700 mono",
    tracking: "display tight (-0.025em) · countdown tabular",
  },

  antiPatterns: [
    { name: "No countdown",     dont: "skip the date / countdown timer", why: "Event sites are time-bound — countdown is essential urgency" },
    { name: "Stock speaker photos", dont: "use Shutterstock business-headshot", why: "Real speaker portraits build trust + recognition — book the real photo" },
    { name: "Single-track agenda", dont: "list talks in a single column", why: "Multi-track timetable is the convention; attendees plan their day" },
    { name: "Buried tickets",   dont: "tuck ticket-buying behind a long sales page", why: "Ticket tiers + buy CTAs should be reachable in 2 clicks max" },
    { name: "Aggressive popups",dont: "throw an 'Early bird ends today!' modal", why: "Countdown does that work — popups break the immersion" },
  ],

  responsive: [
    { element: "Hero countdown", mobile: "44px",  tablet: "72px",  desktop: "96px" },
    { element: "Speaker grid",   mobile: "2col",  tablet: "4col",  desktop: "5col" },
    { element: "Agenda",         mobile: "1track stacked", tablet: "2tracks", desktop: "all tracks" },
  ],

  snippets: [
    `/* Hero with countdown */
.event-hero { padding: 96px 32px; background: #0E0E10; color: #F5F5F5; text-align: center; }
.event-hero h1 { font-family: "PP Editorial New", serif; font-weight: 600; font-size: 96px; letter-spacing: -0.04em; line-height: 0.95; margin: 0 0 16px; }
.event-hero .meta { font-family: "Söhne Mono", monospace; font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase; color: #9A9A9A; }
.event-hero .countdown { display: inline-flex; gap: 12px; margin: 32px 0; font-family: "Söhne Mono", monospace; font-weight: 700; font-size: 72px; font-variant-numeric: tabular-nums; color: #E12C75; }`,
    `/* Speaker card */
.speaker-card { background: #1A1A1D; border-radius: 12px; overflow: hidden; }
.speaker-card img { width: 100%; aspect-ratio: 1/1; object-fit: cover; filter: grayscale(40%); transition: filter 200ms ease; }
.speaker-card:hover img { filter: grayscale(0%); }
.speaker-card .body { padding: 16px; }
.speaker-card .name { font-family: "Söhne", system-ui; font-weight: 600; font-size: 16px; color: #F5F5F5; }
.speaker-card .role { font-size: 13px; color: #9A9A9A; margin-top: 4px; }`,
    `/* Agenda timetable */
.agenda { display: grid; grid-template-columns: 80px repeat(3, 1fr); gap: 1px; background: #2A2A2E; border-radius: 8px; overflow: hidden; }
.agenda-cell { background: #1A1A1D; padding: 12px; color: #F5F5F5; font-size: 13px; }
.agenda-cell.time { background: #0E0E10; font-family: "Söhne Mono", monospace; color: #9A9A9A; font-variant-numeric: tabular-nums; }
.agenda-cell .talk { font-weight: 600; font-size: 14px; }
.agenda-cell .speaker { color: #9A9A9A; margin-top: 2px; font-size: 12px; }`,
  ],

  successLooksLike: [
    "config.figma.com with date + countdown + speaker grid",
    "sessions.stripe.com agenda + ticket tiers",
    "webflow.com/conf hero with bespoke display type",
  ],

  failureLooksLike: [
    "Generic event-template hero with no date / countdown",
    "Single-column agenda for a 12-track conference",
    "Buy-ticket buried behind a 6-section sales page",
  ],

  tile: "tile-event",
  tileHTML: `
    <div class="hd">CONFIG · 2026</div>
    <div class="cd">12 : 04 : 22</div>
    <div class="lbl">DAYS · HOURS · MINUTES</div>
    <div class="btn">GET TICKETS →</div>
  `,
});

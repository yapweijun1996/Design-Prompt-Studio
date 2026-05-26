import { asFullPreset } from "./compact.js";

export const agency = asFullPreset({
  id: "agency",
  name: "Creative Agency",
  tag: "Bold · type · work-led",
  desc: "Massive display type. Full-bleed case-study films. Pentagram / Instrument / Active Theory / R/GA register.",

  feel: "Opening a top-tier creative agency site for client research at 1am — you immediately know they're more talented than you — not a freelancer landing pretending to be an agency.",

  references: "pentagram.com, instrument.com, activetheory.net, r-ga.com, area17.com, hellomonday.com, ueno.co",

  boldFactor: [
    "Hero is one massive headline (84-160px) — confident, opinionated, almost a manifesto",
    "Work showcased as full-bleed films / animations / case-study scrolls",
    "Client logos as a quiet trust strip — never a hero element",
    "Editorial voice in copy: 'We make…' / 'We believe…' / 'For…'",
    "Custom or variable fonts — typography IS the brand",
    "Process page that takes itself seriously (Discover → Define → Design → Deliver)",
    "Heavy use of negative space + asymmetric grid",
  ],

  tokens: {
    "bg":      { value: "#FAFAF8", usage: "Off-white paper" },
    "fg":      { value: "#0A0A0A", usage: "Near-black ink" },
    "muted":   { value: "#6B6B6B", usage: "Caption / metadata" },
    "accent":  { value: "#FF4D2E", usage: "Single bold accent — chosen for impact" },
    "rule":    { value: "#D9D9D9", usage: "Hairline" },
  },

  typography: {
    display: '"GT Super", "PP Editorial New", "Founders Grotesk", "Inter", system-ui',
    body:    '"GT America", "Söhne", "Inter", system-ui, sans-serif',
    mono:    '"GT America Mono", "JetBrains Mono", monospace',
    scale:   "12/14/16/18/24/40/80/160",
    weight:  "display 400-700 · body 400-500",
    tracking: "display very tight (-0.04em on >80px) · body normal",
  },

  antiPatterns: [
    { name: "Stock fonts only", dont: "use Inter+Inter for an agency", why: "Custom or variable typography IS the credibility signal" },
    { name: "Modest hero",      dont: "play it safe with 32px hero", why: "Agency hero is 84-160px — confident is the brand" },
    { name: "Generic services list", dont: "list 'Web Design / SEO / Brand'", why: "Specific work and POV beats a service checklist" },
    { name: "Stock people photos", dont: "use Shutterstock team-in-meeting", why: "Show real work — your work IS the team photo" },
    { name: "Quiet brand color", dont: "use muted-blue accent only", why: "Pick one bold confident accent + commit (red, electric blue, neon)" },
  ],

  responsive: [
    { element: "Hero display",  mobile: "56px",  tablet: "96px",  desktop: "160px" },
    { element: "Section padding", mobile: "48px", tablet: "96px",  desktop: "160px" },
    { element: "Case-study film height", mobile: "60vh", tablet: "80vh", desktop: "100vh" },
  ],

  snippets: [
    `/* Manifesto hero */
.agency-hero h1 { font-family: "GT Super", "PP Editorial New", serif; font-size: 160px; line-height: 0.85; letter-spacing: -0.045em; font-weight: 400; color: #0A0A0A; max-width: 12ch; }
.agency-hero h1 em { color: #FF4D2E; font-style: italic; }
.agency-hero .by { font-family: "GT America Mono", monospace; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #6B6B6B; margin-top: 32px; }`,
    `/* Case-study card with year + client + tag */
.case-card { position: relative; aspect-ratio: 16/10; overflow: hidden; background: #0A0A0A; cursor: pointer; }
.case-card img, .case-card video { width: 100%; height: 100%; object-fit: cover; transition: transform 600ms ease; }
.case-card:hover img { transform: scale(1.03); }
.case-card .meta { position: absolute; bottom: 16px; left: 16px; color: #FFF; font-family: "GT America Mono", monospace; font-size: 11px; letter-spacing: 0.06em; }`,
    `/* Client logo strip — quiet */
.logo-strip { display: flex; flex-wrap: wrap; gap: 48px; align-items: center; padding: 48px 0; opacity: 0.55; filter: grayscale(100%); }
.logo-strip img { height: 24px; width: auto; }`,
  ],

  successLooksLike: [
    "pentagram.com — typography-first, work-led, asymmetric grid",
    "instrument.com — film-style case studies, bold display type",
    "activetheory.net — interactive showreel, animation as identity",
  ],

  failureLooksLike: [
    "Bootstrap agency template with 'Web Design / SEO / Branding' grid",
    "Stock photo of team high-fiving in a meeting",
    "32px modest hero with three feature cards",
  ],

  tile: "tile-agency",
  tileHTML: `
    <div class="word">We<br/>make<br/><em>brands</em>.</div>
    <div class="by">EST · 2007 · NYC + LON</div>
  `,
});

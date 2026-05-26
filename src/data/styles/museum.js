import { asFullPreset } from "./compact.js";

export const museum = asFullPreset({
  id: "museum",
  name: "Museum / Gallery",
  tag: "Exhibition · serif · curated",
  desc: "Big exhibition imagery. Curated typography. Visit info + collection. MoMA / Tate / V&A / Cooper Hewitt register.",

  feel: "Browsing MoMA's current-exhibitions page to plan a weekend visit — the exhibition imagery dominates, opening hours + ticket info clear — not a corporate site dressed up as cultural.",

  references: "moma.org, tate.org.uk, vam.ac.uk, cooperhewitt.org, guggenheim.org, metmuseum.org, sfmoma.org, whitney.org",

  boldFactor: [
    "Big editorial typography (custom display sans or modernist serif)",
    "Current-exhibitions hero with title + dates + artist + curator + 1 hero image",
    "Visit-info strip: hours, address, ticket prices, accessibility",
    "Collection-search interface: filter by artist / period / medium / department",
    "Editorial articles / 'Magazine' section curated by museum staff",
    "Members-only call-out: become a member for tier benefits",
    "Multilingual + accessibility commitment surfaced (audio guide, large-print, ASL)",
  ],

  tokens: {
    "bg":      { value: "#FFFFFF", usage: "Gallery white wall" },
    "bg-alt":  { value: "#F4F2EC", usage: "Section alt — warm cream" },
    "fg":      { value: "#0F0F0F", usage: "Ink black" },
    "muted":   { value: "#5C5C5C", usage: "Caption, metadata" },
    "accent":  { value: "#C41E3A", usage: "Exhibition accent red (or museum brand color)" },
    "rule":    { value: "#D9D9D9", usage: "Hairline" },
  },

  typography: {
    display: '"Söhne Breit", "GT America Extended", "Knockout", "Bebas Neue", sans-serif',
    body:    '"Söhne", "Inter", "Source Serif 4", serif',
    mono:    '"Söhne Mono", "JetBrains Mono", monospace',
    scale:   "11/12/14/16/22/32/56/96",
    weight:  "display 600-800 · body 400 · small-caps for sections",
    tracking: "display very tight (-0.04em) OR extended (+0.04em) — pick a lane",
  },

  antiPatterns: [
    { name: "Stock visitor photo", dont: "use Shutterstock museum-visitor imagery", why: "Use artwork imagery + installation photography — the work IS the marketing" },
    { name: "Marketing voice",  dont: "write 'Discover the wonder of art'", why: "Voice: 'On view: Picasso, 1932 — through Mar 2026'" },
    { name: "Hidden visit info", dont: "tuck hours / tickets behind a menu", why: "Visit info is 50% of arrivals; show in header + dedicated section" },
    { name: "Single-color hero",dont: "use a brand-color hero with no artwork", why: "Hero is artwork — color comes from the work, not the brand" },
    { name: "Light typography", dont: "use modest 32px titles for exhibition names", why: "Exhibitions deserve large editorial typography (56-96px on desktop)" },
  ],

  responsive: [
    { element: "Hero display",   mobile: "44px",  tablet: "72px",  desktop: "96px" },
    { element: "Section padding", mobile: "32px", tablet: "64px",  desktop: "96px" },
    { element: "Visit-info strip", mobile: "stack", tablet: "row",  desktop: "header + sticky" },
  ],

  snippets: [
    `/* Exhibition hero */
.exhibition-hero { display: grid; grid-template-columns: 1fr 1fr; min-height: 80vh; }
.exhibition-hero .img { background: #0F0F0F; background-size: cover; background-position: center; }
.exhibition-hero .meta { padding: 64px 48px; display: flex; flex-direction: column; justify-content: center; background: #FFFFFF; }
.exhibition-hero .label { font-family: "Söhne Mono", monospace; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: #C41E3A; }
.exhibition-hero h1 { font-family: "Söhne Breit", "Knockout", sans-serif; font-weight: 700; font-size: 96px; line-height: 0.95; letter-spacing: -0.025em; color: #0F0F0F; margin: 16px 0; }
.exhibition-hero .dates { font-family: "Söhne", system-ui; font-size: 18px; color: #5C5C5C; margin-bottom: 24px; }`,
    `/* Visit-info strip */
.visit-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; padding: 32px 48px; background: #F4F2EC; border-top: 1px solid #D9D9D9; }
.visit-item .label { font-family: "Söhne Mono", monospace; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #5C5C5C; }
.visit-item .value { font-family: "Söhne", system-ui; font-size: 16px; color: #0F0F0F; margin-top: 4px; font-weight: 500; }`,
    `/* Collection card */
.coll-card { display: grid; grid-template-rows: 280px auto; gap: 8px; cursor: pointer; }
.coll-card img { width: 100%; height: 100%; object-fit: cover; background: #F4F2EC; }
.coll-card .artist { font-family: "Söhne", system-ui; font-weight: 500; font-size: 14px; color: #0F0F0F; }
.coll-card .work { font-style: italic; color: #5C5C5C; font-size: 13px; }
.coll-card .year { font-family: "Söhne Mono", monospace; font-size: 11px; color: #5C5C5C; letter-spacing: 0.04em; }`,
  ],

  successLooksLike: [
    "moma.org current-exhibitions page",
    "tate.org.uk exhibition hero + visit info",
    "Cooper Hewitt collection-browse interface",
  ],

  failureLooksLike: [
    "Corporate landing with 'Visit our museum' SaaS CTA",
    "Stock smiling-visitor photo as hero",
    "Modest 32px exhibition title — looks underwhelming for art",
  ],

  tile: "tile-museum",
  tileHTML: `
    <div class="lbl">ON VIEW</div>
    <div class="word">PICASSO<br/>1932</div>
    <div class="dates">11 Oct 2025 — 22 Mar 2026</div>
    <div class="visit">Open today · 10–18 · Tickets →</div>
  `,
});

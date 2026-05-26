import { asFullPreset } from "./compact.js";

export const gallery = asFullPreset({
  id: "gallery",
  name: "Photo Gallery",
  tag: "Image · grid · slideshow",
  desc: "Photo / artist portfolio site. Full-bleed image grid + slideshow + captions. Format / Squarespace gallery / Cargo Photo / Are.na photographer pages register.",

  feel: "Browsing a photographer's portfolio at midnight — full-bleed images dominate, captions are quiet, the work is the page — not a generic CMS gallery template.",

  references: "format.com photographer portfolios, Cargo Collective photo pages, Squarespace fluid-engine galleries, Are.na photographer profiles, behance.net top photographers, Annie Leibovitz / Wolfgang Tillmans / Nan Goldin artist sites",

  boldFactor: [
    "Photography is 95% of the page — UI chrome is minimal, never competes with the work",
    "Full-bleed grid (mason / justified / square) — high-res, never letterboxed-by-default",
    "Slideshow / lightbox mode: tap → full-viewport image + arrow nav + caption appear",
    "Project / series structure: image set + title + year + caption, not flat dump",
    "Caption typography: tiny mono or italic serif, never compete with image",
    "Click-through hides chrome (header fades, captions appear on hover only)",
    "Off-white / paper background OR pure black — pick a lane that suits the work",
  ],

  tokens: {
    "bg":      { value: "#F5F2EC", usage: "Off-white paper (or invert #0A0A0A black)" },
    "fg":      { value: "#1A1A1A", usage: "Caption ink" },
    "muted":   { value: "#7A7A7A", usage: "Metadata muted" },
    "accent":  { value: "#1A1A1A", usage: "Single ink accent — minimal" },
    "rule":    { value: "#D9D9D9", usage: "Hairline" },
  },

  typography: {
    display: '"Söhne Mono", "GT America Mono", "JetBrains Mono", monospace',
    body:    '"Söhne", "Inter", system-ui, sans-serif',
    mono:    '"Söhne Mono", "JetBrains Mono", monospace',
    scale:   "10/11/12/14/16/20/28/40",
    weight:  "display 400 · body 400 · italic for series titles",
    tracking: "mono open (0.08em) · body normal",
  },

  antiPatterns: [
    { name: "Heavy chrome",       dont: "use a 64px header + sidebar nav + breadcrumbs", why: "Images are the page; chrome belongs to the periphery" },
    { name: "Watermarks",         dont: "splash 'Copyright Photographer 2026' across images", why: "Watermarks destroy the work; use right-click protection + metadata instead" },
    { name: "Branded color theme", dont: "use saturated brand colors", why: "Photo work needs neutral backdrop — paper or black, nothing in between" },
    { name: "Stock fonts only",   dont: "use Inter for captions", why: "Mono or italic-serif captions feel curated, not generic CMS" },
    { name: "Flat image dump",    dont: "show 200 photos in one infinite scroll", why: "Series / project structure with title + year is the curation signal" },
  ],

  responsive: [
    { element: "Grid columns",  mobile: "1",     tablet: "2",     desktop: "3" },
    { element: "Section padding", mobile: "16px", tablet: "32px",  desktop: "48px" },
    { element: "Caption type",  mobile: "10px", tablet: "11px",  desktop: "12px" },
  ],

  snippets: [
    `/* Masonry image grid */
.photo-grid { columns: 3; column-gap: 16px; padding: 32px; }
@media (max-width: 1024px) { .photo-grid { columns: 2; } }
@media (max-width: 640px) { .photo-grid { columns: 1; } }
.photo-grid figure { break-inside: avoid; margin: 0 0 16px; position: relative; cursor: pointer; }
.photo-grid img { width: 100%; height: auto; display: block; background: #E5E1D8; }
.photo-grid figcaption {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 8px 12px;
  background: linear-gradient(0deg, rgba(0,0,0,0.55), transparent);
  color: #FFFFFF;
  font-family: "Söhne Mono", monospace;
  font-size: 11px; letter-spacing: 0.06em;
  opacity: 0; transition: opacity 200ms;
}
.photo-grid figure:hover figcaption { opacity: 1; }`,
    `/* Lightbox slideshow */
.lightbox { position: fixed; inset: 0; background: rgba(10,10,10,0.96); display: grid; place-items: center; z-index: 999; }
.lightbox img { max-width: 92vw; max-height: 88vh; object-fit: contain; }
.lightbox .caption { position: absolute; bottom: 32px; left: 0; right: 0; text-align: center; font-family: "Söhne Mono", monospace; font-size: 12px; color: #F5F2EC; letter-spacing: 0.08em; }
.lightbox .nav { position: absolute; top: 50%; width: 48px; height: 48px; background: none; border: 0; color: #F5F2EC; font-size: 24px; cursor: pointer; }
.lightbox .nav--prev { left: 24px; } .lightbox .nav--next { right: 24px; }`,
    `/* Series title block */
.series { padding: 64px 32px 24px; max-width: 960px; }
.series .label { font-family: "Söhne Mono", monospace; font-size: 11px; letter-spacing: 0.12em; color: #7A7A7A; text-transform: uppercase; }
.series h2 { font-family: "Söhne", system-ui; font-weight: 400; font-size: 28px; font-style: italic; color: #1A1A1A; margin: 8px 0 4px; }
.series .year { font-family: "Söhne Mono", monospace; font-size: 12px; color: #7A7A7A; font-variant-numeric: tabular-nums; }`,
  ],

  successLooksLike: [
    "A photographer's Format.com portfolio with masonry grid + lightbox",
    "Wolfgang Tillmans' tillmans.co.uk single-image landing",
    "A Cargo Collective photographer page with project series structure",
  ],

  failureLooksLike: [
    "Heavy CMS template with sidebar + ads + recommendations",
    "Watermarked images with branded color hero",
    "Inter captions on every image looking like a Notion gallery",
  ],

  tile: "tile-gallery",
  tileHTML: `
    <div class="grid">
      <div class="im a"></div>
      <div class="im b"></div>
      <div class="im c"></div>
      <div class="im d"></div>
    </div>
    <div class="cap">SERIES №04 · TOKYO · 2024</div>
  `,
});

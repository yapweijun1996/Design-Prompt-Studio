import { asFullPreset } from "./compact.js";

export const postmemphis = asFullPreset({
  id: "postmemphis",
  name: "Post-Memphis 2020s",
  tag: "Squiggle · primary · digital",
  desc: "2020s revival of Memphis — squiggles, primary blobs, digital saturation. Bottega Veneta SS22 / Cult Gaia / Glossier brand evolution / Eric Hu register.",

  feel: "Scrolling a 2024 D2C brand site that learned from Memphis but is post-internet — squiggles + primary spots + tight grotesk + clearly digital — not a 1986 reissue.",

  references: "Bottega Veneta SS22, Cult Gaia, Glossier 2.0 rebrand, Eric Hu studio, Marni 2022, Daniel Arsham, Casetify, Off-White early collections",

  boldFactor: [
    "Squiggle / blob / wavy line as primary visual primitive (vector, not painterly)",
    "Saturated primary palette + ONE wildcard pastel: red + blue + yellow + chartreuse / lilac",
    "Tight grotesk display (Söhne, GT Walsheim, ABC Diatype) — NOT the Memphis 80s Futura",
    "Digital-native composition: layered SVG shapes, blend-modes, motion-friendly",
    "Captions in mono + bilingual feel (EN + 1 supplementary token language)",
    "Soft brutalist edge — sharp typography on playful shapes",
    "Trending product / SS season-coded — wears its time signature",
  ],

  tokens: {
    "bg":      { value: "#F5F1E8", usage: "Warm cream paper" },
    "fg":      { value: "#0F0F0F", usage: "Ink black" },
    "red":     { value: "#E63946", usage: "Primary red" },
    "blue":    { value: "#3A5BFF", usage: "Primary blue" },
    "yellow":  { value: "#F2C94C", usage: "Primary yellow" },
    "wild":    { value: "#BBE34A", usage: "Wildcard chartreuse" },
  },

  typography: {
    display: '"GT Walsheim", "ABC Diatype", "Söhne Breit", "Inter Display", sans-serif',
    body:    '"Söhne", "Inter", system-ui, sans-serif',
    mono:    '"GT America Mono", "JetBrains Mono", monospace',
    scale:   "12/14/16/18/24/36/64/96",
    weight:  "display 600-800 · body 400-500 · mono 400",
    tracking: "display tight (-0.025em) · mono normal",
  },

  antiPatterns: [
    { name: "1986 Memphis pastiche", dont: "use Futura + grids + 1980s palette literally", why: "Post-Memphis IS the update — digital, tighter type, fresh palette" },
    { name: "Too many shapes",    dont: "fill the page with 40 squiggles", why: "2-3 considered shapes per composition; restraint creates impact" },
    { name: "Stock illustration", dont: "use generic blob illustration", why: "Custom vector shapes that feel intentional, not stock" },
    { name: "Pastel only",        dont: "use only soft pastels", why: "Saturated primaries + ONE wildcard is the signal" },
  ],

  responsive: [
    { element: "Section padding", mobile: "32px",  tablet: "64px",  desktop: "96px" },
    { element: "Display type",    mobile: "44px",  tablet: "72px",  desktop: "96px" },
    { element: "Shape size",      mobile: "120px", tablet: "200px", desktop: "320px" },
  ],

  snippets: [
    `/* Squiggle SVG primitive */
.pm-squiggle { width: 200px; height: 60px; color: #E63946; }
/* Inside: <svg viewBox="0 0 200 60"><path d="M0,30 Q25,5 50,30 T100,30 T150,30 T200,30" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round"/></svg> */`,
    `/* Hero with overlapping shapes */
.pm-hero { background: #F5F1E8; padding: 96px 32px; position: relative; overflow: hidden; }
.pm-hero h1 { font-family: "GT Walsheim", "ABC Diatype", system-ui; font-weight: 700; font-size: 96px; line-height: 0.95; letter-spacing: -0.03em; color: #0F0F0F; position: relative; z-index: 2; max-width: 18ch; }
.pm-shape-a { position: absolute; top: 64px; right: 120px; width: 240px; height: 240px; border-radius: 50%; background: #F2C94C; }
.pm-shape-b { position: absolute; top: 200px; right: 220px; width: 160px; height: 160px; background: #3A5BFF; transform: rotate(15deg); }`,
  ],

  successLooksLike: [
    "Bottega Veneta SS22 campaign landing",
    "Glossier 2.0 brand site",
    "Casetify product page with custom blob art",
  ],

  failureLooksLike: [
    "Direct 1986 Memphis reissue with Futura",
    "Generic Notion-blob illustration set",
    "All-pastel palette claiming to be Post-Memphis",
  ],

  tile: "tile-postmemphis",
  tileHTML: `
    <div class="shape a"></div>
    <div class="shape b"></div>
    <svg class="sq" viewBox="0 0 100 30"><path d="M0,15 Q12,3 25,15 T50,15 T75,15 T100,15" fill="none" stroke="#E63946" stroke-width="4" stroke-linecap="round"/></svg>
    <div class="word">SS 26</div>
  `,
});

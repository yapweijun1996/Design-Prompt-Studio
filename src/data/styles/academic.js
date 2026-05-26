import { asFullPreset } from "./compact.js";

export const academic = asFullPreset({
  id: "academic",
  name: "Academic Heritage",
  tag: "Crimson · serif · scholarly",
  desc: "Crimson or navy heritage color. Serif everywhere. Crest in header. Harvard / MIT / Cambridge register.",

  feel: "Browsing Harvard's admissions page on a Sunday morning — venerable, intellectual, weight of 300 years — not a bootcamp pretending to be a university.",

  references: "Harvard.edu, MIT.edu, Yale.edu, Stanford.edu, Oxford.ac.uk, Cambridge.ac.uk, Princeton.edu, Caltech.edu",

  boldFactor: [
    "Heritage color: Harvard crimson #A41E2F OR Yale blue #00356B — applied with restraint",
    "Serif for display AND body (Source Serif, Sabon, Garamond)",
    "University crest / shield in the header — never reduced to a logotype",
    "Latin or motto somewhere on the page (small, in small-caps)",
    "Faculty / research grid: name + title + department + research area",
    "Calendar of events as a primary nav element",
    "News-style top stories ('Faculty in the news', 'Research finds…')",
  ],

  tokens: {
    "bg":      { value: "#FAF8F4", usage: "Cream paper" },
    "fg":      { value: "#1A1A1A", usage: "Ink black body" },
    "muted":   { value: "#5C5C5C", usage: "Secondary text" },
    "crimson": { value: "#A41E2F", usage: "Harvard crimson — heritage accent" },
    "navy":    { value: "#00356B", usage: "Yale blue alternative" },
    "gold":    { value: "#B89D63", usage: "Crest gold accent" },
    "rule":    { value: "#CFCFCF", usage: "Hairline divider" },
  },

  typography: {
    display: '"Sabon", "Source Serif 4", "Garamond", Georgia, serif',
    body:    '"Source Serif 4", "Sabon", Georgia, serif',
    mono:    '"Courier Prime", monospace',
    scale:   "12/14/16/18/22/30/44/60',",
    weight:  "display 400-500 · body 400 · italic for journal titles",
    tracking: "display tight (-0.005em) · body normal · small-caps for motto",
  },

  antiPatterns: [
    { name: "Sans-serif body",    dont: "use Inter for paragraph text", why: "Serif body IS the scholarly register; sans reads as bootcamp" },
    { name: "Marketing CTA",      dont: "use 'Apply now — 50% off' style CTAs", why: "Academic voice: 'Apply for admission' / 'Request information'" },
    { name: "Bright illustration", dont: "use Notion-style blob illustration", why: "Heritage = photography of campus, faculty, students, archives" },
    { name: "Gradient hero",      dont: "use vibrant brand gradients", why: "Restraint is the trust signal; gradients read as Coursera, not college" },
    { name: "Hidden crest",       dont: "replace the shield with wordmark only", why: "The crest is centuries of institutional weight; show it" },
  ],

  responsive: [
    { element: "Section padding", mobile: "32px",  tablet: "64px",  desktop: "96px" },
    { element: "Hero serif",      mobile: "36px",  tablet: "48px",  desktop: "60px" },
    { element: "Article measure", mobile: "100%",  tablet: "60ch",  desktop: "66ch" },
  ],

  snippets: [
    `/* Heritage header with crest */
.heritage-header { background: #A41E2F; color: #FFFFFF; padding: 20px 32px; display: flex; align-items: center; gap: 16px; }
.heritage-crest { width: 48px; height: 48px; background: #B89D63; -webkit-mask: url('/crest.svg') center/contain no-repeat; mask: url('/crest.svg') center/contain no-repeat; }
.heritage-name { font-family: "Sabon", Georgia, serif; font-size: 22px; font-weight: 500; letter-spacing: 0.02em; }
.heritage-motto { margin-left: auto; font-family: "Sabon", serif; font-style: italic; font-size: 13px; letter-spacing: 0.06em; }`,
    `/* Academic article hero */
.acad-hero h1 { font-family: "Sabon", "Source Serif 4", serif; font-weight: 500; font-size: 60px; line-height: 1.05; color: #1A1A1A; max-width: 18ch; margin: 0 0 16px; }
.acad-hero .deck { font-family: "Source Serif 4", serif; font-size: 22px; line-height: 1.4; font-style: italic; color: #5C5C5C; max-width: 32ch; }`,
    `/* Faculty card */
.faculty-card { display: grid; grid-template-columns: 80px 1fr; gap: 16px; padding: 16px 0; border-bottom: 1px solid #CFCFCF; }
.faculty-card img { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; filter: grayscale(20%); }
.faculty-card .name { font-family: "Sabon", serif; font-size: 18px; font-weight: 500; }
.faculty-card .role { font-style: italic; color: #A41E2F; font-size: 14px; }`,
  ],

  successLooksLike: [
    "Harvard.edu admissions landing",
    "MIT.edu research news feature",
    "Cambridge college webpage with crest + serif body",
  ],

  failureLooksLike: [
    "Bootcamp landing with 'Apply now — 50% off' CTA",
    "Sans-serif body on a 'faculty news' page",
    "Notion-blob illustration on a college admissions page",
  ],

  tile: "tile-academic",
  tileHTML: `
    <div class="crest">◆</div>
    <div class="name">UNIVERSITAS</div>
    <div class="motto">veritas · lux · 1636</div>
    <div class="head">A community of scholars.</div>
  `,
});

import { asFullPreset } from "./compact.js";

export const news = asFullPreset({
  id: "news",
  name: "News Site",
  tag: "Feed · headline · density",
  desc: "Headline-dense feed. Multi-column. Category-tagged. TechCrunch / The Verge / Wired / Axios register.",

  feel: "Opening The Verge to scan tech news during a coffee break — many headlines per fold, scannable, opinionated — not a personal blog pretending to be a publication.",

  references: "TheVerge.com, TechCrunch, Wired, Ars Technica, Axios, The Information, 404 Media, Rest of World",

  boldFactor: [
    "Multi-zone homepage: lead story big, supporting stories medium, river of headlines below",
    "Category color-coding (Politics red, Tech blue, Science green) — small pills on cards",
    "Headlines are 20-32px sans-serif, opinion-leaning, never click-bait",
    "Bylines + timestamps + read-time visible on every card",
    "Topics nav across the top: Politics, Tech, Science, Culture, Reviews, etc.",
    "Inline ads + sponsored-content disclosure clearly labeled",
    "Latest news rail / live updates strip near the header",
  ],

  tokens: {
    "bg":      { value: "#FFFFFF", usage: "Page white" },
    "bg-soft": { value: "#F4F4F2", usage: "Section alt" },
    "fg":      { value: "#0F0F0F", usage: "Body ink" },
    "muted":   { value: "#5C5C5C", usage: "Byline, timestamp" },
    "brand":   { value: "#FA4616", usage: "Brand red (Verge / TechCrunch energy)" },
    "tech":    { value: "#1E88E5", usage: "Tech category" },
    "politics":{ value: "#D32F2F", usage: "Politics category" },
    "rule":    { value: "#E5E5E5", usage: "Hairline divider" },
  },

  typography: {
    display: '"Inter Display", "Söhne", "Helvetica Neue", sans-serif',
    body:    '"Söhne", "Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "11/12/14/16/20/28/36/48",
    weight:  "display 700-800 · body 400 · pill 600",
    tracking: "display tight (-0.02em) · body normal",
  },

  antiPatterns: [
    { name: "Single-story hero", dont: "show one big article like a personal blog", why: "News = many headlines per fold; one-story hero wastes the home page" },
    { name: "Hidden bylines",   dont: "show only title + image", why: "Trust depends on visible byline + timestamp + outlet" },
    { name: "Auto-play video reel", dont: "open with autoplay video", why: "Aggressive UX — readers want to scan headlines, not be sold to" },
    { name: "Endless infinite scroll", dont: "auto-load 200 articles on scroll", why: "Pagination + 'Load more' respects the reader's session" },
    { name: "Click-bait copy",  dont: "write 'You won't believe what happened next'", why: "Editorial voice is direct: 'Apple announces… ' / 'Inside the failure of…'" },
  ],

  responsive: [
    { element: "Home grid cols", mobile: "1",     tablet: "8",     desktop: "12" },
    { element: "Lead story",     mobile: "100%",  tablet: "8col",  desktop: "8col" },
    { element: "Headline size",  mobile: "20px",  tablet: "24px",  desktop: "32px" },
  ],

  snippets: [
    `/* Home grid */
.home-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; padding: 32px 24px; }
.lead-story { grid-column: span 8; }
.lead-story h2 { font-size: 48px; line-height: 1.05; font-weight: 800; letter-spacing: -0.025em; color: #0F0F0F; }
.side-stack { grid-column: span 4; display: flex; flex-direction: column; gap: 24px; }`,
    `/* Headline card */
.headline-card { padding-bottom: 16px; border-bottom: 1px solid #E5E5E5; }
.headline-card .category { font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #FA4616; }
.headline-card h3 { font-size: 20px; line-height: 1.2; font-weight: 700; color: #0F0F0F; margin: 4px 0 6px; }
.headline-card .meta { font-size: 12px; color: #5C5C5C; }
.headline-card:hover h3 { color: #FA4616; }`,
    `/* Live updates strip */
.live-strip { background: #0F0F0F; color: #FFFFFF; padding: 6px 16px; font-size: 13px; display: flex; align-items: center; gap: 8px; overflow-x: auto; white-space: nowrap; }
.live-strip .label { background: #FA4616; padding: 1px 6px; border-radius: 2px; font-weight: 700; font-size: 11px; letter-spacing: 0.04em; }`,
  ],

  successLooksLike: [
    "TheVerge.com homepage with category pills",
    "TechCrunch lead-story layout with side stack",
    "Axios card-based news feed",
  ],

  failureLooksLike: [
    "Personal blog post layout used as a news homepage",
    "Auto-play video reel + click-bait headline",
    "10 articles total on the page — looks empty for news",
  ],

  tile: "tile-news",
  tileHTML: `
    <div class="live">● LIVE — Markets open down 2.4%</div>
    <div class="cat">TECH</div>
    <div class="head">Apple unveils new chip, claims 40% performance gain.</div>
    <div class="by">M. Lee · 5 min ago · 3 min read</div>
  `,
});

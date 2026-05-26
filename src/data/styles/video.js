import { asFullPreset } from "./compact.js";

export const video = asFullPreset({
  id: "video",
  name: "Video Streaming",
  tag: "Thumbnails · dark · hero",
  desc: "Dark background. Big hero feature + thumbnail rails. Carousel browsing. Netflix / YouTube / Twitch register.",

  feel: "Opening Netflix at 9pm to find something to watch — hero feature dominates, rows of thumbnails scroll horizontally, hover-preview entices — not a static video gallery.",

  references: "Netflix, YouTube, Disney+, Twitch, HBO Max, Apple TV+, Hulu, Peacock",

  boldFactor: [
    "Dark background (#0F0F0F or pure #000) — never light by default",
    "Hero billboard: full-bleed image / autoplay trailer + title + synopsis + play CTA",
    "Horizontal thumbnail rails labeled by category ('Trending', 'New', 'For You')",
    "Thumbnail hover state: scale up + play preview + reveal metadata",
    "Top nav: Home, Search, Library, Categories — minimal, persistent",
    "Sticky control bar appears on scroll with current category",
    "Smart algorithmic recommendations as a primary feature ('Because you watched…')",
  ],

  tokens: {
    "bg":      { value: "#0F0F0F", usage: "Page black" },
    "surface": { value: "#1A1A1A", usage: "Card surface" },
    "fg":      { value: "#FFFFFF", usage: "Primary text" },
    "muted":   { value: "#A1A1A1", usage: "Secondary, metadata" },
    "accent":  { value: "#E50914", usage: "Netflix red OR Twitch purple (#9146FF)" },
    "rule":    { value: "#2A2A2A", usage: "Subtle border" },
  },

  typography: {
    display: '"Söhne", "Inter Display", "Netflix Sans", sans-serif',
    body:    '"Söhne", "Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "11/12/14/16/20/28/40/60",
    weight:  "display 600-800 · body 400-500",
    tracking: "display tight (-0.02em) · normal body",
  },

  antiPatterns: [
    { name: "Light background",  dont: "use white bg for a streaming UI", why: "Dark mode is the streaming convention — light fights image content" },
    { name: "Vertical thumb grid", dont: "show all 200 titles in one vertical grid", why: "Horizontal rails by category surface variety without overwhelming" },
    { name: "Truncated thumbnails", dont: "crop poster art weirdly", why: "Maintain 2:3 (poster) or 16:9 (preview) ratios — hero art is critical" },
    { name: "Generic hero",       dont: "use a static banner that doesn't change", why: "Hero is the merchandise; rotate, autoplay-trailer, personalize" },
    { name: "No search",          dont: "hide search behind a menu", why: "Search is a top-nav item — users come to find something specific" },
  ],

  responsive: [
    { element: "Hero billboard", mobile: "60vh",  tablet: "70vh",  desktop: "85vh" },
    { element: "Thumb rail",     mobile: "120px", tablet: "160px", desktop: "200px" },
    { element: "Thumbs per view",mobile: "2",     tablet: "4",     desktop: "6-7" },
  ],

  snippets: [
    `/* Hero billboard with gradient fade */
.billboard { position: relative; height: 85vh; background: #0F0F0F; overflow: hidden; }
.billboard img, .billboard video { width: 100%; height: 100%; object-fit: cover; }
.billboard::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(15,15,15,0.7) 70%, #0F0F0F 100%); }
.billboard-meta { position: absolute; bottom: 80px; left: 48px; max-width: 36rem; color: #FFFFFF; z-index: 2; }
.billboard-meta h1 { font-size: 60px; font-weight: 800; line-height: 1.05; letter-spacing: -0.025em; }
.billboard-meta .syn { font-size: 18px; line-height: 1.5; color: #DADADA; margin: 16px 0 24px; }`,
    `/* Thumbnail rail */
.thumb-rail { padding: 24px 48px; }
.thumb-rail h2 { font-size: 20px; font-weight: 600; color: #FFFFFF; margin: 0 0 12px; }
.thumb-scroll { display: flex; gap: 8px; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 8px; }
.thumb-scroll::-webkit-scrollbar { display: none; }
.thumb { flex: 0 0 200px; aspect-ratio: 16/9; border-radius: 4px; overflow: hidden; background: #1A1A1A; scroll-snap-align: start; cursor: pointer; transition: transform 200ms ease; }
.thumb:hover { transform: scale(1.06); z-index: 2; }`,
    `/* Play button on billboard */
.btn-play { display: inline-flex; align-items: center; gap: 8px; background: #FFFFFF; color: #0F0F0F; padding: 10px 24px; border-radius: 4px; font-size: 16px; font-weight: 600; border: 0; cursor: pointer; }
.btn-play::before { content: "▶"; font-size: 16px; }
.btn-info { background: rgba(109,109,110,0.7); color: #FFFFFF; padding: 10px 24px; border-radius: 4px; font-size: 16px; font-weight: 600; border: 0; margin-left: 12px; }`,
  ],

  successLooksLike: [
    "Netflix homepage billboard + thumbnail rails",
    "YouTube subscribed feed with channel rails",
    "Twitch live-streamer thumbnail grid",
  ],

  failureLooksLike: [
    "Static video gallery in a single vertical grid",
    "Light background with low-contrast thumbnail edges",
    "Hero that's a static image with text — no merchandise rotation",
  ],

  tile: "tile-video",
  tileHTML: `
    <div class="bill"><div class="ttl">Dark Crown</div></div>
    <div class="lbl">TRENDING NOW</div>
    <div class="row">
      <div class="t"></div><div class="t"></div><div class="t hl"></div><div class="t"></div>
    </div>
  `,
});

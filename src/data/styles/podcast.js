import { asFullPreset } from "./compact.js";

export const podcast = asFullPreset({
  id: "podcast",
  name: "Podcast Show",
  tag: "Audio · episode · transcript",
  desc: "Hero podcast image. Episode list with audio player. Transcript-prominent. Lex Fridman / Huberman / NPR register.",

  feel: "Landing on a serious podcast's show page to find an old episode — episode-first, transcript searchable, host is the brand — not a generic Spotify-link landing page.",

  references: "lexfridman.com, hubermanlab.com, NPR show pages, Tim Ferriss podcast site, Acquired.fm, Dwarkesh Patel, transcripts.fm",

  boldFactor: [
    "Hero: large host headshot OR show artwork + show name + tagline",
    "Episode card = thumbnail + number + title + guest + length + date + play",
    "Inline audio player at the top of each episode page (sticky on scroll)",
    "Full transcript displayed below the player — searchable, timestamps clickable",
    "Subscribe row: Spotify, Apple Podcasts, YouTube, RSS — visible icons",
    "Featured guest list / 'best of' compilation as nav element",
    "Quote pulls from episodes used as social-shareable cards",
  ],

  tokens: {
    "bg":      { value: "#0F0F0F", usage: "Stage black backdrop" },
    "surface": { value: "#1A1A1A", usage: "Episode card surface" },
    "fg":      { value: "#F5F5F5", usage: "Primary text" },
    "muted":   { value: "#9A9A9A", usage: "Metadata, timestamp" },
    "accent":  { value: "#FF6B35", usage: "Play button orange / show accent" },
    "rule":    { value: "#2A2A2A", usage: "Subtle border" },
  },

  typography: {
    display: '"Söhne", "Inter Display", system-ui',
    body:    '"Söhne", "Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "12/13/14/16/20/28/40/56",
    weight:  "display 600-700 · body 400-500 · mono 400",
    tracking: "display tight (-0.02em) · timestamps tabular",
  },

  antiPatterns: [
    { name: "Sound-cloud embed only", dont: "rely on a single SoundCloud iframe for player", why: "Native player matches the design system + supports transcript sync" },
    { name: "Hidden transcript",   dont: "tuck transcript behind 'show more' fold", why: "Transcript is a primary surface — searchable, scannable, SEO-rich" },
    { name: "Generic stock host photo", dont: "use a smiling Shutterstock host photo", why: "Use a real, considered portrait — the host IS the brand" },
    { name: "Only-latest episode", dont: "feature only the most recent episode", why: "Show 'best of', featured guests, season-organized archive too" },
    { name: "Marketing CTAs",      dont: "scatter 'Subscribe now!!' across the page", why: "One clean subscribe row with platform icons — listeners know what they use" },
  ],

  responsive: [
    { element: "Hero portrait",   mobile: "200px", tablet: "320px", desktop: "400px" },
    { element: "Episode list",    mobile: "1col",  tablet: "1col",  desktop: "1col 720px max" },
    { element: "Player",          mobile: "sticky bottom", tablet: "sticky top", desktop: "sticky top" },
  ],

  snippets: [
    `/* Episode card */
.episode-card { display: grid; grid-template-columns: 80px 1fr auto; gap: 16px; padding: 20px; background: #1A1A1A; border-radius: 12px; align-items: center; }
.episode-card img { width: 80px; height: 80px; border-radius: 8px; object-fit: cover; }
.episode-card .ep { font-family: "JetBrains Mono", monospace; font-size: 11px; color: #9A9A9A; letter-spacing: 0.06em; }
.episode-card h3 { font-size: 18px; font-weight: 600; color: #F5F5F5; margin: 4px 0; line-height: 1.2; }
.episode-card .meta { font-size: 13px; color: #9A9A9A; }
.episode-card .play { width: 48px; height: 48px; border-radius: 50%; background: #FF6B35; color: #FFF; display: grid; place-items: center; cursor: pointer; }`,
    `/* Audio player — sticky top */
.audio-player { position: sticky; top: 0; z-index: 40; background: #0F0F0F; border-bottom: 1px solid #2A2A2A; padding: 12px 24px; display: grid; grid-template-columns: 64px 1fr auto; gap: 16px; align-items: center; }
.audio-progress { height: 4px; background: #2A2A2A; border-radius: 2px; overflow: hidden; grid-column: 1 / -1; }
.audio-progress > i { display: block; height: 100%; width: 23%; background: #FF6B35; }
.audio-time { font-family: "JetBrains Mono", monospace; font-size: 12px; color: #9A9A9A; font-variant-numeric: tabular-nums; }`,
    `/* Transcript with clickable timestamps */
.transcript p { margin: 12px 0; line-height: 1.65; font-size: 16px; color: #F5F5F5; }
.transcript .ts { font-family: "JetBrains Mono", monospace; font-size: 12px; color: #FF6B35; cursor: pointer; margin-right: 8px; font-variant-numeric: tabular-nums; }
.transcript .speaker { font-weight: 600; color: #FFFFFF; margin-right: 6px; }`,
  ],

  successLooksLike: [
    "lexfridman.com episode page with player + transcript",
    "Acquired.fm seasoned episode-index page",
    "Dwarkesh Patel episode page with searchable transcript",
  ],

  failureLooksLike: [
    "Landing page that's just a SoundCloud embed + 'Subscribe on Spotify'",
    "No transcript, no episode list, just the latest episode",
    "Stock host photo + generic CMS sidebar",
  ],

  tile: "tile-podcast",
  tileHTML: `
    <div class="ep">EP #207 · 2h 14m</div>
    <div class="head">Hannah Fry on the math of fairness.</div>
    <div class="row">
      <div class="play">▶</div>
      <div class="bar"><i></i></div>
      <div class="t">12:04 / 2:14:08</div>
    </div>
  `,
});

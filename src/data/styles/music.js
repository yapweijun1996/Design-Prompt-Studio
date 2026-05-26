import { asFullPreset } from "./compact.js";

export const music = asFullPreset({
  id: "music",
  name: "Music Streaming",
  tag: "Album · player · playlist",
  desc: "Dark base + album-art-derived gradient. Persistent player bottom. Spotify / Apple Music / Tidal register.",

  feel: "Opening Spotify to find that one album — sidebar nav + album-grid + bottom player — not a generic catalog site dressed up as music.",

  references: "Spotify, Apple Music, Tidal, YouTube Music, Deezer, SoundCloud (Premium), Bandcamp",

  boldFactor: [
    "Dark base (Spotify #121212 / Apple Music #1A1A1A) with album-art-derived gradient",
    "Persistent player bar at the bottom: art + title + artist + scrubber + controls",
    "Left sidebar: Home, Search, Your Library + playlists list",
    "Main canvas: hero album / playlist with derived-gradient backdrop + track list",
    "Track row: # / title / album / duration — hover reveals play + heart + add",
    "Album / artist / playlist grid cards with square art + name + meta",
    "Now Playing right-rail option showing queue + lyrics",
  ],

  tokens: {
    "bg":       { value: "#121212", usage: "Spotify graphite base" },
    "sidebar":  { value: "#000000", usage: "Sidebar pure black" },
    "surface":  { value: "#181818", usage: "Card surface" },
    "surface-2":{ value: "#282828", usage: "Hover / row alt" },
    "fg":       { value: "#FFFFFF", usage: "Primary text" },
    "muted":    { value: "#B3B3B3", usage: "Secondary text" },
    "brand":    { value: "#1DB954", usage: "Spotify green (or red #FA243C for Apple Music)" },
    "border":   { value: "#2A2A2A", usage: "Subtle border" },
  },

  typography: {
    display: '"Circular", "Söhne", "Inter Display", system-ui',
    body:    '"Circular", "Söhne", "Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "11/12/13/14/16/20/32/56",
    weight:  "display 700-900 · body 400-500 · numbers 500 tabular",
    tracking: "display tight (-0.025em) · timestamps tabular",
  },

  antiPatterns: [
    { name: "Light background",   dont: "use white bg for a music app", why: "Dark is the music-streaming convention; album art reads best on dark" },
    { name: "Missing player",     dont: "omit the persistent bottom player", why: "Player + queue + now-playing IS the genre's defining surface" },
    { name: "Spec-sheet track row", dont: "show tracks with verbose metadata columns", why: "Track row is # / title / album / duration — clean, scannable" },
    { name: "No album art",       dont: "use generic placeholder graphics", why: "Album art IS the visual identity — every card needs the real art" },
    { name: "Static gradient",    dont: "use one fixed brand gradient everywhere", why: "Gradient derived from current album art creates atmospheric continuity" },
  ],

  responsive: [
    { element: "Sidebar",    mobile: "drawer", tablet: "icon",  desktop: "240px" },
    { element: "Album grid", mobile: "2",      tablet: "4",     desktop: "6-7" },
    { element: "Player bar", mobile: "sticky bottom", tablet: "sticky bottom", desktop: "sticky bottom" },
  ],

  snippets: [
    `/* Player bar — sticky bottom */
.player-bar { position: sticky; bottom: 0; display: grid; grid-template-columns: 280px 1fr 280px; gap: 16px; align-items: center; padding: 12px 16px; background: #181818; border-top: 1px solid #2A2A2A; height: 80px; }
.player-now { display: grid; grid-template-columns: 56px 1fr; gap: 12px; align-items: center; }
.player-now img { width: 56px; height: 56px; border-radius: 4px; }
.player-now .ttl { font-size: 14px; color: #FFFFFF; font-weight: 500; }
.player-now .art { font-size: 12px; color: #B3B3B3; }
.player-scrub { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.player-scrub .controls { display: flex; gap: 16px; }
.player-scrub .bar { height: 4px; background: #4A4A4A; border-radius: 2px; width: 100%; overflow: hidden; }
.player-scrub .bar > i { display: block; height: 100%; width: 38%; background: #FFFFFF; }
.player-scrub .bar:hover > i { background: #1DB954; }`,
    `/* Album hero with derived gradient */
.album-hero { background: linear-gradient(180deg, #B85728 0%, #121212 100%); padding: 80px 32px 24px; color: #FFFFFF; }
.album-hero .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; }
.album-hero h1 { font-family: "Circular", system-ui; font-weight: 900; font-size: 80px; line-height: 0.95; letter-spacing: -0.03em; margin: 8px 0; }
.album-hero .meta { font-size: 14px; color: rgba(255,255,255,0.8); }`,
    `/* Track row */
.track-row { display: grid; grid-template-columns: 40px 1fr 1fr 80px; gap: 16px; padding: 8px 16px; border-radius: 4px; align-items: center; }
.track-row:hover { background: #282828; }
.track-row .num { color: #B3B3B3; font-size: 14px; font-variant-numeric: tabular-nums; text-align: right; }
.track-row .ttl { color: #FFFFFF; font-size: 14px; }
.track-row .alb { color: #B3B3B3; font-size: 14px; }
.track-row .dur { color: #B3B3B3; font-size: 14px; font-variant-numeric: tabular-nums; text-align: right; }`,
  ],

  successLooksLike: [
    "Spotify Now Playing + queue + sidebar",
    "Apple Music album hero with derived gradient",
    "Tidal artist page with discography grid",
  ],

  failureLooksLike: [
    "Light-mode music app",
    "Music site without a persistent player",
    "Album cards with placeholder graphics instead of art",
  ],

  tile: "tile-music",
  tileHTML: `
    <div class="hero"><div class="ttl">After Hours</div><div class="ar">The Weeknd · 14 songs</div></div>
    <div class="tracks">
      <div class="tr">1 &nbsp; Alone Again &nbsp; <span>4:10</span></div>
      <div class="tr">2 &nbsp; Too Late &nbsp; <span>3:59</span></div>
    </div>
    <div class="play">▶ ◼ ▶▶ &nbsp; <i></i> &nbsp; 1:24 / 4:10</div>
  `,
});

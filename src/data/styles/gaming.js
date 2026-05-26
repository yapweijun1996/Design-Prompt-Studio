import { asFullPreset } from "./compact.js";

export const gaming = asFullPreset({
  id: "gaming",
  name: "Gaming / Esports",
  tag: "Dark · neon · kinetic",
  desc: "Dark base + electric neon. Game cinematics. Stats and leaderboards. Riot / Valorant / Steam / esports register.",

  feel: "Logging into Valorant's launcher / official site — dark, kinetic, the game's identity bleeds through every pixel — not a SaaS landing in gamer clothing.",

  references: "playvalorant.com, leagueoflegends.com, store.steampowered.com, fortnite.com, callofduty.com, epicgames.com, ea.com",

  boldFactor: [
    "Dark base (#0D1117 / #14171F) with electric neon accent (cyan, magenta, lime)",
    "Cinematic hero video / animated background — never static",
    "Custom display font (often bespoke or display sans like Druk, Tungsten, Beba)",
    "Character / hero / weapon showcase grid with hover-cinematic",
    "Leaderboards + match stats with mono numbers, rank badges",
    "Patch notes / season-update strip — live ops culture surface",
    "Download / Play CTA with download size + platform icons (Steam, Epic, PSN, Xbox)",
  ],

  tokens: {
    "bg":      { value: "#0D1117", usage: "Page graphite" },
    "surface": { value: "#161B22", usage: "Card surface" },
    "fg":      { value: "#F0F6FC", usage: "Primary text" },
    "muted":   { value: "#7D8590", usage: "Secondary" },
    "neon":    { value: "#00FFE0", usage: "Cyan neon — primary accent" },
    "magenta": { value: "#FF2D9F", usage: "Magenta — secondary accent" },
    "danger":  { value: "#FF5757", usage: "Damage / loss red" },
    "border":  { value: "#30363D", usage: "Subtle border" },
  },

  typography: {
    display: '"Druk Wide", "Tungsten", "Bebas Neue", "Anton", sans-serif',
    body:    '"Inter", "Söhne", system-ui, sans-serif',
    mono:    '"JetBrains Mono", "Fira Code", monospace',
    scale:   "11/12/14/16/20/32/56/96",
    weight:  "display 700-900 · body 400-500 · stats mono",
    tracking: "display tight (-0.02em) or wide (0.08em) for esports labels",
  },

  antiPatterns: [
    { name: "Light background",   dont: "use white bg for a game site", why: "Dark is the gaming register; light reads as enterprise" },
    { name: "Static hero",        dont: "use a still image for the hero", why: "Cinematic video / animated bg matches the medium" },
    { name: "Stock fonts only",   dont: "use Inter as the display font", why: "Bespoke / display fonts (Druk, Tungsten) IS the identity" },
    { name: "Marketing voice",    dont: "write 'Boost your productivity'", why: "Voice: 'Lock in.' / 'Defy fate.' / 'No mercy.' — declarative, dramatic" },
    { name: "Hidden Play CTA",    dont: "bury the download / play action", why: "PLAY / DOWNLOAD must be top-right + repeated in hero — primary path" },
  ],

  responsive: [
    { element: "Hero display",   mobile: "56px",  tablet: "80px",  desktop: "96px" },
    { element: "Section padding", mobile: "32px",  tablet: "64px",  desktop: "96px" },
    { element: "Hero video",     mobile: "70vh",  tablet: "85vh",  desktop: "100vh" },
  ],

  snippets: [
    `/* Cinematic hero */
.game-hero { position: relative; height: 100vh; overflow: hidden; background: #0D1117; }
.game-hero video { width: 100%; height: 100%; object-fit: cover; }
.game-hero::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 30%, rgba(13,17,23,0.85) 100%); }
.game-hero h1 { position: absolute; bottom: 96px; left: 64px; font-family: "Druk Wide", "Tungsten", sans-serif; font-weight: 800; font-size: 96px; line-height: 0.9; letter-spacing: -0.01em; color: #F0F6FC; text-transform: uppercase; z-index: 2; }`,
    `/* Neon CTA */
.btn-play {
  background: #00FFE0; color: #0D1117; padding: 16px 40px;
  font-family: "Druk Wide", sans-serif; font-weight: 800; font-size: 16px;
  letter-spacing: 0.1em; text-transform: uppercase;
  border: 0; cursor: pointer;
  clip-path: polygon(8% 0, 100% 0, 92% 100%, 0 100%);
  box-shadow: 0 0 40px rgba(0,255,224,0.5);
}
.btn-play:hover { background: #00DCC2; box-shadow: 0 0 60px rgba(0,255,224,0.7); }`,
    `/* Leaderboard row */
.lb-row { display: grid; grid-template-columns: 32px 1fr auto auto; gap: 12px; padding: 8px 16px; background: #161B22; border-left: 2px solid transparent; font-family: "JetBrains Mono", monospace; font-size: 14px; color: #F0F6FC; }
.lb-row .rank { color: #7D8590; font-weight: 700; font-variant-numeric: tabular-nums; }
.lb-row .name { color: #F0F6FC; }
.lb-row .kd   { color: #00FFE0; font-variant-numeric: tabular-nums; }
.lb-row .pts  { color: #F0F6FC; font-weight: 700; font-variant-numeric: tabular-nums; }
.lb-row.top  { border-left-color: #00FFE0; background: linear-gradient(90deg, rgba(0,255,224,0.06), transparent); }`,
  ],

  successLooksLike: [
    "playvalorant.com agent showcase + cinematic hero",
    "Steam store front game page",
    "Riot esports tournament page with leaderboards",
  ],

  failureLooksLike: [
    "SaaS-style light landing with 'Play our game'",
    "Static stock screenshot as the hero",
    "Inter for the title display font",
  ],

  tile: "tile-gaming",
  tileHTML: `
    <div class="bg"></div>
    <div class="word">DEFY<br/>FATE</div>
    <div class="meta">SEASON 7 · NOW LIVE</div>
    <div class="btn">▶ PLAY FREE</div>
  `,
});

import { asFullPreset } from "./compact.js";

export const cinema = asFullPreset({
  id: "cinema",
  name: "Cinema Title Cards",
  tag: "Letterbox · serif · credit",
  desc: "A24 / Wes Anderson title-card aesthetic. Letterbox bars. Centered serif type. Cinema-credit lower-thirds register.",

  feel: "Watching the opening title card of an A24 film — letterboxed frame, centered serif title, lower-third credit, slow fade — not a generic movie-fan site cosplaying as cinema.",

  references: "A24 film title cards (Moonlight, Ladybird, Past Lives), Wes Anderson opening sequences (Grand Budapest, French Dispatch), Saul Bass title sequences, Pablo Ferro (Bullitt, Dr. Strangelove), Kyle Cooper (Seven)",

  boldFactor: [
    "Letterbox: black bars top + bottom, content in 2.35:1 cinematic frame",
    "Centered display serif (Caslon, Bodoni, Optima) for title cards",
    "Lower-third credit: 'A Film By…' / 'Music by…' / 'A Production of…' typography",
    "Restrained palette: black + cream + ONE film-grade color accent",
    "Slow cinematic transitions: 800-1200ms fades, no bouncy springs",
    "Mono caption: timecode, scene number, frame coordinates (A24 documentary touch)",
    "Frame grain + subtle vignette for film texture",
  ],

  tokens: {
    "bg":      { value: "#0D0B08", usage: "Cinematic black" },
    "bar":     { value: "#000000", usage: "Letterbox bar pure black" },
    "fg":      { value: "#EFE7D8", usage: "Cream cinema text" },
    "muted":   { value: "#8A8170", usage: "Caption muted" },
    "accent":  { value: "#C9A24B", usage: "Film grain gold (or burnt red #B73E3E)" },
    "rule":    { value: "#3A352D", usage: "Subtle line" },
  },

  typography: {
    display: '"Caslon", "Bodoni Moda", "Optima", "Cinzel", serif',
    body:    '"Caslon", "Source Serif 4", "Tiempos Text", Georgia, serif',
    mono:    '"Söhne Mono", "JetBrains Mono", monospace',
    scale:   "10/12/14/16/22/36/56/96",
    weight:  "display 300-500 · body 400 · italic for credit accents",
    tracking: "display open (0.05-0.15em) · mono normal",
  },

  antiPatterns: [
    { name: "No letterbox",       dont: "use full-bleed without bars", why: "Letterbox bars (2.35:1) ARE the cinematic frame signal" },
    { name: "Loud transitions",  dont: "use bouncy springs / fast slides", why: "Cinema = slow 800-1200ms fades; bouncy reads as web animation" },
    { name: "Sans-serif title",  dont: "use Inter for title cards", why: "Display serif (Caslon, Bodoni, Optima) is the cinema typography" },
    { name: "Multiple accents",  dont: "use 3+ color accents", why: "One film-grade accent (grain gold, burnt red, deep teal) — pick one" },
    { name: "Stock movie reel",  dont: "use generic 'film reel' clipart", why: "Actual still frames + typography handles the cinema feel" },
  ],

  responsive: [
    { element: "Letterbox bar",   mobile: "40px",  tablet: "64px",  desktop: "96px" },
    { element: "Display serif",   mobile: "44px",  tablet: "72px",  desktop: "96px" },
    { element: "Frame aspect",    mobile: "21:9 forced", tablet: "21:9 forced", desktop: "2.35:1 forced" },
  ],

  snippets: [
    `/* Letterboxed cinematic frame */
.cinema-frame { background: #000000; padding: 96px 0; min-height: 100vh; display: grid; place-items: center; }
.cinema-inner { background: #0D0B08; aspect-ratio: 2.35/1; width: 100%; max-width: 1400px; position: relative; overflow: hidden; }
.cinema-inner::after { content: ""; position: absolute; inset: 0; box-shadow: inset 0 0 120px rgba(0,0,0,0.6); pointer-events: none; }`,
    `/* Title card */
.cinema-title { position: absolute; inset: 0; display: grid; place-items: center; text-align: center; color: #EFE7D8; }
.cinema-title h1 { font-family: "Caslon", "Bodoni Moda", serif; font-weight: 400; font-size: 96px; letter-spacing: 0.12em; text-transform: uppercase; margin: 0; }
.cinema-title .by { font-family: "Caslon", serif; font-style: italic; font-size: 18px; letter-spacing: 0.04em; color: #C9A24B; margin-top: 24px; }
.cinema-title .tc { position: absolute; bottom: 24px; left: 24px; font-family: "Söhne Mono", monospace; font-size: 11px; letter-spacing: 0.06em; color: #8A8170; font-variant-numeric: tabular-nums; }`,
    `/* Film grain overlay */
.cinema-grain::after {
  content: "";
  position: absolute; inset: 0;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.9"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.12 0"/></filter><rect width="200" height="200" filter="url(%23g)"/></svg>');
  pointer-events: none; mix-blend-mode: overlay;
}`,
  ],

  successLooksLike: [
    "A24 'Past Lives' opening title card",
    "Wes Anderson 'Grand Budapest Hotel' title sequence",
    "Saul Bass 'Vertigo' opener",
  ],

  failureLooksLike: [
    "Generic movie-website hero with no letterbox or serif",
    "Bouncy spring transitions on a 'cinematic' page",
    "Stock film-reel clipart as decoration",
  ],

  tile: "tile-cinema",
  tileHTML: `
    <div class="bar t"></div>
    <div class="frame">
      <div class="title">PAST&nbsp;&nbsp;LIVES</div>
      <div class="by">— a film by celine song —</div>
      <div class="tc">SCENE 04 · 00:02:14:08</div>
    </div>
    <div class="bar b"></div>
  `,
});

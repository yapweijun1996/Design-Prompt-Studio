import { asFullPreset } from "./compact.js";

export const japanese = asFullPreset({
  id: "japanese",
  name: "Japanese Brand",
  tag: "Ma · restrained · grid",
  desc: "Generous ma (negative space). Subtle palette. Vertical kana accents. MUJI / Uniqlo / Kinfolk-Japan / Japanese editorial register.",

  feel: "Walking through a MUJI store on a Tuesday afternoon in Ginza — silent, considered, every product framed in deliberate emptiness — not a Western brand cosplaying as Japanese.",

  references: "muji.com, uniqlo.com (JP), Kinokuniya, Japan Living, monocle.com (Tokyo bureau), Tsutaya T-Site, 21_21 Design Sight, Issey Miyake, Honda annual reports",

  boldFactor: [
    "Ma (間) — abundant negative space; 'silence is part of the design'",
    "Restrained palette: bone white, off-black, one quiet accent (indigo, deep red, kraft brown)",
    "Mixed Latin sans + Japanese typography (Noto Sans JP, Hiragino, M PLUS) cohabit naturally",
    "Vertical kana / kanji used as small typographic accents (left edge, captions)",
    "Mixed-grid layouts: tatami-mat proportions, varied module sizes",
    "Editorial product photography: single object, soft natural light, paper backdrop",
    "Subtitles bilingual: English headline + small JP subhead (or vice versa)",
  ],

  tokens: {
    "bg":      { value: "#FAF8F2", usage: "Washi paper warm white" },
    "bg-alt":  { value: "#F1ECE0", usage: "Kraft section alt" },
    "fg":      { value: "#1A1A1A", usage: "Sumi ink near-black" },
    "muted":   { value: "#6B6B6B", usage: "Caption sumi-grey" },
    "accent":  { value: "#1E3A5F", usage: "Aizome indigo — used sparingly" },
    "deep":    { value: "#A0322D", usage: "Vermillion red accent (alternative)" },
    "rule":    { value: "#D7D2C3", usage: "Hairline rule" },
  },

  typography: {
    display: '"Noto Sans JP", "Hiragino Sans", "Yu Gothic", "Inter", system-ui',
    body:    '"Noto Sans JP", "Hiragino Sans", "Yu Gothic", "Inter", system-ui, sans-serif',
    mono:    '"M PLUS 1 Code", "JetBrains Mono", monospace',
    scale:   "10/11/12/14/16/22/32/48",
    weight:  "display 300-400 · body 300-400 · light is the register",
    tracking: "display loose for JP (0.1-0.2em) · Latin normal · vertical writing for kana accents",
  },

  antiPatterns: [
    { name: "Marketing density",   dont: "fill the canvas with product cards", why: "Ma (negative space) IS the design — emptiness signals quality" },
    { name: "Aggressive CTAs",     dont: "use bold 'SHOP NOW' buttons", why: "Voice: 'View collection' / 'About this object' — quiet" },
    { name: "Bright saturation",   dont: "use vibrant brand color schemes", why: "Restrained palette of bone + ink + one quiet accent is the register" },
    { name: "Heavy display weight", dont: "use 700-900 display weights", why: "Japanese editorial leans light (300-400) — heavy reads as Western marketing" },
    { name: "Latin-only",          dont: "omit any Japanese typography", why: "Even a small kana / kanji accent grounds the design culturally" },
  ],

  responsive: [
    { element: "Section padding", mobile: "32px",  tablet: "80px",  desktop: "128px" },
    { element: "Hero serif",      mobile: "28px",  tablet: "40px",  desktop: "48px" },
    { element: "Whitespace ratio", mobile: "50%",  tablet: "60%",   desktop: "65%" },
  ],

  snippets: [
    `/* Vertical kana accent in left margin */
.kana-vertical {
  writing-mode: vertical-rl;
  font-family: "Noto Sans JP", "Hiragino Sans", sans-serif;
  font-weight: 300;
  font-size: 11px;
  letter-spacing: 0.4em;
  color: #6B6B6B;
  position: absolute;
  left: 24px;
  top: 24px;
  text-orientation: mixed;
}`,
    `/* Bilingual heading stack */
.headline-jp { font-family: "Noto Sans JP", "Hiragino Sans", sans-serif; font-weight: 300; font-size: 11px; letter-spacing: 0.3em; color: #6B6B6B; margin-bottom: 8px; }
.headline-en { font-family: "Inter", "Noto Sans JP", system-ui; font-weight: 300; font-size: 48px; line-height: 1.15; letter-spacing: -0.005em; color: #1A1A1A; }`,
    `/* Object-on-paper product photo */
.muji-product { background: #FAF8F2; padding: 64px 24px; text-align: center; }
.muji-product img { max-width: 320px; width: 100%; height: auto; mix-blend-mode: multiply; }
.muji-product .caption { font-family: "Noto Sans JP", sans-serif; font-weight: 300; font-size: 13px; letter-spacing: 0.08em; color: #6B6B6B; margin-top: 16px; }
.muji-product .price { font-family: "Inter", sans-serif; font-weight: 400; font-size: 16px; color: #1A1A1A; margin-top: 4px; font-variant-numeric: tabular-nums; }`,
  ],

  successLooksLike: [
    "muji.com product page — single object, paper backdrop, kraft tone",
    "21_21 Design Sight exhibition landing",
    "Monocle Tokyo guide article page",
  ],

  failureLooksLike: [
    "Western brand with one cherry-blossom illustration as 'Japanese'",
    "Dense product grid + bold yellow CTAs",
    "Latin-only with no kana / kanji typography anywhere",
  ],

  overrideGlobalRules: [
    "Mixed-script typography (Latin + Japanese) is the cultural register — overrides any 'single font family' guidance.",
    "Light weights (300-400) are the editorial standard — overrides any 'use 600+ for display' guidance.",
  ],

  tile: "tile-japanese",
  tileHTML: `
    <div class="ka">無印・良品</div>
    <div class="word">A simple<br/>shirt.</div>
    <div class="sub">良品計画 · MUJI</div>
    <div class="pr">¥ 2,900</div>
  `,
});

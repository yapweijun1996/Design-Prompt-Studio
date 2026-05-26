// Style preset: Newspaper Masthead — broadsheet print, dense columns, slab serifs.

import { asFullPreset } from "./compact.js";

export const newspaper = asFullPreset({
  id: "newspaper",
  name: "Newspaper Masthead",
  tag: "Broadsheet · slab · dense",
  desc: "Print broadsheet feel. Slab serif masthead. Multi-column reading. Page-number signposts. Black + warm ivory.",

  feel: "Opening a Sunday New York Times — not browsing a 'news' aggregator.",

  references: "The New York Times print edition, The Guardian Weekend, Le Monde, Frankfurter Allgemeine Zeitung, The Wall Street Journal print, Süddeutsche Zeitung",

  boldFactor: [
    "Slab-serif masthead (Tiempos Headline, Lyon, Knockout) at 200pt+",
    "Multi-column body text (2-4 columns depending on width)",
    "Warm ivory bg (#F7F2E8) — not cream, not white",
    "Drop caps on first paragraph of every long-form section",
    "Byline + dateline in small caps with 0.15em tracking",
    "Article rules: 1px horizontal between articles, 0.5px verticals between columns",
    "Page-number-style section markers (e.g. 'A12' or 'B3' in margins)",
  ],

  tokens: {
    "bg":          { value: "#F7F2E8", usage: "Warm ivory page" },
    "fg":          { value: "#1A1A1A", usage: "Ink black (NOT pure #000)" },
    "muted-fg":    { value: "#555555", usage: "Captions, bylines" },
    "rule":        { value: "rgba(26,26,26,0.4)", usage: "Hairline column dividers" },
    "accent":      { value: "#9B1B30", usage: "Single accent — masthead rule color (deep red)" },
  },

  typography: {
    display: '"Tiempos Headline", "Lyon Display", "Times New Roman", serif',
    body:    '"Lyon Text", "Times", "Times New Roman", serif',
    mono:    '"Lyon Mono", "JetBrains Mono", monospace',
    scale:   "10/13/16/22/32/48/72/120/180/250",
    weight:  "700-900 masthead · 400 body · 600 subhead",
    tracking: "masthead -0.01em · body normal · small caps 0.15em uppercase",
  },

  antiPatterns: [
    { name: "Sans-serif body", dont: "use Inter / Helvetica for body text",       why: "Readerly serif body IS the newspaper feel — sans body breaks the print metaphor" },
    { name: "Pure white bg",   dont: "use #FFFFFF",                              why: "Warm ivory mimics paper; pure white reads as digital screen" },
    { name: "Single column",   dont: "use a 700px single column for body text", why: "Multi-column reading IS the broadsheet experience" },
    { name: "Modern minimalist hero", dont: "use 8xl single-word display",      why: "Masthead is heavy serif at extreme scale — minimalist display breaks the genre" },
    { name: "Many accent colors", dont: "use 2+ accents",                       why: "Newspapers use ONE color editorial (red or muted), everything else is ink and paper" },
  ],

  responsive: [
    { element: "Body columns",  mobile: "1 col",    tablet: "2 cols", desktop: "3 cols" },
    { element: "Masthead size", mobile: "80px",     tablet: "140px",  desktop: "220px" },
    { element: "Section padding", mobile: "40px",   tablet: "64px",   desktop: "96px" },
    { element: "Body text",     mobile: "16px",     tablet: "17px",   desktop: "18px" },
  ],

  snippets: [
    `/* Masthead — heavy serif at extreme scale */
.masthead {
  font-family: "Tiempos Headline", serif;
  font-weight: 900;
  font-size: clamp(80px, 18vw, 240px);
  line-height: 0.85;
  letter-spacing: -0.02em;
  text-align: center;
  padding: 24px 0 16px;
  border-bottom: 4px double #1A1A1A;
}`,
    `/* Multi-column body */
.article-body {
  column-count: 3;
  column-gap: 32px;
  column-rule: 0.5px solid rgba(26,26,26,0.3);
  font-family: "Lyon Text", serif;
  font-size: 18px;
  line-height: 1.55;
}`,
    `/* Drop cap */
.article-body > p:first-of-type::first-letter {
  font-family: "Tiempos Headline", serif;
  font-weight: 700;
  font-size: 5.5em;
  line-height: 0.9;
  float: left;
  padding: 4px 8px 0 0;
}`,
    `/* Byline */
.byline {
  font-family: "Lyon Text", serif;
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #555;
  margin-bottom: 24px;
}`,
  ],

  successLooksLike: [
    "The front page of The New York Times Sunday edition",
    "A Le Monde investigative spread",
    "The op-ed page of The Guardian",
    "A Sunday magazine cover",
  ],

  failureLooksLike: [
    "A blog with a slightly fancier font",
    "Pure white background",
    "Single 700px reading column",
    "Sans-serif body text",
    "More than one accent color",
  ],

  overrideGlobalRules: [
    "Slab serif display fonts (Tiempos Headline, Lyon) are REQUIRED — overrides global 'avoid overused fonts' rule.",
  ],

  tile: "tile-newspaper",
  tileHTML: `
    <div class="rule top"></div>
    <div class="masthead">Tribune</div>
    <div class="meta">VOL XII · No. 314 · ESTABLISHED 1923</div>
    <div class="rule bot"></div>
    <div class="cols"><span></span><span></span><span></span></div>
  `,
});

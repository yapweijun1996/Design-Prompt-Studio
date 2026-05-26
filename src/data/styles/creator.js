import { asFullPreset } from "./compact.js";

export const creator = asFullPreset({
  id: "creator",
  name: "Creator Personal",
  tag: "Newsletter · serif · text-first",
  desc: "Text-first reading. Author name as the brand. Substack / Patrick Collison / Paul Graham register.",

  feel: "Reading Paul Graham's essays on a laptop with no distractions — text dominates, the author is the brand — not a corporate blog dressed up as personal.",

  references: "paulgraham.com, patrickcollison.com, danluu.com, gwern.net, stratechery.com, Substack writer pages, Ben Thompson, Anil Dash",

  boldFactor: [
    "Text is 90% of the page — no hero image, no carousel, no widget",
    "Author name + photo + bio in a small sticky sidebar OR header",
    "Subscribe / RSS / email CTAs minimally present — never modal-popup",
    "Long-form serif body (Charter / Source Serif / Tiempos Text) at 18-20px",
    "Footnotes inline or end-of-article (Tufte-style sidenotes welcomed)",
    "Date-stamped, archive-organized: 'Essays · By year' index",
    "Personal voice: first-person, opinions, recurring themes",
  ],

  tokens: {
    "bg":      { value: "#FFFFFF", usage: "Paper white (or warm #FAF8F1)" },
    "fg":      { value: "#1A1A1A", usage: "Body ink" },
    "muted":   { value: "#666666", usage: "Date, byline, caption" },
    "accent":  { value: "#A52A2A", usage: "Link red (Paul Graham aesthetic) OR navy" },
    "rule":    { value: "#E5E5E5", usage: "Section divider" },
  },

  typography: {
    display: '"Charter", "Source Serif 4", "Tiempos Text", Georgia, serif',
    body:    '"Charter", "Source Serif 4", Georgia, serif',
    mono:    '"JetBrains Mono", "Menlo", monospace',
    scale:   "12/14/16/18/20/28/36/44",
    weight:  "display 500-600 · body 400 · italic for emphasis",
    tracking: "normal · open enough to read long-form",
  },

  antiPatterns: [
    { name: "Hero image",       dont: "open with a stock hero photograph", why: "Text is the brand; image-led hero reads as corporate blog" },
    { name: "Email-capture modal", dont: "popup for newsletter signup", why: "Aggressive; inline CTA after first paragraph or in footer" },
    { name: "Sans body",        dont: "use Inter for paragraph reading", why: "Long-form serif at 18-20px is the personal-essay register" },
    { name: "Multiple voices",  dont: "publish guest posts without strong byline", why: "Personal brand = single author voice; guests must stand out clearly" },
    { name: "Algorithmic feed", dont: "show 'related posts you might like' grid", why: "Chronological archive + topic tag is enough; recommendation engine kills the small-web feel" },
  ],

  responsive: [
    { element: "Article measure", mobile: "100%",  tablet: "62ch",  desktop: "68ch" },
    { element: "Body type",       mobile: "17px",  tablet: "19px",  desktop: "20px" },
    { element: "Section padding", mobile: "32px",  tablet: "64px",  desktop: "96px" },
  ],

  snippets: [
    `/* Long-form article */
.essay { max-width: 68ch; margin: 0 auto; padding: 64px 24px; font-family: "Charter", Georgia, serif; font-size: 20px; line-height: 1.55; color: #1A1A1A; }
.essay h1 { font-size: 36px; font-weight: 600; line-height: 1.15; margin: 0 0 8px; }
.essay .date { font-size: 14px; color: #666; margin-bottom: 32px; }
.essay p { margin: 1.2em 0; }
.essay a { color: #A52A2A; text-decoration: underline; text-underline-offset: 0.15em; text-decoration-thickness: 1px; }`,
    `/* Sidenote / footnote — Tufte style */
.sidenote { float: right; clear: right; width: 200px; margin: 0 -240px 1em 24px; font-size: 14px; line-height: 1.4; color: #666; font-style: italic; }
@media (max-width: 1024px) {
  .sidenote { float: none; width: 100%; margin: 16px 0; padding: 12px; border-left: 2px solid #E5E5E5; background: #FAFAFA; }
}`,
    `/* Archive list */
.archive { list-style: none; padding: 0; }
.archive li { display: grid; grid-template-columns: 90px 1fr; gap: 16px; padding: 6px 0; border-bottom: 1px dotted #E5E5E5; }
.archive .date { color: #666; font-size: 14px; font-variant-numeric: tabular-nums; }
.archive a { color: #1A1A1A; text-decoration: none; }`,
  ],

  successLooksLike: [
    "paulgraham.com essay page",
    "danluu.com performance post",
    "Substack newsletter landing with author + essays + subscribe",
  ],

  failureLooksLike: [
    "WordPress personal blog with sidebar widgets + ads",
    "Hero image of laptop on a personal essay",
    "Email-capture modal blocking the article",
  ],

  tile: "tile-creator",
  tileHTML: `
    <div class="date">May 26, 2026</div>
    <div class="head">What I'm thinking about now.</div>
    <div class="body">A short essay on the curious habit of writing on the internet, and why it still matters in 2026.</div>
    <div class="sub">— P. Graham · subscribe →</div>
  `,
});

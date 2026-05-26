import { asFullPreset } from "./compact.js";

export const consulting = asFullPreset({
  id: "consulting",
  name: "Consulting Firm",
  tag: "Academic · serif · red-black",
  desc: "Crimson + ink black. Scholarly serif. Pyramid principle layouts. McKinsey / BCG / HBR register.",

  feel: "Reading a McKinsey Quarterly cover story — measured, evidence-led, definitively a thought-leadership artifact — not a tech blog with serif headlines.",

  references: "McKinsey.com, BCG Henderson Institute, Bain Insights, Harvard Business Review, Foreign Affairs, MIT Sloan Management Review, The Economist",

  boldFactor: [
    "Crimson red #B5302C as the single bold accent — used 1-2x per article",
    "Scholarly serif (Sentinel, Tiempos, Source Serif) for body AND display",
    "Footnote-style numbered references, end-of-article",
    "Charts: minimal, grayscale + one red accent line — never rainbow",
    "Three-column desktop layout with editorial sidebar",
    "Article-first IA: byline, read-time, section anchors",
    "Pyramid Principle: insight → key points → support",
  ],

  tokens: {
    "bg":      { value: "#FFFFFF", usage: "Paper white" },
    "fg":      { value: "#1A1A1A", usage: "Ink black for body" },
    "muted":   { value: "#5A5A5A", usage: "Captions, byline" },
    "accent":  { value: "#B5302C", usage: "Crimson — used sparingly" },
    "rule":    { value: "#CFCFCF", usage: "Hairline dividers" },
    "highlight": { value: "#FBF6E6", usage: "Pull-quote background" },
  },

  typography: {
    display: '"Tiempos Headline", "Source Serif 4", Georgia, serif',
    body:    '"Tiempos Text", "Source Serif 4", Georgia, serif',
    mono:    '"IBM Plex Mono", monospace',
    scale:   "12/14/16/18/22/28/40/56",
    weight:  "display 400-500 · body 400 · italic for emphasis",
    tracking: "display tight (-0.01em) · body normal · drop caps on lead",
  },

  antiPatterns: [
    { name: "Sans body",         dont: "use Inter for paragraph text", why: "Serif body IS the editorial authority signal" },
    { name: "Rainbow charts",    dont: "use 6+ colors in a data viz", why: "Greyscale + one red = consulting chart vocabulary" },
    { name: "Marketing CTA",     dont: "use 'Start free trial' style buttons", why: "Inline text links + 'Download the report' is the register" },
    { name: "Hero gradient",     dont: "use vibrant gradient hero", why: "Article-first hero = headline + byline + read-time, no gradient" },
    { name: "Casual voice",      dont: "use 'we've all been there' opener", why: "Authoritative voice: 'Our research finds…' / 'The data suggest…'" },
  ],

  responsive: [
    { element: "Section padding", mobile: "32px",  tablet: "64px",  desktop: "96px" },
    { element: "Hero serif",      mobile: "36px",  tablet: "48px",  desktop: "56px" },
    { element: "Article measure", mobile: "100%",  tablet: "65ch",  desktop: "68ch" },
  ],

  snippets: [
    `/* Drop cap */
.article p:first-of-type::first-letter {
  font-family: "Tiempos Headline", Georgia, serif;
  font-size: 72px; line-height: 0.85;
  float: left; padding: 6px 8px 0 0; color: #B5302C;
}`,
    `/* Pull quote with crimson rule */
.pull-quote {
  font-family: "Tiempos Headline", Georgia, serif;
  font-size: 28px; line-height: 1.3; max-width: 28ch;
  margin: 32px 0; padding: 16px 24px;
  background: #FBF6E6; border-left: 3px solid #B5302C;
}`,
    `/* Numbered footnote */
.footnote-ref { font-size: 0.7em; vertical-align: super; color: #B5302C; text-decoration: none; margin-left: 1px; }
.footnotes { border-top: 1px solid #CFCFCF; padding-top: 24px; font-size: 14px; color: #5A5A5A; }`,
  ],

  successLooksLike: [
    "An HBR feature article page",
    "A McKinsey Quarterly cover story",
    "A BCG Henderson Institute long-read",
  ],

  failureLooksLike: [
    "A blog post template with a serif headline added on",
    "Rainbow chart on an executive summary",
    "'Start free trial' CTA in the hero",
  ],

  tile: "tile-consulting",
  tileHTML: `
    <div class="eyebrow">FEATURE · STRATEGY</div>
    <div class="word">The next<br/>frontier.</div>
    <div class="byline">By J. Müller &nbsp;·&nbsp; 12 min read</div>
    <div class="rule"></div>
  `,
});

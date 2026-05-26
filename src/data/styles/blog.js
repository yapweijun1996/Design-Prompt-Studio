import { asFullPreset } from "./compact.js";

export const blog = asFullPreset({
  id: "blog",
  name: "Modern Blog",
  tag: "Reading · serif · prose",
  desc: "Reading-first blog layout. Serif body. Article + author + tags. Ghost / Medium / dev.to register.",

  feel: "Reading a well-designed Ghost blog post on a Sunday morning — comfortable measure, generous line-height, the prose comes first — not a CMS with widgets fighting for attention.",

  references: "Ghost themes (Casper, Edition), Medium, dev.to (typography mode), Robin Sloan's blog, Hey World, Bear Blog, mataroa, scribbles.page",

  boldFactor: [
    "Reading-comfortable body: 18-20px, 1.6-1.7 line-height, 64-72ch measure",
    "Serif body OR very-readable sans (Inter Display, Söhne, Charter)",
    "Article header: title + subtitle + author avatar + date + read-time",
    "Inline images: full-width or content-width with caption (italic, muted)",
    "Code blocks: syntax-highlighted, mono, soft background, copy button",
    "Topic tags as small pills at the article end, NOT in the header",
    "Comments / responses kept simple and at the bottom — no algorithmic ranking",
  ],

  tokens: {
    "bg":      { value: "#FFFFFF", usage: "Page white" },
    "bg-soft": { value: "#FAFAF7", usage: "Code block / pull quote bg" },
    "fg":      { value: "#1A1A1A", usage: "Body ink" },
    "muted":   { value: "#6B6B6B", usage: "Caption, byline, tag" },
    "accent":  { value: "#1E88E5", usage: "Link blue" },
    "rule":    { value: "#E5E5E5", usage: "Section divider" },
  },

  typography: {
    display: '"Inter Display", "Söhne", "Tiempos Headline", system-ui',
    body:    '"Source Serif 4", "Charter", "Georgia", serif',
    mono:    '"JetBrains Mono", "Menlo", monospace',
    scale:   "12/14/16/18/20/24/32/44",
    weight:  "display 600-700 · body 400 · italic for captions",
    tracking: "display tight (-0.015em) · body normal",
  },

  antiPatterns: [
    { name: "Sidebar widgets",  dont: "show 'recent posts / archive / tag cloud / ad'", why: "Modern blog reading is single-column; widgets steal attention" },
    { name: "Cookie / signup modal", dont: "block reading with popup", why: "Inline subscribe at end of article is enough; modal kills the flow" },
    { name: "Short measure",    dont: "constrain text to 40ch", why: "Reading lines are too short = jarring; 64-72ch is the sweet spot" },
    { name: "All-caps headers",  dont: "USE ALL CAPS FOR H2", why: "Sentence-case headings read more naturally for prose" },
    { name: "Author bio walls", dont: "show 400-word author bio above article", why: "Small byline + small bio at the end; the post is the focus" },
  ],

  responsive: [
    { element: "Article measure", mobile: "100%",  tablet: "64ch",  desktop: "72ch" },
    { element: "Body type",       mobile: "17px",  tablet: "19px",  desktop: "20px" },
    { element: "Section padding", mobile: "32px",  tablet: "64px",  desktop: "96px" },
  ],

  snippets: [
    `/* Article body */
.article { max-width: 72ch; margin: 0 auto; padding: 64px 24px; font-family: "Source Serif 4", "Charter", Georgia, serif; font-size: 20px; line-height: 1.65; color: #1A1A1A; }
.article h1 { font-family: "Inter Display", system-ui; font-weight: 700; font-size: 44px; line-height: 1.1; letter-spacing: -0.02em; margin: 0 0 8px; }
.article h2 { font-size: 28px; font-weight: 600; margin: 48px 0 12px; }
.article p { margin: 1.2em 0; }
.article blockquote { border-left: 3px solid #E5E5E5; padding-left: 20px; color: #6B6B6B; font-style: italic; }`,
    `/* Author byline */
.byline { display: flex; align-items: center; gap: 12px; margin: 24px 0 48px; font-family: "Inter", system-ui; font-size: 14px; color: #6B6B6B; }
.byline img { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }
.byline .name { color: #1A1A1A; font-weight: 500; }
.byline .sep { color: #CCC; }`,
    `/* Code block */
pre.code { background: #FAFAF7; border: 1px solid #E5E5E5; border-radius: 6px; padding: 16px 20px; font-family: "JetBrains Mono", monospace; font-size: 14px; line-height: 1.55; overflow-x: auto; }
code:not(pre code) { background: #FAFAF7; padding: 2px 6px; border-radius: 3px; font-size: 0.92em; }`,
  ],

  successLooksLike: [
    "A Ghost blog with Casper theme + serif body",
    "Robin Sloan's blog post page",
    "Hey World writer's article page",
  ],

  failureLooksLike: [
    "WordPress with sidebar widgets + 3 ad units",
    "Medium-like style with multiple signup modals",
    "All-caps headers + 40ch measure + serif headers + sans body (inverted)",
  ],

  tile: "tile-blog",
  tileHTML: `
    <div class="head">On reading slowly.</div>
    <div class="by">— Robin · May 26 · 4 min read</div>
    <div class="body">There is a kind of reading that the internet has almost taught us to forget. It is the slow, patient kind…</div>
    <div class="tag">essays · reading</div>
  `,
});

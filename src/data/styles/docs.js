import { asFullPreset } from "./compact.js";

export const docs = asFullPreset({
  id: "docs",
  name: "Technical Docs",
  tag: "Sidebar · code · search",
  desc: "Three-column docs layout. Sidebar nav + content + TOC. Code-first. Stripe / Tailwind / MDN register.",

  feel: "Reading the Stripe docs at midnight trying to integrate a webhook — every code sample copies clean, nav remembers where you are — not a marketing site pretending to host docs.",

  references: "stripe.com/docs, tailwindcss.com/docs, developer.mozilla.org, docs.github.com, supabase.com/docs, vercel.com/docs, react.dev",

  boldFactor: [
    "Three columns: sidebar nav + content (reading width) + page TOC",
    "Search front-and-center in the header (with cmd-k binding)",
    "Code blocks: syntax-highlighted, tabbed (curl / node / python / ruby), copy button, hover-to-highlight",
    "Inline code mono pill with subtle background — clearly clickable for sub-pages",
    "Callout boxes: info (blue), warn (yellow), danger (red), tip (green)",
    "Versioned docs selector + 'last updated' timestamp on every page",
    "Breadcrumbs above title; 'next / previous' nav at the bottom",
  ],

  tokens: {
    "bg":      { value: "#FFFFFF", usage: "Page white" },
    "bg-soft": { value: "#F6F8FA", usage: "Code block bg" },
    "sidebar": { value: "#FAFAFA", usage: "Sidebar bg" },
    "fg":      { value: "#1F2328", usage: "Body text" },
    "muted":   { value: "#6B7280", usage: "Secondary text" },
    "brand":   { value: "#0969DA", usage: "Link / code-tab active blue" },
    "border":  { value: "#E5E7EB", usage: "Border" },
  },

  typography: {
    display: '"Inter", system-ui, sans-serif',
    body:    '"Inter", "Söhne", system-ui, sans-serif',
    mono:    '"JetBrains Mono", "Fira Code", "Source Code Pro", monospace',
    scale:   "12/13/14/16/18/24/32/40",
    weight:  "display 600-700 · body 400 · mono 400-500",
    tracking: "display tight (-0.01em) · body normal · mono normal",
  },

  antiPatterns: [
    { name: "No search",          dont: "ship docs without a search bar", why: "Docs without search are unusable above ~50 pages" },
    { name: "Image-only examples", dont: "show screenshots of code", why: "Code samples MUST be copyable text — never screenshots" },
    { name: "Marketing voice",    dont: "write 'Our incredible API…'", why: "Docs voice is procedural: 'To create a customer, send a POST to…'" },
    { name: "Hidden TOC",         dont: "omit the page table of contents", why: "Long pages need a TOC; readers skim, never read linearly" },
    { name: "Cookie consent modal", dont: "block code copy with a popup", why: "Critical path is copying code — nothing should block it" },
  ],

  responsive: [
    { element: "Sidebar",    mobile: "drawer", tablet: "240px", desktop: "260px" },
    { element: "TOC",        mobile: "hidden", tablet: "hidden", desktop: "220px" },
    { element: "Content",    mobile: "100%",  tablet: "1fr",   desktop: "80ch max" },
  ],

  snippets: [
    `/* Three-column shell */
.docs-shell { display: grid; grid-template-columns: 260px 1fr 220px; gap: 32px; max-width: 1440px; margin: 0 auto; padding: 0 24px; }
@media (max-width: 1024px) { .docs-shell { grid-template-columns: 240px 1fr; } .docs-toc { display: none; } }
.docs-sidebar { padding: 24px 0; border-right: 1px solid #E5E7EB; font-size: 14px; }
.docs-sidebar a { display: block; padding: 6px 12px; color: #6B7280; border-radius: 4px; text-decoration: none; }
.docs-sidebar a:hover { background: #F6F8FA; color: #1F2328; }
.docs-sidebar a.active { color: #0969DA; font-weight: 500; background: #DDF4FF; }`,
    `/* Code block with tabs */
.code-block { background: #F6F8FA; border: 1px solid #E5E7EB; border-radius: 6px; overflow: hidden; margin: 16px 0; }
.code-tabs { display: flex; border-bottom: 1px solid #E5E7EB; background: #FFFFFF; }
.code-tabs button { background: none; border: 0; padding: 8px 12px; font-family: "JetBrains Mono", monospace; font-size: 12px; color: #6B7280; cursor: pointer; }
.code-tabs button.active { color: #0969DA; border-bottom: 2px solid #0969DA; }
.code-content { padding: 16px; font-family: "JetBrains Mono", monospace; font-size: 14px; line-height: 1.55; overflow-x: auto; }`,
    `/* Callout */
.callout { padding: 12px 16px; border-left: 3px solid; border-radius: 4px; margin: 16px 0; font-size: 14px; }
.callout--info  { background: #DDF4FF; border-color: #0969DA; }
.callout--warn  { background: #FFF8C5; border-color: #D29922; }
.callout--danger { background: #FFEBE9; border-color: #CF222E; }
.callout--tip   { background: #DAFBE1; border-color: #1A7F37; }
.callout-title { font-weight: 600; margin-bottom: 4px; }`,
  ],

  successLooksLike: [
    "stripe.com/docs API reference",
    "tailwindcss.com/docs utility class reference",
    "Supabase docs with tabbed code samples",
  ],

  failureLooksLike: [
    "Long single-column wall of text without a TOC",
    "Code samples as screenshots — can't copy",
    "Marketing landing with 'View Docs →' as the only docs surface",
  ],

  tile: "tile-docs",
  tileHTML: `
    <div class="side">
      <div class="grp">Get started</div>
      <div class="li">Quickstart</div>
      <div class="li hl">Webhooks</div>
      <div class="li">Auth</div>
    </div>
    <div class="body">
      <div class="bc">Docs / API / Webhooks</div>
      <div class="hd">Receive events</div>
      <div class="code">$ stripe listen --forward-to localhost:3000/wh</div>
    </div>
  `,
});

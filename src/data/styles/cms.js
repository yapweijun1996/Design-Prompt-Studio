import { asFullPreset } from "./compact.js";

export const cms = asFullPreset({
  id: "cms",
  name: "Marketing CMS",
  tag: "Visual · blocks · publish",
  desc: "Visual page-builder UI. Block-based content. Publish + draft workflow. Webflow / HubSpot CMS / Sanity Studio register.",

  feel: "A marketer building a landing page in Webflow on a Friday afternoon — block-based, live preview, every change is reversible — not a developer-only CMS with raw markdown.",

  references: "Webflow Designer, HubSpot CMS, Sanity Studio, Contentful, Storyblok, Framer, Wix Editor (Studio mode), Squarespace 7.1",

  boldFactor: [
    "Visual canvas (left or center) + properties panel (right) + page-tree (left)",
    "Block library: hero, feature grid, testimonial, pricing, CTA, FAQ — drag-to-canvas",
    "Inline edit on click: text, image, link, color swatch",
    "Top toolbar: device toggle (mobile / tablet / desktop), undo, publish",
    "Style panel: typography, spacing, color — bound to design tokens / brand styles",
    "Draft / published state visible per page + scheduled-publish support",
    "Collaboration: avatars of active editors + comment threads on blocks",
  ],

  tokens: {
    "bg":       { value: "#F4F4F6", usage: "App background" },
    "canvas":   { value: "#FFFFFF", usage: "Page canvas surface" },
    "panel":    { value: "#FAFAFA", usage: "Sidebar panel" },
    "fg":       { value: "#0F0F12", usage: "Body text" },
    "muted":    { value: "#6B6B72", usage: "Secondary" },
    "brand":    { value: "#146EF5", usage: "Webflow blue (action)" },
    "ok":       { value: "#10B981", usage: "Published state" },
    "warn":     { value: "#F59E0B", usage: "Unsaved changes" },
    "border":   { value: "#E1E1E5", usage: "Panel + canvas borders" },
  },

  typography: {
    display: '"Inter", system-ui, sans-serif',
    body:    '"Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "11/12/13/14/16/20/24/32",
    weight:  "display 600 · body 400-500",
    tracking: "normal",
  },

  antiPatterns: [
    { name: "Markdown-only editor", dont: "show a raw markdown text area only", why: "Marketers need WYSIWYG; markdown-only is a developer CMS, different audience" },
    { name: "Modal-per-edit",      dont: "open a modal to change one heading", why: "Inline-edit + side panel beats modal interruption" },
    { name: "Marketing whitespace", dont: "use 96px padding in the builder UI", why: "Workspace UI is dense; whitespace wastes canvas area" },
    { name: "Hidden device toggle", dont: "force-toggle mobile/desktop preview behind a menu", why: "Responsive preview is checked dozens of times per session — always visible" },
    { name: "Auto-publish",        dont: "save = publish without confirmation", why: "Always-explicit publish step prevents accidental live changes" },
  ],

  responsive: [
    { element: "Side panels",  mobile: "tabs",  tablet: "240+220", desktop: "260+280" },
    { element: "Canvas",       mobile: "100%",  tablet: "1fr",     desktop: "1fr" },
    { element: "Toolbar",      mobile: "sticky top", tablet: "sticky top", desktop: "sticky top" },
  ],

  snippets: [
    `/* Builder shell */
.builder-shell { display: grid; grid-template-columns: 260px 1fr 280px; height: 100vh; background: #F4F4F6; }
.builder-panel { background: #FAFAFA; border-right: 1px solid #E1E1E5; padding: 12px; overflow-y: auto; }
.builder-canvas { background: #F4F4F6; padding: 24px; overflow-y: auto; display: flex; justify-content: center; }
.builder-properties { background: #FAFAFA; border-left: 1px solid #E1E1E5; padding: 12px; overflow-y: auto; }`,
    `/* Top toolbar */
.builder-toolbar { display: flex; align-items: center; gap: 8px; height: 48px; padding: 0 16px; background: #FFFFFF; border-bottom: 1px solid #E1E1E5; }
.device-toggle { display: inline-flex; background: #F4F4F6; border-radius: 6px; padding: 2px; }
.device-toggle button { background: none; border: 0; padding: 4px 10px; font-size: 12px; color: #6B6B72; cursor: pointer; border-radius: 4px; }
.device-toggle button.active { background: #FFFFFF; color: #0F0F12; box-shadow: 0 1px 2px rgba(0,0,0,0.08); }
.btn-publish { margin-left: auto; background: #146EF5; color: #FFFFFF; border: 0; border-radius: 6px; padding: 6px 14px; font-size: 13px; font-weight: 600; cursor: pointer; }`,
    `/* Block in canvas with selection ring */
.block { position: relative; padding: 16px; background: #FFFFFF; border-radius: 4px; }
.block.is-selected { outline: 2px solid #146EF5; outline-offset: 2px; }
.block-label { position: absolute; top: -22px; left: 0; background: #146EF5; color: #FFFFFF; font-size: 10px; padding: 2px 6px; border-radius: 2px 2px 0 0; font-weight: 500; opacity: 0; }
.block.is-selected .block-label { opacity: 1; }`,
  ],

  successLooksLike: [
    "Webflow Designer with canvas + properties + page tree",
    "Sanity Studio with structured-content editor",
    "Framer canvas + components panel",
  ],

  failureLooksLike: [
    "Markdown-only editor labeled as 'CMS for marketers'",
    "Save = publish with no draft state",
    "Cluttered modal flow forcing 5 clicks to edit a heading",
  ],

  tile: "tile-cms",
  tileHTML: `
    <div class="rail"></div>
    <div class="canvas">
      <div class="bar"></div>
      <div class="blk hl"><span>HERO</span></div>
      <div class="blk"></div>
    </div>
    <div class="props"></div>
  `,
});

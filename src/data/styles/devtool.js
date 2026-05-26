import { asFullPreset } from "./compact.js";

export const devtool = asFullPreset({
  id: "devtool",
  name: "Developer Tool",
  tag: "Black · mono · terminal",
  desc: "Near-black background. Mono everywhere. Terminal aesthetic. Vercel / Supabase / Railway register.",

  feel: "A developer who lives in their terminal opening Vercel — feels native to the IDE, never decorative — not a marketing site cosplaying as a tool.",

  references: "Vercel.com, Supabase.com, Railway, Fly.io, Render, Neon, Turso, Cloudflare Workers dashboard",

  boldFactor: [
    "Near-black background (#0A0A0A or pure #000) — dark first, not toggle",
    "Geist Mono / JetBrains Mono for code, command names, IDs, version numbers",
    "Inter / Geist Sans for body — sharp, geometric",
    "Code blocks with syntax highlighting are first-class UI (not decoration)",
    "Inline 'copy' buttons next to every code snippet, command, ID",
    "Terminal-style command preview: $ prefix, mono, blinking cursor",
    "Minimal color: white text + one brand accent (electric blue / magenta / lime)",
  ],

  tokens: {
    "bg":       { value: "#000000", usage: "Page black" },
    "surface":  { value: "#0A0A0A", usage: "Card surface" },
    "surface-2":{ value: "#171717", usage: "Elevated / code blocks" },
    "fg":       { value: "#FAFAFA", usage: "Primary text" },
    "muted":    { value: "#A1A1AA", usage: "Secondary text" },
    "brand":    { value: "#3ECF8E", usage: "Supabase green accent (or pick one)" },
    "border":   { value: "#262626", usage: "Subtle border" },
  },

  typography: {
    display: '"Geist Sans", "Inter Display", system-ui',
    body:    '"Geist Sans", "Inter", system-ui, sans-serif',
    mono:    '"Geist Mono", "JetBrains Mono", "IBM Plex Mono", monospace',
    scale:   "12/13/14/16/20/28/40/56",
    weight:  "display 500-700 · body 400-500 · mono 400-500",
    tracking: "display tight (-0.02em) · mono normal",
  },

  antiPatterns: [
    { name: "Stock people photos", dont: "use Shutterstock devs-at-laptop", why: "Devs hate stock photography — show code, terminal, or product UI" },
    { name: "Sans-only code",     dont: "render code blocks in Inter", why: "Mono code is non-negotiable — sans for code is uncanny" },
    { name: "Marketing fluff copy", dont: "write 'unleash your potential'", why: "Dev voice is concrete: 'Deploy from Git in 3s'" },
    { name: "Rainbow gradient hero", dont: "use vibrant multi-color gradient", why: "Single-color accent on black is the genre signal" },
    { name: "Friendly mascot illustration", dont: "use bubbly Notion-style blobs", why: "Devtool = sharp, geometric — mascots read as no-code" },
  ],

  responsive: [
    { element: "Section padding", mobile: "32px",  tablet: "64px",  desktop: "96px" },
    { element: "Hero type",       mobile: "36px",  tablet: "48px",  desktop: "56px" },
    { element: "Code block",      mobile: "13px",  tablet: "14px",  desktop: "14px" },
  ],

  snippets: [
    `/* Code block with copy */
.code-block { position: relative; background: #171717; border: 1px solid #262626; border-radius: 8px; padding: 16px 48px 16px 16px; font-family: "Geist Mono", monospace; font-size: 14px; color: #FAFAFA; overflow-x: auto; }
.code-copy { position: absolute; top: 8px; right: 8px; background: transparent; border: 1px solid #262626; border-radius: 6px; padding: 4px 8px; color: #A1A1AA; font-size: 11px; cursor: pointer; }
.code-copy:hover { color: #FAFAFA; border-color: #404040; }`,
    `/* Terminal-style command */
.term { font-family: "Geist Mono", monospace; font-size: 14px; color: #FAFAFA; }
.term::before { content: "$ "; color: #3ECF8E; }
.term-cursor::after { content: ""; display: inline-block; width: 8px; height: 1.1em; background: #FAFAFA; margin-left: 2px; vertical-align: text-bottom; animation: blink 1s steps(2) infinite; }
@keyframes blink { to { opacity: 0; } }`,
    `/* Glow accent button */
.btn-glow {
  background: #3ECF8E; color: #000; border: 0; border-radius: 6px;
  padding: 10px 16px; font-weight: 600; font-size: 14px;
  box-shadow: 0 0 24px rgba(62,207,142,0.35);
}`,
  ],

  successLooksLike: [
    "Vercel.com homepage — black, geist mono code block, deploy CTA",
    "Supabase landing — dark green accent, terminal commands",
    "Railway.app — pure black, monospace stat counters",
  ],

  failureLooksLike: [
    "Marketing site with one dark-mode toggle bolted on",
    "Stock photo of person at laptop with code on screen",
    "Sans-serif code blocks",
  ],

  tile: "tile-devtool",
  tileHTML: `
    <div class="term">npx create-app my-api</div>
    <div class="out">▸ Cloning template…</div>
    <div class="out">▸ Installing deps…</div>
    <div class="out ok">✓ Ready on :3000</div>
    <div class="btn">Deploy →</div>
  `,
});

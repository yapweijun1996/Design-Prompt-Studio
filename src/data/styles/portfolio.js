import { asFullPreset } from "./compact.js";

export const portfolio = asFullPreset({
  id: "portfolio",
  name: "Designer Portfolio",
  tag: "Case-study · dark · craft",
  desc: "Dark or paper background. Big case-study hero. Process-led. Brittany Chiang / Bruno Simon / Olivier Larose register.",

  feel: "Scrolling through a senior designer's portfolio — every project is a 3000-word case study with process — not a Behance grid of decontextualized JPGs.",

  references: "brittanychiang.com, bruno-simon.com, olivierlarose.com, rauno.me, paco.me, emilkowal.ski, refactoringui.com",

  boldFactor: [
    "Project-as-case-study: problem, process, decisions, outcome — never just screenshots",
    "Hero is your name + one-line identity ('Designer & engineer based in NYC')",
    "Dark mode by default OR off-white paper with serif — pick a lane, commit",
    "Mono accent font for project metadata (year, role, stack)",
    "Hover micro-interactions on project cards (image scale, label appear)",
    "Long-form reading width (60-70ch) on case-study pages",
    "About page with real personality + recent activity / now-page",
  ],

  tokens: {
    "bg":      { value: "#0E0E10", usage: "Near-black bg (or #FBF8F1 paper alt)" },
    "surface": { value: "#1A1A1D", usage: "Card surface" },
    "fg":      { value: "#EDEDEF", usage: "Primary text" },
    "muted":   { value: "#8A8A92", usage: "Metadata, captions" },
    "accent":  { value: "#A78BFA", usage: "Single accent — link hover, year" },
    "rule":    { value: "#26262A", usage: "Hairline divider" },
  },

  typography: {
    display: '"Söhne", "Inter Display", system-ui',
    body:    '"Inter", "Söhne", system-ui, sans-serif',
    mono:    '"Söhne Mono", "JetBrains Mono", monospace',
    scale:   "12/14/16/18/22/32/48/72",
    weight:  "display 500-600 · body 400 · mono 400",
    tracking: "display tight (-0.02em) · mono tight",
  },

  antiPatterns: [
    { name: "Grid of screenshots", dont: "show 24 unlabeled thumbnails", why: "One case study > 10 screenshots; portfolio is depth, not breadth" },
    { name: "Stock fonts only",    dont: "use Inter+Inter only", why: "A serif/mono accent shows typographic taste" },
    { name: "Hidden about",        dont: "bury the about page in footer", why: "Recruiters/clients want to read about you — feature it" },
    { name: "No process",          dont: "show only final pixel-perfect mockups", why: "Process artifacts (sketches, options, rejected) sell senior taste" },
    { name: "Auto-play reel",      dont: "open with autoplay video reel", why: "Aggressive; let viewers click into your work on their schedule" },
  ],

  responsive: [
    { element: "Hero name",       mobile: "44px",  tablet: "64px",  desktop: "84px" },
    { element: "Case study width", mobile: "100%", tablet: "62ch",  desktop: "68ch" },
    { element: "Project grid",    mobile: "1",     tablet: "2",     desktop: "2 or 3" },
  ],

  snippets: [
    `/* Project card with mono metadata */
.project-card { padding: 24px 0; border-bottom: 1px solid #26262A; display: grid; grid-template-columns: 1fr auto; gap: 16px; }
.project-card h3 { font-family: "Söhne", system-ui; font-size: 22px; font-weight: 500; color: #EDEDEF; margin: 0 0 4px; }
.project-card .meta { font-family: "Söhne Mono", monospace; font-size: 12px; color: #8A8A92; letter-spacing: 0.04em; }
.project-card:hover h3 { color: #A78BFA; }`,
    `/* Now / about strip */
.now-strip { font-family: "Söhne Mono", monospace; font-size: 13px; color: #8A8A92; padding: 12px 16px; border: 1px dashed #26262A; border-radius: 6px; }
.now-strip::before { content: "now → "; color: #A78BFA; }`,
    `/* Big name hero */
.portfolio-hero h1 { font-family: "Söhne", system-ui; font-size: 84px; line-height: 0.95; letter-spacing: -0.03em; font-weight: 600; color: #EDEDEF; }
.portfolio-hero .role { font-family: "Söhne Mono", monospace; font-size: 14px; color: #8A8A92; margin-top: 16px; letter-spacing: 0.02em; }`,
  ],

  successLooksLike: [
    "brittanychiang.com — calm dark, one accent green, real case studies",
    "rauno.me — sharp craft, mono metadata, slow scroll experiences",
    "paco.me — paper warm, serif body, long-form essays + projects",
  ],

  failureLooksLike: [
    "Behance grid of 24 screenshots with no context",
    "Hero with autoplay reel + LOUD intro music",
    "About page hidden behind a tiny footer link",
  ],

  tile: "tile-portfolio",
  tileHTML: `
    <div class="meta">2025 · DESIGN ENGINEER</div>
    <div class="name">Brittany.<br/>Designs<br/>systems.</div>
    <div class="now">now → building a design system at Linear</div>
  `,
});

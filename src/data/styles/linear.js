// Style preset: Linear / Modern — dark ambient indigo, multi-layer shadows, expo easing.
// Compact-format. Inspired by Sample #1 from PROMPT-PATTERNS.md.

import { asFullPreset } from "./compact.js";

export const linear = asFullPreset({
  id: "linear",
  name: "Linear / Modern",
  tag: "Dark · ambient · indigo",
  desc: "Premium developer tools aesthetic — near-black with indigo glows, expo-out easing, multi-layer shadows.",

  feel: "Looking through frosted glass into a high-end application running at night — not a generic dark-mode SaaS.",

  references: "Linear, Vercel dashboard, Raycast, Arc browser, Cursor IDE, Apollo, Things 3",

  boldFactor: [
    "Near-black canvas (#050506) — never pure #000",
    "Single saturated indigo accent (#5E6AD2) used as glow, never decoration",
    "Multi-layer shadows: border highlight + diffuse + ambient + optional accent glow",
    "Animated gradient blobs (900-1400px, heavy blur) float across canvas",
    "Mouse-tracking radial spotlight on interactive cards",
    "Expo-out easing (cubic-bezier(0.16, 1, 0.3, 1)) for ALL motion",
    "Micro-interactions: 200-300ms, 4-8px max movement, no bounce",
  ],

  tokens: {
    "background-deep":     { value: "#020203", usage: "Footer / deepest layer" },
    "background-base":     { value: "#050506", usage: "Primary canvas" },
    "background-elevated": { value: "#0a0a0c", usage: "Mock interfaces / elevated surfaces" },
    "surface":             { value: "rgba(255,255,255,0.05)", usage: "Cards / containers" },
    "foreground":          { value: "#EDEDEF", usage: "Primary text (NOT pure white)" },
    "foreground-muted":    { value: "#8A8F98", usage: "Body / metadata" },
    "accent":              { value: "#5E6AD2", usage: "Buttons / links / glows" },
    "accent-glow":         { value: "rgba(94,106,210,0.3)", usage: "Soft ambient lighting" },
    "border-default":      { value: "rgba(255,255,255,0.06)", usage: "Hairline borders" },
  },

  typography: {
    display: '"Inter", "Geist Sans", system-ui, sans-serif',
    body:    '"Inter", "Geist Sans", system-ui, sans-serif',
    mono:    '"JetBrains Mono", ui-monospace, monospace',
    scale:   "text-7xl/8xl heroes, font-semibold, tracking-[-0.03em]",
    weight:  "display 600 · body 400 · headlines 600",
    tracking: "display tracking-tight · body normal · labels tracking-widest 0.15em uppercase",
  },

  antiPatterns: [
    { name: "Pure black canvas",  dont: "use #000000 as background",                     why: "Near-black like #050506 feels expensive; pure black reads as Bootstrap default" },
    { name: "Flat backgrounds",   dont: "use a single solid color with no layering",     why: "The layered-ambient-light system IS the style — flat dark mode is the failure mode" },
    { name: "Hard shadows",       dont: "use box-shadow with offset > 4px and no blur",  why: "Multi-layer soft shadows are the language; hard shadows belong to Brutalist" },
    { name: "Bouncy springs",     dont: "use spring physics or overshoot easing",        why: "Expo-out is the signature; springs feel toy-like and break the precision quality" },
    { name: "Colorful accents",   dont: "use 3+ accent colors",                          why: "ONE indigo accent at varying opacities — the monochromatic discipline is the elegance" },
  ],

  responsive: [
    { element: "Section padding", mobile: "py-16",      tablet: "py-24",      desktop: "py-32" },
    { element: "Hero type",        mobile: "text-4xl",   tablet: "text-5xl",   desktop: "text-7xl/8xl" },
    { element: "Body text",        mobile: "text-base",  tablet: "text-lg",    desktop: "text-xl" },
    { element: "Card padding",     mobile: "p-5",        tablet: "p-6",        desktop: "p-8" },
  ],

  snippets: [
    `/* Layered ambient background */
body {
  background:
    radial-gradient(ellipse at top, #0a0a0f 0%, #050506 50%, #020203 100%);
}
body::before {
  content: ""; position: fixed; inset: 0; pointer-events: none;
  background: radial-gradient(900px 1400px at 50% -100px, rgba(94,106,210,0.25), transparent 60%);
  animation: float 8s ease-in-out infinite;
}
@keyframes float { 50% { transform: translateY(-20px) rotate(1deg); } }`,

    `/* Multi-layer card shadow */
.card {
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.06),
    0 2px 20px rgba(0,0,0,0.4),
    0 0 40px rgba(0,0,0,0.2);
}
.card:hover {
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.1),
    0 8px 40px rgba(0,0,0,0.5),
    0 0 80px rgba(94,106,210,0.1);
}`,

    `/* Mouse-tracking spotlight (vanilla) */
card.addEventListener("mousemove", (e) => {
  const r = card.getBoundingClientRect();
  card.style.setProperty("--mx", (e.clientX - r.left) + "px");
  card.style.setProperty("--my", (e.clientY - r.top) + "px");
});
/* CSS */
.card::after {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(300px at var(--mx) var(--my), rgba(94,106,210,0.15), transparent 60%);
  opacity: 0; transition: opacity 200ms;
}
.card:hover::after { opacity: 1; }`,

    `/* Gradient text */
.headline {
  background: linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.7));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}`,
  ],

  successLooksLike: [
    "Linear's marketing site at night",
    "Vercel's dashboard the moment after navigating in",
    "Raycast's command palette",
    "A senior dev's well-tended Notion home",
  ],

  failureLooksLike: [
    "A 2017 dark-mode toggle slapped on a light theme",
    "Pure black with one bright accent (no layered atmosphere)",
    "Bouncy spring animations",
    "Multiple bright accent colors",
    "Web-2.0 glossy gradients on cards",
  ],

  overrideGlobalRules: [
    "Layered ambient gradient blobs are REQUIRED — overrides the global 'avoid aggressive gradient backgrounds' rule (these are atmosphere, not aggression).",
  ],

  tile: "tile-linear",
  tileHTML: `
    <div class="meta"><span class="dot"></span>linear-modern</div>
    <div class="big">Build with<br/><em>velocity.</em></div>
    <div class="cta"><span>Try it →</span></div>
  `,
});

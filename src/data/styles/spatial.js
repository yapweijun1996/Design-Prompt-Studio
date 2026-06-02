import { asFullPreset } from "./compact.js";

export const spatial = asFullPreset({
  id: "spatial",
  name: "Spatial",
  tag: "visionOS glass · frosted · depth",
  desc: "visionOS / Apple-Vision spatial glass — frosted translucent panels floating over a soft vibrant gradient, real layered depth, generous rounding, light refraction. Calm, premium, futuristic-but-warm.",
  feel: "Apple Vision Pro / visionOS / macOS Big Sur — frosted glass cards hovering in soft light, content blurred through them. Tactile light, not flat UI.",
  references: "Apple visionOS, Apple Music, macOS Big Sur, Arc browser, Family app, Apple Fitness+",
  boldFactor: [
    "A soft vibrant gradient backdrop (peach #FFD9C0 → lavender #D6CBFF → sky #BFE3FF) — the light source the glass refracts",
    "Frosted translucent panels (≈55% white + heavy backdrop-blur) with a 1px light border and inner top highlight — true visionOS material",
    "Generous rounding (22–28px) and real layered depth — panels float on soft, wide, low-opacity shadows",
    "A clean system sans (SF Pro / Inter) — neutral and legible through the glass; content stays calm and uncluttered",
    "ONE vivid system accent (#0A84FF) for actions; everything else is glass + light",
  ],
  tokens: {
    "bg":      { value: "linear-gradient(135deg,#FFD9C0,#D6CBFF 50%,#BFE3FF)", usage: "Soft vibrant light backdrop" },
    "glass":   { value: "rgba(255,255,255,0.55)", usage: "Frosted panel fill (+ backdrop-blur 30px)" },
    "fg":      { value: "#1A1A22", usage: "Ink — legible on glass" },
    "muted":   { value: "#5A5A68", usage: "Secondary" },
    "border":  { value: "rgba(255,255,255,0.70)", usage: "Light glass edge" },
    "accent":  { value: "#0A84FF", usage: "System blue — actions only" },
  },
  typography: {
    display: '"SF Pro Display", "Inter", system-ui, sans-serif',
    body:    '"SF Pro Text", "Inter", system-ui, sans-serif',
    mono:    '"SF Mono", "JetBrains Mono", monospace',
    scale:   "13/15/17/20/26/38/54",
    weight:  "display 600 · body 400 · semibold labels",
    tracking: "display -0.02em · body normal · body line-height 1.55",
  },
  antiPatterns: [
    { name: "Opaque cards", dont: "make panels solid", why: "the frosted translucency over the gradient IS the style" },
    { name: "Flat backdrop", dont: "put glass on a plain grey/white background", why: "there must be a soft vibrant gradient for the glass to refract" },
    { name: "Sharp corners", dont: "use small or zero radius", why: "visionOS material is generously rounded (22px+)" },
    { name: "Hard shadows", dont: "use tight dark drop-shadows", why: "depth here is soft, wide, low-opacity, luminous" },
  ],
  responsive: [
    { element: "Section padding", mobile: "48px", tablet: "88px",  desktop: "120px" },
    { element: "Hero type",       mobile: "30px", tablet: "40px",  desktop: "54px" },
    { element: "Panel radius",    mobile: "20px", tablet: "24px",  desktop: "28px" },
  ],
  snippets: [
    `/* The frosted visionOS panel */
.panel { background:rgba(255,255,255,.55); backdrop-filter:blur(30px) saturate(160%); -webkit-backdrop-filter:blur(30px) saturate(160%); border:1px solid rgba(255,255,255,.7); border-radius:24px; box-shadow:0 20px 60px rgba(40,30,80,.18), inset 0 1px 0 rgba(255,255,255,.8); }`,
    `/* Vibrant backdrop + one blue action */
body { background:linear-gradient(135deg,#FFD9C0,#D6CBFF 45%,#BFE3FF); min-height:100vh; }
.btn { background:#0A84FF; color:#fff; border:0; border-radius:14px; padding:13px 22px; font-weight:600; box-shadow:0 8px 24px rgba(10,132,255,.35); }`,
  ],
  successLooksLike: ["a visionOS app window", "Apple Music's frosted now-playing", "Arc browser's translucent UI"],
  failureLooksLike: ["opaque solid cards on flat grey", "sharp-cornered flat material", "hard dark drop-shadows", "no gradient backdrop for the glass to catch"],
  overrideGlobalRules: [
    "Frosted translucent panels over a soft vibrant gradient are the register — overrides any 'avoid blur / prefer flat opaque surfaces' default; backdrop-blur is mandatory here.",
  ],
  tile: "tile-premium",
  tileHTML: `<div style='height:150px;background:linear-gradient(135deg,#FFD9C0,#D6CBFF 50%,#BFE3FF);display:flex;align-items:center;justify-content:center;padding:16px;font-family:-apple-system,Inter,system-ui,sans-serif'><div style='background:rgba(255,255,255,.55);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.85);border-radius:20px;box-shadow:0 14px 36px rgba(50,35,90,.22),inset 0 1px 0 rgba(255,255,255,.9);padding:16px 18px;width:100%'><div style='font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:#5A5A68'>Spatial</div><div style='font-size:21px;font-weight:600;letter-spacing:-.02em;color:#1A1A22;margin:4px 0 10px'>Glass, with depth.</div><div style='display:inline-block;font-size:11px;font-weight:600;color:#fff;background:#0A84FF;border-radius:11px;padding:6px 13px;box-shadow:0 6px 16px rgba(10,132,255,.4)'>Open</div></div></div>`,
});

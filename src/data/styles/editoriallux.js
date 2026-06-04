import { asFullPreset } from "./compact.js";

export const editoriallux = asFullPreset({
  id: "editoriallux",
  name: "Editorial Luxe",
  tag: "High-fashion · dramatic serif · gallery",
  desc: "High-fashion editorial luxury. Enormous dramatic serif, vast negative space, black/white with a single restrained color, image-led like a magazine. Expensive and assured.",
  sampleTemplate: "editorial",
  feel: "An SSENSE / The Row / Vogue runway feature — colossal display serif over full-bleed imagery, severe whitespace, a single accent. Quiet luxury, never busy.",
  references: "ssense.com, The Row, Vogue Runway, Phaidon, Acne Studios, Saint Laurent",
  boldFactor: [
    "Colossal display serif (Canela / Editorial New / Fraunces) at editorial scale",
    "Severe negative space; asymmetric editorial grid; image-led composition",
    "Black + white + ONE restrained accent (oxblood, gold, or none)",
    "Full-bleed fashion imagery (clearly-labelled placeholder if none)",
    "Tiny tracked-out sans labels as counterpoint to the giant serif",
  ],
  tokens: {
    "bg":       { value: "#F7F5F2", usage: "Gallery paper" },
    "bg-dark":  { value: "#0C0C0C", usage: "Dramatic dark spread" },
    "fg":       { value: "#111111", usage: "Ink" },
    "muted":    { value: "#6A6A6A", usage: "Secondary" },
    "accent":   { value: "#6E1423", usage: "Oxblood — used once or twice" },
  },
  typography: {
    display: '"Fraunces", "Canela", "Editorial New", Georgia, serif',
    body:    '"Inter", "Söhne", system-ui, sans-serif',
    mono:    '"JetBrains Mono", ui-monospace, monospace',
    scale:   "12/14/18/24/40/72/120",
    weight:  "display 300-500 (light, elegant) · body 400 · labels 500 tracked-out",
    tracking: "display very tight (-0.03em) · labels wide (0.18em) uppercase · body normal",
  },
  antiPatterns: [
    { name: "Busy layout", dont: "fill the page with cards and color", why: "luxury reads as restraint + space; emptiness is the flex" },
    { name: "Sans display", dont: "use a grotesque for the big headline", why: "the dramatic SERIF at scale IS the register" },
    { name: "Many colors", dont: "introduce a palette", why: "black/white + one accent; color noise kills the luxe" },
  ],
  responsive: [
    { element: "Section padding", mobile: "56px", tablet: "100px", desktop: "160px" },
    { element: "Hero type",       mobile: "56px", tablet: "96px", desktop: "120px" },
    { element: "Body",            mobile: "16px", tablet: "17px", desktop: "17px" },
  ],
  snippets: [
    `/* Colossal editorial headline */
.display { font-family:"Fraunces",Georgia,serif; font-weight:400; font-size:clamp(56px,11vw,120px); letter-spacing:-.03em; line-height:.98; }
.display em { font-style:italic; }`,
    `/* Tracked-out sans label */
.label { font-family:"Inter",sans-serif; font-size:12px; letter-spacing:.18em; text-transform:uppercase; color:#6A6A6A; }`,
  ],
  successLooksLike: ["ssense.com editorial", "The Row site", "a Vogue Runway feature"],
  failureLooksLike: ["busy card grid", "sans-serif headline", "multiple bright colors", "stocky e-commerce template"],
  overrideGlobalRules: [
    "A dramatic display SERIF and vast whitespace are the register — overrides 'avoid serif display' and 'pack sections densely'.",
  ],
  tile: "tile-premium",
  tileHTML: `<div style="height:150px;background:#F7F5F2;display:flex;flex-direction:column;justify-content:space-between;padding:16px;font-family:Fraunces,Georgia,serif;color:#111">
    <div style="font-family:Inter,sans-serif;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#6A6A6A">Autumn / Winter</div>
    <div style="font-size:48px;font-weight:400;letter-spacing:-.03em;line-height:.92">The<br/><em>Edit.</em></div>
    <div style="font-family:Inter,sans-serif;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#6E1423">Discover →</div>
  </div>`,
});

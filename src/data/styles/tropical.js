import { asFullPreset } from "./compact.js";

export const tropical = asFullPreset({
  id: "tropical",
  name: "Tropical Coral",
  tag: "Sunset · resort · warm",
  desc: "Warm sunset gradient. Coral + teal + sand. Palm silhouettes. Hospitality and travel.",

  feel: "Arriving at a Tulum boutique hotel at golden hour — not a stock-photo travel SaaS.",

  references: "Hôtel Esencia Tulum, Aman Tokyo, Soho House Bali, mid-century Acapulco postcards, David Hockney's California paintings, early Slim Aarons photography, the Eames House LA exteriors",

  boldFactor: [
    "Sunset gradient: coral → peach → soft teal (always warm-to-cool flow)",
    "Living coral primary (#FF7F66) + soft teal secondary (#7AC6BD)",
    "Slab serif (Domaine Display, GT Sectra) for editorial luxury feel",
    "Cream sand backgrounds (#F7F0E5) for cards over the gradient",
    "Soft drop shadows (8-16px blur, low opacity) on floating elements",
    "Generous rounded corners (16-24px) — never sharp",
    "Palm / fern silhouettes as soft decorative motifs",
  ],

  tokens: {
    "bg":          { value: "#FFF4EC", usage: "Warm sand canvas" },
    "fg":          { value: "#2E1F1A", usage: "Espresso ink" },
    "muted-fg":    { value: "#7B6155", usage: "Driftwood grey-brown" },
    "coral":       { value: "#FF7F66", usage: "Primary sunset coral" },
    "peach":       { value: "#FFB07F", usage: "Gradient mid stop" },
    "teal":        { value: "#7AC6BD", usage: "Cool ocean secondary" },
    "sand":        { value: "#F7F0E5", usage: "Card / overlay neutral" },
  },

  typography: {
    display: '"Domaine Display", "GT Sectra", "Playfair Display", serif',
    body:    '"Söhne", "Inter Tight", system-ui',
    accent:  '"Sacramento", cursive (sparingly for taglines)',
    mono:    '"JetBrains Mono", monospace',
    scale:   "14/16/18/24/36/56/88/128",
    weight:  "display 500-700 · body 400",
    tracking: "display tight (-0.02em) · body normal",
  },

  antiPatterns: [
    { name: "Saturated primaries", dont: "use #FF0000 / pure red",          why: "Tropical is sunset-warmed; pure primaries break the golden-hour feel" },
    { name: "Cool monochrome",    dont: "use grey / blue palette",          why: "Warmth IS the language — cool palettes belong elsewhere" },
    { name: "Sharp corners",      dont: "use border-radius: 0",             why: "Rounded edges signal comfort; sharp signals tech" },
    { name: "Bright neon",        dont: "use electric saturated colors",    why: "Sun-warmed muted brightness, not dance-club neon" },
    { name: "Sans-serif headlines", dont: "use Inter for display",          why: "Slab serif IS the editorial hospitality signal" },
  ],

  responsive: [
    { element: "Section padding", mobile: "60px",  tablet: "88px",  desktop: "120px" },
    { element: "Hero type",       mobile: "48px",  tablet: "72px",  desktop: "120px" },
    { element: "Border radius",   mobile: "12px",  tablet: "18px",  desktop: "24px" },
    { element: "Shadow blur",     mobile: "8px",   tablet: "12px",  desktop: "16px" },
  ],

  snippets: [
    `/* Sunset gradient hero */
.hero {
  background: linear-gradient(135deg,
    #FF7F66 0%,
    #FFB07F 40%,
    #FFE0BC 70%,
    #7AC6BD 100%);
  min-height: 70vh;
}`,
    `/* Glass card over sunset */
.card {
  background: rgba(247, 240, 229, 0.85);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 16px 40px rgba(46, 31, 26, 0.08);
}`,
    `/* Palm silhouette SVG decoration */
.palm {
  position: absolute;
  width: 200px; height: 280px;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140"><path d="M50,140 L50,80 Q40,40 20,30 Q35,40 50,70 Q65,40 80,30 Q60,40 50,80" fill="%232E1F1A" opacity="0.3"/></svg>') no-repeat;
}`,
  ],

  successLooksLike: [
    "A Hôtel Esencia welcome page",
    "Aman Tokyo's quiet luxury site",
    "A Slim Aarons photograph print",
    "A mid-century Acapulco postcard",
  ],

  failureLooksLike: [
    "Stock travel SaaS with sunset photo background",
    "Saturated primaries (pure red / blue)",
    "Sharp corners on cards",
    "Cool grey monochrome",
    "Sans-serif display type",
  ],

  overrideGlobalRules: [
    "Sunset gradient backgrounds are REQUIRED — overrides global 'avoid aggressive gradient backgrounds' rule (gradient IS the atmosphere here).",
    "Slab serif display (Domaine / GT Sectra / Playfair) is REQUIRED — overrides global 'avoid overused fonts' rule.",
  ],

  tile: "tile-tropical",
  tileHTML: `
    <div class="card">
      <div class="meta">⊹ Tulum · Mexico</div>
      <div class="word">Stay<br/><em>slow.</em></div>
    </div>
  `,
});

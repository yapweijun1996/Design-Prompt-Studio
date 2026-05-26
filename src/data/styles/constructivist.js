import { asFullPreset } from "./compact.js";

export const constructivist = asFullPreset({
  id: "constructivist",
  name: "Constructivist",
  tag: "Red · black · agitprop",
  desc: "Soviet constructivist agitprop. Red + black + cream. Diagonal compositions. Photomontage. Slab condensed type.",

  feel: "A 1920 Mayakovsky window poster — not a faux-political SaaS landing page.",

  references: "El Lissitzky's Beat the Whites with the Red Wedge, Rodchenko photomontages 1924, Stenberg Brothers film posters, Mayakovsky ROSTA windows, Bauhaus-adjacent Russian avant-garde 1917-1932, modern revivals (Faile, Shepard Fairey poster era)",

  boldFactor: [
    "Red (#D7263D) + black + cream (#EFE9D8) — ONLY these three colors",
    "Diagonal composition — text and shapes at 15° to 45° angles",
    "Slab condensed sans display (Druk Wide, Knockout, League Gothic)",
    "Photomontage: real photos clipped into geometric shapes",
    "Heavy black bars + circles as composition anchors",
    "Lowercase russian-inspired wordmarks (или not, но stylized)",
    "Confidence: rhetoric is bold and pamphleteering, never apologetic",
  ],

  tokens: {
    "bg":          { value: "#EFE9D8", usage: "Cream propaganda paper" },
    "fg":          { value: "#0F0F0F", usage: "Solid ink black" },
    "red":         { value: "#D7263D", usage: "Agitprop red (only accent)" },
    "muted-fg":    { value: "#4A4A4A", usage: "Mid-grey for secondary" },
  },

  typography: {
    display: '"Druk Wide", "Knockout", "League Gothic", "Oswald", sans-serif',
    body:    '"Oswald", "Inter Tight", system-ui',
    mono:    '"JetBrains Mono", monospace',
    scale:   "14/16/22/32/56/96/160",
    weight:  "display 700-900 · body 500-700",
    tracking: "display tight (-0.03em) · uppercase headlines",
  },

  antiPatterns: [
    { name: "More than 3 colors",  dont: "use blue / yellow / green",        why: "Red + black + cream is the entire palette — additional colors break the agitprop discipline" },
    { name: "Soft humanist type", dont: "use Inter / Lexend / Söhne",       why: "Slab condensed display IS the constructivist typographic signal" },
    { name: "Centered symmetric", dont: "center display type",              why: "Diagonal / asymmetric composition is the visual language" },
    { name: "Calm body copy",     dont: "use 'gentle' / 'considered' rhetoric", why: "Constructivist copy is declarative, bold, pamphleteering" },
    { name: "Rounded corners",    dont: "use border-radius > 0",             why: "Sharp brutal edges match the agitprop print medium" },
  ],

  responsive: [
    { element: "Section padding",    mobile: "48px",  tablet: "72px",  desktop: "96px" },
    { element: "Hero type",          mobile: "72px",  tablet: "120px", desktop: "180px" },
    { element: "Composition rotation", mobile: "10°",  tablet: "15°",   desktop: "20°" },
  ],

  snippets: [
    `/* Diagonal section */
.section-diagonal {
  position: relative;
  background: #D7263D;
  color: #EFE9D8;
  padding: 96px 48px;
  clip-path: polygon(0 0, 100% 8%, 100% 100%, 0 92%);
}`,
    `/* Slab condensed display */
.display {
  font-family: "Druk Wide", "League Gothic", sans-serif;
  font-weight: 900;
  font-size: clamp(72px, 14vw, 200px);
  line-height: 0.85;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  color: #D7263D;
  transform: rotate(-3deg);
  transform-origin: left center;
}`,
    `/* Photomontage clip */
.photo-clip {
  clip-path: circle(40% at 50% 50%);
  filter: contrast(120%) grayscale(50%);
}`,
  ],

  successLooksLike: [
    "El Lissitzky's 1919 propaganda posters",
    "Rodchenko's 1924 magazine spreads",
    "A Stenberg Brothers film poster",
    "Shepard Fairey's OBEY campaign",
  ],

  failureLooksLike: [
    "A modern SaaS with one red diagonal banner",
    "Multi-color palette",
    "Humanist sans (Inter / Lexend)",
    "Centered symmetric composition",
    "Rounded corners",
  ],

  overrideGlobalRules: [
    "Diagonal photomontage compositions are encouraged — overrides global 'no decorative SVG' rule when used as constructivist composition.",
    "Slab condensed display (Druk Wide, League Gothic) is REQUIRED — overrides global 'avoid overused fonts' rule.",
  ],

  tile: "tile-constructivist",
  tileHTML: `
    <div class="diag"></div>
    <div class="word">RISE</div>
    <div class="circle"></div>
  `,
});

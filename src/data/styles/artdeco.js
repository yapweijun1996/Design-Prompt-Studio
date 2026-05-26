import { asFullPreset } from "./compact.js";

export const artdeco = asFullPreset({
  id: "artdeco",
  name: "Art Deco",
  tag: "Gold · sunburst · symmetric",
  desc: "Gold-on-black symmetry. Sunburst + chevron motifs. Geometric high-deco type. Chrysler Building / Gatsby / Erté register.",

  feel: "Standing in the lobby of the Chrysler Building in 1932 — gold-and-black geometry, sunburst above the doors, brass and onyx — not a Pinterest moodboard of 'Gatsby vibes' pretending to be deco.",

  references: "Chrysler Building lobby, Empire State Building, Erté illustrations, Cassandre posters (Nord Express, Normandie), Tamara de Lempicka paintings, The Great Gatsby (Baz Luhrmann production design), Eric Gill",

  boldFactor: [
    "Strict symmetric composition along a central axis — never asymmetric",
    "Gold (#C9A24B) on black (#0A0908) as the primary palette",
    "Sunburst / fan / chevron / zigzag geometric motifs as borders + ornament",
    "High-deco display type: Broadway, Peignot, Bifur — never sans-serif",
    "Stepped / pyramidal compositions — pyramids, ziggurats, tiered shapes",
    "Brass + onyx + jade + ivory accent tones (luxe materials, not flat color)",
    "Centered display type with letter-spacing 0.1-0.2em for monumentality",
  ],

  tokens: {
    "bg":      { value: "#0A0908", usage: "Onyx black" },
    "bg-alt":  { value: "#1A1612", usage: "Brown-black alt" },
    "fg":      { value: "#F5EBD7", usage: "Ivory white" },
    "gold":    { value: "#C9A24B", usage: "Brass gold" },
    "gold-deep":{ value: "#8B6F2F", usage: "Antique gold deep" },
    "jade":    { value: "#1F5C50", usage: "Jade accent" },
  },

  typography: {
    display: '"Broadway", "Poiret One", "Cinzel", "Limelight", "Playfair Display", serif',
    body:    '"Cormorant Garamond", "Source Serif 4", Georgia, serif',
    mono:    '"Courier Prime", monospace',
    scale:   "12/14/16/22/32/56/96/160",
    weight:  "display 400-700 · body 400 · italic for accents",
    tracking: "display very open (0.12-0.2em) · body normal",
  },

  antiPatterns: [
    { name: "Asymmetric layout",  dont: "use off-center modern compositions", why: "Strict bilateral symmetry IS the deco discipline" },
    { name: "Sans-serif display", dont: "use Inter / Helvetica for titles", why: "High-deco display serifs (Broadway, Poiret) are the typographic vocabulary" },
    { name: "Pastel palette",     dont: "use soft millennial pink", why: "Gold on black + jewel-tone accents — pastel reads as wedding-blog cosplay" },
    { name: "Flat colors",        dont: "use solid colors without depth", why: "Gold leaf + brass + onyx — luxe materials, not flat web color" },
    { name: "Sunburst as logo only", dont: "use one ornament as decoration", why: "Sunburst / chevron / fan are layout primitives, not stickers" },
  ],

  responsive: [
    { element: "Display serif",   mobile: "56px",  tablet: "96px",  desktop: "160px" },
    { element: "Section padding", mobile: "48px",  tablet: "96px",  desktop: "128px" },
    { element: "Letter-spacing",  mobile: "0.08em", tablet: "0.12em", desktop: "0.18em" },
  ],

  snippets: [
    `/* Symmetric hero with gold display */
.deco-hero { background: #0A0908; padding: 128px 24px; text-align: center; color: #F5EBD7; position: relative; }
.deco-hero h1 { font-family: "Broadway", "Poiret One", "Cinzel", serif; font-weight: 400; font-size: 160px; line-height: 1; letter-spacing: 0.18em; text-transform: uppercase; color: #C9A24B; margin: 0; text-shadow: 0 2px 0 #8B6F2F; }
.deco-hero .sub { font-family: "Cormorant Garamond", serif; font-style: italic; font-size: 24px; letter-spacing: 0.06em; color: #F5EBD7; margin-top: 24px; }`,
    `/* Sunburst SVG backdrop */
.deco-sunburst {
  background-image:
    conic-gradient(from -90deg at 50% 100%,
      #C9A24B 0deg 4deg, transparent 4deg 16deg,
      #C9A24B 16deg 20deg, transparent 20deg 32deg,
      #C9A24B 32deg 36deg, transparent 36deg 48deg,
      #C9A24B 48deg 52deg, transparent 52deg 64deg,
      #C9A24B 64deg 68deg, transparent 68deg 180deg);
  opacity: 0.4;
}`,
    `/* Chevron border */
.deco-border { height: 24px; background-image: linear-gradient(135deg, #C9A24B 25%, transparent 25%, transparent 75%, #C9A24B 75%), linear-gradient(45deg, #C9A24B 25%, transparent 25%, transparent 75%, #C9A24B 75%); background-size: 24px 24px; }`,
  ],

  successLooksLike: [
    "Chrysler Building lobby photograph",
    "Cassandre's Nord Express poster",
    "Gatsby 2013 title cards",
  ],

  failureLooksLike: [
    "Pinterest 'Gatsby vibes' moodboard with one Helvetica title",
    "Pastel-pink palette claiming to be Art Deco",
    "Asymmetric modern grid with one gold accent",
  ],

  tile: "tile-artdeco",
  tileHTML: `
    <div class="rays"></div>
    <div class="word">DECO</div>
    <div class="sub">— mcmxxxii —</div>
    <div class="chev"></div>
  `,
});

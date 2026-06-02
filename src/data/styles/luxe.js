import { asFullPreset } from "./compact.js";

export const luxe = asFullPreset({
  id: "luxe",
  name: "Quiet Luxury",
  tag: "Black + gold · hushed · spacious",
  desc: "Hushed high-luxury for fashion houses, jewelry, fine hospitality. Deep charcoal/black, a single restrained gold, a fine serif, vast space, near-silence. Expensive through restraint.",
  feel: "A Loro Piana / The Row / Aman Resorts / Cartier page — almost empty, a fine serif whispering, gold used once, full-bleed imagery doing the talking. Stillness reads as money.",
  references: "The Row, Loro Piana, Aman, Cartier, Bottega Veneta, Officine Panerai, Hermès",
  boldFactor: [
    "Deep charcoal/near-black canvas with a single restrained gold (#B79B5B) — never bright",
    "A fine, elegant serif (Canela / Cormorant / Tiempos) at calm sizes — light weights, wide space",
    "Vast negative space and slow pacing — one idea per screen, nothing crowded",
    "Full-bleed imagery placeholders treated like gallery plates; minimal chrome",
    "Tiny tracked-out sans labels (uppercase, 0.2em) as the only counterpoint to the serif",
  ],
  tokens: {
    "bg":       { value: "#14110E", usage: "Near-black warm charcoal" },
    "bg-alt":   { value: "#1C1813", usage: "Section alt" },
    "fg":       { value: "#EDE7DC", usage: "Warm bone text" },
    "muted":    { value: "#9A9081", usage: "Secondary" },
    "accent":   { value: "#B79B5B", usage: "Restrained gold — once or twice" },
    "rule":     { value: "#332C22", usage: "Hairline" },
  },
  typography: {
    display: '"Cormorant Garamond", "Canela", "Tiempos Headline", Georgia, serif',
    body:    '"Inter", "Söhne", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "12/14/17/22/32/52/84",
    weight:  "display 300-400 (light, elegant) · body 400 · labels 500 tracked",
    tracking: "display tight (-0.01em) · labels very wide (0.2em) uppercase · body normal",
  },
  antiPatterns: [
    { name: "Bright gold", dont: "use saturated yellow-gold everywhere", why: "luxury gold is muted, restrained, used once — overuse reads as costume jewelry" },
    { name: "Crowding", dont: "fill the screen with sections/cards", why: "space IS the luxury signal; emptiness is the flex" },
    { name: "Bold sans display", dont: "use a heavy grotesque headline", why: "a LIGHT fine serif is the hushed-luxury register" },
    { name: "Marketing urgency", dont: "use 'Shop now / Limited time'", why: "voice is invitational and unhurried — 'Discover', 'By appointment'" },
  ],
  responsive: [
    { element: "Section padding", mobile: "64px", tablet: "112px", desktop: "168px" },
    { element: "Hero serif",      mobile: "44px",  tablet: "72px",  desktop: "84px" },
    { element: "Body",            mobile: "16px",  tablet: "17px",  desktop: "17px" },
  ],
  snippets: [
    `/* Hushed serif hero */
.display { font-family:"Cormorant Garamond",Georgia,serif; font-weight:300; font-size:clamp(44px,8vw,84px); letter-spacing:-.01em; line-height:1.02; color:#EDE7DC; }
.display em { font-style:italic; }`,
    `/* Tracked-out gold label */
.label { font-family:"Inter",sans-serif; font-size:12px; letter-spacing:.2em; text-transform:uppercase; color:#B79B5B; }`,
    `/* Quiet outline CTA */
.cta { border:1px solid #B79B5B; color:#EDE7DC; background:transparent; padding:14px 28px; font-size:13px; letter-spacing:.12em; text-transform:uppercase; }`,
  ],
  successLooksLike: ["The Row site", "an Aman resort page", "a Cartier high-jewelry feature"],
  failureLooksLike: ["bright e-commerce gold everywhere", "crowded product grid", "bold sans headline", "'Limited time offer' banner"],
  overrideGlobalRules: [
    "A LIGHT fine serif + vast whitespace are the register — overrides 'avoid serif display' and any 'pack sections densely' instinct.",
  ],
  tile: "tile-premium",
  tileHTML: `<div style='height:150px;background:#14110E;display:flex;flex-direction:column;justify-content:space-between;padding:18px;font-family:Georgia,serif;color:#EDE7DC'><div style='font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#B79B5B;font-family:Inter,sans-serif'>The Maison</div><div style='font-size:34px;font-weight:300;letter-spacing:-.01em;line-height:.98'>Quiet<br/><em>luxury.</em></div><div style='font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#9A9081;font-family:Inter,sans-serif'>By appointment</div></div>`,
});

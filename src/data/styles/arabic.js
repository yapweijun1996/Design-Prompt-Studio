import { asFullPreset } from "./compact.js";

export const arabic = asFullPreset({
  id: "arabic",
  name: "Arabic / Gulf Luxury",
  tag: "RTL · gold · geometric",
  desc: "RTL layout. Arabic + Latin co-typography. Deep emerald / sand / gold. Geometric pattern accents. Emaar / Aramco / Qatar Museums register.",

  feel: "Browsing a Gulf luxury developer's site (Emaar / Diriyah) — RTL, generous, golden, the Arabic typography commands the page — not an English site with Google-translated Arabic bolted on.",

  references: "emaar.com, qm.org.qa (Qatar Museums), diriyah.sa, neom.com, qatarairways.com (AR), aramco.com, mohamedbinrashid.ae, louvreabudhabi.ae",

  boldFactor: [
    "RTL (direction: rtl) layout as the primary direction — Latin embedded LTR within",
    "Arabic typography first (29LT Adir, Boutros, Aref Ruqaa, GE SS Arabic), Latin secondary (Söhne / Helvetica)",
    "Deep emerald / midnight blue + sand / cream + champagne gold — never garish",
    "Islamic geometric patterns as subtle backdrop motif (8-point star, muqarnas, arabesque)",
    "Generous spacing + serif-equivalent calligraphic weight in display Arabic",
    "Bilingual headings: Arabic dominant (top, larger), English subhead (below, smaller)",
    "Photography of architecture (mosques, palaces, modern skylines) — never stock people",
  ],

  tokens: {
    "bg":      { value: "#FBF8F1", usage: "Sand cream" },
    "bg-alt":  { value: "#F0E9D8", usage: "Section alt — desert" },
    "fg":      { value: "#0F2A2A", usage: "Deep emerald ink" },
    "muted":   { value: "#6B7770", usage: "Caption muted green-grey" },
    "gold":    { value: "#B8923D", usage: "Champagne gold — accents, rules" },
    "deep":    { value: "#0A2840", usage: "Midnight blue alt accent" },
    "rule":    { value: "#D8CFB8", usage: "Hairline gold-grey rule" },
  },

  typography: {
    display: '"29LT Adir", "Boutros Modern", "Aref Ruqaa", "Noto Naskh Arabic", "GE SS Two", serif',
    body:    '"GE SS Two", "Noto Sans Arabic", "Cairo", "Söhne", "Inter", system-ui',
    mono:    '"JetBrains Mono", monospace',
    scale:   "12/14/16/18/22/32/48/72",
    weight:  "display Arabic 400-700 (calligraphic) · body 400 · Latin embedded normal",
    tracking: "Arabic open · Latin normal · bidi awareness throughout",
  },

  antiPatterns: [
    { name: "LTR layout",         dont: "force LTR with Arabic translated text", why: "Arabic-first sites MUST be dir='rtl'; mirrored layout is a baseline requirement" },
    { name: "Latin-only display", dont: "use only Latin display fonts with Arabic body", why: "Arabic display calligraphy (Adir, Ruqaa) is the cultural register" },
    { name: "Garish neon palette", dont: "use saturated brand colors", why: "Gulf luxury is restrained: emerald, sand, gold; bright reads as cheap" },
    { name: "Stock business people", dont: "use Western corporate stock imagery", why: "Architecture, geometric pattern, and considered photography fit the register" },
    { name: "Mirrored icons",      dont: "leave directional icons LTR (arrows, chevrons)", why: "In RTL, arrows reverse — 'next' arrow points LEFT, not right" },
  ],

  responsive: [
    { element: "Section padding", mobile: "32px",  tablet: "64px",  desktop: "96px" },
    { element: "Display Arabic",  mobile: "44px",  tablet: "56px",  desktop: "72px" },
    { element: "Body measure",    mobile: "100%",  tablet: "60ch",  desktop: "64ch" },
  ],

  snippets: [
    `/* RTL document */
html { direction: rtl; }
html[lang="en"], .ltr-embed { direction: ltr; }

/* Latin text embedded inside RTL flows */
.ltr-inline { direction: ltr; unicode-bidi: embed; }`,
    `/* Bilingual heading stack */
.ar-heading { font-family: "29LT Adir", "Aref Ruqaa", "Noto Naskh Arabic", serif; font-weight: 500; font-size: 72px; line-height: 1.3; color: #0F2A2A; letter-spacing: 0; }
.ar-heading + .en-subhead { font-family: "Söhne", "Inter", sans-serif; font-weight: 400; font-size: 16px; letter-spacing: 0.18em; text-transform: uppercase; color: #B8923D; margin-top: 12px; direction: ltr; }`,
    `/* Geometric pattern backdrop */
.geo-pattern {
  background-color: #FBF8F1;
  background-image:
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><g fill="none" stroke="%23B8923D" stroke-width="0.5" opacity="0.18"><polygon points="40,8 56,24 56,56 40,72 24,56 24,24"/><polygon points="40,16 50,28 50,52 40,64 30,52 30,28"/></g></svg>');
  background-size: 80px 80px;
}`,
    `/* Gold hairline divider */
.gold-rule { height: 1px; background: linear-gradient(90deg, transparent, #B8923D, transparent); margin: 48px 0; }`,
  ],

  successLooksLike: [
    "emaar.com Burj Khalifa landing page",
    "qm.org.qa Qatar Museums exhibition page",
    "neom.com bilingual hero",
    "louvreabudhabi.ae visit page",
  ],

  failureLooksLike: [
    "English site with Google-translated Arabic dropped in (LTR + bad fonts)",
    "Garish neon Gulf-real-estate stock template",
    "Mirrored layout but arrows still pointing the wrong way",
  ],

  overrideGlobalRules: [
    "dir='rtl' on root is mandatory for Arabic-primary sites — overrides default LTR.",
    "Arabic-first typography (display + body) is the register — overrides any single-font-family Latin guidance.",
    "Directional icons (chevrons, arrows) must be horizontally mirrored — overrides default icon orientation.",
  ],

  tile: "tile-arabic",
  tileHTML: `
    <div class="brow">EMAAR · QATAR · 2026</div>
    <div class="word">المستقبل</div>
    <div class="sub">The Future Begins Here</div>
    <div class="rule"></div>
    <div class="cta">اكتشف →</div>
  `,
});

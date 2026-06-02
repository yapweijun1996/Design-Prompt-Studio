// Region / Culture axis — a composable layer applied ON TOP of any base style,
// exactly the way density/drama/motion (modifiers.js) are. This is the answer to
// "culture is hardcoded": instead of N monolithic culture styles, ONE axis that
// multiplies across all base styles (restaurant × Peranakan, cafe × Vietnam, …).
//
// Design mirrors moods.js: internally these are rich cues, but the user picks ONE
// named, coherent cultural identity — not a Country × Heritage matrix (which would
// produce nonsense like USA × Peranakan and force a validity grid).
//
// THE QUALITY BAR (generalized from chinese.js: "not a Western news template with
// Chinese text dropped in"). A locale is FIVE things, never folklore clip-art:
//   1. Type & script system   — the highest-impact, most verifiable lever (fonts first)
//   2. Colour semantics       — culturally-meaningful palette, not random hex / primary RGB
//   3. Motif as TEXTURE only  — borders / dividers / accents, never full-bleed wallpaper
//   4. Copy register          — language, honorifics, voice
//   5. Real local-brand refs  — so the output is daily-usable branding, not a museum piece
// Each locale therefore carries explicit ANTI-STEREOTYPE rules. The best cultural
// design is restrained and modern.
//
// `override`             → injected as a <cultural-context> block in the assembled prompt.
// `overrideGlobalRules`  → merged into the prompt's STYLE-LEVEL OVERRIDES so the locale's
//                          fonts legally beat the global "avoid Inter/Roboto/Arial" rule.

export const LOCALE_PRESETS = [
  {
    id: "default",
    name: "American / Western",
    region: "Default",
    tag: "Inter · LTR · English",
    desc: "The current hidden default, made explicit. Sans-first, LTR, US English.",
    override: "", // empty = no <cultural-context> block = today's behaviour, unchanged
    overrideGlobalRules: [],
  },

  {
    id: "english-trad",
    name: "English · Traditional",
    region: "Western",
    tag: "Heritage · serif · Savile Row",
    desc: "British heritage register — established, understated, NOT Silicon-Valley sans.",
    override: `**CULTURAL CONTEXT — ENGLISH (traditional / heritage)**
This must read as established British heritage (Savile Row / a centuries-old house), NOT a US tech startup:
- TYPE: a classic English serif — Caslon, Baskerville, Garamond, or "Times". A grotesque only for fine labels. NEVER Inter/Helvetica as the voice.
- Palette: racing green, oxblood, navy, brass/gold on cream or off-white. Restrained, no neon.
- Motif as texture only: fine hairline rules, an engraved/letterpress feel, discreet heraldic or monogram marks — never large decorative crests as wallpaper.
- Copy register: understated and assured — "Est. 1887", "By appointment", "Purveyors of…". No exclamation-mark marketing.
- Real references: Fortnum & Mason, The Economist, Penguin Classics, Wimbledon, Savile Row tailoring, Burberry heritage.
ANTI-STEREOTYPE: not Union-Jack bunting, not "keep calm" parody — quiet authority, not costume.`,
    overrideGlobalRules: [
      `A classic English serif (Caslon / Baskerville / Garamond) IS the register — overrides the global "avoid serif body / avoid Inter" defaults.`,
    ],
  },

  {
    id: "malay",
    name: "Malaysian · Malay",
    region: "SE Asia",
    tag: "Melayu · songket · Islamic-restrained",
    desc: "Bahasa Melayu register, Islamic geometric restraint, songket as accent.",
    override: `**CULTURAL CONTEXT — MALAYSIAN MALAY**
Authentically Malay/Malaysian, not a Western template with a batik border bolted on:
- TYPE: a clean humanist sans for body; for headings you MAY pair Jawi (use "Noto Naskh Arabic") as a bilingual accent. Support Bahasa Melayu spelling fully.
- Palette: songket gold + deep emerald/teal + royal maroon on warm neutral; or Merdeka tones. Rich but not garish.
- Motif as texture only: songket/tenun weave or Islamic geometric (girih) as borders, dividers, footer bands — strictly geometric, never figurative; a wau (kite) line as a light accent.
- Copy register: Bahasa Melayu — "Selamat Datang", honorifics Encik / Puan / Tuan / Datuk; halal-aware tone.
- Real references: PETRONAS, Maybank, AirAsia, Astro, Royal Selangor, Batik Boutique; festive: Hari Raya Aidilfitri.
ANTI-STEREOTYPE: no figurative/religious imagery used as decoration, no pork/alcohol cues in a halal context, songket as ACCENT not full-bleed wallpaper.`,
    overrideGlobalRules: [
      `Jawi headings may use "Noto Naskh Arabic" and the body a humanist sans — overrides the global "avoid common sans" rule for legibility of Bahasa Melayu.`,
    ],
  },

  {
    id: "peranakan",
    name: "Peranakan / Nyonya",
    region: "SE Asia",
    tag: "娘惹 · 南洋 · tile pastels",
    desc: "Straits-Chinese fusion — jade & gold, Nyonya pastels, tile motif as texture.",
    override: `**CULTURAL CONTEXT — PERANAKAN / NYONYA (Straits-Chinese)**
Authentically Peranakan heritage-boutique, not a tourist souvenir:
- TYPE: a refined serif for display; if bilingual, pair with "Noto Serif SC". Generous spacing, boutique restraint.
- Palette: emerald/jade base with soft Nyonya pastels (rose, turquoise) and gold hairline accents on cream — NOT primary RGB.
- Motif as texture only: Peranakan tile patterns (peony, phoenix) as section dividers / card borders / a footer band — never full-bleed wallpaper or clip-art stickers.
- Copy register: warm, heritage, family-recipe voice — "since 1950", "resepi nenek", "fourth-generation" — never loud marketing.
- Real references: Nyonya kitchens of Penang & Melaka, The Blue Mansion, kebaya boutiques, Kim Choo, Baba House.
ANTI-STEREOTYPE: tiles are an ACCENT; big saturated red/green = generic "Asian", not the Nyonya pastel palette.`,
    overrideGlobalRules: [
      `A refined serif display (paired with "Noto Serif SC" when bilingual) IS the register — overrides the global "avoid serif body" guidance.`,
    ],
  },

  {
    id: "chinese",
    name: "Chinese · Overlay",
    region: "East Asia",
    tag: "宋体 · 留白 · 中国红",
    desc: "Light Chinese overlay (Songti + ink + restraint) droppable onto ANY base style.",
    override: `**CULTURAL CONTEXT — CHINESE (overlay)**
A light Chinese register applied on top of the chosen base style (distinct from the standalone "Chinese Editorial" base style — this one composes onto saas / cafe / shop / etc.):
- TYPE: Songti (宋体) — "Noto Serif SC" / "Source Han Serif" — for headings and long text, with line-height ≥ 1.7. Hei (黑体) only for small UI labels.
- Palette: sumi ink + paper cream + a single 中国红 (#A6242C) used 1–2× per view; generous 留白 (negative space).
- Motif as texture only: a vermilion seal/stamp mark, a hairline rule, restrained spacing — never dragons/lanterns as clip-art.
- Copy register: measured, not marketing-loud; Simplified or Traditional consistent to the target region.
- Real references: 端傳媒, 故宫文创, 方所 bookstore, 小米 (modern restraint), 茶颜悦色.
ANTI-STEREOTYPE: not a Western template with translated text dropped in; Hei is not the editorial body face.`,
    overrideGlobalRules: [
      `Songti ("Noto Serif SC" / "Source Han Serif") with line-height ≥ 1.7 IS the register — overrides tighter Latin defaults and the "avoid serif body" rule.`,
    ],
  },

  {
    id: "vietnam",
    name: "Vietnamese · Modern",
    region: "SE Asia",
    tag: "Việt · lacquer red · lotus",
    desc: "Modern Vietnam — correct diacritic font is rule #1; lacquer red, gold, lotus.",
    override: `**CULTURAL CONTEXT — VIETNAMESE (modern)**
Modern Vietnamese brand, not folkloric:
- TYPE IS RULE #1: use "Be Vietnam Pro" (or another font with FULL Vietnamese diacritic coverage). Western fonts mangle ẫ / ờ / ệ / ữ — an instant "fake" tell.
- Palette: lacquer red + gold + lotus pink, restrained and modern (think The Coffee House / Momo), not festival-poster loud.
- Motif as texture only: lotus or Đông Sơn bronze-drum line work as a minimal accent — NO conical-hat / rice-paddy tourist clichés.
- Copy register: natural Vietnamese with correct tone marks throughout.
- Real references: The Coffee House, Momo, Viettel, Tiki, VNG, Highlands Coffee; festive: Tết.
ANTI-STEREOTYPE: broken diacritics or Latin-only text is the #1 failure; conical hats are a cliché — use modern restraint.`,
    overrideGlobalRules: [
      `"Be Vietnam Pro" (full Vietnamese diacritic coverage) is REQUIRED — overrides the global "avoid common sans" rule; diacritic fidelity beats it.`,
    ],
  },

  {
    id: "singapore",
    name: "Singapore · Multiracial",
    region: "SE Asia",
    tag: "CMIO · multilingual · clean",
    desc: "Multicultural Singapore — neutral modern base, multilingual toggle, no single culture dominant.",
    override: `**CULTURAL CONTEXT — SINGAPORE (multiracial)**
Singapore's multicultural register — clean, modern, balanced across CMIO (Chinese / Malay / Indian / Others), never one culture as "the" look:
- TYPE: a clean neutral sans that renders Latin + 中文 + Tamil + Jawi (the "Noto Sans" family is the safe multilingual choice). Offer a language toggle EN / 中文 / Melayu / தமிழ் where content is public-facing.
- Palette: modern neutral (white / slate) with measured accents; heartland warmth for HDB/community contexts, or crisp gov-tech blue for civic services.
- Motif as texture only: restrained, balanced multicultural cues — never elevate one race's motif as the national symbol.
- Copy register: clear Singapore English; "lah/leh" only for deliberately casual consumer brands, never for civic/finance.
- Real references: DBS, Singtel, Singapore Airlines, GovTech / Singpass, gov.sg, Grab; payments: PayNow. Festive calendar spans CNY + Hari Raya + Deepavali.
ANTI-STEREOTYPE: don't pick one community's ornament to mean "Singapore"; keep the CMIO balance and lead with clean modern restraint.`,
    overrideGlobalRules: [
      `The "Noto Sans" family is the deliberate multilingual choice (Latin + 中文 + Tamil + Jawi) — overrides the global "avoid common sans" rule.`,
    ],
  },

  {
    id: "tamil",
    name: "Tamil / Indian",
    region: "South Asia",
    tag: "தமிழ் · kolam · Deepavali",
    desc: "Tamil/Indian register — proper Tamil font, kolam line work, festive jewel tones.",
    override: `**CULTURAL CONTEXT — TAMIL / INDIAN**
Authentically Tamil/Indian, warm and festive without being chaotic:
- TYPE: "Noto Sans Tamil" / "Noto Serif Tamil" for Tamil, paired with a clean Latin face. Full Tamil glyph coverage is mandatory — system fonts drop characters.
- Palette: jewel tones — marigold, magenta, deep red, turquoise with gold; rich but composed, not a clashing rainbow.
- Motif as texture only: kolam / rangoli line work and temple-gopuram geometry as borders, dividers, a header band — fine and symmetric, never a busy full-bleed.
- Copy register: Tamil + English bilingual; warm, hospitable, festive voice.
- Real references: Pothys, Saravana Stores, Little India (Singapore), Deepavali bazaar campaigns; festive: Deepavali, Pongal.
ANTI-STEREOTYPE: no deity imagery as decoration; kolam is a measured ACCENT, not visual noise.`,
    overrideGlobalRules: [
      `"Noto Sans Tamil" / "Noto Serif Tamil" is REQUIRED for full Tamil glyph coverage — overrides the global "avoid common sans" rule.`,
    ],
  },
];

export const LOCALE_IDS = LOCALE_PRESETS.map((l) => l.id);

export const LOCALE_BY_ID = Object.fromEntries(LOCALE_PRESETS.map((l) => [l.id, l]));

export function getLocale(id) {
  return LOCALE_BY_ID[id] || LOCALE_PRESETS[0];
}

export function localeCount() {
  return LOCALE_PRESETS.length;
}

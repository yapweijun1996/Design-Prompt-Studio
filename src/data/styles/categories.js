// Style categories — groupings for filter UX.
// With 100 base styles, a flat chip list is unusable; categories cascade into
// the secondary base-style chip group (or hide that group entirely).
//
// Category buckets:
//   creative      — polished aesthetic-driven (editorial / era / modern)      33
//   business      — B2B SaaS, corporate, professional services, verticals    24
//   commerce      — shopping, retail, marketplaces, consumer transaction     12
//   content       — media, publishing, personal, library, entertainment      15
//   institutional — civic, healthcare, education, nonprofit, hospitality     16
//   regional      — culture-specific visual languages                         4
//   experimental  — loud / niche / retro — hidden from default browse        12
//   Total:                                                                  116

export const STYLE_CATEGORIES = {
  creative: {
    id: "creative",
    name: "Creative",
    desc: "Aesthetic-driven visual languages — editorial, era, experimental",
  },
  business: {
    id: "business",
    name: "Business",
    desc: "Corporate, B2B SaaS, professional services, verticals",
  },
  commerce: {
    id: "commerce",
    name: "Commerce",
    desc: "Shopping, retail, marketplaces, transactional",
  },
  content: {
    id: "content",
    name: "Content",
    desc: "Media, publishing, personal, library, entertainment",
  },
  institutional: {
    id: "institutional",
    name: "Institutional",
    desc: "Civic, healthcare, education, nonprofit, hospitality",
  },
  regional: {
    id: "regional",
    name: "Regional",
    desc: "Culture-specific visual languages",
  },
  experimental: {
    id: "experimental",
    name: "Experimental / Retro",
    desc: "Loud, niche, or deliberately-retro looks — hidden from the default browse",
  },
};

// Styles in the "experimental" category are EXCLUDED from the default (no-category)
// browse so the loud/retro looks don't bury the polished ones. They surface only
// when the user explicitly picks the Experimental category.
export const DEFAULT_HIDDEN_CATEGORY = "experimental";

export const CATEGORY_IDS = Object.keys(STYLE_CATEGORIES);

export const STYLE_CATEGORY_MAP = {
  // creative (33) — polished / aesthetic-driven (the loud-retro ones moved to experimental)
  monochrome: "creative", brutalist: "creative", editorial: "creative", glass: "creative",
  linear: "creative", swiss: "creative", cyberpunk: "creative", newspaper: "creative",
  sketch: "creative", cottagecore: "creative", solarpunk: "creative", bauhaus: "creative",
  industrial: "creative", tropical: "creative", constructivist: "creative", swisslate: "creative",
  artdeco: "creative", cinema: "creative",
  // creative — premium modern additions (v0.5)
  vercel: "creative", stripe: "creative", apple: "creative", notion: "creative",
  aesop: "creative", bento: "creative", monzo: "creative", editoriallux: "creative",
  claymorphism: "creative", devdark: "creative", luxe: "creative", warmtech: "creative",
  aurora: "creative", spatial: "creative", playful: "creative",

  // experimental / retro (12) — loud, niche, deliberately-dated; hidden from default browse
  y2k: "experimental", memphis: "experimental", vaporwave: "experimental", pixel: "experimental",
  zine: "experimental", riso: "experimental", antidesign: "experimental", maximalist: "experimental",
  geocities: "experimental", postmemphis: "experimental", brutalmod: "experimental", lowpoly: "experimental",

  // business (24)
  corporate: "business", saas: "business", enterprise: "business", consulting: "business",
  fintech: "business", admin: "business", darkboard: "business", crm: "business",
  devtool: "business", internal: "business", hr: "business", cms: "business",
  analytics: "business", email: "business", chat: "business", bizcard: "business",
  jobs: "business", legal: "business", legalsaas: "business", construction: "business",
  agtech: "business", automotive: "business", biotech: "business",
  trust: "business",

  // commerce (12)
  marketplace: "commerce", utility: "commerce", boutique: "commerce", flash: "commerce",
  story: "commerce", delivery: "commerce", rideshare: "commerce", insurance: "commerce",
  realestate: "commerce", crypto: "commerce", bank: "commerce", dating: "commerce",

  // content (15)
  blog: "content", news: "content", podcast: "content", video: "content", docs: "content",
  portfolio: "content", agency: "content", creator: "content", resume: "content",
  music: "content", gallery: "content", bookstore: "content",
  gaming: "content", fitness: "content", maps: "content",

  // institutional (16)
  government: "institutional", academic: "institutional", medical: "institutional",
  telehealth: "institutional", nonprofit: "institutional", nonprofitgov: "institutional",
  bto: "institutional", church: "institutional", museum: "institutional",
  restaurant: "institutional", cafe: "institutional", hotel: "institutional",
  airline: "institutional", salon: "institutional", lms: "institutional", event: "institutional",

  // regional (4)
  japanese: "regional", korean: "regional", chinese: "regional", arabic: "regional",
};

// Grouped view: { categoryId: [styleId, ...] }
export const STYLE_IDS_BY_CATEGORY = (() => {
  const out = Object.fromEntries(CATEGORY_IDS.map((id) => [id, []]));
  for (const [styleId, catId] of Object.entries(STYLE_CATEGORY_MAP)) {
    if (out[catId]) out[catId].push(styleId);
  }
  return out;
})();

export function getCategoryForStyle(styleId) {
  return STYLE_CATEGORY_MAP[styleId] || null;
}

export function categoryCount(catId) {
  return STYLE_IDS_BY_CATEGORY[catId]?.length || 0;
}

// Style categories — groupings for filter UX.
// With 100 base styles, a flat chip list is unusable; categories cascade into
// the secondary base-style chip group (or hide that group entirely).
//
// Category buckets:
//   creative      — aesthetic-driven (editorial / era / experimental)        30
//   business      — B2B SaaS, corporate, professional services, verticals    23
//   commerce      — shopping, retail, marketplaces, consumer transaction     12
//   content       — media, publishing, personal, library, entertainment      15
//   institutional — civic, healthcare, education, nonprofit, hospitality     16
//   regional      — culture-specific visual languages                         4
//   Total:                                                                  100

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
};

export const CATEGORY_IDS = Object.keys(STYLE_CATEGORIES);

export const STYLE_CATEGORY_MAP = {
  // creative (30)
  monochrome: "creative", brutalist: "creative", editorial: "creative", y2k: "creative",
  glass: "creative", linear: "creative", swiss: "creative", cyberpunk: "creative",
  newspaper: "creative", memphis: "creative", sketch: "creative", vaporwave: "creative",
  cottagecore: "creative", solarpunk: "creative", bauhaus: "creative", industrial: "creative",
  pixel: "creative", tropical: "creative", constructivist: "creative", zine: "creative",
  riso: "creative", antidesign: "creative", maximalist: "creative", geocities: "creative",
  swisslate: "creative", artdeco: "creative", postmemphis: "creative", brutalmod: "creative",
  lowpoly: "creative", cinema: "creative",

  // business (23)
  corporate: "business", saas: "business", enterprise: "business", consulting: "business",
  fintech: "business", admin: "business", darkboard: "business", crm: "business",
  devtool: "business", internal: "business", hr: "business", cms: "business",
  analytics: "business", email: "business", chat: "business", bizcard: "business",
  jobs: "business", legal: "business", legalsaas: "business", construction: "business",
  agtech: "business", automotive: "business", biotech: "business",

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

// Prompt registry — combines curated (hand-written) + standard (algorithmic) tiers.
// Provides search/filter helpers and id-based lookup.

import horloge from "./curated/horloge.json" with { type: "json" };
import roughhouse from "./curated/roughhouse.json" with { type: "json" };
import stilllife from "./curated/stilllife.json" with { type: "json" };
import nova from "./curated/nova.json" with { type: "json" };
import hush from "./curated/hush.json" with { type: "json" };
import lumina from "./curated/lumina.json" with { type: "json" };
import meridian from "./curated/meridian.json" with { type: "json" };

// Region/Culture showcase cards — each pairs a base style with a locale to prove
// the axis composes (boutique×peranakan, cafe×vietnam, government×malay, …).
import peranakanBoutique from "./curated/peranakan-boutique.json" with { type: "json" };
import saigonCafe from "./curated/saigon-cafe.json" with { type: "json" };
import merdekaPortal from "./curated/merdeka-portal.json" with { type: "json" };
import pendelburyHotel from "./curated/pendelbury-hotel.json" with { type: "json" };
import deepavaliBazaar from "./curated/deepavali-bazaar.json" with { type: "json" };
import hdbHeartland from "./curated/hdb-heartland.json" with { type: "json" };
import jakartaAntar from "./curated/jakarta-antar.json" with { type: "json" };
import bangkokRimNam from "./curated/bangkok-rim-nam.json" with { type: "json" };
import tokyoStudio from "./curated/tokyo-studio.json" with { type: "json" };
import seoulToss from "./curated/seoul-toss.json" with { type: "json" };

import { generateStandardPrompts } from "./generate.js";
import { STYLE_CATEGORY_MAP, DEFAULT_HIDDEN_CATEGORY } from "../styles/categories.js";
import { STYLE_IDS } from "../styles/index.js";

// ─── Curated (tier 1) ───────────────────────────────────────────────────────
export const CURATED_PROMPTS = [
  horloge, roughhouse, stilllife, nova, hush, lumina, meridian,
  peranakanBoutique, saigonCafe, merdekaPortal, pendelburyHotel, deepavaliBazaar, hdbHeartland,
  jakartaAntar, bangkokRimNam, tokyoStudio, seoulToss,
];

// ─── Standard (tier 2) ──────────────────────────────────────────────────────
const STANDARD_PROMPTS = generateStandardPrompts();

// ─── Combined ───────────────────────────────────────────────────────────────
export const ALL_PROMPTS = [...CURATED_PROMPTS, ...STANDARD_PROMPTS];

// ─── Lookup helpers ─────────────────────────────────────────────────────────
const byId = new Map(ALL_PROMPTS.map((p) => [p.id, p]));

export function getPromptById(id) {
  return byId.get(id) || null;
}

export function getFeaturedPrompts() {
  return CURATED_PROMPTS.filter((p) => p.featured);
}

export function promptStats() {
  return {
    total: ALL_PROMPTS.length,
    curated: CURATED_PROMPTS.length,
    standard: STANDARD_PROMPTS.length,
  };
}

// ─── Available locales (Region/Culture axis present in the catalog) ──────────
// Only locales that actually tag at least one prompt, so the gallery's Culture
// filter never shows a chip that yields zero results. Excludes the implicit
// "default" (American/Western) — that's the unfiltered baseline.
export function getAvailableLocales() {
  const seen = new Set();
  for (const p of ALL_PROMPTS) {
    if (p.locale && p.locale !== "default") seen.add(p.locale);
  }
  return [...seen];
}

// Markets (Market/Region axis) present in the catalog — same contract as locales.
export function getAvailableMarkets() {
  const seen = new Set();
  for (const p of ALL_PROMPTS) {
    if (p.market && p.market !== "none") seen.add(p.market);
  }
  return [...seen];
}

// ─── Search index ───────────────────────────────────────────────────────────
const searchIndex = ALL_PROMPTS.map((p) => ({
  id: p.id,
  haystack: [
    p.name,
    p.tagline,
    p.style,
    p.pageType,
    p.brief.industry,
    p.brief.tone,
    p.brief.references,
    ...(p.industryTags || []),
  ].join(" ").toLowerCase(),
}));

/**
 * Filter prompts by query + structured filters. All filter values are optional.
 */
export function searchPrompts({ query = "", purpose = null, category = null, style = null, pageType = null, industry = null, tier = null, locale = null, market = null } = {}) {
  const q = query.trim().toLowerCase();
  return ALL_PROMPTS.filter((p) => {
    if (tier && p.tier !== tier) return false;
    if (purpose && p.purpose !== purpose) return false;
    if (category && STYLE_CATEGORY_MAP[p.style] !== category) return false;
    if (style && p.style !== style) return false;
    // Default browse hides experimental/retro styles (only shown when the user
    // explicitly picks that category or a specific experimental style).
    if (!category && !style && STYLE_CATEGORY_MAP[p.style] === DEFAULT_HIDDEN_CATEGORY) return false;
    if (pageType && p.pageType !== pageType) return false;
    if (industry && !(p.industryTags || []).includes(industry)) return false;
    // Locale = the Region/Culture axis. Standard prompts carry no locale (treated
    // as "default"); a specific-culture filter therefore surfaces the curated
    // cultural cards. "default" matches prompts with no locale set.
    if (locale) {
      const pl = p.locale || "default";
      if (pl !== locale) return false;
    }
    // Market = the Region/operating axis. Cards with no market are treated as "none".
    if (market) {
      const pm = p.market || "none";
      if (pm !== market) return false;
    }
    if (q) {
      const idx = searchIndex.find((i) => i.id === p.id);
      if (!idx?.haystack.includes(q)) return false;
    }
    return true;
  });
}

// ─── Browse ordering (interleave) ────────────────────────────────────────────
// Standard prompts are generated STYLE-MAJOR (all ~34 page-type variants of style
// A, then style B, …). Shown raw, the browse buries the polished/premium styles
// behind dozens of near-identical same-style cards (the first `aurora` card landed
// ~420 cards deep). sortForBrowse() interleaves them: curated stay pinned in front
// (a hand-picked showcase), then standard cards sort by (page-type priority, style
// index) so the first screen shows many DIFFERENT styles — premium first (STYLE_IDS
// leads with the premium tier) and landing pages before 404s. Pure reorder: same
// cards, same count, same ids — so filters, "Show more", and selection are unaffected.

// Only "what leads" matters for the first impression; the tail can fall in natural order.
const BROWSE_LEAD_PAGETYPES = ["landing", "pricing", "product", "feature-page", "case-study", "blog-post"];
const PAGETYPE_RANK = new Map(BROWSE_LEAD_PAGETYPES.map((id, i) => [id, i]));
const pageTypeRank = (id) => (PAGETYPE_RANK.has(id) ? PAGETYPE_RANK.get(id) : BROWSE_LEAD_PAGETYPES.length);
const styleRank = (id) => {
  const i = STYLE_IDS.indexOf(id);
  return i === -1 ? STYLE_IDS.length : i;
};

export function sortForBrowse(cards) {
  const curated = [];
  const standard = [];
  for (const c of cards) (c.tier === "curated" ? curated : standard).push(c);
  standard.sort((a, b) => {
    const pt = pageTypeRank(a.pageType) - pageTypeRank(b.pageType);
    if (pt !== 0) return pt;
    const st = styleRank(a.style) - styleRank(b.style);
    if (st !== 0) return st;
    // total order for the tail (non-lead page types share a rank): stable by pageType
    return a.pageType < b.pageType ? -1 : a.pageType > b.pageType ? 1 : 0;
  });
  return [...curated, ...standard];
}

// Collapse a browse result to ONE representative card per base style, turning the
// default gallery into a tight ~116-style CATALOG instead of a ~3550-variant feed.
// Curated cards are all kept (a pinned showcase); for standard cards only the first
// occurrence of each style survives. MUST run AFTER sortForBrowse so "first per
// style" is the LANDING page (rank 0) — in raw style-major generation it would be
// the 404. The gallery applies this only when no specific style is selected; picking
// a style shows that style's full page-type set (no functional loss — every combo is
// still reachable via the Style filter). Revert = stop calling this one function.
export function collapseToStyles(cards) {
  const seen = new Set();
  const out = [];
  for (const c of cards) {
    if (c.tier === "curated") { out.push(c); continue; } // keep all curated (showcase)
    if (seen.has(c.style)) continue;
    seen.add(c.style);
    out.push(c);
  }
  return out;
}

// ─── Featured rotation (hero default) ───────────────────────────────────────
/**
 * Pick the prompt to show in the gallery hero on first load.
 *  1. URL hash #p=<id> wins
 *  2. localStorage last-prompt wins
 *  3. Otherwise: weekly rotation through CURATED featured set
 */
export function pickFeaturedPrompt({ lastPromptId = null, hashPromptId = null } = {}) {
  if (hashPromptId) {
    const found = getPromptById(hashPromptId);
    if (found) return found;
  }
  if (lastPromptId) {
    const found = getPromptById(lastPromptId);
    if (found) return found;
  }
  const featured = getFeaturedPrompts();
  if (featured.length === 0) return ALL_PROMPTS[0];
  const week = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  return featured[week % featured.length];
}

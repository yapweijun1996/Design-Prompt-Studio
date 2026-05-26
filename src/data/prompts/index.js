// Prompt registry — combines curated (hand-written) + standard (algorithmic) tiers.
// Provides search/filter helpers and id-based lookup.

import horloge from "./curated/horloge.json" with { type: "json" };
import roughhouse from "./curated/roughhouse.json" with { type: "json" };
import stilllife from "./curated/stilllife.json" with { type: "json" };
import nova from "./curated/nova.json" with { type: "json" };
import hush from "./curated/hush.json" with { type: "json" };

import { generateStandardPrompts } from "./generate.js";

// ─── Curated (tier 1) ───────────────────────────────────────────────────────
export const CURATED_PROMPTS = [horloge, roughhouse, stilllife, nova, hush];

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
export function searchPrompts({ query = "", purpose = null, style = null, pageType = null, industry = null, tier = null } = {}) {
  const q = query.trim().toLowerCase();
  return ALL_PROMPTS.filter((p) => {
    if (tier && p.tier !== tier) return false;
    if (purpose && p.purpose !== purpose) return false;
    if (style && p.style !== style) return false;
    if (pageType && p.pageType !== pageType) return false;
    if (industry && !(p.industryTags || []).includes(industry)) return false;
    if (q) {
      const idx = searchIndex.find((i) => i.id === p.id);
      if (!idx?.haystack.includes(q)) return false;
    }
    return true;
  });
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

// Industry registry — the second taxonomy axis alongside page type.
//
// Why: the deep-research review (docs/RESEARCH-REVIEW.md § 3a) recommends promoting
// industry from an implied free-text field to a selectable dimension, so "Healthcare +
// Booking" or "Finance + Dashboard" compose. Page types already carry `commonIndustries`
// (ids); this registry maps those ids to display labels and provides per-page-type
// suggestions. Selecting a chip simply fills `state.brief.industry`, which already flows
// through assemblePrompt and the quality scorer — no downstream changes needed.

import { PAGE_TYPES } from "./taxonomy.js";

// Display labels for known industry ids used in taxonomy `commonIndustries`.
// Unknown ids fall back to title-cased formatting, so the registry never blocks data.
const LABELS = {
  saas: "SaaS",
  b2b: "B2B",
  b2c: "B2C",
  "consumer-app": "Consumer app",
  dtc: "DTC / e-commerce",
  ecommerce: "E-commerce",
  subscription: "Subscription",
  "developer-tools": "Developer tools",
  "marketing-agency": "Marketing agency",
  agency: "Agency",
  startup: "Startup",
  enterprise: "Enterprise",
  fintech: "Fintech",
  analytics: "Analytics",
  productivity: "Productivity",
  publishing: "Publishing",
  "open-source": "Open source",
  consultancy: "Consultancy",
  service: "Service business",
  freelance: "Freelance",
  studio: "Studio",
  personal: "Personal",
  lifestyle: "Lifestyle",
  any: "Any industry",
};

// Broad fallback set shown when a page type has few/no commonIndustries, so the user
// always has useful quick-picks regardless of which page type is selected.
const GENERAL_IDS = [
  "saas", "ecommerce", "fintech", "developer-tools", "agency",
  "healthcare", "education", "real-estate", "hospitality", "nonprofit",
];

export function industryLabel(id) {
  if (!id) return "";
  if (LABELS[id]) return LABELS[id];
  // Fallback: "real-estate" → "Real estate", "ai_tools" → "Ai tools"
  const s = String(id).replace(/[-_]+/g, " ").trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Suggested industry chips for a page type: its commonIndustries first (deduped,
 * minus the noise value "any"), then general fallbacks, capped at `limit`.
 * Returns [{ id, label }].
 */
export function suggestIndustries(pageTypeId, limit = 8) {
  const type = PAGE_TYPES[pageTypeId];
  const seen = new Set();
  const out = [];
  const push = (id) => {
    if (!id || id === "any" || seen.has(id)) return;
    seen.add(id);
    out.push({ id, label: industryLabel(id) });
  };
  (type?.commonIndustries || []).forEach(push);
  GENERAL_IDS.forEach(push);
  return out.slice(0, limit);
}

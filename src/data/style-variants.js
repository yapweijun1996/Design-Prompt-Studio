// Style variants — derived registry of (base_style × mood) presets.
// 10 base styles × 9 moods = 90 visible style preset cards.

import { STYLE_PRESETS, STYLE_IDS } from "./styles/index.js";
import { MOOD_PRESETS } from "./moods.js";

/**
 * Build a single variant card from a base style + mood pair.
 */
function buildVariant(baseId, mood) {
  const base = STYLE_PRESETS[baseId];
  if (!base) return null;
  const variantId = `${baseId}--${mood.id}`;
  const variantName = mood.id === "default"
    ? base.name
    : `${base.name} · ${mood.name}`;
  return {
    id: variantId,
    baseStyle: baseId,
    moodId: mood.id,
    name: variantName,
    tag: `${base.tag} · ${mood.name}`,
    desc: base.desc,
    feel: base.feel,
    tile: base.tile,
    tileHTML: base.tileHTML,
    // Modifier defaults baked in
    density: mood.density,
    drama: mood.drama,
    motion: mood.motion,
    // Reference fields back to base for prompt assembly
    md: base.md,
    boldFactor: base.boldFactor,
    responsive: base.responsive,
    antiPatterns: base.antiPatterns,
    snippets: base.snippets,
    overrideGlobalRules: base.overrideGlobalRules || [],
  };
}

/**
 * Full variant list — base × mood. Returns an array of variant objects.
 */
export const STYLE_VARIANTS = (() => {
  const out = [];
  for (const baseId of STYLE_IDS) {
    for (const mood of MOOD_PRESETS) {
      const v = buildVariant(baseId, mood);
      if (v) out.push(v);
    }
  }
  return out;
})();

export const VARIANT_BY_ID = Object.fromEntries(STYLE_VARIANTS.map((v) => [v.id, v]));

export function getVariant(id) {
  return VARIANT_BY_ID[id] || null;
}

export function getVariantsForBase(baseId) {
  return STYLE_VARIANTS.filter((v) => v.baseStyle === baseId);
}

export function variantCount() {
  return STYLE_VARIANTS.length;
}

/**
 * Find the variant matching a (baseStyle, density, drama, motion) tuple.
 * Used when wiring legacy state into the variant picker.
 */
export function findVariantForState(state) {
  return STYLE_VARIANTS.find(
    (v) =>
      v.baseStyle === state.style
      && v.density === state.density
      && v.drama === state.drama
      && v.motion === state.motion,
  ) || null;
}

// Algorithmic STANDARD-tier prompt generator.
// Produces ~150 prompts (5 styles × ~30 page types) with placeholder briefs that nudge
// the user toward Studio for tuning. See docs/PROMPT-GALLERY.md § 4.

import { STYLE_PRESETS, STYLE_IDS } from "../styles/index.js";
import { PAGE_TYPES } from "../taxonomy.js";

const BUILD_DATE = "2026-05-26";

// Defaults per style — short tone/references/avoid snippets used when standard prompts
// don't have a hand-tuned brief.
const STYLE_BRIEF_DEFAULTS = {
  monochrome: {
    tone: "austere, considered, restrained, scholarly",
    references: "Vogue Italia editorial, Phaidon monographs, Maison Margiela tags-as-design",
    avoid: "any color accent, rounded corners, gradient fills, generic SaaS layouts",
  },
  brutalist: {
    tone: "confrontational, alive, hand-made, joyful, defiant",
    references: "Gumroad's 2022 redesign, Cards Against Humanity homepage, Are.na UI, college punk-zine layouts",
    avoid: "tasteful gradients, soft shadows, fancy serifs (Playfair/Fraunces), subtle anything",
  },
  editorial: {
    tone: "considered, literate, slow, warm, intelligent",
    references: "Kinfolk early years, The Gentlewoman, Cereal Magazine, NYT T Magazine",
    avoid: "pure white background, sans-serif body, WordPress magazine theme widgets, center-stacked layout",
  },
  y2k: {
    tone: "hyperpop, optimistic, kitsch, electric, knowingly-nostalgic",
    references: "early-2000s iPod ads, Charli XCX Brat era, Frutiger Aero wallpapers, MSN Messenger UI",
    avoid: "Inter/Helvetica/Geist headlines, sharp button corners, hard offset shadows, tasteful restraint",
  },
  glass: {
    tone: "calm, weightless, considered, gentle, reverent",
    references: "visionOS, macOS Sonoma control center, Linear marketing, meditation app onboarding",
    avoid: "saturated colors, hard shadows, sharp corners, serif typography, opaque backgrounds",
  },
};

/**
 * Build all algorithmic STANDARD-tier prompts.
 * @returns {Array} Array of prompt-card objects.
 */
export function generateStandardPrompts() {
  const out = [];
  for (const styleId of STYLE_IDS) {
    const style = STYLE_PRESETS[styleId];
    const styleDefaults = STYLE_BRIEF_DEFAULTS[styleId];
    for (const typeId of Object.keys(PAGE_TYPES)) {
      const type = PAGE_TYPES[typeId];
      out.push({
        id: `${styleId}-${typeId}`,
        tier: "standard",
        name: `${style.name} · ${type.name}`,
        tagline: type.genericTagline,
        style: styleId,
        purpose: type.purpose,
        pageType: typeId,
        density: "default",
        drama: "confident",
        motion: "default",
        promptMode: "one-shot",
        sections: type.sections,
        stack: "html",
        outputMode: "single-file",
        industryTags: type.commonIndustries,
        brief: {
          name: "[YOUR PRODUCT NAME]",
          industry: type.genericIndustry,
          audience: "[describe in Studio — who they are, age range, what they value]",
          tone: styleDefaults.tone,
          references: styleDefaults.references,
          context: "",
          avoid: styleDefaults.avoid,
        },
        featured: false,
        createdAt: BUILD_DATE,
      });
    }
  }
  return out;
}

/**
 * Stats — useful for debug overlays / tests.
 */
export function generationStats() {
  return {
    styles: STYLE_IDS.length,
    pageTypes: Object.keys(PAGE_TYPES).length,
    total: STYLE_IDS.length * Object.keys(PAGE_TYPES).length,
  };
}

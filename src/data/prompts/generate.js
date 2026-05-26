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
  linear: {
    tone: "premium, precise, technical-minimalist, expensive-feeling, considered",
    references: "Linear, Vercel dashboard, Raycast, Arc browser, Cursor IDE, Apollo",
    avoid: "pure black backgrounds, flat dark mode, bouncy springs, colorful accents, web-2.0 gradients",
  },
  swiss: {
    tone: "formal, functional, modular, deliberate, intellectual",
    references: "Müller-Brockmann posters, Vignelli's NYC subway map, IBM 1970s, MIT Press Design",
    avoid: "serifs, centered headlines, rounded corners, more than one accent color, off-grid alignment",
  },
  cyberpunk: {
    tone: "electric, dystopian-optimistic, hacker, nocturnal, glitched",
    references: "Cyberpunk 2077 ads, Akira, Ghost in the Shell, Mr. Robot titles, Anamanaguchi cover art",
    avoid: "Inter / Helvetica headlines, light backgrounds, soft shadows, pastel accents",
  },
  newspaper: {
    tone: "broadsheet, considered, literate, civic, slow-reading",
    references: "The New York Times Sunday, The Guardian Weekend, Le Monde, NYT T Magazine print",
    avoid: "sans-serif body, pure white background, single column body, modern minimalist hero",
  },
  memphis: {
    tone: "joyful, irreverent, geometric, post-modern, primary-saturated",
    references: "Ettore Sottsass furniture, Memphis Group catalogs, Nathalie Du Pasquier textiles, Bottega Veneta SS22",
    avoid: "tasteful restraint, symmetric layouts, muted colors, single shape vocabulary",
  },
  sketch: {
    tone: "warm, hand-made, approachable, illustrative, imperfect, slow",
    references: "Oliver Jeffers picture books, Quentin Blake illustrations, Aesop letters, Field Notes notebooks",
    avoid: "perfect geometry, neon accents, sans-serif body, strict grid alignment",
  },
  vaporwave: {
    tone: "nostalgic, dreamy, ironic, 90s-mall, classical-pastiche",
    references: "Macintosh Plus Floral Shoppe, MTV bumpers 1989-1993, Japanese 1980s ads, Greek statue motifs",
    avoid: "tight letter-spacing, modern grid, hacker-neon, single-color palettes",
  },
  cottagecore: {
    tone: "warm, slow, considered, folk, handmade, unhurried",
    references: "Toast catalogs, William Morris textiles, Beatrix Potter, Anthropologie store interiors",
    avoid: "saturated colors, cool palette, sans-serif body, strict grid",
  },
  solarpunk: {
    tone: "optimistic, forward-looking, verdant, sun-warmed, regenerative",
    references: "Studio Ghibli landscapes, Allbirds brand book, Patagonia regenerative reports, community gardens",
    avoid: "dystopian palette, geometric primitives only, doom messaging, neon green",
  },
  bauhaus: {
    tone: "modernist, modular, deliberate, geometric, declarative",
    references: "Herbert Bayer typography, Moholy-Nagy compositions, Bauhaus 1923 posters, Albers' Homage to the Square",
    avoid: "display serif, pastel primaries, capitalized headlines, off-grid placement",
  },
  industrial: {
    tone: "functional, raw, weathered, mil-spec, honest",
    references: "Barbican Centre wayfinding, Carhartt catalogs, Anchor Brewing labels, factory safety signage",
    avoid: "soft rounding, pastel safety yellow, sans-serif body, pristine cleanliness",
  },
  pixel: {
    tone: "playful, retro, blocky, arcade, frame-by-frame",
    references: "Super Mario Bros (1985), Game Boy Pokemon Red, Pico-8 game jams, NES Punch-Out",
    avoid: "anti-aliased smoothness, full RGB palette, modern UI patterns (FAB / modals), smooth ease animations",
  },
  tropical: {
    tone: "warm, hospitality, sunset, considered-luxury, golden-hour",
    references: "Hôtel Esencia Tulum, Aman Tokyo, Slim Aarons photography, mid-century Acapulco postcards",
    avoid: "saturated primaries, sharp corners, cool grey palette, sans-serif display",
  },
  constructivist: {
    tone: "bold, declarative, pamphleteering, agitprop, confident",
    references: "El Lissitzky propaganda posters, Rodchenko photomontages, Stenberg Brothers film posters, Shepard Fairey OBEY",
    avoid: "more than 3 colors, humanist sans, centered symmetric layout, rounded corners",
  },
  zine: {
    tone: "DIY, raw, confidently amateur, punk, photocopied",
    references: "Sniffin' Glue 1977, Bikini Kill zines, Crass Records sleeves, early Vice magazine",
    avoid: "modern sans body, perfect grid alignment, pure white background, full-color photography",
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

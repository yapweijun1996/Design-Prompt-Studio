// Cross-cutting modifiers — applied on top of a base style.
// Ported from v0.3. Each modifier has an `override` string injected
// into the assembled prompt's CROSS-CUTTING OVERRIDES block.

export const DENSITY_LEVELS = [
  {
    id: "default",
    name: "Default",
    desc: "Style's own rhythm",
    override: "",
  },
  {
    id: "sparse",
    name: "Sparse",
    desc: "Museum walls",
    override: `**DENSITY OVERRIDE — SPARSE**
This composition values breathing room above all. Apply these adjustments on top of the base style:
- Section vertical padding: increase by 50% from base (e.g. 160px → 240px on desktop, 96px → 144px on mobile).
- Show fewer items per section (e.g. 2 feature cards instead of 4, 2 testimonials instead of 4).
- Increase gaps between elements within a section by 50%.
- Hero takes a full viewport-height (100vh) with content vertically centered, lots of whitespace above and below the headline.
- Avoid information density — short copy, large type, single focal points per section.
- The page should feel like a museum exhibit: deliberate pacing, room to think between each idea.`,
  },
  {
    id: "balanced",
    name: "Balanced",
    desc: "Default rhythm",
    override: "",
  },
  {
    id: "dense",
    name: "Dense",
    desc: "Editorial spread",
    override: `**DENSITY OVERRIDE — DENSE**
This composition values information richness. Apply these adjustments on top of the base style:
- Section vertical padding: reduce by 30% from base (e.g. 160px → 112px on desktop).
- Show more items per section (e.g. 6-8 feature cards, dense pricing comparison tables, multiple testimonials in compact form).
- Tighter gaps between elements within a section (reduce by 30%).
- Multi-column layouts wherever possible — even hero may have a two-column composition.
- Rich content: longer body copy, sub-headlines, captions, metadata, footnotes.
- The page should feel like an editorial magazine spread: dense composition where every inch is considered, not crowded.`,
  },
];

export const DRAMA_LEVELS = [
  {
    id: "default",
    name: "Default",
    desc: "Style baseline",
    override: "",
  },
  {
    id: "subtle",
    name: "Subtle",
    desc: "Dialed back",
    override: `**DRAMA OVERRIDE — SUBTLE**
Dial down the intensity of the base style:
- Reduce the maximum hero type scale by one step (e.g. 9xl → 7xl).
- Soften contrast — where the style allows, use slightly muted versions of accent colors.
- Quieter motion — reduce animation duration and amplitude by ~30%.
- Fewer decorative flourishes — skip optional decorative elements (sparkles, sticker badges, rotated cards).
- The result should feel like the same style, but speaking quietly. A whisper version. Think of it as the "Aesop product page" version of the style, even if the style is normally loud.`,
  },
  {
    id: "confident",
    name: "Confident",
    desc: "Style as designed",
    override: "",
  },
  {
    id: "loud",
    name: "Loud",
    desc: "Turned up to 11",
    override: `**DRAMA OVERRIDE — LOUD**
Dial UP the intensity of the base style. The result should feel like a magazine cover, not a product page:
- Increase the maximum hero type scale by one step (e.g. 9xl → 10xl / 11xl). Words can span multiple lines and break the container if intentional.
- Maximum contrast — use the boldest, most saturated version of every color allowed by the style.
- More motion — add page-load entrance animations, hover micro-interactions on every interactive element.
- Add ALL optional decorative elements the style allows.
- Use the largest border weights, the most extreme inversions, the most aggressive asymmetric grids.
- The result should feel like a magazine COVER — every section a statement, every headline pulling no punches.`,
  },
];

export const MOTION_LEVELS = [
  {
    id: "default",
    name: "Default",
    desc: "Style's own motion",
    override: "",
  },
  {
    id: "minimal",
    name: "Minimal",
    desc: "Near-instant only",
    override: `**MOTION OVERRIDE — MINIMAL**
Override the chosen style's motion philosophy with near-instant interactions only. Maximum 100ms transitions. No entrance animations on page load. Hover states use binary state changes (color swap, border thicken) instead of motion.`,
  },
  {
    id: "playful",
    name: "Playful",
    desc: "Entrances + micro-anim",
    override: `**MOTION OVERRIDE — PLAYFUL**
Override the chosen style's motion philosophy with rich entrance animations and hover effects. Use staggered page-load reveals (60-100ms stagger between elements). Hover effects on every interactive element. Where the base style allows, use spring/cubic-bezier easing for organic feel.`,
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────
export function getDensity(id) { return DENSITY_LEVELS.find((d) => d.id === id) || DENSITY_LEVELS[0]; }
export function getDrama(id) { return DRAMA_LEVELS.find((d) => d.id === id) || DRAMA_LEVELS[0]; }
export function getMotion(id) { return MOTION_LEVELS.find((m) => m.id === id) || MOTION_LEVELS[0]; }

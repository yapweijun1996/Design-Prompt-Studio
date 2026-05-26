// Style preset: Neo-Brutalist — raw, honest, loud. Hard offset shadows + primary saturated colors.

export const brutalist = {
  id: "brutalist",
  name: "Neo-Brutalist",
  tag: "Raw · honest · loud",
  desc: "Thick borders. Hard offset shadows. Primary colors. Helvetica. Deliberately ugly.",

  feel: "A college punk-zine made by someone who didn't ask permission — not a SaaS landing page wearing a costume.",

  boldFactor: [
    "Thick 3-4px+ black borders on every container — borders ARE the design",
    "Hard offset shadows: 4-8px x/y, ZERO blur, solid black (or accent)",
    "Saturated primary palette — yellow, orange, blue, pink, mint; never pastel, never muted",
    "Helvetica / Inter Tight 700-900 only — NO Playfair, NO Fraunces, NO serif",
    "Buttons translate-down on hover (physical-press metaphor)",
    "Cream-white background (#FFFEEC) — never pure white",
  ],

  antiPatterns: [
    { name: "Soft rounding", dont: "use 12-16px border-radius on cards", why: "Brutalist is binary: 0px sharp OR full pill — middle ground reads as generic 'modern playful'" },
    { name: "Gradient fills", dont: "use any gradient — backgrounds, buttons, accents", why: "Solid accent flood IS the language; gradients soften the confrontational quality" },
    { name: "Fancy serif headlines", dont: "use Playfair / Fraunces / display serifs", why: "Helvetica/Inter Tight Heavy is the typographic DNA — serifs read as 'editorial' not 'brutalist'" },
    { name: "Subtle shadows", dont: "use 0 8px 24px rgba(0,0,0,0.1) elevation shadows", why: "Hard offset zero-blur IS the shadow language — subtle elevation is the enemy" },
    { name: "Tasteful restraint", dont: "use a single accent color with mostly white", why: "2-3 saturated accents unapologetically — restraint reads as cowardice in this style" },
  ],

  responsive: [
    { element: "Section padding", mobile: "60px", tablet: "80px", desktop: "120px" },
    { element: "Hero type", mobile: "text-5xl (56px)", tablet: "text-6xl (72px)", desktop: "text-8xl (128px)" },
    { element: "Border weight", mobile: "3px", tablet: "3px", desktop: "4px" },
    { element: "Shadow offset", mobile: "4px 4px", tablet: "6px 6px", desktop: "8px 8px" },
    { element: "Container max-width", mobile: "100%", tablet: "100%", desktop: "1100px" },
  ],

  snippets: [
    `box-shadow: 6px 6px 0 #000; /* default — hard offset, zero blur */`,
    `transform: translate(3px, 3px); box-shadow: 3px 3px 0 #000; /* hover: physical press */`,
    `transform: rotate(-2deg); /* at least one rotated element per page */`,
    `background: #FFFE00; color: #000; border: 3px solid #000; box-shadow: 4px 4px 0 #FF5C00; /* layered accent shadow */`,
  ],

  overrideGlobalRules: [
    "Cream-white #FFFEEC body background is REQUIRED — overrides default-to-pure-white visual default.",
    "Hand-drawn arrows / asterisks / squiggles AS SVG are encouraged here — overrides global 'no SVG-drawn imagery' rule (these are typographic ornaments, not pretending to be photography).",
  ],

  tile: "tile-brutalist",
  tileHTML: `
    <div class="top">RAW · v.04</div>
    <div class="big">YEAH<br/>RAW.</div>
    <div class="btn">CLICK ME →</div>
  `,

  md: `# Design Style: Neo-Brutalist

## 1. Philosophy

**Core principle**: Honesty over polish. Raw structure exposed. Imperfection celebrated. The design admits it's a digital interface, doesn't try to be a "premium experience." Joy through directness, not refinement.

**Vibe** (10 keywords): Confrontational, Loud, Anti-corporate, Hand-made, Primitive, Joyful, Defiant, Web-native, Post-ironic, Alive.

**Real-world references**: Gumroad's 2022 redesign, Cards Against Humanity website, Mailchimp's "Frederick" era, brutalist concrete architecture (Barbican Centre, Trellick Tower), 90s GeoCities done knowingly, Are.na's UI, Cash App's app icon era.

**Origin & lineage**: 1950s Swiss design with the politeness removed + 1990s amateur web design rediscovered + Memphis Group color confidence + modern post-ironic web aesthetics (2020-2024).

### What this design is NOT (anti-patterns)
- ❌ Refined, soft, or gradient-based — the enemy
- ❌ "Premium feeling" or luxury — luxury is a lie this style refuses
- ❌ Accidentally ugly — this is DELIBERATELY ugly with discipline
- ❌ Generic Stripe-clone with one yellow button bolted on
- ❌ Memphis-style 80s pastels — this uses primary SATURATED colors
- ❌ Y2K Maximalist — that's iridescent and bubbly; this is flat and chunky

## 2. DNA

1. **Thick black borders everywhere.** 3-4px minimum. Borders ARE the design.
2. **Hard offset drop shadows.** Solid color, zero blur, 4-8px x/y offset.
3. **Primary saturated color palette.** Yellow, orange, blue, pink, mint — never pastel, never muted.
4. **System fonts or Helvetica.** Helvetica Black, Arial Black, Inter Tight Heavy.
5. **Visible structure.** Borders make every container an obvious box.
6. **Buttons that LOOK clickable.** Heavy 3D affordance via shadow offset.
7. **Format honesty.** A form looks like a form. A list looks like a list.

## 3. Tokens

| Token | Value | Usage |
|:------|:------|:------|
| --bg | #FFFEEC | Cream-white (NEVER pure #FFFFFF) |
| --fg | #000000 | Pure black |
| --accent-yellow | #FFFE00 | Hero accent |
| --accent-orange | #FF5C00 | Hot accent |
| --accent-blue | #0066FF | Cool accent |
| --accent-pink | #FF6BAA | Soft accent |
| --accent-mint | #A6FAFF | Cool accent |

Use 2-3 accents per page, never all five. Choose one dominant + one secondary.

### Typography
- Display: "Inter Tight", "Helvetica Neue", "Arial Black", system-ui
- Body: same family
- Mono: "Courier New", "JetBrains Mono"

NO Google fancy serif fonts. Helvetica/Inter family ONLY.

**Scale**: 14/16/18/24/32/48/72/96/128. Bigger is better.
**Weight**: headlines 800-900.
**Tracking**: display -0.04em · body normal · uppercase labels 0.08em.

### Border radius
Binary: **0px sharp** OR **9999px full pill**. No middle ground.

### Borders
2-6px solid #000. Always pure black. Never gray, never colored.

### Shadows
\`box-shadow: 4-8px 4-8px 0 #000;\` Hard offset only. Zero blur. Zero spread.

### Textures
Optional dot grid, halftone, or solid accent flood fills. NO subtle noise. NO gradients.

## 4. Components

**Primary button**: \`background: var(--accent-yellow); color: #000; border: 3px solid #000; box-shadow: 6px 6px 0 #000; padding: 16/28; font: 700 18px Inter Tight; text-transform: uppercase;\`
Hover: \`transform: translate(3px, 3px); box-shadow: 3px 3px 0 #000;\` Active: fully pressed.

**Card**: bg accent-color OR white · 3-4px black border · 8px 8px 0 #000 shadow · padding 24-32 · optional rotation -2° to +4°.

**Input**: white bg · 3px black border · 4px 4px 0 #000 shadow · focus: shadow vanishes, border becomes accent color.

## 5. Layout

Container max-width 1100px. Section padding 80-120px. **No horizontal rules between sections** — each section is its own bordered/colored block. Aggressive asymmetry. At least one rotated element per page (-2° to +4°).

## 6. Motion

**Philosophy**: Snappy and physical. 80-150ms.

**Hover**: buttons/cards translate down-right by shadow offset and shadow shrinks — replicates physical press.

**Focus** (REQUIRED): 3px solid accent-color outline OUTSIDE element border, no offset.

**Forbidden**: subtle fades, smooth easing, opacity transitions, parallax.

## 7. Enforcement (NON-NEGOTIABLE)

1. **CRITICAL**: every interactive element has hard offset shadow (zero blur, zero spread). **Why-failure**: soft shadows break the physical-button metaphor — the whole language depends on visible offset.
2. Every major section uses at least one saturated accent color as flood fill.
3. Buttons translate on hover replicating physical press.
4. Minimum 3px black borders on cards/buttons/inputs.
5. **CRITICAL**: headlines use Helvetica/Inter Tight 700-900. **Why-failure**: any serif headline reads as editorial, breaking the brutalist identity in one element.
6. At least one rotated element per page (-2° to +4°).
7. Cream-white #FFFEEC background, never pure #FFFFFF.
8. Solid accent color blocks, never gradients.
9. Buttons are sharp 0px OR fully pill — binary, never "soft rounded".
10. 2-3 accent colors per page, used unapologetically.
11. Inverted sections invert FULLY (bg + text + accents), no half-measures.
12. Footer is its own brutal block — accent flood, thick border, oversized type.

### What success looks like
- A Gumroad creator page
- A college punk-zine
- A 1960s Swiss poster made by someone who didn't ask permission
- Cards Against Humanity homepage

### What failure looks like
- Minimalism with a yellow button bolted on
- "Modern playful" anything from a SaaS
- Smooth rounded corners on cards (12-16px)
- Gradients of any kind
- Anything using Playfair, Fraunces, or another fancy serif`,
};

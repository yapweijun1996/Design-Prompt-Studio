// Style preset: Y2K Maximalist — chrome, iridescent, joyful Frutiger Aero revival.

export const y2k = {
  id: "y2k",
  name: "Y2K Maximalist",
  tag: "Chrome · iridescent · joyful",
  desc: "Iridescent gradients. Chunky display. Sparkles. Pills. Frutiger Aero energy.",

  feel: "An early-2000s iPod ad come to life — not a 2024 SaaS site with one gradient bolted on.",

  boldFactor: [
    "Iridescent gradients on surfaces (buttons, cards, or text fills) — multi-stop, multi-color",
    "Chunky display font with CHARACTER — Bagel Fat One, Tan Pearl. Never Inter / Helvetica",
    "Chrome-effect surfaces (silver-to-blue or oil-slick rainbow)",
    "Pill-rounded buttons (border-radius: 9999px) — sharp corners FORBIDDEN",
    "Sparkle / star decorations (✦ ✧ ⊹) placed at intentional ±5-8° rotations",
    "Soft glow shadows — hard offset shadows are Brutalist territory",
    "Atmospheric body background with gradient orbs",
  ],

  antiPatterns: [
    { name: "Sharp corners on buttons", dont: "use border-radius < 16px on buttons", why: "Pill or 16-32px rounding IS the Y2K signature — sharp reads as Brutalist" },
    { name: "Hard offset shadows", dont: "use box-shadow with 0 blur", why: "Soft glow shadows are the language — hard offset belongs to Brutalist" },
    { name: "Monochrome palette", dont: "use 1-2 colors total", why: "Multi-color saturated celebration IS the style — restraint reads as Glassmorphism" },
    { name: "Inter / Helvetica headlines", dont: "use neutral system fonts for display type", why: "Display fonts with CHARACTER are non-negotiable; neutral type kills the era reference" },
    { name: "Pure black text", dont: "use #000000 for foreground", why: "Use deep purple-black #1A0B2E for warmth — pure black breaks the optimistic-tech feel" },
  ],

  responsive: [
    { element: "Section padding", mobile: "60px", tablet: "80px", desktop: "120px" },
    { element: "Hero type", mobile: "text-6xl (72px)", tablet: "text-7xl (96px)", desktop: "text-8xl (128px)" },
    { element: "Glow blur", mobile: "16px", tablet: "24px", desktop: "32px" },
    { element: "Border radius (cards)", mobile: "16px", tablet: "20px", desktop: "24px" },
    { element: "Container max-width", mobile: "100%", tablet: "100%", desktop: "1200px" },
  ],

  snippets: [
    `--iridescent: linear-gradient(135deg, #FF00C8, #9B5DE5, #00F0FF, #C9FF00);`,
    `--chrome: linear-gradient(180deg, #E8E8F5, #9999B3, #E8E8F5);`,
    `box-shadow: 0 8px 32px rgba(155, 93, 229, 0.25), inset 0 2px 4px rgba(255,255,255,0.4);`,
    // Floating animation
    `@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
.sparkle { animation: float 4s ease-in-out infinite; }`,
    // Decorative orb on body bg
    `body::before { content: ""; position: fixed; width: 600px; height: 600px; top: -200px; right: -200px; background: radial-gradient(circle, rgba(255,0,200,0.3), transparent 60%); filter: blur(80px); z-index: -1; }`,
  ],

  overrideGlobalRules: [
    "Iridescent / chrome gradient surfaces are REQUIRED — overrides the global 'avoid aggressive gradient backgrounds' rule for this style.",
    "Display fonts with character (Bagel Fat One, Tan Pearl) are REQUIRED — overrides global 'avoid overused fonts' since the requirement IS distinctive type.",
    "Sparkle decorations (✦ ✧ ⊹ ★) are encouraged — overrides global 'no decorative SVG' rule (these are typographic symbols, not pretending to be photography).",
  ],

  tile: "tile-y2k",
  tileHTML: `
    <div class="top">⊹ NEW SEASON ⊹</div>
    <div class="word">Y2K!</div>
    <div class="pill">SHOP NOW ✦</div>
  `,

  md: `# Design Style: Y2K Maximalist

## 1. Philosophy

**Core principle**: Optimistic technological future as imagined in 1999-2003. Chrome surfaces, iridescent gradients, chunky beveled UI, pixel decorations. Joy through digital excess. Permission to be tacky in service of feeling.

**Vibe** (10 keywords): Hyperpop, Nostalgic, Kitsch, Optimistic, Chunky, Glossy, Electric, Irreverent, Post-internet, Knowingly-tacky.

**Real-world references**: Windows XP Bliss era, MSN Messenger UI, Lisa Frank, early-2000s Vogue covers, iPod nano ads, Frutiger Aero desktop wallpapers, Heatherwick Studio's Pacific Place, Charli XCX's "365 / Brat" promo era, BLACKPINK's official site era, Apple Aqua UI (Mac OS X 10.0).

**Origin & lineage**: late-90s/early-2000s consumer tech optimism + Tumblr-era post-irony + 2020s hyperpop visual culture (PC Music, A.G. Cook) + Frutiger Aero revival movement.

### What this design is NOT (anti-patterns)
- ❌ Minimalist — opposite ideology
- ❌ Tasteful in the bourgeois sense — gloriously tacky is the goal
- ❌ Retro 80s synthwave — that's earlier, neon-on-black; this is later & chrome-on-pastel
- ❌ 90s grunge — too cynical; Y2K is optimistic
- ❌ "Vaporwave" — that's vintage Greek statues; this is shiny tech
- ❌ Neo-Brutalist — that's flat saturated colors with hard shadows; Y2K is iridescent with soft glows

## 2. DNA

1. **Chrome gradients on type.** Silver-to-blue, silver-to-pink, oil-slick rainbow effects.
2. **Iridescent surfaces.** Holographic CSS gradients on buttons, badges, cards.
3. **Chunky beveled UI.** 3D buttons with inner white highlights and outer soft shadows.
4. **Bubble shapes.** Generous border-radius. Pill buttons. Round avatars with thick borders.
5. **Multi-color accent palette.** Hot pink + cyan + lime + electric purple — all together.
6. **Pixel/sticker decorations.** Stars, sparkles, hearts, butterflies — placed unironically.
7. **Display typography with character.** Heavy display serifs or rounded geometric heavy sans.

## 3. Tokens

| Token | Value | Usage |
|:------|:------|:------|
| --bg | #FAF7FF | Cool off-white |
| --fg | #1A0B2E | Deep purple-black (NEVER pure #000) |
| --accent-magenta | #FF00C8 | Hot pink primary |
| --accent-cyan | #00F0FF | Electric cyan |
| --accent-lime | #C9FF00 | Acid lime |
| --accent-purple | #9B5DE5 | Electric purple |
| --chrome-light | #E8E8F5 | Chrome highlight |
| --chrome-dark | #4A4A6B | Chrome shadow |

**Gradients (REQUIRED)**:
- chrome: linear-gradient(180deg, #E8E8F5, #9999B3, #E8E8F5)
- iridescent: linear-gradient(135deg, #FF00C8, #9B5DE5, #00F0FF, #C9FF00)
- oil-slick: conic-gradient(#FF00C8, #9B5DE5, #00F0FF, #C9FF00, #FF00C8)

### Typography
- Display: "Bagel Fat One", "Tan Pearl", "Fraunces" weight 900
- Body: "Plus Jakarta Sans", "Sora", "DM Sans"
- Mono: "JetBrains Mono"

NO Inter. NO Geist. NO Helvetica.

**Scale**: 14/16/20/28/40/56/80/112/144.
**Weight**: display 700-900 always.
**Tracking**: display -0.02em.

### Border radius
sm 8 / md 16 / lg 24 / pill 9999 / full 50%. NEVER use 0px.

### Borders
2px solid white OR 3-4px iridescent gradient border.

### Shadows
- soft-glow: 0 8px 32px rgba(155, 93, 229, 0.25)
- strong-glow: 0 12px 48px rgba(255, 0, 200, 0.35)
- inset-bevel: inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.15)

SOFT GLOWS ONLY. Never hard shadows.

### Textures
Noise grain 0.04 opacity globally. Star/sparkle SVG decorations at intentional angles.

## 4. Components

**Primary button**: \`background: var(--iridescent); color: #fff; border-radius: 9999px; padding: 16/32; box-shadow: var(--soft-glow), inset 0 2px 4px rgba(255,255,255,0.4); font: 700 16px Bagel Fat One;\`
Hover: scale(1.05) + glow intensifies. Active: scale(0.98).

**Chrome button**: chrome gradient bg · dark text · pill or 16px radius · inset highlights for beveled look.

**Card**: white bg + 2px white border + 3px iridescent outer ring · 24px radius · glow shadow · padding 32.

**Sticker badge**: small pill or star-shape with iridescent fill · drop shadow · placed at -8° rotation.

**Input**: white bg · 2px chrome-gradient border · 12px radius · focus border becomes iridescent gradient.

## 5. Layout

Container max-width 1200px. Section padding 80-120px. Decoratively-placed absolute elements (stars, sparkles, glossy orbs) outside grid. Cards float and overlap intentionally.

## 6. Motion

**Philosophy**: Bouncy, playful, alive. Spring easing. 300-500ms.

**Hover**: buttons scale 1.05 + glow intensifies · cards lift translateY(-4px) · sticker badges rotate ±5°.

**Idle**: decorative elements float gently — 3-4s loop, 8-12px translateY drift.

**Focus** (REQUIRED): 3px solid magenta or cyan outline + 4px offset.

## 7. Enforcement (NON-NEGOTIABLE)

1. **CRITICAL**: at least one iridescent gradient surface. **Why-failure**: without it the design becomes generic gradient SaaS, not Y2K.
2. Headlines use chunky display font (Bagel Fat One, Tan Pearl). NOT Inter.
3. At least one chrome-effect surface.
4. Sparkle/star decoration elements at intentional rotations.
5. Pill-rounded buttons. Sharp corners FORBIDDEN.
6. Soft glow shadows. Hard offset shadows FORBIDDEN.
7. At least 4 distinct accent colors used somewhere on page.
8. Floating animation on at least one element.
9. Inset highlights on beveled buttons.
10. Display weight 700+ for ALL headlines.
11. **CRITICAL**: NO Inter, NO Geist, NO Helvetica. **Why-failure**: neutral system fonts kill the era reference instantly.
12. fg color NEVER pure #000.
13. Atmospheric body background with gradient orbs.
14. Buttons scale on hover, never just color-change.
15. Sticker badges as floating decorations (not in content grid).

### What success looks like
- An early-2000s iPod ad
- A Charli XCX album promo page (Brat era)
- A Frutiger Aero desktop wallpaper come to life
- A K-pop group's official album site

### What failure looks like
- A generic gradient SaaS landing page
- "Modern playful" startup site with one gradient button
- Anything using Inter or Geist
- Sharp corners on buttons (instant disqualification)
- Hard offset shadows (Brutalist territory)`,
};

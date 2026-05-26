// Style preset: Soft Glassmorphism — ethereal, weightless, frosted glass on pastel gradient.

export const glass = {
  id: "glass",
  name: "Soft Glassmorphism",
  tag: "Ethereal · weightless",
  desc: "Frosted glass panels. Pastel atmospheric gradient. visionOS-meets-Linear.",

  feel: "A visionOS app or macOS Sonoma's Control Center — not a SaaS dashboard with one frosted nav bar bolted on.",

  boldFactor: [
    "Atmospheric multi-stop gradient on body — the gradient IS the foundation, never absent",
    "Frosted glass panels via backdrop-filter blur(20px) saturate(180%) — minimum 3 per page",
    "Pastel accent palette only (lightness ≥ 70%) — never saturated",
    "Border radius ≥ 12px on cards, pill on buttons — sharp corners FORBIDDEN",
    "Soft blurred shadows only, opacity ≤ 0.08 — hard shadows FORBIDDEN",
    "Modern geometric sans only (Inter Tight / Geist / General Sans) — no serif",
  ],

  antiPatterns: [
    { name: "Solid section backgrounds", dont: "use opaque colored sections that block the body gradient", why: "The atmosphere must remain visible — opaque overlays defeat the entire style" },
    { name: "Hard shadows", dont: "use box-shadow with sharp offsets or opacity > 0.08", why: "Soft glow at 0.06-0.08 IS the elevation language; hard shadows read as Brutalist" },
    { name: "Sharp corners", dont: "use border-radius < 12px", why: "Glass needs rounded edges to feel like physical panels, not rectangles" },
    { name: "Serif typography", dont: "use any serif font", why: "Glass is contemporary digital — serif breaks the future-tech feel" },
    { name: "Saturated colors", dont: "use #FF0000 or any < 70% lightness color", why: "Pastel discipline IS the calm; saturated colors break the weightless quality" },
  ],

  responsive: [
    { element: "Section padding", mobile: "60px", tablet: "100px", desktop: "140px" },
    { element: "Hero type", mobile: "text-4xl (40px)", tablet: "text-5xl (56px)", desktop: "text-7xl (96px)" },
    { element: "Blur amount", mobile: "16px", tablet: "20px", desktop: "24px" },
    { element: "Container max-width", mobile: "100%", tablet: "100%", desktop: "1200px" },
  ],

  snippets: [
    // Body gradient (REQUIRED)
    `body {
  background:
    radial-gradient(at 20% 10%, #CBA6F7 0%, transparent 50%),
    radial-gradient(at 80% 30%, #89B4FA 0%, transparent 50%),
    radial-gradient(at 50% 90%, #F5C2E7 0%, transparent 50%),
    #FAFAFE;
}`,
    // Glass card
    `.glass {
  background: rgba(255,255,255,0.55);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255,255,255,0.55);
  border-radius: 16px;
  box-shadow: 0 8px 40px rgba(30,27,46,0.06);
}`,
    // Drifting orb
    `.orb { position: fixed; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(203,166,247,0.4), transparent 70%); filter: blur(40px); animation: drift 60s linear infinite; }`,
  ],

  overrideGlobalRules: [
    "Multi-stop atmospheric gradient body background is REQUIRED — overrides the global 'avoid aggressive gradient backgrounds' rule (atmosphere IS the foundation here, not decoration).",
  ],

  tile: "tile-glass",
  tileHTML: `
    <div class="panel">
      <div class="eyebrow">✦ ESSENCE</div>
      <div class="word">Glass.<br/>Calmed.</div>
      <div class="btn">Continue →</div>
    </div>
  `,

  md: `# Design Style: Soft Glassmorphism

## 1. Philosophy

**Core principle**: Light as material. Translucent panels float over atmospheric gradient skies. Depth via blur and transparency, not shadow weight. The interface is calm, considered, breathable.

**Vibe** (10 keywords): Calm, Weightless, Optimistic, Premium-soft, Contemporary, Atmospheric, Fresh, Gentle, Considered, Reverent.

**Real-world references**: Apple visionOS, macOS Big Sur/Sonoma control center, Stripe's gradient headers (calmed down), Linear's app aesthetics, Apple Music UI, Korean app design (Toss, Kakao), meditation apps (Calm, Headspace), Loftie alarm clock UI.

**Origin & lineage**: iOS 7 frosted-glass-with-blur introduction (2013) + Aurora/Big Sur evolution (2020) + Linear's measured restraint (2019+) + Korean app design's gradient + glass conventions.

### What this design is NOT (anti-patterns)
- ❌ Harsh, brutalist, or dark-mode-neon — opposite ideology
- ❌ Dense or data-heavy — this style breathes
- ❌ Retro Y2K chrome — Y2K is glossy & multi-colored; Glass is muted & atmospheric
- ❌ Thick-glass / heavy-blur — should feel like THIN glass, never opaque
- ❌ A SaaS dashboard with one frosted nav bar — the gradient bg must be PRESENT
- ❌ "Apple-style" without the gradient — gradient atmosphere is mandatory

## 2. DNA

1. **Atmospheric gradient backgrounds.** Soft pastel multi-stop conic or radial gradients filling viewport.
2. **Frosted glass panels.** backdrop-filter blur with semi-transparent white fill and thin border.
3. **Soft pastel accent palette.** Lavender, mint, peach, sky — never saturated.
4. **Generous rounded corners.** 16-24px on cards, full pill on buttons.
5. **Subtle 1px borders with 40-60% white opacity.** Defines glass edges.
6. **No hard shadows.** Optional very soft 40-80px blurred shadow with low opacity.
7. **Light readable typography.** Modern geometric sans (Inter Tight, Geist, General Sans), never serif.

## 3. Tokens

| Token | Value | Usage |
|:------|:------|:------|
| --bg-base | #FAFAFE | Cool off-white (visible only at gradient edges) |
| --fg | #1E1B2E | Deep cool dark (NEVER pure #000) |
| --muted-fg | #6B6880 | Cool gray for secondary |
| --accent-lavender | #CBA6F7 | Primary pastel |
| --accent-mint | #A6E3A1 | Cool pastel |
| --accent-peach | #FAB387 | Warm pastel |
| --accent-sky | #89B4FA | Cool sky pastel |
| --glass-fill | rgba(255,255,255,0.55) | Glass panel background |
| --glass-border | rgba(255,255,255,0.55) | Glass panel border |

**Background gradient (REQUIRED)**: layered radial gradients on body. Without this, the style fails immediately.

### Typography
- Display: "Inter Tight", "Geist", "General Sans", system-ui
- Body: same family (lighter weight)
- Mono: "JetBrains Mono"

Modern geometric sans only. NO SERIF.

**Scale**: 14/16/18/20/24/32/44/56/72/96.
**Weight**: display 600-700 · body 400 · labels 500.
**Tracking**: display -0.02em · labels 0.05em.

### Border radius
sm 8 / md 12 / lg 16 (cards) / xl 24 / pill 9999. Minimum 12 on cards.

### Borders
- glass-edge: 1px solid rgba(255,255,255,0.55)
- subtle: 1px solid rgba(30,27,46,0.08)

### Shadows
- soft: 0 8px 40px rgba(30,27,46,0.06)
- softer: 0 4px 24px rgba(30,27,46,0.04)

Very soft, low opacity, never offset more than 8px. NEVER hard shadows.

### Blur (the signature)
backdrop-filter: blur(20px) saturate(180%). 20-24px is the sweet spot.

## 4. Components

**Glass card** (signature):
\`\`\`
background: rgba(255,255,255,0.55);
backdrop-filter: blur(20px) saturate(180%);
border: 1px solid rgba(255,255,255,0.55);
border-radius: 16px;
box-shadow: 0 8px 40px rgba(30,27,46,0.06);
padding: 24-32px;
\`\`\`
Hover: bg 0.55 → 0.7, translateY(-2px), shadow grows softly.

**Primary button**: solid fg #1E1B2E · white text · pill · padding 12/24.

**Input**: lighter glass (rgba(255,255,255,0.7)) · 1px white-55% border · 12px radius · focus: soft inner glow shadow (no hard outline).

## 5. Layout

Container max-width 1200px. Section padding 100-140px. **Background gradient lives on body** — all sections transparent. Cards float over the gradient.

## 6. Motion

**Philosophy**: Gentle, soft easing. 250-400ms ease-out.

**Hover**: cards translateY(-2px) with softer shadow · buttons darken or lift · glass brightens (0.55 → 0.7).

**Idle**: very slow body gradient hue rotation (60s+ loop).

**Focus** (REQUIRED): 2px solid accent-lavender outline + 3px offset OR inner soft glow shadow.

**Forbidden**: snappy <150ms transitions, hard linear easing, bouncy springs, parallax.

## 7. Enforcement (NON-NEGOTIABLE)

1. **CRITICAL**: atmospheric multi-stop gradient on body. **Why-failure**: without it, the design degenerates into a generic light-mode SaaS with rounded corners — the gradient IS the style.
2. At least 3 frosted-glass panels using backdrop-filter blur.
3. All accent colors pastel only (lightness ≥ 70%).
4. Border radius ≥ 12px on cards, pill on buttons.
5. NO hard shadows. Soft blurred only, opacity ≤ 0.08.
6. Typography in modern geometric sans only.
7. Body background never solid.
8. Glass borders use semi-transparent white.
9. Transitions 250-400ms ease-out.
10. Soft glow focus states, not hard outlines.
11. **CRITICAL**: backdrop-filter blur 20px+ on glass. **Why-failure**: anything less feels like reduced opacity, not glass.
12. fg color NEVER pure #000.
13. saturate(180%) in backdrop-filter so gradients come through richer.
14. Decorative orbs (large soft-blurred circles) can drift on body bg.
15. Layered glass — at least one place where glass sits ON TOP of another glass.

### What success looks like
- A visionOS app demo
- macOS Sonoma's control center
- A meditation app's onboarding flow
- Linear's marketing site with atmosphere dialed up

### What failure looks like
- A SaaS dashboard with one frosted nav bar bolted on
- "Apple-style" without the gradient atmosphere
- A 2017 dark-mode card with opacity reduced (not glass)
- Sharp corners anywhere
- Pure white background (gradient is mandatory)
- Serif typography (wrong family entirely)`,
};

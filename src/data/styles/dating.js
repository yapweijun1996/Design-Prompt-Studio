import { asFullPreset } from "./compact.js";

export const dating = asFullPreset({
  id: "dating",
  name: "Dating App",
  tag: "Profile · gradient · prompt",
  desc: "Profile cards with photo + prompt + answer. Warm gradient. Like/pass mechanic. Hinge / Bumble / Tinder register.",

  feel: "Opening Hinge after work to like a 'two truths and a lie' answer — warm, personality-led, photo + prompt + tap-to-like — not a generic profile-card site dressed up as dating.",

  references: "Hinge, Bumble, Tinder, Coffee Meets Bagel, OkCupid (modern), Raya, The League, Feeld",

  boldFactor: [
    "Profile = stack of photo cards + prompt cards (e.g. 'My simple pleasures · …')",
    "Like-on-element: tap the heart on a specific photo or answer, not the whole profile",
    "Warm gradient palette: rose, peach, coral, soft purple — never cold",
    "Verified / safety badge prominent (photo verification, ID check)",
    "First-message field opens after a 'like' is sent on a specific element",
    "Filters: distance, age range, height, deal-breakers — drawer-style",
    "Match modal moment: full-screen confetti / animation when mutual like",
  ],

  tokens: {
    "bg":      { value: "#FFFFFF", usage: "Page white" },
    "bg-soft": { value: "#FFF5F2", usage: "Warm peach soft section" },
    "fg":      { value: "#1A1A1A", usage: "Body near-black" },
    "muted":   { value: "#7A7A7A", usage: "Caption grey" },
    "brand":   { value: "#FF4D6D", usage: "Hinge rose / dating accent" },
    "brand-2": { value: "#FFAE5C", usage: "Peach gradient stop" },
    "verified":{ value: "#3D8BFD", usage: "Verified badge blue" },
    "border":  { value: "#F0E5E0", usage: "Soft border" },
  },

  typography: {
    display: '"Söhne", "Inter Display", system-ui',
    body:    '"Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "11/12/14/16/20/28/40/56",
    weight:  "display 600-700 · body 400-500",
    tracking: "display tight (-0.02em) · body normal",
  },

  antiPatterns: [
    { name: "Tinder-only swipe",  dont: "use only left/right swipe with no prompts", why: "Modern dating apps include personality prompts — Hinge format is the genre standard now" },
    { name: "Cold corporate palette", dont: "use enterprise navy + grey", why: "Dating apps = warm intimacy; cold palette kills the emotional register" },
    { name: "Stock smiling-couple photo", dont: "use Shutterstock couple imagery in hero", why: "Show real-app UI + real-profile examples, not aspirational stock" },
    { name: "Hidden verification", dont: "tuck verification badge behind a menu", why: "Safety + trust signal must be visible on every profile" },
    { name: "Aggressive paywall",  dont: "block every action behind a 'Premium' modal", why: "Free-tier value must be real; paywall reads as scam if too aggressive" },
  ],

  responsive: [
    { element: "Profile photo",  mobile: "100vw",  tablet: "420px",  desktop: "440px" },
    { element: "Card stack",     mobile: "vert scroll", tablet: "vert scroll", desktop: "vert scroll" },
    { element: "Section padding", mobile: "16px",  tablet: "24px",  desktop: "32px" },
  ],

  snippets: [
    `/* Profile photo card with like heart */
.profile-photo { position: relative; aspect-ratio: 3/4; background: #F0E5E0; border-radius: 16px; overflow: hidden; }
.profile-photo img { width: 100%; height: 100%; object-fit: cover; }
.btn-like { position: absolute; bottom: 12px; right: 12px; width: 48px; height: 48px; border-radius: 50%; background: #FFFFFF; color: #FF4D6D; display: grid; place-items: center; font-size: 20px; border: 0; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
.btn-like:hover { background: #FF4D6D; color: #FFFFFF; transform: scale(1.05); }`,
    `/* Prompt card */
.prompt-card { background: #FFFFFF; border: 1px solid #F0E5E0; border-radius: 16px; padding: 20px; position: relative; }
.prompt-card .q { font-family: "Söhne", system-ui; font-weight: 700; font-size: 16px; color: #1A1A1A; margin-bottom: 8px; }
.prompt-card .a { font-family: "Söhne", system-ui; font-size: 20px; line-height: 1.4; color: #1A1A1A; font-weight: 500; }`,
    `/* Warm gradient hero */
.dating-hero { background: linear-gradient(135deg, #FF4D6D 0%, #FFAE5C 100%); color: #FFFFFF; padding: 64px 24px; text-align: center; }
.dating-hero h1 { font-family: "Söhne", "Inter Display", system-ui; font-size: 56px; font-weight: 700; line-height: 1.05; letter-spacing: -0.025em; }
.btn-cta-dating { background: #FFFFFF; color: #FF4D6D; border: 0; border-radius: 999px; padding: 14px 32px; font-weight: 700; font-size: 16px; margin-top: 24px; cursor: pointer; box-shadow: 0 4px 16px rgba(0,0,0,0.15); }`,
  ],

  successLooksLike: [
    "Hinge profile with photo + prompt + heart-on-element",
    "Bumble first-move chat opener",
    "Coffee Meets Bagel daily-bagel UI",
  ],

  failureLooksLike: [
    "Cold enterprise UI for an intimate app",
    "Stock smiling-couple hero photography",
    "Aggressive paywall on every interaction",
  ],

  tile: "tile-dating",
  tileHTML: `
    <div class="ph"><div class="heart">♥</div></div>
    <div class="pcard">
      <div class="q">two truths and a lie</div>
      <div class="a">surfed in Bali · cooks Sichuan · ran a marathon</div>
    </div>
  `,
});

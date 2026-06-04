import { asFullPreset } from "./compact.js";

export const playful = asFullPreset({
  id: "playful",
  name: "Playful Pop",
  tag: "Rounded · friendly · bright",
  desc: "Friendly, rounded, optimistic — bright tasteful color, chunky rounded type, soft colored shadows, big pill buttons. Approachable and human without being childish. For consumer apps, education, wellness, D2C.",
  sampleTemplate: "brutal",
  feel: "Duolingo / Headspace / Slack's brand site / Mailchimp — cheerful and confident, a brand that smiles. Professional play, not clip-art.",
  references: "Duolingo, Headspace, Slack brand, Mailchimp, Webflow brand, Notion brand, Oatly",
  boldFactor: [
    "A bright friendly primary (coral #FF5C39) + one cheerful secondary (grape #6C5CE7) — warm and optimistic, never corporate-muted",
    "A chunky rounded sans (Poppins / Plus Jakarta Sans / Nunito) at bold weights — friendly, confident headlines",
    "Big rounded geometry everywhere — pill buttons, 20–28px card radius, soft rounded shapes/blobs as decoration",
    "Soft colored drop-shadows tinted by the element's own hue — bouncy, light, tactile; never harsh grey",
    "Playful-but-professional: generous spacing, clear hierarchy, one or two friendly shapes — restraint keeps it from going childish",
  ],
  tokens: {
    "bg":      { value: "#FFFDF7", usage: "Warm off-white" },
    "surface": { value: "#FFFFFF", usage: "Cards" },
    "fg":      { value: "#1F1B2E", usage: "Deep friendly ink" },
    "muted":   { value: "#6B6680", usage: "Secondary" },
    "accent":  { value: "#FF5C39", usage: "Coral primary" },
    "accent2": { value: "#6C5CE7", usage: "Grape secondary" },
  },
  typography: {
    display: '"Poppins", "Plus Jakarta Sans", "Nunito", system-ui, sans-serif',
    body:    '"Inter", "Plus Jakarta Sans", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "14/16/18/22/30/44/62",
    weight:  "display 700-800 · body 400-500",
    tracking: "display -0.01em · body normal · body line-height 1.6",
  },
  antiPatterns: [
    { name: "Corporate mute", dont: "use a grey / navy enterprise palette", why: "friendly bright color is the whole point" },
    { name: "Sharp corners", dont: "use small radius or hard edges", why: "everything is generously rounded — pills and 20px+ cards" },
    { name: "Harsh grey shadows", dont: "use flat grey drop-shadows", why: "shadows are soft and tinted by the element's color" },
    { name: "Childish clip-art", dont: "use comic-sans, emoji-spam, or cluttered stickers", why: "playful but PROFESSIONAL — good type + restraint keep it credible" },
  ],
  responsive: [
    { element: "Section padding", mobile: "48px", tablet: "80px",  desktop: "112px" },
    { element: "Hero type",       mobile: "32px", tablet: "44px",  desktop: "62px" },
    { element: "Button radius",   mobile: "pill", tablet: "pill",  desktop: "pill" },
  ],
  snippets: [
    `/* Chunky rounded hero + pill CTA */
.hero h1 { font-family:"Poppins",sans-serif; font-weight:800; font-size:clamp(32px,5.5vw,62px); letter-spacing:-.01em; line-height:1.05; color:#1F1B2E; }
.btn { background:#FF5C39; color:#fff; border:0; border-radius:999px; padding:15px 28px; font-family:"Poppins",sans-serif; font-weight:700; font-size:16px; box-shadow:0 10px 22px rgba(255,92,57,.35); }`,
    `/* Rounded card + a friendly blob + color-tinted shadow */
.card { background:#fff; border-radius:24px; padding:24px; box-shadow:0 12px 30px rgba(108,92,231,.15); }
.blob { background:#6C5CE7; border-radius:42% 58% 63% 37% / 41% 44% 56% 59%; }`,
  ],
  successLooksLike: ["Duolingo's bright friendly site", "Headspace's calm-playful brand", "Slack's brand pages"],
  failureLooksLike: ["muted grey corporate palette", "sharp-cornered enterprise cards", "harsh grey drop-shadows", "comic-sans / emoji-spam childishness"],
  overrideGlobalRules: [
    "Bright friendly color + chunky rounded type + pill geometry are the register — overrides any 'prefer neutral/muted, restrained color' default. Stay playful but professional.",
  ],
  tile: "tile-premium",
  tileHTML: `<div style='height:150px;background:#FFFDF7;display:flex;flex-direction:column;justify-content:space-between;padding:18px;font-family:"Poppins",Inter,system-ui,sans-serif;color:#1F1B2E;position:relative;overflow:hidden'><div style='position:absolute;right:-18px;top:-18px;width:74px;height:74px;background:#6C5CE7;border-radius:42% 58% 63% 37% / 41% 44% 56% 59%;opacity:.9'></div><div style='font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:#6C5CE7;font-weight:700;position:relative'>Hello there</div><div style='font-size:26px;font-weight:800;letter-spacing:-.01em;line-height:1.04;position:relative'>Learning,<br/>made joyful.</div><div style='align-self:flex-start;font-size:12px;font-weight:700;color:#fff;background:#FF5C39;border-radius:999px;padding:8px 18px;box-shadow:0 8px 18px rgba(255,92,57,.4);position:relative'>Get started</div></div>`,
});

import { asFullPreset } from "./compact.js";

export const stripe = asFullPreset({
  id: "stripe",
  name: "Stripe / Gradient",
  tag: "Refined gradient · fintech-marketing · polished",
  desc: "Polished marketing for serious products. Angled gradient mesh, immaculate type, layered depth, crisp product UI. Premium without being loud.",
  feel: "A Stripe or Linear marketing page — a confident gradient wash behind razor-sharp content, every section composed. Premium, trustworthy, modern.",
  references: "stripe.com, Linear, Mercury, Ramp, Arc browser, Framer",
  boldFactor: [
    "A signature angled gradient (indigo → violet → cyan) as a hero wash / section accent — subtle, not neon",
    "Immaculate sans (Inter / Söhne) with tight display tracking and generous body line-height",
    "Layered depth: soft shadows, glass cards, a tilted product UI mockup",
    "Restrained palette: ink text on white, gradient reserved for moments",
    "Smooth scroll-reveal + hover lift micro-interactions",
  ],
  tokens: {
    "bg":       { value: "#FFFFFF", usage: "Page" },
    "fg":       { value: "#0A2540", usage: "Stripe ink navy" },
    "muted":    { value: "#425466", usage: "Secondary text" },
    "accent":   { value: "#635BFF", usage: "Stripe indigo — CTAs, links" },
    "grad-a":   { value: "#635BFF", usage: "Gradient start" },
    "grad-b":   { value: "#00D4FF", usage: "Gradient end (cyan)" },
  },
  typography: {
    display: '"Inter", "Söhne", system-ui, sans-serif',
    body:    '"Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", ui-monospace, monospace',
    scale:   "13/15/17/22/30/48/72",
    weight:  "display 600-700 · body 400-500",
    tracking: "display tight (-0.03em) · body normal · line-height 1.6",
  },
  antiPatterns: [
    { name: "Neon gradient", dont: "use a harsh rainbow gradient as the whole background", why: "the gradient is a refined accent wash, not a loud fill" },
    { name: "Flat cards", dont: "ship borderless flat blocks", why: "depth (soft shadow + subtle glass) is the Stripe signature" },
    { name: "Generic fonts", dont: "default to Arial/Roboto", why: "Inter/Söhne with tight tracking carries the premium feel" },
  ],
  responsive: [
    { element: "Section padding", mobile: "56px", tablet: "88px", desktop: "128px" },
    { element: "Hero type",       mobile: "40px", tablet: "60px", desktop: "72px" },
    { element: "Body",            mobile: "17px", tablet: "17px", desktop: "17px" },
  ],
  snippets: [
    `/* Signature angled gradient hero wash */
.hero { background:linear-gradient(135deg,#635BFF 0%,#7A5CFF 40%,#00D4FF 100%); }
.hero--soft { background:radial-gradient(900px 400px at 20% 0%, rgba(99,91,255,.18), transparent 60%); }`,
    `/* Glass product card, lifted */
.card { background:rgba(255,255,255,.8); backdrop-filter:blur(12px); border:1px solid rgba(10,37,64,.08); border-radius:16px; box-shadow:0 24px 60px -28px rgba(10,37,64,.4); }`,
  ],
  successLooksLike: ["stripe.com landing", "Mercury / Ramp marketing", "Linear's gradient hero"],
  failureLooksLike: ["harsh full-page rainbow", "flat shadowless blocks", "clip-art finance icons"],
  overrideGlobalRules: [
    "A refined gradient wash IS the aesthetic here — overrides the global 'no gradient backgrounds' rule (used tastefully, not as slop).",
  ],
  tile: "tile-premium",
  tileHTML: `<div style="height:150px;background:linear-gradient(135deg,#635BFF,#7A5CFF 45%,#00D4FF);display:flex;flex-direction:column;justify-content:space-between;padding:16px;font-family:Inter,system-ui;color:#fff">
    <div style="font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;opacity:.85">Payments</div>
    <div style="font-size:25px;font-weight:700;letter-spacing:-.03em;line-height:1.05">Scale your<br/>revenue.</div>
    <div style="background:rgba(255,255,255,.95);color:#0A2540;align-self:flex-start;font-size:12px;font-weight:600;padding:6px 14px;border-radius:20px;box-shadow:0 8px 20px -8px rgba(0,0,0,.4)">Start now →</div>
  </div>`,
});

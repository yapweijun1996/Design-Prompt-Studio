import { asFullPreset } from "./compact.js";

export const saas = asFullPreset({
  id: "saas",
  name: "SaaS Modern",
  tag: "Crisp · gradient · Inter",
  desc: "Inter everywhere. Subtle gradients. Soft shadows. Generous radius. Stripe / Linear / Vercel register.",

  feel: "A 2024 YC Series-A landing page that knows it's a YC Series-A landing page — confident in the convention, polished, not trying to be different.",

  references: "Stripe.com, Linear, Vercel, Resend, Cal.com, Clerk, Supabase, Planetscale",

  boldFactor: [
    "Inter or Geist for everything — never serif body",
    "Brand color used as a single bold accent + subtle gradient backdrop",
    "Soft 12-20px border-radius on cards, 8-10px on buttons",
    "Layered shadows: small (sm) + medium (md) — never just one flat shadow",
    "Diagrams + product screenshots, not stock photos of people",
    "Mono font (JetBrains Mono / Geist Mono) appears at least once per fold",
    "Logo cloud of customer logos in greyscale",
  ],

  tokens: {
    "bg":      { value: "#FFFFFF", usage: "Page white" },
    "bg-soft": { value: "#FAFAFA", usage: "Section alt" },
    "fg":      { value: "#0A0A0A", usage: "Near-black body" },
    "muted":   { value: "#6B7280", usage: "Secondary copy" },
    "brand":   { value: "#6366F1", usage: "Indigo accent — buttons + links" },
    "border":  { value: "#E5E7EB", usage: "Card borders" },
  },

  typography: {
    display: '"Inter Display", "Inter", "Geist", system-ui',
    body:    '"Inter", system-ui, sans-serif',
    mono:    '"Geist Mono", "JetBrains Mono", monospace',
    scale:   "12/14/16/18/24/32/48/64",
    weight:  "display 600-700 · body 400-500",
    tracking: "display tight (-0.025em on >32px) · body normal",
  },

  antiPatterns: [
    { name: "Stock people photos",   dont: "use Shutterstock office-people imagery", why: "Diagrams + product screenshots are the modern SaaS visual language" },
    { name: "Serif body",            dont: "use Georgia / Playfair for paragraphs", why: "Inter/Geist is the genre signal; serif breaks the SaaS register" },
    { name: "Hard 1px shadow only",  dont: "use a single flat box-shadow", why: "Layered shadows (sm + md) create the modern depth feel" },
    { name: "Rainbow gradient hero", dont: "use 4-color vibrant gradient", why: "Subtle 2-color brand gradient is the convention; rainbow reads Web3 2021" },
    { name: "Marketing copy walls",  dont: "write 5-paragraph hero subhead", why: "Modern SaaS hero is one line + one sentence + one CTA" },
  ],

  responsive: [
    { element: "Section padding", mobile: "64px",  tablet: "96px",  desktop: "128px" },
    { element: "Hero type",       mobile: "40px",  tablet: "56px",  desktop: "72px" },
    { element: "Card radius",     mobile: "12px",  tablet: "16px",  desktop: "20px" },
  ],

  snippets: [
    `/* Modern SaaS card */
.card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04);
}`,
    `/* Subtle brand gradient backdrop */
.hero-bg {
  background:
    radial-gradient(ellipse at top, rgba(99,102,241,0.10), transparent 60%),
    radial-gradient(ellipse at bottom right, rgba(168,85,247,0.06), transparent 60%),
    #FFFFFF;
}`,
    `/* Primary CTA */
.btn-primary {
  background: #0A0A0A; color: #FFF; border: 0; border-radius: 8px;
  padding: 10px 16px; font-weight: 600; font-size: 14px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 1px 2px rgba(0,0,0,0.2);
}`,
  ],

  successLooksLike: [
    "Stripe.com hero — clean type, product screenshot, one accent gradient",
    "Linear's landing — Inter, dark→light scroll, mono code blocks",
    "Vercel.com — sharp typography, deploy-button as hero artifact",
  ],

  failureLooksLike: [
    "Bootstrap template with one gradient slapped on top",
    "Hero with stock photo of 4 diverse people in office",
    "Rainbow Web3 gradient + glow",
  ],

  tile: "tile-saas",
  tileHTML: `
    <div class="badge">v2.0 · Now in beta</div>
    <div class="word">Ship faster.</div>
    <div class="sub">The platform for modern teams.</div>
    <div class="btn">Start free →</div>
  `,
});

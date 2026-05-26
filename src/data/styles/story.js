import { asFullPreset } from "./compact.js";

export const story = asFullPreset({
  id: "story",
  name: "Subscription Story",
  tag: "Warm · narrative · brand",
  desc: "Warm earth palette. Story-driven landing. Personality copy. Warby Parker / Allbirds / Casper register.",

  feel: "Reading Allbirds' first-shoe story scroll — felt-warm, narrative, the brand has a heart — not Amazon trying to sell a story.",

  references: "Warby Parker, Allbirds, Casper, Glossier, Away luggage, Bombas, Harry's, Dollar Shave Club, Quip",

  boldFactor: [
    "Warm earth palette: cream, terracotta, sage, soft rust",
    "Story-driven hero: 'It started with one question…' — narrative copy",
    "Personality voice: first-person plural ('we', 'our'), friendly but adult",
    "Founder photo / brand origin section near the top",
    "Process-as-marketing: '3 steps to your first box / pair / shave'",
    "Sustainability / values strip: materials, sourcing, carbon, give-back",
    "Real-customer testimonials with name + city + photo (not faceless quotes)",
  ],

  tokens: {
    "bg":      { value: "#F8F4ED", usage: "Warm cream" },
    "bg-alt":  { value: "#F0E8D9", usage: "Section alt — wheat" },
    "fg":      { value: "#2B2018", usage: "Dark coffee body" },
    "muted":   { value: "#6B5F52", usage: "Secondary copy" },
    "accent":  { value: "#C56A4A", usage: "Terracotta — CTA, links" },
    "sage":    { value: "#8FA989", usage: "Sustainability badge" },
    "border":  { value: "#D9CFBE", usage: "Soft border" },
  },

  typography: {
    display: '"Fraunces", "Tiempos Headline", Georgia, serif',
    body:    '"Inter", "Söhne", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "12/14/16/18/22/30/44/64",
    weight:  "display 400-500 (italic for emphasis) · body 400",
    tracking: "display open (0.01em) · italic accents in display",
  },

  antiPatterns: [
    { name: "Cold corporate palette", dont: "use enterprise navy + grey", why: "Subscription brand = warmth + intimacy; navy reads B2B" },
    { name: "Stock smiling models", dont: "use Shutterstock smiling-people imagery", why: "Real customers with real names + cities — authenticity is the brand" },
    { name: "Spec-sheet product page", dont: "lead with specs", why: "Lead with story + values; specs go below the fold" },
    { name: "Aggressive CTAs", dont: "write 'BUY NOW' shouty CTAs", why: "Voice: 'Try your first pair' / 'Get started — risk-free'" },
    { name: "Sale countdown", dont: "add flash-sale theater", why: "Story brands sell relationship, not urgency" },
  ],

  responsive: [
    { element: "Section padding", mobile: "48px",  tablet: "80px",  desktop: "112px" },
    { element: "Hero serif",      mobile: "36px",  tablet: "52px",  desktop: "64px" },
    { element: "Article measure", mobile: "100%",  tablet: "56ch",  desktop: "62ch" },
  ],

  snippets: [
    `/* Story-section block */
.story { background: #F8F4ED; padding: 96px 24px; }
.story h2 { font-family: "Fraunces", Georgia, serif; font-size: 44px; font-weight: 400; line-height: 1.1; color: #2B2018; max-width: 18ch; }
.story h2 em { font-style: italic; color: #C56A4A; }
.story p { font-size: 18px; line-height: 1.6; max-width: 56ch; color: #6B5F52; margin-top: 16px; }`,
    `/* Values strip */
.values { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; padding: 48px 24px; background: #F0E8D9; }
.value-item { text-align: center; }
.value-icon { width: 40px; height: 40px; margin: 0 auto 12px; color: #8FA989; }
.value-title { font-family: "Fraunces", serif; font-size: 18px; font-weight: 500; color: #2B2018; }
.value-body { font-size: 14px; color: #6B5F52; margin-top: 6px; }`,
    `/* Testimonial with face + city */
.testimonial { display: grid; grid-template-columns: 56px 1fr; gap: 16px; align-items: start; padding: 20px; background: #FFFFFF; border: 1px solid #D9CFBE; border-radius: 12px; }
.testimonial img { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; }
.testimonial blockquote { font-family: "Fraunces", serif; font-size: 18px; font-style: italic; line-height: 1.5; margin: 0; color: #2B2018; }
.testimonial cite { font-style: normal; font-size: 13px; color: #6B5F52; display: block; margin-top: 8px; }`,
  ],

  successLooksLike: [
    "Allbirds material-story scroll",
    "Warby Parker home try-on landing",
    "Casper's mattress-science section",
  ],

  failureLooksLike: [
    "Cold corporate landing for a D2C brand",
    "Stock model on the hero with no story",
    "Countdown timer on a subscription box",
  ],

  tile: "tile-story",
  tileHTML: `
    <div class="eyebrow">OUR STORY</div>
    <div class="word">It started <em>with one</em> question.</div>
    <div class="sub">What if a t-shirt could last 10 years?</div>
    <div class="cta">Read more →</div>
  `,
});

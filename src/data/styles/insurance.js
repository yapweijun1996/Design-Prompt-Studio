import { asFullPreset } from "./compact.js";

export const insurance = asFullPreset({
  id: "insurance",
  name: "Insurance D2C",
  tag: "Quote · friendly · plain",
  desc: "Get-quote-in-90-seconds flow. Friendly illustration. Plain English. Lemonade / Oscar / Hippo / Root register.",

  feel: "Getting renter's insurance from Lemonade in 90 seconds on a Sunday — chat-style quote flow, monthly price visible, illustrated mascot — not a 1990s insurance form pretending to be modern.",

  references: "Lemonade, Oscar Health, Hippo, Root Insurance, Metromile, Ladder Life, Hippo home, Policygenius, ManyPets",

  boldFactor: [
    "Quote flow: progressive disclosure, 5-10 questions, instant price preview",
    "Friendly mascot / brand character (Lemonade pink mascot, Oscar avatar)",
    "Plain-English explanations of coverage: 'This covers your laptop if it's stolen'",
    "Side-by-side coverage comparison cards: Basic / Standard / Plus",
    "Trust signals: ratings, # of policies sold, claims-paid stat, regulator licensed",
    "Claims flow modernized: video-first, AI-assisted, 'paid in 3 minutes' badges",
  ],

  tokens: {
    "bg":      { value: "#FFFFFF", usage: "Page white" },
    "bg-soft": { value: "#FFF5F8", usage: "Lemonade soft pink alt" },
    "fg":      { value: "#1A1A1A", usage: "Body" },
    "muted":   { value: "#6B6B6B", usage: "Secondary" },
    "brand":   { value: "#FF0083", usage: "Lemonade pink (or Oscar blue #0052CC)" },
    "ok":      { value: "#00C281", usage: "Coverage included / approved" },
    "border":  { value: "#F0E5EC", usage: "Soft border" },
  },

  typography: {
    display: '"Söhne", "Inter Display", "Greycliff", system-ui',
    body:    '"Söhne", "Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "12/14/16/18/22/32/44/64",
    weight:  "display 700-800 · body 400-500 · price 700 tabular",
  },

  antiPatterns: [
    { name: "1990s insurance form", dont: "use 30-field PDF-style form", why: "Conversational progressive flow is the modern register; long forms kill conversion" },
    { name: "Jargon-heavy",       dont: "write 'Subrogation clause applies'", why: "Plain English: 'If someone else damages your stuff, they pay us back'" },
    { name: "Hidden price",       dont: "make users finish full app before seeing price", why: "Show price preview after first 3-4 questions — anchor early" },
    { name: "Stock smiling-family photo", dont: "use Shutterstock family imagery", why: "Friendly illustration or product UI > stock — feels modern, not insurance-old" },
  ],

  responsive: [
    { element: "Quote flow",   mobile: "single-question per screen", tablet: "1col", desktop: "2col with sidebar preview" },
    { element: "Comparison",   mobile: "card stack", tablet: "table 3-col", desktop: "table 3-col" },
  ],

  snippets: [
    `/* Quote progress + price preview */
.quote-progress { display: flex; gap: 6px; align-items: center; padding: 12px 0; }
.quote-progress .dot { width: 8px; height: 8px; border-radius: 50%; background: #F0E5EC; }
.quote-progress .dot.done { background: #FF0083; }
.quote-progress .dot.current { background: #FF0083; box-shadow: 0 0 0 4px rgba(255,0,131,0.2); }
.quote-price { background: #FFF5F8; border: 2px solid #FF0083; border-radius: 12px; padding: 16px; }
.quote-price .num { font-family: "Söhne", system-ui; font-weight: 800; font-size: 44px; color: #FF0083; font-variant-numeric: tabular-nums; line-height: 1; }
.quote-price .num .month { font-size: 16px; color: #6B6B6B; }`,
    `/* Coverage card */
.cov-card { background: #FFFFFF; border: 1px solid #F0E5EC; border-radius: 16px; padding: 24px; }
.cov-card.featured { border-color: #FF0083; box-shadow: 0 8px 24px rgba(255,0,131,0.12); }
.cov-card h3 { font-size: 20px; font-weight: 700; margin: 0 0 4px; }
.cov-card .price { font-size: 28px; font-weight: 800; font-variant-numeric: tabular-nums; }
.cov-card ul { list-style: none; padding: 0; margin: 16px 0 0; }
.cov-card li { display: flex; gap: 8px; padding: 6px 0; font-size: 14px; }
.cov-card li::before { content: "✓"; color: #00C281; font-weight: 700; }`,
  ],

  successLooksLike: [
    "Lemonade 90-second quote flow with pink mascot",
    "Oscar Health plan comparison cards",
  ],

  failureLooksLike: [
    "30-field PDF form labeled as 'modern insurance'",
    "Jargon-heavy policy text without plain English",
  ],

  tile: "tile-insurance",
  tileHTML: `
    <div class="prog"><span class="d done"></span><span class="d done"></span><span class="d cur"></span><span class="d"></span></div>
    <div class="q">your monthly:</div>
    <div class="pr">$12<span>/mo</span></div>
    <div class="cta">continue →</div>
  `,
});

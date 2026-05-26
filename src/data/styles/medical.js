import { asFullPreset } from "./compact.js";

export const medical = asFullPreset({
  id: "medical",
  name: "Healthcare Calm",
  tag: "Trust · soft blue · clean",
  desc: "Soft teal/blue + cream. Calming whitespace. Clear hierarchy. Mayo Clinic / One Medical / Oscar Health register.",

  feel: "Browsing One Medical's appointment booking on a quiet weekday morning — calming, trustworthy, never alarming — not a marketing site pretending to do healthcare.",

  references: "One Medical, Mayo Clinic, Oscar Health, Cleveland Clinic, Hims & Hers, Forward Health, Babylon Health, Olive AI",

  boldFactor: [
    "Soft teal #2E7D7B OR muted ocean blue #3D6A9C — never anxious red",
    "Cream / off-white background — feels like a doctor's office reception",
    "Generous whitespace + clear hierarchical type — no walls of copy",
    "Photography: warm-lit, real practitioners with real patients, eye-level",
    "Appointment-booking CTA prominent + persistent in header",
    "Plain-language symptom / care explanations (no jargon)",
    "Trust signals: accreditations, board-certified, insurance accepted strip",
  ],

  tokens: {
    "bg":      { value: "#F7F4EE", usage: "Warm cream — doctor's office calm" },
    "surface": { value: "#FFFFFF", usage: "Card surface" },
    "fg":      { value: "#1F2937", usage: "Body slate" },
    "muted":   { value: "#6B7280", usage: "Secondary" },
    "brand":   { value: "#2E7D7B", usage: "Soft teal — primary CTA" },
    "brand-2": { value: "#3D6A9C", usage: "Ocean blue alt" },
    "sage":    { value: "#A6C9A1", usage: "Wellness sage" },
    "border":  { value: "#E5E1D8", usage: "Soft border" },
  },

  typography: {
    display: '"Söhne", "Inter Display", system-ui',
    body:    '"Inter", "Söhne", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "12/14/16/18/22/30/44/56',",
    weight:  "display 500-600 · body 400-500 · headings 600",
    tracking: "display tight (-0.015em) · body normal · open enough to read calmly",
  },

  antiPatterns: [
    { name: "Alarming red",       dont: "use red as the brand color", why: "Healthcare ≠ emergency; red triggers anxiety. Teal/blue = calm" },
    { name: "Stock smiling stethoscope", dont: "use generic doctor-with-stethoscope photo", why: "Use real-practitioner photography or warm illustration — generic = untrustworthy" },
    { name: "Marketing exclamation", dont: "write 'Get healthy NOW!!'", why: "Voice: 'Find care. Feel better.' — calm, declarative" },
    { name: "Dense ERP table",    dont: "show patient data in 12px rows", why: "Healthcare-consumer UI is spacious; clinical-tool UI is separate" },
    { name: "Carousel hero",      dont: "auto-rotate hero of services", why: "Carousels distract — anxious users need ONE clear action" },
  ],

  responsive: [
    { element: "Section padding", mobile: "48px",  tablet: "80px",  desktop: "112px" },
    { element: "Hero type",       mobile: "32px",  tablet: "44px",  desktop: "56px" },
    { element: "Body measure",    mobile: "100%",  tablet: "58ch",  desktop: "64ch" },
  ],

  snippets: [
    `/* Calm CTA */
.btn-care { background: #2E7D7B; color: #FFFFFF; border: 0; border-radius: 999px; padding: 14px 28px; font-size: 16px; font-weight: 500; cursor: pointer; box-shadow: 0 1px 2px rgba(46,125,123,0.2); }
.btn-care:hover { background: #246662; }`,
    `/* Trust strip */
.trust-strip { display: flex; gap: 32px; align-items: center; justify-content: center; padding: 24px; background: #FFFFFF; border-top: 1px solid #E5E1D8; border-bottom: 1px solid #E5E1D8; }
.trust-item { font-size: 13px; color: #6B7280; display: flex; align-items: center; gap: 8px; }
.trust-item .icon { width: 18px; height: 18px; color: #2E7D7B; }`,
    `/* Care card */
.care-card { background: #FFFFFF; border: 1px solid #E5E1D8; border-radius: 16px; padding: 24px; }
.care-card h3 { font-family: "Söhne", system-ui; font-weight: 600; font-size: 20px; color: #1F2937; margin: 0 0 8px; }
.care-card p { font-size: 15px; line-height: 1.55; color: #6B7280; margin: 0 0 16px; }
.care-card a { color: #2E7D7B; font-weight: 500; text-decoration: none; }`,
  ],

  successLooksLike: [
    "One Medical's appointment booking landing",
    "Mayo Clinic patient education page",
    "Forward Health's membership overview",
  ],

  failureLooksLike: [
    "Marketing landing with neon-red 'GET HEALTHY NOW' hero",
    "Stock doctor-with-stethoscope hero image",
    "Dense clinical-EMR table on a consumer healthcare page",
  ],

  tile: "tile-medical",
  tileHTML: `
    <div class="logo">+ care</div>
    <div class="word">Feel better,<br/>sooner.</div>
    <div class="sub">Book a same-day visit with a doctor near you.</div>
    <div class="btn">Find care →</div>
  `,
});

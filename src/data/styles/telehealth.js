import { asFullPreset } from "./compact.js";

export const telehealth = asFullPreset({
  id: "telehealth",
  name: "Telehealth Visit",
  tag: "Video · symptom · script",
  desc: "Video visit + symptom intake + e-prescription. Teladoc / MDLive / K Health / Ro register.",

  feel: "Booking a same-day telehealth visit at 9am on a sick day — symptom intake → matched to provider → video call → e-prescription sent — not a generic clinic site pretending to be telehealth.",

  references: "Teladoc, MDLive, K Health, Ro, Hers, Hims, Sesame, Doctor on Demand, Amwell",

  boldFactor: [
    "Symptom triage flow: chat-style intake → AI-suggested categories → match to provider",
    "Provider card: photo + name + credentials + specialty + 'available now / in 12 min'",
    "Video-call surface: provider video + self-view + chat + notes + share-screen",
    "Post-visit: diagnosis summary + prescriptions sent to pharmacy + next-steps",
    "Care continuity: visit history, prescription refills, follow-up scheduling",
    "Calm trust palette: teal / soft blue + cream — never alarming red",
  ],

  tokens: {
    "bg":      { value: "#F7F4EE", usage: "Warm cream — clinical-calm" },
    "surface": { value: "#FFFFFF", usage: "Card surface" },
    "fg":      { value: "#1F2937", usage: "Body" },
    "muted":   { value: "#6B7280", usage: "Secondary" },
    "brand":   { value: "#2E7D7B", usage: "Soft teal calm CTA" },
    "ok":      { value: "#1B7A3E", usage: "Available now green" },
    "border":  { value: "#E5E1D8", usage: "Soft border" },
  },

  typography: {
    display: '"Söhne", "Inter Display", system-ui',
    body:    '"Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "12/14/16/18/22/28/40",
    weight:  "display 500-600 · body 400-500",
  },

  antiPatterns: [
    { name: "Alarming red",      dont: "use red as primary color", why: "Anxious patients need calming; red triggers panic" },
    { name: "Marketing CTAs",   dont: "use 'Get healthy NOW!'", why: "Voice: 'Talk to a doctor in 12 minutes'" },
    { name: "Hidden credentials", dont: "show only 'Dr. Smith'", why: "MD/NP/PA + license state + years of practice = trust" },
    { name: "Stock smiling-stethoscope photo", dont: "use generic doctor stock", why: "Real provider photos + product UI" },
  ],

  responsive: [
    { element: "Video call layout", mobile: "vertical stack", tablet: "main+pip", desktop: "main+pip+chat" },
    { element: "Provider list",  mobile: "1col", tablet: "1col", desktop: "1col 640px" },
  ],

  snippets: [
    `/* Provider card */
.provider-card { display: grid; grid-template-columns: 64px 1fr auto; gap: 14px; padding: 16px; background: #FFFFFF; border: 1px solid #E5E1D8; border-radius: 12px; align-items: center; }
.provider-card img { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; }
.provider-card .name { font-weight: 600; font-size: 16px; color: #1F2937; }
.provider-card .cred { font-size: 13px; color: #6B7280; }
.provider-card .avail { color: #1B7A3E; font-weight: 600; font-size: 13px; }
.provider-card .btn { background: #2E7D7B; color: #FFFFFF; border-radius: 999px; padding: 8px 16px; font-size: 13px; font-weight: 600; border: 0; cursor: pointer; }`,
    `/* Video call shell */
.video-shell { position: relative; background: #000; border-radius: 12px; overflow: hidden; aspect-ratio: 16/9; }
.video-main { width: 100%; height: 100%; object-fit: cover; }
.video-pip { position: absolute; bottom: 16px; right: 16px; width: 120px; aspect-ratio: 4/3; border-radius: 8px; border: 2px solid #FFFFFF; }
.video-controls { position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); display: flex; gap: 12px; background: rgba(0,0,0,0.5); padding: 8px 16px; border-radius: 999px; }
.video-controls button { background: rgba(255,255,255,0.2); border: 0; color: #FFFFFF; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; }
.video-controls .end { background: #DC2626; }`,
  ],

  successLooksLike: [
    "Teladoc visit booking + provider match",
    "K Health symptom-chat triage flow",
  ],

  failureLooksLike: [
    "Alarming red 'GET HELP NOW!' hero",
    "Generic doctor stock photo as the only imagery",
  ],

  tile: "tile-telehealth",
  tileHTML: `
    <div class="card">
      <div class="ph"></div>
      <div class="bd">
        <div class="nm">Dr. Maya Chen, MD</div>
        <div class="cr">Family Medicine · CA</div>
        <div class="av">● available in 12 min</div>
      </div>
      <div class="btn">Visit</div>
    </div>
  `,
});

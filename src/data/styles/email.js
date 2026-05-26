import { asFullPreset } from "./compact.js";

export const email = asFullPreset({
  id: "email",
  name: "Email Platform",
  tag: "Compose · campaign · open-rate",
  desc: "Compose editor + campaign list + audience. Friendly tone. Mailchimp / Resend / Beehiiv / ConvertKit register.",

  feel: "A founder sending the Tuesday newsletter at 9am — friendly composer, audience segment selected, schedule + send is two clicks — not a generic ESP showing 200 confusing settings.",

  references: "Mailchimp, Resend, Beehiiv, ConvertKit, Substack, Loops.so, Buttondown, Customer.io",

  boldFactor: [
    "Compose canvas with block-based email builder (heading, text, image, button, divider)",
    "Audience / segment panel: list size + open rate + tags + filters",
    "Campaign list as a card grid: name + sent date + open % + click % + status",
    "Test-send + preview (mobile + desktop + dark-mode inbox) before scheduling",
    "Deliverability indicators: SPF/DKIM/DMARC status, sender reputation",
    "Personalization tags inline: {{first_name}} / {{custom.plan}} with helper preview",
    "Friendly brand palette: warm yellow (Mailchimp), magenta (Resend), or indigo (ConvertKit)",
  ],

  tokens: {
    "bg":       { value: "#FFFFFF", usage: "App background" },
    "bg-soft":  { value: "#FCFAF7", usage: "Editor sidebar / cream alt" },
    "fg":       { value: "#241C15", usage: "Espresso body (Mailchimp warm) — adjust per brand" },
    "muted":    { value: "#7A6E5F", usage: "Secondary text" },
    "brand":    { value: "#FFE01B", usage: "Mailchimp yellow (or magenta #FF005C / indigo #6366F1)" },
    "ok":       { value: "#22C55E", usage: "Sent / delivered" },
    "warn":     { value: "#F59E0B", usage: "Pending / scheduled" },
    "danger":   { value: "#EF4444", usage: "Bounced / failed" },
    "border":   { value: "#E5E0D5", usage: "Soft border" },
  },

  typography: {
    display: '"Inter", "Söhne", system-ui',
    body:    '"Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "11/12/13/14/16/20/24/32",
    weight:  "display 600-700 · body 400-500 · numbers tabular",
    tracking: "normal · tabular for rates and counts",
  },

  antiPatterns: [
    { name: "Markdown-only compose", dont: "show only a raw markdown text area", why: "Marketers need WYSIWYG email blocks; markdown is for devs (Resend transactional)" },
    { name: "Hidden test-send",     dont: "make test-send a deep-buried menu", why: "Test-send is the safety net; one tap from compose — never buried" },
    { name: "Send without preview", dont: "let users hit Send without seeing the rendered email", why: "Preview (mobile + dark mode) catches breakage before hitting 50k inboxes" },
    { name: "Confusing settings tax", dont: "front-load with 30 dropdowns before compose", why: "Compose-first; settings progressively disclosed (audience → schedule → tracking)" },
    { name: "Cold corporate palette", dont: "use enterprise navy + grey", why: "Email platforms lean warm/friendly — yellow (MC) / magenta (Resend) / indigo (CK)" },
  ],

  responsive: [
    { element: "Compose layout", mobile: "single-col", tablet: "editor+preview", desktop: "editor 60% + preview 40%" },
    { element: "Campaign list",  mobile: "1col card",  tablet: "2col",          desktop: "table 1 row each" },
    { element: "Audience panel", mobile: "drawer",     tablet: "240px",         desktop: "280px" },
  ],

  snippets: [
    `/* Campaign card */
.campaign-card { background: #FFFFFF; border: 1px solid #E5E0D5; border-radius: 10px; padding: 14px 16px; display: grid; grid-template-columns: 1fr auto auto auto; gap: 16px; align-items: center; }
.campaign-card .subj { font-size: 14px; font-weight: 600; color: #241C15; }
.campaign-card .meta { font-size: 12px; color: #7A6E5F; }
.campaign-card .rate { font-size: 13px; font-weight: 600; font-variant-numeric: tabular-nums; color: #22C55E; }
.campaign-card .status { font-size: 11px; padding: 2px 8px; border-radius: 10px; background: #ECFDF5; color: #166534; font-weight: 600; }`,
    `/* Compose toolbar */
.compose-bar { display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: #FCFAF7; border-bottom: 1px solid #E5E0D5; }
.compose-bar .btn { background: #FFFFFF; border: 1px solid #E5E0D5; border-radius: 6px; padding: 5px 12px; font-size: 13px; color: #241C15; cursor: pointer; }
.compose-bar .btn--primary { background: #241C15; color: #FFE01B; border-color: #241C15; font-weight: 600; }
.compose-bar .btn--test { color: #6366F1; border-color: #C7D2FE; background: #EEF2FF; }`,
    `/* Personalization tag pill */
.token { display: inline-flex; align-items: center; gap: 4px; background: #FFF9D6; border: 1px solid #FFE01B; border-radius: 4px; padding: 1px 6px; font-family: "JetBrains Mono", monospace; font-size: 12px; color: #241C15; }
.token::before { content: "{{"; color: #7A6E5F; }
.token::after  { content: "}}"; color: #7A6E5F; }`,
  ],

  successLooksLike: [
    "Mailchimp campaign builder with audience + compose + preview",
    "Resend compose with React Email components + test-send",
    "ConvertKit broadcast composer + segment filter",
  ],

  failureLooksLike: [
    "Cold ERP-style send UI for a friendly newsletter tool",
    "Hidden test-send buried 3 menus deep",
    "Markdown-only compose labeled as 'email marketing platform'",
  ],

  tile: "tile-email",
  tileHTML: `
    <div class="card">
      <div class="subj">Weekly update · v2.1 is live</div>
      <div class="row">
        <span class="meta">Sent · May 26 · 12,400 recipients</span>
        <span class="rate">42% opens</span>
      </div>
    </div>
    <div class="card sm">
      <div class="subj">Welcome series · Day 1</div>
      <div class="row"><span class="meta">Scheduled · Tomorrow 9am</span><span class="st">queued</span></div>
    </div>
  `,
});

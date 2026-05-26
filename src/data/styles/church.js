import { asFullPreset } from "./compact.js";

export const church = asFullPreset({
  id: "church",
  name: "Church / Faith Community",
  tag: "Warm · serif · service-times",
  desc: "Cream + warm wood tones. Serif scripture. Service times + sermons. Modern megachurch / Anglican parish / community-faith register.",

  feel: "Visiting a thoughtful church's site looking for service times — warm, welcoming, the message + community + practical info all clear — not a corporate website in a steeple costume.",

  references: "hillsong.com, lifechurch.tv, redeemer.com, hillsongnyc.com, modern parish sites, Anglican Church of Canada, Trinity Church Wall Street",

  boldFactor: [
    "Warm palette: cream, oak, ochre, deep brown — sanctuary atmosphere",
    "Service times + locations PROMINENT (this is what 70% of visitors need)",
    "Sermon library: latest sermon hero (audio/video) + searchable archive",
    "Scripture quotations rendered as editorial pull quotes (serif, italic)",
    "Ministry / community groups grid: youth, kids, small-groups, missions",
    "Giving / tithe section — practical, transparent, never pushy",
    "Friendly tone: 'We'd love to meet you' / 'What to expect' for first-time visitors",
  ],

  tokens: {
    "bg":      { value: "#FBF6EC", usage: "Cream sanctuary" },
    "bg-alt":  { value: "#F3EAD7", usage: "Section alt — oak" },
    "fg":      { value: "#2D2018", usage: "Walnut body ink" },
    "muted":   { value: "#6B5B4D", usage: "Caption brown" },
    "accent":  { value: "#9B6B3A", usage: "Burnished gold / oak accent" },
    "deep":    { value: "#5D2E1F", usage: "Mahogany — links, scripture" },
    "rule":    { value: "#D9C9B0", usage: "Soft border" },
  },

  typography: {
    display: '"Fraunces", "Tiempos Headline", "Source Serif 4", serif',
    body:    '"Source Serif 4", "Tiempos Text", Georgia, serif',
    mono:    '"Söhne Mono", monospace',
    scale:   "12/14/16/18/22/32/48/64",
    weight:  "display 400-500 · body 400 · italic for scripture",
    tracking: "display open (0.01em) · italic for scripture references",
  },

  antiPatterns: [
    { name: "Corporate cold palette", dont: "use enterprise navy + grey", why: "Faith community = warmth + intimacy; cold palette reads as institution" },
    { name: "Aggressive evangelizing", dont: "use 'Join us — find salvation today' CTA", why: "Voice: 'You're welcome here' / 'Sundays at 10am'" },
    { name: "Stock praying-hands photo", dont: "use generic Shutterstock religious imagery", why: "Photography of the actual community, sanctuary, ministry" },
    { name: "Hidden service times", dont: "tuck times behind multiple clicks", why: "Service times + address are the #1 reason visitors come — make them obvious" },
    { name: "Modern abstract serif", dont: "use display serif made for fashion", why: "Use editorial humanist serifs (Fraunces, Source Serif) — feels civic + warm" },
  ],

  responsive: [
    { element: "Section padding", mobile: "48px",  tablet: "80px",  desktop: "112px" },
    { element: "Hero serif",      mobile: "36px",  tablet: "52px",  desktop: "64px" },
    { element: "Sermon player",   mobile: "stack", tablet: "row",   desktop: "row sticky" },
  ],

  snippets: [
    `/* Welcome hero */
.faith-hero { padding: 96px 32px; background: #FBF6EC; text-align: center; }
.faith-hero h1 { font-family: "Fraunces", "Tiempos Headline", serif; font-weight: 400; font-size: 64px; line-height: 1.05; color: #2D2018; max-width: 18ch; margin: 0 auto 16px; }
.faith-hero h1 em { font-style: italic; color: #9B6B3A; }
.faith-hero .welcome { font-family: "Source Serif 4", serif; font-style: italic; font-size: 18px; color: #6B5B4D; }`,
    `/* Service times card */
.service-card { background: #FFFFFF; border: 1px solid #D9C9B0; border-radius: 8px; padding: 24px; }
.service-card .label { font-family: "Source Serif 4", serif; font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; color: #9B6B3A; }
.service-card .time { font-family: "Fraunces", serif; font-weight: 500; font-size: 28px; color: #2D2018; margin: 4px 0; }
.service-card .where { font-style: italic; color: #6B5B4D; font-size: 15px; }`,
    `/* Scripture pull quote */
.scripture { font-family: "Fraunces", serif; font-style: italic; font-weight: 400; font-size: 26px; line-height: 1.4; color: #5D2E1F; max-width: 32ch; padding: 24px 0; border-top: 1px solid #D9C9B0; border-bottom: 1px solid #D9C9B0; }
.scripture cite { display: block; font-style: normal; font-size: 13px; color: #9B6B3A; margin-top: 12px; letter-spacing: 0.06em; text-transform: uppercase; }`,
  ],

  successLooksLike: [
    "A thoughtful Anglican parish site with service times + sermon",
    "Hillsong-style modern megachurch landing",
    "Redeemer Presbyterian sermon archive",
  ],

  failureLooksLike: [
    "Corporate landing with 'Join our community today!' SaaS CTA",
    "Stock praying-hands photo as hero",
    "Service times hidden behind a menu",
  ],

  tile: "tile-church",
  tileHTML: `
    <div class="hd">Sundays at <em>10am</em></div>
    <div class="loc">— 142 Maple Street · Singapore</div>
    <div class="scr">"Come to me, all who labor and are heavy laden."</div>
    <div class="cite">MATTHEW 11:28</div>
  `,
});

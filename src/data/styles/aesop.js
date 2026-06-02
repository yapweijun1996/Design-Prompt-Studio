import { asFullPreset } from "./compact.js";

export const aesop = asFullPreset({
  id: "aesop",
  name: "Aesop / Apothecary",
  tag: "Muted · editorial retail · understated luxe",
  desc: "Understated apothecary-luxury retail. Muted warm neutrals, a refined serif, abundant whitespace, long literate copy. Quiet confidence, never flashy.",
  feel: "An Aesop or Le Labo store page — taupe and stone tones, a beautiful serif, products shot like still-life, copy that reads like an essay. Restrained, sensorial, expensive.",
  references: "aesop.com, Le Labo, Cereal magazine, Kinfolk, Officine Universelle Buly, Byredo",
  boldFactor: [
    "Muted warm neutral palette — stone, taupe, olive, ink — no bright color",
    "A refined serif (Suisse Works / Newsreader / Fraunces) for display and editorial copy",
    "Abundant whitespace; left-aligned editorial columns, measured line length (60ch)",
    "Still-life product photography (clearly-labelled placeholder if none)",
    "Long, literate, sensorial copy — sentences, not bullet hype",
  ],
  tokens: {
    "bg":       { value: "#F4F1EA", usage: "Stone paper" },
    "bg-alt":   { value: "#E9E4D8", usage: "Section alt — warm" },
    "fg":       { value: "#33312B", usage: "Olive-ink text" },
    "muted":    { value: "#6B675C", usage: "Secondary text" },
    "accent":   { value: "#3D4A3A", usage: "Deep olive — links, rules" },
    "rule":     { value: "#CFC9B9", usage: "Hairline rule" },
  },
  typography: {
    display: '"Newsreader", "Fraunces", "Suisse Works", Georgia, serif',
    body:    '"Newsreader", Georgia, serif',
    mono:    '"JetBrains Mono", ui-monospace, monospace',
    scale:   "13/15/18/22/30/44/64",
    weight:  "display 400-500 · body 400 · italic for emphasis",
    tracking: "display normal · body normal · generous line-height 1.7 for the serif body",
  },
  antiPatterns: [
    { name: "Bright color", dont: "introduce saturated brand colors", why: "Aesop calm lives entirely in muted earth tones" },
    { name: "Sans body", dont: "set long copy in a grotesque", why: "the literate serif body IS the register" },
    { name: "Marketing hype", dont: "use 'BUY NOW!' urgency", why: "voice is essayistic and unhurried — 'Discover', 'A considered…'" },
  ],
  responsive: [
    { element: "Section padding", mobile: "48px", tablet: "88px", desktop: "120px" },
    { element: "Article measure", mobile: "100%", tablet: "34em", desktop: "38em" },
    { element: "Body",            mobile: "17px", tablet: "18px", desktop: "18px" },
  ],
  snippets: [
    `/* Editorial product column */
.entry { max-width:38em; margin:0 auto; font-family:"Newsreader",Georgia,serif; font-size:18px; line-height:1.75; color:#33312B; }
.entry h2 { font-size:44px; font-weight:500; letter-spacing:-.01em; line-height:1.1; }
.entry .lede { font-style:italic; color:#6B675C; }`,
    `/* Hairline-ruled label */
.label { font-size:13px; letter-spacing:.14em; text-transform:uppercase; color:#6B675C; border-top:1px solid #CFC9B9; padding-top:10px; }`,
  ],
  successLooksLike: ["aesop.com product page", "Le Labo store", "a Cereal magazine spread"],
  failureLooksLike: ["bright e-commerce template", "sans-serif body copy", "urgency banners + countdowns"],
  overrideGlobalRules: [
    "A refined serif for BODY copy is the register here — overrides any 'avoid serif body' guidance.",
  ],
  tile: "tile-premium",
  tileHTML: `<div style="height:150px;background:#F4F1EA;display:flex;flex-direction:column;justify-content:space-between;padding:18px;font-family:Newsreader,Georgia,serif;color:#33312B">
    <div style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#6B675C;font-family:Inter,sans-serif;border-top:1px solid #CFC9B9;padding-top:8px">Skin / Hydration</div>
    <div style="font-size:27px;font-weight:500;letter-spacing:-.01em;line-height:1.1">A considered<br/><em>ritual.</em></div>
    <div style="font-size:13px;color:#6B675C;font-style:italic">Discover the collection</div>
  </div>`,
});

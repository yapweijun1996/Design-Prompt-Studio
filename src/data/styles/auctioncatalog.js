import { asFullPreset } from "./compact.js";

export const auctioncatalog = asFullPreset({
  id: "auctioncatalog",
  name: "Auction Catalog",
  tag: "auction · provenance · collector commerce",
  desc: "A collector-commerce style for auction houses, rare objects, art lots, watches, furniture, wine, and provenance-heavy sales.",

  feel: "An auction catalog brought online: object-first, quiet luxury, lot numbers, estimates, condition notes, provenance, and bidding context.",

  references: "Sotheby's, Christie's, Phillips, Bonhams, Artsy auction pages, 1stDibs editorial catalog pages",

  boldFactor: [
    "The object image and lot metadata are the hero",
    "Estimate, provenance, condition, and sale timing appear together",
    "Use refined serif type with restrained rules and whitespace",
    "Bidding actions are clear but never loud discount-style commerce",
    "Object detail photography and labels drive trust",
  ],

  tokens: {
    bg: { value: "#F7F3EA", usage: "Catalog paper" },
    panel: { value: "#FFFCF6", usage: "Lot detail panels" },
    fg: { value: "#231F1A", usage: "Primary type" },
    muted: { value: "#746A5D", usage: "Provenance and notes" },
    accent: { value: "#7B1E22", usage: "Bid / sale accent" },
    rule: { value: "#D8CDBB", usage: "Catalog rules" },
    ink: { value: "#111111", usage: "Lot numbering" },
  },

  typography: {
    display: '"Canela", "Cormorant Garamond", Georgia, serif',
    body: '"Inter", "Neue Haas Grotesk Text", system-ui',
    mono: '"Suisse Intl Mono", "IBM Plex Mono", monospace',
    scale: "11/12/14/16/20/30/48/70",
    weight: "display 400-560 · body 400-520 · lot labels 600",
    tracking: "lot labels +0.14em, serif display normal",
  },

  antiPatterns: [
    { name: "Luxury ecommerce grid", dont: "turn lots into ordinary product cards", why: "Auction buying depends on provenance and condition" },
    { name: "Flash sale urgency", dont: "use red countdown pressure styling", why: "Collector commerce needs confidence, not panic" },
    { name: "Stock luxury gold", dont: "cover the UI in gold gradients", why: "Real auction catalogs are restrained" },
    { name: "Missing object evidence", dont: "hide condition reports or provenance", why: "Trust lives in the details" },
  ],

  responsive: [
    { element: "Lot hero", mobile: "image first, details below", tablet: "image + details side by side", desktop: "large object image with sticky lot panel" },
    { element: "Provenance", mobile: "accordion", tablet: "sectioned detail", desktop: "timeline beside condition report" },
    { element: "Bid panel", mobile: "sticky bottom summary", tablet: "right card", desktop: "fixed right sale panel" },
  ],

  snippets: [
    `.auction-page { background:#F7F3EA; color:#231F1A; font-family:Inter,system-ui,sans-serif; }`,
    `.lot-title { font-family:Canela,Georgia,serif; font-size:clamp(40px,7vw,70px); font-weight:450; line-height:.96; }`,
    `.lot-meta { border-top:1px solid #D8CDBB; border-bottom:1px solid #D8CDBB; padding:14px 0; }`,
  ],

  successLooksLike: [
    "The lot feels rare and inspectable",
    "Estimate, provenance, condition, and bid state are all easy to find",
    "The page feels like an auction house, not a fashion shop",
  ],

  failureLooksLike: [
    "A generic luxury product page",
    "Big gold buttons and discount badges",
    "No condition or provenance information",
  ],

  tile: "tile-auctioncatalog",
  tileHTML: `
    <div style="height:150px;background:#F7F3EA;color:#231F1A;display:flex;flex-direction:column;justify-content:space-between;padding:16px;font-family:Inter,system-ui,sans-serif">
      <div style="display:flex;justify-content:space-between;font:10px 'IBM Plex Mono',monospace;letter-spacing:.12em;text-transform:uppercase;color:#7B1E22"><span>lot 042</span><span>estimate</span></div>
      <div style="display:flex;align-items:center;gap:14px"><span style="width:56px;height:56px;border-radius:50%;background:radial-gradient(circle,#D8CDBB 35%,#231F1A 36%,#231F1A 43%,#FFFCF6 44%);box-shadow:0 14px 28px rgba(35,31,26,.18)"></span><b style="font-family:Canela,Georgia,serif;font-size:26px;font-weight:450;line-height:.95">Collector<br/>object</b></div>
      <div style="border-top:1px solid #D8CDBB;padding-top:8px;font-size:11px;color:#746A5D">Provenance · condition · bid</div>
    </div>
  `,
});

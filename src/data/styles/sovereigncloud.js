import { asFullPreset } from "./compact.js";

export const sovereigncloud = asFullPreset({
  id: "sovereigncloud",
  name: "Sovereign Cloud",
  tag: "regulated cloud · compliance · public-sector trust",
  desc: "A regulated-cloud style for government, banking, healthcare, and enterprise buyers who care about residency, audit, uptime, and policy.",
  sampleTemplate: "dashboard",

  feel: "Enterprise trust without generic navy SaaS: civic-grade, precise, evidence-heavy, and calm enough for high-stakes procurement.",

  references: "AWS GovCloud, Azure Government, Cloudflare for Government, Vanta Trust Center, GOV.UK service patterns, IBM Carbon",

  boldFactor: [
    "Data residency and compliance proof appear above the fold",
    "Region map, certification matrix, and audit log are visible",
    "Use restrained civic colors with high contrast",
    "Security language is specific, not marketing fluff",
    "Procurement, legal, and technical buyer paths are separate",
  ],

  tokens: {
    bg: { value: "#F7F9FC", usage: "Civic cloud background" },
    fg: { value: "#0B1F3A", usage: "Primary text" },
    muted: { value: "#52657A", usage: "Secondary copy" },
    accent: { value: "#1455D9", usage: "Primary action and selected region" },
    verified: { value: "#0E7C66", usage: "Compliant / verified states" },
    border: { value: "#D8E1EC", usage: "Tables, matrices, cards" },
    panel: { value: "#FFFFFF", usage: "Evidence panels" },
  },

  typography: {
    display: '"IBM Plex Sans", "Inter", system-ui',
    body: '"IBM Plex Sans", "Inter", system-ui',
    mono: '"IBM Plex Mono", "Geist Mono", monospace',
    scale: "12/14/16/18/24/32/48/64",
    weight: "display 600-700 · body 400-500 · evidence labels 600",
    tracking: "labels +0.08em, display normal",
  },

  antiPatterns: [
    { name: "Generic cloud gradient", dont: "use abstract blue-purple blobs", why: "Regulated buyers need specificity and proof" },
    { name: "Compliance logos only", dont: "replace evidence with badge rows", why: "Certifications need scope, date, and region" },
    { name: "Consumer startup tone", dont: "write casual hype copy", why: "Procurement and security teams need sober language" },
    { name: "Hidden legal details", dont: "bury residency and policy links in footer", why: "They are primary decision criteria" },
  ],

  responsive: [
    { element: "Compliance matrix", mobile: "stacked rows", tablet: "scrollable table", desktop: "wide matrix with sticky first column" },
    { element: "Region map", mobile: "region list", tablet: "map + list", desktop: "map, residency panel, and SLA panel" },
    { element: "Buyer paths", mobile: "segmented tabs", tablet: "3 cards", desktop: "procurement/legal/engineering columns" },
  ],

  snippets: [
    `.trust-matrix { border:1px solid #D8E1EC; border-radius:14px; overflow:hidden; background:#fff; }`,
    `.region-chip[aria-selected="true"] { background:#1455D9; color:#fff; }`,
    `.evidence-label { font-family:"IBM Plex Mono",monospace; letter-spacing:.08em; text-transform:uppercase; color:#52657A; }`,
  ],

  successLooksLike: [
    "A buyer can see residency, certifications, SLA, and auditability immediately",
    "The page feels civic and enterprise-grade without looking stale",
    "Compliance proof has scope and dates",
  ],

  failureLooksLike: [
    "Blue gradient cloud marketing",
    "Badge wall with no evidence details",
    "A generic B2B SaaS landing page with security words sprinkled in",
  ],

  tile: "tile-sovereigncloud",
  tileHTML: `
    <div style="height:150px;background:#F7F9FC;color:#0B1F3A;display:flex;flex-direction:column;justify-content:space-between;padding:16px;font-family:'IBM Plex Sans',Inter,system-ui,sans-serif">
      <div style="font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#1455D9">regulated cloud</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
        <span style="background:#fff;border:1px solid #D8E1EC;border-radius:8px;padding:8px;font-size:11px">ISO 27001</span>
        <span style="background:#0E7C66;color:#fff;border-radius:8px;padding:8px;font-size:11px">SG region</span>
        <span style="background:#fff;border:1px solid #D8E1EC;border-radius:8px;padding:8px;font-size:11px">SOC 2</span>
        <span style="background:#fff;border:1px solid #D8E1EC;border-radius:8px;padding:8px;font-size:11px">Audit log</span>
      </div>
      <div style="font-size:23px;font-weight:700;letter-spacing:-.02em;line-height:1">Cloud for<br/>regulated teams.</div>
    </div>
  `,
});

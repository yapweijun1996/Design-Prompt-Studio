import { asFullPreset } from "./compact.js";

export const securityreview = asFullPreset({
  id: "securityreview",
  name: "Security Review",
  tag: "security · compliance · trust center",
  desc: "A security-review style for trust centers, compliance portals, vendor risk reviews, access audits, and vulnerability programs.",

  feel: "A serious trust surface: evidence, controls, scopes, owners, exceptions, and security posture are visible without turning into fear marketing.",

  references: "Vanta trust centers, Drata compliance portals, GitHub security advisories, Cloudflare trust center, Linear security pages, Okta admin logs",

  boldFactor: [
    "Controls, evidence, owners, and review dates are first-class content",
    "Risk severity uses restrained labels and clear remediation paths",
    "Trust badges never replace proof, policy links, or audit artifacts",
    "Access, vulnerability, and vendor review states are visibly separate",
    "Use tight audit tables, scope chips, and evidence drawers",
  ],

  tokens: {
    bg: { value: "#0A1018", usage: "Security workspace" },
    panel: { value: "#111A26", usage: "Control and evidence panels" },
    fg: { value: "#EEF5FF", usage: "Primary text" },
    muted: { value: "#91A3B8", usage: "Policy metadata" },
    accent: { value: "#22C55E", usage: "Verified / compliant state" },
    warning: { value: "#F59E0B", usage: "Needs review" },
    danger: { value: "#F43F5E", usage: "Critical risk" },
    border: { value: "#243449", usage: "Panel boundaries" },
  },

  typography: {
    display: '"Inter Tight", "Geist", system-ui',
    body: '"Inter", system-ui, sans-serif',
    mono: '"Geist Mono", "IBM Plex Mono", monospace',
    scale: "11/12/13/14/16/22/34/48",
    weight: "display 650-760 · table labels 600 · body 400-520",
    tracking: "security labels +0.08em, numbers tabular",
  },

  antiPatterns: [
    { name: "Badge wall", dont: "show only SOC2/GDPR badges", why: "Security buyers need evidence and scope" },
    { name: "Hacker neon", dont: "use green matrix decoration", why: "This is security operations, not a movie terminal" },
    { name: "Fear copy", dont: "lead with scary breach messaging", why: "Trust should feel controlled and factual" },
    { name: "Hidden exceptions", dont: "bury open risks behind vague status text", why: "Review state is the product" },
  ],

  responsive: [
    { element: "Control table", mobile: "stacked evidence cards", tablet: "scrollable audit table", desktop: "table with sticky evidence rail" },
    { element: "Risk overview", mobile: "severity chips + summary", tablet: "summary + queue", desktop: "posture map, controls, and exceptions" },
    { element: "Evidence detail", mobile: "drawer", tablet: "side sheet", desktop: "persistent inspector panel" },
  ],

  snippets: [
    `.security-shell { background:#0A1018; color:#EEF5FF; font-family:Inter,system-ui,sans-serif; }`,
    `.control-row { display:grid; grid-template-columns:90px 1fr 120px 110px; gap:14px; border-bottom:1px solid #243449; padding:12px 0; }`,
    `.risk[data-state="verified"] { color:#22C55E; } .risk[data-state="review"] { color:#F59E0B; }`,
  ],

  successLooksLike: [
    "A buyer can inspect controls, evidence, owners, and scope",
    "Risk and compliance status are readable without being loud",
    "The UI feels like a real trust center, not badge marketing",
  ],

  failureLooksLike: [
    "A dark hacker landing page",
    "Compliance logos with no evidence",
    "Security status hidden behind vague green checkmarks",
  ],

  tile: "tile-securityreview",
  tileHTML: `
    <div style="height:150px;background:#0A1018;color:#EEF5FF;display:flex;flex-direction:column;justify-content:space-between;padding:15px;font-family:Inter,system-ui,sans-serif">
      <div style="display:flex;justify-content:space-between;font:10px 'Geist Mono',monospace;color:#22C55E;letter-spacing:.1em;text-transform:uppercase"><span>trust center</span><span>soc2</span></div>
      <div style="display:grid;gap:7px">
        <div style="display:flex;justify-content:space-between;background:#111A26;border:1px solid #243449;border-radius:9px;padding:8px;font-size:11px"><b>Access control</b><span style="color:#22C55E">verified</span></div>
        <div style="display:flex;justify-content:space-between;background:#111A26;border:1px solid #243449;border-radius:9px;padding:8px;font-size:11px"><b>Vendor risk</b><span style="color:#F59E0B">review</span></div>
      </div>
      <div style="font-size:22px;font-weight:760;letter-spacing:-.03em;line-height:1">Proof before<br/>trust.</div>
    </div>
  `,
});

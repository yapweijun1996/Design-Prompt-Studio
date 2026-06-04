import { asFullPreset } from "./compact.js";

export const aiopscommand = asFullPreset({
  id: "aiopscommand",
  name: "AI Ops Command",
  tag: "AI operations · command center · trace-led",
  desc: "A serious AI operations command center for monitoring agents, model runs, evals, costs, traces, and incidents.",
  sampleTemplate: "dashboard",

  feel: "A mission-control room for agentic software: fast, dark, precise, traceable, and built for operators who need to know what happened and why.",

  references: "LangSmith traces, OpenAI platform logs, Datadog incidents, Linear issues, Stripe Radar review queues, Honeycomb observability",

  boldFactor: [
    "Trace timeline is the hero artifact, not a decorative dashboard card",
    "Every AI action shows run id, model, cost, latency, confidence, and owner",
    "Dark operator canvas with severity color labels, never unlabeled neon",
    "Command palette and filter bar are first-class controls",
    "Human review, retry, rollback, and escalation states are visible",
  ],

  tokens: {
    bg: { value: "#080B12", usage: "Operator canvas" },
    panel: { value: "#111827", usage: "Trace and run panels" },
    fg: { value: "#F8FAFC", usage: "Primary text" },
    muted: { value: "#94A3B8", usage: "Secondary metadata" },
    accent: { value: "#38BDF8", usage: "Active command / selected trace" },
    warning: { value: "#F59E0B", usage: "Review and degraded states" },
    danger: { value: "#EF4444", usage: "Failed runs and incidents" },
    border: { value: "#243044", usage: "Panel dividers" },
  },

  typography: {
    display: '"Inter Tight", "Geist", system-ui',
    body: '"Inter", system-ui, sans-serif',
    mono: '"Geist Mono", "JetBrains Mono", monospace',
    scale: "11/12/14/16/20/28/40/56",
    weight: "display 650-750 · body 400-550 · metadata 500",
    tracking: "labels +0.08em, display tight",
  },

  antiPatterns: [
    { name: "Generic AI glow", dont: "use purple blobs as the main identity", why: "Ops teams need evidence, not mystique" },
    { name: "Untraceable automation", dont: "show agent output without run details", why: "The whole style is about auditability" },
    { name: "Cute chatbot UI", dont: "center the design on a friendly chat bubble", why: "This is an operations console, not consumer chat" },
    { name: "Vanity metrics", dont: "use big counters without drill-down rows", why: "Operators need row-level proof" },
  ],

  responsive: [
    { element: "Trace timeline", mobile: "single-column vertical timeline", tablet: "timeline + selected run", desktop: "timeline, run detail, and incident rail" },
    { element: "Command bar", mobile: "sticky bottom search", tablet: "top command input", desktop: "global command palette centered in header" },
    { element: "Run metadata", mobile: "collapsible chips", tablet: "side panel", desktop: "fixed right inspection rail" },
  ],

  snippets: [
    `.ops-shell { background:#080B12; color:#F8FAFC; font-family:Inter,system-ui,sans-serif; }`,
    `.trace-row { display:grid; grid-template-columns:96px 1fr auto; gap:16px; border-bottom:1px solid #243044; padding:14px 0; }`,
    `.severity[data-level="review"] { color:#F59E0B; } .severity[data-level="failed"] { color:#EF4444; }`,
  ],

  successLooksLike: [
    "A model run can be audited from trigger to tool calls to final action",
    "Failed / review / success states are obvious without relying on color alone",
    "The UI feels like Datadog for agents, not a marketing dashboard",
  ],

  failureLooksLike: [
    "A purple AI landing page with no traces",
    "Chat bubbles pretending to be operations",
    "Charts with no ownership, timestamps, or incident path",
  ],

  tile: "tile-aiopscommand",
  tileHTML: `
    <div style="height:150px;background:#080B12;color:#F8FAFC;display:flex;flex-direction:column;justify-content:space-between;padding:15px;font-family:Inter,system-ui,sans-serif">
      <div style="display:flex;justify-content:space-between;font:10px 'Geist Mono',monospace;color:#38BDF8;letter-spacing:.08em;text-transform:uppercase"><span>agent ops</span><span>run_047</span></div>
      <div style="display:grid;gap:7px">
        <div style="height:9px;background:#38BDF8;border-radius:4px;width:78%"></div>
        <div style="height:9px;background:#243044;border-radius:4px;width:58%"></div>
        <div style="height:9px;background:#F59E0B;border-radius:4px;width:68%"></div>
      </div>
      <div style="display:flex;gap:6px;font-size:10px"><span style="border:1px solid #243044;border-radius:999px;padding:4px 8px">latency 812ms</span><span style="border:1px solid #243044;border-radius:999px;padding:4px 8px">review</span></div>
    </div>
  `,
});

import { asFullPreset } from "./compact.js";

export const agenticworkflow = asFullPreset({
  id: "agenticworkflow",
  name: "Agentic Workflow",
  tag: "agents · workflow builder · human-in-loop",
  desc: "A visual workflow style for agent builders: nodes, approvals, memory, tools, evaluations, and human handoff.",

  feel: "Like a product team designing reliable agent workflows: visual, systematic, reviewable, and transparent about where automation stops.",

  references: "Zapier Canvas, n8n, LangGraph Studio, Dust, Retool Workflows, Temporal Cloud, GitHub Actions",

  boldFactor: [
    "Node graph or workflow path is the primary visual structure",
    "Human approval steps are designed as first-class nodes",
    "Tool permissions, memory reads, and outputs are visibly scoped",
    "Each node has status, retry policy, and last-run evidence",
    "The page must show build mode and run mode as distinct states",
  ],

  tokens: {
    bg: { value: "#FBFAF7", usage: "Warm builder canvas" },
    fg: { value: "#171717", usage: "Primary text" },
    muted: { value: "#6B7280", usage: "Node metadata" },
    accent: { value: "#7C3AED", usage: "Active node / CTA" },
    success: { value: "#16A34A", usage: "Completed node" },
    line: { value: "#D7D3E8", usage: "Workflow connectors" },
    panel: { value: "#FFFFFF", usage: "Node cards and side panels" },
  },

  typography: {
    display: '"Inter Tight", "Geist", system-ui',
    body: '"Inter", system-ui, sans-serif',
    mono: '"IBM Plex Mono", "Geist Mono", monospace',
    scale: "12/14/16/18/24/32/48",
    weight: "display 650-750 · node labels 600 · body 400",
    tracking: "normal, labels +0.06em",
  },

  antiPatterns: [
    { name: "Magic automation", dont: "hide tool calls or permissions", why: "Agent builders need to reason about risk" },
    { name: "Static diagram", dont: "show a decorative node graph with no state", why: "Workflow UI needs run evidence" },
    { name: "Approval afterthought", dont: "bury human review in settings", why: "Human-in-loop is central to agent reliability" },
    { name: "One huge canvas", dont: "make mobile unusable with an infinite graph", why: "Small screens need step-by-step workflow inspection" },
  ],

  responsive: [
    { element: "Workflow graph", mobile: "linear step list", tablet: "scrollable graph with inspector", desktop: "full canvas with right inspector" },
    { element: "Node detail", mobile: "bottom sheet", tablet: "side sheet", desktop: "persistent inspector rail" },
    { element: "Run history", mobile: "compact cards", tablet: "timeline", desktop: "split timeline + logs" },
  ],

  snippets: [
    `.workflow-canvas { background:#FBFAF7; background-image:radial-gradient(#D7D3E8 1px, transparent 1px); background-size:18px 18px; }`,
    `.node { background:#fff; border:1px solid #D7D3E8; border-radius:14px; box-shadow:0 10px 30px rgba(40,30,80,.08); }`,
    `.node[data-kind="approval"] { border-color:#7C3AED; box-shadow:0 0 0 3px rgba(124,58,237,.10); }`,
  ],

  successLooksLike: [
    "A user can tell which nodes are automated and which require human approval",
    "Workflow runs have logs, costs, retries, and outputs",
    "The canvas feels useful, not decorative",
  ],

  failureLooksLike: [
    "A pretty node diagram with no operational states",
    "Every node looks identical",
    "No visible tool permissions or approval path",
  ],

  tile: "tile-agenticworkflow",
  tileHTML: `
    <div style="height:150px;background:#FBFAF7;color:#171717;display:flex;flex-direction:column;justify-content:space-between;padding:16px;font-family:Inter,system-ui,sans-serif">
      <div style="font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#7C3AED">workflow</div>
      <div style="display:flex;align-items:center;gap:8px">
        <span style="width:48px;height:34px;border:1px solid #D7D3E8;border-radius:12px;background:#fff"></span>
        <span style="height:2px;width:24px;background:#D7D3E8"></span>
        <span style="width:48px;height:34px;border:1px solid #7C3AED;border-radius:12px;background:#fff;box-shadow:0 0 0 3px rgba(124,58,237,.12)"></span>
        <span style="height:2px;width:24px;background:#D7D3E8"></span>
        <span style="width:34px;height:34px;border-radius:50%;background:#16A34A"></span>
      </div>
      <div style="font-size:24px;font-weight:750;letter-spacing:-.03em;line-height:1">Agents with<br/>guardrails.</div>
    </div>
  `,
});

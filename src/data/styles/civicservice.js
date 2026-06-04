import { asFullPreset } from "./compact.js";

export const civicservice = asFullPreset({
  id: "civicservice",
  name: "Civic Service",
  tag: "public service · forms · accessibility",
  desc: "A public-service style for government forms, permits, benefits, appointments, resident portals, and civic information.",

  feel: "A service page that respects stressed users: plain language, large controls, clear eligibility, progress, proof, and next steps.",

  references: "GOV.UK service pages, Service NSW, Singapore government digital services, USWDS, 18F, Ontario Design System",

  boldFactor: [
    "Task completion beats brand expression",
    "Eligibility, required documents, fees, and processing time are visible early",
    "Forms are step-by-step with save/resume and error recovery",
    "Accessibility contrast and touch targets are non-negotiable",
    "Use plain language labels, not campaign copy",
  ],

  tokens: {
    bg: { value: "#FFFFFF", usage: "Service canvas" },
    panel: { value: "#F3F6F9", usage: "Info panels and callouts" },
    fg: { value: "#0B1F35", usage: "Primary text" },
    muted: { value: "#536270", usage: "Helper copy" },
    accent: { value: "#005EA8", usage: "Primary civic action" },
    focus: { value: "#FFDD00", usage: "Visible focus ring" },
    border: { value: "#B8C2CC", usage: "Form boundaries" },
  },

  typography: {
    display: '"Public Sans", "Inter", system-ui',
    body: '"Public Sans", "Inter", system-ui',
    mono: '"IBM Plex Mono", monospace',
    scale: "12/14/16/18/22/30/42/56",
    weight: "display 650-750 · body 400-550 · form labels 700",
    tracking: "normal, never decorative",
  },

  antiPatterns: [
    { name: "Campaign hero", dont: "use a cinematic city hero image", why: "People came to complete a task" },
    { name: "Tiny form controls", dont: "compress fields to look elegant", why: "Public services must work for everyone" },
    { name: "Brand-first copy", dont: "lead with slogans", why: "Plain task language reduces anxiety" },
    { name: "Hidden requirements", dont: "surprise users late with documents or fees", why: "Eligibility and proof must be upfront" },
  ],

  responsive: [
    { element: "Task intro", mobile: "single column with eligibility callout", tablet: "intro + requirement panel", desktop: "task content with right summary rail" },
    { element: "Form steps", mobile: "one question per screen", tablet: "stepper + form", desktop: "form with persistent progress and help rail" },
    { element: "Help content", mobile: "accordion", tablet: "inline callouts", desktop: "right help panel" },
  ],

  snippets: [
    `.service-page { background:#fff; color:#0B1F35; font-family:'Public Sans',Inter,system-ui,sans-serif; }`,
    `.service-button { background:#005EA8; color:#fff; min-height:48px; padding:0 22px; border-radius:4px; font-weight:700; }`,
    `.service-input:focus { outline:4px solid #FFDD00; outline-offset:2px; }`,
  ],

  successLooksLike: [
    "A resident knows whether they are eligible and what documents they need",
    "The form is readable, recoverable, and accessible on mobile",
    "The page feels official without becoming bureaucratic clutter",
  ],

  failureLooksLike: [
    "A glossy government marketing page",
    "Dense PDF-like instructions before any action",
    "Low contrast controls or unclear form errors",
  ],

  tile: "tile-civicservice",
  tileHTML: `
    <div style="height:150px;background:#fff;color:#0B1F35;display:flex;flex-direction:column;justify-content:space-between;padding:16px;font-family:'Public Sans',Inter,system-ui,sans-serif">
      <div style="display:flex;justify-content:space-between;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#005EA8"><span>service</span><span>step 1 of 4</span></div>
      <div style="font-size:25px;font-weight:750;line-height:1.03;letter-spacing:-.03em">Apply for<br/>support.</div>
      <div style="display:flex;gap:8px;align-items:center"><span style="background:#005EA8;color:#fff;border-radius:4px;padding:8px 12px;font-size:11px;font-weight:800">Start</span><span style="background:#F3F6F9;border-left:4px solid #FFDD00;padding:7px 9px;font-size:10px;color:#536270">10 min</span></div>
    </div>
  `,
});

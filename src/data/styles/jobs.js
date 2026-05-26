import { asFullPreset } from "./compact.js";

export const jobs = asFullPreset({
  id: "jobs",
  name: "Job Board",
  tag: "Listing · filter · apply",
  desc: "Job listing search + filter sidebar. Company-led cards. LinkedIn Jobs / Indeed / Glassdoor / Wellfound register.",

  feel: "Searching for senior PM roles on LinkedIn Jobs on a Tuesday — filters on the left, listing cards in the middle, company info on the right — not a generic career landing page.",

  references: "LinkedIn Jobs, Indeed, Glassdoor, Wellfound (AngelList), Hired, Built In, Otta, Welcome to the Jungle",

  boldFactor: [
    "Three-pane layout: filter sidebar (left) + job list (middle) + detail panel (right)",
    "Job card: title + company + logo + location + salary range + posted-date + tags (Remote, Hybrid)",
    "Filter sidebar: keyword, location, salary, experience, posted-within, easy-apply, remote",
    "Easy-apply (one-tap) vs. Apply-on-company-site differentiated",
    "Save / bookmark + 'similar jobs' rail",
    "Company snapshot in detail: size, industry, glassdoor rating, recent reviews",
    "Professional, calm palette: navy / white / one warm accent",
  ],

  tokens: {
    "bg":       { value: "#FFFFFF", usage: "Page white" },
    "bg-soft":  { value: "#F4F4F7", usage: "Sidebar / section alt" },
    "fg":       { value: "#1A1A1A", usage: "Body text" },
    "muted":    { value: "#6B6F73", usage: "Caption, metadata" },
    "brand":    { value: "#0A66C2", usage: "LinkedIn blue (or Indeed indigo)" },
    "easy":     { value: "#057642", usage: "Easy Apply green" },
    "salary":   { value: "#1A1A1A", usage: "Salary range bold" },
    "border":   { value: "#E0E0E0", usage: "Card border" },
  },

  typography: {
    display: '"Söhne", "Inter Display", system-ui',
    body:    '"Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "11/12/13/14/16/20/24/32",
    weight:  "display 600-700 · body 400-500",
    tracking: "normal",
  },

  antiPatterns: [
    { name: "Marketing landing", dont: "show a career site instead of search results", why: "Job seekers want to search; landing-page UI wastes a click" },
    { name: "Hidden salary",    dont: "show only 'Competitive' / 'DOE'", why: "Salary transparency drives engagement; hide it and listing gets skipped" },
    { name: "No remote tag",    dont: "omit Remote / Hybrid / On-site tags", why: "Work-mode tag is the #1 filter — must be visible on every card" },
    { name: "Generic apply",    dont: "use 'Apply now' without differentiating easy-apply vs. external", why: "One-tap vs. multi-step apply has wildly different effort; differentiate" },
    { name: "Stock office photos", dont: "use Shutterstock 'professionals' imagery", why: "Real company logos + offices + product UI build trust" },
  ],

  responsive: [
    { element: "Three-pane",    mobile: "stack tabs", tablet: "filter + list", desktop: "filter + list + detail" },
    { element: "Filter sidebar", mobile: "drawer", tablet: "240px", desktop: "280px" },
    { element: "Job card",      mobile: "100%",   tablet: "100%",  desktop: "440px" },
  ],

  snippets: [
    `/* Job card */
.job-card { background: #FFFFFF; border: 1px solid #E0E0E0; border-radius: 8px; padding: 14px 16px; display: grid; grid-template-columns: 48px 1fr; gap: 12px; cursor: pointer; }
.job-card:hover { background: #F4F4F7; border-color: #0A66C2; }
.job-card .logo { width: 48px; height: 48px; border-radius: 6px; background: #F4F4F7; }
.job-card .title { font-size: 16px; font-weight: 600; color: #1A1A1A; }
.job-card .company { font-size: 14px; color: #1A1A1A; margin-top: 2px; }
.job-card .meta { font-size: 13px; color: #6B6F73; margin-top: 4px; }
.job-card .tags { display: flex; gap: 6px; margin-top: 8px; }
.job-card .tag { font-size: 11px; padding: 2px 8px; border-radius: 10px; background: #EAF4FB; color: #0A66C2; font-weight: 500; }
.job-card .tag--easy { background: #E6F4EA; color: #057642; }`,
    `/* Filter sidebar */
.filter-side { background: #F4F4F7; border-radius: 8px; padding: 16px; }
.filter-group { padding: 12px 0; border-bottom: 1px solid #E0E0E0; }
.filter-group h4 { font-size: 13px; font-weight: 600; color: #1A1A1A; margin: 0 0 8px; }
.filter-group label { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #1A1A1A; padding: 4px 0; cursor: pointer; }
.filter-group label .count { margin-left: auto; color: #6B6F73; font-size: 12px; font-variant-numeric: tabular-nums; }`,
    `/* Easy-apply button */
.btn-easy-apply { background: #0A66C2; color: #FFFFFF; border: 0; border-radius: 999px; padding: 8px 18px; font-size: 14px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; }
.btn-easy-apply::before { content: "⚡"; }
.btn-easy-apply:hover { background: #004182; }`,
  ],

  successLooksLike: [
    "LinkedIn Jobs three-pane search",
    "Wellfound startup-jobs listing + remote tag",
    "Otta personalized job feed",
  ],

  failureLooksLike: [
    "Career marketing landing as 'job search'",
    "Listings hiding salary behind 'DOE'",
    "Job card without remote/hybrid/on-site tag",
  ],

  tile: "tile-jobs",
  tileHTML: `
    <div class="card hl">
      <div class="lg"></div>
      <div class="bd">
        <div class="tt">Senior Product Manager</div>
        <div class="co">Stripe · Remote · $180-220k</div>
        <div class="tg"><span class="rm">Remote</span><span class="ez">⚡ Easy Apply</span></div>
      </div>
    </div>
    <div class="card">
      <div class="lg"></div>
      <div class="bd">
        <div class="tt">Staff Engineer, Platform</div>
        <div class="co">Vercel · Hybrid · $240-280k</div>
      </div>
    </div>
  `,
});

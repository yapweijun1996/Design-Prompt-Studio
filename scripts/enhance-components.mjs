// One-shot script: enhance components.js impliesBy values with real
// taxonomy section slugs so context-keyword matching actually triggers.
// Run: node scripts/enhance-components.mjs

import fs from "node:fs";

const path = "src/data/components.js";
let src = fs.readFileSync(path, "utf8");

// Real taxonomy section slugs to add per component id.
const additions = {
  combobox:        ["filters", "filter-tabs"],
  multiselect:     ["filters", "filter-tabs"],
  datepicker:      ["filters", "filter-tabs"],
  slider:          ["filters", "filter-tabs"],
  segmented:       ["filter-tabs", "category-tabs"],
  searchbar:       ["search", "topbar", "command-palette"],
  modal:           ["oauth-buttons"],
  drawer:          ["filters", "right-inspector", "cart"],
  popover:         ["filters", "filter-tabs"],
  menu:            ["topbar", "notifications"],
  accordion:       ["faq", "faq-mini", "accordion-list", "sidebar-nav"],
  toast:           ["notifications"],
  alertbanner:     ["notifications", "maintenance", "coming-soon"],
  skeleton:        ["post-grid", "product-grid", "project-grid", "data-table", "user-table"],
  emptystate:      ["data-table", "user-table", "notifications", "activity-feed"],
  confirmdialog:   ["cancel"],
  progressbar:     ["progress", "progress-bar", "step-content"],
  breadcrumbs:     ["breadcrumbs", "topbar"],
  tabs:            ["category-tabs", "filter-tabs", "code-tabs"],
  pagination:      ["pagination", "product-grid", "post-grid", "project-grid", "archive", "data-table", "user-table"],
  infinitescroll:  ["post-grid", "activity-feed", "blog-index"],
  commandpalette:  ["command-palette", "topbar"],
  sidebarnav:      ["sidebar-nav", "dashboard"],
  bottomnav:       ["topbar"],
  skiplink:        ["topbar", "masthead"],
  datatable:       ["data-table", "user-table", "billing-history", "version-list", "audit-log", "change-plan", "order-details", "line-items"],
  kanban:          ["dashboard"],
  calendar:        ["timeline"],
  timeline:        ["timeline", "activity-feed", "audit-log", "version-list", "changelog"],
  statkpi:         ["kpi-cards", "results-stats", "dashboard", "primary-chart"],
  sparkline:       ["kpi-cards", "dashboard", "primary-chart"],
  heatmap:         ["primary-chart", "dashboard"],
  comparisontable: ["comparison-table", "feature-comparison", "comparison", "compare-page", "tier-cards"],
  diffview:        ["changelog", "version-list"],
  jsonviewer:      ["output-panel", "audit-log"],
  codeblock:       ["code-blocks", "code-tabs", "examples"],
  carousel:        ["gallery", "screenshots", "testimonials", "related", "recommendations"],
  lightbox:        ["gallery", "screenshots", "portfolio", "project-grid"],
  videoplayer:     ["hero", "step-content"],
  avatar:          ["team", "team-grid", "profile", "author-bio"],
  badge:           ["notifications", "tier-cards", "category-tabs", "filter-tabs"],
  variantpicker:   ["product", "product-grid"],
  minicart:        ["cart", "line-items", "checkout-cta"],
  wishlist:        ["product-grid", "product", "gallery"],
  pricedisplay:    ["pricing", "tier-cards", "product-grid", "product"],
  checkoutstepper: ["checkout", "checkout-cta", "payment", "shipping"],
  addressbook:     ["shipping", "checkout", "profile"],
  ratinginput:     ["testimonials", "review"],
  messagebubble:   ["activity-feed"],
  chatcomposer:    ["activity-feed"],
  signinsocial:    ["auth-login", "oauth-buttons"],
  signupwizard:    ["auth-login"],
  magiclinksent:   ["auth-login", "confirmation-hero", "next-steps"],
  profilemenu:     ["topbar", "masthead", "profile"],
  sortablelist:    ["line-items"],
  resizablepanes:  ["input-panel", "output-panel", "main-canvas"],
  fab:             ["topbar", "actions"],
  onboardingtour:  ["next-steps", "helper-text"],
  themetoggle:     ["topbar", "masthead"],
};

let edits = 0;
for (const [cid, extra] of Object.entries(additions)) {
  const re = new RegExp(
    `(id:\\s*"${cid}"[\\s\\S]*?impliesBy:\\s*\\[)([^\\]]*)\\]`,
  );
  src = src.replace(re, (_m, head, body) => {
    const items = body.split(",").map((s) => s.trim()).filter(Boolean);
    const set = new Set(items);
    for (const e of extra) set.add(`"${e}"`);
    edits++;
    return head + [...set].join(", ") + "]";
  });
}

fs.writeFileSync(path, src);
console.log(`Updated impliesBy on ${edits} components.`);

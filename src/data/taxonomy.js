// Webpage taxonomy — single source of truth for purpose buckets, page types,
// default section lists, and per-type clarifying questions.
//
// See docs/FLOW.md § 6 and KB memory d13e95c6.

// ─── PURPOSE BUCKETS ────────────────────────────────────────────────────────
// Top-level grouping a user picks first.

export const PURPOSE_BUCKETS = {
  marketing: {
    id: "marketing",
    name: "Marketing & Conversion",
    desc: "Persuade visitors to take an action",
    icon: "megaphone",
  },
  content: {
    id: "content",
    name: "Content & Editorial",
    desc: "Help readers learn, browse, or follow",
    icon: "book",
  },
  app: {
    id: "app",
    name: "Application & Tool",
    desc: "Interactive interfaces, often behind auth",
    icon: "layout-dashboard",
  },
  identity: {
    id: "identity",
    name: "Identity & Trust",
    desc: "Explain who you are and build credibility",
    icon: "user",
  },
  commerce: {
    id: "commerce",
    name: "Transactional & Commerce",
    desc: "Move money or commitments",
    icon: "shopping-cart",
  },
  special: {
    id: "special",
    name: "Special & Utility",
    desc: "Edge cases and one-offs",
    icon: "puzzle",
  },
};

// ─── PAGE TYPES (flat) ──────────────────────────────────────────────────────
// 30+ specific artifact types. Each carries its purpose, default sections,
// clarifying questions for conversational mode, and metadata for the gallery.

export const PAGE_TYPES = {
  // Marketing
  landing: {
    id: "landing",
    name: "Landing page",
    purpose: "marketing",
    genericTagline: "single-CTA campaign landing",
    genericIndustry: "B2B SaaS",
    commonIndustries: ["saas", "b2b", "consumer-app"],
    sections: ["hero", "social-proof", "features", "how-it-works", "testimonials", "pricing", "faq", "cta", "footer"],
    clarifyingQuestions: [
      "What's the ONE action you want a visitor to take?",
      "What pain are you solving — in their words, not yours?",
      "Who's the closest competitor and how are you different?",
      "Are there any constraints — pricing visible, screenshot available, etc.?",
    ],
  },
  pricing: {
    id: "pricing",
    name: "Pricing page",
    purpose: "marketing",
    genericTagline: "tiered pricing comparison",
    genericIndustry: "B2B SaaS",
    commonIndustries: ["saas", "subscription", "b2c"],
    sections: ["hero", "tier-cards", "feature-comparison", "faq", "trust-badges", "cta", "footer"],
    clarifyingQuestions: [
      "How many tiers? What does each include?",
      "Is there a free / trial / freemium offering?",
      "Annual vs monthly toggle?",
      "What's your most-asked sales question that pricing should answer?",
    ],
  },
  product: {
    id: "product",
    name: "Product detail",
    purpose: "marketing",
    genericTagline: "single product spotlight",
    genericIndustry: "consumer products",
    commonIndustries: ["dtc", "ecommerce", "saas"],
    sections: ["hero", "gallery", "specs", "benefits", "testimonials", "related", "cta", "footer"],
    clarifyingQuestions: [
      "What's the ONE feature you'd put on a billboard?",
      "How many product images / video do you have ready?",
      "Variants — sizes, colors, configurations?",
      "Trust signals — reviews, awards, certifications?",
    ],
  },
  "feature-page": {
    id: "feature-page",
    name: "Feature page",
    purpose: "marketing",
    genericTagline: "deep-dive on one capability",
    genericIndustry: "B2B SaaS",
    commonIndustries: ["saas", "developer-tools"],
    sections: ["hero", "screenshots", "use-cases", "integrations", "comparison", "cta", "footer"],
    clarifyingQuestions: [
      "Why does this feature deserve its own page?",
      "Who's the primary persona — and how does it change their day?",
      "Closest competitor's version — and how is yours better?",
    ],
  },
  "compare-page": {
    id: "compare-page",
    name: "Comparison vs competitor",
    purpose: "marketing",
    genericTagline: "feature-by-feature vs competitor",
    genericIndustry: "B2B SaaS",
    commonIndustries: ["saas", "developer-tools"],
    sections: ["hero", "comparison-table", "differentiators", "testimonials", "cta", "footer"],
    clarifyingQuestions: [
      "Who specifically are you comparing against?",
      "Which 3 dimensions matter most for the comparison?",
      "What about THEM is actually good (be honest)?",
    ],
  },
  "lead-capture": {
    id: "lead-capture",
    name: "Lead capture / squeeze",
    purpose: "marketing",
    genericTagline: "email-gated download",
    genericIndustry: "B2B SaaS",
    commonIndustries: ["saas", "marketing-agency"],
    sections: ["hero", "value-prop", "form", "social-proof", "footer"],
    clarifyingQuestions: [
      "What's the lead magnet (PDF, course, demo)?",
      "Minimum fields — just email, or more qualification?",
      "What happens after submit?",
    ],
  },
  category: {
    id: "category",
    name: "Category / collection",
    purpose: "marketing",
    genericTagline: "product-listing page",
    genericIndustry: "ecommerce",
    commonIndustries: ["ecommerce", "dtc"],
    sections: ["hero", "filters", "product-grid", "pagination", "related-categories", "footer"],
    clarifyingQuestions: [
      "How many items will this typically show?",
      "What filter facets matter most?",
      "Default sort order?",
    ],
  },

  // Content
  "blog-post": {
    id: "blog-post",
    name: "Blog post / article",
    purpose: "content",
    genericTagline: "long-form article",
    genericIndustry: "publishing",
    commonIndustries: ["publishing", "saas", "personal"],
    sections: ["masthead", "article-meta", "toc", "body", "pull-quote", "code-blocks", "author-bio", "related-posts"],
    clarifyingQuestions: [
      "Target word count?",
      "Code blocks, video embeds, or pure prose?",
      "Author byline + photo, or anonymous?",
      "Comments enabled?",
    ],
  },
  "blog-index": {
    id: "blog-index",
    name: "Blog index",
    purpose: "content",
    genericTagline: "article listing",
    genericIndustry: "publishing",
    commonIndustries: ["publishing", "saas"],
    sections: ["hero", "featured-post", "category-tabs", "post-grid", "pagination", "newsletter-cta", "footer"],
    clarifyingQuestions: [
      "How many categories / tags?",
      "Featured post slot, or chronological only?",
      "Newsletter signup integrated?",
    ],
  },
  docs: {
    id: "docs",
    name: "Documentation",
    purpose: "content",
    genericTagline: "developer / product docs",
    genericIndustry: "developer-tools",
    commonIndustries: ["developer-tools", "saas", "open-source"],
    sections: ["topbar", "sidebar-nav", "breadcrumbs", "toc", "content", "code-tabs", "callouts", "next-prev", "footer"],
    clarifyingQuestions: [
      "Versioned docs (v1, v2…) or always-latest?",
      "Code languages to show in tabs?",
      "Search built in?",
      "Edit-on-GitHub link?",
    ],
  },
  "case-study": {
    id: "case-study",
    name: "Case study",
    purpose: "content",
    genericTagline: "customer success story",
    genericIndustry: "B2B SaaS",
    commonIndustries: ["saas", "agency", "consultancy"],
    sections: ["hero", "challenge", "approach", "solution", "results-stats", "testimonial", "next-case", "cta"],
    clarifyingQuestions: [
      "Customer name + logo permission?",
      "What's the headline number / outcome?",
      "Any quotes already collected?",
    ],
  },
  faq: {
    id: "faq",
    name: "FAQ",
    purpose: "content",
    genericTagline: "questions & answers",
    genericIndustry: "any",
    commonIndustries: ["any"],
    sections: ["hero", "search", "category-tabs", "accordion-list", "still-stuck-cta"],
    clarifyingQuestions: [
      "How many questions total?",
      "Grouped by topic, or flat?",
      "Linkable per-question (URL hash)?",
    ],
  },
  changelog: {
    id: "changelog",
    name: "Changelog / release notes",
    purpose: "content",
    genericTagline: "what shipped, when",
    genericIndustry: "developer-tools",
    commonIndustries: ["developer-tools", "saas"],
    sections: ["topbar", "version-list", "rss-link", "footer"],
    clarifyingQuestions: [
      "How verbose per release — bullets or full notes?",
      "Filterable by category (feature, fix, breaking)?",
      "RSS feed?",
    ],
  },
  magazine: {
    id: "magazine",
    name: "Magazine / longform",
    purpose: "content",
    genericTagline: "editorial-driven page",
    genericIndustry: "publishing",
    commonIndustries: ["publishing", "lifestyle"],
    sections: ["masthead", "issue-meta", "featured-spread", "departments", "archive", "subscribe", "footer"],
    clarifyingQuestions: [
      "How often does a new issue drop?",
      "Visual-heavy or text-heavy?",
      "Print + digital, or digital-only?",
    ],
  },

  // App
  dashboard: {
    id: "dashboard",
    name: "Dashboard",
    purpose: "app",
    genericTagline: "KPI + data viz home",
    genericIndustry: "B2B SaaS",
    commonIndustries: ["saas", "analytics", "fintech"],
    sections: ["topbar", "sidebar-nav", "kpi-cards", "primary-chart", "data-table", "activity-feed", "filters"],
    clarifyingQuestions: [
      "What are the 3-5 KPIs that matter most?",
      "Do users drill into details, or is the dashboard read-only?",
      "Time ranges — 24h / 7d / 30d / custom?",
      "Embedded or standalone?",
    ],
  },
  admin: {
    id: "admin",
    name: "Admin panel",
    purpose: "app",
    genericTagline: "backoffice management UI",
    genericIndustry: "B2B SaaS",
    commonIndustries: ["saas", "enterprise"],
    sections: ["topbar", "sidebar-nav", "user-table", "permissions", "audit-log", "settings-form"],
    clarifyingQuestions: [
      "What entities does the admin manage?",
      "Bulk operations needed?",
      "Multi-tenant or single-tenant?",
    ],
  },
  workspace: {
    id: "workspace",
    name: "App workspace",
    purpose: "app",
    genericTagline: "main work surface (Figma/Linear style)",
    genericIndustry: "B2B SaaS",
    commonIndustries: ["saas", "productivity"],
    sections: ["topbar", "sidebar-nav", "main-canvas", "right-inspector", "command-palette"],
    clarifyingQuestions: [
      "What's the primary unit of work — document, project, file?",
      "Real-time collab, or solo?",
      "Keyboard-first or pointer-first?",
    ],
  },
  tool: {
    id: "tool",
    name: "Single-purpose tool",
    purpose: "app",
    genericTagline: "one input, one output",
    genericIndustry: "developer-tools",
    commonIndustries: ["developer-tools", "utility"],
    sections: ["topbar", "input-panel", "output-panel", "actions", "examples", "footer"],
    clarifyingQuestions: [
      "Input type — file, text, URL, image?",
      "Synchronous or async result?",
      "Save / share output?",
    ],
  },
  settings: {
    id: "settings",
    name: "Settings page",
    purpose: "app",
    genericTagline: "user / org preferences",
    genericIndustry: "B2B SaaS",
    commonIndustries: ["saas", "consumer-app"],
    sections: ["sidebar-nav", "profile", "security", "billing", "integrations", "notifications"],
    clarifyingQuestions: [
      "Personal-level, team-level, or both?",
      "Billing integrated here, or separate?",
      "Two-factor / SSO settings?",
    ],
  },
  "form-wizard": {
    id: "form-wizard",
    name: "Form / multi-step wizard",
    purpose: "app",
    genericTagline: "guided multi-step input",
    genericIndustry: "B2B SaaS",
    commonIndustries: ["saas", "fintech", "consumer-app"],
    sections: ["progress-bar", "step-content", "back-next", "save-resume"],
    clarifyingQuestions: [
      "How many steps?",
      "Save & resume across sessions?",
      "Validation per step or only at submit?",
    ],
  },

  // Identity
  about: {
    id: "about",
    name: "About page",
    purpose: "identity",
    genericTagline: "company / person story",
    genericIndustry: "any",
    commonIndustries: ["agency", "startup", "personal"],
    sections: ["hero", "story", "values", "team", "timeline", "press", "cta"],
    clarifyingQuestions: [
      "Origin story — and why does it matter to the visitor?",
      "Team photos available, or stay text-only?",
      "Values: how do they show up in the product?",
    ],
  },
  contact: {
    id: "contact",
    name: "Contact page",
    purpose: "identity",
    genericTagline: "ways to reach the team",
    genericIndustry: "any",
    commonIndustries: ["agency", "saas", "service"],
    sections: ["hero", "form", "office-locations", "alt-channels", "map", "faq-mini"],
    clarifyingQuestions: [
      "Form, email, calendar booking — which?",
      "Physical office addresses to list?",
      "Response SLA promise (\"within 24h\")?",
    ],
  },
  portfolio: {
    id: "portfolio",
    name: "Portfolio",
    purpose: "identity",
    genericTagline: "work showcase",
    genericIndustry: "design / creative",
    commonIndustries: ["agency", "freelance", "studio"],
    sections: ["hero", "project-grid", "filters", "case-study-teasers", "about-mini", "cta"],
    clarifyingQuestions: [
      "Project count — under 12, or many?",
      "Filter by client, year, discipline?",
      "Click-through to detail page per project?",
    ],
  },
  team: {
    id: "team",
    name: "Team page",
    purpose: "identity",
    genericTagline: "the humans behind the product",
    genericIndustry: "any",
    commonIndustries: ["agency", "startup", "saas"],
    sections: ["hero", "team-grid", "values", "open-roles-cta", "footer"],
    clarifyingQuestions: [
      "Photos available for everyone?",
      "Show roles / titles publicly?",
      "Link to LinkedIn / personal sites?",
    ],
  },
  careers: {
    id: "careers",
    name: "Careers page",
    purpose: "identity",
    genericTagline: "open roles + culture",
    genericIndustry: "any",
    commonIndustries: ["startup", "agency"],
    sections: ["hero", "values", "perks", "open-roles-list", "process", "cta"],
    clarifyingQuestions: [
      "How many open roles currently?",
      "Remote / hybrid / on-site policy?",
      "Salary transparency?",
    ],
  },
  testimonials: {
    id: "testimonials",
    name: "Testimonials wall",
    purpose: "identity",
    genericTagline: "customer quotes + logos",
    genericIndustry: "B2B SaaS",
    commonIndustries: ["saas", "agency"],
    sections: ["hero", "filter-tabs", "quote-grid", "logo-strip", "cta"],
    clarifyingQuestions: [
      "How many quotes do you actually have?",
      "Logos only, or quotes + logos?",
      "Categorized by use case?",
    ],
  },

  // Commerce
  cart: {
    id: "cart",
    name: "Shopping cart",
    purpose: "commerce",
    genericTagline: "review before checkout",
    genericIndustry: "ecommerce",
    commonIndustries: ["ecommerce", "dtc"],
    sections: ["line-items", "summary", "promo", "trust-badges", "recommendations", "checkout-cta"],
    clarifyingQuestions: [
      "Quantity editable in cart?",
      "Promo / discount codes?",
      "Cross-sell recommendations?",
    ],
  },
  checkout: {
    id: "checkout",
    name: "Checkout",
    purpose: "commerce",
    genericTagline: "payment + shipping flow",
    genericIndustry: "ecommerce",
    commonIndustries: ["ecommerce", "saas"],
    sections: ["progress", "contact", "shipping", "payment", "review", "trust-badges"],
    clarifyingQuestions: [
      "Guest checkout, account, or both?",
      "Single-page or multi-step?",
      "Payment providers — Stripe, PayPal, Apple Pay?",
    ],
  },
  "order-confirmation": {
    id: "order-confirmation",
    name: "Order confirmation",
    purpose: "commerce",
    genericTagline: "post-purchase success",
    genericIndustry: "ecommerce",
    commonIndustries: ["ecommerce", "saas"],
    sections: ["confirmation-hero", "order-details", "next-steps", "share-cta", "recommendations"],
    clarifyingQuestions: [
      "What ships next — email, package, account access?",
      "Cross-sell on this page or hold off?",
      "Refer-a-friend prompt?",
    ],
  },
  subscription: {
    id: "subscription",
    name: "Subscription management",
    purpose: "commerce",
    genericTagline: "manage recurring plan",
    genericIndustry: "saas",
    commonIndustries: ["saas", "subscription"],
    sections: ["current-plan", "usage", "billing-history", "change-plan", "cancel"],
    clarifyingQuestions: [
      "Self-serve cancel, or contact required?",
      "Show usage / consumption metrics?",
      "Pause vs. cancel option?",
    ],
  },

  // Special
  "404": {
    id: "404",
    name: "404 / Not found",
    purpose: "special",
    genericTagline: "page-not-found error",
    genericIndustry: "any",
    commonIndustries: ["any"],
    sections: ["icon-display", "headline", "helper-text", "search", "popular-links", "footer"],
    clarifyingQuestions: [
      "Search box, or just links?",
      "Animated / illustrated, or restrained?",
      "Recent / popular pages to suggest?",
    ],
  },
  "coming-soon": {
    id: "coming-soon",
    name: "Coming soon",
    purpose: "special",
    genericTagline: "pre-launch teaser",
    genericIndustry: "any",
    commonIndustries: ["startup", "consumer-app"],
    sections: ["logo", "tagline", "countdown", "email-signup", "social"],
    clarifyingQuestions: [
      "Hard launch date, or just \"soon\"?",
      "Email signup or social-only?",
      "Behind-the-scenes content while waiting?",
    ],
  },
  maintenance: {
    id: "maintenance",
    name: "Maintenance",
    purpose: "special",
    genericTagline: "service interruption page",
    genericIndustry: "saas",
    commonIndustries: ["saas", "ecommerce"],
    sections: ["icon", "headline", "eta", "status-link", "social"],
    clarifyingQuestions: [
      "ETA shown, or vague?",
      "Link to status page?",
      "How users hear about resolution?",
    ],
  },
  "auth-login": {
    id: "auth-login",
    name: "Login / signup",
    purpose: "special",
    genericTagline: "auth entry",
    genericIndustry: "any",
    commonIndustries: ["saas", "consumer-app"],
    sections: ["logo", "form", "oauth-buttons", "footer-links"],
    clarifyingQuestions: [
      "Email/password, magic link, or OAuth-only?",
      "Combined login+signup, or separate pages?",
      "Forgot password flow?",
    ],
  },
};

// ─── SECTIONS_BY_TYPE helper map (derived) ──────────────────────────────────
// Direct lookup of default sections per page type.
export const SECTIONS_BY_TYPE = Object.fromEntries(
  Object.values(PAGE_TYPES).map((t) => [t.id, t.sections]),
);

// ─── Page-types listed under each purpose bucket ────────────────────────────
export const PAGE_TYPES_BY_PURPOSE = Object.fromEntries(
  Object.keys(PURPOSE_BUCKETS).map((p) => [
    p,
    Object.values(PAGE_TYPES).filter((t) => t.purpose === p),
  ]),
);

// ─── Helpers ────────────────────────────────────────────────────────────────
export function getPageType(id) {
  return PAGE_TYPES[id] || null;
}

export function getPurpose(id) {
  return PURPOSE_BUCKETS[id] || null;
}

export function pageTypeCount() {
  return Object.keys(PAGE_TYPES).length;
}

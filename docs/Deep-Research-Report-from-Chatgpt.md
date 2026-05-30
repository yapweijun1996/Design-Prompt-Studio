# Website Design Prompt Studio

## Strategic product definition

The strongest version of **Website Design Prompt Studio** is not a website builder and not a coding agent. It is an **upstream intent-to-blueprint compiler**: a system that turns a vague request like “make me an AI tool landing page” into a structured website brief, normalized design requirements, a section plan, tokenized visual direction, and a copy-paste prompt tuned for a downstream AI builder or coding agent. That product position is not speculative; it is the pattern already emerging in today’s tools. Webflow’s AI site builder separates **site structure** from **design generation** and theme customization, Framer Wireframer is explicitly “built for structure, not style,” Wix creates an **AI website brief** before generation and then lets users refine themes, layouts, and text, Bolt includes an **Enhance prompt** workflow, and Builder.io supports **custom AI instructions** tied to design systems and components for more consistent output. citeturn16view0turn16view1turn16view3turn17view0turn19view0turn18view2

**Recommended definition.** Website Design Prompt Studio should be defined as a **structured website prompt and blueprint platform** for designers, developers, agencies, founders, PMs, and growth teams who want better first-pass website generations from downstream AI tools without locking themselves to a single builder. The product’s purpose is to standardize five things that current tools scatter across multiple workflows: category selection, page structure, section composition, visual direction, and output constraints. OpenAI’s prompt guidance emphasizes explicit identity, instructions, examples, and context, while Vercel’s v0 guidance says the best prompts consistently specify product surface, context of use, and constraints. Those two ideas fit this product exactly: the Studio’s job is to guarantee those ingredients before a build agent ever starts generating code. citeturn6view1turn6view2turn14view0turn14view1

**The problem it solves.** AI website generation often fails not because the target model is weak, but because the prompt is under-specified. Bolt’s own documentation compares simple and enhanced prompts and shows that the enhanced prompt produces a richer homepage and additional pages; v0’s prompt guidance likewise says more specific prompts lead to faster generation, cleaner code, and smarter UX decisions. In practice, vague prompts create generic marketing copy, poor section ordering, inconsistent density, inaccessible interaction patterns, and weak alignment to the actual business goal. Website Design Prompt Studio should therefore be treated as a **prompt QA and requirements-engineering layer** for website generation. citeturn19view0turn14view0turn14view1

**How it differs from existing products.** Webflow, Framer, Wix, and Builder.io are all trying to generate, edit, and publish websites or web experiences directly, often with visual editing layered on top. v0, Lovable, Bolt, Replit Agent, and Cursor focus on turning prompts into code, projects, or full applications, sometimes with planning or visual assistance. Your product should sit one layer earlier: it should be **renderer-agnostic** and **agent-agnostic**. The output is not “the website” but a **high-quality website generation package** that can target v0, Bolt, Lovable, Replit Agent, Cursor, Codex-style agents, or even a human designer working in Webflow or Framer. That positioning creates portability, reviewability, and reusable internal standards that direct generators usually bury inside chat history. citeturn16view1turn16view4turn17view0turn26view0turn25view1turn24view1turn19view1turn15view0turn24view2

**What the first version should be.** The right first version is a **rule-based Prompt Studio with optional AI assistance**, not a full drag-and-drop builder. It should have a category system, section registry, style registry, layout registry, blueprint JSON generator, prompt adapter layer, quality score, and export bundle. That scope gives you a real product without taking on the giant engineering burden of page-editor infrastructure. GrapesJS and Craft.js both exist because building page-editor mechanics, drag-drop composition, state serialization, layers, styles, and storage is a large standalone problem. Monaco already exists for browser-based code editing, and tldraw exists for infinite-canvas ideation. Your product should consume those patterns later, not try to recreate them on day one. citeturn20view0turn20view1turn20view2turn2search3

**What to avoid in the first version.** Avoid owning drag-and-drop layout editing, CMS, custom hosting, live collaboration, versioned deployment, or fully autonomous code execution in the first release. Webflow, Wix, Replit, Bolt, and Lovable already show how broad that surface can become when generation, runtime, hosting, publishing, databases, domains, and security controls are bundled into one product. Your moat is not “we also generate a site” but “we generate a better, more controllable, more portable set of requirements for site generation.” citeturn16view1turn17view0turn15view1turn19view1turn24view1

A complete commercial feature set should eventually include: structured idea intake, category inference, audience and goal modeling, section and layout recommendation, style token packs, blueprint JSON, downstream-agent prompt adapters, prompt quality scoring, exported Markdown briefs, saved prompt libraries, reusable templates, optional HTML preview, and later a light visual section arranger. That sequence keeps the product centered on **prompt quality and blueprint fidelity**, which is where the clearest differentiated value sits. citeturn17view0turn16view0turn18view2turn14view0

## End-to-end workflow

The workflow should be deliberately staged. Current builders increasingly reveal that the best generation flow is **structure first, then style, then implementation**: Webflow first generates site structure, pages, and sections, and only afterward generates design and theme; Framer’s Wireframer is explicitly about hierarchy and flow before visual locking; Wix creates a brief before build; Replit Agent offers a plan mode so users can review tasks before code changes; and Builder emphasizes guardrails and approval in AI-assisted workflows. Website Design Prompt Studio should adopt that same staging as a core product principle, not as an implementation detail. citeturn16view0turn16view3turn17view0turn15view0turn26view0

```text
Rough idea
  → intent parser
  → category classifier
  → normalized requirement object
  → section/layout/style recommendation
  → blueprint JSON
  → target-agent prompt adapter
  → quality scoring
  → export bundle
  → user copies prompt into downstream AI agent
```

**The pipeline should use models at the edges and rules in the middle.** Use an LLM or classifier for rough idea interpretation, ambiguous wording, and natural-language rewriting. Use deterministic registries and compatibility rules for category constraints, required sections, allowed layouts, style packs, and prompt assembly. Then use an LLM again, if needed, to improve the prose quality of the final prompt. OpenAI’s structured outputs guidance is especially important here: you want the model to fill a schema, not invent one. Structured outputs with strict JSON schemas are designed to keep required keys, enums, and object structure valid. citeturn6view3turn6view4turn6view5

**The raw-input parser** should accept either free text or structured selections. If the user writes “I want a premium site for a legal firm in Singapore with calm dark colors and a consultation form,” the parser should extract possible industry, page purpose, trust level, tone, target action, and device assumptions. The parser should not immediately produce a final prompt. It should first produce a **normalized requirement object** with confidence scores and any ambiguity flags. This is where OpenAI’s identity/instructions/context pattern is helpful internally: your system prompt for classification should tell the model it is doing extraction, not generation, and should return only the schema object. citeturn6view1turn6view3

**The category classifier** should return top candidates, not a single hard choice, until enough fields are known. For example, “restaurant website” could map to a brand homepage, booking site, delivery landing page, or event microsite. That means your classifier should separate **industry** from **surface type**. Builder.io’s distinction between page models, section models, and data models is instructive here: the same industry can produce multiple page types and reusable section types, so category logic needs to be composable rather than monolithic. citeturn18view0turn18view1

**The requirement normalizer** should map fuzzier user language into canonical registry values. “Luxury,” “premium,” and “high-end” can normalize to a `minimal_luxury` or `immersive_cinematic` style pack depending on category. “Admin page,” “backoffice,” and “operations panel” can normalize to `admin_panel`. “Modern clean bento” can map to `bento_grid + modern_saas`. This stage should also infer missing essentials—primary CTA, device priority, density, and preferred output stack—then ask for confirmation only when required. As Vercel’s v0 guidance puts it, strong results come from product surface, context of use, and constraints; the normalizer’s job is to ensure every project has those three dimensions. citeturn14view0turn14view1

**The section recommender** should be mostly rule-based. A landing page should require a hero, social proof or trust block, features or benefits, CTA, and footer. An admin panel should prefer sidebar, topbar, filters, table, and details drawer. An immersive site should prefer full-screen hero, chapter navigation, reveal sections, and final CTA. Webflow’s AI site builder already operates at the page-and-section level, and Webflow’s component guidance recommends a component-first approach for repeated UI. That supports a registry-driven recommendation model instead of letting the LLM freestyle the whole composition. citeturn16view0turn16view2

**The style recommender** should output token packs, not adjectives only. Builder’s custom instructions system explicitly uses design-system specifications, component usage patterns, and brand context to improve AI consistency, while the Design Tokens Community Group describes JSON-based token formats as the path to interoperability and theming across tools. That points to a practical design decision: style recommendations should become machine-readable token bundles with human-readable rationale attached. citeturn18view2turn23view2turn23view3turn23view4

**The prompt template engine** should generate several prompt variants from the same blueprint. At minimum, ship these output adapters:
- **Generic HTML adapter** for one-file static marketing pages.
- **React + Tailwind adapter** for v0 or code agents that work best with componentized UI.
- **Next.js adapter** for app-router builds and more structured exports.
- **Full-stack site/app adapter** for Lovable, Bolt, or Replit Agent, which can provision backend and auth if asked.
- **Existing-repo adapter** for Cursor or Codex-style workflows where the agent should create or patch files, explain the plan, and test changes.
- **Brief-only adapter** for human-led Webflow, Framer, or Builder workflows. citeturn25view1turn24view1turn19view1turn15view0turn24view2turn26view0

**The quality checker** should run before export. A prompt should not be “ready” if it lacks an explicit audience, primary goal, required sections, layout constraints, style guardrails, technical output format, or accessibility and responsive requirements. OpenAI’s guidance for coding tasks stresses explicit role, workflow guidance, and testing expectations; WCAG and ARIA APG should be the baseline for generated websites and interactive widgets. In other words, the studio’s job is not just to write prompts, but to reject weak prompts before they get copied into a build agent. citeturn6view1turn6view2turn23view0turn23view1

## Category, block, and style registries

The heart of the product should be **registries**, not prompt strings. Webflow treats reusable UI as composable components; Builder distinguishes pages, sections, and data models; Webflow’s AI builder and Wix both operate at the page-and-section level; and DTCG-style token formats exist specifically so visual decisions can travel across tools. Put differently: categories, sections, layouts, and token packs should all live as versioned JSON registries that the prompt engine composes, validates, and exports. citeturn16view2turn18view0turn18view1turn16view0turn17view0turn23view2turn23view4

**Category taxonomy.** The table below is the recommended first full taxonomy. The “purpose and users” column answers the product question; the rest determine defaults, recommendations, and anti-patterns.

| Category | Purpose and users | Typical sections | Preferred layouts and styles | Prompt rule and avoid |
|---|---|---|---|---|
| Landing Page | One primary conversion for ads, launches, offers, waitlists | Nav, hero, proof, features, CTA, FAQ, footer | One-page scroll, split hero, bento; modern SaaS, clean corporate | State one CTA and one audience; avoid multi-goal clutter |
| SaaS Website | Explain product, workflow, pricing, trust | Hero, logos, features, workflow, pricing, FAQ, footer | One-page or multi-page; bento, card grid; modern SaaS | Specify product surface and trial/demo path; avoid generic hype copy |
| AI Tool Website | Show AI use case, input/output value, trust, integrations | Hero, demo/example, workflows, integrations, pricing, FAQ | Split hero, bento, dark tech | Include a credible example flow; avoid “magic AI” vagueness |
| Corporate Website | Establish trust for company, services, and contact | Hero, about, services, case studies, team, contact, footer | Multi-page, centered or split; clean corporate | Emphasize trust signals and clarity; avoid startup-style noise |
| Admin Panel | Manage users, roles, data, operations | Sidebar, topbar, KPIs, filters, table, detail drawer | Dashboard shell, dense enterprise | Define entities, actions, and permissions; avoid marketing sections |
| Dashboard | Monitor status, metrics, trends, tasks | KPI cards, charts, filters, activity, table | Shell, grid, tabs; dense enterprise | Describe decisions users must make; avoid decoration-first layouts |
| E-commerce Website | Help users discover, compare, buy, and check out | Header, listing, PDP, cart, checkout, footer | Listing/filter, PDP, checkout; marketplace or premium retail | Define catalog structure and buying flow; avoid hidden pricing/info |
| Portfolio Website | Showcase work and credibility for a person or studio | Hero, selected work, about, services, contact | Masonry, editorial, minimal luxury | Make projects the main surface; avoid text-only self-promotion |
| Blog / Content Website | Readability, discovery, trust, subscription | Header, category nav, article cards, TOC, author, related posts | Editorial, magazine, docs hybrid | Optimize scan + reading flow; avoid over-designed typography |
| Documentation Website | Help users learn, search, and implement | Docs nav, search, article body, code blocks, next/prev | Sidebar docs shell; developer docs style | Prioritize IA and code readability; avoid marketing fluff |
| Booking Website | Convert visits into reservations or appointments | Hero, availability, packages, booking form, testimonials | Form-first, calendar, split layout | Design around availability → confirmation; avoid buried forms |
| Form / Application Website | Collect structured data accurately | Progress, form fields, review, success state | Form wizard, stepped flow | Reduce cognitive load; avoid long unstructured forms |
| Immersive / Interactive Website | Deliver narrative, brand impact, exploration | Full-screen hero, chapters, reveal blocks, final CTA | Scrollytelling, full-screen, canvas; immersive cinematic | Write as story beats; avoid standard SaaS section stacking |
| Utility / Error Page | Recover, redirect, explain failure or status | Error text, next step, search, support link | Centered, minimal, system style | Always include recovery actions; avoid cute empty dead ends |
| Marketplace Website | Match supply and demand across listings | Search, categories, filters, cards, trust, seller/buyer flows | Listing/filter, cards, tabs; marketplace style | Define marketplace side and trust logic; avoid generic store assumptions |
| Real Estate Website | Showcase properties and capture inquiries | Search, map/listing, property cards, agent info, inquiry form | Map + list, grid, detail layout; minimal luxury | Prioritize location, price, specs, contact; avoid tiny photos |
| Restaurant Website | Drive reservations, menu views, and location visits | Hero, menu, gallery, hours, map, booking, footer | Lifestyle, split, gallery; restaurant style | Highlight menu + logistics fast; avoid abstract branding-only pages |
| Event Website | Sell attendance and explain agenda | Hero, schedule, speakers, tickets, FAQ, sponsors | Landing scroll, schedule-first | Make date, place, ticket CTA obvious; avoid hiding logistics |
| Education Website | Build trust and guide enrollment | Hero, programs, outcomes, faculty, admissions, FAQ | Multi-page, cards, clean or playful | Explain offer and path to apply; avoid weak proof of outcomes |
| Healthcare Website | Build trust, explain services, enable booking/contact | Hero, services, clinicians, insurance, booking, FAQ | Calm, split, forms; healthcare calm | Use reassuring trust cues; avoid aggressive animations/claims |
| Finance Website | Explain products clearly and inspire confidence | Hero, product details, calculators, trust, FAQ, contact | Clean, comparison, card grid; financial professional | Emphasize clarity and compliance tone; avoid playful gimmicks |
| Legal Website | Convey expertise, practice areas, consultation path | Hero, services, attorney bios, case types, contact | Multi-page, clean corporate | Make expertise and contact route explicit; avoid over-stylized copy |
| Construction / Engineering Website | Show capability, projects, and quote/contact path | Hero, capabilities, sectors, projects, process, contact | Industrial clean, case-study-first | Showcase completed work and process; avoid generic corporate abstraction |

This taxonomy is intentionally **two-dimensional**: category should describe the **surface type** and sit alongside a separate **industry** field, so “Healthcare + Booking Website” or “Finance + Dashboard” can coexist. That composability is far more scalable than treating every business type as a hard-coded template silo. It also mirrors how Builder separates page, section, and data models, how Webflow AI works with pages and sections, and how Wix can generate multiple section types and layouts from one brief. citeturn18view0turn18view1turn16view0turn17view1

**Section and block library.** A practical first release should ship with a compact but expressive registry. Each block should have six fields: `purpose`, `compatibleCategories`, `requiredFields`, `layoutOptions`, `promptRule`, and `avoid`. The registry below is enough to support nearly all categories in the initial roadmap.

| Block | Best categories | Required fields | Layout options | Prompt rule | Avoid |
|---|---|---|---|---|---|
| Navbar | Most categories | Logo, nav items, CTA | Centered, split, mega nav | Keep top-level tasks obvious | Overloaded menus |
| Hero | Landing, SaaS, AI, Corporate, Portfolio | Headline, subhead, CTA, visual | Split, centered, full-screen | Explain value in 3–8 seconds | Empty decorative hero |
| Features | SaaS, AI, Corporate | Feature title, description, icon/visual | Grid, bento, cards | Tie features to capability | Duplicate benefits copy |
| Benefits | Landing, Healthcare, Finance | Benefit, supporting proof | Cards, list, icon rows | Focus on user outcomes | Repeating feature wording |
| Pricing | SaaS, AI, Services | Plans, inclusions, CTA | Columns, comparison, usage | Clarify purchase decision | Hidden fees/confusing tiers |
| Testimonials | Most acquisition pages | Quote, name, role, company | Cards, carousel, editorial | Use believable proof | Anonymous fake-sounding quotes |
| FAQ | Landing, Product, Booking, Healthcare | Question, answer | Accordion, grouped lists | Remove sales friction | Dumping unrelated content |
| CTA | Most categories | Message, action, fallback action | Banner, section, sticky CTA | End with a clear next step | Competing CTAs |
| Footer | Most categories | Links, contact, legal | Dense or brand minimal | Support navigation and trust | Orphan footer with no utility |
| Sidebar | Admin, Dashboard, Docs | Nav groups, active state | Collapsible, fixed | Prioritize frequent tasks | Too many top-level items |
| Topbar | Admin, Dashboard | Search, alerts, account controls | Fixed, contextual | Support secondary actions | Repeating sidebar items |
| Search | Marketplace, Docs, Listing | Placeholder, filters, result scope | Inline, global, command bar | Search should match content model | Decorative fake search |
| Filter bar | Dashboard, Marketplace, Listing | Facets, date range, reset | Horizontal, drawer, chip set | Make filter state visible | Hidden active filters |
| Data table | Admin, Dashboard | Columns, rows, states, actions | Dense table, sticky columns | Optimize for scan and action | Tiny hit targets, no empty states |
| KPI cards | Dashboard, Admin | Metric, delta, timeframe | Row, grid | Use decision-support metrics | Vanity metrics only |
| Charts | Dashboard, Finance | Dataset, axis labels, legend | Line, bar, area, donut | Choose chart for question | Decorative illegible charts |
| Product cards | E-commerce, Marketplace | Image, title, price, metadata, CTA | Grid, carousel | Make comparison easy | Missing critical metadata |
| Checkout | E-commerce, Booking | Cart, totals, fields, payment, review | Stepper, two-column | Reduce friction and errors | Surprise steps and weak validation |
| Blog cards | Blog, Corporate, News | Title, excerpt, author, date | Grid, list, featured + list | Support discovery and hierarchy | Wall of identical cards |
| Docs sidebar | Documentation | Sections, nesting, active link | Sticky, collapsible | Reflect information architecture | Deep nesting without search |
| Form wizard | Booking, Application | Steps, validation, review | Stepper, sidebar progress | Group related questions | Long one-page form dump |
| Gallery | Portfolio, Restaurant, Real Estate | Images, captions | Masonry, slider, grid | Support proof and browsing | Overcropped or contextless media |
| Timeline | Events, Company, Process | Stages, dates, descriptions | Vertical, horizontal | Make progression legible | Decorative chronology |
| Interactive hotspot | Immersive, Product showcase | Trigger, label, detail | Scene hotspots, image hotspots | Reveal specifics interactively | Hidden unexplained interactivity |
| Scroll animation | Immersive, Product, Campaign | Trigger points, content states | Parallax, pinned sections, reveal | Use motion to support narrative | Motion for its own sake |
| 3D product showcase | Immersive, Product launch | Model, angle states, captions | Full-screen, split, sticky viewer | Use only when product geometry matters | 3D with no fallback or purpose |

This library should be implemented the same way Webflow thinks about reusable components and Builder thinks about section models: each block is a reusable, configurable primitive, not an unstructured snippet library. Webflow’s component guidance explicitly recommends a component-first approach for any repeated UI, and Builder’s section models are specifically for reusable parts of pages edited in a visual flow. citeturn16view2turn18view1

**Visual style taxonomy.** Treat style as token packs plus writing rules, not just labels.

| Style | Best use case | Color, type, spacing, component behavior | Motion behavior | Avoid |
|---|---|---|---|---|
| Modern SaaS | SaaS, AI, startup landing pages | Clear accent palette, sans serif, medium radius, crisp cards, generous but not empty spacing | Subtle hover and enter transitions | Giant empty heroes, default purple gradients |
| Clean Corporate | Corporate, legal, finance, B2B services | Neutral palette, restrained accent, conservative spacing, low-ornament components | Minimal motion | Startup hype aesthetics |
| Dark Tech | AI tools, developer products, cybersecurity | Deep neutrals, bright signal accents, dense cards, code-like hierarchy | Subtle glows, restrained motion | Neon overload and unreadable contrast |
| Dense Enterprise | Admin, dashboard, backoffice | High-contrast UI, compact spacing, small radius, information-dense tables/forms | Minimal motion | Oversized cards and consumer-app emptiness |
| Minimal Luxury | Real estate, premium portfolio, luxury retail | Muted palette, elegant serif/sans pairing, whitespace, large imagery | Slow, elegant fades | Cheap glossy gimmicks |
| Editorial | Blog, magazine, thought leadership | Strong typography, measured whitespace, image-led rhythm | Very light motion | Card-grid monotony without hierarchy |
| Playful | Education, creative brands, youth products | Brighter palette, rounded shapes, expressive icons, more breathing room | Cheerful micro-interactions | Infantilizing serious products |
| Marketplace | Multi-vendor ecommerce and listings | Functional neutrality, metadata-rich cards, faceted controls | Lightweight motion | Style overpowering search and filters |
| Healthcare Calm | Clinics, wellness, health portals | Soft but high-contrast colors, reassuring typography, open layouts | Minimal calm motion | Aggressive sales energy |
| Financial Professional | Banking, fintech, insurance | Stable palette, crisp numerals, controlled spacing, clear states | Minimal motion | Gambling-app energy or novelty motion |
| Developer Docs | Documentation, API portals | Monospace support, code contrast, rigid hierarchy, narrow content width | None or very light | Marketing copy patterns inside docs |
| Immersive Cinematic | Product launches, campaigns, experiences | Large imagery/video, dark or dramatic palette, bold typography, chapter-based spacing | Narrative motion and pinning | Throwing animation everywhere |
| Brutalist | Experimental portfolios, art, niche brands | Hard edges, stark contrast, raw type, anti-polish composition | Little to no flourish | Using it where trust and calm are required |
| Glassmorphism | Futuristic product showcases, select AI tools | Layered translucency, soft blur, luminous accents, careful contrast | Smooth, subtle motion | Illegible text and over-blurred UI |

These style packs should ultimately compile into JSON token sets so they can be reused across previews, prompts, and later design exports. That approach aligns directly with DTCG’s push for JSON-based interoperability and theming across tools. citeturn23view2turn23view3turn23view4

## Blueprint schema and generated prompt format

The Studio should never go directly from raw user text to final prompt. It should go through a **blueprint object** first. This is where OpenAI structured outputs are especially valuable: the model should fill a strict schema, and your engine should validate `required` fields and reject unknown keys with `additionalProperties: false`. That gives you deterministic downstream behavior and lets the UI expose every assumption for review. citeturn6view3turn6view4turn6view5

**Recommended blueprint schema.**

```json
{
  "projectId": "string",
  "projectName": "string",
  "targetAgent": "generic_html | v0 | bolt | lovable | replit | cursor",
  "websiteCategory": "string",
  "industry": "string",
  "pagePurpose": "string",
  "businessGoal": "string",
  "primaryAudience": {
    "role": "string",
    "experienceLevel": "beginner | mixed | expert",
    "coreTasks": ["string"],
    "devicePriority": "mobile | desktop | mixed"
  },
  "brandContext": {
    "brandName": "string",
    "adjectives": ["string"],
    "tone": "string",
    "trustSignals": ["string"]
  },
  "pageStructure": [
    {
      "pageId": "string",
      "pageName": "string",
      "pageType": "string",
      "goal": "string",
      "layoutPattern": "string",
      "sections": [
        {
          "sectionId": "string",
          "blockType": "string",
          "purpose": "string",
          "requiredFields": ["string"],
          "layoutVariant": "string"
        }
      ]
    }
  ],
  "visualStyle": {
    "stylePack": "string",
    "colorBehavior": "string",
    "typographyBehavior": "string",
    "spacingBehavior": "string",
    "componentBehavior": "string",
    "animationBehavior": "string"
  },
  "designTokens": {
    "mode": "light | dark | mixed",
    "radius": "small | medium | large",
    "density": "compact | standard | airy",
    "shadow": "none | subtle | layered",
    "motion": "none | subtle | narrative"
  },
  "contentDirection": {
    "readingLevel": "general | technical | expert",
    "copyTone": "string",
    "seoKeywords": ["string"],
    "ctaStrategy": {
      "primary": "string",
      "secondary": "string"
    }
  },
  "technicalOutput": {
    "stack": "html_css_js | react_tailwind | nextjs | fullstack",
    "artifactShape": "single_file | page_component | app_scaffold",
    "externalDependencies": ["string"],
    "responsiveRequirement": "string",
    "accessibilityStandard": "WCAG 2.2 AA"
  },
  "avoidList": ["string"],
  "qualityChecks": {
    "mustInclude": ["string"],
    "mustAvoid": ["string"],
    "acceptanceCriteria": ["string"]
  }
}
```

That schema is intentionally split into **intent**, **surface**, **style**, **content**, and **technical output**, because those are the exact constraint groups current tools expose in different ways: Wix’s site brief and refinements, Webflow’s structure/theme separation, Framer’s structure-first wireframing, Builder’s design-system instructions, and v0’s emphasis on product surface, context, and constraints. citeturn17view0turn16view0turn16view3turn18view2turn14view0

**Complete example blueprint JSON.**

```json
{
  "projectId": "proj_traceforge_lp_001",
  "projectName": "TraceForge AI Tool Landing",
  "targetAgent": "v0",
  "websiteCategory": "ai_tool_website",
  "industry": "developer_tools",
  "pagePurpose": "landing_page",
  "businessGoal": "start_free_trial",
  "primaryAudience": {
    "role": "software engineers and engineering managers",
    "experienceLevel": "expert",
    "coreTasks": [
      "understand the product value in under 10 seconds",
      "see how the tool fits into existing observability workflows",
      "decide whether to start a free trial or book a demo"
    ],
    "devicePriority": "desktop"
  },
  "brandContext": {
    "brandName": "TraceForge",
    "adjectives": ["credible", "technical", "modern", "efficient"],
    "tone": "clear and practical, not hype-heavy",
    "trustSignals": [
      "SOC 2 badge",
      "GitHub integration",
      "used by platform teams",
      "real metrics examples"
    ]
  },
  "pageStructure": [
    {
      "pageId": "home",
      "pageName": "Home",
      "pageType": "landing_page",
      "goal": "convert visitors to free trial signups",
      "layoutPattern": "one_page_bento",
      "sections": [
        {
          "sectionId": "nav",
          "blockType": "navbar",
          "purpose": "top-level navigation and CTA",
          "requiredFields": ["logo", "links", "primary_cta"],
          "layoutVariant": "compact_right_cta"
        },
        {
          "sectionId": "hero",
          "blockType": "hero",
          "purpose": "communicate product value quickly",
          "requiredFields": ["headline", "subheadline", "primary_cta", "secondary_cta", "product_visual"],
          "layoutVariant": "split_hero"
        },
        {
          "sectionId": "proof",
          "blockType": "testimonials",
          "purpose": "establish trust",
          "requiredFields": ["logos", "metrics"],
          "layoutVariant": "logo_strip_plus_stats"
        },
        {
          "sectionId": "features",
          "blockType": "features",
          "purpose": "explain practical capabilities",
          "requiredFields": ["feature_title", "feature_desc", "mini_visual"],
          "layoutVariant": "bento_grid"
        },
        {
          "sectionId": "workflow",
          "blockType": "timeline",
          "purpose": "show input-to-output workflow",
          "requiredFields": ["steps", "results"],
          "layoutVariant": "three_step_horizontal"
        },
        {
          "sectionId": "pricing",
          "blockType": "pricing",
          "purpose": "support buying decision",
          "requiredFields": ["plans", "feature_matrix", "cta"],
          "layoutVariant": "three_tiers"
        },
        {
          "sectionId": "faq",
          "blockType": "faq",
          "purpose": "remove objections",
          "requiredFields": ["questions", "answers"],
          "layoutVariant": "accordion"
        },
        {
          "sectionId": "cta",
          "blockType": "cta",
          "purpose": "final conversion push",
          "requiredFields": ["message", "cta"],
          "layoutVariant": "centered_banner"
        },
        {
          "sectionId": "footer",
          "blockType": "footer",
          "purpose": "secondary navigation and legal",
          "requiredFields": ["links", "legal", "contact"],
          "layoutVariant": "dense_footer"
        }
      ]
    }
  ],
  "visualStyle": {
    "stylePack": "dark_tech",
    "colorBehavior": "deep slate base with restrained electric blue accents",
    "typographyBehavior": "clean sans serif with tight heading rhythm",
    "spacingBehavior": "compact above the fold, standard below the fold",
    "componentBehavior": "high-contrast cards with medium radius",
    "animationBehavior": "subtle hover and reveal only"
  },
  "designTokens": {
    "mode": "dark",
    "radius": "medium",
    "density": "compact",
    "shadow": "subtle",
    "motion": "subtle"
  },
  "contentDirection": {
    "readingLevel": "technical",
    "copyTone": "specific, credible, concise",
    "seoKeywords": ["AI observability", "developer tool", "prompt tracing", "LLM monitoring"],
    "ctaStrategy": {
      "primary": "Start free trial",
      "secondary": "Book demo"
    }
  },
  "technicalOutput": {
    "stack": "react_tailwind",
    "artifactShape": "page_component",
    "externalDependencies": ["shadcn/ui", "lucide-react"],
    "responsiveRequirement": "desktop-first but fully responsive for tablet and mobile",
    "accessibilityStandard": "WCAG 2.2 AA"
  },
  "avoidList": [
    "generic AI claims",
    "purple gradient hero",
    "oversized empty spacing",
    "stock-photo people",
    "fake terminal screenshots"
  ],
  "qualityChecks": {
    "mustInclude": [
      "clear headline",
      "visible primary CTA above the fold",
      "proof block before pricing",
      "semantic landmarks",
      "visible focus states"
    ],
    "mustAvoid": [
      "lorem ipsum",
      "interaction without keyboard support"
    ],
    "acceptanceCriteria": [
      "value proposition clear in under 10 seconds",
      "all critical actions reachable by keyboard",
      "prompt is immediately usable by v0"
    ]
  }
}
```

**The final prompt format** should be sectioned, because OpenAI’s guidance explicitly recommends structured prompt sections such as identity, instructions, examples, and context, and Vercel’s v0 prompt framework performs best when context of use and constraints are explicit. The generated prompt should therefore read like a short creative brief plus a technical spec plus a definition of done. citeturn6view1turn6view2turn14view0turn14view1

```text
Role
Goal
Website type
Business and audience context
Required pages and sections
Layout rules
Visual style rules
UX rules
Responsive rules
Accessibility rules
Technical stack and dependencies
Output contract
Constraints and avoid list
Acceptance checklist
```

**Example generated prompt for an AI Tool Landing Page.**

```text
You are a senior design engineer and product copywriter.

Create a production-ready landing page for TraceForge, an AI observability tool for software engineers and engineering managers. The primary business goal is to drive free trial signups, with a secondary CTA for booking a demo.

Website type:
- AI tool landing page
- One-page marketing site
- Desktop-first but fully responsive

Audience and context:
- Technical buyers evaluating tools quickly during work hours on desktop
- They care about credibility, workflow fit, integrations, and measurable outcomes
- They are skeptical of generic AI marketing language

Required sections in order:
- Compact navbar with logo, product links, pricing, docs link, and primary CTA
- Split hero with headline, subheadline, primary and secondary CTA, plus a realistic product visual
- Trust/proof strip with customer logos and at least three believable product metrics
- Feature section as a dense bento grid focused on practical capabilities
- Workflow section explaining how tracing, debugging, and alerting work from input to output
- Integration section for developer ecosystem compatibility
- Pricing section with three clear plans
- FAQ section focused on objections like setup time, data security, and model support
- Final CTA section
- Dense footer with legal and product links

Layout rules:
- Use a one-page bento-style layout
- Keep the above-the-fold area compact and information-rich
- Favor scannable cards, strong hierarchy, and clear section separation
- Maximum content width should feel like a real SaaS product, not a blog article

Visual style:
- Dark-tech style with deep slate backgrounds and restrained electric-blue accents
- Clean sans-serif typography
- Medium border radius
- High contrast
- Subtle hover states only
- No noisy gradients, no excessive blur, no stock-photo hero

UX rules:
- Value proposition should be understandable in under 10 seconds
- Primary CTA must be visible above the fold
- Provide anchor navigation for quick scanning
- Use real-looking UI patterns and avoid fake decorative widgets

Responsive rules:
- Must work cleanly on desktop, tablet, and mobile
- Reflow bento cards into a readable mobile stack
- Preserve CTA visibility on smaller screens

Accessibility rules:
- Use semantic HTML landmarks
- Ensure visible keyboard focus states
- Meet WCAG 2.2 AA contrast expectations
- Add meaningful alt text where images are used
- Do not rely on motion alone to communicate meaning

Technical output:
- Return a React + Tailwind implementation suitable for v0
- Prefer shadcn/ui style primitives where helpful
- Keep dependencies minimal

Constraints:
- No lorem ipsum
- No “revolutionary AI” fluff
- No purple-gradient startup cliché
- No inaccessible carousels
- No fake testimonials without role/company context

Acceptance checklist:
- Clear hero
- Credible proof
- Practical feature explanation
- Pricing clarity
- Keyboard accessibility
- Clean responsive implementation
- Output should be ready to paste directly into v0
```

**Example generated prompt for an Admin Panel.**

```text
You are a senior product designer and frontend engineer specializing in dense enterprise interfaces.

Create a production-ready admin panel for a subscription SaaS operations team. The primary users are support admins and operations managers who work mostly on large desktop monitors. Their core tasks are searching users, viewing account status, updating roles, reviewing invoices, and checking recent activity.

Website type:
- Admin panel
- Internal tool
- Dense enterprise interface

Information architecture:
- Left sidebar with navigation groups: Overview, Users, Organizations, Billing, Roles & Permissions, Audit Log, Settings
- Topbar with global search, notifications, workspace switcher, and user menu
- Overview page containing KPI cards, recent activity, alerts, and shortcuts
- User management page with filter bar, searchable data table, status badges, row actions, pagination, and a side drawer for detail view
- Roles & permissions page with a permission matrix and edit modal
- Billing page with invoices table, payment status filters, and export actions
- Audit log page with timestamped event list and entity filters

Layout rules:
- Use a dashboard shell with persistent sidebar and topbar
- Favor compact spacing and high information density
- Use tables where scanning is faster than cards
- Preserve clear visual grouping and alignment

Visual style:
- Dense enterprise style
- Light theme with strong contrast and restrained accent color
- Small border radius
- Minimal decorative shadows
- Clear status colors for success, warning, error, and neutral states

UX rules:
- Optimize for speed of scan and action
- Filters must always show their current state
- Row actions should be obvious but not visually noisy
- Empty, loading, and error states must be present
- Detail panels should not force full-page navigation unless necessary

Responsive rules:
- Desktop-first
- Tablet layout may collapse the sidebar
- Mobile can be a simplified fallback, but the primary experience is desktop

Accessibility rules:
- Semantic headings and landmarks
- Accessible table markup where appropriate
- Keyboard support for all menus, drawers, and modals
- Visible focus states
- Color should never be the only state indicator

Technical stack:
- Return a React + TypeScript admin interface
- Tailwind is preferred
- Use minimal mock data that matches the schema of a real system
- Separate major UI areas into components

Constraints:
- Do not generate a marketing dashboard
- Do not use oversized cards with empty whitespace
- Do not hide critical actions in ambiguous icon-only controls
- Do not use fake analytics for decoration without relevance

Acceptance checklist:
- Functional layout shell
- Data-dense but readable tables
- Search and filter affordances
- Detail drawer and modal patterns
- Loading, empty, and error states
- Keyboard-accessible interactions
```

**Example generated prompt for an Immersive Website.**

```text
You are a senior experiential web designer and frontend engineer.

Create an immersive scrollytelling website for a new electric concept car launch. The website’s job is to create desire, explain the vehicle’s design philosophy, and drive users to reserve an early access test drive.

Website type:
- Immersive interactive marketing site
- Narrative, not standard SaaS
- High visual impact with strong performance discipline

Audience:
- Design-conscious premium consumers and auto enthusiasts
- Many will browse on mobile first, then revisit on desktop
- They expect cinematic storytelling but still need product facts

Narrative structure:
- Full-screen intro hero with bold headline and vehicle reveal
- Chapter sequence for exterior design, interior experience, technology, performance, and sustainability
- Interactive hotspot section for key vehicle details
- Scroll-driven product reveal transitions between chapters
- Specification comparison section with clear factual data
- Reservation CTA section
- Footer with legal and support links

Layout rules:
- Use pinned and full-screen sections where appropriate
- Treat each chapter as a distinct narrative beat
- Keep text concise and cinematic
- Ensure there is still a clear reading flow when motion is reduced or unsupported

Visual style:
- Immersive cinematic style
- Dark premium palette with restrained accent highlights
- Large typography, dramatic imagery, generous section rhythm
- Motion should support storytelling, not distract from it

UX rules:
- Add chapter navigation or progress indication
- Keep the reservation CTA discoverable before the end
- Provide graceful fallback behavior if advanced motion is disabled
- Support touch and trackpad scrolling cleanly

Responsive rules:
- Mobile should preserve narrative clarity even if effects are simplified
- Desktop may use richer pinned layouts and parallax
- Keep text readable over media at every breakpoint

Accessibility rules:
- Respect reduced-motion preferences
- Provide semantic structure and text alternatives
- Maintain keyboard accessibility for interactive hotspots
- Do not auto-play audio
- Meet WCAG 2.2 AA contrast targets for all text overlays

Technical stack:
- Return a React implementation using Tailwind and Framer Motion
- Only use 3D if it genuinely improves the reveal; otherwise prefer performant 2D techniques
- Keep overall performance realistic for a production marketing site

Constraints:
- Do not fall back to a generic SaaS landing-page pattern
- Do not overuse motion in every section
- Do not bury specifications behind interaction only
- Do not make the experience unusable without fine scrolling control

Acceptance checklist:
- Clear chapter structure
- Meaningful reveal moments
- Accessible motion fallbacks
- Strong product narrative
- Reservation CTA path
- Responsive implementation with solid performance assumptions
```

## Interface, architecture, and data model

The UI should look less like a chatbot and more like a **workbench**. Builder’s Visual Editor, for example, organizes work into focused tabs for inserting blocks, styling, layering, data, and options, while Monaco exists because text and code become much easier to reason about inside a real editor surface. For this product, the right pattern is a dense three-pane interface with persistent, inspectable state rather than a chat thread where critical decisions scroll away. citeturn18view3turn2search3

**Recommended interface layout.**

```text
Left panel
  Idea intake
  Category
  Industry
  Audience
  Goal
  Layout
  Style
  Sections
  Output target

Center panel
  Normalized requirement summary
  Page tree
  Section flow
  Design tokens
  Warnings and recommendations

Right panel
  Blueprint JSON
  Final prompt
  Target-agent prompt variants
  Quality score
  Export actions
```

**Screen model.** The product should have seven screens or modes, but most users should live in one workspace:
- **Home**: recent projects, templates, and “describe your site idea.”
- **Project creation**: pick target agent, stack, and starting category.
- **Prompt builder**: the main three-pane workspace.
- **Blueprint view**: page tree, sections, tokens, and validation.
- **Prompt output view**: generic prompt plus target-agent variants.
- **Saved prompt library**: versioned prompts and reusable blueprints.
- **Settings**: default stacks, style packs, company presets, preview mode, export defaults.

**Core technical architecture.**

```text
Frontend
  UI shell
  registry browser
  form controls
  blueprint inspector
  prompt editor
  export center
  optional preview pane

Core engine
  idea parser
  classifier
  normalizer
  compatibility rules
  recommendation engine
  blueprint generator
  prompt assembler
  quality scorer

Adapters
  generic_html
  react_tailwind
  nextjs
  v0
  bolt
  lovable
  replit
  cursor

Registry layer
  categories.json
  industries.json
  layouts.json
  styles.json
  sections.json
  promptTemplates.json
  antiPatterns.json

Persistence
  local preferences
  saved projects
  generated prompts
  template imports
```

**Frontend and state.** If the goal is a serious MVP instead of a throwaway prototype, go straight to **React + TypeScript + Vite**. The app is form-heavy, stateful, schema-driven, and registry-driven, which is exactly the kind of product where typed state and component composition pay off early. Your internal state should separate **source input**, **normalized intent**, **blueprint**, **prompt variants**, and **quality results**, so each stage is diffable and testable. If you later add a visual builder, Craft.js is a strong signal that serializable editor state matters; its editor state can be serialized into JSON and restored, which is the right long-term mental model for section arrangements and blueprint persistence. citeturn20view1

**Storage.** Use `localStorage` for lightweight preferences such as recent target agent, preferred output stack, and UI settings; MDN notes that `localStorage` is origin-scoped and persists across browser sessions. Use IndexedDB for real project data, because it is asynchronous, origin-scoped, and can store richer project histories and larger generated artifacts while also working offline. That gives you a clean split: preferences in `localStorage`, projects and exports in IndexedDB. citeturn22view0turn22view1turn21view5

**Responsive behavior inside the Studio.** The Studio itself should be responsive, but it should also help users reason about responsive output. MDN describes responsive design as the practice of making pages render well across screen sizes and container queries as a way to let components adapt to the size of their container rather than only the viewport. That is especially useful here because your blueprint and preview panes will live in resizable side-by-side panels, and your prompt builder components should still behave well inside narrower containers. citeturn22view3turn22view2

**HTML preview and security.** Preview is valuable, but it is also the part of the product most likely to expand your scope or introduce security problems. CSP exists to reduce risk from XSS and related threats, and MDN explicitly warns that inline JavaScript is blocked by default under a strict CSP; it also warns that combining `allow-scripts` with `allow-same-origin` in an iframe is strongly discouraged because it can effectively collapse the sandbox. For that reason, the safest MVP is a **static or JS-disabled preview** for early releases, with script-enabled previews only later and only from a **separate origin** with a tight CSP and no privileged app APIs exposed. citeturn21view4turn21view3turn21view0turn21view1turn21view2

**Canonical data-model records.** These sample objects are enough to ground implementation.

**`categories.json`**
```json
[
  {
    "id": "ai_tool_website",
    "label": "AI Tool Website",
    "surfaceType": "marketing",
    "purpose": "Explain an AI product and convert visitors",
    "defaultSections": ["navbar", "hero", "testimonials", "features", "pricing", "faq", "cta", "footer"],
    "recommendedLayouts": ["split_hero", "bento_grid", "one_page_scroll"],
    "recommendedStyles": ["dark_tech", "modern_saas"],
    "avoid": ["generic_ai_claims", "decorative_empty_hero"]
  }
]
```

**`industries.json`**
```json
[
  {
    "id": "developer_tools",
    "label": "Developer Tools",
    "trustLevel": "high",
    "contentBias": "technical",
    "defaultStyleWeights": {
      "dark_tech": 0.6,
      "modern_saas": 0.4
    }
  }
]
```

**`layouts.json`**
```json
[
  {
    "id": "bento_grid",
    "label": "Bento Grid",
    "bestFor": ["saas_website", "ai_tool_website", "dashboard"],
    "density": "standard",
    "deviceBias": "desktop",
    "compatibleBlocks": ["features", "kpi_cards", "pricing", "gallery"]
  }
]
```

**`styles.json`**
```json
[
  {
    "id": "dark_tech",
    "label": "Dark Tech",
    "tokens": {
      "mode": "dark",
      "radius": "medium",
      "density": "compact",
      "motion": "subtle"
    },
    "writingRules": [
      "be specific",
      "avoid hype",
      "prefer practical capability statements"
    ]
  }
]
```

**`sections.json`**
```json
[
  {
    "id": "hero_split",
    "blockType": "hero",
    "label": "Split Hero",
    "compatibleCategories": ["landing_page", "saas_website", "ai_tool_website"],
    "requiredFields": ["headline", "subheadline", "primary_cta", "secondary_cta", "visual"],
    "layoutOptions": ["left_copy_right_visual", "right_copy_left_visual"],
    "promptRule": "Explain the product value in under 10 seconds and pair it with a believable product visual.",
    "avoid": ["long_paragraphs", "abstract_stock_imagery"]
  }
]
```

**`promptTemplates.json`**
```json
[
  {
    "id": "react_tailwind_marketing",
    "targetAgent": "v0",
    "stack": "react_tailwind",
    "templateSections": [
      "role",
      "goal",
      "audience_context",
      "required_sections",
      "layout_rules",
      "visual_style",
      "responsive_rules",
      "accessibility_rules",
      "output_contract",
      "constraints",
      "acceptance_checklist"
    ]
  }
]
```

**`savedProjects.json`**
```json
[
  {
    "id": "proj_traceforge_lp_001",
    "name": "TraceForge AI Tool Landing",
    "createdAt": "2026-05-30T10:00:00+08:00",
    "updatedAt": "2026-05-30T10:30:00+08:00",
    "targetAgent": "v0",
    "blueprintRef": "bp_traceforge_lp_001",
    "status": "draft"
  }
]
```

**`generatedPrompts.json`**
```json
[
  {
    "id": "gp_traceforge_v0_001",
    "projectId": "proj_traceforge_lp_001",
    "variant": "v0",
    "qualityScore": 91,
    "generatedAt": "2026-05-30T10:31:00+08:00",
    "text": "You are a senior design engineer and product copywriter..."
  }
]
```

Those records should all be validated through JSON Schema, and your long-term token structure should stay close to DTCG-compatible conventions so the system can eventually feed designers, builders, and coding agents from the same source of truth. citeturn6view3turn23view2turn23view4

**Recommended project folder structure.**

```text
website-design-prompt-studio/
  apps/
    studio-web/
      src/
        app/
        components/
        features/
          intake/
          classifier/
          normalizer/
          blueprint/
          prompt-output/
          quality/
          exports/
          saved-library/
        adapters/
          generic-html.ts
          react-tailwind.ts
          nextjs.ts
          v0.ts
          bolt.ts
          lovable.ts
          replit.ts
          cursor.ts
        registries/
          categories.json
          industries.json
          layouts.json
          styles.json
          sections.json
          promptTemplates.json
          antiPatterns.json
        schemas/
          blueprint.schema.json
          prompt.schema.json
          registry.schema.json
        store/
        lib/
        workers/
        styles/
  packages/
    prompt-engine/
    registry-utils/
    validators/
    exporters/
```

## Competitive landscape

The current market breaks into three clusters. First are **site builders and visual generators** like Webflow, Framer, Wix, and Builder.io. Second are **agentic coding/build tools** like v0, Lovable, Bolt, Replit Agent, and Cursor. Third are **editor infrastructure layers** like GrapesJS, Craft.js, tldraw, and Monaco. The table below synthesizes their current official positioning and what each one usefully teaches your product. citeturn16view1turn16view3turn17view0turn26view0turn25view1turn24view1turn19view1turn15view0turn24view2turn20view0turn20view1turn20view2turn2search3

| Product or tool | What to learn | What not to copy |
|---|---|---|
| Webflow | Structure → sections → design → theme is a powerful staged flow; reusable components and scalable design systems matter | Do not compete head-on with full visual site building, CMS, hosting, and editor complexity |
| Framer | “Structure, not style” is a great first-pass generation principle; fast wireframing helps users escape blank-canvas paralysis | Do not stop at pretty wireframes without requirements rigor |
| Wix | AI brief creation and later refinement of layout/theme/text validate the brief-first workflow | Do not bundle too much SMB platform breadth into the first release |
| Builder.io | Design-system-aware generation, custom instructions, models, and governance are highly relevant | Do not anchor the product to a single in-product visual editor workflow |
| v0 | Prompt quality matters enormously; product surface + context + constraints is an excellent core formula | Do not assume every project should target React UI generation |
| Lovable | Full-stack generation from natural language is valuable for certain output profiles | Do not let the studio become a backend/platform product too early |
| Bolt | Prompt enhancement is explicit proof that upstream prompt quality changes outcomes | Do not combine prompt studio scope with hosting, database, and infra scope in version one |
| Replit Agent | Plan mode and approval checkpoints are important for trust and reviewability | Do not bury all decision-making in opaque agent behavior |
| Cursor | Existing-repo workflows, task planning, and agent collaboration matter for advanced users | Do not assume all users want inside-IDE behavior from day one |
| GrapesJS | If you later build a visual arranger, blocks, layers, style manager, and storage are the right primitives | Do not start here; it is an editor framework, not your differentiation |
| Craft.js | React-native control and serializable JSON state are excellent patterns for future section editing | Do not build a full custom page editor before proving blueprint demand |
| tldraw | If you later add canvas ideation or narrative mapping, canvas infrastructure and custom interactions are powerful | Do not treat infinite canvas as the core UX now |
| Monaco Editor | Prompt and code editing deserve a real editor surface with developer ergonomics | Do not overinvest in code-editing niceties before the prompt engine is stable |

The strategic implication is straightforward: **do not compete where the giants are strongest**. Webflow, Wix, Builder, Framer, v0, Lovable, Bolt, Replit, and Cursor are all powerful once generation begins. Your product wins earlier in the funnel, where planning, translation, standardization, and output portability are still weakly owned. citeturn16view1turn17view0turn26view0turn25view1turn24view1turn19view1turn15view0turn24view2

## Roadmap, quality control, and implementation tasks

The roadmap should deliberately move from **deterministic prompt engineering** toward **optional visual editing**, not the reverse. That sequencing is safer because prompt generation, structured outputs, and registries are lightweight compared with the editor/state/history/storage requirements that frameworks like GrapesJS and Craft.js expose. It also keeps the product aligned with the original thesis: better build instructions first, heavier rendering workflows later. citeturn6view3turn20view0turn20view1

| Phase | Features | Complexity | Main risk | Success criteria |
|---|---|---|---|---|
| Rule-based Prompt Studio | Registry-driven forms, blueprint JSON, generic prompt export, local save | Medium | Weak taxonomy or brittle rules | Users can produce exportable prompts without AI classification |
| AI-assisted Classification | Free-text idea parsing, category suggestions, rewrite assistance | Medium | Misclassification and over-trust | Users accept top suggestion most of the time and override easily |
| Blueprint Generator | Page tree, section ordering, token packs, validation, Markdown brief | Medium | Schema drift | Blueprint becomes the stable center of the product |
| HTML Preview | Static or low-risk preview, responsive frames, export checks | Medium to high | Scope creep and security issues | Preview helps review prompts without becoming a builder |
| Prompt Library and Templates | Saved prompts, search, duplication, quality history, presets | Low to medium | Weak reuse model | Teams reuse prompts and blueprints instead of starting from scratch |
| Advanced Visual Builder | Section reorder, inline block changes, optional block properties editor | High | Editor complexity explosion | Round-trip from blueprint to visual edits and back works reliably |

**Prompt quality scoring system.** Use a 100-point rubric with weighted dimensions:

| Dimension | Weight | Full-score condition |
|---|---:|---|
| Clarity | 15 | One clear website type, one primary goal, no contradictory instructions |
| Specificity | 20 | Audience, moment of use, content blocks, and real constraints are explicit |
| Completeness | 20 | Required sections, layout assumptions, and output contract are fully present |
| Layout readiness | 10 | Concrete layout pattern, density, and device priority are defined |
| Visual direction | 10 | Style pack, tone, and avoid rules are usable by a designer or model |
| Technical readiness | 15 | Stack, artifact shape, dependencies, and delivery expectations are explicit |
| AI-agent readiness | 10 | Prompt is copy-pasteable, bounded, and includes acceptance criteria |

This weighting reflects the same recurring best practices seen in OpenAI’s prompt guidance, Vercel’s v0 prompting framework, and accessibility standards: strong prompts specify role, context, constraints, and expected output, and strong website outputs must also anticipate responsive and accessible behavior. citeturn6view1turn6view2turn14view0turn14view1turn23view0turn23view1

**Quality checklist before export.**
- Is there exactly one primary website surface?
- Is the business goal singular and explicit?
- Is the primary audience named, not implied?
- Are the required sections enumerated?
- Is the preferred layout pattern explicit?
- Is the visual style described with both positive and negative direction?
- Are responsive expectations named?
- Are accessibility requirements included?
- Is the technical output format explicit?
- Does the prompt define what “done” looks like?

If any of those are missing, the Studio should warn the user and drop the score. If more than two are missing, it should block “ready” status and recommend fixes.

**First ten implementation tasks.**
1. Define JSON Schemas for blueprints, prompts, and registry records.
2. Author the first registry set for categories, sections, layouts, styles, and prompt templates.
3. Build the normalized requirement store and transformation pipeline.
4. Implement a deterministic compatibility engine for category → sections → layouts → styles.
5. Create the three-pane Prompt Builder UI with live normalized-state inspection.
6. Implement blueprint generation and JSON export.
7. Implement prompt assembly for at least three adapters: generic HTML, v0, and Cursor.
8. Add the prompt quality scorer and export gating.
9. Add local project persistence with `localStorage` for preferences and IndexedDB for saved projects.
10. Add optional AI-assisted free-text classification using strict structured outputs.

**The practical MVP target.** A strong first public version should support six high-difference categories—AI Tool Website, SaaS Website, Corporate Website, Admin Panel, E-commerce Website, and Immersive Website—because those six test the taxonomy hardest. If a category system can cleanly produce great prompts for those, it can almost certainly expand to the rest of the registry. The success metric should not be “can it generate a page,” but “does the exported prompt produce a good first pass in downstream tools with fewer retries.” Bolt’s own enhanced-prompt workflow and v0’s guidance both imply that prompt quality reduces iteration cost; that should be your product’s north-star outcome. citeturn19view0turn14view0

**Bottom line.** Build Website Design Prompt Studio as a **blueprint-first, prompt-quality product**. Let Webflow, Framer, Wix, v0, Bolt, Lovable, Replit, Builder, and Cursor remain downstream execution environments. Your product should own the missing operating system between idea and generation: taxonomy, normalized requirements, section composition, tokenized style, target-agent prompt adaptation, and quality control. That is practical to build, defensible to position, and much more achievable than starting with yet another full website builder. citeturn16view0turn16view3turn17view0turn14view0turn19view0turn18view2
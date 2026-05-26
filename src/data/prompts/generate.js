// Algorithmic STANDARD-tier prompt generator.
// Produces ~150 prompts (5 styles × ~30 page types) with placeholder briefs that nudge
// the user toward Studio for tuning. See docs/PROMPT-GALLERY.md § 4.

import { STYLE_PRESETS, STYLE_IDS } from "../styles/index.js";
import { PAGE_TYPES } from "../taxonomy.js";

const BUILD_DATE = "2026-05-26";

// Defaults per style — short tone/references/avoid snippets used when standard prompts
// don't have a hand-tuned brief.
const STYLE_BRIEF_DEFAULTS = {
  monochrome: {
    tone: "austere, considered, restrained, scholarly",
    references: "Vogue Italia editorial, Phaidon monographs, Maison Margiela tags-as-design",
    avoid: "any color accent, rounded corners, gradient fills, generic SaaS layouts",
  },
  brutalist: {
    tone: "confrontational, alive, hand-made, joyful, defiant",
    references: "Gumroad's 2022 redesign, Cards Against Humanity homepage, Are.na UI, college punk-zine layouts",
    avoid: "tasteful gradients, soft shadows, fancy serifs (Playfair/Fraunces), subtle anything",
  },
  editorial: {
    tone: "considered, literate, slow, warm, intelligent",
    references: "Kinfolk early years, The Gentlewoman, Cereal Magazine, NYT T Magazine",
    avoid: "pure white background, sans-serif body, WordPress magazine theme widgets, center-stacked layout",
  },
  y2k: {
    tone: "hyperpop, optimistic, kitsch, electric, knowingly-nostalgic",
    references: "early-2000s iPod ads, Charli XCX Brat era, Frutiger Aero wallpapers, MSN Messenger UI",
    avoid: "Inter/Helvetica/Geist headlines, sharp button corners, hard offset shadows, tasteful restraint",
  },
  glass: {
    tone: "calm, weightless, considered, gentle, reverent",
    references: "visionOS, macOS Sonoma control center, Linear marketing, meditation app onboarding",
    avoid: "saturated colors, hard shadows, sharp corners, serif typography, opaque backgrounds",
  },
  linear: {
    tone: "premium, precise, technical-minimalist, expensive-feeling, considered",
    references: "Linear, Vercel dashboard, Raycast, Arc browser, Cursor IDE, Apollo",
    avoid: "pure black backgrounds, flat dark mode, bouncy springs, colorful accents, web-2.0 gradients",
  },
  swiss: {
    tone: "formal, functional, modular, deliberate, intellectual",
    references: "Müller-Brockmann posters, Vignelli's NYC subway map, IBM 1970s, MIT Press Design",
    avoid: "serifs, centered headlines, rounded corners, more than one accent color, off-grid alignment",
  },
  cyberpunk: {
    tone: "electric, dystopian-optimistic, hacker, nocturnal, glitched",
    references: "Cyberpunk 2077 ads, Akira, Ghost in the Shell, Mr. Robot titles, Anamanaguchi cover art",
    avoid: "Inter / Helvetica headlines, light backgrounds, soft shadows, pastel accents",
  },
  newspaper: {
    tone: "broadsheet, considered, literate, civic, slow-reading",
    references: "The New York Times Sunday, The Guardian Weekend, Le Monde, NYT T Magazine print",
    avoid: "sans-serif body, pure white background, single column body, modern minimalist hero",
  },
  memphis: {
    tone: "joyful, irreverent, geometric, post-modern, primary-saturated",
    references: "Ettore Sottsass furniture, Memphis Group catalogs, Nathalie Du Pasquier textiles, Bottega Veneta SS22",
    avoid: "tasteful restraint, symmetric layouts, muted colors, single shape vocabulary",
  },
  sketch: {
    tone: "warm, hand-made, approachable, illustrative, imperfect, slow",
    references: "Oliver Jeffers picture books, Quentin Blake illustrations, Aesop letters, Field Notes notebooks",
    avoid: "perfect geometry, neon accents, sans-serif body, strict grid alignment",
  },
  vaporwave: {
    tone: "nostalgic, dreamy, ironic, 90s-mall, classical-pastiche",
    references: "Macintosh Plus Floral Shoppe, MTV bumpers 1989-1993, Japanese 1980s ads, Greek statue motifs",
    avoid: "tight letter-spacing, modern grid, hacker-neon, single-color palettes",
  },
  cottagecore: {
    tone: "warm, slow, considered, folk, handmade, unhurried",
    references: "Toast catalogs, William Morris textiles, Beatrix Potter, Anthropologie store interiors",
    avoid: "saturated colors, cool palette, sans-serif body, strict grid",
  },
  solarpunk: {
    tone: "optimistic, forward-looking, verdant, sun-warmed, regenerative",
    references: "Studio Ghibli landscapes, Allbirds brand book, Patagonia regenerative reports, community gardens",
    avoid: "dystopian palette, geometric primitives only, doom messaging, neon green",
  },
  bauhaus: {
    tone: "modernist, modular, deliberate, geometric, declarative",
    references: "Herbert Bayer typography, Moholy-Nagy compositions, Bauhaus 1923 posters, Albers' Homage to the Square",
    avoid: "display serif, pastel primaries, capitalized headlines, off-grid placement",
  },
  industrial: {
    tone: "functional, raw, weathered, mil-spec, honest",
    references: "Barbican Centre wayfinding, Carhartt catalogs, Anchor Brewing labels, factory safety signage",
    avoid: "soft rounding, pastel safety yellow, sans-serif body, pristine cleanliness",
  },
  pixel: {
    tone: "playful, retro, blocky, arcade, frame-by-frame",
    references: "Super Mario Bros (1985), Game Boy Pokemon Red, Pico-8 game jams, NES Punch-Out",
    avoid: "anti-aliased smoothness, full RGB palette, modern UI patterns (FAB / modals), smooth ease animations",
  },
  tropical: {
    tone: "warm, hospitality, sunset, considered-luxury, golden-hour",
    references: "Hôtel Esencia Tulum, Aman Tokyo, Slim Aarons photography, mid-century Acapulco postcards",
    avoid: "saturated primaries, sharp corners, cool grey palette, sans-serif display",
  },
  constructivist: {
    tone: "bold, declarative, pamphleteering, agitprop, confident",
    references: "El Lissitzky propaganda posters, Rodchenko photomontages, Stenberg Brothers film posters, Shepard Fairey OBEY",
    avoid: "more than 3 colors, humanist sans, centered symmetric layout, rounded corners",
  },
  zine: {
    tone: "DIY, raw, confidently amateur, punk, photocopied",
    references: "Sniffin' Glue 1977, Bikini Kill zines, Crass Records sleeves, early Vice magazine",
    avoid: "modern sans body, perfect grid alignment, pure white background, full-color photography",
  },
  // ─── Batch 3 — business / commerce / institutional ─────────────────────────
  corporate: {
    tone: "institutional, measured, confident, evidence-led, restrained",
    references: "IBM.com, Accenture, Deloitte Insights, BlackRock annual reports, Goldman Sachs",
    avoid: "gradient hero, emoji in copy, blob illustration, marketing superlatives, pillowy rounded corners",
  },
  saas: {
    tone: "crisp, confident, modern, product-led, builder-friendly",
    references: "Stripe, Linear, Vercel, Resend, Cal.com, Supabase, Planetscale",
    avoid: "stock office-people photos, serif body, rainbow gradients, marketing copy walls, single flat shadow",
  },
  enterprise: {
    tone: "utilitarian, dense, functional, power-user, state-driven",
    references: "SAP Fiori, Oracle Cloud, Workday, NetSuite, IBM Carbon, Salesforce Lightning",
    avoid: "marketing whitespace, display serif, decorative gradients, modal-driven flows, single-column forms",
  },
  consulting: {
    tone: "authoritative, scholarly, measured, evidence-first, deliberate",
    references: "McKinsey Quarterly, HBR, BCG Henderson, Bain Insights, The Economist",
    avoid: "sans body, rainbow charts, marketing CTAs, gradient hero, casual voice",
  },
  fintech: {
    tone: "calm, precise, trustworthy, numerate, never-anxious",
    references: "Mercury, Wise, Brex, Ramp, Stripe Atlas, Monzo Business",
    avoid: "crypto neon glow, stock office photos, proportional numbers, loud marketing copy, crypto rainbow gradient",
  },
  admin: {
    tone: "pragmatic, table-first, sortable, scannable, power-user",
    references: "Ant Design Pro, Metronic, Vuexy, Tailwind UI Catalyst, Refine.dev",
    avoid: "marketing whitespace, top-only nav, modal-per-action, card grid for lists, full-page edit forms",
  },
  darkboard: {
    tone: "observability, severity-coded, live, operator-focused, terse",
    references: "Grafana, Datadog, New Relic One, Honeycomb, Splunk Observability",
    avoid: "pure black bg, decorative gradient, large hero type, rounded marketing cards, stock illustration",
  },
  crm: {
    tone: "friendly, encouraging, sales-warm, conversational, pipeline-driven",
    references: "HubSpot CRM, Salesforce Lightning, Pipedrive, Close, Attio, Folk",
    avoid: "dense ERP table, cold grey palette, hard corners, modal-only edit, sterile empty states",
  },
  devtool: {
    tone: "native-feeling, terse, code-first, builder-respect, no-fluff",
    references: "Vercel, Supabase, Railway, Fly.io, Render, Neon, Cloudflare Workers",
    avoid: "stock people photos, sans-only code blocks, marketing fluff copy, rainbow gradient, friendly mascot",
  },
  internal: {
    tone: "pragmatic, ship-fast, unglamorous, system-defaults, ops-friendly",
    references: "Retool, Airtable interfaces, Internal.io, ToolJet, Appsmith, Budibase",
    avoid: "marketing polish, custom typography, dense observability charts, cute illustration, vibrant gradients",
  },
  marketplace: {
    tone: "loud, fast, abundant, urgency-coded, conversion-first",
    references: "Shopee, Lazada, TikTok Shop, Tokopedia, JD.com, Tmall, Taobao",
    avoid: "minimal whitespace, neutral palette, one-product hero, hidden social proof, plain sale price",
  },
  utility: {
    tone: "informational, dense, function-over-form, review-led, comparative",
    references: "Amazon, Newegg, Walmart.com, BestBuy, eBay, Home Depot",
    avoid: "pretty marketing hero, minimal product page, centered hero copy, brand-color CTA spam, hidden reviews",
  },
  boutique: {
    tone: "considered, restrained, editorial, slow, atmospheric",
    references: "Aesop, Net-a-Porter, SSENSE, MR PORTER, Mytheresa, Acne Studios",
    avoid: "8x product grid, sale badges, vibrant brand color, white-bg packshots, marketing exclamation",
  },
  flash: {
    tone: "visceral, urgent, hyped, scarcity-coded, dopamine-tuned",
    references: "Pinduoduo, Temu, TikTok Shop live, Tmall Double 11, SHEIN flash sales",
    avoid: "calm whitespace, neutral palette, no countdown, honest pricing, quiet voice",
  },
  story: {
    tone: "warm, narrative, first-person-plural, brand-with-heart, intimate",
    references: "Allbirds, Warby Parker, Casper, Glossier, Away, Bombas, Harry's",
    avoid: "cold corporate palette, stock smiling models, spec-sheet product page, aggressive CTAs, sale countdown",
  },
  government: {
    tone: "civic, plain-language, accessible, task-oriented, sober",
    references: "GOV.UK, USWDS, Canada.ca, Singapore Life SG, NHS.uk, Australia.gov.au",
    avoid: "marketing illustration, low-contrast text, brand-color CTA spam, carousel hero, modal popups",
  },
  academic: {
    tone: "scholarly, venerable, intellectual, heritage, considered",
    references: "Harvard.edu, MIT.edu, Yale.edu, Stanford.edu, Oxford.ac.uk, Cambridge.ac.uk",
    avoid: "sans-serif body, marketing CTAs, bright illustration, gradient hero, hidden crest",
  },
  restaurant: {
    tone: "appetite-warm, atmospheric, sommelier-led, provenance-rich, calm",
    references: "Eleven Madison Park, Noma, Carbone NYC, The French Laundry, Atomix, Atelier Crenn",
    avoid: "cold tech palette, casual sans menu, stock food photo, loud CTAs, spec-style listing",
  },
  cafe: {
    tone: "cozy, hand-felt, indie, slow, neighborhood-warm",
    references: "Blue Bottle Coffee, Sightglass, Verve, Stumptown, La Colombe, Onyx Coffee Lab",
    avoid: "corporate sans, stock latte art photo, aggressive CTAs, bright tech palette, long marketing copy",
  },
  medical: {
    tone: "calm, trustworthy, reassuring, plain-language, never-alarming",
    references: "One Medical, Mayo Clinic, Oscar Health, Cleveland Clinic, Forward Health, Hims & Hers",
    avoid: "alarming red, stock smiling stethoscope, marketing exclamation, dense ERP table, carousel hero",
  },
  // ─── Batch 4 — portfolio / content / booking / specialized ─────────────────
  portfolio: {
    tone: "considered, craft-led, narrative, senior-taste, restrained",
    references: "brittanychiang.com, bruno-simon.com, rauno.me, paco.me, emilkowal.ski",
    avoid: "grid of screenshots, stock fonts only, hidden about page, no-process pixel-perfect mockups, autoplay reel",
  },
  agency: {
    tone: "confident, opinionated, type-led, work-forward, deliberate",
    references: "pentagram.com, instrument.com, activetheory.net, r-ga.com, area17.com",
    avoid: "stock fonts only, modest hero, generic services list, stock team photos, quiet brand color",
  },
  creator: {
    tone: "personal, opinionated, slow, text-first, conversational",
    references: "paulgraham.com, patrickcollison.com, danluu.com, stratechery.com, Substack writer pages",
    avoid: "hero image, email-capture modal, sans body, multiple voices, algorithmic feed",
  },
  resume: {
    tone: "considered, typographic, single-page, print-ready, restrained",
    references: "read.cv profiles, Are.na profile pages, Tobias Frere-Jones CV, classic academic CV",
    avoid: "photo as hero, skill bars, bright background, icon-per-line, PDF-only delivery",
  },
  blog: {
    tone: "considered, reading-first, voice-driven, slow, prose-led",
    references: "Ghost themes, Robin Sloan's blog, Hey World, Bear Blog, mataroa, scribbles.page",
    avoid: "sidebar widgets, cookie modal, short measure, all-caps headers, author bio walls",
  },
  news: {
    tone: "scannable, opinionated, multi-zone, byline-led, dense",
    references: "TheVerge.com, TechCrunch, Wired, Ars Technica, Axios, The Information",
    avoid: "single-story hero, hidden bylines, autoplay video reel, infinite scroll, click-bait copy",
  },
  podcast: {
    tone: "audio-first, host-led, transcript-rich, episode-organized, measured",
    references: "lexfridman.com, hubermanlab.com, NPR show pages, Acquired.fm, Dwarkesh Patel",
    avoid: "soundcloud-embed-only, hidden transcript, stock host photo, only-latest-episode, marketing CTAs",
  },
  video: {
    tone: "merchandised, kinetic, browse-first, algorithmic, dark",
    references: "Netflix, YouTube, Disney+, Twitch, HBO Max, Apple TV+",
    avoid: "light background, vertical thumb grid, truncated thumbnails, static hero, hidden search",
  },
  docs: {
    tone: "procedural, code-first, scannable, versioned, terse",
    references: "stripe.com/docs, tailwindcss.com/docs, MDN, supabase.com/docs, react.dev",
    avoid: "no search, image-only code examples, marketing voice, hidden TOC, cookie consent modal",
  },
  hotel: {
    tone: "considered-luxury, editorial, hospitality-warm, direct-booking, discreet",
    references: "rosewoodhotels.com, aman.com, sohohouse.com, ace-hotel.com, edition-hotels.com",
    avoid: "OTA price comparison, stock smiling-concierge photo, aggressive CTAs, testimonial carousel, cluttered widget",
  },
  airline: {
    tone: "search-first, loyalty-aware, route-led, functional, calm",
    references: "singaporeair.com, delta.com, qantas.com, emirates.com, Google Flights",
    avoid: "buried search, vague fare display, cluttered hero, hidden loyalty, stock cabin-crew photo",
  },
  realestate: {
    tone: "map-led, listing-dense, price-transparent, agent-anchored, exploratory",
    references: "Zillow, Redfin, Realtor.com, Rightmove, PropertyGuru, Compass",
    avoid: "map-only OR list-only, vague pricing, tiny thumbnails, hidden agent, generic stock house photo",
  },
  legal: {
    tone: "sober, institutional, partner-led, restrained, evidence-rich",
    references: "Wachtell, Allen & Overy, Latham, Sullivan & Cromwell, WongPartnership, Linklaters",
    avoid: "marketing illustration, aggressive CTAs, stock courthouse photo, bright palette, hidden partner bios",
  },
  salon: {
    tone: "calm, boutique-warm, service-led, considered, friendly",
    references: "Glossier shops, Drybar, Aman spa pages, boutique nail bars, Equinox spa",
    avoid: "aggressive booking CTA, chain-store palette, stock smiling-customer photo, discount theater, marketing-heavy hero",
  },
  crypto: {
    tone: "dark, kinetic, on-chain, data-led, irreverent",
    references: "uniswap.org, phantom.app, opensea.io, blur.io, magiceden.io, friend.tech",
    avoid: "light background, proportional numbers, stock crypto-coin illustration, hidden chain badge, no connect-wallet",
  },
  gaming: {
    tone: "kinetic, dramatic, dark, cinematic, declarative",
    references: "playvalorant.com, leagueoflegends.com, Steam, fortnite.com, ea.com, callofduty.com",
    avoid: "light background, static hero, stock fonts only, marketing voice, hidden Play CTA",
  },
  nonprofit: {
    tone: "story-led, mission-clear, donor-respectful, transparent, urgent-but-warm",
    references: "charitywater.org, patagonia.com/action-works, doctorswithoutborders.org, kiva.org, donorschoose.org",
    avoid: "buried donate CTA, stock smiling-children photo, vague impact, corporate voice, no transparency",
  },
  event: {
    tone: "time-bound, speaker-led, agenda-clear, multi-track, energetic",
    references: "config.figma.com, sessions.stripe.com, awwwards events, web-summit.com, ramp.com/sessions",
    avoid: "no countdown, stock speaker photos, single-track agenda, buried tickets, aggressive popups",
  },
  church: {
    tone: "warm, welcoming, scripture-anchored, community-led, practical",
    references: "thoughtful Anglican parish sites, Redeemer Presbyterian, Hillsong NYC, Trinity Church Wall Street",
    avoid: "corporate cold palette, aggressive evangelizing, stock praying-hands photo, hidden service times, modern abstract serif",
  },
  museum: {
    tone: "curated, exhibition-led, editorial, civic, image-forward",
    references: "moma.org, tate.org.uk, vam.ac.uk, cooperhewitt.org, guggenheim.org, sfmoma.org",
    avoid: "stock visitor photo, marketing voice, hidden visit info, single-color hero, light typography",
  },
  // ─── Batch 5 — B2B SaaS subsegments ────────────────────────────────────────
  hr: {
    tone: "pipeline-driven, candidate-first, structured, calm, recruiter-friendly",
    references: "Greenhouse, Lever, Ashby, Workday Recruiting, Gem, Rippling, Personio",
    avoid: "marketing whitespace, modal-per-action, free-text-only scorecards, vanity vibrant palette, stock smiling-team photo",
  },
  cms: {
    tone: "visual, block-based, marketer-friendly, draft-safe, collaborative",
    references: "Webflow Designer, HubSpot CMS, Sanity Studio, Contentful, Storyblok, Framer",
    avoid: "markdown-only editor, modal-per-edit, marketing whitespace, hidden device toggle, auto-publish",
  },
  analytics: {
    tone: "chart-first, query-driven, comparison-aware, calm, analyst-friendly",
    references: "Mixpanel, Amplitude, PostHog, Heap, June, Pendo, Snowplow",
    avoid: "vanity counters, rainbow charts, modal-driven query, hidden event taxonomy, dense unreadable tables",
  },
  email: {
    tone: "friendly, compose-first, preview-safe, warm-branded, scheduler-aware",
    references: "Mailchimp, Resend, Beehiiv, ConvertKit, Substack, Loops.so, Buttondown",
    avoid: "markdown-only compose, hidden test-send, send without preview, confusing settings tax, cold corporate palette",
  },
  // ─── Batch 6 — regional / cultural ─────────────────────────────────────────
  japanese: {
    tone: "restrained, considered, ma-aware, bilingual, quietly-confident",
    references: "muji.com, uniqlo.com JP, 21_21 Design Sight, Issey Miyake, Monocle Tokyo, Tsutaya T-Site",
    avoid: "marketing density, aggressive CTAs, bright saturation, heavy display weight, Latin-only typography",
  },
  korean: {
    tone: "Hangul-first, drop-aware, soft-warm, lookbook-led, ranking-driven",
    references: "coupang.com, kream.co.kr, musinsa.com, 29cm.co.kr, stylenanda.com, oliveyoung",
    avoid: "Latin-only typography, aggressive Western reds, stock smiling models, no drop or ranking surfaces, heavy chrome UI",
  },
  chinese: {
    tone: "Songti-first, editorial, considered, dense feature, civic-serious",
    references: "theinitium.com (端傳媒), caixin.com (财新), 看理想, 单读, sixthtone.com, 纽约时报中文网, 澎湃 thepaper.cn",
    avoid: "sans-only Chinese body, tight line-height under 1.7, Western italic on Chinese, marketing exclamation, hidden topic nav",
  },
  arabic: {
    tone: "RTL-first, bilingual, restrained-luxurious, geometric, civic",
    references: "emaar.com, qm.org.qa (Qatar Museums), diriyah.sa, neom.com, qatarairways.com (AR), louvreabudhabi.ae, aramco.com",
    avoid: "LTR layout for Arabic content, Latin-only display fonts, garish neon palette, stock business people, mirrored-icon mistakes",
  },
  // ─── Batch 7 — consumer apps / experimental / verticals ────────────────────
  dating: {
    tone: "warm, intimate, personality-led, photo-and-prompt, safe",
    references: "Hinge, Bumble, Tinder, Coffee Meets Bagel, OkCupid, Feeld",
    avoid: "Tinder-only swipe, cold corporate palette, stock smiling-couple photo, hidden verification, aggressive paywall",
  },
  fitness: {
    tone: "kinetic, data-led, achievement-driven, athletic, social",
    references: "Strava, Whoop, Garmin Connect, Apple Fitness+, Peloton, AllTrails",
    avoid: "marketing-only landing, proportional stat numbers, no map trace, stock fit-model photo, pastel calm palette",
  },
  music: {
    tone: "atmospheric, album-art-led, persistent-player, dark-canvas, immersive",
    references: "Spotify, Apple Music, Tidal, YouTube Music, Deezer, Bandcamp",
    avoid: "light background, missing player, spec-sheet track row, no album art, static gradient",
  },
  maps: {
    tone: "map-dominant, search-first, POI-driven, navigation-led, utilitarian",
    references: "Google Maps, Apple Maps, AllTrails, Citymapper, Mapbox demos, Komoot",
    avoid: "tiny map area, walls of POI cards, no directions panel, generic stock marker, hidden layer toggle",
  },
  riso: {
    tone: "spot-color, hand-printed, grainy, offset, indie-press",
    references: "It's Nice That riso editions, Hato Press, Risotto Studio, Knust riso, Print Club London",
    avoid: "full RGB palette, pixel-perfect alignment, smooth gradients, pure white bg, anti-aliased clean rendering",
  },
  antidesign: {
    tone: "clashing, raw, deliberately-broken, content-first, refusal",
    references: "Yale School of Art (art.yale.edu), Cargo Collective, Are.na, Folder Studio, Indexhibit",
    avoid: "polished SaaS look, cohesive type system, strict grid, hidden browser defaults, subtle palette",
  },
  maximalist: {
    tone: "ornate, dense, layered, jewel-toned, considered-busy",
    references: "The Reform Theatre, Wes Anderson production, Gucci Michele-era, Anthropologie, House of Hackney, Christian Lacroix",
    avoid: "minimalist whitespace, single type family, flat palette, plain background, modern 12-col grid",
  },
  geocities: {
    tone: "chaotic, animated, loud, personal, 1999-amateur",
    references: "Archived 1996-2001 GeoCities, Angelfire, Tripod, oneterabyteofkilobytemagazine, Wayback Machine 1999",
    avoid: "modern clean look, subtle palette, single font, no animation, responsive grid",
  },
  lms: {
    tone: "encouraging, progress-led, video-first, friendly, learner-respect",
    references: "Khan Academy, Coursera, Udemy, edX, Skillshare, MasterClass, Codecademy",
    avoid: "hidden progress, no video player, aggressive paywall, cold corporate palette, stock smiling-laptop photo",
  },
  jobs: {
    tone: "search-driven, transparent, professional, filter-rich, easy-apply",
    references: "LinkedIn Jobs, Indeed, Glassdoor, Wellfound (AngelList), Otta, Welcome to the Jungle",
    avoid: "marketing landing, hidden salary, no remote tag, generic apply CTA, stock office photos",
  },
  bank: {
    tone: "trustworthy, restrained, account-first, secure, utility-led",
    references: "Chase, DBS digibank, HSBC, Citibank, Bank of America, Revolut, OCBC, Maybank",
    avoid: "marketing-y palette, proportional balance numbers, hidden security, stock smiling-couple photo, aggressive upsell modal",
  },
  bto: {
    tone: "civic, plain-language, eligibility-first, scheme-clear, accessible",
    references: "hdb.gov.sg (Singapore), housingauthority.gov.hk, khfc.co.kr, gov-style civic housing portals",
    avoid: "SaaS marketing voice, hidden eligibility, insider jargon, marketing illustration, mobile afterthought",
  },
  // ─── Batch 8 — B2C subsegments + creative + verticals ──────────────────────
  rideshare: {
    tone: "map-dominant, immediate, driver-trust, surge-transparent, mobile-first",
    references: "Uber, Grab, Lyft, Bolt, DiDi, Ola, FreeNow",
    avoid: "tiny map area, hidden surge, no driver photo, modal cascades",
  },
  delivery: {
    tone: "food-led, ETA-clear, cart-persistent, abundant, conversion-driven",
    references: "DoorDash, Uber Eats, Foodpanda, Deliveroo, Grubhub, Zomato",
    avoid: "tiny food photos, no ETA, hidden delivery fee, stock chef photo",
  },
  bizcard: {
    tone: "CFO-friendly, automation-led, policy-aware, expense-fast, B2B",
    references: "Ramp, Brex, Pleo, Spendesk, Airbase, Divvy",
    avoid: "personal-bank UI, manual receipt entry, hidden controls, modal-driven flow",
  },
  insurance: {
    tone: "friendly, plain-language, quote-fast, mascot-warm, modern",
    references: "Lemonade, Oscar Health, Hippo, Root Insurance, Ladder Life, Policygenius",
    avoid: "1990s insurance form, jargon-heavy, hidden price, stock smiling-family photo",
  },
  telehealth: {
    tone: "calm, provider-led, symptom-aware, video-ready, never-alarming",
    references: "Teladoc, MDLive, K Health, Ro, Hers, Hims, Sesame, Amwell",
    avoid: "alarming red, marketing CTAs, hidden credentials, stock smiling-stethoscope photo",
  },
  chat: {
    tone: "channels-first, presence-aware, threaded, emoji-rich, team-focused",
    references: "Slack, Discord, Microsoft Teams, Linear Chat, Mattermost, Zulip",
    avoid: "single-pane chat on desktop, hidden presence, no threads, modal-driven react",
  },
  swisslate: {
    tone: "rigorous, grid-snapped, monochromatic, poster-scale, restrained",
    references: "Müller-Brockmann posters, Vignelli's NYC subway, IBM 1970s, Wim Crouwel, Karl Gerstner",
    avoid: "multiple type families, multi-color palette, off-grid placement, centered composition, decoration",
  },
  artdeco: {
    tone: "symmetric, gold-on-black, monumental, geometric, luxurious",
    references: "Chrysler Building lobby, Cassandre posters, Erté illustrations, Gatsby production design",
    avoid: "asymmetric layout, sans-serif display, pastel palette, flat colors, sunburst-as-logo-only",
  },
  postmemphis: {
    tone: "playful, post-internet, saturated, tight-grotesk, digital-native",
    references: "Bottega Veneta SS22, Cult Gaia, Glossier 2.0, Eric Hu studio, Marni 2022, Casetify",
    avoid: "1986 Memphis pastiche, too many shapes, stock illustration, pastel only",
  },
  brutalmod: {
    tone: "chrome-and-raw, GenZ, hybrid, glitchy, hyperpop",
    references: "Sucia Studio, NSS Magazine, hyperpop covers (100 gecs, SOPHIE), Diesel SS24, Heaven by Marc Jacobs",
    avoid: "polished SaaS, only Y2K, only brutalist, smooth gradients, stock sans body",
  },
  lowpoly: {
    tone: "geometric, faceted, nostalgic, cinematic-horizon, restrained",
    references: "Monument Valley, PS1 era games, Alto's Odyssey, Mass Effect codex, vapor 3D",
    avoid: "smooth 3D ball, realistic lighting, modern UI chrome, photoreal subject",
  },
  cinema: {
    tone: "letterboxed, slow, serif, credit-typography, atmospheric",
    references: "A24 title cards (Past Lives, Moonlight), Wes Anderson openings, Saul Bass sequences, Kyle Cooper (Seven)",
    avoid: "no letterbox, loud transitions, sans-serif title, multiple accents, stock movie reel",
  },
  legalsaas: {
    tone: "matter-led, billable-first, professional-calm, document-aware, sober",
    references: "Clio, Casetext, Harvey AI, NetDocuments, MyCase, PracticePanther, Smokeball",
    avoid: "law-firm marketing site, hidden timer, vibrant SaaS palette, stock courtroom photo",
  },
  construction: {
    tone: "field-tough, plan-first, RFI-driven, mobile-first, safety-coded",
    references: "Procore, Buildertrend, PlanGrid (Autodesk), Fieldwire, Raken",
    avoid: "desktop-only flow, plain text RFIs, hide weather/crew, pastel palette",
  },
  agtech: {
    tone: "earth-toned, field-led, weather-aware, practical, domain-specific",
    references: "Climate FieldView (Bayer), Granular, John Deere Operations Center, FarmLogs, Taranis",
    avoid: "generic SaaS palette, hide weather, stock farmer photo, single-unit-system",
  },
  automotive: {
    tone: "cinematic, restrained, spec-clean, light-typography, premium",
    references: "Tesla, Rivian, Lucid Motors, Polestar, Genesis, BMW i, Porsche.com",
    avoid: "carousel hero, heavy display, marketing dealer-speak, stock car-on-road photo, vibrant palette",
  },
  nonprofitgov: {
    tone: "civic-warm, dual-audience, transparent, multilingual, accessible",
    references: "211.org (United Way), Code for America, Red Cross, Feeding America, World Central Kitchen",
    avoid: "donor-only emphasis, recipient-only emphasis, insider jargon, hidden transparency",
  },
  biotech: {
    tone: "evidence-led, pipeline-transparent, dual-audience (investor + scientist), restrained",
    references: "Moderna, Vertex Pharmaceuticals, Regeneron, Ginkgo Bioworks, Recursion, BioNTech",
    avoid: "stock lab photo, marketing fluff, hidden pipeline, no science explainer",
  },
  // ─── Batch 9 — milestone 100 🎯 ────────────────────────────────────────────
  gallery: {
    tone: "image-first, minimal-chrome, curated, neutral-backdrop, considered",
    references: "format.com photographer portfolios, Cargo photo pages, Squarespace fluid-engine, tillmans.co.uk, photographer Are.na profiles",
    avoid: "heavy chrome, watermarks, branded color theme, stock fonts only, flat image dump",
  },
  bookstore: {
    tone: "curated, bookseller-voice, serif-warm, event-aware, indie",
    references: "mcnallyjackson.com, strandbooks.com, powells.com, citylights.com, shakespeareandcompany.com, daunt-books.co.uk, 蔦屋書店",
    avoid: "Amazon utility UI, sans body, stock smiling-reader photo, algorithmic recs, hidden events",
  },
};

/**
 * Build all algorithmic STANDARD-tier prompts.
 * @returns {Array} Array of prompt-card objects.
 */
export function generateStandardPrompts() {
  const out = [];
  for (const styleId of STYLE_IDS) {
    const style = STYLE_PRESETS[styleId];
    const styleDefaults = STYLE_BRIEF_DEFAULTS[styleId];
    for (const typeId of Object.keys(PAGE_TYPES)) {
      const type = PAGE_TYPES[typeId];
      out.push({
        id: `${styleId}-${typeId}`,
        tier: "standard",
        name: `${style.name} · ${type.name}`,
        tagline: type.genericTagline,
        style: styleId,
        purpose: type.purpose,
        pageType: typeId,
        density: "default",
        drama: "confident",
        motion: "default",
        promptMode: "one-shot",
        sections: type.sections,
        stack: "html",
        outputMode: "single-file",
        industryTags: type.commonIndustries,
        brief: {
          name: "[YOUR PRODUCT NAME]",
          industry: type.genericIndustry,
          audience: "[describe in Studio — who they are, age range, what they value]",
          tone: styleDefaults.tone,
          references: styleDefaults.references,
          context: "",
          avoid: styleDefaults.avoid,
        },
        featured: false,
        createdAt: BUILD_DATE,
      });
    }
  }
  return out;
}

/**
 * Stats — useful for debug overlays / tests.
 */
export function generationStats() {
  return {
    styles: STYLE_IDS.length,
    pageTypes: Object.keys(PAGE_TYPES).length,
    total: STYLE_IDS.length * Object.keys(PAGE_TYPES).length,
  };
}

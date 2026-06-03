// UI Component primitives — Tier 1 (~25 entries).
//
// Mirrors the libraries.js shape but for COMPONENT PATTERNS (not packages).
// Goal: give the LLM a shared vocabulary for "which widget" so it stops
// reinventing combobox-vs-select / modal-vs-drawer decisions every time.
//
// Each entry answers: when to use, when NOT to, accessibility musts,
// which libraries implement it, which styles commonly need it, and which
// page sections imply it should appear.
//
// NOTE: This file is data only. Integration into assemblePrompt is a
// separate step — author + curate this catalog first, then wire it.

/**
 * @typedef {object} UIComponent
 * @property {string}   id
 * @property {string}   name
 * @property {"input"|"disclosure"|"feedback"|"progress"|"search"|"edit"|"navigation"|"data"|"media"|"identity"|"misc"|"commerce"|"chat"|"auth"|"advanced"} category
 * @property {1|2|3}    tier — 1 = essential, 2 = strongly recommended, 3 = vertical-specific
 * @property {string}   desc — one-line summary
 * @property {string}   whenToUse
 * @property {string}   whenNotToUse
 * @property {string}   a11y — non-negotiable accessibility behaviour
 * @property {string[]} pairsWithLibraries — ids from libraries.js that implement this
 * @property {string[]} pairsWithStyles — ids from styles/* where this is commonly needed
 * @property {string[]} impliesBy — page sections / context keywords that imply this widget
 * @property {string[]} [variants] — named variants worth distinguishing
 */

export const UI_COMPONENTS = {
  // ─── INPUT (12) ────────────────────────────────────────────────────────────
  combobox: {
    id: "combobox",
    name: "Combobox / Autocomplete",
    category: "input",
    tier: 1,
    desc: "Searchable single-select: type to filter a dropdown list of options.",
    whenToUse: "Single value pick from >7 options, OR options not all known upfront (typeahead / async fetch). Country, user, SKU, tag pickers.",
    whenNotToUse: "≤7 fixed options → use radio group or segmented control. Free-text without a controlled list → use plain text input.",
    a11y: "role=combobox on the input, aria-expanded, aria-controls pointing at the listbox, aria-activedescendant for focused option, arrow keys navigate options, Enter selects, Esc closes, type-to-filter announces filtered count to screen readers.",
    pairsWithLibraries: ["choices", "alpine"],
    pairsWithStyles: ["admin", "saas", "internal", "crm", "enterprise", "fintech", "airline", "realestate"],
    impliesBy: ["form", "filter-bar", "search", "settings", "filters", "filter-tabs"],
  },

  multiselect: {
    id: "multiselect",
    name: "Multi-select with chips",
    category: "input",
    tier: 1,
    desc: "Pick many values from a list; selected items appear as removable chips inside the input.",
    whenToUse: "Choose 2+ from a controlled list. Tags, assignees, categories, recipients, filter values.",
    whenNotToUse: "Choosing only ONE → use combobox. Free-text without a controlled list → use tag input.",
    a11y: "Each chip has its own delete button with aria-label='Remove {value}'; chip removal returns focus to the next chip or input; selected count announced.",
    pairsWithLibraries: ["choices"],
    pairsWithStyles: ["admin", "crm", "hr", "jobs", "analytics", "email", "internal"],
    impliesBy: ["form", "filter-bar", "audience", "tags", "recipients", "filters", "filter-tabs"],
  },

  taginput: {
    id: "taginput",
    name: "Tag input (free-text)",
    category: "input",
    tier: 1,
    desc: "User types arbitrary tags, hits Enter/comma to commit each; tags shown as chips.",
    whenToUse: "Free-form tagging without a controlled vocabulary. Email lists, keyword tags, hashtags.",
    whenNotToUse: "Picking from a known list → use multiselect. Single free-text → use plain input.",
    a11y: "Enter and comma commit a tag; backspace on empty input removes the last tag; pasted comma-separated strings split into multiple tags.",
    pairsWithLibraries: ["choices"],
    pairsWithStyles: ["email", "blog", "news", "podcast", "creator", "crm"],
    impliesBy: ["form", "tags", "keywords", "recipients"],
  },

  datepicker: {
    id: "datepicker",
    name: "Date picker",
    category: "input",
    tier: 1,
    desc: "Calendar-based date selection. Variants: single date, date range, datetime.",
    variants: ["date", "datetime", "date-range", "month", "year"],
    whenToUse: "User must pick a real calendar date. Booking, scheduling, filters by period, birthdate, expiry.",
    whenNotToUse: "Approximate dates ('this month', 'last 7 days') → use preset chip group. Time-only → use time picker.",
    a11y: "Native <input type='date'> as baseline; if custom, full keyboard nav (arrows = days, PgUp/Dn = months, Shift+PgDn = years), aria-label on each day with full date, today indicator, disabled-date announcements.",
    pairsWithLibraries: ["flatpickr"],
    pairsWithStyles: ["airline", "hotel", "salon", "event", "admin", "analytics", "fintech", "telehealth", "lms", "construction"],
    impliesBy: ["form", "booking", "filter-bar", "calendar", "search", "filters", "filter-tabs"],
  },

  fileupload: {
    id: "fileupload",
    name: "File upload (drag-drop + preview)",
    category: "input",
    tier: 1,
    desc: "Drag a file onto a drop zone, OR click to open file picker; show thumbnail/filename + progress + remove.",
    whenToUse: "Any file ingest: avatar, attachments, CSV import, receipt capture, document signing.",
    whenNotToUse: "Camera-direct on mobile (<input accept='image/*' capture> may be enough).",
    a11y: "Keyboard-accessible (visible focus on drop zone, Enter opens picker), drop zone announces 'Drop files here' on focus, screen reader announces successful upload + filename + size.",
    pairsWithLibraries: ["dropzone"],
    pairsWithStyles: ["bizcard", "hr", "cms", "email", "construction", "telehealth", "legal", "legalsaas"],
    impliesBy: ["form", "attachments", "receipt", "import", "upload"],
  },

  numberstepper: {
    id: "numberstepper",
    name: "Number stepper (qty input)",
    category: "input",
    tier: 1,
    desc: "Number input flanked by − / + buttons; clamps min/max; touch-friendly.",
    whenToUse: "Cart quantity, guests count, age, servings, room nights — bounded integer ranges.",
    whenNotToUse: "Continuous / unbounded numbers → plain number input. Very wide ranges (0-1000) → slider with text fallback.",
    a11y: "role=spinbutton on the input, aria-valuenow / aria-valuemin / aria-valuemax; − and + buttons are real <button>s; arrow keys also adjust value.",
    pairsWithLibraries: [],
    pairsWithStyles: ["marketplace", "delivery", "utility", "hotel", "airline", "story", "boutique", "flash"],
    impliesBy: ["cart", "checkout", "booking", "form"],
  },

  slider: {
    id: "slider",
    name: "Slider (single / range)",
    category: "input",
    tier: 1,
    desc: "Drag a thumb (or two for range) along a track to set a value.",
    variants: ["single", "range"],
    whenToUse: "Continuous value within a clear range. Price range, age range, volume, brightness, opacity.",
    whenNotToUse: "Precise numeric entry → use number input. Categorical choices → use segmented control.",
    a11y: "role=slider, aria-valuenow/min/max + aria-valuetext for human-readable value ('$45 to $120'); arrow keys move by step, Home/End jump to min/max; visible value display next to slider.",
    pairsWithLibraries: [],
    pairsWithStyles: ["marketplace", "boutique", "realestate", "music", "fitness", "analytics", "airline"],
    impliesBy: ["filter-bar", "price-range", "settings", "configurator", "filters", "filter-tabs"],
  },

  toggle: {
    id: "toggle",
    name: "Toggle / Switch",
    category: "input",
    tier: 1,
    desc: "Two-state on/off switch with immediate effect (no separate Save button).",
    whenToUse: "Binary setting that applies instantly: dark mode, notifications on/off, feature flag.",
    whenNotToUse: "Choice in a FORM that requires Save → use checkbox. Mutually exclusive choices → use segmented control.",
    a11y: "role=switch, aria-checked, visible focus ring, label clickable (not just the track), screen reader announces 'switch on/off'.",
    pairsWithLibraries: [],
    pairsWithStyles: ["saas", "admin", "darkboard", "cms", "internal", "devtool"],
    impliesBy: ["settings", "preferences", "header", "filter-bar"],
  },

  segmented: {
    id: "segmented",
    name: "Segmented control",
    category: "input",
    tier: 1,
    desc: "Pill-style horizontal group of 2-4 mutually exclusive buttons; the active one is filled.",
    whenToUse: "2-4 short mutually exclusive options where you want them ALWAYS visible. Mobile/Desktop preview, This week/Month/Year, Light/Dark/System theme.",
    whenNotToUse: ">4 options → use tabs or dropdown. Binary on/off setting → use toggle.",
    a11y: "role=radiogroup on the container, role=radio on each button, aria-checked, arrow keys move between options.",
    pairsWithLibraries: [],
    pairsWithStyles: ["cms", "analytics", "darkboard", "fitness", "saas", "fintech", "creator"],
    impliesBy: ["filter-bar", "toolbar", "settings", "preview", "view-toggle", "filter-tabs", "category-tabs"],
  },

  otpinput: {
    id: "otpinput",
    name: "OTP / PIN input",
    category: "input",
    tier: 1,
    desc: "Row of 4-6 single-character cells; auto-advances on each keystroke; paste fills all cells.",
    whenToUse: "Verifying short codes: SMS OTP, 2FA, email-verify, magic-link confirm.",
    whenNotToUse: "Passwords or longer secrets → use a normal password field.",
    a11y: "Each cell is a real <input> with aria-label='Digit 1 of 6'; pasting a full code distributes across cells; auto-submit when last cell filled; screen reader announces 'code complete'.",
    pairsWithLibraries: [],
    pairsWithStyles: ["fintech", "bank", "telehealth", "saas", "insurance", "dating"],
    impliesBy: ["auth", "verify", "2fa", "checkout"],
  },

  formwizard: {
    id: "formwizard",
    name: "Form wizard / Stepper",
    category: "input",
    tier: 1,
    desc: "Multi-step form with visible step progress (1/4 → 2/4 → ...), per-step validation, prev/next.",
    whenToUse: "Forms with >7 fields OR conditional branches OR fields that depend on earlier answers. Onboarding, eligibility check, checkout, claim flow.",
    whenNotToUse: "<7 fields with no branching → single form. Real-time settings → no wizard.",
    a11y: "Step progress is an <ol> with aria-current='step' on active; users can go back without losing data; per-step error summary at top of step.",
    pairsWithLibraries: [],
    pairsWithStyles: ["insurance", "bto", "telehealth", "fintech", "bank", "bizcard", "hr", "saas"],
    impliesBy: ["onboarding", "checkout", "eligibility", "application", "claim"],
  },

  inlineedit: {
    id: "inlineedit",
    name: "Inline edit (click-to-edit cell)",
    category: "input",
    tier: 1,
    desc: "Read-only display becomes editable on click/tap; saves on blur or Enter; reverts on Esc.",
    whenToUse: "Admin / CRM / spreadsheet UIs where users edit one field at a time without opening a modal. Renaming, status changes, quick numeric edits.",
    whenNotToUse: "First-time form creation → use a real form. Fields needing validation across siblings → use a proper edit modal.",
    a11y: "The display element is focusable (tabindex=0) and announces 'editable' via aria-label; Enter activates edit mode; on save, announces 'saved' via live region.",
    pairsWithLibraries: [],
    pairsWithStyles: ["admin", "crm", "hr", "internal", "analytics", "cms", "darkboard"],
    impliesBy: ["table", "settings", "profile", "list"],
  },

  // ─── SEARCH (1) ────────────────────────────────────────────────────────────
  searchbar: {
    id: "searchbar",
    name: "Search-as-you-type bar",
    category: "search",
    tier: 1,
    desc: "Header / global search input with debounced query + dropdown of grouped results (or command palette).",
    whenToUse: "App-wide find: customers, docs, files, commands. Distinct from combobox (which picks ONE value into a form field).",
    whenNotToUse: "Filtering an already-visible table → use filter-bar inline input. Picking a value for a form → use combobox.",
    a11y: "role=search on container, aria-live='polite' for result count announcement, results listbox keyboard-navigable, Esc clears + closes, Cmd/Ctrl-K opens (advertise the shortcut).",
    pairsWithLibraries: ["choices", "alpine"],
    pairsWithStyles: ["docs", "admin", "saas", "devtool", "darkboard", "internal", "marketplace", "music", "video"],
    impliesBy: ["header", "navigation", "command-palette", "global-search", "search", "topbar"],
  },

  // ─── DISCLOSURE (6) ────────────────────────────────────────────────────────
  modal: {
    id: "modal",
    name: "Modal / Dialog",
    category: "disclosure",
    tier: 1,
    desc: "Centered overlay that demands user attention; blocks interaction with the page behind.",
    whenToUse: "Confirmation of destructive action, focused task that needs user attention (sign-in, payment), or content that doesn't warrant a page nav.",
    whenNotToUse: "Side-task that benefits from page context → use drawer. Quick info → use popover/tooltip. Long content → use a real page.",
    a11y: "role=dialog with aria-modal=true and aria-labelledby; focus trap inside; Esc closes; on close, focus returns to the trigger; background scroll locked; first focusable element receives focus on open.",
    pairsWithLibraries: ["sweetalert2", "alpine"],
    pairsWithStyles: ["saas", "admin", "marketplace", "fintech", "bank"],
    impliesBy: ["auth", "confirm", "settings", "create", "delete", "oauth-buttons"],
  },

  drawer: {
    id: "drawer",
    name: "Drawer / Side sheet / Bottom sheet",
    category: "disclosure",
    tier: 1,
    desc: "Slide-in panel from a screen edge; can be modal (blocking) or non-modal (alongside content).",
    variants: ["right", "left", "bottom-sheet", "top"],
    whenToUse: "Inspecting / editing a record without losing list context (right drawer in admin tables); navigation on mobile (left drawer); mobile-first sheets (bottom sheet for actions).",
    whenNotToUse: "Hard requires focus + page lock → use modal. Quick contextual choice → use menu/popover.",
    a11y: "Same focus-trap + Esc + restore-focus rules as modal; aria-label='X panel' on the drawer; swipe-to-dismiss on touch + keyboard equivalent.",
    pairsWithLibraries: ["alpine"],
    pairsWithStyles: ["admin", "crm", "hr", "marketplace", "delivery", "rideshare", "maps", "music"],
    impliesBy: ["row-inspect", "edit-detail", "mobile-nav", "filter-bar", "mini-cart", "filters", "right-inspector", "cart"],
  },

  popover: {
    id: "popover",
    name: "Popover (anchored)",
    category: "disclosure",
    tier: 1,
    desc: "Floating panel anchored to a trigger; closes on outside click or Esc; non-modal.",
    whenToUse: "Contextual form (date filter, color picker), profile preview on hover, more-info that's richer than a tooltip.",
    whenNotToUse: "Pure label / hint text → use tooltip. Demands user attention → use modal.",
    a11y: "Trigger has aria-haspopup and aria-expanded; popover content focus-trapped while open OR focus stays on trigger with arrow-keys navigating; Esc closes + returns focus.",
    pairsWithLibraries: ["tippy"],
    pairsWithStyles: ["analytics", "saas", "admin", "darkboard", "creator", "blog"],
    impliesBy: ["toolbar", "filter-bar", "header", "user-menu", "datepicker-anchor", "filters", "filter-tabs"],
  },

  tooltip: {
    id: "tooltip",
    name: "Tooltip",
    category: "disclosure",
    tier: 1,
    desc: "Short text label on hover/focus of a target element; never interactive content.",
    whenToUse: "Naming an icon-only button, explaining a truncated label, showing keyboard shortcut for a control.",
    whenNotToUse: "Critical info (visible permanently instead). Anything users need to CLICK inside (popover). Mobile-only flows (no hover) — duplicate as visible label.",
    a11y: "role=tooltip with aria-describedby from the target; appears on hover AND keyboard focus (not click); Esc dismisses; never traps focus; never contains interactive elements.",
    pairsWithLibraries: ["tippy"],
    pairsWithStyles: ["devtool", "analytics", "admin", "darkboard", "saas", "internal", "construction"],
    impliesBy: ["icon-button", "toolbar", "header", "interactive-moments", "hotspot-annotations", "orbit-controls"],
  },

  menu: {
    id: "menu",
    name: "Dropdown menu / Context menu",
    category: "disclosure",
    tier: 1,
    desc: "List of actions anchored to a trigger; one click per action; supports keyboard nav and dividers.",
    variants: ["dropdown", "context", "submenu"],
    whenToUse: "More-actions (⋯) menu, user avatar menu, right-click context menu, kebab on a list row.",
    whenNotToUse: "Picking a VALUE for a form → use combobox. Persistent navigation → use nav.",
    a11y: "role=menu on container, role=menuitem on each; arrow keys move, Enter activates, Home/End jump, Esc closes + returns focus; tab moves OUT of the menu (doesn't cycle through items).",
    pairsWithLibraries: ["tippy", "alpine"],
    pairsWithStyles: ["admin", "crm", "saas", "darkboard", "marketplace", "chat", "internal"],
    impliesBy: ["table-row", "header", "toolbar", "user-menu", "kebab", "topbar", "notifications"],
  },

  accordion: {
    id: "accordion",
    name: "Accordion / Collapsible",
    category: "disclosure",
    tier: 1,
    desc: "Stack of headers that expand/collapse a content region below; can allow one-open or many-open.",
    variants: ["single-open", "multi-open"],
    whenToUse: "FAQ, settings groups, sidebar nav with sub-sections, long content with skimmable sections.",
    whenNotToUse: "Tabbed parallel content → use tabs (only one shown). Content that should be all-visible → use plain sections.",
    a11y: "Header is a <button> with aria-expanded and aria-controls pointing at the panel; panel uses aria-labelledby pointing back at header; native <details>/<summary> is acceptable.",
    pairsWithLibraries: [],
    pairsWithStyles: ["docs", "saas", "academic", "government", "bto", "insurance", "telehealth", "bookstore"],
    impliesBy: ["faq", "settings", "sidebar", "nav", "details", "faq-mini", "accordion-list", "sidebar-nav"],
  },

  // ─── FEEDBACK (5) ──────────────────────────────────────────────────────────
  toast: {
    id: "toast",
    name: "Toast / Snackbar",
    category: "feedback",
    tier: 1,
    desc: "Brief floating message at a screen corner; auto-dismisses (3-6s); optional action (Undo).",
    whenToUse: "Confirmation of an async/background action: 'Saved', 'Sent', 'Removed (Undo)'.",
    whenNotToUse: "Critical errors needing acknowledgment → use modal or alert banner. Persistent status → use alert banner.",
    a11y: "Container uses aria-live='polite' (or 'assertive' for errors); never STEAL focus; action button (Undo) is real <button> with clear label; respects prefers-reduced-motion (no slide animation if requested).",
    pairsWithLibraries: ["notyf"],
    pairsWithStyles: ["saas", "admin", "marketplace", "fintech", "bank", "crm", "email"],
    impliesBy: ["form-submit", "create", "delete", "settings", "background-action", "notifications"],
  },

  alertbanner: {
    id: "alertbanner",
    name: "Alert banner",
    category: "feedback",
    tier: 1,
    desc: "Inline persistent strip at top of a section or page; severity-coded (info, success, warn, error); dismissible or persistent.",
    variants: ["info", "success", "warn", "error", "neutral"],
    whenToUse: "System status (maintenance, outage), policy-violation summary, important context that must remain visible while the user works.",
    whenNotToUse: "Transient confirmation → use toast. Per-field form errors → use inline field error.",
    a11y: "role='alert' for errors (assertive), role='status' for info/success; icon + text + dismiss button (real <button> with aria-label).",
    pairsWithLibraries: [],
    pairsWithStyles: ["enterprise", "admin", "government", "bto", "bank", "darkboard", "telehealth", "insurance"],
    impliesBy: ["header", "form", "settings", "system-status", "notifications", "maintenance", "coming-soon"],
  },

  skeleton: {
    id: "skeleton",
    name: "Skeleton loader",
    category: "feedback",
    tier: 1,
    desc: "Grey placeholder shapes matching the eventual layout while data loads; shimmer animation.",
    whenToUse: "Loads >300ms where the eventual layout is predictable (list, card grid, profile). Reduces perceived wait.",
    whenNotToUse: "Loads <300ms (no UI needed). Unpredictable / variable layouts → use a spinner. Background updates → don't replace existing content.",
    a11y: "aria-busy=true on the container while loading; aria-hidden on individual skeleton shapes; respects prefers-reduced-motion (no shimmer).",
    pairsWithLibraries: [],
    pairsWithStyles: ["saas", "admin", "darkboard", "music", "video", "marketplace", "delivery", "blog"],
    impliesBy: ["list", "feed", "card-grid", "profile", "table", "post-grid", "product-grid", "project-grid", "data-table", "user-table"],
  },

  emptystate: {
    id: "emptystate",
    name: "Empty state",
    category: "feedback",
    tier: 1,
    desc: "Friendly placeholder when a list / page has no items yet: illustration / icon + headline + body + primary CTA.",
    whenToUse: "First-time UI before user has any data ('No customers yet · Add your first'); after filter that returns zero ('No matches · Clear filters'); after dismissed items ('All caught up').",
    whenNotToUse: "Plain blank space is acceptable for tiny secondary lists. Don't use for error states → use error UI.",
    a11y: "Headline as proper <h2>/<h3>; CTA is a real <button> or <a>; screen reader gets a coherent narrative (icon decorative, text first).",
    pairsWithLibraries: [],
    pairsWithStyles: ["saas", "admin", "crm", "hr", "lms", "podcast", "blog", "creator"],
    impliesBy: ["list", "feed", "inbox", "table", "search-results", "filter-bar", "data-table", "user-table", "notifications", "activity-feed"],
  },

  confirmdialog: {
    id: "confirmdialog",
    name: "Confirmation dialog (destructive)",
    category: "feedback",
    tier: 1,
    desc: "Modal asking 'Are you sure?' before a destructive action; cancel + confirm buttons; confirm often requires typing the resource name.",
    whenToUse: "Irreversible / destructive actions: delete account, drop database, force-push, unsubscribe from paid plan.",
    whenNotToUse: "Recoverable actions → use Undo toast instead. Trivial actions → just do them.",
    a11y: "Same modal a11y rules; default focus goes to CANCEL (not Confirm) to prevent accidental confirm-on-Enter; confirm button uses danger styling; describe consequences explicitly ('This permanently deletes 12 customers').",
    pairsWithLibraries: ["sweetalert2"],
    pairsWithStyles: ["admin", "crm", "hr", "saas", "internal", "darkboard", "devtool", "bank"],
    impliesBy: ["delete", "destroy", "unsubscribe", "force-push", "danger-zone", "cancel"],
  },

  // ─── PROGRESS (1) ──────────────────────────────────────────────────────────
  progressbar: {
    id: "progressbar",
    name: "Progress bar / indicator",
    category: "progress",
    tier: 1,
    desc: "Linear (or circular) bar showing completion %; determinate (known total) or indeterminate (no total).",
    variants: ["linear", "circular", "indeterminate"],
    whenToUse: "File upload, multi-step form wizard, install/sync progress, course completion, scarcity bar.",
    whenNotToUse: "Single short action (<1s) → no UI. Unknown duration where no useful % can be shown → use spinner.",
    a11y: "role=progressbar with aria-valuenow / aria-valuemin / aria-valuemax (omit valuenow for indeterminate); aria-label or aria-labelledby naming what's progressing.",
    pairsWithLibraries: [],
    pairsWithStyles: ["lms", "bto", "insurance", "telehealth", "flash", "marketplace", "fitness"],
    impliesBy: ["upload", "wizard", "checkout", "scarcity", "course", "loading", "progress", "progress-bar", "step-content"],
  },

  // ─── NAVIGATION (8) ────────────────────────────────────────────────────────
  breadcrumbs: {
    id: "breadcrumbs",
    name: "Breadcrumbs",
    category: "navigation",
    tier: 2,
    desc: "Chain of links showing the current page's ancestry: Home › Section › Subsection › Current.",
    whenToUse: "Deep hierarchies (docs, admin settings, file systems, ecommerce categories) where users land mid-tree.",
    whenNotToUse: "Flat sites (≤2 levels). Linear flows (checkout, wizard) → use stepper instead.",
    a11y: "Wrap in <nav aria-label='Breadcrumb'>; ordered list; current page is plain text (not a link) with aria-current='page'; separator (›) is decorative (aria-hidden).",
    pairsWithLibraries: [],
    pairsWithStyles: ["docs", "admin", "enterprise", "marketplace", "utility", "consulting", "academic"],
    impliesBy: ["header", "page-shell", "deep-page", "category", "breadcrumbs", "topbar"],
  },

  tabs: {
    id: "tabs",
    name: "Tabs",
    category: "navigation",
    tier: 2,
    desc: "Horizontal (or vertical) tab strip switching between parallel content panels; one panel visible at a time.",
    variants: ["underline", "pill", "boxed", "vertical"],
    whenToUse: "Parallel views of the same context: product Description / Specs / Reviews / Q&A; settings panels; doc-page sections.",
    whenNotToUse: "Linear flow → use stepper. Always-visible content → use sections. 7+ tabs → consider dropdown or sidebar.",
    a11y: "role=tablist on container, role=tab on each (aria-selected, aria-controls), role=tabpanel on each panel (aria-labelledby); arrow keys move between tabs; Home/End jump; Tab moves into the panel content.",
    pairsWithLibraries: ["alpine"],
    pairsWithStyles: ["utility", "saas", "admin", "darkboard", "marketplace", "docs", "fintech", "creator"],
    impliesBy: ["product-detail", "settings", "profile", "dashboard", "category-tabs", "filter-tabs", "code-tabs"],
  },

  pagination: {
    id: "pagination",
    name: "Pagination",
    category: "navigation",
    tier: 2,
    desc: "Numbered page links (1 2 3 … 24) with Prev/Next; usually below a list or table.",
    variants: ["numbered", "prev-next-only", "load-more"],
    whenToUse: "Bounded lists where total count matters and users may jump (search results, table rows, archive).",
    whenNotToUse: "Feeds where users scroll continuously → infinite scroll. Unbounded streams → load-more button.",
    a11y: "Wrap in <nav aria-label='Pagination'>; current page has aria-current='page'; disabled Prev/Next have aria-disabled='true'; screen reader announces 'Page 2 of 24'.",
    pairsWithLibraries: [],
    pairsWithStyles: ["admin", "marketplace", "utility", "blog", "news", "jobs", "realestate", "enterprise"],
    impliesBy: ["list", "search-results", "table", "archive", "feed", "pagination", "product-grid", "post-grid", "project-grid", "data-table", "user-table"],
  },

  infinitescroll: {
    id: "infinitescroll",
    name: "Infinite scroll",
    category: "navigation",
    tier: 2,
    desc: "Loads next page of content automatically as the user nears the bottom; sentinel-based, with loading sentinel + 'end of feed' marker.",
    whenToUse: "Browsing feeds (social, news, video, music) where order matters but bounds don't. Pair with a 'back-to-top' affordance.",
    whenNotToUse: "Reference content (docs, results) where users need a stable footer → use pagination. SEO-critical pages → server-render paginated.",
    a11y: "Loading sentinel has role='status' announcing 'Loading more'; provide a manual 'Load more' button as fallback; never trap keyboard users in the feed (footer must be reachable).",
    pairsWithLibraries: [],
    pairsWithStyles: ["news", "blog", "video", "music", "podcast", "story", "marketplace", "delivery", "fitness"],
    impliesBy: ["feed", "timeline", "list", "river", "scroll", "post-grid", "activity-feed", "blog-index"],
  },

  commandpalette: {
    id: "commandpalette",
    name: "Command palette (⌘K)",
    category: "navigation",
    tier: 2,
    desc: "Keyboard-triggered modal with fuzzy-search across actions, navigation targets, and recent items.",
    whenToUse: "Power-user apps (devtool, IDE, docs, design tools, admin) where users perform many discrete actions. Cmd-K / Ctrl-K is the universal shortcut.",
    whenNotToUse: "Consumer apps with <12 actions (overkill). Mobile-first (no keyboard shortcut convention).",
    a11y: "role=dialog + focus trap (same modal rules); input has role=combobox + aria-activedescendant; results listbox keyboard-navigable; advertise the shortcut visibly in the header search anchor.",
    pairsWithLibraries: ["alpine"],
    pairsWithStyles: ["devtool", "saas", "docs", "admin", "internal", "darkboard", "creator", "agency"],
    impliesBy: ["header", "navigation", "search", "power-user", "command-palette", "topbar"],
  },

  sidebarnav: {
    id: "sidebarnav",
    name: "Sidebar nav (collapsible tree)",
    category: "navigation",
    tier: 2,
    desc: "Left-rail vertical navigation with grouped sections, collapsible groups, icon + label items, active-item highlight.",
    variants: ["fixed", "collapsible-icon", "drawer-mobile", "multi-level"],
    whenToUse: "Apps with 8+ nav destinations + scoped sub-navigation. Admin, dashboards, docs, IDEs, ERP.",
    whenNotToUse: "Marketing sites (use top nav). <5 destinations (top nav is enough).",
    a11y: "Wrap in <nav aria-label='Main'>; collapsible groups use <button aria-expanded>; current page has aria-current='page'; on mobile, becomes a drawer with standard focus-trap rules.",
    pairsWithLibraries: [],
    pairsWithStyles: ["admin", "darkboard", "docs", "enterprise", "crm", "hr", "cms", "analytics", "legalsaas", "construction"],
    impliesBy: ["app-shell", "dashboard", "settings", "navigation", "sidebar-nav"],
  },

  bottomnav: {
    id: "bottomnav",
    name: "Bottom navigation (mobile)",
    category: "navigation",
    tier: 2,
    desc: "Mobile-only fixed bottom bar with 3-5 primary destinations (icon + label); active item highlighted.",
    whenToUse: "Mobile app shells with 3-5 top-level destinations. Tap targets >=44px. Always visible (never hide on scroll for primary nav).",
    whenNotToUse: "Desktop (use sidebar or top nav). 6+ destinations → use overflow menu or drawer.",
    a11y: "Wrap in <nav aria-label='Primary'>; each item is a link/button; current item has aria-current='page'; respects safe-area-inset-bottom on iOS notch devices.",
    pairsWithLibraries: [],
    pairsWithStyles: ["rideshare", "delivery", "music", "video", "dating", "fitness", "telehealth", "bank", "marketplace"],
    impliesBy: ["mobile-app", "app-shell", "navigation", "topbar"],
  },

  skiplink: {
    id: "skiplink",
    name: "Skip-to-content link",
    category: "navigation",
    tier: 2,
    desc: "Hidden-until-focused link at the very top of the page that jumps focus to the main content, bypassing nav.",
    whenToUse: "EVERY page that has a header / nav. Non-negotiable for accessible sites. ~5 lines of CSS.",
    whenNotToUse: "Single-screen apps with no header (rare).",
    a11y: "First focusable element; visually hidden until :focus; jumps focus + scroll to #main; #main has tabindex='-1' so it can receive focus; link text 'Skip to main content'.",
    pairsWithLibraries: [],
    pairsWithStyles: ["government", "academic", "medical", "telehealth", "nonprofit", "bto", "bookstore", "museum"],
    impliesBy: ["header", "nav", "page-shell", "accessibility", "topbar", "masthead"],
  },

  // ─── DATA DISPLAY (11) ─────────────────────────────────────────────────────
  datatable: {
    id: "datatable",
    name: "Data table",
    category: "data",
    tier: 2,
    desc: "Tabular data with sortable headers, column resize, row selection (checkbox), pagination, filter row, sticky header, optional row expansion.",
    variants: ["basic-sortable", "advanced-filter-resize", "tree-table", "virtualized"],
    whenToUse: "Lists of 20+ structured records where users sort/filter/compare. Admin, CRM, analytics, finance, ERP.",
    whenNotToUse: "Visual-heavy items → use card grid. <10 items → simple <ul>. Mobile narrow screens → collapse to stacked cards.",
    a11y: "Real <table> with <thead>/<tbody>; sortable headers are <button> children with aria-sort; row-select checkboxes have aria-label='Select row {n}'; sticky header preserves table semantics.",
    pairsWithLibraries: ["tabulator", "gridjs"],
    pairsWithStyles: ["admin", "darkboard", "crm", "hr", "enterprise", "analytics", "internal", "fintech", "bank", "biotech"],
    impliesBy: ["list", "records", "ledger", "ranking", "leaderboard", "data-table", "user-table", "billing-history", "version-list", "audit-log", "change-plan", "order-details", "line-items"],
  },

  kanban: {
    id: "kanban",
    name: "Kanban board (drag-drop columns)",
    category: "data",
    tier: 2,
    desc: "Columns representing pipeline stages; cards drag horizontally between columns; per-column count + value totals.",
    whenToUse: "Pipeline / workflow visualization where items move through stages: deals (CRM), candidates (HR), tickets (support), tasks (project mgmt).",
    whenNotToUse: "Flat lists with no workflow → use list/table. Heavy data per item → use detail drawer instead of card cramming.",
    a11y: "Cards are focusable; provide keyboard alternative to drag-drop (move-to-column dropdown on card focus); column drops announce via live region; aria-grabbed/aria-dropeffect or HTML5 DnD with keyboard fallback.",
    pairsWithLibraries: ["sortable"],
    pairsWithStyles: ["crm", "hr", "admin", "construction", "internal", "saas", "cms"],
    impliesBy: ["pipeline", "workflow", "board", "stages", "candidates", "deals", "dashboard"],
  },

  calendar: {
    id: "calendar",
    name: "Calendar (month / week / day)",
    category: "data",
    tier: 2,
    desc: "Calendar grid with events laid out across days; switchable month/week/day views; today indicator; click-to-create.",
    variants: ["month-grid", "week-timeline", "day-agenda", "year-overview"],
    whenToUse: "Scheduling, booking, content calendars, availability viewing, agenda displays. Distinct from datepicker (which picks a date for a form).",
    whenNotToUse: "Single-date selection → use datepicker. Project Gantt → use timeline.",
    a11y: "Each day cell is keyboard-navigable (arrow keys move days, PgUp/PgDn months); events inside cells are focusable buttons; today + selected day clearly distinguished; multi-day events span semantically.",
    pairsWithLibraries: [],
    pairsWithStyles: ["airline", "hotel", "salon", "event", "lms", "telehealth", "cms", "academic", "church"],
    impliesBy: ["schedule", "booking", "events", "availability", "timeline"],
  },

  timeline: {
    id: "timeline",
    name: "Timeline (vertical activity)",
    category: "data",
    tier: 2,
    desc: "Vertical (or horizontal) chronological list with a center line, dots at events, content panels alternating sides.",
    variants: ["vertical-activity", "horizontal-roadmap", "milestone"],
    whenToUse: "Activity feeds, audit logs, project milestones, biography pages, order tracking, status history.",
    whenNotToUse: "Pure-list activity → simple chronological list works. Real schedule → calendar.",
    a11y: "Use <ol> for the timeline; each event is <li> with a clear datetime; visually decorative dots are aria-hidden; provide a 'jump to date' control for long timelines.",
    pairsWithLibraries: [],
    pairsWithStyles: ["delivery", "rideshare", "bto", "construction", "podcast", "blog", "academic", "museum", "legalsaas"],
    impliesBy: ["activity", "history", "tracking", "milestones", "audit", "order-status", "timeline", "activity-feed", "audit-log", "version-list", "changelog", "sticky-chapters", "scroll-scenes"],
  },

  treeview: {
    id: "treeview",
    name: "Tree view",
    category: "data",
    tier: 2,
    desc: "Nested hierarchical list with expand/collapse chevrons; selectable nodes; supports multi-level depth.",
    whenToUse: "File browsers, org charts, taxonomies, navigation trees, structured data inspection.",
    whenNotToUse: "Flat lists → use list/table. Side nav → use sidebarnav (specialized tree).",
    a11y: "role=tree on container; role=treeitem on each; aria-expanded on parents; aria-level (1-based); arrow keys: Right opens, Left closes, Down/Up traverse visible nodes.",
    pairsWithLibraries: [],
    pairsWithStyles: ["cms", "admin", "devtool", "docs", "internal", "construction", "agtech"],
    impliesBy: ["files", "folders", "categories", "taxonomy", "org-chart"],
  },

  statkpi: {
    id: "statkpi",
    name: "Stat / KPI card",
    category: "data",
    tier: 2,
    desc: "Big number + label + delta % vs prior period + optional sparkline; typically arranged in 3-4 column grid above a dashboard.",
    whenToUse: "Top-of-dashboard headline metrics, executive summaries, marketing-page stats bar.",
    whenNotToUse: "Single isolated number with no comparison → just bold text. Detailed breakdown → use chart.",
    a11y: "Number announced as labeled value: aria-label='Revenue, $2.4 million, up 12 percent vs last month'; tabular-nums for numeric alignment; delta arrows are decorative (aria-hidden) — color isn't the only signal (use ▲/▼ glyph).",
    pairsWithLibraries: [],
    pairsWithStyles: ["analytics", "darkboard", "admin", "fintech", "bank", "consulting", "corporate", "nonprofit"],
    impliesBy: ["dashboard", "stats-bar", "metrics", "overview", "summary", "kpi-cards", "results-stats", "primary-chart", "data-reveals", "spec-highlights", "spec-panel"],
  },

  sparkline: {
    id: "sparkline",
    name: "Sparkline (inline micro-chart)",
    category: "data",
    tier: 2,
    desc: "Tiny line/bar chart embedded in-line with text or a stat; conveys trend without axes/labels.",
    whenToUse: "Stat cards (trend next to big number), table rows (per-row history), dense dashboards. Glance-able trend, not precise reading.",
    whenNotToUse: "Detailed analysis → real chart with axes. Single value without trend → just the number.",
    a11y: "SVG with aria-label summarising direction + magnitude ('Trending up 12% over 30 days'); use a focusable <title> for native browser tooltip; respect prefers-reduced-motion (no draw animation).",
    pairsWithLibraries: ["chartjs", "echarts", "d3", "apexcharts"],
    pairsWithStyles: ["analytics", "darkboard", "fintech", "bank", "admin", "crm", "fitness", "crypto"],
    impliesBy: ["stat-card", "table", "dashboard", "metrics-row", "kpi-cards", "primary-chart"],
  },

  heatmap: {
    id: "heatmap",
    name: "Heatmap / matrix",
    category: "data",
    tier: 2,
    desc: "Grid where each cell's color encodes a value; legend explains the color scale (sequential or diverging).",
    variants: ["calendar-heatmap", "matrix-grid", "geo-choropleth"],
    whenToUse: "Cohort retention, GitHub-style contribution graph, correlation matrices, schedule density, geographic distribution.",
    whenNotToUse: "Few data points → bar chart. Time-series → line chart.",
    a11y: "Each cell is focusable with aria-label='Date X, value Y'; color is NOT the only signal (label or pattern fallback); legend in plain text + visual gradient.",
    pairsWithLibraries: ["echarts", "d3"],
    pairsWithStyles: ["analytics", "darkboard", "fitness", "agtech", "biotech", "crypto", "hr"],
    impliesBy: ["cohort", "retention", "calendar", "matrix", "density", "primary-chart", "dashboard"],
  },

  comparisontable: {
    id: "comparisontable",
    name: "Comparison table",
    category: "data",
    tier: 2,
    desc: "Side-by-side feature comparison: rows = features, columns = options/plans/products; cells = ✓/✗ or values; recommended option highlighted.",
    whenToUse: "Pricing tier comparison, product feature comparison, vs-competitor tables, insurance plan comparison.",
    whenNotToUse: "Single product detail → use spec list. >5 columns → consider stacked cards or expandable rows.",
    a11y: "Real <table> with <thead>; ✓/✗ marks have screen-reader text ('Included' / 'Not included' — not just the icon); sticky first column for context on horizontal scroll.",
    pairsWithLibraries: [],
    pairsWithStyles: ["saas", "fintech", "insurance", "telehealth", "lms", "corporate", "consulting", "utility"],
    impliesBy: ["pricing", "comparison", "plans", "tiers", "vs-competitor", "comparison-table", "feature-comparison", "compare-page", "tier-cards", "spec-panel", "spec-highlights"],
  },

  diffview: {
    id: "diffview",
    name: "Diff view (side-by-side / inline)",
    category: "data",
    tier: 2,
    desc: "Display two versions of text/code with added/removed lines color-coded; unified inline OR side-by-side panes.",
    variants: ["inline", "side-by-side", "split-3-way"],
    whenToUse: "Code review, document version compare, contract redlines, settings change preview.",
    whenNotToUse: "Tracking small text edits → use simple visible changes. Whole-page comparison → use side-by-side iframes.",
    a11y: "Color is NOT the only signal: prefix + / − glyphs on added/removed lines; line numbers visible; screen reader can read both sides in logical order.",
    pairsWithLibraries: ["codemirror", "monaco"],
    pairsWithStyles: ["devtool", "docs", "cms", "legalsaas", "legal", "biotech"],
    impliesBy: ["code-review", "version", "compare", "redline", "changelog", "version-list"],
  },

  jsonviewer: {
    id: "jsonviewer",
    name: "JSON / tree viewer",
    category: "data",
    tier: 2,
    desc: "Collapsible tree rendering of structured data (JSON / XML); type-colored values; search/filter; copy-path button.",
    whenToUse: "API response inspection, webhook payload debugging, config preview, audit-log raw data.",
    whenNotToUse: "Human-readable content → render as proper UI. Edit-not-just-view → use a real JSON editor.",
    a11y: "Tree-view a11y rules (treeitem + aria-expanded + aria-level); mono font for value alignment; allow keyboard expand/collapse of nodes.",
    pairsWithLibraries: ["codemirror"],
    pairsWithStyles: ["devtool", "admin", "internal", "darkboard", "analytics", "construction"],
    impliesBy: ["api-response", "webhook", "config", "debug", "audit-log", "output-panel"],
  },

  codeblock: {
    id: "codeblock",
    name: "Code block (with syntax + copy)",
    category: "data",
    tier: 2,
    desc: "Mono-font block with syntax highlighting; optional language tabs (curl / node / python); persistent copy button; line numbers optional.",
    whenToUse: "Developer documentation, API references, tutorials, README files, technical blog posts.",
    whenNotToUse: "Single inline keyword → use inline <code>. Output that needs editing → use a real code editor.",
    a11y: "Use <pre><code class='language-X'>; copy button is a real <button> with aria-label='Copy code'; on copy, announce 'Code copied' via live region; allow text selection (don't disable user-select).",
    pairsWithLibraries: ["highlightjs", "prism", "codemirror"],
    pairsWithStyles: ["devtool", "docs", "blog", "creator", "podcast"],
    impliesBy: ["docs", "tutorial", "api-reference", "code-sample", "code-blocks", "code-tabs", "examples"],
  },

  // ─── MEDIA (3) ─────────────────────────────────────────────────────────────
  carousel: {
    id: "carousel",
    name: "Carousel / Slider",
    category: "media",
    tier: 2,
    desc: "Horizontally-scrolling sequence of slides (images, cards, testimonials); pagination dots + prev/next; optional autoplay.",
    variants: ["image-only", "card-rail", "testimonial-quote", "hero-cycle"],
    whenToUse: "Showcasing a small set (3-7) of equally-important items where space is limited. Product image galleries, testimonial rotators, related-products rails.",
    whenNotToUse: "Critical conversion content → never hide behind a slide (autoplay = ignored). Marketing hero with rotating value props → just commit to one message.",
    a11y: "Pause autoplay on hover/focus + provide visible pause button; arrows are real <button>s with aria-label; current slide announced via live region; never hide slide content from screen readers (off-screen text is still discoverable); respects prefers-reduced-motion.",
    pairsWithLibraries: ["swiper", "splide"],
    pairsWithStyles: ["marketplace", "hotel", "boutique", "story", "music", "video", "museum"],
    impliesBy: ["product-gallery", "testimonials", "hero", "rail", "gallery", "screenshots", "related", "recommendations", "scroll-scenes", "parallax-layers", "scroll-triggered-visuals", "feature-deep-dives", "interactive-feature", "pull-quotes"],
  },

  lightbox: {
    id: "lightbox",
    name: "Lightbox / Image modal",
    category: "media",
    tier: 2,
    desc: "Click an image thumbnail → full-viewport overlay with the large image; arrow keys navigate between siblings; close on Esc / outside click.",
    whenToUse: "Image galleries, photo portfolios, product image zoom, before/after comparisons.",
    whenNotToUse: "Video → use a video player surface. Single hero image → just show it big.",
    a11y: "Same modal a11y rules (focus trap, Esc, restore focus); arrow keys move siblings; current image announced ('Image 3 of 12'); zoom-on-click also accessible via keyboard.",
    pairsWithLibraries: [],
    pairsWithStyles: ["gallery", "boutique", "hotel", "museum", "story", "marketplace", "portfolio", "realestate"],
    impliesBy: ["gallery", "product-images", "photos", "screenshots", "portfolio", "project-grid", "hotspot-annotations", "interactive-moments"],
  },

  videoplayer: {
    id: "videoplayer",
    name: "Video player (custom controls)",
    category: "media",
    tier: 2,
    desc: "<video> element with branded custom controls: play/pause, scrubber, timestamp, volume, captions, fullscreen, playback speed.",
    whenToUse: "Hosting your own video (course lessons, marketing demos, recorded interviews, product demos). Captions support required for inclusivity.",
    whenNotToUse: "YouTube/Vimeo embeds → use their player. Background-decor video → autoplay muted with no controls.",
    a11y: "All controls are real <button>s with aria-label; captions toggle exposed; keyboard shortcuts (space=play/pause, M=mute, arrows=seek) documented; provide a transcript for serious content (course, talk).",
    pairsWithLibraries: ["plyr", "videojs"],
    pairsWithStyles: ["lms", "podcast", "video", "agency", "music", "creator", "telehealth", "automotive"],
    impliesBy: ["video", "lesson", "demo", "media-player", "hero", "step-content", "full-bleed-hero", "cinematic-hero", "themed-hero", "canvas-stage"],
  },

  // ─── IDENTITY (1) ──────────────────────────────────────────────────────────
  avatar: {
    id: "avatar",
    name: "Avatar (single / stack / fallback)",
    category: "identity",
    tier: 2,
    desc: "Round profile image; falls back to initials on coloured background; supports overlapping 'stack' for multi-user contexts.",
    variants: ["single", "stack-overlapping", "with-status", "with-name-pill"],
    whenToUse: "Anywhere a user is named: chat message, comment, list of assignees, members directory, presence dots.",
    whenNotToUse: "Decorative logo → use a logo. Single icon-only action → just an icon.",
    a11y: "Image has alt='Avatar of {Name}'; initials fallback has aria-label='Avatar of {Name}'; status dot uses aria-label='Online'/'Away' (color isn't the only signal); avatar stack announces 'and X more' for hidden members.",
    pairsWithLibraries: [],
    pairsWithStyles: ["chat", "crm", "hr", "dating", "music", "podcast", "agency", "creator"],
    impliesBy: ["user", "member", "assignee", "comment", "chat", "presence", "team", "team-grid", "profile", "author-bio"],
  },

  // ─── MISC (1) ──────────────────────────────────────────────────────────────
  badge: {
    id: "badge",
    name: "Badge / Pill / Chip",
    category: "misc",
    tier: 2,
    desc: "Small label or count indicator. Variants: status pill (color-coded), numeric count badge, removable chip, tag.",
    variants: ["status-pill", "count-badge", "removable-chip", "tag", "dot"],
    whenToUse: "Status tagging (Active / Paid / Overdue), unread counts (inbox: 3), filter chips, tags, pricing labels.",
    whenNotToUse: "Long text → use a banner. Critical alerts → use alert banner. Interactive primary action → use a button.",
    a11y: "Color is NEVER the only signal — pair status pill with icon or distinct text; count badge is wrapped with parent context ('Inbox, 3 unread'); removable chip's × is a real <button> with aria-label.",
    pairsWithLibraries: [],
    pairsWithStyles: ["admin", "enterprise", "chat", "crm", "hr", "marketplace", "saas", "darkboard"],
    impliesBy: ["status", "count", "tag", "filter", "table-row", "notification", "notifications", "tier-cards", "category-tabs", "filter-tabs", "social-proof"],
  },

  // ─── COMMERCE (7) ──────────────────────────────────────────────────────────
  variantpicker: {
    id: "variantpicker",
    name: "Variant picker (swatch + size)",
    category: "commerce",
    tier: 3,
    desc: "Choose product variants: color swatch row + size pill grid; out-of-stock variants visually disabled but still announceable.",
    variants: ["color-swatch", "size-pill", "material-swatch", "image-swatch"],
    whenToUse: "Any product with multiple variants: clothing (size + color), shoes (size + width), tech (storage + color).",
    whenNotToUse: "Single-variant product → just an Add-to-cart. >5 dimensions → use a configurator stepper.",
    a11y: "Each swatch/size is a real <button> with aria-pressed; color name in aria-label ('Color: Navy blue' — color alone fails for low-vision); out-of-stock has aria-disabled='true' + visible 'Out of stock' text; size guide link adjacent.",
    pairsWithLibraries: [],
    pairsWithStyles: ["marketplace", "boutique", "utility", "story"],
    impliesBy: ["product-detail", "checkout", "variant", "configure", "product", "product-grid", "config-options"],
  },

  minicart: {
    id: "minicart",
    name: "Mini cart drawer",
    category: "commerce",
    tier: 3,
    desc: "Right-side drawer summarizing cart: line items + qty stepper + remove + subtotal + Checkout CTA. Opens on add-to-cart or cart-icon click.",
    whenToUse: "Ecommerce sites where Add-to-cart shouldn't trigger a full-page nav. Preserves browsing context while confirming the add.",
    whenNotToUse: "Single-product checkout (skip the cart, go straight to checkout). Marketplace with cart split across vendors → use a full cart page.",
    a11y: "Same drawer rules (focus trap, Esc); on open, focus moves to the just-added line item ('Added: Product X, qty 1'); subtotal announced via live region when qty changes; Checkout CTA gets focus before close.",
    pairsWithLibraries: ["alpine"],
    pairsWithStyles: ["marketplace", "boutique", "utility", "story", "delivery"],
    impliesBy: ["add-to-cart", "header", "marketplace", "cart", "line-items", "checkout-cta"],
  },

  wishlist: {
    id: "wishlist",
    name: "Wishlist heart toggle",
    category: "commerce",
    tier: 3,
    desc: "Heart icon on product cards; tap toggles saved state with subtle animation; persists per-user.",
    whenToUse: "Browsing-heavy commerce where users compare before buying. Fashion, home, real estate, travel.",
    whenNotToUse: "Single-product or impulse-buy flows (skip). B2B procurement (use 'Save quote' instead).",
    a11y: "Real <button> with aria-pressed='true'/'false'; aria-label='Save to wishlist' / 'Saved to wishlist, click to remove'; on toggle, announce 'Added to wishlist' / 'Removed' via live region; never rely on red-vs-outline color alone.",
    pairsWithLibraries: [],
    pairsWithStyles: ["marketplace", "boutique", "story", "realestate", "hotel", "dating"],
    impliesBy: ["product-card", "listing", "favorite", "save", "product-grid", "product", "gallery"],
  },

  pricedisplay: {
    id: "pricedisplay",
    name: "Price display (strikethrough + discount)",
    category: "commerce",
    tier: 3,
    desc: "Composite price: current price prominent + original price strikethrough + percentage-off badge; sometimes 'lowest in 30 days' regulatory note.",
    variants: ["sale", "tiered-quantity", "subscription", "from-price", "free-shipping-pill"],
    whenToUse: "Any commerce page showing a discounted price. Marketplace cards, flash sales, ecommerce PDP.",
    whenNotToUse: "Non-discounted single price → just bold the number. Subscription tier → use comparisontable.",
    a11y: "Tabular numbers; aria-label='Now $9.90, was $29, save 65%' (one coherent string); strikethrough has aria-label='Was $29' or <s> semantics; never use color alone to signal sale.",
    pairsWithLibraries: [],
    pairsWithStyles: ["marketplace", "flash", "utility", "boutique", "delivery", "korean"],
    impliesBy: ["product-card", "sale", "checkout", "pricing", "tier-cards", "product-grid", "product", "pre-order-cta", "countdown-or-reveal"],
  },

  checkoutstepper: {
    id: "checkoutstepper",
    name: "Checkout stepper",
    category: "commerce",
    tier: 3,
    desc: "Multi-step checkout: Cart → Address → Shipping → Payment → Review; progress visible; can step back; line-item summary persistent.",
    whenToUse: "Standard ecommerce checkout flow. Reduces cognitive load vs single-page form.",
    whenNotToUse: "Express / one-tap checkout (Apple Pay, saved profile) → skip steps. Marketplace cart with multi-vendor split → use composite review screen.",
    a11y: "Step <ol> with aria-current='step' on active; each step is internally a proper form with field validation + error summary at top; backwards nav preserves data; never auto-submit on Enter mid-step.",
    pairsWithLibraries: [],
    pairsWithStyles: ["marketplace", "boutique", "story", "utility", "airline", "hotel"],
    impliesBy: ["checkout", "payment", "purchase", "cart", "checkout-cta", "shipping"],
  },

  addressbook: {
    id: "addressbook",
    name: "Address book selector",
    category: "commerce",
    tier: 3,
    desc: "List of saved addresses with radio selection; 'Add new' inline form; default-address indicator.",
    whenToUse: "Returning users in checkout / settings. Multi-shipping ecommerce (gifting). Returning travel/hotel bookings.",
    whenNotToUse: "Guest / first-time checkout → single inline address form is enough.",
    a11y: "Each address is a labelled radio (role=radio inside role=radiogroup); 'Default' badge has screen-reader text; 'Add new' opens inline form with focus on first field; address autocomplete inputs labelled correctly (street-address, postal-code, country-name).",
    pairsWithLibraries: [],
    pairsWithStyles: ["marketplace", "boutique", "delivery", "story", "utility", "hotel"],
    impliesBy: ["checkout", "settings", "shipping", "profile"],
  },

  ratinginput: {
    id: "ratinginput",
    name: "Rating input (stars)",
    category: "commerce",
    tier: 3,
    desc: "Row of 5 (or 10) stars where users hover/tap to set a rating; fractional support optional.",
    whenToUse: "Reviews collection, post-delivery feedback, product/restaurant/driver ratings.",
    whenNotToUse: "DISPLAY of an already-set rating → use a non-interactive star row + tabular number. Granular numeric rating → use slider.",
    a11y: "5 real <input type='radio'>s grouped (role=radiogroup); each labelled '1 star', '2 stars', etc.; visual stars are <label>s with aria-hidden=true icons; supports keyboard arrow-key adjustment; current selection announced.",
    pairsWithLibraries: [],
    pairsWithStyles: ["marketplace", "delivery", "rideshare", "hotel", "restaurant", "utility", "lms"],
    impliesBy: ["review", "feedback", "rating", "post-purchase", "testimonials"],
  },

  // ─── CHAT / COMMS (4) ──────────────────────────────────────────────────────
  messagebubble: {
    id: "messagebubble",
    name: "Message bubble (sender / receiver)",
    category: "chat",
    tier: 3,
    desc: "Chat message rendered as a bubble; sender bubbles right-aligned with brand color, receiver left-aligned neutral; timestamp + delivery state (sent/delivered/read).",
    variants: ["text", "image", "file-attachment", "system", "reply-thread"],
    whenToUse: "Any 1:1 or group chat UI: messaging app, support widget, comments in real-time.",
    whenNotToUse: "Threaded forum / async comments → use comment-card layout instead.",
    a11y: "Each message in a list (role=log + aria-live='polite' on the stream); each bubble's author + timestamp announced ('Sarah, 2:14pm: Hey'); delivery state in aria-label not just icon; auto-scroll respects user's manual scroll-up.",
    pairsWithLibraries: [],
    pairsWithStyles: ["chat", "dating", "telehealth", "delivery", "rideshare", "salon"],
    impliesBy: ["chat", "message", "conversation", "thread", "activity-feed"],
  },

  typingindicator: {
    id: "typingindicator",
    name: "Typing indicator",
    category: "chat",
    tier: 3,
    desc: "Animated three dots showing the other party is composing a message; appears below the last message.",
    whenToUse: "Real-time 1:1 / group chat with read-receipt-grade socket presence.",
    whenNotToUse: "Async messaging without presence (Slack-style channels can skip). Performance-sensitive UI (gates a lot of sockets).",
    a11y: "Wrap in aria-live='polite' with text 'Sarah is typing' (the dots are decorative); never announce 'typing' on every keystroke (debounce); respects prefers-reduced-motion (static '…' instead of animation).",
    pairsWithLibraries: [],
    pairsWithStyles: ["chat", "dating", "telehealth", "delivery", "rideshare"],
    impliesBy: ["chat", "real-time", "conversation"],
  },

  chatcomposer: {
    id: "chatcomposer",
    name: "Chat composer",
    category: "chat",
    tier: 3,
    desc: "Sticky bottom input with auto-grow textarea + attach button + emoji picker + slash-commands menu + send button. Enter sends; Shift+Enter newline.",
    whenToUse: "Any chat surface where users compose. Slack-style channels, DMs, support widgets, support agent UI.",
    whenNotToUse: "Read-only message log (status updates) → no composer needed. Quick-reply with template buttons only → use button row.",
    a11y: "Textarea is properly labelled ('Message to {channel/user}'); attach + emoji + send are real <button>s with aria-label; slash-command menu uses combobox a11y rules; Enter/Shift+Enter behavior advertised in placeholder or tooltip.",
    pairsWithLibraries: ["alpine"],
    pairsWithStyles: ["chat", "dating", "telehealth", "delivery"],
    impliesBy: ["chat", "message", "compose", "send", "activity-feed"],
  },

  reactionpicker: {
    id: "reactionpicker",
    name: "Reaction picker (emoji)",
    category: "chat",
    tier: 3,
    desc: "Inline emoji picker for reacting to a message/post; hover/focus a message → reveal quick-reactions; '+' opens full picker.",
    whenToUse: "Social-feed reactions, chat-message reactions, comment-thread upvoting alternative.",
    whenNotToUse: "Strict like/dislike (use a single button). Forum upvote-only (use a count button).",
    a11y: "Quick-reaction strip is role=toolbar with arrow-key nav; each emoji is real <button> with aria-pressed (when toggled) + aria-label ('React with thumbs up'); full picker opens as a popover with searchable combobox + category tabs.",
    pairsWithLibraries: [],
    pairsWithStyles: ["chat", "crm", "creator", "dating", "podcast"],
    impliesBy: ["message", "comment", "post", "react"],
  },

  // ─── AUTH (4) ──────────────────────────────────────────────────────────────
  signinsocial: {
    id: "signinsocial",
    name: "Sign-in with social providers",
    category: "auth",
    tier: 3,
    desc: "Provider button row: Continue with Google / Apple / GitHub / Microsoft + 'or' divider + email/password fallback. Brand-correct logos + colors per provider.",
    whenToUse: "Consumer / prosumer SaaS / dev tools where social auth lowers friction. SOC2 environments (Google/Microsoft workspace).",
    whenNotToUse: "Strict-compliance B2B (only SSO / SAML). Anonymous/guest-first apps where login is delayed.",
    a11y: "Each provider button is real <button> or <a> with aria-label ('Sign in with Google'); brand icons are decorative (aria-hidden); divider 'or' uses <hr> with text; password field has show/hide toggle with proper labelling.",
    pairsWithLibraries: [],
    pairsWithStyles: ["saas", "devtool", "dating", "lms", "creator", "podcast", "fitness"],
    impliesBy: ["auth", "sign-in", "log-in", "register", "auth-login", "oauth-buttons"],
  },

  signupwizard: {
    id: "signupwizard",
    name: "Multi-step sign-up wizard",
    category: "auth",
    tier: 3,
    desc: "Sign-up flow split across 3-5 screens: Email → Verify → Profile → Preferences → Done. Progress bar; back-step allowed; magic-link option.",
    whenToUse: "Apps with required onboarding context (workspace setup, team invite, role pick). Reduces single-screen overwhelm.",
    whenNotToUse: "Simple consumer apps (single email+password screen). Returning-user flows.",
    a11y: "Same formwizard a11y rules; preserve magic-link email on back-step; tabindex-correct progress dots; OTP step uses otpinput component.",
    pairsWithLibraries: [],
    pairsWithStyles: ["saas", "fintech", "bank", "lms", "telehealth", "bizcard"],
    impliesBy: ["sign-up", "register", "onboarding", "create-account", "auth-login"],
  },

  magiclinksent: {
    id: "magiclinksent",
    name: "Magic-link sent (check inbox)",
    category: "auth",
    tier: 3,
    desc: "Confirmation screen: 'We sent a link to {email}' + envelope illustration + 'Open inbox' button (mailto) + resend (with 60s cooldown) + change-email link.",
    whenToUse: "Magic-link auth flows (Slack, Notion, Linear). Post-OTP-sent + post-signup-verification screens.",
    whenNotToUse: "Password-only auth flows. SMS OTP → show OTP input UI not 'check inbox'.",
    a11y: "Heading + body + actions in logical order; resend button announces remaining cooldown ('Resend available in 47 seconds'); after 60s, focus returns to resend button.",
    pairsWithLibraries: [],
    pairsWithStyles: ["saas", "devtool", "fintech", "telehealth", "creator"],
    impliesBy: ["auth", "magic-link", "verify-email", "passwordless", "auth-login", "confirmation-hero", "next-steps"],
  },

  profilemenu: {
    id: "profilemenu",
    name: "Profile menu (avatar dropdown)",
    category: "auth",
    tier: 3,
    desc: "Header avatar + name → dropdown with Profile, Settings, Theme toggle, Help, Sign out. Often org-switcher above for B2B.",
    whenToUse: "Any logged-in app. Top-right corner is the universal anchor.",
    whenNotToUse: "Mobile-app shells (use bottom nav Account tab). Single-user-no-org apps with minimal account UI.",
    a11y: "Trigger is real <button> with aria-haspopup + aria-expanded; menu uses menu a11y rules; Sign out is visually de-emphasized but easy to find (last item, possibly red text).",
    pairsWithLibraries: ["tippy", "alpine"],
    pairsWithStyles: ["saas", "admin", "crm", "hr", "darkboard", "devtool", "internal", "analytics", "cms", "chat"],
    impliesBy: ["header", "account", "auth", "profile", "topbar", "masthead"],
  },

  // ─── ADVANCED (5) ──────────────────────────────────────────────────────────
  sortablelist: {
    id: "sortablelist",
    name: "Drag-drop sortable list",
    category: "advanced",
    tier: 3,
    desc: "Vertical list of items with drag handles; reorder by dragging; live drop-position indicator; persists order.",
    whenToUse: "User-controlled ordering: playlists, todo lists, board columns, settings priorities, navigation menus.",
    whenNotToUse: "System-determined order (date, score, rank) → user shouldn't reorder. Items >100 → use a tree/table with explicit position field.",
    a11y: "Each item has a visible drag handle (real <button>) AND keyboard alternative: focus item + Up/Down arrows + Space to confirm move + Esc to cancel; live region announces 'Item moved from position 3 to position 5'.",
    pairsWithLibraries: ["sortable"],
    pairsWithStyles: ["admin", "crm", "hr", "cms", "internal", "creator", "music", "lms"],
    impliesBy: ["reorder", "list", "playlist", "settings", "priority", "menu", "line-items"],
  },

  resizablepanes: {
    id: "resizablepanes",
    name: "Resizable panes (split layout)",
    category: "advanced",
    tier: 3,
    desc: "Horizontal or vertical split with draggable divider; per-pane min/max width; persists size to localStorage.",
    variants: ["horizontal", "vertical", "nested"],
    whenToUse: "Productivity tools where users own their workspace: IDEs, email clients, terminal+output, chat+thread, docs+preview.",
    whenNotToUse: "Marketing / consumer sites (fixed layouts are fine). Mobile (single pane).",
    a11y: "Divider has role=separator + aria-orientation; keyboard accessible (focus + arrow keys to resize, Home/End for min/max); divider has aria-label naming the panes it separates.",
    pairsWithLibraries: [],
    pairsWithStyles: ["devtool", "docs", "cms", "darkboard", "admin", "internal", "chat", "legalsaas"],
    impliesBy: ["editor", "split", "panel", "workspace", "input-panel", "output-panel", "main-canvas"],
  },

  fab: {
    id: "fab",
    name: "Floating action button (FAB)",
    category: "advanced",
    tier: 3,
    desc: "Round button floating bottom-right (or bottom-center on mobile) anchoring the primary action; optional speed-dial expansion for 2-4 secondary actions.",
    variants: ["single-fab", "speed-dial", "extended-with-label"],
    whenToUse: "Mobile-first apps where one action dominates: Compose (mail/chat), Create (notes/Trello card), Add (CRM contact). Material Design heritage.",
    whenNotToUse: "Desktop-only apps (place in header/toolbar). When primary action varies per screen (use contextual buttons).",
    a11y: "Real <button> with descriptive aria-label ('Compose new message' — not just 'Add'); on speed-dial expand, sub-actions are also accessible buttons with aria-label; Esc collapses; respects safe-area on iOS notch.",
    pairsWithLibraries: [],
    pairsWithStyles: ["chat", "delivery", "rideshare", "music", "dating", "fitness", "creator", "blog"],
    impliesBy: ["mobile-app", "compose", "create", "add", "topbar", "actions"],
  },

  onboardingtour: {
    id: "onboardingtour",
    name: "Onboarding tour (spotlight chain)",
    category: "advanced",
    tier: 3,
    desc: "Series of tooltips chained across UI elements; each step highlights a target with a spotlight overlay; Next/Skip/Back; persistence in localStorage.",
    whenToUse: "Complex apps with non-obvious first-time UX. Bounded (3-7 steps). Skippable. Triggered once per user.",
    whenNotToUse: "Self-evident UI → don't add a tour. >7 steps → break into separate moments / contextual hints.",
    a11y: "Each tooltip is a modal dialog (focus trap, Esc skips entire tour); 'Skip tour' always visible + reachable; tour state persisted so users don't see it twice; respects prefers-reduced-motion (no spotlight pulse).",
    pairsWithLibraries: ["tippy"],
    pairsWithStyles: ["saas", "crm", "hr", "admin", "lms", "creator", "cms", "fintech", "analytics"],
    impliesBy: ["onboarding", "first-run", "tutorial", "help", "next-steps", "helper-text"],
  },

  themetoggle: {
    id: "themetoggle",
    name: "Theme toggle (light / dark / system)",
    category: "advanced",
    tier: 3,
    desc: "3-option control for color scheme: Light, Dark, System (follows OS). Often a segmented control in settings + small icon button in header.",
    whenToUse: "Apps where users spend long sessions (devtools, docs, dashboards, reading apps). Respects prefers-color-scheme by default.",
    whenNotToUse: "Brand-critical marketing sites (theme breaks identity). Apps without a tested dark mode.",
    a11y: "Implements as proper segmented control (role=radiogroup); current selection persisted to localStorage; updates <html> dataset/class synchronously to avoid flash; on 'System', listens to (prefers-color-scheme: dark) media query.",
    pairsWithLibraries: [],
    pairsWithStyles: ["devtool", "docs", "darkboard", "saas", "admin", "internal", "creator", "blog", "podcast"],
    impliesBy: ["settings", "header", "preferences", "accessibility", "topbar", "masthead"],
  },
};

// ─── Derived views ──────────────────────────────────────────────────────────

export const COMPONENT_IDS = Object.keys(UI_COMPONENTS);

export const COMPONENT_LIST = Object.values(UI_COMPONENTS);

export const COMPONENTS_BY_CATEGORY = (() => {
  const out = {};
  for (const c of COMPONENT_LIST) {
    (out[c.category] ||= []).push(c);
  }
  return out;
})();

export const COMPONENTS_BY_TIER = (() => {
  const out = { 1: [], 2: [], 3: [] };
  for (const c of COMPONENT_LIST) {
    if (out[c.tier]) out[c.tier].push(c);
  }
  return out;
})();

export function getComponent(id) {
  return UI_COMPONENTS[id] || null;
}

/**
 * Return components implied by the given page-section names / context keywords.
 * Used later by assemblePrompt to auto-include relevant component patterns.
 */
export function getComponentsForContext(contextKeywords = []) {
  if (!contextKeywords.length) return [];
  const wanted = new Set(contextKeywords.map((k) => k.toLowerCase()));
  return COMPONENT_LIST.filter((c) =>
    (c.impliesBy || []).some((k) => wanted.has(k.toLowerCase())),
  );
}

/**
 * Return components commonly seen with the given style id.
 */
export function getComponentsForStyle(styleId) {
  if (!styleId) return [];
  return COMPONENT_LIST.filter((c) => (c.pairsWithStyles || []).includes(styleId));
}

export function componentCount() {
  return COMPONENT_IDS.length;
}

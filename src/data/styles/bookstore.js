import { asFullPreset } from "./compact.js";

export const bookstore = asFullPreset({
  id: "bookstore",
  name: "Independent Bookstore",
  tag: "Staff-picks · serif · curated",
  desc: "Curated book grid + staff picks + events. Serif typography. McNally Jackson / Strand / Powell's / Tsutaya register.",

  feel: "Browsing McNally Jackson's online catalog at 10pm — staff-pick shelf, hand-written notes from booksellers, upcoming reading events — not a generic Amazon catalog dressed up as indie.",

  references: "mcnallyjackson.com, strandbooks.com, powells.com, citylights.com, shakespeareandcompany.com, tsutaya / 蔦屋書店 SG flagship, daunt-books.co.uk, foyles.co.uk",

  boldFactor: [
    "Curated book grid: cover + title + author + price + bookseller-note (1-line tag)",
    "Staff picks section as primary hero — not 'bestsellers'",
    "Each pick has a named bookseller + handwritten-style note about the book",
    "Event calendar: readings, signings, book clubs — author + date + venue",
    "Editorial sections: 'Recently arrived', 'On our radar', 'Books we'd recommend to…'",
    "Serif body for descriptions (Caslon, Sabon) — books deserve serif",
    "Warm paper palette: cream, ink, one accent (rusty red or forest)",
  ],

  tokens: {
    "bg":      { value: "#FBF6E8", usage: "Aged paper cream" },
    "bg-alt":  { value: "#F0E8D2", usage: "Section alt — wheat" },
    "fg":      { value: "#1F1610", usage: "Walnut ink body" },
    "muted":   { value: "#6B5F4D", usage: "Caption brown" },
    "accent":  { value: "#7A2E2A", usage: "Oxblood book-spine accent" },
    "forest":  { value: "#3D5A3F", usage: "Forest alt accent" },
    "rule":    { value: "#D9CFB8", usage: "Hairline rule" },
  },

  typography: {
    display: '"Sabon", "Caslon", "Source Serif 4", Georgia, serif',
    body:    '"Caslon", "Source Serif 4", "Sabon", Georgia, serif',
    script:  '"Caveat", "Kalam", "Permanent Marker", cursive',
    mono:    '"Courier Prime", "Special Elite", monospace',
    scale:   "12/14/16/18/22/28/40/56",
    weight:  "display 400-500 · body 400 · italic for book titles · script for bookseller notes",
    tracking: "display open (0.01em) · body normal · italic for book titles",
  },

  antiPatterns: [
    { name: "Amazon utility UI",  dont: "use Amazon-style yellow CTAs + spec tables", why: "Indie bookstore = curated voice, not utility commerce" },
    { name: "Sans body",          dont: "use Inter for book descriptions", why: "Books deserve serif body — long-form reading register" },
    { name: "Stock smiling reader photo", dont: "use Shutterstock 'person reading' imagery", why: "Show actual book covers + actual store interiors" },
    { name: "Algorithmic recs",   dont: "show 'Customers who bought this'", why: "Bookseller-curated voice ('Maria recommends') > algorithm" },
    { name: "Hidden events",      dont: "tuck events under a menu", why: "Indie bookstores live on events — primary nav element" },
  ],

  responsive: [
    { element: "Book grid",     mobile: "2",     tablet: "3-4",   desktop: "4-6" },
    { element: "Section padding", mobile: "24px", tablet: "48px",  desktop: "80px" },
    { element: "Display serif", mobile: "32px",  tablet: "44px",  desktop: "56px" },
  ],

  snippets: [
    `/* Book card with staff-pick note */
.book-card { display: flex; flex-direction: column; gap: 6px; }
.book-card .cover { aspect-ratio: 2/3; background: #E8DFC8; border: 1px solid #D9CFB8; box-shadow: 2px 4px 12px rgba(0,0,0,0.08); }
.book-card .title { font-family: "Sabon", "Caslon", serif; font-size: 15px; font-weight: 500; color: #1F1610; line-height: 1.25; }
.book-card .author { font-family: "Caslon", serif; font-style: italic; font-size: 13px; color: #6B5F4D; }
.book-card .price { font-family: "Caslon", serif; font-size: 14px; color: #1F1610; font-variant-numeric: tabular-nums; }
.book-card .note { font-family: "Caveat", "Kalam", cursive; font-size: 14px; color: #7A2E2A; line-height: 1.3; padding-top: 4px; border-top: 1px dashed #D9CFB8; }
.book-card .note::before { content: "— "; }`,
    `/* Staff-pick hero */
.staff-hero { padding: 80px 32px; background: #FBF6E8; border-top: 1px solid #D9CFB8; border-bottom: 1px solid #D9CFB8; }
.staff-hero .eyebrow { font-family: "Courier Prime", monospace; font-size: 11px; letter-spacing: 0.18em; color: #7A2E2A; text-transform: uppercase; }
.staff-hero h2 { font-family: "Sabon", serif; font-weight: 400; font-size: 56px; line-height: 1.05; color: #1F1610; margin: 12px 0 0; max-width: 18ch; }
.staff-hero h2 em { font-style: italic; color: #7A2E2A; }`,
    `/* Event row */
.event-row { display: grid; grid-template-columns: 64px 1fr auto; gap: 16px; padding: 16px 0; border-bottom: 1px solid #D9CFB8; align-items: center; }
.event-row .date { text-align: center; font-family: "Sabon", serif; }
.event-row .date .day { font-size: 28px; font-weight: 500; color: #7A2E2A; line-height: 1; font-variant-numeric: tabular-nums; }
.event-row .date .month { font-family: "Courier Prime", monospace; font-size: 11px; letter-spacing: 0.12em; color: #6B5F4D; text-transform: uppercase; }
.event-row .title { font-family: "Sabon", serif; font-size: 16px; color: #1F1610; }
.event-row .meta { font-style: italic; color: #6B5F4D; font-size: 13px; }`,
  ],

  successLooksLike: [
    "mcnallyjackson.com staff-pick shelf with handwritten notes",
    "strandbooks.com event calendar + curated tables",
    "Daunt Books travel-section landing",
  ],

  failureLooksLike: [
    "Amazon-utility UI with yellow CTAs applied to a bookstore",
    "Sans-only blog template for book descriptions",
    "Algorithmic 'customers also bought' recommendation rail",
  ],

  tile: "tile-bookstore",
  tileHTML: `
    <div class="brow">STAFF PICK · MAY</div>
    <div class="head"><em>The Bee Sting</em></div>
    <div class="auth">— Paul Murray</div>
    <div class="pr">$28.00</div>
    <div class="note">— Maria says: a 600-page Irish family epic that earned every page.</div>
  `,
});

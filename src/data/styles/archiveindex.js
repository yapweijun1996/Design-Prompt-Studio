import { asFullPreset } from "./compact.js";

export const archiveindex = asFullPreset({
  id: "archiveindex",
  name: "Archive Index",
  tag: "archive · index · cultural collection",
  desc: "An archival-index style for historical collections, oral histories, scanned documents, cultural repositories, and searchable catalogs.",
  sampleTemplate: "product",

  feel: "A digital reading room: accession numbers, facsimiles, dates, subjects, provenance, and quiet browsing tools for deep discovery.",

  references: "Library of Congress collections, Internet Archive item pages, Wellcome Collection, MoMA archive, British Library digital collections, Are.na channels",

  boldFactor: [
    "Accession metadata is as important as the artifact image",
    "Search, filters, date ranges, and subject tags drive discovery",
    "Use paper, microfilm, and catalog cues without fake nostalgia",
    "Scans, transcripts, rights, and related items are visible",
    "The layout supports slow browsing and precise lookup",
  ],

  tokens: {
    bg: { value: "#F1EDE3", usage: "Archive paper" },
    panel: { value: "#FFFCF4", usage: "Record cards" },
    fg: { value: "#24211B", usage: "Primary catalog text" },
    muted: { value: "#746F63", usage: "Metadata notes" },
    accent: { value: "#8B3A2B", usage: "Archive stamps / active filters" },
    index: { value: "#1E4D5F", usage: "Link and subject color" },
    rule: { value: "#D7D0C1", usage: "Catalog rules" },
  },

  typography: {
    display: '"Libre Baskerville", Georgia, serif',
    body: '"Inter", system-ui, sans-serif',
    mono: '"IBM Plex Mono", "Courier Prime", monospace',
    scale: "10/12/14/16/18/24/34/46",
    weight: "display 450-650 · body 400-520 · accession labels 600",
    tracking: "accession labels +0.12em, serif normal",
  },

  antiPatterns: [
    { name: "Fake vintage poster", dont: "make the whole interface distressed", why: "Archives need legibility and preservation trust" },
    { name: "Gallery-only browsing", dont: "show images without metadata", why: "Catalog context is the value" },
    { name: "Hidden rights", dont: "bury usage rights and source info", why: "Archives must expose provenance and permissions" },
    { name: "Modern card sameness", dont: "make every item a generic card", why: "Records need dates, identifiers, subjects, and relationships" },
  ],

  responsive: [
    { element: "Record grid", mobile: "single-column record cards", tablet: "two-column index", desktop: "artifact grid with metadata rail" },
    { element: "Filters", mobile: "drawer", tablet: "top filter row", desktop: "left catalog controls" },
    { element: "Item detail", mobile: "scan then metadata", tablet: "scan + details", desktop: "facsimile, transcript, and provenance columns" },
  ],

  snippets: [
    `.archive-page { background:#F1EDE3; color:#24211B; font-family:Inter,system-ui,sans-serif; }`,
    `.accession { font-family:'IBM Plex Mono',monospace; letter-spacing:.12em; color:#8B3A2B; text-transform:uppercase; }`,
    `.record-card { background:#FFFCF4; border:1px solid #D7D0C1; border-radius:2px; padding:16px; }`,
  ],

  successLooksLike: [
    "Users can browse artifacts and understand their provenance",
    "Search and filters feel archival, not ecommerce",
    "Scans, transcripts, rights, and related items are easy to inspect",
  ],

  failureLooksLike: [
    "A generic image gallery",
    "Vintage texture that hurts readability",
    "No accession numbers, dates, or rights information",
  ],

  tile: "tile-archiveindex",
  tileHTML: `
    <div style="height:150px;background:#F1EDE3;color:#24211B;display:flex;flex-direction:column;justify-content:space-between;padding:15px;font-family:Inter,system-ui,sans-serif">
      <div style="font:10px 'IBM Plex Mono',monospace;color:#8B3A2B;letter-spacing:.12em;text-transform:uppercase">acc. 1948.07</div>
      <div style="display:grid;grid-template-columns:54px 1fr;gap:12px;align-items:center"><span style="height:58px;background:repeating-linear-gradient(0deg,#FFFCF4,#FFFCF4 5px,#D7D0C1 6px);border:1px solid #D7D0C1"></span><b style="font-family:'Libre Baskerville',Georgia,serif;font-size:24px;line-height:1.02;font-weight:500">Archive<br/>index</b></div>
      <div style="border-top:1px solid #D7D0C1;padding-top:8px;font-size:11px;color:#746F63">subjects · transcript · rights</div>
    </div>
  `,
});

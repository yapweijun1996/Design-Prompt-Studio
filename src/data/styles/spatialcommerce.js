import { asFullPreset } from "./compact.js";

export const spatialcommerce = asFullPreset({
  id: "spatialcommerce",
  name: "Spatial Commerce",
  tag: "3D product · configurator · premium retail",
  desc: "A spatial product-shopping style with a large inspectable object, lightweight controls, material swatches, and purchase context.",

  feel: "Premium retail meets product configurator: the object is large, tactile, inspectable, and supported by restrained buying controls.",

  references: "Apple Vision Pro product pages, Polestar configurator, Nothing product pages, Teenage Engineering, Arc'teryx gear pages, IKEA Kreativ",

  boldFactor: [
    "The product object dominates the first viewport",
    "Material/color/size choices visibly change the product state",
    "Controls are minimal, floating, and close to the object",
    "Use realistic shadows, floor plane, and scale cues",
    "Buying information is present but never louder than product inspection",
  ],

  tokens: {
    bg: { value: "#F4F2EE", usage: "Warm showroom background" },
    fg: { value: "#151515", usage: "Primary text" },
    muted: { value: "#6F6A61", usage: "Product metadata" },
    accent: { value: "#0A84FF", usage: "Primary action / selected option" },
    panel: { value: "rgba(255,255,255,0.72)", usage: "Floating glass controls" },
    border: { value: "rgba(20,20,20,0.12)", usage: "Control borders" },
  },

  typography: {
    display: '"Inter Display", "SF Pro Display", system-ui',
    body: '"Inter", "SF Pro Text", system-ui',
    mono: '"SF Mono", "Geist Mono", monospace',
    scale: "12/14/16/18/24/36/56/72",
    weight: "display 600-720 · body 400-500",
    tracking: "display tight, body normal",
  },

  antiPatterns: [
    { name: "Tiny product", dont: "put the product inside a small card", why: "Spatial commerce requires inspection scale" },
    { name: "Flat e-commerce grid", dont: "default to product cards", why: "This style is about one inspectable object" },
    { name: "Controls far away", dont: "separate swatches from the product", why: "Configuration must feel immediate" },
    { name: "Fake 3D", dont: "use random abstract blobs instead of product geometry", why: "The object is the visual anchor" },
  ],

  responsive: [
    { element: "Product stage", mobile: "square stage with bottom controls", tablet: "large stage + side controls", desktop: "full-bleed stage with floating panels" },
    { element: "Swatches", mobile: "horizontal scroll", tablet: "floating row", desktop: "left floating vertical stack" },
    { element: "Purchase panel", mobile: "sticky bottom", tablet: "right panel", desktop: "floating right panel" },
  ],

  snippets: [
    `.product-stage { min-height:70vh; background:radial-gradient(circle at 50% 70%, rgba(0,0,0,.10), transparent 38%), #F4F2EE; }`,
    `.glass-control { background:rgba(255,255,255,.72); backdrop-filter:blur(18px); border:1px solid rgba(20,20,20,.12); border-radius:18px; }`,
    `.swatch[aria-checked="true"] { outline:2px solid #0A84FF; outline-offset:3px; }`,
  ],

  successLooksLike: [
    "The product feels inspectable and premium",
    "Changing options visibly changes the object or stage",
    "Commerce controls support the product instead of dominating it",
  ],

  failureLooksLike: [
    "A normal product grid with one big image",
    "Abstract 3D decoration unrelated to the item",
    "Buy buttons and badges overpower the product",
  ],

  tile: "tile-spatialcommerce",
  tileHTML: `
    <div style="height:150px;background:radial-gradient(circle at 50% 72%,rgba(0,0,0,.16),transparent 30%),#F4F2EE;color:#151515;display:flex;flex-direction:column;justify-content:space-between;padding:16px;font-family:Inter,system-ui,sans-serif">
      <div style="font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#6F6A61">spatial shop</div>
      <div style="align-self:center;width:82px;height:54px;border-radius:24px;background:linear-gradient(135deg,#fff,#D7D2CA);box-shadow:0 22px 34px rgba(0,0,0,.22)"></div>
      <div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:20px;letter-spacing:-.03em">Inspect<br/>before buy.</b><span style="background:#0A84FF;color:#fff;border-radius:999px;padding:7px 12px;font-size:11px;font-weight:700">View</span></div>
    </div>
  `,
});

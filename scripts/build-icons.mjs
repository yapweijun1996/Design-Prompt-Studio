// build-icons.mjs — generate PNG icons from the canonical SVG sources.
//
// Reads:
//   public/icons/icon.svg
//   public/icons/icon-maskable.svg
//
// Writes:
//   public/icons/icon-192.png       (regular, 192×192)
//   public/icons/icon-512.png       (regular, 512×512)
//   public/icons/icon-maskable-192.png  (maskable, 192×192)
//   public/icons/icon-maskable-512.png  (maskable, 512×512)
//   public/icons/apple-touch-icon.png   (180×180, for iOS Safari)
//   public/icons/favicon.png            (32×32, for old browsers / fallback)
//
// Run manually via `node scripts/build-icons.mjs` or as a prebuild step.

import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const TARGETS = [
  { src: "icon.svg",          out: "icon-192.png",           size: 192 },
  { src: "icon.svg",          out: "icon-512.png",           size: 512 },
  { src: "icon-maskable.svg", out: "icon-maskable-192.png",  size: 192 },
  { src: "icon-maskable.svg", out: "icon-maskable-512.png",  size: 512 },
  { src: "icon.svg",          out: "apple-touch-icon.png",   size: 180 },
  { src: "icon.svg",          out: "favicon.png",            size: 32  },
];

function rasterize(svgPath, outPath, size) {
  const svg = readFileSync(svgPath, "utf-8");
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: size },
    font: { loadSystemFonts: false }, // icons don't use text — skip font loading
    background: "#FFFFFF", // white fallback for any transparent SVG bg
  });
  const png = resvg.render().asPng();
  writeFileSync(outPath, png);
  return png.length;
}

console.log("Building PNG icons from SVG sources…\n");
let totalBytes = 0;
for (const t of TARGETS) {
  const srcPath = resolve(ROOT, "public/icons", t.src);
  const outPath = resolve(ROOT, "public/icons", t.out);
  const bytes = rasterize(srcPath, outPath, t.size);
  totalBytes += bytes;
  console.log(`  ✓ ${t.out.padEnd(28)} ${String(t.size).padStart(4)}px  ${(bytes / 1024).toFixed(1)} KB`);
}
console.log(`\nDone. ${TARGETS.length} icons, ${(totalBytes / 1024).toFixed(1)} KB total.`);

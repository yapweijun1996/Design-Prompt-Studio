import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { buildStyleSampleHTML, STATIC_STYLE_SAMPLE_IDS } from "../src/gallery/SamplePreview.js";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, "../public/style-samples");

await mkdir(outDir, { recursive: true });

for (const styleId of STATIC_STYLE_SAMPLE_IDS) {
  const html = buildStyleSampleHTML(styleId);
  await writeFile(resolve(outDir, `${styleId}.html`), html, "utf8");
  console.log(`✓ style-samples/${styleId}.html`);
}

console.log(`Done. ${STATIC_STYLE_SAMPLE_IDS.length} style sample HTML files.`);

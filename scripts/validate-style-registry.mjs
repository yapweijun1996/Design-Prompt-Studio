#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { STYLE_PRESETS, STYLE_IDS } from "../src/data/styles/index.js";
import { CATEGORY_IDS, STYLE_CATEGORY_MAP } from "../src/data/styles/categories.js";
import { validateStyleRegistry } from "../src/data/styles/schema.js";
import { STATIC_STYLE_SAMPLE_IDS, buildStyleSampleHTML } from "../src/gallery/SamplePreview.js";

const result = validateStyleRegistry({
  stylePresets: STYLE_PRESETS,
  styleIds: STYLE_IDS,
  categoryMap: STYLE_CATEGORY_MAP,
  categoryIds: CATEGORY_IDS,
  staticSampleIds: STATIC_STYLE_SAMPLE_IDS,
  fileExists: (styleId) => existsSync(`public/style-samples/${styleId}.html`),
  readStaticSampleHTML: (styleId) => {
    const path = `public/style-samples/${styleId}.html`;
    return existsSync(path) ? readFileSync(path, "utf8") : null;
  },
  buildStaticSampleHTML: buildStyleSampleHTML,
});

if (result.ok) {
  console.log(`✓ style registry schema valid (${result.summary.totalStyles} styles, ${result.summary.staticSamples} static samples)`);
  process.exit(0);
}

console.error(`✗ style registry schema invalid (${result.errors.length} issue${result.errors.length === 1 ? "" : "s"})`);
for (const error of result.errors) {
  const suffix = error.styleId ? ` [${error.styleId}]` : "";
  console.error(`- ${error.code}${suffix}: ${error.message}`);
}
process.exit(1);

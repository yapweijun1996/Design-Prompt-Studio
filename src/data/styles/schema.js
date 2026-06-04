const REQUIRED_STRINGS = ["id", "name", "tag", "desc", "feel"];
const REQUIRED_ARRAYS = ["boldFactor", "successLooksLike", "failureLooksLike"];
const MIN_ARRAY_LENGTHS = {
  boldFactor: 3,
  successLooksLike: 2,
  failureLooksLike: 2,
};
const MIN_ARRAY_ITEM_LENGTH = 12;
const SAMPLE_TEMPLATES = new Set(["product", "editorial", "brutal", "dashboard", "commerce", "spatial"]);

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function visibleTextLength(value) {
  return String(value || "").replace(/<[^>]*>/g, "").trim().length;
}

function tokenValue(raw) {
  return typeof raw === "object" && raw !== null ? raw.value : raw;
}

function fail(errors, code, message, meta = {}) {
  errors.push({ code, message, ...meta });
}

function validateSingleStyle(styleId, style, categoryMap, categoryIds, errors) {
  if (!isPlainObject(style)) {
    fail(errors, "style.invalid", `${styleId} is not an object`, { styleId });
    return;
  }

  for (const key of REQUIRED_STRINGS) {
    if (typeof style[key] !== "string" || style[key].trim().length === 0) {
      fail(errors, "style.required_string", `${styleId} is missing string field ${key}`, { styleId, field: key });
    }
  }

  if (style.id !== styleId) {
    fail(errors, "style.id_mismatch", `${styleId} has id ${style.id}`, { styleId, value: style.id });
  }

  if (visibleTextLength(style.desc) < 40) {
    fail(errors, "style.desc_thin", `${styleId} desc is too thin`, { styleId, field: "desc" });
  }

  if (visibleTextLength(style.feel) < 40) {
    fail(errors, "style.feel_thin", `${styleId} feel is too thin`, { styleId, field: "feel" });
  }

  for (const key of REQUIRED_ARRAYS) {
    if (!Array.isArray(style[key]) || style[key].length < MIN_ARRAY_LENGTHS[key]) {
      fail(errors, "style.required_array", `${styleId} needs at least ${MIN_ARRAY_LENGTHS[key]} ${key} items`, { styleId, field: key });
    } else {
      style[key].forEach((item, index) => {
        if (visibleTextLength(item) < MIN_ARRAY_ITEM_LENGTH) {
          fail(errors, "style.array_item_thin", `${styleId} ${key}[${index}] is too thin`, { styleId, field: key, index });
        }
      });
    }
  }

  if (!isPlainObject(style.tokens) || Object.keys(style.tokens).length < 4) {
    fail(errors, "style.tokens_missing", `${styleId} needs at least 4 design tokens`, { styleId });
  } else {
    for (const [key, raw] of Object.entries(style.tokens)) {
      const value = tokenValue(raw);
      if (typeof value !== "string" || value.trim().length === 0) {
        fail(errors, "style.token_invalid", `${styleId} token ${key} has no value`, { styleId, field: key });
      }
    }
  }

  if (!isPlainObject(style.typography) || Object.keys(style.typography).length < 3) {
    fail(errors, "style.typography_missing", `${styleId} needs typography display/body/mono guidance`, { styleId });
  } else {
    for (const key of ["display", "body"]) {
      if (typeof style.typography[key] !== "string" || style.typography[key].trim().length === 0) {
        fail(errors, "style.typography_invalid", `${styleId} typography.${key} is missing`, { styleId, field: key });
      }
    }
  }

  if (typeof style.tileHTML !== "string" || visibleTextLength(style.tileHTML) < 20) {
    fail(errors, "style.tile_html_thin", `${styleId} tileHTML is missing or too thin`, { styleId });
  }

  if (/<script[\s>]/i.test(style.tileHTML || "")) {
    fail(errors, "style.tile_html_script", `${styleId} tileHTML must stay script-free`, { styleId });
  }

  if (style.sampleTemplate && !SAMPLE_TEMPLATES.has(style.sampleTemplate)) {
    fail(errors, "style.sample_template_invalid", `${styleId} maps to unknown sampleTemplate ${style.sampleTemplate}`, { styleId, value: style.sampleTemplate });
  }

  const category = categoryMap[styleId];
  if (!category) {
    fail(errors, "style.category_missing", `${styleId} is missing from STYLE_CATEGORY_MAP`, { styleId });
  } else if (!categoryIds.includes(category)) {
    fail(errors, "style.category_invalid", `${styleId} maps to unknown category ${category}`, { styleId, category });
  }
}

export function validateStyleRegistry({
  stylePresets,
  styleIds,
  categoryMap,
  categoryIds,
  staticSampleIds = [],
  fileExists = null,
  readStaticSampleHTML = null,
  buildStaticSampleHTML = null,
} = {}) {
  const errors = [];

  if (!isPlainObject(stylePresets)) fail(errors, "registry.invalid", "STYLE_PRESETS must be an object");
  if (!Array.isArray(styleIds) || styleIds.length === 0) fail(errors, "registry.ids_invalid", "STYLE_IDS must be a non-empty array");
  if (!isPlainObject(categoryMap)) fail(errors, "category.map_invalid", "STYLE_CATEGORY_MAP must be an object");
  if (!Array.isArray(categoryIds) || categoryIds.length === 0) fail(errors, "category.ids_invalid", "CATEGORY_IDS must be a non-empty array");

  if (errors.length > 0) return { ok: false, errors, summary: {} };

  const presetKeys = Object.keys(stylePresets);
  if (new Set(styleIds).size !== styleIds.length) {
    fail(errors, "registry.duplicate_ids", "STYLE_IDS contains duplicate ids");
  }
  if (presetKeys.join(",") !== styleIds.join(",")) {
    fail(errors, "registry.ids_out_of_sync", "STYLE_IDS must match STYLE_PRESETS key order");
  }

  for (const styleId of styleIds) {
    validateSingleStyle(styleId, stylePresets[styleId], categoryMap, categoryIds, errors);
  }

  for (const styleId of Object.keys(categoryMap)) {
    if (!stylePresets[styleId]) {
      fail(errors, "category.unknown_style", `STYLE_CATEGORY_MAP contains unknown style ${styleId}`, { styleId });
    }
  }

  if (staticSampleIds.length > 0) {
    const expectedPrefix = styleIds.slice(0, staticSampleIds.length).join(",");
    if (staticSampleIds.join(",") !== expectedPrefix) {
      fail(errors, "samples.not_registry_leading", "Static sample ids must be registry-leading", { count: staticSampleIds.length });
    }

    for (const styleId of staticSampleIds) {
      if (!stylePresets[styleId]) {
        fail(errors, "samples.unknown_style", `Static sample id ${styleId} is not a style`, { styleId });
        continue;
      }
      if (fileExists && !fileExists(styleId)) {
        fail(errors, "samples.file_missing", `${styleId} static sample file is missing`, { styleId });
      }
      if (!stylePresets[styleId].sampleTemplate) {
        fail(errors, "samples.template_missing", `${styleId} static sample needs sampleTemplate metadata`, { styleId });
      }
      if (buildStaticSampleHTML) {
        const html = buildStaticSampleHTML(styleId);
        if (!html.includes("<!doctype html>") || !html.includes("<title>") || !html.includes("sample output")) {
          fail(errors, "samples.html_invalid", `${styleId} generated sample HTML is incomplete`, { styleId });
        }
        if (readStaticSampleHTML) {
          const fileHTML = readStaticSampleHTML(styleId);
          if (fileHTML !== null && fileHTML !== html) {
            fail(errors, "samples.file_stale", `${styleId} static sample file is stale; run npm run samples`, { styleId });
          }
        }
      }
    }
  }

  const summary = {
    totalStyles: styleIds.length,
    categories: categoryIds.length,
    staticSamples: staticSampleIds.length,
    categoryMappedStyles: Object.keys(categoryMap).length,
  };

  return { ok: errors.length === 0, errors, summary };
}

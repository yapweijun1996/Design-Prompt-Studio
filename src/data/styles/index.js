// Style registry — single import surface for all style presets.

import { monochrome } from "./monochrome.js";
import { brutalist } from "./brutalist.js";
import { editorial } from "./editorial.js";
import { y2k } from "./y2k.js";
import { glass } from "./glass.js";

// Compact-format additions (synthesized md via asFullPreset)
import { linear } from "./linear.js";
import { swiss } from "./swiss.js";
import { cyberpunk } from "./cyberpunk.js";
import { newspaper } from "./newspaper.js";
import { memphis } from "./memphis.js";

export const STYLE_PRESETS = {
  // Tier 1 — original 5 with hand-written ~250-line md
  monochrome,
  brutalist,
  editorial,
  y2k,
  glass,
  // Tier 2 — compact format with synthesized md
  linear,
  swiss,
  cyberpunk,
  newspaper,
  memphis,
};

export const STYLE_IDS = Object.keys(STYLE_PRESETS);
export const STYLE_LIST = Object.values(STYLE_PRESETS);

export function getStyle(id) {
  return STYLE_PRESETS[id] || null;
}

export function styleCount() {
  return STYLE_IDS.length;
}

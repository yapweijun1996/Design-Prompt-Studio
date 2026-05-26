// Style registry — single import surface for all style presets.

import { monochrome } from "./monochrome.js";
import { brutalist } from "./brutalist.js";
import { editorial } from "./editorial.js";
import { y2k } from "./y2k.js";
import { glass } from "./glass.js";

export const STYLE_PRESETS = {
  monochrome,
  brutalist,
  editorial,
  y2k,
  glass,
};

export const STYLE_IDS = Object.keys(STYLE_PRESETS);
export const STYLE_LIST = Object.values(STYLE_PRESETS);

export function getStyle(id) {
  return STYLE_PRESETS[id] || null;
}

export function styleCount() {
  return STYLE_IDS.length;
}

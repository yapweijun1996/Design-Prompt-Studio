// PromptTile — a single grid card in the gallery.
// Shows: tile preview (matches the style), name, style·pageType tag, tagline, quick-copy on hover.

import { el } from "../lib/dom.js";
import { copyText } from "../lib/clipboard.js";
import { STYLE_PRESETS } from "../data/styles/index.js";
import { PAGE_TYPES } from "../data/taxonomy.js";
import { assembleFromCard } from "../lib/assemblePrompt.js";

export function renderPromptTile({ card, isActive = false, onSelect, onQuickCopy }) {
  const style = STYLE_PRESETS[card.style];
  const pageType = PAGE_TYPES[card.pageType];

  const tile = el("article", {
    class: "tile" + (isActive ? " is-active" : "") + (card.tier === "curated" ? " is-curated" : ""),
    "data-id": card.id,
    tabindex: "0",
    role: "button",
    "aria-pressed": isActive ? "true" : "false",
    "aria-label": `${card.name} — ${style?.name || card.style} ${pageType?.name || card.pageType}`,
  });

  // Live preview region — uses the style's own .tile-X class + HTML snippet from v0.3
  const preview = el(
    "div",
    { class: "tile__preview tile__preview--" + (style?.tile || "tile-mono"), "aria-hidden": "true", html: style?.tileHTML || "" },
  );

  // Quick-copy floats on hover/focus
  const quickCopy = el(
    "button",
    {
      class: "tile__quick-copy",
      type: "button",
      title: "Copy this prompt now (skip selecting)",
      "aria-label": `Quick copy ${card.name}`,
      onClick: async (e) => {
        e.stopPropagation();
        const prompt = assembleFromCard(card);
        const ok = await copyText(prompt);
        onQuickCopy?.(card, ok);
        if (ok) {
          const orig = quickCopy.textContent;
          quickCopy.textContent = "✓";
          setTimeout(() => { quickCopy.textContent = orig; }, 1400);
        }
      },
    },
    "📋",
  );

  preview.appendChild(quickCopy);

  // Info row
  const info = el(
    "div",
    { class: "tile__info" },
    el("div", { class: "tile__name" }, card.name),
    el(
      "div",
      { class: "tile__meta" },
      style?.tag || style?.name || card.style,
      el("span", { class: "tile__dot" }, "·"),
      pageType?.name || card.pageType,
    ),
    el("div", { class: "tile__tagline" }, card.tagline || ""),
  );

  // Curated badge
  if (card.tier === "curated") {
    info.appendChild(el("span", { class: "tile__badge" }, "★ Curated"));
  }

  tile.append(preview, info);

  // Click selects (swap hero)
  tile.addEventListener("click", () => onSelect?.(card));
  tile.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect?.(card);
    }
  });

  return tile;
}

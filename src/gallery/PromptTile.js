// PromptTile — a single grid card in the gallery.
// Shows: tile preview (matches the style), name, style·pageType tag, tagline, quick-copy on hover.

import { el } from "../lib/dom.js";
import { copyText } from "../lib/clipboard.js";
import { STYLE_PRESETS } from "../data/styles/index.js";
import { PAGE_TYPES } from "../data/taxonomy.js";
import { assembleFromCard } from "../lib/assemblePrompt.js";
import { getStyleSampleURL } from "./SamplePreview.js";

export function renderPromptTile({ card, isActive = false, onSelect, onQuickCopy, layoutCount = null, onDrillIn = null, onPreviewSample = null }) {
  const style = STYLE_PRESETS[card.style];
  const pageType = PAGE_TYPES[card.pageType];
  const isStyleCatalogCard = layoutCount && card.tier !== "curated";

  const tile = el("article", {
    class: "tile" + (isActive ? " is-active" : "") + (card.tier === "curated" ? " is-curated" : ""),
    "data-id": card.id,
    tabindex: "0",
    role: "button",
    "aria-pressed": isActive ? "true" : "false",
    "aria-label": isStyleCatalogCard
      ? `${style?.name || card.style} — style preset`
      : `${card.name} — ${style?.name || card.style} ${pageType?.name || card.pageType}`,
  });

  // Live preview region — a card may carry its OWN preview (curated culture cards do,
  // so they show a culture-specific thumbnail instead of the generic base-style tile);
  // otherwise fall back to the style's tile + HTML snippet.
  const tileClass = card.tile || style?.tile || "tile-mono";
  const tileHTML = card.tileHTML || style?.tileHTML || "";
  const preview = el(
    "div",
    { class: "tile__preview tile__preview--" + tileClass, "aria-hidden": "true", html: tileHTML },
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
    el("div", { class: "tile__name" }, isStyleCatalogCard ? style?.name || card.style : card.name),
    el(
      "div",
      { class: "tile__meta" },
      isStyleCatalogCard ? "Style preset" : style?.tag || style?.name || card.style,
      el("span", { class: "tile__dot" }, "·"),
      isStyleCatalogCard ? style?.tag || card.style : pageType?.name || card.pageType,
    ),
    el("div", { class: "tile__tagline" }, isStyleCatalogCard ? style?.desc || card.tagline || "" : card.tagline || ""),
  );

  // Curated badge
  if (card.tier === "curated") {
    info.appendChild(el("span", { class: "tile__badge" }, "★ Curated"));
  }

  // Collapsed catalog view: advertise the drill-in — this style is available in
  // `layoutCount` page-type layouts; the pill expands to all of them.
  if (layoutCount && onDrillIn) {
    const sampleBtn = el(
      "button",
      {
        class: "tile__sample",
        type: "button",
        title: `Preview a generated sample output for ${style?.name || card.style}`,
        "aria-label": `Preview sample output for the ${style?.name || card.style} style`,
        onClick: (e) => { e.stopPropagation(); onPreviewSample?.(card); },
      },
      "Preview sample",
    );
    const openSampleLink = el(
      "a",
      {
        class: "tile__sample tile__sample--open",
        href: getStyleSampleURL(card.style),
        target: "_blank",
        rel: "noopener",
        title: `Open generated HTML sample for ${style?.name || card.style} in a new tab`,
        "aria-label": `Open generated HTML sample for the ${style?.name || card.style} style in a new tab`,
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.open(getStyleSampleURL(card.style), "_blank", "noopener");
        },
      },
      "Open HTML",
    );
    const layoutsBtn = el(
      "button",
      {
        class: "tile__layouts",
        type: "button",
        title: `See all ${layoutCount} page-type layouts in this style`,
        "aria-label": `See all ${layoutCount} layouts in the ${style?.name || card.style} style`,
        onClick: (e) => { e.stopPropagation(); onDrillIn(card.style); },
      },
      `Explore ${layoutCount} layouts`,
    );
    // Keep keyboard activation on the pill from also selecting the tile.
    sampleBtn.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") e.stopPropagation(); });
    openSampleLink.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") e.stopPropagation(); });
    layoutsBtn.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") e.stopPropagation(); });
    info.append(sampleBtn, openSampleLink, layoutsBtn);
  }

  tile.append(preview, info);

  // Click selects (swap hero)
  tile.addEventListener("click", () => onSelect?.(card));
  tile.addEventListener("keydown", (e) => {
    if (e.target !== tile) return; // nested buttons (quick-copy, layouts) handle their own keys
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect?.(card);
    }
  });

  return tile;
}

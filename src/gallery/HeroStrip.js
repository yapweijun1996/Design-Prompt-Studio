// HeroStrip — the top of the Gallery. Shows the currently-loaded prompt with a giant Copy CTA.
//
// Inputs:
//   card                 — a prompt-card from data/prompts/index.js
//   onTune(card)         — user wants to open Studio with this card's state
//   onRandom()           — user wants a different featured prompt
//
// State: copy-button "Copied!" feedback flash via class toggle.

import { el } from "../lib/dom.js";
import { copyText } from "../lib/clipboard.js";
import { assembleFromCard, promptStats } from "../lib/assemblePrompt.js";
import { STYLE_PRESETS } from "../data/styles/index.js";
import { PAGE_TYPES } from "../data/taxonomy.js";

export function renderHeroStrip({ card, onTune, onRandom, onCopy }) {
  const prompt = assembleFromCard(card);
  const stats = promptStats(prompt);
  const style = STYLE_PRESETS[card.style];
  const pageType = PAGE_TYPES[card.pageType];

  // Container
  const root = el("section", { class: "hero-strip", "aria-labelledby": "hero-strip-title" });

  // Eyebrow row — metadata
  const eyebrow = el(
    "div",
    { class: "hero-strip__eyebrow" },
    el("span", { class: "hero-strip__tier" }, card.tier === "curated" ? "★ Curated" : "Standard"),
    el("span", { class: "hero-strip__dot" }, "·"),
    el("span", null, style?.name || card.style),
    el("span", { class: "hero-strip__dot" }, "·"),
    el("span", null, pageType?.name || card.pageType),
  );

  // Title + tagline
  const titleBlock = el(
    "div",
    { class: "hero-strip__title-block" },
    el("h1", { id: "hero-strip-title", class: "hero-strip__title" }, card.name),
    el("p", { class: "hero-strip__tagline" }, card.tagline || ""),
  );

  // Action row (Tune / Random) — small buttons next to title
  const topActions = el(
    "div",
    { class: "hero-strip__top-actions" },
    el(
      "button",
      {
        class: "hero-strip__action-btn",
        type: "button",
        onClick: () => onTune?.(card),
        title: "Open in Studio with this prompt's state pre-loaded",
      },
      "Tune in Studio →",
    ),
    el(
      "button",
      {
        class: "hero-strip__action-btn hero-strip__action-btn--ghost",
        type: "button",
        onClick: () => onRandom?.(),
        title: "Show a different featured prompt",
        "aria-label": "Show a different prompt",
      },
      el("span", { "aria-hidden": "true" }, "⤽ "),
      "Random",
    ),
  );

  // Prompt preview (scrollable)
  const promptBox = el(
    "pre",
    { class: "hero-strip__prompt", tabindex: "0", "aria-label": "Prompt preview" },
    prompt,
  );

  // Primary actions — huge Copy button (the 5-second win)
  const copyBtn = el(
    "button",
    {
      class: "hero-strip__copy-btn",
      type: "button",
    },
    el("span", { class: "hero-strip__copy-icon", "aria-hidden": "true" }, "📋"),
    el("span", { class: "hero-strip__copy-label" }, "Copy prompt"),
  );

  copyBtn.addEventListener("click", async () => {
    const ok = await copyText(prompt);
    onCopy?.(card, ok);
    if (ok) {
      copyBtn.classList.add("is-copied");
      const label = copyBtn.querySelector(".hero-strip__copy-label");
      const prev = label.textContent;
      label.textContent = "Copied ✓";
      setTimeout(() => {
        copyBtn.classList.remove("is-copied");
        label.textContent = prev;
      }, 1800);
    } else {
      const label = copyBtn.querySelector(".hero-strip__copy-label");
      label.textContent = "Copy failed — select & ⌘C";
      setTimeout(() => { label.textContent = "Copy prompt"; }, 2200);
    }
  });

  const downloadBtn = el(
    "button",
    {
      class: "hero-strip__action-btn",
      type: "button",
      onClick: () => downloadPrompt(card, prompt),
    },
    "Download .md",
  );

  const openClaudeBtn = el(
    "a",
    {
      class: "hero-strip__action-btn",
      href: "https://claude.ai/new",
      target: "_blank",
      rel: "noopener",
    },
    "Open Claude →",
  );

  const actions = el(
    "div",
    { class: "hero-strip__actions" },
    copyBtn,
    downloadBtn,
    openClaudeBtn,
  );

  const statsRow = el(
    "div",
    { class: "hero-strip__stats" },
    el("span", null, `${stats.chars.toLocaleString()} chars`),
    el("span", { class: "hero-strip__dot" }, "·"),
    el("span", null, `~${stats.tokens.toLocaleString()} tokens`),
    el("span", { class: "hero-strip__dot" }, "·"),
    el("span", null, `${stats.lines} lines`),
  );

  // Compose
  root.append(eyebrow, titleBlock, topActions, promptBox, actions, statsRow);
  return root;
}

function downloadPrompt(card, prompt) {
  const blob = new Blob([prompt], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `dps-${card.id}-${Date.now()}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

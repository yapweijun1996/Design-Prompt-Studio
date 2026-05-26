// Step 5 — Review & copy
// Renders the full assembled prompt + Copy / Download / Open Claude / Save preset / Share URL.

import { el } from "../../lib/dom.js";
import { copyText } from "../../lib/clipboard.js";
import { assemblePrompt, promptStats } from "../../lib/assemblePrompt.js";
import { store } from "../../lib/store.js";

export function renderStep5({ state }) {
  const root = el("section", { class: "step step--review" });

  // Normalize sections set → array for assembly
  const carrier = {
    ...state,
    sections: state.sections instanceof Set ? Array.from(state.sections) : (state.sections || []),
  };

  let prompt;
  try {
    prompt = assemblePrompt(carrier);
  } catch (e) {
    prompt = "[assemble failed: " + (e?.message || e) + "]";
  }
  const stats = promptStats(prompt);

  root.append(sectionLabel("Your assembled prompt", `${stats.chars.toLocaleString()} chars · ~${stats.tokens.toLocaleString()} tokens · ${stats.lines} lines`));

  const promptBox = el(
    "pre",
    { class: "step__prompt", tabindex: "0", "aria-label": "Assembled prompt" },
    prompt,
  );
  root.appendChild(promptBox);

  // ─── Actions ─────────────────────────────────────────────────────────────
  const copyBtn = el(
    "button",
    { type: "button", class: "step__copy-btn" },
    el("span", { class: "step__copy-icon", "aria-hidden": "true" }, "📋"),
    el("span", { class: "step__copy-label" }, "Copy prompt"),
  );
  copyBtn.addEventListener("click", async () => {
    const ok = await copyText(prompt);
    const label = copyBtn.querySelector(".step__copy-label");
    if (ok) {
      copyBtn.classList.add("is-copied");
      label.textContent = "Copied ✓";
      setTimeout(() => { copyBtn.classList.remove("is-copied"); label.textContent = "Copy prompt"; }, 1800);
      // Telemetry
      const copies = store.get("copies", {});
      copies["studio-assembled"] = (copies["studio-assembled"] || 0) + 1;
      store.set("copies", copies);
    } else {
      label.textContent = "Copy failed — select & ⌘C";
      setTimeout(() => { label.textContent = "Copy prompt"; }, 2200);
    }
  });

  const downloadBtn = el(
    "button",
    {
      type: "button",
      class: "step__action-btn",
      onClick: () => downloadPrompt(state, prompt),
    },
    "Download .md",
  );

  const openClaudeBtn = el(
    "a",
    {
      class: "step__action-btn",
      href: "https://claude.ai/new",
      target: "_blank",
      rel: "noopener",
    },
    "Open Claude →",
  );

  const shareBtn = el(
    "button",
    {
      type: "button",
      class: "step__action-btn",
      onClick: async () => {
        const url = buildShareUrl(state);
        const ok = await copyText(url);
        shareBtn.textContent = ok ? "URL copied ✓" : "Share failed";
        setTimeout(() => { shareBtn.textContent = "Share URL"; }, 1800);
      },
    },
    "Share URL",
  );

  root.appendChild(
    el(
      "div",
      { class: "step__actions" },
      copyBtn,
      downloadBtn,
      openClaudeBtn,
      shareBtn,
    ),
  );

  return root;
}

function sectionLabel(title, hint) {
  return el(
    "div",
    { class: "step__section-label" },
    el("span", null, title),
    el("span", { class: "step__section-hint" }, hint),
  );
}

function downloadPrompt(state, prompt) {
  const blob = new Blob([prompt], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `dps-${state.style}-${state.pageType}-${Date.now()}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function buildShareUrl(state) {
  // Encode a minimal state subset into URL hash. Sets are flattened to arrays.
  const payload = {
    s: state.style,
    p: state.pageType,
    d: state.density,
    r: state.drama,
    m: state.motion,
    k: state.stack,
    o: state.outputMode,
    M: state.promptMode,
    se: state.sections instanceof Set ? Array.from(state.sections) : (state.sections || []),
    l: state.libraries instanceof Set ? Array.from(state.libraries) : (state.libraries || []),
    b: state.brief || {},
  };
  const json = JSON.stringify(payload);
  const b64 = btoa(unescape(encodeURIComponent(json)));
  const u = new URL(location.href);
  u.hash = `studio?s=${b64}`;
  return u.toString();
}

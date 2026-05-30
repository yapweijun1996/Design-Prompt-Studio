// Step 5 — Review & copy
// Renders the full assembled prompt + Copy / Download / Open Claude / Save preset / Share URL.

import { el } from "../../lib/dom.js";
import { copyText } from "../../lib/clipboard.js";
import { assemblePrompt, promptStats } from "../../lib/assemblePrompt.js";
import { scoreQuality, GATE_LABEL } from "../../lib/qualityScore.js";
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

  // Quality score + export gating (see docs/RESEARCH-REVIEW.md § 3a).
  const quality = scoreQuality(carrier);
  root.appendChild(renderQualityPanel(quality));

  root.append(sectionLabel("Your assembled prompt", `${stats.chars.toLocaleString()} chars · ~${stats.tokens.toLocaleString()} tokens · ${stats.lines} lines`));

  const promptBox = el(
    "pre",
    { class: "step__prompt", tabindex: "0", "aria-label": "Assembled prompt" },
    prompt,
  );
  root.appendChild(promptBox);

  // ─── Actions ─────────────────────────────────────────────────────────────
  // When the prompt is under-specified, copy is still allowed (free tool) but the
  // button visibly signals it: label becomes "Copy anyway" and turns danger-styled.
  const isBlocked = quality.gate === "block";
  const defaultLabel = isBlocked ? "Copy anyway" : "Copy prompt";
  const copyBtn = el(
    "button",
    { type: "button", class: "step__copy-btn" + (isBlocked ? " is-blocked" : "") },
    el("span", { class: "step__copy-icon", "aria-hidden": "true" }, "📋"),
    el("span", { class: "step__copy-label" }, defaultLabel),
  );
  copyBtn.addEventListener("click", async () => {
    const ok = await copyText(prompt);
    const label = copyBtn.querySelector(".step__copy-label");
    if (ok) {
      copyBtn.classList.add("is-copied");
      label.textContent = "Copied ✓";
      setTimeout(() => { copyBtn.classList.remove("is-copied"); label.textContent = defaultLabel; }, 1800);
      // Telemetry
      const copies = store.get("copies", {});
      copies["studio-assembled"] = (copies["studio-assembled"] || 0) + 1;
      store.set("copies", copies);
    } else {
      label.textContent = "Copy failed — select & ⌘C";
      setTimeout(() => { label.textContent = defaultLabel; }, 2200);
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

function renderQualityPanel(q) {
  const panel = el(
    "div",
    { class: `step__quality step__quality--${q.gate}`, role: "status", "aria-live": "polite" },
  );

  panel.appendChild(
    el(
      "div",
      { class: "step__quality-head" },
      el("span", { class: "step__quality-score" }, String(q.score)),
      el(
        "span",
        { class: "step__quality-meta" },
        el("span", { class: "step__quality-label" }, GATE_LABEL[q.gate]),
        el("span", { class: "step__quality-sub" }, `Prompt quality · ${q.score}/100`),
      ),
    ),
  );

  const list = el("ul", { class: "step__quality-list" });
  for (const d of q.dimensions) {
    const okFull = d.earned === d.weight;
    const partial = !okFull && d.earned > 0;
    const stateClass = okFull ? " is-ok" : partial ? " is-partial" : " is-miss";
    list.appendChild(
      el(
        "li",
        { class: "step__quality-item" + stateClass },
        el("span", { class: "step__quality-tick", "aria-hidden": "true" }, okFull ? "✓" : partial ? "◐" : "✗"),
        el("span", { class: "step__quality-name" }, d.label),
        el("span", { class: "step__quality-pts" }, `${d.earned}/${d.weight}`),
      ),
    );
  }
  panel.appendChild(list);

  if (q.fixes.length) {
    panel.appendChild(
      el(
        "details",
        { class: "step__quality-fixes" },
        el("summary", null, `Improve this prompt (${q.fixes.length})`),
        el("ul", null, ...q.fixes.map((f) => el("li", null, f))),
      ),
    );
  }

  return panel;
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

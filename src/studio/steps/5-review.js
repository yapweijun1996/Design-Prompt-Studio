// Step 5 — Review & copy
// Renders the full assembled prompt + Copy / Download / Open Claude / Save preset / Share URL.

import { el } from "../../lib/dom.js";
import { copyText } from "../../lib/clipboard.js";
import { assemblePrompt, promptStats } from "../../lib/assemblePrompt.js";
import { assembleDesignDoc } from "../../lib/assembleDesignDoc.js";
import { buildOpenInLinks } from "../../lib/providers.js";
import { renderQualityPanel } from "../qualityPanel.js";
import { store } from "../../lib/store.js";

export function renderStep5({ state, onStateChange }) {
  const root = el("section", { class: "step step--review" });

  // Normalize sections set → array for assembly
  const carrier = {
    ...state,
    sections: state.sections instanceof Set ? Array.from(state.sections) : (state.sections || []),
  };

  // Quality score + export gating (see docs/RESEARCH-REVIEW.md § 3a). Format-
  // AWARE: a brief drives the one-shot prompt, but a DESIGN.md is graded on system
  // completeness instead — so the panel is rebuilt whenever the format toggle flips.
  const qualityHost = el("div", { class: "step__quality-host" });
  root.appendChild(qualityHost);

  root.appendChild(buildFormatToggle());

  // Rebuildable output region — re-renders when the format toggle flips.
  const outputRegion = el("div", { class: "step__output-region" });
  root.appendChild(outputRegion);
  paint();

  root.appendChild(
    el(
      "p",
      { class: "model-tip" },
      "Best results with a frontier model — ",
      el("b", null, "Claude or a GPT-4-class model"),
      ". Smaller or older models may produce a more generic page.",
    ),
  );

  return root;

  // Recompute the quality score for the current format, then re-render the
  // quality panel + output region together so the gate matches what's shown.
  function paint() {
    carrier.outputFormat = state.outputFormat;
    const { node, quality } = renderQualityPanel(carrier);
    qualityHost.replaceChildren(node);
    renderOutput(quality);
  }

  // ─── Output (prompt OR DESIGN.md) ──────────────────────────────────────────
  function renderOutput(quality) {
    const isDesignDoc = state.outputFormat === "design-md";
    let prompt;
    try {
      prompt = isDesignDoc ? assembleDesignDoc(carrier) : assemblePrompt(carrier);
    } catch (e) {
      prompt = "[assemble failed: " + (e?.message || e) + "]";
    }
    const stats = promptStats(prompt);

    const label = isDesignDoc ? "Your DESIGN.md document" : "Your assembled prompt";
    const promptBox = el(
      "pre",
      { class: "step__prompt", tabindex: "0", "aria-label": isDesignDoc ? "DESIGN.md document" : "Assembled prompt" },
      prompt,
    );

    // When under-specified, copy is still allowed (free tool) but the button
    // visibly signals it: label becomes "Copy anyway" and turns danger-styled.
    const isBlocked = quality.gate === "block";
    const defaultLabel = isBlocked ? "Copy anyway" : (isDesignDoc ? "Copy DESIGN.md" : "Copy prompt");
    const copyBtn = el(
      "button",
      { type: "button", class: "step__copy-btn" + (isBlocked ? " is-blocked" : "") },
      el("span", { class: "step__copy-icon", "aria-hidden": "true" }, "📋"),
      el("span", { class: "step__copy-label" }, defaultLabel),
    );
    copyBtn.addEventListener("click", async () => {
      const ok = await copyText(prompt);
      const lbl = copyBtn.querySelector(".step__copy-label");
      if (ok) {
        copyBtn.classList.add("is-copied");
        lbl.textContent = "Copied ✓";
        setTimeout(() => { copyBtn.classList.remove("is-copied"); lbl.textContent = defaultLabel; }, 1800);
        const copies = store.get("copies", {});
        const key = isDesignDoc ? "studio-design-md" : "studio-assembled";
        copies[key] = (copies[key] || 0) + 1;
        store.set("copies", copies);
      } else {
        lbl.textContent = "Copy failed — select & ⌘C";
        setTimeout(() => { lbl.textContent = defaultLabel; }, 2200);
      }
    });

    const downloadBtn = el(
      "button",
      { type: "button", class: "step__action-btn", onClick: () => downloadPrompt(state, prompt) },
      isDesignDoc ? "Download DESIGN.md" : "Download .md",
    );

    const openIn = buildOpenInLinks(prompt, { btnClass: "step__action-btn" });

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

    outputRegion.replaceChildren(
      sectionLabel(label, `${stats.chars.toLocaleString()} chars · ~${stats.tokens.toLocaleString()} tokens · ${stats.lines} lines`),
      promptBox,
      el("div", { class: "step__actions" }, copyBtn, downloadBtn, openIn, shareBtn),
    );
  }

  function buildFormatToggle() {
    const opts = [
      { id: "prompt", label: "Screen prompt", hint: "One-shot: build this page now" },
      { id: "design-md", label: "DESIGN.md", hint: "Reusable design-system document" },
    ];
    const current = state.outputFormat === "design-md" ? "design-md" : "prompt";
    const group = el("div", { class: "step__format-toggle", role: "radiogroup", "aria-label": "Output format" });
    for (const o of opts) {
      const active = o.id === current;
      group.appendChild(
        el(
          "button",
          {
            type: "button",
            class: "step__format-btn" + (active ? " is-active" : ""),
            role: "radio",
            "aria-checked": active ? "true" : "false",
            title: o.hint,
            onClick: () => {
              if (state.outputFormat === o.id) return;
              state.outputFormat = o.id;
              // Persist via the wizard's state-change channel without forcing a
              // full step rebuild — we re-render only the output region here.
              if (typeof onStateChange === "function") onStateChange({ repaint: false });
              group.querySelectorAll(".step__format-btn").forEach((b) => {
                const on = b.textContent === o.label;
                b.classList.toggle("is-active", on);
                b.setAttribute("aria-checked", on ? "true" : "false");
              });
              paint();
            },
          },
          o.label,
        ),
      );
    }
    return group;
  }
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
  a.download = state.outputFormat === "design-md"
    ? "DESIGN.md"
    : `dps-${state.style}-${state.pageType}-${Date.now()}.md`;
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
    lo: state.locale,
    mk: state.market,
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

// Shared prompt-quality panel — used by both the Studio wizard (Step 5) and Express
// mode, so the score + gating is consistent across every copy path.
//
// Pure render: takes a Studio `state`, returns a DOM node. The caller decides where
// to mount it and whether to re-render on change (Express re-renders live).

import { el } from "../lib/dom.js";
import { scoreQuality, GATE_LABEL } from "../lib/qualityScore.js";

/**
 * Render the quality panel for a given state.
 * @param {object} state — Studio state (style/pageType/sections/stack/brief…)
 * @returns {{ node: HTMLElement, quality: object }} the panel node + the score result
 *          (callers use `quality.gate` to style their own Copy button).
 */
export function renderQualityPanel(state) {
  const quality = scoreQuality(state);

  const panel = el(
    "div",
    { class: `step__quality step__quality--${quality.gate}`, role: "status", "aria-live": "polite" },
  );

  panel.appendChild(
    el(
      "div",
      { class: "step__quality-head" },
      el("span", { class: "step__quality-score" }, String(quality.score)),
      el(
        "span",
        { class: "step__quality-meta" },
        el("span", { class: "step__quality-label" }, GATE_LABEL[quality.gate]),
        el("span", { class: "step__quality-sub" }, `Prompt quality · ${quality.score}/100`),
      ),
    ),
  );

  const list = el("ul", { class: "step__quality-list" });
  for (const d of quality.dimensions) {
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

  if (quality.fixes.length) {
    panel.appendChild(
      el(
        "details",
        { class: "step__quality-fixes" },
        el("summary", null, `Improve this prompt (${quality.fixes.length})`),
        el("ul", null, ...quality.fixes.map((f) => el("li", null, f))),
      ),
    );
  }

  return { node: panel, quality };
}

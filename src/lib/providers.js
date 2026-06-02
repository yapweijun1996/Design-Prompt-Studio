// Where to take an assembled prompt. The prompts are large (often ~15k chars /
// ~5k tokens) — far too big for a URL query param — so every provider link
// COPIES the prompt to the clipboard and opens that provider's new-chat page in
// a new tab; the user then pastes (⌘V / Ctrl-V). Same flow for all providers.

import { el } from "./dom.js";
import { copyText } from "./clipboard.js";

export const PROVIDERS = [
  { id: "claude",   name: "Claude",           url: "https://claude.ai/new" },
  { id: "chatgpt",  name: "ChatGPT",          url: "https://chatgpt.com/new" },
  { id: "aistudio", name: "Google AI Studio", url: "https://aistudio.google.com/prompts/new_chat" },
];

/**
 * Build a labelled cluster of "open in <provider>" links. Clicking a link copies
 * the prompt and opens the provider in a new tab in a single gesture.
 *
 * Why this is robust (and not popup-blocked): the links are real `<a target=_blank>`
 * elements, so the browser performs the navigation natively — we do NOT call
 * `window.open` and we do NOT `preventDefault`. The copy runs fire-and-forget
 * (no `await`) and resolves in the CURRENT tab, which survives because the new
 * page opens in a separate tab. The explicit Copy button stays as the reliable
 * fallback if a focus-steal ever drops the clipboard write (e.g. Safari).
 *
 * @param {string} prompt   - the assembled prompt to copy on open
 * @param {object} [opts]
 * @param {string} [opts.btnClass] - CSS class so the links match the surrounding action row
 * @returns {HTMLElement} a container <span> holding the label + provider links
 */
export function buildOpenInLinks(prompt, { btnClass = "step__action-btn" } = {}) {
  const group = el("span", { class: "open-in" });
  group.appendChild(el("span", { class: "open-in__label", "aria-hidden": "true" }, "Open in"));

  for (const p of PROVIDERS) {
    const link = el(
      "a",
      {
        class: `${btnClass} open-in__link`,
        href: p.url,
        target: "_blank",
        rel: "noopener",
        title: `Copy the prompt and open ${p.name} in a new tab`,
        "aria-label": `Copy the prompt and open ${p.name} in a new tab`,
      },
      p.name,
    );
    link.addEventListener("click", () => {
      // Fire-and-forget — see the note above. No await, no preventDefault.
      copyText(prompt).then((ok) => flashLink(link, p.name, ok));
    });
    group.appendChild(link);
  }

  return group;
}

// Brief in-place feedback so the user knows the clipboard is already loaded.
function flashLink(link, name, ok) {
  link.textContent = ok ? "Copied ✓" : "⌘C to copy";
  link.classList.add("is-flash");
  setTimeout(() => {
    link.textContent = name;
    link.classList.remove("is-flash");
  }, 1500);
}

import { el } from "../lib/dom.js";
import { STYLE_PRESETS } from "../data/styles/index.js";

const sampleUrlCache = new Map();
const APP_BASE_URL = import.meta.env?.BASE_URL || "/";

export const STATIC_STYLE_SAMPLE_IDS = [
  "securityreview",
  "fielddispatch",
  "boardmemo",
  "archiveindex",
  "kitchendisplay",
  "citationlab",
  "treasurydesk",
  "civicservice",
  "auctioncatalog",
  "climateatlas",
  "aiopscommand",
  "agenticworkflow",
  "spatialcommerce",
  "sovereigncloud",
  "ambientwellness",
  "vercel",
  "stripe",
  "apple",
  "notion",
  "aesop",
  "bento",
  "monzo",
  "editoriallux",
  "claymorphism",
  "devdark",
  "luxe",
  "warmtech",
  "aurora",
  "spatial",
  "playful",
  "trust",
  "monochrome",
  "brutalist",
  "editorial",
  "y2k",
];

function tokenValue(style, key, fallback) {
  const raw = style?.tokens?.[key];
  if (!raw) return fallback;
  return typeof raw === "object" ? raw.value || fallback : raw;
}

function cssFont(value, fallback) {
  return value || fallback;
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function buildStyleSampleHTML(styleId) {
  const style = STYLE_PRESETS[styleId];
  if (!style) return "";

  const bg = tokenValue(style, "bg", "#F8F7F3");
  const panel = tokenValue(style, "panel", "#FFFFFF");
  const fg = tokenValue(style, "fg", "#171717");
  const muted = tokenValue(style, "muted", "#666666");
  const accent = tokenValue(style, "accent", "#6E62F6");
  const border = tokenValue(style, "border", tokenValue(style, "rule", "rgba(0,0,0,.14)"));
  const warning = tokenValue(style, "warning", tokenValue(style, "signal", accent));
  const display = cssFont(style.typography?.display, "Inter, system-ui, sans-serif");
  const body = cssFont(style.typography?.body, "Inter, system-ui, sans-serif");
  const mono = cssFont(style.typography?.mono, "ui-monospace, SFMono-Regular, Menlo, monospace");
  const proof = style.boldFactor?.slice(0, 3) || [];
  const success = style.successLooksLike?.slice(0, 3) || [];

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      background:
        radial-gradient(620px 280px at 78% 0%, color-mix(in srgb, ${accent} 24%, transparent), transparent 72%),
        ${bg};
      color: ${fg};
      font-family: ${body};
    }
    .page { min-height: 100vh; padding: 28px; }
    .shell { max-width: 1120px; margin: 0 auto; }
    .nav {
      display: flex; justify-content: space-between; align-items: center;
      border-bottom: 1px solid ${border}; padding-bottom: 18px;
      font: 700 12px/1 ${mono}; letter-spacing: .1em; text-transform: uppercase;
    }
    .nav span:last-child { color: ${muted}; }
    .hero {
      display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(280px, .85fr);
      gap: 28px; align-items: stretch; padding: 54px 0 34px;
    }
    h1 {
      font-family: ${display}; font-size: clamp(48px, 8vw, 94px);
      line-height: .92; letter-spacing: -.045em; margin: 0 0 18px;
    }
    .lead { max-width: 62ch; color: ${muted}; font-size: 18px; line-height: 1.6; margin: 0 0 24px; }
    .actions { display: flex; gap: 12px; flex-wrap: wrap; }
    .btn {
      border: 1px solid ${accent}; background: ${accent}; color: ${bg};
      min-height: 46px; padding: 0 18px; border-radius: 12px;
      font-weight: 750; display: inline-flex; align-items: center;
    }
    .btn.secondary { background: transparent; color: ${fg}; border-color: ${border}; }
    .artifact {
      background: color-mix(in srgb, ${panel} 88%, transparent);
      border: 1px solid ${border}; border-radius: 18px; padding: 18px;
      min-height: 340px; box-shadow: 0 30px 80px rgba(0,0,0,.13);
      display: grid; gap: 12px;
    }
    .artifact-head { display:flex; justify-content:space-between; color:${muted}; font: 650 11px/1 ${mono}; letter-spacing:.08em; text-transform:uppercase; }
    .metric { display:grid; grid-template-columns: 1fr auto; gap:12px; align-items:center; border:1px solid ${border}; border-radius:14px; padding:14px; background:${panel}; }
    .metric b { font-family:${display}; font-size: 28px; line-height:1; letter-spacing:-.03em; }
    .bar { height: 9px; border-radius: 999px; background: color-mix(in srgb, ${accent} 22%, ${border}); overflow:hidden; }
    .bar i { display:block; height:100%; width:72%; border-radius:inherit; background:${accent}; }
    .grid { display:grid; grid-template-columns: repeat(3, 1fr); gap:14px; padding-top: 8px; }
    .card { border:1px solid ${border}; background:${panel}; border-radius:16px; padding:18px; min-height:136px; }
    .eyebrow { color:${accent}; font: 750 11px/1 ${mono}; letter-spacing:.1em; text-transform:uppercase; margin-bottom:12px; }
    .card p { margin:0; color:${muted}; line-height:1.45; font-size:14px; }
    .footer { display:flex; justify-content:space-between; gap:16px; color:${muted}; border-top:1px solid ${border}; margin-top:28px; padding-top:16px; font-size:13px; }
    @media (max-width: 760px) {
      .page { padding: 18px; }
      .hero { grid-template-columns: 1fr; padding-top: 34px; }
      .grid { grid-template-columns: 1fr; }
      .footer { flex-direction: column; }
    }
  </style>
</head>
<body>
  <main class="page">
    <div class="shell">
      <header class="nav"><span>${esc(style.name)}</span><span>sample output</span></header>
      <section class="hero">
        <div>
          <div class="eyebrow">${esc(style.tag || "style preset")}</div>
          <h1>${esc(style.name)} in motion.</h1>
          <p class="lead">${esc(style.desc || style.feel || "A production-ready sample page for this visual style.")}</p>
          <div class="actions">
            <span class="btn">Primary action</span>
            <span class="btn secondary">View details</span>
          </div>
        </div>
        <aside class="artifact">
          <div class="artifact-head"><span>Live surface</span><span>${esc(style.id)}</span></div>
          <div class="metric"><b>${esc(sampleMetric(style.id))}</b><span style="color:${warning};font-weight:800">active</span></div>
          <div class="bar"><i></i></div>
          <div class="metric"><span>${esc(proof[0] || "Evidence-led layout and visible hierarchy")}</span><span>01</span></div>
          <div class="metric"><span>${esc(proof[1] || "Responsive controls and clear state")}</span><span>02</span></div>
        </aside>
      </section>
      <section class="grid">
        ${(success.length ? success : proof).slice(0, 3).map((item, i) => `
          <article class="card">
            <div class="eyebrow">Principle ${i + 1}</div>
            <p>${esc(item)}</p>
          </article>
        `).join("")}
      </section>
      <footer class="footer">
        <span>Generated sample preview from the style preset tokens and rules.</span>
        <span>${esc(style.references || "Style reference set")}</span>
      </footer>
    </div>
  </main>
</body>
</html>`;
}

export function getStyleSampleURL(styleId) {
  if (STATIC_STYLE_SAMPLE_IDS.includes(styleId)) {
    return `${APP_BASE_URL}style-samples/${styleId}.html`;
  }
  if (!sampleUrlCache.has(styleId)) {
    const html = buildStyleSampleHTML(styleId);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    sampleUrlCache.set(styleId, URL.createObjectURL(blob));
  }
  return sampleUrlCache.get(styleId);
}

function sampleMetric(styleId) {
  if (styleId.includes("security")) return "98%";
  if (styleId.includes("dispatch")) return "14 jobs";
  if (styleId.includes("treasury")) return "$2.84M";
  if (styleId.includes("kitchen")) return "08:42";
  if (styleId.includes("climate")) return "2050";
  if (styleId.includes("archive")) return "1948";
  return "Ready";
}

export function renderStyleSampleModal({ card, onClose }) {
  const style = STYLE_PRESETS[card.style];
  const sampleUrl = getStyleSampleURL(card.style);
  const titleId = `sample-preview-${card.style}`;
  const close = () => onClose?.();
  const modal = el(
    "div",
    {
      class: "sample-modal",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": titleId,
      onClick: (e) => {
        if (e.target === modal) close();
      },
    },
    el(
      "div",
      { class: "sample-modal__panel" },
      el(
        "div",
        { class: "sample-modal__header" },
        el(
          "div",
          null,
          el("p", { class: "sample-modal__eyebrow" }, "Sample output preview"),
          el("h2", { id: titleId, class: "sample-modal__title" }, style?.name || card.style),
        ),
        el(
          "div",
          { class: "sample-modal__actions" },
          el(
            "a",
            {
              class: "sample-modal__open",
              href: sampleUrl,
              target: "_blank",
              rel: "noopener",
              onClick: (e) => {
                e.preventDefault();
                window.open(sampleUrl, "_blank", "noopener");
              },
            },
            "Open in new tab",
          ),
          el("button", { type: "button", class: "sample-modal__close", "aria-label": "Close sample preview", onClick: close }, "✕"),
        ),
      ),
      el("iframe", {
        class: "sample-modal__frame",
        title: `${style?.name || card.style} sample output`,
        sandbox: "",
        srcdoc: buildStyleSampleHTML(card.style),
      }),
    ),
  );

  modal.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  window.requestAnimationFrame(() => {
    modal.querySelector(".sample-modal__close")?.focus();
  });

  return modal;
}

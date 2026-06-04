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

  const ctx = sampleContext(style);
  const template = sampleTemplate(style);
  const body = renderSampleBody(template, ctx);
  return sampleDocument(ctx, template, body);
}

function sampleContext(style) {
  const bg = tokenValue(style, "bg", "#F8F7F3");
  const panel = tokenValue(style, "panel", "#FFFFFF");
  const fg = tokenValue(style, "fg", "#171717");
  const muted = tokenValue(style, "muted", "#666666");
  const accent = tokenValue(style, "accent", "#6E62F6");
  const gradient = tokenValue(style, "gradient", `linear-gradient(135deg, ${accent}, ${muted})`);
  const border = tokenValue(style, "border", tokenValue(style, "rule", "rgba(0,0,0,.14)"));
  const warning = tokenValue(style, "warning", tokenValue(style, "signal", accent));
  const display = cssFont(style.typography?.display, "Inter, system-ui, sans-serif");
  const body = cssFont(style.typography?.body, "Inter, system-ui, sans-serif");
  const mono = cssFont(style.typography?.mono, "ui-monospace, SFMono-Regular, Menlo, monospace");
  const proof = style.boldFactor?.slice(0, 3) || [];
  const principles = (style.successLooksLike?.length ? style.successLooksLike : proof).slice(0, 3);

  return { style, bg, panel, fg, muted, accent, gradient, border, warning, display, body, mono, proof, principles };
}

function sampleTemplate(style) {
  if (style.sampleTemplate) return style.sampleTemplate;
  return "product";
}

function renderSampleBody(template, ctx) {
  if (template === "editorial") return renderEditorialSample(ctx);
  if (template === "brutal") return renderBrutalSample(ctx);
  if (template === "dashboard") return renderDashboardSample(ctx);
  if (template === "commerce") return renderCommerceSample(ctx);
  if (template === "spatial") return renderSpatialSample(ctx);
  return renderProductSample(ctx);
}

function sampleDocument(ctx, template, content) {
  const { style, bg, panel, fg, muted, accent, border, display, body, mono } = ctx;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(style.name)} sample output</title>
  <meta name="description" content="${esc(style.name)} generated website style sample." />
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
    .nav { display: flex; justify-content: space-between; align-items: center; gap: 18px; border-bottom: 1px solid ${border}; padding-bottom: 18px; font: 700 12px/1 ${mono}; letter-spacing: .1em; text-transform: uppercase; }
    .nav span:last-child { color: ${muted}; }
    h1 { font-family: ${display}; font-size: clamp(46px, 8vw, 96px); line-height: .92; letter-spacing: -.045em; margin: 0; }
    h2 { font-family: ${display}; font-size: clamp(28px, 4vw, 52px); line-height: 1; letter-spacing: -.035em; margin: 0; }
    .lead { max-width: 62ch; color: ${muted}; font-size: 18px; line-height: 1.6; margin: 0 0 24px; }
    .actions { display: flex; gap: 12px; flex-wrap: wrap; }
    .btn { border: 1px solid ${accent}; background: ${accent}; color: ${bg}; min-height: 46px; padding: 0 18px; border-radius: 12px; font-weight: 750; display: inline-flex; align-items: center; text-decoration: none; }
    .btn.secondary { background: transparent; color: ${fg}; border-color: ${border}; }
    .eyebrow { color:${accent}; font: 750 11px/1 ${mono}; letter-spacing:.1em; text-transform:uppercase; }
    .card { border:1px solid ${border}; background:${panel}; border-radius:16px; padding:18px; min-height:136px; }
    .card p { margin:0; color:${muted}; line-height:1.45; font-size:14px; }
    .metric { display:grid; grid-template-columns: 1fr auto; gap:12px; align-items:center; border:1px solid ${border}; border-radius:14px; padding:14px; background:${panel}; }
    .metric b { font-family:${display}; font-size: 28px; line-height:1; letter-spacing:-.03em; }
    .bar { height: 9px; border-radius: 999px; background: color-mix(in srgb, ${accent} 22%, ${border}); overflow:hidden; }
    .bar i { display:block; height:100%; width:72%; border-radius:inherit; background:${accent}; }
    .footer { display:flex; justify-content:space-between; gap:16px; color:${muted}; border-top:1px solid ${border}; margin-top:28px; padding-top:16px; font-size:13px; }
    .sample-product .hero { display:grid; grid-template-columns:minmax(0,1.15fr) minmax(280px,.85fr); gap:28px; align-items:stretch; padding:54px 0 34px; }
    .sample-product .artifact { background:color-mix(in srgb, ${panel} 88%, transparent); border:1px solid ${border}; border-radius:18px; padding:18px; min-height:340px; box-shadow:0 30px 80px rgba(0,0,0,.13); display:grid; gap:12px; }
    .sample-product .artifact-head { display:flex; justify-content:space-between; color:${muted}; font:650 11px/1 ${mono}; letter-spacing:.08em; text-transform:uppercase; }
    .sample-product .grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; padding-top:8px; }
    .sample-editorial .masthead { padding:34px 0 24px; display:grid; grid-template-columns:1.1fr .9fr; gap:30px; border-bottom:1px solid ${border}; }
    .sample-editorial h1 { font-size:clamp(62px,12vw,168px); letter-spacing:-.07em; text-transform:uppercase; }
    .sample-editorial .issue { display:grid; gap:16px; align-content:start; border-left:1px solid ${border}; padding-left:22px; }
    .sample-editorial .spread { display:grid; grid-template-columns:1.4fr .8fr .8fr; gap:18px; padding-top:28px; }
    .sample-editorial .drop::first-letter { float:left; font-family:${display}; font-size:4.7em; line-height:.82; padding-right:.08em; color:${accent}; }
    .sample-dashboard .workspace { display:grid; grid-template-columns:230px 1fr; gap:18px; padding-top:28px; }
    .sample-dashboard .sidebar { border:1px solid ${border}; border-radius:18px; padding:18px; background:${panel}; display:grid; gap:12px; align-content:start; }
    .sample-dashboard .main { display:grid; gap:16px; }
    .sample-dashboard .kpis { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
    .sample-dashboard .command { min-height:280px; border:1px solid ${border}; border-radius:18px; background:color-mix(in srgb, ${panel} 88%, ${bg}); padding:20px; display:grid; gap:14px; }
    .sample-commerce .showroom { display:grid; grid-template-columns:minmax(300px,.9fr) 1fr; gap:28px; padding-top:36px; align-items:stretch; }
    .sample-commerce .object { min-height:480px; border:1px solid ${border}; border-radius:30px; background:${ctx.gradient}; display:grid; place-items:center; color:${bg}; font-family:${display}; font-size:clamp(42px,8vw,98px); line-height:.86; letter-spacing:-.06em; padding:30px; }
    .sample-commerce .specs { display:grid; gap:14px; align-content:center; }
    .sample-brutal .poster { padding:34px 0; display:grid; grid-template-columns:1fr .65fr; gap:18px; }
    .sample-brutal h1 { font-size:clamp(54px,11vw,140px); text-transform:uppercase; }
    .sample-brutal .block { border:3px solid ${border}; background:${panel}; box-shadow:8px 8px 0 ${border}; padding:20px; transform:rotate(-1deg); }
    .sample-brutal .block:nth-child(2n) { transform:rotate(1.5deg); background:${accent}; color:${bg}; }
    .sample-spatial .space { min-height:620px; display:grid; place-items:center; padding-top:28px; }
    .sample-spatial .glass-shell { width:min(980px,100%); display:grid; grid-template-columns:1fr .8fr; gap:18px; border:1px solid ${border}; border-radius:32px; padding:24px; background:color-mix(in srgb, ${panel} 62%, transparent); backdrop-filter:blur(22px) saturate(160%); box-shadow:0 30px 90px rgba(0,0,0,.12); }
    .sample-spatial .floating { border:1px solid ${border}; border-radius:24px; padding:18px; background:color-mix(in srgb, ${panel} 76%, transparent); }
    @media (max-width: 760px) {
      .page { padding: 18px; }
      .sample-product .hero, .sample-editorial .masthead, .sample-editorial .spread, .sample-dashboard .workspace, .sample-dashboard .kpis, .sample-commerce .showroom, .sample-brutal .poster, .sample-spatial .glass-shell { grid-template-columns: 1fr; }
      .footer { flex-direction: column; }
    }
  </style>
</head>
<body>
  <main class="page sample-${template}">
    <div class="shell">
      <header class="nav"><span>${esc(style.name)}</span><span>sample output</span></header>
      ${content}
      <footer class="footer">
        <span>Generated sample preview from the style preset tokens and rules.</span>
        <span>${esc(style.references || "Style reference set")}</span>
      </footer>
    </div>
  </main>
</body>
</html>`;
}

function principleCards(ctx) {
  return ctx.principles.map((item, i) => `<article class="card"><div class="eyebrow">Principle ${i + 1}</div><p>${esc(item)}</p></article>`).join("");
}

function renderProductSample(ctx) {
  const { style, muted, warning, proof } = ctx;
  return `<section class="hero">
    <div>
      <div class="eyebrow">${esc(style.tag || "style preset")}</div>
      <h1>${esc(style.name)} in motion.</h1>
      <p class="lead">${esc(style.desc || style.feel || "A production-ready sample page for this visual style.")}</p>
      <div class="actions"><span class="btn">Primary action</span><span class="btn secondary">View details</span></div>
    </div>
    <aside class="artifact">
      <div class="artifact-head"><span>Live surface</span><span>${esc(style.id)}</span></div>
      <div class="metric"><b>${esc(sampleMetric(style.id))}</b><span style="color:${warning};font-weight:800">active</span></div>
      <div class="bar"><i></i></div>
      <div class="metric"><span>${esc(proof[0] || "Evidence-led layout and visible hierarchy")}</span><span>01</span></div>
      <div class="metric"><span>${esc(proof[1] || "Responsive controls and clear state")}</span><span>02</span></div>
    </aside>
  </section>
  <section class="grid" aria-label="Style principles">${principleCards(ctx)}</section>
  <p class="lead" style="color:${muted};font-size:14px;margin-top:18px">Product-style preview template.</p>`;
}

function renderEditorialSample(ctx) {
  const { style, proof } = ctx;
  return `<section class="masthead">
    <div><div class="eyebrow">${esc(style.tag || "editorial system")}</div><h1>${esc(style.name)}</h1></div>
    <aside class="issue">
      <div class="eyebrow">Issue 04</div>
      <p class="lead">${esc(style.desc || style.feel || "A composed editorial page sample.")}</p>
      <span class="btn secondary">Read index</span>
    </aside>
  </section>
  <section class="spread">
    <article class="card"><div class="eyebrow">Lead Essay</div><p class="drop">${esc(proof[0] || "Large typography and strict editorial rhythm define the page.")}</p></article>
    <article class="card"><div class="eyebrow">Quote</div><h2>${esc(sampleMetric(style.id))}</h2><p>${esc(proof[1] || "Asymmetry, captions, and rules make the system feel published.")}</p></article>
    <article class="card"><div class="eyebrow">Notes</div><p>${esc(proof[2] || "A restrained system of image, type, and metadata.")}</p></article>
  </section>`;
}

function renderDashboardSample(ctx) {
  const { style, warning, proof } = ctx;
  return `<section class="workspace">
    <aside class="sidebar card">
      <div class="eyebrow">${esc(style.tag || "workspace")}</div>
      <strong>${esc(style.name)}</strong>
      <p class="lead" style="font-size:14px">${esc(style.desc || style.feel || "Operational surface sample.")}</p>
      <span class="btn secondary">Review queue</span>
    </aside>
    <section class="main">
      <div class="kpis">
        <div class="metric"><b>${esc(sampleMetric(style.id))}</b><span style="color:${warning};font-weight:800">live</span></div>
        <div class="metric"><b>24</b><span>tasks</span></div>
        <div class="metric"><b>7m</b><span>sla</span></div>
      </div>
      <div class="command card">
        <div class="eyebrow">Command surface</div>
        <h1>${esc(style.name)} system.</h1>
        <div class="bar"><i></i></div>
        <div class="metric"><span>${esc(proof[0] || "Evidence-led hierarchy and operational states")}</span><span>01</span></div>
        <div class="metric"><span>${esc(proof[1] || "Clear ownership, timing, and status")}</span><span>02</span></div>
      </div>
    </section>
  </section>`;
}

function renderCommerceSample(ctx) {
  const { style, proof } = ctx;
  return `<section class="showroom">
    <div class="object">${esc(style.name).split(" ").slice(0, 2).join("<br>")}</div>
    <div class="specs">
      <div class="eyebrow">${esc(style.tag || "commerce")}</div>
      <h1>${esc(style.name)} launch.</h1>
      <p class="lead">${esc(style.desc || style.feel || "A transactional sample page with inspectable product detail.")}</p>
      <div class="actions"><span class="btn">Start now</span><span class="btn secondary">Compare plans</span></div>
      ${principleCards({ ...ctx, principles: proof.slice(0, 2) })}
    </div>
  </section>`;
}

function renderBrutalSample(ctx) {
  const { style, proof } = ctx;
  return `<section class="poster">
    <div class="block card">
      <div class="eyebrow">${esc(style.tag || "poster system")}</div>
      <h1>${esc(style.name)}</h1>
      <p class="lead">${esc(style.desc || style.feel || "A high-contrast expressive sample page.")}</p>
      <span class="btn">Click me</span>
    </div>
    <div style="display:grid;gap:18px">
      <article class="block card"><div class="eyebrow">Rule 01</div><p>${esc(proof[0] || "The visual signature must be unmistakable.")}</p></article>
      <article class="block card"><div class="eyebrow">Rule 02</div><p>${esc(proof[1] || "Scale, contrast, and surface treatment carry the style.")}</p></article>
    </div>
  </section>`;
}

function renderSpatialSample(ctx) {
  const { style, proof } = ctx;
  return `<section class="space">
    <div class="glass-shell">
      <div class="floating card">
        <div class="eyebrow">${esc(style.tag || "spatial system")}</div>
        <h1>${esc(style.name)} layer.</h1>
        <p class="lead">${esc(style.desc || style.feel || "A layered interface sample with depth and calm controls.")}</p>
        <div class="actions"><span class="btn">Begin</span><span class="btn secondary">Details</span></div>
      </div>
      <div class="floating card" style="display:grid;gap:14px">
        <div class="metric"><b>${esc(sampleMetric(style.id))}</b><span>ready</span></div>
        <div class="bar"><i></i></div>
        <p>${esc(proof[0] || "Soft layered surfaces and generous spacing define the sample.")}</p>
        <p>${esc(proof[1] || "Controls stay calm, tactile, and readable.")}</p>
      </div>
    </div>
  </section>`;
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

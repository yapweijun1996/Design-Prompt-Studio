// Components browse page — surface the 70 UI component primitives so users
// can review what the prompt generator's <components> block draws from.
//
// Route: #components
// Filters: search (name / desc / when) + category + tier.
// Each card collapses to a short summary; click → expand full schema.

import { el } from "../lib/dom.js";
import {
  COMPONENT_LIST,
  COMPONENTS_BY_CATEGORY,
  componentCount,
} from "../data/components.js";

const CATEGORY_LABELS = {
  input: "Input",
  search: "Search",
  disclosure: "Disclosure",
  feedback: "Feedback",
  progress: "Progress",
  navigation: "Navigation",
  data: "Data display",
  media: "Media",
  identity: "Identity",
  misc: "Misc",
  commerce: "Commerce",
  chat: "Chat / Comms",
  auth: "Auth",
  advanced: "Advanced",
};

export function renderComponentsPage() {
  const root = el("section", { class: "components-page" });

  // ─── State (local, not persisted) ──────────────────────────────────────────
  const ui = {
    query: "",
    category: null,
    tier: null,
  };
  const expanded = new Set();

  // ─── Header ────────────────────────────────────────────────────────────────
  root.appendChild(
    el(
      "section",
      { class: "components-page__hero" },
      el("p", { class: "components-page__eyebrow" }, "UI VOCABULARY · v1"),
      el("h1", { class: "components-page__title" }, "Components"),
      el(
        "p",
        { class: "components-page__deck" },
        `${componentCount()} component primitives the prompt generator can include in `,
        el("code", null, "<components>"),
        ` so the LLM has a shared widget vocabulary. Filter to see what's auto-included for any style + page-type combo.`,
      ),
    ),
  );

  // ─── Filters ───────────────────────────────────────────────────────────────
  const searchInput = el("input", {
    type: "search",
    class: "components-page__search",
    placeholder: `Search ${componentCount()} components by name, use, libraries…`,
    "aria-label": "Search components",
  });
  searchInput.addEventListener("input", (e) => {
    ui.query = e.target.value;
    rebuild();
  });

  const categoryRow = el("div", {
    class: "components-page__chips",
    role: "radiogroup",
    "aria-label": "Filter by category",
  });

  const tierRow = el("div", {
    class: "components-page__chips",
    role: "radiogroup",
    "aria-label": "Filter by tier",
  });

  function buildCategoryChips() {
    const opts = [
      { id: null, label: `All · ${componentCount()}` },
      ...Object.keys(COMPONENTS_BY_CATEGORY).map((cat) => ({
        id: cat,
        label: `${CATEGORY_LABELS[cat] || cat} · ${COMPONENTS_BY_CATEGORY[cat].length}`,
      })),
    ];
    categoryRow.replaceChildren(
      ...opts.map((o) =>
        chip(o.label, ui.category === o.id, () => {
          ui.category = o.id;
          rebuild();
        }),
      ),
    );
  }

  function buildTierChips() {
    const opts = [
      { id: null, label: "All tiers" },
      { id: 1, label: "Tier 1 · essential" },
      { id: 2, label: "Tier 2 · recommended" },
      { id: 3, label: "Tier 3 · vertical" },
    ];
    tierRow.replaceChildren(
      ...opts.map((o) =>
        chip(o.label, ui.tier === o.id, () => {
          ui.tier = o.id;
          rebuild();
        }),
      ),
    );
  }

  // ─── Grid + count line ─────────────────────────────────────────────────────
  const countLine = el("p", {
    class: "components-page__count",
    "aria-live": "polite",
  });
  const grid = el("div", { class: "components-page__grid" });

  function visibleComponents() {
    const q = ui.query.trim().toLowerCase();
    return COMPONENT_LIST.filter((c) => {
      if (ui.category && c.category !== ui.category) return false;
      if (ui.tier && c.tier !== ui.tier) return false;
      if (q) {
        const hay = [
          c.id,
          c.name,
          c.desc,
          c.whenToUse,
          c.whenNotToUse,
          (c.variants || []).join(" "),
          (c.pairsWithLibraries || []).join(" "),
          (c.pairsWithStyles || []).join(" "),
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  function rebuild() {
    buildCategoryChips();
    buildTierChips();
    const list = visibleComponents();
    countLine.textContent = `${list.length} of ${componentCount()} shown`;
    grid.replaceChildren();
    if (list.length === 0) {
      grid.appendChild(
        el(
          "p",
          { class: "components-page__empty" },
          "No matches. Clear filters to see all.",
        ),
      );
      return;
    }
    for (const c of list) {
      grid.appendChild(renderCard(c, expanded.has(c.id), () => {
        if (expanded.has(c.id)) expanded.delete(c.id);
        else expanded.add(c.id);
        rebuild();
      }));
    }
  }

  // ─── Compose ───────────────────────────────────────────────────────────────
  root.append(
    el(
      "section",
      { class: "components-page__filters" },
      searchInput,
      categoryRow,
      tierRow,
    ),
    countLine,
    grid,
  );

  rebuild();
  return root;
}

// ─── Card ────────────────────────────────────────────────────────────────────
function renderCard(c, isExpanded, onToggle) {
  const card = el("article", {
    class: "comp-card" + (isExpanded ? " is-expanded" : ""),
  });

  const head = el(
    "header",
    { class: "comp-card__head", onClick: onToggle, tabindex: "0", role: "button", "aria-expanded": isExpanded ? "true" : "false" },
    el(
      "div",
      { class: "comp-card__head-main" },
      el("h3", { class: "comp-card__name" }, c.name),
      el("p", { class: "comp-card__desc" }, c.desc),
    ),
    el(
      "div",
      { class: "comp-card__meta" },
      el("span", { class: "comp-card__cat" }, CATEGORY_LABELS[c.category] || c.category),
      el("span", { class: "comp-card__tier" }, `T${c.tier}`),
    ),
  );
  head.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  });

  card.appendChild(head);

  if (isExpanded) {
    const body = el(
      "div",
      { class: "comp-card__body" },
      field("When", c.whenToUse),
      field("Not when", c.whenNotToUse),
      field("A11y", c.a11y),
    );

    if (c.variants?.length) {
      body.appendChild(
        el(
          "div",
          { class: "comp-card__field" },
          el("span", { class: "comp-card__label" }, "Variants"),
          el(
            "div",
            { class: "comp-card__pills" },
            ...c.variants.map((v) =>
              el("span", { class: "comp-card__pill" }, v),
            ),
          ),
        ),
      );
    }
    if (c.pairsWithLibraries?.length) {
      body.appendChild(
        el(
          "div",
          { class: "comp-card__field" },
          el("span", { class: "comp-card__label" }, "Libraries"),
          el(
            "div",
            { class: "comp-card__pills" },
            ...c.pairsWithLibraries.map((l) =>
              el("span", { class: "comp-card__pill comp-card__pill--lib" }, l),
            ),
          ),
        ),
      );
    }
    if (c.pairsWithStyles?.length) {
      body.appendChild(
        el(
          "div",
          { class: "comp-card__field" },
          el(
            "span",
            { class: "comp-card__label" },
            `Common in styles · ${c.pairsWithStyles.length}`,
          ),
          el(
            "div",
            { class: "comp-card__pills" },
            ...c.pairsWithStyles.map((s) =>
              el("span", { class: "comp-card__pill comp-card__pill--style" }, s),
            ),
          ),
        ),
      );
    }
    if (c.impliesBy?.length) {
      body.appendChild(
        el(
          "div",
          { class: "comp-card__field" },
          el(
            "span",
            { class: "comp-card__label" },
            `Triggered by sections / context · ${c.impliesBy.length}`,
          ),
          el(
            "div",
            { class: "comp-card__pills" },
            ...c.impliesBy.map((k) =>
              el("span", { class: "comp-card__pill comp-card__pill--ctx" }, k),
            ),
          ),
        ),
      );
    }

    card.appendChild(body);
  }

  return card;
}

function field(label, value) {
  if (!value) return null;
  return el(
    "div",
    { class: "comp-card__field" },
    el("span", { class: "comp-card__label" }, label),
    el("p", { class: "comp-card__value" }, value),
  );
}

function chip(label, isActive, onClick) {
  return el(
    "button",
    {
      type: "button",
      class: "chip" + (isActive ? " is-active" : ""),
      role: "radio",
      "aria-checked": isActive ? "true" : "false",
      onClick,
    },
    label,
  );
}

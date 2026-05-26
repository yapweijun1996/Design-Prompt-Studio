// Tiny DOM-builder helper used across the app — avoids JSX, avoids React.
// Usage:
//   el("button", { class: "btn", onClick: handler }, "Click me")
//   el("div", { class: "row" }, el("span", null, "hi"), el("span", null, "there"))

export function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else if (k === "style" && typeof v === "object") Object.assign(node.style, v);
      else if (k === "dataset" && typeof v === "object") Object.assign(node.dataset, v);
      else if (k.startsWith("on") && typeof v === "function") {
        node.addEventListener(k.slice(2).toLowerCase(), v);
      } else {
        node.setAttribute(k, v === true ? "" : v);
      }
    }
  }
  appendAll(node, children);
  return node;
}

function appendAll(node, children) {
  for (const c of children.flat(Infinity)) {
    if (c == null || c === false) continue;
    if (c instanceof Node) node.appendChild(c);
    else node.appendChild(document.createTextNode(String(c)));
  }
}

// Convenience for plain text nodes / fragments.
export function text(str) {
  return document.createTextNode(String(str));
}

// Empty out a parent then re-append children.
export function replaceChildren(parent, ...children) {
  parent.replaceChildren();
  appendAll(parent, children);
}

// Mount: clear parent and render an element.
export function mount(parent, element) {
  parent.replaceChildren();
  if (element) parent.appendChild(element);
}

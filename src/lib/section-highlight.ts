let currentHighlighted: Element | null = null;
let selectionEnabled = false;

function findSectionAncestor(el: Element): Element | null {
  let node: Element | null = el;
  while (node) {
    if (node.hasAttribute("data-section-id")) return node;
    node = node.parentElement;
  }
  return null;
}

function clearHighlight() {
  if (currentHighlighted) {
    currentHighlighted.classList.remove("section-highlighted");
    currentHighlighted = null;
  }
}

function handlePointerOver(e: Event) {
  if (!selectionEnabled) return;

  const target = e.target as Element;
  const section = findSectionAncestor(target);

  if (section === currentHighlighted) return;

  clearHighlight();

  if (section) {
    section.classList.add("section-highlighted");
    currentHighlighted = section;
  }
}

function handlePointerLeave() {
  if (!selectionEnabled) return;
  clearHighlight();
}

function handleClick(e: Event) {
  if (!selectionEnabled) return;

  const target = e.target as Element;
  const section = findSectionAncestor(target);

  if (section) {
    const sectionId = section.getAttribute("data-section-id");
    window.parent.postMessage({ type: "section-select", sectionId }, "*");
  }
}

function handleParentMessage(e: MessageEvent) {
  if (!e.data || typeof e.data !== "object") return;
  if (e.data.type === "selection-mode" && typeof e.data.enabled === "boolean") {
    selectionEnabled = e.data.enabled;
    if (!selectionEnabled) {
      clearHighlight();
    }
    document.body.style.cursor = selectionEnabled ? "crosshair" : "";
  }
}

export function initSectionHighlight() {
  document.addEventListener("pointerover", handlePointerOver);
  document.documentElement.addEventListener("pointerleave", handlePointerLeave);
  document.addEventListener("click", handleClick);
  window.addEventListener("message", handleParentMessage);
}

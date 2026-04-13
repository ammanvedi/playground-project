let currentHighlighted: Element | null = null;

function findSectionAncestor(el: Element): Element | null {
  let node: Element | null = el;
  while (node) {
    if (node.hasAttribute("data-section-id")) return node;
    node = node.parentElement;
  }
  return null;
}

function handlePointerOver(e: Event) {
  const target = e.target as Element;
  const section = findSectionAncestor(target);

  if (section === currentHighlighted) return;

  if (currentHighlighted) {
    currentHighlighted.classList.remove("section-highlighted");
    window.parent.postMessage({ type: "section-leave" }, "*");
  }

  if (section) {
    section.classList.add("section-highlighted");
    currentHighlighted = section;
    const sectionId = section.getAttribute("data-section-id");
    window.parent.postMessage({ type: "section-hover", sectionId }, "*");
  } else {
    currentHighlighted = null;
  }
}

function handlePointerLeave() {
  if (currentHighlighted) {
    currentHighlighted.classList.remove("section-highlighted");
    window.parent.postMessage({ type: "section-leave" }, "*");
    currentHighlighted = null;
  }
}

export function initSectionHighlight() {
  document.addEventListener("pointerover", handlePointerOver);
  document.documentElement.addEventListener("pointerleave", handlePointerLeave);
}

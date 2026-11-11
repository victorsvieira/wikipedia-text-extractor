(function exposeExtractor(globalScope) {
  const BLOCK_BREAK_AFTER = new Set(["P", "DIV", "SECTION", "ARTICLE", "HEADER", "FOOTER", "ASIDE", "H1", "H2", "H3", "H4", "H5", "H6", "LI", "TR", "TABLE", "BLOCKQUOTE", "FIGURE", "FIGCAPTION", "DL", "DT", "DD", "PRE"]);
  const ALWAYS_REMOVE = ["script", "style", "noscript", "template", "button", "input", "select", "textarea", ".mw-editsection", ".mw-jump-link", ".mw-empty-elt", ".navbox", ".vertical-navbox", ".metadata", ".ambox", ".mbox-small", ".sistersitebox", ".noprint", ".shortdescription", ".hatnote", ".portal", ".catlinks", ".authority-control", ".mw-indicators", ".toc", ".sidebar", ".navigation-not-searchable", ".nomobile"];

  function normalizeText(value) {
    return value.replace(/\u00a0/g, " ").replace(/[ \t]+\n/g, "\n").replace(/\n[ \t]+/g, "\n").replace(/[ \t]{2,}/g, " ").replace(/\n{3,}/g, "\n\n").trim();
  }

  function removeNodes(root, selectors) {
    root.querySelectorAll(selectors.join(",")).forEach((node) => node.remove());
  }

  function removeReferenceContent(root) {
    removeNodes(root, ["sup.reference", ".reference", ".mw-references-wrap", "ol.references", ".reflist", ".refbegin", ".refend"]);
    root.querySelectorAll("h2, h3, h4, h5, h6").forEach((heading) => {
      const id = heading.querySelector("[id]")?.id || heading.id || "";
      const label = `${id} ${heading.textContent}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      if (!/\b(referencias|references|notas|notes)\b/.test(label)) return;
      const level = Number(heading.tagName.slice(1));
      let sibling = heading.nextElementSibling;
      while (sibling) {
        const next = sibling.nextElementSibling;
        if (/^H[2-6]$/.test(sibling.tagName) && Number(sibling.tagName.slice(1)) <= level) break;
        sibling.remove();
        sibling = next;
      }
      heading.remove();
    });
  }

  function absolutizeImages(root, baseUrl) {
    root.querySelectorAll("img").forEach((image) => {
      const source = image.getAttribute("src") || image.getAttribute("data-src");
      if (!source) return image.remove();
      image.setAttribute("src", new URL(source, baseUrl).href);
      ["srcset", "data-src", "loading", "width", "height"].forEach((name) => image.removeAttribute(name));
    });
  }

  function sanitizeMarkup(root, includeImages, baseUrl) {
    root.querySelectorAll("a").forEach((anchor) => anchor.replaceWith(...anchor.childNodes));
    root.querySelectorAll("*").forEach((element) => {
      [...element.attributes].forEach((attribute) => {
        if (includeImages && element.tagName === "IMG" && ["src", "alt"].includes(attribute.name)) return;
        element.removeAttribute(attribute.name);
      });
    });
    if (includeImages) absolutizeImages(root, baseUrl);
    else removeNodes(root, ["img", "figure", ".thumb", ".infobox-image"]);
  }

  function renderPlainText(root, includeImages) {
    const parts = [];
    function walk(node, listDepth = 0) {
      if (node.nodeType === 3) return parts.push(node.nodeValue.replace(/\s+/g, " "));
      if (node.nodeType !== 1) return;
      const tag = node.tagName;
      if (tag === "BR") return parts.push("\n");
      if (tag === "IMG") {
        if (includeImages) parts.push(node.getAttribute("alt") ? `[Imagem: ${node.getAttribute("alt")}]` : "[Imagem]");
        return;
      }
      if (tag === "LI") parts.push(`${"  ".repeat(listDepth)}• `);
      const nextDepth = tag === "UL" || tag === "OL" ? listDepth + 1 : listDepth;
      [...node.childNodes].forEach((child) => walk(child, nextDepth));
      if (tag === "TH" || tag === "TD") parts.push("\t");
      else if (BLOCK_BREAK_AFTER.has(tag)) parts.push("\n");
    }
    walk(root);
    return normalizeText(parts.join(""));
  }

  function extractWikipediaArticle(document, options = {}) {
    const includeImages = Boolean(options.includeImages);
    const includeReferences = Boolean(options.includeReferences);
    const article = document.querySelector("#mw-content-text .mw-parser-output");
    if (!article) throw new Error("Não foi possível encontrar o conteúdo deste artigo.");
    const root = article.cloneNode(true);
    removeNodes(root, ALWAYS_REMOVE);
    if (!includeReferences) removeReferenceContent(root);
    const canonicalUrl = document.querySelector('link[rel="canonical"]')?.getAttribute("href");
    const baseUrl = document.baseURI && document.baseURI !== "null" ? document.baseURI : canonicalUrl || "https://wikipedia.org/";
    sanitizeMarkup(root, includeImages, baseUrl);
    const title = document.querySelector("#firstHeading")?.textContent.trim();
    if (title) {
      const heading = document.createElement("h1");
      heading.textContent = title;
      root.prepend(heading);
    }
    const plainText = renderPlainText(root, includeImages);
    if (!plainText) throw new Error("O artigo não possui texto para extrair.");
    return {plainText, html: `<article>${root.innerHTML}</article>`, title: title || document.title, characterCount: plainText.length};
  }

  globalScope.WikipediaExtractor = {extractWikipediaArticle, normalizeText};
  if (typeof module !== "undefined" && module.exports) module.exports = globalScope.WikipediaExtractor;
})(typeof globalThis !== "undefined" ? globalThis : this);

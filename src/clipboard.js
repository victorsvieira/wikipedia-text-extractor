(function exposeWikipediaClipboard(globalScope) {
  async function copyExtractedArticle(result, environment = globalScope) {
    const clipboard = environment.navigator?.clipboard;
    if (!clipboard) throw new Error("A área de transferência não está disponível.");

    if (environment.ClipboardItem && clipboard.write) {
      const BlobType = environment.Blob || Blob;
      const item = new environment.ClipboardItem({
        "text/plain": new BlobType([result.plainText], {type: "text/plain"}),
        "text/html": new BlobType([result.html], {type: "text/html"})
      });
      await clipboard.write([item]);
      return "rich";
    }

    if (clipboard.writeText) {
      await clipboard.writeText(result.plainText);
      return "plain";
    }

    throw new Error("Este navegador não permite copiar o artigo.");
  }

  globalScope.WikipediaClipboard = {copyExtractedArticle};
  if (typeof module !== "undefined" && module.exports) module.exports = globalScope.WikipediaClipboard;
})(typeof globalThis !== "undefined" ? globalThis : this);

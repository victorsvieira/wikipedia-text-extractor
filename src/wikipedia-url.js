(function exposeWikipediaUrl(globalScope) {
  function isWikipediaArticle(url) {
    try {
      const parsed = new URL(url);
      const isWikipediaHost = parsed.hostname === "wikipedia.org" || parsed.hostname.endsWith(".wikipedia.org");
      return parsed.protocol === "https:" && isWikipediaHost && parsed.pathname.startsWith("/wiki/");
    } catch {
      return false;
    }
  }

  globalScope.WikipediaUrl = {isWikipediaArticle};
  if (typeof module !== "undefined" && module.exports) module.exports = globalScope.WikipediaUrl;
})(typeof globalThis !== "undefined" ? globalThis : this);

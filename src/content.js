chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "EXTRACT_WIKIPEDIA_ARTICLE") return false;
  try {
    sendResponse({ok: true, result: WikipediaExtractor.extractWikipediaArticle(document, message.options)});
  } catch (error) {
    sendResponse({ok: false, error: error.message || "Não foi possível extrair o artigo."});
  }
  return false;
});

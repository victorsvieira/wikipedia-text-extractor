const pageStatus = document.querySelector("#page-status");
const options = document.querySelector("#options");
const extractButton = document.querySelector("#extract");
const feedback = document.querySelector("#feedback");
let activeTab;

function showFeedback(message, isError = false) { feedback.textContent = message; feedback.classList.toggle("error", isError); }

async function requestExtraction(tabId, extractionOptions) {
  const message = {type:"EXTRACT_WIKIPEDIA_ARTICLE", options:extractionOptions};
  try {
    return await chrome.tabs.sendMessage(tabId, message);
  } catch (firstError) {
    await chrome.scripting.executeScript({
      target: {tabId},
      files: ["src/extractor.js", "src/content.js"]
    });
    try {
      return await chrome.tabs.sendMessage(tabId, message);
    } catch {
      throw new Error("Não foi possível conectar ao artigo. Atualize a página e tente novamente.", {cause:firstError});
    }
  }
}

async function initialize() {
  const [tab] = await chrome.tabs.query({active:true,currentWindow:true});
  activeTab = tab;
  if (!tab || !WikipediaUrl.isWikipediaArticle(tab.url)) {
    pageStatus.textContent = "Abra um artigo da Wikipédia para usar o extrator.";
    pageStatus.classList.add("invalid"); return;
  }
  const title = tab.title?.replace(/\s[–-]\sWikipédia.*$/i, "") || "Artigo da Wikipédia";
  pageStatus.textContent = `Pronto para copiar: ${title}`;
  options.disabled = false; extractButton.disabled = false;
}
extractButton.addEventListener("click", async () => {
  const includeImages = document.querySelector("#include-images").checked;
  const includeReferences = document.querySelector("#include-references").checked;
  extractButton.disabled = true; extractButton.querySelector("span").textContent = "Extraindo…"; showFeedback("");
  try {
    const response = await requestExtraction(activeTab.id, {includeImages,includeReferences});
    if (!response?.ok) throw new Error(response?.error || "A página não respondeu ao extrator.");
    await WikipediaClipboard.copyExtractedArticle(response.result);
    showFeedback(`${response.result.characterCount.toLocaleString("pt-BR")} caracteres copiados!`);
    extractButton.querySelector("span").textContent = "Copiado";
  } catch (error) {
    showFeedback(error.message || "Não foi possível copiar o artigo.", true);
    extractButton.querySelector("span").textContent = "Tentar novamente";
  } finally { extractButton.disabled = false; }
});
initialize().catch(() => { pageStatus.textContent = "Não foi possível verificar a página atual."; pageStatus.classList.add("invalid"); });

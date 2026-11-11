const test = require("node:test");
const assert = require("node:assert/strict");
const {copyExtractedArticle} = require("../src/clipboard.js");

const result = {
  plainText: "Título\n\nUm parágrafo.",
  html: "<article><h1>Título</h1><p>Um parágrafo.</p></article>"
};

test("sempre copia HTML semântico e texto simples para editores ricos", async () => {
  let writtenItems;
  class MockClipboardItem {
    constructor(types) { this.types = types; }
  }
  const environment = {
    Blob,
    ClipboardItem: MockClipboardItem,
    navigator: {clipboard: {write: async (items) => { writtenItems = items; }}}
  };

  assert.equal(await copyExtractedArticle(result, environment), "rich");
  assert.equal(writtenItems.length, 1);
  assert.deepEqual(Object.keys(writtenItems[0].types).sort(), ["text/html", "text/plain"]);
  assert.equal(await writtenItems[0].types["text/html"].text(), result.html);
  assert.equal(await writtenItems[0].types["text/plain"].text(), result.plainText);
});

test("usa texto simples como fallback em navegadores sem ClipboardItem", async () => {
  let copiedText;
  const environment = {navigator: {clipboard: {writeText: async (text) => { copiedText = text; }}}};
  assert.equal(await copyExtractedArticle(result, environment), "plain");
  assert.equal(copiedText, result.plainText);
});

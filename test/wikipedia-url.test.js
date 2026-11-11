const test = require("node:test");
const assert = require("node:assert/strict");
const {isWikipediaArticle} = require("../src/wikipedia-url.js");

test("reconhece artigos em qualquer subdomínio da Wikipédia", () => {
  for (const url of [
    "https://pt.wikipedia.org/wiki/Susana_Vieira",
    "https://en.wikipedia.org/wiki/Chrome",
    "https://pt.m.wikipedia.org/wiki/Susana_Vieira",
    "https://simple.wikipedia.org/wiki/Example"
  ]) assert.equal(isWikipediaArticle(url), true, url);
});

test("rejeita outros sites e páginas que não são artigos", () => {
  for (const url of [
    "https://wikipedia.org/",
    "https://pt.wikipedia.org/",
    "https://wikipedia.org.example.com/wiki/Falso",
    "https://example.com/wiki/Falso",
    "not-a-url"
  ]) assert.equal(isWikipediaArticle(url), false, url);
});

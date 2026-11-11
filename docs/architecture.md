# Arquitetura

Extensão Chrome Manifest V3 em JavaScript, HTML e CSS puros. Um content script restrito a HTTPS em `*.wikipedia.org` clona e higieniza o DOM. O popup envia opções, recebe texto simples e HTML sanitizado e grava pela Clipboard API.

`src/extractor.js` concentra a regra testável. `src/content.js` faz a ponte de mensagens. `popup/` contém interface e clipboard. Não há servidor, telemetria nem persistência. O HTML remove atributos, links e elementos não editoriais; imagens solicitadas usam URLs absolutas.

Se uma aba da Wikipédia já estava aberta quando a extensão foi instalada ou atualizada, o popup injeta os mesmos scripts declarados no manifesto e repete a mensagem. Isso evita exigir recarga manual da página.

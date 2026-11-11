# Produto

## Objetivo
Permitir que alguém copie o conteúdo útil de um artigo da Wikipédia em um clique, sem estilos, links ou referências indesejadas.

## Escopo do MVP
- Funciona apenas em páginas de artigo de `wikipedia.org`.
- Copia texto limpo por padrão, preservando títulos, listas e conteúdo de tabelas.
- Mantém títulos, subtítulos, parágrafos, listas e tabelas como HTML semântico em editores compatíveis.
- Remove links, estilos, controles, navegação, marcadores e seção de referências por padrão.
- Permite incluir referências e imagens de forma independente.
- Oferece feedback de sucesso ou erro no popup.

## Fora do escopo
PDFs, páginas fora da Wikipédia, downloads e preservação exata do layout original.

## Critérios de aceitação
- Em um artigo, **Extrair e copiar** produz texto simples sem links, CSS, marcadores ou lista de referências.
- Em um editor rico, títulos, subtítulos, parágrafos, listas e tabelas mantêm sua estrutura.
- Com **Referências**, marcadores, notas e fontes aparecem.
- Com **Imagens**, editores compatíveis recebem HTML com imagens e texto; texto simples recebe descrições.
- Fora de um artigo da Wikipédia, a ação fica desabilitada com uma explicação.

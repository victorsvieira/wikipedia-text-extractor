# Wikipedia Text Extractor

Uma extensão gratuita para Google Chrome que extrai o conteúdo de artigos da Wikipédia e o copia para a área de transferência como texto limpo.

Chega de apagar manualmente links, estilos, botões de edição, números de citações e blocos de referências. Abra um artigo, escolha o que deseja incluir e clique em **Extrair e copiar**.

## Funcionalidades

- Extrai o texto principal de artigos da Wikipédia.
- Remove CSS, links e elementos de navegação.
- Remove marcadores como `[1]`, notas e a seção de referências por padrão.
- Preserva títulos, subtítulos, parágrafos, listas e tabelas em editores compatíveis.
- Permite incluir imagens opcionalmente.
- Permite incluir referências opcionalmente.
- Copia o resultado diretamente para a área de transferência.
- Reconhece qualquer idioma ou subdomínio da Wikipédia, como:
  - `pt.wikipedia.org`
  - `en.wikipedia.org`
  - `es.wikipedia.org`
  - `simple.wikipedia.org`
  - `pt.m.wikipedia.org`
- Funciona localmente, sem servidor, cadastro ou coleta de dados.

## Como funciona

Ao abrir a extensão em um artigo da Wikipédia, você pode escolher entre três formas de extração:

| Opções | Resultado |
| --- | --- |
| Nenhuma opção marcada | Conteúdo formatado, sem imagens, links ou referências |
| Imagens | Inclui as imagens ao colar em editores compatíveis com conteúdo rico |
| Referências | Mantém os marcadores, notas e a lista de fontes |
| Imagens + referências | Copia o artigo com ambos os conteúdos opcionais |

A área de transferência sempre recebe duas versões: HTML semântico, que mantém títulos, subtítulos, parágrafos, listas e tabelas; e texto simples, usado automaticamente por campos que não aceitam formatação. Quando imagens são selecionadas, a versão simples as representa por descrições como `[Imagem: Susana Vieira]`.

## Instalação

A extensão ainda não está publicada na Chrome Web Store. Para instalá-la diretamente pelo código-fonte:

1. Baixe este repositório em **Code → Download ZIP** ou clone pelo Git:

   ```bash
   git clone https://github.com/victorsvieira/wikipedia-text-extractor.git
   ```

2. Se baixou o ZIP, extraia o arquivo.
3. Abra `chrome://extensions` no Google Chrome.
4. Ative o **Modo do desenvolvedor** no canto superior direito.
5. Clique em **Carregar sem compactação**.
6. Selecione a pasta do projeto que contém o arquivo `manifest.json`.

A extensão aparecerá na lista do Chrome. Você pode fixá-la na barra de ferramentas pelo menu de extensões.

## Como usar

1. Abra qualquer artigo da Wikipédia. Para testar, use o artigo da [Susana Vieira](https://pt.wikipedia.org/wiki/Susana_Vieira).
2. Clique no ícone do **Wikipedia Text Extractor**.
3. Ative **Imagens** e/ou **Referências** se quiser incluí-las.
4. Clique em **Extrair e copiar**.
5. Cole o conteúdo no editor de sua preferência.

Para preservar imagens, cole em um editor que aceite HTML rico, como Google Docs, Microsoft Word ou editores semelhantes. Em campos que aceitam apenas texto, será usada a versão limpa em texto simples.

## O que é removido

Na extração padrão, a extensão elimina:

- links clicáveis;
- estilos e classes CSS;
- botões e links de edição;
- menus, caixas de navegação e portais;
- avisos e elementos auxiliares da Wikipédia;
- marcadores numéricos de citação;
- notas e listas de referências;
- imagens e seus elementos de layout.

O conteúdo editorial, incluindo o texto presente em tabelas e listas, continua disponível.

## Privacidade e permissões

A extensão:

- não coleta dados;
- não possui analytics ou telemetria;
- não envia o artigo para servidores externos;
- não exige conta ou login;
- não salva histórico de artigos ou textos copiados;
- só pode acessar páginas HTTPS sob `*.wikipedia.org`.

As permissões do Chrome são usadas exclusivamente para identificar a aba ativa, acessar o artigo da Wikipédia e escrever o resultado na área de transferência.

## Compatibilidade e limitações

- Desenvolvida para Google Chrome e navegadores compatíveis com extensões Manifest V3.
- Funciona em páginas de artigos cujo endereço contém `/wiki/`.
- A preservação de imagens depende do suporte do aplicativo de destino a conteúdo HTML na área de transferência.
- A extensão busca preservar o conteúdo, não reproduzir visualmente o layout original da Wikipédia.
- Mudanças futuras na estrutura HTML da Wikipédia podem exigir ajustes no extrator.

## Desenvolvimento

O projeto usa JavaScript, HTML e CSS puros. Não há framework, backend ou etapa de build. O Node.js é necessário apenas para executar os testes automatizados.

### Requisitos

- Node.js 20 ou superior
- npm
- Google Chrome ou navegador compatível

### Executando localmente

```bash
git clone https://github.com/victorsvieira/wikipedia-text-extractor.git
cd wikipedia-text-extractor
npm install
npm run check
```

O comando de verificação valida o manifesto e executa os testes automatizados do extrator.

## Estrutura do projeto

```text
├── manifest.json          # Configuração da extensão Manifest V3
├── popup/                 # Interface exibida ao clicar na extensão
├── src/
│   ├── extractor.js       # Limpeza e extração do artigo
│   ├── content.js         # Comunicação com a página da Wikipédia
│   └── wikipedia-url.js   # Validação de domínios e páginas suportadas
├── test/                  # Testes automatizados
├── scripts/               # Validação da estrutura da extensão
└── docs/                  # Produto, arquitetura e tarefas
```

## Contribuindo

Issues e pull requests são bem-vindos. Ao propor uma mudança:

1. Crie um fork do repositório.
2. Abra uma branch para a alteração.
3. Implemente a mudança e adicione testes quando necessário.
4. Execute `npm run check`.
5. Abra um pull request explicando o problema e a solução.

Sugestões de novos idiomas, casos de artigos que não funcionam e melhorias de acessibilidade também são bem-vindas.

## Status do projeto

O projeto está funcional e em desenvolvimento ativo. Atualmente, a instalação é feita manualmente pelo modo do desenvolvedor do Chrome.

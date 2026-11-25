# luccazovedi.tech

Landing page pessoal de Lucca Zovedi. HTML, CSS e JavaScript puros, sem build, publicada no GitHub Pages.

## Editar

- **Projetos:** `projects.js`. Cada item tem `show` (true/false), `type`, textos em `pt`/`en`, `tags`, `live`, `code` e `image`. Os projetos aparecem agrupados por `type`, na ordem da lista: `product` vira destaque grande, `site` vira grade de prévias (o primeiro ocupa a linha inteira) e `system` vira lista com a stack (`tags`). O HTML de cada grupo sai de `render.js`, usado tanto pelo navegador quanto pelo prerender.
- **Contato:** `window.SITE` no topo de `projects.js` (e-mail e LinkedIn).
- **Textos PT/EN:** dicionário `T` em `main.js`.
- **Cores e tipografia:** variáveis em `:root` no `styles.css` (tema claro padrão, escuro pelo sistema; fonte Schibsted Grotesk).
- **Contato:** o formulário só monta um link `mailto:` com assunto e mensagem; nada é enviado pela página.

## Skills de design

`.claude/skills/` traz três skills para o Claude Code usar em mudanças futuras de UI: `emil-design-eng` (Emil Kowalski, animação), `make-interfaces-feel-better` (Jakub Krehel, detalhes de interface) e `impeccable` (Paul Bakaus, checklist anti "AI slop").

## Rodar localmente

```bash
npx serve .
```

## Deploy

Push na `main` publica via GitHub Pages. O arquivo `CNAME` aponta para `luccazovedi.tech`.

## SEO

- Depois de editar `projects.js`, rode `node scripts/prerender.mjs`. Ele grava a lista de projetos no `index.html` (para buscadores que não executam JavaScript) e atualiza a data do `sitemap.xml`.
- Título, descrição, Open Graph e dados estruturados (JSON-LD) ficam no `<head>` do `index.html`.
- `assets/og.png` é a imagem que aparece ao compartilhar o link. `robots.txt`, `sitemap.xml` e `llms.txt` ficam na raiz.

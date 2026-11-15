# luccazovedi.tech

Landing page pessoal de Lucca Zovedi. HTML, CSS e JavaScript puros, sem build, publicada no GitHub Pages.

## Editar

- **Projetos:** `projects.js`. Cada item tem `show` (true/false), `type`, textos em `pt`/`en`, `tags`, `live` e `code`. A ordem da lista é a ordem na página.
- **Contato:** `window.SITE` no topo de `projects.js` (e-mail e LinkedIn).
- **Textos PT/EN:** dicionário `T` em `main.js`.
- **Cores e tipografia:** variáveis em `:root` no `styles.css`.

## Rodar localmente

```bash
npx serve .
```

## Deploy

Push na `main` publica via GitHub Pages. O arquivo `CNAME` aponta para `luccazovedi.tech`.

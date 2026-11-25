/*
 * Builds the project markup from projects.js. Used in the browser by main.js and in
 * Node by scripts/prerender.mjs, so crawlers and visitors see the same structure.
 */
(function (root) {
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const ARROW = '<svg class="i" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5"/></svg>';

  const urlOf = (p) => p.live || (p.type !== "site" ? p.code : "");
  const tags = (p) => (p.tags && p.tags.length ? `<p class="tags">${p.tags.map(esc).join(" · ")}</p>` : "");
  const shot = (p, url, alt, sizes) => p.image
    ? `<a class="shot" href="${esc(url)}" target="_blank" rel="noopener" tabindex="-1"><img src="${esc(p.image)}" alt="${esc(alt + p.name)}" loading="lazy" decoding="async" width="718" height="449" sizes="${sizes}"></a>`
    : "";
  const title = (p, url, tag) => `<${tag} class="name">${url
    ? `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(p.name)}${ARROW}</a>`
    : esc(p.name)}</${tag}>`;

  function projects(list, lang, t) {
    const alt = lang === "pt" ? "Tela inicial do site " : "Home page of ";
    const text = (p) => esc(p[lang] || p.pt || "");
    const types = [...new Set(list.map((p) => p.type))];

    return types.map((type) => {
      const items = list.filter((p) => p.type === type);
      let body;
      if (type === "product") {
        body = items.map((p) => {
          const url = urlOf(p);
          return `<article class="feature">
            ${shot(p, url, alt, "(min-width: 900px) 60vw, 100vw")}
            <div class="feature-body">
              ${title(p, url, "h4")}
              <p>${text(p)}</p>
              ${tags(p)}
              <p class="year">${esc(p.year || "")}</p>
            </div>
          </article>`;
        }).join("");
      } else if (type === "site") {
        body = `<ul class="sites">${items.map((p) => {
          const url = urlOf(p);
          return `<li class="site">
            ${shot(p, url, alt, "(min-width: 900px) 50vw, 100vw")}
            <div class="site-head">${title(p, url, "h4")}<span class="year">${esc(p.year || "")}</span></div>
            <p>${text(p)}</p>
          </li>`;
        }).join("")}</ul>`;
      } else {
        body = `<ul class="rows">${items.map((p) => {
          const url = urlOf(p);
          return `<li class="row">
            ${title(p, url, "h4")}
            <p>${text(p)}</p>
            ${tags(p)}
            <span class="year">${esc(p.year || "")}</span>
          </li>`;
        }).join("")}</ul>`;
      }
      return `<div class="group" id="g-${esc(type)}">
          <h3 class="group-title">${esc(t("g." + type))}<span class="count">${items.length}</span></h3>
          ${body}
        </div>`;
    }).join("");
  }

  root.Render = { projects, esc, ARROW };
})(typeof window !== "undefined" ? window : globalThis);

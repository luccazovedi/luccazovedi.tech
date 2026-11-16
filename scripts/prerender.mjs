// Writes the project list (in Portuguese) into index.html so crawlers that do not run
// JavaScript still see it, and refreshes the sitemap date. main.js replaces this markup
// on load. Run after editing projects.js:  node scripts/prerender.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = fileURLToPath(new URL("..", import.meta.url));
const read = (f) => readFileSync(root + f, "utf8");

const window = {};
vm.runInNewContext(read("projects.js"), { window });
const projects = window.PROJECTS.filter((p) => p.show !== false);

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const GROUPS = { product: "Produtos", site: "Sites", system: "Sistemas" };

const html = [...new Set(projects.map((p) => p.type))].map((type) => {
  const items = projects.filter((p) => p.type === type).map((p) => {
    const url = p.live || (type !== "site" ? p.code : "");
    const name = url ? `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(p.name)}</a>` : esc(p.name);
    const thumb = p.image
      ? `<a class="thumb" href="${esc(url)}" target="_blank" rel="noopener" tabindex="-1"><img src="${esc(p.image)}" alt="Tela inicial do site ${esc(p.name)}" loading="lazy" width="718" height="449"></a>`
      : "";
    return `
            <li class="item">
              <div class="item-body">
                <div class="item-head"><h3 class="item-name">${name}</h3><span class="year">${esc(p.year || "")}</span></div>
                <p>${esc(p.pt || "")}</p>
              </div>${thumb}
            </li>`;
  }).join("");
  return `
          <div class="group"><p class="label">${GROUPS[type] || type}</p><ul class="items">${items}
          </ul></div>`;
}).join("");

const marker = /<!--prerender:start-->[\s\S]*?<!--prerender:end-->/;
const index = read("index.html");
if (!marker.test(index)) throw new Error("prerender markers not found in index.html");
writeFileSync(root + "index.html", index.replace(marker, `<!--prerender:start-->${html}\n        <!--prerender:end-->`));

const today = new Date().toISOString().slice(0, 10);
writeFileSync(root + "sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://luccazovedi.tech/</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`);

console.log(`index.html: ${projects.length} projetos; sitemap.xml: ${today}`);

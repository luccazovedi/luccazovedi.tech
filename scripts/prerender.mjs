// Writes the project list (in Portuguese) into index.html so crawlers that do not run
// JavaScript still see it, and refreshes the sitemap date. The markup comes from
// render.js, the same file main.js uses, so both always match.
// Run after editing projects.js:  node scripts/prerender.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = fileURLToPath(new URL("..", import.meta.url));
const read = (f) => readFileSync(root + f, "utf8");

const window = {};
vm.runInNewContext(read("projects.js") + "\n" + read("render.js"), { window });
const projects = window.PROJECTS.filter((p) => p.show !== false);
const GROUPS = { "g.product": "Produtos", "g.site": "Sites", "g.system": "Sistemas" };
const html = window.Render.projects(projects, "pt", (k) => GROUPS[k] || k);

const marker = /<!--prerender:start-->[\s\S]*?<!--prerender:end-->/;
const index = read("index.html");
if (!marker.test(index)) throw new Error("prerender markers not found in index.html");
writeFileSync(root + "index.html", index.replace(marker, () => `<!--prerender:start-->${html}<!--prerender:end-->`));

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

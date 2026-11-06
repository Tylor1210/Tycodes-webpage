// Prerenders every marketing page into its own static HTML file so crawlers that do not run
// JavaScript (most AI search bots) can read the real content. Runs after the client and SSR builds.
//   dist/index.html            ->  /
//   dist/ai-visibility.html    ->  /ai-visibility   (Workers assets serve foo.html at /foo)
import { readFile, writeFile, rm } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const root = process.cwd();
const server = await import(pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href);
const { render, routes, jsonLdFor } = server;

const template = await readFile(path.join(root, "dist", "index.html"), "utf8");
const marker = '<div id="root"></div>';
if (!template.includes(marker)) throw new Error("prerender: root marker not found in dist/index.html");

const SITE = "https://tycodes.dev";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// Swap one tag's attribute value. Fails loudly if the template stops matching.
function setAttr(html, tagPattern, attr, value) {
  const re = new RegExp(`(${tagPattern}[^>]*?${attr}=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`prerender: could not find ${tagPattern}`);
  return html.replace(re, (_, a, b) => `${a}${esc(value)}${b}`);
}

for (const r of routes) {
  const url = `${SITE}${r.path === "/" ? "/" : r.path}`;
  let html = template;
  html = html.replace(/<title>[^<]*<\/title>/, () => `<title>${esc(r.title)}</title>`);
  html = setAttr(html, '<meta name="description"', "content", r.description);
  html = setAttr(html, '<link rel="canonical"', "href", url);
  html = setAttr(html, '<meta property="og:title"', "content", r.title);
  html = setAttr(html, '<meta property="og:description"', "content", r.description);
  html = setAttr(html, '<meta property="og:url"', "content", url);
  html = setAttr(html, '<meta name="twitter:title"', "content", r.title);
  html = setAttr(html, '<meta name="twitter:description"', "content", r.description);

  // The guard script hides the prerendered page when someone lands on a different path.
  const guard = 'if(location.pathname.replace(/\\/+$/,"")!=="/")';
  if (!html.includes(guard)) throw new Error("prerender: guard script not found");
  html = html.replace(guard, () => `if(location.pathname.replace(/\\/+$/,"")!==${JSON.stringify(r.path)})`);

  const ld = `<script type="application/ld+json">${JSON.stringify(jsonLdFor(r.path)).replace(/</g, "\\u003c")}</script>`;
  if (!html.includes("<!--JSONLD-->")) throw new Error("prerender: JSON-LD marker not found (it may have been stripped by the build)");
  html = html.replace("<!--JSONLD-->", () => ld);
  html = html.replace(marker, () => `<div id="root">${render(r.path)}</div>`);

  const file = r.path === "/" ? "index.html" : `${r.path.slice(1)}.html`;
  await writeFile(path.join(root, "dist", file), html);
  console.log(`prerender: ${r.path} -> dist/${file}`);
}

await rm(path.join(root, "dist-ssr"), { recursive: true, force: true });

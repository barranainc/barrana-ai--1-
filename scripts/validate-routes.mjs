import { readFile } from "node:fs/promises";
import { routes } from "./routes.mjs";

const errors = [];
const paths = routes.map((route) => route.path);
const uniquePaths = new Set(paths);

if (uniquePaths.size !== paths.length) {
  const duplicates = paths.filter((path, index) => paths.indexOf(path) !== index);
  errors.push(`Duplicate route paths: ${[...new Set(duplicates)].join(", ")}`);
}

for (const route of routes) {
  if (!route.path.startsWith("/")) errors.push(`Route must begin with /: ${route.path}`);
  if (route.path !== "/" && route.path.endsWith("/")) errors.push(`Route has a trailing slash: ${route.path}`);
  if (/\s/.test(route.path)) errors.push(`Route contains whitespace: ${route.path}`);
  if (/canadian/i.test(route.path)) errors.push(`Route contains the malformed Canadian location token: ${route.path}`);
  if (route.priority < 0 || route.priority > 1) errors.push(`Invalid priority for ${route.path}`);
}

const sitemap = await readFile("client/public/sitemap.xml", "utf8");
const sitemapLocations = [...sitemap.matchAll(/<loc>https:\/\/barrana\.ai([^<]*)<\/loc>/g)]
  .map((match) => match[1] || "/");

if (sitemapLocations.length !== routes.length) {
  errors.push(`Sitemap has ${sitemapLocations.length} URLs but route inventory has ${routes.length}.`);
}

for (const path of paths) {
  if (!sitemapLocations.includes(path)) errors.push(`Sitemap is missing route: ${path}`);
}

if (/<lastmod>/.test(sitemap)) {
  errors.push("Sitemap contains lastmod values without page-level modification evidence.");
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Barrana route and sitemap controls passed for ${routes.length} URLs.`);
}

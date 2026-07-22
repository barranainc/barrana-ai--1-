import { existsSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { errorRoutes, prerenderOnlyRoutes, prerenderPaths, routes } from "./routes.mjs";

const root = "dist/public";
const errors = [];
const routeTitles = new Map();

for (const required of ["index.html", "sitemap.xml", "robots.txt", "llms.txt"]) {
  if (!existsSync(join(root, required))) errors.push(`Built site is missing ${required}.`);
}

for (const route of routes) {
  const output = route.path === "/"
    ? join(root, "index.html")
    : join(root, route.path, "index.html");
  if (!existsSync(output)) {
    errors.push(`Missing prerendered route: ${route.path}`);
    continue;
  }

  const html = await readFile(output, "utf8");
  const expectedCanonical = `https://barrana.ai${route.path}`;
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1];
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
  const description = html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i)?.[1]?.trim();

  if (canonical !== expectedCanonical) {
    errors.push(`Incorrect canonical for ${route.path}: ${canonical || "missing"}`);
  }

  if (!title) {
    errors.push(`Missing title for ${route.path}`);
  } else {
    routeTitles.set(route.path, title);
  }

  if (!description) {
    errors.push(`Missing meta description for ${route.path}`);
  }
}

for (const routePath of [...prerenderOnlyRoutes, ...errorRoutes]) {
  const output = join(root, routePath, "index.html");
  if (!existsSync(output)) errors.push(`Missing prerendered route: ${routePath}`);
}

const home = await readFile(join(root, "index.html"), "utf8");
const contact = await readFile(join(root, "contact/index.html"), "utf8");
const llms = await readFile(join(root, "llms.txt"), "utf8");
const sitemap = await readFile(join(root, "sitemap.xml"), "utf8");
const homeTitle = routeTitles.get("/");

for (const [routePath, title] of routeTitles) {
  if (routePath !== "/" && title === homeTitle) {
    errors.push(`Route reuses the homepage title: ${routePath}`);
  }
}

if (!home.includes("Your Most Expensive Employee Is Doing Data Entry.")) {
  errors.push("Prerendered homepage is missing the approved headline.");
}

if (!home.includes("Show Me What I Can Stop Doing Manually")) {
  errors.push("Prerendered homepage is missing the approved homepage CTA.");
}

if (!contact.includes('for="contact-name"') || !contact.includes('id="contact-name"')) {
  errors.push("Prerendered contact form is missing the name label association.");
}

if (!llms.startsWith("# Barrana.ai")) {
  errors.push("Built llms.txt does not contain the controlled guide.");
}

if ([...sitemap.matchAll(/<loc>/g)].length !== routes.length) {
  errors.push("Built sitemap URL count does not match the route inventory.");
}

for (const routePath of [...prerenderOnlyRoutes, ...errorRoutes]) {
  if (sitemap.includes(`<loc>https://barrana.ai${routePath}</loc>`)) {
    errors.push(`Non-indexable path is present in the built sitemap: ${routePath}`);
  }
}

const notFound = await readFile(join(root, "404/index.html"), "utf8");
const notFoundRobots = notFound.match(/<meta[^>]+name="robots"[^>]+content="([^"]+)"/i)?.[1] || "";
if (!notFound.includes("<title>Page Not Found | Barrana.ai</title>")) {
  errors.push("Prerendered 404 page has an incorrect title.");
}
if (!/noindex/i.test(notFoundRobots)) {
  errors.push("Prerendered 404 page is missing a noindex robots directive.");
}

for (const routePath of [
  "/campaign/contractors",
  "/campaign/dental",
  "/campaign/law-firms",
  "/campaign/real-estate",
]) {
  const html = await readFile(join(root, routePath, "index.html"), "utf8");
  const robotsDirectives = [...html.matchAll(/<meta[^>]+name="robots"[^>]+content="([^"]+)"/gi)]
    .map((match) => match[1]);
  if (!robotsDirectives.some((directive) => /noindex/i.test(directive))) {
    errors.push(`Campaign route is missing noindex: ${routePath}`);
  }
}

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectHtmlFiles(fullPath));
    if (entry.isFile() && entry.name.endsWith(".html")) files.push(fullPath);
  }
  return files;
}

for (const htmlPath of await collectHtmlFiles(root)) {
  const html = await readFile(htmlPath, "utf8");
  if (html.includes("—")) errors.push(`Built page contains an em dash: ${htmlPath}`);
}

for (const token of ["%VITE_ANALYTICS_", "maximum-scale", "Book Free Audit"]) {
  if (home.toLowerCase().includes(token.toLowerCase()) || contact.toLowerCase().includes(token.toLowerCase())) {
    errors.push(`Built core journey contains a disallowed token: ${token}`);
  }
}

const homeSchemaTypes = [...home.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
  .map((match) => {
    try {
      return JSON.parse(match[1])["@type"];
    } catch {
      errors.push("Prerendered homepage contains invalid JSON-LD.");
      return null;
    }
  })
  .filter(Boolean);

for (const schemaType of ["Organization", "LocalBusiness", "FAQPage"]) {
  if (!homeSchemaTypes.includes(schemaType)) {
    errors.push(`Prerendered homepage is missing ${schemaType} JSON-LD.`);
  }
}

if (homeSchemaTypes.filter((type) => type === "FAQPage").length !== 1) {
  errors.push("Prerendered homepage must contain exactly one FAQPage JSON-LD block.");
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Built Barrana site controls passed for ${prerenderPaths.length} prerendered routes.`);
}

import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { routes } from "./routes.mjs";

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
  console.log(`Built Barrana site controls passed for ${routes.length} prerendered routes.`);
}

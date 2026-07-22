import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { routes } from "./routes.mjs";

const root = "dist/public";
const errors = [];

for (const required of ["index.html", "sitemap.xml", "robots.txt", "llms.txt"]) {
  if (!existsSync(join(root, required))) errors.push(`Built site is missing ${required}.`);
}

for (const route of routes) {
  const output = route.path === "/"
    ? join(root, "index.html")
    : join(root, route.path, "index.html");
  if (!existsSync(output)) errors.push(`Missing prerendered route: ${route.path}`);
}

const home = await readFile(join(root, "index.html"), "utf8");
const contact = await readFile(join(root, "contact/index.html"), "utf8");
const llms = await readFile(join(root, "llms.txt"), "utf8");
const sitemap = await readFile(join(root, "sitemap.xml"), "utf8");

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

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

if (!home.includes("Find the workflow AI should fix first.")) {
  errors.push("Prerendered homepage is missing the controlled headline.");
}

if (!home.includes("Find the Workflow AI Should Fix First")) {
  errors.push("Prerendered homepage is missing the controlled CTA.");
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

const homeSchemaCount = [...home.matchAll(/type="application\/ld\+json"/g)].length;
if (homeSchemaCount !== 1) {
  errors.push(`Prerendered homepage has ${homeSchemaCount} JSON-LD blocks; expected one controlled entity block.`);
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Built Barrana site controls passed for ${routes.length} prerendered routes.`);
}

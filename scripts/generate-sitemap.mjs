#!/usr/bin/env node
/**
 * Generate sitemap.xml from the routes list.
 * Writes to dist/public/sitemap.xml (post-build) and client/public/sitemap.xml (dev).
 *
 * Usage:  node scripts/generate-sitemap.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { routes } from "./routes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DOMAIN = "https://barrana.ai";
function buildSitemap() {
  const urls = routes.map(({ path: p, priority, changefreq }) => {
    const loc = p === "/" ? DOMAIN + "/" : `${DOMAIN}${p}`;
    return [
      "  <url>",
      `    <loc>${loc}</loc>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority.toFixed(1)}</priority>`,
      "  </url>",
    ].join("\n");
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls.join("\n"),
    "</urlset>",
    "",
  ].join("\n");
}

const xml = buildSitemap();

// Write to dist/public if it exists (post-build), otherwise client/public (dev)
const targets = [
  path.join(ROOT, "dist/public/sitemap.xml"),
  path.join(ROOT, "client/public/sitemap.xml"),
];

for (const target of targets) {
  const dir = path.dirname(target);
  if (fs.existsSync(dir)) {
    fs.writeFileSync(target, xml, "utf-8");
    console.log(`Wrote ${target}  (${routes.length} URLs)`);
  }
}

#!/usr/bin/env node
/**
 * Inlines each pre-rendered page's critical CSS (audit R5, mobile LCP).
 *
 * The site stylesheet is about 186 KB (30 KB compressed) because it covers 100+ pages, and it blocked
 * the first paint of every page. For every pre-rendered index.html in dist/public this step inlines
 * the rules that match elements on that page and moves the full stylesheet <link> to the end of
 * <body>, where it no longer blocks rendering of the content above it. "body" mode needs no inline
 * script, so it works with the CSP (script-src has no 'unsafe-inline').
 *
 * Run after scripts/prerender.mjs. Pages already processed are skipped, so re-running is safe.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Beasties from "beasties";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "../dist/public");
const MARKER = '<meta name="critical-css" content="inlined">';

function findPages(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "assets") out.push(...findPages(full));
    } else if (entry.name === "index.html") {
      out.push(full);
    }
  }
  return out;
}

const beasties = new Beasties({
  path: DIST,
  publicPath: "/",
  preload: "body",
  pruneSource: false,
  inlineFonts: false,
  compress: true,
  logLevel: "warn",
  // Beasties strips pseudo-classes before matching, so selectors built on :where()/:is()/:not()/:has()
  // (Tailwind space-y-*/divide-*, the .site-main heading overrides) would never match and be dropped,
  // which shifted the layout when the full stylesheet arrived. Always keep them.
  allowRules: [/:(where|is|not|has)\(/],
});

const pages = findPages(DIST);
let done = 0;
let skipped = 0;
for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");
  // The SPA shell has no content to take critical rules from; pages done in an earlier run stay as they are.
  if (html.includes(MARKER) || !html.includes('id="root"><')) {
    skipped++;
    continue;
  }
  const processed = await beasties.process(html);
  if (!processed.includes("<style")) throw new Error(`No critical CSS was inlined for ${path.relative(DIST, file)}`);
  fs.writeFileSync(file, processed.replace("</head>", `${MARKER}</head>`), "utf8");
  done++;
}
console.log(`Critical CSS inlined in ${done} pages (${skipped} skipped).`);

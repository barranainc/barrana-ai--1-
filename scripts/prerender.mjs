#!/usr/bin/env node
/**
 * Pre-render script for barrana.ai
 *
 * After Vite builds the SPA into dist/public, this script:
 *   1. Starts a local static HTTP server on the built files
 *   2. Uses puppeteer-core + system Chrome to visit every route
 *   3. Captures the fully-rendered HTML
 *   4. Writes it to dist/public/<route>/index.html
 *
 * Usage:  node scripts/prerender.mjs
 */

import puppeteer from "puppeteer-core";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { routes } from "./routes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "../dist/public");
const PORT = 4174; // avoid clashing with vite preview (4173)
const ORIGIN = `http://localhost:${PORT}`;
const CONCURRENCY = 4; // render N pages in parallel tabs

// ── Detect Chrome path ───────────────────────────────────────────────────────
function findChrome() {
  const candidates = [
    // macOS
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    // Linux
    "/usr/bin/google-chrome-stable",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
    // Windows (WSL)
    "/mnt/c/Program Files/Google/Chrome/Application/chrome.exe",
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  throw new Error(
    "Could not find Chrome/Chromium. Install Google Chrome or set CHROME_PATH env var.",
  );
}

const CHROME_PATH = process.env.CHROME_PATH || findChrome();

// ── Simple static file server ────────────────────────────────────────────────
function createStaticServer(root) {
  const mimeTypes = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".mjs": "application/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".webp": "image/webp",
    ".avif": "image/avif",
  };

  return http.createServer((req, res) => {
    let urlPath;
    try {
      urlPath = decodeURIComponent(req.url.split("?")[0]);
    } catch {
      urlPath = req.url.split("?")[0];
    }

    let filePath = path.join(root, urlPath);

    // If path is a directory, try index.html
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    // If file doesn't exist, serve index.html (SPA fallback)
    if (!fs.existsSync(filePath)) {
      filePath = path.join(root, "index.html");
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || "application/octet-stream";

    try {
      const content = fs.readFileSync(filePath);
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    } catch {
      res.writeHead(500);
      res.end("Internal Server Error");
    }
  });
}

// ── Render a single route ────────────────────────────────────────────────────
async function renderRoute(browser, routePath) {
  const page = await browser.newPage();
  const url = `${ORIGIN}${routePath}`;

  try {
    await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

    // Give React an extra moment to settle hydration / lazy components
    await page.evaluate(() => new Promise((r) => setTimeout(r, 500)));

    const html = await page.content();

    // Determine output path
    const relPath = routePath === "/" ? "/index.html" : `${routePath}/index.html`;
    const outFile = path.join(DIST, relPath);

    // Don't overwrite the original SPA shell at /index.html
    if (routePath === "/") {
      // For the homepage we DO want to overwrite with rendered content
      // but keep a backup of the SPA shell first
      const shellBackup = path.join(DIST, "_shell.html");
      if (!fs.existsSync(shellBackup)) {
        fs.copyFileSync(path.join(DIST, "index.html"), shellBackup);
      }
    }

    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, html, "utf-8");

    return { route: routePath, status: "ok" };
  } catch (err) {
    return { route: routePath, status: "error", error: err.message };
  } finally {
    await page.close();
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  // Validate dist exists
  if (!fs.existsSync(path.join(DIST, "index.html"))) {
    console.error("ERROR: dist/public/index.html not found. Run `vite build` first.");
    process.exit(1);
  }

  const allPaths = routes.map((r) => r.path);
  console.log(`\nPre-rendering ${allPaths.length} routes ...\n`);

  // Start static server
  const server = createStaticServer(DIST);
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Static server listening on ${ORIGIN}`);

  // Launch browser
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });

  console.log(`Browser launched (${CHROME_PATH})\n`);

  const results = [];
  let done = 0;

  // Process routes in batches of CONCURRENCY
  for (let i = 0; i < allPaths.length; i += CONCURRENCY) {
    const batch = allPaths.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(
      batch.map((route) => renderRoute(browser, route)),
    );
    results.push(...batchResults);
    done += batch.length;
    const pct = Math.round((done / allPaths.length) * 100);
    process.stdout.write(`\r  [${pct}%] ${done}/${allPaths.length} routes rendered`);
  }

  console.log("\n");

  // Report
  const errors = results.filter((r) => r.status === "error");
  if (errors.length > 0) {
    console.log(`${errors.length} route(s) had errors:`);
    for (const e of errors) {
      console.log(`  ${e.route}: ${e.error}`);
    }
  }

  const ok = results.filter((r) => r.status === "ok").length;
  console.log(`\nDone. ${ok} pages pre-rendered successfully.`);

  await browser.close();
  server.close();
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

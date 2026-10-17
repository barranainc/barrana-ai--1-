// Rebuilds public/ from the live snapshot plus the audit fixes.
//   node _tools/build.mjs            full build (bundle + prerender + sitemap + reports)
//   node _tools/build.mjs bundle     only re-patch the JS bundle and static files
// Requires Google Chrome (or Edge) (used headless to pre-render every route).
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import os from "node:os";
import { execFile } from "node:child_process";
import { fileURLToPath } from "node:url";
import { indexPatches, plannerPatches, applyPatches } from "./src/patches.mjs";
import { createServer } from "./serve.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, "..");
const SNAP = path.join(HERE, "live-snapshot");
const SRC = path.join(HERE, "src");
const OUT = path.join(ROOT, "public");
const REPORTS = path.join(ROOT, "_reports");
const ORIGIN = "https://barrana.ai";
const cfg = JSON.parse(fs.readFileSync(path.join(SRC, "seo-config.json"), "utf8"));
const routes = JSON.parse(fs.readFileSync(path.join(SRC, "routes.json"), "utf8"));
const log = (...a) => console.log(...a);
const read = (f) => fs.readFileSync(f, "utf8");
const write = (f, s) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, s); };
const hash8 = (s) => crypto.createHash("sha256").update(s).digest("base64url").replace(/[-_]/g, "x").slice(0, 8);

const LIVE_INDEX = "index-CdLHEBIa.js";
const LIVE_PLANNER = "PlannerWizard-BTn3ybin.js";
const LIVE_CSS = "index-C59IYsUO.css";

function buildStatic() {
  log("== Patching bundle");
  fs.rmSync(OUT, { recursive: true, force: true });
  let index = read(path.join(SNAP, "assets", LIVE_INDEX));
  let planner = read(path.join(SNAP, "assets", LIVE_PLANNER));
  index = applyPatches(index, indexPatches(), log);
  planner = applyPatches(planner, plannerPatches(), log);
  const prelude = read(path.join(SRC, "prelude.js")).replace("__SEO_CONFIG__", JSON.stringify({ redirects: cfg.redirects, descriptions: cfg.descriptions }));
  index = prelude + "\n" + index;

  // Index and planner import each other, so both get a name derived from the combined content.
  const h = hash8(index + planner);
  const indexName = `index-${h}.js`;
  const plannerName = `PlannerWizard-${h}.js`;
  index = index.split(`./${LIVE_PLANNER}`).join(`./${plannerName}`);
  planner = planner.split(`./${LIVE_INDEX}`).join(`./${indexName}`);
  write(path.join(OUT, "assets", indexName), index);
  write(path.join(OUT, "assets", plannerName), planner);
  const css = read(path.join(SNAP, "assets", LIVE_CSS)) + read(path.join(SRC, "fixes.css"));
  const cssName = `index-${hash8(css)}.css`;
  write(path.join(OUT, "assets", cssName), css);

  log("== App shell");
  let shell = read(path.join(SNAP, "_shell.html"));
  const a = shell.indexOf('<script id="manus-runtime">');
  const b = shell.indexOf("</script>", a);
  if (a < 0 || b < 0) throw new Error("manus-runtime block not found in shell");
  // Manus editor runtime: 360 KB inline script (second React copy) that the live CSP already blocks.
  shell = shell.slice(0, a) + shell.slice(b + "</script>".length);
  shell = shell.split(`/assets/${LIVE_INDEX}`).join(`/assets/${indexName}`).split(`/assets/${LIVE_CSS}`).join(`/assets/${cssName}`);
  if (!shell.includes('"@type": "Organization",')) throw new Error("Organization JSON-LD not found in shell");
  shell = shell.replace('"@type": "Organization",', `"@type": "Organization",\n      "@id": "${ORIGIN}/#organization",`);
  write(path.join(HERE, ".work", "shell.html"), shell);

  log("== Static files");
  for (const f of ["barrana-logo.png", "barrana-logo-white.png", "meta-pixel.js"]) fs.copyFileSync(path.join(SNAP, f), path.join(OUT, f));
  fs.cpSync(path.join(HERE, "static-extra"), OUT, { recursive: true });
  const rules = Object.entries(cfg.redirects)
    .map(([from, to]) => `RewriteRule ^${from.slice(1).replace(/[.\-]/g, "\\$&")}/?$ ${ORIGIN}${to} [R=301,L]`)
    .join("\n");
  write(path.join(OUT, ".htaccess"), read(path.join(SRC, "htaccess.template")).replace("__REDIRECT_RULES__", rules));
  write(path.join(OUT, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);
  const sm = routes.filter((r) => r.sitemap).map((r) =>
    `  <url>\n    <loc>${ORIGIN}${r.path === "/" ? "/" : r.path}</loc>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`);
  write(path.join(OUT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sm.join("\n")}\n</urlset>\n`);
  log(`  sitemap: ${sm.length} URLs`);
  return { shell, indexName };
}

function findBrowser() {
  const c = [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "/usr/bin/google-chrome", "/usr/bin/chromium", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ];
  const f = c.find((p) => fs.existsSync(p));
  if (!f) throw new Error("No Edge/Chrome found for pre-rendering");
  return f;
}

function dumpDom(browser, url, profile) {
  const args = ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", "--disable-extensions",
    `--user-data-dir=${profile}`, "--virtual-time-budget=15000", "--window-size=1280,900", "--dump-dom", url];
  return new Promise((resolve, reject) =>
    execFile(browser, args, { maxBuffer: 64 * 1024 * 1024, timeout: 90000, windowsHide: true }, (err, stdout) =>
      err && !stdout ? reject(err) : resolve(stdout)));
}

function postProcess(html, route) {
  if (!/^<!doctype/i.test(html.trim())) html = "<!DOCTYPE html>" + html;
  // Belt and braces: no tracking scripts or editor runtime captured in static HTML.
  html = html.replace(/<script[^>]*src="https:\/\/connect\.facebook\.net[^"]*"[^>]*><\/script>/g, "");
  html = html.replace(/<script id="manus-runtime">[\s\S]*?<\/script>/g, "");
  if (route === "/404") {
    html = html.replace(/<link rel="canonical"[^>]*>/g, "").replace(/<meta name="robots" content="[^"]*">/, '<meta name="robots" content="noindex, follow">');
  }
  return html;
}

function checkPage(html, route) {
  const get = (re) => (html.match(re) || [])[1] || "";
  const ld = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const types = [];
  let invalid = 0;
  for (const b of ld) {
    try {
      const j = JSON.parse(b);
      const t = (x) => (Array.isArray(x) ? x.flatMap(t) : x["@graph"] ? x["@graph"].flatMap(t) : [[].concat(x["@type"]).join("/")]);
      types.push(...t(j));
    } catch { invalid++; }
  }
  return {
    path: route,
    title: get(/<title>([^<]*)<\/title>/),
    description: get(/<meta name="description" content="([^"]*)"/),
    canonical: get(/<link rel="canonical" href="([^"]*)"/),
    h1: (get(/<h1[^>]*>([\s\S]*?)<\/h1>/) || "").replace(/<[^>]+>/g, "").trim(),
    jsonld: types.join(" | "),
    breadcrumbLists: types.filter((t) => t === "BreadcrumbList").length,
    invalidJsonLd: invalid,
    escapes: (html.replace(/<script[\s\S]*?<\/script>/g, "").match(/\\u[0-9a-fA-F]{4}/g) || []).length,
    bytes: html.length,
  };
}

async function prerender(shell) {
  log("== Pre-rendering");
  const browser = findBrowser();
  const server = createServer({ root: OUT, prerender: true, shell });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const base = `http://127.0.0.1:${server.address().port}`;
  // Static pages (e.g. /privacy-policy, uploaded by hand on live) are copied from static-extra, not rendered.
  const list = [...routes.filter((r) => !r.static).map((r) => r.path), "/404"];
  const results = [];
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "barrana-prerender-"));
  let next = 0;
  async function worker(w) {
    const profile = path.join(tmp, "p" + w);
    while (next < list.length) {
      const route = list[next++];
      let html = "";
      for (let attempt = 1; attempt <= 3 && !/<h1/.test(html); attempt++) html = await dumpDom(browser, base + route, profile).catch(() => "");
      if (!/<h1/.test(html)) throw new Error("Pre-render produced no <h1> for " + route);
      html = postProcess(html, route);
      write(path.join(OUT, route === "/" ? "" : route, "index.html"), html);
      results.push(checkPage(html, route));
      if (results.length % 20 === 0) log(`  ${results.length}/${list.length}`);
    }
  }
  await Promise.all([0, 1, 2, 3].map(worker));
  server.close();
  fs.rmSync(tmp, { recursive: true, force: true });
  log(`  ${results.length} pages written`);
  return results.sort((a, b) => a.path.localeCompare(b.path));
}

function csv(rows) {
  const cols = Object.keys(rows[0]);
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [cols.join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n") + "\n";
}

const mode = process.argv[2] || "all";
const { shell } = buildStatic();
if (mode === "all") {
  const pages = await prerender(shell);
  write(path.join(REPORTS, "pages-after.csv"), csv(pages));
  const problems = pages.filter((p) => p.path !== "/404" && !p.path.startsWith("/campaign/") &&
    (p.canonical !== ORIGIN + (p.path === "/" ? "" : p.path) && p.canonical !== ORIGIN + "/" ||
     p.description.length < 70 || p.breadcrumbLists > 1 || p.invalidJsonLd || p.escapes));
  log(problems.length ? `!! ${problems.length} pages need attention:\n` + problems.map((p) => "   " + JSON.stringify(p)).join("\n") : "== All page checks passed");
}
if (mode === "all" || mode === "package") buildHostingerPackage();
log("Done.");

// Same layout as the package Hostinger deployed on 5 Oct (hbuilds/last-source): `npm run build` copies
// prebuilt-release/ to dist/, then server.js starts the Express server in dist/index.js.
function buildHostingerPackage() {
  log("== Hostinger Node package");
  const PKG_SRC = path.join(SNAP, "hostinger-package");
  const PKG = path.join(ROOT, "deploy", "hostinger-node");
  fs.rmSync(PKG, { recursive: true, force: true });
  for (const f of ["package.json", "package-lock.json", "server.js", "scripts/use-prebuilt-release.mjs"]) {
    write(path.join(PKG, f), read(path.join(PKG_SRC, f)));
  }
  let server = read(path.join(PKG_SRC, "prebuilt-release", "index.js"));
  const anchor = '  app.use(express.json({ limit: "32kb" }));\n';
  if (server.split(anchor).length !== 2) throw new Error("server anchor not found exactly once");
  server = server.replace(anchor, anchor +
    "  // Audit task 1: retired duplicate URLs, and /index.html variants, 301 to the canonical page.\n" +
    `  const RETIRED_REDIRECTS = ${JSON.stringify(cfg.redirects)};\n` +
    "  app.use((req, res, next) => {\n" +
    '    if (req.method !== "GET" && req.method !== "HEAD") return next();\n' +
    '    const query = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";\n' +
    '    const bare = req.path.length > 1 ? req.path.replace(/\\/+$/, "") : req.path;\n' +
    "    if (RETIRED_REDIRECTS[bare]) return res.redirect(301, RETIRED_REDIRECTS[bare] + query);\n" +
    '    if (/(^|\\/)index\\.html$/.test(req.path)) return res.redirect(301, (req.path.replace(/\\/?index\\.html$/, "") || "/") + query);\n' +
    "    next();\n" +
    "  });\n");
  write(path.join(PKG, "prebuilt-release", "index.js"), server);
  fs.cpSync(OUT, path.join(PKG, "prebuilt-release", "public"), { recursive: true });
  const pages = fs.readdirSync(path.join(PKG, "prebuilt-release", "public"), { recursive: true }).filter((f) => String(f).endsWith("index.html")).length;
  log(`  deploy/hostinger-node: ${pages} pages + patched Express server`);
}

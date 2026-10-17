// Release checks from the brief (tasks 1, 2, 6 and the acceptance checklist).
//   node _tools/verify.mjs http://localhost:5173     (local preview: node _tools/serve.mjs 5173)
//   node _tools/verify.mjs https://barrana.ai        (after deployment)
// Writes _reports/redirect-check.csv and _reports/crawl-<host>.csv, exits 1 if any check fails.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const base = (process.argv[2] || "http://localhost:5173").replace(/\/$/, "");
const ORIGIN = "https://barrana.ai";
const cfg = JSON.parse(fs.readFileSync(path.join(HERE, "src", "seo-config.json"), "utf8"));
const failures = [];
const fail = (m) => failures.push(m);
const csv = (rows) => rows.map((r) => r.map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",")).join("\n") + "\n";
async function get(u) {
  for (let attempt = 1; ; attempt++) {
    try {
      const r = await fetch(base + u, { redirect: "manual", headers: { "user-agent": "barrana-verify" } });
      await r.clone().arrayBuffer(); // surface dropped connections here so they are retried
      return r;
    } catch (e) {
      if (attempt >= 4) throw e;
      await new Promise((ok) => setTimeout(ok, 1500 * attempt));
    }
  }
}

// 1. Retired URLs: exactly one 301 hop to the retained page, which returns 200.
const redirectRows = [["retired_url", "status", "location", "final_status", "expected"]];
for (const [from, to] of Object.entries(cfg.redirects)) {
  const r = await get(from + "?utm_source=check");
  const loc = (r.headers.get("location") || "").replace(ORIGIN, "").replace(base, "");
  const final = loc ? await get(loc) : null;
  redirectRows.push([from, r.status, loc, final?.status, to]);
  if (r.status !== 301 || loc !== to + "?utm_source=check" || final?.status !== 200) fail(`redirect ${from} -> ${r.status} ${loc} (${final?.status})`);
}

// 2. Every sitemap URL: 200, self-canonical in the initial HTML, real description, single BreadcrumbList.
const sitemap = await (await get("/sitemap.xml")).text();
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const rows = [["url", "status", "canonical", "title", "description", "breadcrumb_lists"]];
for (const loc of locs) {
  const p = loc.replace(ORIGIN, "") || "/";
  const r = await get(p);
  const html = r.status === 200 ? await r.text() : "";
  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || "";
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  const crumbs = (html.match(/"@type":"BreadcrumbList"/g) || []).length;
  rows.push([loc, r.status, canonical, title, desc, crumbs]);
  if (r.status !== 200) fail(`${p} status ${r.status}`);
  if (canonical !== loc && !(p === "/" && canonical === ORIGIN + "/")) fail(`${p} canonical ${canonical}`);
  if (desc.length < 70) fail(`${p} weak description "${desc}"`);
  if (crumbs > 1) fail(`${p} has ${crumbs} BreadcrumbList blocks`);
  if (Object.keys(cfg.redirects).includes(p)) fail(`${p} is retired but listed in sitemap`);
}

// 3. Trailing slash, index.html, genuine 404, robots.
// Trailing slash: Apache (.htaccess) answers 301, the Express server answers 308. Both are permanent.
const extra = [["/about/", [301, 308]], ["/index.html", [301]], ["/this-page-does-not-exist-123", [404]], ["/robots.txt", [200]], ["/llms.txt", [200]], ["/privacy-policy", [200]]];
for (const [u, want] of extra) {
  const r = await get(u);
  if (!want.includes(r.status)) fail(`${u} returned ${r.status}, expected ${want.join("/")}`);
}

const host = new URL(base).host.replace(/[:.]/g, "_");
fs.writeFileSync(path.join(HERE, "..", "_reports", "redirect-check.csv"), csv(redirectRows));
fs.writeFileSync(path.join(HERE, "..", "_reports", `crawl-${host}.csv`), csv(rows));
console.log(`Checked ${Object.keys(cfg.redirects).length} redirects and ${locs.length} sitemap URLs on ${base}`);
if (failures.length) {
  console.log("FAILED:\n  " + failures.join("\n  "));
  process.exit(1);
}
console.log("All checks passed.");

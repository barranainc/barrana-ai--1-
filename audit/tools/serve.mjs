// Local server that mirrors public/.htaccess routing:
//   retired URLs -> 301, trailing slash -> 301, /x/index.html -> 301, clean URL -> x/index.html, else 404/index.html (404).
// Usage: node _tools/serve.mjs [port]            (preview of the built site)
// Imported by build.mjs with { prerender: true } to serve the app shell for every page route.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(HERE, "..", "public");
const CFG = JSON.parse(fs.readFileSync(path.join(HERE, "src", "seo-config.json"), "utf8"));

const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "application/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".ico": "image/x-icon",
  ".xml": "application/xml; charset=utf-8", ".txt": "text/plain; charset=utf-8", ".json": "application/json; charset=utf-8",
};

function send(res, status, file, extraHeaders = {}) {
  const body = fs.readFileSync(file);
  res.writeHead(status, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream", ...extraHeaders });
  res.end(body);
}
function redirect(res, to) {
  res.writeHead(301, { Location: to });
  res.end();
}

export function createServer({ root = PUBLIC, prerender = false, shell = null } = {}) {
  return http.createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");
    const q = url.search;
    let p = decodeURIComponent(url.pathname);

    if (prerender && p === "/meta-pixel.js") {
      // Keep tracking scripts out of the pre-rendered HTML.
      res.writeHead(200, { "Content-Type": TYPES[".js"] });
      return res.end("");
    }
    if (p === "/api/lead" || p === "/api/lead.php") {
      res.writeHead(501, { "Content-Type": TYPES[".json"] });
      return res.end(JSON.stringify({ error: "Lead endpoint runs on the production server only" }));
    }
    const bare = p.length > 1 ? p.replace(/\/+$/, "") : p;
    if (CFG.redirects[bare]) return redirect(res, CFG.redirects[bare] + q);
    if (p === "/index.html") return redirect(res, "/" + q);
    if (/^\/.+\/index\.html$/.test(p)) return redirect(res, p.replace(/\/index\.html$/, "") + q);
    if (p.length > 1 && p.endsWith("/")) return redirect(res, bare + q);

    const fsPath = path.join(root, p);
    if (!fsPath.startsWith(root)) { res.writeHead(400); return res.end(); }
    const isFile = fs.existsSync(fsPath) && fs.statSync(fsPath).isFile();
    if (isFile && !(prerender && p.endsWith(".html"))) return send(res, 200, fsPath);

    if (prerender) {
      // Every non-file route gets the bare app shell so the browser renders it fresh.
      if (!path.extname(p)) {
        res.writeHead(200, { "Content-Type": TYPES[".html"] });
        return res.end(shell);
      }
      res.writeHead(404);
      return res.end();
    }

    const page = path.join(fsPath, "index.html");
    if (p !== "/" && bare !== "/404" && fs.existsSync(page)) return send(res, 200, page);
    if (p === "/") return send(res, 200, path.join(root, "index.html"));
    return send(res, 404, path.join(root, "404", "index.html"));
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.argv[2] || 5173);
  createServer().listen(port, () => console.log(`Serving ${PUBLIC} at http://localhost:${port}`));
}

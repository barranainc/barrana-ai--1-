#!/usr/bin/env node
/**
 * Builds the Hostinger deployment package from dist/ (run after `pnpm build:ssg`).
 *
 * Hostinger runs barrana.ai as a Node.js web app that is deployed by uploading a zip in
 * hPanel > Websites > barrana.ai > Deployments. The app's `npm run build` only copies
 * prebuilt-release/ to dist/ and `npm start` runs dist/index.js, so the package carries the
 * already-built site. Output: release/barrana-<version>/ and release/barrana-<version>.zip
 *
 * Usage:  node scripts/package-hostinger.mjs [version]   (default: today's date)
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const version = process.argv[2] || new Date().toISOString().slice(0, 10).replace(/-/g, "");
const name = `barrana-${version}`;
const OUT = path.join(ROOT, "release", name);

for (const required of ["index.js", "public/index.html", "public/sitemap.xml", "public/404/index.html"]) {
  if (!fs.existsSync(path.join(DIST, required))) {
    console.error(`dist/${required} is missing. Run \`pnpm build:ssg\` first.`);
    process.exit(1);
  }
}

let commit = "unknown";
try {
  commit = execFileSync("git", ["rev-parse", "--short", "HEAD"], { cwd: ROOT }).toString().trim();
} catch {
  /* not a git checkout */
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, "scripts"), { recursive: true });
fs.cpSync(DIST, path.join(OUT, "prebuilt-release"), { recursive: true });

fs.writeFileSync(
  path.join(OUT, "package.json"),
  JSON.stringify(
    {
      name: "barrana-ai",
      version: "1.0.0",
      type: "module",
      license: "MIT",
      private: true,
      description: `barrana.ai prebuilt release ${version} (source commit ${commit})`,
      scripts: {
        build: "node scripts/use-prebuilt-release.mjs",
        start: "NODE_ENV=production node dist/index.js",
      },
      dependencies: { express: "^4.22.2", nodemailer: "10.0.16" },
      engines: { node: "20.x" },
      overrides: { "path-to-regexp": "0.1.13", lodash: "4.18.0" },
    },
    null,
    2,
  ) + "\n",
);
fs.writeFileSync(path.join(OUT, "server.js"), 'import "./dist/index.js";\n');
fs.writeFileSync(
  path.join(OUT, "scripts", "use-prebuilt-release.mjs"),
  `import { cpSync, existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const source = resolve("prebuilt-release");
const destination = resolve("dist");

if (!existsSync(resolve(source, "index.js")) || !existsSync(resolve(source, "public/index.html"))) {
  throw new Error("The validated prebuilt release is incomplete.");
}

rmSync(destination, { recursive: true, force: true });
cpSync(source, destination, { recursive: true });
console.log("Validated prerendered release copied to dist.");
`,
);
fs.writeFileSync(
  path.join(OUT, "RELEASE.txt"),
  `barrana.ai release ${version}\nsource commit: ${commit}\nbuilt: ${new Date().toISOString()}\n\nDeploy: hPanel > Websites > barrana.ai > Deployments > upload ${name}.zip (Express preset, Node 20, entry server.js).\nRollback: redeploy the previous row in the same list.\n`,
);

// package-lock.json so Hostinger's `npm install` is reproducible.
execFileSync("npm", ["install", "--package-lock-only", "--ignore-scripts", "--no-audit", "--no-fund"], { cwd: OUT, stdio: "ignore", shell: process.platform === "win32" });

const zip = path.join(ROOT, "release", `${name}.zip`);
fs.rmSync(zip, { force: true });
if (process.platform === "win32") {
  // Windows ships bsdtar in System32; the GNU tar from Git for Windows cannot write zip files.
  const tar = path.join(process.env.SystemRoot || "C:\Windows", "System32", "tar.exe");
  execFileSync(tar, ["-a", "-cf", zip, "-C", OUT, "."]);
} else {
  execFileSync("zip", ["-qr", zip, "."], { cwd: OUT });
}
const pages = fs.readdirSync(path.join(OUT, "prebuilt-release", "public"), { recursive: true }).filter((f) => String(f).endsWith("index.html")).length;
console.log(`Package ready: release/${name}.zip (${pages} pages, source ${commit})`);

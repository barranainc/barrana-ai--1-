# barrana.ai release: hostinger-2026-10-17

This branch is an exact copy of the package deployed to Hostinger on 17 Oct 2026
(hPanel > Websites > barrana.ai > Deployments > `barrana-audit-fixes-20261017.zip`).
It is a prebuilt release, not source: `npm run build` copies `prebuilt-release/` to `dist/`
and `npm start` runs the Express server in `dist/index.js`.

Layout (root = what Hostinger runs):

- `package.json`, `server.js`, `scripts/use-prebuilt-release.mjs` - app entry (Node 20, Express only)
- `prebuilt-release/index.js` - Express server (lead endpoint via Gmail API, security headers, 301s for retired URLs, 404)
- `prebuilt-release/public/` - 222 pre-rendered pages, assets, sitemap, robots, llms.txt
- `audit/tools/` - how this package was produced from the live snapshot: `src/patches.mjs` (44 exact-match
  patches to the bundle), `src/seo-config.json`, `src/routes.json`, `build.mjs`, `verify.mjs`
- `audit/reports/HANDOVER.md` - developer handover for the 13 Oct 2026 SEO/AEO/GEO audit, with evidence CSVs

The React/Vite source lives on `main`. The patches in `audit/tools/src/patches.mjs` are the checklist
for porting these fixes into the source; until that is done, `main` does not contain them.

Rollback on Hostinger: redeploy `barrana-meta-tracking-20261004.zip` from the Deployments list.

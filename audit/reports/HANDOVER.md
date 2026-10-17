# Barrana.ai: audit fixes handover

Date: 15 October 2026. Source brief: *Barrana Website Developer Brief* (audit of 13 October 2026).

## Folder layout

| Path | What it is |
|---|---|
| `public/` | **Deploy this folder** (web root). A fresh copy of the live site (5 October 2026 build) with the fixes below applied. |
| `_tools/live-snapshot/` | Untouched copy of the live bundle, CSS and app shell downloaded on 15 October 2026. The build starts from this snapshot. |
| `_tools/src/` | Everything that is edited by hand: `seo-config.json` (redirects + descriptions), `patches.mjs` (bundle fixes), `prelude.js`, `fixes.css`, `routes.json` (route inventory / sitemap), `htaccess.template`. |
| `_tools/build.mjs` | Rebuilds `public/` (patch bundle, pre-render all 207 pages with headless Chrome, write sitemap/robots/.htaccess). `node _tools/build.mjs` |
| `_tools/serve.mjs` | Local server that follows the same rules as `.htaccess`. `node _tools/serve.mjs 5173` |
| `_tools/verify.mjs` | Release checks (redirects, status codes, canonicals, descriptions, breadcrumbs, 404). `node _tools/verify.mjs https://barrana.ai` |
| `_reports/` | Evidence: crawl before/after, redirect check, per-page checks. |
| `_archive/local-build-2026-07-14/` | The old July files that were in this folder (nothing was deleted). |

There is no React source code in this folder, only the built site. The fixes are applied to the built JavaScript through exact-match patches. Each patch must match the expected number of times, or the build stops. When the real source project is available, port the same changes there. `patches.mjs` lists each one.

## Which version is which (checked 16 October 2026)

| Where | Version | Notes |
|---|---|---|
| **Live (barrana.ai)** | **Deployed 17 Oct 2026 11:40 (PKT): `barrana-audit-fixes-20261017.zip`**, bundle `index-nMMIm2i0.js`. Previous: `barrana-meta-tracking-20261004.zip` (5 Oct 2026 02:00 UTC, bundle `index-CdLHEBIa.js`) plus a hand-uploaded `/privacy-policy` (12 Oct). | Post-deploy check on live passed (200 URLs, 6 redirects, 404, privacy page). Rollback = redeploy the 5 Oct row in hPanel → Deployments. |
| **GitHub source**: `barranainc/barrana-ai--1-` (`main` @ `2403c06`, 9 Oct 2026) | The React/Vite source of the live site (`client/`, `server/`) | Live matches commit `b89bcc7` (5 Oct, "Add Meta Pixel page and lead tracking"). The Privacy Policy commits on `main` (9 Oct) were then uploaded by hand. 9 side branches are unmerged; for example `codex/barrana-route-metadata` ("Fix route metadata fallbacks", 22 Jul) overlaps audit task 2. |
| GitHub `barranainc/barrana-ai` | Old Next.js version, last push 19 Mar 2026 | Obsolete. Not the live site. |
| Local zips in Downloads | `n-barrana-ai-hostinger-deploy.zip` (14 Apr), `barrana-ai-hostinger-final.zip` (20 May), `barrana.ai.zip` (14 Jul) | All older than live. The `public_html (1/2/3).zip` files are the AI Search Ready site, not Barrana. |

Because the source exists, the long-term home for these fixes is the `barrana-ai--1-` repo. `_tools/src/patches.mjs` lists each change so it can be ported there.

### How Hostinger is actually set up (confirmed 16 October from `hbuilds/last-source`)

Hostinger runs barrana.ai as a **Node.js web app**, not as static files. `hbuilds/last-source` (the exact package deployed on 5 Oct 02:00 UTC) contains no React source: it is a *prebuilt* package.

| File | Role |
|---|---|
| `package.json` | `npm run build` only copies `prebuilt-release/` to `dist/`; `npm start` runs `dist/index.js`. Node 20, Express only. |
| `prebuilt-release/index.js` | Express server: security headers, `/api/lead` (sends the lead by **Gmail API**, needs `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN` env vars), serves `public/`, 308 for trailing slashes, 404 via `public/404/index.html`. |
| `prebuilt-release/public/` | 228 pre-rendered pages + assets. Byte-identical to live (bundle, CSS, planner chunk, shell, privacy page all match). |

hPanel → barrana.ai → **Deployments** shows the app as **"Manually uploaded"** (no Git connection). History: `barrana-meta-tracking-20261004.zip` (5 Oct 2026 02:00 UTC, current) and `barrana-release-hardening-npm.zip` (23 Jul 2026, twice). New releases are deployed by uploading a zip on that page.

`hbuilds/versions/` holds **only one version**, so there is no rollback point on the server. A copy of the package (without the 54 MB of pages) is in `_tools/live-snapshot/hostinger-package/`.

Consequences for this handover:
- The old `public/api/lead.php` (GoHighLevel) is **not** how live forms work and has been dropped. Leads go by Gmail API from the Node server; the env vars live in hPanel → Node.js app → Environment variables.
- `deploy/hostinger-node/` is the folder to deploy: the same package layout as `last-source`, with `public/` replaced by the fixed site and the six 301s added to the Express server. `public/.htaccess` is kept only as a fallback for static hosting.
- The package revealed **14 pages and `llms.txt`** that live serves but nothing links to (so the earlier crawl missed them): 4 industry playbooks, 5 industry operator-insight articles, `/industries/clinics`, `/industries/real-estate`, `/services/lead-automation`, `/services/operations-automation`. The playbooks and articles are now listed on their hubs and in the sitemap. The four industry/service pages overlap existing pages and are left out of the sitemap pending an owner decision (keep or 301).

## What was missing locally (synced from live)

The local folder held the 14 July build. Live had moved on to the 5 October build, which has new copy, new bundles, the Meta pixel and different headers. `public/` now matches live, including:
- 186 linked pages (169 in the sitemap plus 17 linked pages that were missing from it) and 27 unlinked pages that live also serves: `/integrations/*` (10), `/ai-automation/*` (13) and `/campaign/*` (4).
- The live assets, `meta-pixel.js` and the security headers (CSP, HSTS, COOP and so on). The headers are copied into `.htaccess`.
- `BingSiteAuth.xml` and the Twilio verification file. Both returned 404 on live, so they have been restored.
- `/privacy-policy`, a static page uploaded to live on 12 Oct. It has been cleaned, added to the sitemap, and linked from the footer, because the Meta ads policy needs it to be reachable.

## Brief tasks: status

| # | Task | Status |
|---|---|---|
| 1 | Consolidate duplicate resource URLs | **Done.** Short URLs are kept. 301s go out in one hop with the query string preserved. Retired routes also redirect during in-app navigation. The sitemap and internal links only use the kept URLs. See `redirect-check-local.csv`. |
| 2 | Replace placeholder meta descriptions | **Done.** The 5 pages from the brief, `/ai-automation-vaughan`, and 11 knowledge and operator-insight pages that had "7 min read" as their description. The cause was the route-level SEO fallback, which read the first `<p>` (a section label). It now uses the approved map and rejects labels. Titles that said "\| Barrana AI" are now "\| Barrana.ai". Descriptions are in the initial HTML and stay correct during in-app navigation (tested). |
| 3 | Align the initial consultation offer | **Waiting for the owner.** See the decisions below. |
| 4 | Formatting, diagrams, timelines | **Done.** The visible `–` and `·` text is fixed. All 12 diagrams on `/services` now show their own service's workflow; invoice, CRM, reporting and AI agents previously showed document-checklist or "By visa type" steps. Timelines on the homepage and in the FAQ now use one definition: about 1–2 weeks of build, live 2–4 weeks after the first call, and 4–10 weeks for a full system. |
| 5 | Results and claims | **Partly done.** The accounting example now shows $52,000 of new revenue, with the $30k–$50k of faster cash flow stated separately as timing, not revenue. The immigration example is split the same way: revenue versus staff capacity. The unsupported "full system payback 30–60 days" lines in those FAQ answers were removed. The owner still needs to verify every number (see below). |
| 6 | Sitemap and internal links | **Done.** The sitemap has 190 canonical 200 URLs: the 17 linked pages that were missing and the 10 integration pages were added, and the 6 retired URLs were removed. Every sitemap page now has at least one HTML link. Changes: Resources now links to all the hubs (planner, calculator, playbooks, templates, before/after, benchmarks, glossary, knowledge, operator insights, case studies, integrations, FAQ); the footer links Resources, Case Studies and FAQ; `/locations` lists all 30 city and industry pages; integration cards link to their detail pages. |
| 7 | Structured data | **Done.** Duplicate BreadcrumbLists are gone: each service, industry and case-study page had 2 JSON-LD blocks plus microdata. There is now one Organization entity (`https://barrana.ai/#organization`), and "Barrana AI" was normalised. Service names no longer carry the title suffix. Placeholder dates (`2025-01-01`, `2024-01-01`) were removed. Article markup was added to guides that had none, such as `/resources/what-is-ai-automation`. Next step: run the Rich Results Test on the deployed URLs. |
| 8 | Pricing page | **Waiting for the owner.** The site currently quotes more than 25 different CAD ranges. |
| 9 | Expertise and case studies | **Waiting for the owner** (evidence, author, real dates). |
| 10 | Performance and measurement | **Partly done.** Removed a 360 KB inline Manus editor runtime from every page. The live CSP already blocked it, so it was dead weight. The average HTML page went from 459 KB to 83 KB (gzip 116 KB to 13 KB). The campaign landing-page form showed "success" even when the submission failed, so leads were silently lost. It now reports the error and only tracks a Lead after a real success. Added `generate_lead` and `planner_complete` events (sent to `dataLayer`, and to gtag if present); both were tested and fire once. A CSS rule had hidden the white headings on 2 dark CTA sections; that is fixed. PageSpeed run on the deployed homepage on 17 Oct (see "Performance after deployment"). **Still to do:** Search Console and Bing setup/sitemap submission (needs account access), and code-splitting of the 2.8 MB JS bundle in the source project. |

## Search Console status

- 17 Oct 2026: indexing requested in Search Console for the changed URLs (homepage, `/services`, `/benchmarks`, `/glossary`, `/automation-roi-calculator`, `/resources/what-is-ai-automation`, `/automation-planner`, `/ai-automation-industries`, `/ai-automation-vaughan`, `/privacy-policy`, `/playbooks/contractor`).
- 17 Oct 2026: `/sitemap.xml` submitted in Search Console. Status **Success**, last read 17 Oct, **200 discovered pages** (matches the sitemap exactly).
- To check in about a week: Pages report → the six retired `/resources/...` URLs should move to "Page with redirect"; the 11 pages above should show the new titles/descriptions in the inspection snapshot.

## Performance after deployment (17 Oct 2026)

PageSpeed Insights, **mobile, lab data** (Lighthouse 13.5, emulated Moto G Power, slow 4G). No field (CrUX) data was shown for the site, so there are no real-user Core Web Vitals yet. Test date: 17 Oct 2026 11:44 PKT. Report: `https://pagespeed.web.dev/analysis/https-barrana-ai/eyavbpykuy?form_factor=mobile`

| Page | Perf | FCP | LCP | TBT | CLS | Speed Index | A11y | Best Practices | SEO |
|---|---|---|---|---|---|---|---|---|---|
| Homepage `/` | 64 | 3.0 s | 8.3 s | 260 ms | 0 | 3.6 s | 97 | 100 | 100 |

Local Lighthouse 12 runs (same mobile preset, same day) are in `_reports/lighthouse/` (`*.report.html`). They ran on a laptop whose CPU was already at 100%, so their scores are **pessimistic and not comparable** to Google's run above; use them only for the relative ordering of pages and for the audit lists.

| Page (local Lighthouse, loaded machine) | Perf | FCP | LCP | TBT | CLS | Speed Index | Total bytes |
|---|---|---|---|---|---|---|---|
| Homepage `/` | 36 | 4.1 s | 10.0 s | 930 ms | 0.02 | 12.7 s | 1,366 KB |
| `/services/lead-response-automation` | 50 | 4.0 s | 4.4 s | 980 ms | 0 | 6.0 s | 1,356 KB |
| `/resources/what-is-ai-automation` | 39 | 3.8 s | 9.7 s | 1,270 ms | 0.04 | 5.4 s | 1,351 KB |

The ~1.35 MB per page is the same on every page: that is the single JS bundle, which is why code splitting is the first fix.

Lighthouse's main findings, in order of impact, and where the fix belongs:
1. **Render-blocking requests, ~1.7 s**: the Google Fonts stylesheet and the 182 KB CSS load before paint. Fix in source: self-host Inter/JetBrains Mono (or `font-display: swap` with preload) and inline critical CSS.
2. **Unused JavaScript, ~468 KiB**: the single 2.8 MB bundle contains every page. Fix in source: route-level code splitting (`React.lazy` per page), which Vite does automatically once pages are imported lazily.
3. **LCP 8.3 s**: the hero waits for the JS bundle to hydrate. Code splitting plus font fixes address most of it.
4. **Image delivery, ~125 KiB**: `barrana-logo.png` is 130 KB; export it as SVG or a ~10 KB WebP.
5. **Cache lifetimes, ~186 KiB**: fonts from Google are served with short cache headers; self-hosting fixes this too.
6. Accessibility 97: one colour-contrast failure flagged on the homepage.

No "before" PageSpeed run exists for 5 Oct; the previous deployment is gone from live. The measurable change we can show is HTML weight (459 KB to 83 KB average per page), which mostly helps parse time, not LCP. The items above need the source repo.

## Decisions for the owner

1. **Consultation offer (task 3).** About 275 strings promise a "Free 60-minute Automation Audit" with a workflow map. `/contact` says there is *no* audit deliverable. Pick one:
   (a) a discovery call, using the brief's wording ("Book a free workflow discovery call…"), or
   (b) an audit with a stated deliverable.
   I can then apply it everywhere (buttons, FAQs, campaign pages, the planner and the contact page).
2. **Numbers (task 5).** Verify the case-study figures, the "$80,000–$200,000 lost per year" claims, "Most businesses see full ROI within 30–60 days", the benchmarks ("based on measured client outcomes"), and the industry and location cost figures. Each needs a source, or it should be labelled illustrative.
3. **Pricing (task 8).** Approve the CAD ranges, what each includes, maintenance, and third-party costs.
4. **Analytics.** Live has no Google Analytics; the July build had `G-HV3XCSXQN0`. The event hooks are ready, but GA has **not** been re-added because the privacy page does not mention it. If you want GA4, say so and update the privacy page.
5. **`/ai-automation/<city>` pages (13).** These are thin versions of `/locations/<city>`, indexable, and not linked anywhere. Recommendation: 301 each to the matching `/locations` page. For now they are left as they are and kept out of the sitemap.
6. **Case-study and article dates and authors.** Supply genuine publication dates and a named author or reviewer (for example Ikram Rana) to add to the markup.
7. **Barrana.ai vs Barrana.io.** Their contact details differ. Confirm the relationship.

## Deployment notes (read before uploading)

- Live is a **Hostinger Node.js web app** (see "How Hostinger is actually set up"). Deploy **`deploy/hostinger-node/`** the same way the 5 Oct package was deployed (upload as the app source, or push it to the repo/branch the Hostinger app is connected to), keeping the existing environment variables. The Express server in that folder already contains the six 301s.
- Do **not** copy `public/` straight into `public_html`: it would bypass the Node app and break `/api/lead`.
- Pre-deploy backups taken on 16 Oct 2026 (both zips tested, no errors): `Downloads/versions.zip` (220 MB, `hbuilds/versions/01a109ca-…`, the live build) and `Downloads/last-source.zip` (109 MB, the deployed package). To roll back, re-upload `last-source.zip` as the app source.
- `deploy/barrana-audit-fixes-20261017.zip` is the ready-to-upload package (same contents as `deploy/hostinger-node/`).
- Forms post to `/api/lead`, handled by the Node server via Gmail API. If the Gmail env vars are missing, the form now shows an error instead of a fake success.
- After deploying: run `node _tools/verify.mjs https://barrana.ai`, submit `https://barrana.ai/sitemap.xml` in Search Console and Bing Webmaster Tools, and inspect a few changed URLs.

## Evidence in `_reports/`

- `crawl-live-before-2026-10-15.csv`: the live crawl (186 URLs) with status, canonical, title and description.
- `crawl-live-after-2026-10-17.csv` and `redirect-check-live-after-2026-10-17.csv`: the release checks run against **live barrana.ai after deployment** (17 Oct). All passed.
- `crawl-node-package-after.csv` and `redirect-check-node-package.csv`: the same checks run against **`deploy/hostinger-node/`** started exactly as Hostinger starts it (`npm ci`, `npm run build`, `npm start`). 200 sitemap URLs, six 301s in one hop with the query string kept, `/api/lead` returns a clean 500 "not configured" without the Gmail env vars (no fake success), unknown URLs return 404.
- `crawl-local-after.csv` and `redirect-check-local.csv`: the same checks against the static `.htaccess` fallback served by `_tools/serve.mjs`.
- `prerender-page-checks.csv`: for all 208 pre-rendered pages, the title, description, canonical, H1, JSON-LD types, breadcrumb count and leftover escapes.

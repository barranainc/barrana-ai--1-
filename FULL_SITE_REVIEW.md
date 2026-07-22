# Barrana.ai Full-Site Review

Last updated: 2026-07-21

Status: discovery complete and the first correction slice is locally validated. Route-level qualitative review remains open.

## Executive finding

Barrana.ai has substantial content and working editable source, but the current public experience is commercially and technically unsafe to scale. Its strongest asset is a concrete workflow vocabulary. Its largest liabilities are unsupported outcome claims, apparent client proof, a free-audit offer that conflicts with the approved paid discovery model, overgrown search architecture, duplicated entity data, accessibility defects, and a repository that does not pass its own type check.

## Source and deployment inventory

- Repository: `barranainc/barrana-ai--1-`.
- Branch baseline: `0d253ffe` from remote `main`.
- Editable application: `client/src/`.
- Public source files: `client/public/`.
- Route registry: `scripts/routes.mjs`.
- Generated output: `dist/`.
- Static pre-render script: `scripts/prerender.mjs`.
- Host: Hostinger hPanel with LiteSpeed.
- Live static fallback returns the homepage application shell for missing files and unknown routes.
- The live homepage and `llms.txt` both returned HTTP 200 and `text/html`; `llms.txt` is therefore missing.

## Route inventory

The sitemap contains 130 URLs:

| Group | Sitemap URLs | Initial disposition |
|---|---:|---|
| Core company pages | 5 | Rewrite and retain. |
| Services | 14 | Consolidate around buyer problems and workflow systems. |
| Industries | 21 | Retain only owner-approved sectors with distinct material. |
| Case studies | 13 | Reclassify as illustrative unless evidence and permission exist. |
| Locations | 37 | High consolidation priority. Remove malformed and thin matrices through redirects. |
| Resources | 13 | Audit for duplication, claims, and buyer value. |
| Calculators and planner | 2 | Retain only with transparent inputs, limits, and event controls. |
| Knowledge, playbooks, glossary, benchmarks, governance, templates, operator insights, integrations, solopreneurs | 10 | Consolidate overlapping hubs. |
| Foundation and pillar pages | 6 | Review for commercial role and duplication with IkramRana.com. |
| Insights | 5 | Retain if original, sourced, and company-commercial in role. |
| Workflow guides | 4 | Strong candidates for the retained commercial architecture. |

Source routes outside the sitemap include four campaign routes, `/404`, and dynamic detail families for knowledge, playbooks, operator insights, integrations, services, industries, locations, and local SEO. These require a source-to-sitemap reconciliation.

## Technical findings

### Critical

1. The lead form reports success even when the CRM submission throws an exception. This can lose leads while telling the prospect the request was received.
2. The live site returns HTTP 200 for unknown routes and for missing `llms.txt`.
3. The type check fails on the baseline branch.
4. The live homepage emits duplicate LocalBusiness and FAQ schema with conflicting social profiles and unsupported outcome claims.

### High

1. The production build contains unresolved Umami placeholders in `client/index.html` and warns during every build.
2. The main minified JavaScript chunk is approximately 2.26 MB, 533 KB gzip.
3. The generated homepage HTML is approximately 371 KB.
4. `node_modules/` is committed with 39,059 paths. `dist/`, `.DS_Store`, and a large ZIP are also tracked.
5. There is no CI configuration, route check, link check, claim scan, or repository README.
6. The sitemap uses the same 2026-03-24 modification date for all 130 URLs, including pages changed later.
7. Source and live `robots.txt` differ. The live version blocks `/blog/`, year archives, categories, and tags even though the current app is not WordPress.

### Medium

1. Remote Google fonts are a rendering and privacy dependency.
2. The current site relies on JavaScript effects for route metadata, then pre-renders through headless Chrome. The generated files must be validated after every build.
3. Campaign routes are not included in the sitemap and need deliberate indexation decisions.
4. Canonical and sitemap route conventions mix trailing and non-trailing slash behavior.

## Content, claim, and offer findings

### Critical

1. The homepage presents `Real Results` and says what automation `actually saved` named business types in specific cities. The source reviewed contains no evidence record or visible illustrative label.
2. Service and case-study pages publish precise savings, revenue, accuracy, capacity, response-time, and payback claims without a visible evidence class.
3. The homepage and site-wide CTA promote a free 60-minute Automation Audit that promises workflow mapping, ROI projection, and a plan to keep. This conflicts with the approved initial conversation and paid Discovery Stage.
4. The site presents prices from $1,500 as implementation prices. The controlled $1,500 amount is for Discovery only and cannot be published until its complete terms are approved.

### High

1. `Full-stack` positioning markets website, social media, advertising, acquisition, and broad consulting services. This dilutes the approved AI adoption and workflow implementation category unless the owner confirms those services.
2. The source repeatedly says `every system` includes controls, documentation, training, monitoring, or data behavior. These are engagement-level requirements, not verified universal facts.
3. Location and industry pages contain unsupported local cost, salary, lead, no-show, revenue, and workflow statistics.
4. Several routes and visible strings use `Canadian` as a city or location label.
5. Audience language repeatedly narrows to small businesses, SMBs, or 2 to 50 staff without an approved reason.

## SEO, AI-search, and entity findings

1. The homepage has one H1 and a self-referencing canonical.
2. Open Graph and X metadata exist.
3. Duplicate FAQ and LocalBusiness schema create conflicting entity signals.
4. Global schema includes unconfirmed legal name, address, coordinates, opening hours, and social profiles.
5. Social profile URLs conflict between source files and schema.
6. The sitemap contains malformed `canadian` paths and large location-industry combinations that risk doorway-page treatment.
7. `llms.txt` is missing in production.
8. The source does not clearly connect Barrana to Ikram Rana as founder in the controlled organization schema.
9. Search engines may continue to index legacy WordPress `/blog/` content while current `robots.txt` blocks crawling that path.

## Accessibility and interaction findings

Verified in the live in-app browser at a 390 by 844 viewport:

1. Browser zoom is restricted by `maximum-scale=1`.
2. No skip-navigation link exists.
3. `<main>` has no ID or programmatic focus target.
4. The mobile menu exposes `aria-expanded` but no `aria-controls` relationship.
5. Escape did not close the open mobile menu.
6. The homepage had 29 pixels of horizontal overflow, with 390 pixel viewport width and 419 pixel document width.
7. Overflow sources included the location trust strip and workflow comparison cards.
8. Contact form labels were visible but not associated with their controls. Accessible names fell back to placeholders.
9. Form controls lacked autocomplete tokens and error-description relationships.

## Analytics and lead measurement

- The source contains a custom planner hook that calls `window.gtag` if available.
- `client/index.html` contains unresolved Umami placeholders.
- No correct Barrana analytics property or consent configuration has been verified.
- Meaningful events still need a controlled measurement plan: primary CTA, form start, qualified progression, confirmed submission, planner completion, scheduling, downloads, and phone or email clicks where relevant.
- Do not add the IkramRana.com GA4 or Clarity identifiers.

## Deployment findings

- Hostinger hPanel and LiteSpeed are verified from response headers.
- The exact web root, upload method, staging capability, backup location, and protected-file inventory are not documented in this repository.
- The existing 18 MB `barrana.ai.zip` requires provenance and release-identity documentation before it can be treated as a deployment or rollback artifact.
- No deployment is authorized by this review.

## First correction slice

Implemented and locally validated:

1. Replace core homepage claims with approved workflow-first positioning.
2. Replace the free-audit entry point with the initial workflow conversation.
3. Fix lead submission truthfulness and form semantics.
4. Fix zoom, skip navigation, main focus, mobile Escape, and route-change menu behavior.
5. Add `llms.txt`, repository guidance, CI, and automated validation.
6. Remove generated dependencies and build output from source control while preserving local reproducibility.

## Open review work

1. Build a route-level disposition register for all 130 sitemap URLs.
2. Review every case-study and testimonial record against private evidence.
3. Confirm service and industry strategy.
4. Consolidate or redirect thin location matrices.
5. Review every page's metadata, schema, internal links, CTA, evidence class, and update owner.
6. Verify calculators and planner formulas, disclaimers, storage, analytics, and lead transmission.
7. Run representative tablet, laptop, wide-screen, keyboard, reduced-motion, contrast, and error-state checks on the corrected local build.

## Validation evidence

Baseline:

- Install from lockfile: passed after clean reinstall.
- Production build: passed with warnings.
- Type check: failed on pre-existing errors.
- Live homepage metadata and schema: inspected.
- Live contact form semantics: inspected.
- Live mobile navigation: inspected, Escape failure reproduced.
- Live horizontal overflow: reproduced.
- Live crawl files and 404 behavior: inspected by HTTP response.

Post-change branch:

- Foundation claim and control scan: passed.
- Type check: passed.
- Production application build: passed with one remaining large-chunk warning. Main JavaScript is approximately 2.12 MB, 502 KB gzip.
- Static rendering: all 130 registered routes completed successfully and the built-artifact control check passed.
- Local homepage and contact routes: inspected at a 390 pixel viewport with zero horizontal overflow.
- Mobile menu: Escape closes the menu and focus returns to the toggle.
- Skip navigation, main focus target, zoom support, form labels, required fields, autocomplete, and live error region: verified.
- Local failed lead submission: displayed an error and did not display a success state.
- `llms.txt`, repository README, CI workflow, and controlled foundation validation: added.
- Generated dependencies, build output, `.DS_Store`, and the 18 MB local ZIP: removed from Git tracking and retained locally through ignore rules.

No production deployment or live verification has been performed for these changes.

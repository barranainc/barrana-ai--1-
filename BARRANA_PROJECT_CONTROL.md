# Barrana Authority and Commercial Platform: Project Control

Last updated: 2026-07-21

Status: Phase 1 implemented and locally validated on `codex/barrana-authority-foundation`; owner review, merge, and deployment remain separate gates.

## Objective

Make Barrana.ai the canonical commercial implementation platform for Barrana, a Canadian AI automation company founded by Ikram Rana. The site must help a business identify a workflow problem, understand the discovery and implementation process, see the human and technical controls involved, and choose a proportionate next step.

Primary entry point: `Find the Workflow AI Should Fix First`

## Authoritative sources

All eight required reference files were accessible and read in full on 2026-07-21:

1. `IKRAM_RANA_AUTOMATION_PROFILE.md`, version 1.1, last updated 2026-07-16.
2. IkramRana.com `FULL_SITE_REVIEW.md`.
3. IkramRana.com `WEBSITE_CHANGES_AND_LIVE_DEPLOYMENT_GUIDE.md`.
4. IkramRana.com `OWNER_REVIEW_AND_DEPLOYMENT.md`.
5. IkramRana.com `CONTENT_AUTHORITY_SYSTEM.md`.
6. IkramRana.com `90_DAY_AUTHORITY_CONTENT_PLAN.md`.
7. IkramRana.com `METHOD_AND_CONCEPT_REGISTER.md`.
8. IkramRana.com `README.md`.

Precedence: latest owner instruction, canonical profile, this project's approved controls, approved branch source, live site as audit material, then historical and third-party material.

## Repository and live state

- Verified repository: `barranainc/barrana-ai--1-`.
- Evidence: the repository contains the current SSG pipeline and the exact live homepage source. The similarly named `barranainc/barrana-ai` is an older, smaller source tree.
- Baseline commit: `0d253ffe` on remote `main`.
- Working branch: `codex/barrana-authority-foundation`.
- Framework: React 19, TypeScript, Vite 7, Wouter, Tailwind CSS, Express, pnpm.
- Editable source: `client/src/` and `client/public/`.
- Generated output: `dist/`.
- Static generation: `scripts/routes.mjs`, `scripts/generate-sitemap.mjs`, and `scripts/prerender.mjs`.
- Production: Hostinger hPanel and LiteSpeed, verified through live response headers.
- Live artifact date: `Last-Modified: Fri, 17 Jul 2026 10:28:05 GMT` when checked on 2026-07-21.
- Live `index.html`: approximately 371 KB before transfer compression.
- Live route fallback: unknown URLs return the application HTML with HTTP 200.
- Live `llms.txt`: missing. The fallback returns the application HTML with HTTP 200.
- Source sitemap: 130 URLs. Four campaign routes and several dynamic route families are outside the sitemap.

## Baseline validation

Inspected before source edits on 2026-07-21:

- `corepack pnpm install --frozen-lockfile`: required a clean reinstall because the committed `node_modules` snapshot was incomplete.
- `corepack pnpm build`: passed after reinstall, with unresolved analytics placeholder warnings and a 2.26 MB minified main JavaScript chunk.
- `corepack pnpm check`: failed on existing TypeScript errors in motion variants, planner props and tuples, and the shared `WorkflowStep` type.
- No repository CI configuration was found.
- No README or repository-level operating guide was found.
- `node_modules/` contains 39,059 tracked paths even though it is listed in `.gitignore`.
- `dist/`, `.DS_Store`, and an 18 MB release ZIP are tracked.

## Current decisions

- Keep Barrana distinct from IkramRana.com. Barrana owns commercial discovery, implementation, support, and measurement.
- Use the approved company description in public core copy.
- Use `businesses` as the default audience word.
- Use the workflow-first CTA consistently.
- Do not publish the $1,500 CAD Discovery Stage price until deliverables, taxes, exclusions, cancellation, fee-credit conditions, and eligibility or expiry terms are approved.
- Treat all current case studies and outcome figures as needing verification unless a private evidence record and publication permission are supplied.
- Do not publish blanket compliance, residency, universal outcome, or Week 1 result promises.
- Preserve the existing navy and burgundy brand equity for the first correction slice.
- Use a workflow decision ledger as the primary visual signature for the new homepage direction.

## Current phase and work order

### Phase 1: control and high-risk correction

Implemented locally:

1. Create the project-control, review, claim, deployment, and content-system files.
2. Correct the homepage and initial conversation journey.
3. Correct accessibility and lead-form defects that are already verified.
4. Establish reproducible repository hygiene, CI, and validation.
5. Re-run checks and representative local browser review.

Post-change validation on 2026-07-21:

- Foundation claim and control scan: passed.
- TypeScript check: passed after repairing baseline motion, planner, and shared workflow types.
- Production application build: passed. The main-bundle size warning remains open.
- Static rendering: all 130 registered routes prerendered successfully; built-artifact validation passed.
- Mobile local preview at 390 pixels: no horizontal overflow.
- Mobile menu: opens, closes with Escape, and returns focus to the toggle.
- Skip link, main focus target, zoom, and form-label associations: verified.
- Local lead endpoint failure: the form displayed an error, retained the form, and did not display a success state.
- Generated dependencies, build output, macOS metadata, and the local release ZIP are no longer tracked. Local files were preserved.

### Next

1. Complete a route-level keep, merge, rewrite, redirect, or remove decision.
2. Obtain owner decisions grouped in the decision register below.
3. Consolidate service, industry, location, proof, and resource architecture.
4. Correct metadata, schema, sitemap, redirects, crawl files, analytics, and event measurement.
5. Prepare a review artifact and separate merge and deployment approvals.

## Risks

| Risk | Status | Required control |
|---|---|---|
| Apparent client results without evidence classification | Verified live/source risk | Remove from core journey; do not republish until evidence and permission are recorded. |
| Free audit conflicts with paid Discovery Stage | Verified live/source conflict | Use initial workflow conversation CTA. Publish paid terms only after owner approval. |
| Universal ROI, timing, savings, and capacity claims | Verified live/source risk | Remove or label as customer-input projections with the approved disclaimer. |
| Malformed `Canadian` location entities | Verified live/source defect | Replace with accurate Canada or city wording and define redirects. |
| Duplicate and conflicting structured data | Verified live risk | Use one controlled organization entity and page-specific supported schema. |
| Unconfirmed social profiles in schema and footer | Verified source risk | Remove until owner confirms official URLs. |
| Missing true 404 behavior | Verified live technical defect | Define Hostinger/static fallback handling and test before deployment. |
| Missing `llms.txt` | Verified live technical defect | Add a controlled machine-readable guide. |
| False-success lead form | Verified source defect | Show success only after a confirmed successful submission. |
| Analytics placeholder and unverified property | Verified source dependency | Remove unresolved placeholder. Do not add an ID without owner confirmation. |
| Tracked dependencies and build output | Verified repository defect | Remove generated dependencies and output from version control in a reviewable maintenance commit. |

## Approval gates and decision register

Owner confirmation is required before publishing or retaining:

1. Canonical public entity name: `Barrana`, `Barrana.ai`, or `Barrana Inc.`
2. Public address, phone, email, opening hours, legal name, and founding year.
3. Official LinkedIn, Instagram, TikTok, Facebook, YouTube, X, and other profile URLs.
4. Discovery Stage deliverables, taxes, exclusions, cancellation terms, credit conditions, and expiry or eligibility rules.
5. Current services outside AI adoption and workflow implementation, especially web, marketing, acquisition, and generic consulting.
6. Industries Barrana intentionally serves and any claimed sector-specific experience.
7. Named or anonymous clients, testimonials, case studies, metrics, logos, screenshots, and publication permissions.
8. Which location pages have genuine local evidence or strategic value.
9. Correct Barrana analytics property, consent requirements, lead-event destinations, and Search Console ownership.
10. Production web root, staging option, deployment method, protected files, backup owner, and rollback owner.

## Completion language

Use these status words precisely: inspected, implemented, tested, owner-confirmed, merged, deployed, and live-verified. A local or merged change is not live until its production URL is checked.

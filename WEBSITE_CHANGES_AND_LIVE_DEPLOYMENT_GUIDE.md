# Barrana.ai Change Register and Live Deployment Guide

Last updated: 2026-07-21

Status: draft control document. No merge or production deployment is authorized.

## 1. Purpose

This file records what changes, how the application is built, what must be preserved, how a release will be reviewed, and how a production change can be rolled back safely.

## 2. Current production picture

- Repository: `barranainc/barrana-ai--1-`.
- Editable source: `client/src/` and `client/public/`.
- Route and sitemap source: `scripts/routes.mjs`.
- Generated output: `dist/public/` and `dist/index.js`.
- Production host: Hostinger hPanel and LiteSpeed, verified from HTTP headers.
- Production deployment method: needs verification.
- Production web root: needs verification.
- Staging or preview destination: needs verification.
- Backup and restore owner: needs verification.
- Current accepted live backup: needs verification.
- Current live artifact identity: HTML last modified 2026-07-17 10:28:05 GMT; homepage ETag observed on 2026-07-21.

## 3. Build identity

Requirements:

- Node.js version: needs a committed control. Current dependencies support the checked local runtime, but no `.nvmrc` or equivalent exists.
- Package manager: pnpm 10.4.1, pinned in `package.json`.
- Install: `corepack pnpm install --frozen-lockfile`.
- Type check: `corepack pnpm check`.
- Application build: `corepack pnpm build`.
- Static pre-render build: `corepack pnpm build:ssg`.

Baseline at commit `0d253ffe`:

- Install: passed after replacing the incomplete committed dependency snapshot.
- Type check: failed.
- Application build: passed with analytics placeholder and bundle-size warnings.
- Static pre-render: not accepted as release-ready until type and route checks pass.

## 4. Functional change register

| Change | State | Validation |
|---|---|---|
| Project control, claim register, full-site review | Implemented in branch | Content reviewed locally. Owner review pending. |
| Homepage workflow-first journey | Implemented in branch | Type check, build, controlled-copy scan, and mobile browser review passed. |
| Initial workflow conversation in place of free audit | Implemented in branch | CTA scan and local route review passed. |
| Honest lead-submission result handling | Implemented in branch | Local endpoint failure showed an error and no success state. Confirmed-success delivery still requires an approved integration test. |
| Form label, autocomplete, and error semantics | Implemented in branch | All visible labels target an existing control; required controls and live error region verified. |
| Skip link, main focus target, mobile Escape | Implemented in branch | Mobile interaction review passed, including focus return. |
| Zoom restriction removal | Implemented in branch | Viewport source and mobile runtime verified. |
| Controlled Organization schema | Implemented in branch | Unconfirmed legal, location, contact, hours, and social fields removed from the global schema. |
| `llms.txt` | Implemented in branch | Included in public source and application build. Production content type still requires live verification. |
| Repository README and CI | Implemented in branch | Local checks pass. Hosted CI requires push or pull request. |
| Foundation claim scan | Implemented in branch | Passes locally and is included in CI. Full legacy-route claim review remains open. |
| Route, sitemap, and built-artifact checks | Implemented in branch | 130 registered routes prerendered successfully and passed generated-output validation. |

## 5. Files and systems to preserve

Before deployment, identify and back up every production item outside the generated frontend. The current repository is not sufficient evidence for the live web-root contents.

Preserve unless a separate approved task changes them:

- `.htaccess` and other server routing configuration.
- Search engine and platform verification files.
- Production environment files and secrets.
- Uploaded or protected downloads.
- Server-side forms, webhook endpoints, or CRM integration files.
- Email, DNS, or application verification files.
- Other applications or directories in the same Hostinger web root.
- Previous accepted hashed assets until verification passes.

Do not delete or replace the full web root.

## 6. Release acceptance criteria

A release candidate must satisfy all of the following:

1. The approved commit is recorded.
2. Frozen-lockfile installation succeeds in a clean environment.
3. Type check, production build, route check, sitemap check, link check, and claim scan pass.
4. Static pre-render output contains the intended canonical, title, description, schema, and content for representative routes.
5. The homepage, initial workflow conversation, service, industry, resource, and 404 routes pass direct-load tests.
6. Mobile navigation, Escape, focus return, skip navigation, zoom, reduced motion, and form errors pass.
7. `robots.txt`, `sitemap.xml`, and `llms.txt` return correct file types and content.
8. No unverified analytics ID, social URL, legal entity field, result claim, or address is introduced.
9. The owner reviews positioning, offer wording, retained claims, and assembled visual direction.
10. Merge approval and deployment approval are recorded separately.

## 7. Pre-deployment procedure

1. Confirm Hostinger account owner, actual web root, deployment method, staging option, CDN behavior, and rollback permissions.
2. Record the current live homepage title, canonical, HTML ETag, Last-Modified value, main asset names, and crawl-file contents.
3. Create a complete dated backup of the accepted live web root, including hidden and unrelated files.
4. Download and test the backup outside the public web root.
5. Record backup file name, size, checksum, location, and restore owner.
6. Build from the approved commit in a controlled clean environment.
7. If packaging a static archive, record its SHA-256 checksum and complete file manifest.
8. Deploy to a preview or staging destination where available.
9. Complete the acceptance checks before requesting production approval.

## 8. Production release procedure

This is a framework until the actual Hostinger method is confirmed.

1. Start the approved maintenance window and record Toronto time.
2. Upload or publish only the reviewed generated files.
3. Preserve the production items listed above.
4. Do not remove previous hashed assets until the new release is accepted.
5. Purge only the relevant Hostinger or CDN cache.
6. Verify the new release in a private browser and normal browser.
7. Remove any uploaded release archive from the public web root after extraction.

## 9. Required live verification

Verify both HTTP behavior and rendered content:

- `/`
- `/start-here`
- `/contact`
- One retained service route.
- One retained industry route.
- One resource or guide.
- One consolidated legacy URL and its redirect.
- A deliberately unknown URL.
- `/robots.txt`
- `/sitemap.xml`
- `/llms.txt`

Also verify:

- Main CTA destination and event.
- Form failure and confirmed-success behavior without sending unauthorized test data.
- Mobile menu and Escape behavior at approximately 390 pixels.
- Keyboard skip link and visible focus.
- No horizontal overflow at representative widths.
- Canonical and schema on representative routes.
- Confirmed Barrana analytics only, if separately approved.
- Phone, email, scheduling, download, and social destinations that the owner approved.
- No site-origin console errors.

## 10. Rollback

Rollback triggers include blank or broken routes, missing assets, incorrect content types, broken form delivery, exposed protected files, wrong analytics, incorrect public claims, severe accessibility regressions, or failed direct-route refreshes.

Procedure:

1. Restore the complete dated pre-deployment backup.
2. Restore hidden, protected, server-only, and unrelated files exactly as they were.
3. Purge the relevant cache.
4. Verify the homepage, a direct client route, contact path, crawl files, and protected assets.
5. Record the incident, rollback time, restored source, and unresolved cause.

## 11. Deployment record

```text
Repository: barranainc/barrana-ai--1-
Approved commit:
Release archive:
Release SHA-256:
Release manifest:
Confirmed Hostinger web root:
Deployment method:
Staging destination:
Pre-deployment backup:
Backup SHA-256:
Backup storage location:
Restore owner:
Deployment approved by:
Deployment started, America/Toronto:
Deployment completed, America/Toronto:
Deployed by:
Verified by:
CDN cache purged:
Critical routes:
404 behavior:
robots.txt:
sitemap.xml:
llms.txt:
Form delivery:
Analytics and events:
Mobile navigation:
Accessibility basics:
Protected assets:
Console and network errors:
Rollback required:
Final status:
```

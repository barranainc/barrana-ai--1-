# Barrana.ai website

This repository contains the Barrana.ai public website. Barrana is the commercial implementation company in the Ikram Rana authority system. The site should help a business identify a repeated workflow, understand the control boundary, and take the next appropriate commercial step.

## Local development

Requirements: Node.js 22 or later and Corepack.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

## Validation

```bash
pnpm validate:foundation
pnpm validate:routes
pnpm check
pnpm build
```

`pnpm build:ssg` regenerates the sitemap and prerenders the route inventory. Run `pnpm validate:build` after the static build.

## Controlled public language

- Approved company description and CTA live in `BARRANA_ENTITY_OFFER_AND_CLAIM_REGISTER.md`.
- Do not publish a free audit offer.
- Do not publish prices, guarantees, client outcomes, ROI claims, legal claims, locations, or social profiles until their evidence and approval state are recorded.
- Use `Illustrative scenario, not a client result.` when a hypothetical example could be mistaken for proof.
- Public copy uses hyphens, commas, colons, or full stops instead of em dashes.

## Project controls

- `BARRANA_PROJECT_CONTROL.md`
- `BARRANA_ENTITY_OFFER_AND_CLAIM_REGISTER.md`
- `FULL_SITE_REVIEW.md`
- `WEBSITE_CHANGES_AND_LIVE_DEPLOYMENT_GUIDE.md`
- `CONTENT_AUTHORITY_SYSTEM.md`
- `90_DAY_COMMERCIAL_AUTHORITY_PLAN.md`

The production repository is `barranainc/barrana-ai--1-`. Deployment and merge require explicit owner approval.

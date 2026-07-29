# Sikhadenge Blog Platform

This directory is the single technical home for the Sikhadenge Blog ecosystem.

## Boundary

Next.js route files remain under `app/blog/**` because App Router routing depends on that location. Route files must stay thin: resolve route parameters, call the Blog module, render the returned view, and expose route metadata. Research, database access, verification, content assembly, quality checks, publishing rules, refresh logic, and shared UI contracts belong under `modules/blog/**`.

## Structure

```text
modules/blog/
├── architecture/      # System design, workflows, scaling and ownership rules
├── config/            # Versioned quality thresholds and platform policy
├── database/          # Blog-only data model, migrations and repositories
├── domain/            # Framework-independent Blog contracts and invariants
├── research/          # Source discovery, snapshots, evidence and claim verification
├── content/           # Page blueprints, sections, FAQs, examples and content versions
├── quality/           # Exact, near-duplicate, semantic, citation and thin-content checks
├── publishing/        # Index eligibility, sitemap, canonical and publication lifecycle
├── refresh/           # Source expiry, stale claims and scheduled re-verification
├── application/       # Use cases that coordinate the domain and infrastructure layers
├── ui/                # Shared Blog presentation components and view-model builders
└── index.ts            # Public module exports only
```

Directories are introduced incrementally. No route or production database is migrated until its replacement passes validation.

## Non-negotiable invariants

1. A URL is not publishable merely because its slug is unique.
2. Every publishable page requires a distinct primary intent and a page-specific blueprint.
3. Every material factual claim must map to verified evidence.
4. Shared fallback prose cannot make a page index-eligible.
5. Exact duplicates, unsafe near-duplicates, unsupported claims, stale evidence, and thin pages fail the publication gate.
6. Failed pages are not added to public sitemaps and are not marked `index,follow`.
7. Published content is versioned and auditable; updates never destroy the previous published version.
8. Generated content is a draft input, not verified evidence.
9. The platform must remain useful even when search engines do not index a page.
10. No workflow may promise rankings, crawling, indexing, traffic, employment, or income.

## Scale target

The architecture is designed to manage at least 500,000 page blueprints and the related multi-million-row evidence, section, fingerprint, audit, version, and link datasets. Scale is achieved through indexed relational data, immutable versions, batched quality runs, deterministic fingerprints, resumable jobs, and optional partitioning of high-volume history tables.

## Migration rule

The current routes and data sources remain operational while the new platform is introduced behind repositories and feature flags. Migration happens family by family:

1. inventory and fingerprint existing pages;
2. create page blueprints and source requirements;
3. verify claims and assemble a version;
4. run quality gates;
5. preview and approve;
6. switch the route family to the Blog module;
7. monitor crawl, index eligibility, errors, and freshness;
8. retire only the superseded fallback path.

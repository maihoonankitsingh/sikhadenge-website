# Blog Database Boundary

The Blog content platform uses dedicated models and repositories. Existing production models, including `public.Blog`, remain untouched during the foundation and import phases.

## Naming strategy

Prisma models use the `BlogContent*` prefix. Physical PostgreSQL tables use the `blog_content_*` prefix through `@@map`. This keeps the new platform isolated without forcing every unrelated production model to adopt Prisma multi-schema annotations.

Examples:

- `BlogContentPage` -> `blog_content_pages`
- `BlogContentPageVersion` -> `blog_content_page_versions`
- `BlogContentSourceSnapshot` -> `blog_content_source_snapshots`
- `BlogContentQualityFinding` -> `blog_content_quality_findings`

## Planned model groups

### Taxonomy and intent

- topic
- entity
- audience
- industry
- location
- intent
- page-to-taxonomy relations
- primary-intent ownership

### Pages and versions

- page
- page blueprint version
- content version
- ordered section
- FAQ
- media reference
- redirect/canonical decision

### Research and verification

- source publisher
- source URL
- immutable source snapshot
- atomic claim
- claim evidence
- claim conflict
- verification review

### Quality and uniqueness

- fingerprint
- similarity candidate
- quality run
- quality finding
- publication decision
- approved exception

### Publishing and lifecycle

- publication
- sitemap eligibility
- internal link edge
- refresh policy
- refresh job
- job checkpoint
- audit event

## Repository rule

Application code must not import Prisma directly outside `modules/blog/database/**`. Repositories expose domain-oriented operations such as:

- reserve a primary intent;
- save an immutable source snapshot;
- verify or invalidate a claim;
- create a page version;
- store fingerprints and similarity candidates;
- record a quality decision;
- publish, noindex, consolidate, redirect, or retire a page;
- claim and checkpoint a resumable refresh job.

This boundary allows future changes to indexing, partitioning, read replicas, vector storage, or archival systems without rewriting route code.

## Migration safety

1. Schema changes are developed on an isolated feature branch.
2. Migration SQL is generated but not applied automatically.
3. SQL is reviewed for destructive statements, locks, extension changes, and unexpected public-table changes.
4. Prisma validation and a clean production build must pass.
5. A disposable or staging database receives the migration first.
6. Import and rollback tests run with representative batches.
7. Production backup and restore instructions are recorded.
8. Production migration is applied under an explicit maintenance procedure.
9. No existing Blog record is deleted during initial import.

## Extension policy

`pgcrypto` is already installed and may support UUIDs or hashing where database-side operations are justified. `pg_trgm` may be introduced through a reviewed isolated migration for indexed near-duplicate search. Semantic vector storage is optional and must not block exact, shingle, or trigram quality checks.

## Scale design

The schema will use:

- compact immutable IDs;
- unique constraints for canonical slugs, intent ownership, version numbers, and evidence bindings;
- composite indexes matching queue, publication, refresh, and similarity access patterns;
- cursor-based batch processing;
- idempotency keys for ingestion and generation jobs;
- append-only history for snapshots, quality findings, and audit events;
- soft retirement rather than destructive deletion;
- JSON only for variable evidence details, never as a replacement for core relational keys;
- future partition keys on time-ordered high-volume tables.

The initial migration will create schema only. It will not generate, publish, index, or import 500,000 pages.

# Blog Content Platform Architecture

## Objective

Build a Blog-only content platform that can research, verify, version, quality-check, publish, refresh, and audit a very large number of pages without turning slug variations into duplicate or low-value content.

The platform treats a page as a verified knowledge product, not as a string template.

## End-to-end flow

```text
Topic opportunity
  -> Intent and audience analysis
  -> Page blueprint
  -> Source requirements
  -> Source snapshot
  -> Atomic claims
  -> Evidence verification
  -> Section plan
  -> Draft content version
  -> Citation binding
  -> Duplicate and quality analysis
  -> Editorial review
  -> Publication decision
  -> Sitemap/index eligibility
  -> Freshness monitoring
  -> Re-verification or retirement
```

## Layers

### 1. Topic and intent graph

Stores topics, entities, audiences, industries, locations, skill levels, jobs-to-be-done, query intents, and relationships. A page must own one primary intent and may cover supporting intents. Two pages cannot be index-eligible when they compete for the same primary intent and provide materially equivalent answers.

### 2. Page blueprint

A blueprint defines the page before prose is written:

- canonical slug;
- primary and supporting intent;
- target audience and prerequisite level;
- unique angle and user outcome;
- required entities and questions;
- required evidence types;
- required sections;
- excluded claims or unsafe promises;
- freshness class;
- minimum quality policy version.

Blueprints are versioned. A slug change or intent change requires an explicit canonical/redirect decision.

### 3. Source and evidence graph

A source record represents the publisher and canonical URL. A source snapshot stores the retrieved state used during verification. Snapshots are immutable and carry retrieval time, content hash, language, authority tier, licence/usage notes, and freshness metadata.

Claims are atomic, reviewable statements. Evidence records connect a claim to one or more source snapshots with support type, evidence location, verifier, confidence, effective dates, and expiry.

A generated paragraph is never accepted as a source.

### 4. Versioned content assembly

Each page has immutable content versions. A version contains ordered structured sections rather than one opaque HTML field. Sections may represent a direct answer, explanation, steps, comparison, example, limitation, mistake, tool, FAQ, source note, conclusion, or CTA.

Each factual section declares the claims it uses. Rendering is separate from storage, allowing the same verified version to power HTML, structured data, snippets, feeds, and future interfaces.

### 5. Uniqueness and duplication controls

Quality checks operate at several levels:

- unique canonical slug;
- unique primary intent ownership;
- exact normalised hash for title, answer, section, FAQ, and full body;
- token/shingle similarity for near-duplicate detection;
- repeated-template ratio;
- section-level similarity across the same topic cluster;
- optional embedding-based semantic similarity when a vector service is introduced;
- cannibalisation detection using intent, entities, audience, and answer overlap.

Similarity is a review signal, not the only decision. Necessary shared definitions or legal wording may be allowed through documented exceptions.

### 6. Quality gate

A version receives independent checks for:

- evidence coverage;
- source authority and freshness;
- unsupported or conflicting claims;
- exact and near duplication;
- thin or repetitive sections;
- intent satisfaction;
- title/H1/canonical consistency;
- internal-link relevance;
- schema-to-visible-content consistency;
- unsafe guarantees or fabricated proof;
- readability and accessibility;
- broken links and missing media attribution.

The final publication decision is persisted with the policy version, check results, reviewer, and override reason. Overrides are exceptional and auditable.

### 7. Publication and index eligibility

Publishing and indexing are separate decisions. A page can be published for users while remaining excluded from indexing.

Only a version that passes the active quality policy may become the current index-eligible version. Sitemap generation reads publication decisions from the database; it does not infer eligibility from the existence of a route.

Invalid slugs return a real 404. Superseded slugs use explicit redirects or canonical consolidation. Sitemap `lastmod` changes only after a material published update.

### 8. Refresh and lifecycle

Every source, claim, page, and section has a freshness class. Product features, prices, policies, regulations, dates, and platform limits expire faster than stable instructional concepts.

A refresh scheduler creates resumable jobs for:

- expired evidence;
- changed source hashes;
- broken sources;
- conflicting newer evidence;
- decayed traffic or engagement signals;
- outdated year-specific pages;
- pages that fail a newer quality policy.

A stale page may be queued for re-verification, consolidated, redirected, noindexed, unpublished, or archived. History remains available for audit and rollback.

## Storage strategy

The first implementation uses PostgreSQL and Prisma. Blog tables use a consistent `BlogContent*` Prisma model prefix and `blog_content_*` physical table names so they remain isolated from the existing `public.Blog` table without forcing a risky migration of unrelated production models.

High-volume append-only tables such as source snapshots, quality findings, job events, fingerprints, and audit events are designed so PostgreSQL partitioning can be added later without changing domain contracts.

`pgcrypto` supplies stable database-side UUID and hashing capabilities where required. `pg_trgm`, after an isolated reviewed migration, can accelerate indexed near-duplicate searches. Semantic vectors remain optional and are not a dependency for the initial release.

## Application boundary

`app/blog/**` owns routing only. `modules/blog/**` owns Blog behaviour. Components outside the module consume stable view models or public exports and do not query Blog tables directly.

Database access is allowed only through Blog repositories. Background jobs call Blog application services. Direct SQL is restricted to migrations, controlled maintenance, and measured performance paths with tests.

## Delivery phases

1. Module boundary and contracts.
2. Database schema and migration validation without applying to production.
3. Existing 120,097-page inventory import and fingerprint baseline.
4. Research/source/claim ingestion.
5. Quality engine and publication gate.
6. Pilot family migration.
7. Batch migration with resumable jobs and audit reports.
8. Continuous refresh and index-eligibility monitoring.
9. Expansion toward 500,000 qualified blueprints only as verified coverage grows.

## Safety constraints

- No automatic bulk publication.
- No automatic `index,follow` merely because generation succeeded.
- No unsupported facts, statistics, testimonials, ratings, scarcity, earnings, or ranking claims.
- No deletion or overwrite of existing production Blog data during the foundation phase.
- No production migration until schema validation, migration SQL review, backup, rollback plan, staging build, and sample data tests pass.

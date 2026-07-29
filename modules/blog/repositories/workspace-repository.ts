import "server-only";

import { blogContentDb } from "@/modules/blog/database/client";

export const CANONICAL_BLOG_WORKSPACE_ID =
  "blog-workspace-sikhadenge-v1" as const;
export const CANONICAL_BLOG_WORKSPACE_KEY = "sikhadenge-blog" as const;

export type BlogWorkspaceSafetySettings = Readonly<{
  qualityPolicyKey: string;
  publicationDefault: "blocked";
  indexEligibilityDefault: "BLOCKED";
  requiresPassedQualityGate: true;
  requiresEditorialApproval: true;
  defaultRobotsDirective: "noindex,follow";
}>;

export type CanonicalBlogWorkspace = Readonly<{
  id: typeof CANONICAL_BLOG_WORKSPACE_ID;
  key: typeof CANONICAL_BLOG_WORKSPACE_KEY;
  name: string;
  locale: string;
  defaultCanonicalHost: string;
  targetPageCapacity: number;
  settings: BlogWorkspaceSafetySettings;
  createdAt: Date;
  updatedAt: Date;
}>;

export type BlogPlatformCounts = Readonly<{
  workspaces: number;
  topics: number;
  audiences: number;
  searchIntents: number;
  sources: number;
  claims: number;
  pages: number;
  pageVersions: number;
  publications: number;
  qualityRuns: number;
  refreshJobs: number;
}>;

export type BlogPlatformBaseline = Readonly<{
  workspace: CanonicalBlogWorkspace;
  counts: BlogPlatformCounts;
}>;

export class BlogRepositoryInvariantError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = "BlogRepositoryInvariantError";
    this.code = code;
  }
}

function invariant(condition: unknown, code: string, message: string): asserts condition {
  if (!condition) {
    throw new BlogRepositoryInvariantError(code, message);
  }
}

function parseSafetySettings(value: unknown): BlogWorkspaceSafetySettings {
  invariant(
    typeof value === "object" && value !== null && !Array.isArray(value),
    "WORKSPACE_SETTINGS_INVALID",
    "Canonical Blog workspace settings must be a JSON object.",
  );

  const settings = value as Record<string, unknown>;

  invariant(
    settings.qualityPolicyKey === "blog-production-v1",
    "QUALITY_POLICY_MISMATCH",
    "Canonical Blog workspace quality policy is not blog-production-v1.",
  );
  invariant(
    settings.publicationDefault === "blocked",
    "PUBLICATION_DEFAULT_MISMATCH",
    "Canonical Blog workspace publication default must remain blocked.",
  );
  invariant(
    settings.indexEligibilityDefault === "BLOCKED",
    "INDEX_DEFAULT_MISMATCH",
    "Canonical Blog workspace index eligibility must remain BLOCKED.",
  );
  invariant(
    settings.requiresPassedQualityGate === true,
    "QUALITY_GATE_DISABLED",
    "Canonical Blog workspace must require a passed quality gate.",
  );
  invariant(
    settings.requiresEditorialApproval === true,
    "EDITORIAL_GATE_DISABLED",
    "Canonical Blog workspace must require editorial approval.",
  );
  invariant(
    settings.defaultRobotsDirective === "noindex,follow",
    "ROBOTS_DEFAULT_MISMATCH",
    "Canonical Blog workspace robots default must remain noindex,follow.",
  );

  return {
    qualityPolicyKey: "blog-production-v1",
    publicationDefault: "blocked",
    indexEligibilityDefault: "BLOCKED",
    requiresPassedQualityGate: true,
    requiresEditorialApproval: true,
    defaultRobotsDirective: "noindex,follow",
  };
}

export async function getCanonicalBlogWorkspace(): Promise<CanonicalBlogWorkspace> {
  const workspace = await blogContentDb.blogContentWorkspace.findUnique({
    where: { id: CANONICAL_BLOG_WORKSPACE_ID },
    select: {
      id: true,
      key: true,
      name: true,
      locale: true,
      defaultCanonicalHost: true,
      targetPageCapacity: true,
      settings: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  invariant(
    workspace !== null,
    "CANONICAL_WORKSPACE_MISSING",
    "Canonical Blog workspace is missing from production storage.",
  );
  invariant(
    workspace.id === CANONICAL_BLOG_WORKSPACE_ID,
    "WORKSPACE_ID_MISMATCH",
    "Canonical Blog workspace ID is invalid.",
  );
  invariant(
    workspace.key === CANONICAL_BLOG_WORKSPACE_KEY,
    "WORKSPACE_KEY_MISMATCH",
    "Canonical Blog workspace key is invalid.",
  );
  invariant(
    workspace.locale === "en-IN",
    "WORKSPACE_LOCALE_MISMATCH",
    "Canonical Blog workspace locale must remain en-IN.",
  );
  invariant(
    workspace.defaultCanonicalHost === "https://sikhadenge.in",
    "CANONICAL_HOST_MISMATCH",
    "Canonical Blog workspace host must remain https://sikhadenge.in.",
  );
  invariant(
    workspace.targetPageCapacity === 500000,
    "PAGE_CAPACITY_MISMATCH",
    "Canonical Blog workspace target capacity must remain 500000.",
  );

  return {
    ...workspace,
    id: CANONICAL_BLOG_WORKSPACE_ID,
    key: CANONICAL_BLOG_WORKSPACE_KEY,
    settings: parseSafetySettings(workspace.settings),
  };
}

export async function getBlogPlatformBaseline(): Promise<BlogPlatformBaseline> {
  const [
    workspace,
    workspaces,
    topics,
    audiences,
    searchIntents,
    sources,
    claims,
    pages,
    pageVersions,
    publications,
    qualityRuns,
    refreshJobs,
  ] = await Promise.all([
    getCanonicalBlogWorkspace(),
    blogContentDb.blogContentWorkspace.count(),
    blogContentDb.blogContentTopic.count(),
    blogContentDb.blogContentAudience.count(),
    blogContentDb.blogContentSearchIntent.count(),
    blogContentDb.blogContentSource.count(),
    blogContentDb.blogContentClaim.count(),
    blogContentDb.blogContentPage.count(),
    blogContentDb.blogContentPageVersion.count(),
    blogContentDb.blogContentPublication.count(),
    blogContentDb.blogContentQualityRun.count(),
    blogContentDb.blogContentRefreshJob.count(),
  ]);

  invariant(
    workspaces === 1,
    "WORKSPACE_COUNT_MISMATCH",
    `Expected exactly one Blog workspace, found ${workspaces}.`,
  );

  return {
    workspace,
    counts: {
      workspaces,
      topics,
      audiences,
      searchIntents,
      sources,
      claims,
      pages,
      pageVersions,
      publications,
      qualityRuns,
      refreshJobs,
    },
  };
}

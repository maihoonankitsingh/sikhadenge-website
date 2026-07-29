import type {
  BlogPublicationState,
  BlogQualityCheckCode,
  BlogWorkflowState,
} from "@/modules/blog/config/content-quality";

export type BlogId = string;
export type IsoDateTime = string;

export type BlogIntentType =
  | "INFORMATIONAL"
  | "HOW_TO"
  | "COMPARISON"
  | "COMMERCIAL_INVESTIGATION"
  | "NAVIGATIONAL"
  | "LOCAL"
  | "TRANSACTIONAL";

export type BlogSourceAuthorityTier =
  | "PRIMARY_OFFICIAL"
  | "PRIMARY_RESEARCH"
  | "GOVERNMENT_OR_STANDARD"
  | "TRUSTED_SECONDARY"
  | "CONTEXT_ONLY"
  | "REJECTED";

export type BlogClaimStatus =
  | "DRAFT"
  | "VERIFIED"
  | "CONFLICTED"
  | "STALE"
  | "REJECTED";

export type BlogFreshnessClass =
  | "FAST_CHANGING"
  | "QUARTERLY"
  | "ANNUAL"
  | "STABLE"
  | "EVENT_DRIVEN";

export type BlogSectionKind =
  | "DIRECT_ANSWER"
  | "INTRODUCTION"
  | "EXPLANATION"
  | "STEPS"
  | "EXAMPLE"
  | "COMPARISON"
  | "LIMITATIONS"
  | "MISTAKES"
  | "TOOLS"
  | "FAQ"
  | "SOURCE_NOTE"
  | "CONCLUSION"
  | "CTA";

export interface BlogPageBlueprint {
  id: BlogId;
  slug: string;
  canonicalUrl: string;
  primaryIntentKey: string;
  intentType: BlogIntentType;
  supportingIntentKeys: string[];
  audienceKeys: string[];
  topicKeys: string[];
  entityKeys: string[];
  uniqueAngle: string;
  userOutcome: string;
  requiredQuestionKeys: string[];
  requiredEvidenceTypes: string[];
  requiredSectionKinds: BlogSectionKind[];
  excludedClaimPatterns: string[];
  freshnessClass: BlogFreshnessClass;
  qualityPolicyVersion: string;
  workflowState: BlogWorkflowState;
  createdAt: IsoDateTime;
  updatedAt: IsoDateTime;
}

export interface BlogSourceReference {
  id: BlogId;
  canonicalUrl: string;
  publisherName: string;
  authorityTier: BlogSourceAuthorityTier;
  language: string;
  retrievedAt: IsoDateTime;
  effectiveFrom?: IsoDateTime;
  expiresAt?: IsoDateTime;
  contentHash: string;
  snapshotLocation: string;
  licenceNotes?: string;
}

export interface BlogVerifiedClaim {
  id: BlogId;
  claimKey: string;
  statement: string;
  status: BlogClaimStatus;
  confidence: number;
  freshnessClass: BlogFreshnessClass;
  verifiedAt?: IsoDateTime;
  expiresAt?: IsoDateTime;
  supportingSourceIds: BlogId[];
  contradictingSourceIds: BlogId[];
  reviewerId?: BlogId;
}

export interface BlogContentSection {
  id: BlogId;
  sectionKey: string;
  kind: BlogSectionKind;
  heading?: string;
  bodyMarkdown: string;
  claimIds: BlogId[];
  sourceIds: BlogId[];
  position: number;
  normalisedHash: string;
  substantiveWordCount: number;
}

export interface BlogContentVersion {
  id: BlogId;
  pageId: BlogId;
  versionNumber: number;
  title: string;
  description: string;
  directAnswer: string;
  sections: BlogContentSection[];
  fullBodyHash: string;
  normalisedBodyHash: string;
  workflowState: BlogWorkflowState;
  createdAt: IsoDateTime;
  createdBy: string;
  generationRunId?: BlogId;
}

export interface BlogQualityFinding {
  id: BlogId;
  checkCode: BlogQualityCheckCode;
  passed: boolean;
  severity: "INFO" | "WARNING" | "BLOCKER";
  score?: number;
  threshold?: number;
  relatedPageId?: BlogId;
  relatedVersionId?: BlogId;
  evidence: Record<string, unknown>;
  message: string;
}

export interface BlogQualityDecision {
  pageId: BlogId;
  versionId: BlogId;
  policyVersion: string;
  passed: boolean;
  indexEligible: boolean;
  findings: BlogQualityFinding[];
  reviewedBy?: BlogId;
  overrideReason?: string;
  decidedAt: IsoDateTime;
}

export interface BlogPublicationRecord {
  pageId: BlogId;
  versionId: BlogId;
  state: BlogPublicationState;
  canonicalUrl: string;
  indexEligible: boolean;
  sitemapEligible: boolean;
  publishedAt?: IsoDateTime;
  materiallyModifiedAt?: IsoDateTime;
  retiredAt?: IsoDateTime;
}

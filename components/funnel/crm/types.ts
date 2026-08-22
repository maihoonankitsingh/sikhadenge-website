export type CrmProfile = {
  pipelineStage: string;
  owner: string | null;
  priority: string;
  advisorStatus: string;
  qualification: string | null;
  lostReason: string | null;
  nextFollowUpAt: string | null;
  lastContactAt: string | null;
  updatedBy: string | null;
};

export type CrmListItem = {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: { funnel: string; offerMode: string };
  rawStatus: string;
  createdAt: string;
  latestAt: string;
  lifecycle: { key: string; label: string; rank: number };
  revenue: {
    entryRevenue: number;
    workshopRevenue: number;
    coreRevenue: number;
    refundValue: number;
    grossRevenue: number;
    netRevenue: number;
  };
  crm: CrmProfile;
  attribution: {
    source: string;
    medium: string;
    campaign: string;
    campaignId: string;
    adsetId: string;
    adId: string;
  };
};

export type CrmOptions = {
  pipelineStages: readonly string[];
  priorities: readonly string[];
  advisorStatuses: readonly string[];
  qualifications?: readonly string[];
  lostReasons?: readonly string[];
};

export type CrmTimelineItem = {
  id: string;
  type: "funnel_event" | "payment" | "crm_activity";
  title: string;
  at: string;
  value: number | null;
  metadata: any;
};

export type LearnerDetail = {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: { funnel: string; offerMode: string };
  rawStatus: string;
  createdAt: string;
  updatedAt: string;
  lifecycle: { key: string; label: string; rank: number };
  revenue: CrmListItem["revenue"];
  crm: CrmProfile;
  attribution: Record<string, string>;
  registration: Record<string, string>;
};

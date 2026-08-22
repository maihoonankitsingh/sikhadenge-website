import type { GetServerSideProps } from "next";
import WorkshopPage from "../../../components/funnel/workshop/WorkshopPage";
import { getFunnelConfig } from "../../../data/funnels";
import { resolveFunnelLeadContext } from "../../../lib/funnel/serverLeadContext";
import type { OfferMode } from "../../../lib/funnel/types";

type Props = { offerMode: OfferMode };

function ClaudeWorkshopPage({ offerMode }: Props) {
  return <WorkshopPage config={getFunnelConfig("claude", offerMode)} />;
}

(ClaudeWorkshopPage as typeof ClaudeWorkshopPage & { hideGlobalHeader?: boolean }).hideGlobalHeader = true;

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const leadId = typeof query.lead_id === "string" ? query.lead_id.slice(0, 120) : "";
  const context = await resolveFunnelLeadContext({ leadId, funnel: "claude" });
  return { props: { offerMode: context.offerMode } };
};

export default ClaudeWorkshopPage;

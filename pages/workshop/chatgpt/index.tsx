import type { GetServerSideProps } from "next";
import WorkshopPage from "../../../components/funnel/workshop/WorkshopPage";
import { getFunnelConfig } from "../../../data/funnels";
import { resolveFunnelLeadContext } from "../../../lib/funnel/serverLeadContext";
import type { OfferMode } from "../../../lib/funnel/types";

type Props = { offerMode: OfferMode };

function ChatGPTWorkshopPage({ offerMode }: Props) {
  return <WorkshopPage config={getFunnelConfig("chatgpt", offerMode)} />;
}

(ChatGPTWorkshopPage as typeof ChatGPTWorkshopPage & { hideGlobalHeader?: boolean }).hideGlobalHeader = true;

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const leadId = typeof query.lead_id === "string" ? query.lead_id.slice(0, 120) : "";
  const context = await resolveFunnelLeadContext({ leadId, funnel: "chatgpt" });
  return { props: { offerMode: context.offerMode } };
};

export default ChatGPTWorkshopPage;

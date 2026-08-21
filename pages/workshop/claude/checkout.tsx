import type { GetServerSideProps } from "next";
import CheckoutPage from "../../../components/funnel/CheckoutPage";
import { getFunnelConfig } from "../../../data/funnels";
import { resolveFunnelLeadContext } from "../../../lib/funnel/serverLeadContext";
import type { OfferMode } from "../../../lib/funnel/types";

type Props = { offerMode: OfferMode };

function ClaudeWorkshopCheckoutPage({ offerMode }: Props) {
  return (
    <CheckoutPage
      config={getFunnelConfig("claude", offerMode)}
      purpose="implementation_workshop"
    />
  );
}

(ClaudeWorkshopCheckoutPage as typeof ClaudeWorkshopCheckoutPage & {
  hideGlobalHeader?: boolean;
}).hideGlobalHeader = true;

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const leadId = typeof query.lead_id === "string" ? query.lead_id.slice(0, 120) : "";
  const context = await resolveFunnelLeadContext({ leadId, funnel: "claude" });
  return { props: { offerMode: context.offerMode } };
};

export default ClaudeWorkshopCheckoutPage;

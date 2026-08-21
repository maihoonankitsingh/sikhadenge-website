import type { GetServerSideProps } from "next";
import CoreProgramPage from "../../../components/funnel/core/CoreProgramPage";
import { getFunnelConfig } from "../../../data/funnels";
import { getCoreProgramEligibility, getCoreProgramEnrollment } from "../../../lib/funnel/coreProgram";
import type { FunnelProduct, OfferMode } from "../../../lib/funnel/types";

type Props = {
  leadId: string;
  eligible: boolean;
  product: FunnelProduct;
  offerMode: OfferMode;
};

function AiExpertProgramOfferPage({ leadId, eligible, product, offerMode }: Props) {
  return (
    <CoreProgramPage
      config={getFunnelConfig(product, offerMode)}
      leadId={leadId}
      eligible={eligible}
    />
  );
}

(AiExpertProgramOfferPage as typeof AiExpertProgramOfferPage & { hideGlobalHeader?: boolean }).hideGlobalHeader = true;

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const leadId = typeof query.lead_id === "string" ? query.lead_id.slice(0, 120) : "";

  if (!leadId) {
    return { props: { leadId: "", eligible: false, product: "chatgpt", offerMode: "free" } };
  }

  const enrolled = await getCoreProgramEnrollment(leadId);
  if (enrolled) {
    return {
      redirect: {
        destination: `/program/ai-expert/thank-you?lead_id=${encodeURIComponent(leadId)}`,
        permanent: false,
      },
    };
  }

  const eligibility = await getCoreProgramEligibility(leadId);
  return {
    props: {
      leadId,
      eligible: eligibility.eligible,
      product: eligibility.funnel || "chatgpt",
      offerMode: eligibility.offerMode || "free",
    },
  };
};

export default AiExpertProgramOfferPage;

import type { GetServerSideProps } from "next";
import CoreProgramThankYou from "../../../components/funnel/core/CoreProgramThankYou";
import { getFunnelConfig } from "../../../data/funnels";
import { getCoreProgramEnrollment, getCoreProgramEligibility } from "../../../lib/funnel/coreProgram";
import type { FunnelProduct, OfferMode } from "../../../lib/funnel/types";

type Props = {
  verified: boolean;
  product: FunnelProduct;
  offerMode: OfferMode;
};

function AiExpertProgramThankYouPage({ verified, product, offerMode }: Props) {
  return (
    <CoreProgramThankYou
      config={getFunnelConfig(product, offerMode)}
      verified={verified}
    />
  );
}

(AiExpertProgramThankYouPage as typeof AiExpertProgramThankYouPage & { hideGlobalHeader?: boolean }).hideGlobalHeader = true;

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const leadId = typeof query.lead_id === "string" ? query.lead_id.slice(0, 120) : "";
  if (!leadId) return { props: { verified: false, product: "chatgpt", offerMode: "free" } };

  const enrollment = await getCoreProgramEnrollment(leadId);
  if (enrollment && ["chatgpt", "claude"].includes(enrollment.funnel)) {
    return {
      props: {
        verified: true,
        product: enrollment.funnel as FunnelProduct,
        offerMode: enrollment.offerMode === "free" ? "free" : "paid",
      },
    };
  }

  const eligibility = await getCoreProgramEligibility(leadId);
  return {
    props: {
      verified: false,
      product: eligibility.funnel || "chatgpt",
      offerMode: eligibility.offerMode || "free",
    },
  };
};

export default AiExpertProgramThankYouPage;

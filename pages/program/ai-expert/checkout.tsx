import type { GetServerSideProps } from "next";
import CheckoutPage from "../../../components/funnel/CheckoutPage";
import { getFunnelConfig } from "../../../data/funnels";
import { verifyCheckoutToken } from "../../../lib/funnel/checkoutToken";
import { getCoreProgramEligibility } from "../../../lib/funnel/coreProgram";
import type { FunnelProduct, OfferMode } from "../../../lib/funnel/types";

type Props = {
  authorized: boolean;
  product: FunnelProduct;
  offerMode: OfferMode;
};

function AiExpertProgramCheckoutPage({ authorized, product, offerMode }: Props) {
  if (!authorized) {
    return (
      <main className="core-access-blocked">
        <span className="core-kicker">SECURE CHECKOUT</span>
        <h1>This AI Expert Program checkout link is invalid or expired.</h1>
        <p>Return to your personalized program offer and start checkout again.</p>
        <a className="core-secondary-link" href="/">Return to SikhaDenge</a>
      </main>
    );
  }

  return (
    <CheckoutPage
      config={getFunnelConfig(product, offerMode)}
      purpose="core_program"
    />
  );
}

(AiExpertProgramCheckoutPage as typeof AiExpertProgramCheckoutPage & { hideGlobalHeader?: boolean }).hideGlobalHeader = true;

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const leadId = typeof query.lead_id === "string" ? query.lead_id.slice(0, 120) : "";
  const tokenValue = typeof query.token === "string" ? query.token.slice(0, 1400) : "";
  const token = tokenValue ? verifyCheckoutToken(tokenValue) : null;

  if (!leadId || !token || token.leadId !== leadId || token.purpose !== "core_program") {
    return { props: { authorized: false, product: "chatgpt", offerMode: "free" } };
  }

  const eligibility = await getCoreProgramEligibility(leadId);
  const authorized = Boolean(
    eligibility.eligible &&
    eligibility.funnel &&
    eligibility.offerMode &&
    eligibility.funnel === token.funnel
  );

  return {
    props: {
      authorized,
      product: eligibility.funnel || token.funnel,
      offerMode: eligibility.offerMode || "paid",
    },
  };
};

export default AiExpertProgramCheckoutPage;

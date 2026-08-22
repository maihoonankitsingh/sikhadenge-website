import Head from "next/head";
import CheckoutPage from "../../../components/funnel/CheckoutPage";
import { getFunnelConfig } from "../../../data/funnels";

function ClaudeCheckoutPage() {
  const config = getFunnelConfig("claude", "paid");
  return (
    <>
      <Head><title>Secure Claude Masterclass Checkout | SikhaDenge</title><meta name="robots" content="noindex,nofollow" /></Head>
      <CheckoutPage config={config} />
    </>
  );
}

(ClaudeCheckoutPage as typeof ClaudeCheckoutPage & { hideGlobalHeader?: boolean }).hideGlobalHeader = true;

export default ClaudeCheckoutPage;

import Head from "next/head";
import CheckoutPage from "../../../components/funnel/CheckoutPage";
import { getFunnelConfig } from "../../../data/funnels";

function ChatGPTCheckoutPage() {
  const config = getFunnelConfig("chatgpt", "paid");
  return (
    <>
      <Head><title>Secure ChatGPT Masterclass Checkout | SikhaDenge</title><meta name="robots" content="noindex,nofollow" /></Head>
      <CheckoutPage config={config} />
    </>
  );
}

(ChatGPTCheckoutPage as typeof ChatGPTCheckoutPage & { hideGlobalHeader?: boolean }).hideGlobalHeader = true;

export default ChatGPTCheckoutPage;

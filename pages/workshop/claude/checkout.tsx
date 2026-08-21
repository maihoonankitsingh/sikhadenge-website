import CheckoutPage from "../../../components/funnel/CheckoutPage";
import { getFunnelConfig } from "../../../data/funnels";

function ClaudeWorkshopCheckoutPage() {
  return (
    <CheckoutPage
      config={getFunnelConfig("claude", "paid")}
      purpose="implementation_workshop"
    />
  );
}

(ClaudeWorkshopCheckoutPage as typeof ClaudeWorkshopCheckoutPage & {
  hideGlobalHeader?: boolean;
}).hideGlobalHeader = true;

export default ClaudeWorkshopCheckoutPage;

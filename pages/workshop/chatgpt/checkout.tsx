import CheckoutPage from "../../../components/funnel/CheckoutPage";
import { getFunnelConfig } from "../../../data/funnels";

function ChatGPTWorkshopCheckoutPage() {
  return (
    <CheckoutPage
      config={getFunnelConfig("chatgpt", "paid")}
      purpose="implementation_workshop"
    />
  );
}

(ChatGPTWorkshopCheckoutPage as typeof ChatGPTWorkshopCheckoutPage & {
  hideGlobalHeader?: boolean;
}).hideGlobalHeader = true;

export default ChatGPTWorkshopCheckoutPage;

import ConfirmationPage from "../../../components/funnel/ConfirmationPage";
import { getFunnelConfig } from "../../../data/funnels";

function ChatGPTMasterclassThankYouPage() {
  return <ConfirmationPage config={getFunnelConfig("chatgpt", "free")} />;
}

(ChatGPTMasterclassThankYouPage as typeof ChatGPTMasterclassThankYouPage & {
  hideGlobalHeader?: boolean;
}).hideGlobalHeader = true;

export default ChatGPTMasterclassThankYouPage;

import FunnelPage from "../../../components/funnel/FunnelPage";
import { getFunnelConfig } from "../../../data/funnels";

function ChatGPTPaidMasterclassPage() {
  return <FunnelPage config={getFunnelConfig("chatgpt", "paid")} />;
}

(ChatGPTPaidMasterclassPage as typeof ChatGPTPaidMasterclassPage & {
  hideGlobalHeader?: boolean;
}).hideGlobalHeader = true;

export default ChatGPTPaidMasterclassPage;

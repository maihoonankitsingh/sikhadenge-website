import FunnelPage from "../../../components/funnel/FunnelPage";
import { getFunnelConfig } from "../../../data/funnels";

function ChatGPTFreeMasterclassPage() {
  return <FunnelPage config={getFunnelConfig("chatgpt", "free")} />;
}

(ChatGPTFreeMasterclassPage as typeof ChatGPTFreeMasterclassPage & {
  hideGlobalHeader?: boolean;
}).hideGlobalHeader = true;

export default ChatGPTFreeMasterclassPage;

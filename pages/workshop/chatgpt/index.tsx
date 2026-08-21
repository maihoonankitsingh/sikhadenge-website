import WorkshopPage from "../../../components/funnel/workshop/WorkshopPage";
import { getFunnelConfig } from "../../../data/funnels";

function ChatGPTWorkshopPage() {
  return <WorkshopPage config={getFunnelConfig("chatgpt", "paid")} />;
}

(ChatGPTWorkshopPage as typeof ChatGPTWorkshopPage & { hideGlobalHeader?: boolean }).hideGlobalHeader = true;

export default ChatGPTWorkshopPage;

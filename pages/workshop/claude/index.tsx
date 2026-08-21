import WorkshopPage from "../../../components/funnel/workshop/WorkshopPage";
import { getFunnelConfig } from "../../../data/funnels";

function ClaudeWorkshopPage() {
  return <WorkshopPage config={getFunnelConfig("claude", "paid")} />;
}

(ClaudeWorkshopPage as typeof ClaudeWorkshopPage & { hideGlobalHeader?: boolean }).hideGlobalHeader = true;

export default ClaudeWorkshopPage;

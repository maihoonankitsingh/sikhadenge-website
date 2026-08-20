import FunnelPage from "../../../components/funnel/FunnelPage";
import { getFunnelConfig } from "../../../data/funnels";

function ClaudeFreeMasterclassPage() {
  return <FunnelPage config={getFunnelConfig("claude", "free")} />;
}

(ClaudeFreeMasterclassPage as typeof ClaudeFreeMasterclassPage & {
  hideGlobalHeader?: boolean;
}).hideGlobalHeader = true;

export default ClaudeFreeMasterclassPage;

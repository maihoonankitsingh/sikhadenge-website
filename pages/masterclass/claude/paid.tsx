import FunnelPage from "../../../components/funnel/FunnelPage";
import { getFunnelConfig } from "../../../data/funnels";

function ClaudePaidMasterclassPage() {
  return <FunnelPage config={getFunnelConfig("claude", "paid")} />;
}

(ClaudePaidMasterclassPage as typeof ClaudePaidMasterclassPage & {
  hideGlobalHeader?: boolean;
}).hideGlobalHeader = true;

export default ClaudePaidMasterclassPage;

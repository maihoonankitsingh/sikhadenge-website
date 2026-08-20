import ConfirmationPage from "../../../components/funnel/ConfirmationPage";
import { getFunnelConfig } from "../../../data/funnels";

function ClaudeMasterclassThankYouPage() {
  return <ConfirmationPage config={getFunnelConfig("claude", "free")} />;
}

(ClaudeMasterclassThankYouPage as typeof ClaudeMasterclassThankYouPage & {
  hideGlobalHeader?: boolean;
}).hideGlobalHeader = true;

export default ClaudeMasterclassThankYouPage;

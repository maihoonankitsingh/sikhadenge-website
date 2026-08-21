import ClaudeFreeLandingPage from "../../../components/funnel/claude/ClaudeFreeLandingPage";
import { getFunnelConfig } from "../../../data/funnels";

function ClaudeFreeMasterclassPage() {
  return <ClaudeFreeLandingPage config={getFunnelConfig("claude", "free")} />;
}

(ClaudeFreeMasterclassPage as typeof ClaudeFreeMasterclassPage & {
  hideGlobalHeader?: boolean;
}).hideGlobalHeader = true;

export default ClaudeFreeMasterclassPage;

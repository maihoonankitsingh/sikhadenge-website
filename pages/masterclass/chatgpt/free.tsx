import ChatGPTFreeV3 from "../../../components/funnel/chatgpt/ChatGPTFreeV3";
import { getFunnelConfig } from "../../../data/funnels";

function ChatGPTFreeMasterclassPage() {
  return <ChatGPTFreeV3 config={getFunnelConfig("chatgpt", "free")} />;
}

(ChatGPTFreeMasterclassPage as typeof ChatGPTFreeMasterclassPage & {
  hideGlobalHeader?: boolean;
}).hideGlobalHeader = true;

export default ChatGPTFreeMasterclassPage;

import ChatGPTFreeV4 from "../../../components/funnel/chatgpt/ChatGPTFreeV4";
import { getFunnelConfig } from "../../../data/funnels";

function ChatGPTFreeMasterclassPage() {
  return <ChatGPTFreeV4 config={getFunnelConfig("chatgpt", "free")} />;
}

(ChatGPTFreeMasterclassPage as typeof ChatGPTFreeMasterclassPage & {
  hideGlobalHeader?: boolean;
}).hideGlobalHeader = true;

export default ChatGPTFreeMasterclassPage;

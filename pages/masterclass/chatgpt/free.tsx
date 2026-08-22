import ChatGPTFreeV4 from "../../../components/funnel/chatgpt/ChatGPTFreeV4";
import { getFunnelConfig } from "../../../data/funnels";

function ChatGPTFreeMasterclassPage() {
  return (
    <>
      <ChatGPTFreeV4 config={getFunnelConfig("chatgpt", "free")} />
      <style jsx global>{`
        a[href="#main-content"] {
          min-height: 44px;
          display: inline-flex;
          align-items: center;
        }

        @media (max-width: 680px) {
          header a[href="#register"] {
            min-height: 44px !important;
          }
        }

        @media (max-width: 380px) {
          div[aria-label="SikhaDenge learner proof"] {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
        }
      `}</style>
    </>
  );
}

(ChatGPTFreeMasterclassPage as typeof ChatGPTFreeMasterclassPage & {
  hideGlobalHeader?: boolean;
}).hideGlobalHeader = true;

export default ChatGPTFreeMasterclassPage;

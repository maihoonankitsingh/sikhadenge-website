import Image from "next/image";

export default function FunnelFooter() {
  return (
    <footer className="funnel-footer">
      <div className="funnel-container">
        <Image
          src="/funnels/shared/sikhadenge-logo.png"
          width={150}
          height={48}
          alt="SikhaDenge"
        />
        <p>
          SikhaDenge is an independent education provider operated by ThinkGrow Private Limited.
          ChatGPT is a product of OpenAI. Claude is a product of Anthropic. No affiliation or
          endorsement is implied.
        </p>
        <nav>
          <a href="/privacy-policy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/refund-policy">Refund Policy</a>
        </nav>
      </div>
    </footer>
  );
}

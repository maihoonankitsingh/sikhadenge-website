import Image from "next/image";
import type { FunnelConfig } from "../../../lib/funnel/types";

export default function CoreHeroSection({ config }: { config: FunnelConfig }) {
  return (
    <section className="core-hero">
      <div className="core-hero-copy">
        <span className="core-kicker">ADVANCED SIKHADENGE PROGRAM • WORKSHOP BUYERS</span>
        <h1>
          Stop learning AI as isolated tools. <em>Build a complete practical AI skill system.</em>
        </h1>
        <p>
          You have already invested in implementation. The AI Expert Program takes you beyond one product into a structured system for prompting, research, productivity, content, data, creative AI, automation and real-world execution.
        </p>
        <div className="core-proof-row">
          <span>{config.coreProgramDuration}</span>
          <span>Guided live learning</span>
          <span>Projects + capstone</span>
          <span>Easy Hinglish</span>
        </div>
        <div className="core-source-note">
          <Image src="/funnels/shared/sikhadenge-logo.png" width={150} height={48} alt="SikhaDenge" priority />
          <div>
            <strong>Your source track: {config.productLabel}</strong>
            <span>Your original Free/paid acquisition and workshop attribution remain linked through enrollment.</span>
          </div>
        </div>
      </div>

      <aside className="core-hero-panel">
        <span className="core-panel-label">PROGRAM ENROLLMENT</span>
        <h2>{config.coreProgramName}</h2>
        <div className="core-price">₹{config.coreProgramPrice.toLocaleString("en-IN")}</div>
        <p>One verified program payment. No browser-controlled price.</p>
        <ul>
          <li>Broader than the ChatGPT/Claude implementation workshop</li>
          <li>Structured practice across practical AI work categories</li>
          <li>Progression toward portfolio-quality outputs and capstone work</li>
          <li>Separate product — workshop purchase does not auto-enroll you</li>
        </ul>
      </aside>
    </section>
  );
}

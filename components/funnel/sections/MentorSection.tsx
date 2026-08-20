import Image from "next/image";

export default function MentorSection() {
  return (
    <section className="funnel-section funnel-container">
      <div className="funnel-mentor-layout">
        <div className="funnel-mentor-image">
          <Image
            src="/funnels/shared/mentor.jpg"
            alt="SikhaDenge mentor"
            width={720}
            height={720}
            sizes="(max-width: 960px) 100vw, 46vw"
          />
        </div>
        <div>
          <span className="funnel-kicker">LEARN WITH SIKHADENGE</span>
          <h2>A structured learning environment, not a random tool demo</h2>
          <p>
            SikhaDenge is operated by ThinkGrow Private Limited and focuses on practical,
            mentor-led digital skill development. This masterclass is designed as the first step
            in a larger learning pathway, not as a promise of guaranteed income or employment.
          </p>
          <ul className="funnel-check-list">
            <li>Live practical explanation</li>
            <li>Real workflow demonstrations</li>
            <li>Clear next-step learning path</li>
            <li>WhatsApp-based session communication</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

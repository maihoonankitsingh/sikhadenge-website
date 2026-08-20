import Head from "next/head";
import type { FunnelConfig } from "../../lib/funnel/types";
import FunnelAnalytics from "./FunnelAnalytics";
import FunnelFooter from "./FunnelFooter";
import FunnelHeader from "./FunnelHeader";
import FunnelTracker from "./FunnelTracker";
import MobileStickyCta from "./MobileStickyCta";
import AudienceSection from "./sections/AudienceSection";
import DemoSection from "./sections/DemoSection";
import FaqSection from "./sections/FaqSection";
import FinalCtaSection from "./sections/FinalCtaSection";
import HeroSection from "./sections/HeroSection";
import MentorSection from "./sections/MentorSection";
import NextStepSection from "./sections/NextStepSection";
import OutcomesSection from "./sections/OutcomesSection";
import ProblemSection from "./sections/ProblemSection";
import ProofStrip from "./sections/ProofStrip";
import RegisterSection from "./sections/RegisterSection";
import ResourcesSection from "./sections/ResourcesSection";

export default function FunnelPage({ config }: { config: FunnelConfig }) {
  return (
    <>
      <Head>
        <title>{config.metaTitle}</title>
        <meta name="description" content={config.metaDescription} />
        <meta property="og:title" content={config.metaTitle} />
        <meta property="og:description" content={config.metaDescription} />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index,follow" />
      </Head>

      <FunnelAnalytics />
      <FunnelTracker config={config} />

      <main className={`funnel-shell funnel-theme-${config.theme}`}>
        <FunnelHeader config={config} />
        <HeroSection config={config} />
        <ProofStrip />
        <ProblemSection config={config} />
        <OutcomesSection config={config} />
        <DemoSection config={config} />
        <AudienceSection config={config} />
        <MentorSection />
        <ResourcesSection config={config} />
        <NextStepSection config={config} />
        <RegisterSection config={config} />
        <FaqSection config={config} />
        <FinalCtaSection config={config} />
        <FunnelFooter />
        <MobileStickyCta config={config} />
      </main>
    </>
  );
}

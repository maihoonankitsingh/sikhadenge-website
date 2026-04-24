import {
  ArrowRight,
  BadgeCheck,
  Brush,
  Clapperboard,
  Globe,
  Megaphone,
  PenSquare,
  Workflow,
  Sparkles,
  Bot,
} from "lucide-react";

type Tint = "purple" | "orange" | "blue" | "pink" | "slate" | "green";

type SkillNodeProps = {
  className?: string;
  icon: React.ElementType;
  label: string;
  sublabel: string;
  tint?: Tint;
};

function SkillNode({
  className = "",
  icon: Icon,
  label,
  sublabel,
  tint = "slate",
}: SkillNodeProps) {
  const tintMap: Record<Tint, string> = {
    purple:
      "bg-[linear-gradient(180deg,#FBF7FF_0%,#EFE6FF_100%)] text-[#7C3AED] shadow-[inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-6px_12px_rgba(124,58,237,0.05),0_10px_22px_rgba(124,58,237,0.10)]",
    orange:
      "bg-[linear-gradient(180deg,#FFF9F5_0%,#FFE9E0_100%)] text-[#F0614A] shadow-[inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-6px_12px_rgba(240,97,74,0.05),0_10px_22px_rgba(240,97,74,0.10)]",
    blue:
      "bg-[linear-gradient(180deg,#F5FBFF_0%,#E6F3FF_100%)] text-[#1794D8] shadow-[inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-6px_12px_rgba(23,148,216,0.05),0_10px_22px_rgba(23,148,216,0.10)]",
    pink:
      "bg-[linear-gradient(180deg,#FFF7FB_0%,#FFE8F2_100%)] text-[#E25599] shadow-[inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-6px_12px_rgba(226,85,153,0.05),0_10px_22px_rgba(226,85,153,0.10)]",
    slate:
      "bg-[linear-gradient(180deg,#FCFCFD_0%,#EEF0F3_100%)] text-[#2B2B2B] shadow-[inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-6px_12px_rgba(15,23,42,0.04),0_10px_22px_rgba(15,23,42,0.08)]",
    green:
      "bg-[linear-gradient(180deg,#F5FFF8_0%,#E5F8EC_100%)] text-[#16A34A] shadow-[inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-6px_12px_rgba(22,163,74,0.05),0_10px_22px_rgba(22,163,74,0.10)]",
  };

  return (
    <div
      className={[
        "absolute rounded-[22px] sm:rounded-[24px] lg:rounded-[28px]",
        "border border-[#E6E6EC] bg-white",
        "shadow-[0_14px_28px_rgba(15,23,42,0.06)] sm:shadow-[0_18px_40px_rgba(15,23,42,0.08)]",
        "w-[108px] p-3",
        "sm:w-[126px] sm:p-3.5",
        "lg:w-[142px] lg:p-3.5",
        className,
      ].join(" ")}
    >
      <div className="flex flex-col items-center text-center">
        <div
          className={[
            "relative flex items-center justify-center rounded-[18px] border border-white/85",
            "h-[48px] w-[48px] sm:h-[52px] sm:w-[52px] lg:h-[58px] lg:w-[58px]",
            tintMap[tint],
          ].join(" ")}
        >
          <div className="pointer-events-none absolute inset-x-[16%] top-[10%] h-[26%] rounded-full bg-white/70 blur-[2px]" />
          <div className="pointer-events-none absolute inset-x-[20%] bottom-[14%] h-[18%] rounded-full bg-black/5 blur-[4px]" />
          <Icon className="relative z-[1] h-4.5 w-4.5 sm:h-5.5 sm:w-5.5 lg:h-6 lg:w-6" strokeWidth={2.15} />
        </div>

        <p className="mt-2 text-[11px] font-semibold leading-4 text-[#20222A] sm:mt-3 sm:text-[12px] sm:leading-4 lg:text-[13px]">
          {label}
        </p>

        <p className="mt-1 hidden text-[10px] leading-4 text-[#7D808A] sm:block lg:text-[11px]">
          {sublabel}
        </p>
      </div>
    </div>
  );
}

function MobileSkillPills() {
  const pills = [
    "Design with AI",
    "Edit Videos with AI",
    "AI Website",
    "Market with AI",
    "Create Content with AI",
    "AI Automation",
  ];

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-2 px-2 sm:hidden">
      {pills.map((item) => (
        <div
          key={item}
          className="rounded-full border border-[#E4E4EA] bg-white px-3 py-1.5 text-[11px] font-medium text-[#5F6470] shadow-[0_6px_16px_rgba(15,23,42,0.04)]"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

function HeroNetwork() {
  return (
    <div className="relative mx-auto h-[280px] w-full max-w-[940px] sm:h-[390px] lg:h-[500px]">
      <div className="absolute left-1/2 top-[108px] h-[96px] w-[96px] -translate-x-1/2 rounded-[28px] bg-[radial-gradient(circle_at_30%_30%,#B993FF_0%,#8B5CF6_45%,#7C3AED_100%)] shadow-[0_22px_48px_rgba(124,58,237,0.24)] sm:top-[126px] sm:h-[132px] sm:w-[132px] sm:rounded-[32px] sm:shadow-[0_26px_60px_rgba(124,58,237,0.28)] lg:top-[152px] lg:h-[176px] lg:w-[176px] lg:rounded-[38px] lg:shadow-[0_30px_76px_rgba(124,58,237,0.32)]">
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full border-[4px] border-white/80 sm:h-[56px] sm:w-[56px] lg:h-[66px] lg:w-[66px] lg:border-[5px]">
            <BadgeCheck className="h-5 w-5 text-white sm:h-7 sm:w-7 lg:h-8 lg:w-8" strokeWidth={2.6} />
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="absolute left-[21.8%] right-[21.8%] top-[160px] h-px bg-[#DEE1E8] lg:top-[240px]" />

        <div className="absolute left-[37.3%] top-[129px] h-[46px] w-px rotate-[41deg] bg-[#DEE1E8] lg:left-[40.0%] lg:top-[170px] lg:h-[58px]" />
        <div className="absolute left-[37.3%] top-[186px] h-[46px] w-px -rotate-[41deg] bg-[#DEE1E8] lg:left-[40.0%] lg:top-[252px] lg:h-[58px]" />

        <div className="absolute right-[37.3%] top-[129px] h-[46px] w-px -rotate-[41deg] bg-[#DEE1E8] lg:right-[40.0%] lg:top-[170px] lg:h-[58px]" />
        <div className="absolute right-[37.3%] top-[186px] h-[46px] w-px rotate-[41deg] bg-[#DEE1E8] lg:right-[40.0%] lg:top-[252px] lg:h-[58px]" />

        <div className="absolute left-[21.2%] top-[153px] h-3 w-3 rounded-full bg-[#8B5CF6] lg:left-[24.7%] lg:top-[233px]" />
        <div className="absolute right-[21.2%] top-[153px] h-3 w-3 rounded-full bg-[#8B5CF6] lg:right-[24.7%] lg:top-[233px]" />

        <div className="absolute left-[37.0%] top-[166px] hidden h-2 w-2 rounded-full bg-[#A78BFA] lg:block" />
        <div className="absolute left-[37.0%] top-[308px] hidden h-2 w-2 rounded-full bg-[#A78BFA] lg:block" />
        <div className="absolute right-[37.0%] top-[166px] hidden h-2 w-2 rounded-full bg-[#A78BFA] lg:block" />
        <div className="absolute right-[37.0%] top-[308px] hidden h-2 w-2 rounded-full bg-[#A78BFA] lg:block" />

        <div className="absolute left-[43.4%] top-[233px] hidden h-3 w-3 rounded-full bg-[#8B5CF6] lg:block" />
        <div className="absolute right-[43.4%] top-[233px] hidden h-3 w-3 rounded-full bg-[#8B5CF6] lg:block" />
      </div>

      <div className="hidden sm:block">
        <SkillNode
          className="left-[2%] top-[118px] lg:left-[1%] lg:top-[210px]"
          icon={Brush}
          label="Design with AI"
          sublabel="Creative assets"
          tint="purple"
        />

        <SkillNode
          className="left-[14%] top-[8px] lg:left-[16%] lg:top-[46px]"
          icon={Clapperboard}
          label="Edit Videos with AI"
          sublabel="Edits & reels"
          tint="orange"
        />

        <SkillNode
          className="left-[14%] top-[236px] lg:left-[17%] lg:top-[360px]"
          icon={Globe}
          label="AI Website"
          sublabel="Pages & funnels"
          tint="blue"
        />

        <SkillNode
          className="right-[14%] top-[8px] lg:right-[16%] lg:top-[46px]"
          icon={Megaphone}
          label="Market with AI"
          sublabel="Ads & strategy"
          tint="pink"
        />

        <SkillNode
          className="right-[2%] top-[118px] lg:right-[1%] lg:top-[210px]"
          icon={PenSquare}
          label="Create Content with AI"
          sublabel="Scripts & copy"
          tint="slate"
        />

        <SkillNode
          className="right-[14%] top-[236px] lg:right-[17%] lg:top-[360px]"
          icon={Workflow}
          label="AI Automation"
          sublabel="Systems & flows"
          tint="green"
        />
      </div>

      <div className="absolute left-1/2 top-[24px] hidden -translate-x-1/2 sm:flex lg:hidden">
        <div className="rounded-full border border-[#E4E4EA] bg-white px-4 py-2 text-xs font-medium text-[#666874] shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
          6 Connected AI Skills
        </div>
      </div>
    </div>
  );
}

export default function AIAssistantPreviewPage() {
  return (
    <main className="bg-[#ECECEF] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="mx-auto max-w-[1380px] bg-transparent px-4 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <div className="mx-auto max-w-[1160px]">
          <HeroNetwork />
          <MobileSkillPills />

          <div className="mx-auto mt-4 max-w-[780px] text-center sm:-mt-1 lg:-mt-4">
            <h1 className="text-[38px] font-semibold leading-[0.95] tracking-[-0.06em] text-black sm:text-[58px] lg:text-[88px]">
              AI Expert
              <span className="block">Accelerator Program</span>
            </h1>

            <p className="mx-auto mt-4 max-w-[760px] text-[14px] leading-[1.7] text-[#8B8B95] sm:mt-6 sm:text-[16px] lg:text-[18px]">
              Learn practical AI skills across design, video, websites, marketing,
              content and automation in one structured job-focused program built for
              students, freelancers and working professionals.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-8">
              <a
                href="/gen-ai-masterclass/register-one-step"
                className="inline-flex items-center gap-2 rounded-[18px] border border-[#FF8A74] bg-[linear-gradient(180deg,#FF846B_0%,#F25C47_100%)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_20px_44px_rgba(242,89,69,0.22),inset_0_1px_0_rgba(255,255,255,0.30)] transition hover:translate-y-[-1px] hover:shadow-[0_24px_50px_rgba(242,89,69,0.28),inset_0_1px_0_rgba(255,255,255,0.32)] sm:px-8 sm:py-4 sm:text-[17px]"
              >
                Explore the Program
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:mt-10 sm:gap-3">
              {[
                "6 connected AI skills",
                "Practical workflow based",
                "Professional learning path",
              ].map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-[#E4E4EA] bg-white px-3 py-1.5 text-[11px] text-[#666874] shadow-[0_8px_20px_rgba(15,23,42,0.04)] sm:px-4 sm:py-2 sm:text-sm"
                >
                  <Sparkles className="h-3.5 w-3.5 text-[#8B5CF6] sm:h-4 sm:w-4" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:mt-10 sm:gap-4 sm:grid-cols-3 lg:mt-12">
              <div className="rounded-[20px] border border-[#E4E4EA] bg-white px-4 py-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)] sm:rounded-[24px] sm:px-5 sm:py-5">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#F3F0FF] sm:h-12 sm:w-12 sm:rounded-[16px]">
                  <Brush className="h-5 w-5 text-[#7C3AED]" />
                </div>
                <h3 className="mt-3 text-base font-semibold text-black sm:mt-4 sm:text-lg">Creative Skills</h3>
                <p className="mt-2 text-xs leading-5 text-[#7B7D88] sm:text-sm sm:leading-6">
                  Design with AI, Edit Videos with AI aur Create Content with AI ko practical execution ke saath.
                </p>
              </div>

              <div className="rounded-[20px] border border-[#E4E4EA] bg-white px-4 py-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)] sm:rounded-[24px] sm:px-5 sm:py-5">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#EEF9FF] sm:h-12 sm:w-12 sm:rounded-[16px]">
                  <Globe className="h-5 w-5 text-[#1794D8]" />
                </div>
                <h3 className="mt-3 text-base font-semibold text-black sm:mt-4 sm:text-lg">Business Skills</h3>
                <p className="mt-2 text-xs leading-5 text-[#7B7D88] sm:text-sm sm:leading-6">
                  AI Website aur Market with AI ke through modern digital workflow.
                </p>
              </div>

              <div className="rounded-[20px] border border-[#E4E4EA] bg-white px-4 py-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)] sm:rounded-[24px] sm:px-5 sm:py-5">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#EEFDF4] sm:h-12 sm:w-12 sm:rounded-[16px]">
                  <Bot className="h-5 w-5 text-[#16A34A]" />
                </div>
                <h3 className="mt-3 text-base font-semibold text-black sm:mt-4 sm:text-lg">System Skills</h3>
                <p className="mt-2 text-xs leading-5 text-[#7B7D88] sm:text-sm sm:leading-6">
                  AI Automation ke saath repeat work ko smarter aur faster banao.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

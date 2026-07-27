import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileCheck2,
  GraduationCap,
  Layers3,
  Lightbulb,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  WandSparkles,
} from "lucide-react";

import { BlogLeadPopup } from "./BlogLeadPopup";

const MASTERCLASS_URL =
  "https://sikhadenge.in/gen-ai-masterclass/register-one-step";

const CONTENTS = [
  ["quick-answer", "Quick answer"],
  ["career-scope", "What an AI career without coding means"],
  ["who-this-is-for", "Who this guide is for"],
  ["career-paths", "Three practical career paths"],
  ["skills", "Skills you actually need"],
  ["roadmap", "Step-by-step learning roadmap"],
  ["workflow", "Human-plus-AI workflow"],
  ["projects", "Portfolio project ideas"],
  ["tools", "Tool-selection framework"],
  ["opportunities", "Career and freelance opportunities"],
  ["plan", "30/60/90-day action plan"],
  ["mistakes", "Common mistakes"],
  ["methodology", "Sources and methodology"],
  ["faq", "Frequently asked questions"],
] as const;

const PATHS = [
  {
    label: "Path 01",
    title: "Use AI inside an existing skill",
    bestFor: "Students, job seekers and working professionals",
    description:
      "Add AI to a skill you already understand, such as writing, design, research, marketing, presentation work, customer support or operations. This is usually the fastest route because you are not learning both a new profession and a new tool category at the same time.",
    examples: ["AI-assisted research", "Content production", "Presentation support", "Operational documentation"],
    icon: Sparkles,
  },
  {
    label: "Path 02",
    title: "Build repeatable AI-enabled services",
    bestFor: "Freelancers, creators and small-business service providers",
    description:
      "Combine prompts, source material, editing, quality checks and delivery into a repeatable service. The value is not the prompt alone. The value is a reliable outcome that a client can understand, review and use.",
    examples: ["Content repurposing", "Lead-research workflow", "Video scripting", "Campaign support"],
    icon: Layers3,
  },
  {
    label: "Path 03",
    title: "Move towards technical AI work later",
    bestFor: "Learners who eventually want engineering or data roles",
    description:
      "Begin with practical AI literacy and problem-solving, then add programming, data handling, APIs and model concepts when your goal genuinely requires them. Coding can expand your options, but it does not need to be the first gate before you create useful work.",
    examples: ["Automation prototypes", "Data workflows", "API-based tools", "AI product support"],
    icon: GraduationCap,
  },
];

const SKILLS = [
  ["Problem framing", "Define the user, constraint, input and useful output before opening an AI tool.", "High"],
  ["Prompt and context design", "Give clear instructions, examples, source material and quality criteria.", "High"],
  ["Verification", "Check facts, calculations, links, claims, tone, privacy and policy-sensitive content.", "Critical"],
  ["Editing and judgement", "Improve structure, originality, relevance and audience fit instead of publishing raw output.", "Critical"],
  ["Domain knowledge", "Understand enough of the work area to notice weak or misleading output.", "High"],
  ["Communication", "Explain the process, trade-offs and final result to a client, manager or collaborator.", "High"],
  ["Portfolio documentation", "Show the brief, process, decisions, revisions and final outcome in a credible case study.", "High"],
  ["Coding", "Useful for technical paths, automation depth and custom products, but optional for many starting roles.", "Path-dependent"],
];

const ROADMAP = [
  {
    number: "01",
    title: "Choose one outcome, not every AI tool",
    text: "Start with a result that someone can evaluate: a researched article, campaign brief, edited video plan, presentation, customer-support knowledge base, competitor analysis or operating checklist. A clear output gives your learning direction and prevents endless tool-hopping.",
  },
  {
    number: "02",
    title: "Learn the complete workflow around that outcome",
    text: "Map what happens before and after AI generation. Identify the brief, source collection, prompt, draft, verification, editing, formatting, approval and delivery stages. Employers and clients pay for dependable execution, not for isolated prompt experiments.",
  },
  {
    number: "03",
    title: "Build a small, stable tool stack",
    text: "Use one primary AI assistant and the professional software already common in your chosen field. Learn where each tool is strong, where it can fail and how information moves between them. Add a new tool only when it solves a real bottleneck.",
  },
  {
    number: "04",
    title: "Create three progressively harder projects",
    text: "Complete a beginner project, an intermediate project and a realistic client-style project. Each project should include constraints, source material, revisions, human decisions and a final deliverable. This progression shows that your skill is repeatable rather than accidental.",
  },
  {
    number: "05",
    title: "Publish proof with process notes",
    text: "Turn each project into a concise case study. Explain the problem, your role, the tools used, the checks performed, the limitations and what improved after revision. Do not expose confidential data or pretend that AI output was fully your original work.",
  },
  {
    number: "06",
    title: "Validate the skill in a real environment",
    text: "Use internships, volunteer work, personal projects, creator work, campus activities, freelance outreach or a small-business problem. Real feedback reveals whether your process is useful, understandable and reliable under practical constraints.",
  },
  {
    number: "07",
    title: "Specialise around a problem or audience",
    text: "After several projects, look for patterns. You may become strongest at AI-assisted content for education, research support for agencies, video workflows for creators or process documentation for small teams. Specialisation makes your offer easier to explain and improve.",
  },
];

const PROJECTS = [
  {
    title: "AI-assisted research brief",
    level: "Beginner",
    outcome: "A five-page decision brief with verified sources, a comparison table and a recommendation section.",
    proof: "Show your research questions, source-selection criteria, fact checks and final editorial decisions.",
  },
  {
    title: "Content repurposing system",
    level: "Beginner to intermediate",
    outcome: "Convert one long-form source into a newsletter, social posts, a short video script and a publishing checklist.",
    proof: "Document how you preserved meaning, adapted tone and rejected weak AI suggestions.",
  },
  {
    title: "Small-business campaign kit",
    level: "Intermediate",
    outcome: "Create an audience summary, offer angle, landing-page outline, ad concepts and a review checklist.",
    proof: "Explain the business context, assumptions, compliance checks and how each asset connects to the campaign goal.",
  },
  {
    title: "Customer-support knowledge workflow",
    level: "Intermediate",
    outcome: "Organise common questions into a reviewed knowledge base with answer templates and escalation rules.",
    proof: "Show the source-of-truth documents, privacy safeguards and cases that require a human response.",
  },
  {
    title: "Creator video production workflow",
    level: "Intermediate",
    outcome: "Build a repeatable process for topic research, scripting, shot planning, captions, repurposing and quality review.",
    proof: "Include before-and-after examples and explain which creative decisions remained human-led.",
  },
  {
    title: "Client-style AI operations audit",
    level: "Advanced non-coding",
    outcome: "Review a team process and propose where AI can assist, where automation is unsafe and how results should be measured.",
    proof: "Present the current process, risks, proposed workflow, pilot scope and governance checklist.",
  },
];

const TOOL_FRAMEWORK = [
  ["Primary AI assistant", "Drafting, analysis, ideation and transformation", "Can it use your source material well, follow constraints and support review?"],
  ["Professional work tool", "Design, editing, spreadsheets, documents, project delivery or publishing", "Is it already accepted in the field you want to enter?"],
  ["Source and research layer", "Collect reliable references and organise evidence", "Can you trace important claims back to a credible source?"],
  ["Quality-control layer", "Fact checking, proofreading, testing and approval", "What can fail, and who is responsible for the final decision?"],
  ["Portfolio layer", "Present work, process and outcomes", "Can a reviewer understand your contribution without a long explanation?"],
];

const OPPORTUNITIES = [
  {
    title: "AI-assisted content and communication",
    description:
      "Support research, outlines, drafts, editing, content repurposing, newsletters, scripts, presentations and internal communication. Strong writing judgement and source verification matter more than producing the highest volume of text.",
  },
  {
    title: "AI-enabled design and video workflows",
    description:
      "Use AI for ideation, mood boards, asset planning, rough concepts, captions, scripts and repetitive production tasks while relying on professional design or editing skills for the final output.",
  },
  {
    title: "Marketing and sales support",
    description:
      "Assist with audience research, competitor reviews, campaign briefs, landing-page outlines, lead research and sales enablement. Avoid unsupported claims, spam and automated outreach that ignores consent or platform rules.",
  },
  {
    title: "Research and operations support",
    description:
      "Summarise source material, compare options, document processes, prepare checklists and structure recurring work. This path rewards accuracy, organisation and the ability to make AI output usable by a team.",
  },
  {
    title: "Freelance workflow services",
    description:
      "Package a repeatable outcome for a defined audience, such as repurposing webinars for coaches or preparing product-content systems for small ecommerce teams. Sell the result and process, not vague access to an AI tool.",
  },
  {
    title: "AI adoption and training support",
    description:
      "Help teams understand safe use cases, write internal guidance, test workflows and train users. This requires communication, documentation and responsible handling of business information.",
  },
];

const PLAN = [
  {
    period: "Days 1–30",
    title: "Foundation and direction",
    actions: [
      "Choose one work outcome and one audience.",
      "Learn the basic workflow, terminology and quality expectations of that field.",
      "Practise with one AI assistant and one professional work tool.",
      "Complete five small exercises and record what failed.",
    ],
  },
  {
    period: "Days 31–60",
    title: "Projects and quality control",
    actions: [
      "Complete two structured portfolio projects.",
      "Add source checks, privacy checks and a revision checklist.",
      "Ask a knowledgeable person to review the usefulness of the output.",
      "Rewrite weak project explanations so your contribution is clear.",
    ],
  },
  {
    period: "Days 61–90",
    title: "Proof, feedback and opportunity",
    actions: [
      "Complete one realistic client-style project.",
      "Publish a simple portfolio with process-based case studies.",
      "Approach relevant internships, collaborators, creators or small businesses.",
      "Track feedback and specialise around the problems you solve best.",
    ],
  },
];

const MISTAKES = [
  "Learning only prompt tricks without understanding a complete professional workflow.",
  "Publishing raw AI output without checking facts, tone, originality, privacy or policy risk.",
  "Changing tools every week instead of becoming dependable with a small stack.",
  "Creating a portfolio that lists tools but does not explain problems, decisions and outcomes.",
  "Using fabricated statistics, testimonials, results or case studies to make work look stronger.",
  "Ignoring communication, client context and domain knowledge because the AI produced a polished draft.",
  "Trying to automate a high-risk decision before establishing human review and accountability.",
  "Waiting to feel completely ready instead of testing small projects and learning from real feedback.",
];

const FAQS = [
  [
    "Can a complete beginner start an AI career without coding?",
    "Yes. A beginner can start in AI-assisted content, design, video, marketing, research, operations, sales support and productivity workflows without programming. The learner still needs professional judgement, communication, verification and proof of work. Coding becomes important when the chosen path requires custom software, data engineering, model development or deeper automation.",
  ],
  [
    "Which skill should I learn first?",
    "Choose the skill closest to a useful outcome you already understand or want to practise consistently. A student who enjoys research might begin with source-based briefs. A designer might learn AI-assisted concept development. A marketer might begin with audience and campaign workflows. Starting from an outcome is more reliable than choosing a tool because it is popular.",
  ],
  [
    "How long does it take to become job-ready?",
    "There is no universal timeline. Readiness depends on your existing skill, the difficulty of the role, practice quality and whether you have completed realistic projects. Use evidence-based milestones: can you follow a brief, produce a reviewed output, explain your process, handle feedback and repeat the result? Those indicators are more useful than counting course hours alone.",
  ],
  [
    "Do certificates matter for non-coding AI roles?",
    "A relevant certificate can show structured learning, but it should support rather than replace proof of work. Employers and clients still need to understand what you can produce, how you verify quality and whether you can apply the skill to a real problem. Combine learning credentials with clear case studies and practical demonstrations.",
  ],
  [
    "How do I avoid looking like someone who only copies AI output?",
    "Show your reasoning and quality controls. Include the brief, source material, decisions, rejected options, edits, limitations and final result. Use AI as one part of a documented workflow. A thoughtful case study makes your human contribution visible and demonstrates that you take responsibility for the output.",
  ],
  [
    "Can I freelance with AI skills before getting a full-time job?",
    "You can test a narrowly defined service through personal projects, volunteer work or small paid assignments. Start with a low-risk outcome you can review carefully. Set clear expectations, protect client information and avoid promising results you cannot control. Early freelance work should validate your process, not pressure you into pretending to be an expert.",
  ],
  [
    "Will AI replace the same careers I am preparing for?",
    "AI can change tasks inside many careers, but tools do not remove the need to define problems, understand users, verify outputs, make trade-offs and take responsibility for results. Build adaptable capabilities around judgement, communication, domain knowledge and workflow design. These remain useful even as individual tools change.",
  ],
];

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-700">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-[29px] font-black leading-[1.1] tracking-[-0.035em] text-slate-950 sm:text-[38px]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-[17px] leading-8 text-slate-600 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function RegisterButton({ label = "Join Free Gen AI Masterclass" }: { label?: string }) {
  return (
    <Link
      href={MASTERCLASS_URL}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f5b301] px-6 py-4 text-sm font-extrabold text-slate-950 transition hover:bg-[#ffd04a]"
    >
      {label} <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

export function BlogLongformCareerGuide() {
  return (
    <main
      data-blog-article-design="editorial-v7-longform-sticky-lead"
      className="min-h-screen overflow-x-hidden bg-[#f7f9fd] text-slate-950"
    >
      <BlogLeadPopup />

      <header className="border-b border-slate-200 bg-white pt-[72px] sm:pt-20">
        <div className="mx-auto max-w-[1320px] px-4 pb-10 sm:px-6 sm:pb-12 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-sm font-medium text-slate-500">
            <Link href="/" className="hover:text-blue-700">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-blue-700">AI Blog</Link>
            <span>/</span>
            <span className="text-slate-700">AI Career For Beginners Without Coding</span>
          </nav>

          <div className="mt-6 grid gap-8 sm:mt-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center xl:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-blue-700">
                <Sparkles className="h-4 w-4" /> Beginner AI career guide
              </div>
              <h1 className="mt-7 max-w-[900px] text-[39px] font-black leading-[1.04] tracking-[-0.045em] sm:text-[50px] lg:text-[58px]">
                AI Career For Beginners Without Coding
              </h1>
              <p className="mt-7 max-w-[850px] text-[17px] leading-8 text-slate-600 sm:text-[19px] sm:leading-9">
                A detailed, practical guide to choosing a non-coding AI direction, building reliable workflows, creating portfolio evidence and moving towards real career or freelance opportunities without pretending that one tool or prompt is a complete profession.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-600">
                <Link href="/authors/sikhadenge-editorial-team" className="inline-flex items-center gap-2 font-bold text-slate-950 hover:text-blue-700">
                  <BadgeCheck className="h-5 w-5 text-blue-700" /> Sikhadenge Editorial Team
                </Link>
                <span className="inline-flex items-center gap-2"><Clock3 className="h-5 w-5 text-blue-700" /> Updated July 2026</span>
                <span className="inline-flex items-center gap-2"><BookOpen className="h-5 w-5 text-blue-700" /> Long-form practical guide</span>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <RegisterButton />
                <a href="#quick-answer" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-4 text-sm font-extrabold text-slate-800 transition hover:border-blue-300 hover:text-blue-700">
                  Start reading <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[26px] bg-[#071b43] p-6 text-white shadow-[0_30px_90px_rgba(15,37,86,0.22)] sm:p-8">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/35 blur-3xl" />
              <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl" />
              <div className="relative">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-200">Article outcome</p>
                <h2 className="mt-4 text-[27px] font-black leading-[1.12] tracking-[-0.035em]">Finish with a 90-day execution plan.</h2>
                <div className="mt-7 space-y-4">
                  {[
                    "Choose one AI-enabled career direction",
                    "Build a small, professional tool stack",
                    "Complete three portfolio-ready projects",
                    "Apply the workflow in a real environment",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm leading-6 text-blue-50">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#f5b301]" /> {item}
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl bg-white/10 p-4 text-sm leading-7 text-blue-100">
                  This guide does not promise a job, income or ranking. It provides a structured learning and proof-of-work framework.
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="sticky z-30 border-b border-slate-200 bg-white/95 backdrop-blur" style={{ top: "calc(var(--sd-offer-h, 0px) + 64px)" }}>
        <nav aria-label="Article sections" className="mx-auto flex max-w-[1320px] gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {CONTENTS.slice(0, 8).map(([href, label]) => (
            <a key={href} href={`#${href}`} className="whitespace-nowrap rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
              {label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto grid max-w-[1320px] gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_330px] lg:px-8 xl:gap-14">
        <article className="min-w-0">
          <section id="quick-answer" className="scroll-mt-28 overflow-hidden rounded-[24px] border border-blue-200 bg-white">
            <div className="border-l-[6px] border-blue-600 px-6 py-7 sm:px-8 sm:py-9">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-700">Quick answer</p>
              <h2 className="mt-4 text-[28px] font-black leading-[1.15] tracking-[-0.03em] sm:text-[36px]">Yes, you can start an AI career without coding—but you still need a real professional skill.</h2>
              <p className="mt-5 text-[17px] leading-8 text-slate-700 sm:text-[18px] sm:leading-9">
                The strongest non-coding path is to combine AI with a practical work area such as content, design, video, marketing, research, operations or customer support. Learn the complete workflow, verify the output, document your decisions and build portfolio projects that another person can evaluate. Coding can expand your options later, but it is not required before you begin creating useful AI-assisted work.
              </p>
            </div>
          </section>

          <section className="mt-8 rounded-[24px] border border-slate-200 bg-white p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <Route className="h-6 w-6 text-blue-700" />
              <h2 className="text-2xl font-black tracking-[-0.03em]">Table of contents</h2>
            </div>
            <div className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {CONTENTS.map(([href, label], index) => (
                <a key={href} href={`#${href}`} className="flex items-start gap-3 border-b border-slate-100 py-3 text-sm font-semibold leading-6 text-slate-700 transition hover:text-blue-700">
                  <span className="font-black text-blue-600">{String(index + 1).padStart(2, "0")}</span>
                  {label}
                </a>
              ))}
            </div>
          </section>

          <section id="career-scope" className="mt-16 scroll-mt-28">
            <SectionTitle eyebrow="Career foundation" title="What an AI career without coding actually means" description="The phrase can be misleading unless you separate tool usage from professional capability." />
            <div className="space-y-6 text-[18px] leading-9 text-slate-700">
              <p>
                A non-coding AI career does not mean earning money simply because you know how to type prompts. It means using AI inside a useful workflow and taking responsibility for the quality of the final output. The workflow may involve research, writing, design, video, marketing, sales support, project coordination, customer communication or internal operations. AI can accelerate parts of the process, but the learner still needs to understand the audience, objective, constraints and quality standard.
              </p>
              <p>
                Consider an AI-assisted content role. The work begins before generation: understanding the brief, audience, search intent, brand voice and source requirements. It continues after generation through fact checking, editing, restructuring, originality review, link verification, publishing and performance analysis. Someone who only creates the first draft has learned a tool feature. Someone who can deliver the complete reviewed asset has developed a professional workflow.
              </p>
              <p>
                The same principle applies to design and video. AI may help with concept exploration, rough scripts, captions, shot lists or repetitive production tasks. The final result still requires visual judgement, editing skill, consistency, accessibility, platform awareness and communication with the stakeholder. This is why the best starting point is not “Which AI tool should I learn?” but “Which useful result do I want to produce repeatedly?”
              </p>
              <p>
                Coding becomes valuable when you want to create custom applications, connect systems deeply, work with data pipelines, build model-based products or enter technical engineering roles. Those are legitimate paths, but they are not the only ways to work with AI. A beginner can first build practical literacy and confidence through non-coding work, then decide whether technical depth supports the long-term goal.
              </p>
            </div>
          </section>

          <section id="who-this-is-for" className="mt-16 scroll-mt-28">
            <SectionTitle eyebrow="Fit check" title="Who this guide is for" />
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                ["Students and freshers", "You want a modern portfolio and practical project experience before applying for internships or entry-level work."],
                ["Career switchers", "You already have communication, business, teaching, design, research or operational experience and want to add AI capability."],
                ["Freelancers and creators", "You want to improve delivery speed, package repeatable services and produce more consistent client or audience outcomes."],
                ["Small-business professionals", "You need practical AI use cases for marketing, documentation, customer support, research or team productivity."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-[26px] border border-slate-200 bg-white p-6">
                  <Users className="h-7 w-7 text-blue-700" />
                  <h3 className="mt-5 text-xl font-black">{title}</h3>
                  <p className="mt-3 text-base leading-8 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[26px] border border-amber-200 bg-amber-50 p-6 text-base leading-8 text-amber-950">
              <strong>This guide is not a shortcut:</strong> it is not designed for anyone looking for guaranteed employment, instant income, fabricated portfolio work or a way to avoid learning the fundamentals of a profession.
            </div>
          </section>

          <section id="career-paths" className="mt-16 scroll-mt-28">
            <SectionTitle eyebrow="Choose your depth" title="Three practical AI career paths" description="Start with the path that matches the work you want to perform, not the most technical path by default." />
            <div className="space-y-6">
              {PATHS.map((path, index) => {
                const Icon = path.icon;
                return (
                  <div key={path.title} className="rounded-[24px] border border-slate-200 bg-white p-5 sm:p-7">
                    <div className="grid gap-6 sm:grid-cols-[72px_minmax(0,1fr)]">
                      <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"><Icon className="h-8 w-8" /></span>
                      <div>
                        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-700">{path.label}</p>
                        <h3 className="mt-2 text-[28px] font-black tracking-[-0.035em]">{path.title}</h3>
                        <p className="mt-3 text-sm font-bold text-slate-500">Best for: {path.bestFor}</p>
                        <p className="mt-4 text-[17px] leading-8 text-slate-700">{path.description}</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {path.examples.map((example) => <span key={example} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">{example}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="skills" className="mt-16 scroll-mt-28">
            <SectionTitle eyebrow="Skill stack" title="Skills you actually need" description="AI literacy is important, but the differentiating skills are usually judgement, verification and professional execution." />
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse text-left">
                  <thead className="bg-[#071b43] text-white">
                    <tr><th className="px-5 py-4 text-sm">Skill</th><th className="px-5 py-4 text-sm">What it means in practice</th><th className="px-5 py-4 text-sm">Priority</th></tr>
                  </thead>
                  <tbody>
                    {SKILLS.map(([skill, meaning, priority]) => (
                      <tr key={skill} className="border-t border-slate-200 align-top">
                        <td className="px-5 py-5 font-bold text-slate-950">{skill}</td>
                        <td className="px-5 py-5 text-sm leading-7 text-slate-600">{meaning}</td>
                        <td className="px-5 py-5"><span className="rounded-full bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">{priority}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="roadmap" className="mt-16 scroll-mt-28">
            <SectionTitle eyebrow="Execution roadmap" title="Step-by-step learning roadmap" description="Follow the sequence long enough to create visible proof instead of repeatedly restarting with a new course or tool." />
            <div className="relative space-y-5 before:absolute before:bottom-8 before:left-[27px] before:top-8 before:w-px before:bg-blue-200 sm:before:left-[35px]">
              {ROADMAP.map((step) => (
                <div key={step.number} className="relative grid grid-cols-[56px_minmax(0,1fr)] gap-4 sm:grid-cols-[72px_minmax(0,1fr)] sm:gap-6">
                  <span className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 text-sm font-black text-white shadow-lg sm:h-[70px] sm:w-[70px]">{step.number}</span>
                  <div className="rounded-[26px] border border-slate-200 bg-white p-6 sm:p-7">
                    <h3 className="text-xl font-black tracking-[-0.025em] sm:text-2xl">{step.title}</h3>
                    <p className="mt-3 text-[17px] leading-8 text-slate-650">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="workflow" className="mt-16 scroll-mt-28">
            <SectionTitle eyebrow="Visual workflow" title="The human-plus-AI production system" description="AI is most useful when it sits inside a controlled process with clear inputs, checks and responsibility." />
            <div className="overflow-hidden rounded-[24px] border border-blue-200 bg-[linear-gradient(135deg,#eff6ff,#ffffff_48%,#fff8df)] p-5 sm:p-7">
              <div className="grid gap-4 lg:grid-cols-5">
                {[
                  ["01", "Brief", "Define user, goal, constraints and success criteria."],
                  ["02", "Source", "Collect reliable context, examples and reference material."],
                  ["03", "Create", "Generate or transform a first version with clear instructions."],
                  ["04", "Review", "Verify facts, privacy, originality, tone and practical usefulness."],
                  ["05", "Deliver", "Format the final output and document decisions or limitations."],
                ].map(([number, title, text], index) => (
                  <div key={title} className="relative rounded-[24px] border border-white bg-white/90 p-5 shadow-sm">
                    <span className="text-xs font-black text-blue-600">{number}</span>
                    <h3 className="mt-3 text-lg font-black">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                    {index < 4 ? <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-blue-700 p-1 text-white lg:block" /> : null}
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-[#071b43] px-5 py-4 text-sm leading-7 text-blue-100">
                <strong className="text-white">Human responsibility remains:</strong> the person delivering the work must decide whether the output is accurate, appropriate, ethical and ready to use.
              </div>
            </div>
          </section>

          <section id="projects" className="mt-16 scroll-mt-28">
            <SectionTitle eyebrow="Proof of work" title="Portfolio project ideas for beginners" description="Each project should show both the final deliverable and the thinking that made it dependable." />
            <div className="grid gap-5 sm:grid-cols-2">
              {PROJECTS.map((project) => (
                <div key={project.title} className="rounded-[28px] border border-slate-200 bg-white p-6">
                  <div className="flex items-center justify-between gap-4">
                    <BriefcaseBusiness className="h-7 w-7 text-blue-700" />
                    <span className="rounded-full bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800">{project.level}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-black">{project.title}</h3>
                  <p className="mt-3 text-sm font-bold text-slate-900">Deliverable</p>
                  <p className="mt-1 text-base leading-7 text-slate-600">{project.outcome}</p>
                  <p className="mt-4 text-sm font-bold text-slate-900">What your case study should prove</p>
                  <p className="mt-1 text-base leading-7 text-slate-600">{project.proof}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-10 rounded-[24px] bg-[#0b2b6f] p-6 text-white sm:p-8">
            <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
              <div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-200">Build with guidance</p><h2 className="mt-3 text-2xl font-black tracking-[-0.03em] sm:text-3xl">Turn one project idea into a focused learning plan.</h2><p className="mt-3 max-w-2xl text-base leading-7 text-blue-100">Use the free masterclass to understand practical workflow thinking before you spend months collecting unrelated tools.</p></div>
              <RegisterButton label="Register Free" />
            </div>
          </div>

          <section id="tools" className="mt-16 scroll-mt-28">
            <SectionTitle eyebrow="Tool strategy" title="Choose tools by role in the workflow" description="A stable five-layer system is more useful than a long list of fashionable products." />
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[780px] border-collapse text-left">
                  <thead className="bg-slate-100"><tr><th className="px-5 py-4 text-sm">Layer</th><th className="px-5 py-4 text-sm">Purpose</th><th className="px-5 py-4 text-sm">Selection question</th></tr></thead>
                  <tbody>{TOOL_FRAMEWORK.map(([layer, purpose, question]) => <tr key={layer} className="border-t border-slate-200 align-top"><td className="px-5 py-5 font-bold">{layer}</td><td className="px-5 py-5 text-sm leading-7 text-slate-600">{purpose}</td><td className="px-5 py-5 text-sm leading-7 text-slate-600">{question}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="rounded-[26px] border border-emerald-200 bg-emerald-50 p-6"><ShieldCheck className="h-7 w-7 text-emerald-700" /><h3 className="mt-4 text-xl font-black">Responsible selection</h3><p className="mt-3 text-base leading-8 text-emerald-950">Check data handling, privacy, ownership, accuracy limitations, accessibility and whether the tool is permitted in the environment where you plan to work.</p></div>
              <div className="rounded-[26px] border border-amber-200 bg-amber-50 p-6"><Lightbulb className="h-7 w-7 text-amber-700" /><h3 className="mt-4 text-xl font-black">Avoid tool dependency</h3><p className="mt-3 text-base leading-8 text-amber-950">Keep your process portable. Save briefs, source material, checklists and project documentation so your capability survives when pricing, features or product availability changes.</p></div>
            </div>
          </section>

          <section id="opportunities" className="mt-16 scroll-mt-28">
            <SectionTitle eyebrow="Opportunity map" title="Career and freelance directions" description="These are work categories, not guaranteed job titles or income claims. Your opportunity depends on proof, demand, communication and execution quality." />
            <div className="grid gap-5 sm:grid-cols-2">
              {OPPORTUNITIES.map((item) => <div key={item.title} className="rounded-[26px] border border-slate-200 bg-white p-6"><Target className="h-7 w-7 text-blue-700" /><h3 className="mt-4 text-xl font-black">{item.title}</h3><p className="mt-3 text-base leading-8 text-slate-600">{item.description}</p></div>)}
            </div>
          </section>

          <section id="plan" className="mt-16 scroll-mt-28">
            <SectionTitle eyebrow="Action plan" title="A realistic 30/60/90-day plan" description="Treat this as a practice framework, not a promise that every learner will reach the same outcome in ninety days." />
            <div className="grid gap-5 lg:grid-cols-3">
              {PLAN.map((phase, index) => (
                <div key={phase.period} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white">
                  <div className="bg-[#071b43] p-6 text-white"><p className="text-xs font-black uppercase tracking-[0.16em] text-blue-200">Phase 0{index + 1}</p><h3 className="mt-3 text-2xl font-black">{phase.period}</h3><p className="mt-2 text-sm text-blue-100">{phase.title}</p></div>
                  <div className="space-y-4 p-6">{phase.actions.map((action) => <div key={action} className="flex items-start gap-3 text-sm leading-6 text-slate-700"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />{action}</div>)}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="mistakes" className="mt-16 scroll-mt-28">
            <SectionTitle eyebrow="Avoidable errors" title="Common mistakes that weaken an AI career plan" />
            <div className="grid gap-4 sm:grid-cols-2">
              {MISTAKES.map((mistake, index) => <div key={mistake} className="flex items-start gap-4 rounded-[24px] border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950"><span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-black">{String(index + 1).padStart(2, "0")}</span>{mistake}</div>)}
            </div>
          </section>

          <section id="methodology" className="mt-16 scroll-mt-28">
            <SectionTitle eyebrow="Editorial standard" title="Sources, verification and methodology" />
            <div className="space-y-5 rounded-[28px] border border-emerald-200 bg-emerald-50 p-6 text-base leading-8 text-emerald-950 sm:p-8">
              <p>This guide is educational and uses a workflow-first framework rather than salary predictions, hiring guarantees or unverifiable market statistics. It distinguishes between non-coding AI-assisted work and technical AI engineering so beginners can choose an appropriate starting depth.</p>
              <p>Tool features, pricing, access conditions and employer requirements can change. Before making a purchase, sharing sensitive information or applying for a role, verify the current official documentation, privacy terms, role description and local requirements.</p>
              <p>Portfolio examples should be truthful. Clearly explain your contribution, use permitted source material, respect confidentiality and do not fabricate testimonials, performance results or client relationships.</p>
              <div className="flex flex-wrap gap-3 pt-2"><Link href="/editorial-policy" className="rounded-full border border-emerald-300 bg-white px-4 py-2 text-sm font-bold text-emerald-800">Editorial policy</Link><Link href="/authors/sikhadenge-editorial-team" className="rounded-full border border-emerald-300 bg-white px-4 py-2 text-sm font-bold text-emerald-800">Editorial team</Link><Link href="/disclaimer" className="rounded-full border border-emerald-300 bg-white px-4 py-2 text-sm font-bold text-emerald-800">Disclaimer</Link></div>
            </div>
          </section>

          <section id="faq" className="mt-16 scroll-mt-28">
            <SectionTitle eyebrow="Detailed answers" title="Frequently asked questions" />
            <div className="space-y-3">
              {FAQS.map(([question, answer]) => (
                <details key={question} className="group rounded-[24px] border border-slate-200 bg-white px-5 py-1 open:border-blue-200 sm:px-7">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-base font-black text-slate-950 sm:text-lg">{question}<ChevronDown className="h-5 w-5 shrink-0 text-blue-700 transition group-open:rotate-180" /></summary>
                  <p className="border-t border-slate-100 pb-6 pt-5 text-base leading-8 text-slate-600">{answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-14 rounded-[24px] bg-[linear-gradient(135deg,#071b43,#1748c7)] p-6 text-white sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-200">Next practical step</p>
            <h2 className="mt-4 max-w-3xl text-[29px] font-black leading-[1.1] tracking-[-0.035em] text-white sm:text-[38px]">Move from reading to one focused AI workflow.</h2>
            <p className="mt-5 max-w-3xl text-lg leading-9 text-blue-100">Choose a direction, complete the first project and use feedback to improve. The free Gen AI Masterclass can help you organise the starting plan without claiming guaranteed career results.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row"><RegisterButton label="Register for Free Masterclass" /><Link href="/ai-skills" className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/15">Explore AI skills</Link></div>
          </section>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-5">
            <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)]">
              <div className="bg-[#071b43] p-6 text-white">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-200">Free practical session</p>
                <h2 className="mt-3 text-2xl font-black leading-tight">Build your AI career action plan</h2>
                <p className="mt-3 text-sm leading-7 text-blue-100">Continue from this guide into a structured Gen AI learning session.</p>
              </div>
              <div className="p-6">
                <div className="space-y-3">{["Beginner-friendly learning direction", "Workflow and portfolio guidance", "Direct one-step registration"].map((item) => <div key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-700"><BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />{item}</div>)}</div>
                <div className="mt-6"><RegisterButton label="Join Free Masterclass" /></div>
                <p className="mt-4 text-xs leading-5 text-slate-500">No guaranteed employment, income or ranking claims.</p>
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-3"><FileCheck2 className="h-6 w-6 text-blue-700" /><h2 className="text-lg font-black">Guide summary</h2></div>
              <dl className="mt-5 divide-y divide-slate-100 text-sm">
                {[['Starting level','Complete beginner'],['Coding required','No, for the starting paths'],['Primary goal','Workflow plus proof of work'],['Recommended output','Three reviewed projects'],['Review standard','Human verification required']].map(([term, value]) => <div key={term} className="py-3"><dt className="font-bold text-slate-500">{term}</dt><dd className="mt-1 font-bold leading-6 text-slate-900">{value}</dd></div>)}
              </dl>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-black">Related learning hubs</h2>
              <div className="mt-4 space-y-2">{[["/ai-skills","AI Skills"],["/ai-tools","AI Tools"],["/ai-career-paths","AI Career Paths"],["/blog/how-to-build-ai-portfolio","Build an AI Portfolio"]].map(([href,label]) => <Link key={href} href={href} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700">{label}<ArrowRight className="h-4 w-4" /></Link>)}</div>
            </section>
          </div>
        </aside>
      </div>

      <div className="fixed inset-x-3 bottom-3 z-40 lg:hidden">
        <Link href={MASTERCLASS_URL} className="flex items-center justify-between gap-4 rounded-2xl bg-[#071b43] px-5 py-4 text-white shadow-[0_20px_60px_rgba(2,8,23,0.35)]">
          <span><span className="block text-xs font-bold uppercase tracking-[0.13em] text-blue-200">Free Gen AI Masterclass</span><span className="mt-1 block text-sm font-black">Build your action plan</span></span>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f5b301] text-slate-950"><ArrowRight className="h-5 w-5" /></span>
        </Link>
      </div>
    </main>
  );
}

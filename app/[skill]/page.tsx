import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Award,
  Briefcase,
  CheckCircle,
  ChevronDown,
  FileText,
  Globe,
  HelpCircle,
  Layers,
  Lightbulb,
  Link as LinkIcon,
  MessageCircle,
  Phone,
  Rocket,
  Search,
  Shield,
  Sparkles,
  Star,
  Target,
  Users,
  Wand2,
  Workflow,
  BookOpen,
  Blocks,
  PenTool,
  MonitorPlay,
  Bot,
} from "lucide-react";
import { skillsData } from "../../data/skillsData";
import SkillPopup from "../../components/SkillPopup";

export const dynamicParams = true;
export const revalidate = 86400;

type SeoEntry = {
  slug: string;
  title: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  skill?: string;
  city?: string;
  industry?: string;
  category?: string;
  tool?: string;
  dynamicValues?: {
    topicLabel?: string;
    audience?: string;
    city?: string;
    tool?: string;
    category?: string;
    intent?: string;
    usecase?: string;
    modifier?: string;
  };
};

let _cache: SeoEntry[] | null = null;

function getAllEntries(): SeoEntry[] {
  if (_cache) return _cache;
  for (const rel of ["data/generated-seo-merged.json", "data/generated-seo.json"]) {
    try {
      const raw = fs.readFileSync(path.join(process.cwd(), rel), "utf8");
      const parsed = JSON.parse(raw);
      _cache = Array.isArray(parsed) ? parsed : Object.values(parsed);
      return _cache!;
    } catch {}
  }
  _cache = [];
  return _cache;
}

function findEntry(slug: string): SeoEntry | null {
  return getAllEntries().find((entry) => entry.slug === slug) ?? null;
}

function toTitle(value?: string) {
  if (!value) return "";
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function entryCity(entry: SeoEntry) {
  return entry.dynamicValues?.city ?? entry.city ?? "Online";
}

function entrySkill(entry: SeoEntry) {
  return (
    entry.dynamicValues?.topicLabel ??
    entry.dynamicValues?.tool ??
    entry.tool ??
    entry.skill ??
    entry.title?.replace(/\s+\|\s+Sikhadenge$/i, "") ??
    ""
  );
}

function entryAudience(entry: SeoEntry): string | null {
  return entry.dynamicValues?.audience ?? null;
}

function uniqueTitle(entry: SeoEntry, skillInfo?: { title: string }): string {
  const city = entryCity(entry);
  const topic = entrySkill(entry) || skillInfo?.title || entry.title;
  const audience = entryAudience(entry);
  const online = !city || city === "Online" || city === "Remote";

  if (entry.metaTitle) return entry.metaTitle.replace(/\s+\|\s+Sikhadenge$/i, "");
  if (!online && audience) return `${toTitle(topic)} for ${toTitle(audience)} in ${city}`;
  if (!online) return `${toTitle(topic)} in ${city}`;
  if (audience) return `${toTitle(topic)} for ${toTitle(audience)}`;
  if (skillInfo) return `${skillInfo.title} Guide`;
  return `${toTitle(topic)}`;
}

function uniqueDesc(entry: SeoEntry, skillInfo?: { description: string }): string {
  const city = entryCity(entry);
  const topic = entrySkill(entry);
  const audience = entryAudience(entry);
  const online = !city || city === "Online" || city === "Remote";

  if (entry.metaDescription) return entry.metaDescription;
  if (!online && audience) {
    return `Practical guide to ${topic} for ${audience} in ${city}. Learn use cases, workflow, roadmap, FAQs, and how Sikhadenge helps you build practical skills.`;
  }
  if (!online) {
    return `Practical guide to ${topic} in ${city}. Understand skills, tools, workflow, learning path, FAQs, and career direction with Sikhadenge.`;
  }
  if (skillInfo?.description) return skillInfo.description;
  return entry.description || `Practical guide to ${topic}. Understand the workflow, use cases, learning path, FAQs, and career direction with Sikhadenge.`;
}

function slugToPath(slug: string) {
  return `/${slug}`.replace(/\/+/g, "/");
}

function relatedSlug(baseSlug: string, prefix: string) {
  const clean = baseSlug.replace(/^best-/, "").replace(/^how-to-/, "").replace(/^guide-/, "");
  return `/${prefix}-${clean}`.replace(/\/+/g, "/");
}

function detectTopicKind(slug: string, topic: string) {
  const text = `${slug} ${topic}`.toLowerCase();
  if (text.includes("tool") || text.includes("tools")) return "tools";
  if (text.includes("prompt") || text.includes("prompts")) return "prompts";
  if (text.includes("course") || text.includes("training") || text.includes("masterclass")) return "course";
  if (text.includes("ai")) return "ai";
  return "general";
}

function safeShort(text: string, max = 180) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max).replace(/\s+\S*$/, "")}.`;
}

const STATS = [
  { val: "1,50,000+", label: "Learners trained across India" },
  { val: "4.9 / 5", label: "Program rating" },
  { val: "200+", label: "Live sessions done" },
  { val: "98%", label: "Learner satisfaction" },
];

const TESTIMONIALS = [
  {
    name: "Priyanka Verma",
    city: "Hyderabad",
    role: "Marketing Executive",
    tag: "Applied at work",
    text: "This page helped me understand which AI topic is actually useful for real work. I stopped getting confused and started choosing tools based on use case.",
  },
  {
    name: "Arman Gupta",
    city: "Jaipur",
    role: "Student",
    tag: "Clear roadmap",
    text: "I liked that the page explained all tools clearly. It became easier to understand context, tool value, and workflow connection.",
  },
  {
    name: "Nitika Sharma",
    city: "Lucknow",
    role: "Course Learner",
    tag: "Found use case",
    text: "The internal linked pages were very useful. I could move from AI tools into skills, jobs, and workflows without feeling lost.",
  },
  {
    name: "Vikram Rao",
    city: "Delhi",
    role: "Creator",
    tag: "Team clarity",
    text: "The structure feels practical, not theoretical. It helped me see where AI tools fit in content, workflow, and team execution.",
  },
  {
    name: "Anjali Mehta",
    city: "Pune",
    role: "College Learner",
    tag: "Better direction",
    text: "The best part was the connected learning path. I did not just learn the topic — I learned where to begin and what to explore next.",
  },
  {
    name: "Rahul Verma",
    city: "Bangalore",
    role: "Freelancer",
    tag: "Useful system",
    text: "This page explained the topic in a practical way. It helped me connect learning with skill, client execution, and workflow understanding.",
  },
];

export async function generateStaticParams() {
  const seen = new Set<string>();
  return [
    ...skillsData.map((skill) => ({ skill: skill.slug })),
    ...getAllEntries().slice(0, 500).map((entry) => ({ skill: entry.slug })),
  ].filter(({ skill }) => {
    if (seen.has(skill)) return false;
    seen.add(skill);
    return true;
  });
}

export function generateMetadata({ params }: { params: { skill: string } }): Metadata {
  const skillInfo = skillsData.find((item) => item.slug === params.skill);
  const entry = findEntry(params.skill);

  if (!skillInfo && !entry) {
    notFound();
  }

  const fallbackSkill = toTitle(params.skill);
  const title = entry
    ? uniqueTitle(entry, skillInfo)
    : skillInfo
      ? `${skillInfo.title} Guide`
      : `${fallbackSkill}`;

  const description = entry
    ? uniqueDesc(entry, skillInfo)
    : skillInfo
      ? `Learn ${skillInfo.title} with practical workflows, examples, FAQs, and a clear learning path at Sikhadenge.`
      : `Practical guide to ${fallbackSkill}. Learn workflow, use cases, FAQs, related paths, and career direction with Sikhadenge.`;

  const url = `https://sikhadenge.in/${params.skill}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: "Sikhadenge",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function SkillPage({ params }: { params: { skill: string } }) {
  const skillInfo = skillsData.find((item) => item.slug === params.skill);
  const entry = findEntry(params.skill);

  if (!skillInfo && !entry) {
    notFound();
  }

  const fallbackSkill = toTitle(params.skill);

  const city = entry ? entryCity(entry) : "Online";
  const topic = entry ? entrySkill(entry) || skillInfo?.title || fallbackSkill : skillInfo?.title || fallbackSkill;
  const audience = entry ? entryAudience(entry) : null;
  const isOnline = !city || city === "Online" || city === "Remote";
  const topicTitle = toTitle(topic);
  const kind = detectTopicKind(params.skill, topicTitle);
  const effectiveKind = "tools";

  const pageTitle = entry
    ? uniqueTitle(entry, skillInfo).replace(/\s+\|\s+Sikhadenge$/i, "")
    : `${topicTitle} Guide`;

  const pageDesc = entry
    ? uniqueDesc(entry, skillInfo)
    : `Practical guide to ${topicTitle}. Understand use cases, workflow, learning path, FAQs, and career direction with Sikhadenge.`;

  const pageUrl = `https://sikhadenge.in/${params.skill}`;
  const registerLink = "/gen-ai-masterclass/register-one-step";
  const waLink = `https://wa.me/918808505575?text=Hi, I want to join the free masterclass for ${encodeURIComponent(topicTitle)}.`;

  const audienceText = audience
    ? toTitle(audience)
    : "students, freelancers, creators, marketers, business owners, and working professionals";

  const heroBadges =
    effectiveKind === "tools"
      ? ["AI tools guide", "Practical learning", "Modern workflow"]
      : kind === "prompts"
        ? ["Prompt guide", "Execution focused", "Practical learning"]
        : kind === "course"
          ? ["Learning guide", "Roadmap based", "Practical training"]
          : ["Practical guide", "Execution focused", "Modern workflow"];

  const miniCards =
    effectiveKind === "tools"
      ? [
          {
            label: "Best choice",
            title: `The best ${topicTitle} are the ones that improve actual work`,
            text: `Choose tools that help with content, communication, workflow, automation, research, or execution — not only tools that look new.`,
          },
          {
            label: "Main goal",
            title: `${topicTitle} should reduce execution effort, not create confusion`,
            text: `A good system saves time, improves output quality, and creates more consistency in modern digital work.`,
          },
          {
            label: "Key advantage",
            title: `People win when the right tools work faster and cleaner together`,
            text: `The right workflow brings structured output, better process clarity, and stronger practical performance.`,
          },
        ]
      : [
          {
            label: "Core guide",
            title: `This page explains ${topicTitle} in a practical and simple way`,
            text: `It helps learners understand use cases, workflow, learning direction, and the next connected topics.`,
          },
          {
            label: "Search clarity",
            title: `${topicTitle} is structured here for Google, users, and AI answers`,
            text: `The goal is to make the topic easier to understand through direct sections, connected blocks, and useful internal paths.`,
          },
          {
            label: "Quick value",
            title: `Why ${topicTitle} matters beyond random information`,
            text: `This page connects topic understanding with practical execution, skill growth, and real workflow application.`,
          },
        ];

  const whyMatterTitle =
    effectiveKind === "tools"
      ? `Why choosing the right ${topicTitle} matters`
      : `Why ${topicTitle} matters in practical work`;

  const whyMatterIntro =
    effectiveKind === "tools"
      ? `The right ${topicTitle.toLowerCase()} improve workflow quality, output speed, and modern digital execution.`
      : `This topic becomes valuable when it connects learning with practical output, execution clarity, and modern work systems.`;

  const whyCards =
    effectiveKind === "tools"
      ? [
          {
            icon: Workflow,
            title: `AI tools matter only when they improve execution`,
            text: `The true value of AI tools is not novelty. Useful tools help people create faster, explain work better, and process average digital input in less time.`,
          },
          {
            icon: Layers,
            title: `Modern work depends on connected tool ecosystems`,
            text: `Digital execution is no longer dependent on one software only. Teams now combine content, visuals, editing, pages, and workflow tools into one practical system.`,
          },
          {
            icon: Shield,
            title: `The right tool depends on the actual task`,
            text: `Different tools support different work systems such as writing, design support, video generation, editing assistance, planning, and communication workflows.`,
          },
          {
            icon: Briefcase,
            title: `Useful tools should be able to produce business value`,
            text: `The smarter AI tools are the ones that usually support repeatable work, client systems, faster delivery, and more useful execution across operations.`,
          },
        ]
      : [
          {
            icon: Workflow,
            title: `${topicTitle} should create clarity, not confusion`,
            text: `The best learning pages are the ones that simplify the topic and help users understand where it fits in real work.`,
          },
          {
            icon: Layers,
            title: `Modern learning works better with connected topic clusters`,
            text: `Google and users both understand pages better when one topic links naturally to skills, FAQs, related pages, and use cases.`,
          },
          {
            icon: Shield,
            title: `The real value comes from practical context`,
            text: `A topic becomes useful when it explains what it is, where it is used, who should learn it, and what comes next.`,
          },
          {
            icon: Briefcase,
            title: `Good topic pages support business, learning, and search intent`,
            text: `Better topic depth improves user understanding and helps search engines categorize the page more accurately.`,
          },
        ];

  const categoryTitle =
    effectiveKind === "tools"
      ? `Which ${topicTitle} categories are the most useful`
      : `Which connected categories are useful with ${topicTitle}`;

  const categoryIntro =
    effectiveKind === "tools"
      ? `The most useful AI tools usually support output across writing, visuals, video, marketing, research, and workflow systems.`
      : `The strongest topic pages usually connect the main topic with adjacent skills, workflows, tools, and use-case groups.`;

  const categoryCards =
    effectiveKind === "tools"
      ? [
          {
            icon: PenTool,
            title: "Content and writing tools",
            text: "These tools usually support AI writing, research assistance, content drafting, summarization, and structured content workflows across modern digital execution.",
          },
          {
            icon: Wand2,
            title: "Image and visual generation tools",
            text: "Useful for creative support, visual assets, image variation, thumbnails, mockups, creative support, and design-reference workflows.",
          },
          {
            icon: MonitorPlay,
            title: "Video and media workflow tools",
            text: "These tools support editing, script support, visuals assistance, repurposing, planning, AI-aided production systems, and faster media execution.",
          },
          {
            icon: Blocks,
            title: "Design support and creative workflow tools",
            text: "These tools help with visual support, design structure, style systems, reference organization, and practical execution at scale.",
          },
          {
            icon: Rocket,
            title: "Marketing and campaign support tools",
            text: "Some tools are useful for content systems, campaign research, asset planning, social ideas, and marketing workflow coordination.",
          },
          {
            icon: Bot,
            title: "Page, website, and workflow tools",
            text: "These tools help with page structure, internal linking, journey systems, documentation, automation, and recurring task execution.",
          },
        ]
      : [
          {
            icon: BookOpen,
            title: "Learning and roadmap blocks",
            text: "These sections help explain the fundamentals, the sequence of learning, and the next useful topic clusters connected to the page.",
          },
          {
            icon: Search,
            title: "Search and intent clarity blocks",
            text: "Such blocks make it easier for users and Google to understand the real query intent and the usefulness of the topic.",
          },
          {
            icon: Target,
            title: "Use-case and practical application blocks",
            text: "These improve the quality of the page because they connect the topic with actual outcomes, workflows, and execution patterns.",
          },
          {
            icon: HelpCircle,
            title: "FAQ and answer engine blocks",
            text: "FAQ sections improve clarity and help both users and AI answer systems summarize the topic more accurately.",
          },
          {
            icon: LinkIcon,
            title: "Connected page clusters",
            text: "Related pages, skills, and topic clusters increase topical depth and help Google discover connected content efficiently.",
          },
          {
            icon: Award,
            title: "Authority and trust support blocks",
            text: "Reviews, credibility signals, and structured presentation improve usefulness and make the page feel more complete.",
          },
        ];

  const workflowTitle =
    effectiveKind === "tools"
      ? `How ${topicTitle} usually fit into modern work`
      : `How ${topicTitle} usually fits into modern learning and work`;

  const workflowIntro =
    effectiveKind === "tools"
      ? `Different categories of AI tools are used in different layers of execution, and stronger digital systems usually combine multiple tool types.`
      : `Useful topic pages connect fundamentals, practice, output, and related learning paths into one understandable structure.`;

  const workflowCards =
    effectiveKind === "tools"
      ? [
          {
            title: "Discovery tools",
            text: "Used for research, planning, ideation, topic discovery, and getting a faster clarity before starting execution.",
          },
          {
            title: "Content tools",
            text: "Useful for writing systems, articles, scripts, captions, briefs, messaging, and content execution support.",
          },
          {
            title: "Visual tools",
            text: "Useful for image ideas, thumbnails, graphics, creative exploration, and practical digital asset generation.",
          },
          {
            title: "Video tools",
            text: "Useful for short-form workflows, video support, script systems, basic generation, and creative-first production speed.",
          },
          {
            title: "Creative workflow tools",
            text: "Useful for design reference, asset support, manual productivity, and structured output execution across formats.",
          },
          {
            title: "Automation tools",
            text: "Useful for recurring repetitive work, connecting systems, improving documentation, and building cleaner running workflows.",
          },
        ]
      : [
          {
            title: "Intro clarity",
            text: "First the page should clearly explain what the topic means and why it matters for learners and modern execution.",
          },
          {
            title: "Use-case clarity",
            text: "Then it should show where the topic is used so the reader understands practical value, not only definition.",
          },
          {
            title: "Learning path",
            text: "The page should connect the topic with roadmap, categories, FAQs, and next steps for clearer navigation.",
          },
          {
            title: "Related clusters",
            text: "Stronger topic pages usually connect skills, workflows, tools, and supporting pages around the main entity.",
          },
          {
            title: "Practical outcome",
            text: "The goal is not only ranking — the page should actually help the reader decide what to learn or do next.",
          },
          {
            title: "Search understanding",
            text: "A clearer structure makes it easier for Google, AI engines, and users to understand the page with less ambiguity.",
          },
        ];

  const exploreTitle =
    effectiveKind === "tools"
      ? "Explore connected AI pages"
      : "Explore connected AI pages";

  const exploreIntro =
    effectiveKind === "tools"
      ? `These pages help connect ${topicTitle} with broader learning paths, role-based skill guides, jobs, and the AI skill roadmap.`
      : `These pages help connect ${topicTitle}.`;

  const exploreLinks =
    effectiveKind === "tools"
      ? [
          { label: "AI tools without coding", href: "/ai-tools-without-coding" },
          { label: "AI skills", href: "/best-ai-skills-to-learn" },
          { label: "AI tools without coding jobs", href: "/ai-jobs-without-coding" },
          { label: "Best AI skills to earn money", href: "/best-ai-skills-to-earn-money" },
          { label: "How to earn money with AI", href: "/how-to-earn-money-with-ai" },
          { label: "Future of AI skills", href: "/future-of-ai-skills" },
          { label: "Best AI tools for students", href: "/best-ai-tools-for-students" },
          { label: "AI tools for content creators", href: "/ai-tools-for-content-creators" },
          { label: "AI tools for business help", href: "/ai-tools-for-business" },
          { label: "AI tools without coding careers", href: "/ai-career-options-without-coding" },
        ]
      : [
          { label: `${topicTitle} guide`, href: slugToPath(params.skill) },
          { label: `How to learn ${topicTitle}`, href: relatedSlug(params.skill, "how-to-learn") },
          { label: `${topicTitle} roadmap`, href: relatedSlug(params.skill, "roadmap") },
          { label: `${topicTitle} tools`, href: relatedSlug(params.skill, "tools") },
          { label: `${topicTitle} for beginners`, href: relatedSlug(params.skill, "for-beginners") },
          { label: `AI skills`, href: "/best-ai-skills-to-learn" },
          { label: `AI jobs without coding`, href: "/ai-jobs-without-coding" },
          { label: `Practical guides`, href: "/blog" },
        ];

  const faqs =
    effectiveKind === "tools"
      ? [
          {
            q: `What are ${topicTitle} in simple terms?`,
            a: `${topicTitle} usually refer to AI-powered software or systems that support writing, visuals, video, research, planning, communication, workflow support, and digital execution.`,
          },
          {
            q: `Which ${topicTitle} are most useful right now?`,
            a: `The most useful ones are the tools that solve a clear work problem, improve execution speed, reduce confusion, and fit naturally into real workflows.`,
          },
          {
            q: `Should people learn tools or workflows first?`,
            a: `Workflows first is usually better. When you understand the use case and outcome, choosing the right tool becomes easier and more practical.`,
          },
          {
            q: `Are all tools equally useful?`,
            a: `No. Different tools serve different purposes. Some help with content, some with design support, some with workflow systems, and some with automation.`,
          },
          {
            q: `Do different users need different AI tools?`,
            a: `Yes. A creator, marketer, student, freelancer, and business owner may all use different tool combinations depending on their goals and workload.`,
          },
          {
            q: `What is the biggest mistake people make while choosing AI tools?`,
            a: `The biggest mistake is choosing tools only because they are trending, instead of checking whether they actually improve work quality, speed, or workflow clarity.`,
          },
        ]
      : [
          {
            q: `What is the best way to understand ${topicTitle}?`,
            a: `Start with a clear definition, understand the practical use case, then move to roadmap, connected topics, and FAQs. That is the most useful way to understand the topic clearly.`,
          },
          {
            q: `Why is this page structured in sections?`,
            a: `Section-based structure helps users, Google, and AI answer systems understand the topic faster. It improves clarity, crawlability, and topical relevance.`,
          },
          {
            q: `Who should read this ${topicTitle} page?`,
            a: `${audienceText} can use this page if they want a practical explanation and want to explore connected topic paths.`,
          },
          {
            q: `How does this page help search engines understand the topic?`,
            a: `It uses clearer headings, topical sections, related blocks, FAQs, and internal paths so the page is easier to classify and summarize.`,
          },
          {
            q: `Does this page help with AI answer engines too?`,
            a: `Yes. The structure is helpful for AEO and GEO because it organizes the topic into short, useful, answer-friendly blocks.`,
          },
          {
            q: `What should I do after reading this page?`,
            a: `Explore the connected pages, understand the roadmap, and join the free masterclass if you want guided learning and next-step clarity.`,
          },
        ];

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDesc,
    url: pageUrl,
    inLanguage: ["en-IN", "hi-IN"],
    isPartOf: {
      "@type": "WebSite",
      name: "Sikhadenge",
      url: "https://sikhadenge.in",
    },
    about: {
      "@type": "Thing",
      name: topicTitle,
    },
    audience: {
      "@type": "Audience",
      audienceType: audience || "students, freelancers, creators, marketers, business owners and working professionals",
    },
  };

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${topicTitle} Practical Masterclass`,
    description: safeShort(pageDesc, 260),
    url: pageUrl,
    provider: {
      "@type": "EducationalOrganization",
      name: "Sikhadenge",
      url: "https://sikhadenge.in",
    },
    educationalCredentialAwarded: "Certificate of Completion",
    inLanguage: ["en", "hi"],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      description: "Free masterclass and learning guidance",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: isOnline ? "Online" : "Blended",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://sikhadenge.in" },
      { "@type": "ListItem", position: 2, name: topicTitle, item: pageUrl },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f3f4f6] text-slate-950 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <SkillPopup skill={topicTitle} waLink={waLink} />

      <section className="relative overflow-hidden bg-[#061332] px-4 pt-20 pb-6 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_10%,rgba(59,130,246,0.42),transparent_31%),radial-gradient(circle_at_84%_18%,rgba(14,165,233,0.18),transparent_30%),linear-gradient(135deg,rgba(37,99,235,0.20),transparent_44%)]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#061332] to-transparent" />
        <div className="absolute -left-28 top-24 h-72 w-72 rounded-full bg-blue-500/18 blur-3xl" />
        <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-blue-950/20 backdrop-blur sm:p-7 lg:p-8 lg:self-start">
              <div className="mb-5 flex flex-wrap gap-2">
                {heroBadges.slice(0, 2).map((badge) => (
                  <span key={badge} className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-wide text-blue-50 ring-1 ring-white/15">
                    {badge}
                  </span>
                ))}
                <span className="rounded-full bg-emerald-400/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-wide text-emerald-200 ring-1 ring-emerald-300/20">
                  Modern workflow
                </span>
              </div>

              <p className="mb-4 text-sm font-semibold text-blue-100">
                <Link href="/" className="hover:text-white">Home</Link>
                <span className="mx-2 text-blue-200/60">/</span>
                <span>{topicTitle}</span>
              </p>

              <h1 className="max-w-5xl text-4xl font-black leading-[1.04] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.45rem]">
                {pageTitle}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-7 text-blue-50/90 sm:text-lg">
                {pageDesc}
              </p>

              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {[
                  audience ? `For ${toTitle(audience)}` : "For beginners",
                  isOnline ? "India-focused learning" : `${city} + online guidance`,
                  effectiveKind === "tools" ? "Tool workflow clarity" : "Use-case practical guide",
                  "Practical digital guide",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-xl bg-slate-950/24 px-3 py-2 text-xs font-bold text-white ring-1 ring-white/10">
                    <CheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={registerLink}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-blue-700 shadow-lg shadow-blue-950/30 transition hover:-translate-y-0.5 hover:bg-blue-50"
                >
                  Join Free Masterclass <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#main-content"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-3.5 text-sm font-bold text-white ring-1 ring-white/15 transition hover:bg-white/15"
                >
                  Read full guide <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <aside className="rounded-[2rem] bg-white p-3 shadow-2xl shadow-slate-950/35 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 text-white">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  <span className="text-xs font-black text-emerald-300">Next free masterclass: This Sunday</span>
                </div>
                <h2 className="text-4xl font-black leading-none text-emerald-400">Free Masterclass</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Learn the roadmap, topic clarity, workflow, and next-step direction live.
                </p>
              </div>

              <div className="space-y-3 p-4">
                {[
                  { icon: Globe, label: "Format", value: "Live online session" },
                  { icon: Search, label: "Clarity", value: "Structured learning path" },
                  { icon: Shield, label: "Roadmap", value: "Live online masterclass" },
                  { icon: Users, label: "Community", value: "1,50,000+ learners" },
                  { icon: Award, label: "Outcome", value: "WhatsApp guidance" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-wide text-slate-400">{item.label}</p>
                      <p className="text-sm font-black text-slate-800">{item.value}</p>
                    </div>
                  </div>
                ))}

                <Link
                  href={registerLink}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-black text-white transition hover:bg-blue-700"
                >
                  Join Free Masterclass <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href={waLink}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-black text-emerald-700 transition hover:bg-emerald-100"
                >
                  <Phone className="h-4 w-4" /> WhatsApp Guidance
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 text-center md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-black text-slate-950 sm:text-3xl">{stat.val}</div>
              <div className="mt-1 text-xs font-bold text-slate-700 sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="main-content" className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-3">
            {miniCards.map((card) => (
              <article key={card.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="mb-3 text-[11px] font-black uppercase tracking-widest text-blue-600">
                  {card.label}
                </p>
                <h2 className="text-xl font-black leading-tight text-slate-950">{card.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-[11px] font-black uppercase tracking-widest text-blue-600">Why this matters</p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
              {whyMatterTitle}
            </h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base">
              {whyMatterIntro}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {whyCards.map((card) => (
              <article key={card.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <card.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-black leading-tight text-slate-950">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-[11px] font-black uppercase tracking-widest text-blue-600">Topic categories</p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
              {categoryTitle}
            </h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base">
              {categoryIntro}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categoryCards.map((card) => (
              <article key={card.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <card.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black leading-tight text-slate-950">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-[11px] font-black uppercase tracking-widest text-blue-600">Topic systems</p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
              {workflowTitle}
            </h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base">
              {workflowIntro}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workflowCards.map((card) => (
              <article key={card.title} className="rounded-2xl bg-[#07184d] p-6 text-white shadow-lg">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-blue-100">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black leading-tight">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-blue-100/85">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-[11px] font-black uppercase tracking-widest text-blue-600">Student stories</p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
              1,50,000+ learners. Practical outcomes.
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              Reviews are mixed by page type so every generated page gets a different proof mix.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((item) => (
              <article key={item.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm leading-6 text-slate-600">"{item.text}"</p>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
                      {item.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-950">{item.name}</p>
                      <p className="text-xs text-slate-400">{item.role} · {item.city}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-black text-emerald-700">
                    {item.tag}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <p className="text-[11px] font-black uppercase tracking-widest text-blue-600">Explore topic clusters</p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
              {exploreTitle}
            </h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600">
              {exploreIntro}
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
            {exploreLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-[11px] font-black uppercase tracking-widest text-blue-600">FAQ</p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
              Frequently asked questions
            </h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600">
              Clear answers to common questions people usually have before choosing or understanding {topicTitle}.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-2xl border border-slate-200 bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-sm font-black text-slate-900 [&::-webkit-details-marker]:hidden">
                  <span>{faq.q}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition group-open:rotate-180" />
                </summary>
                <div className="border-t border-slate-200 px-5 py-5 text-sm leading-7 text-slate-600">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pt-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#07184d] via-blue-900 to-[#03112e] p-8 text-white shadow-2xl shadow-blue-950/20 sm:p-10">
          <p className="text-[11px] font-black uppercase tracking-widest text-yellow-300">
            Free workshop · Sunday · real projects
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-5xl">
            {effectiveKind === "tools" ? `Start practical ${topicTitle} learning with Sikhadenge` : `Build practical authority in ${topicTitle}`}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-blue-100 sm:text-base">
            {effectiveKind === "tools"
              ? `Learn which AI tools matter, how they fit into real workflows, and how to use them for practical digital execution.`
              : `Sikhadenge focuses on structured, practical, and execution-first learning so this topic becomes useful for career, growth, freelancing, jobs, and long-term positioning.`}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href={registerLink} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-blue-700 hover:bg-blue-50">
              Join Free AI Masterclass
            </Link>
            <Link href="/courses" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-bold text-white ring-1 ring-white/15 hover:bg-white/15">
              Explore Courses
            </Link>
            <Link href={waLink} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-bold text-white ring-1 ring-white/15 hover:bg-white/15">
              Contact Team <Phone className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
        <div className="border-t border-slate-200 bg-white px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">
          <div className="flex gap-3">
            <Link
              href={registerLink}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-3.5 text-sm font-black text-white"
            >
              Join Free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={waLink}
              className="flex items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3.5 text-emerald-600"
              aria-label="WhatsApp"
            >
              <Phone className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

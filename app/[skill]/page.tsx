import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { skillsData } from "../../data/skillsData";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export const dynamicParams = false;

export async function generateStaticParams() {
  return skillsData.map((skill) => ({
    skill: skill.slug,
  }));
}

export function generateMetadata({ params }: { params: { skill: string } }): Metadata {
  const skillInfo = skillsData.find((s) => s.slug === params.skill);
  if (!skillInfo) return { title: "Skill Not Found", robots: { index: false } };

  return {
    title: `How to Become a ${skillInfo.title} | Sikhadenge`,
    description: `Learn ${skillInfo.title} with live mentor-led training at Sikhadenge. ${skillInfo.description}`,
    alternates: {
      canonical: `https://sikhadenge.in/${skillInfo.slug}`,
    },
    openGraph: {
      type: "article",
      url: `https://sikhadenge.in/${skillInfo.slug}`,
      title: `How to Become a ${skillInfo.title} | Sikhadenge`,
      description: skillInfo.description,
    },
  };
}

export default function SkillPage({ params }: { params: { skill: string } }) {
  const skillInfo = skillsData.find((s) => s.slug === params.skill);

  if (!skillInfo) {
    notFound();
  }

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${skillInfo!.title} — Live Masterclass`,
    description: skillInfo!.description,
    url: `https://sikhadenge.in/${skillInfo!.slug}`,
    provider: {
      "@type": "EducationalOrganization",
      name: "Sikhadenge",
      url: "https://sikhadenge.in",
    },
    educationalCredentialAwarded: "Certificate of Completion",
    inLanguage: ["en", "hi"],
    isAccessibleForFree: true,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      instructor: {
        "@type": "Person",
        name: "Sikhadenge Expert",
        worksFor: { "@type": "Organization", name: "Sikhadenge" },
      },
    },
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <section className="bg-white border-b border-slate-200 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center rounded-full bg-blue-50 border border-blue-100 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-blue-700">
              {skillInfo.category} Mastery
            </div>
            
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              How to Become a <span className="text-blue-600">{skillInfo.title}</span>
            </h1>
            
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              {skillInfo.description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link 
                href="/gen-ai-masterclass" 
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-500 transition-colors"
              >
                Join free masterclass
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold mb-6">Core Skills You Will Learn</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillInfo.skills.map((skillItem, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow group">
               <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <Star className="h-6 w-6" />
                </div>
              <h3 className="text-lg font-bold text-slate-900">{skillItem}</h3>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

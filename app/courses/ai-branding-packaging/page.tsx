export const dynamic = "force-dynamic";
export const revalidate = 0;
import type { Metadata } from "next";
import Link from "next/link";
import FbqViewContent from "../../components/FbqViewContent";

export const metadata: Metadata = {
  title: "AI + Branding & Packaging | Sikhadenge",
  description: "Branding and packaging fundamentals: brand system, packaging layout, and AI-assisted ideation for concepts.",
  alternates: { canonical: "/courses/ai-branding-packaging" },
  openGraph: {
    type: "website",
    url: "https://sikhadenge.in/courses/ai-branding-packaging",
    siteName: "Sikhadenge",
    title: "AI + Branding & Packaging | Sikhadenge",
    description: "Branding and packaging fundamentals: brand system, packaging layout, and AI-assisted ideation for concepts.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI + Branding & Packaging | Sikhadenge",
    description: "Branding and packaging fundamentals: brand system, packaging layout, and AI-assisted ideation for concepts.",
  },
};


export default function CoursePage() {
  return (
    <>
      <FbqViewContent />
    <main className="min-h-screen bg-[#0B1220] text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="border border-white/10 rounded-3xl bg-[#111827] p-6 md:p-10">
          <div className="text-xs md:text-sm text-[#9CA3AF] tracking-wide">Course</div>
          <h1 className="mt-2 text-2xl md:text-4xl font-semibold leading-tight">Ai Branding Packaging</h1>
          <p className="mt-3 text-sm md:text-base text-[#B0B7C3] leading-relaxed">
            Detailed curriculum page is being prepared. For counselling and batch confirmation, use the form.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_18px_rgba(37,99,235,0.55)] hover:bg-[#1D4ED8]"
            >
              Open counselling form
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Back to Courses
            </Link>
          </div>

          <div className="mt-4 text-xs text-[#9CA3AF]">
            Your details are used only for counselling and scheduling.
          </div>
        </div>
      </div>
          {/* SD_COURSE_SCHEMA_V1 */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `{"@context": "https://schema.org", "@type": "Course", "name": "AI + Branding & Packaging", "description": "Branding and packaging fundamentals: brand system, packaging layout, and AI-assisted ideation for concepts.", "url": "https://sikhadenge.in/courses/ai-branding-packaging", "provider": {"@type": "Organization", "name": "Sikhadenge", "url": "https://sikhadenge.in"}, "educationalCredentialAwarded": "Certificate of Completion", "inLanguage": "en", "about": ["Branding", "Packaging", "Brand System", "AI Assistance"], "hasCourseInstance": {"@type": "CourseInstance", "courseMode": "online", "location": "Online"}}`,
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `{"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "Is this a live online course?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Classes are live online with structured lessons and assignments."}}, {"@type": "Question", "name": "Which tools are covered?", "acceptedAnswer": {"@type": "Answer", "text": "Industry-standard tools are covered where applicable, along with practical workflows and projects."}}, {"@type": "Question", "name": "Do you get a certificate?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. A completion certificate is provided after meeting course requirements."}}, {"@type": "Question", "name": "Is this beginner friendly?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. The course starts from fundamentals and moves towards portfolio-ready output."}}]}`,
        }}
      />
</main>
    </>
  );
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
type QA = {
  q: string;
  a: string;
};

export default function AnswerEngineBlock({
  title = "Quick Answers",
  items,
}: {
  title?: string;
  items: QA[];
}) {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#0F172A]/10 bg-[#F8FAFC] p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A]">{title}</h2>
          <div className="mt-6 space-y-6">
            {items.map((item) => (
              <div key={item.q}>
                <h3 className="text-lg font-semibold text-[#0F172A]">{item.q}</h3>
                <p className="mt-2 text-sm md:text-base leading-7 text-[#475569]">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

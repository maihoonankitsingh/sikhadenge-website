export default function Companies() {
  const companies = [
    "PW",
    "Pepper",
    "redBus",
    "Disney+ Hotstar",
    "trainman",
    "dcs",
    "A",
    "f1 studioz",
    "Triad",
    "CANNONDESIGN",
    "Polygon",
    "Flipkart",
  ];

  return (
    <section className="relative bg-white py-16 text-slate-900">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-slate-900">
          Companies our students work for
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {companies.map((name) => (
            <div
              key={name}
              className="flex items-center justify-center rounded-full bg-white px-10 py-6 shadow-[0_10px_30px_rgba(2,6,23,0.08)] ring-1 ring-slate-200"
            >
              <span className="text-base font-semibold tracking-tight text-slate-800">
                {name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <span className="text-base font-semibold text-slate-800">
            56+ more Companies
          </span>
        </div>
      </div>
    </section>
  );
}

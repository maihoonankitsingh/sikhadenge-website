import { useState } from "react";
import PageShell from "../components/PageShell";

export default function CollabPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <PageShell title="Collaboration Inquiry">
      <section className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-xl border border-white/10 bg-[#111827] p-5 sm:p-6">
          <h2 className="text-lg font-bold">For creators & influencers</h2>
          <p className="mt-2 text-[#B0B7C3] leading-relaxed">
            Share your details. Our team will review and connect if it matches current collaboration requirements.
          </p>

          <ul className="mt-5 grid gap-3 text-sm text-[#B0B7C3]">
            <li className="rounded-xl border border-white/10 bg-[#0B1220] p-3">Platform: Instagram / YouTube / Both</li>
            <li className="rounded-xl border border-white/10 bg-[#0B1220] p-3">Provide handle + follower range</li>
            <li className="rounded-xl border border-white/10 bg-[#0B1220] p-3">Optional: media kit / city</li>
          </ul>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#111827] p-5 sm:p-6">
          {!submitted ? (
            <form
              className="grid gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <input className="h-12 rounded-xl border border-white/10 bg-[#0B1220] px-4 text-white outline-none"
                placeholder="Full name *" required />
              <input className="h-12 rounded-xl border border-white/10 bg-[#0B1220] px-4 text-white outline-none"
                placeholder="Phone *" required />
              <input className="h-12 rounded-xl border border-white/10 bg-[#0B1220] px-4 text-white outline-none"
                placeholder="Instagram / YouTube handle *" required />

              <select className="h-12 rounded-xl border border-white/10 bg-[#0B1220] px-4 text-white outline-none" required>
                <option value="">Platform *</option>
                <option>Instagram</option>
                <option>YouTube</option>
                <option>Both</option>
              </select>

              <select className="h-12 rounded-xl border border-white/10 bg-[#0B1220] px-4 text-white outline-none" required>
                <option value="">Followers range *</option>
                <option>10K–50K</option>
                <option>50K–100K</option>
                <option>100K–500K</option>
                <option>500K+</option>
              </select>

              <textarea className="min-h-[110px] rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-white outline-none"
                placeholder="Message (optional)" />

              <button
                className="h-12 rounded-xl bg-[#F5B301] font-bold text-[#0B1220]"
                type="submit"
              >
                Submit
              </button>

              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                By submitting, you agree to our Terms and Privacy Policy.
              </p>
            </form>
          ) : (
            <div className="rounded-xl border border-white/10 bg-[#0B1220] p-5">
              <div className="text-sm text-[#9CA3AF]">Submitted</div>
              <div className="mt-2 text-lg font-extrabold">Thanks. We’ll review and connect.</div>
              <p className="mt-2 text-sm text-[#B0B7C3] leading-relaxed">
                If required, our team may contact you on the shared phone number.
              </p>
              <button className="mt-4 h-11 rounded-xl border border-white/10 px-4 text-sm"
                onClick={() => setSubmitted(false)}
              >
                Submit another response
              </button>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}

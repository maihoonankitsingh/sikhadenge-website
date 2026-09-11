import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, CircleAlert, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Certificate Verification | SikhaDenge",
  description: "Verify a SikhaDenge training certificate using its secure verification link.",
  robots: { index: false, follow: false },
};

type VerifyPayload = {
  ok?: boolean;
  data?: {
    valid: boolean;
    certificateCode: string;
    status: string;
    issuedAt: string | null;
    learner: { name: string; learnerCode: string };
    program: string;
    course: { name: string; code: string };
    organization: string;
  };
};

type PageProps = { params: Promise<{ token: string }> };

function origin() {
  const raw = process.env.B2B_OS_API_BASE_URL?.trim() || process.env.B2B_PUBLIC_ORIGIN?.trim();
  if (!raw) return null;
  try {
    return new URL(raw).origin;
  } catch {
    return null;
  }
}

export default async function CertificateVerificationPage({ params }: PageProps) {
  const { token } = await params;
  const safeToken = String(token || "").trim();
  const base = origin();

  let result: VerifyPayload["data"] | null = null;
  let unavailable = !base;

  if (base && /^[A-Za-z0-9_-]{16,160}$/.test(safeToken)) {
    try {
      const response = await fetch(`${base}/api/v1/certificates/verify/${encodeURIComponent(safeToken)}`, {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        const body = (await response.json()) as VerifyPayload;
        result = body?.data || null;
      }
    } catch {
      unavailable = true;
    }
  }

  const valid = Boolean(result?.valid);

  return (
    <main className="min-h-screen bg-[#07111f] px-4 pb-20 pt-28 text-white sm:px-6 sm:pt-32">
      <div className="mx-auto w-full max-w-3xl">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10">
            <ShieldCheck className="h-7 w-7 text-blue-300" />
          </div>
          <p className="mt-5 text-xs font-bold tracking-[0.2em] text-blue-300">SIKHADENGE CREDENTIAL VERIFICATION</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Certificate verification</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            This page validates the secure verification token embedded in a SikhaDenge-issued training credential.
          </p>
        </div>

        <section className="mt-9 overflow-hidden rounded-3xl border border-white/10 bg-[#0d1a2b] shadow-2xl shadow-black/20">
          {result ? (
            <>
              <div className={`flex items-center gap-3 border-b border-white/10 px-6 py-5 ${valid ? "bg-emerald-400/5" : "bg-amber-400/5"}`}>
                {valid ? <BadgeCheck className="h-7 w-7 text-emerald-300" /> : <CircleAlert className="h-7 w-7 text-amber-300" />}
                <div>
                  <div className={`text-sm font-extrabold ${valid ? "text-emerald-200" : "text-amber-200"}`}>
                    {valid ? "VALID CREDENTIAL" : "CREDENTIAL NOT CURRENTLY VALID"}
                  </div>
                  <div className="mt-1 text-xs text-slate-400">Status: {result.status}</div>
                </div>
              </div>
              <dl className="grid gap-px bg-white/10 sm:grid-cols-2">
                {[
                  ["Certificate ID", result.certificateCode],
                  ["Learner", result.learner.name],
                  ["Learner ID", result.learner.learnerCode],
                  ["Organization", result.organization],
                  ["Program", result.program],
                  ["Course", `${result.course.name} (${result.course.code})`],
                  ["Issued on", result.issuedAt ? new Date(result.issuedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"],
                  ["Verification", valid ? "Verified" : "Not valid"],
                ].map(([label, value]) => (
                  <div key={label} className="bg-[#0d1a2b] p-5">
                    <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{label}</dt>
                    <dd className="mt-2 text-sm font-semibold text-slate-100">{value}</dd>
                  </div>
                ))}
              </dl>
            </>
          ) : (
            <div className="p-7 text-center sm:p-10">
              <CircleAlert className="mx-auto h-10 w-10 text-amber-300" />
              <h2 className="mt-4 text-xl font-extrabold">{unavailable ? "Verification service unavailable" : "Certificate not found"}</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">
                {unavailable
                  ? "The credential service could not be reached right now. Please retry using the original QR or verification link."
                  : "This token does not match an active credential. Check that the full QR verification link was opened without modification."}
              </p>
            </div>
          )}
        </section>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-xs leading-5 text-slate-400">
          Verification confirms only the credential fields shown above. A SikhaDenge or partner completion credential does not represent Autodesk or another third-party vendor certification unless that certification is explicitly named and independently verifiable through the vendor's official system.
        </div>

        <div className="mt-7 text-center">
          <Link href="/" className="text-sm font-semibold text-blue-300 hover:text-blue-200">Return to Sikhadenge.in</Link>
        </div>
      </div>
    </main>
  );
}

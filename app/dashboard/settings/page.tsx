import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  Settings2,
  Video,
  Database,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function saveMasterclassZoomLink(formData: FormData) {
  "use server";

  const value = String(formData.get("masterclassZoomUrl") || "").trim();

  if (!value) {
    throw new Error("Masterclass Zoom URL is required.");
  }

  await prisma.siteSetting.upsert({
    where: { key: "masterclass_zoom_url" },
    update: { value },
    create: {
      id: "masterclass_zoom_url",
      key: "masterclass_zoom_url",
      value,
    },
  });

  revalidatePath("/dashboard/settings");
  revalidatePath("/masterclass");
}

export default async function SettingsPage() {
  const masterclassZoom = await prisma.siteSetting.findUnique({
    where: { key: "masterclass_zoom_url" },
  });

  const currentZoomUrl = masterclassZoom?.value || "";

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Settings Module
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Settings / Configuration Dashboard
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
                Dashboard se masterclass Zoom link safely update karo. Public website par alag section nahi banega.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
              Dashboard-only live control
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Setting Key</p>
                <h3 className="mt-2 text-lg font-bold tracking-tight text-slate-900">
                  masterclass_zoom_url
                </h3>
                <p className="mt-2 text-xs text-slate-500">
                  DB-based live setting for the masterclass Join Zoom button.
                </p>
              </div>
              <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">
                <Settings2 className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Current Mode</p>
                <h3 className="mt-2 text-lg font-bold tracking-tight text-slate-900">
                  Database Managed
                </h3>
                <p className="mt-2 text-xs text-slate-500">
                  Baar-baar env/code change ke bina dashboard se update.
                </p>
              </div>
              <div className="rounded-2xl bg-violet-50 p-3 text-violet-700">
                <Database className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Public Usage</p>
                <h3 className="mt-2 text-lg font-bold tracking-tight text-slate-900">
                  Masterclass Join Zoom
                </h3>
                <p className="mt-2 text-xs text-slate-500">
                  Registration success ke baad isi link se user Zoom join karega.
                </p>
              </div>
              <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                <Video className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-blue-700" />
            <h2 className="text-xl font-bold text-slate-900">Masterclass Zoom Link Control</h2>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Yahan Zoom link update karne ke baad masterclass page latest DB value use karega.
          </p>

          <form action={saveMasterclassZoomLink} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="masterclassZoomUrl"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Masterclass Zoom URL
              </label>
              <input
                id="masterclassZoomUrl"
                name="masterclassZoomUrl"
                type="url"
                required
                defaultValue={currentZoomUrl}
                placeholder="https://us06web.zoom.us/j/..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Current Saved Value
              </p>
              <div className="mt-2 break-all text-sm text-slate-700">
                {currentZoomUrl ? currentZoomUrl : "No Zoom URL saved yet."}
              </div>

              {currentZoomUrl ? (
                <a
                  href={currentZoomUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-700"
                >
                  Open current Zoom link
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm"
              >
                Save Masterclass Zoom Link
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

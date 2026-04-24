import Link from "next/link";

export default function Page() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">
        ai earning for beginners
      </h1>

      <p className="text-gray-400 mb-6">
        Learn ai earning for beginners with real strategies, tools, and workflows.
      </p>

      <div className="grid gap-4">
        <Link href="/ai-generalist">AI Expert</Link>
        <Link href="/ai-skills">AI Skills</Link>
        <Link href="/ai-tools">AI Tools</Link>
        <Link href="/ai-content-workflows">Workflows</Link>
      </div>
    </main>
  );
}

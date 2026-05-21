import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";

export default async function SharePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="glass-panel rounded-[2rem] p-6">
          <p className="text-sm font-medium text-cyan">Shared prompt</p>
          <h1 className="mt-3 text-3xl font-semibold text-ink">Prompt record {id}</h1>
          <p className="mt-3 leading-7 text-graphite">
            This page is ready for public prompt sharing. Connect it to the shareLinks table to render saved
            prompts, metadata, copy actions, and privacy controls.
          </p>
          <Link href="/dashboard" className="focus-ring mt-6 inline-flex h-11 items-center rounded-full bg-ink px-5 font-medium text-white">
            Enhance another prompt
          </Link>
        </section>
      </main>
    </AppShell>
  );
}

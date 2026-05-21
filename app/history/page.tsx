import { Search } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { mockHistory } from "@/features/history/mockHistory";

export default function HistoryPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-semibold text-ink">Prompt History</h1>
            <p className="mt-2 text-graphite">Search, reuse, and refine prompts you have enhanced before.</p>
          </div>
          <label className="relative block w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite" />
            <input
              className="focus-ring h-12 w-full rounded-full border border-line bg-white/75 pl-11 pr-4 text-sm"
              placeholder="Search prompts"
            />
          </label>
        </div>
        <section className="grid gap-4 md:grid-cols-3">
          {mockHistory.map((item) => (
            <article key={item.id} className="glass-panel rounded-3xl p-5">
              <div className="mb-5 flex items-center justify-between">
                <span className="rounded-full bg-cyan/15 px-3 py-1 text-xs font-medium text-ink">{item.model}</span>
                <span className="text-xs text-graphite">{item.createdAt}</span>
              </div>
              <h2 className="text-lg font-semibold text-ink">{item.title}</h2>
              <p className="mt-1 text-sm font-medium text-graphite">{item.mode}</p>
              <p className="mt-4 text-sm leading-6 text-graphite">{item.excerpt}</p>
              <button className="focus-ring mt-5 h-10 rounded-full bg-ink px-4 text-sm font-medium text-white">
                Reuse Prompt
              </button>
            </article>
          ))}
        </section>
      </main>
    </AppShell>
  );
}

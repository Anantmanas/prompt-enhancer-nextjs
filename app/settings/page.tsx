import { AppShell } from "@/components/layout/AppShell";

export default function SettingsPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-ink">Settings</h1>
        <p className="mt-2 text-graphite">Configure defaults for your prompt workflow.</p>
        <section className="glass-panel mt-8 grid gap-5 rounded-[2rem] p-6">
          {[
            ["Default model", "ChatGPT"],
            ["Default mode", "Developer Assistant"],
            ["Default tone", "Premium"],
            ["Output format", "Structured sections"]
          ].map(([label, value]) => (
            <label key={label} className="grid gap-2">
              <span className="text-sm font-semibold text-ink">{label}</span>
              <input className="focus-ring h-12 rounded-2xl border border-line bg-white/80 px-4 text-graphite" defaultValue={value} />
            </label>
          ))}
          <button className="focus-ring h-12 rounded-full bg-ink px-5 font-medium text-white sm:w-fit">Save Settings</button>
        </section>
      </main>
    </AppShell>
  );
}

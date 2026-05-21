import { AppShell } from "@/components/layout/AppShell";

const guides = [
  {
    title: "ChatGPT",
    body: "Use direct roles, clear tasks, structured deliverables, constraints, and examples when precision matters."
  },
  {
    title: "Claude",
    body: "Give richer context, careful boundaries, long-form requirements, and ask for tradeoffs or assumptions."
  },
  {
    title: "Gemini",
    body: "Frame research, synthesis, comparisons, and multimodal-ready inputs with crisp output sections."
  },
  {
    title: "Bolt.new",
    body: "Describe the app, pages, stack, routes, components, data flow, states, and first usable screen."
  },
  {
    title: "v0.dev",
    body: "Specify UI hierarchy, responsive layout, component behavior, visual style, and interaction states."
  },
  {
    title: "Emergent",
    body: "Define users, workflows, data models, integrations, admin settings, and product acceptance criteria."
  }
];

export default function DocsPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 max-w-3xl">
          <h1 className="text-4xl font-semibold text-ink">Prompting Docs</h1>
          <p className="mt-3 text-lg leading-8 text-graphite">
            Practical guidance for making prompts clearer, more structured, and better suited to each AI system.
          </p>
        </section>
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <article key={guide.title} className="glass-panel rounded-3xl p-6">
              <h2 className="text-xl font-semibold text-ink">{guide.title}</h2>
              <p className="mt-3 leading-7 text-graphite">{guide.body}</p>
            </article>
          ))}
        </section>
      </main>
    </AppShell>
  );
}

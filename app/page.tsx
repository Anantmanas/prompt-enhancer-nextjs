import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { PricingPreview } from "@/components/marketing/PricingPreview";

const models = ["ChatGPT", "Claude", "Gemini", "Bolt.new", "v0.dev", "Emergent"];

export default function Home() {
  return (
    <AppShell>
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <section className="grid min-h-[calc(100vh-7rem)] items-center gap-10 lg:grid-cols-[1fr_0.92fr]">
          <div className="flex flex-col gap-8">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white/70 px-3 py-2 text-sm text-graphite shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4 text-cyan" />
              Model-aware prompt enhancement for every workflow
            </div>
            <div className="max-w-3xl">
              <h1 className="text-balance text-5xl font-semibold tracking-normal text-ink sm:text-6xl lg:text-7xl">
                PromptEnhance
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-graphite sm:text-xl">
                Turn rough ideas into precise, AI-ready prompts for ChatGPT, Claude,
                Gemini, Bolt.new, v0.dev, Emergent, and the next generation of AI tools.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 font-medium text-white transition hover:-translate-y-0.5 hover:bg-graphite"
              >
                Enhance a Prompt
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/docs"
                className="focus-ring inline-flex h-12 items-center justify-center rounded-full border border-line bg-white/70 px-6 font-medium text-ink transition hover:-translate-y-0.5 hover:bg-white"
              >
                View Examples
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {models.map((model) => (
                <span key={model} className="rounded-full border border-line bg-white/60 px-3 py-1.5 text-sm text-graphite">
                  {model}
                </span>
              ))}
            </div>
          </div>

          <div data-cursor="interactive" className="glass-panel rounded-[2rem] p-4 sm:p-6">
            <div className="rounded-[1.5rem] border border-line bg-white/80 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-ink">Live Enhancement Preview</p>
                  <p className="text-xs text-graphite">Developer Assistant · Claude</p>
                </div>
                <span className="rounded-full bg-cyan/15 px-3 py-1 text-xs font-medium text-ink">Ready</span>
              </div>
              <div className="rounded-2xl bg-mist p-4 text-sm leading-6 text-graphite">
                Build a task management app.
              </div>
              <div className="mt-4 rounded-2xl border border-line bg-white p-4 text-sm leading-6 text-ink">
                <p className="mb-3 font-medium">Enhanced prompt</p>
                Create a production-ready task management web app with authentication,
                project boards, task priorities, due dates, keyboard-friendly interactions,
                responsive layouts, and a clean component architecture. Include data models,
                edge cases, empty states, accessibility requirements, and implementation steps.
              </div>
            </div>
          </div>
        </section>

        <FeatureGrid />
        <section className="premium-card grid gap-4 rounded-[2rem] border border-line bg-white/55 p-6 backdrop-blur md:grid-cols-3">
          {["Fast model targeting", "Structured output", "Reusable prompt history"].map((item) => (
            <div key={item} className="flex items-center gap-3 text-graphite">
              <CheckCircle2 className="h-5 w-5 text-cyan" />
              <span>{item}</span>
            </div>
          ))}
        </section>
        <PricingPreview />
      </main>
    </AppShell>
  );
}

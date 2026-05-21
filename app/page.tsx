import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";

const models = ["ChatGPT", "Claude", "Gemini", "Bolt.new", "v0.dev", "Emergent"];

export default function Home() {
  return (
    <AppShell>
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-4 pb-14 pt-6 sm:gap-20 sm:px-6 sm:pb-16 sm:pt-8 lg:px-8">
        <section className="grid items-center gap-8 overflow-hidden py-4 sm:gap-10 lg:min-h-[calc(100vh-7rem)] lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.92fr)]">
          <div className="flex min-w-0 flex-col gap-6 sm:gap-8">
            <div className="inline-flex max-w-full w-fit items-center gap-2 rounded-full border border-line bg-white/70 px-3 py-2 text-sm leading-5 text-graphite shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4 shrink-0 text-cyan" />
              <span className="min-w-0">Model-aware prompt enhancement for every workflow</span>
            </div>
            <div className="max-w-3xl">
              <h1 className="break-words text-balance text-4xl font-semibold tracking-normal text-ink sm:text-5xl lg:text-6xl xl:text-7xl">
                PromptEnhance
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-graphite sm:mt-6 sm:text-xl sm:leading-8">
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

          <div data-cursor="interactive" className="glass-panel rounded-[1.5rem] p-3 sm:rounded-[2rem] sm:p-6">
            <div className="rounded-[1.25rem] border border-line bg-white/80 p-4 sm:rounded-[1.5rem]">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink">Live Enhancement Preview</p>
                  <p className="text-xs text-graphite">Developer Assistant - Claude</p>
                </div>
                <span className="shrink-0 rounded-full bg-cyan/15 px-3 py-1 text-xs font-medium text-ink">Ready</span>
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
      </main>
    </AppShell>
  );
}

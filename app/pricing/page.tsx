import { CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { plans } from "@/features/credits/plans";

export default function PricingPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 max-w-3xl">
          <h1 className="text-4xl font-semibold text-ink">Pricing and Credits</h1>
          <p className="mt-3 text-lg leading-8 text-graphite">
            Start free, then scale with usage-based credits and a Stripe-ready subscription model.
          </p>
        </section>
        <section className="grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <article key={plan.name} className="glass-panel rounded-[2rem] p-6">
              <p className="font-semibold text-cyan">{plan.name}</p>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-5xl font-semibold text-ink">{plan.price}</span>
                <span className="pb-2 text-sm text-graphite">/mo</span>
              </div>
              <p className="mt-4 font-medium text-ink">{plan.credits}</p>
              <div className="mt-6 flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex gap-3 text-sm text-graphite">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan" />
                    {feature}
                  </div>
                ))}
              </div>
              <button className="focus-ring mt-8 h-11 w-full rounded-full bg-ink font-medium text-white">
                Choose {plan.name}
              </button>
            </article>
          ))}
        </section>
      </main>
    </AppShell>
  );
}

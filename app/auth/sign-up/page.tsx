import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";

export default function SignUpPage() {
  return (
    <AppShell>
      <main className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-md place-items-center px-4 py-8">
        <section className="glass-panel w-full rounded-[2rem] p-6">
          <h1 className="text-3xl font-semibold text-ink">Create account</h1>
          <p className="mt-2 text-graphite">Auth provider hooks can be dropped into this page when selected.</p>
          <div className="mt-6 grid gap-4">
            <input className="focus-ring h-12 rounded-2xl border border-line bg-white/80 px-4" placeholder="Name" />
            <input className="focus-ring h-12 rounded-2xl border border-line bg-white/80 px-4" placeholder="Email" />
            <input className="focus-ring h-12 rounded-2xl border border-line bg-white/80 px-4" placeholder="Password" type="password" />
            <button className="focus-ring h-12 rounded-full bg-ink font-medium text-white">Start enhancing</button>
          </div>
          <p className="mt-5 text-sm text-graphite">
            Already have an account? <Link className="font-medium text-ink" href="/auth/sign-in">Sign in</Link>
          </p>
        </section>
      </main>
    </AppShell>
  );
}

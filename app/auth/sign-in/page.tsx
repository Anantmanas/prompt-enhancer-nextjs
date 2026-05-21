import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";

export default function SignInPage() {
  return (
    <AppShell>
      <main className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-md place-items-center px-4 py-8">
        <section className="glass-panel w-full rounded-[2rem] p-6">
          <h1 className="text-3xl font-semibold text-ink">Welcome back</h1>
          <p className="mt-2 text-graphite">Sign in flow placeholder for Clerk, Supabase Auth, or NextAuth.</p>
          <div className="mt-6 grid gap-4">
            <input className="focus-ring h-12 rounded-2xl border border-line bg-white/80 px-4" placeholder="Email" />
            <input className="focus-ring h-12 rounded-2xl border border-line bg-white/80 px-4" placeholder="Password" type="password" />
            <button className="focus-ring h-12 rounded-full bg-ink font-medium text-white">Sign in</button>
          </div>
          <p className="mt-5 text-sm text-graphite">
            New here? <Link className="font-medium text-ink" href="/auth/sign-up">Create an account</Link>
          </p>
        </section>
      </main>
    </AppShell>
  );
}

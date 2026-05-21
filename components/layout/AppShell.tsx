import Link from "next/link";
import { Sparkles, GitBranchIcon } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  // { href: "/history", label: "History" },
  // { href: "/pricing", label: "Pricing" },
  {
    href: "https://github.com/Anantmanas/prompt-enhancer-nextjs",
    label: (
      <>
        <GitBranchIcon className="h-4 w-4" />
        <span>GitHub</span>
      </>
    )
  }

];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/60 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="focus-ring flex items-center gap-2 rounded-full">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="font-semibold text-ink">PromptEnhance</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring rounded-full px-4 py-2 text-sm font-medium text-graphite transition hover:bg-white hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {/* <Link
            href="/auth/sign-in"
            className="focus-ring rounded-full border border-line bg-white/70 px-4 py-2 text-sm font-medium text-ink transition hover:bg-white"
          >
            Sign in
          </Link> */}
        </div>
      </header>
      {children}
    </div>
  );
}

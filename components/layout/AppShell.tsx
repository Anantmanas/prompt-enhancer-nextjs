import Link from "next/link";
import { ExternalLink, Sparkles } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", external: false },

  {
    href: "https://github.com/Anantmanas/prompt-enhancer-nextjs",
    label: "GitHub",
    external: true
  }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/60 backdrop-blur-2xl">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="focus-ring flex shrink-0 items-center gap-2 rounded-full">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="text-base font-semibold text-ink sm:text-lg">PromptEnhance</span>
          </Link>
          <nav className="flex min-w-0 flex-wrap items-center justify-end gap-1 sm:gap-2">
            {navItems.map((item) => {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className="focus-ring inline-flex h-10 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 text-sm font-medium text-graphite transition hover:bg-white hover:text-ink sm:px-4"
                >
                  <span>{item.label}</span>
                  {item.external && <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}

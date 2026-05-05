"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/start-here", label: "Start Here" },
  { href: "/lessons", label: "Lessons" },
  { href: "/projects", label: "Projects" },
  { href: "/build-logs", label: "Build Logs" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-primary/15 bg-background/78 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="flex size-8 items-center justify-center rounded-lg border border-primary/35 bg-primary/10 text-lg shadow-[0_0_24px_color-mix(in_oklab,var(--primary)_22%,transparent)]">🤖</span>
            <span className="font-display text-primary">Robotics</span>
            <span className="font-display text-foreground">101</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === l.href || pathname.startsWith(l.href + "/")
                    ? "bg-primary/12 text-primary ring-1 ring-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                )}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/contact">
              <Button size="sm" className="ml-2">
                Contact
              </Button>
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={cn("block h-0.5 bg-current transition-all", open && "rotate-45 translate-y-2")} />
              <span className={cn("block h-0.5 bg-current transition-all", open && "opacity-0")} />
              <span className={cn("block h-0.5 bg-current transition-all", open && "-rotate-45 -translate-y-2")} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="md:hidden pb-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === l.href || pathname.startsWith(l.href + "/")
                    ? "bg-primary/12 text-primary ring-1 ring-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                )}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)}>
              <Button size="sm" className="mt-1 w-full">
                Contact
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

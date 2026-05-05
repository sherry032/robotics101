import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-primary/15 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <span className="flex size-7 items-center justify-center rounded-lg border border-primary/35 bg-primary/10">🤖</span>
              <span className="font-display text-primary">Robotics</span>
              <span className="font-display">101</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A beginner-friendly guide to getting started in robotics. Learn,
              build, and grow one project at a time.
            </p>
          </div>

          <div>
            <p className="font-semibold text-sm mb-3">Learn</p>
            <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
              <li><Link href="/start-here" className="hover:text-primary transition-colors">Start Here</Link></li>
              <li><Link href="/lessons" className="hover:text-primary transition-colors">Lessons</Link></li>
              <li><Link href="/projects" className="hover:text-primary transition-colors">Projects</Link></li>
              <li><Link href="/build-logs" className="hover:text-primary transition-colors">Build Logs</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-sm mb-3">More</p>
            <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
              <li><Link href="/resources" className="hover:text-primary transition-colors">Resources</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Robotics 101. Made for beginner builders.
        </div>
      </div>
    </footer>
  );
}

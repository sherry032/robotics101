import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getBuildLogBySlug, listBuildLogs } from "@/lib/content-db";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const logs = await listBuildLogs();
  return logs.map((log) => ({ slug: log.slug }));
}

export default async function BuildLogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const log = await getBuildLogBySlug(slug);
  if (!log) notFound();

  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/build-logs" className="transition-colors hover:text-primary">
            Build Logs
          </Link>
          <span>/</span>
          <span className="text-foreground">{log.title}</span>
        </nav>

        <div className="mb-10">
          <div className="mb-4 text-5xl">{log.emoji}</div>
          <div className="mb-4 flex flex-wrap gap-2">
            {log.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
            <Badge variant="outline">{log.date}</Badge>
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl">{log.title}</h1>
        </div>

        <Separator className="mb-10" />

        <div className="space-y-10">
          <section>
            <h2 className="mb-3 text-xl font-bold">🎯 Goal</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{log.goal}</p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">❓ The Problem</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{log.problem}</p>
          </section>

          <section>
            <div className="border-l-4 border-primary/30 pl-5">
              <h2 className="mb-3 text-xl font-bold">🔧 Version 1</h2>
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-sm font-semibold">What I built:</p>
                  <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                    {log.v1.what}
                  </p>
                </div>
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4">
                  <p className="mb-2 text-sm font-semibold text-destructive">
                    ❌ What failed:
                  </p>
                  <p className="text-sm leading-relaxed text-foreground/80 whitespace-pre-line">
                    {log.v1.failed}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">🧪 Testing</h2>
            <div className="rounded-lg border bg-muted/30 p-5 text-sm leading-relaxed text-muted-foreground backdrop-blur">
              {log.testing}
            </div>
          </section>

          <section>
            <div className="border-l-4 border-accent/50 pl-5">
              <h2 className="mb-3 text-xl font-bold">✅ Version 2</h2>
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-sm font-semibold">What I changed:</p>
                  <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                    {log.v2.what}
                  </p>
                </div>
                <div className="rounded-lg border border-accent/30 bg-accent/10 p-4">
                  <p className="mb-2 text-sm font-semibold text-accent">
                    ✅ What improved:
                  </p>
                  <p className="text-sm leading-relaxed text-foreground/80">
                    {log.v2.improved}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">💡 Reflection</h2>
            <div className="rounded-lg border border-primary/20 bg-primary/10 p-5 text-sm leading-relaxed text-foreground/80 whitespace-pre-line">
              {log.reflection}
            </div>
          </section>
        </div>

        <Separator className="my-10" />

        <div className="flex justify-between">
          <Link href="/build-logs">
            <Button variant="ghost">← All Build Logs</Button>
          </Link>
          <Link href="/projects">
            <Button>See Projects →</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

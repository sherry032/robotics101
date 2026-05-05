import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { listBuildLogs } from "@/lib/content-db";

export const dynamic = "force-dynamic";

export default async function BuildLogsPage() {
  const logs = await listBuildLogs();

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
            Engineering Journal
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Build Logs 📝</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            The real engineering process — including the failures, the pivots,
            and the moments where everything finally clicks. These logs show how
            robots actually get built.
          </p>
        </div>

        <div className="mb-8 rounded-lg border bg-muted/30 p-5 backdrop-blur">
          <p className="text-sm font-medium mb-1">📖 What are build logs?</p>
          <p className="text-sm text-muted-foreground">
            A build log documents your design decisions, what went wrong, how
            you fixed it, and what you learned. Writing build logs is one of the
            most valuable habits you can develop as an engineer — and colleges
            love to see them.
          </p>
        </div>

        <div className="space-y-4">
          {logs.map((log) => (
            <Link key={log.slug} href={`/build-logs/${log.slug}`}>
              <Card className="group hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_0_34px_color-mix(in_oklab,var(--primary)_18%,transparent)]">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{log.emoji}</span>
                      <div>
                        <CardTitle className="text-base group-hover:text-primary transition-colors">
                          {log.title}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground mt-0.5">{log.date}</p>
                      </div>
                    </div>
                    <span className="text-muted-foreground group-hover:text-primary transition-colors shrink-0">→</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{log.summary}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {log.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

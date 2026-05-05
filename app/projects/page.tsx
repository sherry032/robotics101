import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { listProjectsByLevel } from "@/lib/content-db";

export const dynamic = "force-dynamic";

const levelColor: Record<string, string> = {
  Beginner: "border-accent/30 bg-accent/10 text-accent",
  Intermediate: "border-secondary/30 bg-secondary/10 text-secondary",
  "Real World": "border-primary/30 bg-primary/10 text-primary",
};

export default async function ProjectsPage() {
  const projects = await listProjectsByLevel();

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
            Hands-On Builds
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Projects 🔧</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Real robots you can build. Each project includes a full parts list,
            wiring diagram, code, and common troubleshooting tips.
          </p>
        </div>

        <div className="space-y-12">
          {projects.map((group) => (
            <div key={group.level}>
              <div className="flex items-center gap-3 mb-5">
                <Badge className={`${levelColor[group.level]}`}>{group.level}</Badge>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.items.map((project) => (
                  <Link key={project.slug} href={`/projects/${project.slug}`}>
                    <Card className="group h-full hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_0_34px_color-mix(in_oklab,var(--primary)_18%,transparent)]">
                      <CardHeader className="pb-2">
                        <div className="text-3xl mb-2">{project.emoji}</div>
                        <CardTitle className="text-base group-hover:text-primary transition-colors">
                          {project.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          {project.shortDesc}
                        </p>
                        <div className="flex gap-3 text-xs text-muted-foreground">
                          <span>⏱ {project.listTime}</span>
                          <span>💰 {project.listCost}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProjectBySlug, listProjects } from "@/lib/content-db";

export const dynamic = "force-dynamic";

const difficultyColor: Record<string, string> = {
  Beginner: "border-accent/30 bg-accent/10 text-accent",
  Intermediate: "border-secondary/30 bg-secondary/10 text-secondary",
};

export async function generateStaticParams() {
  const projects = await listProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/projects" className="transition-colors hover:text-primary">
            Projects
          </Link>
          <span>/</span>
          <span className="text-foreground">{project.title}</span>
        </nav>

        <div className="mb-10">
          <div className="mb-4 text-5xl">{project.emoji}</div>
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge className={difficultyColor[project.difficulty]}>
              {project.difficulty}
            </Badge>
            <Badge variant="outline">⏱ {project.time}</Badge>
            <Badge variant="outline">💰 {project.cost}</Badge>
          </div>
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl">{project.title}</h1>
          <p className="text-lg text-muted-foreground">{project.overview}</p>
        </div>

        <Separator className="mb-10" />

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold">🛒 Materials Needed</h2>
          <ul className="space-y-2">
            {project.materials.map((material) => (
              <li key={material} className="flex items-start gap-2 text-sm">
                <span className="mt-0.5 text-primary">✓</span>
                <span>{material}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold">⚡ Wiring Diagram</h2>
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg border bg-muted/40 p-5 font-mono text-sm leading-relaxed">
            {project.wiring}
          </pre>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold">🔧 Build Instructions</h2>
          <ol className="space-y-4">
            {project.instructions.map((instruction, i) => (
              <li key={instruction.step} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold">{instruction.step}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {instruction.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold">💻 Code</h2>
          <pre className="overflow-x-auto rounded-lg border border-primary/20 bg-background/80 p-5 font-mono text-xs leading-relaxed text-foreground shadow-inner">
            {project.code}
          </pre>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold">🧪 Testing</h2>
          <div className="rounded-lg border bg-muted/30 p-5 text-sm text-muted-foreground backdrop-blur">
            {project.testing}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold">⚠️ Common Problems</h2>
          <div className="space-y-3">
            {project.problems.map((problem) => (
              <div key={problem.issue} className="rounded-lg border border-accent/25 bg-accent/10 p-4">
                <p className="text-sm font-semibold text-accent">
                  Problem: {problem.issue}
                </p>
                <p className="mt-1 text-sm text-foreground/80">Fix: {problem.fix}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold">🚀 Next Steps & Improvements</h2>
          <ul className="space-y-2">
            {project.improvements.map((improvement) => (
              <li key={improvement} className="flex items-start gap-2 text-sm">
                <span className="text-primary">→</span>
                <span>{improvement}</span>
              </li>
            ))}
          </ul>
        </section>

        <Separator className="mb-8" />
        <div className="flex justify-between">
          <Link href="/projects">
            <Button variant="ghost">← All Projects</Button>
          </Link>
          <Link href="/build-logs">
            <Button variant="outline">See Build Logs →</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

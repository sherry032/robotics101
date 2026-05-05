import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getLessonBySlug, listLessons } from "@/lib/content-db";

export const dynamic = "force-dynamic";

const difficultyColor: Record<string, string> = {
  Beginner: "border-accent/30 bg-accent/10 text-accent",
  Intermediate: "border-secondary/30 bg-secondary/10 text-secondary",
};

export async function generateStaticParams() {
  const lessons = await listLessons();
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = await getLessonBySlug(slug);
  if (!lesson) notFound();

  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/lessons" className="transition-colors hover:text-primary">
            Lessons
          </Link>
          <span>/</span>
          <span className="text-foreground">{lesson.title}</span>
        </nav>

        <div className="mb-10">
          <div className="mb-4 text-5xl">{lesson.emoji}</div>
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge className={difficultyColor[lesson.difficulty]}>
              {lesson.difficulty}
            </Badge>
            <Badge variant="outline">⏱ {lesson.time} read</Badge>
          </div>
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl">{lesson.title}</h1>
          <p className="text-lg text-muted-foreground">{lesson.intro}</p>
        </div>

        <Separator className="mb-10" />

        <div className="mb-12 space-y-10">
          {lesson.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="mb-3 text-xl font-bold">{section.heading}</h2>
              <div className="rounded-lg border bg-muted/30 p-5 text-sm leading-relaxed text-foreground/80 whitespace-pre-line backdrop-blur">
                {section.body}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-12 rounded-lg border border-accent/25 bg-accent/10 p-5">
          <p className="mb-1 text-sm font-semibold text-accent">⚠️ Common Mistake</p>
          <p className="text-sm text-foreground/80">{lesson.mistake}</p>
        </div>

        <div className="mb-12">
          <h2 className="mb-4 text-xl font-bold">🧪 Quick Check</h2>
          <div className="space-y-4">
            {lesson.quiz.map((item, i) => (
              <details key={item.q} className="overflow-hidden rounded-lg border bg-card/70 backdrop-blur">
                <summary className="cursor-pointer px-5 py-4 text-sm font-medium transition-colors hover:bg-muted/30">
                  Q{i + 1}: {item.q}
                </summary>
                <div className="border-t bg-muted/20 px-5 py-4 text-sm text-muted-foreground">
                  ✅ {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="mb-4 text-lg font-bold">📚 Related Lessons</h2>
          <div className="flex flex-wrap gap-3">
            {lesson.related.map((related) => (
              <Link key={related.slug} href={`/lessons/${related.slug}`}>
                <Button variant="outline" size="sm">
                  {related.title} →
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="flex justify-between">
          <Link href="/lessons">
            <Button variant="ghost">← All Lessons</Button>
          </Link>
          <Link href="/projects">
            <Button>Try a Project →</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

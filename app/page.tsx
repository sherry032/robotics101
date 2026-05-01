import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const featuredLessons = [
  { slug: "what-is-a-robot", title: "What Is a Robot?", emoji: "🤖", time: "5 min" },
  { slug: "sensors", title: "How Sensors Work", emoji: "👁️", time: "8 min" },
  { slug: "motors", title: "Motors & Movement", emoji: "⚙️", time: "7 min" },
  { slug: "coding-basics", title: "Coding Basics", emoji: "💻", time: "10 min" },
];

const stats = [
  { label: "Lessons", value: "8+" },
  { label: "Projects", value: "6+" },
  { label: "Build Logs", value: "5+" },
  { label: "Difficulty Levels", value: "3" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-orange-50 py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute top-10 right-10 text-[120px] opacity-5 rotate-12">🤖</div>
          <div className="absolute bottom-10 left-10 text-[80px] opacity-5 -rotate-12">⚙️</div>
        </div>
        <div className="mx-auto max-w-6xl text-center relative">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
            🚀 Free for beginners
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
            Build Your First Robot{" "}
            <span className="text-primary">From Scratch</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Robotics 101 breaks down everything you need to know — sensors,
            motors, code, and engineering process — into simple, hands-on
            lessons anyone can follow.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/start-here">
              <Button size="lg" className="w-full sm:w-auto text-base px-8">
                Start Learning →
              </Button>
            </Link>
            <Link href="/projects">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8">
                See Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30 py-8 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-3 bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100">
                Our Mission
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-5">
                Why Robotics Feels Hard
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Most robotics tutorials assume you already know electronics,
                  programming, <em>and</em> mechanical design — all at once.
                  That&apos;s overwhelming for anyone just starting out.
                </p>
                <p>
                  Robotics 101 exists to fix that. We break every concept down
                  to its simplest form, show real examples, and walk you through
                  actual builds — including the failures and the fixes.
                </p>
                <p>
                  Whether you picked up an Arduino for the first time or
                  you&apos;re preparing for your school&apos;s robotics team,
                  this is where you start.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "📖", title: "Clear Lessons", desc: "No jargon, no assumed knowledge" },
                { icon: "🔧", title: "Real Projects", desc: "Build things that actually work" },
                { icon: "📝", title: "Build Logs", desc: "See the full engineering process" },
                { icon: "🎯", title: "Beginner Focus", desc: "Designed for day-one learners" },
              ].map((item) => (
                <div key={item.title} className="bg-muted/40 rounded-xl p-4 border">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Lessons */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-muted/20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
            <div>
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
                Featured Lessons
              </Badge>
              <h2 className="text-3xl font-bold">Start with the basics</h2>
            </div>
            <Link href="/lessons" className="text-primary text-sm font-medium hover:underline">
              View all lessons →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredLessons.map((lesson) => (
              <Link key={lesson.slug} href={`/lessons/${lesson.slug}`}>
                <Card className="h-full hover:shadow-md hover:border-primary/30 transition-all group">
                  <CardHeader className="pb-2">
                    <div className="text-3xl mb-2">{lesson.emoji}</div>
                    <CardTitle className="text-base group-hover:text-primary transition-colors">
                      {lesson.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">⏱ {lesson.time} read</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-orange-50 border border-primary/20 p-8 sm:p-12">
            <div className="max-w-xl">
              <Badge className="mb-4 bg-primary text-white border-0 hover:bg-primary">
                ⭐ Beginner Project
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Line-Following Robot</h2>
              <p className="text-muted-foreground mb-6">
                Your first real robot. Using two IR sensors and a simple
                Arduino program, you&apos;ll build a robot that follows a black
                line on the floor automatically. Perfect first project — takes
                about 2 hours to build.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary">Arduino</Badge>
                <Badge variant="secondary">IR Sensors</Badge>
                <Badge variant="secondary">2 hrs</Badge>
                <Badge variant="secondary">Beginner</Badge>
              </div>
              <Link href="/projects/line-following-robot">
                <Button>Start this project →</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Personal story */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-muted/20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-5xl mb-5">👩‍🔬</div>
          <h2 className="text-3xl font-bold mb-5">Why I Built This</h2>
          <p className="text-muted-foreground mb-4">
            When I first got into robotics, I couldn&apos;t find a single
            resource that explained everything in plain English. I&apos;d watch
            a tutorial, get confused about one part, and spend hours going down
            rabbit holes just to understand one concept.
          </p>
          <p className="text-muted-foreground mb-8">
            So I built Robotics 101 — the website I wished existed when I
            started. Every lesson is written the way I would have wanted to
            learn it: simple, visual, and focused on building something real.
          </p>
          <Link href="/about">
            <Button variant="outline">Read my full story →</Button>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 bg-primary text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to build your first robot?</h2>
          <p className="mb-8 text-white/80">
            Start with the basics and work your way up. No experience needed.
          </p>
          <Link href="/start-here">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold">
              Start Here →
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

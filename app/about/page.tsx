import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getAboutContent } from "@/lib/content-db";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const { timeline, values } = await getAboutContent();

  return (
    <div>
      {/* Hero */}
      <section className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-6xl mb-6">👩‍🔬</div>
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
            About Robotics 101
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            The site I wish existed{" "}
            <span className="text-primary">when I started</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Robotics 101 was built by a teenager who got frustrated trying to
            learn robotics from scattered, jargon-heavy tutorials — and decided
            to fix it.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Badge className="mb-4 border-accent/25 bg-accent/10 text-accent hover:bg-accent/10">
            My Story
          </Badge>
          <h2 className="text-3xl font-bold mb-8">How this all started</h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>
              When I was 12, I got an Arduino Uno as a birthday gift. The box
              said &ldquo;perfect for beginners,&rdquo; but the tutorials I
              found online assumed I already knew what a resistor was, how
              circuits worked, and why you&apos;d need a transistor. I did not.
            </p>
            <p>
              I spent weeks piecing together information from YouTube videos,
              forum posts, and PDF datasheets — every time I learned one thing,
              three more questions appeared. It was exciting, but exhausting.
              And it felt like it didn&apos;t have to be this hard.
            </p>
            <p>
              When I started teaching robotics workshops for younger students, I
              realized the problem wasn&apos;t the kids — it was the resources.
              Robotics education assumes too much. It talks down to beginners or
              skips straight to advanced concepts without building the
              foundation.
            </p>
            <p>
              So I built Robotics 101: a place where someone with zero
              experience can start with &ldquo;what even is a robot&rdquo; and
              work their way up to building one, step by step, without needing
              to decode jargon or jump between 15 different tabs.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-y border-primary/10 bg-muted/20 px-4 py-16 backdrop-blur sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
            Timeline
          </Badge>
          <h2 className="text-3xl font-bold mb-10">The journey so far</h2>
          <div className="relative">
            <div className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-border hidden sm:block" />
            <div className="space-y-8">
              {timeline.map((item) => (
                <div key={item.year} className="flex gap-6 sm:gap-8 items-start">
                  <div className="shrink-0 w-20 text-right">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {item.year}
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center justify-center w-3 h-3 rounded-full bg-primary ring-4 ring-background mt-1 shrink-0" />
                  <Card className="flex-1">
                    <CardContent className="pt-4 pb-4">
                      <p className="font-semibold mb-1">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/10">
            What we believe
          </Badge>
          <h2 className="text-3xl font-bold mb-10">How Robotics 101 works</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((v) => (
              <Card key={v.title} className="border bg-muted/30">
                <CardContent className="pt-5 pb-5">
                  <div className="text-3xl mb-3">{v.icon}</div>
                  <p className="font-semibold mb-1">{v.title}</p>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary px-4 py-16 text-primary-foreground sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Want to get in touch?</h2>
          <p className="mb-8 text-primary-foreground/80">
            Questions, feedback, or just want to share what you&apos;re building
            — I&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <Button size="lg" className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 sm:w-auto">
                Contact me →
              </Button>
            </Link>
            <Link href="/start-here">
              <Button size="lg" variant="outline" className="w-full border-primary-foreground/60 text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto">
                Start learning
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

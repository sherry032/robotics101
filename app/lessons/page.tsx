import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const lessons = [
  {
    slug: "what-is-a-robot",
    emoji: "🤖",
    title: "What Is a Robot?",
    desc: "Understand the sense-think-act loop that powers every robot ever built.",
    time: "5 min",
    difficulty: "Beginner",
  },
  {
    slug: "robot-parts",
    emoji: "🔩",
    title: "Robot Parts Explained",
    desc: "Learn what every component does: Arduino, motors, sensors, wires, and more.",
    time: "8 min",
    difficulty: "Beginner",
  },
  {
    slug: "motors",
    emoji: "⚙️",
    title: "Motors & Movement",
    desc: "DC motors, servo motors, and stepper motors — how they work and when to use them.",
    time: "7 min",
    difficulty: "Beginner",
  },
  {
    slug: "sensors",
    emoji: "👁️",
    title: "How Sensors Work",
    desc: "Ultrasonic, IR, color, and touch sensors. What they detect and how to wire them.",
    time: "8 min",
    difficulty: "Beginner",
  },
  {
    slug: "coding-basics",
    emoji: "💻",
    title: "Coding Basics for Robots",
    desc: "Variables, loops, conditions, and functions — just enough code to control a robot.",
    time: "10 min",
    difficulty: "Beginner",
  },
  {
    slug: "mechanical-design",
    emoji: "📐",
    title: "Mechanical Design",
    desc: "How robot bodies are designed: chassis, wheels, arms, and structural stability.",
    time: "7 min",
    difficulty: "Intermediate",
  },
  {
    slug: "engineering-process",
    emoji: "🔄",
    title: "The Engineering Process",
    desc: "Design, build, test, improve. The cycle that all engineers use to solve problems.",
    time: "6 min",
    difficulty: "Beginner",
  },
  {
    slug: "common-mistakes",
    emoji: "⚠️",
    title: "Common Beginner Mistakes",
    desc: "The most frequent mistakes new builders make — and how to avoid them.",
    time: "6 min",
    difficulty: "Beginner",
  },
];

const difficultyColor: Record<string, string> = {
  Beginner: "bg-green-100 text-green-700 border-green-200",
  Intermediate: "bg-yellow-100 text-yellow-700 border-yellow-200",
};

export default function LessonsPage() {
  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
            Core Curriculum
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Lessons 📖</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Eight short lessons that cover everything a beginner needs to know.
            Start from the top and work your way down.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {lessons.map((lesson, i) => (
            <Link key={lesson.slug} href={`/lessons/${lesson.slug}`}>
              <Card className="h-full hover:shadow-md hover:border-primary/30 transition-all group">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{lesson.emoji}</span>
                      <span className="text-xs text-muted-foreground font-medium">
                        Lesson {i + 1}
                      </span>
                    </div>
                    <Badge className={`text-xs shrink-0 ${difficultyColor[lesson.difficulty]}`}>
                      {lesson.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-base mt-1 group-hover:text-primary transition-colors">
                    {lesson.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{lesson.desc}</p>
                  <p className="text-xs text-muted-foreground">⏱ {lesson.time} read</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 bg-muted/30 rounded-2xl border text-center">
          <p className="font-semibold mb-2">Not sure where to start?</p>
          <p className="text-sm text-muted-foreground mb-4">
            Read the Start Here guide — it'll tell you exactly which lesson to do first.
          </p>
          <Link href="/start-here" className="text-primary text-sm font-medium hover:underline">
            Go to Start Here →
          </Link>
        </div>
      </div>
    </div>
  );
}

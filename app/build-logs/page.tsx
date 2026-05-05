import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const logs = [
  {
    slug: "robot-arm-v1",
    emoji: "🦿",
    title: "Robot Arm V1: First Build",
    date: "March 12, 2025",
    summary: "Built the first version of the robotic arm using cardboard and SG90 servos. The arm worked but collapsed under its own weight.",
    tags: ["Robotic Arm", "Servos", "Mechanical Design"],
  },
  {
    slug: "servo-failure",
    emoji: "⚠️",
    title: "Why My Servo Burned Out",
    date: "March 18, 2025",
    summary: "Powered three MG996R servos from Arduino 5V pin. They jittered, then stopped working. Deep dive into why and how to fix it.",
    tags: ["Debugging", "Power", "Servos"],
  },
  {
    slug: "wheel-testing",
    emoji: "🛞",
    title: "Testing 4 Different Wheel Types",
    date: "March 25, 2025",
    summary: "Compared rubber, foam, omni, and mecanum wheels for traction, speed, and turning. What I found surprised me.",
    tags: ["Wheels", "Mechanical", "Testing"],
  },
  {
    slug: "intake-redesign",
    emoji: "🔄",
    title: "Redesigning the Intake Mechanism",
    date: "April 2, 2025",
    summary: "The V1 claw couldn't reliably grip game pieces. Three redesigns later, here's what finally worked.",
    tags: ["Claw", "Redesign", "Iteration"],
  },
  {
    slug: "autonomous-debugging",
    emoji: "🐛",
    title: "Debugging Autonomous Mode",
    date: "April 15, 2025",
    summary: "Robot worked perfectly in testing but failed in competition. The culprit: sensor interference from other robots' IR signals.",
    tags: ["Autonomous", "Debugging", "Sensors"],
  },
];

export default function BuildLogsPage() {
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

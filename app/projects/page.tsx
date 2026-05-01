import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    level: "Beginner",
    items: [
      {
        slug: "line-following-robot",
        emoji: "🚗",
        title: "Line-Following Robot",
        desc: "Build a robot that follows a black line using two IR sensors and an Arduino.",
        time: "2–3 hrs",
        cost: "$25–35",
      },
      {
        slug: "obstacle-avoidance-robot",
        emoji: "🏎️",
        title: "Obstacle Avoidance Robot",
        desc: "A robot that detects walls and objects with an ultrasonic sensor and steers around them.",
        time: "3–4 hrs",
        cost: "$30–40",
      },
      {
        slug: "simple-claw",
        emoji: "🦾",
        title: "Simple Claw Mechanism",
        desc: "Design and build a servo-powered claw that can open and close to pick up small objects.",
        time: "1–2 hrs",
        cost: "$10–15",
      },
    ],
  },
  {
    level: "Intermediate",
    items: [
      {
        slug: "robotic-arm",
        emoji: "🦿",
        title: "3-DOF Robotic Arm",
        desc: "Build a joystick-controlled robotic arm with three servo joints and a claw end effector.",
        time: "5–8 hrs",
        cost: "$40–60",
      },
      {
        slug: "plant-watering-robot",
        emoji: "🌱",
        title: "Automatic Plant Waterer",
        desc: "A sensor-driven system that checks soil moisture and waters your plant automatically.",
        time: "3–4 hrs",
        cost: "$20–30",
      },
    ],
  },
  {
    level: "Real World",
    items: [
      {
        slug: "trash-sorter",
        emoji: "♻️",
        title: "Trash Sorting Robot",
        desc: "Uses a color sensor to identify recyclable vs. non-recyclable items and sort them into bins.",
        time: "6–10 hrs",
        cost: "$50–80",
      },
    ],
  },
];

const levelColor: Record<string, string> = {
  Beginner: "bg-green-100 text-green-700 border-green-200",
  Intermediate: "bg-yellow-100 text-yellow-700 border-yellow-200",
  "Real World": "bg-blue-100 text-blue-700 border-blue-200",
};

export default function ProjectsPage() {
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
                    <Card className="h-full hover:shadow-md hover:border-primary/30 transition-all group">
                      <CardHeader className="pb-2">
                        <div className="text-3xl mb-2">{project.emoji}</div>
                        <CardTitle className="text-base group-hover:text-primary transition-colors">
                          {project.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          {project.desc}
                        </p>
                        <div className="flex gap-3 text-xs text-muted-foreground">
                          <span>⏱ {project.time}</span>
                          <span>💰 {project.cost}</span>
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

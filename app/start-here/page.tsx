import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const parts = [
  { icon: "🧠", name: "Microcontroller (Arduino)", desc: "The brain of your robot. It reads sensor data and controls the motors based on your code." },
  { icon: "🔋", name: "Battery / Power", desc: "Powers everything. Most beginners start with AA batteries or a 9V battery pack." },
  { icon: "⚡", name: "Breadboard", desc: "A tool for connecting components without soldering. Great for testing circuits quickly." },
  { icon: "⚙️", name: "Motors", desc: "Convert electrical energy into movement. DC motors spin wheels; servos rotate to a specific angle." },
  { icon: "👁️", name: "Sensors", desc: "Allow robots to detect the world — distance, light, color, and more." },
  { icon: "🪛", name: "Jumper Wires", desc: "Short wires used to connect components on your breadboard to the Arduino." },
];

const steps = [
  { step: "1", title: "Learn Robot Parts", desc: "Understand what each component does before buying anything.", link: "/lessons/robot-parts" },
  { step: "2", title: "Learn Coding Basics", desc: "You don't need to be a programmer — just learn the basics of Arduino code.", link: "/lessons/coding-basics" },
  { step: "3", title: "Build a Simple Project", desc: "Start with the line-following robot. It's the perfect first build.", link: "/projects/line-following-robot" },
  { step: "4", title: "Improve Your Designs", desc: "Read your build logs, find what failed, and iterate.", link: "/build-logs" },
];

const checklist = [
  "Learn what a motor does",
  "Learn how a sensor detects things",
  "Understand what a microcontroller is",
  "Write your first Arduino program (blink an LED!)",
  "Build a simple robot project",
  "Test your robot and find the bugs",
  "Improve one part of your design",
  "Document your build with a build log",
];

export default function StartHerePage() {
  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
            Beginner Guide
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5">Start Here 🚀</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Total beginner? This is your starting point. By the end of this
            page, you'll know exactly what robotics is, what you need, and
            where to begin.
          </p>
        </div>

        {/* What Is Robotics */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">🤖 What Is Robotics?</h2>
          <div className="bg-muted/30 rounded-2xl p-6 border mb-6">
            <p className="text-muted-foreground mb-4">
              A robot is any machine that can <strong>sense</strong> its
              environment, <strong>think</strong> about what to do, and{" "}
              <strong>move</strong> or act in response.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "👁️", title: "Sense", desc: "Sensors detect the world: distance, color, temperature, light." },
                { icon: "🧠", title: "Think", desc: "A microcontroller runs code that decides what the robot should do." },
                { icon: "💪", title: "Act", desc: "Motors, servos, and other actuators move the robot in response." },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-4 border text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-muted-foreground">
            Every robot — from a simple line follower to a Mars rover — follows
            this same sense → think → act loop. Once you understand this, you
            understand robotics.
          </p>
        </section>

        {/* What You Need */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-2">🛒 What You Need to Start</h2>
          <p className="text-muted-foreground mb-6">
            You don't need much to get started. Here are the core components
            most beginner projects use:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {parts.map((p) => (
              <div key={p.name} className="flex gap-4 p-4 border rounded-xl bg-white hover:border-primary/30 transition-colors">
                <div className="text-2xl shrink-0">{p.icon}</div>
                <div>
                  <p className="font-semibold text-sm">{p.name}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-xl text-sm text-orange-800">
            💡 <strong>Budget tip:</strong> You can find an Arduino Uno starter kit with most of these parts for around $25–$35 on Amazon.
          </div>
        </section>

        {/* Beginner Path */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-2">🗺️ Your Beginner Path</h2>
          <p className="text-muted-foreground mb-6">
            Follow these four steps in order. Don't skip ahead — each one
            builds on the last.
          </p>
          <div className="space-y-4">
            {steps.map((s) => (
              <Link key={s.step} href={s.link} className="block">
                <div className="flex gap-4 items-start p-5 border rounded-xl bg-white hover:border-primary/40 hover:shadow-sm transition-all group">
                  <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <p className="font-semibold group-hover:text-primary transition-colors">{s.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{s.desc}</p>
                  </div>
                  <span className="ml-auto text-muted-foreground group-hover:text-primary transition-colors text-sm shrink-0">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Checklist */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-2">✅ Beginner Checklist</h2>
          <p className="text-muted-foreground mb-6">
            Use this as your roadmap. Check each one off as you learn.
          </p>
          <div className="bg-muted/30 rounded-2xl p-6 border">
            <ul className="space-y-3">
              {checklist.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded border-2 border-primary/40 shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Ready for step one?</p>
          <Link href="/lessons/what-is-a-robot">
            <Button size="lg">Start Lesson 1: What Is a Robot? →</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

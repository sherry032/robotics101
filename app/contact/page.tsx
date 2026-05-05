"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const reasons = [
  { icon: "❓", label: "Question about a lesson" },
  { icon: "🔧", label: "Help with a project" },
  { icon: "💡", label: "Content suggestion" },
  { icon: "🐛", label: "Found a mistake" },
  { icon: "👋", label: "Just saying hi" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [reason, setReason] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">📬</div>
          <h1 className="text-3xl font-bold mb-4">Message sent!</h1>
          <p className="text-muted-foreground mb-8">
            Thanks for reaching out. I read every message and usually reply
            within a day or two.
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline">
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
            Get in touch
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
            Say <span className="text-primary">hello</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Questions, feedback, build photos — I genuinely want to hear what
            you&apos;re working on.
          </p>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl grid md:grid-cols-[1fr_320px] gap-10">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label>What&apos;s this about?</Label>
              <div className="flex flex-wrap gap-2">
                {reasons.map((r) => (
                  <button
                    key={r.label}
                    type="button"
                    onClick={() => setReason(r.label)}
                    className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border transition-colors ${
                      reason === r.label
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-muted/25 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    <span>{r.icon}</span>
                    <span>{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Tell me what you're working on, what's confusing, or what you'd like to see..."
                rows={6}
                required
              />
            </div>

            <Button type="submit" size="lg" className="w-full sm:w-auto px-10">
              Send message →
            </Button>
          </form>

          {/* Sidebar */}
          <aside className="space-y-4">
            <Card className="bg-muted/30">
              <CardContent className="pt-5 pb-5">
                <div className="text-2xl mb-3">⏱</div>
                <p className="font-semibold mb-1">Response time</p>
                <p className="text-sm text-muted-foreground">
                  I usually reply within 1–2 days. Longer during school exam
                  weeks.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-muted/30">
              <CardContent className="pt-5 pb-5">
                <div className="text-2xl mb-3">📸</div>
                <p className="font-semibold mb-1">Share your build</p>
                <p className="text-sm text-muted-foreground">
                  Built something using one of my lessons? Send a photo — I love
                  seeing what people make.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-muted/30">
              <CardContent className="pt-5 pb-5">
                <div className="text-2xl mb-3">🐛</div>
                <p className="font-semibold mb-1">Found a mistake?</p>
                <p className="text-sm text-muted-foreground">
                  Please tell me! Accuracy matters, and I want every lesson to
                  be correct.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-5 pb-5">
                <div className="text-2xl mb-3">🤖</div>
                <p className="font-semibold mb-1 text-primary">Stuck on a project?</p>
                <p className="text-sm text-muted-foreground">
                  Describe your setup and what&apos;s not working. The more detail
                  you give, the better I can help.
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </div>
  );
}

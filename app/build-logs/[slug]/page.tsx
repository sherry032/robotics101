import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type BuildLog = {
  emoji: string;
  title: string;
  date: string;
  tags: string[];
  goal: string;
  problem: string;
  v1: { what: string; failed: string };
  testing: string;
  v2: { what: string; improved: string };
  reflection: string;
};

const logs: Record<string, BuildLog> = {
  "robot-arm-v1": {
    emoji: "🦿",
    title: "Robot Arm V1: First Build",
    date: "March 12, 2025",
    tags: ["Robotic Arm", "Servos", "Mechanical Design"],
    goal: "Build a 3-DOF robotic arm that can pick up small objects from a table and place them into a box.",
    problem: "I had four SG90 servo motors and a pile of cardboard. The challenge: cardboard isn't very rigid, and SG90s only produce 1.8 kg/cm of torque. I needed to figure out if this was enough to hold the arm's weight.",
    v1: {
      what: "Cut arm segments from thick cardboard. Hot-glued servo horns to each joint. Wired all four servos to Arduino pins. Powered everything from the Arduino's 5V pin. Wrote a simple potentiometer-controlled test sketch.",
      failed: "The arm worked for about 30 seconds. Then:\n\n1. The cardboard joints flexed under load — the arm drooped instead of holding position\n2. With all four servos connected to Arduino 5V, the board reset constantly (insufficient current)\n3. The shoulder joint servo got warm and eventually stopped responding\n\nThe arm could barely lift itself, let alone any payload.",
    },
    testing: "Tested each servo individually with a simple sweep sketch. Each servo worked fine alone. The problems were specifically caused by insufficient power and weak structure — not bad servos.",
    v2: {
      what: "Rebuilt with 3mm acrylic sheets instead of cardboard (laser-cut at school). Added a dedicated 5V/3A power supply for servos (separate from Arduino). Upgraded shoulder servo to MG996R (10 kg/cm torque).",
      improved: "The arm held position without drooping. The power supply eliminated all reset issues. The MG996R had enough torque to hold the forearm + claw weight at full extension. Pick-and-place worked reliably for objects up to ~100g.",
    },
    reflection: "Three key lessons:\n\n1. Power always matters: always calculate the current draw of all servos before choosing a power source. SG90s draw ~150mA stall, MG996Rs draw ~500mA. Four servos = up to 2A.\n\n2. Structural material choices are critical: cardboard is fine for mockups, never for a real build under load.\n\n3. Test subsystems separately first: I could have avoided the whole power issue by checking servo power requirements before building anything.",
  },
  "servo-failure": {
    emoji: "⚠️",
    title: "Why My Servo Burned Out",
    date: "March 18, 2025",
    tags: ["Debugging", "Power", "Servos"],
    goal: "Understand why three MG996R servos stopped working during a test session and how to prevent it from happening again.",
    problem: "I powered three MG996R servos directly from Arduino's 5V pin while testing my arm. Within two minutes, the servos began jittering uncontrollably. Within five minutes, one stopped responding entirely.",
    v1: {
      what: "Connected all three MG996R servo VCC lines directly to the Arduino 5V pin. Uploaded a sketch that moved all servos simultaneously to various positions.",
      failed: "Arduino's onboard regulator provides about 500mA total. Three MG996Rs stall at up to 500mA each — that's 1.5A potential draw from a 500mA supply.\n\nThe result: voltage drops. Servos receive insufficient voltage → they jitter (trying to reach position but can't hold it) → draw more current trying → voltage drops further. This thermal feedback loop eventually burned out one servo's control circuit.",
    },
    testing: "Used a multimeter to measure actual voltage at servo pins during operation. It dropped from 5V to 3.2V the moment all three servos moved simultaneously. 3.2V is below the minimum operating voltage for MG996R.",
    v2: {
      what: "Added a dedicated 5V 3A switching power supply for servos. Connected servo grounds to Arduino ground (common ground), but servo VCC to external supply.",
      improved: "Voltage at servo pins held steady at 4.95V even during full-load operation. No jitter. No overheating. All three servos responding correctly.",
    },
    reflection: "Rule I now follow for every project:\n\nCurrent budget = sum of max stall current for all servos + 20% headroom\n\nFor this project: 3 × 500mA × 1.2 = 1.8A minimum. I now always power servos from a dedicated supply and only share ground with Arduino.",
  },
  "wheel-testing": {
    emoji: "🛞",
    title: "Testing 4 Different Wheel Types",
    date: "March 25, 2025",
    tags: ["Wheels", "Mechanical", "Testing"],
    goal: "Find the best wheel type for an indoor navigation robot. Criteria: straight-line traction, turning accuracy, and surface compatibility.",
    problem: "I had four types of wheels available and no clear understanding of which performed best. I designed a systematic test to measure each type's performance on three surfaces: smooth tile, carpet, and hardwood.",
    v1: {
      what: "Built a simple 2WD test platform. Swapped in each wheel type and ran three tests: straight-line accuracy over 2 meters, spin-turn radius, and traction on incline (10° ramp).",
      failed: "Foam wheels had excellent traction but high rolling resistance — the robot was 30% slower. Omni-wheels allowed impressive sideways movement but provided poor straight-line traction on carpet (slipped constantly).",
    },
    testing: "Ran each test five times per wheel type and averaged results. Marked the floor with tape for consistent start/end positions. Used a stopwatch for speed tests.",
    v2: {
      what: "Narrowed to two finalists: standard rubber wheels and mecanum wheels. Did extended testing on carpet since that was the competition surface.",
      improved: "Rubber wheels won overall — best balance of traction, speed, and simplicity. Mecanum wheels were impressive but required careful power balancing to drive straight and were 40% slower due to rolling geometry.",
    },
    reflection: "The 'best' wheel depends entirely on your use case. For my indoor navigation robot on mixed surfaces, standard rubber wheels with an adequate wheelbase were the right choice. Omni and mecanum wheels are great for specific situations (omnidirectional movement) but not general use.",
  },
  "intake-redesign": {
    emoji: "🔄",
    title: "Redesigning the Intake Mechanism",
    date: "April 2, 2025",
    tags: ["Claw", "Redesign", "Iteration"],
    goal: "Redesign the robot's claw mechanism to reliably grip irregular-shaped foam game pieces at a 30° approach angle.",
    problem: "V1 claw used two rigid fingers controlled by one servo. It worked on flat objects but failed on foam pieces because they would compress and slip out, and the rigid fingers couldn't conform to the shape.",
    v1: {
      what: "Two laser-cut acrylic fingers, connected via a simple linkage to a single MG90S servo. Fingers closed in parallel (both moving equal amounts toward center).",
      failed: "Grip success rate: 45% in testing. Main failure mode: foam piece would compress between fingers but spring back and pop out when robot moved. Rigid fingers couldn't compensate for irregular shapes.",
    },
    testing: "Filmed all grip attempts in slow motion. Identified that failure happened in the 'transport' phase (after gripping, during movement) more than during the initial grip.",
    v2: {
      what: "Added foam padding to inner finger surfaces (conformable grip). Changed from parallel-close to pivot-close motion (one finger is fixed, other pivots into it — creates more consistent pressure). Added a small rubber band tension to hold grip passively without continuous servo power.",
      improved: "Grip success rate: 87% in testing. Foam padding compensated for shape irregularities. Pivot motion created more contact area. Passive tension held grip without motor power, preventing jitter from releasing the piece.",
    },
    reflection: "Iteration 3 (not documented here) reached 94% by adding a passive wrist spring to self-align on approach. Key insight: solving transport failure required passive grip mechanisms, not stronger servo force.",
  },
  "autonomous-debugging": {
    emoji: "🐛",
    title: "Debugging Autonomous Mode",
    date: "April 15, 2025",
    tags: ["Autonomous", "Debugging", "Sensors"],
    goal: "Investigate why the autonomous navigation program that worked perfectly in our practice space failed during competition.",
    problem: "During our first competition match, the robot's line-following worked for ~5 seconds then became erratic and left the track. Same code had 100% success rate in our own gym the week before.",
    v1: {
      what: "Competition field had multiple other robots running simultaneously. Our robot used IR-based line following. We used the same code from our practice sessions without modification.",
      failed: "Post-match analysis: other teams' robots also used IR sensors. The competition field had up to 6 robots operating simultaneously — all emitting IR signals. Our IR sensors picked up stray IR from other robots and interpreted it as line detection signals.\n\nThe result: phantom line detections causing the robot to turn erratically.",
    },
    testing: "Tested by pointing another team's IR sensor array directly at ours. Confirmed: our sensor readings spiked significantly when another robot's IR source was nearby.",
    v2: {
      what: "Three changes: (1) Added a narrow cardboard shield around sensors (blocked IR from angles other than straight down), (2) Implemented a moving average filter on sensor readings (required 3 consecutive consistent readings before acting), (3) Reduced sensor sensitivity via potentiometer adjustment.",
      improved: "Reduced false positive rate from ~40% to ~3% during multi-robot testing. Robot successfully navigated in the second competition match.",
    },
    reflection: "Testing in isolation doesn't replicate real competition conditions. Before any competition, consider: What electromagnetic or optical interference will exist? What are other robots doing? This applies to any sensor — not just IR.",
  },
};

export function generateStaticParams() {
  return Object.keys(logs).map((slug) => ({ slug }));
}

export default async function BuildLogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const log = logs[slug];
  if (!log) notFound();

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-8 flex items-center gap-2">
          <Link href="/build-logs" className="hover:text-primary transition-colors">Build Logs</Link>
          <span>/</span>
          <span className="text-foreground">{log.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="text-5xl mb-4">{log.emoji}</div>
          <div className="flex flex-wrap gap-2 mb-4">
            {log.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
            <Badge variant="outline">{log.date}</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">{log.title}</h1>
        </div>

        <Separator className="mb-10" />

        {/* Log sections */}
        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-bold mb-3">🎯 Goal</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{log.goal}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">❓ The Problem</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{log.problem}</p>
          </section>

          <section>
            <div className="border-l-4 border-primary/30 pl-5">
              <h2 className="text-xl font-bold mb-3">🔧 Version 1</h2>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-sm mb-2">What I built:</p>
                  <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{log.v1.what}</p>
                </div>
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="font-semibold text-sm text-red-800 mb-2">❌ What failed:</p>
                  <p className="text-red-700 text-sm leading-relaxed whitespace-pre-line">{log.v1.failed}</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">🧪 Testing</h2>
            <div className="bg-muted/30 rounded-xl p-5 border text-sm text-muted-foreground leading-relaxed">
              {log.testing}
            </div>
          </section>

          <section>
            <div className="border-l-4 border-green-400/50 pl-5">
              <h2 className="text-xl font-bold mb-3">✅ Version 2</h2>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-sm mb-2">What I changed:</p>
                  <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{log.v2.what}</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                  <p className="font-semibold text-sm text-green-800 mb-2">✅ What improved:</p>
                  <p className="text-green-700 text-sm leading-relaxed">{log.v2.improved}</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">💡 Reflection</h2>
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
              {log.reflection}
            </div>
          </section>
        </div>

        <Separator className="my-10" />

        <div className="flex justify-between">
          <Link href="/build-logs">
            <Button variant="ghost">← All Build Logs</Button>
          </Link>
          <Link href="/projects">
            <Button>See Projects →</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

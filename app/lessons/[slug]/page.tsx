import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type LessonData = {
  emoji: string;
  title: string;
  time: string;
  difficulty: string;
  intro: string;
  sections: { heading: string; body: string }[];
  mistake: string;
  quiz: { q: string; a: string }[];
  related: { slug: string; title: string }[];
};

const lessons: Record<string, LessonData> = {
  "what-is-a-robot": {
    emoji: "🤖",
    title: "What Is a Robot?",
    time: "5 min",
    difficulty: "Beginner",
    intro:
      "A robot is any machine that can sense its environment, make decisions, and take action. That's it. Once you understand this three-part loop, you understand the foundation of all robotics.",
    sections: [
      {
        heading: "The Sense → Think → Act Loop",
        body: "Every robot — from a tiny Arduino car to a Mars rover — follows the same loop:\n\n1. Sense: Sensors gather information from the environment (distance, color, temperature, light)\n2. Think: A microcontroller (like Arduino) runs code that decides what to do with the data\n3. Act: Motors, servos, or other actuators move the robot in response\n\nThis loop runs hundreds of times per second in most robots.",
      },
      {
        heading: "Real Robotics Example",
        body: "Take a line-following robot:\n\n• Sense: Two IR sensors detect whether they're over a black line or white floor\n• Think: Arduino checks sensor values and decides 'turn left', 'go straight', or 'turn right'\n• Act: Two motors adjust speed to steer the robot back onto the line\n\nThat's the entire program. Three steps, running in a loop.",
      },
      {
        heading: "What Makes Something a Robot?",
        body: "Not everything with wheels is a robot. A toy car isn't a robot — it just responds to your input. A robot must sense the environment on its own and react autonomously (or semi-autonomously). Autonomy is the key difference.",
      },
    ],
    mistake:
      "Many beginners think robots need to be complicated. Your first robot can do one simple thing well — that's enough. Don't try to build a humanoid robot on day one.",
    quiz: [
      { q: "What are the three parts of the robot loop?", a: "Sense, Think, Act" },
      { q: "What component acts as the 'brain' of most beginner robots?", a: "A microcontroller like Arduino" },
    ],
    related: [
      { slug: "robot-parts", title: "Robot Parts Explained" },
      { slug: "sensors", title: "How Sensors Work" },
    ],
  },
  "robot-parts": {
    emoji: "🔩",
    title: "Robot Parts Explained",
    time: "8 min",
    difficulty: "Beginner",
    intro:
      "Before you buy anything, understand what each component does. This lesson covers every major part in a beginner robot kit.",
    sections: [
      {
        heading: "The Microcontroller (Arduino)",
        body: "Arduino is a small programmable board that acts as your robot's brain. You upload code to it via USB, and it runs that code continuously. It reads sensor data through its input pins and controls motors through its output pins.\n\nThe Arduino Uno is the best starting board — it's well-documented, cheap (~$10), and works with almost every beginner project.",
      },
      {
        heading: "Motors",
        body: "There are two types beginners need to know:\n\n• DC Motors: Spin continuously. Used for wheels. You control speed and direction using a motor driver board.\n• Servo Motors: Rotate to a specific angle (0–180°). Used for arms, claws, and steering. Easier to control than DC motors.",
      },
      {
        heading: "Sensors",
        body: "Sensors are how your robot perceives the world:\n\n• IR Sensor: Detects black vs. white surfaces. Used in line followers.\n• Ultrasonic Sensor (HC-SR04): Measures distance. Used in obstacle avoidance.\n• Color Sensor (TCS230): Identifies colors.\n• Touch Sensor: Detects physical contact.",
      },
      {
        heading: "The Breadboard",
        body: "A breadboard is a plastic board with rows of holes. Components plug in without soldering. It's used during prototyping — you can rewire quickly when something doesn't work. Every beginner should start here before touching a soldering iron.",
      },
      {
        heading: "Power Supply",
        body: "Robots need power. A 9V battery or 4xAA pack usually powers the Arduino. Motors draw more current and often need a separate battery. Always check the voltage and current requirements of your components before connecting them.",
      },
    ],
    mistake:
      "Don't skip the motor driver board. Connecting motors directly to Arduino pins will damage your board — the pins can't handle the current motors need.",
    quiz: [
      { q: "What does a servo motor do differently from a DC motor?", a: "A servo rotates to a specific angle instead of spinning continuously" },
      { q: "Why use a breadboard instead of soldering?", a: "It allows quick, damage-free rewiring during prototyping" },
    ],
    related: [
      { slug: "motors", title: "Motors & Movement" },
      { slug: "sensors", title: "How Sensors Work" },
    ],
  },
  sensors: {
    emoji: "👁️",
    title: "How Sensors Work",
    time: "8 min",
    difficulty: "Beginner",
    intro:
      "Sensors are the eyes, ears, and touch receptors of your robot. Without sensors, a robot is blind to its environment. This lesson explains the most common beginner sensors and how they connect to Arduino.",
    sections: [
      {
        heading: "IR Sensors (Infrared)",
        body: "IR sensors emit infrared light and measure how much bounces back. Black surfaces absorb IR; white surfaces reflect it. This is how line-following robots 'see' the line.\n\nWiring: VCC → 5V, GND → GND, OUT → Digital Pin\nCode: digitalRead(pin) returns HIGH (white) or LOW (black).",
      },
      {
        heading: "Ultrasonic Sensor (HC-SR04)",
        body: "Works like sonar. It emits an ultrasonic pulse and measures how long it takes to bounce back. From that time, you calculate distance:\n\ndistance (cm) = duration / 58\n\nWiring: VCC → 5V, GND → GND, TRIG → Digital Pin, ECHO → Digital Pin\nRange: 2cm to 400cm. Accuracy: ±3mm.",
      },
      {
        heading: "Color Sensors (TCS230/TCS3200)",
        body: "Shines light onto a surface and measures how much of each color frequency is reflected. Returns raw frequency values that you map to RGB.\n\nUsed in: sorting robots, color-detecting systems. Slightly more complex to calibrate than IR sensors.",
      },
      {
        heading: "Touch / Limit Switches",
        body: "The simplest sensor — a button. When pressed, the circuit closes and Arduino reads HIGH. Used as bumper sensors to detect collisions.\n\nWiring: One leg → Digital Pin + pull-up resistor (10kΩ), other leg → GND.",
      },
    ],
    mistake:
      "IR sensors are affected by ambient light. Bright sunlight or fluorescent lighting can cause false readings. Test your robot in the same lighting conditions you'll use it in.",
    quiz: [
      { q: "What formula converts ultrasonic pulse duration to distance in cm?", a: "distance = duration / 58" },
      { q: "Why might an IR line sensor fail outdoors?", a: "Bright sunlight interferes with IR readings" },
    ],
    related: [
      { slug: "what-is-a-robot", title: "What Is a Robot?" },
      { slug: "coding-basics", title: "Coding Basics" },
    ],
  },
  motors: {
    emoji: "⚙️",
    title: "Motors & Movement",
    time: "7 min",
    difficulty: "Beginner",
    intro:
      "Motors convert electrical energy into motion. Knowing which motor to use — and how to control it — is one of the most important skills in robotics.",
    sections: [
      {
        heading: "DC Motors",
        body: "DC motors spin continuously when voltage is applied. Reverse the voltage → motor spins the other way. Control speed with PWM (pulse-width modulation).\n\nYou can't connect a DC motor directly to Arduino — you need a motor driver (like L298N or L293D). The driver handles the higher current and allows direction control from Arduino signals.",
      },
      {
        heading: "Servo Motors",
        body: "Servos rotate to a specific angle (0°–180°) and hold that position. They have built-in feedback and a control circuit — no motor driver needed.\n\nControl with Arduino Servo library:\nservo.write(90); // rotate to 90 degrees\n\nPerfect for: arms, claws, steering mechanisms.",
      },
      {
        heading: "Stepper Motors",
        body: "Steppers move in precise increments (steps). One full rotation = typically 200 steps. No feedback needed — you just count steps.\n\nUsed in: 3D printers, CNC machines. Overkill for most beginner projects but worth knowing about.",
      },
      {
        heading: "Motor Drivers",
        body: "The L298N is the most common beginner motor driver. It controls two DC motors independently. Connect:\n• IN1/IN2 → Arduino digital pins (direction control)\n• ENA → Arduino PWM pin (speed control)\n• Motor A output → Motor terminals\n• 12V → external battery, GND shared with Arduino",
      },
    ],
    mistake:
      "Powering motors from the Arduino's 5V pin will immediately cause problems — the motors will pull too much current, resetting or damaging your board. Always power motors from a separate battery through a motor driver.",
    quiz: [
      { q: "Why do DC motors need a motor driver?", a: "Motors require more current than Arduino pins can supply" },
      { q: "Which motor type is best for a claw that needs to hold a position?", a: "Servo motor" },
    ],
    related: [
      { slug: "robot-parts", title: "Robot Parts Explained" },
      { slug: "coding-basics", title: "Coding Basics" },
    ],
  },
  "coding-basics": {
    emoji: "💻",
    title: "Coding Basics for Robots",
    time: "10 min",
    difficulty: "Beginner",
    intro:
      "You don't need to be a programmer to control a robot. You need four concepts: variables, conditions, loops, and functions. That's it.",
    sections: [
      {
        heading: "Variables",
        body: "Variables store values your program uses:\n\nint speed = 150;        // motor speed (0-255)\nint sensorPin = 7;      // which Arduino pin the sensor uses\nbool lineDetected = false;\n\nAlways name variables something meaningful. 'x' is a bad variable name. 'leftSensorValue' is a good one.",
      },
      {
        heading: "Conditions (if/else)",
        body: "Conditions make decisions:\n\nif (sensorValue < 500) {\n  // line detected — turn left\n  leftMotor(50);\n  rightMotor(150);\n} else {\n  // no line — go straight\n  leftMotor(150);\n  rightMotor(150);\n}\n\nThis is the core of most robot programs.",
      },
      {
        heading: "Loops",
        body: "The loop() function in Arduino runs forever:\n\nvoid loop() {\n  int sensorValue = analogRead(A0);\n  if (sensorValue < 500) { turn(); }\n  else { goStraight(); }\n}\n\nYou don't write the loop yourself — Arduino calls this function repeatedly, hundreds of times per second.",
      },
      {
        heading: "Functions",
        body: "Functions group code into reusable blocks:\n\nvoid goForward() {\n  digitalWrite(IN1, HIGH);\n  digitalWrite(IN2, LOW);\n  analogWrite(ENA, 150);\n}\n\nNow instead of writing 3 lines every time you want to go forward, you just call goForward().",
      },
    ],
    mistake:
      "Beginners often forget to call delay() between sensor readings. Without small delays, the Arduino reads so fast it can't process accurately. Add delay(10) to delay(50) in your loop if readings seem erratic.",
    quiz: [
      { q: "What does the loop() function do in Arduino?", a: "It runs continuously, over and over, forever" },
      { q: "What keyword creates a decision in your code?", a: "if" },
    ],
    related: [
      { slug: "motors", title: "Motors & Movement" },
      { slug: "sensors", title: "How Sensors Work" },
    ],
  },
  "mechanical-design": {
    emoji: "📐",
    title: "Mechanical Design",
    time: "7 min",
    difficulty: "Intermediate",
    intro:
      "The physical structure of your robot matters as much as the code. A poorly designed chassis will cause failures that no amount of software can fix.",
    sections: [
      {
        heading: "Chassis Basics",
        body: "The chassis is your robot's frame. For beginners, acrylic or wood sheets work well — easy to cut and drill. Consider: weight distribution (keep heavy parts like batteries low), wheelbase width (wider = more stable), and mounting holes for components.",
      },
      {
        heading: "Wheel and Drive Configurations",
        body: "• 2WD (two-wheel drive): Two drive wheels + one caster. Simple, common for beginners.\n• 4WD: Four motors, more torque, better off-road. More complex.\n• Tank drive: Two independently controlled tracks. Turns in place. Great for tight spaces.",
      },
      {
        heading: "Center of Gravity",
        body: "A high center of gravity causes tipping on turns. Place heavy components (battery, electronics) as low as possible. A robot that tips over every time it turns is a mechanical design problem — not a code problem.",
      },
    ],
    mistake:
      "Don't over-engineer your first chassis. A flat acrylic sheet with motors zip-tied on works fine for a first project. Add complexity only when the simple version fails for a specific reason.",
    quiz: [
      { q: "What is the most stable drive configuration for a beginner robot?", a: "2WD with a caster wheel" },
    ],
    related: [
      { slug: "engineering-process", title: "The Engineering Process" },
      { slug: "common-mistakes", title: "Common Beginner Mistakes" },
    ],
  },
  "engineering-process": {
    emoji: "🔄",
    title: "The Engineering Process",
    time: "6 min",
    difficulty: "Beginner",
    intro:
      "Professional engineers don't build things perfectly the first time. They follow a process: design, build, test, improve. Understanding this cycle changes how you think about your projects.",
    sections: [
      {
        heading: "Design",
        body: "Before touching hardware: sketch your design on paper. List all components. Write out the logic in plain English before writing code. Ask: what is the robot supposed to do? How will it know when it's done? What can go wrong?",
      },
      {
        heading: "Build",
        body: "Build iteratively — one small piece at a time. Don't assemble everything and then test. Test each subsystem (sensors, motors, code) separately before putting it all together. This makes bugs much easier to find.",
      },
      {
        heading: "Test",
        body: "Test in the actual environment you'll use the robot in. A line-follower that works on your desk may fail on a different surface. Document what works and what doesn't — this is your build log.",
      },
      {
        heading: "Improve",
        body: "Find the biggest problem and fix that one thing. Don't try to fix everything at once. After each improvement, test again. Keep a list of known issues in priority order.",
      },
    ],
    mistake:
      "Skipping the design phase and going straight to building is the #1 cause of wasted time. 15 minutes of planning saves 2 hours of debugging.",
    quiz: [
      { q: "What is the correct order of the engineering process?", a: "Design → Build → Test → Improve" },
    ],
    related: [
      { slug: "common-mistakes", title: "Common Beginner Mistakes" },
      { slug: "mechanical-design", title: "Mechanical Design" },
    ],
  },
  "common-mistakes": {
    emoji: "⚠️",
    title: "Common Beginner Mistakes",
    time: "6 min",
    difficulty: "Beginner",
    intro:
      "Everyone makes these mistakes. Knowing them in advance saves hours of debugging.",
    sections: [
      {
        heading: "Powering Motors from Arduino Pins",
        body: "Arduino GPIO pins can only supply ~40mA. DC motors draw 200–500mA. Connect a motor directly and you'll damage the pin — or the whole board. Always use a motor driver like the L298N.",
      },
      {
        heading: "Wrong Voltage for Sensors",
        body: "Most sensors run at 5V, but some (like many color sensors) run at 3.3V. Check the datasheet. Connecting a 3.3V sensor to 5V can damage it permanently.",
      },
      {
        heading: "No Common Ground",
        body: "If your motors use a separate battery, connect the grounds (GND) of both batteries together. Without a common ground, the motor driver can't communicate properly with Arduino.",
      },
      {
        heading: "Testing on the Wrong Surface",
        body: "An IR line sensor calibrated on printer paper will fail on tape. Always test in your actual environment. Recalibrate sensors when you change surfaces or lighting.",
      },
      {
        heading: "Building Everything Before Testing Anything",
        body: "Build and test one subsystem at a time. Test sensors. Then test motors. Then integrate. When everything breaks at once, you won't know where to start debugging.",
      },
    ],
    mistake:
      "The biggest mistake of all: giving up after one failure. Every failure is data. Read the error, understand why it happened, fix it, and move on.",
    quiz: [
      { q: "What component do you need between Arduino and DC motors?", a: "A motor driver (like L298N)" },
      { q: "Why must two batteries in a robot share a ground connection?", a: "Without common ground, the circuits can't communicate properly" },
    ],
    related: [
      { slug: "robot-parts", title: "Robot Parts Explained" },
      { slug: "engineering-process", title: "The Engineering Process" },
    ],
  },
};

const difficultyColor: Record<string, string> = {
  Beginner: "border-accent/30 bg-accent/10 text-accent",
  Intermediate: "border-secondary/30 bg-secondary/10 text-secondary",
};

export function generateStaticParams() {
  return Object.keys(lessons).map((slug) => ({ slug }));
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = lessons[slug];
  if (!lesson) notFound();

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-8 flex items-center gap-2">
          <Link href="/lessons" className="hover:text-primary transition-colors">
            Lessons
          </Link>
          <span>/</span>
          <span className="text-foreground">{lesson.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="text-5xl mb-4">{lesson.emoji}</div>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className={difficultyColor[lesson.difficulty]}>{lesson.difficulty}</Badge>
            <Badge variant="outline">⏱ {lesson.time} read</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{lesson.title}</h1>
          <p className="text-lg text-muted-foreground">{lesson.intro}</p>
        </div>

        <Separator className="mb-10" />

        {/* Sections */}
        <div className="space-y-10 mb-12">
          {lesson.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-bold mb-3">{section.heading}</h2>
              <div className="rounded-lg border bg-muted/30 p-5 text-sm leading-relaxed text-foreground/80 whitespace-pre-line backdrop-blur">
                {section.body}
              </div>
            </div>
          ))}
        </div>

        {/* Common Mistake */}
        <div className="mb-12 rounded-lg border border-accent/25 bg-accent/10 p-5">
          <p className="mb-1 text-sm font-semibold text-accent">⚠️ Common Mistake</p>
          <p className="text-sm text-foreground/80">{lesson.mistake}</p>
        </div>

        {/* Quiz */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">🧪 Quick Check</h2>
          <div className="space-y-4">
            {lesson.quiz.map((item, i) => (
              <details key={i} className="overflow-hidden rounded-lg border bg-card/70 backdrop-blur">
                <summary className="px-5 py-4 cursor-pointer font-medium text-sm hover:bg-muted/30 transition-colors">
                  Q{i + 1}: {item.q}
                </summary>
                <div className="px-5 py-4 bg-muted/20 border-t text-sm text-muted-foreground">
                  ✅ {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Related */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4">📚 Related Lessons</h2>
          <div className="flex flex-wrap gap-3">
            {lesson.related.map((r) => (
              <Link key={r.slug} href={`/lessons/${r.slug}`}>
                <Button variant="outline" size="sm">{r.title} →</Button>
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

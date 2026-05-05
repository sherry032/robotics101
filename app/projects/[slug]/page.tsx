import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type ProjectData = {
  emoji: string;
  title: string;
  difficulty: string;
  time: string;
  cost: string;
  overview: string;
  materials: string[];
  wiring: string;
  instructions: { step: string; detail: string }[];
  code: string;
  testing: string;
  problems: { issue: string; fix: string }[];
  improvements: string[];
};

const projects: Record<string, ProjectData> = {
  "line-following-robot": {
    emoji: "🚗",
    title: "Line-Following Robot",
    difficulty: "Beginner",
    time: "2–3 hours",
    cost: "$25–35",
    overview:
      "Build a robot that follows a black line on a white surface using two IR sensors. This is the classic first robot project — it teaches you sensors, motors, motor drivers, and basic Arduino logic all at once.",
    materials: [
      "Arduino Uno",
      "L298N Motor Driver",
      "2x DC Motors with wheels",
      "2x IR Obstacle Sensor Modules",
      "Robot chassis (2WD kit)",
      "Caster wheel",
      "9V battery + battery clip",
      "4x AA battery holder (for motors)",
      "Jumper wires",
      "Breadboard (optional)",
    ],
    wiring: `IR Sensors:
Left sensor  → VCC: 5V | GND: GND | OUT: Pin 7
Right sensor → VCC: 5V | GND: GND | OUT: Pin 8

L298N Motor Driver:
IN1 → Pin 2  |  IN2 → Pin 3  (Left motor direction)
IN3 → Pin 4  |  IN4 → Pin 5  (Right motor direction)
ENA → Pin 9 (PWM)  |  ENB → Pin 10 (PWM)
12V → 4xAA battery pack
GND → GND shared with Arduino
Motor A output → Left motor
Motor B output → Right motor`,
    instructions: [
      { step: "Assemble the chassis", detail: "Mount the motors onto the chassis frame. Attach wheels to motors. Screw in the caster wheel at the front." },
      { step: "Mount electronics", detail: "Attach Arduino and L298N motor driver to the chassis. Use double-sided tape or standoffs. Keep wires tidy." },
      { step: "Wire the motor driver", detail: "Connect the L298N to Arduino following the wiring diagram above. Double-check IN1–IN4 pins before powering on." },
      { step: "Mount and wire IR sensors", detail: "Position sensors 1–2cm from the ground at the front of the robot, spaced about 3cm apart centered on the robot's axis." },
      { step: "Upload the code", detail: "Copy the code below into Arduino IDE. Select Board: Arduino Uno. Select the correct COM port. Click Upload." },
      { step: "Make a track", detail: "Use 2cm-wide black electrical tape on white cardboard or poster board. Create a loop with gentle curves." },
      { step: "Test and calibrate", detail: "Place the robot on the line. Power it on. Adjust the potentiometer on the IR sensors until each sensor reliably detects the line." },
    ],
    code: `// Line Following Robot
// IR sensors: LOW = black line detected, HIGH = white surface

const int LEFT_SENSOR = 7;
const int RIGHT_SENSOR = 8;
const int IN1 = 2, IN2 = 3; // Left motor
const int IN3 = 4, IN4 = 5; // Right motor
const int ENA = 9, ENB = 10;
const int BASE_SPEED = 150;

void setup() {
  pinMode(LEFT_SENSOR, INPUT);
  pinMode(RIGHT_SENSOR, INPUT);
  pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);
  pinMode(ENA, OUTPUT); pinMode(ENB, OUTPUT);
}

void setMotors(int left, int right) {
  digitalWrite(IN1, left > 0 ? HIGH : LOW);
  digitalWrite(IN2, left > 0 ? LOW : HIGH);
  analogWrite(ENA, abs(left));
  digitalWrite(IN3, right > 0 ? HIGH : LOW);
  digitalWrite(IN4, right > 0 ? LOW : HIGH);
  analogWrite(ENB, abs(right));
}

void loop() {
  bool leftLine = !digitalRead(LEFT_SENSOR);
  bool rightLine = !digitalRead(RIGHT_SENSOR);

  if (leftLine && rightLine) {
    setMotors(BASE_SPEED, BASE_SPEED); // Go straight
  } else if (leftLine && !rightLine) {
    setMotors(BASE_SPEED / 2, BASE_SPEED); // Veer right
  } else if (!leftLine && rightLine) {
    setMotors(BASE_SPEED, BASE_SPEED / 2); // Veer left
  } else {
    setMotors(0, 0); // Lost line, stop
  }
  delay(10);
}`,
    testing:
      "Place the robot at the start of the track. Both sensors should be over the line. Power on and observe. The robot should stay on the line through curves. If it oscillates wildly, reduce BASE_SPEED. If it can't follow tight curves, slow down further.",
    problems: [
      { issue: "Robot doesn't move at all", fix: "Check that IN1–IN4 wires are connected. Check that 4xAA battery is connected to L298N 12V input." },
      { issue: "Robot spins in circles", fix: "One motor wired backwards. Swap the two wires going into that motor terminal on the L298N." },
      { issue: "Robot ignores the line", fix: "IR sensor threshold wrong. Adjust the small potentiometer on each sensor module with a screwdriver." },
      { issue: "Robot falls off on curves", fix: "Speed too high or sensor spacing too wide. Reduce BASE_SPEED and move sensors closer together." },
    ],
    improvements: [
      "Add a third center sensor for better straight-line tracking",
      "Implement PID control for smoother, faster line following",
      "Add an LCD display showing sensor values for easier debugging",
      "Make the robot stop when it completes a full lap",
    ],
  },
  "obstacle-avoidance-robot": {
    emoji: "🏎️",
    title: "Obstacle Avoidance Robot",
    difficulty: "Beginner",
    time: "3–4 hours",
    cost: "$30–40",
    overview:
      "Build a robot that detects walls and objects using an ultrasonic sensor and automatically steers away from them. A great second project after the line follower.",
    materials: [
      "Arduino Uno",
      "L298N Motor Driver",
      "2x DC Motors with wheels",
      "HC-SR04 Ultrasonic Sensor",
      "Servo Motor (for sensor pan)",
      "Robot chassis (2WD kit)",
      "Caster wheel",
      "9V battery + 4xAA battery pack",
      "Jumper wires",
    ],
    wiring: `HC-SR04 Ultrasonic:
TRIG → Pin 11 | ECHO → Pin 12
VCC → 5V | GND → GND

Servo:
Signal → Pin 6
VCC → 5V | GND → GND

Motor Driver same as line follower project.`,
    instructions: [
      { step: "Build chassis", detail: "Same as the line follower. Mount motors, wheels, and caster wheel." },
      { step: "Mount servo on front", detail: "Attach servo to the front of the chassis. Mount the ultrasonic sensor on the servo horn so it can pan left and right." },
      { step: "Wire everything", detail: "Follow the wiring diagram. The servo pans the ultrasonic sensor to look left and right before deciding which way to turn." },
      { step: "Upload code", detail: "Upload the sketch below. The robot scans left and right when it detects an obstacle, then turns toward the clearer direction." },
      { step: "Test in open space", detail: "Place the robot on the floor and let it roam. Watch for correct avoidance behavior." },
    ],
    code: `#include <Servo.h>

const int TRIG = 11, ECHO = 12;
const int IN1 = 2, IN2 = 3, IN3 = 4, IN4 = 5;
const int ENA = 9, ENB = 10;
const int SERVO_PIN = 6;
const int STOP_DISTANCE = 20; // cm

Servo panServo;

long getDistance() {
  digitalWrite(TRIG, LOW); delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  return pulseIn(ECHO, HIGH) / 58;
}

void setMotors(int l, int r) {
  digitalWrite(IN1, l > 0); digitalWrite(IN2, l < 0);
  analogWrite(ENA, abs(l));
  digitalWrite(IN3, r > 0); digitalWrite(IN4, r < 0);
  analogWrite(ENB, abs(r));
}

void setup() {
  pinMode(TRIG, OUTPUT); pinMode(ECHO, INPUT);
  pinMode(IN1,OUTPUT); pinMode(IN2,OUTPUT);
  pinMode(IN3,OUTPUT); pinMode(IN4,OUTPUT);
  panServo.attach(SERVO_PIN);
  panServo.write(90); delay(500);
}

void loop() {
  long dist = getDistance();
  if (dist > STOP_DISTANCE) {
    setMotors(150, 150); // Go forward
  } else {
    setMotors(0, 0); delay(300);
    panServo.write(0); delay(400);
    long leftDist = getDistance();
    panServo.write(180); delay(400);
    long rightDist = getDistance();
    panServo.write(90); delay(400);
    if (leftDist > rightDist) setMotors(-150, 150); // Turn left
    else setMotors(150, -150); // Turn right
    delay(400);
  }
  delay(50);
}`,
    testing:
      "Place the robot in a corridor or room. It should drive forward, stop before walls, scan left and right, then turn toward the open direction.",
    problems: [
      { issue: "Robot doesn't stop in time", fix: "Increase STOP_DISTANCE constant. Check that ECHO pin is receiving signal." },
      { issue: "Distance readings are erratic", fix: "Add small capacitor (100µF) across HC-SR04 power pins. Ensure solid GND connection." },
      { issue: "Robot keeps turning one way only", fix: "Check panServo wiring. Verify servo reaches full 0° and 180° positions." },
    ],
    improvements: [
      "Add three sensors (left, front, right) for better spatial awareness",
      "Implement smoother turns instead of full stops",
      "Log obstacle data to Serial Monitor for mapping",
    ],
  },
  "robotic-arm": {
    emoji: "🦿",
    title: "3-DOF Robotic Arm",
    difficulty: "Intermediate",
    time: "5–8 hours",
    cost: "$40–60",
    overview:
      "Build a three-joint robotic arm controlled by potentiometers (joysticks). This project teaches you servo control, kinematics basics, and multi-servo coordination.",
    materials: [
      "Arduino Uno",
      "3x Servo Motors (MG996R recommended)",
      "3x 10kΩ Potentiometers",
      "1x Servo for claw",
      "Wooden or acrylic arm pieces",
      "Screws and nuts",
      "5V 3A external power supply (for servos)",
      "Jumper wires",
    ],
    wiring: `Servos: Signal wires → Pins 3, 5, 6, 9
All servo VCC → External 5V power supply
All servo GND → Common ground with Arduino

Potentiometers:
Pot 1 → A0 | Pot 2 → A1 | Pot 3 → A2 | Pot 4 → A3
Each: left pin → GND, right pin → 5V, middle wiper → analog pin`,
    instructions: [
      { step: "Cut arm pieces", detail: "Cut base, upper arm, forearm, and claw bracket from 3mm acrylic or 6mm plywood. Drill holes for servo horns and bolts." },
      { step: "Assemble joints", detail: "Attach servos at each joint using screws. The servo horn connects to the next arm segment." },
      { step: "Wire servos to external power", detail: "Never power high-torque servos from Arduino 5V — it will reset or damage the board. Use an external 5V/3A supply." },
      { step: "Wire potentiometers", detail: "Mount three pots on a control panel. Wire following diagram above." },
      { step: "Upload and tune", detail: "Upload code. Test each joint separately. Adjust the map() ranges to limit joint travel within safe mechanical limits." },
    ],
    code: `#include <Servo.h>

Servo base, shoulder, elbow, claw;
const int POTS[] = {A0, A1, A2, A3};

void setup() {
  base.attach(3);
  shoulder.attach(5);
  elbow.attach(6);
  claw.attach(9);
}

void loop() {
  base.write(map(analogRead(A0), 0, 1023, 0, 180));
  shoulder.write(map(analogRead(A1), 0, 1023, 30, 150));
  elbow.write(map(analogRead(A2), 0, 1023, 0, 180));
  claw.write(map(analogRead(A3), 0, 1023, 0, 60));
  delay(15);
}`,
    testing:
      "Test each servo with its potentiometer separately before connecting all four. Watch for mechanical binding at joint limits.",
    problems: [
      { issue: "Servos jitter", fix: "Add 100µF capacitors across servo power lines. Ensure solid power supply — USB power is insufficient for multiple servos." },
      { issue: "Arm drops under weight", fix: "Use higher torque servos (MG996R instead of SG90). Add counterweights to the arm." },
    ],
    improvements: [
      "Record and play back movement sequences",
      "Add inverse kinematics for XYZ coordinate control",
      "Replace potentiometers with a PS2 controller",
    ],
  },
  "plant-watering-robot": {
    emoji: "🌱",
    title: "Automatic Plant Waterer",
    difficulty: "Intermediate",
    time: "3–4 hours",
    cost: "$20–30",
    overview:
      "Build a system that monitors soil moisture and automatically waters your plant when it gets too dry. Combines analog sensors, thresholds, and a pump relay.",
    materials: [
      "Arduino Uno",
      "Soil moisture sensor",
      "5V relay module",
      "Small water pump (5V submersible)",
      "Silicone tubing",
      "Small water reservoir (bottle/container)",
      "9V battery",
      "Jumper wires",
    ],
    wiring: `Soil Sensor: VCC→5V, GND→GND, AOUT→A0
Relay: VCC→5V, GND→GND, IN→Pin 7
Pump: connects through relay NO and COM terminals`,
    instructions: [
      { step: "Set up soil sensor", detail: "Insert probes into soil. Connect to Arduino A0." },
      { step: "Wire relay", detail: "Connect relay IN pin to Arduino Pin 7. Connect pump through relay NO terminal." },
      { step: "Set up pump and tubing", detail: "Place pump in water reservoir. Run tubing to plant pot." },
      { step: "Upload code and calibrate", detail: "Read sensor values on Serial Monitor. Set DRY_THRESHOLD to the value at which you want watering to trigger." },
    ],
    code: `const int MOISTURE_PIN = A0;
const int RELAY_PIN = 7;
const int DRY_THRESHOLD = 400; // calibrate this
const int WATER_DURATION = 3000; // 3 seconds

void setup() {
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, HIGH); // Relay off (active low)
  Serial.begin(9600);
}

void loop() {
  int moisture = analogRead(MOISTURE_PIN);
  Serial.println(moisture);

  if (moisture < DRY_THRESHOLD) {
    digitalWrite(RELAY_PIN, LOW); // Pump on
    delay(WATER_DURATION);
    digitalWrite(RELAY_PIN, HIGH); // Pump off
    delay(60000); // Wait 1 min before checking again
  }
  delay(5000); // Check every 5 seconds
}`,
    testing: "Check Serial Monitor to see live moisture values. Pour dry soil vs. wet soil to verify sensor response.",
    problems: [
      { issue: "Pump doesn't turn on", fix: "Check relay wiring. Verify relay LED lights when Pin 7 is LOW." },
      { issue: "Sensor gives unstable readings", fix: "Add delay(100) after analogRead. Ensure solid GND connection." },
    ],
    improvements: [
      "Add an LCD to display moisture level",
      "Log data to SD card over time",
      "Add WiFi (ESP8266) to send moisture alerts to phone",
    ],
  },
  "simple-claw": {
    emoji: "🦾",
    title: "Simple Claw Mechanism",
    difficulty: "Beginner",
    time: "1–2 hours",
    cost: "$10–15",
    overview:
      "Build a servo-powered claw controlled by a button. Great first servo project that teaches mechanical linkages and basic input/output.",
    materials: [
      "Arduino Uno",
      "1x Servo Motor (SG90)",
      "2x Push buttons",
      "2x 10kΩ resistors",
      "Popsicle sticks or cardboard (for claw structure)",
      "Hot glue gun",
      "Jumper wires",
    ],
    wiring: `Servo: Signal→Pin 9, VCC→5V, GND→GND
Button 1 (open): Pin 4 with 10kΩ pull-up to 5V
Button 2 (close): Pin 5 with 10kΩ pull-up to 5V`,
    instructions: [
      { step: "Build claw from sticks", detail: "Cut popsicle sticks to make two claw fingers hinged at a central pivot. Attach servo horn to move both fingers together." },
      { step: "Mount servo", detail: "Glue servo to base. Attach claw assembly to servo horn." },
      { step: "Wire buttons", detail: "Each button connects Pin → button → GND, with 10kΩ resistor from Pin to 5V (pull-up)." },
      { step: "Test", detail: "Open button opens claw (servo to 90°). Close button closes claw (servo to 0°)." },
    ],
    code: `#include <Servo.h>

Servo claw;
const int BTN_OPEN = 4;
const int BTN_CLOSE = 5;

void setup() {
  claw.attach(9);
  pinMode(BTN_OPEN, INPUT_PULLUP);
  pinMode(BTN_CLOSE, INPUT_PULLUP);
  claw.write(90);
}

void loop() {
  if (!digitalRead(BTN_OPEN)) {
    claw.write(90); // Open
  }
  if (!digitalRead(BTN_CLOSE)) {
    claw.write(0); // Closed
  }
  delay(20);
}`,
    testing: "Press open button — claw opens. Press close button — claw grips. Try picking up a small lightweight object.",
    problems: [
      { issue: "Servo jitters when idle", fix: "Add delay(20) in loop. Ensure power supply is stable." },
      { issue: "Claw too weak to grip", fix: "Use MG90S instead of SG90 for more torque. Reduce claw arm length." },
    ],
    improvements: [
      "Add a potentiometer for variable grip strength",
      "Mount claw on a robot arm",
      "Add force sensor to detect when grip is firm",
    ],
  },
  "trash-sorter": {
    emoji: "♻️",
    title: "Trash Sorting Robot",
    difficulty: "Intermediate",
    time: "6–10 hours",
    cost: "$50–80",
    overview:
      "Uses a color sensor to identify recyclable (blue bin) vs. non-recyclable (black bin) items, then routes them with a servo-controlled gate.",
    materials: [
      "Arduino Uno",
      "TCS3200 Color Sensor",
      "2x Servo Motors",
      "Cardboard or acrylic for bins and chute",
      "Small DC motor + driver (for conveyor)",
      "9V battery",
      "Jumper wires",
    ],
    wiring: `TCS3200: S0→4, S1→5, S2→6, S3→7, OUT→8
VCC→5V, GND→GND
Gate servo→Pin 9 | Conveyor servo→Pin 10`,
    instructions: [
      { step: "Build the frame", detail: "Create a chute from cardboard or acrylic. Object enters top, gate below routes to correct bin." },
      { step: "Calibrate color sensor", detail: "Hold known-color objects in front of sensor. Record frequency values for each color in Serial Monitor." },
      { step: "Build gate mechanism", detail: "Servo-powered flap divides output chute to left or right bin." },
      { step: "Program and test", detail: "Start with just two colors. Add more as you calibrate." },
    ],
    code: `// Simplified color detection
const int S0=4, S1=5, S2=6, S3=7, OUT=8;
const int GATE=9;
#include <Servo.h>
Servo gate;

int readColor(int s2val, int s3val) {
  digitalWrite(S2, s2val); digitalWrite(S3, s3val);
  return pulseIn(OUT, LOW);
}

void setup() {
  pinMode(S0,OUTPUT); pinMode(S1,OUTPUT);
  pinMode(S2,OUTPUT); pinMode(S3,OUTPUT);
  pinMode(OUT, INPUT);
  digitalWrite(S0,HIGH); digitalWrite(S1,HIGH);
  gate.attach(GATE);
  Serial.begin(9600);
}

void loop() {
  int red = readColor(LOW, LOW);
  int blue = readColor(LOW, HIGH);
  Serial.print("R:"); Serial.print(red);
  Serial.print(" B:"); Serial.println(blue);
  // Lower value = more of that color reflected
  if (blue < red) gate.write(45); // Recyclable bin
  else gate.write(135); // Trash bin
  delay(200);
}`,
    testing: "Hold blue paper and measure readings. Hold other colors. Set thresholds between values.",
    problems: [
      { issue: "Sensor can't distinguish colors", fix: "Improve lighting — use a bright white LED pointed at detection area. Shield from ambient light." },
      { issue: "Gate doesn't hold position", fix: "Upgrade to MG996R servo." },
    ],
    improvements: [
      "Add a conveyor belt to automate item feeding",
      "Expand to 4+ color categories",
      "Add weight sensor to verify sorted items",
    ],
  },
};

const difficultyColor: Record<string, string> = {
  Beginner: "border-accent/30 bg-accent/10 text-accent",
  Intermediate: "border-secondary/30 bg-secondary/10 text-secondary",
};

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects[slug];
  if (!project) notFound();

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-8 flex items-center gap-2">
          <Link href="/projects" className="hover:text-primary transition-colors">Projects</Link>
          <span>/</span>
          <span className="text-foreground">{project.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="text-5xl mb-4">{project.emoji}</div>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className={difficultyColor[project.difficulty]}>{project.difficulty}</Badge>
            <Badge variant="outline">⏱ {project.time}</Badge>
            <Badge variant="outline">💰 {project.cost}</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-lg text-muted-foreground">{project.overview}</p>
        </div>

        <Separator className="mb-10" />

        {/* Materials */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">🛒 Materials Needed</h2>
          <ul className="space-y-2">
            {project.materials.map((m, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">✓</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Wiring */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">⚡ Wiring Diagram</h2>
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg border bg-muted/40 p-5 font-mono text-sm leading-relaxed">
            {project.wiring}
          </pre>
        </section>

        {/* Instructions */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">🔧 Build Instructions</h2>
          <ol className="space-y-4">
            {project.instructions.map((inst, i) => (
              <li key={i} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-sm">{inst.step}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{inst.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Code */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">💻 Code</h2>
          <pre className="overflow-x-auto rounded-lg border border-primary/20 bg-background/80 p-5 font-mono text-xs leading-relaxed text-foreground shadow-inner">
            {project.code}
          </pre>
        </section>

        {/* Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">🧪 Testing</h2>
          <div className="rounded-lg border bg-muted/30 p-5 text-sm text-muted-foreground backdrop-blur">
            {project.testing}
          </div>
        </section>

        {/* Problems */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">⚠️ Common Problems</h2>
          <div className="space-y-3">
            {project.problems.map((p, i) => (
              <div key={i} className="rounded-lg border border-accent/25 bg-accent/10 p-4">
                <p className="text-sm font-semibold text-accent">Problem: {p.issue}</p>
                <p className="mt-1 text-sm text-foreground/80">Fix: {p.fix}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Improvements */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">🚀 Next Steps & Improvements</h2>
          <ul className="space-y-2">
            {project.improvements.map((imp, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-primary">→</span>
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </section>

        <Separator className="mb-8" />
        <div className="flex justify-between">
          <Link href="/projects">
            <Button variant="ghost">← All Projects</Button>
          </Link>
          <Link href="/build-logs">
            <Button variant="outline">See Build Logs →</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

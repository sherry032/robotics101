import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const resources = [
  {
    category: "Getting Started",
    emoji: "🚀",
    items: [
      { title: "Arduino Official Documentation", desc: "Complete reference for all Arduino functions, boards, and libraries.", type: "Website", free: true },
      { title: "Arduino IDE", desc: "The official programming environment for writing and uploading Arduino code.", type: "Software", free: true },
      { title: "Tinkercad Circuits", desc: "Simulate Arduino circuits in your browser before buying any hardware.", type: "Simulator", free: true },
    ],
  },
  {
    category: "Learning",
    emoji: "📖",
    items: [
      { title: "Arduino Project Hub", desc: "Thousands of community projects with full instructions.", type: "Website", free: true },
      { title: "Instructables - Robotics", desc: "Step-by-step guides for beginner to advanced robot projects.", type: "Website", free: true },
      { title: "Robotics Academy (CMU)", desc: "Free curriculum from Carnegie Mellon for middle and high school students.", type: "Course", free: true },
      { title: "MIT OpenCourseWare - Robotics", desc: "University-level robotics lectures and materials from MIT.", type: "Course", free: true },
    ],
  },
  {
    category: "Parts & Kits",
    emoji: "🛒",
    items: [
      { title: "Arduino Starter Kit", desc: "Official Arduino kit with board, components, and project book. Best first purchase.", type: "Kit", free: false },
      { title: "Elegoo Smart Robot Car Kit", desc: "Complete beginner robot car kit with all parts and instructions (~$35).", type: "Kit", free: false },
      { title: "Adafruit", desc: "High quality components with excellent documentation. Great for sensors.", type: "Store", free: false },
      { title: "SparkFun", desc: "Electronics retailer focused on education and hobbyist robotics.", type: "Store", free: false },
    ],
  },
  {
    category: "Communities",
    emoji: "👥",
    items: [
      { title: "r/robotics", desc: "Subreddit for robotics enthusiasts of all levels. Good for questions.", type: "Community", free: true },
      { title: "Arduino Forums", desc: "Official Arduino community — best place for code-specific questions.", type: "Forum", free: true },
      { title: "FIRST Robotics Community", desc: "For students interested in competitive robotics (FRC, FTC, FLL).", type: "Community", free: true },
      { title: "Hackaday.io", desc: "Project showcase and community for hardware builders.", type: "Community", free: true },
    ],
  },
  {
    category: "Tools & Software",
    emoji: "🔧",
    items: [
      { title: "Fritzing", desc: "Visual wiring diagram software. Create circuit diagrams to document your projects.", type: "Software", free: true },
      { title: "KiCad", desc: "Free PCB design software for when you outgrow the breadboard.", type: "Software", free: true },
      { title: "Fusion 360", desc: "3D CAD software. Free for students and hobbyists. Design robot parts.", type: "Software", free: true },
      { title: "Serial Monitor (Arduino IDE)", desc: "Built into Arduino IDE. Essential for debugging sensor values.", type: "Built-in", free: true },
    ],
  },
  {
    category: "Competitions",
    emoji: "🏆",
    items: [
      { title: "FIRST Robotics (FRC)", desc: "High school robotics competition. 6-week build season, regional + national events.", type: "Competition", free: false },
      { title: "FIRST Tech Challenge (FTC)", desc: "Smaller scale than FRC. Uses Android + REV hardware. Grades 7–12.", type: "Competition", free: false },
      { title: "VEX Robotics", desc: "Popular competition platform. Multiple divisions from middle school to college.", type: "Competition", free: false },
      { title: "Science Olympiad", desc: "Includes robotics events alongside other science disciplines.", type: "Competition", free: false },
    ],
  },
];

const typeColors: Record<string, string> = {
  Website: "bg-blue-100 text-blue-700 border-blue-200",
  Software: "bg-purple-100 text-purple-700 border-purple-200",
  Simulator: "bg-cyan-100 text-cyan-700 border-cyan-200",
  Course: "bg-green-100 text-green-700 border-green-200",
  Kit: "bg-orange-100 text-orange-700 border-orange-200",
  Store: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Community: "bg-pink-100 text-pink-700 border-pink-200",
  Forum: "bg-indigo-100 text-indigo-700 border-indigo-200",
  Competition: "bg-red-100 text-red-700 border-red-200",
  "Built-in": "bg-gray-100 text-gray-700 border-gray-200",
};

export default function ResourcesPage() {
  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
            Curated Links
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Resources 📚</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            The best free and paid resources for learning robotics — organized by
            category so you can find exactly what you need.
          </p>
        </div>

        <div className="space-y-12">
          {resources.map((group) => (
            <section key={group.category}>
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xl">{group.emoji}</span>
                <h2 className="text-xl font-bold">{group.category}</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {group.items.map((item) => (
                  <Card key={item.title} className="hover:border-primary/30 transition-colors">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-sm font-semibold">{item.title}</CardTitle>
                        <div className="flex gap-1 shrink-0">
                          <Badge className={`text-xs ${typeColors[item.type] ?? "bg-gray-100 text-gray-700"}`}>
                            {item.type}
                          </Badge>
                          {item.free && (
                            <Badge className="text-xs bg-green-100 text-green-700 border-green-200">
                              Free
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 p-6 bg-muted/30 rounded-2xl border text-center">
          <p className="font-semibold mb-2">Missing a resource?</p>
          <p className="text-sm text-muted-foreground">
            Reach out and I&apos;ll consider adding it to the list.
          </p>
        </div>
      </div>
    </div>
  );
}

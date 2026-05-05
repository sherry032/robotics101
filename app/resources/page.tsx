import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getResources } from "@/lib/content-db";

export const dynamic = "force-dynamic";

const typeColors: Record<string, string> = {
  Website: "border-primary/30 bg-primary/10 text-primary",
  Software: "border-secondary/30 bg-secondary/10 text-secondary",
  Simulator: "border-accent/30 bg-accent/10 text-accent",
  Course: "border-accent/30 bg-accent/10 text-accent",
  Kit: "border-primary/30 bg-primary/10 text-primary",
  Store: "border-secondary/30 bg-secondary/10 text-secondary",
  Community: "border-secondary/30 bg-secondary/10 text-secondary",
  Forum: "border-primary/30 bg-primary/10 text-primary",
  Competition: "border-destructive/35 bg-destructive/10 text-destructive",
  "Built-in": "border-border bg-muted/40 text-muted-foreground",
};

export default async function ResourcesPage() {
  const resources = await getResources();

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
                  <Card key={item.title} className="transition-colors hover:border-primary/45">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-sm font-semibold">{item.title}</CardTitle>
                        <div className="flex gap-1 shrink-0">
                          <Badge className={`text-xs ${typeColors[item.type] ?? "border-border bg-muted/40 text-muted-foreground"}`}>
                            {item.type}
                          </Badge>
                          {item.free && (
                            <Badge className="border-accent/30 bg-accent/10 text-xs text-accent">
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

        <div className="mt-12 rounded-lg border bg-muted/30 p-6 text-center backdrop-blur">
          <p className="font-semibold mb-2">Missing a resource?</p>
          <p className="text-sm text-muted-foreground">
            Reach out and I&apos;ll consider adding it to the list.
          </p>
        </div>
      </div>
    </div>
  );
}

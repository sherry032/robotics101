import { promises as fs } from "node:fs";
import path from "node:path";

export type Lesson = {
  slug: string;
  order: number;
  emoji: string;
  title: string;
  desc: string;
  time: string;
  difficulty: string;
  intro: string;
  sections: { heading: string; body: string }[];
  mistake: string;
  quiz: { q: string; a: string }[];
  related: { slug: string; title: string }[];
};

export type Project = {
  slug: string;
  level: string;
  groupOrder: number;
  itemOrder: number;
  shortDesc: string;
  listTime: string;
  listCost: string;
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

export type BuildLog = {
  slug: string;
  order: number;
  emoji: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  goal: string;
  problem: string;
  v1: { what: string; failed: string };
  testing: string;
  v2: { what: string; improved: string };
  reflection: string;
};

export type ResourceGroup = {
  category: string;
  emoji: string;
  items: { title: string; desc: string; type: string; free: boolean }[];
};

export type ContentDb = {
  homepage: {
    featuredLessons: { slug: string; title: string; emoji: string; time: string }[];
    stats: { label: string; value: string }[];
  };
  lessons: Lesson[];
  projects: Project[];
  buildLogs: BuildLog[];
  resources: ResourceGroup[];
  startHere: {
    parts: { icon: string; name: string; desc: string }[];
    steps: { step: string; title: string; desc: string; link: string }[];
    checklist: string[];
  };
  about: {
    timeline: { year: string; title: string; desc: string }[];
    values: { icon: string; title: string; desc: string }[];
  };
};

const dbPath = path.join(process.cwd(), "data", "content-db.json");

export async function readContentDb(): Promise<ContentDb> {
  const raw = await fs.readFile(dbPath, "utf8");
  return JSON.parse(raw) as ContentDb;
}

export async function writeContentDb(db: ContentDb) {
  const tmpPath = `${dbPath}.tmp`;
  await fs.writeFile(tmpPath, `${JSON.stringify(db, null, 2)}\n`, "utf8");
  await fs.rename(tmpPath, dbPath);
}

export async function getHomepageContent() {
  const db = await readContentDb();
  return db.homepage;
}

export async function listLessons() {
  const db = await readContentDb();
  return [...db.lessons].sort((a, b) => a.order - b.order);
}

export async function getLessonBySlug(slug: string) {
  const lessons = await listLessons();
  return lessons.find((lesson) => lesson.slug === slug) ?? null;
}

export async function listProjects() {
  const db = await readContentDb();
  return [...db.projects].sort(
    (a, b) => a.groupOrder - b.groupOrder || a.itemOrder - b.itemOrder
  );
}

export async function listProjectsByLevel() {
  const projects = await listProjects();
  const groups = new Map<string, Project[]>();
  for (const project of projects) {
    groups.set(project.level, [...(groups.get(project.level) ?? []), project]);
  }
  return [...groups.entries()].map(([level, items]) => ({ level, items }));
}

export async function getProjectBySlug(slug: string) {
  const projects = await listProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function listBuildLogs() {
  const db = await readContentDb();
  return [...db.buildLogs].sort((a, b) => a.order - b.order);
}

export async function getBuildLogBySlug(slug: string) {
  const logs = await listBuildLogs();
  return logs.find((log) => log.slug === slug) ?? null;
}

export async function getResources() {
  const db = await readContentDb();
  return db.resources;
}

export async function getStartHereContent() {
  const db = await readContentDb();
  return db.startHere;
}

export async function getAboutContent() {
  const db = await readContentDb();
  return db.about;
}

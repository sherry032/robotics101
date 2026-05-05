import { NextResponse } from "next/server";
import { readContentDb, writeContentDb, type ContentDb } from "@/lib/content-db";

export const dynamic = "force-dynamic";

type Collection = keyof ContentDb;

function isCollection(value: string): value is Collection {
  return [
    "homepage",
    "lessons",
    "projects",
    "buildLogs",
    "resources",
    "startHere",
    "about",
  ].includes(value);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  if (!isCollection(collection)) {
    return NextResponse.json({ error: "Unknown content collection" }, { status: 404 });
  }

  const db = await readContentDb();
  return NextResponse.json(db[collection]);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  if (!isCollection(collection)) {
    return NextResponse.json({ error: "Unknown content collection" }, { status: 404 });
  }

  const db = await readContentDb();
  db[collection] = await request.json();
  await writeContentDb(db);
  return NextResponse.json({ ok: true });
}

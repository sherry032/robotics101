import { NextResponse } from "next/server";
import { readContentDb, writeContentDb, type ContentDb } from "@/lib/content-db";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = await readContentDb();
  return NextResponse.json(db);
}

export async function PUT(request: Request) {
  const db = (await request.json()) as ContentDb;
  await writeContentDb(db);
  return NextResponse.json({ ok: true });
}

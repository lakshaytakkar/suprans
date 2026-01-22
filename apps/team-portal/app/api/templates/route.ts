import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import templates from "@/data/templates.json";

export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("team-portal-session");

  if (!sessionCookie?.value) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  return NextResponse.json({ templates });
}

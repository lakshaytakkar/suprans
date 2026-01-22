import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import training from "@/data/training.json";

export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("team-portal-session");

  if (!sessionCookie?.value) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Only return published training for non-admins
  const user = JSON.parse(sessionCookie.value);
  let filteredTraining = [...training];

  if (user.role !== "superadmin") {
    filteredTraining = filteredTraining.filter((t) => t.status === "published");
  }

  return NextResponse.json({ courses: filteredTraining });
}

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import users from "@/data/users.json";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("team-portal-session");

  if (!sessionCookie?.value) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;

  return NextResponse.json({ user: userWithoutPassword });
}

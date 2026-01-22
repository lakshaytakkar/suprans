import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import users from "@/data/users.json";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("team-portal-session");

  if (!sessionCookie?.value) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");

  // Return users without passwords
  let filteredUsers = users.map(({ password: _, ...user }) => user);

  if (role) {
    filteredUsers = filteredUsers.filter((user) => user.role === role);
  }

  return NextResponse.json({ users: filteredUsers });
}

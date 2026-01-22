import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import users from "@/data/users.json";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Find user by email and password
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create session data (excluding password)
    const sessionData = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatar: user.avatar,
      createdAt: user.createdAt,
    };

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set("team-portal-session", JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({ user: sessionData });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

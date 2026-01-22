import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import activities from "@/data/activities.json";

// In-memory storage for demo
let activitiesData = [...activities];

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("team-portal-session");

  if (!sessionCookie?.value) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const leadId = searchParams.get("leadId");

  let filteredActivities = [...activitiesData];

  // Filter by lead
  if (leadId) {
    filteredActivities = filteredActivities.filter(
      (activity) => activity.leadId === leadId
    );
  }

  // Sort by most recent
  filteredActivities.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return NextResponse.json({ activities: filteredActivities });
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("team-portal-session");

  if (!sessionCookie?.value) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const user = JSON.parse(sessionCookie.value);

  try {
    const body = await request.json();
    const newActivity = {
      id: `activity-${Date.now()}`,
      ...body,
      userId: user.id,
      createdAt: new Date().toISOString(),
    };

    activitiesData.push(newActivity);

    return NextResponse.json({ activity: newActivity }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import leads from "@/data/leads.json";

// In-memory storage for demo (resets on server restart)
let leadsData = [...leads];

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
  const lead = leadsData.find((l) => l.id === id);

  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json({ lead });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("team-portal-session");

  if (!sessionCookie?.value) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;
  const leadIndex = leadsData.findIndex((l) => l.id === id);

  if (leadIndex === -1) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  try {
    const body = await request.json();
    leadsData[leadIndex] = {
      ...leadsData[leadIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ lead: leadsData[leadIndex] });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("team-portal-session");

  if (!sessionCookie?.value) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const user = JSON.parse(sessionCookie.value);

  // Only admins can delete leads
  if (user.role !== "superadmin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { id } = await params;
  const leadIndex = leadsData.findIndex((l) => l.id === id);

  if (leadIndex === -1) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  leadsData.splice(leadIndex, 1);

  return NextResponse.json({ success: true });
}

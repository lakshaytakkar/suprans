import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import leads from "@/data/leads.json";

// In-memory storage for demo (resets on server restart)
let leadsData = [...leads];

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("team-portal-session");

  if (!sessionCookie?.value) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const user = JSON.parse(sessionCookie.value);
  const { searchParams } = new URL(request.url);

  // Filter options
  const stage = searchParams.get("stage");
  const assignedTo = searchParams.get("assignedTo");
  const search = searchParams.get("search");

  let filteredLeads = [...leadsData];

  // If not admin, only show assigned leads
  if (user.role !== "superadmin") {
    filteredLeads = filteredLeads.filter((lead) => lead.assignedTo === user.id);
  } else if (assignedTo) {
    filteredLeads = filteredLeads.filter(
      (lead) => lead.assignedTo === assignedTo
    );
  }

  // Filter by stage
  if (stage) {
    filteredLeads = filteredLeads.filter((lead) => lead.stage === stage);
  }

  // Search
  if (search) {
    const searchLower = search.toLowerCase();
    filteredLeads = filteredLeads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(searchLower) ||
        lead.company?.toLowerCase().includes(searchLower) ||
        lead.email.toLowerCase().includes(searchLower)
    );
  }

  // Sort by most recent
  filteredLeads.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return NextResponse.json({ leads: filteredLeads });
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("team-portal-session");

  if (!sessionCookie?.value) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const newLead = {
      id: `lead-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    leadsData.push(newLead);

    return NextResponse.json({ lead: newLead }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

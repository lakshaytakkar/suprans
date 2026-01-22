import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import tasks from "@/data/tasks.json";

// In-memory storage for demo
let tasksData = [...tasks];

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
  const task = tasksData.find((t) => t.id === id);

  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  return NextResponse.json({ task });
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
  const taskIndex = tasksData.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  try {
    const body = await request.json();
    tasksData[taskIndex] = {
      ...tasksData[taskIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ task: tasksData[taskIndex] });
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

  const { id } = await params;
  const taskIndex = tasksData.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  tasksData.splice(taskIndex, 1);

  return NextResponse.json({ success: true });
}

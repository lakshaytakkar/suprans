import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import tasks from "@/data/tasks.json";

// In-memory storage for demo
let tasksData = [...tasks];

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("team-portal-session");

  if (!sessionCookie?.value) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const user = JSON.parse(sessionCookie.value);
  const { searchParams } = new URL(request.url);

  const status = searchParams.get("status");
  const assignedTo = searchParams.get("assignedTo");

  let filteredTasks = [...tasksData];

  // If not admin, only show assigned tasks
  if (user.role !== "superadmin") {
    filteredTasks = filteredTasks.filter(
      (task) => task.assignedTo === user.id
    );
  } else if (assignedTo) {
    filteredTasks = filteredTasks.filter(
      (task) => task.assignedTo === assignedTo
    );
  }

  // Filter by status
  if (status) {
    filteredTasks = filteredTasks.filter((task) => task.status === status);
  }

  // Sort by due date
  filteredTasks.sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return NextResponse.json({ tasks: filteredTasks });
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("team-portal-session");

  if (!sessionCookie?.value) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const newTask = {
      id: `task-${Date.now()}`,
      ...body,
      tags: body.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tasksData.push(newTask);

    return NextResponse.json({ task: newTask }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

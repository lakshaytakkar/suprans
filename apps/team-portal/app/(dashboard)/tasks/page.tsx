"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { AddTaskDialog } from "@/components/tasks/add-task-dialog";
import { cn } from "@/lib/utils";
import type { Task, TaskStatus } from "@/lib/types/task";

const statuses: TaskStatus[] = ["todo", "in_progress", "review", "done"];

const statusLabels: Record<TaskStatus, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  review: "Review",
  done: "Done",
};

const statusColors: Record<TaskStatus, string> = {
  todo: "bg-gray-500",
  in_progress: "bg-blue-500",
  review: "bg-yellow-500",
  done: "bg-green-500",
};

const priorityColors: Record<string, string> = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
};

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
  onStatusChange?: (taskId: string, done: boolean) => void;
}

function TaskCard({ task, isDragging, onStatusChange }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "touch-none",
        (isDragging || isSortableDragging) && "opacity-50"
      )}
    >
      <Card className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow">
        <CardContent className="p-3">
          <div className="flex items-start gap-2">
            <Checkbox
              checked={task.status === "done"}
              onCheckedChange={(checked) =>
                onStatusChange?.(task.id, checked as boolean)
              }
              onClick={(e) => e.stopPropagation()}
              className="mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  "font-medium text-sm mb-1",
                  task.status === "done" && "line-through text-muted-foreground"
                )}
              >
                {task.title}
              </p>
              {task.description && (
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {task.description}
                </p>
              )}
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant="outline"
                  className={cn("text-xs", priorityColors[task.priority])}
                >
                  {task.priority}
                </Badge>
                {task.dueDate && (
                  <span className="text-xs text-muted-foreground">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onStatusChange: (taskId: string, done: boolean) => void;
}

function TaskColumn({ status, tasks, onStatusChange }: TaskColumnProps) {
  return (
    <div className="flex flex-col min-w-[280px] max-w-[280px]">
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
          <h3 className="font-medium text-sm">{statusLabels[status]}</h3>
          <Badge variant="secondary" className="ml-auto text-xs">
            {tasks.length}
          </Badge>
        </div>
      </div>
      <div
        className="flex-1 bg-muted/30 rounded-lg p-2 min-h-[500px] space-y-2"
        data-status={status}
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onStatusChange={onStatusChange} />
          ))}
        </SortableContext>
        {tasks.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-8">
            No tasks
          </p>
        )}
      </div>
    </div>
  );
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      if (res.ok) {
        const data = await res.json();
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveId(null);

    const { active } = event;
    const taskId = active.id as string;
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    // Find the status column based on where it was dropped
    const dropTarget = document.elementFromPoint(
      event.activatorEvent instanceof PointerEvent
        ? event.activatorEvent.clientX
        : 0,
      event.activatorEvent instanceof PointerEvent
        ? event.activatorEvent.clientY
        : 0
    );

    const statusContainer = dropTarget?.closest("[data-status]");
    const newStatus = statusContainer?.getAttribute("data-status") as TaskStatus;

    if (newStatus && newStatus !== task.status) {
      // Optimistic update
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
      );

      // Update on server
      try {
        await fetch(`/api/tasks/${taskId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });
      } catch (error) {
        console.error("Failed to update task:", error);
        // Revert on error
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? { ...t, status: task.status } : t))
        );
      }
    }
  };

  const handleStatusChange = async (taskId: string, done: boolean) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const newStatus: TaskStatus = done ? "done" : "todo";

    // Optimistic update
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );

    // Update on server
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (error) {
      console.error("Failed to update task:", error);
      // Revert on error
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: task.status } : t))
      );
    }
  };

  const getTasksByStatus = (status: TaskStatus) =>
    tasks.filter((t) => t.status === status);

  const activeTask = activeId ? tasks.find((t) => t.id === activeId) : null;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {statuses.map((status) => (
            <Skeleton key={status} className="min-w-[280px] h-[600px]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
          <p className="text-muted-foreground">
            Manage your tasks with drag and drop
          </p>
        </div>
        <AddTaskDialog onTaskAdded={fetchTasks} />
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {statuses.map((status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={getTasksByStatus(status)}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} isDragging /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

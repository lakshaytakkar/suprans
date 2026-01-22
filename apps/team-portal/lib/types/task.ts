export type TaskStatus = "todo" | "in_progress" | "review" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  assignedTo: string;
  leadId?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export const TASK_STATUSES: TaskStatus[] = ["todo", "in_progress", "review", "done"];

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  review: "Review",
  done: "Done",
};

export const TASK_PRIORITIES: TaskPriority[] = ["low", "medium", "high"];

export const TASK_PRIORITY_COLORS: Record<TaskPriority, string> = {
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-red-500",
};

export type ActivityType =
  | "call"
  | "email"
  | "meeting"
  | "note"
  | "status_change"
  | "whatsapp"
  | "quote";

export interface Activity {
  id: string;
  leadId: string;
  userId: string;
  type: ActivityType;
  title: string;
  description?: string;
  outcome?: string;
  createdAt: string;
}

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  call: "Phone Call",
  email: "Email",
  meeting: "Meeting",
  note: "Note",
  status_change: "Status Change",
  whatsapp: "WhatsApp",
  quote: "Quote",
};

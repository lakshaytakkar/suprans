export type LeadStage =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal"
  | "negotiation"
  | "won"
  | "lost";

export type LeadSource =
  | "website"
  | "referral"
  | "social_media"
  | "cold_call"
  | "advertisement"
  | "other";

export interface Lead {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service: string;
  value: number;
  stage: LeadStage;
  assignedTo: string;
  source: LeadSource;
  nextFollowUp?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export const LEAD_STAGES: LeadStage[] = [
  "new",
  "contacted",
  "qualified",
  "proposal",
  "negotiation",
  "won",
  "lost",
];

export const LEAD_STAGE_LABELS: Record<LeadStage, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  proposal: "Proposal",
  negotiation: "Negotiation",
  won: "Won",
  lost: "Lost",
};

export const LEAD_STAGE_COLORS: Record<LeadStage, string> = {
  new: "bg-blue-500",
  contacted: "bg-yellow-500",
  qualified: "bg-purple-500",
  proposal: "bg-orange-500",
  negotiation: "bg-pink-500",
  won: "bg-green-500",
  lost: "bg-red-500",
};

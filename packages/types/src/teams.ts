// Team Types
export type TeamType = "vertical-department" | "department" | "admin" | "personal";

export type TeamRole = "superadmin" | "executive" | "employee";

export interface Team {
  id: string;
  code: string;
  name: string;
  description?: string | null;
  type: TeamType;
  icon?: string | null;
  color?: string | null;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserTeam {
  id: string;
  userId: string;
  tenantId?: string | null;
  teamId: string;
  role: TeamRole;
  isPrimary: boolean;
  createdAt: Date;
  team?: Team;
}

export interface TeamNavigation {
  id: string;
  teamId: string;
  label: string;
  icon?: string | null;
  url: string;
  order: number;
  parentId?: string | null;
  isGlobal: boolean;
  createdAt: Date;
  children?: TeamNavigation[];
}


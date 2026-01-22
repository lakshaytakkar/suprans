-- Create teams table
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('vertical-department', 'department', 'admin', 'personal')),
  icon TEXT,
  color TEXT,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_teams table
CREATE TABLE IF NOT EXISTS user_teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID, -- Optional tenant reference (no FK constraint as tenants table may not exist)
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('superadmin', 'executive', 'employee')),
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, tenant_id, team_id)
);

-- Create team_navigation table
CREATE TABLE IF NOT EXISTS team_navigation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  icon TEXT,
  url TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  parent_id UUID REFERENCES public.team_navigation(id) ON DELETE CASCADE,
  is_global BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_teams_code ON teams(code);
CREATE INDEX IF NOT EXISTS idx_teams_type ON teams(type);
CREATE INDEX IF NOT EXISTS idx_teams_is_active ON teams(is_active);
CREATE INDEX IF NOT EXISTS idx_user_teams_user_id ON user_teams(user_id);
CREATE INDEX IF NOT EXISTS idx_user_teams_tenant_id ON user_teams(tenant_id);
CREATE INDEX IF NOT EXISTS idx_user_teams_team_id ON user_teams(team_id);
CREATE INDEX IF NOT EXISTS idx_user_teams_user_tenant ON user_teams(user_id, tenant_id);
CREATE INDEX IF NOT EXISTS idx_team_navigation_team_id ON team_navigation(team_id);
CREATE INDEX IF NOT EXISTS idx_team_navigation_parent_id ON team_navigation(parent_id);
CREATE INDEX IF NOT EXISTS idx_team_navigation_is_global ON team_navigation(is_global);

-- Create updated_at trigger for teams table
CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON teams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_navigation ENABLE ROW LEVEL SECURITY;

-- RLS Policies for teams
CREATE POLICY "Users can view active teams" ON teams
  FOR SELECT USING (is_active = true);

-- RLS Policies for user_teams
CREATE POLICY "Users can view their own team memberships" ON user_teams
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own team memberships" ON user_teams
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own team memberships" ON user_teams
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for team_navigation
CREATE POLICY "Users can view navigation for their teams" ON team_navigation
  FOR SELECT USING (
    is_global = true OR
    EXISTS (
      SELECT 1 FROM user_teams ut
      WHERE ut.team_id = team_navigation.team_id
      AND ut.user_id = auth.uid()
    )
  );


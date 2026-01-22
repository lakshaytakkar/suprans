-- Create sample users for testing
-- Note: This uses Supabase's auth.users table
-- Password for all users: Suprans@123

-- First, create the users in auth.users
-- The password hash is for 'Suprans@123' using bcrypt
-- Note: In production, use Supabase Dashboard or Admin API to create users

-- Insert users using Supabase's auth admin functions
-- This requires running with service_role key

DO $$
DECLARE
  superadmin_id UUID;
  sales_id UUID;
  hr_id UUID;
  superadmin_team_id UUID;
  sales_team_id UUID;
  hr_team_id UUID;
  operations_team_id UUID;
  recruitment_team_id UUID;
  accounting_team_id UUID;
BEGIN
  -- Get team IDs
  SELECT id INTO superadmin_team_id FROM teams WHERE code = 'superadmin';
  SELECT id INTO sales_team_id FROM teams WHERE code = 'travel-sales';
  SELECT id INTO hr_team_id FROM teams WHERE code = 'hr-team';
  SELECT id INTO operations_team_id FROM teams WHERE code = 'travel-operations';
  SELECT id INTO recruitment_team_id FROM teams WHERE code = 'recruitment-team';
  SELECT id INTO accounting_team_id FROM teams WHERE code = 'accounting';

  -- Check if users already exist and get their IDs
  SELECT id INTO superadmin_id FROM auth.users WHERE email = 'admin@suprans.in';
  SELECT id INTO sales_id FROM auth.users WHERE email = 'sales@suprans.in';
  SELECT id INTO hr_id FROM auth.users WHERE email = 'hr@suprans.in';

  -- Only proceed if we have user IDs (users must be created via Supabase Dashboard/API first)
  -- This script will assign them to teams

  -- If superadmin exists, assign to ALL teams
  IF superadmin_id IS NOT NULL THEN
    -- Delete existing assignments for this user
    DELETE FROM user_teams WHERE user_id = superadmin_id;

    -- Assign superadmin to all teams with superadmin role
    INSERT INTO user_teams (user_id, team_id, role, is_primary) VALUES
      (superadmin_id, superadmin_team_id, 'superadmin', true),
      (superadmin_id, sales_team_id, 'superadmin', false),
      (superadmin_id, operations_team_id, 'superadmin', false),
      (superadmin_id, hr_team_id, 'superadmin', false),
      (superadmin_id, recruitment_team_id, 'superadmin', false),
      (superadmin_id, accounting_team_id, 'superadmin', false);

    RAISE NOTICE 'Superadmin user assigned to all teams';
  END IF;

  -- If sales user exists, assign to sales team
  IF sales_id IS NOT NULL THEN
    DELETE FROM user_teams WHERE user_id = sales_id;

    INSERT INTO user_teams (user_id, team_id, role, is_primary) VALUES
      (sales_id, sales_team_id, 'employee', true);

    RAISE NOTICE 'Sales user assigned to travel-sales team';
  END IF;

  -- If HR user exists, assign to HR and recruitment teams
  IF hr_id IS NOT NULL THEN
    DELETE FROM user_teams WHERE user_id = hr_id;

    INSERT INTO user_teams (user_id, team_id, role, is_primary) VALUES
      (hr_id, hr_team_id, 'executive', true),
      (hr_id, recruitment_team_id, 'executive', false);

    RAISE NOTICE 'HR user assigned to HR and recruitment teams';
  END IF;

END $$;

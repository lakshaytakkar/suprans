-- Migration: Cleanup teams and navigation for Sales-focused system
-- This migration:
-- 1. Deletes non-sales teams and their associated data
-- 2. Renames travel-sales to sales
-- 3. Updates navigation URLs from /travel/sales/* to /sales/*
-- 4. Inserts clean Sales and Admin navigation items

-- Step 1: Delete navigation items for teams that will be removed
-- (navigation items are auto-deleted via ON DELETE CASCADE when teams are deleted)

-- Step 2: Delete user_teams entries for teams that will be removed
-- (user_teams entries are auto-deleted via ON DELETE CASCADE when teams are deleted)

-- Step 3: Delete the non-sales teams
DELETE FROM teams WHERE code IN (
  'travel-operations',
  'hr-team',
  'recruitment-team',
  'superadmin',
  'accounting'
);

-- Step 4: Update the travel-sales team to just 'sales'
UPDATE teams
SET
  code = 'sales',
  name = 'Sales',
  description = 'Sales team',
  type = 'department',
  icon = 'ChartIcon',
  color = '#3b82f6',
  "order" = 1
WHERE code = 'travel-sales';

-- Step 5: Delete existing navigation for the sales team (to replace with new navigation)
DELETE FROM team_navigation WHERE team_id = (SELECT id FROM teams WHERE code = 'sales');

-- Step 6: Insert clean Sales navigation items
INSERT INTO team_navigation (team_id, label, icon, url, "order", is_global)
SELECT
  t.id,
  nav.label,
  nav.icon,
  nav.url,
  nav."order",
  nav.is_global
FROM teams t
CROSS JOIN (VALUES
  ('Dashboard', 'Home01Icon', '/sales/dashboard', 1, false),
  ('My Leads', 'UserAdd01Icon', '/sales/leads', 2, false),
  ('Follow-ups', 'Calendar01Icon', '/sales/follow-ups', 3, false),
  ('Payment Links', 'Wallet01Icon', '/sales/payment-links', 4, false),
  ('Pipeline', 'Rocket01Icon', '/sales/pipeline', 5, false)
) AS nav(label, icon, url, "order", is_global)
WHERE t.code = 'sales';

-- Step 7: Create admin team for admin-only navigation (role-based access)
INSERT INTO teams (code, name, description, type, icon, color, "order", is_active)
VALUES ('admin', 'Admin', 'Administration access', 'admin', 'Shield01Icon', '#ef4444', 0, true)
ON CONFLICT (code) DO UPDATE SET
  name = 'Admin',
  description = 'Administration access',
  type = 'admin',
  icon = 'Shield01Icon',
  color = '#ef4444',
  "order" = 0,
  is_active = true;

-- Step 8: Insert Admin navigation items
INSERT INTO team_navigation (team_id, label, icon, url, "order", is_global)
SELECT
  t.id,
  nav.label,
  nav.icon,
  nav.url,
  nav."order",
  nav.is_global
FROM teams t
CROSS JOIN (VALUES
  ('Sales Dashboard', 'ChartLineData01Icon', '/admin/sales/dashboard', 1, false),
  ('All Leads', 'UserAdd01Icon', '/admin/leads', 2, false),
  ('Team Performance', 'Analytics01Icon', '/admin/sales/performance', 3, false),
  ('Lead Assignments', 'UserMultiple02Icon', '/admin/sales/assignments', 4, false),
  ('Sales Settings', 'Settings01Icon', '/admin/sales/settings', 5, false)
) AS nav(label, icon, url, "order", is_global)
WHERE t.code = 'admin';

-- Step 9: Update any existing user_teams entries to use the new sales team
-- and update roles appropriately (executive role for sales users)
-- Note: This preserves existing user assignments but they should be reviewed manually

-- Step 10: Ensure all sales team users are in the sales team
-- (This is a no-op if user_teams entries already exist)

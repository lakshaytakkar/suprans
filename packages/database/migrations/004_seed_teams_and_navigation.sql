-- Seed initial teams
INSERT INTO teams (code, name, description, type, icon, color, "order", is_active) VALUES
  ('travel-sales', 'Travel - Sales', 'Sales team for Travel vertical', 'vertical-department', 'ChartIcon', '#3b82f6', 1, true),
  ('travel-operations', 'Travel - Operations', 'Operations team for Travel vertical', 'vertical-department', 'Settings01Icon', '#10b981', 2, true),
  ('hr-team', 'HR Team', 'Human Resources team', 'department', 'UserMultiple02Icon', '#8b5cf6', 3, true),
  ('recruitment-team', 'Recruitment Team', 'Recruitment and hiring team', 'department', 'UserAdd01Icon', '#f59e0b', 4, true),
  ('superadmin', 'Superadmin', 'Superadmin access to all features', 'admin', 'Shield01Icon', '#ef4444', 0, true),
  ('accounting', 'Accounting', 'Accounting and finance team', 'department', 'Wallet01Icon', '#06b6d4', 5, true)
ON CONFLICT (code) DO NOTHING;

-- Seed navigation for Travel - Sales team
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
  ('Dashboard', 'Home01Icon', '/travel/sales/dashboard', 1, false),
  ('Leads', 'UserAdd01Icon', '/travel/sales/leads', 2, false),
  ('Clients', 'UserMultiple02Icon', '/travel/sales/clients', 3, false),
  ('Deals', 'MoneyBag02Icon', '/travel/sales/deals', 4, false),
  ('Pipeline', 'Rocket01Icon', '/travel/sales/pipeline', 5, false),
  ('Quotations', 'File02Icon', '/travel/sales/quotations', 6, false)
) AS nav(label, icon, url, "order", is_global)
WHERE t.code = 'travel-sales'
ON CONFLICT DO NOTHING;

-- Seed navigation for Travel - Operations team
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
  ('Dashboard', 'Home01Icon', '/travel/operations/dashboard', 1, false),
  ('Bookings', 'Calendar01Icon', '/travel/operations/bookings', 2, false),
  ('Clients', 'UserMultiple02Icon', '/travel/operations/clients', 3, false),
  ('Operations Dashboard', 'ChartLineData01Icon', '/travel/operations/overview', 4, false),
  ('Reports', 'Analytics01Icon', '/travel/operations/reports', 5, false)
) AS nav(label, icon, url, "order", is_global)
WHERE t.code = 'travel-operations'
ON CONFLICT DO NOTHING;

-- Seed navigation for HR Team
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
  ('Dashboard', 'Home01Icon', '/hr/dashboard', 1, false),
  ('Employees', 'UserMultiple02Icon', '/hr/employees', 2, false),
  ('Interviews', 'Calendar01Icon', '/hr/interviews/schedule', 3, false),
  ('Directory', 'UserIcon', '/hr/directory', 4, false)
) AS nav(label, icon, url, "order", is_global)
WHERE t.code = 'hr-team'
ON CONFLICT DO NOTHING;

-- Seed navigation for Recruitment Team
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
  ('Dashboard', 'Home01Icon', '/hr/recruitment/dashboard', 1, false),
  ('Portals', 'GlobeIcon', '/hr/recruitment/portals', 2, false),
  ('Candidates', 'UserAdd01Icon', '/hr/recruitment/candidates', 3, false),
  ('Roles', 'BriefcaseIcon', '/hr/recruitment/roles', 4, false),
  ('Listings', 'File01Icon', '/hr/recruitment/listings', 5, false)
) AS nav(label, icon, url, "order", is_global)
WHERE t.code = 'recruitment-team'
ON CONFLICT DO NOTHING;

-- Seed navigation for Superadmin team
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
  ('Dashboard', 'Home01Icon', '/admin/dashboard', 1, false),
  ('Users', 'UserMultiple02Icon', '/admin/users', 2, false),
  ('Teams Management', 'Settings01Icon', '/admin/teams', 3, false),
  ('Permissions', 'SecurityLockIcon', '/admin/permissions', 4, false),
  ('Settings', 'Settings01Icon', '/admin/settings', 5, false),
  ('All Leads', 'UserAdd01Icon', '/admin/leads', 6, false),
  ('All Clients', 'UserMultiple02Icon', '/admin/clients', 7, false)
) AS nav(label, icon, url, "order", is_global)
WHERE t.code = 'superadmin'
ON CONFLICT DO NOTHING;

-- Seed navigation for Accounting team
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
  ('Dashboard', 'Home01Icon', '/accounting/dashboard', 1, false),
  ('Overview', 'Wallet01Icon', '/accounting/overview', 2, false),
  ('Expenses', 'File01Icon', '/accounting/expenses', 3, false),
  ('Reports', 'Analytics01Icon', '/accounting/reports', 4, false),
  ('Budgets', 'ChartLineData01Icon', '/accounting/budgets', 5, false)
) AS nav(label, icon, url, "order", is_global)
WHERE t.code = 'accounting'
ON CONFLICT DO NOTHING;


"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Sidebar, type MenuItem } from "./Sidebar"
import { Topbar } from "./Topbar"
import type { UserContext } from "@suprans/types"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface SidebarConfigBuilder {
  buildSidebarConfig: (user: UserContext | null) => MenuItem[]
  getSectionLabel: (section: string) => string
  getSectionOrder: () => string[]
}

interface DashboardLayoutProps {
  children: React.ReactNode
  breadcrumbs?: BreadcrumbItem[]
  user: UserContext | null
  configBuilder?: SidebarConfigBuilder
}

function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }]

  const pageNames: Record<string, string> = {
    // Dashboard
    internal: "Dashboard",
    // My Workspace pages
    "my-training": "Training",
    "my-calls": "Calls",
    "my-meeting-notes": "My Meeting Notes",
    "my-daily-reporting": "My Daily Reporting",
    "my-attendance": "Attendance",
    "my-documents": "Documents",
    "my-notes": "Notes",
    "my-calendar": "Calendar",
    "my-goals": "Goals",
    "my-performance-reviews": "Performance Reviews",
    "my-leave-requests": "Leave Requests",
    "my-tasks": "My Tasks",
    "knowledge-base": "Knowledge Base",
    "my-resources": "Resources",
    // Manager pages
    manager: "Manager",
    "manager/tasks": "Team Tasks",
    "manager/projects": "Team Projects",
    "manager/attendance": "Team Attendance",
    "manager/performance": "Team Performance",
    // Admin pages
    admin: "Admin",
    "admin/users": "User Management",
    "admin/settings": "System Settings",
    "admin/permissions": "Permissions",
    "admin/analytics": "Analytics",
    // Department pages
    departments: "Departments",
    "departments/sales": "Sales Dashboard",
    "departments/hr": "HR Dashboard",
    "departments/recruitment": "Recruitment Dashboard",
    // Sales pages
    sales: "Sales",
    "sales/dashboard": "Sales Dashboard",
    "sales/my-leads": "My Leads",
    "sales/my-pipeline": "My Pipeline",
    "sales/my-deals": "My Deals",
    "sales/my-quotations": "My Quotations",
    "sales/my-automation-logs": "My Automation Logs",
    "sales/leads": "Leads",
    "sales/pipeline": "Pipeline",
    "sales/deals": "Deals",
    "sales/quotations": "Quotations",
    "sales/automation-logs": "Automation Logs",
    // HR pages
    hr: "HR",
    "hr/dashboard": "HR Dashboard",
    "hr/employees": "Employees",
    "hr/onboarding": "Onboarding",
    "hr/templates": "Templates",
    "hr/teams": "Teams",
    "hr/roles": "Roles",
    // Recruitment pages
    recruitment: "Recruitment",
    "recruitment/my-candidates": "My Candidates",
    "recruitment/my-job-postings": "My Job Postings",
    "recruitment/candidates": "Candidates",
    "recruitment/applications": "Applications",
    "recruitment/interviews": "Interviews",
    "recruitment/job-portals": "Job Portals",
    "recruitment/job-roles": "Job Roles",
    "recruitment/job-listings": "Job Listings",
    "recruitment/job-postings": "Job Postings",
    "recruitment/evaluations": "Evaluations",
    // Finance pages
    finance: "Finance",
    "finance/dashboard": "Finance Dashboard",
    "finance/sales-orders": "Sales Orders",
    "finance/invoices": "Invoices",
    "finance/expenses": "Expenses",
    "finance/payroll": "Payroll",
    "finance/transactions": "Transactions",
    "finance/vendors": "Vendors",
    "finance/taxes": "Taxes",
    "finance/reports": "Financial Reports",
    // Marketing pages
    marketing: "Marketing",
    "marketing/dashboard": "Marketing Dashboard",
    "marketing/email-templates": "Email Templates",
    "marketing/whatsapp-templates": "WhatsApp Templates",
    "marketing/email-automations": "Email Automations",
    "marketing/whatsapp-automations": "WhatsApp Automations",
    "marketing/drips": "Drips",
    "marketing/campaigns": "Campaigns",
    "marketing/automation-logs": "Automation Logs",
    "marketing/content-editor": "Content Editor",
    "marketing/pages": "Page Management",
    // Analytics pages
    analytics: "Analytics",
    "analytics/dashboard": "Analytics Dashboard",
    "analytics/website-traffic": "Website Traffic",
    "analytics/conversions": "Conversion Tracking",
    "analytics/client-reports": "Client Reports",
    "analytics/domains": "Domains",
    // R&D pages
    rnd: "Research & Development",
    "rnd/research-docs": "Research Docs",
    "rnd/mindmaps": "Mindmaps",
    "rnd/financial-planning": "Financial Planning",
    "rnd/new-verticals": "New Verticals",
    "rnd/suggestions": "Suggestions",
    "rnd/strategic-planning": "Strategic Planning",
    "rnd/market-research": "Market Research",
    // Development pages
    development: "Development",
    "development/projects": "Projects",
    "development/tasks": "Tasks",
    "development/design-system/foundations": "Foundations",
    "development/design-system/components": "Components",
    "development/stack": "Stack",
    "development/prompts": "Prompts",
    "development/ui-libraries": "UI Libraries",
    "development/external-apps": "External Apps",
    "development/docs": "Docs",
    "development/credentials": "Credentials",
    // CEO pages
    ceo: "CEO",
    "ceo/dashboard": "Executive Dashboard",
    "ceo/sales-summary": "Sales Summary",
    "ceo/hr-summary": "HR Summary",
    "ceo/recruitment-summary": "Recruitment Summary",
    "ceo/operations-summary": "Operations Summary",
    "ceo/explorers/projects": "All Projects",
    "ceo/explorers/tasks": "All Tasks",
    "ceo/explorers/calls": "All Calls",
    "ceo/explorers/employees": "All Employees",
    "ceo/explorers/deals": "All Deals",
    "ceo/team-management": "Team Management",
    "ceo/department-oversight": "Department Oversight",
    "ceo/performance-analytics": "Performance Analytics",
    "ceo/reports": "Reports & Insights",
    // General pages
    dashboard: "Main Dashboard",
    explore: "Explore",
  }

  // Filter out "internal" segment and work with remaining segments
  const internalIndex = segments.indexOf("internal")
  if (internalIndex === -1) {
    // Not an internal route
    if (segments.length === 0) {
      breadcrumbs.push({ label: "Dashboard" })
    } else {
      breadcrumbs.push({ label: "Dashboard", href: "/" })
      segments.forEach((segment, index) => {
        const currentPath = segments.slice(0, index + 1).join("/")
        const label = pageNames[currentPath] || pageNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
        const href = "/" + segments.slice(0, index + 1).join("/")
        breadcrumbs.push({
          label,
          href: index === segments.length - 1 ? undefined : href,
        })
      })
    }
    return breadcrumbs
  }

  // Handle internal routes
  const remainingSegments = segments.slice(internalIndex + 1)
  
  if (remainingSegments.length === 0) {
    breadcrumbs.push({ label: "Dashboard" })
  } else {
    breadcrumbs.push({ label: "Dashboard", href: "/internal" })
    
    // Handle nested routes (e.g., sales/leads, admin/users)
    const fullPath = remainingSegments.join("/")
    const directMatch = pageNames[fullPath]
    
    if (directMatch) {
      // Direct match for nested routes - show parent and child
      if (remainingSegments.length > 1) {
        const parentSegment = remainingSegments[0]
        const parentLabel = pageNames[parentSegment] || parentSegment.charAt(0).toUpperCase() + parentSegment.slice(1)
        breadcrumbs.push({ 
          label: parentLabel, 
          href: `/internal/${parentSegment}` 
        })
      }
      breadcrumbs.push({ label: directMatch })
    } else {
      // Handle segment by segment
      remainingSegments.forEach((segment, index) => {
        const currentPath = remainingSegments.slice(0, index + 1).join("/")
        const label = pageNames[currentPath] || pageNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
        const href = "/internal/" + remainingSegments.slice(0, index + 1).join("/")
        breadcrumbs.push({
          label,
          href: index === remainingSegments.length - 1 ? undefined : href,
        })
      })
    }
  }

  return breadcrumbs
}

export function DashboardLayout({ 
  children, 
  breadcrumbs, 
  user,
  configBuilder
}: DashboardLayoutProps) {
  const pathname = usePathname()
  const computedBreadcrumbs = breadcrumbs || getBreadcrumbs(pathname)

  return (
    <div className="min-h-screen bg-white">
      <Sidebar 
        user={user}
        configBuilder={configBuilder}
        isFilterHeaderCollapsed={true}
      />
      <div className="ml-[272px] pt-5 pr-5 pb-5">
        <div className="bg-white border border-border rounded-[14px] min-h-[calc(100vh-93px)] flex flex-col px-5 pb-5 pt-0">
          <Topbar breadcrumbs={computedBreadcrumbs} />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  )
}


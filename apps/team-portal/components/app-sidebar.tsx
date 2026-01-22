"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Calendar,
  Settings,
  Users,
  ChevronDown,
  ChevronRight,
  CheckSquare,
  Shield,
  LineChart,
  BarChart3,
  UserPlus,
  Rocket,
  MessageSquare,
  ArrowRightLeft,
  BookOpen,
  Video,
  FileText,
  type LucideIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { UserMenu } from "@/components/shared/user-menu";
import { useAuth } from "@/lib/contexts/auth-context";
import { cn } from "@/lib/utils";

// Sales navigation items (visible to all users)
const salesNavigationItems: Array<{
  label: string;
  url: string;
  icon: LucideIcon;
}> = [
  { label: "Dashboard", url: "/", icon: LayoutDashboard },
  { label: "My Leads", url: "/leads", icon: UserPlus },
  { label: "Pipeline", url: "/pipeline", icon: Rocket },
  { label: "Tasks", url: "/tasks", icon: CheckSquare },
  { label: "Follow-ups", url: "/follow-ups", icon: Calendar },
  { label: "Performance", url: "/performance", icon: BarChart3 },
];

// Resources navigation items
const resourcesNavigationItems: Array<{
  label: string;
  url: string;
  icon: LucideIcon;
}> = [
  { label: "Templates", url: "/resources/templates", icon: FileText },
  { label: "Knowledge Base", url: "/knowledge/services", icon: BookOpen },
  { label: "Training", url: "/training/lms", icon: Video },
];

// Admin navigation items (visible to superadmin role only)
const adminNavigationItems: Array<{
  label: string;
  url: string;
  icon: LucideIcon;
}> = [
  { label: "Admin Dashboard", url: "/admin", icon: LineChart },
  { label: "All Leads", url: "/admin/leads", icon: UserPlus },
  { label: "Team", url: "/admin/team", icon: Users },
  { label: "Assignments", url: "/admin/assignments", icon: Users },
  { label: "Reports", url: "/admin/reports", icon: BarChart3 },
  { label: "Settings", url: "/admin/settings", icon: Settings },
];

interface CollapsibleNavGroupProps {
  label: string;
  icon?: LucideIcon;
  items: Array<{ label: string; url: string; icon: LucideIcon }>;
  isActive: (url: string) => boolean;
  defaultOpen?: boolean;
}

function CollapsibleNavGroup({
  label,
  icon,
  items,
  isActive,
  defaultOpen = false,
}: CollapsibleNavGroupProps) {
  const hasActiveItem = items.some((item) => isActive(item.url));
  const [isOpen, setIsOpen] = useState(defaultOpen || hasActiveItem);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <SidebarGroup className="py-0">
        <CollapsibleTrigger className="w-full">
          <SidebarGroupLabel className="cursor-pointer hover:bg-sidebar-accent/50 rounded-md transition-colors flex items-center justify-between pr-2 w-full">
            <div className="flex items-center gap-2">
              {icon && (() => { const Icon = icon; return <Icon className="h-4 w-4" />; })()}
              <span>{label}</span>
            </div>
            {isOpen ? (
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground transition-transform" />
            )}
          </SidebarGroupLabel>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.label}
                    isActive={isActive(item.url)}
                  >
                    <Link href={item.url}>
                      {(() => { const Icon = item.icon; return <Icon className="h-4 w-4" />; })()}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}

const VIEW_MODE_KEY = "team-portal-view-mode";

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const isSuperadmin = user?.role === "superadmin";

  // View mode: "admin" (default for superadmin) or "employee"
  const [viewMode, setViewMode] = useState<"admin" | "employee">("admin");

  // Load view mode from localStorage on mount
  useEffect(() => {
    if (isSuperadmin) {
      const savedMode = localStorage.getItem(VIEW_MODE_KEY);
      if (savedMode === "employee" || savedMode === "admin") {
        setViewMode(savedMode);
      }
    }
  }, [isSuperadmin]);

  // Toggle view mode
  const toggleViewMode = () => {
    const newMode = viewMode === "admin" ? "employee" : "admin";
    setViewMode(newMode);
    localStorage.setItem(VIEW_MODE_KEY, newMode);
  };

  // Determine if we should show employee/sales view
  const showEmployeeView = !isSuperadmin || viewMode === "employee";

  // Collect all URLs for active state detection
  const allUrls = [
    ...salesNavigationItems.map((item) => item.url),
    ...resourcesNavigationItems.map((item) => item.url),
    ...adminNavigationItems.map((item) => item.url),
    "/chat",
    "/profile",
  ];

  const isActive = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }

    const matches = pathname === url || pathname.startsWith(url + "/");
    if (!matches) {
      return false;
    }

    // Find the most specific (longest) matching URL
    const matchingUrls = allUrls.filter((u) => {
      if (u === "/") return false;
      return pathname === u || pathname.startsWith(u + "/");
    });

    if (matchingUrls.length === 0) {
      return false;
    }

    const mostSpecificUrl = matchingUrls.reduce((longest, current) =>
      current.length > longest.length ? current : longest
    );

    return url === mostSpecificUrl;
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex flex-col gap-3 px-2 py-2">
              {isSuperadmin ? (
                <button
                  onClick={toggleViewMode}
                  className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity group/toggle"
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg text-primary-foreground transition-colors",
                      viewMode === "admin" ? "bg-primary" : "bg-blue-600"
                    )}
                  >
                    {viewMode === "admin" ? (
                      <Shield className="h-[18px] w-[18px]" />
                    ) : (
                      <LineChart className="h-[18px] w-[18px]" />
                    )}
                  </div>
                  <div className="flex flex-col items-start group-data-[collapsible=icon]:hidden">
                    <span className="font-semibold text-sm">Team Portal</span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <ArrowRightLeft className="h-2.5 w-2.5" />
                      {viewMode === "admin" ? "Admin View" : "Employee View"}
                    </span>
                  </div>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <LineChart className="h-[18px] w-[18px]" />
                  </div>
                  <span className="font-semibold group-data-[collapsible=icon]:hidden">
                    Team Portal
                  </span>
                </div>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Sales Navigation */}
        {showEmployeeView && (
          <CollapsibleNavGroup
            label="Sales"
            icon={LineChart}
            items={salesNavigationItems}
            isActive={isActive}
            defaultOpen={true}
          />
        )}

        {/* Admin Navigation (superadmin role only, in admin view) */}
        {isSuperadmin && viewMode === "admin" && (
          <CollapsibleNavGroup
            label="Admin"
            icon={Shield}
            items={adminNavigationItems}
            isActive={isActive}
            defaultOpen={true}
          />
        )}

        {/* Resources Navigation */}
        <CollapsibleNavGroup
          label="Resources"
          icon={BookOpen}
          items={resourcesNavigationItems}
          isActive={isActive}
          defaultOpen={false}
        />

        {/* Chat Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Chat"
                  isActive={isActive("/chat")}
                >
                  <Link href="/chat">
                    <MessageSquare className="h-4 w-4" />
                    <span>Chat</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserMenu />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Phone,
  KanbanSquare,
  BarChart3,
  Settings,
  Puzzle,
  Headphones,
  Search,
  ChevronLeft,
  Zap,
  Award,
  ChevronRight,
  Store,
  CreditCard,
  Moon,
  LogOut,
  User,
  MoreHorizontal,
  MessageSquare,
  BookOpen,
  GraduationCap,
  Video,
  FileText,
  UserPlus,
  CheckSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useStore } from "@/lib/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [location] = useLocation();
  const { currentUser } = useStore();
  const role = currentUser.role;

  const salesGroups = [
    {
      label: "Main",
      items: [
        { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { href: "/chat", icon: MessageSquare, label: "Chat" },
        { href: "/leads", icon: Users, label: "My Leads" },
        { href: "/pipeline", icon: KanbanSquare, label: "Pipeline" },
        { href: "/tasks", icon: CheckSquare, label: "Tasks" },
        { href: "/follow-ups", icon: Phone, label: "Follow-ups" },
        { href: "/performance", icon: BarChart3, label: "My Performance" },
      ]
    },
    {
      label: "Toolkit",
      items: [
        { href: "/resources/templates", icon: MessageSquare, label: "Templates & Scripts" },
      ]
    },
    {
      label: "Knowledge Base",
      items: [
        { href: "/knowledge/services", icon: BookOpen, label: "Services & FAQs" },
      ]
    },
    {
      label: "Training",
      items: [
        { href: "/training/lms", icon: GraduationCap, label: "Training Center" },
        { href: "/training/recordings", icon: Video, label: "Call Recordings" },
      ]
    }
  ];

  const adminGroups = [
    {
      label: "Overview",
      items: [
        { href: "/dashboard", icon: LayoutDashboard, label: "Admin Overview" },
        { href: "/admin/reports", icon: FileText, label: "Reports" },
        { href: "/performance", icon: BarChart3, label: "Team Performance" },
      ]
    },
    {
      label: "Sales Management",
      items: [
        { href: "/leads", icon: Users, label: "All Leads" },
        { href: "/pipeline", icon: KanbanSquare, label: "Pipeline Overview" },
        { href: "/follow-ups", icon: Phone, label: "All Follow-ups" },
        { href: "/admin/team", icon: UserPlus, label: "Team Management" },
        { href: "/admin/assignments", icon: KanbanSquare, label: "Assignments" },
      ]
    },
    {
      label: "Content Management",
      items: [
        { href: "/admin/templates", icon: MessageSquare, label: "Manage Templates" },
        { href: "/admin/services", icon: BookOpen, label: "Manage Knowledge" },
        { href: "/admin/training", icon: GraduationCap, label: "Manage Training" },
      ]
    },
    {
      label: "System",
      items: [
        { href: "/admin/settings", icon: Settings, label: "Settings" },
      ]
    }
  ];

  const groups = role === 'superadmin' ? adminGroups : salesGroups;

  const otherItems = [
    { name: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <div className={cn("flex h-screen w-[280px] flex-col border-r bg-sidebar p-6 shrink-0 fixed left-0 top-0 overflow-y-auto z-50 no-scrollbar", className)}>
      {/* Logo Section */}
      <div className="flex items-center gap-3 mb-10 pl-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
          <Zap className="h-5 w-5 fill-current" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-foreground leading-none">Suprans</span>
          <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase mt-0.5">
            {role === 'superadmin' ? 'ADMIN CONSOLE' : 'TEAM SUPRANS'}
          </span>
        </div>
      </div>

      {/* Main Menu */}
      <div className="space-y-8 flex-1">
        {groups.map((group, i) => (
          <div key={i} className="space-y-2">
            <h3 className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
              {group.label}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
                return (
                  <Link key={item.label} href={item.href}>
                    <div
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all relative cursor-pointer",
                        isActive
                          ? "text-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      {isActive && (
                        <div className="absolute left-0 h-6 w-1 rounded-r-full bg-primary" />
                      )}
                      <item.icon className={cn("h-5 w-5 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                      {item.label}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Other Menu - Only show for Non-Admins since Admins have it in System group */}
        {role !== 'superadmin' && (
          <div className="space-y-2">
            <h3 className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
              Others
            </h3>
            <div className="space-y-1">
              {otherItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <div className="group flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 cursor-pointer transition-all">
                    <item.icon className="h-5 w-5 group-hover:text-foreground transition-colors" />
                    {item.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

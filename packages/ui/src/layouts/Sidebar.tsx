"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { cn } from "@suprans/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/tooltip"
import type { UserContext } from "@suprans/types"

export interface MenuItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  section?: string
  subSection?: string
  description?: string
}

interface SidebarConfigBuilder {
  buildSidebarConfig: (user: UserContext | null) => MenuItem[]
  getSectionLabel: (section: string) => string
  getSectionOrder: () => string[]
}

interface SidebarProps {
  user: UserContext | null
  configBuilder?: SidebarConfigBuilder
  isFilterHeaderCollapsed?: boolean
}

export function Sidebar({ 
  user, 
  configBuilder,
  isFilterHeaderCollapsed = false 
}: SidebarProps) {
  const pathname = usePathname()
  const [collapsedSections, setCollapsedSections] = React.useState<Set<string>>(new Set())

  // Build menu items internally
  const menuItems = React.useMemo(() => {
    if (!configBuilder) return []
    return configBuilder.buildSidebarConfig(user)
  }, [configBuilder, user])

  const getSectionLabel = configBuilder?.getSectionLabel || (() => "")
  const getSectionOrder = configBuilder?.getSectionOrder || (() => [])

  const isActive = (href: string) => {
    if (href === "/internal") {
      return pathname === "/internal"
    }
    return pathname.startsWith(href)
  }

  const toggleSection = (section: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev)
      if (next.has(section)) {
        next.delete(section)
      } else {
        next.add(section)
      }
      return next
    })
  }

  const sectionOrder = getSectionOrder()

  // Get sections that have items
  const sections = sectionOrder.filter(section => 
    menuItems.some(item => item.section === section)
  )

  // Get items for a section
  const getSectionItems = (section: string): MenuItem[] => {
    return menuItems.filter(item => item.section === section)
  }

  return (
    <TooltipProvider delayDuration={500}>
      <div className={`fixed left-0 ${isFilterHeaderCollapsed ? 'top-0' : 'top-[48px]'} bottom-0 w-[272px] bg-card flex flex-col py-5 z-30 transition-all duration-300`}>
        {/* Header */}
        <div className="flex flex-col h-16 items-start justify-center px-2 shrink-0 w-full">
          <div className="flex h-14 items-center px-3 w-full">
            <div className="flex flex-1 gap-2.5 items-center">
              <div className="relative shrink-0 size-8">
                <div className="absolute inset-0 bg-primary rounded" />
              </div>
              <p className="font-semibold leading-[1.35] text-foreground text-xl">Suprans Foundation</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="flex flex-1 flex-col gap-4 items-start px-4 py-0 w-full overflow-y-auto">
          {sections.map((section) => {
            const sectionItems = getSectionItems(section)
            const sectionLabel = getSectionLabel(section)
            const isCollapsed = collapsedSections.has(section)
            const hasItems = sectionItems.length > 0

            if (!hasItems) return null

            // Home, Dashboard, and Categories sections are always expanded and not collapsible
            const isDashboard = section === "dashboard"
            const isHome = section === "home"
            const isCategories = section === "categories"

            return (
              <div key={section} className="flex flex-col gap-1 items-start w-full">
                {sectionLabel && (
                  <button
                    type="button"
                    onClick={() => !isDashboard && !isCategories && toggleSection(section)}
                    className={cn(
                      "flex items-center justify-between px-3 py-1.5 w-full rounded-md transition-colors",
                      !isDashboard && !isCategories && "hover:bg-muted/50 cursor-pointer"
                    )}
                  >
                    <p className="flex-1 font-semibold text-foreground text-sm tracking-wider uppercase text-left">
                      {getSectionLabel(section)}
                    </p>
                    {!isDashboard && !isCategories && (
                      isCollapsed ? (
                        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                      ) : (
                        <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
                      )
                    )}
                  </button>
                )}
                
                {(!isCollapsed || isDashboard || isCategories) && (
                  <div className="flex flex-col items-start w-full gap-0.5">
                    {sectionItems.map((item) => {
                      const active = isActive(item.href)
                      return (
                        <Tooltip key={item.href}>
                          <TooltipTrigger asChild>
                            <Link
                              href={item.href}
                              className={cn(
                                "relative flex gap-2 h-10 items-center px-3 py-2 rounded-lg w-[240px] transition-colors",
                                active
                                  ? "bg-muted text-foreground"
                                  : "bg-card text-muted-foreground hover:bg-muted"
                              )}
                            >
                              <item.icon
                                className={cn(
                                  "shrink-0 size-4",
                                  active ? "text-foreground" : "text-muted-foreground"
                                )}
                              />
                              <p className="flex-1 font-medium text-base tracking-[0.32px]">{item.label}</p>
                              {active && (
                                <div className="absolute bg-primary h-6 left-[-16px] rounded-br-lg rounded-tr-lg top-1/2 -translate-y-1/2 w-1" />
                              )}
                            </Link>
                          </TooltipTrigger>
                          {item.description && (
                            <TooltipContent 
                              side="right" 
                              sideOffset={8}
                              className="animate-in fade-in-0 zoom-in-95 duration-200"
                            >
                              <p className="text-sm">{item.description}</p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </TooltipProvider>
  )
}

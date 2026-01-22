"use client"

import * as React from "react"
import { cn } from "@suprans/utils"

interface DetailTab {
  id: string
  label: string
  icon?: React.ReactNode
  badge?: number | string
}

export interface DetailTabsProps {
  tabs: DetailTab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
}

export function DetailTabs({ tabs, activeTab, onTabChange, className }: DetailTabsProps) {
  return (
    <div className={cn("border-b border-border", className)}>
      <nav className="flex gap-1 -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            )}
          >
            {tab.icon && <span className="h-4 w-4">{tab.icon}</span>}
            {tab.label}
            {tab.badge !== undefined && (
              <span
                className={cn(
                  "px-1.5 py-0.5 text-xs rounded-full",
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  )
}

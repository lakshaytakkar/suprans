"use client"

import * as React from "react"
import { cn } from "@suprans/utils"

interface FilterHeaderProps {
  title?: string
  children?: React.ReactNode
  className?: string
}

export function FilterHeader({ title, children, className }: FilterHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      {title && <h2 className="text-lg font-semibold">{title}</h2>}
      {children}
    </div>
  )
}


"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../button"
import { cn } from "@suprans/utils"

interface BreadcrumbItem {
  label: string
  href?: string
}

export interface DetailPageHeaderProps {
  breadcrumbs?: BreadcrumbItem[]
  backHref?: string
  backLabel?: string
  onPrevious?: () => void
  onNext?: () => void
  hasPrevious?: boolean
  hasNext?: boolean
  className?: string
  children?: React.ReactNode
}

export function DetailPageHeader({
  breadcrumbs = [],
  backHref,
  backLabel = "Back",
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
  className,
  children,
}: DetailPageHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between gap-4 mb-5", className)}>
      <div className="flex items-center gap-3">
        {backHref && (
          <Button variant="ghost" size="icon" asChild className="h-9 w-9">
            <Link href={backHref}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">{backLabel}</span>
            </Link>
          </Button>
        )}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="text-muted-foreground">/</span>}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
      </div>

      <div className="flex items-center gap-2">
        {children}
        {(onPrevious || onNext) && (
          <div className="flex items-center gap-1 border-l border-border pl-3 ml-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onPrevious}
              disabled={!hasPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onNext}
              disabled={!hasNext}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

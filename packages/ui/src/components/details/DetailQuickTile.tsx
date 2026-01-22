"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@suprans/utils"
import { Badge } from "../badge"

interface MetadataRow {
  label: string
  value: React.ReactNode
}

export interface DetailQuickTileProps {
  thumbnail?: string
  thumbnailAlt?: string
  title: string
  subtitle?: string
  metadata?: MetadataRow[]
  status?: {
    label: string
    variant?: "default" | "secondary" | "destructive" | "outline"
  }
  className?: string
  children?: React.ReactNode
}

export function DetailQuickTile({
  thumbnail,
  thumbnailAlt = "Thumbnail",
  title,
  subtitle,
  metadata = [],
  status,
  className,
  children,
}: DetailQuickTileProps) {
  return (
    <div
      className={cn(
        "bg-background border border-border rounded-[14px] p-5",
        className
      )}
    >
      <div className="flex gap-4">
        {thumbnail && (
          <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-muted">
            <Image
              src={thumbnail}
              alt={thumbnailAlt}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-foreground truncate">
                {title}
              </h2>
              {subtitle && (
                <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
              )}
            </div>
            {status && (
              <Badge variant={status.variant || "default"} className="shrink-0">
                {status.label}
              </Badge>
            )}
          </div>

          {metadata.length > 0 && (
            <div className="mt-3 space-y-1.5">
              {metadata.map((row, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground shrink-0">{row.label}:</span>
                  <span className="text-foreground truncate">{row.value}</span>
                </div>
              ))}
            </div>
          )}

          {children && <div className="mt-4">{children}</div>}
        </div>
      </div>
    </div>
  )
}

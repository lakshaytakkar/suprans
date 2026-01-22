"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Construction } from "lucide-react"

interface PlaceholderPageProps {
  title: string
  description: string
  icon?: React.ComponentType<{ className?: string }>
}

export function PlaceholderPage({
  title,
  description,
  icon: Icon = Construction,
}: PlaceholderPageProps) {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-primary/85 text-primary-foreground rounded-md px-4 py-3 flex-shrink-0 w-full">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-white">
              {title}
            </h1>
            <p className="text-xs text-white/90 mt-0.5">{description}</p>
          </div>
        </div>
      </div>

      {/* Coming Soon Card */}
      <Card className="border border-border rounded-[14px]">
        <CardContent className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="bg-primary/10 rounded-full p-4 mb-4">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Coming Soon
          </h2>
          <p className="text-muted-foreground max-w-md">
            This feature is currently under development. Check back soon for updates.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

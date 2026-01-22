"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/card"
import { Button } from "../components/button"
import { X } from "lucide-react"
import { cn } from "@suprans/utils"

interface FilterPanelProps {
  title?: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export function FilterPanel({ title = "Filters", isOpen, onClose, children, className }: FilterPanelProps) {
  if (!isOpen) return null

  return (
    <Card className={cn("mb-4", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}


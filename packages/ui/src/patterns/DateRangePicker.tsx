"use client"

import * as React from "react"
import { Button } from "../components/button"
import { Calendar } from "lucide-react"
import { Input } from "../components/input"
import { Label } from "../components/label"

interface DateRangePickerProps {
  startDate?: Date
  endDate?: Date
  onStartDateChange?: (date: Date | undefined) => void
  onEndDateChange?: (date: Date | undefined) => void
  className?: string
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  className,
}: DateRangePickerProps) {
  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Start Date</Label>
          <Input
            type="date"
            value={startDate?.toISOString().split('T')[0] || ''}
            onChange={(e) => onStartDateChange?.(e.target.value ? new Date(e.target.value) : undefined)}
          />
        </div>
        <div className="space-y-2">
          <Label>End Date</Label>
          <Input
            type="date"
            value={endDate?.toISOString().split('T')[0] || ''}
            onChange={(e) => onEndDateChange?.(e.target.value ? new Date(e.target.value) : undefined)}
          />
        </div>
      </div>
    </div>
  )
}


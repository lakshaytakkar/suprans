"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog"
import { Button } from "./button"
import { AlertTriangle, Trash2, LogOut, AlertCircle } from "lucide-react"
import { cn } from "@suprans/utils"

type ConfirmationType = "destructive" | "warning" | "info" | "logout"

export interface ConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void | Promise<void>
  type?: ConfirmationType
  isLoading?: boolean
}

const typeConfig: Record<ConfirmationType, {
  icon: React.ComponentType<{ className?: string }>
  iconClassName: string
  confirmVariant: "default" | "destructive" | "outline" | "secondary"
}> = {
  destructive: {
    icon: Trash2,
    iconClassName: "text-destructive",
    confirmVariant: "destructive",
  },
  warning: {
    icon: AlertTriangle,
    iconClassName: "text-yellow-600",
    confirmVariant: "default",
  },
  info: {
    icon: AlertCircle,
    iconClassName: "text-primary",
    confirmVariant: "default",
  },
  logout: {
    icon: LogOut,
    iconClassName: "text-destructive",
    confirmVariant: "destructive",
  },
}

export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  type = "destructive",
  isLoading = false,
}: ConfirmationDialogProps) {
  const config = typeConfig[type]
  const Icon = config.icon

  const handleConfirm = async () => {
    await onConfirm()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted",
              type === "destructive" && "bg-destructive/10",
              type === "logout" && "bg-destructive/10",
              type === "warning" && "bg-yellow-100",
              type === "info" && "bg-primary/10"
            )}>
              <Icon className={cn("h-5 w-5", config.iconClassName)} />
            </div>
            <div className="space-y-1">
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={config.confirmVariant}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

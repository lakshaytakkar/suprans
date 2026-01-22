"use client"

import { useContext, useEffect, useState } from "react"
import { createClient } from "@suprans/database/client"
import type { UserContext } from "@suprans/types"
import { AuthContext } from "./provider"

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function useUser(): UserContext | null {
  const { user } = useAuth()
  return user
}

export function useIsAuthenticated(): boolean {
  const { isAuthenticated } = useAuth()
  return isAuthenticated
}

export function useRequireAuth(redirectTo = "/sign-in") {
  const { isAuthenticated, isLoading } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isLoading && !isAuthenticated && mounted) {
      window.location.href = redirectTo
    }
  }, [isAuthenticated, isLoading, redirectTo, mounted])

  return { isAuthenticated, isLoading }
}

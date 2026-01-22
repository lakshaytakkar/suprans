"use client"

import { createContext, useEffect, useState, useCallback } from "react"
import { createClient } from "@suprans/database/client"
import type { UserContext, TenantCode } from "@suprans/types"
import type { AuthContextValue, SignInCredentials, SignUpCredentials } from "../types"

export const AuthContext = createContext<AuthContextValue | null>(null)

interface AuthProviderProps {
  children: React.ReactNode
  tenantCode: TenantCode
}

export function AuthProvider({ children, tenantCode }: AuthProviderProps) {
  const [user, setUser] = useState<UserContext | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const supabase = createClient()

  const fetchUserContext = useCallback(async (userId: string): Promise<UserContext | null> => {
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single()

    if (userError || !userData) return null

    const { data: tenantData } = await supabase
      .from("user_tenants")
      .select("*, tenants(*)")
      .eq("user_id", userId)
      .eq("tenants.code", tenantCode)
      .single()

    return {
      userId: userData.id,
      email: userData.email,
      name: userData.name,
      avatar: userData.avatar_url,
      role: tenantData?.role || "customer",
      tenantId: tenantData?.tenant_id || "",
      tenantCode: tenantCode,
      departmentId: tenantData?.department_id,
      permissions: tenantData?.permissions || [],
    }
  }, [supabase, tenantCode])

  const refreshUser = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) {
      const userContext = await fetchUserContext(session.user.id)
      setUser(userContext)
    } else {
      setUser(null)
    }
    setIsLoading(false)
  }, [supabase, fetchUserContext])

  useEffect(() => {
    refreshUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const userContext = await fetchUserContext(session.user.id)
          setUser(userContext)
        } else {
          setUser(null)
        }
        setIsLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase, fetchUserContext, refreshUser])

  const signIn = async (credentials: SignInCredentials) => {
    const { error } = await supabase.auth.signInWithPassword(credentials)
    if (error) throw error
  }

  const signUp = async (credentials: SignUpCredentials) => {
    const { error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: { name: credentials.name },
      },
    })
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

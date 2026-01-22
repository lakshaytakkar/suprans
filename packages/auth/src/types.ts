export type { UserRole, UserContext, User } from "@suprans/types"

export interface AuthState {
  user: import("@suprans/types").UserContext | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface SignInCredentials {
  email: string
  password: string
}

export interface SignUpCredentials {
  email: string
  password: string
  name: string
}

export interface AuthContextValue extends AuthState {
  signIn: (credentials: SignInCredentials) => Promise<void>
  signUp: (credentials: SignUpCredentials) => Promise<void>
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
}

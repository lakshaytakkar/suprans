"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Avatar, AvatarImage, AvatarFallback } from "../components/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/dialog"
import { Button } from "../components/button"
import { User, LogOut, ChevronDown } from "lucide-react"
import { useUserContext } from "@/lib/providers/UserContextProvider"
import { signOut } from "@/lib/actions/auth"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface TopbarProps {
  breadcrumbs?: BreadcrumbItem[]
}

export function Topbar({ breadcrumbs = [{ label: "Home" }, { label: "Dashboard" }] }: TopbarProps) {
  const router = useRouter()
  const { user, isLoading } = useUserContext()
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false)
  const [isLoggingOut, setIsLoggingOut] = React.useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await signOut()
      router.push("/internal/sign-in")
    } catch (error) {
      console.error('Logout error:', error)
      router.push("/internal/sign-in")
    } finally {
      setIsLoggingOut(false)
      setShowLogoutConfirm(false)
    }
  }

  const userDisplayName = user?.name || 'User'
  const userEmail = user?.email || ''
  const userRole = user?.role || 'employee'

  return (
    <div className="flex-1 h-[72px] flex items-center justify-between px-5 py-4">
      <div className="flex items-center gap-2 text-sm font-medium tracking-[0.28px]">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="text-muted-foreground">/</span>}
            {crumb.href ? (
              <Link href={crumb.href} className="text-muted-foreground hover:text-foreground transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className={index === breadcrumbs.length - 1 ? "text-foreground" : "text-muted-foreground"}>
                {crumb.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="flex gap-2.5 items-center">
        {isLoading ? (
          <div className="h-8 w-20 bg-muted animate-pulse rounded-md" />
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex gap-2 items-center hover:bg-muted rounded-lg px-2 py-1.5 transition-colors focus:outline-none">
                <Avatar className="h-8 w-8 bg-primary/20">
                  <AvatarFallback className="text-primary text-xs font-medium">
                    {userDisplayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start leading-[1.5] text-sm tracking-[0.28px]">
                  <p className="font-semibold text-foreground">{userDisplayName}</p>
                  <p className="font-normal text-muted-foreground capitalize">{userRole}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground ml-1" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium leading-5 tracking-[0.28px]">{userDisplayName}</p>
                  <p className="text-sm leading-5 tracking-[0.28px] text-muted-foreground">{userEmail}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowLogoutConfirm(true)} className="cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/internal/sign-in">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </Link>
        )}
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out? You will need to sign in again to access your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowLogoutConfirm(false)}
              disabled={isLoggingOut}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


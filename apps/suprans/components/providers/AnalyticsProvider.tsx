"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { trackPageView } from "@/lib/utils/analytics"

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // Track page views on route change
    if (pathname) {
      trackPageView(pathname, document.title)
    }
  }, [pathname])

  return <>{children}</>
}


"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { AOSProvider } from "@/providers/AOSProvider"

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isInternalRoute = pathname?.startsWith("/internal")

  if (isInternalRoute) {
    // Internal routes have their own layout
    return <>{children}</>
  }

  // Public routes get Navbar and Footer
  return (
    <AOSProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </AOSProvider>
  )
}


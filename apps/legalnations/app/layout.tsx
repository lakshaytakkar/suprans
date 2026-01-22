import type { Metadata } from "next"
import "@suprans/ui/styles/globals.css"

export const metadata: Metadata = {
  title: "LegalNations - US LLC Formation & Legal Services",
  description: "Start your US business with expert guidance. LLC formation, EIN applications, and compliance services.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background antialiased">
        {children}
      </body>
    </html>
  )
}

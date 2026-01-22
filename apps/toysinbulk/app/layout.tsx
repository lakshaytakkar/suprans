import type { Metadata } from "next"
import "@suprans/ui/styles/globals.css"

export const metadata: Metadata = {
  title: "Toys in Bulk - Wholesale Toys & Games",
  description: "Premium wholesale toys and games for retailers. Bulk ordering with competitive pricing.",
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

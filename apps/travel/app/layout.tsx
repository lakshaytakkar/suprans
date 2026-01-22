import type { Metadata } from "next"
import "@suprans/ui/styles/globals.css"

export const metadata: Metadata = {
  title: "Suprans Travel - Canton Fair & China Business Travel",
  description: "Expert travel services for Canton Fair and business trips to China.",
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

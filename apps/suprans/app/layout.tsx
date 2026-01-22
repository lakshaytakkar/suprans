import type { Metadata } from "next"
import { Inter, Inter_Tight } from "next/font/google"
import "@suprans/ui/styles/globals.css"
import PublicLayout from "@/components/layout/PublicLayout"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Suprans China - Business Development Platform",
    template: "%s | Suprans China",
  },
  description: "You Dream it. We Built it with SUPRANS - Guiding 1000+ entrepreneurs across India and abroad. Expert business development services including dropshipping, brand development, US LLC formation, and more.",
  keywords: [
    "business development",
    "dropshipping",
    "brand development",
    "US LLC formation",
    "China business",
    "Canton Fair",
    "entrepreneurship",
    "business consulting",
    "global business",
    "India business",
  ],
  authors: [{ name: "Suprans China" }],
  creator: "Suprans China",
  publisher: "Suprans China",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://suprans.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Suprans China",
    title: "Suprans China - Business Development Platform",
    description: "You Dream it. We Built it with SUPRANS - Guiding 1000+ entrepreneurs across India and abroad",
    images: [
      {
        url: "/assets/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Suprans China - Business Development Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Suprans China - Business Development Platform",
    description: "You Dream it. We Built it with SUPRANS - Guiding 1000+ entrepreneurs across India and abroad",
    images: ["/assets/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://suprans.com'
  
  // Structured data for organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Suprans China',
    description: 'Business development platform guiding entrepreneurs across India and abroad',
    url: baseUrl,
    logo: `${baseUrl}/assets/images/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9350830133',
      contactType: 'Customer Service',
      areaServed: ['IN', 'US', 'CN'],
    },
    sameAs: [
      'https://www.facebook.com/supranschina/',
      'https://www.linkedin.com/in/sanjay-suprans',
      'https://www.instagram.com/suprans.china/',
      'https://youtube.com/@suprans',
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${inter.variable} ${interTight.variable} font-sans antialiased`} suppressHydrationWarning>
        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  )
}

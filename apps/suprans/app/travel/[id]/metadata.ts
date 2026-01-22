import type { Metadata } from 'next'
import { getTravelPackageById, travelPackages } from '@/lib/data/travel-packages'

export function generateStaticParams() {
  return travelPackages.map((pkg) => ({
    id: pkg.id,
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const pkg = getTravelPackageById(params.id)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://suprans.com'

  if (!pkg) {
    return {
      title: 'Travel Package Not Found',
    }
  }

  return {
    title: pkg.title,
    description: pkg.description,
    openGraph: {
      title: `${pkg.title} - Suprans China`,
      description: pkg.description,
      type: 'website',
      url: `${baseUrl}/travel/${pkg.id}`,
      images: [{ url: pkg.image }],
    },
  }
}



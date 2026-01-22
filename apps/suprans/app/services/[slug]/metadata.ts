import type { Metadata } from 'next'
import { getServiceBySlug } from '@/lib/data/services'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = getServiceBySlug(params.slug)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://suprans.com'

  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: service.title,
    description: service.description,
    openGraph: {
      title: `${service.title} - Suprans China`,
      description: service.description,
      type: 'website',
      url: `${baseUrl}/services/${service.slug}`,
      images: service.image ? [{ url: service.image }] : [],
    },
  }
}


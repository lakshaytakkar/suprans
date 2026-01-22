export type ServiceCategory = "business-setup" | "operations" | "growth" | "travel-events"

export interface Service {
  id: string
  title: string
  slug: string
  description: string
  category: ServiceCategory
  image?: string
  icon?: string
  href: string
  featured?: boolean
  shortDescription?: string
  badges?: string[]
}

export interface ServiceCategoryData {
  id: ServiceCategory
  name: string
  description: string
  services: Service[]
}

export const SERVICE_CATEGORIES: Record<ServiceCategory, string> = {
  "business-setup": "Business Setup",
  "operations": "Operations",
  "growth": "Growth",
  "travel-events": "Travel & Events",
}


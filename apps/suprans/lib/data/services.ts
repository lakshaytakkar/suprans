import type { Service, ServiceCategoryData } from "@/lib/types/services"

export const services: Service[] = [
  // Business Setup
  {
    id: "us-llc-formation",
    title: "US LLC Formation",
    slug: "us-llc-formation",
    description: "Start your business in the USA with complete legal compliance and support. Get your LLC formed in 7-14 business days with EIN, bank account setup, and ongoing compliance.",
    category: "business-setup",
    image: "/assets/images/USALLC.png",
    href: "/usllc",
    featured: true,
    shortDescription: "Start your business in the USA with complete legal compliance and support.",
    badges: ["LEGAL COMPLIANCE", "DONE-FOR-YOU"],
  },
  {
    id: "brand-development",
    title: "Brand Development",
    slug: "brand-development",
    description: "We help you create a unique brand identity and market presence. From logo design to marketing strategy, we build brands that resonate with your audience.",
    category: "business-setup",
    image: "/assets/images/BrandDevelopment.png",
    href: "/services/branddevelopment",
    featured: true,
    shortDescription: "We help you create a unique brand identity and market presence.",
    badges: ["BRAND IDENTITY", "MARKETING"],
  },
  // Operations
  {
    id: "dropshipping",
    title: "Dropshipping",
    slug: "dropshipping",
    description: "Sell products without inventory — we handle sourcing, storage, and shipping for you. Complete dropshipping solutions from product sourcing to delivery.",
    category: "operations",
    image: "/assets/images/Dropshipping.png",
    href: "/services/dropshipping",
    featured: true,
    shortDescription: "Sell products without inventory — we handle sourcing, storage, and shipping for you.",
    badges: ["CHINA IMPORT", "DONE-FOR-YOU"],
  },
  // Growth
  {
    id: "video-consultations",
    title: "Video Consultations",
    slug: "video-consultations",
    description: "Get personalized business guidance from our experts. One-on-one video consultations to help you make informed decisions and grow your business.",
    category: "growth",
    href: "/videocall",
    featured: true,
    shortDescription: "Get personalized business guidance from our experts.",
    badges: ["1:1 MEETINGS", "EXPERT GUIDANCE"],
  },
  // Travel & Events
  {
    id: "canton-fair-travel",
    title: "Canton Fair Travel",
    slug: "canton-fair-travel",
    description: "Guided business trips to China's biggest trade fair. Join our delegation to the Canton Fair and unlock unlimited business opportunities with expert guidance.",
    category: "travel-events",
    href: "/travel",
    featured: true,
    shortDescription: "Guided business trips to China's biggest trade fair.",
    badges: ["GUIDED TRIPS", "CHINA IMPORT"],
  },
]

export const serviceCategories: ServiceCategoryData[] = [
  {
    id: "business-setup",
    name: "Business Setup",
    description: "Get your business legally structured and ready to operate",
    services: services.filter((s) => s.category === "business-setup"),
  },
  {
    id: "operations",
    name: "Operations",
    description: "Streamline your business operations and logistics",
    services: services.filter((s) => s.category === "operations"),
  },
  {
    id: "growth",
    name: "Growth",
    description: "Scale your business with expert guidance and support",
    services: services.filter((s) => s.category === "growth"),
  },
  {
    id: "travel-events",
    name: "Travel & Events",
    description: "Business travel and event participation services",
    services: services.filter((s) => s.category === "travel-events"),
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export function getFeaturedServices(): Service[] {
  return services.filter((s) => s.featured)
}

export function getServicesByCategory(category: ServiceCategoryData["id"]): Service[] {
  return services.filter((s) => s.category === category)
}


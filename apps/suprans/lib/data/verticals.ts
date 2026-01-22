import type { BrandConfig } from "@suprans/config/brands"

export interface Vertical {
  id: string
  name: string
  description: string
  domain: string
  href: string
  logo?: string
  color: string
}

export const verticals: Vertical[] = [
  {
    id: "legalnations",
    name: "LegalNations",
    description: "Legal business formation and compliance services",
    domain: "legalnations.com",
    href: "https://legalnations.com",
    color: "#1e3a8a",
  },
  {
    id: "toysinbulk",
    name: "Toys in Bulk",
    description: "B2B wholesale toy distribution and bulk orders",
    domain: "toysinbulk.com",
    href: "https://toysinbulk.com",
    color: "#f59e0b",
  },
  {
    id: "travel",
    name: "Suprans Travel",
    description: "Business travel packages and Canton Fair delegation services",
    domain: "travel.suprans.com",
    href: "https://travel.suprans.com",
    color: "#0891b2",
  },
]


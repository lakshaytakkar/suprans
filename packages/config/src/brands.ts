import type { TenantCode } from "@suprans/types"

export interface BrandConfig {
  code: TenantCode
  name: string
  domain: string
  subdomains?: string[]
  colors: {
    primary: string
    secondary: string
    accent?: string
  }
  features: string[]
  logo?: string
  favicon?: string
}

export const brands: Record<TenantCode, BrandConfig> = {
  suprans: {
    code: "suprans",
    name: "Suprans",
    domain: "suprans.com",
    subdomains: ["www.suprans.com"],
    colors: {
      primary: "#dc2626", // Red-600
      secondary: "#1e3a8a", // Blue-900
    },
    features: ["sourcing", "dropshipping", "brand-development", "canton-fair"],
  },
  legalnations: {
    code: "legalnations",
    name: "LegalNations",
    domain: "legalnations.com",
    colors: {
      primary: "#1e3a8a", // Blue-900
      secondary: "#059669", // Emerald-600
    },
    features: ["llc-formation", "ein", "bank-account", "compliance"],
  },
  toysinbulk: {
    code: "toysinbulk",
    name: "Toys in Bulk",
    domain: "toysinbulk.com",
    colors: {
      primary: "#f59e0b", // Amber-500
      secondary: "#8b5cf6", // Violet-500
    },
    features: ["ecommerce", "b2b", "wholesale", "bulk-orders"],
  },
  travel: {
    code: "travel",
    name: "Suprans Travel",
    domain: "travel.suprans.com",
    colors: {
      primary: "#0891b2", // Cyan-600
      secondary: "#dc2626", // Red-600
    },
    features: ["packages", "booking", "canton-fair-travel", "visa"],
  },
} as const

export function getBrandByDomain(host: string): BrandConfig {
  const normalizedHost = host.toLowerCase().replace(/^www\./, "")

  for (const brand of Object.values(brands)) {
    if (
      brand.domain === normalizedHost ||
      brand.subdomains?.includes(normalizedHost)
    ) {
      return brand
    }
  }

  // Default to suprans
  return brands.suprans
}

export function getBrandByCode(code: TenantCode): BrandConfig {
  return brands[code]
}

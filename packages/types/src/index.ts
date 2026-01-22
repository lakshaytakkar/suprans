// User & Auth Types
export type UserRole = "superadmin" | "admin" | "manager" | "executive" | "employee" | "customer"

export interface User {
  id: string
  email: string
  name: string
  avatar?: string | null
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export interface UserContext {
  userId: string
  email: string
  name: string
  avatar?: string | null
  role: UserRole
  tenantId: string
  tenantCode: TenantCode
  departmentId?: string
  permissions: string[]
  currentTeamId?: string
}

// Tenant Types
export type TenantCode = "suprans" | "legalnations" | "toysinbulk" | "travel"

export interface Tenant {
  id: string
  code: TenantCode
  name: string
  domain: string
  settings: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
}

// Form Types
export interface CallbackFormData {
  name: string
  mobile: string
  email: string
  city: string
  services: string
}

export interface RegisterFormData {
  name: string
  email: string
  countryCode: string
  otherCountryCode: string
  whatsapp: string
  age: string
  services: string
  whoAreYou: string
}

// Modal Types
export interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

export interface ButtonClickProps {
  onButtonClick?: () => void
}

// E-commerce Types
export interface Product {
  id: string
  tenantId: string
  sku: string
  name: string
  description: string
  price: number
  compareAtPrice?: number
  images: string[]
  categoryId: string
  inventory: number
  minOrderQty: number
  status: "draft" | "active" | "archived"
  metadata: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  tenantId: string
  name: string
  slug: string
  description?: string
  parentId?: string
  image?: string
}

export interface CartItem {
  productId: string
  variantId?: string
  quantity: number
  price: number
}

export interface Cart {
  id: string
  userId?: string
  sessionId: string
  tenantId: string
  items: CartItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
}

export interface Order {
  id: string
  tenantId: string
  userId: string
  orderNumber: string
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  shippingAddress: Address
  billingAddress?: Address
  metadata: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  productId: string
  productName: string
  sku: string
  quantity: number
  price: number
  total: number
}

export interface Address {
  name: string
  company?: string
  line1: string
  line2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
}

// Country Code Type
export interface CountryCode {
  code: string
  name: string
}

// API Response Types
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Team Types
export type {
  Team,
  UserTeam,
  TeamNavigation,
  TeamType,
  TeamRole,
} from "./teams"

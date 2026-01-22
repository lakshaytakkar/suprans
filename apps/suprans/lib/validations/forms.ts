import { z } from 'zod'

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Phone validation - allows digits, spaces, hyphens, parentheses, and + for country codes
const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/

// Sanitize string - remove HTML tags and trim
function sanitizeString(str: string): string {
  return str.replace(/<[^>]*>/g, '').trim()
}

// Inquiry form validation schema
export const inquiryFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .transform(sanitizeString)
    .refine((val) => val.length > 0, 'Name cannot be empty'),
  mobile: z
    .string()
    .min(1, 'Mobile number is required')
    .max(20, 'Mobile number must be less than 20 characters')
    .regex(phoneRegex, 'Please enter a valid phone number')
    .transform(sanitizeString),
  email: z
    .string()
    .min(1, 'Email is required')
    .max(255, 'Email must be less than 255 characters')
    .email('Please enter a valid email address')
    .transform((val) => val.toLowerCase().trim()),
  city: z
    .string()
    .min(1, 'City is required')
    .max(100, 'City must be less than 100 characters')
    .transform(sanitizeString),
  services: z
    .string()
    .min(1, 'Service selection is required')
    .max(200, 'Service selection must be less than 200 characters')
    .transform(sanitizeString),
})

export type InquiryFormData = z.infer<typeof inquiryFormSchema>

// Callback form validation schema
export const callbackFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .transform(sanitizeString)
    .refine((val) => val.length > 0, 'Name cannot be empty'),
  mobile: z
    .string()
    .min(1, 'Mobile number is required')
    .max(20, 'Mobile number must be less than 20 characters')
    .regex(phoneRegex, 'Please enter a valid phone number')
    .transform(sanitizeString),
  email: z
    .string()
    .min(1, 'Email is required')
    .max(255, 'Email must be less than 255 characters')
    .email('Please enter a valid email address')
    .transform((val) => val.toLowerCase().trim()),
  city: z
    .string()
    .max(100, 'City must be less than 100 characters')
    .transform((val) => sanitizeString(val || ''))
    .optional(),
  services: z
    .string()
    .max(200, 'Service selection must be less than 200 characters')
    .transform((val) => sanitizeString(val || ''))
    .optional(),
})

export type CallbackFormData = z.infer<typeof callbackFormSchema>

// Registration form validation schema
export const registrationFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .transform(sanitizeString)
    .refine((val) => val.length > 0, 'Name cannot be empty'),
  email: z
    .string()
    .min(1, 'Email is required')
    .max(255, 'Email must be less than 255 characters')
    .email('Please enter a valid email address')
    .transform((val) => val.toLowerCase().trim()),
  whatsapp: z
    .string()
    .max(15, 'WhatsApp number must be less than 15 characters')
    .transform((val) => sanitizeString(val || ''))
    .optional(),
  countryCode: z
    .string()
    .max(10, 'Country code must be less than 10 characters')
    .optional(),
  otherCountryCode: z
    .string()
    .max(10, 'Country code must be less than 10 characters')
    .transform((val) => sanitizeString(val || ''))
    .optional(),
  age: z
    .string()
    .max(50, 'Age must be less than 50 characters')
    .transform((val) => sanitizeString(val || ''))
    .optional(),
  whoAreYou: z
    .string()
    .max(100, 'Field must be less than 100 characters')
    .transform((val) => sanitizeString(val || ''))
    .optional(),
  services: z
    .string()
    .max(200, 'Service selection must be less than 200 characters')
    .transform((val) => sanitizeString(val || ''))
    .optional(),
})

export type RegistrationFormData = z.infer<typeof registrationFormSchema>


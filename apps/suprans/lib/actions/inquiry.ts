'use server'

import { createAnonClient } from '@suprans/database/server'
import { inquiryFormSchema, type InquiryFormData } from '@/lib/validations/forms'
import { z } from 'zod'
import { headers } from 'next/headers'
import { checkRateLimit, getClientIP } from '@/lib/utils/rate-limit'

export async function createInquiryLead(data: unknown) {
  try {
    // Rate limiting check
    const headersList = await headers()
    const ip = getClientIP(headersList)
    const rateLimitResult = checkRateLimit(`inquiry:${ip}`, {
      maxRequests: 5,
      windowMs: 3600000, // 1 hour
    })

    if (!rateLimitResult.allowed) {
      throw new Error('Too many requests. Please try again later.')
    }

    // Validate input with Zod
    const validatedData = inquiryFormSchema.parse(data)

    const supabase = createAnonClient()

    // Map form data to lead structure
    const leadData = {
      company: validatedData.name || 'Individual',
      contact_name: validatedData.name,
      email: validatedData.email || null,
      phone: validatedData.mobile || null,
      city: validatedData.city || null,
      services: validatedData.services || null,
      source: 'website' as const,
      status: 'new' as const,
    }

    const { data: lead, error } = await supabase
      .from('leads')
      .insert(leadData)
      .select()
      .single()

    if (error) {
      // Log error server-side only, don't expose details to client
      if (process.env.NODE_ENV === 'development') {
        console.error('Error creating lead:', error)
      }
      throw new Error('Failed to submit inquiry. Please try again later.')
    }
    
    return { success: true, lead }
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      throw new Error(`Validation failed: ${error.errors.map(e => e.message).join(', ')}`)
    }
    
    // Generic error for production
    if (process.env.NODE_ENV === 'development' && error instanceof Error) {
      console.error('Error in createInquiryLead:', error)
    }
    
    throw error instanceof Error ? error : new Error('Failed to submit inquiry. Please try again later.')
  }
}

export type { InquiryFormData }


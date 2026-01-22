'use server'

import { createAnonClient } from '@suprans/database/server'
import { registrationFormSchema, type RegistrationFormData } from '@/lib/validations/forms'
import { z } from 'zod'
import { headers } from 'next/headers'
import { checkRateLimit, getClientIP } from '@/lib/utils/rate-limit'

export async function createRegistrationLead(data: unknown) {
  // Rate limiting check
  const headersList = await headers()
  const ip = getClientIP(headersList)
  const rateLimitResult = checkRateLimit(`registration:${ip}`, {
    maxRequests: 5,
    windowMs: 3600000, // 1 hour
  })

  if (!rateLimitResult.allowed) {
    throw new Error('Too many requests. Please try again later.')
  }
  try {
    // Validate input with Zod
    const validatedData = registrationFormSchema.parse(data)

    const supabase = createAnonClient()

    // Combine country code with WhatsApp number
    const countryCodeToUse = validatedData.countryCode === 'other' 
      ? validatedData.otherCountryCode?.trim() || ''
      : validatedData.countryCode || ''
    
    const phoneNumber = countryCodeToUse && validatedData.whatsapp 
      ? `${countryCodeToUse}${validatedData.whatsapp}` 
      : null

    // Build notes from age and whoAreYou
    const notesParts: string[] = []
    if (validatedData.age) {
      notesParts.push(`Age: ${validatedData.age}`)
    }
    if (validatedData.whoAreYou) {
      notesParts.push(`Type: ${validatedData.whoAreYou}`)
    }
    const notes = notesParts.length > 0 ? notesParts.join(', ') : null

    // Map form data to lead structure
    const leadData = {
      company: validatedData.name || 'Individual',
      contact_name: validatedData.name,
      email: validatedData.email || null,
      phone: phoneNumber,
      services: validatedData.services || null,
      notes: notes,
      source: 'registration',
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
        console.error('Error creating registration lead:', error)
      }
      throw new Error('Failed to submit registration. Please try again later.')
    }
    
    return { success: true, lead }
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      throw new Error(`Validation failed: ${error.errors.map(e => e.message).join(', ')}`)
    }
    
    // Generic error for production
    if (process.env.NODE_ENV === 'development' && error instanceof Error) {
      console.error('Error in createRegistrationLead:', error)
    }
    
    throw error instanceof Error ? error : new Error('Failed to submit registration. Please try again later.')
  }
}

export type { RegistrationFormData }


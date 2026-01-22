import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, getClientIP } from '@/lib/utils/rate-limit'

/**
 * Rate limiting middleware for form submissions
 * Limits to 5 requests per IP per hour
 */
export function rateLimitMiddleware(request: NextRequest) {
  const ip = getClientIP(request.headers)
  const result = checkRateLimit(ip, {
    maxRequests: 5,
    windowMs: 3600000, // 1 hour
  })

  if (!result.allowed) {
    return NextResponse.json(
      {
        error: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000),
      },
      {
        status: 429,
        headers: {
          'Retry-After': Math.ceil((result.resetTime - Date.now()) / 1000).toString(),
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': result.remaining.toString(),
          'X-RateLimit-Reset': new Date(result.resetTime).toISOString(),
        },
      }
    )
  }

  return null // Allow request to proceed
}


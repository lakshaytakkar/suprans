/**
 * Analytics utility for tracking user interactions and conversions
 * This provides a foundation for analytics integration
 */

export type AnalyticsEvent =
  | "page_view"
  | "service_view"
  | "cta_click"
  | "form_submit"
  | "consultation_book"
  | "service_click"
  | "vertical_click"

export interface AnalyticsEventData {
  event: AnalyticsEvent
  properties?: Record<string, any>
}

/**
 * Track an analytics event
 * This is a placeholder that can be integrated with Google Analytics, Mixpanel, etc.
 */
export function trackEvent(event: AnalyticsEvent, properties?: Record<string, any>) {
  if (typeof window === "undefined") return

  const eventData: AnalyticsEventData = {
    event,
    properties: {
      ...properties,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      path: window.location.pathname,
    },
  }

  // Log to console in development
  // Analytics tracking - only log in development
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log("[Analytics]", eventData)
  }

  // TODO: Integrate with analytics service
  // Example: gtag('event', event, properties)
  // Example: mixpanel.track(event, properties)
}

/**
 * Track page view
 */
export function trackPageView(path: string, title?: string) {
  trackEvent("page_view", {
    path,
    title,
  })
}

/**
 * Track CTA click
 */
export function trackCTAClick(ctaText: string, location: string) {
  trackEvent("cta_click", {
    cta_text: ctaText,
    location,
  })
}

/**
 * Track service view
 */
export function trackServiceView(serviceSlug: string, serviceName: string) {
  trackEvent("service_view", {
    service_slug: serviceSlug,
    service_name: serviceName,
  })
}

/**
 * Track form submission
 */
export function trackFormSubmit(formType: string, formData?: Record<string, any>) {
  trackEvent("form_submit", {
    form_type: formType,
    ...formData,
  })
}

/**
 * Track consultation booking
 */
export function trackConsultationBook(source: string) {
  trackEvent("consultation_book", {
    source,
  })
}


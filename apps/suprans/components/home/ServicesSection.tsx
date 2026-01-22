"use client"

import Link from "next/link"
import { getFeaturedServices } from "@/lib/data/services"
import ServiceCard from "./ServiceCard"

export default function ServicesSection() {
  const featuredServices = getFeaturedServices()

  return (
    <section className="py-20 bg-gradient-to-br from-white to-red-50 relative overflow-hidden" id="services">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Dominate Global Business with Our Dedicated Services
          </h2>
          <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
            For beginners, existing businesses & entrepreneurs looking to scale
          </p>
        </div>

        {/* Featured Services - Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} large={true} />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="text-red-600 hover:text-red-700 font-semibold text-lg inline-flex items-center gap-2"
          >
            View All Services
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

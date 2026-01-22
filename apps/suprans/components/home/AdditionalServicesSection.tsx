"use client"

import Link from "next/link"
import { services } from "@/lib/data/services"
import ServiceCard from "./ServiceCard"

export default function AdditionalServicesSection() {
  // For now, showing all services as additional services
  // You can filter specific ones if needed
  const additionalServices = services

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Learn Global Business at Your Own Pace
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
            Services tailored for different levels, from students, working professionals to seasoned entrepreneurs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {additionalServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} large={true} />
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6 text-lg">Not sure which fits your goals?</p>
          <Link
            href="/videocall"
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 inline-block"
          >
            Book Free Consultation Call
          </Link>
        </div>
      </div>
    </section>
  )
}


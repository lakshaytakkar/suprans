"use client"

import { serviceCategories } from "@/lib/data/services"
import ServiceCard from "@/components/home/ServiceCard"
import Link from "next/link"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Services</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Comprehensive business solutions to help you start, run, and grow your global business
          </p>
        </div>
      </section>

      {/* Services by Category */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {serviceCategories.map((category) => (
            <div key={category.id} id={category.id} className="mb-16 scroll-mt-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  {category.name}
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.services.map((service, index) => (
                  <ServiceCard key={service.id} service={service} index={index} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Book a free consultation with our experts to discuss your business needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/videocall"
              className="bg-white text-red-600 px-8 py-4 rounded-full font-semibold shadow-md hover:bg-gray-100 transition-all hover:scale-105 inline-block"
            >
              Book Free Consultation
            </Link>
            <Link
              href="/contactform1"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-red-600 transition-all inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}


"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import { getServiceBySlug, services } from "@/lib/data/services"
import Link from "next/link"
import Image from "next/image"
import CallbackModal from "@/components/layout/CallbackModal"
import { CallbackForm } from "@/components/home/CallbackForm"

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://suprans.com'
  const service = getServiceBySlug(params.slug)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!service) {
    notFound()
  }

  // Service-specific content based on category
  const getServiceContent = () => {
    switch (service.category) {
      case "business-setup":
        return {
          benefits: [
            { title: "Expert Guidance", desc: "Professional support throughout the process" },
            { title: "Legal Compliance", desc: "Ensure all legal requirements are met" },
            { title: "Fast Processing", desc: "Quick turnaround times for your business needs" },
            { title: "Ongoing Support", desc: "Continued assistance after setup" },
          ],
          features: [
            "Complete documentation preparation",
            "Expert consultation and guidance",
            "Compliance with all regulations",
            "Ongoing support and maintenance",
          ],
        }
      case "operations":
        return {
          benefits: [
            { title: "Streamlined Operations", desc: "Efficient processes for your business" },
            { title: "Cost Effective", desc: "Save money with optimized operations" },
            { title: "Scalable Solutions", desc: "Grow your business without limits" },
            { title: "Expert Management", desc: "Professional handling of operations" },
          ],
          features: [
            "End-to-end operational support",
            "Quality assurance and control",
            "Real-time tracking and updates",
            "Dedicated account management",
          ],
        }
      case "growth":
        return {
          benefits: [
            { title: "Personalized Strategy", desc: "Customized approach for your business" },
            { title: "Expert Insights", desc: "Learn from industry professionals" },
            { title: "Actionable Plans", desc: "Clear roadmap to success" },
            { title: "Ongoing Mentorship", desc: "Continuous guidance and support" },
          ],
          features: [
            "One-on-one expert consultations",
            "Customized business strategies",
            "Direct access to industry experts",
            "Flexible scheduling options",
          ],
        }
      case "travel-events":
        return {
          benefits: [
            { title: "Expert Guidance", desc: "Led by experienced professionals" },
            { title: "Networking Opportunities", desc: "Connect with industry leaders" },
            { title: "Complete Support", desc: "End-to-end travel assistance" },
            { title: "Proven Results", desc: "Track record of successful trips" },
          ],
          features: [
            "Pre-trip training and preparation",
            "On-ground support throughout",
            "Exclusive access to suppliers",
            "Complete travel arrangements",
          ],
        }
      default:
        return {
          benefits: [
            { title: "Expert Support", desc: "Professional guidance throughout" },
            { title: "Proven Results", desc: "Track record of success" },
            { title: "Comprehensive Service", desc: "End-to-end solutions" },
            { title: "Dedicated Team", desc: "Personalized attention" },
          ],
          features: [
            "Professional consultation",
            "Customized solutions",
            "Ongoing support",
            "Quality assurance",
          ],
        }
    }
  }

  const content = getServiceContent()

  // Structured data for service
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'Suprans China',
      url: baseUrl,
    },
    areaServed: ['IN', 'US', 'CN'],
    url: `${baseUrl}/services/${service.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{service.title}</h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">{service.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white text-red-600 px-8 py-4 rounded-full font-semibold shadow-md hover:bg-gray-100 transition-all hover:scale-105 text-center"
                >
                  Get Started Now
                </button>
                <Link
                  href="/services"
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-red-600 transition-all text-center"
                >
                  View All Services
                </Link>
              </div>
            </div>
            {service.image && (
              <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-contain bg-white p-4"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose <span className="text-red-600">{service.title}</span>?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.benefits.map((item, i) => (
              <div key={i} className="bg-red-50 p-6 rounded-xl border border-red-200 hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What&apos;s <span className="text-red-600">Included</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {content.features.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
            {service.image && (
              <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-contain bg-white p-4"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About {service.title}</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">{service.description}</p>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Why Choose This Service?</h3>
              <p className="text-gray-700">
                Our {service.title.toLowerCase()} service is designed to help you achieve your business goals
                with expert guidance and proven systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90">
            Book a free consultation to discuss how {service.title} can help your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-red-600 px-8 py-4 rounded-full font-semibold shadow-md hover:bg-gray-100 transition-all hover:scale-105"
            >
              Get Started Now
            </button>
            <Link
              href="/services"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-red-600 transition-all"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <CallbackForm />

      {/* Modal */}
      <CallbackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        serviceName={service.title}
      />
    </div>
  )
}


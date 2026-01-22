"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getTravelPackageById, travelPackages } from "@/lib/data/travel-packages"
import { MapPin, Calendar, Clock, CheckCircle, ShieldCheck, ArrowRight, User } from "lucide-react"
import CallbackModal from "@/components/layout/CallbackModal"
import { Button } from "@/components/ui/button"

export default function TravelDetailPage({ params }: { params: { id: string } }) {
  const pkg = getTravelPackageById(params.id)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!pkg) {
    notFound()
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://suprans.com'

  // Structured data for travel package
  const travelPackageSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: pkg.title,
    description: pkg.description,
    itinerary: {
      '@type': 'ItemList',
      itemListElement: pkg.inclusions.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item,
      })),
    },
    offers: {
      '@type': 'Offer',
      price: pkg.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    provider: {
      '@type': 'Organization',
      name: 'Suprans China',
      url: baseUrl,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(travelPackageSchema) }}
      />
      <div className="min-h-screen bg-white">
        {/* Hero Header */}
        <div className="relative h-[60vh] overflow-hidden">
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="max-w-6xl mx-auto">
              <div className="max-w-4xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                    {pkg.destinations[0]}
                  </span>
                  {pkg.dates && (
                    <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-bold border border-white/20">
                      Limited Seats
                    </span>
                  )}
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  {pkg.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-white/90 text-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-yellow-300" />
                    {pkg.duration}
                  </div>
                  {pkg.dates && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-yellow-300" />
                      {pkg.dates}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-yellow-300" />
                    {pkg.destinations.join(" + ")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16 grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-bold mb-6">About This Trip</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {pkg.description} This package is designed for serious entrepreneurs and business owners looking to scale their sourcing directly from China. We handle all the logistics—visa, flight, hotel, and local travel—so you can focus 100% on finding the right products and suppliers.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6">What's Included?</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {pkg.inclusions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 bg-gray-50">
                    <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
                    <span className="font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-red-50 p-8 rounded-2xl border border-red-200">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="w-8 h-8 text-red-600" />
                Suprans Guarantee
              </h2>
              <p className="text-gray-700">
                We travel with you. Unlike typical travel agents, our team is on the ground in China to ensure your safety, comfort, and business success. We have 10+ years of experience navigating the Chinese market.
              </p>
            </section>
          </div>

          {/* Sidebar Booking Card */}
          <div className="relative">
            <div className="sticky top-24">
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl">
                <div className="mb-6">
                  <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">Total Package Cost</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-red-600">₹{pkg.price.toLocaleString()}</span>
                    <span className="text-gray-600 text-sm font-medium">per person</span>
                  </div>
                  {pkg.originalPrice && (
                    <p className="text-sm text-gray-500 line-through mt-1">
                      Original Price: ₹{pkg.originalPrice.toLocaleString()}
                    </p>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between py-3 border-b border-gray-200 text-sm">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-bold">{pkg.duration}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200 text-sm">
                    <span className="text-gray-600">Group Size</span>
                    <span className="font-bold">Limited to 20</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200 text-sm">
                    <span className="text-gray-600">Guide</span>
                    <span className="font-bold">English & Hindi Speaking</span>
                  </div>
                </div>

                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl h-14 text-lg shadow-lg mb-4"
                >
                  Book This Trip Now
                </Button>

                <p className="text-center text-xs text-gray-500">
                  No payment required today. Secure your spot with an inquiry.
                </p>
              </div>

              <div className="mt-8 bg-blue-50 border border-blue-100 p-6 rounded-2xl">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900">Need Customization?</h4>
                    <p className="text-sm text-blue-800/80 mt-1">
                      We can tailor trips for large corporate groups. <br />
                      <Link href="/contactform1" className="underline font-bold hover:text-blue-600">
                        Contact Support
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CallbackModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          serviceName={pkg.title}
        />
      </div>
    </>
  )
}


"use client"

import { useState } from "react"
import { travelPackages } from "@/lib/data/travel-packages"
import { TravelPackageCard } from "@/components/travel/TravelPackageCard"
import { TravelFilters } from "@/components/travel/TravelFilters"
import type { TravelFilter } from "@/lib/types/travel"

export default function TravelPage() {
  const [filter, setFilter] = useState<TravelFilter>('All')

  const filteredPackages = travelPackages.filter((pkg) => {
    if (filter === 'All') return true
    if (filter === 'Canton Fair') return pkg.category === 'canton-fair'
    if (filter === 'Market Tours') return pkg.category === 'market-tours'
    if (filter === 'Factory Visits') return pkg.category === 'factory-visits'
    return true
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Business Travel <span className="text-yellow-300">Simplified</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Join India's largest delegation to China. We handle flights, visas, hotels, food, and fair entry so you can focus on business.
          </p>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <TravelFilters activeFilter={filter} onFilterChange={setFilter} />

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <TravelPackageCard key={pkg.id} package={pkg} />
            ))}
          </div>

          {filteredPackages.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No packages found for this filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join our next delegation and unlock unlimited business opportunities in China
          </p>
          <a
            href="/contactform1"
            className="bg-white text-red-600 px-8 py-4 rounded-full font-semibold shadow-md hover:bg-gray-100 transition-all hover:scale-105 inline-block"
          >
            Contact Us Now
          </a>
        </div>
      </section>
    </div>
  )
}



"use client"

import Link from "next/link"
import Image from "next/image"
import { MapPin, Calendar, ArrowRight } from "lucide-react"
import type { TravelPackage } from "@/lib/types/travel"

interface TravelPackageCardProps {
  package: TravelPackage
}

export function TravelPackageCard({ package: pkg }: TravelPackageCardProps) {
  return (
    <Link href={`/travel/${pkg.id}`}>
      <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all h-full flex flex-col hover:-translate-y-2">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {pkg.originalPrice && (
            <div className="absolute top-4 right-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Sale On
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
            <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
              <MapPin className="w-4 h-4 text-red-600" />
              {pkg.destinations.join(" • ")}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
              {pkg.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              {pkg.dates || pkg.duration}
            </div>
          </div>

          <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">
            {pkg.description}
          </p>

          <div className="pt-6 border-t border-gray-200 flex items-end justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Starting From</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-red-600">₹{pkg.price.toLocaleString()}</span>
                {pkg.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">₹{pkg.originalPrice.toLocaleString()}</span>
                )}
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}



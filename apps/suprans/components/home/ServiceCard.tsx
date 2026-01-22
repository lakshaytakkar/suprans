"use client"

import Link from "next/link"
import Image from "next/image"
import type { Service } from "@/lib/types/services"
import { Badge } from "@/components/ui/badge"
import ImagePlaceholder from "@/components/ui/ImagePlaceholder"

interface ServiceCardProps {
  service: Service
  index?: number
  large?: boolean
}

export default function ServiceCard({ service, index = 0, large = false }: ServiceCardProps) {
  // Map service IDs to image prompt IDs
  const serviceImageMap: Record<string, string> = {
    "us-llc-formation": "service-us-llc",
    "brand-development": "service-brand-development",
    "dropshipping": "service-dropshipping",
    "video-consultations": "service-video-consultations",
    "canton-fair-travel": "service-canton-fair",
  }

  const imagePromptId = serviceImageMap[service.id] || "service-us-llc"

  if (large) {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
        <div className="relative w-full h-64 md:h-80 overflow-hidden bg-gray-100">
          <ImagePlaceholder
            promptId={imagePromptId}
            alt={service.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            {service.badges?.map((badge, i) => (
              <Badge key={i} variant="default">
                {badge}
              </Badge>
            ))}
          </div>
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg mb-2">
              {service.title}
            </h3>
          </div>
        </div>
        <div className="p-6 md:p-8">
          <p className="text-gray-600 mb-6 text-base md:text-lg leading-relaxed">
            {service.description}
          </p>
          <Link
            href={service.href}
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105"
          >
            Learn More
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div
      className="w-full sm:w-96 bg-gradient-to-b from-white to-red-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-3xl p-8 border border-red-200 group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {service.image && (
        <div className="relative w-full h-48 mx-auto mb-6 rounded-xl overflow-hidden bg-white">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}
      <h3 className="text-2xl font-semibold mb-3 text-gray-900">{service.title}</h3>
      <p className="text-gray-600 mb-6 text-base leading-relaxed">
        {service.shortDescription || service.description}
      </p>

      <Link
        href={service.href}
        className="inline-block bg-white border-2 border-red-500 text-red-600 rounded-full px-6 py-2.5 hover:bg-red-500 hover:text-white transition-all font-semibold text-sm"
      >
        Learn More
      </Link>
    </div>
  )
}


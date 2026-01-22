"use client"

import React, { useEffect, useState } from "react"
import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"
import AOS from "aos"
import ImagePlaceholder from "@/components/ui/ImagePlaceholder"
import { Users, Rocket, Package, Star } from "lucide-react"

const stats = [
  { value: 1000, suffix: "+", label: "Entrepreneurs Guided", icon: Users, iconColor: "text-purple-600", imageId: "stat-entrepreneurs" },
  { value: 3189, suffix: "+", label: "Successful Businesses", icon: Rocket, iconColor: "text-red-600", imageId: "stat-businesses" },
  { value: 9023, suffix: "+", label: "Products Imported", icon: Package, iconColor: "text-amber-700", imageId: "stat-products" },
  { value: 4.8, suffix: "/5", label: "Average Rating from 1000+ Reviews", icon: Star, iconColor: "text-yellow-500", imageId: "stat-rating" },
]

export default function BusinessStats() {
  const [mounted, setMounted] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    setMounted(true)
    AOS.init({ duration: 800, once: true })
  }, [])

  return (
    <section ref={ref} className="bg-gradient-to-br from-red-50 to-yellow-50 py-16 px-4 sm:px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="text-center bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
            >
              <div className="relative h-32 md:h-40 overflow-hidden">
                <ImagePlaceholder
                  promptId={item.imageId}
                  alt={item.label}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent" />
              </div>
              <div className="p-4">
                <div className="flex justify-center mb-2">
                  <item.icon className={`w-8 h-8 ${item.iconColor}`} />
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-600 mb-2">
                {mounted && inView ? (
                  <CountUp
                    start={0}
                    end={item.value}
                    duration={2.5}
                    suffix={item.suffix}
                    decimals={item.value % 1 !== 0 ? 1 : 0}
                    separator=","
                  />
                ) : (
                  <span>
                    {item.value % 1 !== 0
                      ? item.value.toFixed(1)
                      : item.value.toLocaleString()}
                    {item.suffix}
                  </span>
                )}
              </h2>
              <p className="text-sm md:text-base text-gray-700 font-medium">
                {item.label}
              </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

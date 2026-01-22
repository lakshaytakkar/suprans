"use client"

import React, { useEffect } from "react"
import AOS from "aos"
import Image from "next/image"
import Link from "next/link"
import ImagePlaceholder from "@/components/ui/ImagePlaceholder"

interface HeroProps {
  onScrollToServices?: () => void
}

export const Hero: React.FC<HeroProps> = ({ onScrollToServices }) => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true })
  }, [])

  return (
    <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-red-50 via-white to-yellow-50 overflow-hidden">
      {/* Blurred Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-white/80 z-10" />
        <Image
          src="/assets/images/main.jpeg"
          alt="Suprans Business"
          fill
          className="object-cover opacity-20 blur-sm scale-110"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-left space-y-4" data-aos="fade-right">
            {/* Social Proof Badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-3 py-1.5">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-3.5 h-3.5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-yellow-600 font-semibold text-xs md:text-sm">
                1000+ Entrepreneurs Guided
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
              Build Your{" "}
              <span className="text-red-600">Global Business</span> The Proven Way
            </h1>

            {/* Supporting Text */}
            <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl">
              Whether you&apos;re a beginner or business owner looking to grow, you&apos;ve come to the best place.{" "}
              <strong className="text-gray-900">Get expert guidance, done-for-you services, and complete support</strong>{" "}
              from India&apos;s #1 global business development platform.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/videocall"
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
              >
                Book Free Consultation Call
              </Link>
              <button
                onClick={onScrollToServices}
                className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-6 py-3 rounded-lg font-bold text-base transition-all duration-300 hover:scale-105"
              >
                Browse Services
              </button>
            </div>
          </div>

          {/* Right Content - Image/Visual */}
          <div className="relative" data-aos="fade-left">
            <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden border-4 border-red-500/50 shadow-2xl">
              <Image
                src="/assets/images/hero-founder.png"
                alt="Suprans Founder"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

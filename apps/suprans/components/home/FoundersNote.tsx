"use client"

import React, { useEffect } from "react"
import AOS from "aos"
import Link from "next/link"
import Image from "next/image"

export default function FoundersNote() {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true })
  }, [])

  return (
    <section className="bg-white py-20 px-4" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden border-4 border-red-200 shadow-xl">
              <Image
                src="/assets/images/sirp.JPG"
                alt="Founder - India's #1 Business Development Expert"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="text-gray-900 space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              From Struggling Beginner to India&apos;s #1 Business Development Expert
            </h2>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Like many entrepreneurs, I started with zero experience and made every mistake possible. 
                Products stuck at ports. Wrong supplier choices. Failed launches. Legal complications.
              </p>
              <p>
                But I refused to quit. Over 8+ years, I built systems that remove guesswork from global business development.
              </p>
              <p>
                I identified what actually works, eliminated what doesn&apos;t.
              </p>
              <p className="text-gray-900 font-semibold">
                <strong>My mission:</strong> Help Indian entrepreneurs build wealth through global business 
                without the painful trial and error I went through.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Link
                href="https://instagram.com/suprans"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-700 transition-colors font-semibold"
              >
                Instagram
              </Link>
              <Link
                href="https://youtube.com/suprans"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-700 transition-colors font-semibold"
              >
                Youtube
              </Link>
              <Link
                href="https://linkedin.com/company/suprans"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-700 transition-colors font-semibold"
              >
                Linkedin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

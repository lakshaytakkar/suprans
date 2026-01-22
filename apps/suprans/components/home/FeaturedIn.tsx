"use client"

import Image from "next/image"

export default function FeaturedIn() {
  // Real business logos from news/media pages
  const businessLogos = [
    { name: "Start", image: "/assets/images/start.jpeg" },
    { name: "Gem", image: "/assets/images/gem.jpeg" },
    { name: "Trust", image: "/assets/images/trust.jpeg" },
    { name: "Tata", image: "/assets/images/tata.jpeg" },
    { name: "Google", image: "/assets/images/Google.jpeg" },
    { name: "Trustpilot", image: "/assets/images/Trustpilot.jpeg" },
  ]

  return (
    <section className="bg-white py-8 px-4 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <p className="text-gray-600 text-sm text-center mb-6">Featured In</p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-70 hover:opacity-100 transition-opacity">
          {businessLogos.map((logo, index) => (
            <div
              key={index}
              className="relative h-8 md:h-12 w-auto grayscale hover:grayscale-0 transition-all"
            >
              <Image
                src={logo.image}
                alt={logo.name}
                width={120}
                height={48}
                className="object-contain h-full w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


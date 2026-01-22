"use client"

import ImagePlaceholder from "@/components/ui/ImagePlaceholder"
import Link from "next/link"

const processSteps = [
  {
    step: 1,
    title: "Free Consultation",
    description: "Book a free consultation call to discuss your business goals and requirements.",
    imageId: "process-step-1",
  },
  {
    step: 2,
    title: "Business Setup",
    description: "We handle all legal compliance, LLC formation, and business structure setup.",
    imageId: "process-step-2",
  },
  {
    step: 3,
    title: "Product Sourcing",
    description: "Expert product research, China import, and quality inspection services.",
    imageId: "process-step-3",
  },
  {
    step: 4,
    title: "Launch & Growth",
    description: "Launch your business and scale with ongoing support and guidance.",
    imageId: "process-step-4",
  },
]

export default function ProcessVisual() {
  return (
    <section className="bg-gradient-to-br from-white to-red-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How We Help You Build Your Global Business
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            A proven 4-step process to take your business from idea to global success
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {processSteps.map((step, index) => (
            <div
              key={step.step}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <div className="relative h-48 md:h-56 overflow-hidden">
                <ImagePlaceholder
                  promptId={step.imageId}
                  alt={step.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-black">
                    {step.step}
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white drop-shadow-lg">
                    {step.title}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/videocall"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Start Your Journey - Book Free Consultation
          </Link>
        </div>
      </div>
    </section>
  )
}


"use client"

import ImagePlaceholder from "@/components/ui/ImagePlaceholder"

const traditionalApproach = {
  title: "Traditional/Local Approach",
  symbol: "₹",
  points: [
    {
      title: "5-10% thin margins",
      description: "Work harder for less money with limited profit potential.",
    },
    {
      title: "Price wars",
      description: "Constant competition kills profits in saturated local markets.",
    },
    {
      title: "No global credibility",
      description: "Limited to local markets, hard to scale internationally.",
    },
    {
      title: "Limited growth",
      description: "Available locally, constrained by market size and regulations.",
    },
  ],
}

const supransApproach = {
  title: "Suprans Global Approach",
  symbol: "₹₹₹₹",
  points: [
    {
      title: "35-40% profit margins",
      description: "Make more of every sale with global business structures.",
    },
    {
      title: "Less competition",
      description: "Fewer sellers in global markets means higher prices & profits.",
    },
    {
      title: "Scalable business",
      description: "Build a global brand, not just local sales. Access international markets.",
    },
    {
      title: "Long-term value",
      description: "Businesses that last and grow with proper legal structure and systems.",
    },
  ],
}

export default function ComparisonSection() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-20 px-4 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How Smart Entrepreneurs Build
          </h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-600 mb-4">
            Real Global Businesses
          </h3>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Most entrepreneurs choose wrong approaches and wonder why they struggle. Here&apos;s the difference between building wealth and wasting time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Traditional Approach */}
          <div className="bg-gray-100 border-2 border-gray-300 rounded-xl overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              <ImagePlaceholder
                promptId="comparison-traditional"
                alt="Traditional business approach"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gray-900/40" />
              <div className="absolute top-4 left-4">
                <div className="text-4xl font-bold text-gray-300">{traditionalApproach.symbol}</div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{traditionalApproach.title}</h3>
              <div className="space-y-3">
                {traditionalApproach.points.map((point, index) => (
                  <div key={index} className="border-l-4 border-gray-400 pl-3">
                    <h4 className="font-bold text-gray-800 mb-1 text-sm">{point.title}</h4>
                    <p className="text-gray-600 text-xs">{point.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Suprans Approach */}
          <div className="bg-gradient-to-br from-red-50 to-yellow-50 border-2 border-red-500 rounded-xl overflow-hidden relative shadow-xl">
            <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold z-10">
              RECOMMENDED
            </div>
            <div className="relative h-48 overflow-hidden">
              <ImagePlaceholder
                promptId="comparison-suprans"
                alt="Suprans global business approach"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-50/80 via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <div className="text-4xl font-bold text-red-600 drop-shadow-lg">{supransApproach.symbol}</div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{supransApproach.title}</h3>
              <div className="space-y-3">
                {supransApproach.points.map((point, index) => (
                  <div key={index} className="border-l-4 border-red-500 pl-3">
                    <h4 className="font-bold text-gray-900 mb-1 text-sm">{point.title}</h4>
                    <p className="text-gray-700 text-xs">{point.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


"use client"

import ImagePlaceholder from "@/components/ui/ImagePlaceholder"

const opportunityImages = [
  "opportunity-global-businesses",
  "opportunity-monthly-revenue",
  "opportunity-us-llc",
  "opportunity-india-potential",
]

const opportunities = [
  {
    number: "900,000+",
    title: "New Global Businesses in 2024",
    description: "Thousands of entrepreneurs are starting global businesses daily. Most get trapped in local markets while smart entrepreneurs focus on international expansion and make big money. The opportunity is massive.",
  },
  {
    number: "₹ 15+ Lakh",
    title: "Monthly Revenue Potential",
    description: "IT professionals and corporate managers across India are leaving stable careers to build global businesses. Average successful entrepreneurs earn ₹2.9+ lakh monthly, with many crossing ₹15+ lakh.",
  },
  {
    number: "US LLC",
    title: "is Gold vs Local Business",
    description: "US LLCs provide global credibility, access to international payment gateways, and protection of personal assets. Local businesses face limited growth and operational constraints that global structures overcome.",
  },
  {
    number: "India's",
    title: "Untapped Global Potential",
    description: "India has massive untapped potential in global business. The opportunity window is wide open for entrepreneurs who act now with the right guidance and systems.",
  },
]

export default function OpportunitySection() {
  return (
    <section className="bg-white py-20 px-4 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-red-600 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-yellow-400 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Global Business is India&apos;s Biggest Opportunity Right Now?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {opportunities.map((opp, index) => (
            <div
              key={index}
              className="bg-white border-2 border-red-200 rounded-xl overflow-hidden hover:border-red-500 hover:shadow-xl transition-all group"
            >
              <div className="relative h-48 md:h-64 overflow-hidden">
                <ImagePlaceholder
                  promptId={opportunityImages[index]}
                  alt={opp.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <div className="text-3xl md:text-4xl font-bold text-red-600 drop-shadow-lg">
                    {opp.number}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {opp.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">{opp.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center space-y-4">
          <p className="text-gray-700 text-lg">
            If you have capital and ambition, global business gives the highest success probability with least operational headaches.
          </p>
        </div>
      </div>
    </section>
  )
}


"use client"

import Link from "next/link"

export default function FinalCTA() {
  return (
    <section className="bg-gradient-to-r from-red-600 to-red-800 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Ready to Start Your Profitable Global Business?
        </h2>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Book a FREE consultation call to address your queries, gain clarity, and get tailored advice 
          that suits your unique needs.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href="/videocall"
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 inline-block"
          >
            Book Your Free Consultation Call Now
          </Link>
        </div>

        {/* Trust Signals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="text-3xl font-bold text-yellow-400 mb-2">1000+</div>
            <div className="text-white/90">Entrepreneurs Guided</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="text-3xl font-bold text-yellow-400 mb-2">24hr</div>
            <div className="text-white/90">Response Time</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="text-3xl font-bold text-yellow-400 mb-2">Free</div>
            <div className="text-white/90">Initial Consultation</div>
          </div>
        </div>
      </div>
    </section>
  )
}


"use client";

import { useState } from "react";
import Image from "next/image";
import CallbackModal from "@/components/layout/CallbackModal";
import { CallbackForm } from "@/components/home/CallbackForm";

export default function DropshippingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Dropshipping Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Sell products without inventory — we handle sourcing, storage, and shipping
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition"
          >
            Get Started Today
          </button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Our <span className="text-red-600">Dropshipping</span> Service
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Zero Inventory Risk", desc: "No need to stock products - we handle everything" },
              { title: "Global Shipping", desc: "Ship to customers worldwide with reliable logistics" },
              { title: "Quality Products", desc: "Verified suppliers and quality-checked products" },
              { title: "Competitive Pricing", desc: "Best wholesale prices direct from manufacturers" },
              { title: "Fast Fulfillment", desc: "Quick processing and shipping times" },
              { title: "24/7 Support", desc: "Dedicated support team for your business needs" },
            ].map((item, i) => (
              <div key={i} className="bg-red-50 p-6 rounded-xl border border-red-200 hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our <span className="text-red-600">Features</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                "Product sourcing from verified Chinese manufacturers",
                "Quality inspection before shipping",
                "Custom branding and packaging options",
                "Real-time inventory management",
                "Integration with major e-commerce platforms",
                "Transparent pricing with no hidden fees",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/assets/images/Dropshipping.png"
                alt="Dropshipping"
                fill
                className="object-contain bg-white p-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Dropshipping Business?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join hundreds of successful entrepreneurs who have built their business with us
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition"
          >
            Start Now
          </button>
        </div>
      </section>

      <CallbackForm />

      <CallbackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        serviceName="Dropshipping"
      />
    </div>
  );
}

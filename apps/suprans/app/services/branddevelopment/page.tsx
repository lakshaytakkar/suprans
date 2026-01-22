"use client";

import { useState } from "react";
import Image from "next/image";
import CallbackModal from "@/components/layout/CallbackModal";
import { CallbackForm } from "@/components/home/CallbackForm";

export default function BrandDevelopmentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Brand Development
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            We help you create a unique brand identity and market presence
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition"
          >
            Build Your Brand
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Brand <span className="text-red-600">Services</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Logo Design", desc: "Professional logo creation that represents your brand" },
              { title: "Website Development", desc: "Custom websites that convert visitors to customers" },
              { title: "Social Media Setup", desc: "Complete social media presence establishment" },
              { title: "Packaging Design", desc: "Eye-catching packaging that stands out" },
              { title: "Marketing Strategy", desc: "Comprehensive marketing plans for growth" },
              { title: "Content Creation", desc: "Engaging content for all your platforms" },
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
            What We <span className="text-red-600">Offer</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                "Complete brand identity design and development",
                "Professional logo and visual identity creation",
                "Custom website design and development",
                "Social media branding and setup",
                "Marketing strategy and content creation",
                "Packaging design for physical products",
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
                src="/assets/images/service-brand-development.png"
                alt="Brand Development"
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
            Ready to Build Your Brand?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Let us help you create a brand that resonates with your audience
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition"
          >
            Get Started
          </button>
        </div>
      </section>

      <CallbackForm />

      <CallbackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        serviceName="Brand Development"
      />
    </div>
  );
}

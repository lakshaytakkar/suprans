"use client";

import { useState } from "react";
import CallbackModal from "@/components/layout/CallbackModal";
import { CallbackForm } from "@/components/home/CallbackForm";

export default function USLLCPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-900 to-red-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            US LLC Formation
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Start your business in the USA with complete legal compliance
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition"
          >
            Start Your LLC
          </button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Form a <span className="text-red-600">US LLC</span>?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Limited Liability", desc: "Protect your personal assets from business debts" },
              { title: "Tax Benefits", desc: "Flexible tax options and potential savings" },
              { title: "Credibility", desc: "Gain trust with a US-registered business entity" },
              { title: "US Bank Account", desc: "Open US business bank accounts easily" },
              { title: "Payment Gateways", desc: "Access Stripe, PayPal, and other US payment processors" },
              { title: "Global Reach", desc: "Sell to US and international customers" },
            ].map((item, i) => (
              <div key={i} className="bg-blue-50 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our <span className="text-red-600">Process</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Consultation", desc: "Free consultation to understand your needs" },
              { step: "2", title: "Documentation", desc: "We prepare all required documents" },
              { step: "3", title: "Filing", desc: "Submit to state authorities" },
              { step: "4", title: "Setup", desc: "EIN, bank account, and more" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your US Business?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Get your LLC formed in 7-14 business days
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition"
          >
            Get Started Now
          </button>
        </div>
      </section>

      <CallbackForm />

      <CallbackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        serviceName="US LLC Formation"
      />
    </div>
  );
}

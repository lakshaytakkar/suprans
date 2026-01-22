"use client";

import { useState } from "react";
import CallbackModal from "@/components/layout/CallbackModal";
import { CallbackForm } from "@/components/home/CallbackForm";

export default function WatchPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-red-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Premium Watch Collection
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Discover our exclusive range of quality timepieces
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition"
          >
            Enquire Now
          </button>
        </div>
      </section>

      {/* Collection Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Our <span className="text-red-600">Collection</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Contact us for bulk enquiries and custom orders
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition"
          >
            Bulk Enquiry
          </button>
        </div>
      </section>

      <CallbackForm />

      <CallbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

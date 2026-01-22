"use client";

import { useState } from "react";
import CallbackModal from "@/components/layout/CallbackModal";
import { CallbackForm } from "@/components/home/CallbackForm";

export default function VideocallPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Book a 1:1 Video Call
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Get personalized business guidance from our experts
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition"
          >
            Book Your Call Now
          </button>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What You&apos;ll <span className="text-red-600">Get</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Expert Guidance", desc: "One-on-one consultation with industry experts" },
              { title: "Business Strategy", desc: "Customized roadmap for your business goals" },
              { title: "Direct Support", desc: "Immediate answers to your questions" },
              { title: "Flexible Scheduling", desc: "Book at a time that works for you" },
              { title: "Actionable Insights", desc: "Get practical advice you can implement immediately" },
              { title: "Follow-up Support", desc: "Continued guidance after your call" },
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
            How It <span className="text-red-600">Works</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                "Schedule your consultation at your convenience",
                "Get personalized advice tailored to your business",
                "Discuss your specific challenges and opportunities",
                "Receive actionable strategies and recommendations",
                "Access follow-up resources and support materials",
                "Connect with our team for ongoing guidance",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
            <div className="bg-red-50 p-8 rounded-xl border border-red-200">
              <h3 className="text-2xl font-bold mb-4 text-center">Why Book a Video Call?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our video consultations provide you with direct access to our expert team. 
                Whether you&apos;re just starting out or looking to scale your business, 
                we&apos;ll help you navigate challenges and identify opportunities for growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Expert Guidance?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Book your free consultation and take the first step towards business success
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition"
          >
            Book Your Call Now
          </button>
        </div>
      </section>

      {/* Form Section */}
      <CallbackForm />

      <CallbackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        serviceName="Video Consultations"
      />
    </div>
  );
}

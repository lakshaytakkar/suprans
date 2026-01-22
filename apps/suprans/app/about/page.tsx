"use client";

import Image from "next/image";
import { CallbackForm } from "@/components/home/CallbackForm";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            About Suprans
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Your Dream it. We Built it.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="text-red-600">Mission</span>
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Suprans exists to empower entrepreneurs across India and abroad
                to launch profitable, legally structured, and scalable global
                businesses — with hands-on guidance and systems that work.
              </p>
              <p className="text-lg text-gray-700">
                We believe in creating a space where ambition meets action.
                Every brand, every product, and every idea we touch is a
                reflection of that belief.
              </p>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/assets/images/sirp.JPG"
                alt="Founder"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { value: "1000+", label: "Entrepreneurs Guided" },
              { value: "8956+", label: "Happy Customers" },
              { value: "3189+", label: "Successful Businesses" },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-5xl font-bold text-red-600 mb-2">{stat.value}</h3>
                <p className="text-xl text-gray-700">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What We <span className="text-red-600">Do</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Dropshipping", desc: "Complete dropshipping solutions from product sourcing to delivery" },
              { title: "Brand Development", desc: "Build your brand identity from logo to marketing strategy" },
              { title: "US LLC Formation", desc: "Legal business setup in the United States" },
              { title: "Canton Fair Travel", desc: "Guided business trips to China&apos;s biggest trade fair" },
              { title: "Video Consultations", desc: "One-on-one guidance from industry experts" },
              { title: "Business Support", desc: "24/7 support for all your business needs" },
            ].map((item, i) => (
              <div key={i} className="bg-red-50 p-6 rounded-xl border border-red-200">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallbackForm />
    </div>
  );
}

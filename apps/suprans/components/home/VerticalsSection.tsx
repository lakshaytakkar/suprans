"use client"

import Link from "next/link"
import { verticals } from "@/lib/data/verticals"

export default function VerticalsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-medium text-gray-700 mb-2">Our</h2>
          <h1 className="text-5xl font-bold text-red-600 mb-4">Brands & Verticals</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Suprans operates multiple specialized brands, each focused on delivering excellence in their domain
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {verticals.map((vertical) => (
            <div
              key={vertical.id}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border-2 border-gray-200 hover:border-red-300 hover:shadow-xl transition-all duration-300 group"
            >
              <div
                className="w-16 h-16 rounded-full mb-4 flex items-center justify-center text-white text-2xl font-bold"
                style={{ backgroundColor: vertical.color }}
              >
                {vertical.name.charAt(0)}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                {vertical.name}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{vertical.description}</p>
              <Link
                href={vertical.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-700 font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                Visit {vertical.name}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


"use client"

import React, { useState, useEffect } from "react"
import { FaUser, FaPhone, FaEnvelope, FaCity } from "react-icons/fa"
import { X } from "lucide-react"
import { services } from "@/lib/data/services"
import { createCallbackLead } from "@/lib/actions/callback"

interface CallbackModalProps {
  isOpen: boolean
  onClose: () => void
  serviceName?: string
}

const servicesList = services.map((s) => s.title)

export default function CallbackModal({ isOpen, onClose, serviceName }: CallbackModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    services: serviceName || "",
  })
  const [loading, setLoading] = useState(false)

  // Update services when serviceName prop changes
  useEffect(() => {
    if (serviceName && isOpen) {
      setFormData((prev) => ({ ...prev, services: serviceName }))
    }
  }, [serviceName, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createCallbackLead(formData, "callback_modal")
      alert("Form submitted successfully! We'll contact you soon.")
      setFormData({ name: "", mobile: "", email: "", city: "", services: serviceName || "" })
      onClose()
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Error submitting form:", error)
      }
      const errorMessage = error instanceof Error ? error.message : "Failed to submit form. Please try again."
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  const fieldConfig = [
    { name: "name", type: "text", icon: FaUser, placeholder: "Name" },
    { name: "mobile", type: "text", icon: FaPhone, placeholder: "Mobile" },
    { name: "email", type: "email", icon: FaEnvelope, placeholder: "Email" },
    { name: "city", type: "text", icon: FaCity, placeholder: "City" },
  ] as const

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-auto">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition z-10"
        >
          <X className="w-5 h-5 text-black" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Request a Callback</h2>
          <p className="text-gray-600 text-sm mt-1">Fill in your details and we&apos;ll get back to you</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fieldConfig.map(({ name, type, icon: Icon, placeholder }) => (
            <div key={name} className="relative">
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-red-600" />
              <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                required
                className="w-full pl-10 border-2 border-red-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Select Service:
            </label>
            <div className="flex flex-wrap gap-3">
              {servicesList.map((service) => (
                <label key={service} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="services"
                    value={service}
                    checked={formData.services === service}
                    onChange={handleChange}
                    className="text-red-600 focus:ring-red-500"
                    required
                  />
                  <span className="text-sm">{service}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-full mt-4 transition-colors duration-300 hover:shadow-lg ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  )
}

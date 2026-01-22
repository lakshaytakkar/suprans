"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaUser, FaPhone, FaEnvelope, FaCity } from "react-icons/fa";
import { X } from "lucide-react";
import type { ModalProps, CallbackFormData } from "@/types";
// @ts-ignore - Server action import from app directory
import { createCallbackLead } from "../../../../apps/suprans/lib/actions/callback";

const servicesList = [
  "Brand Development",
  "Dropshipping",
  "USA LLC Formation",
  "Canton Fair",
  "Video Call",
];

export default function CallbackModal({ isOpen, onClose }: ModalProps) {
  const [formData, setFormData] = useState<CallbackFormData>({
    name: "",
    mobile: "",
    email: "",
    city: "",
    services: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out", once: true });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createCallbackLead(formData, "callback_modal_ui");
      alert("Form submitted successfully! We'll contact you soon.");
      setFormData({ name: "", mobile: "", email: "", city: "", services: "" });
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to submit form. Please try again.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const fieldConfig = [
    { name: "name", type: "text", icon: FaUser, placeholder: "Name" },
    { name: "mobile", type: "text", icon: FaPhone, placeholder: "Mobile" },
    { name: "email", type: "email", icon: FaEnvelope, placeholder: "Email" },
    { name: "city", type: "text", icon: FaCity, placeholder: "City" },
  ] as const;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-2 sm:p-3 overflow-auto">
      {/* Desktop Modal */}
      <div className="hidden md:flex relative bg-white rounded-xl shadow-2xl w-full max-w-4xl p- h-130">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition z-10"
        >
          <X className="w-5 h-5 text-black" />
        </button>

        <div className="border-2 border-red-500 rounded-lg flex flex-row overflow-hidden bg-white mt-0">
          <div className="md:w-1/2 relative h-[520px]">
            <Image
              src="/assets/images/Rectanglerobot.png"
              alt="Robot"
              fill
              className="object-cover"
            />
          </div>

          <div className="md:w-1/2 w-full p-6 space-y-4 flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-4">
              {fieldConfig.map(({ name, type, icon: Icon, placeholder }) => (
                <div key={name} className="relative">
                  <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-red-600" />
                  <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={formData[name as keyof CallbackFormData]}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 border-2 border-red-500 rounded px-3 py-2"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Services:
                </label>
                <div className="flex flex-wrap gap-4">
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
                      <span>{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="text-center font-bold text-red-600 text-xl">
                Request a <span className="text-3xl">CALLBACK</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-full mt-2 transition-colors duration-300 hover:shadow-lg ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Submitting..." : "SUBMIT"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Mobile Modal */}
      <div className="md:hidden relative bg-white rounded-lg shadow-lg w-full max-w-sm p-4 pt-9">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition"
        >
          <X className="w-4 h-4 text-black" />
        </button>

        <div className="flex flex-col space-y-4">
          {fieldConfig.map(({ name, type, icon: Icon, placeholder }) => (
            <div key={name} className="relative">
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-red-600" />
              <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={formData[name as keyof CallbackFormData]}
                onChange={handleChange}
                required
                className="w-full pl-10 border-2 border-red-500 rounded px-3 py-2 text-sm"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Services:
            </label>
            <div className="flex flex-wrap gap-2 text-sm">
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
                  <span>{service}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="text-center font-bold text-red-600 text-lg">
            Request a <span className="text-xl">CALLBACK</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className={`w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-full transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "SUBMIT"}
          </button>
        </div>
      </div>
    </div>
  );
}

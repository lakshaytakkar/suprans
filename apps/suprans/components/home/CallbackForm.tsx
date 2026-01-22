"use client";

import React, { useState, useEffect } from "react";
import AOS from "aos";
import Image from "next/image";
import { FaUser, FaPhone, FaEnvelope, FaCity } from "react-icons/fa";
import type { CallbackFormData } from "@suprans/types";
import { createCallbackLead } from "@/lib/actions/callback";

const servicesList = [
  "Brand Development",
  "Dropshipping",
  "USA LLC Formation",
  "Canton Fair",
  "Video Call",
];

export const CallbackForm: React.FC = () => {
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
      await createCallbackLead(formData, "callback_form");
      alert("Form submitted successfully! We'll contact you soon.");
      setFormData({ name: "", mobile: "", email: "", city: "", services: "" });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Error submitting form:", error);
      }
      const errorMessage = error instanceof Error ? error.message : "Failed to submit form. Please try again.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-white py-10 px-4" data-aos="fade-up">
      <Image
        src="/assets/images/F1.png"
        alt="China Flag"
        width={128}
        height={128}
        className="absolute top-10 left-0 w-24 md:w-32 z-0 hidden md:block"
      />
      <Image
        src="/assets/images/F2.png"
        alt="India Flag"
        width={128}
        height={128}
        className="absolute top-10 right-0 w-24 md:w-32 z-0 hidden md:block"
      />

      <div className="bg-red-600 text-white text-center font-semibold py-2 rounded-t-lg max-w-4xl mx-auto relative z-10">
        Fill the form and just wait, we will contact you soon
      </div>

      <div className="border-2 border-red-500 rounded-b-lg max-w-4xl mx-auto flex flex-col md:flex-row overflow-hidden mt-2 relative z-10 bg-white">
        <div className="md:w-1/2 w-full hidden md:block relative h-[490px]">
          <Image
            src="/assets/images/Rectanglerobot.png"
            alt="Robot"
            fill
            className="object-cover"
          />
        </div>

        <div className="md:w-1/2 w-full p-6 space-y-4 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-600" />
              <input
                name="name"
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-10 border-2 border-red-500 rounded px-3 py-2"
              />
            </div>

            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-600" />
              <input
                name="mobile"
                type="tel"
                placeholder="Mobile no:"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full pl-10 border-2 border-red-500 rounded px-3 py-2"
              />
            </div>

            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-600" />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 border-2 border-red-500 rounded px-3 py-2"
              />
            </div>

            <div className="relative">
              <FaCity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-600" />
              <input
                name="city"
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full pl-10 border-2 border-red-500 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Services:
              </label>
              <div className="flex flex-wrap gap-4">
                {servicesList.map((service) => (
                  <label
                    key={service}
                    className="flex items-center gap-2 cursor-pointer"
                  >
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
    </section>
  );
};

export default CallbackForm;

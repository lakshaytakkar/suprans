"use client";

import { useState } from "react";
import type { ModalProps, RegisterFormData, CountryCode } from "@/types";
// @ts-ignore - Server action import from app directory
import { createRegistrationLead } from "../../../../apps/suprans/lib/actions/registration";

const countryCodes: CountryCode[] = [
  { code: "+92", name: "Pakistan" },
  { code: "+94", name: "Sri Lanka" },
  { code: "+880", name: "Bangladesh" },
  { code: "+91", name: "India" },
  { code: "+977", name: "Nepal" },
  { code: "+61", name: "Australia" },
  { code: "+1", name: "USA" },
  { code: "+44", name: "England" },
  { code: "+27", name: "South Africa" },
  { code: "other", name: "Other (Enter manually)" },
];

const servicesOptions = [
  "Brand Development",
  "Dropshipping",
  "USA LLC Formation",
  "Canton Fair",
  "Video Call",
  "Watch",
];

export default function RegisterModal({ isOpen, onClose }: ModalProps) {
  const [form, setForm] = useState<RegisterFormData>({
    name: "",
    email: "",
    countryCode: "+91",
    otherCountryCode: "",
    whatsapp: "",
    age: "",
    services: "",
    whoAreYou: "Entrepreneur",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!form.name || !form.email || !form.whatsapp || !form.services) {
      setError("Please fill all required fields");
      setLoading(false);
      return;
    }

    const countryCodeToUse =
      form.countryCode === "other" ? form.otherCountryCode.trim() : form.countryCode;

    if (!countryCodeToUse) {
      setError("Please enter a valid country code.");
      setLoading(false);
      return;
    }

    try {
      await createRegistrationLead(form);
      
      setSuccess("Registration successful!");
      setForm({
        name: "",
        email: "",
        countryCode: "+91",
        otherCountryCode: "",
        whatsapp: "",
        age: "",
        services: "",
        whoAreYou: "Entrepreneur",
      });

      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 2000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to submit form. Please try again.";
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "transparent" }}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:max-w-lg md:p-10"
        style={{ minWidth: "280px" }}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="flex items-center text-2xl sm:text-3xl font-extrabold mb-6">
          <span>Register Now</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />

          <div className="flex gap-2">
            <select
              name="countryCode"
              value={form.countryCode}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-20 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            >
              {countryCodes.map(({ code, name }) => (
                <option key={code} value={code}>
                  {code !== "other" ? `${code} (${name.slice(0, 3)})` : name}
                </option>
              ))}
            </select>

            {form.countryCode === "other" && (
              <input
                name="otherCountryCode"
                type="text"
                placeholder="Code"
                value={form.otherCountryCode}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 w-20 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            )}

            <input
              name="whatsapp"
              type="tel"
              placeholder="WhatsApp Number"
              value={form.whatsapp}
              onChange={handleChange}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          <input
            name="age"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          <select
            name="services"
            value={form.services}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          >
            <option value="" disabled>
              Select Service
            </option>
            {servicesOptions.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>

          <fieldset className="space-y-2">
            <legend className="font-semibold text-gray-900">Who are you?</legend>
            <div className="flex flex-wrap gap-4">
              {["Entrepreneur", "Professional", "Student", "Womenpreneur"].map((option) => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer text-gray-700">
                  <input
                    type="radio"
                    name="whoAreYou"
                    value={option}
                    checked={form.whoAreYou === option}
                    onChange={handleChange}
                    required
                    className="form-radio h-5 w-5 text-red-600"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {error && <p className="text-red-600 text-center">{error}</p>}
          {success && <p className="text-green-600 text-center">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold text-base sm:text-lg transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register Now"}
          </button>
        </form>
      </div>
    </div>
  );
}

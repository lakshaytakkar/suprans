"use client";

import { CallbackForm } from "@/components/home/CallbackForm";

export default function ContactFormPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-red-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-xl opacity-90">
            Get in touch with our team for any inquiries
          </p>
        </div>
      </section>

      {/* Form Section */}
      <CallbackForm />

      {/* Contact Info */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Other Ways to <span className="text-red-600">Reach Us</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-600">ds@suprans.in</p>
              <p className="text-gray-600">info@suprans.in</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">9350830133</p>
              <p className="text-gray-600">9350818272</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
              <a
                href="https://wa.me/9350818272"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:underline"
              >
                Chat with us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

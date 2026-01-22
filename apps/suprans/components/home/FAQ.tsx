"use client";

import React, { useState, useEffect } from "react";
import AOS from "aos";

const categories = ["Dropshipping", "Brand Development", "US LLC Services", "General Questions"];

const faqs: Record<string, { question: string; answer: string }[]> = {
  Dropshipping: [
    {
      question: "What is dropshipping, and how does your service work?",
      answer:
        "Dropshipping is a business model where you don't need to keep inventory. We provide product sourcing, order fulfillment, and shipping directly to your customers under your brand. You focus on marketing and sales, while we handle the logistics.",
    },
    {
      question: "Can I sell globally with your dropshipping service?",
      answer:
        "Yes, we support international shipping and help you expand your business worldwide.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping usually takes 7–14 days, depending on the destination. We also offer faster shipping options in certain regions.",
    },
  ],
  "Brand Development": [
    {
      question: "What do your brand development services include?",
      answer:
        "We help you build a professional brand identity, including logo design, website creation, social media setup, and packaging design.",
    },
    {
      question: "Can you help me scale my brand?",
      answer:
        "Yes. Our team provides marketing strategies, content creation, and growth consultation to scale your brand effectively.",
    },
    {
      question: "Do you customize the services based on my niche?",
      answer:
        "Absolutely. Every business is different, so we tailor our brand development services to fit your industry and goals.",
    },
    {
      question: "Will you manage my social media accounts?",
      answer:
        "Yes, we offer social media management as part of our brand development service if required.",
    },
  ],
  "US LLC Services": [
    {
      question: "What is an LLC, and why should I register one in the US?",
      answer:
        "A Limited Liability Company (LLC) is a legal business structure in the United States that protects your personal assets, helps build credibility, and allows you to open US bank accounts and payment gateways like Stripe.",
    },
    {
      question: "Can non-US residents register an LLC through you?",
      answer:
        "Yes. We assist international entrepreneurs in registering and managing their US LLC without needing to visit the United States.",
    },
    {
      question: "Do you also help with EIN and Bank Account setup?",
      answer:
        "Yes, we provide complete assistance in getting your EIN (Employer Identification Number) and US bank account setup.",
    },
    {
      question: "How long does it take to form a US LLC?",
      answer:
        "It usually takes 7–14 business days, depending on state processing times.",
    },
  ],
  "General Questions": [
    {
      question: "Why should I choose your company over others?",
      answer:
        "We provide an all-in-one solution—dropshipping, brand development, and US LLC setup—so you don't need to work with multiple providers. Our team ensures fast, reliable, and professional service.",
    },
    {
      question: "Do I need technical knowledge to get started?",
      answer:
        "No. We handle the technical side for you, and our team guides you step-by-step.",
    },
    {
      question: "How can I get started?",
      answer:
        "Simply contact us through our website or customer support. We'll help you choose the best service package for your business goals.",
    },
    {
      question: "Do you provide ongoing support?",
      answer:
        "Yes, we provide continuous support even after setup to ensure your business runs smoothly.",
    },
  ],
};

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("Dropshipping");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-center">
      <h2 className="text-3xl font-bold mb-2" data-aos="fade-down">
        Frequently Asked <span className="text-red-600">Questions</span>
      </h2>

      <p
        className="text-sm text-gray-600 mb-8 max-w-xl mx-auto"
        data-aos="fade-down"
        data-aos-delay="150"
      >
        Got a question? Chances are, it&apos;s been asked before! Explore our
        collection of frequently asked questions.
      </p>

      <div
        className="flex justify-center flex-wrap gap-4 mb-10"
        data-aos="fade-up"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setOpenIndex(null);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeCategory === cat
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="text-left space-y-4 max-w-3xl mx-auto">
        {faqs[activeCategory] && faqs[activeCategory].length > 0 ? (
          faqs[activeCategory].map((item, index) => (
            <div
              key={index}
              onClick={() => toggle(index)}
              className="cursor-pointer border-b pb-3 rounded-md transition-colors duration-300 hover:bg-red-50"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex justify-between items-center">
                <p className="font-medium">{item.question}</p>
                <span className="text-xl select-none">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>
              {openIndex === index && (
                <div className="mt-2 text-sm text-gray-600">{item.answer}</div>
              )}
            </div>
          ))
        ) : (
          <p
            className="text-sm text-gray-500 text-center"
            data-aos="fade-up"
          >
            No FAQs available in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}

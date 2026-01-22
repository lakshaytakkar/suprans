"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaArrowUp,
} from "react-icons/fa";
import { useState } from "react";
import SalesModal from "../modal/SalesModal";
import CallbackModal from "../modal/CallbackModal";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-gray-100 text-gray-700 px-4 sm:px-6 pt-10 pb-32 md:pb-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold text-black">Suprans</h2>
          <p className="text-sm md:text-base leading-relaxed">
            Get your U.S. company today. With our expert support at every step,
            we make it easy to get your company online and running smoothly.
          </p>
          <div className="flex items-start gap-2 text-sm md:text-base flex-wrap">
            <FaEnvelope className="text-red-600 mt-1" />
            <span>
              ds@suprans.in, info@suprans.in, travel@suprans.in
            </span>
          </div>
          <div className="flex items-start gap-2 text-sm md:text-base flex-wrap">
            <FaPhone className="text-red-600 mt-1" />
            <span>
              9350830133, 9350818272, 7988702534, 9306524544, 7988514291,
              9817376457
            </span>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3 text-black">Legal</h3>
          <ul className="space-y-2 text-sm md:text-base">
            <li>
              <Link href="/terms" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3 text-black">Follow Us</h3>
          <div className="flex space-x-4 text-red-600 text-xl">
            <a
              href="https://www.facebook.com/supranschina/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-125 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.linkedin.com/in/sanjay-suprans"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-125 transition"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://www.instagram.com/suprans.china/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-125 transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 mt-10 bg-white shadow rounded-xl text-center sm:text-left">
        <h4 className="text-lg md:text-xl font-semibold text-red-600 mb-2">
          Instant Support via WhatsApp
        </h4>
        <p className="text-gray-600 mb-4 text-sm md:text-base">
          Reach out to us directly on WhatsApp for quick support. We&apos;re here to
          help!
        </p>
        <a
          href="https://wa.me/9350818272"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="flex items-center justify-center sm:justify-start gap-2 px-6 py-2 border border-red-600 text-red-700 rounded-full transition-all hover:scale-105 hover:shadow-lg text-sm md:text-base">
            <FaWhatsapp /> WhatsApp Support
          </button>
        </a>
        <hr className="mt-6 border-gray-300" />
      </div>

      <div className="max-w-6xl mx-auto mt-10 text-xs sm:text-sm md:text-base space-y-3 text-gray-600 px-2">
        <p>&copy; 2025 Leegal. All rights reserved.</p>
        <p>
          Leegal products may not be available to all customers. Terms and
          conditions apply and are subject to change.
        </p>
        <p>
          We are not a law firm, nor can we offer official legal advice. What
          you see on our website, and any of our communication over email,
          WhatsApp, Slack, SMS, Zoom, Intercom, or social media is purely for
          general and educational purposes, and should not be taken as official
          legal advice.
        </p>
        <p>
          By using our website and services, you explicitly accept our Terms of
          Service and Privacy Policy.
        </p>
      </div>

      <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 transition"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-300 flex justify-around py-3 shadow-lg">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-white rounded-full
                     bg-gradient-to-r from-red-600 via-red-800 to-black
                     shadow-md hover:shadow-lg hover:scale-105
                     transition-all duration-300 text-sm"
        >
          <FaPhone />
          Call Expert
        </button>

        <button
          onClick={() => setIsModalOpen2(true)}
          className="px-6 py-2 rounded-full font-semibold text-white
                     bg-gradient-to-r from-red-600 via-red-800 to-black
                     shadow-md hover:shadow-lg hover:scale-105
                     transition-all duration-300 text-sm"
        >
          Book Now
        </button>
      </div>

      <SalesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <CallbackModal
        isOpen={isModalOpen2}
        onClose={() => setIsModalOpen2(false)}
      />
    </footer>
  );
};

export default Footer;

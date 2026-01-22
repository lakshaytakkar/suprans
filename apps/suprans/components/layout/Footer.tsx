"use client"

import Link from "next/link"
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaArrowUp,
  FaYoutube,
} from "react-icons/fa"
import { services, serviceCategories } from "@/lib/data/services"
import { verticals } from "@/lib/data/verticals"

interface FooterProps {
  onOpenModal?: () => void
}

const Footer = ({ onOpenModal }: FooterProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <footer className="w-full bg-gradient-to-br from-gray-50 to-white border-t border-gray-200">
        {/* Main Footer Content */}
        <div className="w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Company Info */}
              <div className="lg:col-span-2 space-y-4">
                <Link href="/" className="inline-block">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Suprans<span className="text-red-600">.</span>
                  </h2>
                </Link>
                <p className="text-gray-600 text-sm leading-relaxed max-w-md">
                  Guiding 1000+ entrepreneurs across India and abroad to launch profitable, legally structured, 
                  and scalable global businesses — with hands-on guidance and systems that work.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <FaEnvelope className="text-red-600 mt-1 flex-shrink-0" />
                    <div className="text-sm text-gray-600">
                      <div>ds@suprans.in</div>
                      <div>info@suprans.in</div>
                      <div>travel@suprans.in</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaPhone className="text-red-600 mt-1 flex-shrink-0" />
                    <div className="text-sm text-gray-600">
                      <div>+91 9350830133</div>
                      <div>+91 9350818272</div>
                      <div>+91 7988702534</div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-2">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Follow Us</h4>
                  <div className="flex gap-4">
                    <a
                      href="https://www.facebook.com/supranschina/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-all"
                      aria-label="Facebook"
                    >
                      <FaFacebookF />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/sanjay-suprans"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-all"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedinIn />
                    </a>
                    <a
                      href="https://www.instagram.com/suprans.china/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-all"
                      aria-label="Instagram"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href="https://youtube.com/@suprans"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-all"
                      aria-label="YouTube"
                    >
                      <FaYoutube />
                    </a>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Services</h3>
                <ul className="space-y-2">
                  {services.slice(0, 5).map((service) => (
                    <li key={service.id}>
                      <Link
                        href={service.href}
                        className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/services"
                      className="text-sm text-red-600 hover:text-red-700 font-semibold"
                    >
                      View All Services →
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-sm text-gray-600 hover:text-red-600 transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-sm text-gray-600 hover:text-red-600 transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/videocall" className="text-sm text-gray-600 hover:text-red-600 transition-colors">
                      Book Consultation
                    </Link>
                  </li>
                  <li>
                    <Link href="/contactform1" className="text-sm text-gray-600 hover:text-red-600 transition-colors">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/travel" className="text-sm text-gray-600 hover:text-red-600 transition-colors">
                      Canton Fair Travel
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Our Brands */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Our Brands</h3>
                <ul className="space-y-2">
                  {verticals.map((vertical) => (
                    <li key={vertical.id}>
                      <a
                        href={vertical.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                      >
                        {vertical.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* WhatsApp Support Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-center md:text-left">
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                      Instant Support via WhatsApp
                    </h4>
                    <p className="text-sm md:text-base text-gray-700">
                      Reach out to us directly on WhatsApp for quick support. We&apos;re here to help!
                    </p>
                  </div>
                  <a
                    href="https://wa.me/919350818272"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105 whitespace-nowrap"
                  >
                    <FaWhatsapp className="text-xl" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full bg-gray-900 text-gray-300 py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left text-sm">
                <p>&copy; {new Date().getFullYear()} Suprans. All rights reserved.</p>
                <p className="text-xs text-gray-400 mt-1">
                  Suprans products may not be available to all customers. Terms and conditions apply.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <span className="text-gray-600">|</span>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
                <span className="text-gray-600">|</span>
                <button
                  onClick={scrollToTop}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                  aria-label="Scroll to top"
                >
                  <FaArrowUp />
                  <span className="hidden sm:inline">Back to Top</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t-2 border-red-600 shadow-2xl">
        <div className="flex justify-around items-center py-3 px-2">
          <a
            href="tel:+919350830133"
            className="flex flex-col items-center gap-1 px-3 py-2 text-red-600 hover:text-red-700 transition-colors"
          >
            <FaPhone className="text-xl" />
            <span className="text-xs font-semibold">Call</span>
          </a>
          <a
            href="https://wa.me/919350818272"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 px-3 py-2 text-green-600 hover:text-green-700 transition-colors"
          >
            <FaWhatsapp className="text-xl" />
            <span className="text-xs font-semibold">WhatsApp</span>
          </a>
          <button
            onClick={onOpenModal}
            className="flex-1 mx-2 px-4 py-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-bold text-sm shadow-lg hover:shadow-xl transition-all"
          >
            Book Consultation
          </button>
        </div>
      </div>
    </>
  )
}

export default Footer

"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi"
import { serviceCategories } from "@/lib/data/services"
import MobileNav from "./MobileNav"

interface NavbarProps {
  onOpenModal?: () => void
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [spacerHeight, setSpacerHeight] = useState(0)
  const pathname = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function updateHeight() {
      if (containerRef.current) {
        setSpacerHeight(containerRef.current.offsetHeight)
      }
    }
    updateHeight()
    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      setSpacerHeight(containerRef.current.offsetHeight)
    }
  }, [isMenuOpen])

  const isActive = (path: string) => pathname === path

  const navLinkClass = (path: string) =>
    isActive(path)
      ? "text-red-600 font-semibold block w-full"
      : "text-gray-700 hover:text-red-600 transition duration-150 block w-full"

  return (
    <>
      <div ref={containerRef} className="fixed top-0 left-0 w-full z-50">
        {/* Top Banner */}
        <div className="bg-red-600 text-white text-xs sm:text-sm py-2 text-center px-4">
          Canton Fair 137th Phase 1 starting April 15th, 2025. Register Now!
        </div>

        <nav className="flex items-center justify-between bg-white px-4 sm:px-6 py-3 shadow-md">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-black">
            Suprans<span className="text-red-600">.</span>
          </Link>

          <ul className="hidden md:flex space-x-6 text-gray-700 font-medium items-center">
            <li>
              <Link href="/" className={navLinkClass("/")}>
                Home
              </Link>
            </li>
            <li className="relative group">
              <button
                className={`flex items-center gap-1 ${navLinkClass("/services")}`}
                onMouseEnter={() => {}}
              >
                Services
                <FiChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-white shadow-lg rounded-lg z-50 min-w-[600px] p-4">
                <div className="grid grid-cols-2 gap-4">
                  {serviceCategories.map((category) => (
                    <div key={category.id} className="space-y-2">
                      <h3 className="font-semibold text-red-600 text-sm uppercase tracking-wide">
                        {category.name}
                      </h3>
                      <ul className="space-y-1">
                        {category.services.map((service) => (
                          <li key={service.id}>
                            <Link
                              href={service.href}
                              className="px-3 py-2 text-gray-800 hover:bg-red-50 hover:text-red-600 block rounded-md text-sm transition-colors"
                            >
                              {service.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link
                    href="/services"
                    className="text-red-600 hover:text-red-700 font-semibold text-sm block text-center"
                  >
                    View All Services →
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <Link href="/about" className={navLinkClass("/about")}>
                About
              </Link>
            </li>
            <li>
              <Link href="/contactform1" className={navLinkClass("/contactform1")}>
                Contact
              </Link>
            </li>
          </ul>

          <div className="hidden md:block">
            <button
              onClick={onOpenModal}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-md transition-all hover:scale-105 touch-target"
            >
              Book Free Consultation
            </button>
          </div>

          <button
            className="md:hidden text-2xl text-red-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </nav>
      </div>

      <div style={{ height: spacerHeight }} />

      <MobileNav
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenModal={onOpenModal}
        spacerHeight={spacerHeight}
      />
    </>
  )
}

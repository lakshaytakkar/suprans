"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FiMenu, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi"
import { serviceCategories } from "@/lib/data/services"

interface MobileNavProps {
  onOpenModal?: () => void
  isOpen: boolean
  onClose: () => void
  spacerHeight: number
}

export default function MobileNav({ onOpenModal, isOpen, onClose, spacerHeight }: MobileNavProps) {
  const pathname = usePathname()
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  const isActive = (path: string) => pathname === path

  const navLinkClass = (path: string) =>
    isActive(path)
      ? "text-red-600 font-semibold block w-full py-3"
      : "text-gray-700 hover:text-red-600 transition duration-150 block w-full py-3"

  if (!isOpen) return null

  return (
    <div
      className="md:hidden bg-white shadow-lg px-6 py-6 space-y-2 fixed left-0 w-full z-40 overflow-y-auto max-h-[calc(100vh-80px)]"
      style={{ top: spacerHeight }}
    >
      <Link href="/" className={navLinkClass("/")} onClick={onClose}>
        Home
      </Link>

      {/* Services with Categories */}
      <div className="space-y-2">
        <button
          className="flex items-center justify-between w-full py-3 font-medium text-gray-700 hover:text-red-600"
          onClick={() => setOpenCategory(openCategory === "services" ? null : "services")}
        >
          <span>Services</span>
          {openCategory === "services" ? (
            <FiChevronUp className="h-5 w-5" />
          ) : (
            <FiChevronDown className="h-5 w-5" />
          )}
        </button>

        {openCategory === "services" && (
          <div className="pl-4 space-y-4 border-l-2 border-red-100">
            {serviceCategories.map((category) => (
              <div key={category.id}>
                <h4 className="font-semibold text-red-600 text-sm uppercase tracking-wide mb-2">
                  {category.name}
                </h4>
                <ul className="space-y-2 pl-2">
                  {category.services.map((service) => (
                    <li key={service.id}>
                      <Link
                        href={service.href}
                        className="block text-gray-700 hover:text-red-600 text-sm py-2"
                        onClick={onClose}
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Link
              href="/services"
              className="block text-red-600 font-semibold text-sm mt-4 pt-4 border-t border-gray-200"
              onClick={onClose}
            >
              View All Services →
            </Link>
          </div>
        )}
      </div>

      <Link href="/about" className={navLinkClass("/about")} onClick={onClose}>
        About
      </Link>

      <Link href="/contactform1" className={navLinkClass("/contactform1")} onClick={onClose}>
        Contact
      </Link>

      <div className="pt-4 border-t border-gray-200 mt-4">
          <button
            onClick={() => {
              onClose()
              onOpenModal?.()
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-4 rounded-full font-semibold shadow-md w-full transition-all touch-target"
          >
            Book Free Consultation
          </button>
      </div>
    </div>
  )
}


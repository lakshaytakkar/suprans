"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import TopBanner from "./TopBanner";
import CallbackModal from "../modal/CallbackModal";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spacerHeight, setSpacerHeight] = useState(0);
  const pathname = usePathname();

  const containerRef = useRef<HTMLDivElement>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    function updateHeight() {
      if (containerRef.current) {
        setSpacerHeight(containerRef.current.offsetHeight);
      }
    }
    updateHeight();

    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setSpacerHeight(containerRef.current.offsetHeight);
    }
  }, [isMenuOpen]);

  const isActive = (path: string) => pathname === path;

  const navLinkClass = (path: string) =>
    isActive(path)
      ? "text-red-600 font-semibold block w-full"
      : "text-gray-700 hover:text-red-600 transition duration-150 block w-full";

  return (
    <>
      <div ref={containerRef} className="fixed top-0 left-0 w-full z-50">
        <TopBanner />
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
              <Link href="/services/dropshipping" className={navLinkClass("/services/dropshipping")}>
                Services
              </Link>
              <ul className="absolute left-0 top-full mt-2 hidden group-hover:flex flex-col bg-white shadow-md rounded-md z-50 w-48">
                <li>
                  <Link
                    href="/services/dropshipping"
                    className="px-4 py-2 text-gray-800 hover:bg-red-50 block"
                  >
                    Dropshipping
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/videocall" className={navLinkClass("/videocall")}>
                Video Call
              </Link>
            </li>
            <li>
              <Link href="/cantonchinatravel" className={navLinkClass("/cantonchinatravel")}>
                Canton China Travel
              </Link>
            </li>
          </ul>

          <div className="hidden md:block">
            <button
              onClick={openModal}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full font-semibold shadow-md"
            >
              Book a CALL
            </button>
          </div>

          <button
            className="md:hidden text-2xl text-red-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
          <CallbackModal isOpen={isModalOpen} onClose={closeModal} />
        </nav>
      </div>

      <div style={{ height: spacerHeight }} />

      {isMenuOpen && (
        <div
          className="md:hidden bg-white shadow-lg px-6 py-6 space-y-4 fixed left-0 w-full z-40"
          style={{ top: spacerHeight }}
        >
          <Link
            href="/"
            className={navLinkClass("/")}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>

          <details className="group">
            <summary className="cursor-pointer font-medium hover:text-red-600">
              Services
            </summary>
            <ul className="pl-4 mt-2 space-y-2">
              <li>
                <Link
                  href="/services/dropshipping"
                  className="block hover:text-red-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dropshipping
                </Link>
              </li>
            </ul>
          </details>

          <Link
            href="/videocall"
            className={navLinkClass("/videocall")}
            onClick={() => setIsMenuOpen(false)}
          >
            Video Call
          </Link>

          <Link
            href="/cantonchinatravel"
            className={navLinkClass("/cantonchinatravel")}
            onClick={() => setIsMenuOpen(false)}
          >
            Canton China Travel
          </Link>

          <button
            onClick={openModal}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-full font-semibold shadow-md w-full"
          >
            Book a CALL
          </button>
        </div>
      )}
    </>
  );
}

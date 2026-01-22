"use client"

import { useState } from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import CallbackModal from "./CallbackModal"
import { AnalyticsProvider } from "../providers/AnalyticsProvider"
import { PublicProviders } from "../providers/PublicProviders"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <PublicProviders>
      <AnalyticsProvider>
        <div className="min-h-screen bg-white">
          <Navbar onOpenModal={openModal} />
          <main>{children}</main>
          <Footer onOpenModal={openModal} />
          <CallbackModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
      </AnalyticsProvider>
    </PublicProviders>
  )
}


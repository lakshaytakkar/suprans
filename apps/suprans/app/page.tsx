"use client"

import { useRef, useState } from "react"
import Hero from "../components/home/Hero"
import FeaturedIn from "../components/home/FeaturedIn"
import BusinessStats from "../components/home/BusinessStats"
// import OpportunitySection from "../components/home/OpportunitySection"
// import ComparisonSection from "../components/home/ComparisonSection"
import ServicesSection from "../components/home/ServicesSection"
import ProcessVisual from "../components/home/ProcessVisual"
// import ImageGallery from "../components/home/ImageGallery"
import CustomerStories from "../components/home/Testimonials"
import FoundersNote from "../components/home/FoundersNote"
import FinalCTA from "../components/home/FinalCTA"
import FAQ from "../components/home/FAQ"
import { InquiryFormModal } from "../components/home/InquiryFormModal"
import { MessageCircle } from "lucide-react"

export default function HomePage() {
  const servicesRef = useRef<HTMLDivElement>(null)
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false)

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      {/* Hero Section - Dark, Bold, Full Screen */}
      <Hero onScrollToServices={scrollToServices} />

      {/* Featured In - Media Logos */}
      <FeaturedIn />

      {/* Animated Stats - Dark Theme */}
      <BusinessStats />

      {/* Opportunity Section - Why Global Business */}
      {/* <OpportunitySection /> */}

      {/* Comparison Section - Traditional vs Suprans */}
      {/* <ComparisonSection /> */}

      {/* Services Section - Large Cards with Badges */}
      <div ref={servicesRef}>
        <ServicesSection />
      </div>

      {/* Process/How It Works - Visual Steps */}
      <ProcessVisual />

      {/* Image Gallery - Visual Showcase */}
      {/* <ImageGallery /> */}

      {/* Customer Stories - Video Grid */}
      <CustomerStories />

      {/* Founder Story - Narrative Format */}
      <FoundersNote />

      {/* Final CTA Section */}
      <FinalCTA />

      {/* FAQ - Address Concerns */}
      <FAQ />

      {/* Floating Inquiry Button */}
      <button
        onClick={() => setIsInquiryModalOpen(true)}
        className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center gap-2 group"
        aria-label="Open inquiry form"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden sm:inline-block font-semibold pr-2">Inquiry</span>
      </button>

      {/* Inquiry Form Modal */}
      <InquiryFormModal 
        open={isInquiryModalOpen} 
        onOpenChange={setIsInquiryModalOpen} 
      />
    </>
  )
}

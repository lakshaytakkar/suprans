"use client"

import { useEffect } from "react"

export default function BookConsultationPage() {
  useEffect(() => {
    // Redirect to Odoo appointment scheduler
    window.location.href = "https://suprans1.odoo.com/appointment/18"
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Redirecting to appointment scheduler...</p>
        <p className="text-gray-500 text-sm mt-2">
          If you are not redirected automatically,{" "}
          <a
            href="https://suprans1.odoo.com/appointment/18"
            className="text-red-600 hover:underline"
          >
            click here
          </a>
        </p>
      </div>
    </div>
  )
}


import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Suprans China - Read our terms and conditions for using our services.',
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use License</h2>
            <p className="text-gray-700">
              Permission is granted to temporarily access the materials on Suprans China's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Services</h2>
            <p className="text-gray-700">
              Suprans China provides business development services including but not limited to dropshipping, brand development, US LLC formation, Canton Fair travel, and video consultations. All services are subject to availability and our terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Disclaimer</h2>
            <p className="text-gray-700">
              The materials on Suprans China's website are provided on an 'as is' basis. Suprans China makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Limitations</h2>
            <p className="text-gray-700">
              In no event shall Suprans China or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Suprans China's website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Accuracy of Materials</h2>
            <p className="text-gray-700">
              The materials appearing on Suprans China's website could include technical, typographical, or photographic errors. Suprans China does not warrant that any of the materials on its website are accurate, complete, or current.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Links</h2>
            <p className="text-gray-700">
              Suprans China has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Suprans China of the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Modifications</h2>
            <p className="text-gray-700">
              Suprans China may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Governing Law</h2>
            <p className="text-gray-700">
              These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Information</h2>
            <p className="text-gray-700">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <ul className="list-none text-gray-700 space-y-2 mt-4">
              <li>Email: info@suprans.com</li>
              <li>Phone: +91-9350830133</li>
              <li>Website: <a href="https://suprans.com" className="text-red-600 hover:underline">https://suprans.com</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}


import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Suprans China - Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-gray-700">
              We collect information that you provide directly to us when you:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Fill out inquiry forms on our website</li>
              <li>Register for our services</li>
              <li>Contact us through our contact forms</li>
              <li>Subscribe to our newsletter or updates</li>
            </ul>
            <p className="text-gray-700 mt-4">
              The information we collect may include your name, email address, phone number, city, and information about the services you are interested in.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send you information about our services</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Storage and Security</h2>
            <p className="text-gray-700">
              We take appropriate security measures to protect your personal information. Your data is stored securely and is only accessible to authorized personnel who need it to perform their duties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Your Rights</h2>
            <p className="text-gray-700">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal information</li>
              <li>Object to processing of your personal information</li>
              <li>Request restriction of processing</li>
            </ul>
            <p className="text-gray-700 mt-4">
              To exercise these rights, please contact us at the information provided below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Cookies</h2>
            <p className="text-gray-700">
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Third-Party Services</h2>
            <p className="text-gray-700">
              We may use third-party services that collect, monitor, and analyze information to help us improve our services. These third parties have their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to This Privacy Policy</h2>
            <p className="text-gray-700">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy, please contact us:
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


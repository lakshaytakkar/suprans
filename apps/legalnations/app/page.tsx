export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Start Your US Business Today
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Expert LLC formation, EIN applications, and compliance services for entrepreneurs worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition">
              Get Started
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "LLC Formation", desc: "Register your US LLC in any state with complete documentation", icon: "🏢" },
              { title: "EIN Application", desc: "Get your Employer Identification Number quickly", icon: "📋" },
              { title: "Bank Account", desc: "Open US business bank accounts remotely", icon: "🏦" },
              { title: "Compliance", desc: "Annual reports, registered agent, and more", icon: "✅" },
              { title: "Payment Gateway", desc: "Access Stripe, PayPal, and US payment processors", icon: "💳" },
              { title: "Tax Advisory", desc: "US tax compliance and optimization strategies", icon: "📊" },
            ].map((service, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your US Business?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of entrepreneurs who have successfully launched their US companies with LegalNations
          </p>
          <button className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition">
            Schedule a Free Consultation
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">LegalNations</h3>
          <p className="text-gray-400 mb-4">Your trusted partner for US business formation</p>
          <p className="text-gray-500 text-sm">© 2025 LegalNations. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

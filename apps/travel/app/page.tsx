export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-600 to-teal-500 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Canton Fair & China Travel
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Complete travel packages for Canton Fair with visa assistance, accommodation, and business support
          </p>
          <button className="bg-white text-cyan-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition">
            View Packages
          </button>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Travel Packages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Basic", price: "$999", features: ["Visa Assistance", "Hotel Booking", "Fair Entry Pass", "Airport Transfer"] },
              { name: "Business", price: "$1,999", features: ["All Basic Features", "Interpreter Service", "Factory Visits", "Supplier Meetings", "Business Lounge Access"] },
              { name: "Premium", price: "$3,999", features: ["All Business Features", "Private Guide", "VIP Entry", "Executive Accommodation", "24/7 Support"] },
            ].map((pkg, i) => (
              <div key={i} className={`border rounded-xl p-6 ${i === 1 ? "border-cyan-500 shadow-lg" : "border-gray-200"}`}>
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-3xl font-bold text-cyan-600 mb-4">{pkg.price}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition">
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Suprans Travel</h3>
          <p className="text-gray-400 mb-4">Your gateway to China business</p>
          <p className="text-gray-500 text-sm">© 2025 Suprans Travel. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

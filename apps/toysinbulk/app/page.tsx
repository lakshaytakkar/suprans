export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Wholesale Toys & Games
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Premium quality toys at bulk prices. Perfect for retailers, distributors, and resellers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition">
              Browse Catalog
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition">
              Request Quote
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Product Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Action Figures", emoji: "🦸" },
              { name: "Board Games", emoji: "🎲" },
              { name: "Educational Toys", emoji: "📚" },
              { name: "Outdoor Toys", emoji: "⚽" },
              { name: "Dolls & Accessories", emoji: "👧" },
              { name: "Building Blocks", emoji: "🧱" },
              { name: "Remote Control", emoji: "🎮" },
              { name: "Puzzles", emoji: "🧩" },
            ].map((cat, i) => (
              <div key={i} className="bg-amber-50 p-6 rounded-xl text-center hover:shadow-lg transition cursor-pointer">
                <div className="text-4xl mb-3">{cat.emoji}</div>
                <h3 className="font-semibold">{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Toys in Bulk?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Competitive Pricing", desc: "Best wholesale rates with volume discounts" },
              { title: "Quality Assured", desc: "All products meet safety standards" },
              { title: "Fast Shipping", desc: "Quick delivery worldwide" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Toys in Bulk</h3>
          <p className="text-gray-400 mb-4">Your wholesale toy partner</p>
          <p className="text-gray-500 text-sm">© 2025 Toys in Bulk. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

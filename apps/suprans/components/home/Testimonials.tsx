"use client"

interface VideoTestimonial {
  id: string
  title: string
  embedUrl: string
}

const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: "GwQWsHjYhPc",
    title: "Client Testimonial 1",
    embedUrl: "https://www.youtube.com/embed/GwQWsHjYhPc",
  },
  {
    id: "lXsiTL9bDIc",
    title: "Client Testimonial 2",
    embedUrl: "https://www.youtube.com/embed/lXsiTL9bDIc",
  },
  {
    id: "x66MSHKuszg",
    title: "Client Testimonial 3",
    embedUrl: "https://www.youtube.com/embed/x66MSHKuszg",
  },
  {
    id: "fdhk4hJ58tw",
    title: "Client Testimonial 4",
    embedUrl: "https://www.youtube.com/embed/fdhk4hJ58tw",
  },
]

export default function CustomerStories() {
  return (
    <section className="bg-gradient-to-br from-yellow-50 to-red-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Customer Stories
          </h2>
          <p className="text-gray-700 text-lg md:text-xl">
            100+ Businesses Have Already Generated ₹200+ Crore In Revenue{" "}
            <span className="text-red-600 font-bold">With Our Services and Guidance</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIDEO_TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.id} className="relative group">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src={testimonial.embedUrl}
                  title={testimonial.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <p className="mt-3 text-sm font-semibold text-gray-900 text-center">
                {testimonial.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

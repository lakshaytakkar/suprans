"use client"

import ImagePlaceholder from "@/components/ui/ImagePlaceholder"

const galleryImages = [
  { id: "gallery-global-office", title: "Global Business Office" },
  { id: "gallery-success-metrics", title: "Success Metrics" },
  { id: "gallery-team-support", title: "Expert Team Support" },
]

export default function ImageGallery() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            See Suprans in Action
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Real businesses, real results, real success stories
          </p>
        </div>

        {/* Creative Masonry Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Large Featured Image */}
          <div className="md:col-span-2 md:row-span-2">
            <div className="relative h-64 md:h-[500px] rounded-2xl overflow-hidden shadow-xl group">
              <ImagePlaceholder
                promptId={galleryImages[0].id}
                alt={galleryImages[0].title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                  {galleryImages[0].title}
                </h3>
              </div>
            </div>
          </div>

          {/* Medium Image */}
          <div className="relative h-64 md:h-[240px] rounded-2xl overflow-hidden shadow-xl group">
            <ImagePlaceholder
              promptId={galleryImages[1].id}
              alt={galleryImages[1].title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-xl font-bold text-white drop-shadow-lg">
                {galleryImages[1].title}
              </h3>
            </div>
          </div>

          {/* Small Image */}
          <div className="relative h-64 md:h-[240px] rounded-2xl overflow-hidden shadow-xl group">
            <ImagePlaceholder
              promptId={galleryImages[2].id}
              alt={galleryImages[2].title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-xl font-bold text-white drop-shadow-lg">
                {galleryImages[2].title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


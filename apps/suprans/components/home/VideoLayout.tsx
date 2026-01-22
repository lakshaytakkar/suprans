"use client";

export default function VideoLayout() {
  const videoIds = [
    "byQQNKVxhl0",
    "vgYbA7TJtzY",
    "DKADDGDQirY",
    "03wyV-EFvjg",
  ];

  return (
    <section className="bg-white py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
            Our Videos
          </h2>
          <p className="text-gray-600 text-lg">
            Explore our featured content side by side
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {videoIds.map((id, index) => {
            const isMobileHidden = index >= 3 ? "block md:block hidden" : "";

            return (
              <div
                key={id}
                className={`w-full sm:w-[48%] md:w-[30%] lg:w-[23%] aspect-video rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ${isMobileHidden}`}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${id}`}
                  title={`Video ${index + 1}`}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

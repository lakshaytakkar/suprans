"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderImage {
  url: string;
  order: number;
  link: string;
}

export default function HeroSectionMobileSlider() {
  const [images, setImages] = useState<SliderImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Use empty images array - component will show loading state
    setImages([]);
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (images.length === 0) {
    return (
      <div className="w-full h-[41vh] flex items-center justify-center sm:hidden">
        Loading images...
      </div>
    );
  }

  return (
    <div className="relative w-full h-[41vh] overflow-hidden sm:hidden m-0 p-0">
      {images.map((img, idx) => (
        <a
          key={idx}
          href={img.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`absolute inset-0 w-full block transition-transform duration-1000 ease-in-out ${
            idx === currentIndex
              ? "translate-x-0"
              : idx < currentIndex
              ? "-translate-x-full"
              : "translate-x-full"
          }`}
          style={{ margin: 0, padding: 0 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.url}
            alt={`Slide ${idx}`}
            className="w-full h-full object-cover"
          />
        </a>
      ))}

      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white p-2 rounded-full z-10"
      >
        <ChevronLeft className="text-black w-5 h-5" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white p-2 rounded-full z-10"
      >
        <ChevronRight className="text-black w-5 h-5" />
      </button>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`w-2 h-2 rounded-full ${
              idx === currentIndex ? "bg-red-500" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}

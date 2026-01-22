"use client";

import React, { useState, useEffect } from "react";
import AOS from "aos";
import Image from "next/image";

const images = [
  "/assets/images/P1.JPG",
  "/assets/images/P2.png",
  "/assets/images/P3.png",
  "/assets/images/P4.png",
  "/assets/images/P5.png",
  "/assets/images/P6.png",
  "/assets/images/P7.JPG",
  "/assets/images/P8.JPG",
];

export default function EventGallery() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getPositionClass = (index: number) => {
    const diff = (index - current + images.length) % images.length;
    switch (diff) {
      case 0:
        return "z-30 scale-100 opacity-100";
      case 1:
        return "translate-x-[120px] sm:translate-x-[150px] md:translate-x-[180px] z-20 scale-90 opacity-70";
      case 2:
        return "translate-x-[220px] sm:translate-x-[280px] md:translate-x-[360px] z-10 scale-75 opacity-50";
      case images.length - 1:
        return "-translate-x-[120px] sm:-translate-x-[150px] md:-translate-x-[180px] z-20 scale-90 opacity-70";
      case images.length - 2:
        return "-translate-x-[220px] sm:-translate-x-[280px] md:-translate-x-[360px] z-10 scale-75 opacity-50";
      default:
        return "opacity-0 pointer-events-none";
    }
  };

  return (
    <div className="flex flex-col items-center py-5 bg-white">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-10" data-aos="fade-down">
        <span className="text-red-600 font-bold">EVENT</span> Gallery
      </h2>

      <div
        className="relative w-full max-w-[1000px] h-[220px] sm:h-[280px] md:h-[350px] flex items-center justify-center overflow-hidden px-2"
        data-aos="fade-up"
      >
        {images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={`event-${index}`}
            width={400}
            height={300}
            className={`absolute rounded-xl shadow-xl object-cover
              w-[200px] h-[150px] sm:w-[300px] sm:h-[220px] md:w-[400px] md:h-[300px]
              transition-transform transition-opacity duration-1000 ease-in-out
              ${getPositionClass(index)}
              cursor-pointer hover:scale-105 hover:z-40 hover:shadow-2xl`}
          />
        ))}
      </div>
    </div>
  );
}

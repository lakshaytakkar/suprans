"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import Image from "next/image";

const icons = [
  { src: "/assets/images/icon1.jpeg", angle: 270 },
  { src: "/assets/images/icon2.jpeg", angle: 330 },
  { src: "/assets/images/icon3.jpeg", angle: 30 },
  { src: "/assets/images/icon4.jpeg", angle: 90 },
  { src: "/assets/images/icon5.jpeg", angle: 150 },
  { src: "/assets/images/icon6.jpeg", angle: 210 },
];

export default function FloatingIcons() {
  const totalImages = icons.length + 1;
  const [loadedCount, setLoadedCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(768);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (loadedCount === totalImages) {
      AOS.refresh();
    }
  }, [loadedCount, totalImages]);

  const handleImageLoad = () => {
    setLoadedCount((count) => count + 1);
  };

  const getIconPosition = (angle: number) => {
    const radiusX = windowWidth < 640 ? 150 : windowWidth < 768 ? 300 : 450;
    const radiusY = windowWidth < 640 ? 90 : windowWidth < 768 ? 150 : 200;
    const rad = (angle * Math.PI) / 180;
    const x = radiusX * Math.cos(rad);
    const y = radiusY * Math.sin(rad);
    return { x, y };
  };

  const iconSize = windowWidth < 640 ? 60 : windowWidth < 768 ? 100 : 150;

  return (
    <>
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) rotateY(0deg); }
            50% { transform: translateY(-15px) rotateY(10deg); }
            100% { transform: translateY(0px) rotateY(0deg); }
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
            transform-style: preserve-3d;
          }
        `}
      </style>

      <div className="flex items-center justify-center p-4" data-aos="zoom-in">
        <div className="relative w-[300px] h-[250px] sm:w-[500px] sm:h-[350px] md:w-[600px] md:h-[400px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <Image
              src="/assets/images/main.jpeg"
              alt="center"
              width={250}
              height={250}
              onLoad={handleImageLoad}
              className="w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] rounded-xl object-cover shadow-lg"
            />
          </div>

          {icons.map((icon, index) => {
            const { x, y } = getIconPosition(icon.angle);

            return (
              <Image
                key={index}
                src={icon.src}
                alt={`icon${index + 1}`}
                width={iconSize}
                height={iconSize}
                onLoad={handleImageLoad}
                className="rounded-full absolute animate-float"
                style={{
                  width: `${iconSize}px`,
                  height: `${iconSize}px`,
                  top: `calc(50% + ${y}px - ${iconSize / 2}px)`,
                  left: `calc(50% + ${x}px - ${iconSize / 2}px)`,
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

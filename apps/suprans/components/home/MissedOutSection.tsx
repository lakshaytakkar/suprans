"use client";

import React from "react";
import Image from "next/image";
import type { ButtonClickProps } from "@suprans/types";

const logos = [
  "/assets/images/start.jpeg",
  "/assets/images/gem.jpeg",
  "/assets/images/trust.jpeg",
  "/assets/images/tata.jpeg",
];

export default function MissedOutSection({ onButtonClick }: ButtonClickProps) {
  return (
    <>
      <style>{`
        .scrollbar-x {
          scrollbar-width: auto;
          scrollbar-color: #cbd5e0 #f1f5f9;
        }
        .scrollbar-x::-webkit-scrollbar {
          height: 6px;
        }
        .scrollbar-x::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .scrollbar-x::-webkit-scrollbar-thumb {
          background-color: #cbd5e0;
          border-radius: 3px;
        }
      `}</style>

      <div className="text-center py-10 px-4 sm:px-6 md:px-12 bg-white">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4">
          <span className="text-red-600 font-semibold">Missed</span> out?
        </h2>

        <button
          type="button"
          onClick={onButtonClick}
          className="inline-block bg-red-500 text-white font-medium px-6 sm:px-10 py-3 rounded-xl shadow-md border-2 border-white hover:bg-red-600 transition mb-10 text-base sm:text-xl text-center w-full sm:w-auto"
        >
          Join Now! The Asia&apos;s Biggest Seminar for Business all around the world
        </button>

        <div className="hidden md:flex mt-10 flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-16">
          {logos.map((img, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-2 sm:p-3 shadow-sm hover:shadow-md transition"
            >
              <Image
                src={img}
                alt={`support-logo-${index}`}
                width={80}
                height={80}
                className="h-14 sm:h-20 w-auto object-contain"
              />
            </div>
          ))}
        </div>

        <div
          className="md:hidden mt-10 flex overflow-x-auto scrollbar-x space-x-4 px-2"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {logos.map((img, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition flex-shrink-0"
              style={{ scrollSnapAlign: "start", minWidth: "120px" }}
            >
              <Image
                src={img}
                alt={`support-logo-mobile-${index}`}
                width={80}
                height={80}
                className="h-20 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

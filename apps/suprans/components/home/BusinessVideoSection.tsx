"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import Link from "next/link";

export default function BusinessVideoSection() {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out", once: true });
  }, []);

  return (
    <div className="bg-white py-10">
      <div
        className="bg-red-600 text-white px-6 md:px-20 py-8 flex flex-col md:flex-row justify-between items-center"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-xl md:text-4xl font-semibold">
            Start, Run and Grow your Business
          </h2>
          <h2 className="text-4xl">in United States</h2>
        </div>
        <div className="text-sm md:text-base max-w-md text-center md:text-left">
          <p className="mb-3">
            Get your U.S. company today. With our expert support at every step,
            we make it easy to get your company online and running smoothly.
          </p>

          <Link
            href="/usllc"
            className="bg-white text-red-600 font-semibold py-2 px-4 rounded-3xl hover:bg-gray-100 transition inline-block"
          >
            Start Your US LLC
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function DelegationBanner() {
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-[#F32222] text-white px-4 md:px-10 py-10 overflow-hidden rounded-xl hidden md:block">
      <Image
        src="/assets/images/2.png"
        alt="Stars"
        width={184}
        height={184}
        className="absolute top-4 left-4 w-16 md:w-46"
      />

      <Image
        src="/assets/images/1.png"
        alt="Lamp"
        width={184}
        height={184}
        className="absolute top-4 right-4 w-10 md:w-46"
      />

      <Image
        src="/assets/images/4.png"
        alt="Plane"
        width={264}
        height={264}
        className="absolute bottom-4 left-4 w-16 md:w-66"
      />

      <Image
        src="/assets/images/3.png"
        alt="Dragon"
        width={216}
        height={216}
        className="absolute bottom-4 right-4 w-16 md:w-54"
      />

      <div className="text-center">
        <h2 className="text-lg md:text-3xl font-bold">
          Biggest International Delegation
        </h2>
        <p className="text-md md:text-2xl text-yellow-300 font-semibold mt-1">
          Experience by Mr. SUPRANS
        </p>
      </div>

      <div className="flex justify-center mt-6">
        <Image
          src="/assets/images/TeamSuprans.png"
          alt="Team Suprans"
          width={896}
          height={504}
          className="rounded-xl shadow-lg border-4 border-black max-w-full md:max-w-4xl"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-6 text-black">
        {[
          "Pre-fair training by Mr. Suprans",
          "Factory & market visits",
          "Direct manufacturer access",
        ].map((feature, index) => (
          <span
            key={index}
            className="bg-white px-4 py-2 rounded-full font-medium shadow"
          >
            {feature}
          </span>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link href="/cantonchinatravel">
          <button
            className={`bg-white text-black px-6 py-3 rounded-full font-bold shadow-md hover:bg-gray-400 text-lg ${
              isShaking ? "animate-shake" : ""
            }`}
          >
            I WANT TO <span className="text-red-600">JOIN!!</span> ➜
          </button>
        </Link>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
        }
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
      `}</style>
    </section>
  );
}

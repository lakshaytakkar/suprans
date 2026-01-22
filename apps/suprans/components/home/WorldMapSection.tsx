"use client";

import Image from "next/image";

export default function WorldMapSection() {
  return (
    <div className="py-10 flex flex-col items-center relative">
      <h2 className="text-xl md:text-3xl font-semibold text-center mb-6 px-4">
        Our{" "}
        <span className="text-red-600 font-bold">BUSINESS</span>{" "}
        is expanded around the world
      </h2>

      <div className="relative w-full max-w-6xl px-4 md:px-0">
        <Image
          src="/assets/images/g5.png"
          alt="World Map"
          width={1200}
          height={600}
          className="w-full h-auto object-contain"
        />

        <div className="absolute top-[30%] left-[16%] w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-600 animate-blink z-10" />
        <div className="absolute top-[38%] left-[68.5%] w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-600 animate-blink z-10" />
        <div className="absolute top-[35%] left-[78.5%] w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-600 animate-blink z-10" />

        <div className="hidden md:block absolute top-[10%] left-[18%]">
          <div className="absolute top-[120px] left-[-270px] bg-white rounded-xl shadow-lg border border-red-400 p-4 w-64 z-20">
            <Image
              src="/assets/images/building.jpeg"
              alt="USA"
              width={256}
              height={128}
              className="w-full h-32 object-cover rounded"
            />
            <h3 className="font-semibold text-red-500 mt-2">USA Warehouse</h3>
            <p className="text-sm text-gray-600">
              Location: North Carolina <br />
              Our USA Warehouse adds a local edge to your global brand.
            </p>
          </div>
        </div>

        <div className="hidden md:block absolute top-[39%] left-[68.5%]">
          <div className="absolute top-[110px] left-[-270px] bg-white rounded-xl shadow-lg border border-red-400 p-4 w-64 z-20">
            <Image
              src="/assets/images/corporate.jpeg"
              alt="India"
              width={256}
              height={128}
              className="w-full h-32 object-cover rounded"
            />
            <h3 className="font-semibold text-red-500 mt-2">India Office</h3>
            <p className="text-sm text-gray-600">
              Mumbai, Pune, Bengaluru <br />
              Our India team provides development and client support.
            </p>
          </div>
        </div>

        <div className="hidden md:block absolute top-[15%] left-[80%]">
          <div className="absolute top-[110px] left-[30px] bg-white rounded-xl shadow-lg border border-red-400 p-4 w-64 z-20">
            <Image
              src="/assets/images/Warehousechina.png"
              alt="China"
              width={256}
              height={128}
              className="w-full h-32 object-cover rounded"
            />
            <h3 className="font-semibold text-red-500 mt-2">China Warehouse</h3>
            <p className="text-sm text-gray-600">
              Location: Shenzhen <br />
              Efficient fulfillment and logistics for faster delivery.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:hidden w-full px-6">
        <div className="bg-white rounded-xl shadow-lg border border-red-400 p-4">
          <Image
            src="/assets/images/building.jpeg"
            alt="USA"
            width={400}
            height={144}
            className="w-full h-36 object-cover rounded"
          />
          <h3 className="font-semibold text-red-500 mt-2">USA Warehouse</h3>
          <p className="text-sm text-gray-600">
            Location: North Carolina <br />
            Our USA office adds a local edge to your global brand.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-red-400 p-4">
          <Image
            src="/assets/images/corporate.jpeg"
            alt="India"
            width={400}
            height={144}
            className="w-full h-36 object-cover rounded"
          />
          <h3 className="font-semibold text-red-500 mt-2">India Office</h3>
          <p className="text-sm text-gray-600">
            Mumbai, Pune, Bengaluru <br />
            Our India team provides development and client support.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-red-400 p-4">
          <Image
            src="/assets/images/Warehousechina.png"
            alt="China"
            width={400}
            height={144}
            className="w-full h-36 object-cover rounded"
          />
          <h3 className="font-semibold text-red-500 mt-2">China Warehouse</h3>
          <p className="text-sm text-gray-600">
            Location: Shenzhen <br />
            Efficient fulfillment and logistics for faster delivery.
          </p>
        </div>
      </div>

      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.2; }
          }
          .animate-blink {
            animation: blink 1.2s infinite;
          }
        `}
      </style>
    </div>
  );
}

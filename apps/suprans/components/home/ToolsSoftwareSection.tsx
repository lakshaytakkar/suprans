"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Tool {
  img: string;
  title: string;
  desc: string;
}

const toolData: Record<string, Tool[]> = {
  "Mobile Apps": [
    { img: "/assets/images/wechat.png", title: "WeChat", desc: "Essential for communication in China" },
    { img: "/assets/images/google.png", title: "Google Pay", desc: "Tool for transaction and payment" },
    { img: "/assets/images/Whatapp.png", title: "WhatsApp", desc: "Enhance communication" },
    { img: "/assets/images/translate.png", title: "Google Translator", desc: "Worldwide used translation tool" },
  ],
  "China Visa & Travel": [
    { img: "/assets/images/PassportHelp.png", title: "Visa Services", desc: "Assistance for visa processing" },
    { img: "/assets/images/FlightBooking.png", title: "Flight Booking", desc: "Book affordable flights to China" },
    { img: "/assets/images/PassportHelp.png", title: "Passport Help", desc: "Renewal & documentation services" },
    { img: "/assets/images/FlightBooking.png", title: "Hotel Booking", desc: "Accommodation across major cities" },
  ],
  "B2B Marketplaces": [
    { img: "/assets/images/Alibaba.png", title: "Alibaba", desc: "Largest B2B wholesale platform" },
    { img: "/assets/images/IndiaMART.png", title: "IndiaMART", desc: "Indian B2B supplier directory" },
    { img: "/assets/images/GlobalSources.png", title: "GlobalSources", desc: "Verified manufacturers" },
    { img: "/assets/images/MadeInChina.png", title: "MadeInChina", desc: "China-based global suppliers" },
  ],
};

export default function ToolsSoftwareSection() {
  const [activeTab, setActiveTab] = useState("Mobile Apps");

  return (
    <div className="py-10 px-4 text-center">
      <div className="inline-block border-2 border-red-400 px-6 py-2 rounded-full mb-4">
        <h2 className="text-2xl md:text-3xl font-semibold">Tools & Software</h2>
      </div>
      <p className="text-gray-600 mb-6 text-sm md:text-base">
        Essential Tools for Global Entrepreneurs
      </p>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {Object.keys(toolData).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === tab
                ? "bg-red-500 text-white"
                : "bg-red-100 text-red-500 hover:bg-red-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {toolData[activeTab].map((tool, index) => (
          <div
            key={index}
            className="border-2 border-red-300 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition"
          >
            <div className="relative h-12 mx-auto mb-3">
              <Image src={tool.img} alt={tool.title} fill className="object-contain" />
            </div>
            <h3 className="font-semibold">{tool.title}</h3>
            <p className="text-sm text-gray-600">{tool.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

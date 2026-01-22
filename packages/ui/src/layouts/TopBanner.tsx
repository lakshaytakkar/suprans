"use client";

import { useEffect, useState } from "react";

interface BannerRecord {
  fields?: {
    Text?: string;
    Date?: string;
  };
}

export default function TopBanner() {
  const [records, setRecords] = useState<BannerRecord[]>([]);

  useEffect(() => {
    // Use empty records - banner will show nothing if no records
    setRecords([]);
  }, []);

  if (records.length === 0) {
    return null;
  }

  return (
    <div className="bg-red-600 text-white text-xs sm:text-sm font-medium h-8 sm:h-10 overflow-hidden relative">
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }

          .marquee-track {
            display: inline-block;
            white-space: nowrap;
            animation: marquee 690s linear infinite;
          }

          .marquee-content {
            display: inline-block;
            white-space: nowrap;
            padding-right: 4rem;
          }
        `}
      </style>

      <div className="absolute top-1/2 transform -translate-y-1/2 w-full overflow-hidden">
        <div className="marquee-track">
          {[...Array(50)].map((_, copyIndex) => (
            <span key={copyIndex} className="marquee-content">
              {records.map((record, index) => (
                <span key={index} className="mr-16 inline-block">
                  {record.fields?.Text}{" "}
                  <span className="font-bold">{record.fields?.Date}</span>.{" "}
                  <a href="#" className="underline hover:text-gray-200">
                    Register Now!
                  </a>{" "}
                  Don&apos;t miss this opportunity!
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

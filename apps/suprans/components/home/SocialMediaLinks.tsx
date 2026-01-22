"use client";

import Image from "next/image";

const socialMedia = [
  { icon: "/assets/images/x.jpeg", link: "https://x.com/imsuprans", row: "top" },
  { icon: "/assets/images/youtube.jpeg", link: "https://www.youtube.com/channel/UCPaf9OniHYTpjYPs3_K-B9w", row: "top" },
  { icon: "/assets/images/linkdn.jpeg", link: "https://www.linkedin.com/in/suprans", row: "top" },
  { icon: "/assets/images/fb.jpeg", link: "https://www.facebook.com/supranschina", row: "bottom" },
  { icon: "/assets/images/insta.jpeg", link: "https://www.instagram.com/suprans.china", row: "bottom" },
];

export default function SocialMediaLinks() {
  return (
    <>
      <style>{`
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .floating {
          animation: floatUpDown 4s ease-in-out infinite;
        }
      `}</style>

      <div className="text-center py-12 relative">
        <h2 className="text-xl md:text-2xl font-medium mb-12">
          Check Us Out on your Favourite{" "}
          <span className="text-red-600 font-semibold">Social Media</span>{" "}
          Platforms
        </h2>

        <div className="flex flex-col items-center gap-8 relative">
          <div className="flex gap-6 md:gap-60 flex-wrap justify-center relative z-10">
            {socialMedia
              .filter((s) => s.row === "top")
              .map((s, i) => (
                <a
                  href={s.link}
                  key={i}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                >
                  <div className="bg-red-100 p-1 rounded-xl shadow-md">
                    <div className="bg-gradient-to-tr from-red-500 to-red-300 p-1 rounded-xl">
                      <Image
                        src={s.icon}
                        alt="social"
                        width={80}
                        height={80}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-contain bg-white floating"
                      />
                    </div>
                  </div>
                </a>
              ))}
          </div>

          <div className="flex gap-6 md:gap-60 flex-wrap justify-center relative z-10">
            {socialMedia
              .filter((s) => s.row === "bottom")
              .map((s, i) => (
                <a
                  href={s.link}
                  key={i}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                >
                  <div className="bg-red-100 p-1 rounded-xl shadow-md">
                    <div className="bg-gradient-to-tr from-red-500 to-red-300 p-1 rounded-xl">
                      <Image
                        src={s.icon}
                        alt="social"
                        width={80}
                        height={80}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-contain bg-white floating"
                      />
                    </div>
                  </div>
                </a>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

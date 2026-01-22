"use client"

import Image from "next/image"
import { Play } from "lucide-react"

interface VideoThumbnailProps {
  thumbnail: string
  title?: string
  onClick?: () => void
}

export default function VideoThumbnail({ thumbnail, title, onClick }: VideoThumbnailProps) {
  return (
    <div
      className="relative group cursor-pointer rounded-xl overflow-hidden aspect-video bg-gray-200 border-2 border-gray-300 hover:border-red-500 transition-colors"
      onClick={onClick}
    >
      <Image
        src={thumbnail}
        alt={title || "Video testimonial"}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-white/30 group-hover:bg-white/10 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-red-600 rounded-full p-4 group-hover:bg-red-700 group-hover:scale-110 transition-all">
          <Play className="w-8 h-8 text-white fill-white ml-1" />
        </div>
      </div>
      {title && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <p className="text-white text-sm font-semibold">{title}</p>
        </div>
      )}
    </div>
  )
}


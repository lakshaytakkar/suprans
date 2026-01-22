"use client"

import Image from "next/image"
import { getImagePrompt } from "@/lib/data/image-prompts"

interface ImagePlaceholderProps {
  promptId: string
  alt: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"
}

const objectFitClasses = {
  contain: "object-contain",
  cover: "object-cover",
  fill: "object-fill",
  none: "object-none",
  "scale-down": "object-scale-down",
}

export default function ImagePlaceholder({
  promptId,
  alt,
  className = "",
  fill = false,
  width,
  height,
  priority = false,
  objectFit = "cover",
}: ImagePlaceholderProps) {
  const prompt = getImagePrompt(promptId)
  const imagePath = prompt?.path || "/assets/images/main.jpeg"
  const dimensions = prompt?.dimensions || { width: 800, height: 600 }

  // Use provided dimensions or fallback to prompt dimensions
  const finalWidth = width || dimensions.width
  const finalHeight = height || dimensions.height

  const objectFitClass = objectFitClasses[objectFit]

  return (
    <div className="relative overflow-hidden w-full h-full">
      {fill ? (
        <Image
          src={imagePath}
          alt={alt}
          fill
          className={`${className} ${objectFitClass}`}
          priority={priority}
        />
      ) : (
        <Image
          src={imagePath}
          alt={alt}
          width={finalWidth}
          height={finalHeight}
          className={`${className} ${objectFitClass}`}
          priority={priority}
        />
      )}
      {/* Placeholder overlay with prompt info (only in development) */}
      {process.env.NODE_ENV === "development" && prompt && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 opacity-0 hover:opacity-100 transition-opacity">
          <div className="font-semibold">{prompt.id}</div>
          <div className="text-[10px] line-clamp-2">{prompt.prompt}</div>
        </div>
      )}
    </div>
  )
}


"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface CTAButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "tertiary"
  className?: string
  size?: "sm" | "md" | "lg"
}

export default function CTAButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  size = "md",
}: CTAButtonProps) {
  const baseClasses = "font-semibold rounded-full transition-all duration-300 inline-block text-center"
  
  const variantClasses = {
    primary: "bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-xl hover:scale-105",
    secondary: "border-2 border-red-500 text-red-600 hover:bg-red-50 hover:border-red-600",
    tertiary: "text-red-600 hover:text-red-700 underline-offset-4 hover:underline",
  }

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}


"use client"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface BadgeProps {
  children: ReactNode
  variant?: "default" | "success" | "warning" | "danger" | "outline"
  className?: string
}

const Badge = ({ children, variant = "default", className }: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all duration-200",
        {
          "bg-[#1b9aaa]/20 text-[#1b9aaa] border border-[#1b9aaa]/30": variant === "default",
          "bg-green-500/20 text-green-400 border border-green-500/30": variant === "success",
          "bg-amber-500/20 text-amber-400 border border-amber-500/30": variant === "warning",
          "bg-red-500/20 text-red-400 border border-red-500/30": variant === "danger",
          "border border-white/20 text-white/70": variant === "outline",
        },
        className
      )}
    >
      {children}
    </span>
  )
}

export { Badge }

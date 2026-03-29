"use client"
import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, forwardRef } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold" | "danger"
  size?: "sm" | "md" | "lg"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0d1b2a] disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-[#1b9aaa] text-white hover:bg-[#158a99] focus:ring-[#1b9aaa]": variant === "primary",
            "bg-[#1b2838] text-white hover:bg-[#243347] border border-white/10": variant === "secondary",
            "border border-white/20 text-white hover:bg-white/5": variant === "outline",
            "text-white/70 hover:text-white hover:bg-white/5": variant === "ghost",
            "bg-gradient-to-r from-[#d4a843] to-[#b8922e] text-[#0d1b2a] font-semibold hover:from-[#e0b84f] hover:to-[#c49d35] focus:ring-[#d4a843]": variant === "gold",
            "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500": variant === "danger",
          },
          {
            "text-xs px-3 py-1.5": size === "sm",
            "text-sm px-4 py-2": size === "md",
            "text-base px-6 py-3": size === "lg",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
export { Button }

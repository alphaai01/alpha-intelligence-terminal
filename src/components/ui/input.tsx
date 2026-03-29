"use client"
import { cn } from "@/lib/utils"
import { InputHTMLAttributes, forwardRef } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex w-full rounded-lg bg-[#1b2838] px-4 py-2 text-sm text-white placeholder:text-white/40 border border-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1b9aaa] focus:ring-offset-0 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"
export { Input }

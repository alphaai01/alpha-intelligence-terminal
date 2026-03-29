"use client"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

interface CardTitleProps {
  children: ReactNode
  className?: string
}

interface CardDescriptionProps {
  children: ReactNode
  className?: string
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

interface CardFooterProps {
  children: ReactNode
  className?: string
}

const Card = ({ children, className }: CardProps) => (
  <div
    className={cn(
      "bg-[#0f2440]/80 border border-white/[0.08] backdrop-blur-md rounded-xl p-6 transition-all duration-200",
      className
    )}
  >
    {children}
  </div>
)

const CardHeader = ({ children, className }: CardHeaderProps) => (
  <div className={cn("pb-4 border-b border-white/[0.06]", className)}>
    {children}
  </div>
)

const CardTitle = ({ children, className }: CardTitleProps) => (
  <h3
    className={cn(
      "text-lg font-semibold text-white",
      className
    )}
  >
    {children}
  </h3>
)

const CardDescription = ({ children, className }: CardDescriptionProps) => (
  <p
    className={cn(
      "text-sm text-white/60 mt-1",
      className
    )}
  >
    {children}
  </p>
)

const CardContent = ({ children, className }: CardContentProps) => (
  <div className={cn("py-4", className)}>
    {children}
  </div>
)

const CardFooter = ({ children, className }: CardFooterProps) => (
  <div
    className={cn(
      "pt-4 border-t border-white/[0.06] flex gap-4",
      className
    )}
  >
    {children}
  </div>
)

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }

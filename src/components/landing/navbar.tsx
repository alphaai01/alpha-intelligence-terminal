"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScroll, setHasScroll] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasScroll(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        hasScroll ? "bg-[#0d1b2a]/90 backdrop-blur-md border-b border-white/[0.08]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 font-bold text-lg">
            <span className="text-white">Alpha</span>
            <span className="bg-gradient-to-r from-[#1b9aaa] to-[#d4a843] bg-clip-text text-transparent">
              AI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#platform" className="text-white/70 hover:text-white transition">
              Platform
            </a>
            <a href="#pricing" className="text-white/70 hover:text-white transition">
              Pricing
            </a>
            <a href="#about" className="text-white/70 hover:text-white transition">
              About
            </a>
            <a href="#blog" className="text-white/70 hover:text-white transition">
              Blog
            </a>
            <a href="#contact" className="text-white/70 hover:text-white transition">
              Contact
            </a>
          </div>

          {/* Right Side Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Login
            </Button>
            <Button variant="gold" size="sm">
              Start Free Trial
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-white/[0.08]">
            <div className="flex flex-col gap-4 pt-4">
              <a href="#platform" className="text-white/70 hover:text-white transition px-2">
                Platform
              </a>
              <a href="#pricing" className="text-white/70 hover:text-white transition px-2">
                Pricing
              </a>
              <a href="#about" className="text-white/70 hover:text-white transition px-2">
                About
              </a>
              <a href="#blog" className="text-white/70 hover:text-white transition px-2">
                Blog
              </a>
              <a href="#contact" className="text-white/70 hover:text-white transition px-2">
                Contact
              </a>
              <div className="flex flex-col gap-3 mt-2">
                <Button variant="ghost" size="sm" className="w-full">
                  Login
                </Button>
                <Button variant="gold" size="sm" className="w-full">
                  Start Free Trial
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

"use client"
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#0d1b2a] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Logo & Social */}
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-4">
              <span className="text-white">Alpha</span>
              <span className="bg-gradient-to-r from-[#1b9aaa] to-[#d4a843] bg-clip-text text-transparent">
                AI
              </span>
            </div>
            <p className="text-white/60 text-sm mb-6">
              AI-powered intelligence terminal for institutional investors.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-[#1b9aaa] hover:border-[#1b9aaa] transition-all"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-[#1b9aaa] hover:border-[#1b9aaa] transition-all"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-[#1b9aaa] hover:border-[#1b9aaa] transition-all"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-[#1b9aaa] hover:border-[#1b9aaa] transition-all"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/60 hover:text-white transition text-sm">
                  Platform
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition text-sm">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition text-sm">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition text-sm">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition text-sm">
                  Roadmap
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/60 hover:text-white transition text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition text-sm">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition text-sm">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition text-sm">
                  Press Kit
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/60 hover:text-white transition text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition text-sm">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition text-sm">
                  Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/[0.08] pt-8">
          {/* SEBI Disclaimer */}
          <div className="bg-[#0f2440]/50 border border-white/[0.08] rounded-lg p-4 mb-6">
            <p className="text-white/50 text-xs leading-relaxed">
              <span className="font-semibold text-white/70">SEBI Disclaimer:</span> Alpha AI Terminal is a research and
              analytics platform. The information provided is for educational purposes only and should not be construed
              as investment advice. Past performance does not guarantee future results. Please consult with a qualified
              financial advisor before making any investment decisions. OneAlpha AI Pvt. Ltd. is not registered as a
              broker, investment advisor, or with SEBI.
            </p>
          </div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-white/50 text-sm">
            <p>&copy; 2026 OneAlpha AI Pvt. Ltd. All rights reserved.</p>
            <p>Made with intelligence in India</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

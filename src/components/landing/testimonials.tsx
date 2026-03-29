"use client"
import { Star } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Rajesh Mehta",
      title: "Head of Quant, Axis Capital",
      quote: "Alpha AI's signal accuracy is unmatched. We've integrated it into our core trading strategy and it's delivered consistent alpha. The geopolitical analytics alone are worth the subscription.",
      rating: 5,
      initials: "RM",
    },
    {
      name: "Priya Sharma",
      title: "Portfolio Manager, ICICI Prudential",
      quote: "The risk matrix and portfolio stress testing features have transformed how we manage exposure. Our VaR calculations are now real-time and we've significantly reduced unintended concentration risk.",
      rating: 5,
      initials: "PS",
    },
    {
      name: "Vikram Singh",
      title: "CTO, Zerodha Ventures",
      quote: "As technologists, we're impressed by the platform's architecture. The API is clean, the data pipeline is rock solid, and the real-time capabilities are exceptional for an AI-first platform.",
      rating: 5,
      initials: "VS",
    },
  ]

  return (
    <section className="py-24 bg-[#0d1b2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-white/60">
            See what investors are saying about Alpha AI Terminal
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#0f2440]/50 border border-white/[0.08] rounded-xl p-8 hover:border-white/[0.16] transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-[#d4a843] text-[#d4a843]"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1b9aaa] to-[#d4a843] flex items-center justify-center">
                  <span className="text-white font-semibold text-xs">
                    {testimonial.initials}
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-white/60 text-xs">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

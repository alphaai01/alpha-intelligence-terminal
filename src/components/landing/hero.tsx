"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Hero() {
  return (
    <section className="min-h-screen bg-[#0d1b2a] relative overflow-hidden pt-24">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(27, 154, 170, 0.1) 1px, transparent 1px), linear-gradient(rgba(27, 154, 170, 0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating Particles */}
        <style>{`
          @keyframes float1 {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-30px) translateX(20px); }
          }
          @keyframes float2 {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(30px) translateX(-20px); }
          }
          @keyframes float3 {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-20px) translateX(-30px); }
          }
          .particle-1 { animation: float1 6s ease-in-out infinite; }
          .particle-2 { animation: float2 8s ease-in-out infinite; }
          .particle-3 { animation: float3 7s ease-in-out infinite; }
        `}</style>

        <div className="particle-1 absolute top-20 left-10 w-32 h-32 bg-[#1b9aaa]/5 rounded-full blur-3xl" />
        <div className="particle-2 absolute top-40 right-20 w-40 h-40 bg-[#d4a843]/5 rounded-full blur-3xl" />
        <div className="particle-3 absolute bottom-20 left-1/3 w-32 h-32 bg-[#1b9aaa]/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-96px)] flex flex-col justify-center">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <Badge variant="default">
            <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
            LIVE — Monitoring 47 Global Markets
          </Badge>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-6 leading-tight">
          The Intelligence Edge Your Portfolio Needs
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-white/60 text-center mb-8 max-w-3xl mx-auto">
          Harness AI-powered market signals, real-time geopolitical analytics, and institutional-grade risk management to stay ahead of market movements across global equities, commodities, forex, and crypto.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button variant="gold" size="lg" className="px-8">
            Start Free Trial
          </Button>
          <Button variant="outline" size="lg" className="px-8">
            Explore Terminal
          </Button>
        </div>

        {/* Trust Bar */}
        <div className="border-t border-white/[0.08] pt-8">
          <p className="text-white/50 text-sm text-center mb-4">
            Trusted by 500+ institutional investors
          </p>
          <div className="flex justify-center gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-full bg-white/10 border border-white/[0.08] flex items-center justify-center"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1b9aaa] to-[#d4a843]" />
              </div>
            ))}
          </div>
        </div>

        {/* Mock Dashboard */}
        <div className="mt-16 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="bg-[#0f2440]/40 border border-white/[0.08] rounded-xl p-4 backdrop-blur-sm">
              <div className="text-white/50 text-xs mb-2">Market Health</div>
              <div className="text-2xl font-bold text-[#1b9aaa] mb-2">73.2%</div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#1b9aaa] to-[#d4a843] w-3/4" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0f2440]/40 border border-white/[0.08] rounded-xl p-4 backdrop-blur-sm">
              <div className="text-white/50 text-xs mb-2">Active Signals</div>
              <div className="text-2xl font-bold text-white">142</div>
              <div className="text-xs text-green-400 mt-2">+12 today</div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#0f2440]/40 border border-white/[0.08] rounded-xl p-4 backdrop-blur-sm">
              <div className="text-white/50 text-xs mb-2">Portfolio P&L</div>
              <div className="text-2xl font-bold text-green-400">+₹24,500</div>
              <div className="text-xs text-white/50 mt-2">+2.3% MTD</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

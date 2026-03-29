"use client"
import { Globe, Zap, BarChart3, Shield, Activity, Bell } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: Globe,
      title: "Market Pulse Engine",
      description: "Real-time monitoring of 47 global financial centers with instant risk alerts",
    },
    {
      icon: Zap,
      title: "AI Signal Generation",
      description: "Machine learning models generating buy/sell signals with 73% historical accuracy",
    },
    {
      icon: BarChart3,
      title: "Portfolio Intelligence",
      description: "Deep analytics on your holdings with predictive performance and stress testing",
    },
    {
      icon: Shield,
      title: "Risk Matrix",
      description: "VaR calculations, correlation analysis, and sector-level exposure management",
    },
    {
      icon: Activity,
      title: "Geopolitical Analytics",
      description: "AI-powered tracking of global events and their market impact in real-time",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Intelligent notifications for signals, price levels, and portfolio triggers",
    },
  ]

  return (
    <section className="py-24 bg-[#0d1b2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Institutional-Grade Intelligence
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Everything you need to make smarter investment decisions faster
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group bg-[#0f2440]/50 border border-white/[0.08] rounded-xl p-8 transition-all duration-300 hover:bg-[#0f2440]/80 hover:border-white/[0.16] hover:shadow-lg hover:shadow-[#1b9aaa]/10 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-[#1b9aaa]/20 flex items-center justify-center mb-4 group-hover:bg-[#1b9aaa]/30 transition-all">
                  <Icon className="text-[#1b9aaa] group-hover:text-[#d4a843] transition-colors" size={24} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Border Glow */}
                <div className="absolute inset-0 rounded-xl pointer-events-none group-hover:shadow-inner opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

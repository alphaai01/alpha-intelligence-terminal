"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: "Explorer",
      price: 0,
      period: "forever",
      description: "Get started with AI signals",
      features: [
        "3 signals per day",
        "30-minute delayed market data",
        "Basic performance metrics",
        "Single portfolio",
        "Email alerts",
        "Community access",
      ],
      cta: "Start Free",
      highlighted: false,
    },
    {
      name: "Professional",
      price: isAnnual ? 3999 : 4999,
      period: "month",
      description: "For active traders and small funds",
      features: [
        "Unlimited signals",
        "Real-time market data",
        "Advanced analytics suite",
        "Multi-portfolio support",
        "SMS + Email alerts",
        "Priority support",
        "Geopolitical analytics",
        "Portfolio stress testing",
        "Risk matrix dashboard",
        "API access",
      ],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Institutional",
      price: null,
      period: "custom",
      description: "For funds and institutions",
      features: [
        "Everything in Professional",
        "Multi-user accounts",
        "Custom AI models",
        "Dedicated account manager",
        "White-label options",
        "Custom integrations",
        "Compliance reporting",
        "SLA guarantees",
        "Training & support",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ]

  return (
    <section id="pricing" className="py-24 bg-[#0d1b2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-white/60 mb-8">
            Choose the plan that fits your investment needs
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!isAnnual ? "text-white" : "text-white/50"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                isAnnual ? "bg-[#1b9aaa]" : "bg-white/10"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  isAnnual ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? "text-white" : "text-white/50"}`}>
              Annual <span className="text-[#d4a843] font-semibold">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-xl transition-all duration-300 ${
                plan.highlighted
                  ? "bg-[#0f2440] border-2 border-[#d4a843] shadow-lg shadow-[#d4a843]/20 md:scale-105"
                  : "bg-[#0f2440]/50 border border-white/[0.08]"
              } p-8`}
            >
              {/* Recommended Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge variant="default" className="bg-gradient-to-r from-[#1b9aaa] to-[#d4a843]">
                    RECOMMENDED
                  </Badge>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-white/60 text-sm mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-8">
                {plan.price !== null ? (
                  <div>
                    <span className="text-5xl font-bold text-white">
                      {plan.price === 0 ? "Free" : `₹${plan.price}`}
                    </span>
                    {plan.price !== 0 && (
                      <span className="text-white/60 text-sm">/{plan.period}</span>
                    )}
                  </div>
                ) : (
                  <div className="text-2xl font-semibold text-white">Custom Pricing</div>
                )}
              </div>

              {/* CTA Button */}
              <Button
                variant={plan.highlighted ? "gold" : "secondary"}
                size="md"
                className="w-full mb-8"
              >
                {plan.cta}
              </Button>

              {/* Features */}
              <div className="space-y-4 border-t border-white/[0.08] pt-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <Check className="text-[#1b9aaa] mt-1 flex-shrink-0" size={18} />
                    <span className="text-white/70 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-white/60 text-sm">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  )
}

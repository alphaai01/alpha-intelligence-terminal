import Link from "next/link"
import Navbar from "@/components/landing/navbar"
import Footer from "@/components/landing/footer"

const pricingTiers = [
  {
    name: "Starter",
    price: "$99",
    period: "month",
    description: "Perfect for individual traders",
    features: [
      "Access to daily trading signals",
      "Basic market analysis",
      "Email alerts",
      "Up to 10 watchlists",
      "Community support",
    ],
    notIncluded: ["Advanced risk analytics", "Portfolio optimization", "Priority support", "API access"],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    price: "$299",
    period: "month",
    description: "For active traders and analysts",
    features: [
      "All Starter features",
      "Advanced technical analysis",
      "Real-time signal notifications",
      "Unlimited watchlists",
      "Risk matrix dashboard",
      "Portfolio analytics",
      "Priority email support",
    ],
    notIncluded: ["API access", "Custom alerts", "Dedicated account manager"],
    cta: "Get Professional",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "quote",
    description: "For institutions and funds",
    features: [
      "All Professional features",
      "Full API access",
      "Custom alert rules",
      "Dedicated account manager",
      "White-label options",
      "Multi-user team accounts",
      "24/7 priority support",
      "Custom integrations",
    ],
    notIncluded: [],
    cta: "Contact Sales",
    popular: false,
  },
]

const comparisonFeatures = [
  { category: "Core Features", items: ["Trading Signals", "Market Analysis", "Watchlists", "Portfolio Tracking"] },
  { category: "Advanced Tools", items: ["Risk Analytics", "Signal Backtesting", "API Access", "Custom Alerts"] },
  {
    category: "Support",
    items: ["Email Support", "Priority Support", "Dedicated Manager", "24/7 Availability"],
  },
]

const pricingFAQs = [
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Yes, you can change your plan at any time. Changes take effect at the next billing cycle.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! All plans come with a 14-day free trial. No credit card required to start.",
  },
  {
    question: "Do you offer annual discounts?",
    answer: "Yes, annual subscriptions receive 20% discount compared to monthly billing.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, wire transfers, and ACH payments for enterprise customers.",
  },
  {
    question: "Can I get a refund?",
    answer: "Yes, we offer a 30-day money-back guarantee if you're not satisfied.",
  },
  {
    question: "Is there volume pricing for teams?",
    answer: "Yes, contact our sales team for custom pricing for teams of 5 or more users.",
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#0d1b2a]">
      <Navbar />

      {/* Pricing Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Transparent Pricing for Every Trader
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Start free. Scale as you grow. No hidden fees, cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="flex justify-center items-center gap-4 mb-12">
            <span className="text-gray-400">Monthly</span>
            <button className="relative inline-flex h-8 w-14 items-center rounded-full bg-[#1b9aaa]/20 border border-[#1b9aaa]/40">
              <span className="inline-block h-6 w-6 transform rounded-full bg-[#1b9aaa] ml-1 transition-transform" />
            </button>
            <span className="text-[#d4a843]">Annual (Save 20%)</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-lg border transition-all ${
                tier.popular
                  ? "border-[#d4a843] bg-gradient-to-b from-[#1b9aaa]/10 to-transparent"
                  : "border-[#1b9aaa]/20 bg-[#0a1019]"
              } p-8 hover:border-[#1b9aaa]/50`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#d4a843] text-[#0d1b2a] px-4 py-1 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{tier.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{tier.price}</span>
                <span className="text-gray-400 ml-2">/{tier.period}</span>
              </div>

              <button
                className={`w-full py-3 rounded font-semibold transition-colors mb-8 ${
                  tier.popular
                    ? "bg-[#1b9aaa] text-white hover:bg-[#1b9aaa]/80"
                    : "bg-[#1b9aaa]/10 text-[#1b9aaa] border border-[#1b9aaa]/30 hover:bg-[#1b9aaa]/20"
                }`}
              >
                {tier.cta}
              </button>

              <div className="space-y-4">
                <p className="text-sm font-semibold text-[#1b9aaa] mb-4">What's included:</p>
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <span className="text-[#1b9aaa] mt-1">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}

                {tier.notIncluded.length > 0 && (
                  <>
                    <p className="text-sm font-semibold text-gray-500 mt-6 mb-4">Not included:</p>
                    {tier.notIncluded.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 opacity-50">
                        <span className="text-gray-600 mt-1">✕</span>
                        <span className="text-gray-500">{feature}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a1019]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-16">Feature Comparison</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1b9aaa]/20">
                  <th className="text-left py-4 px-6 text-gray-400 font-semibold">Feature</th>
                  {pricingTiers.map((tier) => (
                    <th key={tier.name} className="text-center py-4 px-6 text-gray-400 font-semibold">
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((category) => (
                  <tbody key={category.category}>
                    <tr className="border-b border-[#1b9aaa]/10">
                      <td colSpan={4} className="py-4 px-6">
                        <p className="text-[#d4a843] font-semibold">{category.category}</p>
                      </td>
                    </tr>
                    {category.items.map((item) => (
                      <tr key={item} className="border-b border-[#1b9aaa]/5 hover:bg-[#1b2a3d]">
                        <td className="py-3 px-6 text-gray-300">{item}</td>
                        <td className="text-center py-3 px-6 text-[#1b9aaa]">✓</td>
                        <td className="text-center py-3 px-6 text-[#1b9aaa]">✓</td>
                        <td className="text-center py-3 px-6 text-[#1b9aaa]">✓</td>
                      </tr>
                    ))}
                  </tbody>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-16">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {pricingFAQs.map((faq) => (
              <details
                key={faq.question}
                className="bg-[#0a1019] border border-[#1b9aaa]/20 rounded-lg p-6 hover:border-[#1b9aaa]/40 transition-colors group cursor-pointer"
              >
                <summary className="flex items-center justify-between font-semibold text-white">
                  {faq.question}
                  <span className="text-[#d4a843] group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <p className="text-gray-400 mt-4">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1b9aaa]/10 to-[#d4a843]/10 border-y border-[#1b9aaa]/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Level Up Your Trading?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join 10,000+ traders who use Alpha AI Intelligence Terminal
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-[#1b9aaa] text-white rounded hover:bg-[#1b9aaa]/80 transition-colors font-semibold"
          >
            Get Started Free →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}

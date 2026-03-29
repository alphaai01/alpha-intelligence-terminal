"use client"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "How accurate are the AI-generated signals?",
      answer: "Our AI models have delivered 73% directional accuracy in backtests across major asset classes. However, past performance doesn't guarantee future results. We recommend using signals as one input in a diversified strategy.",
    },
    {
      question: "Can I integrate Alpha AI with my existing trading systems?",
      answer: "Yes! We provide a comprehensive REST API and webhooks for real-time signal delivery. Professional and Institutional plans include API access. Our technical team can assist with custom integrations.",
    },
    {
      question: "Is my portfolio data secure?",
      answer: "Absolutely. We use enterprise-grade encryption (AES-256), secure API authentication, and comply with SEBI guidelines. Your data is never shared with third parties and you maintain complete control.",
    },
    {
      question: "What markets and asset classes are covered?",
      answer: "We monitor 47 global financial centers across equities (NSE, BSE, US, EU), commodities, forex, crypto, and ETFs. Coverage is expanded monthly based on user demand.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel anytime with no penalties. Professional plans are month-to-month. If you're on annual billing, you get a pro-rata refund for unused time.",
    },
    {
      question: "Do you offer training or support?",
      answer: "Yes! All paid plans include email support. Professional plan users get priority support. Institutional clients receive dedicated account managers and custom onboarding training.",
    },
  ]

  return (
    <section className="py-24 bg-[#0d1b2a]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-white/60">
            Everything you need to know about Alpha AI Terminal
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#0f2440]/50 border border-white/[0.08] rounded-lg overflow-hidden transition-all duration-300"
            >
              {/* Question */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#0f2440]/80 transition-all"
              >
                <h3 className="text-left font-semibold text-white">
                  {faq.question}
                </h3>
                <ChevronDown
                  size={20}
                  className={`text-[#1b9aaa] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              {openIndex === index && (
                <div className="px-6 py-4 border-t border-white/[0.08] bg-[#0d1b2a]/50">
                  <p className="text-white/70 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-white/60 mb-4">
            Didn't find what you're looking for?
          </p>
          <a
            href="#contact"
            className="inline-block px-6 py-2 text-[#1b9aaa] hover:text-[#d4a843] transition-colors font-medium"
          >
            Contact our support team →
          </a>
        </div>
      </div>
    </section>
  )
}

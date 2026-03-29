import Navbar from "@/components/landing/navbar"
import Hero from "@/components/landing/hero"
import Features from "@/components/landing/features"
import Pricing from "@/components/landing/pricing"
import Testimonials from "@/components/landing/testimonials"
import FAQ from "@/components/landing/faq"
import Footer from "@/components/landing/footer"

function HowItWorks() {
  const steps = [
    { num: "01", title: "Connect", desc: "Link your brokerage account or upload your portfolio. Our system integrates with major Indian and global brokers." },
    { num: "02", title: "Analyze", desc: "Our AI scans 47 global markets, geopolitical events, and your risk profile to generate actionable intelligence." },
    { num: "03", title: "Act", desc: "Receive high-confidence trading signals with full trade setup, AI reasoning, and risk parameters." },
  ]
  return (
    <section className="py-24 px-6 bg-[#0d1b2a]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#1b9aaa] text-sm font-semibold uppercase tracking-wider">How It Works</span>
          <h2 className="text-4xl font-bold text-white mt-3">Intelligence in Three Steps</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.num} className="relative p-8 rounded-xl bg-[#0f2440]/60 border border-white/[0.06] hover:border-[#1b9aaa]/30 transition-all">
              <span className="text-5xl font-bold text-[#1b9aaa]/20">{s.num}</span>
              <h3 className="text-xl font-semibold text-white mt-4">{s.title}</h3>
              <p className="text-white/60 mt-3 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatsBar() {
  const stats = [
    { value: "47", label: "Markets Monitored" },
    { value: "10,000+", label: "Daily Data Points" },
    { value: "89%", label: "Signal Accuracy" },
    { value: "<200ms", label: "Signal Latency" },
  ]
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-[#1b9aaa]/10 via-[#0f2440] to-[#d4a843]/10 border-y border-white/[0.06]">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-3xl md:text-4xl font-bold text-white">{s.value}</div>
            <div className="text-white/50 text-sm mt-2">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-24 px-6 bg-[#0d1b2a]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white">Ready to Trade with Intelligence?</h2>
        <p className="text-white/60 mt-4 text-lg">Start your 14-day free trial and experience the power of AI-driven market intelligence.</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <input type="email" placeholder="Enter your email" className="w-full sm:w-80 px-5 py-3 rounded-lg bg-[#1b2838] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#1b9aaa]" />
          <button className="w-full sm:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-[#d4a843] to-[#b8922e] text-[#0d1b2a] font-semibold hover:from-[#e0b84f] hover:to-[#c49d35] transition-all">Start Free Trial</button>
        </div>
        <p className="text-white/40 text-sm mt-4">No credit card required • 14-day free trial • Cancel anytime</p>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d1b2a]">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <StatsBar />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  )
}

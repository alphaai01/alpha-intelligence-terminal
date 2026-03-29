"use client"

import { useState } from "react"
import Navbar from "@/components/landing/navbar"
import Footer from "@/components/landing/footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
        setTimeout(() => setSubmitStatus("idle"), 5000)
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0d1b2a]">
      <Navbar />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-300">Have questions? Our team is here to help.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="bg-[#0a1019] border border-[#1b9aaa]/20 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-white mb-8">Send us a Message</h2>

                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded text-green-400">
                    ✓ Thank you! We'll get back to you within 24 hours.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded text-red-400">
                    ✕ Something went wrong. Please try again.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="w-full px-4 py-3 bg-[#1b2a3d] border border-[#1b9aaa]/30 rounded text-white placeholder-gray-500 focus:outline-none focus:border-[#1b9aaa]"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="w-full px-4 py-3 bg-[#1b2a3d] border border-[#1b9aaa]/30 rounded text-white placeholder-gray-500 focus:outline-none focus:border-[#1b9aaa]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                        className="w-full px-4 py-3 bg-[#1b2a3d] border border-[#1b9aaa]/30 rounded text-white placeholder-gray-500 focus:outline-none focus:border-[#1b9aaa]"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What is this about?"
                        required
                        className="w-full px-4 py-3 bg-[#1b2a3d] border border-[#1b9aaa]/30 rounded text-white placeholder-gray-500 focus:outline-none focus:border-[#1b9aaa]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more..."
                      rows={6}
                      required
                      className="w-full px-4 py-3 bg-[#1b2a3d] border border-[#1b9aaa]/30 rounded text-white placeholder-gray-500 focus:outline-none focus:border-[#1b9aaa] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-[#1b9aaa] text-white rounded font-semibold hover:bg-[#1b9aaa]/80 disabled:opacity-50 transition-colors"
                  >
                    {submitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Company Info */}
              <div className="bg-[#0a1019] border border-[#1b9aaa]/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm font-medium mb-2">Email</p>
                    <a
                      href="mailto:hello@onealpha.ai"
                      className="text-[#1b9aaa] hover:text-[#d4a843] transition-colors"
                    >
                      hello@onealpha.ai
                    </a>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm font-medium mb-2">Phone</p>
                    <a
                      href="tel:+18005551234"
                      className="text-[#1b9aaa] hover:text-[#d4a843] transition-colors"
                    >
                      +1 (800) 555-1234
                    </a>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm font-medium mb-2">Address</p>
                    <p className="text-gray-400">123 Trading Street, Financial District, NY 10001</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm font-medium mb-2">Hours</p>
                    <p className="text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-[#0a1019] border border-[#1b9aaa]/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/pricing" className="text-[#1b9aaa] hover:text-[#d4a843] transition-colors">
                      View Pricing →
                    </a>
                  </li>
                  <li>
                    <a href="/terminal" className="text-[#1b9aaa] hover:text-[#d4a843] transition-colors">
                      Try Terminal →
                    </a>
                  </li>
                  <li>
                    <a href="/" className="text-[#1b9aaa] hover:text-[#d4a843] transition-colors">
                      Back to Home →
                    </a>
                  </li>
                </ul>
              </div>

              {/* Map Placeholder */}
              <div className="bg-[#0a1019] border border-[#1b9aaa]/20 rounded-lg p-6 h-48 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl mb-2">📍</div>
                  <p className="text-gray-400 text-sm">Map placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

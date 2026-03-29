"use client"

import { useState } from "react"

interface FAQ {
  id: number
  question: string
  answer: string
}

interface Testimonial {
  id: number
  author: string
  role: string
  content: string
  rating: number
}

const mockFAQs: FAQ[] = [
  {
    id: 1,
    question: "What is Alpha AI Intelligence Terminal?",
    answer: "Alpha AI is an AI-powered trading intelligence platform that combines geopolitical analysis, algorithmic signals, and real-time risk monitoring.",
  },
  {
    id: 2,
    question: "How accurate are the trading signals?",
    answer: "Our signals maintain 75-85% accuracy on average, with detailed confidence scores for each signal.",
  },
  {
    id: 3,
    question: "What markets can I trade?",
    answer: "Access signals for stocks, crypto, forex, commodities, and indices through our unified platform.",
  },
]

const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    author: "James Mitchell",
    role: "Portfolio Manager",
    content: "Alpha AI has transformed our trading strategy. The signals are incredibly accurate and the risk analysis is second to none.",
    rating: 5,
  },
  {
    id: 2,
    author: "Sarah Chen",
    role: "Hedge Fund Manager",
    content: "The geopolitical intelligence integration is what sets Alpha AI apart. It's like having a room full of analysts.",
    rating: 5,
  },
  {
    id: 3,
    author: "Michael Rodriguez",
    role: "Day Trader",
    content: "Best trading platform I've used. The real-time signals have increased my win rate significantly.",
    rating: 4,
  },
]

type TabType = "faq" | "testimonials" | "blog"

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState<TabType>("faq")
  const [faqs, setFAQs] = useState<FAQ[]>(mockFAQs)
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mockTestimonials)
  const [editingFAQId, setEditingFAQId] = useState<number | null>(null)
  const [editingTestimonialId, setEditingTestimonialId] = useState<number | null>(null)
  const [faqForm, setFaqForm] = useState({ question: "", answer: "" })
  const [testimonialForm, setTestimonialForm] = useState({
    author: "",
    role: "",
    content: "",
    rating: 5,
  })

  // FAQ Handlers
  const handleAddFAQ = () => {
    if (!faqForm.question || !faqForm.answer) return
    setFAQs([
      ...faqs,
      {
        id: Math.max(...faqs.map((f) => f.id), 0) + 1,
        question: faqForm.question,
        answer: faqForm.answer,
      },
    ])
    setFaqForm({ question: "", answer: "" })
  }

  const handleEditFAQ = (faq: FAQ) => {
    setEditingFAQId(faq.id)
    setFaqForm({ question: faq.question, answer: faq.answer })
  }

  const handleUpdateFAQ = () => {
    if (!editingFAQId || !faqForm.question || !faqForm.answer) return
    setFAQs(
      faqs.map((f) =>
        f.id === editingFAQId ? { ...f, question: faqForm.question, answer: faqForm.answer } : f
      )
    )
    setEditingFAQId(null)
    setFaqForm({ question: "", answer: "" })
  }

  const handleDeleteFAQ = (id: number) => {
    setFAQs(faqs.filter((f) => f.id !== id))
  }

  // Testimonial Handlers
  const handleAddTestimonial = () => {
    if (!testimonialForm.author || !testimonialForm.content) return
    setTestimonials([
      ...testimonials,
      {
        id: Math.max(...testimonials.map((t) => t.id), 0) + 1,
        author: testimonialForm.author,
        role: testimonialForm.role,
        content: testimonialForm.content,
        rating: testimonialForm.rating,
      },
    ])
    setTestimonialForm({ author: "", role: "", content: "", rating: 5 })
  }

  const handleDeleteTestimonial = (id: number) => {
    setTestimonials(testimonials.filter((t) => t.id !== id))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Content Management</h1>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#1b9aaa]/20">
        {(["faq", "testimonials", "blog"] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === tab
                ? "text-[#1b9aaa] border-b-2 border-[#1b9aaa]"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            {tab === "faq" && "FAQs"}
            {tab === "testimonials" && "Testimonials"}
            {tab === "blog" && "Blog"}
          </button>
        ))}
      </div>

      {/* FAQ Tab */}
      {activeTab === "faq" && (
        <div className="space-y-6">
          <div className="bg-[#0a1019] border border-[#1b9aaa]/20 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-6">
              {editingFAQId ? "Edit FAQ" : "Add New FAQ"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Question</label>
                <input
                  type="text"
                  value={faqForm.question}
                  onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                  placeholder="Enter question..."
                  className="w-full px-4 py-2 bg-[#1b2a3d] border border-[#1b9aaa]/30 rounded text-white placeholder-gray-500 focus:outline-none focus:border-[#1b9aaa]"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Answer</label>
                <textarea
                  value={faqForm.answer}
                  onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                  placeholder="Enter answer..."
                  rows={4}
                  className="w-full px-4 py-2 bg-[#1b2a3d] border border-[#1b9aaa]/30 rounded text-white placeholder-gray-500 focus:outline-none focus:border-[#1b9aaa] resize-none"
                />
              </div>

              <div className="flex gap-4 justify-end">
                {editingFAQId && (
                  <button
                    onClick={() => {
                      setEditingFAQId(null)
                      setFaqForm({ question: "", answer: "" })
                    }}
                    className="px-6 py-2 bg-[#1b2a3d] text-gray-400 rounded hover:bg-[#1b3d4d] transition-colors font-medium"
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={editingFAQId ? handleUpdateFAQ : handleAddFAQ}
                  className="px-6 py-2 bg-[#1b9aaa] text-white rounded hover:bg-[#1b9aaa]/80 transition-colors font-medium"
                >
                  {editingFAQId ? "Update" : "Add"} FAQ
                </button>
              </div>
            </div>
          </div>

          {/* FAQs List */}
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-[#0a1019] border border-[#1b9aaa]/20 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white flex-1">{faq.question}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditFAQ(faq)}
                      className="px-3 py-1 bg-[#d4a843]/10 text-[#d4a843] rounded hover:bg-[#d4a843]/20 transition-colors text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteFAQ(faq.id)}
                      className="px-3 py-1 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition-colors text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials Tab */}
      {activeTab === "testimonials" && (
        <div className="space-y-6">
          <div className="bg-[#0a1019] border border-[#1b9aaa]/20 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-6">Add New Testimonial</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Author</label>
                  <input
                    type="text"
                    value={testimonialForm.author}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, author: e.target.value })}
                    placeholder="Author name..."
                    className="w-full px-4 py-2 bg-[#1b2a3d] border border-[#1b9aaa]/30 rounded text-white placeholder-gray-500 focus:outline-none focus:border-[#1b9aaa]"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Role</label>
                  <input
                    type="text"
                    value={testimonialForm.role}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                    placeholder="Job title..."
                    className="w-full px-4 py-2 bg-[#1b2a3d] border border-[#1b9aaa]/30 rounded text-white placeholder-gray-500 focus:outline-none focus:border-[#1b9aaa]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Testimonial</label>
                <textarea
                  value={testimonialForm.content}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, content: e.target.value })}
                  placeholder="What did they say?..."
                  rows={4}
                  className="w-full px-4 py-2 bg-[#1b2a3d] border border-[#1b9aaa]/30 rounded text-white placeholder-gray-500 focus:outline-none focus:border-[#1b9aaa] resize-none"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Rating</label>
                <select
                  value={testimonialForm.rating}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-[#1b2a3d] border border-[#1b9aaa]/30 rounded text-white focus:outline-none focus:border-[#1b9aaa]"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ 5 Stars</option>
                  <option value={4}>⭐⭐⭐⭐ 4 Stars</option>
                  <option value={3}>⭐⭐⭐ 3 Stars</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleAddTestimonial}
                  className="px-6 py-2 bg-[#1b9aaa] text-white rounded hover:bg-[#1b9aaa]/80 transition-colors font-medium"
                >
                  Add Testimonial
                </button>
              </div>
            </div>
          </div>

          {/* Testimonials List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-[#0a1019] border border-[#1b9aaa]/20 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{testimonial.author}</h3>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                    className="px-3 py-1 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition-colors text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-gray-300 mb-4">{testimonial.content}</p>
                <div className="text-[#d4a843]">
                  {"⭐".repeat(testimonial.rating)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Blog Tab */}
      {activeTab === "blog" && (
        <div className="bg-[#0a1019] border border-[#1b9aaa]/20 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Blog Management</h2>
          <p className="text-gray-400">Blog management coming soon. This feature will allow you to create, edit, and publish articles.</p>
          <button className="mt-6 px-6 py-2 bg-[#1b9aaa] text-white rounded hover:bg-[#1b9aaa]/80 transition-colors font-medium">
            ➕ Create Blog Post
          </button>
        </div>
      )}
    </div>
  )
}

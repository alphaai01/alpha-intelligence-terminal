"use client"

import { useState } from "react"

interface Signal {
  id: number
  ticker: string
  direction: "BUY" | "SELL"
  confidence: number
  status: "active" | "inactive"
  createdAt: string
}

const mockSignals: Signal[] = [
  {
    id: 1,
    ticker: "AAPL",
    direction: "BUY",
    confidence: 85,
    status: "active",
    createdAt: "2024-03-28",
  },
  {
    id: 2,
    ticker: "TSLA",
    direction: "SELL",
    confidence: 72,
    status: "active",
    createdAt: "2024-03-27",
  },
  {
    id: 3,
    ticker: "NVDA",
    direction: "BUY",
    confidence: 91,
    status: "active",
    createdAt: "2024-03-26",
  },
  {
    id: 4,
    ticker: "MSFT",
    direction: "BUY",
    confidence: 78,
    status: "inactive",
    createdAt: "2024-03-25",
  },
  {
    id: 5,
    ticker: "AMZN",
    direction: "SELL",
    confidence: 65,
    status: "active",
    createdAt: "2024-03-24",
  },
]

export default function SignalsPage() {
  const [signals, setSignals] = useState<Signal[]>(mockSignals)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    ticker: "",
    direction: "BUY" as "BUY" | "SELL",
    confidence: 50,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      setSignals(
        signals.map((s) =>
          s.id === editingId
            ? {
                ...s,
                ticker: formData.ticker,
                direction: formData.direction,
                confidence: formData.confidence,
              }
            : s
        )
      )
      setEditingId(null)
    } else {
      setSignals([
        ...signals,
        {
          id: Math.max(...signals.map((s) => s.id), 0) + 1,
          ticker: formData.ticker,
          direction: formData.direction,
          confidence: formData.confidence,
          status: "active",
          createdAt: new Date().toISOString().split("T")[0],
        },
      ])
    }
    setFormData({ ticker: "", direction: "BUY", confidence: 50 })
    setShowForm(false)
  }

  const handleEdit = (signal: Signal) => {
    setEditingId(signal.id)
    setFormData({
      ticker: signal.ticker,
      direction: signal.direction,
      confidence: signal.confidence,
    })
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    setSignals(signals.filter((s) => s.id !== id))
  }

  const toggleStatus = (id: number) => {
    setSignals(
      signals.map((s) =>
        s.id === id ? { ...s, status: s.status === "active" ? "inactive" : "active" } : s
      )
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Trading Signals</h1>
        <button
          onClick={() => {
            setEditingId(null)
            setFormData({ ticker: "", direction: "BUY", confidence: 50 })
            setShowForm(!showForm)
          }}
          className="px-6 py-2 bg-[#1b9aaa] text-white rounded hover:bg-[#1b9aaa]/80 transition-colors font-medium"
        >
          {showForm ? "Cancel" : "➕ Add New Signal"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-[#0a1019] border border-[#1b9aaa]/20 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">{editingId ? "Edit Signal" : "Create New Signal"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Ticker Symbol</label>
                <input
                  type="text"
                  value={formData.ticker}
                  onChange={(e) => setFormData({ ...formData, ticker: e.target.value.toUpperCase() })}
                  placeholder="e.g., AAPL"
                  className="w-full px-4 py-2 bg-[#1b2a3d] border border-[#1b9aaa]/30 rounded text-white placeholder-gray-500 focus:outline-none focus:border-[#1b9aaa]"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Direction</label>
                <select
                  value={formData.direction}
                  onChange={(e) => setFormData({ ...formData, direction: e.target.value as "BUY" | "SELL" })}
                  className="w-full px-4 py-2 bg-[#1b2a3d] border border-[#1b9aaa]/30 rounded text-white focus:outline-none focus:border-[#1b9aaa]"
                >
                  <option value="BUY">BUY</option>
                  <option value="SELL">SELL</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  Confidence: {formData.confidence}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.confidence}
                  onChange={(e) => setFormData({ ...formData, confidence: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex gap-4 justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                }}
                className="px-6 py-2 bg-[#1b2a3d] text-gray-400 rounded hover:bg-[#1b3d4d] transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#1b9aaa] text-white rounded hover:bg-[#1b9aaa]/80 transition-colors font-medium"
              >
                {editingId ? "Update Signal" : "Create Signal"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Signals Table */}
      <div className="bg-[#0a1019] border border-[#1b9aaa]/20 rounded-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1b9aaa]/20">
                <th className="px-4 py-3 text-left text-gray-400 font-semibold">Ticker</th>
                <th className="px-4 py-3 text-left text-gray-400 font-semibold">Direction</th>
                <th className="px-4 py-3 text-left text-gray-400 font-semibold">Confidence</th>
                <th className="px-4 py-3 text-left text-gray-400 font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-gray-400 font-semibold">Created</th>
                <th className="px-4 py-3 text-left text-gray-400 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {signals.map((signal) => (
                <tr key={signal.id} className="border-b border-[#1b9aaa]/10 hover:bg-[#1b2a3d] transition-colors">
                  <td className="px-4 py-3 text-white font-semibold">{signal.ticker}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        signal.direction === "BUY"
                          ? "bg-[#1b9aaa]/20 text-[#1b9aaa]"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {signal.direction}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-[#1b2a3d] rounded-full overflow-hidden max-w-xs">
                        <div
                          className="h-full bg-gradient-to-r from-[#1b9aaa] to-[#d4a843]"
                          style={{ width: `${signal.confidence}%` }}
                        />
                      </div>
                      <span className="text-[#1b9aaa] font-semibold w-10">{signal.confidence}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleStatus(signal.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                        signal.status === "active"
                          ? "bg-[#1b9aaa]/20 text-[#1b9aaa] hover:bg-[#1b9aaa]/30"
                          : "bg-gray-700/30 text-gray-400 hover:bg-gray-700/50"
                      }`}
                    >
                      {signal.status === "active" ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{signal.createdAt}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(signal)}
                      className="px-3 py-1 bg-[#d4a843]/10 text-[#d4a843] rounded hover:bg-[#d4a843]/20 transition-colors text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(signal.id)}
                      className="px-3 py-1 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition-colors text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

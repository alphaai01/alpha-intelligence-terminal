"use client"

import { useState } from "react"

const mockLeads = [
  { id: 1, name: "John Doe", email: "john@example.com", source: "landing", status: "qualified", date: "2024-03-28" },
  { id: 2, name: "Sarah Smith", email: "sarah@example.com", source: "webinar", status: "contacted", date: "2024-03-27" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", source: "referral", status: "new", date: "2024-03-26" },
  { id: 4, name: "Emily Chen", email: "emily@example.com", source: "ad", status: "qualified", date: "2024-03-25" },
  { id: 5, name: "David Wilson", email: "david@example.com", source: "landing", status: "contacted", date: "2024-03-24" },
]

const signalPerformance = [
  { signal: "Tech Bull", accuracy: 82 },
  { signal: "Energy Short", accuracy: 76 },
  { signal: "Crypto Wave", accuracy: 68 },
  { signal: "Gold Long", accuracy: 81 },
]

export default function AdminDashboard() {
  const [leads] = useState(mockLeads)

  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Leads" value="1,247" change="+12%" trend="up" />
        <MetricCard title="Active Signals" value="23" change="+3" trend="up" />
        <MetricCard title="Users" value="456" change="+8%" trend="up" />
        <MetricCard title="Revenue" value="$125K" change="+24%" trend="up" />
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Signal Performance */}
        <div className="lg:col-span-2 bg-[#0a1019] border border-[#1b9aaa]/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-6">Signal Performance</h3>
          <div className="space-y-4">
            {signalPerformance.map((item) => (
              <div key={item.signal} className="flex items-center justify-between">
                <span className="text-gray-300">{item.signal}</span>
                <div className="flex items-center space-x-3 flex-1 ml-4">
                  <div className="flex-1 h-2 bg-[#1b2a3d] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#1b9aaa] to-[#d4a843]"
                      style={{ width: `${item.accuracy}%` }}
                    />
                  </div>
                  <span className="text-[#1b9aaa] font-semibold w-12 text-right">{item.accuracy}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#0a1019] border border-[#1b9aaa]/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-[#1b9aaa] text-white rounded hover:bg-[#1b9aaa]/80 transition-colors font-medium">
              ➕ New Signal
            </button>
            <button className="w-full px-4 py-3 bg-[#d4a843]/10 text-[#d4a843] rounded hover:bg-[#d4a843]/20 transition-colors font-medium border border-[#d4a843]/30">
              📧 Send Email
            </button>
            <button className="w-full px-4 py-3 bg-[#1b9aaa]/10 text-[#1b9aaa] rounded hover:bg-[#1b9aaa]/20 transition-colors font-medium border border-[#1b9aaa]/30">
              📊 Export Report
            </button>
            <button className="w-full px-4 py-3 bg-[#1b9aaa]/10 text-[#1b9aaa] rounded hover:bg-[#1b9aaa]/20 transition-colors font-medium border border-[#1b9aaa]/30">
              ⚙️ Settings
            </button>
          </div>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-[#0a1019] border border-[#1b9aaa]/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Recent Leads</h3>
          <a href="/admin/leads" className="text-[#1b9aaa] hover:text-[#d4a843] transition-colors font-medium">
            View All →
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1b9aaa]/20">
                <th className="px-4 py-3 text-left text-gray-400 font-semibold">Name</th>
                <th className="px-4 py-3 text-left text-gray-400 font-semibold">Email</th>
                <th className="px-4 py-3 text-left text-gray-400 font-semibold">Source</th>
                <th className="px-4 py-3 text-left text-gray-400 font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-gray-400 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-[#1b9aaa]/10 hover:bg-[#1b2a3d] transition-colors">
                  <td className="px-4 py-3 text-white">{lead.name}</td>
                  <td className="px-4 py-3 text-gray-400">{lead.email}</td>
                  <td className="px-4 py-3 text-gray-400">{lead.source}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        lead.status === "qualified"
                          ? "bg-[#1b9aaa]/20 text-[#1b9aaa]"
                          : lead.status === "contacted"
                            ? "bg-[#d4a843]/20 text-[#d4a843]"
                            : "bg-gray-700/30 text-gray-400"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{lead.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function MetricCard({
  title,
  value,
  change,
  trend,
}: {
  title: string
  value: string
  change: string
  trend: "up" | "down"
}) {
  return (
    <div className="bg-[#0a1019] border border-[#1b9aaa]/20 rounded-lg p-6 hover:border-[#1b9aaa]/40 transition-colors">
      <p className="text-gray-400 text-sm font-medium mb-2">{title}</p>
      <div className="flex items-end justify-between">
        <h3 className="text-3xl font-bold text-white">{value}</h3>
        <span className={`text-sm font-semibold ${trend === "up" ? "text-[#1b9aaa]" : "text-red-500"}`}>
          {trend === "up" ? "↑" : "↓"} {change}
        </span>
      </div>
    </div>
  )
}

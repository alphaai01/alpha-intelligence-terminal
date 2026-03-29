"use client"

import { useState } from "react"

interface Lead {
  id: number
  name: string
  email: string
  phone: string
  source: string
  status: "new" | "contacted" | "qualified" | "converted"
  date: string
}

const mockLeads: Lead[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1-555-0101",
    source: "landing",
    status: "qualified",
    date: "2024-03-28",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@example.com",
    phone: "+1-555-0102",
    source: "webinar",
    status: "contacted",
    date: "2024-03-27",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1-555-0103",
    source: "referral",
    status: "new",
    date: "2024-03-26",
  },
  {
    id: 4,
    name: "Emily Chen",
    email: "emily@example.com",
    phone: "+1-555-0104",
    source: "ad",
    status: "qualified",
    date: "2024-03-25",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david@example.com",
    phone: "+1-555-0105",
    source: "landing",
    status: "contacted",
    date: "2024-03-24",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    email: "lisa@example.com",
    phone: "+1-555-0106",
    source: "webinar",
    status: "new",
    date: "2024-03-23",
  },
  {
    id: 7,
    name: "Robert Martinez",
    email: "robert@example.com",
    phone: "+1-555-0107",
    source: "referral",
    status: "qualified",
    date: "2024-03-22",
  },
  {
    id: 8,
    name: "Jennifer Taylor",
    email: "jennifer@example.com",
    phone: "+1-555-0108",
    source: "landing",
    status: "converted",
    date: "2024-03-21",
  },
  {
    id: 9,
    name: "William Brown",
    email: "william@example.com",
    phone: "+1-555-0109",
    source: "ad",
    status: "new",
    date: "2024-03-20",
  },
  {
    id: 10,
    name: "Patricia Davis",
    email: "patricia@example.com",
    phone: "+1-555-0110",
    source: "webinar",
    status: "contacted",
    date: "2024-03-19",
  },
]

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterSource, setFilterSource] = useState<string>("all")

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm)
    const matchesStatus = filterStatus === "all" || lead.status === filterStatus
    const matchesSource = filterSource === "all" || lead.source === filterSource

    return matchesSearch && matchesStatus && matchesSource
  })

  const handleStatusChange = (id: number, newStatus: Lead["status"]) => {
    setLeads(leads.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead)))
  }

  const handleExport = () => {
    const csv = [
      ["Name", "Email", "Phone", "Source", "Status", "Date"],
      ...filteredLeads.map((lead) => [lead.name, lead.email, lead.phone, lead.source, lead.status, lead.date]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "leads.csv"
    a.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Lead Management</h1>
        <button
          onClick={handleExport}
          className="px-6 py-2 bg-[#d4a843] text-[#0d1b2a] rounded hover:bg-[#d4a843]/80 transition-colors font-medium"
        >
          📥 Export CSV
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-[#0a1019] border border-[#1b9aaa]/20 rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Name, email, or phone..."
              className="w-full px-4 py-2 bg-[#1b2a3d] border border-[#1b9aaa]/30 rounded text-white placeholder-gray-500 focus:outline-none focus:border-[#1b9aaa]"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 bg-[#1b2a3d] border border-[#1b9aaa]/30 rounded text-white focus:outline-none focus:border-[#1b9aaa]"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="converted">Converted</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Source</label>
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="w-full px-4 py-2 bg-[#1b2a3d] border border-[#1b9aaa]/30 rounded text-white focus:outline-none focus:border-[#1b9aaa]"
            >
              <option value="all">All Sources</option>
              <option value="landing">Landing Page</option>
              <option value="webinar">Webinar</option>
              <option value="referral">Referral</option>
              <option value="ad">Paid Ad</option>
            </select>
          </div>
        </div>

        <div className="text-sm text-gray-400">
          Showing {filteredLeads.length} of {leads.length} leads
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-[#0a1019] border border-[#1b9aaa]/20 rounded-lg p-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1b9aaa]/20">
              <th className="px-4 py-3 text-left text-gray-400 font-semibold">Name</th>
              <th className="px-4 py-3 text-left text-gray-400 font-semibold">Email</th>
              <th className="px-4 py-3 text-left text-gray-400 font-semibold">Phone</th>
              <th className="px-4 py-3 text-left text-gray-400 font-semibold">Source</th>
              <th className="px-4 py-3 text-left text-gray-400 font-semibold">Status</th>
              <th className="px-4 py-3 text-left text-gray-400 font-semibold">Date</th>
              <th className="px-4 py-3 text-left text-gray-400 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="border-b border-[#1b9aaa]/10 hover:bg-[#1b2a3d] transition-colors">
                <td className="px-4 py-3 text-white font-semibold">{lead.name}</td>
                <td className="px-4 py-3 text-gray-400">{lead.email}</td>
                <td className="px-4 py-3 text-gray-400">{lead.phone}</td>
                <td className="px-4 py-3">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#1b9aaa]/10 text-[#1b9aaa]">
                    {lead.source}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={lead.status}
                    onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead["status"])}
                    className={`px-3 py-1 rounded text-xs font-medium border-none focus:outline-none cursor-pointer ${
                      lead.status === "qualified"
                        ? "bg-[#1b9aaa]/20 text-[#1b9aaa]"
                        : lead.status === "contacted"
                          ? "bg-[#d4a843]/20 text-[#d4a843]"
                          : lead.status === "converted"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-700/30 text-gray-400"
                    }`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="converted">Converted</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-gray-400">{lead.date}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="px-3 py-1 bg-[#1b9aaa]/10 text-[#1b9aaa] rounded hover:bg-[#1b9aaa]/20 transition-colors text-sm font-medium">
                    View
                  </button>
                  <button className="px-3 py-1 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition-colors text-sm font-medium">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredLeads.length === 0 && (
          <div className="text-center py-8 text-gray-400">No leads found matching your criteria</div>
        )}
      </div>
    </div>
  )
}

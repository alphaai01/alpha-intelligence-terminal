"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: "📊" },
    { name: "Signals", href: "/admin/signals", icon: "⚡" },
    { name: "Leads", href: "/admin/leads", icon: "👥" },
    { name: "Content", href: "/admin/content", icon: "📝" },
    { name: "Users", href: "/admin/users", icon: "👤" },
    { name: "Settings", href: "/admin/settings", icon: "⚙️" },
  ]

  return (
    <div className="flex h-screen bg-[#0d1b2a]">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-[#0a1019] border-r border-[#1b9aaa]/20 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[#1b9aaa]/20">
          <div className="flex items-center justify-between">
            <div className={`${!sidebarOpen && "hidden"}`}>
              <h1 className="text-xl font-bold text-[#1b9aaa]">Alpha AI</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-[#1b9aaa]/10 rounded"
            >
              {sidebarOpen ? "⬅️" : "➡️"}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-[#1b9aaa] text-white"
                    : "text-gray-400 hover:bg-[#1b9aaa]/10"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className={`${!sidebarOpen && "hidden"}`}>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#1b9aaa]/20">
          <button className="w-full px-4 py-2 bg-[#d4a843]/10 text-[#d4a843] rounded hover:bg-[#d4a843]/20 transition-colors text-sm font-medium">
            {sidebarOpen ? "Sign Out" : "🚪"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 bg-[#0a1019] border-b border-[#1b9aaa]/20 flex items-center justify-between px-8">
          <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 bg-[#1b2a3d] border border-[#1b9aaa]/30 rounded text-white placeholder-gray-500 focus:outline-none focus:border-[#1b9aaa]"
            />
            <button className="w-10 h-10 bg-[#1b9aaa]/10 rounded-full flex items-center justify-center hover:bg-[#1b9aaa]/20">
              🔔
            </button>
            <button className="w-10 h-10 bg-[#1b9aaa]/10 rounded-full flex items-center justify-center hover:bg-[#1b9aaa]/20">
              👤
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </div>
    </div>
  )
}

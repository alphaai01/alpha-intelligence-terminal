"use client"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"

interface TopBarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function TopBar({ activeTab, onTabChange }: TopBarProps) {
  const [currentTime, setCurrentTime] = useState<string>("")
  const [feedCount, setFeedCount] = useState(47)
  const [healthScore, setHealthScore] = useState(73.2)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const utcTime = now.toLocaleString("en-US", {
        timeZone: "UTC",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      setCurrentTime(utcTime)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const tabs = [
    { id: "market-pulse", label: "MARKET PULSE" },
    { id: "signal-engine", label: "SIGNAL ENGINE" },
    { id: "portfolio", label: "PORTFOLIO" },
    { id: "risk-matrix", label: "RISK MATRIX" },
  ]

  const getHealthColor = () => {
    if (healthScore >= 70) return "text-green-400"
    if (healthScore >= 50) return "text-amber-400"
    return "text-red-400"
  }

  return (
    <div className="bg-[#0d1b2a] border-b border-white/[0.08] px-6 py-4">
      {/* Top Row */}
      <div className="flex items-center justify-between mb-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1b9aaa] to-[#d4a843]" />
          <span className="text-white font-bold tracking-wide">INTELLIGENCE TERMINAL v2.0</span>
        </div>

        {/* Right: Status Indicators */}
        <div className="flex items-center gap-6">
          {/* Health Index */}
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-sm">Market Health</span>
            <Badge variant="default">
              <span className={`font-bold ${getHealthColor()}`}>
                {healthScore.toFixed(1)}%
              </span>
            </Badge>
          </div>

          {/* LIVE Indicator */}
          <div className="flex items-center gap-2">
            <div className="relative w-3 h-3 rounded-full bg-green-500">
              <div className="absolute inset-0 rounded-full bg-green-500 animate-pulse" />
            </div>
            <span className="text-green-400 text-xs font-semibold">LIVE</span>
          </div>

          {/* Feed Count */}
          <div className="text-right">
            <div className="text-white font-semibold text-sm">{feedCount}</div>
            <div className="text-white/50 text-xs">Active Events</div>
          </div>

          {/* UTC Clock */}
          <div className="text-right border-l border-white/[0.08] pl-6">
            <div className="text-white font-mono text-sm">{currentTime || "00:00:00"}</div>
            <div className="text-white/50 text-xs">UTC</div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Tabs */}
      <div className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-2 px-1 text-sm font-semibold tracking-wider transition-all ${
              activeTab === tab.id
                ? "text-[#1b9aaa] border-b-2 border-[#1b9aaa]"
                : "text-white/50 hover:text-white/70 border-b-2 border-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}

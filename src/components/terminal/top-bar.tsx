"use client"

import { useState, useEffect } from "react"
import { Globe, Map, BarChart3, Briefcase, Wifi } from "lucide-react"

interface TopBarProps {
    activeTab: string
    onTabChange: (tab: string) => void
}

export default function TopBar({ activeTab, onTabChange }: TopBarProps) {
    const [currentTime, setCurrentTime] = useState<string>("")
    const [gtiValue] = useState(71.4)
    const [gtiChange] = useState("+2.1")
    const [feedCount] = useState(2)

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
    { id: "earth-pulse", label: "EARTH PULSE", icon: Globe },
    { id: "geo-map", label: "GEO MAP", icon: Map },
    { id: "ai-signals", label: "AI SIGNALS", icon: BarChart3 },
    { id: "portfolio", label: "PORTFOLIO", icon: Briefcase },
      ]

  const getGtiColor = () => {
        if (gtiValue >= 70) return "text-amber-400"
        if (gtiValue >= 50) return "text-yellow-400"
        return "text-green-400"
  }

  const getGtiLabel = () => {
        if (gtiValue >= 80) return "CRITICAL"
        if (gtiValue >= 60) return "ELEVATED"
        if (gtiValue >= 40) return "MODERATE"
        return "LOW"
  }

  const getGtiLabelColor = () => {
        if (gtiValue >= 80) return "bg-red-500/20 text-red-400 border-red-500/30"
        if (gtiValue >= 60) return "bg-amber-500/20 text-amber-400 border-amber-500/30"
        if (gtiValue >= 40) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
        return "bg-green-500/20 text-green-400 border-green-500/30"
  }

  return (
        <div className="bg-[#0a1628] border-b border-white/[0.06] px-4 py-2 flex items-center justify-between">
          {/* Left: Logo + GTI */}
              <div className="flex items-center gap-6">
                {/* Logo */}
                      <div className="flex items-center gap-2">
                                <img
                                              src="https://www.onealphaai.com/dist/img/Ai-For-Alpha-alt-2.png"
                                              alt="Alpha AI"
                                              className="h-7"
                                            />
                                <div className="hidden sm:block">
                                            <div className="text-[10px] text-white/40 tracking-[0.2em] font-mono uppercase">Intelligence Terminal v2.0</div>div>
                                </div>div>
                      </div>div>
              
                {/* GTI Display */}
                      <div className="flex items-center gap-3 pl-4 border-l border-white/[0.08]">
                                <div className="w-4 h-4 rounded-full border-2 border-white/20 flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                                </div>div>
                                <div>
                                            <div className="text-[10px] text-white/40 tracking-wider font-mono">GLOBAL TENSION INDEX (GTI)</div>div>
                                            <div className="flex items-center gap-2">
                                                          <span className={`text-xl font-bold font-mono ${getGtiColor()}`}>{gtiValue}</span>span>
                                                          <span className="text-amber-400 text-xs font-mono">{gtiChange}</span>span>
                                                          <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold tracking-wider ${getGtiLabelColor()}`}>
                                                            {getGtiLabel()}
                                                          </span>span>
                                            </div>div>
                                </div>div>
                      </div>div>
              </div>div>
        
          {/* Center: Navigation Tabs */}
              <div className="flex items-center gap-1 bg-[#0d1f35]/60 rounded-full p-1 border border-white/[0.06]">
                {tabs.map((tab) => {
                    const Icon = tab.icon
                                return (
                                              <button
                                                              key={tab.id}
                                                              onClick={() => onTabChange(tab.id)}
                                                              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                                                                                activeTab === tab.id
                                                                                  ? "bg-[#1b9aaa]/20 text-[#1b9aaa] border border-[#1b9aaa]/30"
                                                                                  : "text-white/50 hover:text-white/70 border border-transparent"
                                                              }`}
                                                            >
                                                            <Icon size={14} />
                                                            <span className="hidden md:inline">{tab.label}</span>span>
                                              </button>button>
                                            )
                })}
              </div>div>
        
          {/* Right: Live Status + Clock */}
              <div className="flex items-center gap-4">
                {/* Live Indicator */}
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/20 bg-green-500/5">
                                <Wifi size={12} className="text-green-400" />
                                <span className="text-green-400 text-xs font-mono font-semibold">LIVE</span>span>
                                <span className="text-white/40 text-xs font-mono">· {feedCount} feeds</span>span>
                      </div>div>
              
                {/* UTC Clock */}
                      <div className="flex items-center gap-2 text-white/50">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                                            <path d="M12 6v6l4 2" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>svg>
                                <span className="text-xs font-mono">{currentTime || "00:00:00"} UTC</span>span>
                      </div>div>
              </div>div>
        </div>div>
      )
}</div>

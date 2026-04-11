"use client"

import { useState, useEffect } from "react"
import { Globe, Map, BarChart3, Briefcase, Wifi, Shield } from "lucide-react"

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
    { id: "risk-matrix", label: "RISK MATRIX", icon: Shield },
      ]

  const getGtiStatus = () => {
        if (gtiValue >= 80) return { label: "CRITICAL", color: "bg-red-500" }
        if (gtiValue >= 60) return { label: "ELEVATED", color: "bg-amber-500" }
        if (gtiValue >= 35) return { label: "GUARDED", color: "bg-yellow-500" }
        return { label: "LOW", color: "bg-green-500" }
  }

  const status = getGtiStatus()

  return (
        <div className="h-14 bg-[#0a1628] border-b border-white/[0.06] flex items-center justify-between px-4 relative z-50">
              <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                                <img src="/alpha-ai-logo.svg" alt="Alpha AI" className="h-6" onError={(e) => { const target = e.target as HTMLImageElement; target.style.display = 'none' }} />
                                <span className="text-white font-bold text-lg tracking-tight">Alpha <span className="text-[#1b9aaa]">AI</span>span></span>span>
                      </div>div>
                      <span className="text-white/30 text-[10px] font-mono tracking-wider hidden md:block">Intelligence Terminal v2.0</span>span>
              </div>div>
        
              <div className="flex items-center gap-2">
                      <div className="hidden md:flex items-center gap-2 mr-4 bg-white/5 rounded-lg px-3 py-1.5">
                                <div className="w-2 h-2 rounded-full bg-white/40 animate-pulse" />
                                <div className="text-white/40 text-[9px] font-mono tracking-wider">GLOBAL TENSION INDEX (GTI)</div>div>
                                <div className="text-white text-lg font-bold font-mono">{gtiValue}</div>div>
                                <div className="text-green-400 text-xs font-mono">{gtiChange}</div>div>
                                <span className={`text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded ${status.color} text-white`}>{status.label}</span>span>
                      </div>div>
              
                {tabs.map((tab) => {
                    const Icon = tab.icon
                                return (
                                              <button key={tab.id} onClick={() => onTabChange(tab.id)} className={"flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono tracking-wider transition-all " + (activeTab === tab.id ? "bg-[#1b9aaa]/20 text-[#1b9aaa] border border-[#1b9aaa]/30" : "text-white/50 hover:text-white/70 hover:bg-white/5")}>
                                                            <Icon size={14} />
                                                            <span className="hidden lg:inline">{tab.label}</span>span>
                                              </button>button>
                                            )
        })}
              </div>div>
        
              <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1">
                                <Wifi size={12} className="text-green-400 animate-pulse" />
                                <span className="text-green-400 text-[10px] font-mono font-semibold">LIVE</span>span>
                                <span className="text-white/40 text-[10px] font-mono">&middot; {feedCount} feeds</span>span>
                      </div>div>
                      <div className="flex items-center gap-1.5 text-white/40">
                                <span className="text-[10px] font-mono">{currentTime} UTC</span>span>
                      </div>div>
              </div>div>
        </div>div>
      )
}</div>

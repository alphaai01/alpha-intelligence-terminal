"use client"

import { useState } from "react"
import TopBar from "@/components/terminal/top-bar"
import MarketPulse from "@/components/terminal/market-pulse"
import SignalEngine from "@/components/terminal/signal-engine"
import Portfolio from "@/components/terminal/portfolio"
import RiskMatrix from "@/components/terminal/risk-matrix"

type TabType = "market-pulse" | "signal-engine" | "portfolio" | "risk-matrix"

export default function TerminalPage() {
  const [activeTab, setActiveTab] = useState<TabType>("market-pulse")

  return (
    <div className="h-full w-full flex flex-col bg-[#0d1b2a]">
      <TopBar activeTab={activeTab} onTabChange={(tab: string) => setActiveTab(tab as TabType)} />

      <div className="flex-1 overflow-auto">
        {activeTab === "market-pulse" && <MarketPulse />}
        {activeTab === "signal-engine" && <SignalEngine />}
        {activeTab === "portfolio" && <Portfolio />}
        {activeTab === "risk-matrix" && <RiskMatrix />}
      </div>
    </div>
  )
}

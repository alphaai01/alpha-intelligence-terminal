"use client"

import { useState } from "react"
import TopBar from "@/components/terminal/top-bar"
import MarketPulse from "@/components/terminal/market-pulse"
import GeoMap from "@/components/terminal/geo-map"
import SignalEngine from "@/components/terminal/signal-engine"
import Portfolio from "@/components/terminal/portfolio"

type TabType = "earth-pulse" | "geo-map" | "ai-signals" | "portfolio"

export default function TerminalPage() {
  const [activeTab, setActiveTab] = useState<TabType>("earth-pulse")

  return (
    <div className="h-screen w-full flex flex-col bg-[#060d19]">
      <TopBar
        activeTab={activeTab}
        onTabChange={(tab: string) => setActiveTab(tab as TabType)}
      />
      <div className="flex-1 overflow-hidden">
        {activeTab === "earth-pulse" && <MarketPulse />}
        {activeTab === "geo-map" && <GeoMap />}
        {activeTab === "ai-signals" && <SignalEngine />}
        {activeTab === "portfolio" && <Portfolio />}
      </div>
    </div>
  )
}

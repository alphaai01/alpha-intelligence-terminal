"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown } from "lucide-react"

export default function SignalEngine() {
  const [selectedSignal, setSelectedSignal] = useState(0)
  const [assetFilter, setAssetFilter] = useState("All")
  const [directionFilter, setDirectionFilter] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const signals = [
    {
      ticker: "RELIANCE",
      name: "Reliance Industries",
      direction: "BUY",
      confidence: 87,
      price: 3245.50,
      change: 2.1,
      assetClass: "Equities",
      bullish: 78,
      bearish: 22,
      tags: ["Momentum", "Breakout", "Bullish"],
      triggeringEvent: "Stock broke above 200-day MA with volume surge 40% above average",
      currentPrice: 3245.50,
      entry: 3240,
      stopLoss: 3180,
      target: 3400,
      riskReward: "1:3.8",
      atr: 65.30,
      maxPosition: 2.5,
    },
    {
      ticker: "INFY",
      name: "Infosys Limited",
      direction: "SELL",
      confidence: 72,
      price: 1845.20,
      change: -1.5,
      assetClass: "Equities",
      bullish: 35,
      bearish: 65,
      tags: ["Resistance", "Bearish Divergence"],
      triggeringEvent: "Failed to break above key resistance at 1900 with declining volume",
      currentPrice: 1845.20,
      entry: 1850,
      stopLoss: 1920,
      target: 1650,
      riskReward: "1:2.8",
      atr: 45.20,
      maxPosition: 1.8,
    },
    {
      ticker: "TATAMOTORS",
      name: "Tata Motors",
      direction: "HOLD",
      confidence: 58,
      price: 680.45,
      change: 0.8,
      assetClass: "Equities",
      bullish: 48,
      bearish: 52,
      tags: ["Consolidation", "Waiting"],
      triggeringEvent: "Trading in narrow range between support and resistance",
      currentPrice: 680.45,
      entry: 685,
      stopLoss: 660,
      target: 720,
      riskReward: "1:2.0",
      atr: 25.40,
      maxPosition: 1.2,
    },
    {
      ticker: "SBIN",
      name: "State Bank of India",
      direction: "BUY",
      confidence: 81,
      price: 520.30,
      change: 1.9,
      assetClass: "Equities",
      bullish: 76,
      bearish: 24,
      tags: ["Momentum", "Support"],
      triggeringEvent: "Bullish reversal from support level with strong buying pressure",
      currentPrice: 520.30,
      entry: 515,
      stopLoss: 490,
      target: 580,
      riskReward: "1:2.8",
      atr: 32.10,
      maxPosition: 2.0,
    },
    {
      ticker: "HDFCBANK",
      name: "HDFC Bank",
      direction: "BUY",
      confidence: 89,
      price: 1980.75,
      change: 2.3,
      assetClass: "Equities",
      bullish: 82,
      bearish: 18,
      tags: ["Breakout", "Strong Momentum"],
      triggeringEvent: "Breaking out of ascending triangle with impressive volume confirmation",
      currentPrice: 1980.75,
      entry: 1975,
      stopLoss: 1925,
      target: 2150,
      riskReward: "1:4.2",
      atr: 58.40,
      maxPosition: 2.8,
    },
  ]

  const assetClasses = ["All", "Equities", "Commodities", "Forex", "Crypto", "ETFs", "Bonds"]
  const directions = ["All", "BUY", "SELL", "HOLD"]

  const filteredSignals = signals.filter((signal) => {
    const matchesAsset = assetFilter === "All" || signal.assetClass === assetFilter
    const matchesDirection = directionFilter === "All" || signal.direction === directionFilter
    const matchesSearch =
      signal.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      signal.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesAsset && matchesDirection && matchesSearch
  })

  const signal = filteredSignals[selectedSignal] || signals[0]

  const getDirectionColor = (direction: string) => {
    switch (direction) {
      case "BUY":
        return "success"
      case "SELL":
        return "danger"
      case "HOLD":
        return "warning"
      default:
        return "default"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[calc(100vh-200px)] p-6">
      {/* Left Panel: Signal List (40%) */}
      <div className="lg:col-span-2 flex flex-col gap-4 overflow-hidden">
        {/* Asset Class Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {assetClasses.map((assetClass) => (
            <button
              key={assetClass}
              onClick={() => setAssetFilter(assetClass)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                assetFilter === assetClass
                  ? "bg-[#1b9aaa] text-white"
                  : "bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              {assetClass}
            </button>
          ))}
        </div>

        {/* Direction Filter */}
        <div className="flex gap-2">
          {directions.map((direction) => (
            <button
              key={direction}
              onClick={() => setDirectionFilter(direction)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                directionFilter === direction
                  ? "bg-[#1b9aaa] text-white"
                  : "bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              {direction}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <Input
          placeholder="Search ticker or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-sm"
        />

        {/* Signal List */}
        <Card className="flex-1 overflow-hidden flex flex-col">
          <CardContent className="space-y-2 overflow-y-auto flex-1">
            {filteredSignals.map((sig, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedSignal(idx)}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  selectedSignal === idx
                    ? "bg-[#1b9aaa]/20 border border-[#1b9aaa]"
                    : "bg-white/5 hover:bg-white/10 border border-transparent"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-white font-semibold text-sm">{sig.ticker}</div>
                    <div className="text-white/60 text-xs">{sig.name}</div>
                  </div>
                  <Badge variant={getDirectionColor(sig.direction)} className="text-xs">
                    {sig.direction}
                  </Badge>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <div className="text-white font-semibold text-sm">₹{sig.price.toFixed(2)}</div>
                  <div className={`text-xs font-medium ${sig.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {sig.change >= 0 ? "+" : ""}{sig.change}%
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-xs">Confidence</span>
                  <div className="flex items-center gap-1">
                    <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#1b9aaa] to-[#d4a843]"
                        style={{ width: `${sig.confidence}%` }}
                      />
                    </div>
                    <span className="text-white/80 text-xs font-semibold">{sig.confidence}%</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Right Panel: Signal Detail (60%) */}
      <div className="lg:col-span-3 flex flex-col gap-4 overflow-hidden">
        <Card className="flex-1 overflow-hidden flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{signal.ticker}</CardTitle>
                <p className="text-white/60 text-sm">{signal.name}</p>
              </div>
              <Badge variant={getDirectionColor(signal.direction)} className="text-lg px-4 py-2">
                {signal.direction}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="overflow-y-auto flex-1 space-y-6 pb-4">
            {/* Strength Visual */}
            <div>
              <div className="text-white/70 text-sm font-semibold mb-2">STRENGTH ANALYSIS</div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-green-400 text-xs">Bullish</span>
                    <span className="text-green-400 text-xs font-semibold">{signal.bullish}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: `${signal.bullish}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-red-400 text-xs">Bearish</span>
                    <span className="text-red-400 text-xs font-semibold">{signal.bearish}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500" style={{ width: `${signal.bearish}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <div className="text-white/70 text-sm font-semibold mb-2">SIGNAL TAGS</div>
              <div className="flex flex-wrap gap-2">
                {signal.tags.map((tag, idx) => (
                  <Badge key={idx} variant="default" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Triggering Event */}
            <div>
              <div className="text-white/70 text-sm font-semibold mb-2">TRIGGERING EVENT</div>
              <p className="text-white/70 text-sm leading-relaxed">{signal.triggeringEvent}</p>
            </div>

            {/* Tabs (simplified) */}
            <div className="text-white/70 text-xs font-semibold border-b border-white/[0.08] pb-2">
              TRADE SETUP | AI REASONING | TIMELINE | RELIABILITY
            </div>

            {/* Trade Structure Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-white/60 text-xs mb-1">Current Price</div>
                <div className="text-white font-semibold text-lg">₹{signal.currentPrice}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-white/60 text-xs mb-1">Entry</div>
                <div className="text-white font-semibold text-lg">₹{signal.entry}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 border border-red-500/30">
                <div className="text-red-400 text-xs mb-1">Stop Loss</div>
                <div className="text-red-400 font-semibold text-lg">₹{signal.stopLoss}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 border border-green-500/30">
                <div className="text-green-400 text-xs mb-1">Target</div>
                <div className="text-green-400 font-semibold text-lg">₹{signal.target}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-white/60 text-xs mb-1">Risk/Reward</div>
                <div className="text-white font-semibold text-lg">{signal.riskReward}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-white/60 text-xs mb-1">ATR</div>
                <div className="text-white font-semibold text-lg">₹{signal.atr}</div>
              </div>
              <div className="col-span-2 bg-white/5 rounded-lg p-3">
                <div className="text-white/60 text-xs mb-1">Max Position Size</div>
                <div className="text-white font-semibold text-lg">{signal.maxPosition}% of portfolio</div>
              </div>
            </div>

            {/* Risk vs Reward Visual */}
            <div>
              <div className="text-white/70 text-sm font-semibold mb-2">RISK vs REWARD</div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden flex">
                    <div className="h-full bg-red-500" style={{ width: "25%" }} />
                    <div className="h-full bg-green-500" style={{ width: "75%" }} />
                  </div>
                </div>
                <span className="text-white/70 text-sm">1:3.8 Ratio</span>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mt-4">
              <p className="text-amber-400 text-xs leading-relaxed">
                This signal is generated by AI and should not be considered as investment advice. Always consult a qualified financial advisor before trading. Past performance does not guarantee future results.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

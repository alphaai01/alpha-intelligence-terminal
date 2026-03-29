"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function SignalEngine() {
  const [selectedSignal, setSelectedSignal] = useState(0)
  const [assetFilter, setAssetFilter] = useState("All")
  const [directionFilter, setDirectionFilter] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const signals = [
    { ticker: "HSI", name: "Hang Seng", direction: "SELL", confidence: 90, price: 17234.20, change: -0.2, assetClass: "Equity Indices", bullish: 0, bearish: 63, volatility: "HIGH", timeframe: "short-term", rr: 2.0, triggerEvent: "US-China Trade Tariff Expansion — Sentiments...", geoSensitivity: ["trade restrictions", "political instability"] },
    { ticker: "XAUUSD", name: "Gold", direction: "BUY", confidence: 88, price: 2341.00, change: 1.2, assetClass: "Commodities", bullish: 67, bearish: 0, volatility: "HIGH", timeframe: "short-term", rr: 2.0, triggerEvent: "Iran-Israel Escalation — Missile Exchanges", geoSensitivity: ["military escalation", "energy supply disruption"] },
    { ticker: "ITA", name: "Defense ETF (ITA)", direction: "BUY", confidence: 87, price: 142.50, change: 2.3, assetClass: "ETFs", bullish: 67, bearish: 0, volatility: "HIGH", timeframe: "short-term", rr: 2.0, triggerEvent: "Iran-Israel Escalation — Missile Exchanges Rep...", geoSensitivity: ["military escalation"] },
    { ticker: "BRENT", name: "Brent Oil", direction: "BUY", confidence: 87, price: 89.45, change: 3.1, assetClass: "Commodities", bullish: 67, bearish: 0, volatility: "HIGH", timeframe: "short-term", rr: 2.0, triggerEvent: "Iran-Israel Escalation — Missile Exchanges Rep...", geoSensitivity: ["energy supply disruption", "trade restrictions"] },
    { ticker: "RTX", name: "Raytheon Technologies", direction: "BUY", confidence: 85, price: 98.20, change: 1.8, assetClass: "Stocks", bullish: 66, bearish: 0, volatility: "HIGH", timeframe: "short-term", rr: 2.0, triggerEvent: "Iran-Israel Escalation — Missile Exchanges Rep...", geoSensitivity: ["military escalation"] },
    { ticker: "SPX", name: "S&P 500", direction: "SELL", confidence: 82, price: 5120.30, change: -1.5, assetClass: "Equity Indices", bullish: 0, bearish: 58, volatility: "HIGH", timeframe: "short-term", rr: 2.0, triggerEvent: "Iran-Israel Escalation — Missile Exchanges", geoSensitivity: ["sanctions", "political instability"] },
  ]

  const assetClasses = ["All", "Commodities", "Equity Indices", "Forex", "Crypto", "Stocks", "ETFs", "Bonds"]
  const directions = ["All", "BUY", "SELL", "HOLD"]

  const filtered = signals.filter(s => {
    const matchAsset = assetFilter === "All" || s.assetClass === assetFilter
    const matchDir = directionFilter === "All" || s.direction === directionFilter
    const matchSearch = s.ticker.toLowerCase().includes(searchTerm.toLowerCase()) || s.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchAsset && matchDir && matchSearch
  })

  const signal = filtered[selectedSignal] || signals[0]

  return (
    <div className="h-[calc(100vh-56px)] bg-[#060d19] flex overflow-hidden">
      {/* Left sidebar - Asset class + direction + signals list */}
      <div className="w-72 border-r border-white/[0.06] flex flex-col bg-[#0a1628]/50">
        <div className="p-3 border-b border-white/[0.06]">
          <div className="text-white/40 text-[10px] font-mono tracking-wider mb-2">ASSET CLASS</div>
          <div className="flex flex-wrap gap-1">
            {assetClasses.map(ac => (<button key={ac} onClick={() => setAssetFilter(ac)} className={"px-2 py-1 rounded text-[10px] font-mono transition " + (assetFilter === ac ? "bg-[#1b9aaa]/20 text-[#1b9aaa] border border-[#1b9aaa]/30" : "text-white/50 hover:text-white/70")}>{ac}</button>))}
          </div>
        </div>
        <div className="p-3 border-b border-white/[0.06]">
          <div className="text-white/40 text-[10px] font-mono tracking-wider mb-2">DIRECTION</div>
          <div className="flex flex-wrap gap-1">
            {directions.map(d => (<button key={d} onClick={() => setDirectionFilter(d)} className={"px-2 py-1 rounded text-[10px] font-mono transition " + (directionFilter === d ? "bg-[#1b9aaa]/20 text-[#1b9aaa] border border-[#1b9aaa]/30" : "text-white/50 hover:text-white/70")}>{d}</button>))}
          </div>
        </div>
        <div className="p-3 border-b border-white/[0.06]">
          <div className="text-white/40 text-[10px] font-mono tracking-wider mb-2">GEO SENSITIVITY</div>
          {["military escalation", "energy supply disruption", "trade restrictions", "sanctions", "political instability"].map(s => (<div key={s} className="text-white/40 text-[10px] font-mono mb-1 hover:text-white/60 cursor-pointer">{s}</div>))}
        </div>
        <div className="p-3 border-b border-white/[0.06]">
          <input placeholder="Search asset..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-white/5 border border-white/[0.08] rounded px-3 py-1.5 text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:border-[#1b9aaa]/50" />
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map((s, idx) => (<div key={idx} onClick={() => setSelectedSignal(idx)} className={"p-3 border-b border-white/[0.04] cursor-pointer transition " + (selectedSignal === idx ? "bg-[#1b9aaa]/10 border-l-2 border-l-[#1b9aaa]" : "hover:bg-white/[0.02]")}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2"><span className="text-white font-semibold text-sm font-mono">{s.ticker}</span><span className={"text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold " + (s.direction === "BUY" ? "bg-green-500/20 text-green-400" : s.direction === "SELL" ? "bg-red-500/20 text-red-400" : "bg-amber-500/20 text-amber-400")}>{s.direction}</span></div>
              <span className="text-white/60 text-xs font-mono">{s.confidence}%</span>
            </div>
            <div className="text-white/40 text-[10px] font-mono">{s.name}</div>
            <div className="flex items-center gap-2 mt-1">
              <div className="text-white/40 text-[10px] font-mono">Bull</div><div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-green-500" style={{width: s.bullish + "%"}} /></div><span className="text-green-400 text-[10px] font-mono">{s.bullish}%</span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="text-white/40 text-[10px] font-mono">Bear</div><div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-red-500" style={{width: s.bearish + "%"}} /></div><span className="text-red-400 text-[10px] font-mono">{s.bearish}%</span>
            </div>
            <div className="flex items-center gap-1 mt-1.5"><span className="text-white/30 text-[9px] font-mono px-1 py-0.5 rounded bg-white/5">VOL: {s.volatility}</span><span className="text-white/30 text-[9px] font-mono px-1 py-0.5 rounded bg-white/5">{s.timeframe}</span><span className="text-white/30 text-[9px] font-mono px-1 py-0.5 rounded bg-white/5">RR {s.rr}</span></div>
            <div className="text-[#1b9aaa] text-[10px] font-mono mt-1 truncate">&#9889; {s.triggerEvent}</div>
          </div>))}
        </div>
      </div>

      {/* Main content - Signal detail */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3"><span className="text-white text-2xl font-bold font-mono">{signal.ticker}</span><span className={"text-sm px-2 py-1 rounded font-mono font-semibold " + (signal.direction === "BUY" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400")}>{signal.direction}</span></div>
            <div className="text-white/40 text-sm font-mono mt-1">{signal.name} - {signal.assetClass}</div>
          </div>
          <div className="text-right"><div className="text-white/40 text-[10px] font-mono">confidence</div><div className="text-white text-3xl font-bold font-mono">{signal.confidence}%</div><div className="text-green-400 text-sm font-mono">{signal.change > 0 ? "+" : ""}{signal.change}%</div></div>
        </div>

        <div className="mb-6">
          <div className="text-white/60 text-sm font-mono mb-2">Bullish Strength</div>
          <div className="flex items-center gap-4"><div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-green-500" style={{width: signal.bullish + "%"}} /></div><span className="text-white/60 text-xs font-mono">{signal.bullish}%</span><span className="text-white/60 text-sm font-mono">Bearish Strength</span><div className="w-24 h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-red-500" style={{width: signal.bearish + "%"}} /></div><span className="text-white/60 text-xs font-mono">{signal.bearish}%</span></div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">{["MEDIUM VOLATILITY", signal.timeframe, signal.assetClass.toLowerCase(), "global"].map(tag => (<span key={tag} className="text-[10px] font-mono px-2 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">{tag}</span>))}</div>

        <div className="bg-green-500/5 border border-green-500/10 rounded-lg p-4 mb-6"><div className="text-green-400 text-[10px] font-mono tracking-wider mb-1">TRIGGERING EVENT</div><div className="text-white/80 text-sm font-mono">{signal.triggerEvent}</div></div>

        <div className="flex gap-1 mb-6 border-b border-white/[0.06]">{["TRADE SETUP", "AI REASONING", "TIMELINE", "RELIABILITY"].map((tab, i) => (<button key={tab} className={"px-4 py-2.5 text-[10px] font-mono tracking-wider transition " + (i === 0 ? "text-white border-b-2 border-[#1b9aaa]" : "text-white/40 hover:text-white/60")}>{tab}</button>))}</div>

        <div className="text-white/40 text-[10px] font-mono tracking-wider mb-4">TRADE STRUCTURE</div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3"><div className="text-white/40 text-[10px] font-mono">CURRENT PRICE</div><div className="text-white text-lg font-bold font-mono">{signal.price.toFixed(2)}</div></div>
          <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3"><div className="text-white/40 text-[10px] font-mono">ENTRY</div><div className="text-white text-lg font-bold font-mono">{signal.price.toFixed(2)}</div></div>
          <div className="bg-white/[0.02] border border-red-500/10 rounded-lg p-3"><div className="text-red-400 text-[10px] font-mono">STOP LOSS</div><div className="text-red-400 text-lg font-bold font-mono">{(signal.price * 0.98).toFixed(2)}</div></div>
          <div className="bg-white/[0.02] border border-green-500/10 rounded-lg p-3"><div className="text-green-400 text-[10px] font-mono">TARGET</div><div className="text-green-400 text-lg font-bold font-mono">{(signal.price * 1.04).toFixed(2)}</div></div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3"><div className="text-white/40 text-[10px] font-mono">RISK/REWARD</div><div className="text-white text-lg font-bold font-mono">2.00x</div></div>
          <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3"><div className="text-white/40 text-[10px] font-mono">ATR (DAILY)</div><div className="text-white text-lg font-bold font-mono">1.84%</div></div>
          <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3"><div className="text-white/40 text-[10px] font-mono">MAX POS.</div><div className="text-white text-lg font-bold font-mono">3.2%</div></div>
        </div>

        <div className="mb-6"><div className="text-white/40 text-[10px] font-mono tracking-wider mb-2">RISK VS REWARD</div><div className="flex items-center gap-2"><span className="text-white/50 text-xs font-mono">Risk: 43.0000</span><div className="flex-1 h-3 rounded-full overflow-hidden flex"><div className="h-full bg-red-500" style={{width:"33%"}} /><div className="h-full bg-green-500" style={{width:"67%"}} /></div><span className="text-white/50 text-xs font-mono">+86.0000</span></div></div>

        <div className="bg-amber-500/5 border border-amber-500/10 rounded-lg p-4"><div className="flex items-center gap-2"><span className="text-amber-400">&#9888;</span><span className="text-amber-400 text-xs font-mono">Educational purposes only. Not financial advice. Always perform your own due diligence. Model v1.0 - Data as of 14:01:52</span></div></div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-[#0a1628]/95 border-t border-white/[0.06] backdrop-blur-sm"><div className="flex items-center px-4 py-1.5 text-white/30 text-[10px] font-mono"><span>&#9888; Educational purposes only · Not financial advice · Model v1.0 · Auto-refresh 60s</span></div></div>
    </div>
  )
    }

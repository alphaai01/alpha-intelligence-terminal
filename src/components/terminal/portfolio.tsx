"use client"

import { useState } from "react"

export default function Portfolio() {
  const [selectedSignal, setSelectedSignal] = useState(0)
  const [assetFilter, setAssetFilter] = useState("All")

  const signals = [
    { ticker: "XAUUSD", name: "Gold", direction: "BUY", confidence: 88, price: 2314.50, change: 1.2, assetClass: "Commodities", bullish: 67, bearish: 0, entry: 2341.00, stopLoss: 2298.00, target: 2427.00, rr: 2.0, atr: 1.84, maxPos: 3.2, triggerEvent: "Iran-Israel Escalation - Missile Exchanges", geoSensitivity: ["military escalation", "energy supply disruption"], riskFactors: ["Sudden de-escalation", "Strong USD data"] },
    { ticker: "SPX", name: "S&P 500", direction: "SELL", confidence: 82, price: 5120.30, change: -1.5, assetClass: "Equities", bullish: 0, bearish: 58, entry: 5120.30, stopLoss: 5200.00, target: 4950.00, rr: 2.1, atr: 1.2, maxPos: 2.5, triggerEvent: "Iran-Israel Escalation - Missile Exchanges", geoSensitivity: ["sanctions", "political instability"], riskFactors: ["Market resilience", "Fed intervention"] },
    { ticker: "BRENT", name: "Brent Oil", direction: "BUY", confidence: 87, price: 89.45, change: 3.1, assetClass: "Commodities", bullish: 67, bearish: 0, entry: 89.45, stopLoss: 86.50, target: 95.00, rr: 1.9, atr: 2.1, maxPos: 2.8, triggerEvent: "Iran-Israel Escalation - Missile Exchanges", geoSensitivity: ["energy supply disruption", "trade restrictions"], riskFactors: ["SPR release", "OPEC+ increase"] },
    { ticker: "HSI", name: "Hang Seng", direction: "SELL", confidence: 90, price: 17234.20, change: -0.2, assetClass: "Equities", bullish: 0, bearish: 63, entry: 17234.20, stopLoss: 17600.00, target: 16500.00, rr: 2.0, atr: 1.5, maxPos: 2.0, triggerEvent: "US-China Trade Tariff Expansion", geoSensitivity: ["trade restrictions", "political instability"], riskFactors: ["Policy reversal", "Stimulus package"] },
  ]

  const assetClasses = ["All", "Commodities", "Equities", "Forex", "Crypto", "ETFs", "Bonds"]

  const filtered = signals.filter(s => assetFilter === "All" || s.assetClass === assetFilter)
  const signal = filtered[selectedSignal] || signals[0]

  return (
    <div className="h-[calc(100vh-56px)] bg-[#060d19] flex overflow-hidden">
      <div className="w-80 border-r border-white/[0.06] flex flex-col bg-[#0a1628]/50">
        <div className="p-3 border-b border-white/[0.06]">
          <div className="text-white/40 text-[10px] font-mono tracking-wider mb-2">ASSET CLASS</div>
          <div className="flex flex-wrap gap-1">{assetClasses.map(ac => (<button key={ac} onClick={() => setAssetFilter(ac)} className={"px-2 py-1 rounded text-[10px] font-mono transition " + (assetFilter === ac ? "bg-[#1b9aaa]/20 text-[#1b9aaa] border border-[#1b9aaa]/30" : "text-white/50 hover:text-white/70")}>{ac}</button>))}</div>
        </div>
        <div className="p-3 border-b border-white/[0.06]"><input placeholder="Search asset..." className="w-full bg-white/5 border border-white/[0.08] rounded px-3 py-1.5 text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:border-[#1b9aaa]/50" /></div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map((s, idx) => (<div key={idx} onClick={() => setSelectedSignal(idx)} className={"p-3 border-b border-white/[0.04] cursor-pointer transition " + (selectedSignal === idx ? "bg-[#1b9aaa]/10 border-l-2 border-l-[#1b9aaa]" : "hover:bg-white/[0.02]")}>
            <div className="flex items-center justify-between mb-1"><div className="flex items-center gap-2"><span className="text-white font-semibold text-sm font-mono">{s.ticker}</span><span className={"text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold " + (s.direction === "BUY" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400")}>{s.direction}</span></div><span className="text-white/60 text-xs font-mono">{s.confidence}%</span></div>
            <div className="text-white/40 text-[10px] font-mono">{s.name}</div>
            <div className="flex items-center gap-2 mt-1"><div className="text-white/40 text-[10px] font-mono">Bull</div><div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-green-500" style={{width: s.bullish + "%"}} /></div><span className="text-green-400 text-[10px] font-mono">{s.bullish}%</span></div>
            <div className="flex items-center gap-2 mt-0.5"><div className="text-white/40 text-[10px] font-mono">Bear</div><div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-red-500" style={{width: s.bearish + "%"}} /></div><span className="text-red-400 text-[10px] font-mono">{s.bearish}%</span></div>
            <div className="flex items-center gap-1 mt-1.5"><span className="text-white/30 text-[9px] font-mono px-1 py-0.5 rounded bg-white/5">VOL: HIGH</span><span className="text-white/30 text-[9px] font-mono px-1 py-0.5 rounded bg-white/5">short-term</span><span className="text-white/30 text-[9px] font-mono px-1 py-0.5 rounded bg-white/5">RR {s.rr}</span></div>
            <div className="text-[#1b9aaa] text-[10px] font-mono mt-1 truncate">&#9889; {s.triggerEvent}</div>
          </div>))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex items-start justify-between mb-6">
          <div><div className="flex items-center gap-3"><span className="text-white text-2xl font-bold font-mono">{signal.ticker}</span><span className={"text-sm px-2 py-1 rounded font-mono font-semibold " + (signal.direction === "BUY" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400")}>{signal.direction}</span></div><div className="text-white/40 text-sm font-mono mt-1">{signal.name} - {signal.assetClass}</div></div>
          <div className="text-right"><div className="text-white/40 text-[10px] font-mono">confidence</div><div className="text-white text-3xl font-bold font-mono">{signal.confidence}%</div><div className={"text-sm font-mono " + (signal.change > 0 ? "text-green-400" : "text-red-400")}>{signal.change > 0 ? "+" : ""}{signal.change}%</div></div>
        </div>
        <div className="mb-6">
          <div className="text-white/60 text-sm font-mono mb-2">Bullish Strength</div>
          <div className="flex items-center gap-4"><div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-green-500" style={{width: signal.bullish + "%"}} /></div><span className="text-white/60 text-xs font-mono">{signal.bullish}%</span><span className="text-white/60 text-sm font-mono">Bearish Strength</span><div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-red-500" style={{width: signal.bearish + "%"}} /></div><span className="text-white/60 text-xs font-mono">{signal.bearish}%</span></div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">{["MEDIUM VOLATILITY", "short-term", signal.assetClass.toLowerCase(), "global"].map(tag => (<span key={tag} className="text-[10px] font-mono px-2 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">{tag}</span>))}</div>
        <div className="bg-green-500/5 border border-green-500/10 rounded-lg p-4 mb-6"><div className="text-green-400 text-[10px] font-mono tracking-wider mb-1">TRIGGERING EVENT</div><div className="text-white/80 text-sm font-mono">{signal.triggerEvent}</div><div className="text-white/40 text-[10px] font-mono mt-1">military escalation · Severity 92.0% ·12:01</div></div>
        <div className="flex gap-1 mb-6 border-b border-white/[0.06]">{["TRADE SETUP", "AI REASONING", "TIMELINE", "RELIABILITY"].map((tab, i) => (<button key={tab} className={"px-4 py-2.5 text-[10px] font-mono tracking-wider transition " + (i === 0 ? "text-white border-b-2 border-[#1b9aaa]" : "text-white/40 hover:text-white/60")}>{tab}</button>))}</div>
        <div className="text-white/40 text-[10px] font-mono tracking-wider mb-4">TRADE STRUCTURE</div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3"><div className="text-white/40 text-[10px] font-mono">CURRENT PRICE</div><div className="text-white text-lg font-bold font-mono">{signal.price.toFixed(2)}</div></div>
          <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3"><div className="text-white/40 text-[10px] font-mono">ENTRY</div><div className="text-white text-lg font-bold font-mono">{signal.entry.toFixed(2)}</div></div>
          <div className="bg-white/[0.02] border border-red-500/10 rounded-lg p-3"><div className="text-red-400 text-[10px] font-mono">STOP LOSS</div><div className="text-red-400 text-lg font-bold font-mono">{signal.stopLoss.toFixed(2)}</div></div>
          <div className="bg-white/[0.02] border border-green-500/10 rounded-lg p-3"><div className="text-green-400 text-[10px] font-mono">TARGET</div><div className="text-green-400 text-lg font-bold font-mono">{signal.target.toFixed(2)}</div></div>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3"><div className="text-white/40 text-[10px] font-mono">RISK/REWARD</div><div className="text-white text-lg font-bold font-mono">{signal.rr.toFixed(2)}x</div></div>
          <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3"><div className="text-white/40 text-[10px] font-mono">ATR (DAILY)</div><div className="text-white text-lg font-bold font-mono">{signal.atr}%</div></div>
          <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3"><div className="text-white/40 text-[10px] font-mono">MAX POS.</div><div className="text-white text-lg font-bold font-mono">{signal.maxPos}%</div></div>
        </div>
        <div className="mb-6"><div className="text-white/40 text-[10px] font-mono tracking-wider mb-2">RISK VS REWARD</div><div className="flex items-center gap-2"><span className="text-white/50 text-xs font-mono">Risk: {signal.stopLoss.toFixed(4)}</span><div className="flex-1 h-3 rounded-full overflow-hidden flex"><div className="h-full bg-red-500" style={{width:"33%"}} /><div className="h-full bg-green-500" style={{width:"67%"}} /></div><span className="text-white/50 text-xs font-mono">+{signal.target.toFixed(4)}</span></div></div>
        <div className="bg-amber-500/5 border border-amber-500/10 rounded-lg p-4"><div className="flex items-center gap-2"><span className="text-amber-400">&#9888;</span><span className="text-amber-400 text-xs font-mono">Educational purposes only. Not financial advice. Always perform your own due diligence. Model v1.0 - Data as of 14:01:52</span></div></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-[#0a1628]/95 border-t border-white/[0.06] backdrop-blur-sm"><div className="flex items-center px-4 py-1.5 text-white/30 text-[10px] font-mono"><span>&#9888; Educational purposes only · Not financial advice · Model v1.0 · Auto-refresh 60s</span></div></div>
    </div>
  )
            }

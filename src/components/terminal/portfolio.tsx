"use client"

import { useState } from "react"

export default function Portfolio() {
        const [selectedSignal, setSelectedSignal] = useState(0)
        const [assetFilter, setAssetFilter] = useState("All")
        const [searchTerm, setSearchTerm] = useState("")
        const [activeDetailTab, setActiveDetailTab] = useState("TRADE SETUP")

    const signals = [
        { ticker: "XAUUSD", name: "Gold", direction: "BUY", confidence: 88, price: 2314.50, change: 1.2, assetClass: "Commodities", bullish: 67, bearish: 0, entry: 2341.00, stopLoss: 2298.00, target: 2427.00, rr: 2.0, atr: 1.84, maxPos: 3.2, triggerEvent: "Iran-Israel Escalation - Missile Exchanges", severity: 92.0, eventTime: "12:01", geoSensitivity: ["military escalation", "energy supply disruption"], riskFactors: ["Sudden de-escalation", "Strong USD data"], reasoning: "Geopolitical risk premium surging as Iran-Israel conflict escalates. Gold historically rallies 2-4% during major Middle East military events. Safe-haven flows detected across 12 institutional order books. Correlation with VIX spike at 0.87 confirms risk-off rotation. Entry at 2341 offers favorable risk/reward with ATR-based stops.", timeline: [{ time: "06:00", event: "Iran missile launch reports confirmed" }, { time: "07:30", event: "Israel retaliatory strikes announced" }, { time: "09:00", event: "Gold surges past 2300 resistance" }, { time: "10:45", event: "Safe-haven flows accelerate" }, { time: "12:01", event: "Signal generated - BUY XAUUSD" }], reliability: { backtestWinRate: 75, signalCount: 203, avgReturn: 4.2, sharpeRatio: 2.15, maxDrawdown: -3.1 } },
        { ticker: "SPX", name: "S&P 500", direction: "SELL", confidence: 82, price: 5120.30, change: -1.5, assetClass: "Equity Indices", bullish: 0, bearish: 58, entry: 5120.30, stopLoss: 5200.00, target: 4950.00, rr: 2.1, atr: 1.2, maxPos: 2.5, triggerEvent: "Iran-Israel Escalation - Missile Exchanges", severity: 92.0, eventTime: "12:01", geoSensitivity: ["sanctions", "political instability"], riskFactors: ["Market resilience", "Fed intervention"], reasoning: "S&P 500 facing multiple headwinds from geopolitical escalation. VIX surging above 25 signals institutional hedging. Put/call ratio at 1.4 confirms bearish positioning. Technical breakdown below 50-day MA confirms bearish trend.", timeline: [{ time: "06:00", event: "Futures down 1.2% on escalation news" }, { time: "09:30", event: "Market opens with gap down" }, { time: "11:00", event: "VIX spikes above 25" }, { time: "12:30", event: "Selling accelerates" }, { time: "14:01", event: "Signal generated - SELL SPX" }], reliability: { backtestWinRate: 68, signalCount: 234, avgReturn: 3.9, sharpeRatio: 1.72, maxDrawdown: -5.5 } },
        { ticker: "ITA", name: "Defense ETF (ITA)", direction: "BUY", confidence: 87, price: 142.50, change: 2.3, assetClass: "ETFs", bullish: 67, bearish: 0, entry: 142.50, stopLoss: 139.65, target: 148.20, rr: 2.0, atr: 1.84, maxPos: 3.2, triggerEvent: "Iran-Israel Escalation - Missile Exchanges", severity: 92.0, eventTime: "12:01", geoSensitivity: ["military escalation", "defense spending"], riskFactors: ["Ceasefire announcement", "Budget cuts"], reasoning: "Defense sector ETF surging on escalating Middle East tensions. Historical data shows defense stocks rally 5-8% during sustained military conflicts. Institutional inflows into ITA up 340% in last 24 hours. Lockheed Martin and Raytheon leading gains.", timeline: [{ time: "06:00", event: "Military escalation confirmed" }, { time: "08:00", event: "Defense stocks gap up in pre-market" }, { time: "10:00", event: "ITA breaks above resistance at $140" }, { time: "11:30", event: "Volume surges 3x average" }, { time: "12:01", event: "Signal generated - BUY ITA" }], reliability: { backtestWinRate: 73, signalCount: 145, avgReturn: 4.8, sharpeRatio: 1.95, maxDrawdown: -4.0 } },
        { ticker: "BRENT", name: "Brent Oil", direction: "BUY", confidence: 87, price: 89.45, change: 3.1, assetClass: "Commodities", bullish: 67, bearish: 0, entry: 89.45, stopLoss: 86.50, target: 95.00, rr: 1.9, atr: 2.1, maxPos: 2.8, triggerEvent: "Iran-Israel Escalation - Missile Exchanges", severity: 92.0, eventTime: "12:01", geoSensitivity: ["energy supply disruption", "trade restrictions"], riskFactors: ["SPR release", "OPEC+ increase"], reasoning: "Oil prices surging on supply disruption fears. Strait of Hormuz handles 21% of global oil transit. Satellite imagery confirms naval deployments. Options market pricing 15% probability of sustained disruption.", timeline: [{ time: "05:00", event: "Naval deployment near Strait of Hormuz" }, { time: "07:00", event: "Shipping companies rerouting tankers" }, { time: "09:30", event: "Brent breaks above $88 resistance" }, { time: "11:00", event: "OPEC emergency meeting rumors" }, { time: "13:01", event: "Signal generated - BUY BRENT" }], reliability: { backtestWinRate: 71, signalCount: 178, avgReturn: 5.1, sharpeRatio: 1.85, maxDrawdown: -6.2 } },
        { ticker: "RTX", name: "Raytheon Technologies", direction: "BUY", confidence: 85, price: 98.20, change: 1.8, assetClass: "Stocks", bullish: 66, bearish: 0, entry: 98.20, stopLoss: 96.24, target: 102.10, rr: 2.0, atr: 1.5, maxPos: 2.5, triggerEvent: "Iran-Israel Escalation - Missile Exchanges", severity: 92.0, eventTime: "12:01", geoSensitivity: ["military escalation", "defense spending"], riskFactors: ["Peace negotiations", "Earnings miss"], reasoning: "Raytheon Technologies directly benefits from increased defense spending during geopolitical escalation. Missile defense systems in high demand. Order backlog expected to increase significantly. Technical breakout above $97 resistance confirmed.", timeline: [{ time: "06:00", event: "Escalation drives defense sector" }, { time: "08:30", event: "RTX gaps up on missile defense demand" }, { time: "10:00", event: "Breaks $97 resistance level" }, { time: "11:15", event: "Analyst upgrades begin" }, { time: "12:01", event: "Signal generated - BUY RTX" }], reliability: { backtestWinRate: 70, signalCount: 167, avgReturn: 3.5, sharpeRatio: 1.78, maxDrawdown: -4.8 } },
        { ticker: "HSI", name: "Hang Seng", direction: "SELL", confidence: 90, price: 17234.20, change: -0.2, assetClass: "Equity Indices", bullish: 0, bearish: 63, entry: 17234.20, stopLoss: 17600.00, target: 16500.00, rr: 2.0, atr: 1.5, maxPos: 2.0, triggerEvent: "US-China Trade Tariff Expansion", severity: 85.0, eventTime: "08:00", geoSensitivity: ["trade restrictions", "political instability"], riskFactors: ["Policy reversal", "Stimulus package"], reasoning: "AI detected significant bearish momentum following the expansion of US-China trade tariffs. Sentiment analysis across 847 news sources shows 78% negative outlook. Historical pattern matching indicates similar tariff events led to 3-5% HSI declines within 2 weeks.", timeline: [{ time: "08:00", event: "US announces expanded tariff list" }, { time: "09:15", event: "China retaliatory measures leaked" }, { time: "10:30", event: "Asian markets react with broad selloff" }, { time: "11:45", event: "HSI breaks key support at 17,400" }, { time: "12:01", event: "Signal generated - SELL HSI" }], reliability: { backtestWinRate: 72, signalCount: 156, avgReturn: 3.8, sharpeRatio: 1.92, maxDrawdown: -4.2 } },
            ]

    const assetClasses = ["All", "Commodities", "Equity Indices", "Forex", "Crypto", "Stocks", "ETFs", "Bonds"]
        const directions = ["All", "BUY", "SELL", "HOLD"]
        const detailTabs = ["TRADE SETUP", "AI REASONING", "TIMELINE", "RELIABILITY"]
        const [directionFilter, setDirectionFilter] = useState("All")

    const filtered = signals.filter(s => {
                const matchAsset = assetFilter === "All" || s.assetClass === assetFilter
                const matchDir = directionFilter === "All" || s.direction === directionFilter
                const matchSearch = searchTerm === "" || s.ticker.toLowerCase().includes(searchTerm.toLowerCase()) || s.name.toLowerCase().includes(searchTerm.toLowerCase())
                return matchAsset && matchDir && matchSearch
    })

    const signal = filtered[selectedSignal] || signals[0]

    const renderDetailContent = () => {
                switch (activeDetailTab) {
                    case "AI REASONING":
                                        return (
                                                                <div className="space-y-4">
                                                                                        <div className="text-white/40 text-[10px] font-mono tracking-wider mb-2">AI ANALYSIS</div>div>
                                                                                        <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-4">
                                                                                                                    <p className="text-white/70 text-sm font-mono leading-relaxed">{signal.reasoning}</p>p>
                                                                                            </div>div>
                                                                                        <div className="grid grid-cols-2 gap-3">
                                                                                                                    <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3">
                                                                                                                                                    <div className="text-white/40 text-[10px] font-mono">SOURCES ANALYZED</div>div>
                                                                                                                                                    <div className="text-white text-lg font-bold font-mono">847</div>div>
                                                                                                                        </div>div>
                                                                                                                    <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3">
                                                                                                                                                    <div className="text-white/40 text-[10px] font-mono">SENTIMENT SCORE</div>div>
                                                                                                                                                    <div className={`text-lg font-bold font-mono ${signal.direction === "BUY" ? "text-green-400" : "text-red-400"}`}>{signal.direction === "BUY" ? "+0.78" : "-0.72"}</div>div>
                                                                                                                        </div>div>
                                                                                            </div>div>
                                                                                        <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3">
                                                                                                                    <div className="text-white/40 text-[10px] font-mono mb-2">RISK FACTORS</div>div>
                                                                                                                    <div className="space-y-1">{signal.riskFactors.map((r: string) => (<div key={r} className="text-amber-400 text-xs font-mono">&gt;&gt; {r}</div>div>))}</div>div>
                                                                                            </div>div>
                                                                </div>div>
                                                            )
                                            case "TIMELINE":
                                        return (
                                                                <div className="space-y-1">
                                                                                        <div className="text-white/40 text-[10px] font-mono tracking-wider mb-3">EVENT TIMELINE</div>div>
                                                                    {signal.timeline.map((item: { time: string; event: string }, idx: number) => (
                                                                                                <div key={idx} className="flex items-start gap-3 py-2 border-l-2 border-white/[0.08] pl-4 ml-2 relative">
                                                                                                                                <div className="absolute -left-[5px] top-3 w-2 h-2 rounded-full bg-[#1b9aaa]" />
                                                                                                                                <div className="text-[#1b9aaa] text-xs font-mono font-semibold whitespace-nowrap">{item.time}</div>div>
                                                                                                                                <div className="text-white/70 text-xs font-mono">{item.event}</div>div>
                                                                                                    </div>div>
                                                                                            ))}
                                                                </div>div>
                                                            )
                                            case "RELIABILITY":
                                        return (
                                                                <div className="space-y-4">
                                                                                        <div className="text-white/40 text-[10px] font-mono tracking-wider mb-2">MODEL RELIABILITY METRICS</div>div>
                                                                                        <div className="grid grid-cols-2 gap-3">
                                                                                                                    <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3">
                                                                                                                                                    <div className="text-white/40 text-[10px] font-mono">BACKTEST WIN RATE</div>div>
                                                                                                                                                    <div className="text-green-400 text-lg font-bold font-mono">{signal.reliability.backtestWinRate}%</div>div>
                                                                                                                        </div>div>
                                                                                                                    <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3">
                                                                                                                                                    <div className="text-white/40 text-[10px] font-mono">TOTAL SIGNALS</div>div>
                                                                                                                                                    <div className="text-white text-lg font-bold font-mono">{signal.reliability.signalCount}</div>div>
                                                                                                                        </div>div>
                                                                                                                    <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3">
                                                                                                                                                    <div className="text-white/40 text-[10px] font-mono">AVG RETURN</div>div>
                                                                                                                                                    <div className="text-green-400 text-lg font-bold font-mono">+{signal.reliability.avgReturn}%</div>div>
                                                                                                                        </div>div>
                                                                                                                    <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3">
                                                                                                                                                    <div className="text-white/40 text-[10px] font-mono">SHARPE RATIO</div>div>
                                                                                                                                                    <div className="text-white text-lg font-bold font-mono">{signal.reliability.sharpeRatio}</div>div>
                                                                                                                        </div>div>
                                                                                            </div>div>
                                                                                        <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3">
                                                                                                                    <div className="text-white/40 text-[10px] font-mono">MAX DRAWDOWN</div>div>
                                                                                                                    <div className="text-red-400 text-lg font-bold font-mono">{signal.reliability.maxDrawdown}%</div>div>
                                                                                                                    <div className="mt-2 h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-red-500/60" style={{width: Math.abs(signal.reliability.maxDrawdown) * 10 + "%"}} /></div>div>
                                                                                            </div>div>
                                                                                        <div className="bg-blue-500/5 border border-blue-500/10 rounded-lg p-3">
                                                                                                                    <div className="text-blue-400 text-xs font-mono">Model confidence is based on {signal.reliability.signalCount} historical signals with a {signal.reliability.backtestWinRate}% win rate. Past performance does not guarantee future results.</div>div>
                                                                                            </div>div>
                                                                </div>div>
                                                            )
                                            default:
                                        return (
                                                                <div>
                                                                                        <div className="text-white/40 text-[10px] font-mono tracking-wider mb-4">TRADE STRUCTURE</div>div>
                                                                                        <div className="grid grid-cols-2 gap-3 mb-6">
                                                                                                                    <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3"><div className="text-white/40 text-[10px] font-mono">CURRENT PRICE</div>div><div className="text-white text-lg font-bold font-mono">{signal.price.toFixed(2)}</div>div></div>div>
                                                                                                                    <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3"><div className="text-white/40 text-[10px] font-mono">ENTRY</div>div><div className="text-white text-lg font-bold font-mono">{signal.entry.toFixed(2)}</div>div></div>div>
                                                                                                                    <div className="bg-white/[0.02] border border-red-500/10 rounded-lg p-3"><div className="text-red-400 text-[10px] font-mono">STOP LOSS</div>div><div className="text-red-400 text-lg font-bold font-mono">{signal.stopLoss.toFixed(2)}</div>div></div>div>
                                                                                                                    <div className="bg-white/[0.02] border border-green-500/10 rounded-lg p-3"><div className="text-green-400 text-[10px] font-mono">TARGET</div>div><div className="text-green-400 text-lg font-bold font-mono">{signal.target.toFixed(2)}</div>div></div>div>
                                                                                            </div>div>
                                                                                        <div className="grid grid-cols-3 gap-3 mb-6">
                                                                                                                    <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3"><div className="text-white/40 text-[10px] font-mono">RISK/REWARD</div>div><div className="text-white text-lg font-bold font-mono">{signal.rr.toFixed(2)}x</div>div></div>div>
                                                                                                                    <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3"><div className="text-white/40 text-[10px] font-mono">ATR (DAILY)</div>div><div className="text-white text-lg font-bold font-mono">{signal.atr}%</div>div></div>div>
                                                                                                                    <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3"><div className="text-white/40 text-[10px] font-mono">MAX POS.</div>div><div className="text-white text-lg font-bold font-mono">{signal.maxPos}%</div>div></div>div>
                                                                                            </div>div>
                                                                                        <div className="mb-6"><div className="text-white/40 text-[10px] font-mono tracking-wider mb-2">RISK VS REWARD</div>div><div className="flex items-center gap-2"><span className="text-white/50 text-xs font-mono">Risk: {signal.stopLoss.toFixed(4)}</span>span><div className="flex-1 h-3 rounded-full overflow-hidden flex"><div className="h-full bg-red-500" style={{width:"33%"}} /><div className="h-full bg-green-500" style={{width:"67%"}} /></div>div><span className="text-white/50 text-xs font-mono">+{signal.target.toFixed(4)}</span>span></div>div></div>div>
                                                                </div>div>
                                                            )
                                            }
    }
            
            return (
                        <div className="h-[calc(100vh-56px)] bg-[#060d19] flex overflow-hidden">
                                    <div className="w-80 border-r border-white/[0.06] flex flex-col bg-[#0a1628]/50">
                                                    <div className="p-3 border-b border-white/[0.06]">
                                                                        <div className="text-white/40 text-[10px] font-mono tracking-wider mb-2">ASSET CLASS</div>div>
                                                                        <div className="flex flex-wrap gap-1">{assetClasses.map(ac => (<button key={ac} onClick={() => { setAssetFilter(ac); setSelectedSignal(0) }} className={"px-2 py-1 rounded text-[10px] font-mono transition " + (assetFilter === ac ? "bg-[#1b9aaa]/20 text-[#1b9aaa] border border-[#1b9aaa]/30" : "text-white/50 hover:text-white/70")}>{ac}</button>button>))}</div>div>
                                                                        <div className="text-white/40 text-[10px] font-mono tracking-wider mb-2 mt-3">DIRECTION</div>div>
                                                                        <div className="flex flex-wrap gap-1">{directions.map(d => (<button key={d} onClick={() => { setDirectionFilter(d); setSelectedSignal(0) }} className={"px-2 py-1 rounded text-[10px] font-mono transition " + (directionFilter === d ? "bg-[#1b9aaa]/20 text-[#1b9aaa] border border-[#1b9aaa]/30" : "text-white/50 hover:text-white/70")}>{d}</button>button>))}</div>div>
                                                    </div>div>
                                                    <div className="p-3 border-b border-white/[0.06]"><input placeholder="Search asset..." value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setSelectedSignal(0) }} className="w-full bg-white/5 border border-white/[0.08] rounded px-3 py-1.5 text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:border-[#1b9aaa]/50" /></div>div>
                                                    <div className="flex-1 overflow-y-auto">
                                                        {filtered.map((s, idx) => (<div key={idx} onClick={() => { setSelectedSignal(idx); setActiveDetailTab("TRADE SETUP") }} className={"p-3 border-b border-white/[0.04] cursor-pointer transition " + (selectedSignal === idx ? "bg-[#1b9aaa]/10 border-l-2 border-l-[#1b9aaa]" : "hover:bg-white/[0.02]")}>
                                                                                <div className="flex items-center justify-between mb-1"><div className="flex items-center gap-2"><span className="text-white font-semibold text-sm font-mono">{s.ticker}</span>span><span className={"text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold " + (s.direction === "BUY" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400")}>{s.direction}</span>span></div>div><span className="text-white/60 text-xs font-mono">{s.confidence}%</span>span></div>div>
                                                                                <div className="text-white/40 text-[10px] font-mono">{s.name}</div>div>
                                                                                <div className="flex items-center gap-2 mt-1"><div className="text-white/40 text-[10px] font-mono">Bull</div>div><div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-green-500" style={{width: s.bullish + "%"}} /></div>div><span className="text-green-400 text-[10px] font-mono">{s.bullish}%</span>span></div>div>
                                                                                <div className="flex items-center gap-2 mt-0.5"><div className="text-white/40 text-[10px] font-mono">Bear</div>div><div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-red-500" style={{width: s.bearish + "%"}} /></div>div><span className="text-red-400 text-[10px] font-mono">{s.bearish}%</span>span></div>div>
                                                                                <div className="flex items-center gap-1 mt-1.5"><span className="text-white/30 text-[9px] font-mono px-1 py-0.5 rounded bg-white/5">VOL: HIGH</span>span><span className="text-white/30 text-[9px] font-mono px-1 py-0.5 rounded bg-white/5">short-term</span>span><span className="text-white/30 text-[9px] font-mono px-1 py-0.5 rounded bg-white/5">RR {s.rr}</span>span></div>div>
                                                                                <div className="text-[#1b9aaa] text-[10px] font-mono mt-1 truncate">&#9889; {s.triggerEvent}</div>div>
                                                        </div>div>))}
                                                    </div>div>
                                    </div>div>
                                    <div className="flex-1 overflow-y-auto p-6">
                                                    <div className="flex items-start justify-between mb-6">
                                                                        <div><div className="flex items-center gap-3"><span className="text-white text-2xl font-bold font-mono">{signal.ticker}</span>span><span className={"text-sm px-2 py-1 rounded font-mono font-semibold " + (signal.direction === "BUY" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400")}>{signal.direction}</span>span></div>div><div className="text-white/40 text-sm font-mono mt-1">{signal.name} - {signal.assetClass}</div>div></div>div>
                                                                        <div className="text-right"><div className="text-white/40 text-[10px] font-mono">confidence</div>div><div className="text-white text-3xl font-bold font-mono">{signal.confidence}%</div>div><div className={"text-sm font-mono " + (signal.change > 0 ? "text-green-400" : "text-red-400")}>{signal.change > 0 ? "+" : ""}{signal.change}%</div>div></div>div>
                                                    </div>div>
                                                    <div className="mb-6">
                                                                        <div className="text-white/60 text-sm font-mono mb-2">Bullish Strength</div>div>
                                                                        <div className="flex items-center gap-4"><div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-green-500" style={{width: signal.bullish + "%"}} /></div>div><span className="text-white/60 text-xs font-mono">{signal.bullish}%</span>span><span className="text-white/60 text-sm font-mono">Bearish Strength</span>span><div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-red-500" style={{width: signal.bearish + "%"}} /></div>div><span className="text-white/60 text-xs font-mono">{signal.bearish}%</span>span></div>div>
                                                    </div>div>
                                                    <div className="flex flex-wrap gap-2 mb-6">{["MEDIUM VOLATILITY", "short-term", signal.assetClass.toLowerCase(), "global"].map(tag => (<span key={tag} className="text-[10px] font-mono px-2 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">{tag}</span>span>))}</div>div>
                                                    <div className="bg-green-500/5 border border-green-500/10 rounded-lg p-4 mb-6"><div className="text-green-400 text-[10px] font-mono tracking-wider mb-1">TRIGGERING EVENT</div>div><div className="text-white/80 text-sm font-mono">{signal.triggerEvent}</div>div><div className="text-white/40 text-[10px] font-mono mt-1">{signal.geoSensitivity[0]} &middot; Severity {signal.severity}% &middot; {signal.eventTime}</div>div></div>div>
                                                    <div className="flex gap-1 mb-6 border-b border-white/[0.06]">{detailTabs.map(tab => (<button key={tab} onClick={() => setActiveDetailTab(tab)} className={"px-4 py-2.5 text-[10px] font-mono tracking-wider transition " + (activeDetailTab === tab ? "text-white border-b-2 border-[#1b9aaa]" : "text-white/40 hover:text-white/60")}>{tab}</button>button>))}</div>div>
                                        {renderDetailContent()}
                                                    <div className="mt-6 bg-amber-500/5 border border-amber-500/10 rounded-lg p-4"><div className="flex items-center gap-2"><span className="text-amber-400">&#9888;</span>span><span className="text-amber-400 text-xs font-mono">Educational purposes only. Not financial advice. Always perform your own due diligence. Model v1.0 - Data as of 14:01:52</span>span></div>div></div>div>
                                    </div>div>
                                    <div className="absolute bottom-0 left-0 right-0 z-20 bg-[#0a1628]/95 border-t border-white/[0.06] backdrop-blur-sm"><div className="flex items-center px-4 py-1.5 text-white/30 text-[10px] font-mono"><span>&#9888; Educational purposes only &middot; Not financial advice &middot; Model v1.0 &middot; Auto-refresh 60s</span>span></div>div></div>div>
                        </div>div>
                    )
}</div>

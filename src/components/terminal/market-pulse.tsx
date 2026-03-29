"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import dynamic from "next/dynamic"

const GlobeComponent = dynamic(() => import("react-globe.gl"), { ssr: false })

interface CountryData {
  name: string
  lat: number
  lng: number
  riskScore: number
  riskLevel: string
  marketImpact: string
  index?: string
  value?: string
  change?: string
}

interface ArcData {
  startLat: number
  startLng: number
  endLat: number
  endLng: number
  color: string
  label: string
}

export default function MarketPulse() {
  const globeRef = useRef<any>(null)
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [gtiTrend] = useState([68, 69, 70, 71, 69, 72, 71, 70, 71, 71.4])

  const countries: CountryData[] = [
    { name: "United States", lat: 39.8, lng: -98.6, riskScore: 35, riskLevel: "low", marketImpact: "Stable monetary policy supporting risk assets", index: "S&P 500", value: "5,124.50", change: "+1.2%" },
    { name: "United Kingdom", lat: 55.4, lng: -3.4, riskScore: 42, riskLevel: "medium", marketImpact: "Brexit aftereffects on markets", index: "FTSE 100", value: "7,890.30", change: "+0.8%" },
    { name: "Russia", lat: 61.5, lng: 105.3, riskScore: 92, riskLevel: "critical", marketImpact: "Sanctions and military operations escalating", index: "MOEX", value: "3,245.60", change: "-2.1%" },
    { name: "China", lat: 35.9, lng: 104.2, riskScore: 78, riskLevel: "high", marketImpact: "Trade tensions and property concerns persist", index: "Shanghai Comp", value: "3,234.60", change: "-0.5%" },
    { name: "India", lat: 20.6, lng: 79.0, riskScore: 45, riskLevel: "medium", marketImpact: "Strong GDP growth driving equity inflows", index: "Sensex", value: "74,234.50", change: "+2.1%" },
    { name: "Japan", lat: 36.2, lng: 138.3, riskScore: 30, riskLevel: "low", marketImpact: "BOJ policy normalization cautiously", index: "Nikkei 225", value: "38,945.30", change: "+0.9%" },
    { name: "Iran", lat: 32.4, lng: 53.7, riskScore: 88, riskLevel: "critical", marketImpact: "Military escalation risk affecting oil" },
    { name: "Israel", lat: 31.0, lng: 34.8, riskScore: 85, riskLevel: "critical", marketImpact: "Regional conflict driving safe-haven demand" },
    { name: "Ukraine", lat: 48.4, lng: 31.2, riskScore: 95, riskLevel: "critical", marketImpact: "Ongoing conflict with supply chain impacts" },
    { name: "Taiwan", lat: 23.7, lng: 121.0, riskScore: 72, riskLevel: "high", marketImpact: "Geopolitical tension on semiconductor supply" },
    { name: "Australia", lat: -25.3, lng: 133.8, riskScore: 25, riskLevel: "low", marketImpact: "Commodity exports recovery", index: "ASX 200", value: "7,654.30", change: "+1.8%" },
    { name: "Germany", lat: 51.2, lng: 10.5, riskScore: 38, riskLevel: "medium", marketImpact: "Manufacturing PMI showing recovery", index: "DAX", value: "18,456.20", change: "+1.5%" },
    { name: "Brazil", lat: -14.2, lng: -51.9, riskScore: 55, riskLevel: "medium", marketImpact: "Political uncertainty on confidence" },
    { name: "Saudi Arabia", lat: 24.0, lng: 45.0, riskScore: 52, riskLevel: "medium", marketImpact: "Oil production cuts supporting prices" },
    { name: "Turkey", lat: 39.0, lng: 35.2, riskScore: 68, riskLevel: "high", marketImpact: "Currency volatility and inflation" },
    { name: "South Africa", lat: -30.6, lng: 22.9, riskScore: 58, riskLevel: "medium", marketImpact: "Political transition sentiment" },
    { name: "Nigeria", lat: 9.08, lng: 8.68, riskScore: 65, riskLevel: "high", marketImpact: "Oil dependency challenges" },
    { name: "Pakistan", lat: 30.4, lng: 69.3, riskScore: 75, riskLevel: "high", marketImpact: "IMF program and instability" },
    { name: "Singapore", lat: 1.35, lng: 103.8, riskScore: 20, riskLevel: "low", marketImpact: "Financial hub stability", index: "STI", value: "3,567.40", change: "+0.3%" },
    { name: "South Korea", lat: 35.9, lng: 127.8, riskScore: 40, riskLevel: "medium", marketImpact: "Tech exports showing resilience" },
  ]

  const arcs: ArcData[] = [
    { startLat: 39.8, startLng: -98.6, endLat: 55.4, endLng: -3.4, color: "#10b981", label: "Trade" },
    { startLat: 39.8, startLng: -98.6, endLat: 35.9, endLng: 104.2, color: "#f59e0b", label: "Sanctions" },
    { startLat: 55.4, startLng: -3.4, endLat: 48.4, endLng: 31.2, color: "#ef4444", label: "Military" },
    { startLat: 24.0, startLng: 45.0, endLat: 32.4, endLng: 53.7, color: "#3b82f6", label: "Diplomatic" },
    { startLat: 35.9, startLng: 104.2, endLat: 23.7, endLng: 121.0, color: "#ef4444", label: "Military" },
    { startLat: 20.6, startLng: 79.0, endLat: 1.35, endLng: 103.8, color: "#10b981", label: "Trade" },
  ]

  const events = [
    { severity: "critical", text: "Strait of Hormuz Naval D...", time: "13:01", region: "Middle East" },
    { severity: "high", text: "ECB Emergency Statement", time: "12:01", region: "Europe" },
  ]

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: 20, lng: 30, altitude: 2.2 }, 0)
      const controls = globeRef.current.controls()
      if (controls) { controls.autoRotate = true; controls.autoRotateSpeed = 0.3; controls.enableZoom = true }
    }
  }, [])

  const getRiskColor = (score: number): string => {
    if (score >= 80) return "#ef4444"; if (score >= 60) return "#f59e0b"; if (score >= 35) return "#3b82f6"; return "#10b981"
  }

  const handlePointClick = useCallback((point: any) => {
    const country = countries.find(c => c.lat === point.lat && c.lng === point.lng)
    if (country) { setSelectedCountry(country); if (globeRef.current) { globeRef.current.pointOfView({ lat: country.lat, lng: country.lng, altitude: 1.8 }, 800) } }
  }, [])

  return (
    <div className="relative h-[calc(100vh-56px)] w-full bg-[#060d19] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: "linear-gradient(rgba(27,154,170,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(27,154,170,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px"}} />
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /><span className="text-green-400 text-xs font-mono">LIVE</span></div>
        <div className="flex items-center gap-2 text-white/60 text-xs font-mono">Global GTI <span className="text-amber-400 font-semibold">55.0</span></div>
      </div>
      <button onClick={() => setShowFilters(!showFilters)} className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0d1f35]/80 border border-white/[0.08] text-white/60 text-xs font-mono hover:text-white transition">FILTERS</button>
      {showFilters && (<div className="absolute top-14 left-4 z-20 w-56 bg-[#0a1628]/95 border border-white/[0.08] rounded-lg p-4 backdrop-blur-md"><div className="text-white/60 text-[10px] font-mono tracking-wider mb-3">RISK FILTERS</div>{["Critical (>80)","High (>60)","Medium (>35)","Low (<35)"].map((l) => (<label key={l} className="flex items-center gap-2 mb-2 cursor-pointer"><input type="checkbox" defaultChecked className="w-3 h-3 accent-[#1b9aaa]" /><span className="text-white/70 text-xs font-mono">{l}</span></label>))}<div className="border-t border-white/[0.06] mt-3 pt-3"><div className="text-white/60 text-[10px] font-mono tracking-wider mb-3">REGIONS</div>{["North America","Europe","Middle East","Asia-Pacific","Africa","South America"].map((r) => (<label key={r} className="flex items-center gap-2 mb-2 cursor-pointer"><input type="checkbox" defaultChecked className="w-3 h-3 accent-[#1b9aaa]" /><span className="text-white/70 text-xs font-mono">{r}</span></label>))}</div></div>)}
      <div className="absolute inset-0 flex items-center justify-center">
        <GlobeComponent ref={globeRef} width={typeof window !== "undefined" ? window.innerWidth : 1200} height={typeof window !== "undefined" ? window.innerHeight - 56 : 700} globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg" backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png" atmosphereColor="#1b9aaa" atmosphereAltitude={0.15} pointsData={countries} pointLat="lat" pointLng="lng" pointColor={(d: any) => getRiskColor(d.riskScore)} pointAltitude={(d: any) => d.riskScore / 300} pointRadius={(d: any) => Math.max(0.3, d.riskScore / 80)} pointLabel={(d: any) => '<div style="background:#0a1628;border:1px solid ' + getRiskColor(d.riskScore) + ';border-radius:8px;padding:8px 12px;font-family:monospace;font-size:11px;"><div style="color:white;font-weight:bold;">' + d.name + '</div><div style="color:' + getRiskColor(d.riskScore) + ';font-size:10px;">Risk: ' + d.riskScore + ' (' + d.riskLevel.toUpperCase() + ')</div>' + (d.index ? '<div style="color:rgba(255,255,255,0.6);font-size:10px;">' + d.index + ': ' + d.value + ' ' + d.change + '</div>' : '') + '</div>'} onPointClick={handlePointClick} arcsData={arcs} arcStartLat="startLat" arcStartLng="startLng" arcEndLat="endLat" arcEndLng="endLng" arcColor={(d: any) => d.color} arcDashLength={0.4} arcDashGap={0.2} arcDashAnimateTime={2000} arcStroke={0.5} />
      </div>
      <div className="absolute bottom-24 left-4 z-20 bg-[#0a1628]/80 border border-white/[0.06] rounded-lg p-3 backdrop-blur-sm"><div className="text-white/40 text-[10px] font-mono tracking-wider mb-2">RISK LEVEL</div>{[{color:"#ef4444",label:"CRITICAL",range:">80"},{color:"#f59e0b",label:"HIGH",range:">60"},{color:"#3b82f6",label:"MEDIUM",range:">35"},{color:"#10b981",label:"LOW",range:"<35"}].map((item) => (<div key={item.label} className="flex items-center gap-2 mb-1.5"><div className="w-6 h-1 rounded-full" style={{backgroundColor:item.color}} /><span className="text-white/50 text-[10px] font-mono">{item.label} {item.range}</span></div>))}</div>
      <div className="absolute bottom-24 right-4 z-20 bg-[#0a1628]/80 border border-white/[0.06] rounded-lg p-3 backdrop-blur-sm"><div className="text-white/40 text-[10px] font-mono tracking-wider mb-2">ARC TYPES</div>{[{color:"#ef4444",label:"Military"},{color:"#f59e0b",label:"Sanctions"},{color:"#10b981",label:"Trade"},{color:"#3b82f6",label:"Diplomatic"}].map((item) => (<div key={item.label} className="flex items-center gap-2 mb-1.5"><div className="w-6 h-0.5 rounded-full" style={{backgroundColor:item.color}} /><span className="text-white/50 text-[10px] font-mono">{item.label}</span></div>))}</div>
      {selectedCountry && (<div className="absolute top-4 right-4 z-20 w-80 bg-[#0a1628]/95 border border-white/[0.08] rounded-xl backdrop-blur-md overflow-hidden"><div className="flex items-center justify-between p-4 border-b border-white/[0.06]"><span className="text-white/80 text-xs font-mono tracking-wider">SIGNALS</span><button onClick={() => setSelectedCountry(null)} className="text-white/40 hover:text-white">&times;</button></div><div className="p-4"><div className="flex items-center justify-between mb-2"><span className="text-white font-bold text-lg font-mono">{selectedCountry.name}</span><span className="text-xs px-2 py-0.5 rounded font-mono font-semibold" style={{backgroundColor: getRiskColor(selectedCountry.riskScore) + "20", color: getRiskColor(selectedCountry.riskScore)}}>{selectedCountry.riskLevel.toUpperCase()}</span></div>{selectedCountry.index && (<div className="flex items-center justify-between mb-3"><span className="text-white/50 text-xs font-mono">{selectedCountry.index}</span><div className="flex items-center gap-2"><span className="text-white text-sm font-mono font-semibold">{selectedCountry.value}</span><span className={"text-xs font-mono " + (selectedCountry.change?.startsWith("+") ? "text-green-400" : "text-red-400")}>{selectedCountry.change}</span></div></div>)}<div className="flex items-center justify-between mb-2 text-xs font-mono"><span className="text-white/50">Confidence: 85%</span><span className="text-white/50">Uncertainty: 18%</span></div><div className="flex gap-1 mb-3"><div className="h-1 rounded-full bg-[#1b9aaa]" style={{width:"85%"}} /><div className="h-1 rounded-full bg-amber-500" style={{width:"18%"}} /></div><div className="border-t border-white/[0.06] pt-3 mb-3"><span className="text-white/60 text-[10px] font-mono tracking-wider">AI ANALYSIS</span><p className="text-white/70 text-xs font-mono leading-relaxed mt-1">{selectedCountry.marketImpact}</p></div><div className="border-t border-white/[0.06] pt-3"><span className="text-amber-400 text-[10px] font-mono tracking-wider">RISK FACTORS</span><div className="space-y-1 text-xs font-mono text-white/50 mt-1"><div>&gt;&gt; Geopolitical escalation risk</div><div>&gt;&gt; Currency volatility</div></div></div></div></div>)}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 text-white/30 text-xs font-mono">Click any country to view market impact</div>
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-[#0a1628]/95 border-t border-white/[0.06] backdrop-blur-sm"><div className="flex items-center px-4 py-2 gap-6 overflow-x-auto"><div className="flex items-center gap-3 shrink-0"><span className="text-white/40 text-[10px] font-mono tracking-wider">GTI TREND</span><span className="text-white font-bold text-sm font-mono">71.4</span><div className="flex items-center gap-0.5">{gtiTrend.map((v, i) => (<div key={i} className="w-2 h-2 rounded-full" style={{backgroundColor: v >= 70 ? "#f59e0b" : "#3b82f6", opacity: 0.4 + (i / gtiTrend.length) * 0.6}} />))}</div></div>{events.map((event, idx) => (<div key={idx} className="flex items-center gap-3 shrink-0 px-4 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04]"><div className={"w-2 h-2 rounded-full " + (event.severity === "critical" ? "bg-red-500" : "bg-amber-500")} /><div><div className="text-white/80 text-xs font-mono">{event.text}</div><div className="text-white/40 text-[10px] font-mono">{event.time} - {event.region} - {event.severity.toUpperCase()}</div></div></div>))}<div className="ml-auto shrink-0 text-right"><div className="text-white font-bold text-2xl font-mono">2</div><div className="text-white/40 text-[10px] font-mono tracking-wider">EVENTS</div></div></div></div>
    </div>
  )
     }

"use client"

import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"

const GlobeComponent = dynamic(() => import("react-globe.gl"), { ssr: false })

export default function GeoMap() {
  const globeRef = useRef<any>(null)
  const [selectedCountry, setSelectedCountry] = useState<any>(null)

  const countries = [
    { name: "United States", lat: 39.8, lng: -98.6, riskScore: 35, riskLevel: "low", color: "#10b981" },
    { name: "United Kingdom", lat: 55.4, lng: -3.4, riskScore: 42, riskLevel: "medium", color: "#3b82f6" },
    { name: "Russia", lat: 61.5, lng: 105.3, riskScore: 92, riskLevel: "critical", color: "#ef4444" },
    { name: "China", lat: 35.9, lng: 104.2, riskScore: 78, riskLevel: "high", color: "#f59e0b" },
    { name: "India", lat: 20.6, lng: 79.0, riskScore: 45, riskLevel: "medium", color: "#3b82f6" },
    { name: "Japan", lat: 36.2, lng: 138.3, riskScore: 30, riskLevel: "low", color: "#10b981" },
    { name: "Iran", lat: 32.4, lng: 53.7, riskScore: 88, riskLevel: "critical", color: "#ef4444" },
    { name: "Israel", lat: 31.0, lng: 34.8, riskScore: 85, riskLevel: "critical", color: "#ef4444" },
    { name: "Ukraine", lat: 48.4, lng: 31.2, riskScore: 95, riskLevel: "critical", color: "#ef4444" },
    { name: "Taiwan", lat: 23.7, lng: 121.0, riskScore: 72, riskLevel: "high", color: "#f59e0b" },
    { name: "Germany", lat: 51.2, lng: 10.5, riskScore: 38, riskLevel: "medium", color: "#3b82f6" },
    { name: "Australia", lat: -25.3, lng: 133.8, riskScore: 25, riskLevel: "low", color: "#10b981" },
    { name: "Brazil", lat: -14.2, lng: -51.9, riskScore: 55, riskLevel: "medium", color: "#3b82f6" },
    { name: "Saudi Arabia", lat: 24.0, lng: 45.0, riskScore: 52, riskLevel: "medium", color: "#f59e0b" },
    { name: "Turkey", lat: 39.0, lng: 35.2, riskScore: 68, riskLevel: "high", color: "#f59e0b" },
    { name: "South Africa", lat: -30.6, lng: 22.9, riskScore: 58, riskLevel: "medium", color: "#3b82f6" },
    { name: "Nigeria", lat: 9.08, lng: 8.68, riskScore: 65, riskLevel: "high", color: "#f59e0b" },
    { name: "Pakistan", lat: 30.4, lng: 69.3, riskScore: 75, riskLevel: "high", color: "#f59e0b" },
    { name: "Singapore", lat: 1.35, lng: 103.8, riskScore: 20, riskLevel: "low", color: "#10b981" },
    { name: "South Korea", lat: 35.9, lng: 127.8, riskScore: 40, riskLevel: "medium", color: "#3b82f6" },
  ]

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: 30, lng: 30, altitude: 1.8 }, 0)
      const controls = globeRef.current.controls()
      if (controls) { controls.autoRotate = false; controls.enableZoom = true }
    }
  }, [])

  return (
    <div className="relative h-[calc(100vh-56px)] w-full bg-[#060d19] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: "linear-gradient(rgba(27,154,170,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(27,154,170,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px"}} />

      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /><span className="text-green-400 text-xs font-mono">LIVE</span></div>
        <div className="flex items-center gap-2 text-white/60 text-xs font-mono">Global GTI <span className="text-amber-400 font-semibold">55.0</span></div>
      </div>

      <button className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0d1f35]/80 border border-white/[0.08] text-white/60 text-xs font-mono hover:text-white transition">FILTERS</button>

      <div className="absolute inset-0 flex items-center justify-center">
        <GlobeComponent ref={globeRef} width={typeof window !== "undefined" ? window.innerWidth : 1200} height={typeof window !== "undefined" ? window.innerHeight - 56 : 700} globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg" backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png" atmosphereColor="#1b9aaa" atmosphereAltitude={0.12} pointsData={countries} pointLat="lat" pointLng="lng" pointColor="color" pointAltitude={0.06} pointRadius={0.5} pointLabel={(d: any) => '<div style="background:#0a1628;border:1px solid ' + d.color + ';border-radius:8px;padding:8px 12px;font-family:monospace;font-size:11px;"><div style="color:white;font-weight:bold;">' + d.name + '</div><div style="color:' + d.color + ';font-size:10px;">Risk: ' + d.riskScore + ' (' + d.riskLevel.toUpperCase() + ')</div></div>'} onPointClick={(d: any) => setSelectedCountry(d)} />
      </div>

      <div className="absolute bottom-24 left-4 z-20 bg-[#0a1628]/80 border border-white/[0.06] rounded-lg p-3 backdrop-blur-sm">
        <div className="text-white/40 text-[10px] font-mono tracking-wider mb-2">RISK LEVEL</div>
        {[{color:"#ef4444",label:"CRITICAL",range:">80"},{color:"#f59e0b",label:"HIGH",range:">60"},{color:"#3b82f6",label:"MEDIUM",range:">35"},{color:"#10b981",label:"LOW",range:"<35"}].map((item) => (<div key={item.label} className="flex items-center gap-2 mb-1.5"><div className="w-6 h-1 rounded-full" style={{backgroundColor:item.color}} /><span className="text-white/50 text-[10px] font-mono">{item.label} {item.range}</span></div>))}
      </div>

      {selectedCountry && (<div className="absolute top-4 right-4 z-20 w-72 bg-[#0a1628]/95 border border-white/[0.08] rounded-xl backdrop-blur-md p-4"><div className="flex items-center justify-between mb-2"><span className="text-white font-bold font-mono">{selectedCountry.name}</span><button onClick={() => setSelectedCountry(null)} className="text-white/40 hover:text-white">&times;</button></div><div className="text-xs font-mono" style={{color: selectedCountry.color}}>Risk Score: {selectedCountry.riskScore} ({selectedCountry.riskLevel.toUpperCase()})</div></div>)}

      <div className="absolute bottom-24 right-4 z-20 bg-[#0a1628]/80 border border-white/[0.06] rounded-lg p-3 backdrop-blur-sm">
        <div className="text-white/40 text-[10px] font-mono tracking-wider mb-2">ARC TYPES</div>
        {[{color:"#ef4444",label:"Military"},{color:"#f59e0b",label:"Sanctions"},{color:"#10b981",label:"Trade"},{color:"#3b82f6",label:"Diplomatic"}].map((item) => (<div key={item.label} className="flex items-center gap-2 mb-1.5"><div className="w-6 h-0.5 rounded-full" style={{backgroundColor:item.color}} /><span className="text-white/50 text-[10px] font-mono">{item.label}</span></div>))}
      </div>

      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 text-white/30 text-xs font-mono">Click any country to view market impact</div>

      <div className="absolute bottom-0 left-0 right-0 z-20 bg-[#0a1628]/95 border-t border-white/[0.06] backdrop-blur-sm">
        <div className="flex items-center px-4 py-2 gap-6 text-white/40 text-xs font-mono">
          <span>GEO MAP VIEW - Flat projection with risk overlays</span>
          <span className="ml-auto">REGISTERED</span>
        </div>
      </div>
    </div>
  )
}

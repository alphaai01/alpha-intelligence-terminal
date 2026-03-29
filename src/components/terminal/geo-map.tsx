"use client"

import { useState, useEffect, useRef } from "react"
import * as d3 from "d3"
import * as topojson from "topojson-client"

interface CountryData {
    name: string
    lat: number
    lng: number
    riskScore: number
    riskLevel: string
    color: string
    isoId: string
    marketImpact?: string
    index?: string
    value?: string
    change?: string
}

const countryIsoMap: Record<string, string> = {
    "United States": "840", "United Kingdom": "826", "Russia": "643", "China": "156", "India": "356", "Japan": "392", "Iran": "364", "Israel": "376", "Ukraine": "804", "Taiwan": "158", "Australia": "036", "Germany": "276", "Brazil": "076", "Saudi Arabia": "682", "Turkey": "792", "South Africa": "710", "Nigeria": "566", "Pakistan": "586", "Singapore": "702", "South Korea": "410",
}

export default function GeoMap() {
    const svgRef = useRef<SVGSVGElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null)
    const [showFilters, setShowFilters] = useState(false)
    const worldDataRef = useRef<any>(null)

  const countries: CountryData[] = [
    { name: "United States", lat: 39.8, lng: -98.6, riskScore: 35, riskLevel: "low", color: "#10b981", isoId: "840", marketImpact: "Stable monetary policy supporting risk assets", index: "S&P 500", value: "5,124.50", change: "+1.2%" },
    { name: "United Kingdom", lat: 55.4, lng: -3.4, riskScore: 42, riskLevel: "medium", color: "#3b82f6", isoId: "826", marketImpact: "Brexit aftereffects on trade markets", index: "FTSE 100", value: "7,890.30", change: "+0.8%" },
    { name: "Russia", lat: 61.5, lng: 105.3, riskScore: 92, riskLevel: "critical", color: "#ef4444", isoId: "643", marketImpact: "Sanctions and military operations escalating", index: "MOEX", value: "3,245.60", change: "-2.1%" },
    { name: "China", lat: 35.9, lng: 104.2, riskScore: 78, riskLevel: "high", color: "#f59e0b", isoId: "156", marketImpact: "Trade tensions and property concerns persist", index: "Shanghai Comp", value: "3,234.60", change: "-0.5%" },
    { name: "India", lat: 20.6, lng: 79.0, riskScore: 45, riskLevel: "medium", color: "#3b82f6", isoId: "356", marketImpact: "Strong GDP growth driving equity inflows", index: "Sensex", value: "74,234.50", change: "+2.1%" },
{ name: "Japan", lat: 36.2, lng: 138.3, riskScore: 30, riskLevel: "low", color: "#10b981", isoId: "392", marketImpact: "BOJ policy normalization cautiously", index: "Nikkei 225", value: "38,945.30", change: "+0.9%" },
    { name: "Iran", lat: 32.4, lng: 53.7, riskScore: 88, riskLevel: "critical", color: "#ef4444", isoId: "364", marketImpact: "Military escalation risk affecting oil" },
    { name: "Israel", lat: 31.0, lng: 34.8, riskScore: 85, riskLevel: "critical", color: "#ef4444", isoId: "376", marketImpact: "Regional conflict driving safe-haven demand" },
    { name: "Ukraine", lat: 48.4, lng: 31.2, riskScore: 95, riskLevel: "critical", color: "#ef4444", isoId: "804", marketImpact: "Ongoing conflict with supply chain impacts" },
    { name: "Taiwan", lat: 23.7, lng: 121.0, riskScore: 72, riskLevel: "high", color: "#f59e0b", isoId: "158", marketImpact: "Geopolitical tension on semiconductor supply" },
    { name: "Germany", lat: 51.2, lng: 10.5, riskScore: 38, riskLevel: "medium", color: "#3b82f6", isoId: "276", marketImpact: "Manufacturing PMI showing recovery", index: "DAX", value: "18,456.20", change: "+1.5%" },
    { name: "Australia", lat: -25.3, lng: 133.8, riskScore: 25, riskLevel: "low", color: "#10b981", isoId: "036", marketImpact: "Commodity exports recovery", index: "ASX 200", value: "7,654.30", change: "+1.8%" },
    { name: "Brazil", lat: -14.2, lng: -51.9, riskScore: 55, riskLevel: "medium", color: "#3b82f6", isoId: "076", marketImpact: "Political uncertainty on confidence" },
    { name: "Saudi Arabia", lat: 24.0, lng: 45.0, riskScore: 52, riskLevel: "medium", color: "#f59e0b", isoId: "682", marketImpact: "Oil production cuts supporting prices" },
    { name: "Turkey", lat: 39.0, lng: 35.2, riskScore: 68, riskLevel: "high", color: "#f59e0b", isoId: "792", marketImpact: "Currency volatility and inflation" },
    { name: "South Africa", lat: -30.6, lng: 22.9, riskScore: 58, riskLevel: "medium", color: "#3b82f6", isoId: "710", marketImpact: "Political transition sentiment" },
    { name: "Nigeria", lat: 9.08, lng: 8.68, riskScore: 65, riskLevel: "high", color: "#f59e0b", isoId: "566", marketImpact: "Oil dependency challenges" },
    { name: "Pakistan", lat: 30.4, lng: 69.3, riskScore: 75, riskLevel: "high", color: "#f59e0b", isoId: "586", marketImpact: "IMF program and instability" },
    { name: "Singapore", lat: 1.35, lng: 103.8, riskScore: 20, riskLevel: "low", color: "#10b981", isoId: "702", marketImpact: "Financial hub stability", index: "STI", value: "3,567.40", change: "+0.3%" },
    { name: "South Korea", lat: 35.9, lng: 127.8, riskScore: 40, riskLevel: "medium", color: "#3b82f6", isoId: "410", marketImpact: "Tech exports showing resilience" },
      ]

  const riskByIsoId: Record<string, CountryData> = {}
      countries.forEach((c) => { riskByIsoId[c.isoId] = c })

  const getCountryFill = (featureId: string): string => {
        const data = riskByIsoId[featureId]
        if (!data) return "#0d2b42"
        if (data.riskLevel === "critical") return "#7f1d1d"
        if (data.riskLevel === "high") return "#78350f"
        if (data.riskLevel === "medium") return "#1e3a5f"
        return "#0d3b3b"
  }

  const getCountryStroke = (featureId: string): string => {
        const data = riskByIsoId[featureId]
        if (!data) return "#1b9aaa"
        if (data.riskLevel === "critical") return "#ef4444"
        if (data.riskLevel === "high") return "#f59e0b"
        if (data.riskLevel === "medium") return "#3b82f6"
        return "#10b981"
  }

  const getRiskColor = (score: number): string => {
        if (score >= 80) return "#ef4444"
        if (score >= 60) return "#f59e0b"
        if (score >= 35) return "#3b82f6"
        return "#10b981"
  }

  const drawMap = () => {
        if (!svgRef.current || !containerRef.current) return
        const container = containerRef.current
        const width = container.clientWidth
        const height = container.clientHeight
        const svg = d3.select(svgRef.current)
        svg.selectAll("*").remove()
        svg.attr("width", width).attr("height", height)

        const projection = d3.geoNaturalEarth1().scale(width / 5.5).translate([width / 2, height / 2])
        const path = d3.geoPath().projection(projection)
        const g = svg.append("g")

        const graticule = d3.geoGraticule()
        g.append("path").datum(graticule()).attr("d", path as any).attr("fill", "none").attr("stroke", "#1b9aaa").attr("stroke-width", 0.2).attr("stroke-opacity", 0.15)

        if (worldDataRef.current) {
                const land = topojson.feature(worldDataRef.current, worldDataRef.current.objects.countries) as any
                g.selectAll("path.country").data(land.features).enter().append("path").attr("class", "country").attr("d", path as any)
                  .attr("fill", (d: any) => getCountryFill(d.id))
                  .attr("stroke", (d: any) => getCountryStroke(d.id))
                  .attr("stroke-width", (d: any) => { const data = riskByIsoId[d.id]; return data && data.riskLevel === "critical" ? 1.5 : 0.4 })
                  .attr("stroke-opacity", (d: any) => { const data = riskByIsoId[d.id]; if (!data) return 0.2; if (data.riskLevel === "critical") return 0.9; if (data.riskLevel === "high") return 0.6; return 0.35 })
                  .style("cursor", (d: any) => riskByIsoId[d.id] ? "pointer" : "default")
                  .on("click", (_event: any, d: any) => { const data = riskByIsoId[d.id]; if (data) setSelectedCountry(data) })
        }

        countries.forEach((country) => {
                const coords = projection([country.lng, country.lat])
                if (!coords) return
                const point = g.append("g").attr("transform", `translate(${coords[0]},${coords[1]})`).style("cursor", "pointer")
                point.append("circle").attr("r", Math.max(8, country.riskScore / 6)).attr("fill", country.color).attr("fill-opacity", 0.12)
                point.append("circle").attr("r", Math.max(3, country.riskScore / 15)).attr("fill", country.color).attr("fill-opacity", 0.8)
                if (country.riskLevel === "critical") { point.append("circle").attr("r", Math.max(12, country.riskScore / 5)).attr("fill", "none").attr("stroke", "#ef4444").attr("stroke-width", 1.5).attr("stroke-opacity", 0.3) }
                point.append("text").attr("x", 0).attr("y", -Math.max(8, country.riskScore / 6) - 4).attr("text-anchor", "middle").attr("fill", country.riskLevel === "critical" ? "rgba(239,68,68,0.8)" : "rgba(255,255,255,0.5)").attr("font-size", country.riskLevel === "critical" ? "9px" : "8px").attr("font-family", "monospace").attr("font-weight", country.riskLevel === "critical" ? "bold" : "normal").text(country.name.length > 12 ? country.name.slice(0, 10) + ".." : country.name)
                point.on("click", () => setSelectedCountry(country))
                point.append("title").text(`${country.name} - Risk: ${country.riskScore} (${country.riskLevel.toUpperCase()})`)
        })

        const zoom = d3.zoom<SVGSVGElement, unknown>().scaleExtent([1, 8]).on("zoom", (event) => { g.attr("transform", event.transform) })
        svg.call(zoom)
  }

  useEffect(() => {
        fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then((res) => res.json()).then((data) => { worldDataRef.current = data; drawMap() }).catch(() => drawMap())
  }, [])

  useEffect(() => {
        const handleResize = () => drawMap()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
        <div className="relative h-[calc(100vh-56px)] w-full bg-[#060d19] overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(27,154,170,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(27,154,170,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
                      <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /><span className="text-green-400 text-xs font-mono">LIVE</span>span></div>div>
                      <div className="flex items-center gap-2 text-white/60 text-xs font-mono">Global GTI <span className="text-amber-400 font-semibold">55.0</span>span></div>div>
              </div>div>
              <button onClick={() => setShowFilters(!showFilters)} className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0d1f35]/80 border border-white/[0.08] text-white/60 text-xs font-mono hover:text-white transition">FILTERS</button>button>
          {showFilters && (
                  <div className="absolute top-14 left-4 z-20 w-56 bg-[#0a1628]/95 border border-white/[0.08] rounded-lg p-4 backdrop-blur-md">
                            <div className="text-white/60 text-[10px] font-mono tracking-wider mb-3">RISK FILTERS</div>div>
                    {["Critical (>80)", "High (>60)", "Medium (>35)", "Low (<35)"].map((l) => (<label key={l} className="flex items-center gap-2 mb-2 cursor-pointer"><input type="checkbox" defaultChecked className="w-3 h-3 accent-[#1b9aaa]" /><span className="text-white/70 text-xs font-mono">{l}</span>span></label>label>))}
                            <div className="border-t border-white/[0.06] mt-3 pt-3">
                                        <div className="text-white/60 text-[10px] font-mono tracking-wider mb-3">REGIONS</div>div>
                              {["North America", "Europe", "Middle East", "Asia-Pacific", "Africa", "South America"].map((r) => (<label key={r} className="flex items-center gap-2 mb-2 cursor-pointer"><input type="checkbox" defaultChecked className="w-3 h-3 accent-[#1b9aaa]" /><span className="text-white/70 text-xs font-mono">{r}</span>span></label>label>))}
                            </div>div>
                  </div>div>
              )}
              <div ref={containerRef} className="absolute inset-0 flex items-center justify-center"><svg ref={svgRef} className="w-full h-full" /></div>div>
              <div className="absolute bottom-24 left-4 z-20 bg-[#0a1628]/80 border border-white/[0.06] rounded-lg p-3 backdrop-blur-sm">
                      <div className="text-white/40 text-[10px] font-mono tracking-wider mb-2">RISK LEVEL</div>div>
                {[{ color: "#ef4444", label: "CRITICAL", range: ">80" }, { color: "#f59e0b", label: "HIGH", range: ">60" }, { color: "#3b82f6", label: "MEDIUM", range: ">35" }, { color: "#10b981", label: "LOW", range: "<35" }].map((item) => (<div key={item.label} className="flex items-center gap-2 mb-1.5"><div className="w-6 h-1 rounded-full" style={{ backgroundColor: item.color }} /><span className="text-white/50 text-[10px] font-mono">{item.label} {item.range}</span>span></div>div>))}
              </div>div>
          {selectedCountry && (
                  <div className="absolute top-4 right-4 z-20 w-80 bg-[#0a1628]/95 border border-white/[0.08] rounded-xl backdrop-blur-md overflow-hidden">
                            <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
                                        <span className="text-white/80 text-xs font-mono tracking-wider">COUNTRY RISK DETAIL</span>span>
                                        <button onClick={() => setSelectedCountry(null)} className="text-white/40 hover:text-white text-lg">&times;</button>button>
                            </div>div>
                            <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                                      <span className="text-white font-bold text-lg font-mono">{selectedCountry.name}</span>span>
                                                      <span className="text-xs px-2 py-0.5 rounded font-mono font-semibold" style={{ backgroundColor: getRiskColor(selectedCountry.riskScore) + "20", color: getRiskColor(selectedCountry.riskScore) }}>{selectedCountry.riskLevel.toUpperCase()}</span>span>
                                        </div>div>
                                        <div className="text-xs font-mono mb-3" style={{ color: selectedCountry.color }}>Risk Score: {selectedCountry.riskScore}/100</div>div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-3"><div className="h-full rounded-full" style={{ width: selectedCountry.riskScore + "%", backgroundColor: selectedCountry.color }} /></div>div>
                              {selectedCountry.index && (
                                  <div className="flex items-center justify-between mb-3 bg-white/[0.02] border border-white/[0.04] rounded-lg p-2">
                                                  <span className="text-white/50 text-xs font-mono">{selectedCountry.index}</span>span>
                                                  <div className="flex items-center gap-2">
                                                                    <span className="text-white text-sm font-mono font-semibold">{selectedCountry.value}</span>span>
                                                                    <span className={`text-xs font-mono ${selectedCountry.change?.startsWith("+") ? "text-green-400" : "text-red-400"}`}>{selectedCountry.change}</span>span>
                                                  </div>div>
                                  </div>div>
                                        )}
                              {selectedCountry.marketImpact && (
                                  <div className="border-t border-white/[0.06] pt-3">
                                                  <span className="text-white/60 text-[10px] font-mono tracking-wider">MARKET IMPACT</span>span>
                                                  <p className="text-white/70 text-xs font-mono leading-relaxed mt-1">{selectedCountry.marketImpact}</p>p>
                                  </div>div>
                                        )}
                            </div>div>
                  </div>div>
              )}
              <div className="absolute bottom-24 right-4 z-20 bg-[#0a1628]/80 border border-white/[0.06] rounded-lg p-3 backdrop-blur-sm">
                      <div className="text-white/40 text-[10px] font-mono tracking-wider mb-2">ARC TYPES</div>div>
                {[{ color: "#ef4444", label: "Military" }, { color: "#f59e0b", label: "Sanctions" }, { color: "#10b981", label: "Trade" }, { color: "#3b82f6", label: "Diplomatic" }].map((item) => (<div key={item.label} className="flex items-center gap-2 mb-1.5"><div className="w-6 h-0.5 rounded-full" style={{ backgroundColor: item.color }} /><span className="text-white/50 text-[10px] font-mono">{item.label}</span>span></div>div>))}
              </div>div>
              <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 text-white/30 text-xs font-mono">Click any country to view risk details · Scroll to zoom · Drag to pan</div>div>
              <div className="absolute bottom-0 left-0 right-0 z-20 bg-[#0a1628]/95 border-t border-white/[0.06] backdrop-blur-sm">
                      <div className="flex items-center px-4 py-2 gap-6 text-white/40 text-xs font-mono"><span>GEO MAP VIEW - Flat projection with risk overlays</span>span><span className="ml-auto">REGISTERED</span>span></div>div>
              </div>div>
        </div>div>
      )
}</div>

"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function MarketPulse() {
  const [expandedFilters, setExpandedFilters] = useState({
    region: true,
    riskLevel: true,
    connectionType: true,
  })

  const marketCenters = [
    { name: "New York", index: "S&P 500", value: "5,124.50", change: "+1.2%", risk: "low", x: 250, y: 180 },
    { name: "London", index: "FTSE 100", value: "7,890.30", change: "+0.8%", risk: "low", x: 480, y: 150 },
    { name: "Frankfurt", index: "DAX", value: "18,456.20", change: "+1.5%", risk: "medium", x: 510, y: 155 },
    { name: "Mumbai", index: "Sensex", value: "74,234.50", change: "+2.1%", risk: "high", x: 640, y: 240 },
    { name: "Shanghai", index: "Shanghai Comp", value: "3,234.60", change: "-0.5%", risk: "high", x: 740, y: 200 },
    { name: "Tokyo", index: "Nikkei 225", value: "28,945.30", change: "+0.9%", risk: "low", x: 790, y: 175 },
    { name: "Singapore", index: "Straits Times", value: "3,567.40", change: "+0.3%", risk: "medium", x: 715, y: 275 },
    { name: "Hong Kong", index: "Hang Seng", value: "17,234.20", change: "-0.2%", risk: "medium", x: 745, y: 220 },
    { name: "Sydney", index: "ASX 200", value: "7,654.30", change: "+1.8%", risk: "low", x: 810, y: 340 },
  ]

  const events = [
    { severity: "high", text: "Fed Rate Decision: 5.5% maintained", time: "2 min ago" },
    { severity: "medium", text: "Nikkei breaks 28,900 resistance", time: "5 min ago" },
    { severity: "low", text: "Sensex reaches new all-time high", time: "8 min ago" },
    { severity: "high", text: "Geopolitical tensions spike in Southeast Asia", time: "12 min ago" },
    { severity: "medium", text: "Oil prices surge 3.2% on supply concerns", time: "15 min ago" },
  ]

  const regions = ["North America", "Europe", "Middle East", "Asia-Pacific", "Emerging Markets"]
  const riskLevels = ["Low", "Medium", "High", "Critical"]
  const connectionTypes = ["Equity Markets", "Commodity Markets", "Forex", "Crypto"]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "#10b981"
      case "medium":
        return "#f59e0b"
      case "high":
        return "#ef4444"
      default:
        return "#1b9aaa"
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return "danger"
      case "medium":
        return "warning"
      default:
        return "default"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)] p-6">
      {/* Left Sidebar: Filters */}
      <div className="lg:col-span-1 flex flex-col gap-4 overflow-y-auto">
        <h3 className="text-white font-semibold mb-2">FILTERS</h3>

        {/* Region Filter */}
        <Card>
          <div
            onClick={() => setExpandedFilters({ ...expandedFilters, region: !expandedFilters.region })}
            className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-white/5"
          >
            <span className="text-white/80 text-sm font-medium">Region</span>
            {expandedFilters.region ? (
              <ChevronUp size={16} className="text-white/50" />
            ) : (
              <ChevronDown size={16} className="text-white/50" />
            )}
          </div>
          {expandedFilters.region && (
            <CardContent className="space-y-2">
              {regions.map((region) => (
                <label key={region} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className="text-white/70 text-sm">{region}</span>
                </label>
              ))}
            </CardContent>
          )}
        </Card>

        {/* Risk Level Filter */}
        <Card>
          <div
            onClick={() => setExpandedFilters({ ...expandedFilters, riskLevel: !expandedFilters.riskLevel })}
            className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-white/5"
          >
            <span className="text-white/80 text-sm font-medium">Risk Level</span>
            {expandedFilters.riskLevel ? (
              <ChevronUp size={16} className="text-white/50" />
            ) : (
              <ChevronDown size={16} className="text-white/50" />
            )}
          </div>
          {expandedFilters.riskLevel && (
            <CardContent className="space-y-2">
              {riskLevels.map((level) => (
                <label key={level} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className="text-white/70 text-sm">{level}</span>
                </label>
              ))}
            </CardContent>
          )}
        </Card>

        {/* Connection Type Filter */}
        <Card>
          <div
            onClick={() => setExpandedFilters({ ...expandedFilters, connectionType: !expandedFilters.connectionType })}
            className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-white/5"
          >
            <span className="text-white/80 text-sm font-medium">Connection Type</span>
            {expandedFilters.connectionType ? (
              <ChevronUp size={16} className="text-white/50" />
            ) : (
              <ChevronDown size={16} className="text-white/50" />
            )}
          </div>
          {expandedFilters.connectionType && (
            <CardContent className="space-y-2">
              {connectionTypes.map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className="text-white/70 text-sm">{type}</span>
                </label>
              ))}
            </CardContent>
          )}
        </Card>
      </div>

      {/* Center: World Map */}
      <div className="lg:col-span-2 flex flex-col">
        <Card className="flex-1">
          <svg viewBox="0 0 1000 500" className="w-full h-full">
            {/* Simple continent outlines */}
            <g strokeWidth="1" stroke="#1b9aaa" fill="none" opacity="0.3">
              {/* North America */}
              <path d="M 200 150 L 220 140 L 230 160 L 210 170 Z" />
              {/* South America */}
              <path d="M 250 250 L 270 240 L 280 300 L 260 310 Z" />
              {/* Europe */}
              <path d="M 450 120 L 550 130 L 550 160 L 450 150 Z" />
              {/* Africa */}
              <path d="M 500 180 L 600 170 L 620 350 L 500 360 Z" />
              {/* Asia */}
              <path d="M 600 100 L 850 120 L 880 300 L 600 320 Z" />
              {/* Australia */}
              <path d="M 800 360 L 850 350 L 860 400 L 810 410 Z" />
            </g>

            {/* Connection lines between centers */}
            {marketCenters.map((center, idx) => {
              if (idx < marketCenters.length - 1) {
                const nextCenter = marketCenters[idx + 1]
                return (
                  <line
                    key={`line-${idx}`}
                    x1={center.x}
                    y1={center.y}
                    x2={nextCenter.x}
                    y2={nextCenter.y}
                    stroke="#1b9aaa"
                    strokeWidth="1"
                    opacity="0.2"
                    strokeDasharray="5,5"
                  />
                )
              }
              return null
            })}

            {/* Market Centers */}
            {marketCenters.map((center, idx) => (
              <g key={idx}>
                {/* Pulsing circle background */}
                <circle
                  cx={center.x}
                  cy={center.y}
                  r="12"
                  fill={getRiskColor(center.risk)}
                  opacity="0.1"
                >
                  <animate attributeName="r" values="12;20" dur="2s" repeatCount="indefinite" />
                </circle>

                {/* Main marker circle */}
                <circle
                  cx={center.x}
                  cy={center.y}
                  r="6"
                  fill={getRiskColor(center.risk)}
                  opacity="0.8"
                />

                {/* Hover info box (positioned above) */}
                <g>
                  <rect
                    x={center.x - 45}
                    y={center.y - 35}
                    width="90"
                    height="30"
                    fill="#0f2440"
                    stroke={getRiskColor(center.risk)}
                    strokeWidth="1"
                    rx="4"
                    opacity="0.9"
                  />
                  <text
                    x={center.x}
                    y={center.y - 20}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#ffffff"
                    fontWeight="bold"
                  >
                    {center.name}
                  </text>
                  <text
                    x={center.x}
                    y={center.y - 10}
                    textAnchor="middle"
                    fontSize="8"
                    fill="#ffffff"
                    opacity="0.7"
                  >
                    {center.value}
                  </text>
                </g>
              </g>
            ))}
          </svg>
        </Card>

        {/* Legends */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {/* Risk Level Legend */}
          <Card className="p-4">
            <div className="text-white/70 text-xs font-semibold mb-2">RISK LEVEL</div>
            <div className="space-y-2">
              {["Low", "Medium", "High"].map((level) => (
                <div key={level} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor:
                        level === "Low" ? "#10b981" : level === "Medium" ? "#f59e0b" : "#ef4444",
                    }}
                  />
                  <span className="text-white/60 text-xs">{level}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Connection Types Legend */}
          <Card className="p-4">
            <div className="text-white/70 text-xs font-semibold mb-2">CONNECTION TYPES</div>
            <div className="space-y-1 text-white/60 text-xs">
              <div>---- Equity Markets</div>
              <div>---- Commodity Markets</div>
              <div>---- Forex/Crypto</div>
            </div>
          </Card>
        </div>
      </div>

      {/* Right: Events Ticker */}
      <div className="lg:col-span-1 flex flex-col">
        <h3 className="text-white font-semibold mb-3">MARKET EVENTS</h3>
        <Card className="flex-1 overflow-hidden flex flex-col">
          <CardContent className="space-y-3 overflow-y-auto flex-1">
            {events.map((event, idx) => (
              <div key={idx} className="border-l-2 border-white/[0.08] pl-3 py-2 hover:bg-white/5 transition">
                <div className="flex items-start gap-2 mb-1">
                  <Badge variant={getSeverityBadge(event.severity)} className="text-xs">
                    {event.severity.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-white/80 text-xs leading-tight">{event.text}</p>
                <p className="text-white/40 text-xs mt-1">{event.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

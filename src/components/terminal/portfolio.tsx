"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function Portfolio() {
  const summaryCards = [
    { label: "Total Value", value: "₹24,50,000", change: "+₹32,400", isPositive: true },
    { label: "Day P&L", value: "+₹32,400", change: "+1.33% gain", isPositive: true },
    { label: "Open Positions", value: "8", change: "2 added today", isPositive: true },
    { label: "Win Rate", value: "72%", change: "+2% this month", isPositive: true },
  ]

  const allocationData = [
    { name: "Equities", value: 65, fill: "#1b9aaa" },
    { name: "Commodities", value: 15, fill: "#d4a843" },
    { name: "Forex", value: 10, fill: "#10b981" },
    { name: "Crypto", value: 7, fill: "#f59e0b" },
    { name: "ETFs", value: 3, fill: "#8b5cf6" },
  ]

  const performanceData = [
    { date: "1 Mar", value: 2342000 },
    { date: "5 Mar", value: 2385000 },
    { date: "10 Mar", value: 2401000 },
    { date: "15 Mar", value: 2378000 },
    { date: "20 Mar", value: 2425000 },
    { date: "25 Mar", value: 2450000 },
  ]

  const holdings = [
    {
      ticker: "RELIANCE",
      name: "Reliance Industries",
      quantity: 50,
      avgCost: 3100.50,
      currentPrice: 3245.50,
      value: 162275,
      plAmount: 7250,
      plPercent: 4.66,
    },
    {
      ticker: "INFY",
      name: "Infosys",
      quantity: 25,
      avgCost: 1920.30,
      currentPrice: 1845.20,
      value: 46130,
      plAmount: -1877.5,
      plPercent: -3.91,
    },
    {
      ticker: "SBIN",
      name: "State Bank of India",
      quantity: 100,
      avgCost: 502.40,
      currentPrice: 520.30,
      value: 52030,
      plAmount: 1790,
      plPercent: 3.55,
    },
    {
      ticker: "TATAMOTORS",
      name: "Tata Motors",
      quantity: 200,
      avgCost: 660.50,
      currentPrice: 680.45,
      value: 136090,
      plAmount: 3990,
      plPercent: 3.02,
    },
    {
      ticker: "HDFCBANK",
      name: "HDFC Bank",
      quantity: 30,
      avgCost: 1920.30,
      currentPrice: 1980.75,
      value: 59422.5,
      plAmount: 1813.5,
      plPercent: 3.14,
    },
    {
      ticker: "WIPRO",
      name: "Wipro Limited",
      quantity: 75,
      avgCost: 420.80,
      currentPrice: 438.20,
      value: 32865,
      plAmount: 1305,
      plPercent: 4.13,
    },
    {
      ticker: "MARUTI",
      name: "Maruti Suzuki",
      quantity: 40,
      avgCost: 8934.50,
      currentPrice: 9245.30,
      value: 369812,
      plAmount: 12432,
      plPercent: 3.48,
    },
    {
      ticker: "HEROMOTOCORP",
      name: "Hero MotoCorp",
      quantity: 60,
      avgCost: 3890.20,
      currentPrice: 4125.50,
      value: 247530,
      plAmount: 14118,
      plPercent: 6.05,
    },
  ]

  return (
    <div className="space-y-6 h-[calc(100vh-200px)] overflow-y-auto p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, idx) => (
          <Card key={idx}>
            <CardContent className="pt-6">
              <div className="text-white/60 text-xs font-semibold mb-2">{card.label}</div>
              <div className="text-2xl font-bold text-white mb-2">{card.value}</div>
              <div
                className={`flex items-center gap-1 text-xs ${card.isPositive ? "text-green-400" : "text-red-400"}`}
              >
                {card.isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {card.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Allocation Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <text key={index} x={entry.value} y={entry.value} fill="white" fontSize="12" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f2440",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => `${value}%`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {allocationData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                  <span className="text-white/70 text-xs">
                    {item.name} <span className="font-semibold">{item.value}%</span>
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Area Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Performance (30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1b9aaa" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#1b9aaa" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f2440",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => `₹${value.toLocaleString()}`}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#1b9aaa"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Holdings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-4 text-white/70 font-semibold">Ticker</th>
                  <th className="text-right py-3 px-4 text-white/70 font-semibold">Quantity</th>
                  <th className="text-right py-3 px-4 text-white/70 font-semibold">Avg Cost</th>
                  <th className="text-right py-3 px-4 text-white/70 font-semibold">Current Price</th>
                  <th className="text-right py-3 px-4 text-white/70 font-semibold">Value</th>
                  <th className="text-right py-3 px-4 text-white/70 font-semibold">P&L</th>
                  <th className="text-right py-3 px-4 text-white/70 font-semibold">Return %</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding, idx) => (
                  <tr key={idx} className="border-b border-white/[0.08] hover:bg-white/5 transition">
                    <td className="py-3 px-4">
                      <div className="text-white font-semibold">{holding.ticker}</div>
                      <div className="text-white/60 text-xs">{holding.name}</div>
                    </td>
                    <td className="text-right py-3 px-4 text-white">{holding.quantity}</td>
                    <td className="text-right py-3 px-4 text-white">₹{holding.avgCost.toFixed(2)}</td>
                    <td className="text-right py-3 px-4 text-white">₹{holding.currentPrice.toFixed(2)}</td>
                    <td className="text-right py-3 px-4 text-white font-semibold">
                      ₹{holding.value.toLocaleString()}
                    </td>
                    <td
                      className={`text-right py-3 px-4 font-semibold ${
                        holding.plAmount >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {holding.plAmount >= 0 ? "+" : ""}₹{holding.plAmount.toFixed(1)}
                    </td>
                    <td
                      className={`text-right py-3 px-4 font-semibold ${
                        holding.plPercent >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {holding.plPercent >= 0 ? "+" : ""}{holding.plPercent.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

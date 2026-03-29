"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function RiskMatrix() {
  const metricCards = [
    {
      label: "VaR 95%",
      value: "₹1,20,000",
      description: "Potential loss at 95% confidence",
    },
    {
      label: "Portfolio Volatility",
      value: "14.2%",
      description: "Annualized standard deviation",
    },
    {
      label: "Max Drawdown",
      value: "-8.4%",
      description: "Largest peak-to-trough decline",
    },
  ]

  const sectorRisks = [
    { sector: "IT Services", overall: 65, volatility: 72, correlation: 58, concentration: 45 },
    { sector: "Banking", overall: 58, volatility: 55, correlation: 68, concentration: 72 },
    { sector: "Automotive", overall: 72, volatility: 68, correlation: 62, concentration: 48 },
    { sector: "Metals", overall: 68, volatility: 75, correlation: 45, concentration: 55 },
    { sector: "Energy", overall: 75, volatility: 82, correlation: 52, concentration: 38 },
    { sector: "Pharma", overall: 52, volatility: 58, correlation: 35, concentration: 62 },
    { sector: "FMCG", overall: 45, volatility: 42, correlation: 72, concentration: 48 },
    { sector: "Telecom", overall: 62, volatility: 65, correlation: 58, concentration: 55 },
  ]

  const correlationMatrix: Array<{ ticker: string; RELIANCE: number; INFY: number; SBIN: number; HDFCBANK: number }> = [
    { ticker: "RELIANCE", RELIANCE: 100, INFY: 45, SBIN: 68, HDFCBANK: 72 },
    { ticker: "INFY", RELIANCE: 45, INFY: 100, SBIN: 38, HDFCBANK: 42 },
    { ticker: "SBIN", RELIANCE: 68, INFY: 38, SBIN: 100, HDFCBANK: 85 },
    { ticker: "HDFCBANK", RELIANCE: 72, INFY: 42, SBIN: 85, HDFCBANK: 100 },
  ]

  const stressTests = [
    {
      scenario: "Market Crash -10%",
      impact: "-₹2,45,000",
      probability: "5%",
      expectedLoss: "-₹12,250",
    },
    {
      scenario: "Rate Hike +100bps",
      impact: "-₹89,450",
      probability: "25%",
      expectedLoss: "-₹22,363",
    },
    {
      scenario: "INR Depreciation -5%",
      impact: "-₹156,800",
      probability: "15%",
      expectedLoss: "-₹23,520",
    },
    {
      scenario: "Oil Price Spike +30%",
      impact: "-₹73,500",
      probability: "20%",
      expectedLoss: "-₹14,700",
    },
    {
      scenario: "Global Recession",
      impact: "-₹612,500",
      probability: "8%",
      expectedLoss: "-₹49,000",
    },
  ]

  const getRiskColor = (value: number) => {
    if (value >= 80) return "#ef4444"
    if (value >= 60) return "#f59e0b"
    if (value >= 40) return "#eab308"
    return "#10b981"
  }

  const getRiskBgColor = (value: number) => {
    if (value >= 80) return "rgba(239, 68, 68, 0.15)"
    if (value >= 60) return "rgba(245, 158, 11, 0.15)"
    if (value >= 40) return "rgba(234, 179, 8, 0.15)"
    return "rgba(16, 185, 129, 0.15)"
  }

  return (
    <div className="space-y-6 h-[calc(100vh-200px)] overflow-y-auto p-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metricCards.map((metric, idx) => (
          <Card key={idx}>
            <CardContent className="pt-6">
              <div className="text-white/60 text-xs font-semibold mb-2">{metric.label}</div>
              <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
              <div className="text-white/50 text-xs">{metric.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sector Risk Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Sector Risk Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-4 text-white/70 font-semibold">Sector</th>
                  <th className="text-center py-3 px-4 text-white/70 font-semibold">Overall Risk</th>
                  <th className="text-center py-3 px-4 text-white/70 font-semibold">Volatility</th>
                  <th className="text-center py-3 px-4 text-white/70 font-semibold">Correlation</th>
                  <th className="text-center py-3 px-4 text-white/70 font-semibold">Concentration</th>
                </tr>
              </thead>
              <tbody>
                {sectorRisks.map((sector, idx) => (
                  <tr key={idx} className="border-b border-white/[0.08] hover:bg-white/5 transition">
                    <td className="py-3 px-4 text-white font-semibold">{sector.sector}</td>
                    <td className="py-3 px-4 text-center">
                      <div
                        className="inline-block px-3 py-1 rounded-lg font-semibold text-white text-sm"
                        style={{
                          backgroundColor: getRiskBgColor(sector.overall),
                          color: getRiskColor(sector.overall),
                        }}
                      >
                        {sector.overall}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div
                        className="inline-block px-3 py-1 rounded-lg font-semibold text-white text-sm"
                        style={{
                          backgroundColor: getRiskBgColor(sector.volatility),
                          color: getRiskColor(sector.volatility),
                        }}
                      >
                        {sector.volatility}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div
                        className="inline-block px-3 py-1 rounded-lg font-semibold text-white text-sm"
                        style={{
                          backgroundColor: getRiskBgColor(sector.correlation),
                          color: getRiskColor(sector.correlation),
                        }}
                      >
                        {sector.correlation}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div
                        className="inline-block px-3 py-1 rounded-lg font-semibold text-white text-sm"
                        style={{
                          backgroundColor: getRiskBgColor(sector.concentration),
                          color: getRiskColor(sector.concentration),
                        }}
                      >
                        {sector.concentration}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Correlation Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Asset Correlation Matrix (Top 4 Holdings)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="py-3 px-4 text-white/70 font-semibold text-left border-b border-white/[0.08]">
                    Ticker
                  </th>
                  <th className="py-3 px-4 text-center text-white/70 font-semibold border-b border-white/[0.08]">
                    RELIANCE
                  </th>
                  <th className="py-3 px-4 text-center text-white/70 font-semibold border-b border-white/[0.08]">
                    INFY
                  </th>
                  <th className="py-3 px-4 text-center text-white/70 font-semibold border-b border-white/[0.08]">
                    SBIN
                  </th>
                  <th className="py-3 px-4 text-center text-white/70 font-semibold border-b border-white/[0.08]">
                    HDFCBANK
                  </th>
                </tr>
              </thead>
              <tbody>
                {correlationMatrix.map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-3 px-4 text-white font-semibold border-b border-white/[0.08]">
                      {row.ticker}
                    </td>
                    <td className="py-3 px-4 text-center border-b border-white/[0.08]">
                      <div
                        className="inline-block px-2 py-1 rounded text-xs font-semibold text-white"
                        style={{
                          backgroundColor: getRiskBgColor(row.RELIANCE),
                          color: getRiskColor(row.RELIANCE),
                        }}
                      >
                        {row.RELIANCE}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center border-b border-white/[0.08]">
                      <div
                        className="inline-block px-2 py-1 rounded text-xs font-semibold text-white"
                        style={{
                          backgroundColor: getRiskBgColor(row.INFY),
                          color: getRiskColor(row.INFY),
                        }}
                      >
                        {row.INFY}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center border-b border-white/[0.08]">
                      <div
                        className="inline-block px-2 py-1 rounded text-xs font-semibold text-white"
                        style={{
                          backgroundColor: getRiskBgColor(row.SBIN),
                          color: getRiskColor(row.SBIN),
                        }}
                      >
                        {row.SBIN}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center border-b border-white/[0.08]">
                      <div
                        className="inline-block px-2 py-1 rounded text-xs font-semibold text-white"
                        style={{
                          backgroundColor: getRiskBgColor(row.HDFCBANK),
                          color: getRiskColor(row.HDFCBANK),
                        }}
                      >
                        {row.HDFCBANK}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Stress Test Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle>Stress Test Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-4 text-white/70 font-semibold">Scenario</th>
                  <th className="text-right py-3 px-4 text-white/70 font-semibold">Portfolio Impact</th>
                  <th className="text-right py-3 px-4 text-white/70 font-semibold">Probability</th>
                  <th className="text-right py-3 px-4 text-white/70 font-semibold">Expected Loss</th>
                </tr>
              </thead>
              <tbody>
                {stressTests.map((test, idx) => (
                  <tr key={idx} className="border-b border-white/[0.08] hover:bg-white/5 transition">
                    <td className="py-3 px-4 text-white font-semibold">{test.scenario}</td>
                    <td className="text-right py-3 px-4 text-red-400 font-semibold">{test.impact}</td>
                    <td className="text-right py-3 px-4 text-white/70">{test.probability}</td>
                    <td className="text-right py-3 px-4 text-red-400 font-semibold">{test.expectedLoss}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Risk Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-sm">Portfolio Diversification</span>
              <span className="text-white font-semibold">Good</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-green-400 w-3/4" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-sm">Sector Concentration</span>
              <span className="text-white font-semibold">Moderate</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 w-1/2" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-sm">Correlation Risk</span>
              <span className="text-white font-semibold">Moderate-High</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-red-500 w-2/3" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-sm">Leverage Risk</span>
              <span className="text-white font-semibold">Low</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-green-400 w-1/4" />
            </div>
          </div>

          <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-blue-400 text-xs leading-relaxed">
              Overall Risk Level: MODERATE. Your portfolio shows good diversification across sectors. Monitor
              correlation risk in banking stocks and consider reducing concentration in high-beta IT stocks.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

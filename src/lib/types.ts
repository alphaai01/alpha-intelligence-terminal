export interface Signal {
  id: string
  ticker: string
  name: string
  direction: "BUY" | "SELL" | "HOLD"
  confidence: number
  assetClass: "Equities" | "Commodities" | "Forex" | "Crypto" | "ETFs" | "Bonds"
  currentPrice: number
  changePercent: number
  entry: number
  stopLoss: number
  target: number
  riskReward: number
  atr: number
  maxPosition: number
  triggeringEvent: string
  tags: string[]
  timestamp: Date
  isActive?: boolean
  createdBy?: string
}

export interface MarketCenter {
  id: string
  name: string
  code: string
  x: number
  y: number
  riskScore: number
  index: string
  indexValue: number
  change: number
}

export interface GeoEvent {
  id: string
  title: string
  time: string
  region: string
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW"
  impact: string
}

export interface PortfolioHolding {
  id: string
  ticker: string
  name: string
  direction: "LONG" | "SHORT"
  entry: number
  current: number
  pnl: number
  pnlPercent: number
  weight: number
  status: "active" | "stopped" | "target_hit"
  quantity?: number
  addedAt?: Date
}

export interface Lead {
  id: string
  email: string
  name?: string
  phone?: string
  source: string
  status: "new" | "contacted" | "qualified" | "converted" | "lost"
  createdAt: Date
}

export interface FAQ {
  id: string
  question: string
  answer: string
  order: number
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  title: string
  company: string
  rating: number
}

export interface RiskMetric {
  sector: string
  exposure: number
  volatility: number
  correlation: number
  var95: number
}

export interface User {
  id: string
  email: string
  name?: string
  role: "admin" | "user" | "viewer"
  plan: "free" | "pro" | "enterprise"
  createdAt: Date
  updatedAt?: Date
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  author: string
  published: boolean
  createdAt: Date
  updatedAt?: Date
  tags?: string[]
}

export interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  createdAt: Date
}

export interface PageContent {
  id: string
  page: string
  section: string
  content: Record<string, any>
  updatedAt: Date
}

export interface AnalyticsEvent {
  id: string
  event: string
  properties: Record<string, any>
  userId?: string
  createdAt: Date
}

export interface PricingTier {
  id: string
  name: string
  price: number
  features: string[]
  description: string
  highlighted?: boolean
}

export interface NavItem {
  label: string
  href: string
  icon?: string
  children?: NavItem[]
  badge?: string
}

export interface ChartDataPoint {
  timestamp: Date
  value: number
  open?: number
  high?: number
  low?: number
  close?: number
  volume?: number
}

export interface MarketData {
  ticker: string
  price: number
  change: number
  changePercent: number
  high52Week: number
  low52Week: number
  marketCap: number
  volume: number
  avgVolume: number
  pe: number
  eps: number
  dividend: number
  beta: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginationParams {
  page: number
  limit: number
  sort?: string
  order?: "asc" | "desc"
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  pages: number
}

export interface NotificationData {
  id: string
  userId: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: Date
  actionUrl?: string
}

export interface AlertRule {
  id: string
  userId: string
  ticker: string
  condition: "above" | "below" | "change"
  value: number
  enabled: boolean
  createdAt: Date
}

export interface WatchlistItem {
  id: string
  userId: string
  ticker: string
  name: string
  addedAt: Date
}

export interface TradeExecution {
  id: string
  userId: string
  ticker: string
  type: "BUY" | "SELL"
  quantity: number
  price: number
  commission: number
  total: number
  executedAt: Date
  status: "pending" | "filled" | "cancelled"
}

export interface BacktestResult {
  id: string
  strategyId: string
  startDate: Date
  endDate: Date
  totalReturn: number
  sharpeRatio: number
  maxDrawdown: number
  winRate: number
  trades: number
  data: ChartDataPoint[]
}

export interface ScreenerCriteria {
  id: string
  userId: string
  name: string
  criteria: Record<string, any>
  results: Signal[]
  lastRun: Date
  savedAt: Date
}

export interface NewsItem {
  id: string
  title: string
  summary: string
  source: string
  sentiment: "positive" | "negative" | "neutral"
  impact: "high" | "medium" | "low"
  relatedTickers: string[]
  publishedAt: Date
  url: string
}

export interface EconomicCalendarEvent {
  id: string
  country: string
  event: string
  impact: "high" | "medium" | "low"
  previousValue: number
  forecastValue: number
  actualValue?: number
  releaseTime: Date
}

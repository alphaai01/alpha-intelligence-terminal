import { NextRequest, NextResponse } from "next/server"

const mockSignals = [
  {
    id: "1",
    ticker: "AAPL",
    direction: "BUY",
    confidence: 85,
    status: "active",
    createdAt: "2024-03-28T10:00:00Z",
  },
  {
    id: "2",
    ticker: "TSLA",
    direction: "SELL",
    confidence: 72,
    status: "active",
    createdAt: "2024-03-27T10:00:00Z",
  },
  {
    id: "3",
    ticker: "NVDA",
    direction: "BUY",
    confidence: 91,
    status: "active",
    createdAt: "2024-03-26T10:00:00Z",
  },
  {
    id: "4",
    ticker: "MSFT",
    direction: "BUY",
    confidence: 78,
    status: "inactive",
    createdAt: "2024-03-25T10:00:00Z",
  },
  {
    id: "5",
    ticker: "AMZN",
    direction: "SELL",
    confidence: 65,
    status: "active",
    createdAt: "2024-03-24T10:00:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const status = request.nextUrl.searchParams.get("status")

    let results = mockSignals

    if (status) {
      results = results.filter((s) => s.status === status)
    }

    return NextResponse.json({
      success: true,
      count: results.length,
      signals: results,
    })
  } catch (error) {
    console.error("Error fetching signals:", error)
    return NextResponse.json({ error: "Failed to fetch signals" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ticker, direction, confidence } = body

    // Validation
    if (!ticker || !["BUY", "SELL"].includes(direction) || confidence < 0 || confidence > 100) {
      return NextResponse.json(
        {
          error: "Invalid signal data. Requires: ticker, direction (BUY/SELL), confidence (0-100)",
        },
        { status: 400 }
      )
    }

    const newSignal = {
      id: crypto.randomUUID(),
      ticker: ticker.toUpperCase(),
      direction,
      confidence: Math.round(confidence),
      status: "active",
      createdAt: new Date().toISOString(),
    }

    console.log("New signal created:", newSignal)

    // TODO: Save to database
    // TODO: Send notifications to subscribers

    return NextResponse.json(
      {
        success: true,
        message: "Signal created successfully",
        signal: newSignal,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating signal:", error)
    return NextResponse.json({ error: "Failed to create signal" }, { status: 500 })
  }
}

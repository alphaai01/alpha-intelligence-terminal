import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, phone, source } = body

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    // In production, save to Supabase/database
    const lead = {
      id: crypto.randomUUID(),
      email,
      name: name || "",
      phone: phone || "",
      source: source || "website",
      status: "new",
      createdAt: new Date().toISOString(),
    }

    console.log("New lead captured:", lead)

    // TODO: Send email notification
    // TODO: Save to Supabase
    // TODO: Sync to CRM / Google Sheets

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! We'll be in touch soon.",
        lead,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Lead capture error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // TODO: Fetch from database
    const mockLeads = [
      {
        id: "1",
        email: "john@example.com",
        name: "John Doe",
        phone: "+1-555-0101",
        source: "landing",
        status: "qualified",
        createdAt: "2024-03-28T10:00:00Z",
      },
      {
        id: "2",
        email: "sarah@example.com",
        name: "Sarah Smith",
        phone: "+1-555-0102",
        source: "webinar",
        status: "contacted",
        createdAt: "2024-03-27T10:00:00Z",
      },
    ]

    return NextResponse.json({ leads: mockLeads })
  } catch (error) {
    console.error("Error fetching leads:", error)
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 })
  }
}

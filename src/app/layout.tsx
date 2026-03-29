import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Alpha AI — Intelligence Terminal | AI-Powered Trading Intelligence",
  description: "Alpha AI's Intelligence Terminal combines geopolitical analysis, AI-driven signals, and real-time risk monitoring for institutional investors and traders.",
  keywords: [
    "AI trading",
    "algorithmic trading",
    "market intelligence",
    "geopolitical risk",
    "trading signals",
    "portfolio analytics",
  ],
  authors: [{ name: "OneAlpha AI" }],
  openGraph: {
    title: "Alpha AI — Intelligence Terminal",
    description: "AI-powered trading intelligence platform for institutional investors",
    url: "https://onealphaai.com",
    siteName: "Alpha AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alpha AI — Intelligence Terminal",
    description: "AI-powered trading intelligence platform",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#0d1b2a] text-white antialiased font-sans">
        {children}
      </body>
    </html>
  )
}

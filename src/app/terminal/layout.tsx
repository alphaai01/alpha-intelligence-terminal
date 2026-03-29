export default function TerminalLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0d1b2a] text-white antialiased">
        <div className="h-screen w-screen flex flex-col overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  )
}

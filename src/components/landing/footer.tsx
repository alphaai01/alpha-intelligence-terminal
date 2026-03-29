export default function Footer() {
  return (
    <footer className="bg-[#0a1628] border-t border-white/[0.06] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <img src="https://www.onealphaai.com/dist/img/Ai-For-Alpha-alt-2.png" alt="Alpha AI" className="h-8 mb-4" />
            <p className="text-white/50 text-sm leading-relaxed">AI-powered trading intelligence platform for institutional investors and individual traders.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <div className="space-y-2">
              <a href="/terminal" className="block text-white/50 text-sm hover:text-white transition">Intelligence Terminal</a>
              <a href="#" className="block text-white/50 text-sm hover:text-white transition">Earth Pulse</a>
              <a href="#" className="block text-white/50 text-sm hover:text-white transition">AI Signals</a>
              <a href="#" className="block text-white/50 text-sm hover:text-white transition">Portfolio Analytics</a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <div className="space-y-2">
              <a href="https://www.onealphaai.com" className="block text-white/50 text-sm hover:text-white transition">About</a>
              <a href="#" className="block text-white/50 text-sm hover:text-white transition">Blog</a>
              <a href="#" className="block text-white/50 text-sm hover:text-white transition">Careers</a>
              <a href="#" className="block text-white/50 text-sm hover:text-white transition">Contact</a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <div className="space-y-2">
              <a href="#" className="block text-white/50 text-sm hover:text-white transition">Terms of Service</a>
              <a href="#" className="block text-white/50 text-sm hover:text-white transition">Privacy Policy</a>
              <a href="#" className="block text-white/50 text-sm hover:text-white transition">Risk Disclaimer</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">&copy; 2026 OneAlpha AI. All rights reserved.</p>
          <p className="text-white/30 text-xs">Not investment advice. For educational purposes only.</p>
        </div>
      </div>
    </footer>
  )
}

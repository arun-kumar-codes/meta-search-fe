"use client"

export default function Header() {
  return (
    <header className="py-6">
      <div className="max-w-8xl mx-auto px-4 md:px-8">
        <div className="bg-gray-800 rounded-full px-6 md:px-8 py-4 flex items-center justify-between">
          {/* Logo and Brand Name */}
          <div className="flex items-center gap-3">
            {/* Logo - 2x3 grid with missing top-middle and bottom-middle */}
            <div className="grid grid-cols-2 grid-rows-3 gap-1 w-6 h-9">
              <div className="bg-[#00C2A8] rounded-sm"></div>
              <div className="bg-transparent"></div>
              <div className="bg-[#00C2A8] rounded-sm"></div>
              <div className="bg-[#00C2A8] rounded-sm"></div>
              <div className="bg-transparent"></div>
              <div className="bg-[#00C2A8] rounded-sm"></div>
            </div>
            <span className="text-white font-semibold text-xl">Used Car Metasearch</span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-white hover:text-[#00C2A8] transition-colors font-medium">
              Search Cars
            </a>
            <a href="#" className="text-white hover:text-[#00C2A8] transition-colors font-medium">
              News
            </a>
            <a href="#" className="text-white hover:text-[#00C2A8] transition-colors font-medium">
              Career
            </a>
            <a href="#" className="text-white hover:text-[#00C2A8] transition-colors font-medium">
              Contact us
            </a>
          </nav>

          {/* Download App Button */}
          <button className="bg-[#00C2A8] hover:bg-[#00C2A8]/90 text-gray-900 font-semibold px-6 py-2 rounded-full transition-colors">
            Login
          </button>
        </div>
      </div>
    </header>
  )
}

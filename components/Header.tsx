"use client"

import Link from "next/link"

export default function Header() {
  return (
    <header className="sticky top-0 z-[100] py-2">
      <div className="max-w-8xl mx-auto px-4 md:px-8">
        <div className="bg-gray-800 rounded-full px-6 md:px-8 py-4 flex items-center justify-between">
          {/* Logo and Brand Name */}
          <Link href="/">
          <div className="flex items-center gap-3">
            {/* Logo - 2x3 grid with missing top-middle and bottom-middle */}
            <div className="grid grid-cols-2 grid-rows-3 gap-1 w-6 h-9">
              <div className="bg-[#ED264F] rounded-sm"></div>
              <div className="bg-transparent"></div>
              <div className="bg-[#ED264F] rounded-sm"></div>
              <div className="bg-[#ED264F] rounded-sm"></div>
              <div className="bg-transparent"></div>
              <div className="bg-[#ED264F] rounded-sm"></div>
            </div>
            <span className="text-white font-semibold text-xl">Car Metasearch</span>
          </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-white hover:text-[#ED264F] transition-colors font-medium">
              Search Cars
            </a>
            <a href="#" className="text-white hover:text-[#ED264F] transition-colors font-medium">
              News & Reviews
            </a>
            <a href="#" className="text-white hover:text-[#ED264F] transition-colors font-medium">
              About Us
            </a>
          </nav>

          {/* Download App Button */}
          <button className="bg-[#ED264F] hover:bg-[#ED264F]/90 text-white font-semibold px-6 py-2 cursor-pointer rounded-full transition-colors">
            Login
          </button>
        </div>
      </div>
    </header>
  )
}

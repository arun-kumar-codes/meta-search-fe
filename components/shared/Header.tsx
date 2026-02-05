"use client"

import Link from "next/link"
import Image from "next/image"

export default function Header() {
  return (
    <header className="sticky top-0 z-[100] w-full bg-gray-900 shadow-lg">
      <div className="w-full px-6 md:px-8 py-4 flex items-center justify-between">
        {/* Logo and Brand Name */}
        <Link href="/">
          <div className="flex items-center gap-3">
            <Image
              src="/logos/caratlas-full.png"
              alt="CarAtlas"
              width={140}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#faq" className="text-gray-300 hover:text-white transition-colors font-semibold text-sm uppercase tracking-wide hover:underline underline-offset-4">
            FAQ
          </Link>
          <Link href="#about" className="text-gray-300 hover:text-white transition-colors font-semibold text-sm uppercase tracking-wide hover:underline underline-offset-4">
            About Us
          </Link>
          <button className="bg-[#ED264F] hover:bg-[#ED264F]/90 text-white font-bold px-6 py-2.5 cursor-pointer rounded-full transition-all transform hover:scale-105 shadow-md hover:shadow-lg">
            Login
          </button>
        </nav>
      </div>
    </header>
  )
}

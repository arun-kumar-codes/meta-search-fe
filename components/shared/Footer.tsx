"use client"

import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  const handlePlaceholderClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    // Placeholder - no action for now
  }

  return (
    <footer className="w-full bg-primary border-t border-primary/30 text-white">
      <div className="w-full px-6 md:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-flex items-center justify-center rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-white/50">
              <Image
                src="/logos/caratlas-full.png"
                alt="CarAtlas"
                width={140}
                height={40}
                className="h-8 w-auto"
              />
            </span>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#about" className="text-white/90 hover:text-white text-sm transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="text-white/90 hover:text-white text-sm transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="text-white/90 hover:text-white text-sm transition-colors">
                    Search Cars
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="#" 
                    onClick={handlePlaceholderClick}
                    className="text-white/90 hover:text-white text-sm transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    onClick={handlePlaceholderClick}
                    className="text-white/90 hover:text-white text-sm transition-colors cursor-pointer"
                  >
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>

            {/* Browse */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Browse</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/search" className="text-white/90 hover:text-white text-sm transition-colors">
                    All Cars
                  </Link>
                </li>
                <li>
                  <span className="text-white/70 text-sm">Popular Cars</span>
                </li>
                <li>
                  <span className="text-white/70 text-sm">Browse by Type</span>
                </li>
              </ul>
            </div>

            {/* Information */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Information</h3>
              <ul className="space-y-3">
                <li>
                  <span className="text-white/70 text-sm">How It Works</span>
                </li>
                <li>
                  <span className="text-white/70 text-sm">Compare Prices</span>
                </li>
                <li>
                  <span className="text-white/70 text-sm">Verified Dealers</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/20 text-center">
            <p className="text-white/80 text-sm">
              © 2026 CarAtlas. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

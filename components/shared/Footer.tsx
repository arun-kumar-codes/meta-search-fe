"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  const handlePlaceholderClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
  }

  return (
    <footer className="w-full text-gray-300 py-12" style={{ backgroundColor: "var(--atlas-navy)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image src="/logos/caratlas-full.png" alt="CarAtlas" width={140} height={40} className="h-8 w-auto brightness-0 invert" />
            </div>
            <p className="text-sm mb-4">
              <span className="hidden sm:inline">Meet Atlas — India&apos;s first AI-powered used car shopping assistant. Search all used cars from 1000+ dealers in one place.</span>
              <span className="sm:hidden">AI-powered used car search. 1000+ dealers, one place.</span>
            </p>
            <div className="flex gap-3">
              <a href="#" onClick={handlePlaceholderClick} className="size-8 rounded-full flex items-center justify-center transition-colors bg-[var(--atlas-cyan)]/20 hover:bg-[var(--atlas-cyan)]" aria-label="Facebook">
                <Facebook className="size-4" />
              </a>
              <a href="#" onClick={handlePlaceholderClick} className="size-8 rounded-full flex items-center justify-center transition-colors bg-[var(--atlas-cyan)]/20 hover:bg-[var(--atlas-cyan)]" aria-label="Twitter">
                <Twitter className="size-4" />
              </a>
              <a href="#" onClick={handlePlaceholderClick} className="size-8 rounded-full flex items-center justify-center transition-colors bg-[var(--atlas-cyan)]/20 hover:bg-[var(--atlas-cyan)]" aria-label="Instagram">
                <Instagram className="size-4" />
              </a>
              <a href="#" onClick={handlePlaceholderClick} className="size-8 rounded-full flex items-center justify-center transition-colors bg-[var(--atlas-cyan)]/20 hover:bg-[var(--atlas-cyan)]" aria-label="LinkedIn">
                <Linkedin className="size-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/search" className="hover:text-[var(--atlas-cyan)] transition-colors">Buy Used Cars</Link></li>
              <li><Link href="/search" className="hover:text-[var(--atlas-cyan)] transition-colors">Compare Used Cars</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-[var(--atlas-cyan)] transition-colors">How It Works</Link></li>
              <li><a href="#" onClick={handlePlaceholderClick} className="hover:text-[var(--atlas-cyan)] transition-colors cursor-pointer">Dealer Login</a></li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h3 className="font-semibold text-white mb-4">Popular Cities</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/search?city=Mumbai" className="hover:text-[var(--atlas-cyan)] transition-colors">Mumbai</Link></li>
              <li><Link href="/search?city=Delhi" className="hover:text-[var(--atlas-cyan)] transition-colors">Delhi</Link></li>
              <li><Link href="/search?city=Bangalore" className="hover:text-[var(--atlas-cyan)] transition-colors">Bangalore</Link></li>
              <li><Link href="/search?city=Pune" className="hover:text-[var(--atlas-cyan)] transition-colors">Pune</Link></li>
              <li><Link href="/search?city=Hyderabad" className="hover:text-[var(--atlas-cyan)] transition-colors">Hyderabad</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" onClick={handlePlaceholderClick} className="hover:text-[var(--atlas-cyan)] transition-colors cursor-pointer">Help Center</a></li>
              <li><a href="#" onClick={handlePlaceholderClick} className="hover:text-[var(--atlas-cyan)] transition-colors cursor-pointer">Contact Us</a></li>
              <li><a href="#" onClick={handlePlaceholderClick} className="hover:text-[var(--atlas-cyan)] transition-colors cursor-pointer">Privacy Policy</a></li>
              <li><a href="#" onClick={handlePlaceholderClick} className="hover:text-[var(--atlas-cyan)] transition-colors cursor-pointer">Terms of Service</a></li>
              <li><a href="#" onClick={handlePlaceholderClick} className="hover:text-[var(--atlas-cyan)] transition-colors cursor-pointer">Careers</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © 2026 CarAtlas. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" onClick={handlePlaceholderClick} className="hover:text-[var(--atlas-cyan)] transition-colors cursor-pointer">Privacy</a>
            <a href="#" onClick={handlePlaceholderClick} className="hover:text-[var(--atlas-cyan)] transition-colors cursor-pointer">Terms</a>
            <a href="#" onClick={handlePlaceholderClick} className="hover:text-[var(--atlas-cyan)] transition-colors cursor-pointer">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

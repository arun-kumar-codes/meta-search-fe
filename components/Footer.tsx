"use client"

import { Facebook, Twitter, Instagram, Youtube, Linkedin, Apple, Play, Link } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative pt-4 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Logo and Tagline */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-orange-500">CAR</span>
            </div>
            <div className="bg-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
              METASEARCH
            </div>
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <p className="text-gray-600 text-sm">Better searches, better deals</p>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* COMPANY Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Investors
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* DISCOVER Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Discover</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Search Used Cars
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Compare Prices
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Verified Dealers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Car Reviews
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Popular Brands
                </a>
              </li>
            </ul>
          </div>

          {/* HELP & SUPPORT Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Help & Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Become a Partner
                </a>
              </li>
            </ul>
          </div>

          {/* SOCIAL LINKS & APP DOWNLOADS */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Social Links</h3>
            
            {/* Social Media Icons */}
            <div className="flex gap-3 mb-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} className="text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} className="text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} className="text-white" />
              </a>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={18} className="text-white" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} className="text-white" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm">
            2026 Car Metasearch, All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

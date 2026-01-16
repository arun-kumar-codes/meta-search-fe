"use client"

import { ChevronDown } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#05203C] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Top Selector */}
        <div className="mb-12">
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            India · English (UK) · ₹ INR
          </button>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {/* Column 1 */}
          <div className="space-y-4">
            <a href="#" className="block hover:text-blue-300 transition-colors">
              Help
            </a>
            <a href="#" className="block hover:text-blue-300 transition-colors">
              Privacy Settings
            </a>
            <a href="#" className="block hover:text-blue-300 transition-colors">
              Log in
            </a>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <a href="#" className="block hover:text-blue-300 transition-colors">
              Cookie policy
            </a>
            <a href="#" className="block hover:text-blue-300 transition-colors">
              Privacy policy
            </a>
            <a href="#" className="block hover:text-blue-300 transition-colors">
              Terms of service
            </a>
            <a href="#" className="block hover:text-blue-300 transition-colors">
              Company Details
            </a>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <a href="#" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
              Explore
              <ChevronDown size={16} />
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
              Company
              <ChevronDown size={16} />
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
              Partners
              <ChevronDown size={16} />
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
              Trips
              <ChevronDown size={16} />
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
              International Sites
              <ChevronDown size={16} />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-800 pt-8 text-center space-y-2">
          <p className="text-white">Cheap used car marketplace from anywhere, to everywhere</p>
          <p className="text-white text-sm">© Cars4Less Ltd 2026 – 2026</p>
        </div>
      </div>
    </footer>
  )
}

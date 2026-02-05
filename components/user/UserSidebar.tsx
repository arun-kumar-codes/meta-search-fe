"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Heart, Search, Settings } from "lucide-react"

export default function UserSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/favorites", label: "Favorites", icon: Heart },
    { href: "/saved-searches", label: "Saved Searches", icon: Search },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900">User Dashboard</h2>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

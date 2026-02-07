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
    <aside className="w-full md:w-64 bg-card border-r border-border min-h-0 md:min-h-[calc(100vh-4rem)] p-4 shrink-0">
      <div className="mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-bold text-foreground">User Dashboard</h2>
      </div>
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground hover:bg-muted"
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

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Heart, History } from "lucide-react"

type NavItem = {
  href: string
  label: string
  Icon: React.ComponentType<{ size?: number; className?: string }>
}

export default function MobileBottomNav() {
  const pathname = usePathname()

  const items: NavItem[] = [
    { href: "/dashboard", label: "Home", Icon: Home },
    { href: "/search", label: "Search", Icon: Search },
    { href: "/wishlist", label: "Wishlist", Icon: Heart },
    { href: "/history", label: "History", Icon: History },
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[90] md:hidden bg-card/95 backdrop-blur border-t border-border"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0px)" }}
      aria-label="Bottom navigation"
    >
      <div className="mx-auto max-w-7xl px-2">
        <div className="grid grid-cols-4 gap-1 py-2">
          {items.map(({ href, label, Icon }) => {
            const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs font-medium transition-colors",
                  isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={20} className="shrink-0" />
                <span className="leading-none">{label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}


"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, User, History, Heart, LogOut } from "lucide-react"
import { useUser } from "@/contexts/UserContext"
import UserLoginModal from "@/components/user/UserLoginModal"

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const isSearchPage = pathname?.startsWith("/search")
  const { user, logout } = useUser()

  return (
    <header className="sticky top-0 z-[100] w-full bg-primary border-b border-primary/30 shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center justify-between">
        <Link href="/" className="flex min-w-0 shrink items-center" onClick={() => setMobileOpen(false)}>
          <span className="flex items-center justify-center rounded-full bg-white px-2.5 py-1.5 shadow-sm ring-1 ring-white/50 sm:px-3 sm:py-2">
            <Image
              src="/logos/caratlas-full.png"
              alt="CarAtlas"
              width={140}
              height={40}
              className="h-6 w-auto sm:h-8"
              priority
            />
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {isSearchPage ? (
            <Link
              href="/"
              className="text-white/90 hover:text-white transition-colors font-semibold text-sm uppercase tracking-wide hover:underline underline-offset-4"
              onClick={() => setMobileOpen(false)}
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/search"
                className="text-white/90 hover:text-white transition-colors font-semibold text-sm uppercase tracking-wide hover:underline underline-offset-4"
              >
                Search Cars
              </Link>
              <Link
                href="/#faq"
                className="text-white/90 hover:text-white transition-colors font-semibold text-sm uppercase tracking-wide hover:underline underline-offset-4"
              >
                FAQ
              </Link>
              <Link
                href="/#about"
                className="text-white/90 hover:text-white transition-colors font-semibold text-sm uppercase tracking-wide hover:underline underline-offset-4"
              >
                About Us
              </Link>
            </>
          )}
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen((o) => !o)}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-4 py-2 sm:px-5 sm:py-2.5 rounded-full transition-all text-sm"
              >
                <User size={18} />
                <span className="hidden sm:inline">{user.phone}</span>
              </button>
              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} aria-hidden />
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-card border border-border shadow-lg py-2 z-50">
                    <Link
                      href="/history"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <History size={16} /> History
                    </Link>
                    <Link
                      href="/wishlist"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Heart size={16} /> Wishlist
                    </Link>
                    <button
                      type="button"
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setLoginModalOpen(true)}
              className="bg-white text-primary font-bold px-4 py-2 sm:px-6 sm:py-2.5 rounded-full transition-all hover:opacity-90 shadow-md text-sm sm:text-base"
            >
              Login
            </button>
          )}
        </nav>

        <button
          type="button"
          className="md:hidden p-2 rounded-lg text-white hover:bg-white/20 transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-primary/30 bg-primary/95 backdrop-blur px-4 py-4">
          <nav className="flex flex-col gap-2">
            {isSearchPage ? (
              <Link
                href="/"
                className="px-4 py-3 rounded-lg text-white font-semibold hover:bg-white/20 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/search"
                  className="px-4 py-3 rounded-lg text-white font-semibold hover:bg-white/20 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Search Cars
                </Link>
                <Link
                  href="/#faq"
                  className="px-4 py-3 rounded-lg text-white font-semibold hover:bg-white/20 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  FAQ
                </Link>
                <Link
                  href="/#about"
                  className="px-4 py-3 rounded-lg text-white font-semibold hover:bg-white/20 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  About Us
                </Link>
              </>
            )}
            {user ? (
              <>
                <Link
                  href="/history"
                  className="px-4 py-3 rounded-lg text-white font-semibold hover:bg-white/20"
                  onClick={() => setMobileOpen(false)}
                >
                  History
                </Link>
                <Link
                  href="/wishlist"
                  className="px-4 py-3 rounded-lg text-white font-semibold hover:bg-white/20"
                  onClick={() => setMobileOpen(false)}
                >
                  Wishlist
                </Link>
                <button
                  type="button"
                  onClick={() => { logout(); setMobileOpen(false); }}
                  className="px-4 py-3 rounded-lg text-white font-semibold hover:bg-white/20 text-left w-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => { setLoginModalOpen(true); setMobileOpen(false); }}
                className="mt-2 mx-4 py-3 rounded-lg bg-white text-primary font-bold text-center hover:opacity-90 transition-opacity w-[calc(100%-2rem)]"
              >
                Login
              </button>
            )}
          </nav>
        </div>
      )}

      <UserLoginModal open={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </header>
  )
}

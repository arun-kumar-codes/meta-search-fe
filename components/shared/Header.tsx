"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, User, History, Heart, LogOut } from "lucide-react"
import { useUser } from "@/contexts/UserContext"
import { useChat } from "@/contexts/ChatContext"
import UserLoginModal from "@/components/user/UserLoginModal"

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const isSearchPage = pathname?.startsWith("/search")
  const { user, logout } = useUser()
  const { openChat } = useChat()

  const navLinkClass = "text-sm text-gray-700 hover:text-[var(--atlas-cyan)] transition-colors font-medium"

  return (
    <header className="sticky top-0 z-[100] w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-2 sm:py-3 flex items-center justify-between">
        <Link href="/" className="flex min-w-0 shrink items-center gap-3" onClick={() => setMobileOpen(false)}>
          <Image
            src="/logos/caratlas-full.png"
            alt="CarAtlas"
            width={140}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {isSearchPage ? (
            <Link href="/" className={navLinkClass} onClick={() => setMobileOpen(false)}>
              Dashboard
            </Link>
          ) : (
            <>
              {pathname === "/" ? (
                <Link href="/#chat" className={navLinkClass}>
                  <span className="hidden sm:inline">Chat with Atlas</span>
                  <span className="sm:hidden">Chat</span>
                </Link>
              ) : (
                <button type="button" onClick={openChat} className={navLinkClass + " text-left"}>
                  <span className="hidden sm:inline">Chat with Atlas</span>
                  <span className="sm:hidden">Chat</span>
                </button>
              )}
              <Link href="/search" className={navLinkClass}>
                <span className="hidden sm:inline">Buy Used Cars</span>
                <span className="sm:hidden">Cars</span>
              </Link>
              <Link href="/#how-it-works" className={navLinkClass}>
                How it works
              </Link>
            </>
          )}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/wishlist"
              className="p-2 rounded-lg text-gray-700 hover:text-[var(--atlas-cyan)] transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="size-5" />
            </Link>
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((o) => !o)}
                  className="flex items-center gap-2 border-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors border-[var(--atlas-cyan)] text-[var(--atlas-navy)] hover:bg-[var(--atlas-cyan)] hover:text-white"
                >
                  <User className="size-4" />
                  Account
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
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted text-left"
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
                className="flex items-center gap-2 border-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors border-[var(--atlas-cyan)] text-[var(--atlas-navy)] hover:bg-[var(--atlas-cyan)] hover:text-white"
              >
                <User className="size-4" />
                Sign In
              </button>
            )}
          </div>
        </nav>

        <button
          type="button"
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[110]">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Side drawer */}
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="absolute left-0 top-0 h-full w-[86%] max-w-[320px] bg-white border-r border-gray-200 shadow-lg overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">Menu</span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <nav className="flex flex-col gap-1 p-2">
              {isSearchPage ? (
                <Link
                  href="/"
                  className="px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100"
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  {pathname === "/" ? (
                    <Link
                      href="/#chat"
                      className="px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100"
                      onClick={() => setMobileOpen(false)}
                    >
                      Chat
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        openChat()
                        setMobileOpen(false)
                      }}
                      className="px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100 text-left w-full"
                    >
                      Chat
                    </button>
                  )}
                  <Link
                    href="/search"
                    className="px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100"
                    onClick={() => setMobileOpen(false)}
                  >
                    Cars
                  </Link>
                  <Link
                    href="/#how-it-works"
                    className="px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100"
                    onClick={() => setMobileOpen(false)}
                  >
                    How it works
                  </Link>
                </>
              )}

              <Link
                href="/wishlist"
                className="px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100 flex items-center gap-2"
                onClick={() => setMobileOpen(false)}
              >
                <Heart size={18} /> Wishlist
              </Link>

              {user ? (
                <>
                  <Link
                    href="/history"
                    className="px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100"
                    onClick={() => setMobileOpen(false)}
                  >
                    History
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout()
                      setMobileOpen(false)
                    }}
                    className="px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100 text-left w-full"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setLoginModalOpen(true)
                    setMobileOpen(false)
                  }}
                  className="mt-2 mx-2 py-3 rounded-lg border-2 border-[var(--atlas-cyan)] text-[var(--atlas-navy)] font-bold text-center hover:bg-[var(--atlas-cyan)] hover:text-white transition-colors w-full"
                >
                  Sign In
                </button>
              )}
            </nav>
          </aside>
        </div>
      )}

      <UserLoginModal open={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </header>
  )
}

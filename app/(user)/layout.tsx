import { ReactNode } from "react"
import UserSidebar from "@/components/user/UserSidebar"
import Header from "@/components/shared/Header"
import MobileBottomNav from "@/components/user/MobileBottomNav"

export default function UserLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
        <div className="hidden md:block">
          <UserSidebar />
        </div>
        <main className="flex-1 p-3 sm:p-6 overflow-auto pb-20 md:pb-6">
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  )
}

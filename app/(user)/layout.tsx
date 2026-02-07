import { ReactNode } from "react"
import UserSidebar from "@/components/user/UserSidebar"
import Header from "@/components/shared/Header"

export default function UserLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
        <UserSidebar />
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

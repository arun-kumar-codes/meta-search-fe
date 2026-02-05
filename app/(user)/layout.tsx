import { ReactNode } from "react"
import UserSidebar from "@/components/user/UserSidebar"
import Header from "@/components/shared/Header"

export default function UserLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <UserSidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

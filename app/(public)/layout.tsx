import Header from "@/components/shared/Header"
import Footer from "@/components/shared/Footer"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-[100dvh] flex flex-col w-full">
      <Header />
      <main className="flex-1 min-h-0 w-full">{children}</main>
      <Footer />
    </div>
  )
}

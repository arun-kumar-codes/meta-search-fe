"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useUser } from "@/contexts/UserContext"
import { usersAPI } from "@/lib/api"
import CarCardHorizontal from "@/components/search/CarCardHorizontal"
import { History as HistoryIcon, Loader2 } from "lucide-react"

export default function HistoryPage() {
  const { user } = useUser()
  const [items, setItems] = useState<{ listingId: string; viewedAt: string; listing: any }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }
    usersAPI
      .getHistory()
      .then((data) => setItems(data.items))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [user])

  if (!user) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12">
          <p className="text-muted-foreground text-center">
            Please log in to see your viewing history.
          </p>
          <Link href="/search" className="mt-4 block text-center text-primary font-medium hover:underline">
            Browse cars
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8">
        <h1 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
          <HistoryIcon size={28} className="text-primary" />
          Recently viewed
        </h1>
        <p className="text-muted-foreground mb-6">
          Cars you have opened recently.
        </p>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <HistoryIcon size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No cars viewed yet.</p>
            <Link
              href="/search"
              className="inline-block px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90"
            >
              Browse cars
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {items.filter((i) => i.listing).map((item) => (
              <CarCardHorizontal key={item.listingId} car={item.listing} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

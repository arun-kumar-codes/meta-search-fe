"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useLocation } from "@/contexts/LocationContext"

export default function ByBudget() {
  const router = useRouter()
  const { location } = useLocation()

  const [minPrice, setMinPrice] = useState<string>("")
  const [maxPrice, setMaxPrice] = useState<string>("")

  const canSubmit = useMemo(() => {
    const min = minPrice.trim()
    const max = maxPrice.trim()
    if (!min && !max) return false
    const minN = min ? Number(min) : undefined
    const maxN = max ? Number(max) : undefined
    if (min && (!Number.isFinite(minN) || minN! < 0)) return false
    if (max && (!Number.isFinite(maxN) || maxN! < 0)) return false
    if (minN !== undefined && maxN !== undefined && minN > maxN) return false
    return true
  }, [minPrice, maxPrice])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    const params = new URLSearchParams()
    // LocationContext + URL `?city=` is the canonical source for search.
    if (location?.city) params.set("city", location.city)
    if (minPrice.trim()) params.set("minPrice", minPrice.trim())
    if (maxPrice.trim()) params.set("maxPrice", maxPrice.trim())
    params.set("page", "1")
    params.set("limit", "50")

    router.push(`/search?${params.toString()}`)
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--atlas-navy)] mb-3">
            Buy Used Cars by Budget
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Enter your budget range. We’ll show the best matching cars in your selected city.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto p-6 md:p-8 shadow-lg rounded-xl border-2 border-[var(--atlas-cyan)]/30 bg-card"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Min Budget (INR)
              </label>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                value={minPrice}
                placeholder="e.g. 300000"
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--atlas-cyan)] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Max Budget (INR)
              </label>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                value={maxPrice}
                placeholder="e.g. 800000"
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--atlas-cyan)] focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3">
            <button
              type="submit"
              disabled={!canSubmit}
              className="px-8 py-4 rounded-lg text-lg font-semibold text-white transition-colors shrink-0"
              style={{
                backgroundColor: "var(--atlas-cyan)",
                opacity: canSubmit ? 1 : 0.6,
                cursor: canSubmit ? "pointer" : "not-allowed",
              }}
            >
              Show Cars in My Budget
            </button>

            <p className="text-xs sm:text-sm text-muted-foreground">
              City: <span className="font-semibold text-foreground">{location?.city || "Select a city"}</span>
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}


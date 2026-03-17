"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "motion/react"

const quickFilters = [
  "Maruti Swift",
  "Hyundai Creta",
  "Honda City",
  "Tata Nexon",
  "Under ₹5L",
  "Automatic",
]

export default function TraditionalSearch() {
  const router = useRouter()
  const [query, setQuery] = useState("")

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (query.trim()) params.set("brand", query.trim().split(" ")[0])
    if (query.trim()) params.set("model", query.trim().split(" ").slice(1).join(" ") || query.trim())
    router.push(`/search?${params.toString()}`)
  }

  const handleQuickFilter = (filter: string) => {
    if (filter === "Under ₹5L") {
      router.push("/search?maxPrice=500000")
      return
    }
    if (filter === "Automatic") {
      router.push("/search?transmission=Automatic")
      return
    }
    const [brand, ...modelParts] = filter.split(" ")
    const params = new URLSearchParams()
    params.set("brand", brand)
    if (modelParts.length) params.set("model", modelParts.join(" "))
    router.push(`/search?${params.toString()}`)
  }

  return (
    <motion.section
      className="py-12 bg-gray-50"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-8">
          <span className="inline-block mb-3 px-4 py-1.5 text-sm font-medium rounded-full border border-[var(--atlas-cyan)] text-[var(--atlas-navy)]">
            Prefer Manual Search?
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[var(--atlas-navy)] mb-3">
            Or Search Used Cars Manually
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Use traditional filters to search all used car dealers. Chat with Atlas to search everything in one conversation!
          </p>
        </div>

        <div className="max-w-7xl mx-auto p-6 shadow-lg rounded-xl border-2 border-[var(--atlas-cyan)]/30 bg-card">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search used cars by brand, model, or keyword..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:border-[var(--atlas-cyan)] focus:outline-none text-lg"
              />
            </div>
            <button
              type="button"
              onClick={handleSearch}
              className="px-8 py-4 rounded-lg text-lg h-auto font-semibold text-white transition-colors shrink-0"
              style={{ backgroundColor: "var(--atlas-cyan)" }}
            >
              Search All Dealers
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors border-[var(--atlas-cyan)] text-[var(--atlas-navy)] hover:bg-[var(--atlas-cyan)] hover:text-white"
            >
              <Filter className="size-4" />
              All Filters
            </Link>
            <div className="flex flex-wrap gap-2">
              {quickFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => handleQuickFilter(filter)}
                  className="px-3 py-1.5 rounded-full text-sm bg-secondary text-secondary-foreground hover:bg-[var(--atlas-cyan)]/10 transition-colors"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 font-medium text-[var(--atlas-cyan)] hover:underline"
          >
            View Advanced Search Options
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </motion.section>
  )
}

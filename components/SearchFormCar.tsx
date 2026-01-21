"use client"

import { useState } from "react"
import { Search, Loader2 } from "lucide-react"
import { SearchParams } from "@/lib/api"
import { useRouter } from "next/navigation"

interface SearchFormCarProps {
  initialValues?: SearchParams
  variant?: "hero" | "page"
}

export default function SearchFormCar({ initialValues, variant = "hero" }: SearchFormCarProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<SearchParams>({
    brand: initialValues?.brand || "",
    model: initialValues?.model || "",
    year: initialValues?.year || "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (field: keyof SearchParams, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    setError(null)
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate that brand is filled (model and year are optional)
    if (!formData.brand) {
      setError("Please enter a brand name")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Build query string
      const params = new URLSearchParams()
      if (formData.brand) params.set("brand", formData.brand)
      if (formData.model) params.set("model", formData.model)
      if (formData.year) params.set("year", formData.year)
      // Reset to first page when new search is performed
      params.set("page", "1")
      params.set("limit", "10")

      // Navigate to search page with query params
      router.push(`/search?${params.toString()}`)
      
      // Reset loading state after navigation (with a small delay to ensure navigation starts)
      setTimeout(() => {
        setLoading(false)
      }, 100)
    } catch (err) {
      setLoading(false)
      setError("Failed to navigate. Please try again.")
    }
  }

  const isHero = variant === "hero"
  const inputClass = isHero 
    ? "w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-white bg-white/10 backdrop-blur-sm placeholder:text-white/70"
    : "w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#ED264F] text-gray-900 bg-white"
  const labelClass = isHero
    ? "block text-sm font-medium text-white mb-2"
    : "block text-sm font-medium text-gray-700 mb-2"

  return (
    <form onSubmit={handleSearch}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className={labelClass}>Brand</label>
          <input
            type="text"
            placeholder="Select brand"
            value={formData.brand || ""}
            onChange={(e) => handleInputChange("brand", e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex-1">
          <label className={labelClass}>Model</label>
          <input
            type="text"
            placeholder="Select model"
            value={formData.model || ""}
            onChange={(e) => handleInputChange("model", e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex-1">
          <label className={labelClass}>Year</label>
          <input
            type="text"
            placeholder="Select year"
            value={formData.year || ""}
            onChange={(e) => handleInputChange("year", e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            className={`${
              isHero 
                ? "bg-[#ED264F] text-white hover:bg-[#ED264F]/90" 
                : "bg-[#ED264F] text-white hover:bg-[#ED264F]/90"
            } text-md disabled:bg-gray-400 disabled:cursor-not-allowed px-8 py-4 rounded-lg font-[500] cursor-pointer transition-colors whitespace-nowrap w-full md:w-auto flex items-center justify-center gap-2`}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search size={20} className="inline-block md:hidden" />
                <span className="hidden md:inline">Search</span>
                <span className="md:hidden">Search</span>
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className={`mt-4 p-3 border border-red-400 text-red-700 rounded-lg ${
          isHero ? "bg-red-100/90 backdrop-blur-sm" : "bg-red-100"
        }`}>
          {error}
        </div>
      )}
    </form>
  )
}

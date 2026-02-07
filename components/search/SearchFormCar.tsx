"use client"

import { useEffect, useMemo, useState } from "react"
import { ArrowUpDown, Loader2 } from "lucide-react"
import { searchAPI, SearchParams } from "@/lib/api"
import { useRouter } from "next/navigation"
import { useLocation } from "@/contexts/LocationContext"
import FiltersSidebar from "@/components/search/FiltersSidebar"

interface SearchFormCarProps {
  initialValues?: SearchParams
  variant?: "hero" | "page"
}

export default function SearchFormCar({ initialValues, variant = "hero" }: SearchFormCarProps) {
  const router = useRouter()
  const { location } = useLocation()
  const defaultFormData: SearchParams = useMemo(() => ({
    brand: "",
    model: "",
    year: "",
    minYear: "",
    maxYear: "",
    minPrice: "",
    maxPrice: "",
    minMileage: "",
    maxMileage: "",
    city: location?.city || "",
    state: location?.state || "",
    fuelType: "",
    transmission: "",
    bodyType: "",
    sortBy: undefined,
    page: "1",
    limit: "50",
  }), [location])

  const sortLabel = (sortBy?: SearchParams["sortBy"]) => {
    switch (sortBy) {
      case "price_asc": return "Price ↑"
      case "price_desc": return "Price ↓"
      case "year_desc": return "Year ↓"
      case "year_asc": return "Year ↑"
      case "mileage_asc": return "KM Driven ↑"
      case "mileage_desc": return "KM Driven ↓"
      default: return "Relevance"
    }
  }

  const buildQueryString = (data: SearchParams) => {
    const params = new URLSearchParams()
    const set = (k: keyof SearchParams, v?: string) => {
      if (v !== undefined && v !== null && v !== "") params.set(String(k), v)
    }
    set("brand", data.brand)
    set("model", data.model)
    set("year", data.year)
    set("minYear", data.minYear)
    set("maxYear", data.maxYear)
    set("minPrice", data.minPrice)
    set("maxPrice", data.maxPrice)
    set("minMileage", data.minMileage)
    set("maxMileage", data.maxMileage)
    
    const city = data.city || location?.city || "Delhi"
    params.set("city", city)
    
    set("fuelType", data.fuelType)
    set("transmission", data.transmission)
    set("bodyType", data.bodyType)
    if (data.sortBy) params.set("sortBy", data.sortBy)
    params.set("page", "1")
    params.set("limit", data.limit || "50")
    return params.toString()
  }

  const countActiveFilters = (data: SearchParams) => {
    const keys: (keyof SearchParams)[] = [
      "year", "minYear", "maxYear", "minPrice", "maxPrice",
      "minMileage", "maxMileage", "city", "fuelType", "transmission", "bodyType",
    ]
    return keys.reduce((acc, k) => acc + ((data[k] ?? "") !== "" ? 1 : 0), 0)
  }

  const [applied, setApplied] = useState<SearchParams>({
    ...defaultFormData,
    ...initialValues,
    page: initialValues?.page || "1",
    limit: initialValues?.limit || "50",
  })
  const [brands, setBrands] = useState<string[]>([])
  const [models, setModels] = useState<string[]>([])

  const [heroForm, setHeroForm] = useState<SearchParams>({
    brand: initialValues?.brand || "",
    model: initialValues?.model || "",
    year: initialValues?.year || "",
    limit: "50",
  })
  const [heroLoading, setHeroLoading] = useState(false)

  useEffect(() => {
    const nextApplied: SearchParams = {
      ...defaultFormData,
      ...initialValues,
      city: initialValues?.city || location?.city || defaultFormData.city,
      state: initialValues?.state || location?.state || defaultFormData.state,
      page: initialValues?.page || "1",
      limit: initialValues?.limit || "50",
    }
    setApplied(nextApplied)
  }, [defaultFormData, initialValues, location])

  useEffect(() => {
    if (variant !== "hero") return
    setHeroForm({
      brand: initialValues?.brand || "",
      model: initialValues?.model || "",
      year: initialValues?.year || "",
      city: location?.city || "",
      state: location?.state || "",
      limit: "50",
    })
  }, [initialValues, variant, location])

  useEffect(() => {
    let cancelled = false
    const city = location?.city || applied.city
    searchAPI.getBrands(city || undefined)
      .then((b) => {
        if (cancelled) return
        setBrands(Array.isArray(b) ? b : [])
      })
      .catch(() => {
        if (cancelled) return
      })
    return () => { cancelled = true }
  }, [location?.city, applied.city])

  useEffect(() => {
    const brand = applied.brand || ""
    if (!brand) {
      setModels([])
      return
    }
    let cancelled = false
    const city = location?.city || applied.city
    searchAPI.getModels(brand, city || undefined)
      .then((m) => {
        if (cancelled) return
        setModels(Array.isArray(m) ? m : [])
      })
      .catch(() => {
        if (cancelled) return
        setModels([])
      })
    return () => { cancelled = true }
  }, [applied.brand, location?.city, applied.city])

  const clearAllApplied = () => router.push("/search")

  const isHero = variant === "hero"
  const controlClass = isHero
    ? "w-full px-4 py-4 border-2 border-white/30 rounded-lg focus:outline-none focus:border-white/60 text-white bg-white/10 backdrop-blur-sm placeholder:text-white/70"
    : "w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 text-foreground bg-card transition-all"
  const labelClass = isHero
    ? "block text-sm font-medium text-white mb-2"
    : "block text-sm font-semibold text-foreground mb-2"

  // HERO (keep simple)
  if (variant === "hero") {
    const [heroErrors, setHeroErrors] = useState<{ brand?: string; model?: string; year?: string }>({})
    
    const handleHero = (e: React.FormEvent) => {
      e.preventDefault()
      
      // Validation
      const errors: { brand?: string; model?: string; year?: string } = {}
      if (!heroForm.brand?.trim()) {
        errors.brand = "Brand is required"
      }
      if (!heroForm.model?.trim()) {
        errors.model = "Model is required"
      }
      if (!heroForm.year?.trim()) {
        errors.year = "Year is required"
      }
      
      setHeroErrors(errors)
      
      if (Object.keys(errors).length > 0) {
        return
      }
      
      setHeroLoading(true)
      const qs = buildQueryString({ ...defaultFormData, ...heroForm, limit: "50" })
      router.push(`/search?${qs}`)
      setTimeout(() => setHeroLoading(false), 100)
    }
    return (
      <form onSubmit={handleHero}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className={labelClass}>Brand <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={heroForm.brand || ""}
              onChange={(e) => {
                setHeroForm((p) => ({ ...p, brand: e.target.value }))
                if (heroErrors.brand) setHeroErrors((p) => ({ ...p, brand: undefined }))
              }}
              placeholder="e.g. Honda"
              className={`${controlClass} ${heroErrors.brand ? "border-red-500" : ""}`}
              required
            />
            {heroErrors.brand && (
              <p className="text-red-500 text-xs mt-1">{heroErrors.brand}</p>
            )}
          </div>
          <div className="flex-1">
            <label className={labelClass}>Model <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={heroForm.model || ""}
              onChange={(e) => {
                setHeroForm((p) => ({ ...p, model: e.target.value }))
                if (heroErrors.model) setHeroErrors((p) => ({ ...p, model: undefined }))
              }}
              placeholder="e.g. Civic"
              className={`${controlClass} ${heroErrors.model ? "border-red-500" : ""}`}
              required
            />
            {heroErrors.model && (
              <p className="text-red-500 text-xs mt-1">{heroErrors.model}</p>
            )}
          </div>
          <div className="flex-1">
            <label className={labelClass}>Year <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={heroForm.year || ""}
              onChange={(e) => {
                setHeroForm((p) => ({ ...p, year: e.target.value }))
                if (heroErrors.year) setHeroErrors((p) => ({ ...p, year: undefined }))
              }}
              placeholder="e.g. 2020"
              className={`${controlClass} ${heroErrors.year ? "border-red-500" : ""}`}
              required
            />
            {heroErrors.year && (
              <p className="text-red-500 text-xs mt-1">{heroErrors.year}</p>
            )}
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={heroLoading}
              className="bg-primary text-primary-foreground hover:opacity-90 text-md disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold transition-all w-full md:w-auto flex items-center justify-center gap-2"
            >
              {heroLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <span>Search</span>
              )}
            </button>
          </div>
        </div>
      </form>
    )
  }

  const activeCount = countActiveFilters(applied)
  const chipSource: Array<[string, string | undefined]> = [
    ["brand", applied.brand],
    ["model", applied.model],
    ["year", applied.year],
    ["price", applied.minPrice || applied.maxPrice ? `${applied.minPrice || "0"} - ${applied.maxPrice || "∞"}` : ""],
    ["year range", applied.minYear || applied.maxYear ? `${applied.minYear || "Any"} - ${applied.maxYear || "Any"}` : ""],
    ["KM Driven", applied.minMileage || applied.maxMileage ? `${applied.minMileage || "0"} - ${applied.maxMileage || "∞"}` : ""],
    ["location", applied.city || ""],
    ["fuel", applied.fuelType],
    ["transmission", applied.transmission],
    ["body", applied.bodyType],
  ]
  const chips: { k: string; v: string }[] = chipSource
    .filter(([, v]) => !!v)
    .map(([k, v]) => ({ k, v: String(v) }))
    .slice(0, 8)

  return (
    <div className="w-full">
      <div className="flex flex-col gap-3">
        {/* Brand and Model Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Brand</label>
            <input
              list="brand-options-main"
              className={controlClass}
              placeholder="e.g. Honda"
              value={applied.brand || ""}
              onChange={(e) => {
                const nextBrand = e.target.value
                const nextApplied = { ...applied, brand: nextBrand, model: nextBrand ? applied.model : "", page: "1" }
                setApplied(nextApplied)
                const qs = buildQueryString(nextApplied)
                router.push(`/search?${qs}`)
              }}
            />
            <datalist id="brand-options-main">
              {brands.map((b) => (
                <option key={b} value={b} />
              ))}
            </datalist>
          </div>
          <div>
            <label className={labelClass}>Model</label>
            <input
              list="model-options-main"
              className={controlClass}
              placeholder={applied.brand ? "e.g. Civic" : "Select brand first"}
              value={applied.model || ""}
              onChange={(e) => {
                const nextApplied = { ...applied, model: e.target.value, page: "1" }
                setApplied(nextApplied)
                const qs = buildQueryString(nextApplied)
                router.push(`/search?${qs}`)
              }}
              disabled={!applied.brand}
            />
            <datalist id="model-options-main">
              {models.map((m) => (
                <option key={m} value={m} />
              ))}
            </datalist>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:justify-between">
          <FiltersSidebar
            applied={applied}
            defaultValues={defaultFormData}
            controlClass={controlClass}
            labelClass={labelClass}
            activeCount={activeCount}
            onApply={(next) => {
              const qs = buildQueryString(next)
              router.push(qs ? `/search?${qs}` : "/search")
              setApplied(next)
            }}
          />
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold text-foreground hidden sm:block">Sort:</label>
            <select
              className="w-full sm:w-auto px-4 py-3 rounded-xl border border-border focus:outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 text-foreground bg-card transition-all font-semibold"
              value={applied.sortBy || ""}
              onChange={(e) => {
                const next = (e.target.value || undefined) as SearchParams["sortBy"] | undefined
                const nextApplied = { ...applied, sortBy: next, page: "1" }
                setApplied(nextApplied)
                const qs = buildQueryString(nextApplied)
                router.push(`/search?${qs}`)
              }}
            >
              <option value="">Relevance</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="year_desc">Year: Newest</option>
              <option value="year_asc">Year: Oldest</option>
              <option value="mileage_asc">Mileage: Low to High</option>
              <option value="mileage_desc">Mileage: High to Low</option>
            </select>
          </div>
        </div>

        {(chips.length > 0 || applied.sortBy) && (
          <div className="flex flex-wrap items-center gap-2">
            {chips.map((c) => (
              <span
                key={`${c.k}-${c.v}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-semibold text-foreground"
              >
                <span className="text-muted-foreground">{c.k}:</span>
                <span>{c.v}</span>
              </span>
            ))}
            {applied.sortBy && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-semibold text-foreground">
                <span className="text-muted-foreground">sort:</span>
                <span>{sortLabel(applied.sortBy)}</span>
              </span>
            )}
            <button
              type="button"
              onClick={clearAllApplied}
              className="ml-auto text-xs font-bold text-primary hover:underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>


    </div>
  )
}

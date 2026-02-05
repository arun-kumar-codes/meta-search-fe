"use client"

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react"
import { SlidersHorizontal, X, Loader2, Check } from "lucide-react"
import { searchAPI, type SearchParams } from "@/lib/api"

type SectionId = "basic" | "price" | "yearRange" | "mileage" | "location" | "specs"

const sections: { id: SectionId; label: string }[] = [
  { id: "basic", label: "Brand & Model" },
  { id: "price", label: "Price" },
  { id: "yearRange", label: "Year" },
  { id: "mileage", label: "Mileage" },
  { id: "location", label: "Location" },
  { id: "specs", label: "Specs" },
]

interface FiltersSidebarProps {
  applied: SearchParams
  defaultValues: SearchParams
  controlClass: string
  labelClass: string
  activeCount: number
  onApply: (next: SearchParams) => void
}

export default function FiltersSidebar({
  applied,
  defaultValues,
  controlClass,
  labelClass,
  activeCount,
  onApply,
}: FiltersSidebarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<SectionId>("basic")
  const [draft, setDraft] = useState<SearchParams>(applied)
  const [activeField, setActiveField] = useState<string | null>(null)

  const [bodyTypes, setBodyTypes] = useState<string[]>([])
  const [metaLoading, setMetaLoading] = useState(false)
  const [metaError, setMetaError] = useState<string | null>(null)

  const yearRef = useRef<HTMLInputElement | null>(null)
  const minPriceRef = useRef<HTMLInputElement | null>(null)
  const maxPriceRef = useRef<HTMLInputElement | null>(null)
  const minYearRef = useRef<HTMLInputElement | null>(null)
  const maxYearRef = useRef<HTMLInputElement | null>(null)
  const minMileageRef = useRef<HTMLInputElement | null>(null)
  const maxMileageRef = useRef<HTMLInputElement | null>(null)
  const cityRef = useRef<HTMLInputElement | null>(null)
  const fuelTypeRef = useRef<HTMLSelectElement | null>(null)
  const transmissionRef = useRef<HTMLSelectElement | null>(null)
  const bodyTypeRef = useRef<HTMLInputElement | null>(null)

  const refForField = (field: string) => {
    switch (field) {
      case "year": return yearRef
      case "minPrice": return minPriceRef
      case "maxPrice": return maxPriceRef
      case "minYear": return minYearRef
      case "maxYear": return maxYearRef
      case "minMileage": return minMileageRef
      case "maxMileage": return maxMileageRef
      case "city": return cityRef
      case "fuelType": return fuelTypeRef
      case "transmission": return transmissionRef
      case "bodyType": return bodyTypeRef
      default: return null
    }
  }
  useLayoutEffect(() => {
    if (!drawerOpen) return
    if (!activeField) return
    const r = refForField(activeField)
    const el = r?.current
    if (!el) return
    if (document.activeElement === el) return
    queueMicrotask(() => {
      try {
        ;(el as any).focus?.({ preventScroll: true })
      } catch {
        el.focus()
      }
    })
  }, [drawerOpen, activeField, draft, metaLoading, metaError, activeSection])

  useEffect(() => {
    if (drawerOpen) return
    setDraft(applied)
  }, [applied, drawerOpen])
  useEffect(() => {
    if (!drawerOpen) return

    let cancelled = false
    setMetaLoading(true)
    setMetaError(null)
    searchAPI
      .getBodyTypes(applied.city || undefined)
      .then((bt) => {
        if (cancelled) return
        setBodyTypes(Array.isArray(bt) ? bt : [])
      })
      .catch(() => {
        if (cancelled) return
        setMetaError("Failed to load filter options. You can still type values manually.")
      })
      .finally(() => {
        if (cancelled) return
        setMetaLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [drawerOpen, applied.city])

  useEffect(() => {
    if (!drawerOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [drawerOpen])

  const openDrawer = (section: SectionId) => {
    setActiveSection(section)
    setDraft(applied)
    setDrawerOpen(true)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
    setActiveField(null)
  }

  const clearDraft = () => setDraft({ ...defaultValues })

  const applyDraft = () => {
    const next = {
      ...draft,
      page: "1",
    }
    onApply(next)
    setDrawerOpen(false)
    setActiveField(null)
  }

  const renderSection = () => {
    const set = (field: keyof SearchParams, value: string) =>
      setDraft((p) => ({ ...p, [field]: value, page: "1" }))

    const Field = ({ label, children }: { label: string; children: ReactNode }) => (
      <div>
        <div className="text-sm font-semibold text-gray-700 mb-2">{label}</div>
        {children}
      </div>
    )

    switch (activeSection) {
      case "basic":
        return (
          <div className="space-y-4">
            <Field label="Exact Year">
              <input
                ref={yearRef}
                type="number"
                inputMode="numeric"
                placeholder="e.g. 2020"
                className={controlClass}
                value={draft.year || ""}
                onFocus={() => setActiveField("year")}
                onChange={(e) => {
                  setActiveField("year")
                  set("year", e.target.value)
                }}
              />
            </Field>
          </div>
        )
      case "price":
        return (
          <div className="space-y-4">
            <Field label="Min Price">
              <input
                ref={minPriceRef}
                type="number"
                inputMode="numeric"
                placeholder="e.g. 500000"
                className={controlClass}
                value={draft.minPrice || ""}
                onFocus={() => setActiveField("minPrice")}
                onChange={(e) => {
                  setActiveField("minPrice")
                  set("minPrice", e.target.value)
                }}
              />
            </Field>
            <Field label="Max Price">
              <input
                ref={maxPriceRef}
                type="number"
                inputMode="numeric"
                placeholder="e.g. 1500000"
                className={controlClass}
                value={draft.maxPrice || ""}
                onFocus={() => setActiveField("maxPrice")}
                onChange={(e) => {
                  setActiveField("maxPrice")
                  set("maxPrice", e.target.value)
                }}
              />
            </Field>
          </div>
        )
      case "yearRange":
        return (
          <div className="space-y-4">
            <Field label="Min Year">
              <input
                ref={minYearRef}
                type="number"
                inputMode="numeric"
                placeholder="e.g. 2018"
                className={controlClass}
                value={draft.minYear || ""}
                onFocus={() => setActiveField("minYear")}
                onChange={(e) => {
                  setActiveField("minYear")
                  set("minYear", e.target.value)
                }}
              />
            </Field>
            <Field label="Max Year">
              <input
                ref={maxYearRef}
                type="number"
                inputMode="numeric"
                placeholder="e.g. 2024"
                className={controlClass}
                value={draft.maxYear || ""}
                onFocus={() => setActiveField("maxYear")}
                onChange={(e) => {
                  setActiveField("maxYear")
                  set("maxYear", e.target.value)
                }}
              />
            </Field>
          </div>
        )
      case "mileage":
        return (
          <div className="space-y-4">
            <Field label="Min Mileage (km)">
              <input
                ref={minMileageRef}
                type="number"
                inputMode="numeric"
                placeholder="e.g. 0"
                className={controlClass}
                value={draft.minMileage || ""}
                onFocus={() => setActiveField("minMileage")}
                onChange={(e) => {
                  setActiveField("minMileage")
                  set("minMileage", e.target.value)
                }}
              />
            </Field>
            <Field label="Max Mileage (km)">
              <input
                ref={maxMileageRef}
                type="number"
                inputMode="numeric"
                placeholder="e.g. 50000"
                className={controlClass}
                value={draft.maxMileage || ""}
                onFocus={() => setActiveField("maxMileage")}
                onChange={(e) => {
                  setActiveField("maxMileage")
                  set("maxMileage", e.target.value)
                }}
              />
            </Field>
          </div>
        )
      case "location":
        return (
          <div className="space-y-4">
            <Field label="City">
              <input
                ref={cityRef}
                type="text"
                placeholder="e.g. Delhi"
                className={controlClass}
                value={draft.city || ""}
                onFocus={() => setActiveField("city")}
                onChange={(e) => {
                  setActiveField("city")
                  set("city", e.target.value)
                }}
              />
            </Field>
          </div>
        )
      case "specs":
        return (
          <div className="space-y-4">
            <Field label="Fuel Type">
              <select
                ref={fuelTypeRef}
                className={controlClass}
                value={draft.fuelType || ""}
                onFocus={() => setActiveField("fuelType")}
                onChange={(e) => {
                  setActiveField("fuelType")
                  set("fuelType", e.target.value)
                }}
              >
                <option value="">Any</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="CNG">CNG</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </Field>
            <Field label="Transmission">
              <select
                ref={transmissionRef}
                className={controlClass}
                value={draft.transmission || ""}
                onFocus={() => setActiveField("transmission")}
                onChange={(e) => {
                  setActiveField("transmission")
                  set("transmission", e.target.value)
                }}
              >
                <option value="">Any</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </Field>
            <Field label="Body Type">
              <input
                ref={bodyTypeRef}
                list="bodytype-options"
                className={controlClass}
                placeholder="e.g. SUV"
                value={draft.bodyType || ""}
                onFocus={() => setActiveField("bodyType")}
                onChange={(e) => {
                  setActiveField("bodyType")
                  set("bodyType", e.target.value)
                }}
              />
              <datalist id="bodytype-options">
                {bodyTypes.map((bt) => (
                  <option key={bt} value={bt} />
                ))}
              </datalist>
            </Field>
          </div>
        )
      default:
        return null
    }
  }

  const SectionButton = ({ id, label }: { id: SectionId; label: string }) => {
    const active = activeSection === id
    return (
      <button
        type="button"
        onClick={() => setActiveSection(id)}
        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
          active ? "bg-[#ED264F]/10 text-[#ED264F]" : "text-gray-700 hover:bg-gray-50"
        }`}
      >
        {label}
      </button>
    )
  }

  return (
    <>
      {/* Filters trigger button */}
      <button
        type="button"
        onClick={() => openDrawer("basic")}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 font-semibold text-gray-900 transition-all"
      >
        <SlidersHorizontal size={18} />
        <span>Filters</span>
        {activeCount > 0 && (
          <span className="ml-1 inline-flex items-center justify-center min-w-6 h-6 px-2 rounded-full bg-[#ED264F] text-white text-xs font-bold">
            {activeCount}
          </span>
        )}
      </button>

      {/* Drawer */}
      <div className={`fixed inset-0 z-50 ${drawerOpen ? "" : "pointer-events-none"}`} aria-hidden={!drawerOpen}>
        {/* Backdrop */}
        <button
          type="button"
          onClick={closeDrawer}
          className={`absolute inset-0 bg-black/40 transition-opacity ${drawerOpen ? "opacity-100" : "opacity-0"}`}
          aria-label="Close filters"
        />

        {/* Panel */}
        <div
          className={`absolute inset-y-0 left-0 w-full max-w-[760px] bg-white shadow-2xl transform transition-transform duration-300 ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="px-4 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <div className="text-lg font-extrabold text-gray-900">Filters & Sorting</div>
                <div className="text-xs text-gray-500">Applied by backend via query params</div>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="p-2 rounded-xl hover:bg-gray-100 text-gray-700"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Mobile tabs */}
            <div className="md:hidden px-3 py-2 border-b border-gray-200 overflow-x-auto">
              <div className="flex items-center gap-2 min-w-max">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveSection(s.id)}
                    className={`px-3 py-2 rounded-full text-xs font-bold whitespace-nowrap ${
                      activeSection === s.id ? "bg-[#ED264F] text-white" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex overflow-hidden">
              {/* Desktop left list */}
              <div className="hidden md:block w-56 border-r border-gray-200 p-3">
                <div className="space-y-1">
                  {sections.map((s) => (
                    <SectionButton key={s.id} id={s.id} label={s.label} />
                  ))}
                </div>
              </div>

              {/* Right panel */}
              <div className="flex-1 overflow-y-auto p-4">
                {metaError && (
                  <div className="mb-4 p-3 rounded-xl border border-amber-200 bg-amber-50 text-amber-800 text-sm">
                    {metaError}
                  </div>
                )}

                {metaLoading && (
                  <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
                    <Loader2 size={16} className="animate-spin" />
                    Loading filter options...
                  </div>
                )}

                {renderSection()}
              </div>
            </div>

            {/* Footer actions */}
            <div className="px-4 py-4 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={clearDraft}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 font-bold text-gray-800 transition-all"
                >
                  <span>Reset</span>
                </button>
                <button
                  type="button"
                  onClick={applyDraft}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#ED264F] to-[#FF6B9D] hover:from-[#ED264F]/90 hover:to-[#FF6B9D]/90 font-extrabold text-white transition-all shadow-md hover:shadow-lg"
                >
                  <Check size={18} />
                  <span>Apply</span>
                </button>
              </div>
              <div className="mt-2 text-[11px] text-gray-500">
                Tip: After applying, pagination buttons will request the backend with the same filters.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { detectLocationFresh, LocationData, cacheLocation, getCachedLocation } from "@/lib/location"
import { MapPin, Loader2 } from "lucide-react"
import { searchAPI } from "@/lib/api"
import { usePathname, useSearchParams } from "next/navigation"

interface LocationContextType {
  location: LocationData | null
  loading: boolean
  error: string | null
  requestLocation: () => Promise<void>
  updateLocation: (location: LocationData) => void
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

export function useLocation() {
  const context = useContext(LocationContext)
  if (!context) {
    throw new Error("useLocation must be used within LocationProvider")
  }
  return context
}

interface LocationProviderProps {
  children: ReactNode
}

export function LocationProvider({ children }: LocationProviderProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [location, setLocation] = useState<LocationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  // City picker state (manual selection)
  const [cities, setCities] = useState<string[]>([])
  const [citiesLoading, setCitiesLoading] = useState(false)
  const [citiesError, setCitiesError] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState<string>("")
  const [autoDetected, setAutoDetected] = useState<LocationData | null>(null)
  const [autoDetecting, setAutoDetecting] = useState(false)
  const [autoDetectAttempted, setAutoDetectAttempted] = useState(false)

  const getUrlCity = () => {
    const raw = searchParams.get("city")
    const city = raw ? raw.trim() : ""
    return city || null
  }

  const syncCityToUrl = (city: string) => {
    if (typeof window === "undefined") return
    const nextCity = city.trim()
    if (!nextCity) return
    const params = new URLSearchParams(window.location.search)
    params.set("city", nextCity)
    const query = params.toString()
    const nextUrl = `${pathname}${query ? `?${query}` : ""}`
    window.history.replaceState({}, "", nextUrl)
  }

  const requestLocation = async () => {
    setAutoDetecting(true)
    setError(null)
    try {
      const detected = await detectLocationFresh()
      setAutoDetected(detected)
      setSelectedCity(detected.city)
    } catch (err: any) {
      // Manual picker will remain visible.
      setError(err?.message || "Failed to detect location. Please select a city.")
      setAutoDetected(null)
    } finally {
      setAutoDetecting(false)
    }
  }

  const updateLocation = (newLocation: LocationData) => {
    setLocation(newLocation)
    cacheLocation(newLocation)
    if (newLocation.city?.trim()) {
      syncCityToUrl(newLocation.city)
    }
  }

  useEffect(() => {
    const urlCity = getUrlCity()
    if (urlCity) {
      const fromUrl: LocationData = {
        city: urlCity,
        state: location?.state,
        country: location?.country,
      }
      setLocation(fromUrl)
      cacheLocation(fromUrl)
      setSelectedCity(urlCity)
      setShowPrompt(false)
      setLoading(false)
      return
    }

    if (location) {
      setLoading(false)
      return
    }

    const cached = getCachedLocation()
    if (cached) {
      setLocation(cached)
      setSelectedCity(cached.city)
      syncCityToUrl(cached.city)
      setLoading(false)
      return
    }

    // No cached location: enforce mandatory selection.
    setShowPrompt(true)
    setLoading(false)
  }, [pathname, searchParams]) // URL city is the canonical source when present.

  // Prefill with detected location but still require user confirmation (like marketplace city pickers).
  useEffect(() => {
    if (!showPrompt) return
    if (autoDetectAttempted) return
    setAutoDetectAttempted(true)
    requestLocation().catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPrompt, autoDetectAttempted])

  useEffect(() => {
    if (!showPrompt) return
    // Load city options for the manual picker.
    if (cities.length > 0 || citiesLoading) return

    let cancelled = false
    setCitiesLoading(true)
    setCitiesError(null)

    searchAPI
      .getCities()
      .then((list) => {
        if (cancelled) return
        const uniq = Array.from(new Set((Array.isArray(list) ? list : []).filter(Boolean)))
        setCities(uniq)
      })
      .catch((e: any) => {
        if (cancelled) return
        setCitiesError(e?.response?.data?.message || e?.message || "Failed to load city list.")
      })
      .finally(() => {
        if (cancelled) return
        setCitiesLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [showPrompt, cities.length, citiesLoading])

  return (
    <LocationContext.Provider
      value={{
        location,
        loading,
        error,
        requestLocation,
        updateLocation,
      }}
    >
      {/* Block the app behind a mandatory city picker until location is selected. */}
      {showPrompt ? null : children}
      
      {/* Location Permission Prompt */}
      {showPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-card rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-6 animate-scale-in border border-border">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin size={24} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-foreground mb-2">Select your city</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Choose a city to show matching listings. You can change this later.
                </p>
              </div>
            </div>
            
            {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

            <div className="space-y-4 mt-3">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  City
                </label>
                <input
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value)
                    setAutoDetected(null)
                  }}
                  list="city-options"
                  placeholder="e.g. Delhi, Mumbai, Pune"
                  className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-ring/20 focus:border-ring bg-background text-foreground"
                />
                <datalist id="city-options">
                  {citiesLoading ? (
                    <option value="" />
                  ) : (
                    cities.map((c) => <option key={c} value={c} />)
                  )}
                </datalist>
                {citiesError && <p className="mt-1 text-xs text-red-600">{citiesError}</p>}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => requestLocation()}
                  disabled={autoDetecting}
                  className="flex-1 px-4 py-3 rounded-xl bg-primary hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed font-semibold text-primary-foreground transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {autoDetecting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Detecting...</span>
                    </>
                  ) : (
                    <span>Detect my location</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const city = selectedCity.trim()
                    if (!city) return
                    updateLocation(autoDetected ? autoDetected : { city })
                    setShowPrompt(false)
                  }}
                  disabled={!selectedCity.trim()}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-border hover:bg-muted disabled:opacity-60 disabled:cursor-not-allowed font-semibold text-foreground transition-all"
                >
                  Continue
                </button>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-4 text-center">
              Your selected city is used to filter listings across the app.
            </p>
          </div>
        </div>
      )}
    </LocationContext.Provider>
  )
}

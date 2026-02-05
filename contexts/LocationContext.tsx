"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { detectLocation, LocationData, cacheLocation, getCachedLocation } from "@/lib/location"
import { MapPin, Loader2, X } from "lucide-react"

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
  const [location, setLocation] = useState<LocationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [hasRequested, setHasRequested] = useState(false)

  const requestLocation = async () => {
    setLoading(true)
    setError(null)
    setHasRequested(true)
    
    try {
      const detected = await detectLocation()
      setLocation(detected)
      cacheLocation(detected)
    } catch (err: any) {
      setError(err.message || "Failed to detect location")
      // Set default location on error
      const defaultLocation: LocationData = {
        city: 'Delhi',
        state: 'Delhi',
        country: 'India',
      }
      setLocation(defaultLocation)
      cacheLocation(defaultLocation)
    } finally {
      setLoading(false)
      setShowPrompt(false)
    }
  }

  const updateLocation = (newLocation: LocationData) => {
    setLocation(newLocation)
    cacheLocation(newLocation)
  }

  useEffect(() => {
    // Check if location was previously denied or if we should show prompt
    const cached = getCachedLocation()
    if (cached) {
      setLocation(cached)
      setLoading(false)
      return
    }

    // Check if user previously denied location
    const locationDenied = localStorage.getItem('location-denied')
    if (locationDenied === 'true') {
      // Use default location
      const defaultLocation: LocationData = {
        city: 'Delhi',
        state: 'Delhi',
        country: 'India',
      }
      setLocation(defaultLocation)
      setLoading(false)
      return
    }

    // Show prompt on first visit
    setShowPrompt(true)
    setLoading(false)
  }, [])

  const handleAllow = () => {
    requestLocation()
  }

  const handleDeny = () => {
    localStorage.setItem('location-denied', 'true')
    const defaultLocation: LocationData = {
      city: 'Delhi',
      state: 'Delhi',
      country: 'India',
    }
    setLocation(defaultLocation)
    cacheLocation(defaultLocation)
    setShowPrompt(false)
    setLoading(false)
  }

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
      {children}
      
      {/* Location Permission Prompt */}
      {showPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 animate-scale-in">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#ED264F]/10 flex items-center justify-center">
                <MapPin size={24} className="text-[#ED264F]" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Enable Location Access
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We need your location to show you cars available in your area. 
                  Your location data is only used to filter search results and is never shared.
                </p>
              </div>
              <button
                onClick={handleDeny}
                className="flex-shrink-0 p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleDeny}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 hover:border-gray-400 font-semibold text-gray-700 transition-all"
              >
                Skip for Now
              </button>
              <button
                onClick={handleAllow}
                disabled={loading}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#ED264F] to-[#FF6B9D] hover:from-[#ED264F]/90 hover:to-[#FF6B9D]/90 disabled:opacity-60 disabled:cursor-not-allowed font-semibold text-white transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Detecting...</span>
                  </>
                ) : (
                  <span>Allow Location</span>
                )}
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              You can change this later in your browser settings
            </p>
          </div>
        </div>
      )}
    </LocationContext.Provider>
  )
}

export interface LocationData {
  city: string
  state?: string
  country?: string
  lat?: number
  lng?: number
}

const STORAGE_KEY = 'user-location'
const STORAGE_TIMESTAMP_KEY = 'user-location-timestamp'
const CACHE_DURATION = 24 * 60 * 60 * 1000
const MAX_CITY_LENGTH = 50

export function getCachedLocation(): LocationData | null {
  if (typeof window === 'undefined') return null
  
  try {
    const cached = localStorage.getItem(STORAGE_KEY)
    const timestamp = localStorage.getItem(STORAGE_TIMESTAMP_KEY)
    
    if (!cached || !timestamp) return null
    
    const age = Date.now() - parseInt(timestamp, 10)
    if (age > CACHE_DURATION) {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(STORAGE_TIMESTAMP_KEY)
      return null
    }
    
    return JSON.parse(cached)
  } catch {
    return null
  }
}

export function cacheLocation(location: LocationData): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(location))
    localStorage.setItem(STORAGE_TIMESTAMP_KEY, Date.now().toString())
  } catch {
    // Ignore storage errors
  }
}

export function getBrowserLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'))
      return
    }
    
    navigator.geolocation.getCurrentPosition(
      resolve,
      reject,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    )
  })
}

export async function reverseGeocode(lat: number, lng: number): Promise<LocationData> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'CarMetasearch/1.0',
        },
      }
    )
    if (!response.ok) {
      throw new Error('Reverse geocoding failed')
    }
    const data = await response.json()
    const address = data.address || {}
    const district =
      address.county ||
      address.state_district ||
      address.city ||
      address.town ||
      address.village ||
      address.municipality ||
      ''
    const rawCity = district.trim() || 'Unknown'
    const city = rawCity.slice(0, MAX_CITY_LENGTH)
    const state = (address.state || address.region || '').trim() || undefined
    const country = (address.country || '').trim() || undefined
    return {
      city,
      state,
      country,
      lat,
      lng,
    }
  } catch (error) {
    console.error('Reverse geocoding error:', error)
    throw error
  }
}

export async function getLocationFromIP(): Promise<LocationData> {
  try {
    const response = await fetch('https://ipapi.co/json/')
    if (!response.ok) {
      throw new Error('IP geolocation failed')
    }
    const data = await response.json()
    const rawCity = (data.city || 'Unknown').trim()
    const city = rawCity.slice(0, MAX_CITY_LENGTH)
    return {
      city,
      state: data.region || undefined,
      country: data.country_name || undefined,
      lat: data.latitude,
      lng: data.longitude,
    }
  } catch (error) {
    console.error('IP geolocation error:', error)
    return {
      city: 'Delhi',
      state: 'Delhi',
      country: 'India',
    }
  }
}

export async function detectLocation(): Promise<LocationData> {
  const cached = getCachedLocation()
  if (cached) {
    return cached
  }
  try {
    const position = await getBrowserLocation()
    const { latitude, longitude } = position.coords
    const location = await reverseGeocode(latitude, longitude)
    cacheLocation(location)
    return location
  } catch (browserError) {
    console.log('Browser geolocation failed, trying IP fallback:', browserError)
    try {
      const location = await getLocationFromIP()
      cacheLocation(location)
      return location
    } catch (ipError) {
      console.error('All location detection methods failed:', ipError)
      const defaultLocation: LocationData = {
        city: 'Delhi',
        state: 'Delhi',
        country: 'India',
      }
      cacheLocation(defaultLocation)
      return defaultLocation
    }
  }
}

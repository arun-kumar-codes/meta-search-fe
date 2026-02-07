import axios from 'axios'
import { endpoints } from './endpoints'

const getBaseURL = () => {
  const envURL = process.env.NEXT_PUBLIC_API_BASE_URL
  const defaultURL = 'http://localhost:3377'
  const baseURL = envURL || defaultURL
  console.log('API Base URL:', baseURL, envURL ? '(from env)' : '(default)')
  return baseURL
}

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})


api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('user_token') : null
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    const fullUrl = `${config.baseURL}${config.url}`
    if (config.params) {
      console.log('API Request:', fullUrl, 'with params:', config.params)
    } else {
      console.log('API Request:', fullUrl)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data)
    } else if (error.request) {
      console.error('Network Error:', error.request)
    } else {
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

export interface SearchParams {
  brand?: string
  model?: string
  year?: string
  minYear?: string
  maxYear?: string
  minPrice?: string
  maxPrice?: string
  minMileage?: string
  maxMileage?: string
  city?: string
  state?: string
  fuelType?: string
  transmission?: string
  bodyType?: string
  sortBy?: 'price_asc' | 'price_desc' | 'year_desc' | 'year_asc' | 'mileage_asc' | 'mileage_desc'
  page?: string
  limit?: string
}

export interface CarListing {
  id: string
  brand: string
  model: string
  variant?: string
  year: number
  mileage: number
  price: number
  currency: string
  color?: string
  fuelType?: string
  transmission?: string
  bodyType?: string
  city?: string
  state?: string
  country?: string
  isAvailable: boolean
  externalUrl?: string
  ownership?: string
  trackingUrl?: string
  images?: string[]
  agency: {
    id: string
    name: string
    whatsappNumber?: string
  }
}

export interface SearchResponse {
  listings: CarListing[]
  message?: string
  success?: boolean
  total?: number
  page?: number
  limit?: number
  totalPages?: number
}

export const searchAPI = {
  search: async (params: SearchParams): Promise<SearchResponse> => {
    try {
      const cleanParams: Record<string, string> = {}
      Object.entries(params).forEach(([key, value]) => {
        if (key === 'state') return
        if (value !== undefined && value !== null && value !== "") {
          cleanParams[key] = String(value)
        }
      })
      const response = await api.get(endpoints.search, { params: cleanParams })
      return response.data
    } catch (error) {
      throw error
    }
  },
  
  getCarById: async (id: string): Promise<CarListing> => {
    try {
      const response = await api.get(endpoints.carDetails(id))
      return response.data.listing || response.data
    } catch (error) {
      throw error
    }
  },
  
  getBrands: async (city?: string): Promise<string[]> => {
    try {
      const params = city ? { city } : undefined
      const response = await api.get(endpoints.brands, { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  getModels: async (brand?: string, city?: string): Promise<string[]> => {
    try {
      const params: Record<string, string> = {}
      if (brand) params.brand = brand
      if (city) params.city = city
      const response = await api.get(endpoints.models, { params: Object.keys(params).length ? params : undefined })
      return response.data
    } catch (error) {
      throw error
    }
  },

  getCities: async (): Promise<string[]> => {
    try {
      const response = await api.get(endpoints.cities)
      return response.data
    } catch (error) {
      throw error
    }
  },

  getStates: async (): Promise<string[]> => {
    try {
      const response = await api.get(endpoints.states)
      return response.data
    } catch (error) {
      throw error
    }
  },

  getBodyTypes: async (city?: string): Promise<string[]> => {
    try {
      const params = city ? { city } : undefined
      const response = await api.get(endpoints.bodyTypes, { params })
      return response.data
    } catch (error) {
      throw error
    }
  },
}

export interface UserProfile {
  id: string
  phone: string
  name?: string
  email?: string
  suggestionsOptIn: boolean
}

export const userAuthAPI = {
  sendOtp: async (phone: string) => {
    const { data } = await api.post(endpoints.userSendOtp, { phone })
    return data
  },
  verifyOtp: async (phone: string, otp: string) => {
    const { data } = await api.post(endpoints.userVerifyOtp, { phone, otp })
    return data as { accessToken: string; user: UserProfile }
  },
}

export const usersAPI = {
  recordHistory: async (listingId: string) => {
    const { data } = await api.post(endpoints.userHistory, { listingId })
    return data
  },
  getHistory: async () => {
    const { data } = await api.get(endpoints.userHistory)
    return data as { items: { listingId: string; viewedAt: string; listing: CarListing | null }[]; listings: CarListing[] }
  },
  addWishlist: async (listingId: string) => {
    const { data } = await api.post(`${endpoints.userWishlist}/${listingId}`)
    return data
  },
  removeWishlist: async (listingId: string) => {
    const { data } = await api.delete(`${endpoints.userWishlist}/${listingId}`)
    return data
  },
  getWishlist: async () => {
    const { data } = await api.get(endpoints.userWishlist)
    return data as { items: { listingId: string; createdAt: string; listing: CarListing | null }[]; listings: CarListing[] }
  },
  checkWishlist: async (listingId: string) => {
    const { data } = await api.get(endpoints.userWishlistCheck(listingId))
    return data as { inWishlist: boolean }
  },
  updatePreferences: async (suggestionsOptIn: boolean) => {
    const { data } = await api.post(endpoints.userPreferences, { suggestionsOptIn })
    return data as UserProfile
  },
  getPreferences: async () => {
    const { data } = await api.get(endpoints.userPreferences)
    return data as UserProfile
  },
}

export default api

import axios from 'axios'
import { endpoints } from './endpoints'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})


api.interceptors.request.use(
  (config) => {
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
  page?: string
  limit?: string
}

export interface CarListing {
  id: string
  brand: string
  model: string
  variant: string
  year: number
  mileage: number
  price: number
  currency: string
  color: string
  fuelType: string
  transmission: string
  bodyType: string
  city: string
  state: string
  country: string
  isAvailable: boolean
  externalUrl: string
  agency: {
    id: string
    name: string
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
      const response = await api.get(endpoints.search, { params })
      return response.data
    } catch (error) {
      throw error
    }
  },
  
  getCarById: async (id: string): Promise<CarListing> => {
    try {
      const response = await api.get(endpoints.carDetails(id))
      return response.data
    } catch (error) {
      throw error
    }
  },
  
  // create: async (data: any): Promise<SearchResponse> => {
  //   try {
  //     const response = await api.post(endpoints.search, data)
  //     return response.data
  //   } catch (error) {
  //     throw error
  //   }
  // },
  
  // update: async (id: string, data: any): Promise<SearchResponse> => {
  //   try {
  //     const response = await api.put(`${endpoints.search}/${id}`, data)
  //     return response.data
  //   } catch (error) {
  //     throw error
  //   }
  // },
  
  // Example: DELETE request
  // delete: async (id: string): Promise<SearchResponse> => {
  //   try {
  //     const response = await api.delete(`${endpoints.search}/${id}`)
  //     return response.data
  //   } catch (error) {
  //     throw error
  //   }
  // },
}

export default api

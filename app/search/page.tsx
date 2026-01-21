"use client"

import { useEffect, useState, Suspense, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Header from "@/components/Header"
import SearchFormCar from "@/components/SearchFormCar"
import CarCardHorizontal from "@/components/CarCardHorizontal"
import { searchAPI, SearchParams, CarListing, SearchResponse } from "@/lib/api"
import { Loader2, Car } from "lucide-react"
import Pagination from "@/components/Pagination"

function SearchResultsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchResults, setSearchResults] = useState<CarListing[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  })

  // Get search params from URL
  const getSearchParams = (): SearchParams => {
    return {
      brand: searchParams.get("brand") || "",
      model: searchParams.get("model") || "",
      year: searchParams.get("year") || "",
      page: searchParams.get("page") || "1",
      limit: searchParams.get("limit") || "10",
    }
  }

  const initialSearchParams = getSearchParams()
  
  // Extract individual params for dependency array
  const brand = searchParams.get("brand") || ""
  const model = searchParams.get("model") || ""
  const year = searchParams.get("year") || ""
  const page = searchParams.get("page") || "1"
  const limit = searchParams.get("limit") || "10"

  // Create a key for sessionStorage based on search params
  const getStorageKey = (params: SearchParams): string => {
    return `search-results-${params.brand}-${params.model}-${params.year}-${params.page}-${params.limit}`
  }

  const performSearch = useCallback(async (params: SearchParams) => {
    setLoading(true)
    setError(null)
    
    // Check sessionStorage first
    const storageKey = getStorageKey(params)
    const cachedResults = sessionStorage.getItem(storageKey)
    
    if (cachedResults) {
      try {
        const parsed = JSON.parse(cachedResults)
        setSearchResults(parsed.listings || parsed)
        
        // Restore pagination if available
        if (parsed.pagination) {
          setPagination(parsed.pagination)
        } else if (parsed.total !== undefined) {
          setPagination({
            total: parsed.total || parsed.listings?.length || 0,
            page: parsed.page || parseInt(params.page || "1"),
            limit: parsed.limit || parseInt(params.limit || "10"),
            totalPages: parsed.totalPages || Math.ceil((parsed.total || parsed.listings?.length || 0) / parseInt(params.limit || "10")),
          })
        }
        setLoading(false)
        return
      } catch (e) {
        // If parsing fails, continue with API call
      }
    }

    setSearchResults(null)

    try {
      const response = await searchAPI.search(params)
      const listings = response.listings || []
      setSearchResults(listings)
      
      // Update pagination state
      const paginationData = {
        total: response.total || listings.length,
        page: response.page || parseInt(params.page || "1"),
        limit: response.limit || parseInt(params.limit || "10"),
        totalPages: response.totalPages || Math.ceil((response.total || listings.length) / parseInt(params.limit || "10")),
      }
      setPagination(paginationData)
      
      // Store in sessionStorage with pagination
      sessionStorage.setItem(storageKey, JSON.stringify({
        listings,
        pagination: paginationData,
      }))
      setError(null) // Clear any previous errors on success
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        err.message || 
        "Failed to search. Please try again."
      )
      console.error("Search error:", err)
      setSearchResults(null) // Clear results on error
    } finally {
      setLoading(false) // Always clear loading state
    }
  }, [])

  useEffect(() => {
    const params = getSearchParams()
    
    // Search if brand exists OR if pagination params exist (for showing all cars with pagination)
    if (params.brand || (params.page && params.limit)) {
      performSearch(params)
    } else {
      // If no params, try to load from sessionStorage with last search
      const lastSearch = sessionStorage.getItem('last-search-params')
      if (lastSearch) {
        try {
          const parsedParams = JSON.parse(lastSearch)
          const storageKey = getStorageKey(parsedParams)
          const cachedResults = sessionStorage.getItem(storageKey)
          if (cachedResults) {
            setSearchResults(JSON.parse(cachedResults))
          }
        } catch (e) {
          // Ignore errors
        }
      }
    }

    // Handle browser back/forward navigation
    const handlePageShow = (e: PageTransitionEvent) => {
      // If page was loaded from cache (back/forward button), reload data
      if (e.persisted) {
        const currentParams = getSearchParams()
        if (currentParams.brand || (currentParams.page && currentParams.limit)) {
          performSearch(currentParams)
        }
      }
    }

    window.addEventListener('pageshow', handlePageShow)
    return () => {
      window.removeEventListener('pageshow', handlePageShow)
    }
  }, [brand, model, year, page, limit, performSearch])

  // Store last search params
  useEffect(() => {
    const params = getSearchParams()
    if (params.brand || (params.page && params.limit)) {
      sessionStorage.setItem('last-search-params', JSON.stringify(params))
    }
  }, [brand, model, year, page, limit])

  // Handler to show all available cars
  const handleShowAllCars = () => {
    // Navigate with pagination params only
    router.push('/search?page=1&limit=10')
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Search Section */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Search Used Cars
            </h1>
            <p className="text-gray-600">
              Find the perfect used car for you
            </p>
          </div>
          <SearchFormCar initialValues={initialSearchParams} variant="page" />
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 size={32} className="animate-spin text-[#ED264F]" />
              <span className="ml-3 text-gray-600">Searching...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Show All Cars Button - shown when no results or when user wants to browse all */}
          {!loading && !error && (
            <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
              {searchResults && searchResults.length > 0 ? (
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  Found {pagination.total || searchResults.length} {(pagination.total || searchResults.length) === 1 ? 'car' : 'cars'}
                </h2>
              ) : (
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  Browse Available Cars
                </h2>
              )}
              <button
                onClick={handleShowAllCars}
                disabled={loading}
                className="bg-[#ED264F] hover:bg-[#ED264F]/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Car size={18} />
                <span>Show All Available Cars</span>
              </button>
            </div>
          )}

          {!loading && !error && searchResults && searchResults.length > 0 && (
            <>
              <div className="space-y-4">
                {searchResults.map((car) => (
                  <CarCardHorizontal key={car.id} car={car} />
                ))}
              </div>
              
              {/* Pagination */}
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                total={pagination.total}
                limit={pagination.limit}
              />
            </>
          )}

          {!loading && !error && searchResults && searchResults.length === 0 && (
            <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
              <p className="text-gray-600 text-lg mb-2">No cars found matching your search criteria.</p>
              <p className="text-gray-500 text-sm">Try adjusting your search parameters.</p>
            </div>
          )}

          {!loading && !error && !searchResults && (
            <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
              <p className="text-gray-600 text-lg">Enter your search criteria above to find cars.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-12">
          <Loader2 size={32} className="animate-spin text-[#ED264F]" />
        </div>
      </main>
    }>
      <SearchResultsContent />
    </Suspense>
  )
}

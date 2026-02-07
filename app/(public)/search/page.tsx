"use client"

import { useEffect, useState, Suspense, useCallback, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import SearchFormCar from "@/components/search/SearchFormCar"
import CarCardHorizontal from "@/components/search/CarCardHorizontal"
import { searchAPI, SearchParams, CarListing, SearchResponse } from "@/lib/api"
import { Loader2, Car, MapPin } from "lucide-react"
import Pagination from "@/components/search/Pagination"
import { useLocation } from "@/contexts/LocationContext"
import { useUser } from "@/contexts/UserContext"
import { usersAPI } from "@/lib/api"

function SearchResultsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { location, loading: locationLoading } = useLocation()
  const { user } = useUser()
  const [searchResults, setSearchResults] = useState<CarListing[] | null>(null)
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 50,
    totalPages: 1,
  })

  const getSearchParams = (): SearchParams => {
    const params: SearchParams = {
      page: searchParams.get("page") || "1",
      limit: searchParams.get("limit") || "50",
    }
    
    const brand = searchParams.get("brand")
    const model = searchParams.get("model")
    const year = searchParams.get("year")
    const minYear = searchParams.get("minYear")
    const maxYear = searchParams.get("maxYear")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const minMileage = searchParams.get("minMileage")
    const maxMileage = searchParams.get("maxMileage")
    const city = searchParams.get("city")
    const fuelType = searchParams.get("fuelType")
    const transmission = searchParams.get("transmission")
    const bodyType = searchParams.get("bodyType")
    const sortBy = searchParams.get("sortBy") as SearchParams["sortBy"] | null
    
    if (brand) params.brand = brand
    if (model) params.model = model
    if (year) params.year = year
    if (minYear) params.minYear = minYear
    if (maxYear) params.maxYear = maxYear
    if (minPrice) params.minPrice = minPrice
    if (maxPrice) params.maxPrice = maxPrice
    if (minMileage) params.minMileage = minMileage
    if (maxMileage) params.maxMileage = maxMileage
    params.city = city || location?.city || "Delhi"
    if (fuelType) params.fuelType = fuelType
    if (transmission) params.transmission = transmission
    if (bodyType) params.bodyType = bodyType
    if (sortBy) params.sortBy = sortBy
    
    return params
  }

  const paramsString = searchParams.toString()
  const initialSearchParams = useMemo(() => getSearchParams(), [paramsString, location])

  const performSearch = useCallback(async (params: SearchParams) => {
    setLoading(true)
    setError(null)

    setSearchResults(null)

    try {
      const response = await searchAPI.search(params)
      const listings = response.listings || []
      setSearchResults(listings)
      
      const paginationData = {
        total: typeof response.total === "number" ? response.total : 0,
        page: typeof response.page === "number" ? response.page : parseInt(params.page || "1"),
        limit: typeof response.limit === "number" ? response.limit : parseInt(params.limit || "50"),
        totalPages: typeof response.totalPages === "number" ? response.totalPages : 1,
      }
      setPagination(paginationData)
      setError(null) 
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        err.message || 
        "Failed to search. Please try again."
      )
      console.error("Search error:", err)
      setSearchResults(null) // Clear results on error
    } finally {
      setLoading(false) 
    }
  }, [])

  useEffect(() => {
    if (!user) {
      setWishlistIds(new Set())
      return
    }
    usersAPI.getWishlist().then((data) => {
      setWishlistIds(new Set(data.items.map((i) => i.listingId)))
    }).catch(() => setWishlistIds(new Set()))
  }, [user])

  useEffect(() => {
    if (locationLoading) return
    
    const params = getSearchParams()
    if (!params.page) params.page = "1"
    if (!params.limit) params.limit = "50"
    
    performSearch(params)
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        const currentParams = getSearchParams()
        if (!currentParams.page) currentParams.page = "1"
        if (!currentParams.limit) currentParams.limit = "10"
        performSearch(currentParams)
      }
    }

    window.addEventListener('pageshow', handlePageShow)
    return () => {
      window.removeEventListener('pageshow', handlePageShow)
    }
  }, [paramsString, performSearch, locationLoading, location])
  const handleShowAllCars = () => {
    // Clear all search parameters and show all cars
    // Navigate to search page with only city parameter (if available)
    const cityParam = location?.city ? `?city=${encodeURIComponent(location.city)}` : ''
    router.push(`/search${cityParam}`)
  }
  const totalCount = pagination.total > 0 ? pagination.total : (searchResults?.length || 0)

  return (
    <main className="min-h-screen bg-background">
      {/* Search Section */}
      <section className="bg-primary/10 border-b border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="mb-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Search Cars
                </h1>
                <p className="text-base text-muted-foreground">
                  Find the perfect car for you from thousands of verified listings
                </p>
              </div>
              {location && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border shadow-sm shrink-0">
                  <MapPin size={18} className="text-primary shrink-0" />
                  <div className="text-sm min-w-0">
                    <div className="font-semibold text-foreground truncate">{location.city}</div>
                    {location.state && (
                      <div className="text-xs text-muted-foreground">{location.state}</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 md:p-5">
            <SearchFormCar initialValues={initialSearchParams} variant="page" />
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {loading && (
            <div className="flex items-center justify-center py-16 md:py-20">
              <div className="text-center">
                <Loader2 size={48} className="animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">Searching for cars...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8">
              <p className="font-semibold mb-1">Error</p>
              <p>{error}</p>
            </div>
          )}

          {/* Results Header */}
          {!loading && !error && (
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              {searchResults && searchResults.length > 0 ? (
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  Found {totalCount} {totalCount === 1 ? 'car' : 'cars'}
                </h2>
              ) : searchResults && searchResults.length === 0 ? (
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  No Results Found
                </h2>
              ) : (
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  Browse Available Cars
                </h2>
              )}
              {searchResults && searchResults.length > 0 && (
                <button
                  onClick={handleShowAllCars}
                  disabled={loading}
                  className="bg-primary hover:opacity-90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed text-primary-foreground font-semibold py-2 px-4 rounded-lg transition-all text-sm flex items-center justify-center gap-1.5 shrink-0"
                >
                  <Car size={16} />
                  <span>Show All</span>
                </button>
              )}
            </div>
          )}

          {!loading && !error && searchResults && searchResults.length > 0 && (
            <>
              <div className="space-y-3 mb-6">
                {searchResults.map((car) => (
                  <CarCardHorizontal
                    key={car.id}
                    car={car}
                    returnCity={getSearchParams().city}
                    inWishlist={user ? wishlistIds.has(car.id) : undefined}
                    onWishlistClick={user ? async () => {
                      try {
                        if (wishlistIds.has(car.id)) {
                          await usersAPI.removeWishlist(car.id)
                          setWishlistIds((prev) => {
                            const next = new Set(prev)
                            next.delete(car.id)
                            return next
                          })
                        } else {
                          await usersAPI.addWishlist(car.id)
                          setWishlistIds((prev) => new Set(prev).add(car.id))
                        }
                      } catch {
                        // ignore
                      }
                    } : undefined}
                  />
                ))}
              </div>
              
              {/* Pagination */}
              <div className="mt-6">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  total={pagination.total}
                  limit={pagination.limit}
                />
              </div>
            </>
          )}

          {!loading && !error && searchResults && searchResults.length === 0 && (
            <div className="bg-card rounded-xl p-6 md:p-8 text-center border border-border">
              <Car size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">No cars found</h3>
              <p className="text-muted-foreground mb-4">No cars match your search criteria.</p>
              <button
                onClick={handleShowAllCars}
                className="bg-primary hover:opacity-90 text-primary-foreground font-semibold py-2 px-6 rounded-lg transition-all text-sm inline-flex items-center gap-2"
              >
                <Car size={16} />
                <span>Browse All Cars</span>
              </button>
            </div>
          )}

          {!loading && !error && !searchResults && (
            <div className="bg-card rounded-xl p-6 md:p-8 text-center border border-border">
              <Car size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Ready to Search</h3>
              <p className="text-muted-foreground text-sm">Use the search form above to find your perfect car.</p>
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
      <main className="min-h-screen bg-background">
        <div className="flex items-center justify-center py-12">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      </main>
    }>
      <SearchResultsContent />
    </Suspense>
  )
}

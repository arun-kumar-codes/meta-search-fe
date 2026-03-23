"use client"

import { useEffect, useState } from "react"
import { searchAPI, CarListing } from "@/lib/api"
import { Car, Search, TrendingUp, Loader2, Eye, Sparkles, Filter, MapPin } from "lucide-react"
import Link from "next/link"
import CarCardHorizontal from "@/components/search/CarCardHorizontal"
import { useLocation } from "@/contexts/LocationContext"

export default function UserDashboard() {
  const { location } = useLocation()
  const [popularCars, setPopularCars] = useState<CarListing[]>([])
  const [trendingCars, setTrendingCars] = useState<CarListing[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalListings: 0,
    totalBrands: 0,
  })

  const city = location?.city

  useEffect(() => {
    if (!city) return
    loadDashboardData()
  }, [city])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const popularResponse = await searchAPI.search({
        page: "1",
        limit: "6",
        sortBy: "price_asc" as const,
        city,
      })
      const trendingResponse = await searchAPI.search({
        page: "1",
        limit: "6",
        sortBy: "year_desc" as const,
        city,
      })
      const brands = await searchAPI.getBrands(city)

      setPopularCars(popularResponse.listings || [])
      setTrendingCars(trendingResponse.listings || [])
      setStats({
        totalListings: popularResponse.total || 0,
        totalBrands: brands.length || 0,
      })
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={48} className="animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Mobile: app-like, minimal */}
      <div className="sm:hidden space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-foreground leading-tight">Dashboard</h1>
            <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin size={14} className="text-primary" />
              <span className="truncate">{city}</span>
            </div>
          </div>
          <Link
            href="/search"
            className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
          >
            <Search size={16} />
            Search
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-card rounded-xl p-3 border border-border">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-medium text-muted-foreground">Listings</span>
              <Car size={16} className="text-primary" />
            </div>
            <div className="mt-1 text-lg font-bold text-foreground">{formatNumber(stats.totalListings)}</div>
          </div>
          <div className="bg-card rounded-xl p-3 border border-border">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-medium text-muted-foreground">Brands</span>
              <TrendingUp size={16} className="text-primary" />
            </div>
            <div className="mt-1 text-lg font-bold text-foreground">{formatNumber(stats.totalBrands)}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Link
            href="/search"
            className="bg-card rounded-xl p-3 border border-border hover:border-primary/40 transition-colors flex flex-col items-center justify-center gap-1.5"
          >
            <Search size={18} className="text-primary" />
            <span className="text-xs font-semibold text-foreground">Search</span>
          </Link>
          <Link
            href="/search?sortBy=price_asc"
            className="bg-card rounded-xl p-3 border border-border hover:border-primary/40 transition-colors flex flex-col items-center justify-center gap-1.5"
          >
            <Filter size={18} className="text-primary" />
            <span className="text-xs font-semibold text-foreground">Deals</span>
          </Link>
          <Link
            href="/search"
            className="bg-card rounded-xl p-3 border border-border hover:border-primary/40 transition-colors flex flex-col items-center justify-center gap-1.5"
          >
            <MapPin size={18} className="text-primary" />
            <span className="text-xs font-semibold text-foreground">Nearby</span>
          </Link>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-primary" />
              <h2 className="text-sm font-bold text-foreground">Best deals</h2>
            </div>
            <Link href="/search?sortBy=price_asc" className="text-xs font-semibold text-primary">
              View all
            </Link>
          </div>
          <div className="px-3 pb-3">
            {popularCars.length > 0 ? (
              <div className="space-y-3">
                {popularCars.slice(0, 3).map((car) => (
                  <CarCardHorizontal key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Car size={36} className="mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground text-sm">No cars right now</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-primary" />
              <h2 className="text-sm font-bold text-foreground">Trending</h2>
            </div>
            <Link href="/search?sortBy=year_desc" className="text-xs font-semibold text-primary">
              View all
            </Link>
          </div>
          <div className="px-3 pb-3">
            {trendingCars.length > 0 ? (
              <div className="space-y-3">
                {trendingCars.slice(0, 3).map((car) => (
                  <CarCardHorizontal key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Car size={36} className="mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground text-sm">No trending cars</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop/Web: keep existing richer layout */}
      <div className="hidden sm:block space-y-6 md:space-y-8">
        {/* Welcome Header */}
        <div className="bg-primary rounded-2xl p-6 md:p-8 text-primary-foreground">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome Back!</h1>
          <p className="text-primary-foreground/90 text-base md:text-lg">Discover your perfect used car from thousands of verified listings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-card rounded-xl p-4 md:p-6 shadow-sm border border-border hover:border-primary/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-muted-foreground text-sm mb-1 font-medium">Total Listings</p>
                <p className="text-2xl md:text-4xl font-bold text-foreground">{formatNumber(stats.totalListings)}</p>
                <p className="text-muted-foreground text-xs mt-2">Cars available</p>
              </div>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <Car size={28} className="text-primary md:w-8 md:h-8" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-4 md:p-6 shadow-sm border border-border hover:border-primary/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-muted-foreground text-sm mb-1 font-medium">Available Brands</p>
                <p className="text-2xl md:text-4xl font-bold text-foreground">{formatNumber(stats.totalBrands)}</p>
                <p className="text-muted-foreground text-xs mt-2">Popular brands</p>
              </div>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <TrendingUp size={28} className="text-primary md:w-8 md:h-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Search Bar */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
              <Search size={24} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-foreground mb-1">Start Your Search</h3>
              <p className="text-muted-foreground text-sm">Find cars by brand, model, or browse all listings</p>
            </div>
            <Link
              href="/search"
              className="px-6 py-3 bg-primary hover:opacity-90 text-primary-foreground rounded-lg font-semibold transition-all text-center shrink-0"
            >
              Search Now
            </Link>
          </div>
        </div>

        {/* Best Deals Section */}
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="bg-primary p-4 md:p-6 text-primary-foreground">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Sparkles size={28} className="text-primary-foreground shrink-0" />
                <div>
                  <h2 className="text-xl md:text-2xl font-bold">Best Deals</h2>
                  <p className="text-primary-foreground/80 text-sm">Lowest prices available right now</p>
                </div>
              </div>
              <Link
                href="/search?sortBy=price_asc"
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors w-fit"
              >
                View All
                <Eye size={18} />
              </Link>
            </div>
          </div>
          <div className="p-4 md:p-6">
            {popularCars.length > 0 ? (
              <div className="space-y-4">
                {popularCars.map((car) => (
                  <CarCardHorizontal key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Car size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No cars available at the moment</p>
              </div>
            )}
          </div>
        </div>

        {/* Trending Cars Section */}
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="bg-primary p-4 md:p-6 text-primary-foreground">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <TrendingUp size={28} className="text-primary-foreground shrink-0" />
                <div>
                  <h2 className="text-xl md:text-2xl font-bold">Trending Now</h2>
                  <p className="text-primary-foreground/80 text-sm">Latest and newest listings</p>
                </div>
              </div>
              <Link
                href="/search?sortBy=year_desc"
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors w-fit"
              >
                View All
                <Eye size={18} />
              </Link>
            </div>
          </div>
          <div className="p-4 md:p-6">
            {trendingCars.length > 0 ? (
              <div className="space-y-4">
                {trendingCars.map((car) => (
                  <CarCardHorizontal key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Car size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No trending cars at the moment</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <Link
            href="/search"
            className="group bg-card rounded-xl p-4 md:p-6 border border-border hover:border-primary hover:bg-primary/5 transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
              <Search size={24} className="text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-foreground">Search Cars</p>
              <p className="text-muted-foreground text-sm">Find your perfect match</p>
            </div>
          </Link>

          <Link
            href="/search?sortBy=price_asc"
            className="group bg-card rounded-xl p-4 md:p-6 border border-border hover:border-primary hover:bg-primary/5 transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
              <Filter size={24} className="text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-foreground">Best Deals</p>
              <p className="text-muted-foreground text-sm">Lowest prices first</p>
            </div>
          </Link>

          <Link
            href="/search"
            className="group bg-card rounded-xl p-4 md:p-6 border border-border hover:border-primary hover:bg-primary/5 transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
              <MapPin size={24} className="text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-foreground">Near Me</p>
              <p className="text-muted-foreground text-sm">Find local listings</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

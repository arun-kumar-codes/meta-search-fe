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
    recentSearches: 0,
  })

  const city = location?.city || "Delhi"

  useEffect(() => {
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
        recentSearches: parseInt(localStorage.getItem('recentSearches') || '0'),
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
        <Loader2 size={48} className="animate-spin text-[#ED264F]" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#ED264F] via-[#FF6B9D] to-[#FF8E9B] rounded-2xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-white/90 text-lg">Discover your perfect used car from thousands of verified listings</p>
      </div>

      {/* Stats Cards - Colorful */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 shadow-lg text-white transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1 font-medium">Total Listings</p>
              <p className="text-4xl font-bold">{formatNumber(stats.totalListings)}</p>
              <p className="text-blue-100 text-xs mt-2">Cars available</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Car size={32} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 shadow-lg text-white transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm mb-1 font-medium">Available Brands</p>
              <p className="text-4xl font-bold">{formatNumber(stats.totalBrands)}</p>
              <p className="text-green-100 text-xs mt-2">Popular brands</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <TrendingUp size={32} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 shadow-lg text-white transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-1 font-medium">Recent Searches</p>
              <p className="text-4xl font-bold">{formatNumber(stats.recentSearches)}</p>
              <p className="text-purple-100 text-xs mt-2">Your searches</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Search size={32} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Search Bar */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-100 p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#ED264F] to-[#FF6B9D] rounded-lg flex items-center justify-center">
            <Search size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Start Your Search</h3>
            <p className="text-gray-600 text-sm">Find cars by brand, model, or browse all listings</p>
          </div>
          <Link
            href="/search"
            className="px-6 py-3 bg-gradient-to-r from-[#ED264F] to-[#FF6B9D] text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105"
          >
            Search Now
          </Link>
        </div>
      </div>

      {/* Best Deals Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles size={28} className="text-white" />
              <div>
                <h2 className="text-2xl font-bold">Best Deals</h2>
                <p className="text-orange-100 text-sm">Lowest prices available right now</p>
              </div>
            </div>
            <Link
              href="/search?sortBy=price_asc"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              View All
              <Eye size={18} />
            </Link>
          </div>
        </div>
        <div className="p-6">
          {popularCars.length > 0 ? (
            <div className="space-y-4">
              {popularCars.map((car) => (
                <CarCardHorizontal key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Car size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No cars available at the moment</p>
            </div>
          )}
        </div>
      </div>

      {/* Trending Cars Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp size={28} className="text-white" />
              <div>
                <h2 className="text-2xl font-bold">Trending Now</h2>
                <p className="text-blue-100 text-sm">Latest and newest listings</p>
              </div>
            </div>
            <Link
              href="/search?sortBy=year_desc"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              View All
              <Eye size={18} />
            </Link>
          </div>
        </div>
        <div className="p-6">
          {trendingCars.length > 0 ? (
            <div className="space-y-4">
              {trendingCars.map((car) => (
                <CarCardHorizontal key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Car size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No trending cars at the moment</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions - Colorful Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/search"
          className="group bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-colors">
              <Search size={24} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-lg">Search Cars</p>
              <p className="text-indigo-100 text-sm">Find your perfect match</p>
            </div>
          </div>
        </Link>

        <Link
          href="/search?sortBy=price_asc"
          className="group bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-colors">
              <Filter size={24} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-lg">Best Deals</p>
              <p className="text-emerald-100 text-sm">Lowest prices first</p>
            </div>
          </div>
        </Link>

        <Link
          href="/search"
          className="group bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-colors">
              <MapPin size={24} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-lg">Near Me</p>
              <p className="text-rose-100 text-sm">Find local listings</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

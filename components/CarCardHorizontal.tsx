"use client"

import { MapPin, Calendar, Gauge, Fuel, Settings2, ExternalLink, Building2, Globe } from "lucide-react"
import { CarListing } from "@/lib/api"
import Link from "next/link"

export default function CarCardHorizontal({ car }: { car: CarListing }) {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('en-IN').format(mileage)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-200">
      <div className="flex flex-col lg:flex-row">
        {/* Left side - Car Info */}
        <div className="flex-1 p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-2xl font-bold text-gray-900 mb-1">{car.brand}</h4>
              <p className="text-gray-600 text-lg mb-1">{car.model} {car.variant}</p>
              <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                <MapPin size={14} className="text-gray-400" />
                <span>{car.city}, {car.state}, {car.country}</span>
              </div>
            </div>
            {car.isAvailable && (
              <span className="bg-lime-400 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                Available
              </span>
            )}
          </div>

          {/* Price */}
          <div className="mb-6">
            <p className="text-3xl font-bold text-gray-900">{formatPrice(car.price, car.currency)}</p>
            <p className="text-sm text-gray-500 mt-1">Price includes all taxes</p>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={18} className="text-gray-400 flex-shrink-0" />
              <div>
                <span className="text-xs text-gray-500 block">Year</span>
                <span className="text-sm font-medium">{car.year}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Gauge size={18} className="text-gray-400 flex-shrink-0" />
              <div>
                <span className="text-xs text-gray-500 block">Mileage</span>
                <span className="text-sm font-medium">{formatMileage(car.mileage)} km</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Fuel size={18} className="text-gray-400 flex-shrink-0" />
              <div>
                <span className="text-xs text-gray-500 block">Fuel</span>
                <span className="text-sm font-medium">{car.fuelType}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Settings2 size={18} className="text-gray-400 flex-shrink-0" />
              <div>
                <span className="text-xs text-gray-500 block">Transmission</span>
                <span className="text-sm font-medium">{car.transmission}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Building2 size={18} className="text-gray-400 flex-shrink-0" />
              <div>
                <span className="text-xs text-gray-500 block">Body Type</span>
                <span className="text-sm font-medium">{car.bodyType}</span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium px-3 py-1.5 rounded-full">
              {car.color}
            </span>
            <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full">
              {car.bodyType}
            </span>
            <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full">
              {car.fuelType}
            </span>
          </div>

          {/* Agency */}
          <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">Dealer</p>
              <p className="text-sm font-medium text-gray-900">{car.agency.name}</p>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <Globe size={14} />
              <span>{car.country}</span>
            </div>
          </div>
        </div>

        {/* Right side - Action Buttons */}
        <div className="lg:w-56 flex flex-col items-center justify-center gap-3 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-gray-200 bg-gray-50">
          <Link
            href={`/search/${car.id}`}
            className="w-full bg-[#ED264F] hover:bg-[#ED264F]/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            View Details
          </Link>
          <a
            href={car.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
          >
            Visit Dealer
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  )
}

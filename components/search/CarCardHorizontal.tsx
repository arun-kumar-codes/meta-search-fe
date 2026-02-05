"use client"

import { useState } from "react"
import { MapPin, Calendar, Gauge, Fuel, Settings2, ExternalLink, Building2, Globe, Image as ImageIcon } from "lucide-react"
import { CarListing } from "@/lib/api"
import Link from "next/link"
import Image from "next/image"
import carPlaceholder from "@/assets/images/car_placeholder.png"

export default function CarCardHorizontal({ car }: { car: CarListing }) {
  const [imageError, setImageError] = useState(false)
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
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 hover:border-[#ED264F]/30">
      <div className="flex flex-col lg:flex-row">
        {/* Left side - Car Info */}
        <div className="flex-1 p-4 lg:p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <Link href={`/search/${car.id}`}>
              <h4 className="text-xl font-bold text-gray-900 mb-1">{car.brand}</h4>
              <p className="text-gray-700 text-base mb-1 font-medium">
                {car.model} {car.variant ? `• ${car.variant}` : ''}
              </p>
              <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                <MapPin size={14} className="text-[#ED264F]" />
                <span>
                  {car.city || 'N/A'}
                  {car.state ? `, ${car.state}` : ''}
                </span>
              </div>
              </Link>
              </div > 
              <div className="flex items-center gap-1.5">
              {car.agency.name && (
              <span className="bg-[#ED264D] text-white text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                {car.agency.name}
              </span>
            )}
              {car.ownership && (
                      <span className="bg-blue-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                      {car.ownership}
                    </span>
                    )}
            {car.isAvailable && (
              <span className="bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                Available
              </span>
            )}
          </div> 
          </div>

        

          {/* Key Details - Inline without containers */}
          <div className="flex flex-wrap items-center gap-4 mb-3 text-sm">
            <div className="flex items-center gap-1.5 text-gray-700">
              <Calendar size={16} className="text-[#ED264F]" />
              <span className="font-medium">{car.year}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-700">
              <Gauge size={16} className="text-[#ED264F]" />
              <span className="font-medium">{formatMileage(car.mileage)} km</span>
            </div>
            {car.fuelType && (
              <div className="flex items-center gap-1.5 text-gray-700">
                <Fuel size={16} className="text-[#ED264F]" />
                <span className="font-medium">{car.fuelType}</span>
              </div>
            )}
            {car.transmission && (
              <div className="flex items-center gap-1.5 text-gray-700">
                <Settings2 size={16} className="text-[#ED264F]" />
                <span className="font-medium">{car.transmission}</span>
              </div>
            )}
            {car.bodyType && (
              <div className="flex items-center gap-1.5 text-gray-700">
                <Building2 size={16} className="text-[#ED264F]" />
                <span className="font-medium">{car.bodyType}</span>
              </div>
            )}
          </div>

          {/* Additional Info Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {car.color && (
              <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium px-2.5 py-1 rounded-full">
                {car.color}
              </span>
            )}
          </div>
        </div>

        {/* Middle - Image Box (Separate) */}
        <div className="hidden lg:block lg:w-48 border-t lg:border-t-0 lg:border-l lg:border-r border-gray-200">
          <div className="h-full min-h-[160px] relative bg-gray-100">
            {car.images && Array.isArray(car.images) && car.images.length > 0 && car.images[0] && !imageError ? (
              <img
                src={car.images[0]}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <ImageIcon size={32} className="text-gray-400" />
              </div>
            )}
          </div>
        </div>

        {/* Right side - Price and Action Button */}
        <div className="lg:w-48 flex flex-col border-t lg:border-t-0 lg:border-l border-gray-200">
          <div className="flex flex-col gap-3 p-4">
            {/* Price */}
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatPrice(car.price, car.currency)}</p>
            </div>
{(car.trackingUrl || car.externalUrl) ? (
              <button
                onClick={() => {
                  const url = car.trackingUrl || car.externalUrl || '';
                  let finalUrl = url;
                  
                  // Ensure absolute URL
                  if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
                    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3377';
                    finalUrl = url.startsWith('/') ? `${apiBaseUrl}${url}` : `${apiBaseUrl}/${url}`;
                  }
                  
                  // Use window.open to ensure it opens externally and bypasses Next.js routing
                  window.open(finalUrl, '_blank', 'noopener,noreferrer');
                }}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg transition-all text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Visit Dealer
                <ExternalLink size={14} />
              </button>
            ) : (
              <button
                disabled
                className="w-full bg-gray-400 cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg text-xs flex items-center justify-center gap-1.5"
              >
                No Link
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

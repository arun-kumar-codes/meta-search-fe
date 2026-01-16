"use client"

import { useState } from "react"
import { ArrowRightLeft, ChevronDown } from "lucide-react"
import InputField from "./InputField"
import CheckboxOption from "./CheckboxOption"

interface SearchFormProps {
  activeTab: string
}

export default function SearchForm({ activeTab }: SearchFormProps) {
  const [tripType, setTripType] = useState("return")
  const [formData, setFormData] = useState({
    from: "Delhi Indira Gandhi Internati...",
    to: "Everywhere",
    departDate: "18/01/2026",
    returnDate: "19/02/2026",
    travelers: "1 Adult, Economy",
    addNearby: false,
    directFlights: false,
    addHotel: true,
  })

  const handleSwap = () => {
    setFormData((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }))
  }

  return (
    <div className="space-y-6">
      {/* Trip Type Selector */}
      <div>
        <button className="px-3 py-2 border-2 border-white/30 text-white rounded-lg font-semibold flex items-center gap-2 hover:border-white/50 transition">
          {tripType === "return" ? "Return" : "One-way"}
          <ChevronDown size={18} />
        </button>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-2xl px-6 md:p-8 shadow-lg">
        {/* Main Search Grid - From, Swap, To, Depart, Return, Search Button */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end mb-2">
          {/* From */}
          <div className="lg:col-span-1">
            <InputField
              label="City, Make, Model"
              value={formData.from}
              onChange={(e) => setFormData((prev) => ({ ...prev, from: e.target.value }))}
            />
          </div>


          {/* To */}
          <div className="lg:col-span-1">
            <InputField
              label="Brand"
              value={formData.to}
              onChange={(e) => setFormData((prev) => ({ ...prev, to: e.target.value }))}
            />
          </div>

          {/* Depart Date */}
          <div className="lg:col-span-1">
            <InputField
              label="Year"
              value={formData.departDate}
              onChange={(e) => setFormData((prev) => ({ ...prev, departDate: e.target.value }))}
            />
          </div>

          {/* Return Date */}
          <div className="lg:col-span-1">
            <InputField
              label="Price"
              value={formData.returnDate}
              onChange={(e) => setFormData((prev) => ({ ...prev, returnDate: e.target.value }))}
            />
          </div>

          {/* Search Button */}
          <div className="lg:col-span-1 flex items-end">
            <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition h-[48px]">
              Search
            </button>
          </div>
        </div>

        {/* Checkboxes below From and To */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
          <div className="lg:col-span-1">
            <CheckboxOption
              label="Add nearby cars"
              checked={formData.addNearby}
              onChange={(e) => setFormData((prev) => ({ ...prev, addNearby: e.target.checked }))}
            />
          </div>
          <div className="lg:col-span-1"></div>
          <div className="lg:col-span-1">
            <CheckboxOption
              label="Add nearby cars"
              checked={formData.addNearby}
              onChange={(e) => setFormData((prev) => ({ ...prev, addNearby: e.target.checked }))}
            />
          </div>
          <div className="lg:col-span-3"></div>
        </div>
      </div>
    </div>
  )
}

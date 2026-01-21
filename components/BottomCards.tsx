"use client"

import { useState } from "react"
import { Hotel, Car, Search, TrendingUp, Shield, DollarSign, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react"

export default function BottomCards() {
  const cards = [
    { id: 1, title: "Hotels", icon: Hotel },
    { id: 2, title: "Car hire", icon: Car },
    { id: 3, title: "Explore everywhere", icon: Search },
  ]

  const usedCarFeatures = [
    { id: 1, icon: TrendingUp, title: "Best Prices", description: "Compare prices from trusted dealers" },
    { id: 2, icon: Shield, title: "Verified Listings", description: "All cars verified and inspected" },
    { id: 3, icon: DollarSign, title: "Great Deals", description: "Save up to 40% on used cars" },
  ]

  return (
    <section className="bg-white px-4 md:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.id}
                className="bg-[#05203C] rounded-2xl p-8 md:px-12 md:py-6 flex items-center gap-4 cursor-pointer hover:opacity-90 transition"
              >
                <Icon size={40} className="text-white flex-shrink-0" />
                <h3 className="text-white font-bold text-xl">{card.title}</h3>
              </div>
            )
          })}
        </div>

        {/* Used Car Section */}
        <div className="bg-blue-600/90 from-slate-50 to-slate-100 rounded-3xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
              <Car size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Used Car Marketplace</h2>
              <p className="text-gray-600 mt-1">Find your perfect pre-owned vehicle</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {usedCarFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.id}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex-1 sm:flex-none">
              Browse Used Cars
            </button>
            <button className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition flex-1 sm:flex-none">
              Sell Your Car
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl md:text-3xl font-[600] text-gray-900">
            Booking cars with Used Cars Metasearch
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left Column */}
            <div className=" pr-0 md:pr-8">
              <FAQItem question="How does Used Cars Metasearch work?" />
              <FAQItem question="How can I find the cheapest flight using Used Cars Metasearch?" />
              <FAQItem question="Where should I book a flight to right now?" />
              <FAQItem question="Do I book my flight with Used Cars Metasearch?" />
              <FAQItem question="What happens after I have booked my flight?" />
            </div>

            {/* Right Column */}
            <div className="pl-0 md:pl-8 mt-8 md:mt-0">
              <FAQItem question="Does Used Cars Metasearch do hotels too?" />
              <FAQItem question="What about car hire?" />
              <FAQItem question="What's a Price Alert?" />
              <FAQItem question="Can I book a flexible flight ticket?" />
              <FAQItem question="Can I book flights that emit less CO₂?" />
            </div>
          </div>
        </div>

        {/* International Sites Section */}
        <InternationalSitesSection />

        {/* Start Planning Your Adventure Section */}
        <AdventurePlanningSection />
      </div>
    </section>
  )
}

function InternationalSitesSection() {
  const [isExpanded, setIsExpanded] = useState(false)

  const countries = [
    { code: "GB", name: "Great Britain", link: "Cheap flights" },
    { code: "HK", name: "Hong Kong", link: "Flight tickets" },
    { code: "JP", name: "Japan", link: "Cheap flights" },
    { code: "NZ", name: "New Zealand", link: "Cheap flights" },
    { code: "SG", name: "Singapore", link: "Flight tickets" },
    { code: "TH", name: "Thailand", link: "Cheap flights" },
    { code: "AU", name: "Australia", link: "Cheap flights" },
    { code: "IN", name: "India", link: "Flight tickets" },
    { code: "MY", name: "Malaysia", link: "Cheap flights" },
    { code: "PH", name: "Philippines", link: "Flight tickets" },
    { code: "KR", name: "South Korea", link: "Cheap flights" },
    { code: "US", name: "USA", link: "Cheap flights" },
    { code: "CN", name: "China", link: "Flight tickets" },
    { code: "ID", name: "Indonesia", link: "Cheap flights" },
    { code: "MX", name: "Mexico", link: "Flight tickets" },
    { code: "RU", name: "Russia", link: "Cheap flights" },
    { code: "TW", name: "Taiwan", link: "Flight tickets" },
    { code: "VN", name: "Vietnam", link: "Cheap flights" },
  ]

  const getFlagEmoji = (code: string) => {
    const flagEmojis: { [key: string]: string } = {
      GB: "🇬🇧", HK: "🇭🇰", JP: "🇯🇵", NZ: "🇳🇿", SG: "🇸🇬", TH: "🇹🇭",
      AU: "🇦🇺", IN: "🇮🇳", MY: "🇲🇾", PH: "🇵🇭", KR: "🇰🇷", US: "🇺🇸",
      CN: "🇨🇳", ID: "🇮🇩", MX: "🇲🇽", RU: "🇷🇺", TW: "🇹🇼", VN: "🇻🇳",
    }
    return flagEmojis[code] || "🌍"
  }

  return (
    <div className="mt-2 pt-2 border-b border-gray-400">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-4"
      >
        <h2 className="text-2xl md:text-3xl font-[600] text-gray-900">
          Our international sites
        </h2>
        {isExpanded ? (
          <ChevronUp size={24} className="text-gray-600" />
        ) : (
          <ChevronDown size={24} className="text-gray-600" />
        )}
      </button>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pb-8">
          {[0, 1, 2].map((colIndex) => (
            <div key={colIndex} className="space-y-4">
              {countries
                .filter((_, index) => index % 3 === colIndex)
                .map((country) => (
                  <a
                    key={country.code}
                    href="#"
                    className="flex items-center gap-3 hover:text-blue-600 transition-colors"
                  >
                    <span className="text-2xl">{getFlagEmoji(country.code)}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 text-sm">({country.code})</span>
                      <span className="text-gray-900">{country.link}</span>
                    </div>
                  </a>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function AdventurePlanningSection() {
  const [activeTab, setActiveTab] = useState("Country")
  const [currentPage, setCurrentPage] = useState(0)

  const tabs = ["Country", "City", "Region", "Airport"]

  const carHireLinks = {
    Country: [
      "Best cars in India",
      "Car hire in Oman",
      "Car hire in United Arab Emirates",
      "Car hire in Qatar",
      "Car hire in Saudi Arabia",
      "Car hire in Turkey",
      "Car hire in Egypt",
      "Car hire in Morocco",
      "Car hire in South Africa",
      "Car hire in Brazil",
    ],
    City: [
      "Car hire in London",
      "Car hire in Paris",
      "Car hire in New York",
      "Best cars in Paris",
      "Best cars in New York",
      "Best cars in Tokyo",
      "Best cars in Dubai",
      "Best cars in Sydney",
      "Best cars in Rome",
      "Best cars in Barcelona",
      "Best cars in Amsterdam",
      "Best cars in Berlin",
      "Best cars in Europe",
      "Best cars in Asia",
      "Best cars in South America",
      "Best cars in Africa",
      "Best cars in Middle East",
      "Best cars in Oceania",
      "Best cars in Caribbean",
      "Best cars in Mediterranean",
      "Best cars in Scandinavia",
    ],
    Airport: [
      "Best cars at Heathrow Airport",
      "Best cars at JFK Airport",
      "Best cars at Dubai Airport",
      "Best cars at Singapore Airport",
      "Best cars at Tokyo Airport",
      "Best cars at Sydney Airport",
      "Best cars at Frankfurt Airport",
      "Best cars at Amsterdam Airport",
      "Best cars at Madrid Airport",
      "Best cars at Rome Airport",
    ],
  }

  const itemsPerPage = 9
  const currentLinks = carHireLinks[activeTab as keyof typeof carHireLinks]
  const totalPages = Math.ceil(currentLinks.length / itemsPerPage)
  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const displayedLinks = currentLinks.slice(startIndex, endIndex)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setCurrentPage(0)
  }

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
  }

  return (
    <div className="mt-2 pt-2">
      <h2 className="text-2xl md:text-3xl font-[600] text-gray-900 mb-6">
        Start planning your adventure
      </h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-5 py-1 rounded-md font-[400] transition-colors ${
              activeTab === tab
                ? "bg-[#05203C] text-white"
                : "bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Car Hire Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {displayedLinks.map((link, index) => (
          <a
            key={index}
            href="#"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Carousel Navigation */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className={`p-2 rounded-full transition-colors ${
            currentPage === 0
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentPage ? "bg-gray-900" : "bg-gray-300"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className={`p-2 rounded-full transition-colors ${
            currentPage === totalPages - 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}

function FAQItem({ question }: { question: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-400">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 flex items-center justify-between text-left hover:text-blue-600 transition-colors"
      >
        <span className="text-lg font-[500] text-gray-900">{question}</span>
        <ChevronDown
          size={20}
          className={`text-gray-500 transition-transform flex-shrink-0 ml-4 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-6 text-gray-600">
          <p>Answer content goes here...</p>
        </div>
      )}
    </div>
  )
}

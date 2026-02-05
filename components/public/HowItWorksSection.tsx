"use client"

import { Search, GitCompare, Shield, TrendingUp } from "lucide-react"

export default function HowItWorksSection() {
  const steps = [
    {
      icon: Search,
      title: "Search",
      description: "Enter your preferred brand, model, or browse all available cars",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: GitCompare,
      title: "Compare",
      description: "Compare prices from multiple verified dealers in one place",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Shield,
      title: "Verify",
      description: "All listings are verified and inspected by trusted dealers",
      color: "from-green-500 to-green-600",
    },
    {
      icon: TrendingUp,
      title: "Save",
      description: "Get the best deals and save up to 40% on used cars",
      color: "from-orange-500 to-orange-600",
    },
  ]

  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find your perfect used car in just a few simple steps. Our platform makes car shopping easy and transparent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

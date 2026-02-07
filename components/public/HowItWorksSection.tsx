"use client"

import { Search, GitCompare, Shield, TrendingUp } from "lucide-react"

export default function HowItWorksSection() {
  const steps = [
    { icon: Search, title: "Search", description: "Enter your preferred brand, model, or browse all available cars" },
    { icon: GitCompare, title: "Compare", description: "Compare prices from multiple verified dealers in one place" },
    { icon: Shield, title: "Verify", description: "All listings are verified and inspected by trusted dealers" },
    { icon: TrendingUp, title: "Save", description: "Get the best deals and save up to 40% on used cars" },
  ]

  return (
    <section className="bg-muted/50 py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Find your perfect used car in just a few simple steps. Our platform makes car shopping easy and transparent.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className="bg-card rounded-xl p-4 md:p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={28} className="text-primary md:w-8 md:h-8" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm md:text-base">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

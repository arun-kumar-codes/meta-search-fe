"use client"

import { MessageCircle, Search, FileCheck, Car, Compass } from "lucide-react"
import { motion } from "motion/react"

const steps = [
  {
    icon: MessageCircle,
    title: "Chat With Atlas",
    description:
      "Start a natural conversation. Tell Atlas about your budget, preferences, family needs, or dream used car. No forms to fill!",
    color: "from-[var(--atlas-cyan)] to-[#0099CC]",
  },
  {
    icon: Search,
    title: "Atlas Searches All Dealers",
    description:
      "Atlas instantly searches 50,000+ verified used cars across 1000+ dealers - all in one place - and shows only perfect matches for you.",
    color: "from-[var(--atlas-navy)] to-[var(--atlas-navy-dark)]",
  },
  {
    icon: FileCheck,
    title: "Review & Compare",
    description:
      "Atlas presents detailed comparisons, fair price analysis, vehicle history, and honest recommendations - all in simple language.",
    color: "from-[var(--atlas-cyan)] to-[#0099CC]",
  },
  {
    icon: Car,
    title: "Atlas Guides Purchase",
    description:
      "Schedule test drives, get negotiation tips, complete paperwork - Atlas assists you every step until you drive home!",
    color: "from-[var(--atlas-green)] to-[var(--atlas-green-dark)]",
  },
]

export default function HowAtlasWorks() {
  return (
    <motion.section
      id="how-it-works"
      className="py-12 md:py-20 bg-white"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-block mb-4 px-4 py-1.5 text-sm font-medium rounded-full bg-[var(--atlas-navy)]/10 text-[var(--atlas-navy)] border border-[var(--atlas-navy)]/30">
            <Compass className="size-3.5 inline mr-1.5" />
            Simple. Smart. Fast.
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[var(--atlas-navy)] mb-4">
            How Atlas Works
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            From first chat to driving home - Atlas guides you through the entire journey in just 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="p-6 h-full rounded-xl bg-card border-2 border-transparent hover:border-[var(--atlas-cyan)] hover:shadow-2xl transition-all duration-300 group">
                  <div className={`size-14 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br ${step.color} shadow-xl group-hover:scale-110 transition-transform`}>
                    <step.icon className="size-7 text-white" />
                  </div>

                  <h3 className="text-base font-bold text-[var(--atlas-navy)] mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* <div className="rounded-lg p-3 border border-[var(--atlas-cyan)]/20 bg-[var(--atlas-cyan)]/5">
                    <p className="text-xs text-gray-500 mb-1 font-medium">Example:</p>
                    <p className="text-xs text-[var(--atlas-navy)] italic">&ldquo;{step.example}&rdquo;</p>
                  </div> */}
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/3 -right-4 transform z-10 text-2xl text-[var(--atlas-cyan)]">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
      </div>
    </motion.section>
  )
}

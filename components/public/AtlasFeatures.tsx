"use client"

import {
  Brain,
  Compass,
  Shield,
  Zap,
  MessageSquare,
  TrendingUp,
  Target,
  Heart,
  Users,
  Award,
  Clock,
} from "lucide-react"
import { motion } from "motion/react"

const coreFeatures = [
  {
    icon: Compass,
    title: "Search All In One Place",
    description:
      "No more jumping between websites. Atlas searches 50,000+ used cars from 1000+ dealers across India - all in one conversation.",
    gradient: "from-[var(--atlas-cyan)] to-[#0099CC]",
  },
  {
    icon: Brain,
    title: "Learns & Adapts",
    description:
      "The more you chat, the better Atlas understands you. Every conversation makes used car recommendations smarter.",
    gradient: "from-[var(--atlas-navy)] to-[var(--atlas-navy-dark)]",
  },
  {
    icon: Target,
    title: "Precision Matching",
    description:
      "Atlas analyzes 100+ parameters across all used car listings to find cars that perfectly match your lifestyle, needs, and budget.",
    gradient: "from-[var(--atlas-green)] to-[var(--atlas-green-dark)]",
  },
  {
    icon: TrendingUp,
    title: "Smart Price Analysis",
    description:
      "Get instant fair market value analysis. Atlas tells you if you're getting a great deal or overpaying.",
    gradient: "from-orange-500 to-orange-600",
  },
]

const additionalFeatures = [
  { icon: MessageSquare, title: "Natural Conversations", description: "Talk to Atlas like a friend - no complicated filters or technical jargon" },
  { icon: Shield, title: "Verified Used Cars Only", description: "Every recommendation comes from verified dealers with authentic used car listings" },
  { icon: Zap, title: "All Dealers, One Search", description: "Search 50,000+ used cars from 1000+ dealers in milliseconds - all in one place" },
  { icon: Heart, title: "Saves Preferences", description: "Atlas remembers your likes and dislikes for future used car recommendations" },
  { icon: Users, title: "Family-Friendly", description: "Atlas considers your entire family's needs when suggesting used cars" },
  { icon: Award, title: "Expert Knowledge", description: "Trained on millions of used car transactions and market data across India" },
  { icon: Clock, title: "24/7 Available", description: "Atlas never sleeps - get used car help anytime, anywhere, on any device" },
]

export default function AtlasFeatures() {
  return (
    <motion.section
      id="about"
      className="py-12 md:py-20 bg-gradient-to-b from-white via-gray-50 to-white"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-flex items-center gap-1.5 mb-4 px-4 py-1.5 text-sm font-medium rounded-full bg-[var(--atlas-cyan)]/10 text-[var(--atlas-cyan)] border border-[var(--atlas-cyan)]/30">
            <Compass className="size-3.5" />
            Powered by Atlas AI
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[var(--atlas-navy)] mb-4">
            Why Atlas Is Different
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Atlas isn&apos;t just a search tool. It&apos;s an intelligent guide that searches ALL used car listings across India in one place - understanding you, learning from you, and finding your perfect used car.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {coreFeatures.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl bg-card border-2 border-transparent hover:border-[var(--atlas-cyan)] hover:shadow-2xl transition-all duration-300 group cursor-default"
            >
              <div
                className={`size-16 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform bg-gradient-to-br ${feature.gradient}`}
              >
                <feature.icon className="size-8 text-white" />
              </div>
              <h3 className="text-base font-bold text-[var(--atlas-navy)] mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border-2 border-[var(--atlas-cyan)]/30 p-8 shadow-xl bg-card">
          <h3 className="text-xl font-bold text-[var(--atlas-navy)] mb-6 text-center">
            Everything Atlas Can Do For You
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature) => (
              <div key={feature.title} className="flex gap-3">
                <div className="size-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-[var(--atlas-cyan)]/10">
                  <feature.icon className="size-5 text-[var(--atlas-cyan)]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--atlas-navy)] mb-1 text-sm">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-16 rounded-3xl p-12 text-white relative overflow-hidden hidden"
          style={{
            background: "linear-gradient(to right, var(--atlas-navy), var(--atlas-cyan))",
          }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "30px 30px",
              }}
            />
          </div>

          <div className="relative">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold mb-3">Atlas By The Numbers</h3>
              <p className="text-gray-200">Real impact, real results</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">2.5min</div>
                <div className="text-gray-200 text-sm">Average search time</div>
                <div className="text-xs text-gray-300 mt-1">vs 3-4 days traditional</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">₹45K</div>
                <div className="text-gray-200 text-sm">Average savings</div>
                <div className="text-xs text-gray-300 mt-1">per customer</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">15K+</div>
                <div className="text-gray-200 text-sm">Used cars sold this month</div>
                <div className="text-xs text-gray-300 mt-1">through Atlas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
                <div className="text-gray-200 text-sm">Satisfaction rate</div>
                <div className="text-xs text-gray-300 mt-1">from verified buyers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

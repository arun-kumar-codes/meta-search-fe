"use client"

import { Compass, Sparkles, Brain, MapPin } from "lucide-react"
import { motion } from "motion/react"
import ChatPanel from "@/components/chat/ChatPanel"
import { heroConfig } from "@/lib/hero-config"

export default function Hero() {
  const { assistantName, tagline, badge, headline, headlineAccent, descriptionShort, descriptionFull, features, socialProof } = heroConfig
  return (
    <>
      <motion.section
        id="chat"
        className="relative overflow-hidden py-2 sm:py-12 md:py-20 min-h-[80vh] max-sm:min-h-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: "linear-gradient(to bottom right, var(--atlas-navy), var(--atlas-navy-dark), var(--atlas-navy))",
        }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, var(--atlas-cyan) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 animate-pulse" style={{ backgroundColor: "var(--atlas-cyan)" }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse" style={{ backgroundColor: "var(--atlas-cyan)", animationDelay: "1s" }} />

        <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 relative z-10 max-sm:px-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-12 items-start">
            {/* Left: Atlas branding and copy (full on desktop, trimmed on mobile) */}
            <motion.div
              className="text-white pt-0 sm:pt-4 lg:pt-8 max-sm:pb-0"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="mb-2 sm:mb-6 flex items-center gap-3 sm:gap-4">
                <div className="relative shrink-0">
                  <div
                    className="size-12 sm:size-16 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl"
                    style={{ backgroundColor: "var(--atlas-cyan)" }}
                  >
                    <Compass className="size-7 sm:size-9 text-white" />
                  </div>
                  <div
                    className="absolute -bottom-0.5 -right-0.5 size-5 sm:size-7 rounded-full border-2 sm:border-4 flex items-center justify-center"
                    style={{ backgroundColor: "var(--atlas-green)", borderColor: "var(--atlas-navy)" }}
                  >
                    <Sparkles className="size-3 sm:size-4 text-white" />
                  </div>
                </div>
                <div className="min-w-0  mb-6">
                  <h1 className="text-2xl sm:text-3xl mt-6 md:text-5xl font-bold mb-0.5 sm:mb-1  leading-tight">Meet {assistantName}</h1>
                  <p className="text-sm sm:text-base md:text-xl" style={{ color: "var(--atlas-cyan)" }}>
                    {tagline}
                  </p>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-5 mb-2 sm:mb-6">
                {/* Mobile: compact headline (desktop headline below stays richer) */}
                <div className="sm:hidden">
                  <h2 className="text-lg font-bold leading-snug">
                    {headline}{" "}
                    <span style={{ color: "var(--atlas-cyan)" }}>{headlineAccent}</span>
                  </h2>
                </div>
                {/* Badge + heading: hide on very small screens */}
                <div className="hidden sm:block">
                  {badge && (
                    <span
                      className="inline-block mb-3 text-sm px-4 py-1.5 rounded-full border"
                      style={{ backgroundColor: "rgba(0,191,255,0.2)", color: "var(--atlas-cyan)", borderColor: "rgba(0,191,255,0.3)" }}
                    >
                      {badge}
                    </span>
                  )}

                  <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 leading-tight">
                    {headline}
                    <span className="block" style={{ color: "var(--atlas-cyan)" }}>
                      {headlineAccent}
                    </span>
                  </h2>
                </div>

                {/* Short copy on mobile, full copy on desktop */}
                <p className="text-sm sm:text-base md:text-xl text-gray-300 leading-snug sm:leading-relaxed max-w-xl max-sm:line-clamp-2">
                  <span className="sm:hidden">{descriptionShort}</span>
                  <span className="hidden sm:inline">{descriptionFull}</span>
                </p>

                {/* Stats + features: hide on mobile to keep chat dominant */}
              
              </div>

              {/* Social proof: hide on mobile; only show if configured */}
              {socialProof && (
                <div className="hidden sm:flex items-center gap-6 pt-4 border-t border-white/20">
                  <div className="flex items-center gap-2">
                    {socialProof.avatarLetters && socialProof.avatarLetters.length > 0 && (
                      <div className="flex -space-x-2">
                        {socialProof.avatarLetters.map((letter, i) => (
                          <div
                            key={i}
                            className="size-8 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                            style={{ backgroundColor: "var(--atlas-cyan)", borderColor: "var(--atlas-navy)" }}
                          >
                            {letter}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="text-sm">
                      <div className="font-semibold">{socialProof.label}</div>
                      <div className="text-gray-300 text-xs">{socialProof.sublabel}</div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Right: Chat panel — full width; mobile: compact height to fit nav + heading in one screen */}
            <motion.div
              className="lg:pt-4 w-full flex flex-col flex-1 min-h-[220px] max-h-[calc(100dvh-8rem)] max-sm:min-h-0 max-sm:h-[calc(100dvh-20rem)] sm:min-h-[480px] lg:min-h-[560px] lg:max-h-[600px]"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <div
                className="rounded-2xl overflow-hidden shadow-2xl border-2 bg-card flex-1 min-h-0 w-full flex flex-col max-h-full"
                style={{ borderColor: "rgba(0,191,255,0.5)" }}
              >
                <ChatPanel className="w-full h-full min-h-0 flex-1 max-h-full" inlineMode />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

    </>
  )
}

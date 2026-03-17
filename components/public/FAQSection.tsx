"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

const faqs = [
  {
    question: "How does Car Atlas work?",
    answer:
      "Car Atlas aggregates listings from multiple trusted dealers like Cars24, Spinny, and Cardekho. You can search, compare prices, and find the perfect used car all in one place. Simply enter your preferences or browse all available cars.",
  },
  {
    question: "How can I find the best deals on used cars?",
    answer:
      "Use our search filters to sort by price, year, KM driven, or location. The 'Best Deals' section shows cars sorted by lowest price first. You can also set up price alerts to get notified when cars matching your criteria become available.",
  },
  {
    question: "Are all listings verified?",
    answer:
      "Yes, all listings come from verified and trusted dealers. We only aggregate listings from reputable sources like Cars24, Spinny, and Cardekho, ensuring quality and authenticity.",
  },
  {
    question: "Can I compare prices from different dealers?",
    answer:
      "Absolutely! That's one of our main features. When you search for a car, you'll see listings from multiple dealers side-by-side, making it easy to compare prices, specifications, and dealer information.",
  },
  {
    question: "What happens after I click on a listing?",
    answer:
      "When you click on a listing, you'll be redirected to the dealer's website where you can view more details, contact the dealer, schedule a test drive, or complete your purchase. We track clicks to help improve our service.",
  },
  {
    question: "How do I search for a specific car?",
    answer:
      "You can use the search form to enter brand, model, and year. All fields are optional - if you leave them blank, you'll see all available cars. You can then use filters to narrow down your search by price, KM driven, location, fuel type, and more.",
  },
  {
    question: "Can I filter cars by location?",
    answer:
      "Yes! Use the 'Browse by Type' section to select a popular location, or use the search filters to filter by city or state. This helps you find cars near you for easy inspection and test drives.",
  },
  {
    question: "How accurate is the pricing information?",
    answer:
      "Pricing information is updated daily from our partner dealers. However, prices may change on the dealer's website, so we recommend verifying the final price directly with the dealer.",
  },
  {
    question: "Do you charge any fees for using the platform?",
    answer:
      "No, Car Atlas is completely free to use. We don't charge any fees for searching, comparing, or viewing listings. Our service is supported by our dealer partners.",
  },
]

function FAQItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: (typeof faqs)[0]
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  return (
    <motion.div
      className="rounded-xl border-2 overflow-hidden bg-card shadow-sm"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={{
        borderColor: isOpen ? "var(--atlas-cyan)" : "var(--border)",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4 text-left transition-colors hover:bg-muted/30"
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-[var(--atlas-navy)] pr-2 flex-1">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-[var(--atlas-cyan)]/10 text-[var(--atlas-cyan)]"
        >
          <ChevronDown className="size-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-border">
              <p className="text-sm text-foreground/90 leading-relaxed pt-4">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const mid = Math.ceil(faqs.length / 2)
const faqsLeft = faqs.slice(0, mid)
const faqsRight = faqs.slice(mid)

export default function FAQSection() {
  const [openLeftIndex, setOpenLeftIndex] = useState<number | null>(null)
  const [openRightIndex, setOpenRightIndex] = useState<number | null>(null)

  return (
    <motion.section
      id="faq"
      className="py-12 md:py-20 bg-gradient-to-b from-muted/50 to-background"
      aria-label="FAQ"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 text-sm font-medium rounded-full bg-[var(--atlas-cyan)]/10 text-[var(--atlas-cyan)] border border-[var(--atlas-cyan)]/30">
            <HelpCircle className="size-4" />
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[var(--atlas-navy)] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about using Car Atlas
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="flex flex-col gap-4 flex-1 min-w-0">
            {faqsLeft.map((faq, index) => (
              <FAQItem
                key={faq.question}
                faq={faq}
                index={index}
                isOpen={openLeftIndex === index}
                onToggle={() => setOpenLeftIndex((prev) => (prev === index ? null : index))}
              />
            ))}
          </div>
          <div className="flex flex-col gap-4 flex-1 min-w-0">
            {faqsRight.map((faq, index) => (
              <FAQItem
                key={faq.question}
                faq={faq}
                index={index}
                isOpen={openRightIndex === index}
                onToggle={() => setOpenRightIndex((prev) => (prev === index ? null : index))}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
